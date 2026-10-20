import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import sharp from 'sharp';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
const qrGeometry=e=>{const box=e.getBoundingClientRect(),qr=e.querySelector('.qr-copy').getBoundingClientRect(),caption=e.querySelector('figcaption').getBoundingClientRect(),border=parseFloat(getComputedStyle(e).borderWidth);return [qr.left-box.left-border,box.right-border-qr.right,qr.top-box.top-border,caption.top-qr.bottom,box.bottom-border-caption.bottom];};
try{for(const engine of [chromium,webkit]){const browser=await engine.launch(engine===chromium?{channel:'chrome',headless:true}:{headless:true});try{
for(const width of [390,768,1440])for(const theme of ['light','dark']){
const p=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
await p.goto(`${origin}/component-playground/focus-and-selection?theme=${theme}`);
const f=p.frameLocator('#focus-frame');await f.locator('.selection-preview').last().waitFor();await p.waitForTimeout(150);
assert.equal(await f.locator('.selection-preview').count(),6);
assert.deepEqual(await f.locator('.qr-card').evaluate(qrGeometry),[12,12,12,12,12],`${engine.name()} ${width} ${theme} QR spacing`);
const samples=f.locator('.selection-preview');
for(let i=0;i<await samples.count();i++){
 const sample=samples.nth(i);await sample.evaluate(e=>e.scrollIntoView({block:'center'}));await p.evaluate(y=>scrollBy(0,y-450),(await sample.boundingBox()).y);await p.waitForTimeout(100);
 const info=await sample.evaluate(e=>{const c=getComputedStyle(e);return {padding:c.padding,line:parseFloat(c.lineHeight),sizes:c.backgroundSize.split(', ').map(size=>parseFloat(size.split(' ')[1]))};});
 assert.equal(info.padding,'0px');assert.ok(info.sizes.length>0&&info.sizes.every(h=>h===info.line),JSON.stringify(info));
 // Compare painted pixels with an actual native selection, not Range glyph boxes.
 if(engine===chromium&&width===1440&&theme==='light'){
  const box=await sample.boundingBox(),clip={x:box.x,y:box.y-4,width:50,height:box.height+8};
  const simulated=await p.screenshot({clip});
  await sample.evaluate(e=>{e.dataset.savedBackground=e.style.backgroundImage;e.style.backgroundImage='none';const range=document.createRange();range.selectNodeContents(e);window.focus();getSelection().removeAllRanges();getSelection().addRange(range);});
  const native=await p.screenshot({clip});
  const paintedRows=async png=>{const {data,info}=await sharp(png).removeAlpha().raw().toBuffer({resolveWithObject:true});const rows=[];for(let y=0;y<info.height;y++){let count=0;for(let x=0;x<info.width;x++){const n=(y*info.width+x)*info.channels;if(data[n+2]>data[n]+30&&data[n+1]>data[n]+10)count++;}if(count>5)rows.push(y);}return rows;};
  const actualRows=await paintedRows(native),heldRows=await paintedRows(simulated);
  assert.ok(actualRows.length,'native selection must actually be painted');
  assert.deepEqual(heldRows,actualRows,'held highlight has exactly the native painted vertical extent for specimen '+i);
  console.log('Native/held painted height',i,actualRows.length,heldRows.length);if(i===0)assert.equal(actualRows.length,24,'desktop body selection is 24px high');
  await sample.evaluate(e=>{getSelection().removeAllRanges();e.style.backgroundImage=e.dataset.savedBackground;});
 }
 if(i<2){await p.evaluate(y=>scrollBy(0,y-450),(await sample.boundingBox()).y);await p.waitForTimeout(50);await p.screenshot({path:`/tmp/selection-${engine.name()}-${width}-${theme}-${i}.png`,clip:await sample.boundingBox()});}
}
if(width>660){await p.goto(`${origin}/ai-workshop-resources?theme=${theme}`);assert.deepEqual(await p.locator('#workshop-content .qr-card').evaluate(qrGeometry),[12,12,12,12,12],'Resources QR spacing');}
console.log('PASS native selection height and QR spacing',engine.name(),width,theme);await p.close();
}
}finally{await browser.close();}}}finally{server.close();}

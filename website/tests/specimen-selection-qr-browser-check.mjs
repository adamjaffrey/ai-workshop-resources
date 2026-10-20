import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
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
assert.deepEqual(await f.locator('.qr-card').evaluate(qrGeometry),[12,12,12,9,9],`${engine.name()} ${width} ${theme} QR spacing`);
const samples=f.locator('.selection-preview');
for(let i=0;i<await samples.count();i++){
 const sample=samples.nth(i);await sample.evaluate(e=>e.scrollIntoView({block:'center'}));await p.waitForTimeout(100);
 const info=await sample.evaluate(e=>({highlight:CSS.highlights.has('specimen-selection'),background:getComputedStyle(e).backgroundColor,padding:getComputedStyle(e).padding}));assert.deepEqual(info,{highlight:true,background:'rgba(0, 0, 0, 0)',padding:'0px'});
 // The highlight must be registered against this text range, never its block box.
 const geometry=await sample.evaluate(e=>{const ranges=[...CSS.highlights.get('specimen-selection')];const range=ranges.find(r=>r.commonAncestorContainer===e);return {registered:!!range,text:range?.toString()===e.textContent,glyphHeight:range?.getClientRects()[0]?.height,lineHeight:parseFloat(getComputedStyle(e).lineHeight)};});
 assert.ok(geometry.registered&&geometry.text&&geometry.glyphHeight<=geometry.lineHeight,JSON.stringify(geometry));
 if(i<2){await p.evaluate(y=>scrollBy(0,y-150),(await sample.boundingBox()).y);await p.waitForTimeout(50);await p.screenshot({path:`/tmp/selection-${engine.name()}-${width}-${theme}-${i}.png`,clip:await sample.boundingBox()});}
}
if(width>660){await p.goto(`${origin}/ai-workshop-resources?theme=${theme}`);assert.deepEqual(await p.locator('#workshop-content .qr-card').evaluate(qrGeometry),[12,12,12,9,9],'Resources QR spacing');}
console.log('PASS text-range selection and QR spacing',engine.name(),width,theme);await p.close();
}
}finally{await browser.close();}}}finally{server.close();}

import assert from 'node:assert/strict';
import sharp from 'sharp';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
try{for(const engine of [chromium,webkit]){const b=await engine.launch(engine===chromium?{channel:'chrome',headless:true}:{headless:true});try{
for(const width of [390,1440])for(const theme of ['light','dark']){
 const p=await b.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
 for(const page of ['resources','focus']){
  if(page==='resources'&&width<661)continue; // The real app hides the QR on mobile.
  await p.goto(origin+(page==='resources'?'/ai-workshop-resources':'/component-playground/focus-and-selection')+'?theme='+theme);
  const q=page==='resources'?p.locator('#workshop-content .qr-card'):p.frameLocator('#focus-frame').locator('.qr-card');await q.waitFor();
  await q.evaluate(e=>e.scrollIntoView({block:'center'}));await p.evaluate(y=>scrollBy(0,y-450),(await q.boundingBox()).y);await p.waitForTimeout(100);
  const g=await q.evaluate(e=>{const r=e.getBoundingClientRect(),q=e.querySelector('.qr-copy').getBoundingClientRect(),t=e.querySelector('figcaption'),c=getComputedStyle(e),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');ctx.fillStyle=getComputedStyle(t).color;ctx.fillRect(0,0,1,1);return{width:r.width,qrWidth:q.width,qrHeight:q.height,padding:c.padding,qrBottom:q.bottom-r.top,ink:[...ctx.getImageData(0,0,1,1).data].slice(0,3)};});
  assert.equal(g.width,176);assert.equal(g.qrWidth,150);assert.equal(g.qrHeight,150);assert.equal(g.padding,'12px');
  const png=await q.screenshot();const {data,info}=await sharp(png).removeAlpha().raw().toBuffer({resolveWithObject:true});const rows=[];
  for(let y=Math.ceil(g.qrBottom)+2;y<info.height-2;y++){let count=0;for(let x=10;x<info.width-10;x++){const n=(y*info.width+x)*info.channels;if(g.ink.every((v,i)=>Math.abs(data[n+i]-v)<16))count++;}if(count>8)rows.push(y);}
  assert.ok(rows.length>0,'caption ink must be detected');
  const gaps={above:rows[0]-g.qrBottom,below:info.height-1-(rows.at(-1)+1)};
  // Fractional iframe coordinates can round the screenshot boundary by one pixel.
  assert.ok(Math.abs(gaps.above-12)<=1&&Math.abs(gaps.below-12)<=1,JSON.stringify({engine:engine.name(),width,theme,page,gaps}));
  console.log('PASS caption ink clearance',engine.name(),width,theme,page,gaps);
  if(theme==='light')await sharp(png).toFile(`/tmp/qr-caption-${engine.name()}-${width}-${page}.png`);
 }
 await p.close();
}
}finally{await b.close();}}}finally{server.close();}

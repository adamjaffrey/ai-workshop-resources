import assert from 'node:assert/strict';
import {prepareBackdropCapture} from '../scripts/prepare-backdrop-capture.mjs';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const local=createPhonePreview(),hosted=createPhonePreview({protectPlayground:true});
for(const app of [local,hosted])await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
const origin=app=>'http://127.0.0.1:'+app.server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const source=await browser.newPage({reducedMotion:'reduce'}),gate=await browser.newPage({reducedMotion:'reduce'});
 for(const width of [320,390,600,601,660,661,700,701,768,1023,1024,1440])for(const height of [600,1000]){
  for(const p of [source,gate])await p.setViewportSize({width,height});
  await source.goto(origin(local)+'/playground/components');await source.evaluate(()=>document.fonts.ready);await source.evaluate(prepareBackdropCapture,{playground:true});
  await gate.goto(origin(hosted)+'/playground');
  const frame=await gate.locator('.playground-placeholder>iframe').elementHandle().then(e=>e.contentFrame());await frame.waitForSelector('.ph-word');await frame.evaluate(()=>document.fonts.ready);
  const original=await source.evaluate(()=>{
   const words=[],walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
   while(walker.nextNode()) {const n=walker.currentNode;if(n.parentElement.closest('svg,script,style,noscript,.catalog-sources,#style-dialog,[data-panel]:not([data-panel="components"])'))continue;
    for(const m of n.textContent.matchAll(/[^\s/-]*[/-]|[^\s/-]+/gu)){const range=document.createRange();range.setStart(n,m.index);range.setEnd(n,m.index+m[0].length);const r=range.getBoundingClientRect();if(r.width&&r.height)words.push({text:m[0],x:r.x,y:r.y,width:r.width,height:r.height});}}
   return words;
  });
  const projected=await frame.locator('.ph-word').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};}).filter(r=>r.width&&r.height));
  assert.equal(projected.length,original.length,`${width} word count`);
  const differences=original.flatMap((r,i)=>Math.abs(r.x-projected[i].x)>1||Math.abs(r.y-projected[i].y)>1||Math.abs(r.width-projected[i].width)>1||Math.abs(r.height-projected[i].height)>1?[{i,original:r,projected:projected[i]}]:[]);
  assert.deepEqual(differences.slice(0,5),[],`${width}x${height}: ${differences.length} differences`);
  for(const id of ['login-frame','resources-frame']) {
   const sourceElement=source.locator('#'+id),capturedElement=frame.locator('#'+id);
   const sourceBox=await sourceElement.boundingBox(),capturedBox=await capturedElement.boundingBox();
   assert.ok(Math.abs(sourceBox.height-capturedBox.height)<=1,`${width}x${height} ${id} responsive height`);
   const sourceDoc=await (await sourceElement.elementHandle()).contentFrame(),capturedDoc=await (await capturedElement.elementHandle()).contentFrame();
   await capturedDoc.evaluate(()=>document.fonts.ready);
   for(const selector of id==='login-frame'?['.gate-panel']:['.qr-card','.qr-card figcaption']) {
    const bounds=doc=>doc.locator(selector).first().evaluate(el=>{const r=el.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};});
    const actual=await bounds(sourceDoc),saved=await bounds(capturedDoc);
    for(const key of ['x','y','width','height'])assert.ok(Math.abs(actual[key]-saved[key])<=1,`${width}x${height} ${id} ${selector} ${key}: ${actual[key]} vs ${saved[key]}`);
   }
  }
  console.log(`PASS Components outer geometry: ${width}x${height}, ${original.length} words within 1px`);
 }
}finally{await browser.close();for(const app of [local,hosted])await new Promise(r=>app.server.close(r));}

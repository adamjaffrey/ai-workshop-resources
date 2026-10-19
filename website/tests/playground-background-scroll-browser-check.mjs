import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const app=createPhonePreview();await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage({reducedMotion:'reduce'});p.setDefaultTimeout(15000);
 await p.goto('http://127.0.0.1:'+app.server.address().port+'/playground/blocks-and-blur');
 await p.locator('input[name="block-destination"][value="playground"]').locator('..').click();
 const outer=await p.locator('#blocks-frame').elementHandle().then(e=>e.contentFrame());
 const scroll=async(frame)=>{
  await frame.evaluate(()=>scrollTo(0,0));
  const canvas=frame.locator('body');const box=await canvas.boundingBox();assert.ok(box);
  await frame.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';});
  // Real wheel input must reach the child, not merely allow scripted scrolling.
  const handle=await frame.frameElement();await handle.evaluate(e=>e.scrollIntoView({block:'center'}));const rect=await handle.boundingBox();
  await p.mouse.move(rect.x+rect.width/2,Math.max(rect.y+20,Math.min(rect.y+rect.height/2,950)));
  await p.mouse.wheel(0,550);
  // Let Chrome deliver the wheel gesture through script-disabled nested frames.
  await p.waitForTimeout(500);
  await frame.waitForFunction(()=>scrollY>20,undefined,{polling:100});
  assert.ok(await frame.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 };
 for(const width of [390,1440]){
  await p.setViewportSize({width,height:1000});
  for(const expanded of [false,true]){
   if(expanded)await p.locator('#blocks-preview .preview-expand').click();
   const bg=await outer.locator('.playground-placeholder>iframe').elementHandle().then(e=>e.contentFrame());
   await bg.waitForSelector('[data-panel="components"]');
   await p.locator('#blocks-frame').evaluate(e=>e.scrollIntoView({block:'center'}));
   await scroll(bg);
   const resources=await bg.locator('#resources-frame').elementHandle().then(e=>e.contentFrame());
   await bg.locator('#resources-frame').evaluate(e=>e.scrollIntoView({block:'center'}));
   await scroll(resources);
   assert.equal(await bg.locator('script,[href],form').count(),0);
   assert.equal(await outer.locator('.playground-placeholder>iframe').getAttribute('sandbox'),'');
   await p.screenshot({path:`/tmp/background-scroll-${width}-${expanded}.png`});
   if(expanded)await p.locator('#blocks-preview .preview-expand').click();
   console.log(`PASS wheel scrolling outer and embedded Resources: ${width}px, expanded=${expanded}`);
  }
 }
}finally{await browser.close();app.server.closeAllConnections();await new Promise(r=>app.server.close(r));}

import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const app=createPhonePreview();await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
const engine=process.env.BACKDROP_WEBKIT?webkit:chromium;
const browser=await engine.launch(engine===chromium?{channel:'chrome'}:{});
try{
 const page=await browser.newPage({reducedMotion:'reduce'});
 const set=async(id,value)=>page.evaluate(({id,value})=>{const field=document.getElementById(id);field.value=value;field.dispatchEvent(new Event('change',{bubbles:true}));},{id,value});
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:'+app.server.address().port+'/component-playground/blocks-and-blur');
  const panel=await page.locator('#blocks-frame').elementHandle().then(e=>e.contentFrame());
  for(const destination of ['resources','playground']){
   await set('block-destination',destination);await set('review','clear');
   const capture=await page.locator('#backdrop-inspection-frame').elementHandle().then(e=>e.contentFrame());
   await capture.waitForFunction(d=>document.documentElement.dataset.backdropDestination===d&&document.documentElement.dataset.review==='clear',destination);
   assert.equal(capture.childFrames().length,0,'Neither inspection nests another capture');
   assert.equal(await capture.locator('script').count(),0);
   assert.ok(await capture.locator('body *').evaluateAll(es=>es.every(e=>getComputedStyle(e).cursor==='default'&&getComputedStyle(e).pointerEvents==='none')),'No interactive content targets');
   await capture.evaluate(()=>scrollTo(0,200));assert.ok(await capture.evaluate(()=>scrollY)>0);
   await set('review','panel');await page.locator('#blocks-frame').waitFor({state:'visible'});
   assert.ok(await page.locator('#backdrop-inspection-frame').isHidden());
   assert.equal(await panel.evaluate(()=>scrollY),0);assert.equal(await panel.evaluate(()=>getComputedStyle(document.documentElement).overflowY),'hidden');
   assert.equal(await panel.locator('.page-placeholder').getAttribute('inert'),'');
  }
  console.log('PASS shared inert captures and locked Password Panel',engine.name(),width);
 }
}finally{await browser.close();await new Promise(r=>app.server.close(r));}

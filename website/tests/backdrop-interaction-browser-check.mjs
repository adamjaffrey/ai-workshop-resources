import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const app=createPhonePreview();await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
const engine=process.env.BACKDROP_WEBKIT?webkit:chromium;
const browser=await engine.launch({...(engine===chromium?{channel:'chrome'}:{}),headless:true});
try{
 const page=await browser.newPage({reducedMotion:'reduce'});
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:'+app.server.address().port+'/component-playground/blocks-and-blur');
  const frame=await (await page.locator('#blocks-frame').elementHandle()).contentFrame();
  await frame.waitForFunction(()=>typeof window.demoBlocks==='function');
  for(const blockDestination of ['resources','playground']){
   await frame.evaluate(blockDestination=>window.demoBlocks({blockDestination,review:'clear'}),blockDestination);
   let captured=frame;
   if(blockDestination==='playground'){
    captured=await (await frame.locator('.playground-placeholder>iframe').elementHandle()).contentFrame();
    await captured.waitForSelector('.ph-word');
    for(const doc of [captured,...captured.childFrames()]){
     assert.equal(await doc.locator('body *').evaluateAll(es=>es.every(e=>getComputedStyle(e).cursor==='default')),true,'No interactive cursors');
     assert.equal(await doc.locator('body *').evaluateAll(es=>es.every(e=>getComputedStyle(e).pointerEvents==='none')),true,'No content hit targets');
    }
    await page.locator('#blocks-frame').scrollIntoViewIfNeeded();
    await captured.evaluate(()=>scrollTo(0,0));
    const bounds=await frame.locator('.playground-placeholder>iframe').boundingBox();
    await page.mouse.move(bounds.x+Math.min(100,bounds.width/2),Math.max(200,Math.min(600,bounds.y+bounds.height/2)));
    await page.mouse.wheel(0,250);await page.waitForTimeout(200);
    assert.ok(await captured.evaluate(()=>scrollY)>0,'Wheel reaches outer document over inert content');
    await captured.evaluate(()=>scrollTo(0,0));
    assert.equal(captured.childFrames().length,0,'Colours has no nested captured frames');
   }
   if(await captured.evaluate(()=>document.documentElement.scrollHeight>innerHeight+200)){await captured.evaluate(()=>scrollTo(0,200));assert.ok(await captured.evaluate(()=>scrollY)>0,'Outer inspection scrolling');}
   await frame.evaluate(blockDestination=>window.demoBlocks({blockDestination,review:'panel'}),blockDestination);
   await frame.waitForTimeout(150);
   assert.equal(await frame.evaluate(()=>scrollY),0);
   assert.equal(await frame.evaluate(()=>getComputedStyle(document.documentElement).overflowY),'hidden');
   if(blockDestination==='playground')assert.equal(await frame.locator('.playground-placeholder').getAttribute('inert'),'');
  }
  await page.locator('#blocks-frame').scrollIntoViewIfNeeded();
  await page.screenshot({path:`/tmp/backdrop-interaction-${width}.png`});
  console.log(`PASS ${width}: default cursors, inert nested captures, full-document dimming, inspection scroll and panel lock`);
 }
}finally{await browser.close();await new Promise(r=>app.server.close(r));}

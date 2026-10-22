import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
try{for(const engine of [chromium,webkit]){
 const browser=await engine.launch(engine===chromium?{channel:'chrome'}:{});
 try{for(const width of [390,1440]){
  const p=await browser.newPage({viewport:{width,height:1000},hasTouch:width===390});
  await p.goto('http://127.0.0.1:'+server.address().port+'/component-playground/blocks-and-blur');
  await p.locator('input[name=block-destination][value=playground]').locator('..').click();
  const frame=await p.locator('#blocks-frame').elementHandle().then(e=>e.contentFrame());
  for(const expanded of [false,true]){
   if(expanded)await p.locator('#blocks-preview .preview-expand').click();
   for(const review of ['clear','blurred']){
    await p.locator('input[name=review][value='+review+']').locator('..').click();
    await frame.waitForFunction(review=>document.body.dataset.review===review,review);
    const capture=await frame.locator('.playground-placeholder>iframe').elementHandle().then(e=>e.contentFrame());await capture.waitForSelector('.ph-word');
    await p.locator('#blocks-frame').scrollIntoViewIfNeeded();
    await capture.evaluate(()=>scrollTo(0,0));
    const box=await p.locator('#blocks-frame').boundingBox();const y=Math.max(50,Math.min(850,box.y+box.height/2)),x=box.x+Math.min(100,box.width/2);
    assert.equal(await frame.locator('.playground-placeholder>iframe').getAttribute('tabindex'),'-1','decorative frame is not an extra Tab stop');
    await p.mouse.move(x,y);await p.mouse.wheel(0,250);await p.waitForTimeout(300);
    assert.ok(await capture.evaluate(()=>scrollY)>0,JSON.stringify({engine:engine.name(),width,expanded,review,box}));
    if(width===390&&engine===chromium){await capture.evaluate(()=>scrollTo(0,0));const cdp=await p.context().newCDPSession(p);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});for(let step=1;step<=8;step++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y-step*15}]});await p.waitForTimeout(20);}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(200);assert.ok(await capture.evaluate(()=>scrollY)>0,'touch scroll starts inside capture');await cdp.detach();}
    console.log('PASS wheel and available touch',engine.name(),width,expanded,review);
   }
   if(expanded)await p.locator('#blocks-preview .preview-expand').click();
  }
  await p.close();
 }}finally{await browser.close();}
}}finally{server.close();}

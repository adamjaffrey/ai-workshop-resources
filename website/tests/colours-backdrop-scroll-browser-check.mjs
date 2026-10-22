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
    const capture=await p.locator('#colours-inspection-frame').elementHandle().then(e=>e.contentFrame());await capture.waitForSelector('.ph-word');
    await p.locator('#colours-inspection-frame').scrollIntoViewIfNeeded();
    await capture.evaluate(()=>scrollTo(0,0));
    const box=await p.locator('#colours-inspection-frame').boundingBox();const y=Math.max(50,Math.min(850,box.y+box.height/2)),x=box.x+Math.min(100,box.width/2);
    assert.equal(await p.locator('#colours-inspection-frame').getAttribute('tabindex'),'-1','decorative frame is not an extra Tab stop');
    await p.mouse.move(x,y);await p.mouse.wheel(0,250);await p.waitForTimeout(300);
    assert.ok(await capture.evaluate(()=>scrollY)>0,JSON.stringify({engine:engine.name(),width,expanded,review,box}));
    if(width===390&&engine===chromium){await capture.evaluate(()=>scrollTo(0,0));const cdp=await p.context().newCDPSession(p);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});for(let step=1;step<=8;step++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y-step*15}]});await p.waitForTimeout(20);}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(200);assert.ok(await capture.evaluate(()=>scrollY)>0,'touch scroll starts inside capture');await cdp.detach();}
    const region=p.locator('#blocks-preview .page-embed-scroll');await p.locator('#reset-blocks').focus();await p.keyboard.press('Tab');assert.ok(await region.evaluate(e=>document.activeElement===e),'Tab reaches the existing preview scroll stop');
    await p.keyboard.press('Home');await p.waitForTimeout(50);assert.equal(await capture.evaluate(()=>scrollY),0);
    for(const key of ['ArrowDown','PageDown','End']){const before=await capture.evaluate(()=>scrollY);await p.keyboard.press(key);await p.waitForTimeout(50);assert.ok(await capture.evaluate(()=>scrollY)>before,key+' moves capture');assert.ok(await region.evaluate(e=>document.activeElement===e),'focus stays on existing scroll stop');}
    for(const key of ['ArrowUp','PageUp','Home']){const before=await capture.evaluate(()=>scrollY);await p.keyboard.press(key);await p.waitForTimeout(50);assert.ok(await capture.evaluate(()=>scrollY)<before,key+' moves capture');}
    assert.ok(await capture.locator('body>*').evaluateAll(es=>es.every(e=>e.inert)),'captured content stays inert');
    assert.equal(await p.locator('#colours-inspection-frame').getAttribute('sandbox'),'allow-same-origin');assert.equal(await capture.locator('script').count(),0);
    await p.keyboard.press('Tab');assert.ok(await p.evaluate(()=>document.activeElement.id!=='colours-inspection-frame'),'Tab bypasses capture');
    if(width===390){
     await p.evaluate(()=>{const field=document.getElementById('width');field.value='1440';field.dispatchEvent(new Event('change',{bubbles:true}));});
     await p.waitForFunction(()=>{const e=document.querySelector('#blocks-preview .page-embed-scroll');return e.scrollWidth>e.clientWidth+50;});
     await region.focus();await p.keyboard.press('ArrowRight');assert.ok(await region.evaluate(e=>e.scrollLeft)>0,'keyboard pans selected wide preview');
     await p.keyboard.press('ArrowLeft');assert.equal(await region.evaluate(e=>e.scrollLeft),0);
     await p.evaluate(()=>{const field=document.getElementById('width');field.value='fluid';field.dispatchEvent(new Event('change',{bubbles:true}));});
     await p.waitForFunction(()=>{const e=document.querySelector('#blocks-preview .page-embed-scroll');return e.scrollWidth<=e.clientWidth+1;});
    }
    console.log('PASS keyboard, wheel and available touch',engine.name(),width,expanded,review);
   }
   if(expanded)await p.locator('#blocks-preview .preview-expand').click();
  }
  const set=async(id,value)=>p.evaluate(({id,value})=>{const el=document.getElementById(id);el.value=value;el.dispatchEvent(new Event('change',{bubbles:true}));},{id,value});
  await set('theme','dark');await set('agent','claude-code');await set('review','blurred');
  const capture=await p.locator('#colours-inspection-frame').elementHandle().then(e=>e.contentFrame());
  await capture.waitForFunction(()=>document.documentElement.dataset.theme==='dark'&&document.documentElement.dataset.selectedAgent==='claude-code');
  await p.locator('#strength').fill('70');await p.locator('#blur').fill('8');await p.locator('#dim').fill('25');
  assert.equal(await capture.locator('body').evaluate(e=>getComputedStyle(e).filter),'blur(8px)');
  assert.equal(await capture.locator('body').evaluate(e=>getComputedStyle(e).getPropertyValue('--ph-strength').trim()),'70%');
  assert.equal(await capture.locator('html').evaluate(e=>getComputedStyle(e,'::after').backgroundColor),'rgba(0, 0, 0, 0.25)');
  await set('review','panel');await p.locator('#blocks-frame').waitFor({state:'visible'});assert.ok(await p.locator('#colours-inspection-frame').isHidden());
  await set('review','clear');assert.equal(await capture.evaluate(()=>scrollY),0,'panel mode resets inspection scroll');
  await set('block-destination','resources');await p.locator('#blocks-frame').waitFor({state:'visible'});assert.ok(await p.locator('#colours-inspection-frame').isHidden());
  await p.close();
 }}finally{await browser.close();}
}}finally{server.close();}

import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({channel:'chrome',headless:true});
const origin='http://127.0.0.1:'+server.address().port;
try {
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:900}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  if(width===390)await page.emulateMedia({reducedMotion:'reduce'});
  await page.addInitScript(()=>{
   if(window!==top)return;
   window.keepBusy=setInterval(()=>document.dispatchEvent(new Event('pointermove')),60);
   window.catalogMessages=0;window.canvasReads=0;
   window.addEventListener('message',event=>{if(event.data?.guide==='icon-catalog-data')window.catalogMessages++;});
   const read=CanvasRenderingContext2D.prototype.getImageData;
   CanvasRenderingContext2D.prototype.getImageData=function(...args){window.canvasReads++;return read.apply(this,args);};
  });
  await page.goto(origin+'/component-playground/components');
  await page.frameLocator('#resources-frame').locator('h1').waitFor();
  await page.waitForTimeout(900);
  assert.deepEqual(await page.locator('iframe[srcdoc]').evaluateAll(frames=>frames.map(frame=>frame.id)),['login-frame','resources-frame'],'busy initial page creates only active specimens');
  const choose=(id,value)=>page.evaluate(({id,value})=>document.querySelector('#'+id+' input[value="'+value+'"]').click(),{id,value});
  for(const [id,value] of [['agent','claude-code'],['theme','dark'],['hover','on'],['agent','codex'],['theme','light'],['agent','claude-code'],['theme','dark']])await choose(id,value);
  await page.waitForFunction(()=>!document.getElementById('resources-frame').style.visibility);
  assert.equal(await page.frameLocator('#resources-frame').locator('html').getAttribute('data-theme'),'dark');
  assert.equal(await page.frameLocator('#resources-frame').locator('html').getAttribute('data-selected-agent'),'claude-code');
  assert.equal(await page.evaluate(()=>canvasReads),0,'non-colour interactions do not read canvas swatches');
  assert.equal(await page.evaluate(()=>catalogMessages),0,'no hidden catalog captures during interaction');
  await page.locator('[data-tab=typography]').click();
  await page.frameLocator('#type-frame').locator('.agent-row').first().waitFor();
  await page.waitForFunction(()=>!document.getElementById('type-frame').style.visibility);
  assert.equal(await page.frameLocator('#type-frame').locator('html').getAttribute('data-theme'),'dark');
  assert.equal(await page.frameLocator('#type-frame').locator('html').getAttribute('data-selected-agent'),'claude-code');
  // A deliberate hover warms a cold tab despite other background work staying paused.
  assert.equal(await page.locator('#branding-frame').getAttribute('srcdoc'),null);
  await page.locator('[data-tab=branding]').dispatchEvent('pointerenter',{pointerType:'mouse'});
  await page.waitForFunction(()=>document.getElementById('branding-frame').hasAttribute('srcdoc'));
  await page.locator('[data-tab=branding]').dispatchEvent('pointerleave');
  await page.locator('[data-tab=colours]').click();
  const reads=await page.evaluate(()=>canvasReads);
  assert.equal(reads,1,'all swatches use one pixel read');
  const dark=await page.locator('[data-token="--page"] small').textContent();
  await choose('theme','light');
  assert.notEqual(await page.locator('[data-token="--page"] small').textContent(),dark);
  await choose('theme','dark');
  assert.equal(await page.evaluate(()=>canvasReads),reads+1,'returning palette reuses cached swatches');
  // Hold a pointer: no cold frame can be created until release, even after a long pause.
  await page.evaluate(()=>{clearInterval(keepBusy);document.dispatchEvent(new Event('pointerdown'));});
  const beforeHold=await page.locator('iframe[srcdoc]').count();await page.waitForTimeout(900);
  assert.equal(await page.locator('iframe[srcdoc]').count(),beforeHold);
  await page.evaluate(()=>document.dispatchEvent(new Event('pointerup')));
  await page.waitForFunction(()=>[...document.querySelectorAll('iframe[data-srcdoc]')].every(frame=>frame.hasAttribute('srcdoc')&&!frame.style.visibility),null,{timeout:15000});
  // Every warmed frame catches the latest palette, and activating each tab stays usable.
  for(const tab of ['components','branding','discovery','typography','focus','blocks','icons','errors','url-reference']){
   await page.locator('[data-tab="'+tab+'"]').click();
   await page.waitForFunction(()=>[...document.querySelectorAll('[data-panel]:not([hidden]) iframe')].every(frame=>!frame.style.visibility));
   for(const frame of await page.locator('[data-panel]:not([hidden]) iframe').elementHandles()){
    const doc=await frame.contentFrame();assert.equal(await doc.locator('html').getAttribute('data-theme'),'dark');assert.equal(await doc.locator('html').getAttribute('data-selected-agent'),'claude-code');
   }
  }
  await page.locator('[data-tab=focus]').click();
  const selection=()=>page.frameLocator('#focus-frame').locator('.selection-preview').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('style')));
  await page.waitForFunction(()=>!document.getElementById('focus-frame').style.visibility);
  const originalSelection=await selection();
  await choose('agent','codex');await page.waitForFunction(()=>!document.getElementById('focus-frame').style.visibility);
  assert.notDeepEqual(await selection(),originalSelection,'focus captures follow agent colours');
  await choose('agent','claude-code');await page.waitForFunction(()=>!document.getElementById('focus-frame').style.visibility);
  assert.deepEqual(await selection(),originalSelection,'cached focus palette can be revisited');
  assert.deepEqual(errors,[]);console.log('PASS scheduling at '+width+'px: cold tabs, latest state, capture gating, hover warming, pointer hold, idle catch-up, palette cache');
  await page.close();
 }
 // Measure frame stalls under the same CPU slowdown used in the investigation.
 if(!process.env.SKIP_PERF){
 const page=await browser.newPage({viewport:{width:1440,height:900}}),cdp=await page.context().newCDPSession(page);
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await page.goto(origin+'/component-playground');await page.frameLocator('#resources-frame').locator('h1').waitFor();
 await page.waitForFunction(()=>[...document.querySelectorAll('iframe[data-srcdoc]')].every(frame=>frame.hasAttribute('srcdoc')&&!frame.style.visibility),null,{timeout:20000});
 await page.evaluate(()=>{window.busy=setInterval(()=>document.dispatchEvent(new Event('pointermove')),60);});await page.waitForTimeout(1500);
 for(const id of ['agent','theme','width','hover']){
  const result=await page.evaluate(async id=>{
   const gaps=[];let last=performance.now(),running=true;
   const tick=t=>{gaps.push(t-last);last=t;if(running)requestAnimationFrame(tick);};requestAnimationFrame(tick);
   document.querySelectorAll('#'+id+' input')[1].click();await new Promise(resolve=>setTimeout(resolve,700));running=false;
   return {id,maxGap:Math.round(Math.max(...gaps))};
  },id);
  console.log(JSON.stringify(result));assert.ok(result.maxGap<150,'no original 180–250ms animation stall for '+id);
 }
 await page.close();
 }
 // Idle API fallback must still load inactive tabs.
 const fallback=await browser.newPage();await fallback.addInitScript(()=>{window.requestIdleCallback=undefined;window.cancelIdleCallback=undefined;});await fallback.goto(origin+'/component-playground');
 await fallback.waitForFunction(()=>[...document.querySelectorAll('iframe[data-srcdoc]')].every(frame=>frame.hasAttribute('srcdoc')&&!frame.style.visibility),null,{timeout:20000});await fallback.close();
 console.log('PASS: '+(process.env.SKIP_PERF?'idle fallback (timing check skipped)':'throttled animation budget and idle fallback'));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

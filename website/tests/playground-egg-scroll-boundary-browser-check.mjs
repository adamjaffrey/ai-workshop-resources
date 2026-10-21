import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {headingMetrics} from '../lib/workshop-heading-metrics.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await p.goto('http://127.0.0.1:'+server.address().port+'/component-playground/easter-egg');
 await p.locator('#discovery-frame').scrollIntoViewIfNeeded();const f=await(await p.locator('#discovery-frame').elementHandle()).contentFrame();
 await f.waitForSelector('.step-row:last-child .step-anchor');
 for(const width of [390,660,661,940,1440])for(const expanded of [false,true]){
  await p.setViewportSize({width,height:1000});
  if(expanded)await p.locator('#discovery-preview .preview-expand').click();
  await p.waitForTimeout(800);
  await f.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  const state=await f.evaluate(fn=>{const h=document.querySelector('.step-row:last-child .step-anchor'),metrics=eval('('+fn+')')(h,h.querySelector('.step-anchor-label').textContent);return {width:innerWidth,gap:h.getBoundingClientRect().top+metrics.top-Math.max(...[...document.querySelectorAll('[data-sticky-control]')].map(e=>e.getBoundingClientRect().bottom)),hash:location.hash,y:scrollY};},headingMetrics.toString());
  assert.ok(Math.abs(state.gap-(state.width<=660?30:60))<.5,JSON.stringify(state));assert.equal(state.y,0);assert.equal(state.hash,'');
  await f.evaluate(()=>scrollTo(0,80));await p.waitForTimeout(50);assert.ok(await f.evaluate(()=>scrollY)>0,'Can scroll away from top without anchor snapping');
  console.log('PASS',width,{expanded,...state});
  if(expanded)await p.keyboard.press('Escape');
 }
}finally{await browser.close();server.close();}

import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [320,390,768,1440]){
 await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:'+server.address().port+'/playground');await page.waitForTimeout(300);
 for(const tab of await page.locator('[data-tab]').all()){
  await tab.click();await page.waitForTimeout(100);
  const failures=await page.evaluate(()=>{const errors=[];for(const el of document.querySelectorAll('.choices,.panel-actions,.control-footer,.state-tools,.checkbox-controls')){if(!el.getClientRects().length)continue;const s=getComputedStyle(el);if(el.matches('.choices')){if(getComputedStyle(el.querySelector('legend')).marginBottom!=='16px')errors.push(el.id+' label gap');}else if(el.matches('.panel-actions')){if(s.columnGap!=='8px')errors.push('action gap');}else if(s.columnGap!=='24px'||s.rowGap!=='32px')errors.push(el.className+' '+s.gap);}return errors;});assert.deepEqual(failures,[],width+' spacing');
  for(const rail of await page.locator('.choice-options:visible,nav[role=tablist]').all()){
   assert.equal(await rail.evaluate(e=>getComputedStyle(e).overflowY),'hidden');await rail.evaluate(e=>e.scrollTop=100);await page.waitForTimeout(20);assert.equal(await rail.evaluate(e=>e.scrollTop),0);
  }
  const nav=page.locator('nav[role=tablist]');
  if(await nav.evaluate(e=>e.scrollWidth-e.clientWidth>80)){
   const read=()=>nav.evaluate(e=>({a:Number(e.style.getPropertyValue('--overflow-left-alpha')),mask:getComputedStyle(e).maskImage,bottom:e.hasAttribute('data-overflow-bottom')}));
   await nav.evaluate(e=>e.scrollLeft=0);await page.waitForTimeout(50);assert.equal((await read()).a,1);
   await nav.evaluate(e=>e.scrollLeft=8);await page.waitForTimeout(50);const near=await read();assert.ok(near.a>0&&near.a<1);assert.equal(near.bottom,false);assert.notEqual(near.mask,'none');
   await nav.evaluate(e=>e.scrollLeft=40);await page.waitForTimeout(50);assert.equal((await read()).a,0);
   await nav.evaluate(e=>e.scrollLeft=8);await page.waitForTimeout(50);assert.equal((await read()).a,0,'fade stays strong approaching edge');
   await nav.evaluate(e=>e.scrollLeft=0);await page.waitForTimeout(50);assert.equal((await read()).a,1,'snap out at edge');
  }
 }
 if(width<=660){await page.locator('body>#style-options').click();await page.waitForTimeout(300);}
 const explainer=page.locator('.hover-explainer');assert.equal(await explainer.evaluate(e=>getComputedStyle(e).fontSize),'14px');await explainer.click();assert.ok(await page.locator('#hover-explanation').isVisible());assert.equal(await page.locator('#hover-explanation').evaluate(e=>getComputedStyle(e).fontSize),'14px');
 const aligned=await explainer.evaluate(e=>{const a=e.querySelector('svg').getBoundingClientRect(),b=e.querySelector('span').getBoundingClientRect();return Math.abs(a.top+a.height/2-b.top-b.height/2)<1;});assert.ok(aligned);
 await explainer.click();assert.ok(await page.locator('#hover-explanation').isHidden());
 if(width===390)await page.screenshot({path:'/tmp/playground-control-rhythm-mobile.png'});
 if(width<=660){await page.keyboard.press('Escape');await page.waitForTimeout(300);}
 if(width===1440){await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(300);await page.screenshot({path:'/tmp/playground-control-rhythm-desktop.png'});}
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
}
assert.deepEqual(errors,[]);console.log('PASS: all nine tabs at four widths, control spacing, horizontal-only rails, distance-based fades, endpoint removal and hover explainer');
}finally{await browser.close();server.close();}

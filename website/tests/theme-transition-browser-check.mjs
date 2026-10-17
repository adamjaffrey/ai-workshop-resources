import assert from 'node:assert/strict';
import {once} from 'node:events';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:390,height:844},colorScheme:'light',reducedMotion:'no-preference'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const origin='http://127.0.0.1:'+server.address().port;
 const flip=()=>page.locator('.theme-toggle:not(.ph-static) button').first().evaluate(e=>e.click());
 const settled=()=>page.waitForFunction(()=>!document.documentElement.classList.contains('theme-reveal'));
 for(const unlocked of [false,true]) {
  if(!unlocked)await page.goto(origin);
  else {await page.locator('#workshop-password').fill(password);await page.getByRole('button',{name:'Unlock Resources',exact:true}).click();await page.locator('#access-gate').waitFor({state:'detached'});}
  for(const width of [390,1440]) {
   await page.setViewportSize({width,height:844});
   const initial=await page.locator('html').getAttribute('data-theme');await flip();
   await page.waitForFunction(()=>document.getAnimations().some(a=>a.animationName==='theme-circle'));
   const circle=await page.evaluate(()=>{
    const a=document.getAnimations().find(a=>a.animationName==='theme-circle');
    return {duration:a.effect.getTiming().duration,frames:a.effect.getKeyframes().map(f=>f.clipPath),radius:parseFloat(document.documentElement.style.getPropertyValue('--reveal-radius'))};
   });
   assert.equal(circle.duration,420);assert.ok(circle.frames[0].startsWith('circle(0px'));assert.ok(circle.radius>=422);
   await settled();assert.notEqual(await page.locator('html').getAttribute('data-theme'),initial);
   await flip();await page.waitForTimeout(25);await flip();await page.waitForTimeout(25);await flip();await settled();
   assert.equal(await page.locator('html').getAttribute('data-theme'),initial);
  }
  await page.reload();assert.equal(await page.locator('html').evaluate(e=>e.getAnimations().length),0);assert.equal(await page.locator('html').getAttribute('class').then(v=>(v||'').includes('theme-reveal')),false);
  if(unlocked){
   const card=page.locator('article').first();const before=await card.evaluate(e=>getComputedStyle(e).backgroundColor);
   await page.evaluate(()=>window.workshopAgent.select('claude-code'));
   assert.equal(await card.evaluate(e=>e.getAnimations().find(a=>a.effect.getKeyframes().some(f=>'backgroundColor' in f)).effect.getTiming().duration),280);
   await page.waitForTimeout(80);const middle=await card.evaluate(e=>getComputedStyle(e).backgroundColor);await page.waitForTimeout(250);const after=await card.evaluate(e=>getComputedStyle(e).backgroundColor);
   assert.notEqual(before,middle);assert.notEqual(after,middle);
   await page.reload();assert.equal(await page.locator('html').getAttribute('data-selected-agent'),'claude-code');assert.equal(await card.evaluate(e=>e.getAnimations().filter(a=>a.effect.getKeyframes().some(f=>'backgroundColor' in f)).length),0);
  }
  await page.emulateMedia({reducedMotion:'reduce'});await flip();assert.equal(await page.locator('html').evaluate(e=>e.getAnimations().length),0);
  await page.evaluate(()=>window.workshopAgent.select('codex'));assert.equal(await page.locator('html').evaluate(e=>e.classList.contains('theme-reveal')),false);
  await page.emulateMedia({reducedMotion:'no-preference'});
 }
 // Feature-detection fallback preserves a soft theme transition.
 await page.evaluate(()=>document.startViewTransition=undefined);await flip();
 assert.equal(await page.locator('html').evaluate(e=>e.getAnimations()[0].effect.getTiming().duration),280);
 assert.deepEqual(errors,[]);
 console.log('PASS: circular theme reveals on both pages at mobile/desktop widths, rapid toggles, soft agent colours, instant saved preferences, reduced motion and fallback');
} finally {await browser.close();await new Promise(r=>server.close(r));}

import assert from 'node:assert/strict';
import {once} from 'node:events';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:390,height:844},colorScheme:'light',reducedMotion:'no-preference'});
 const origin='http://127.0.0.1:'+server.address().port;
 const bg=()=>page.locator('html').evaluate(e=>getComputedStyle(e).backgroundColor);
 const flip=()=>page.locator('.theme-toggle:not(.ph-static) button').first().evaluate(e=>e.click());
 for(const unlocked of [false,true]) {
  if(!unlocked)await page.goto(origin);
  else {await page.locator('#workshop-password').fill(password);await page.getByRole('button',{name:'Unlock Resources',exact:true}).click();await page.locator('#access-gate').waitFor({state:'detached'});}
  await page.waitForTimeout(350);
  const initial=await bg();await flip();
  const animation=await page.locator('html').evaluate(e=>e.getAnimations().find(a=>a.effect.getKeyframes().some(f=>'backgroundColor' in f))?.effect.getTiming().duration);
  assert.equal(animation,280);
  await page.waitForTimeout(100);const middle=await bg();await page.waitForTimeout(220);const end=await bg();
  assert.notEqual(initial,end);assert.notEqual(middle,initial);assert.notEqual(middle,end);
  await flip();await page.waitForTimeout(50);await flip();await page.waitForTimeout(350);assert.equal(await bg(),end);
  await page.reload();assert.equal(await bg(),end);assert.equal(await page.locator('html').evaluate(e=>e.getAnimations().length),0);
  await page.emulateMedia({reducedMotion:'reduce'});await flip();assert.equal(await page.locator('html').evaluate(e=>e.getAnimations().length),0);assert.equal(await bg(),initial);
  await page.emulateMedia({reducedMotion:'no-preference'});
 }
 console.log('PASS: login/main colour interpolation, 280ms timing, rapid reversal, saved-theme reload without animation, and reduced motion');
} finally {await browser.close();await new Promise(r=>server.close(r));}

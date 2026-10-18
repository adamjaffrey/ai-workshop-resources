import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const context=await browser.newContext();await context.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,768,1440])for(const agent of ['codex','claude-code']){
  await page.setViewportSize({width,height:900});await page.goto(origin);await page.evaluate(a=>{window.workshopAgent.select(a);window.dispatchEvent(new StorageEvent('storage',{key:'workshop-colour-theme',newValue:'light'}));},agent);
  await page.waitForTimeout(450);await page.locator('[data-theme-choice=dark]').click();await page.waitForTimeout(1500);
  assert.equal(await page.evaluate(()=>window.workshopPerspective.state),'locked','toggling above clue cannot qualify');
  await page.locator('.perspective').scrollIntoViewIfNeeded();await page.waitForTimeout(1200);
  assert.deepEqual(await page.evaluate(()=>window.workshopPerspective.seen),['dark']);
  const before=await page.locator('.perspective').boundingBox();
  await page.locator('[data-theme-choice=light]').click();await page.waitForTimeout(150);
  assert.equal(await page.evaluate(()=>window.workshopPerspective.state),'locked','transition cannot qualify');
  await page.waitForFunction(()=>window.workshopPerspective.state==='ready');
  const after=await page.locator('.perspective').boundingBox();assert.deepEqual(after,before,'theme preserves resting geometry');
  const geometry=await page.evaluate(()=>{const e=document.querySelector('.perspective-ellipsis').getBoundingClientRect(),t=document.querySelector('.theme-toggle').getBoundingClientRect();return {centre:e.x+e.width/2,width:innerWidth,toggleTop:t.top,overflow:document.documentElement.scrollWidth>innerWidth};});
  assert.ok(Math.abs(geometry.centre-width/2)<1,'ellipsis centred');assert.ok(geometry.toggleTop>=0&&geometry.toggleTop<60,'persistent toggle');assert.equal(geometry.overflow,false);
  await page.locator('.perspective-discover').hover();await page.waitForTimeout(50);assert.ok(Number(await page.locator('.perspective-discover svg').evaluate(e=>getComputedStyle(e).opacity))>0);
  await page.locator('.perspective-discover').click();await page.waitForFunction(()=>window.workshopPerspective.state==='complete');await page.locator('.perspective-dialog').waitFor({state:'visible'});
  assert.equal(await page.evaluate(()=>document.activeElement.id),'perspective-title');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Keep Exploring');
  await page.keyboard.press('Escape');await page.waitForFunction(()=>document.activeElement.className==='perspective-discover');assert.equal(await page.evaluate(()=>document.activeElement.className),'perspective-discover');
 }
 // Reduced motion and touch use the same gate and action without timing gestures.
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.locator('.perspective').scrollIntoViewIfNeeded();await page.waitForTimeout(1100);await page.locator('[data-theme-choice=dark]').click();await page.waitForFunction(()=>window.workshopPerspective.state==='ready');
 assert.ok(Number(await page.locator('.perspective-discover svg').evaluate(e=>getComputedStyle(e).opacity))>0);await page.locator('.perspective-discover').click();await page.locator('.perspective-dialog').waitFor({state:'visible'});
 assert.deepEqual(errors,[]);console.log('Perspective layout, qualification, reveal, hover, modal focus and reduced motion passed across 8 width/agent combinations.');
 await page.screenshot({path:'/tmp/perspective-dialog.png'});
}finally{await browser.close();await new Promise(r=>server.close(r));}

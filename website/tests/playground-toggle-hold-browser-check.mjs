import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),base='http://127.0.0.1:'+server.address().port,errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(base+'/playground/icons');
  for(const value of ['lucide','lobe','all','lucide']){
   const label=page.locator('#icon-filter input[value='+value+']').locator('..');await label.scrollIntoViewIfNeeded();const r=await label.boundingBox();await page.mouse.move(r.x+r.width/2,r.y+r.height/2);await page.mouse.down();await page.waitForTimeout(190);
   assert.ok(await page.locator('#icon-filter .toggle-indicator').evaluate(e=>e.getAnimations().some(a=>a.effect.getTiming().fill==='forwards')),'repeat hold remains active '+width+' '+value);
   await page.mouse.up();assert.ok(await label.locator('input').isChecked());assert.equal(await label.locator('span').evaluate(e=>getComputedStyle(e).outlineStyle),'none');await page.waitForTimeout(20);
  }
  await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');assert.equal(await page.locator('#icon-filter .workshop-group-ring').evaluate(e=>getComputedStyle(e).display),'block');
  await page.locator('#icon-filter input[value=lobe]').locator('..').click();assert.equal(await page.locator('#icon-filter input:checked+span').evaluate(e=>getComputedStyle(e).outlineStyle),'none');
  await page.locator('[data-tab=discovery]').click();const frame=page.frameLocator('#discovery-frame');await page.locator('#discovery-frame').scrollIntoViewIfNeeded();await page.waitForTimeout(600);
  for(const top of [0,10000,0]){await frame.locator('body').evaluate((_,top)=>scrollTo(0,top),top);await page.waitForTimeout(150);const positions=await frame.locator('.controls .toggle,.page-toolbar .theme-toggle').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().top));assert.ok(positions.every(y=>Math.abs(y-24)<.1),JSON.stringify(positions));}
 }
 const touch=await browser.newPage({viewport:{width:390,height:900},hasTouch:true});await touch.goto(base+'/playground/icons');await touch.locator('#icon-filter input[value=lobe]').locator('..').tap();assert.equal(await touch.locator('#icon-filter input:checked+span').evaluate(e=>getComputedStyle(e).outlineStyle),'none');await touch.close();
 assert.deepEqual(errors,[]);console.log('PASS: repeated holds, mouse/touch ring suppression, Tab rings, and permanently pinned Easter Egg selectors through scroll at mobile/desktop widths');
}finally{await browser.close();server.close();}

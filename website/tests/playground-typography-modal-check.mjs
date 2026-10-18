import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+server.address().port+'/playground');
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});await page.click('[data-tab=typography]');await page.waitForTimeout(900);
  const type=page.frameLocator('#type-frame');assert.equal(await type.locator('.button-variant').count(),6);for(const variant of await type.locator('.button-variant').all())assert.ok((await variant.locator('output').textContent()).includes(await variant.locator('.copy-label').evaluate(e=>getComputedStyle(e).color)));assert.equal(await type.locator('.notice-type-row').count(),2);
  for(const row of await type.locator('.feedback-row').all()){assert.match(await row.locator('.sample-label').textContent(),/Overlay Panel Text/);assert.match(await row.locator('output').textContent(),/^Overlay message only/);}
  assert.equal(await type.locator('#type-specimens > :last-child').evaluate(e=>getComputedStyle(e).paddingBottom),'0px');assert.equal(await type.locator('#type-specimens > :last-child > :last-child').evaluate(e=>getComputedStyle(e).marginBottom),'0px');assert.equal(await type.locator('#undefined-headings').count(),0);assert.equal(await page.locator('#unused-text-styles li').count(),5);
  if(width===1440)for(const selector of ['.copy','.qr-copy']){const cells=await type.locator('[data-source-selector="'+selector+'"] .button-variant').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().top));assert.ok(Math.max(...cells)-Math.min(...cells)<1);}
  await page.click('[data-tab=errors]');await page.waitForTimeout(800);const status=page.frameLocator('#errors-frame');
  const states=await status.locator('#errors-login .icon-row').evaluateAll(es=>es.map(e=>e.dataset.state));assert.equal(states.at(-2),'retryReady');
  for(const node of await status.locator('.error-sample>.code-wrap').all())assert.ok(await node.evaluate(e=>e.getBoundingClientRect().width)<600);
  for(const toggle of await status.locator('.full-login-context .theme-toggle').all())assert.equal(await toggle.evaluate(e=>{const i=e.querySelector('.toggle-indicator').getBoundingClientRect(),s=e.querySelector('[aria-pressed=true]').getBoundingClientRect();return Math.abs(i.left-s.left)<1.5&&Math.abs(i.width-s.width)<1.5;}),true,'Indicator follows selected button');
 }
 await page.click('[data-tab=icons]');await page.locator('.feather-notice summary').click();assert.equal(await page.locator('.licence-text').evaluate(e=>e.scrollHeight<=e.clientHeight+1&&getComputedStyle(e).overflowY==='visible'),true);
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,300));const scroll=await page.evaluate(()=>scrollY);await page.click('#style-options');await page.waitForTimeout(300);
 assert.equal(await page.locator('#style-dialog').evaluate(e=>e.matches(':modal')),true);assert.equal(await page.locator('#style-dialog-title').evaluate(e=>document.activeElement===e),true);
 await page.keyboard.press('Tab');assert.equal(await page.locator('#style-options').evaluate(e=>document.activeElement===e),true);
 await page.mouse.move(5,700);await page.mouse.wheel(0,500);await page.waitForTimeout(150);assert.equal(await page.locator('body').evaluate(e=>getComputedStyle(e).position),'fixed');
 await page.evaluate(()=>{window.backgroundClicks=0;document.querySelector('main').addEventListener('click',()=>window.backgroundClicks++);});await page.mouse.click(5,700);await page.waitForTimeout(300);
 assert.equal(await page.locator('#style-dialog').evaluate(e=>e.open),false);assert.equal(await page.evaluate(()=>window.backgroundClicks),0);assert.equal(await page.evaluate(()=>scrollY),scroll);assert.equal(await page.locator('#style-options').evaluate(e=>document.activeElement===e),true);
 await page.click('#style-options');await page.waitForTimeout(280);await page.keyboard.press('Escape');await page.waitForTimeout(280);assert.equal(await page.locator('#style-dialog').evaluate(e=>e.open),false);
 await page.click('[data-tab=typography]');await page.screenshot({path:'/tmp/typography-refined-mobile.png'});assert.deepEqual(errors,[]);console.log('PASS: copy variants, overlay labels, notice typography, unused categories, bounded status panels, theme indicators, licence container and modal dismissal/focus/scroll lock');
}finally{await browser.close();server.close();}

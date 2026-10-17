import assert from 'node:assert/strict';
import {once} from 'node:events';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const origin='http://127.0.0.1:'+server.address().port;
 await page.goto(origin);
 const cursors=async()=>assert.deepEqual(await page.locator('button:visible:enabled, .segmented-toggle:visible').evaluateAll(es=>es.filter(e=>getComputedStyle(e).cursor!=='pointer').map(e=>e.outerHTML)),[]);
 await cursors();
 await page.locator('#workshop-password').fill(password);
 await page.getByRole('button',{name:'Unlock Resources',exact:true}).click();
 await page.locator('#access-gate').waitFor({state:'detached'});
 await cursors();
 const qr=page.locator('.qr-copy');
 assert.equal(await qr.locator('img').getAttribute('src'),'/assets/workshop-resources-qr.png');
 assert.equal(await qr.locator('.qr-copy-overlay').evaluate(e=>getComputedStyle(e).opacity),'0');
 const bounds=await qr.evaluate(e=>{const a=e.querySelector('img').getBoundingClientRect(),b=e.querySelector('.qr-copy-overlay').getBoundingClientRect();return ['top','right','bottom','left'].map(k=>Math.abs(a[k]-b[k]));});
 assert.ok(bounds.every(v=>v<.01));
 await qr.hover();assert.equal(await qr.locator('.qr-copy-overlay').evaluate(e=>getComputedStyle(e).opacity),'1');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>window.copiedURL=text}}));
 await qr.click();assert.equal(await page.evaluate(()=>window.copiedURL),'https://ai-workshop-resources.adamjaffrey.chatgpt.site/');
 await page.getByText('Link Copied',{exact:true}).waitFor();
 assert.equal(await qr.locator('.success-icon').isVisible(),true);
 assert.equal(await qr.locator('.copy-icon').isVisible(),false);
 assert.equal(await qr.evaluate(e=>getComputedStyle(e).color),await page.locator('[data-copy]').first().evaluate(e=>{e.dataset.copied='true';return getComputedStyle(e).color;}));
 assert.equal(page.url(),origin+'/');
 await page.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:undefined});document.execCommand=command=>{window.fallbackURL=document.activeElement.value;return command==='copy';};});
 await qr.click();assert.equal(await page.evaluate(()=>window.fallbackURL),'https://ai-workshop-resources.adamjaffrey.chatgpt.site/');
 assert.equal(await qr.evaluate(e=>document.activeElement===e),true);
 await page.emulateMedia({reducedMotion:'no-preference'});
 await qr.click();
 assert.equal(await qr.locator('.copy-content').evaluate(e=>e.getAnimations()[0].effect.getTiming().duration),180);
 await page.waitForTimeout(5050);
 assert.equal(await qr.locator('.copy-content').evaluate(e=>e.getAnimations()[0].effect.getTiming().duration),650);
 await page.waitForTimeout(700);
 assert.equal(await qr.locator('.copy-label').textContent(),'Copy Link');
 // With the pointer gone, text and background share one exit animation.
 await qr.click();await page.mouse.move(0,0);
 await page.waitForTimeout(5050);
 const exit=await qr.locator('.qr-copy-overlay').evaluate(e=>{const a=e.getAnimations()[0];return {duration:a.effect.getTiming().duration,easing:a.effect.getTiming().easing,opacity:getComputedStyle(e).opacity};});
 assert.equal(exit.duration,650);assert.equal(exit.easing,'ease-in-out');assert.ok(Number(exit.opacity)<1);
 assert.equal(await qr.locator('.copy-content').evaluate(e=>e.getAnimations().length),0);
 await page.waitForTimeout(700);
 assert.equal(await qr.locator('.qr-copy-overlay').evaluate(e=>getComputedStyle(e).opacity),'0');
 for (const button of await page.locator('[data-copy]').all()) {
   await button.click();assert.equal(await button.locator('.copy-label').textContent(),'Prompt Copied');
 }
 await qr.scrollIntoViewIfNeeded();
 await page.evaluate(()=>document.execCommand=()=>false);await qr.click();await page.getByText('Copy Failed',{exact:true}).waitFor();
 for(const width of [1440,390]){await page.setViewportSize({width,height:844});for(const selector of width===1440?['.qr-copy','[data-copy]']:['[data-copy]']){const button=page.locator(selector).first();await button.click();await page.waitForTimeout(220);assert.equal(await button.locator('.copy-label').textContent(),'Copy Failed');assert.equal(await button.locator('.error-icon').isVisible(),true);assert.equal(await button.locator('.copy-icon').isVisible(),false);assert.equal(await button.locator('.success-icon').isVisible(),false);assert.equal(await button.locator('.error-icon').evaluate(e=>getComputedStyle(e).color),await button.evaluate(e=>getComputedStyle(e).color));}}await cursors();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 console.log('QR Copy Link, fallback, error feedback, focus and pointer cursors passed');
} finally {await browser.close();server.close();}

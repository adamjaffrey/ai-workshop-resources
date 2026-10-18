import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:390,height:700}});
 await page.goto('http://127.0.0.1:'+server.address().port+'/style-guide');
 const tabs=page.locator('nav[role=tablist]');await page.waitForFunction(()=>document.querySelector('nav').hasAttribute('data-overflow-right'));
 assert.notEqual(await tabs.evaluate(e=>getComputedStyle(e).maskImage),'none');
 await tabs.evaluate(e=>e.scrollLeft=e.scrollWidth);await page.waitForFunction(()=>!document.querySelector('nav').hasAttribute('data-overflow-right'));
 await page.locator('#login-preview .preview-expand').click();await page.locator('#login-preview .preview-settings summary').click();
 const controls=page.locator('#global-style-controls');await page.waitForFunction(()=>document.querySelector('#global-style-controls').hasAttribute('data-overflow-bottom'));
 await controls.evaluate(e=>e.scrollTop=e.scrollHeight);await page.waitForFunction(()=>!document.querySelector('#global-style-controls').hasAttribute('data-overflow-bottom'));
 await controls.evaluate(e=>e.scrollTop=0);await page.waitForTimeout(50);
 await page.screenshot({path:'/tmp/playground-overflow-fades.png'});
 await page.keyboard.press('Escape');await page.setViewportSize({width:1440,height:1000});await page.waitForTimeout(100);
 assert.equal(await tabs.getAttribute('data-overflow-right'),null);
 console.log('PASS: horizontal/vertical overflow fades appear only with remaining content and clear at the edge or after resize');
}finally{await browser.close();server.close();}

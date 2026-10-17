import assert from 'node:assert/strict';
import {once} from 'node:events';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'no-preference'});
 const page=await context.newPage();await page.goto('http://127.0.0.1:'+server.address().port);
 assert.equal(await page.locator('.gate-submit').evaluate(e=>getComputedStyle(e).userSelect),'none');
 await page.locator('#workshop-password').fill(password);await page.getByRole('button',{name:'Unlock Resources',exact:true}).click();await page.locator('#access-gate').waitFor({state:'detached'});
 for(const selector of ['.toggle button','.copy','footer button']){
  const button=page.locator(selector).first();await button.scrollIntoViewIfNeeded();await page.waitForTimeout(800);
  assert.equal(await button.evaluate(e=>getComputedStyle(e).userSelect),'none');
  assert.equal(await button.locator('svg').first().evaluate(e=>getComputedStyle(e).userSelect),'none');
 }
 const copy=page.locator('.copy').first();await copy.scrollIntoViewIfNeeded();
 await copy.evaluate(e=>{window.copyClicks=0;e.addEventListener('click',()=>window.copyClicks++);});
 const box=await copy.boundingBox();const cdp=await context.newCDPSession(page);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:box.x+box.width/2,y:box.y+box.height/2}]});await page.waitForTimeout(650);
 assert.equal(await page.evaluate(()=>window.copyClicks),0);
 assert.equal(await copy.evaluate(e=>getComputedStyle(e).scale),'0.97');
 assert.equal(await page.evaluate(()=>getSelection().toString()),'');
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 assert.equal(await page.evaluate(()=>window.copyClicks),1);
 await page.waitForTimeout(600);assert.equal(await copy.evaluate(e=>getComputedStyle(e).scale),'none');
 assert.equal(await page.locator('pre').first().evaluate(e=>getComputedStyle(e).userSelect),'text');
 assert.notEqual(await page.locator('.intro').evaluate(e=>getComputedStyle(e).userSelect),'none');
 await page.locator('pre').first().evaluate(e=>{const r=document.createRange();r.selectNodeContents(e);getSelection().removeAllRanges();getSelection().addRange(r);});
 assert.ok((await page.evaluate(()=>getSelection().toString())).length>20);
 await page.evaluate(()=>getSelection().removeAllRanges());
 await page.emulateMedia({reducedMotion:'reduce'});await copy.focus();await page.keyboard.down('Space');
 assert.equal(await copy.evaluate(e=>getComputedStyle(e).scale),'none');
 assert.notEqual(await copy.evaluate(e=>getComputedStyle(e).boxShadow),'none');
 await page.keyboard.up('Space');assert.equal(await page.evaluate(()=>window.copyClicks),2);
 console.log('PASS: button/child selection disabled, touch hold feedback and release activation, selectable prompt/body text, keyboard activation and reduced motion');
} finally {await browser.close();await new Promise(r=>server.close(r));}

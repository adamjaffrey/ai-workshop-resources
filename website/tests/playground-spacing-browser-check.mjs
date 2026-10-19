import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [320,390,768,1440]){
 await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:'+server.address().port+'/playground/icons');await page.waitForTimeout(400);
 const button=page.locator(width<=660?'body>#style-options':'#back-to-top');
 const rect=await button.boundingBox();assert.equal(rect.y,43);assert.equal(width-rect.x-rect.width,Math.max(24,(width-1080)/2));
 assert.equal(await page.locator('header.wrap').evaluate(e=>e.clientWidth),Math.min(1080,width-48));
 assert.equal(await page.locator('.control-footer').first().evaluate(e=>getComputedStyle(e).marginTop),'32px');
 assert.equal(await page.locator('#icon-filter legend').evaluate(e=>getComputedStyle(e).marginBottom),'16px');
 assert.equal(await page.locator('.panel>p').first().evaluate(e=>getComputedStyle(e).maxWidth),'none');
 assert.equal(await page.locator('summary:not(:has(svg[data-icon-name="chevron-right"]))').count(),0);
 await page.evaluate(()=>scrollTo(0,300));await page.waitForTimeout(100);assert.equal((await button.boundingBox()).y,24);
 if(width<=660){await button.click();await page.waitForTimeout(300);const box=await page.locator('#style-dialog').boundingBox();assert.equal(box.x,24);assert.equal(box.y,24);assert.equal(box.width,width-48);assert.equal(await page.evaluate(()=>document.activeElement.id),'style-dialog-title');await page.keyboard.press('Escape');await page.waitForTimeout(300);assert.equal(await page.locator('#style-dialog').evaluate(e=>e.open),false);}
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
}assert.deepEqual(errors,[]);console.log('PASS: group spacing, content width, full-width copy, Lucide disclosures, floating alignment and popover bounds/focus at four widths');
}finally{await browser.close();server.close();}

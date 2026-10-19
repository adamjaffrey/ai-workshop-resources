import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {resourcePage} from '../lib/workshop-resource-page.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}});await page.goto('http://127.0.0.1:'+server.address().port+'/playground');await page.locator('[data-tab=focus]').click();const f=page.frameLocator('#focus-frame');await f.locator('.focus-row').last().waitFor();
 const source=await browser.newPage({viewport:{width:1440,height:900}});await source.setContent(resourcePage.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,''));
 const geometry=e=>{const c=getComputedStyle(e),r=e.getBoundingClientRect();return [r.width,r.height,c.display,c.gap,c.alignItems,c.borderRadius];};
 assert.deepEqual(await f.locator('.qr-copy img').evaluate(geometry),await source.locator('.qr-copy img').evaluate(geometry));
 assert.deepEqual(await f.locator('footer form[action="/auth/logout"] button').evaluate(geometry),await source.locator('footer form[action="/auth/logout"] button').evaluate(geometry));
 const qr=await f.locator('.qr-copy').boundingBox(),overlay=await f.locator('.qr-copy-overlay').boundingBox();assert.equal(qr.width,overlay.width);assert.equal(qr.height,overlay.height);
 assert.equal(await f.locator('.selection-preview').count(),6);
 for(const width of [390,1440]){await page.setViewportSize({width,height:900});
 for(const [theme,agent] of [['dark','claude-code'],['light','codex'],['dark','codex'],['light','claude-code']]){
 await page.evaluate(({theme,agent})=>{for(const [name,value] of Object.entries({theme,agent})){const e=document.querySelector('input[name="'+name+'"][value="'+value+'"]');e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}));}},{theme,agent});await page.waitForTimeout(1100);
 assert.equal(await f.locator('.theme-toggle [aria-pressed=true]').getAttribute('data-theme-choice'),theme);assert.equal(await f.locator('.toggle [data-agent][aria-pressed=true]').getAttribute('data-agent'),agent);
 assert.equal(await f.locator('.focus-row').count(),12);
 }
 }
 await page.locator('[data-tab=typography]').click();const t=page.frameLocator('#type-frame');await t.locator('.feedback-row').first().waitFor();assert.equal(await t.locator('.feedback-row').first().evaluate(e=>getComputedStyle(e).paddingTop),'24px');
 await page.locator('[data-tab=errors]').click();const e=page.frameLocator('#errors-frame');assert.equal(await e.locator('#errors-login .error-sample:has(.fallback-context)').evaluate(e=>getComputedStyle(e).borderTopWidth),'0px');assert.equal(await e.locator('#errors-resources .error-sample:has(.fallback-context)').evaluate(e=>getComputedStyle(e).borderTopWidth),'1px');
 for(const tab of ['typography','focus','errors']){await page.locator('[data-tab='+tab+']').click();await page.reload();assert.equal(await page.locator('[data-tab='+tab+']').getAttribute('aria-selected'),'true');assert.equal(await page.locator('[data-panel='+tab+']').isVisible(),true);}
 console.log('PASS: QR and logout match independent app geometry, overlays cover QR, only selectable highlights, reliable theme/agent capture, divider spacing and fallback boundary');
}finally{await browser.close();server.close();}

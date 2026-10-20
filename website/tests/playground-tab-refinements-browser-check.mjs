import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:'+server.address().port+'/component-playground/typography');await page.waitForTimeout(3000);
 await page.evaluate(()=>scrollTo(0,1200));await page.locator('#tab-url-reference').click();assert.equal(await page.evaluate(()=>scrollY),0);
 assert.match(await page.locator('.url-reference-intro').textContent(),/implementation authorities/);
 const sub=page.locator('.url-subsection').first(),button=sub.locator(':scope>.section-heading>button');await button.click();assert.equal(await button.getAttribute('aria-expanded'),'false');
 assert.equal(await sub.locator(':scope>:not(.section-heading):visible').count(),0);
 const parent=sub.locator('..'),parentButton=parent.locator(':scope>.section-heading>button');await parentButton.click();await parentButton.click();assert.equal(await button.getAttribute('aria-expanded'),'false');await button.click();assert.ok(await sub.locator(':scope>:not(.section-heading):visible').count()>0);
 await page.locator('#tab-components').click();assert.equal(await page.locator('#login-preview>.frame-wrap').evaluate(e=>getComputedStyle(e).padding),'0px');
 await page.locator('#tab-typography').click();await page.waitForTimeout(2000);
 const frame=page.frames().find(f=>f.name()==='type-frame')||await page.locator('#type-frame').elementHandle().then(e=>e.contentFrame());
 const widths=await frame.evaluate(()=>[...document.querySelectorAll('[data-source-selector="#workshop-password"],[data-source-selector=".gate-submit"]')].map(row=>({source:getComputedStyle(row).getPropertyValue('--source-width'),width:row.querySelector('.password-field,.gate-submit').getBoundingClientRect().width})));
 for(const w of widths){assert.ok(parseFloat(w.source)>0);assert.ok(w.width<=parseFloat(w.source)+1);}
 const notice=await frame.locator('.notice-type-row[data-page=resources]>div').evaluate(e=>({width:e.getBoundingClientRect().width,max:parseFloat(e.style.maxWidth)}));assert.ok(notice.max>0&&notice.width<=notice.max+1);
 const links=await page.locator('#link-type-frame').elementHandle().then(e=>e.contentFrame());assert.deepEqual(await links.locator('caption').evaluate(e=>{const c=getComputedStyle(e);return[c.fontSize,c.fontWeight,c.lineHeight]}),await links.locator('h3').first().evaluate(e=>{const c=getComputedStyle(e);return[c.fontSize,c.fontWeight,c.lineHeight]}));
 await page.locator('#tab-url-reference').click();await page.screenshot({path:'/tmp/playground-url-refinements.png'});
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,1800));await page.locator('#tab-components').click();assert.equal(await page.evaluate(()=>scrollY),0);await page.screenshot({path:'/tmp/playground-login-refinements.png'});
 console.log('Tab reset, nested disclosures, login edges and source widths passed.');
}finally{await browser.close();await new Promise(r=>server.close(r));}

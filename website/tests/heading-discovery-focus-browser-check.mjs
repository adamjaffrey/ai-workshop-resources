import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
try{for(const [name,engine] of Object.entries({chromium,webkit})){
 const browser=await engine.launch({headless:true,...(name==='chromium'?{channel:'chrome'}:{})});
 try{for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:900}});
 for(const route of ['/ai-workshop-resources','/component-playground']){
 await page.goto(origin+route);const link=page.locator('a.page-title-link').first();assert.equal(await link.getAttribute('href'),route);assert.equal(await link.getAttribute('data-no-link-decoration'),'');assert.equal(await link.evaluate(e=>e.tabIndex),1);await page.keyboard.press('Tab');await link.focus();assert.equal(await link.locator('.workshop-link-focus').evaluate(e=>getComputedStyle(e).opacity),'1');await link.press('Enter');await page.waitForURL(origin+route);
 }
 await page.locator('[data-tab=icons]').click();await page.waitForTimeout(500);
 const icons=await page.locator('.playground-icon-entry h3').evaluateAll(es=>es.filter(e=>e.getBoundingClientRect().width).map(e=>({font:parseFloat(getComputedStyle(e).fontSize),icon:e.querySelector('svg').getBoundingClientRect().width})));assert.ok(icons.length);for(const i of icons)assert.ok(Math.abs(i.font-i.icon)<.1);
 if(width===390){await page.locator('#style-options').click();await page.waitForTimeout(350);await page.keyboard.press('Tab');await page.locator('#style-options').focus();await page.waitForTimeout(50);assert.equal(await page.locator('.workshop-focus-overlay').evaluate(e=>e.getBoundingClientRect().width),62);await page.keyboard.press('Escape');}
 await page.goto(origin+'/ai-workshop-resources');await page.evaluate(()=>workshopPerspective.preview('ready'));await page.keyboard.press('Tab');await page.locator('.perspective-discover').focus();
 const ring=()=>page.locator('.perspective').evaluate(e=>({outline:getComputedStyle(e,'::before').outlineWidth,radius:getComputedStyle(e,'::before').borderRadius}));assert.deepEqual(await ring(),{outline:'3px',radius:'8px'});
 const measured=await page.locator('.perspective-dialog').evaluate(e=>{const clone=e.cloneNode(true);clone.open=true;clone.style.visibility='hidden';document.body.append(clone);const r=clone.getBoundingClientRect();clone.remove();return {width:r.width,height:r.height};});
 await page.evaluate(()=>workshopPerspective.preview('success'));await page.locator('.perspective-dialog').waitFor({state:'visible'});const actual=await page.locator('.perspective-dialog').boundingBox();assert.equal(actual.width,Math.min(440,width-48));assert.equal(actual.width,measured.width);assert.equal(actual.height,measured.height);
 await page.keyboard.press('Escape');await page.locator('.perspective-discover').focus();assert.deepEqual(await ring(),{outline:'3px',radius:'8px'});await page.close();console.log('PASS heading navigation, H3 scale, discovery geometry/focus and options ring',name,width);
 }}finally{await browser.close();}
}}finally{server.close();}

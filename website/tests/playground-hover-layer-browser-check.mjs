import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});const near=(a,b)=>assert.ok(Math.abs(a-b)<.7,`${a} != ${b}`);
try{
const p=await browser.newPage({viewport:{width:1440,height:1000}});await p.goto(origin+'/component-playground');await p.locator('#tab-url-reference').click();await p.waitForTimeout(200);
assert.ok(await p.locator('.toolbar').evaluate(e=>e.classList.contains('controls-pinned')));for(const legend of await p.locator('.toolbar legend').all())assert.equal(await legend.evaluate(e=>getComputedStyle(e).opacity),'0');
const gap=await p.locator('.url-reference-intro').evaluate(e=>e.nextElementSibling.getBoundingClientRect().top-e.getBoundingClientRect().bottom);near(gap,16);assert.equal(await p.locator('.url-subsection>.section-heading').first().evaluate(e=>getComputedStyle(e).marginBottom),'16px');
await p.locator('#tab-discovery').click();await p.locator('#egg input[value=ready]').evaluate(e=>e.click());
for(const expanded of [false,true]){if(expanded)await p.locator('#discovery-preview .preview-expand').click();const action=await p.locator('#perspective-replay').evaluate(e=>({next:e.nextElementSibling.id,gap:e.nextElementSibling.getBoundingClientRect().left-e.getBoundingClientRect().right}));assert.equal(action.next,'perspective-copy');near(action.gap,8);}
await p.keyboard.press('Escape');await p.setViewportSize({width:390,height:844});await p.locator('#tab-url-reference').click();await p.waitForTimeout(150);assert.ok(await p.locator('.tab-scroll-shell').evaluate(e=>parseFloat(getComputedStyle(e,'::before').top)<=-innerHeight));
for(const theme of ['light','dark']){
 await p.setViewportSize({width:1440,height:1000});await p.goto(origin+'/ai-workshop-resources?theme='+theme);const agent=await p.locator('[data-agent][aria-pressed=false]').first().getAttribute('data-agent');const option=p.locator('[data-agent="'+agent+'"]').first();await option.hover();
 const layer=await option.evaluate(e=>({bg:getComputedStyle(e).backgroundColor,z:getComputedStyle(e,'::before').zIndex,indicator:getComputedStyle(e.parentElement.querySelector('.toggle-indicator')).zIndex,fill:getComputedStyle(e,'::before').backgroundColor}));assert.equal(layer.bg,'rgba(0, 0, 0, 0)');assert.ok(Number(layer.z)<Number(layer.indicator));assert.notEqual(layer.fill,'rgba(0, 0, 0, 0)');
 await p.mouse.down();await p.waitForTimeout(100);await p.screenshot({path:'/tmp/selector-held-'+theme+'.png'});await p.mouse.up();await p.waitForTimeout(400);assert.equal(await option.getAttribute('aria-pressed'),'true');assert.equal(await option.evaluate(e=>getComputedStyle(e,'::before').backgroundColor),'rgba(0, 0, 0, 0)');
 const copy=p.locator('.copy').first();await copy.hover();const fill=await copy.evaluate(e=>{const test=document.createElement('span');test.style.background='var(--hover)';e.append(test);const expected=getComputedStyle(test).backgroundColor;test.remove();return [getComputedStyle(e).backgroundColor,expected]});assert.equal(...fill);
}
console.log('PASS: hidden pinned labels, URL spacing, replay order/visible gap, mobile top coverage and hover layers through press/release');
}finally{await browser.close();await new Promise(r=>server.close(r));}

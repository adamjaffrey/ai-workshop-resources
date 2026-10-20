import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});const near=(a,b)=>assert.ok(Math.abs(a-b)<1,`${a} != ${b}`);
try{
const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [390,768,1440]){
 await page.setViewportSize({width,height:1000});await page.goto(origin+'/component-playground/components');await page.waitForTimeout(700);
 await page.evaluate(()=>scrollTo(0,1000));await page.waitForTimeout(100);
 const tabs=page.locator('.tab-scroll-shell');const rect=await tabs.boundingBox();
 if(width===390){near(rect.y,0);for(const id of ['#back-to-top','body>#style-options']){const r=await page.locator(id).boundingBox();near(r.y,rect.height+12+(id==='#back-to-top'?56:0));assert.ok(await page.locator(id).evaluate(e=>{const r=e.getBoundingClientRect();return e.contains(document.elementFromPoint(r.x+24,r.y+24))}));}}
 else {const metrics=await page.locator('.toolbar').evaluate(e=>({height:parseFloat(e.style.getPropertyValue('--toolbar-pinned-height')),tabs:document.querySelector('.tab-scroll-shell').getBoundingClientRect().top,before:getComputedStyle(document.querySelector('.tab-scroll-shell'),'::before').top}));near(metrics.tabs,metrics.height+25);}
 const panel=await page.locator('#login-preview').boundingBox();const rail=width===390?await page.locator('nav[role=tablist]').boundingBox():rect;near(rail.x,panel.x);near(rail.width,panel.width);
 await page.locator('#tab-url-reference').click();await page.waitForTimeout(150);assert.ok(await page.evaluate(()=>scrollY)>100);near((await tabs.boundingBox()).y,width===390?0:parseFloat(await page.locator('html').evaluate(e=>getComputedStyle(e).getPropertyValue('--sticky-tab-top'))));
 const sub=page.locator('.url-subsection').first();const balanced=await sub.locator(':scope>.section-heading').evaluate(e=>{const h=e.querySelector('h3').getBoundingClientRect(),b=e.querySelector('button').getBoundingClientRect();return [h.top-b.top,b.bottom-h.bottom]});near(...balanced);
 await page.locator('#tab-typography').click();await page.waitForTimeout(1800);const frame=page.frameLocator('#link-type-frame');assert.equal(await frame.locator('#link-colours tr:first-child code').count(),2);assert.equal(await frame.locator('body').evaluate(e=>getComputedStyle(e).overflowY),'hidden');assert.equal(await page.locator('#link-type-frame').evaluate(e=>getComputedStyle(e.parentElement).maxHeight),'none');
 await page.screenshot({path:'/tmp/sticky-refinement-'+width+'.png'});
}
await page.locator('#tab-discovery').click();await page.locator('input[name=egg][value=ready]').locator('..').click();const replay=page.locator('#perspective-replay');assert.equal(await replay.evaluate(e=>e.parentElement.className),'panel-actions');const padding=await replay.evaluate(e=>getComputedStyle(e).padding);assert.equal(padding,await page.locator('#perspective-copy').evaluate(e=>getComputedStyle(e).padding));await page.locator('#discovery-preview .preview-expand').click();assert.equal(await replay.evaluate(e=>e.parentElement.parentElement.className),'expanded-state-controls');assert.equal(await replay.evaluate(e=>getComputedStyle(e).padding),padding);
assert.deepEqual(errors,[]);console.log('PASS: mobile tools below pinned tabs, desktop separator, tab landing, full tab width, H3 hover balance, Typography sizing and expanded replay parity');
}finally{await browser.close();await new Promise(r=>server.close(r));}

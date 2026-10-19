import assert from 'node:assert/strict';import {chromium} from 'playwright';import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));const base='http://127.0.0.1:'+server.address().port;
for(const width of [320,390,768,1440]){
 await page.setViewportSize({width,height:1000});await page.goto(base+'/playground/components');await page.waitForTimeout(500);
 assert.equal(await page.locator('.kicker').evaluate(e=>e.getBoundingClientRect().top),134);assert.equal(await page.locator('.playground-brand').count(),1);assert.equal(await page.locator('#hover input[value=on]+span').textContent(),'Force Hover States');
 const rail=page.locator('#state .choice-options');
 for(const value of ['neutral','network','retryReady']){
  const option=page.locator('#state input[value='+value+']').locator('..');await option.evaluate(e=>e.scrollIntoView({block:'nearest',inline:'center'}));await option.click();await page.waitForTimeout(100);
  const r=await rail.evaluate(e=>{const c=e.querySelector('input:checked').closest('.choice'),box=e.getBoundingClientRect(),r=c.getBoundingClientRect();return {left:e.scrollLeft,max:e.scrollWidth-e.clientWidth,desired:Math.max(0,Math.min(e.scrollWidth-e.clientWidth,e.scrollLeft+r.left+r.width/2-box.left-e.clientWidth/2)),shellMask:getComputedStyle(e.parentElement).maskImage,border:getComputedStyle(e.parentElement).borderLeftWidth,leftFade:e.hasAttribute('data-overflow-left'),rightFade:e.hasAttribute('data-overflow-right')};});assert.ok(Math.abs(r.left-r.desired)<1);assert.equal(r.shellMask,'none');assert.equal(r.border,'1px');assert.equal(r.leftFade,r.left>2);assert.equal(r.rightFade,r.max-r.left>2);
 }
 const nav=page.locator('nav[role=tablist]');await nav.evaluate(e=>e.scrollLeft=80);await page.waitForTimeout(100);assert.equal(await nav.evaluate(e=>e.hasAttribute('data-overflow-left')),await nav.evaluate(e=>e.scrollLeft>2));assert.equal(await page.locator('.tab-scroll-shell').evaluate(e=>getComputedStyle(e).maskImage),'none');
 await page.locator('[data-tab=icons]').click();const a=await page.locator('#playground-icon-filter .choice-shell').boundingBox(),b=await page.locator('#show-playground-sources').locator('..').boundingBox();if(Math.abs(a.y-b.y)<50)assert.ok(Math.abs(a.y+a.height/2-b.y-b.height/2)<1,'checkbox centre');
 await page.locator('[data-tab=discovery]').click();await page.locator('#discovery-frame').scrollIntoViewIfNeeded();await page.waitForTimeout(700);const frame=page.frameLocator('#discovery-frame');await frame.locator('body').evaluate(()=>scrollTo(0,0));await page.waitForTimeout(200);const gap=await frame.locator('body').evaluate(()=>document.querySelector('.step-row:last-child .step-title').getBoundingClientRect().top-document.querySelector('.controls .toggle').getBoundingClientRect().bottom);assert.ok(Math.abs(gap-24)<1,'Step 3 gap '+gap+' at '+width);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 if(width===390){await page.screenshot({path:'/tmp/overflow-egg-final.png'});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(300);await page.screenshot({path:'/tmp/overflow-header-final.png'});}
}
assert.deepEqual(errors,[]);console.log('PASS: internal two-sided fades, persistent borders, clamped selection centring, checkbox alignment, shared header brand rhythm and 24px Easter Egg spacing at four widths');
}finally{await browser.close();server.close();}

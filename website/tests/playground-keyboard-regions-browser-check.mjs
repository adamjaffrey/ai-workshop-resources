import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const near=(a,b)=>assert.ok(Math.abs(a-b)<.7,`${a} != ${b}`);
try{for(const engine of [chromium,webkit]){const browser=await engine.launch(engine===chromium?{channel:'chrome'}:{});try{for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/component-playground');await page.evaluate(()=>document.fonts.ready);
 const tab=page.locator('[role=tab][aria-selected=true]');assert.equal(await tab.evaluate(e=>{const c=getComputedStyle(e),p=document.createElement('span');p.style.background='var(--agent-accent)';e.append(p);const same=c.backgroundColor===getComputedStyle(p).backgroundColor;p.remove();return same;}),true);
 await page.keyboard.press('Tab');await tab.focus();near(await page.locator('.tab-scroll-shell>.workshop-group-ring').evaluate(e=>parseFloat(getComputedStyle(e).borderBottomLeftRadius)),0);
 const row=page.locator('#login-preview>.section-heading');await row.locator('.section-collapse').click();await page.waitForTimeout(100);
 const gap=await row.evaluate(e=>{const h=e.querySelector('h2'),label=h.querySelector(':scope>span'),line=parseFloat(getComputedStyle(h).lineHeight),count=Math.round(label.getBoundingClientRect().height/line);return{height:e.getBoundingClientRect().height,expected:50+(count-1)*line};});near(gap.height,gap.expected);await row.locator('.section-collapse').click();
 await page.locator('#login-preview .preview-expand').click();const expanded=page.locator('#login-preview.is-expanded');
 if(width===1440)assert.equal(await expanded.locator('h2').evaluate(e=>e.scrollWidth<=e.clientWidth+1),true,'expanded heading uses available space');
 const summary=expanded.locator('.preview-settings>summary');await summary.click();await page.keyboard.press('Tab');await summary.focus();await page.waitForTimeout(100);
 const ring=await summary.evaluate(e=>{const r=e.parentElement.getBoundingClientRect(),f=e.closest('dialog').querySelector('.workshop-focus-overlay').getBoundingClientRect();return {left:r.left-f.left,right:f.right-r.right,top:r.top-f.top,bottom:f.bottom-r.bottom};});for(const value of Object.values(ring))near(value,6);
 await page.keyboard.press('Escape');await page.locator('[data-tab=branding]').click();await page.locator('#branding-preview .preview-expand').click();
 const range=page.locator('#branding-preview input[type=range]').first();await page.keyboard.press('Tab');await range.focus();await page.waitForTimeout(100);near(await page.locator('#branding-preview>.workshop-focus-overlay').evaluate(e=>e.getBoundingClientRect().height),40);
 const check=page.locator('#worm-outline');await check.focus();const was=await check.isChecked();await page.keyboard.press('Enter');assert.equal(await check.isChecked(),!was);assert.equal(await check.evaluate(e=>getComputedStyle(e.closest('.source-choice')).outlineStyle),'none');await page.screenshot({path:`/tmp/keyboard-expanded-${engine.name()}-${width}.png`});await page.keyboard.press('Escape');await page.locator('[data-tab=discovery]').click();
 const checkbox=page.locator('#perspective-settings input[type=checkbox]').first();if(await checkbox.count()){await checkbox.focus();const checked=await checkbox.isChecked();await page.keyboard.press('Enter');assert.equal(await checkbox.isChecked(),!checked);}
 const egg=page.frameLocator('#discovery-frame');await egg.locator('.controls .toggle').waitFor();
 assert.equal(await egg.locator('.controls .toggle').evaluate(e=>Boolean(e.compareDocumentPosition(document.querySelector('.theme-toggle'))&Node.DOCUMENT_POSITION_FOLLOWING)),true,'agent comes before theme');
 const success=page.locator('#egg input[value=success]');await success.check();await egg.locator('.perspective-dialog[open]').waitFor();const after=page.locator('#egg input[value=after]');await after.check();await page.waitForTimeout(150);assert.equal(await after.evaluate(e=>document.activeElement===e),true,'preview dialog closure does not steal focus');await page.keyboard.press('Tab');if(await page.evaluate(()=>document.activeElement.matches('.page-embed-scroll')))await page.keyboard.press('Tab');
 if(await page.evaluate(()=>document.activeElement.id==='discovery-frame')){await page.waitForTimeout(100);assert.equal(await egg.locator('.controls .toggle').evaluate(e=>e.contains(document.activeElement)),true,'iframe entry starts at agent');}

 await page.locator('[data-tab=errors]').click();const states=page.frameLocator('#errors-frame');await states.locator('#errors-login .full-login-context').last().waitFor();
 await page.keyboard.press('Tab');await states.locator('.segmented-toggle button').first().focus();await page.waitForTimeout(100);
 for(const sample of await states.locator('.error-sample:has(.segmented-toggle)').all()){
  for(const group of await sample.locator('.segmented-toggle').all()){
   if(!await group.isVisible())continue;const first=group.locator('button').first(),second=group.locator('button').nth(1);await first.focus();await page.keyboard.press('ArrowRight');assert.equal(await second.evaluate(e=>document.activeElement===e),true,'cloned selector supports right arrow');await page.keyboard.press('ArrowLeft');assert.equal(await first.evaluate(e=>document.activeElement===e),true);
  }
  for(const field of await sample.locator('input:not([disabled]),button.gate-submit:not([disabled])').all()){assert.ok(await field.evaluate(e=>e.tabIndex>=0),'enabled field remains in Tab order');await field.focus();assert.equal(await field.evaluate(e=>document.activeElement===e),true,'enabled field remains focusable');}
 }
 const fallback=states.locator('#errors-resources [data-state="JavaScript Unavailable"]');assert.equal(await fallback.locator('.theme-toggle').isVisible(),true);
 const pan=fallback.locator('.error-sample');if(width===390){await pan.focus();const x=await pan.evaluate(e=>e.scrollLeft);await page.keyboard.press('ArrowRight');assert.ok(await pan.evaluate(e=>e.scrollLeft)>x,'focused region pans separately');}
 for(const right of await states.locator('[data-specimen-alignment=right]').all()){assert.equal(await right.getAttribute('data-overflow-right'),null);near(await right.evaluate(e=>e.scrollLeft),0);if(width===1440)assert.equal(await right.evaluate(e=>e.scrollWidth<=e.clientWidth+1),true,'right-aligned text fits without unused source width');}
 await page.locator('[data-tab=focus]').click();const focus=page.frameLocator('#focus-frame');await focus.locator('.segmented-toggle').first().waitFor();await page.keyboard.press('Tab');await focus.locator('.segmented-toggle button').first().focus();await page.waitForTimeout(100);
 for(const group of await focus.locator('.segmented-toggle').all()){const first=group.locator('button').first();await first.focus();await page.keyboard.press('ArrowRight');assert.equal(await group.locator('button').nth(1).evaluate(e=>document.activeElement===e),true);assert.equal(await focus.locator('.workshop-focus-overlay').evaluate(e=>getComputedStyle(e).display),'block');}
 await page.screenshot({path:`/tmp/keyboard-regions-${engine.name()}-${width}.png`});assert.deepEqual(errors,[]);console.log('PASS keyboard regions, cloned controls, focus geometry and heading layout',engine.name(),width);await page.close();
}}finally{await browser.close();}}}finally{await new Promise(r=>server.close(r));}

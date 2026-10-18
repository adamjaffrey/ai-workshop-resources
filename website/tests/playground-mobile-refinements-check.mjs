import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{window.firstAccents=[];let frames=0;const watch=()=>{window.firstAccents.push(document.documentElement?.dataset.selectedAgent);if(++frames<8)requestAnimationFrame(watch);};requestAnimationFrame(watch);try{localStorage.setItem('workshop-selected-agent','claude-code');}catch{}});
 await p.goto(origin+'/playground');await p.waitForTimeout(1000);
 assert.equal(await p.locator('html').getAttribute('data-selected-agent'),'codex');assert.ok((await p.evaluate(()=>window.firstAccents)).filter(Boolean).every(x=>x==='codex'));
 await p.click('#style-options');assert.equal(await p.locator('#style-dialog').evaluate(e=>e.matches(':popover-open')),true);
 const pop=await p.locator('#style-dialog').boundingBox(),opener=await p.locator('#style-options').boundingBox();assert.ok(Math.abs(pop.y-opener.y)<2);
 await p.keyboard.press('Tab');await p.waitForTimeout(200);assert.equal(await p.locator('#style-options').evaluate(e=>document.activeElement===e),true);await p.keyboard.press('Escape');await p.waitForFunction(()=>!document.getElementById('style-dialog').matches(':popover-open'));
 assert.equal(await p.locator('#style-dialog').evaluate(e=>e.matches(':popover-open')),false);assert.equal(await p.locator('#style-options').evaluate(e=>document.activeElement===e),true);
 assert.equal(await p.locator('#state .state-row').count(),2);assert.equal(await p.locator('.horizontal-hint').count(),0);
 assert.equal(await p.locator('#reset svg').count(),1);assert.equal(await p.locator('#inspector-body').isVisible(),false);await p.click('#inspector-toggle');assert.equal(await p.locator('#inspector-body').isVisible(),true);await p.click('#inspector-details');assert.equal(await p.locator('#inspection').isVisible(),true);await p.click('#inspector-toggle');
 await p.click('[data-tab=colours]');assert.equal(await p.locator('#swatches').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),2);assert.match(await p.locator('.swatch small').first().evaluate(e=>getComputedStyle(e).fontFamily),/mono/i);
 await p.click('[data-tab=typography]');await p.waitForTimeout(400);const type=p.frameLocator('#type-frame');
 const footer=type.locator('[data-source-selector=".footer-meta"]');assert.equal(await footer.locator('button').count(),0);assert.equal(await footer.locator('.footer-meta').evaluate(e=>{const [a,b]=e.children;return e.classList.contains('is-wrapped')===(Math.abs(a.getBoundingClientRect().top-b.getBoundingClientRect().top)>2)}),true);
 assert.equal(await type.locator('[data-source-selector=".copy"] .copy-icon').isVisible(),true);
 assert.equal(await type.locator('[data-source-selector=".qr-copy"] .qr-copy-overlay').evaluate(e=>getComputedStyle(e).opacity),'1');assert.equal(await type.locator('[data-source-selector=".qr-copy"] .copy-icon').isVisible(),true);
 await p.click('[data-tab=blocks]');assert.equal(await p.locator('[data-tab=blocks]').textContent(),'Blocks and Blur');for(const id of ['strength','blur','dim']){const box=await p.locator('#'+id).boundingBox();assert.ok(box.height>=44&&box.width>=250);}
 await p.locator('input[name=review][value=blurred]').locator('..').click();await p.waitForTimeout(100);assert.equal(await p.frameLocator('#blocks-frame').locator('.page-placeholder').evaluate(e=>getComputedStyle(e).filter),'blur(4px)');
 await p.click('[data-tab=icons]');await p.waitForTimeout(800);const icons=p.frameLocator('#icons-frame');assert.ok(await icons.locator('.icon-row').count()>15);assert.ok((await icons.locator('h3').allTextContents()).some(t=>t==='Lucide · loader-circle'));assert.equal(await icons.locator('[data-source-page=login]').count()>0,true);assert.deepEqual(errors,[]);
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){await p.click('#style-options');await p.locator('input[name=theme][value='+theme+']').locator('..').click();await p.locator('input[name=agent][value='+agent+']').locator('..').click();await p.click('#style-options');await p.waitForTimeout(800);const row=icons.locator('.icon-row').filter({has:icons.locator('h3',{hasText:'Lucide · lock'})}).first();const shown=row.locator('[data-input-icon=lock]');const actual=p.frameLocator('#icon-login-source').locator('[data-input-icon=lock]');assert.deepEqual(await shown.evaluate(e=>{const c=getComputedStyle(e);return [c.color,c.width,c.height]}),await actual.evaluate(e=>{const c=getComputedStyle(e);return [c.color,c.width,c.height]}));}
 await p.screenshot({path:'/tmp/mobile-icons.png'});await p.click('[data-tab=components]');await p.screenshot({path:'/tmp/mobile-refined.png'});await p.click('#style-options');await p.screenshot({path:'/tmp/mobile-popover.png'});
 console.log('PASS: mobile popover, packed controls, reset icons, inspector levels, source typography, colour grid, sliders and live icon gallery');
}finally{await browser.close();await new Promise(r=>server.close(r));}

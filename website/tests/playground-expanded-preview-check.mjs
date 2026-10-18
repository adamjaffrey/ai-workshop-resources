import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const width of [390,1440]){
 const p=await browser.newPage({viewport:{width,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:'+server.address().port+'/style-guide');await p.waitForTimeout(500);
 for(const name of ['login','resources','blocks']){
 await p.click('[data-tab='+(name==='blocks'?'blocks':'components')+']');const dialog=p.locator('#'+name+'-preview'),frame=p.frameLocator('#'+name+'-frame');
 assert.ok((await p.locator('#'+name+'-frame').boundingBox()).height<=844*.7+1);
 await frame.locator('body').evaluate(()=>window.previewSentinel='preserved');
 await dialog.locator('.preview-expand').scrollIntoViewIfNeeded();const before=await p.evaluate(()=>scrollY);
 await dialog.locator('.preview-expand').click();await p.waitForTimeout(100);
 assert.equal(await dialog.evaluate(e=>e.matches(':modal')),true);assert.equal(await dialog.locator('.contract-icon svg').evaluate(e=>getComputedStyle(e).width),'18px');assert.equal(await dialog.locator('.preview-settings').evaluate(e=>getComputedStyle(e).borderWidth),'1px');assert.equal(await dialog.locator('.preview-settings').evaluate(e=>getComputedStyle(e).borderRadius),'10px');assert.equal(await p.evaluate(()=>document.activeElement.id),name+'-preview-title');
 assert.equal(await frame.locator('body').evaluate(()=>window.previewSentinel),'preserved');
 assert.ok((await p.locator('#'+name+'-frame').boundingBox()).height>200);
 await p.keyboard.press('Tab');assert.ok(await dialog.evaluate(e=>e.contains(document.activeElement)));
 if(name==='login'){await dialog.locator('input[name=state][value=wrong]').locator('..').click();await frame.locator('#gate-error.is-error').waitFor();assert.match(await frame.locator('#gate-error').innerText(),/Incorrect password/);}
 if(name==='resources'){await dialog.locator('input[name=copy][value=error]').locator('..').click();await frame.locator('[data-copy]').first().click();assert.equal(await frame.locator('[data-copy]').first().getAttribute('data-copy-error'),'');}
 if(name==='blocks'){await dialog.locator('input[name=review][value=blurred]').locator('..').click();await p.waitForTimeout(100);assert.equal(await frame.locator('body').getAttribute('data-review'),'blurred');}
 await dialog.locator('.preview-settings summary').click();await dialog.locator('input[name=theme][value=dark]').locator('..').click();await p.waitForTimeout(100);assert.equal(await frame.locator('html').getAttribute('data-theme'),'dark');
 await dialog.locator('.preview-state-settings summary').click();assert.equal(await dialog.locator('.preview-state-settings').getAttribute('open'),null);await dialog.locator('.preview-state-settings summary').click();
 await dialog.locator('.preview-expand').click();assert.equal(await dialog.evaluate(e=>e.matches(':modal')),false);assert.ok(Math.abs(await p.evaluate(()=>scrollY)-before)<2);assert.equal(await frame.locator('body').evaluate(()=>window.previewSentinel),'preserved');assert.equal(await p.evaluate(()=>document.activeElement.className),'preview-expand');
 await dialog.locator('.preview-expand').click();await p.keyboard.press('Escape');assert.equal(await dialog.evaluate(e=>e.matches(':modal')),false);
 }
 for(const [tab,id,content] of [['typography','type','#type-specimens'],['icons','icons','#icon-catalog'],['errors','errors','#error-catalog']]){await p.click('[data-tab='+tab+']');await p.waitForTimeout(500);const frame=p.frameLocator('#'+id+'-frame'),height=await frame.locator(content).evaluate(e=>e.getBoundingClientRect().height);assert.ok((await p.locator('#'+id+'-frame').boundingBox()).height>=height,JSON.stringify({id,height,frame:await p.locator('#'+id+'-frame').boundingBox()}));}
 assert.deepEqual(errors,[]);await p.close();
 }
 console.log('PASS: 70dvh inline cap, native expanded previews, shared controls/state, focus/Escape restoration and full-height reference galleries');
}finally{await browser.close();server.close();}

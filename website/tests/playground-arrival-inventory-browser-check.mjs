import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try{for(const width of [390,1440]){
 const p=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});await p.goto(origin+'/component-playground');await p.evaluate(()=>document.fonts.ready);
 await p.keyboard.press('Tab');assert.equal(await p.locator('.skip-main:focus').count(),1,'normal entry starts at Skip to Main Content');
 const entries=await p.evaluate(()=>workshopPlaygroundAnchors.entries.map(e=>({id:e.id,path:e.path,tab:e.tab})));
 for(const entry of entries){
  await p.evaluate(async entry=>{document.querySelector('[data-tab="'+entry.tab+'"]').click();await workshopPlaygroundAnchors.navigate(entry.path+'#'+entry.id);},entry);
  const y=await p.evaluate(()=>scrollY);
  assert.equal(await p.evaluate(()=>document.activeElement.matches('h2,h3')),true,'silent heading focus');
  assert.equal(await p.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle),'none');
  await p.keyboard.press('Tab');assert.equal(await p.locator('.heading-anchor[data-anchor="'+entry.id+'"]:focus').count(),1,entry.id+' first Tab');
  await p.waitForTimeout(40);assert.ok(Math.abs(await p.evaluate(()=>scrollY)-y)<1,entry.id+' retains landing');
  await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.matches('.section-collapse')),true,entry.id+' document order');
 }
 console.log('PASS every Playground arrival route',width,entries.length,'headings');await p.close();
}}finally{await browser.close();server.close()}

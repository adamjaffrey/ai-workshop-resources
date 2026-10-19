import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage({viewport:{width:1440,height:1000}});await p.goto('http://127.0.0.1:'+server.address().port+'/playground');
 const tops=await p.locator('#global-style-controls').evaluate(e=>['agent','theme','width','hover'].map(id=>e.querySelector('#'+id+' .choice-options').firstElementChild.getBoundingClientRect().top));assert.ok(Math.max(...tops)-Math.min(...tops)<1,'toolbar buttons align vertically');
 await p.locator('[data-tab=discovery]').click();
 for(const expanded of [false,true]){
  if(expanded){await p.locator('#discovery-preview .preview-expand').click();await p.locator('#discovery-preview .preview-settings > summary').click();}
  for(const width of ['320','390','768','1440','fluid']){
   await p.locator('input[name=width][value="'+width+'"]').locator('..').click();
   const size=await p.locator('#discovery-frame').evaluate(e=>({frame:e.getBoundingClientRect().width,wrap:e.parentElement.getBoundingClientRect().width,available:e.parentElement.parentElement.clientWidth}));
   if(width!=='fluid'){assert.equal(size.frame,Number(width));assert.ok(size.wrap<=Number(width)+2.5);if(Number(width)<=768)assert.equal(size.wrap,Number(width)+2,'canvas hugs chosen viewport');}else assert.ok(size.wrap>768,'Fit fills available canvas');
  }
  if(expanded)await p.keyboard.press('Escape');
 }
 await p.setViewportSize({width:390,height:844});await p.locator('#style-options').click();await p.locator('input[name=width][value="320"]').locator('..').click();await p.locator('#style-options').click();
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile has no horizontal page overflow');
 console.log('PASS: aligned width controls, fixed-width canvas in embedded and expanded previews, Fit restoration and mobile containment');
}finally{await browser.close();await new Promise(r=>server.close(r));}

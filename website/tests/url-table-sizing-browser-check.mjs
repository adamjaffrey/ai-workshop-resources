import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage({isMobile:true,hasTouch:true,deviceScaleFactor:3});
 for(const width of [390,768,1440]){
  await p.setViewportSize({width,height:1000});await p.goto('http://127.0.0.1:'+server.address().port+'/component-playground/url-reference');
  const tables=await p.locator('#panel-url-reference table').evaluateAll(es=>es.map(e=>({width:e.getBoundingClientRect().width,wrapper:e.parentElement.clientWidth,min:getComputedStyle(e).minWidth,cells:[...e.querySelectorAll('th,td')].map(c=>getComputedStyle(c).fontSize),code:[...e.querySelectorAll('code')].map(c=>getComputedStyle(c).fontSize),adjust:getComputedStyle(e.parentElement).webkitTextSizeAdjust})));
  assert.ok(tables.length>=8);for(const t of tables){assert.equal(t.min,'0px');assert.equal(t.adjust,'100%');assert.ok(t.cells.every(s=>s==='14px'));assert.ok(t.code.every(s=>Math.abs(parseFloat(s)-12.6)<.01));}
  if(width===1440)assert.ok(tables.some(t=>t.width<t.wrapper-10),'Short tables must shrink to content');
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No page overflow');
  await p.locator('#panel-url-reference .panel').filter({has:p.locator('h2',{hasText:'Resources Aliases'})}).screenshot({path:'/tmp/url-resources-table-'+width+'.png'});
 }
 console.log('PASS: all URL table cell/code font sizes, autosizing suppression, compact intrinsic widths and contained overflow at phone/tablet/desktop sizes');
}finally{await browser.close();await new Promise(r=>server.close(r));}

import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const b=await chromium.launch({channel:'chrome',headless:true});
try{
const p=await b.newPage({viewport:{width:1440,height:1000}});
for(const theme of ['light','dark']){
 await p.goto(origin+'/ai-workshop-resources?theme='+theme);const option=p.locator('.controls .toggle button[aria-pressed=false]').first();await option.hover();const expected=await option.evaluate(e=>getComputedStyle(e).color);
 const box=await option.boundingBox();await p.mouse.down();await p.mouse.move(box.x-80,box.y+100,{steps:10});await p.mouse.up();await p.waitForTimeout(200);assert.equal(await option.getAttribute('aria-pressed'),'false');assert.equal(await p.evaluate(()=>getSelection().toString()),'');assert.equal(await option.evaluate(e=>e.dispatchEvent(new DragEvent('dragstart',{bubbles:true,cancelable:true}))),false);
 await p.goto(origin+'/component-playground?theme='+theme);const label=p.locator('#agent .choice:has(input:not(:checked))');await label.hover();assert.equal(await label.locator('span').evaluate(e=>getComputedStyle(e).color),expected);
}
await p.setViewportSize({width:390,height:844});await p.goto(origin+'/component-playground/url-reference');await p.evaluate(()=>scrollTo(0,0));assert.equal(await p.locator('.mobile-tab-backdrop').evaluate(e=>getComputedStyle(e).opacity),'0');await p.evaluate(()=>scrollTo(0,1000));await p.waitForTimeout(100);
assert.deepEqual(await p.locator('.mobile-tab-backdrop').evaluate(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {left:r.left,right:r.right,top:r.top,opacity:s.opacity,position:s.position,hit:s.pointerEvents}}),{left:0,right:390,top:0,opacity:'1',position:'fixed',hit:'none'});
const sub=p.locator('.url-subsection').first();assert.equal(await sub.evaluate(e=>getComputedStyle(e).paddingTop),'24px');await sub.locator('.section-collapse').click();assert.equal(await sub.evaluate(e=>getComputedStyle(e.nextElementSibling).marginTop),'24px');
await p.screenshot({path:'/tmp/mobile-edge-background.png'});
console.log('PASS: matching light/dark hover text, cancelled pointer drag, non-draggable controls, full-width fixed mobile background and balanced H3 spacing');
}finally{await b.close();await new Promise(r=>server.close(r));}

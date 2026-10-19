import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port,browser=await chromium.launch({channel:'chrome',headless:true});
try {
 for(const width of [320,390,660]) {
 const context=await browser.newContext({viewport:{width,height:844},hasTouch:true});
 await context.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});
 const page=await context.newPage();await page.goto(origin);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(400);
 const result=await page.evaluate(async()=>{
  const agent=document.querySelector('.controls .toggle'),slot=agent.parentElement,label=document.querySelector('.controls-label');
  const origin=slot.getBoundingClientRect().top+scrollY;
  const samples=[];
  const sample=()=>{const r=slot.getBoundingClientRect(),l=label.getBoundingClientRect();samples.push({top:r.top+scrollY,width:r.width,label:l.top+scrollY,compact:agent.hasAttribute('data-compact')});};
  async function move(top){scrollTo(0,origin-top);for(let i=0;i<26;i++){await new Promise(requestAnimationFrame);sample();}}
  const threshold=24+document.querySelector('.page-toolbar .theme-toggle').offsetHeight+16;
  await move(threshold-2);
  const waitsUntilCloseGap=!agent.hasAttribute('data-compact');
  await move(threshold-6);
  const collapsed=agent.hasAttribute('data-compact');
  for(const offset of [-1,2,-2,1,-1,2])await move(threshold+offset);
  const held=agent.hasAttribute('data-compact');
  await move(threshold+6); // Symmetric 4px margins around the 16px gap.
  const expanded=!agent.hasAttribute('data-compact');
  return {waitsUntilCloseGap,collapsed,held,expanded,topDrift:Math.max(...samples.map(s=>s.top))-Math.min(...samples.map(s=>s.top)),widthDrift:Math.max(...samples.map(s=>s.width))-Math.min(...samples.map(s=>s.width)),labelDrift:Math.max(...samples.map(s=>s.label))-Math.min(...samples.map(s=>s.label))};
 });
 console.log(width,result);assert.equal(result.waitsUntilCloseGap,true);assert.equal(result.collapsed,true);assert.equal(result.held,true);assert.equal(result.expanded,true);assert.ok(result.topDrift<1);assert.ok(result.widthDrift<1);assert.ok(result.labelDrift<1);
 await page.evaluate(()=>scrollTo(0,800));await page.waitForTimeout(500);await page.setViewportSize({width,height:720});await page.waitForTimeout(50);
 assert.equal(await page.locator('.controls .toggle').getAttribute('data-compact'),'');assert.equal(await page.locator('.controls .toggle').evaluate(e=>e.getBoundingClientRect().top),24);
 await context.close();
 }
 console.log('PASS: stable layout during collapse/expansion, threshold oscillation and mobile viewport-height changes');
}finally{await browser.close();server.close();}

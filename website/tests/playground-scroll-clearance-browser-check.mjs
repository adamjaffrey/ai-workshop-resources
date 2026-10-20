import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage();
 for(const width of [390,768,1440]){
  await p.setViewportSize({width,height:1000});await p.goto(origin+'/component-playground/components');await p.waitForTimeout(500);
  for(const tab of await p.locator('[data-tab]').all()){
   await tab.evaluate(e=>e.click());await p.waitForTimeout(100);
   const stable=await p.evaluate(async()=>{const e=document.querySelector('.tab-scroll-shell'),before=e.getBoundingClientRect().top;scrollBy(0,2);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));return Math.abs(e.getBoundingClientRect().top-before);});
   // The initial already-selected tab intentionally preserves its initial position.
   if(await tab.getAttribute('id')!=='tab-components')assert.ok(stable<.1,'Tab moved on first scroll: '+await tab.getAttribute('id'));
  }
  await p.locator('#tab-url-reference').click();await p.waitForTimeout(250);
  const positions=await p.evaluate(async()=>{const out=[];for(let i=0;i<8;i++){if(i)scrollBy(0,1);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));out.push(document.querySelector('.tab-scroll-shell').getBoundingClientRect().top);}return out;});
  assert.ok(Math.max(...positions)-Math.min(...positions)<.1,JSON.stringify({width,positions}));
  if(width===390){assert.equal(await p.locator('.tab-scroll-shell').evaluate(e=>getComputedStyle(e).marginBottom),'16px');assert.equal(await p.locator('.tab-scroll-shell').evaluate(e=>getComputedStyle(e,'::before').opacity),'1');}
  const gaps=await p.locator('.url-subsection').first().evaluate(e=>({expanded:getComputedStyle(e.querySelector('.section-heading')).marginBottom,next:getComputedStyle(e.nextElementSibling).marginTop}));assert.equal(gaps.expanded,'16px');
  await p.locator('.url-subsection .section-collapse').first().click();assert.equal(await p.locator('.url-subsection').nth(1).evaluate(e=>getComputedStyle(e).marginTop),'20px');
  await p.screenshot({path:'/tmp/scroll-clearance-'+width+'.png'});
  for(const selector of ['nav[role=tablist]','#width .choice-options']){
   // Give each real rail a constrained width to exercise overflowing middle items.
   await p.evaluate(selector=>{const track=document.querySelector(selector);track.style.width='340px';track.style.maxWidth='340px';},selector);
   const result=await p.evaluate(selector=>{const t=document.querySelector(selector),items=[...t.children].filter(e=>e.matches('.choice,[role=tab]'));t.scrollLeft=0;const item=items[Math.floor(items.length/2)];revealPlaygroundOption(t,item);const r=item.getBoundingClientRect(),b=t.getBoundingClientRect();const middle={left:r.left-b.left,right:b.right-r.right,width:r.width,track:t.clientWidth,scroll:t.scrollLeft,max:t.scrollWidth-t.clientWidth};const before=t.scrollLeft;revealPlaygroundOption(t,item);const unchanged=t.scrollLeft===before;revealPlaygroundOption(t,items[0]);const first=t.scrollLeft;revealPlaygroundOption(t,items.at(-1));return {middle,unchanged,first,last:t.scrollLeft,max:t.scrollWidth-t.clientWidth,fade:getComputedStyle(t).getPropertyValue('--overflow-feather').trim()};},selector);
   assert.equal(result.fade,'108px');assert.equal(result.first,0);assert.ok(Math.abs(result.last-result.max)<1);assert.ok(result.unchanged);
   if(result.middle.max>0&&result.middle.scroll>1&&result.middle.scroll<result.middle.max-1){const clearance=width<=660?(result.middle.track-result.middle.width)/2:Math.min(108,(result.middle.track-result.middle.width)/2);assert.ok(result.middle.left>=clearance-2&&result.middle.right>=clearance-2,JSON.stringify(result));}
  }
 }
 for(const theme of ['light','dark']){
  await p.goto(origin+'/ai-workshop-resources?theme='+theme);const backgrounds=await p.locator('.controls .toggle,.theme-toggle').evaluateAll(es=>es.map(e=>getComputedStyle(e).backgroundColor));assert.equal(backgrounds[0],backgrounds[1]);
  const agent=p.locator('.controls .toggle button[aria-pressed=false]').first();await agent.hover();const hover=await agent.evaluate(e=>getComputedStyle(e,'::before').backgroundColor);
  const themeButton=p.locator('.theme-toggle button[aria-pressed=false]').first();await themeButton.hover();assert.equal(await themeButton.evaluate(e=>getComputedStyle(e,'::before').backgroundColor),hover);
  await p.goto(origin+'/component-playground?theme='+theme);const choice=p.locator('#agent .choice:has(input:not(:checked))').first();await choice.hover();assert.equal(await choice.evaluate(e=>getComputedStyle(e,'::before').backgroundColor),hover);
 }
 console.log('PASS: stable initial scrolling, mobile spacing/top coverage, collapsed H3 spacing, fade-aware rail alignment and shared selector colours');
}finally{await browser.close();await new Promise(r=>server.close(r));}

import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 for(const width of [320,390,768,940,941,1440])for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']) {
  const context=await browser.newContext({viewport:{width,height:800},hasTouch:width<661});
  await context.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(origin);
  await page.evaluate(({theme,agent})=>{document.documentElement.dataset.theme=theme;window.workshopAgent.select(agent);}, {theme,agent});
  await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(500);
  const geometry=()=>page.evaluate(()=>{const t=document.querySelector('.page-toolbar .theme-toggle'),a=document.querySelector('.controls .toggle'),b=document.querySelector('.brand');const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right};};return {t:box(t),a:box(a),b:box(b),locked:[t,a].map(e=>e.hasAttribute('data-locked')),compact:a.hasAttribute('data-compact'),shadows:[t,a].map(e=>Number(e.style.getPropertyValue('--sticky-shadow'))),overflow:document.documentElement.scrollWidth>innerWidth};});
  const initial=await geometry();assert.ok(Math.abs(initial.b.x-initial.a.x-4)<1);assert.equal(await page.locator(".controls-label").evaluate(e=>e.getBoundingClientRect().bottom<=document.querySelector(".controls .toggle").getBoundingClientRect().top),true);assert.ok(Math.abs(initial.t.y+initial.t.h/2-initial.b.y-initial.b.h/2)<1);assert.deepEqual(initial.shadows,[0,0]);
  const labelOpacity=()=>page.locator('.controls-label').evaluate(e=>Number(getComputedStyle(e).opacity));
  assert.equal(await labelOpacity(),1);
  for(const distance of [64,32,0,32,64]){
   await page.evaluate(y=>scrollTo(0,y),initial.a.y-24-distance);await page.waitForTimeout(80);
   assert.ok(Math.abs(await labelOpacity()-distance/64)<.02,JSON.stringify({width,theme,agent,distance,opacity:await labelOpacity()}));
  }
  await page.evaluate(y=>scrollTo(0,y),initial.a.y-24+24);await page.waitForTimeout(500);assert.ok(Math.abs((await geometry()).shadows[1]-.5)<.03,JSON.stringify({width,theme,agent,initial,mid:await geometry()}));
  await page.evaluate(()=>scrollTo(0,800));await page.waitForTimeout(500);
  const fixed=await geometry();assert.deepEqual(fixed.locked,[true,true]);assert.equal(fixed.t.y,24);assert.equal(fixed.a.y,24);assert.deepEqual(fixed.shadows,[1,1]);assert.equal(fixed.compact,width<=940);assert.ok(fixed.a.right+12<fixed.t.x);assert.equal(fixed.overflow,false);
  await page.locator('[data-agent="'+agent+'"]').focus();await page.keyboard.press('Space');await page.waitForTimeout(400);assert.equal(await page.evaluate(()=>document.activeElement.dataset.agent),agent==='codex'?'claude-code':'codex');
  await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(500);const restored=await geometry();assert.deepEqual(restored.locked,[false,false]);assert.deepEqual(restored.shadows,[0,0]);assert.equal(restored.compact,false);assert.ok(Math.abs(restored.a.y-initial.a.y)<1);
  await page.emulateMedia({reducedMotion:'reduce'});await page.evaluate(()=>scrollTo(0,800));await page.waitForTimeout(80);assert.equal((await geometry()).compact,width<=940);assert.equal(await labelOpacity(),0);
  assert.deepEqual(errors,[]);await context.close();
 }
 const preview=await browser.newPage({viewport:{width:390,height:800}});await preview.goto(origin+'/playground');await preview.locator('#resources-frame').scrollIntoViewIfNeeded();await preview.locator('#resources-frame').evaluate(e=>{e.style.setProperty('width','390px','important');e.style.setProperty('min-width','0','important');e.style.setProperty('height','600px','important');e.style.setProperty('min-height','0','important');});await preview.waitForTimeout(600);const frame=await (await preview.locator('#resources-frame').elementHandle()).contentFrame();await frame.evaluate(()=>scrollTo(0,800));await preview.waitForTimeout(500);assert.equal(await frame.locator('.controls-label').evaluate(e=>getComputedStyle(e).opacity),'0');assert.equal(await frame.locator('.controls .toggle').getAttribute('data-compact'),'');assert.equal(await frame.locator('.page-toolbar .theme-toggle').evaluate(e=>e.getBoundingClientRect().top),24);await preview.close();
 console.log('Sticky controls: 24 width/theme/agent combinations; restore, collision, focus, reduced motion passed.');
} finally {await browser.close();server.close();}

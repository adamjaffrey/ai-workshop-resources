import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const route='/component-playground/url-reference#login-aliases-and-validation';
try{for(const engine of [chromium,webkit]){
 const browser=await engine.launch(engine===chromium?{channel:'chrome'}:{});
 try{for(const width of [390,1440]){
  const p=await browser.newPage({viewport:{width,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  const landed=()=>p.waitForFunction(()=>document.documentElement.dataset.playgroundAnchorLanded==='login-aliases-and-validation'&&!document.documentElement.hasAttribute('data-playground-anchor-arriving'));
  const gap=()=>p.evaluate(()=>{const e=window.workshopPlaygroundAnchors.entries.find(e=>e.id==='login-aliases-and-validation');return e.target.getBoundingClientRect().top-document.querySelector('.tab-scroll-shell').getBoundingClientRect().bottom;});
  await p.goto(origin+route);await landed();assert.ok(Math.abs(await gap()-16)<1);
  for(const expected of width>660?['#agent','#theme','.heading-anchor']:['#style-options','#tab-url-reference','.heading-anchor']){await p.keyboard.press('Tab');assert.equal(await p.evaluate(sel=>!!document.activeElement.closest(sel),expected),true,'focus '+expected);}
  const hidden=await p.locator('[data-playground-anchor-hidden]').count();assert.ok(hidden>0);
  await p.mouse.wheel(0,80);await p.waitForTimeout(250);assert.equal(await p.locator('[data-playground-anchor-hidden]').count(),hidden,'downward scrolling retains hidden cards');
  await p.mouse.wheel(0,-40);await p.waitForTimeout(100);assert.equal(await p.locator('[data-playground-anchor-hidden]').count(),0,'upward scrolling restores');
  await p.waitForTimeout(600);await p.goto(origin+route);await landed();assert.ok(Math.abs(await gap()-16)<1,'same URL entry');
  if(await p.evaluate(()=>!!window.navigation)){await p.mouse.wheel(0,-100);await p.waitForTimeout(650);await p.evaluate(async()=>{await navigation.navigate(location.href,{history:'replace'}).finished;});assert.ok(Math.abs(await gap()-16)<1,'same URL replacement');}
  await p.reload();await landed();assert.ok(Math.abs(await gap()-16)<1,'reload');
  // Hover, copy, feedback and collapse remain separate actions.
  await p.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>window.copied=text}}));
  const copy=p.locator('.heading-anchor[data-anchor="login-aliases-and-validation"]');
  const y=await p.evaluate(()=>scrollY);await copy.click();assert.equal(await copy.getAttribute('data-result'),'success');assert.ok(Math.abs(await p.evaluate(()=>scrollY)-y)<1);
  const anim=await copy.locator('.step-anchor-success').evaluate(e=>{const a=e.getAnimations()[0];return {ms:a.effect.getTiming().duration,easing:a.effect.getTiming().easing,frames:a.effect.getKeyframes().map(k=>k.transform)};});assert.deepEqual(anim,{ms:600,easing:'ease-out',frames:['translateY(2px)','translateY(0px)']});
  await p.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied')}}}));await copy.click();assert.equal(await copy.getAttribute('data-result'),'failure');
  const fail=await copy.locator('.step-anchor-failure').evaluate(e=>{const a=e.getAnimations()[0];return {ms:a.effect.getTiming().duration,easing:a.effect.getTiming().easing,frames:a.effect.getKeyframes().map(k=>k.transform)};});assert.deepEqual(fail,{ms:300,easing:'ease-out',frames:['translateY(0px)','translateY(0px)']});
  assert.deepEqual(errors,[]);await p.close();console.log('PASS initial/re-entry/reload, focus, restore direction and feedback',engine.name(),width);
 }}finally{await browser.close()}
}}finally{await new Promise(r=>server.close(r))}

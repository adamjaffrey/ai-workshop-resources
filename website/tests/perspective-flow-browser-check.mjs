import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const b=await chromium.launch({channel:'chrome',headless:true});
try{
 const c=await b.newContext({viewport:{width:390,height:900}});await c.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});const p=await c.newPage();
 for(const theme of ['light','dark']){
  await p.goto(origin);await p.evaluate(theme=>window.dispatchEvent(new StorageEvent('storage',{key:'workshop-colour-theme',newValue:theme})),theme);await p.locator('.perspective').scrollIntoViewIfNeeded();await p.waitForTimeout(500);
  await p.evaluate(()=>{window.workshopPerspective.configure({duration:1500,gap:1000,particleDuration:12000});window.workshopPerspective.preview('ready');});
  await p.waitForFunction(()=>document.querySelector('.perspective').hasAttribute('data-sheening'));
  assert.equal(await p.locator('.perspective-ellipsis').evaluate(e=>getComputedStyle(e,'::after').animationName),'perspective-sheen');
  await p.waitForTimeout(1600);
  const early=await p.locator('.perspective-particle:not([hidden])').evaluateAll((points,dark)=>{const side=p=>{const x=parseFloat(p.style.getPropertyValue('--x'));return dark?100-x:x;};return {near:points.filter(p=>side(p)<15).map(p=>Number(p.style.opacity)),far:points.filter(p=>side(p)>85).map(p=>Number(p.style.opacity))};},theme==='dark');
  assert.ok(early.near.some(a=>a>.01),'particles nearest ellipsis appear first');assert.ok(early.far.every(a=>a<.001),'far edge waits for wave');
  const before=await p.locator('.perspective-particle').first().evaluate(e=>e.style.transform);await p.waitForTimeout(300);assert.notEqual(await p.locator('.perspective-particle').first().evaluate(e=>e.style.transform),before,'particles drift without hover');
  await p.waitForFunction(()=>document.querySelector('.perspective').hasAttribute('data-sheening'));
  assert.ok(await p.locator('.perspective-particle').evaluateAll(points=>points.some(p=>Number(p.style.opacity)>.1)),'next sweep begins while previous particles persist');
 }
 await p.evaluate(()=>window.workshopPerspective.preview('success'));await p.mouse.move(5,5);await p.waitForTimeout(450);const before=await p.locator('.perspective-dialog').evaluate(e=>e.style.getPropertyValue('--halo-x'));await p.mouse.move(380,850);await p.waitForTimeout(450);assert.notEqual(await p.locator('.perspective-dialog').evaluate(e=>e.style.getPropertyValue('--halo-x')),before,'halo tracks screen pointer');
 await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await p.locator('.perspective-dialog').evaluate(e=>getComputedStyle(e).getPropertyValue('--halo-dx')),'0px');
 console.log('PASS: directional emergence, ellipsis sheen, free drift, overlapping sweep tails and pointer halo');
}finally{await b.close();await new Promise(r=>server.close(r));}

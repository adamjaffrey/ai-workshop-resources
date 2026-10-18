import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port,b=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const width of [320,390,768,1440]){
  const touch=width<768,c=await b.newContext({viewport:{width,height:900},hasTouch:touch,isMobile:touch});await c.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});const p=await c.newPage();await p.goto(origin+'/');const version=p.locator('.footer-version'),copyright=p.locator('.footer-copyright');
  const activate=async locator=>touch?locator.tap():locator.click();
  const semantics=await version.evaluate(e=>({tag:e.tagName,tab:e.tabIndex,role:e.getAttribute('role'),label:e.getAttribute('aria-label'),title:e.getAttribute('title'),outline:getComputedStyle(e).outlineStyle,cursor:getComputedStyle(e).cursor}));assert.deepEqual(semantics,{tag:'SPAN',tab:-1,role:null,label:null,title:null,outline:'none',cursor:'text'});
  assert.equal(await version.evaluate(e=>{e.focus();return document.activeElement===e;}),false);
  await activate(copyright);await activate(copyright);await activate(copyright);assert.equal(p.url(),origin+'/');
  await activate(version);await activate(version);assert.equal(p.url(),origin+'/');await p.waitForTimeout(3100);await activate(version);assert.equal(p.url(),origin+'/');
  await activate(copyright);await activate(version);await activate(version);await activate(version);await p.waitForURL(origin+'/playground');
  const frame=p.frameLocator('#resources-frame');await frame.locator('.footer-version').evaluate(e=>{e.click();e.click();e.click();});await p.waitForTimeout(100);assert.equal(p.url(),origin+'/playground');assert.match(await p.locator('#notice').textContent(),/shortcut activated/);assert.equal(await frame.locator('body').count(),1);
  await c.close();
 }
 console.log('PASS: three-click/tap shortcut, timeout, copyright exclusion, ordinary text semantics and sandbox navigation containment at four widths');
}finally{await b.close();server.close();}

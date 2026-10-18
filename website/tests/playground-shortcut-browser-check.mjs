import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview({protectPlayground:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port,b=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const width of [320,390,768,1440]){
  const touch=width<768,c=await b.newContext({viewport:{width,height:900},hasTouch:touch,isMobile:touch});await c.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});let p=await c.newPage();await p.goto(origin+'/');const version=p.locator('.brand'),copyright=p.locator('.footer-copyright');
  const activate=async locator=>touch?locator.tap():locator.click();
  const semantics=await version.evaluate(e=>({tag:e.tagName,tab:e.tabIndex,role:e.getAttribute('role'),label:e.getAttribute('aria-label'),title:e.getAttribute('title'),outline:getComputedStyle(e).outlineStyle,cursor:getComputedStyle(e).cursor}));assert.deepEqual(semantics,{tag:'DIV',tab:-1,role:null,label:'Wavelength',title:null,outline:'none',cursor:'default'});
  assert.equal(await version.evaluate(e=>{e.focus();return document.activeElement===e;}),false);
  for(const excluded of [copyright,p.locator('.footer-version')]){await activate(excluded);await activate(excluded);await activate(excluded);assert.equal(p.url(),origin+'/');}
  await activate(version);await activate(version);assert.equal(p.url(),origin+'/');await p.waitForTimeout(3100);await activate(version);assert.equal(p.url(),origin+'/');
  await activate(copyright);await activate(version);await activate(version);const opened=c.waitForEvent('page');await activate(version);const playground=await opened;await playground.waitForURL(origin+'/playground');assert.equal(p.url(),origin+'/');assert.equal(await playground.evaluate(()=>window.opener),null);p=playground;
  const frame=p.frameLocator('#resources-frame');await frame.locator('.brand').evaluate(e=>{e.click();e.click();e.click();});await p.waitForTimeout(100);assert.equal(p.url(),origin+'/playground');assert.match(await p.locator('#notice').textContent(),/shortcut activated/);assert.equal(await frame.locator('body').count(),1);
  // Locked main app: the scrim receives the click at the real backdrop logo.
  const locked=await b.newContext({viewport:{width,height:900},hasTouch:touch,isMobile:touch});const lp=await locked.newPage();await lp.goto(origin+'/');const box=await lp.locator('.page-placeholder .brand').boundingBox();assert.ok(box);const point={x:box.x+box.width/2,y:box.y+box.height/2};const hit=await lp.evaluate(({x,y})=>document.elementFromPoint(x,y)?.closest('.gate-panel')!==null,point);assert.equal(hit,false,'Logo is not covered by the panel');
  const tap=async()=>touch?lp.touchscreen.tap(point.x,point.y):lp.mouse.click(point.x,point.y);await tap();await tap();const lockedPopup=locked.waitForEvent('page');await tap();const destination=await lockedPopup;await destination.waitForURL(origin+'/playground');await destination.locator('#access-form').waitFor();assert.equal(await destination.locator('.page-placeholder .brand').count(),0);assert.equal(await destination.locator('#workshop-password').count(),1);assert.equal(lp.url(),origin+'/');await locked.close();
  await c.close();
 }
 console.log('PASS: separate-tab three-click/tap shortcut with no opener, preserved Resources, timeout, copyright exclusion and locked scrim hit testing, unchanged brand semantics and sandbox navigation containment at four widths');
}finally{await b.close();server.close();}

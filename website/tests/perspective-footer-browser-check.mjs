import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port,b=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await b.newPage();await p.goto(origin+'/home');
 for(const width of [320,390,768,1440])for(const theme of ['light','dark']){
  await p.setViewportSize({width,height:844});await p.evaluate(t=>window.dispatchEvent(new StorageEvent('storage',{key:'workshop-colour-theme',newValue:t})),theme);await p.locator('.perspective').scrollIntoViewIfNeeded();await p.waitForTimeout(500);
  const geometry=await p.locator('footer').evaluate(footer=>{const clue=footer.querySelector(':scope > .perspective'),r=clue.getBoundingClientRect(),f=footer.getBoundingClientRect(),row=footer.querySelector('.footer-content').getBoundingClientRect();return {above:r.top-f.top-parseFloat(getComputedStyle(footer).borderTopWidth),below:row.top-r.bottom,font:getComputedStyle(clue).fontSize,footerFont:getComputedStyle(footer).fontSize,overflow:document.documentElement.scrollWidth>innerWidth,dialogOutside:!footer.contains(document.querySelector('.perspective-dialog'))};});
  assert.equal(geometry.above,40);assert.equal(geometry.below,40);assert.equal(geometry.font,geometry.footerFont);assert.equal(geometry.overflow,false);assert.equal(geometry.dialogOutside,true);
  await p.evaluate(()=>{workshopPerspective.preview('ready');workshopPerspective.sheen();});await p.waitForTimeout(250);
  const stats=await p.evaluate(async()=>{let reads=0;const original=Element.prototype.getBoundingClientRect;Element.prototype.getBoundingClientRect=function(){if(this.matches('.perspective-fragment,.perspective-ellipsis,.perspective-discover'))reads++;return original.call(this);};try{await new Promise(r=>setTimeout(r,300));return {reads,visible:[...document.querySelectorAll('.perspective-particle')].some(e=>Number(e.style.opacity)>0)};}finally{Element.prototype.getBoundingClientRect=original;}});
  assert.ok(stats.reads<12,'unchanged glyph/target geometry is cached: '+stats.reads);
 }
 await p.addInitScript(()=>{window.CSSTransformValue=undefined;});await p.goto(origin+'/home');await p.locator('.perspective').scrollIntoViewIfNeeded();await p.evaluate(()=>{workshopPerspective.preview('ready');workshopPerspective.sheen();});await p.waitForTimeout(1800);assert.ok(await p.locator('.perspective-particle').evaluateAll(es=>es.some(e=>Number(e.style.opacity)>0&&e.style.transform.includes('translate'))),'CSS transform fallback remains animated');
 await p.goto(origin+'/playground/easter-egg');const f=p.frameLocator('#discovery-frame');await f.locator('footer > .perspective').waitFor();assert.equal(await f.locator('footer .footer-content').count(),1);
 console.log('PASS: footer placement, 40px vertical spacing, responsive geometry cache and canonical Playground specimen');
}finally{await b.close();server.closeAllConnections();await new Promise(r=>server.close(r));}

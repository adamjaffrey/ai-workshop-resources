import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const b=await chromium.launch({channel:'chrome',headless:true});
try{
 const c=await b.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,colorScheme:'light'});await c.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});const p=await c.newPage();p.setDefaultTimeout(20000);await p.goto(origin);await p.locator('.perspective').scrollIntoViewIfNeeded();
 await p.evaluate(()=>Object.defineProperty(document,'hidden',{configurable:true,get:()=>true}));await p.waitForTimeout(1200);assert.deepEqual(await p.evaluate(()=>window.workshopPerspective.seen),[]);
 console.log('Hidden-tab check passed');await p.evaluate(()=>delete document.hidden);await p.waitForFunction(()=>window.workshopPerspective.seen.includes('light'));assert.deepEqual(await p.evaluate(()=>window.workshopPerspective.seen),['light']);
 await p.locator('[data-theme-choice=dark]').tap();await p.waitForTimeout(450);await p.locator('[data-theme-choice=light]').tap();await p.waitForTimeout(700);assert.equal(await p.evaluate(()=>window.workshopPerspective.state),'locked');
 await p.locator('[data-theme-choice=dark]').tap();await p.waitForFunction(()=>window.workshopPerspective.state==='ready');await p.waitForFunction(()=>document.querySelector('.perspective').hasAttribute('data-sparkling'));
 await p.locator('.perspective-discover').tap();await p.locator('.perspective-dialog').waitFor({state:'visible'});assert.equal(await p.evaluate(()=>document.activeElement.id),'perspective-title');await p.getByRole('button',{name:'Keep Exploring'}).tap();await p.waitForFunction(()=>!document.querySelector('.perspective-dialog').open);
 console.log('Touch reveal passed');await p.reload();assert.equal(await p.evaluate(()=>window.workshopPerspective.state),'locked');
 // Fallback theme transitions must settle before their one-second dwell starts.
 await p.evaluate(()=>{document.startViewTransition=undefined;});await p.locator('.perspective').scrollIntoViewIfNeeded();await p.waitForTimeout(1200);await p.locator('[data-theme-choice=light]').tap();await p.waitForTimeout(900);assert.equal(await p.evaluate(()=>window.workshopPerspective.state),'locked');await p.waitForFunction(()=>window.workshopPerspective.state==='ready');
 // Playground uses the real state renderer and retains the same geometry and icon.
 console.log('Fallback dwell passed');const guide=await c.newPage();guide.setDefaultTimeout(20000);await guide.goto(origin+'/playground');const frame=guide.frameLocator('#resources-frame');await guide.locator('input[name=egg][value=ready]').locator('..').click();await frame.locator('.perspective-discover').waitFor({state:'visible'});assert.equal(await frame.locator('.perspective').getAttribute('data-state'),'ready');
 const read=e=>{const s=getComputedStyle(e);return {text:e.textContent,font:s.fontFamily,size:s.fontSize,line:s.lineHeight,colour:s.color};};
 await p.evaluate(()=>window.workshopPerspective.preview('ready'));for(const selector of ['.perspective-day','.perspective-night','.perspective-ellipsis'])assert.deepEqual(await frame.locator(selector).evaluate(read),await p.locator(selector).evaluate(read));
 assert.equal(await frame.locator('.perspective-discover svg').innerHTML(),await p.locator('.perspective-discover svg').innerHTML());
 console.log('PASS: touch, hidden tab, rapid toggles, fallback dwell, reload reset and independent Playground quote/icon parity');
}finally{await b.close();await new Promise(r=>server.close(r));}

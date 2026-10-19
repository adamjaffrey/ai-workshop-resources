import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext({viewport:{width:390,height:844}});await context.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});const page=await context.newPage();await page.goto(origin);await page.locator('.perspective').scrollIntoViewIfNeeded();
 await page.evaluate(()=>{window.workshopPerspective.configure({duration:4000,gap:1200});window.workshopPerspective.preview('ready');});
 for(const [theme,currentAngle,nextAngle] of [['dark',135,315],['light',315,135]]){
  await page.waitForFunction(()=>document.querySelector('.perspective').hasAttribute('data-sheening'));const start=Date.now();
  await page.waitForTimeout(600);await page.locator('[data-theme-choice='+theme+']').click();await page.waitForFunction(()=>!window.workshopThemeBusy?.());
  assert.ok(await page.locator('.perspective').evaluate((e,angle)=>e.style.getPropertyValue('--wave-paint').includes(angle+'deg'),currentAngle),'in-flight sweep retains its original direction');
  await page.waitForFunction(()=>!document.querySelector('.perspective').hasAttribute('data-sheening'));assert.ok(Date.now()-start<4400,'theme change does not restart the four-second sweep');const end=Date.now();
  await page.waitForFunction(()=>document.querySelector('.perspective').hasAttribute('data-sheening'));assert.ok(Date.now()-end>=950,'existing gap remains intact');
  assert.ok(await page.locator('.perspective').evaluate((e,angle)=>e.style.getPropertyValue('--wave-paint').includes(angle+'deg'),nextAngle),'next scheduled wave follows the new theme');
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.evaluate(()=>window.workshopPerspective.preview('success'));assert.equal(await page.locator('.perspective-dialog').evaluate(e=>e.getAnimations().length),0);assert.equal(await page.locator('.perspective-dialog').evaluate(e=>getComputedStyle(e,'::before').animationName),'none');
 console.log('PASS: theme changes preserve in-flight direction, sweep duration and gap; following waves use the new theme; reduced motion skips modal and aurora animation');
}finally{await browser.close();await new Promise(r=>server.close(r));}

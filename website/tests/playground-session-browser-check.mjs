import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview({protectPlayground:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const width of [390,1440]){
 const context=await browser.newContext({viewport:{width,height:844}}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/playground');assert.equal(await page.locator('#playground-title').count(),0);
 await page.locator('#workshop-password').fill(password);await page.locator('.gate-submit').click();await page.locator('#playground-title').waitFor();assert.equal(page.url(),origin+'/playground');
 await page.frameLocator('#login-frame').locator('#workshop-password').waitFor();await page.frameLocator('#resources-frame').locator('h1').waitFor();
 await page.locator('#state input[value=wrong]').locator('..').click();await page.frameLocator('#login-frame').locator('#gate-error.is-error').waitFor();
 assert.match(await page.frameLocator('#login-frame').locator('#gate-error').innerText(),/Incorrect password/);
 const main=await context.newPage();await main.goto(origin);assert.equal(await main.locator('#access-gate').count(),0);assert.equal(await main.locator('footer form[action="/auth/logout"] button').innerText(),'Log Out');
 await main.locator('footer form[action="/auth/logout"] button').click();await main.locator('#workshop-password').waitFor();
 await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow')));await page.locator('#workshop-password').waitFor();assert.equal(await page.locator('#playground-title').count(),0);
 // Signing in on the main page also unlocks a new playground tab.
 await main.locator('#workshop-password').fill(password);await main.locator('.gate-submit').click();await main.locator('footer form[action="/auth/logout"] button').waitFor();await page.reload();await page.locator('#playground-title').waitFor();
 assert.deepEqual(errors,[]);await context.close();}
 console.log('PASS: direct playground login return, CSP-compatible specimens, shared main/playground session and logout relocking');
}finally{await browser.close();server.close();}

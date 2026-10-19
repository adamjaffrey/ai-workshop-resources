import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({channel:'chrome',headless:true});const origin='http://127.0.0.1:'+server.address().port;
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:1000});
  for(const path of ['/ai-workshop-resources','/ai-workshop-resources?show-login=true','/component-playground/url-reference']){
   await page.goto(origin+path);
   const headings=await page.locator('h1,h2,h3,h4,h5,h6,th,caption,legend').allTextContents();
   for(const heading of headings)assert.doesNotMatch(heading,/\s(?:And|Or|The|Of|With|For|To|In)\s/,'CMOS small words: '+heading);
  }
  assert.equal(await page.locator('#panel-url-reference h2').first().innerText(),'Canonical Addresses and Page Titles');
  assert.ok((await page.locator('#panel-url-reference').innerText()).includes('/urls-references'));
  await page.locator('#tab-icons').click();
  assert.deepEqual(await page.locator('#playground-icon-filter .choice span').allTextContents(),['All','Playground','Section Headings','UI Elements','Other']);
  const cropped=page.locator('[data-catalog-variant=cropped]');
  await page.locator('#playground-icon-filter input[value=ui]').check();assert.equal(await cropped.isVisible(),true);
  await page.locator('#playground-icon-filter input[value=other]').check();assert.equal(await cropped.isVisible(),false);const other=await page.locator('.playground-icon-entry:visible').evaluateAll(es=>es.map(e=>({name:e.dataset.catalogIcon,groups:e.dataset.iconGroups.split(' ')})));assert.ok(other.every(e=>e.groups.includes('other')));assert.equal(await page.locator('#playground-icon-empty').isVisible(),other.length===0);assert.ok(!other.some(e=>e.name==='chevron-right'),'Disclosure controls are UI elements');
  await page.locator('#playground-icon-filter input[value=all]').check();
  const frame=page.frameLocator('#icons-frame');await frame.locator('[data-state="QR Code"] h3').waitFor();assert.equal(await frame.locator('[data-state="QR Code"] h3').innerText(),'QR Code');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 }
 assert.deepEqual(errors,[]);console.log('PASS: authored heading corrections, URL aliases in shared reference, icon category order and Other filtering at mobile/desktop widths');
}finally{await browser.close();server.close();}

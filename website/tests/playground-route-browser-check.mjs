import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),origin='http://127.0.0.1:'+server.address().port;
 const sections=[['components','components'],['typography','typography'],['colours','colours'],['blocks','blocks-and-blur'],['icons','icons'],['errors','status-states'],['focus','focus-and-selection'],['branding','branding'],['discovery','easter-egg'],['url-reference','url-reference']];
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:844});
  for(const [tab,path] of sections){
   await page.goto(origin+'/component-playground/'+path);
   assert.equal(await page.locator('[data-tab='+tab+']').getAttribute('aria-selected'),'true');
   await page.locator('[data-tab=typography]').click();
   await page.locator('[data-tab='+tab+']').click();
   assert.equal(new URL(page.url()).pathname,'/component-playground/'+path);
   await page.reload();assert.equal(await page.locator('[data-tab='+tab+']').getAttribute('aria-selected'),'true');
  }
  await page.goto(origin+'/component-playground/blur/?theme=dark');assert.equal(new URL(page.url()).pathname,'/component-playground/blocks-and-blur');assert.equal(new URL(page.url()).search,'?theme=dark');
  await page.locator('[data-tab=errors]').click();await page.locator('[data-tab=focus]').click();
  await page.goBack();assert.equal(await page.locator('[data-tab=errors]').getAttribute('aria-selected'),'true');
  await page.goForward();assert.equal(await page.locator('[data-tab=focus]').getAttribute('aria-selected'),'true');
 }
 console.log('PASS: all ten canonical tabs, clicks, reloads, alias arrival and Back/Forward at mobile/desktop widths');
}finally{await browser.close();await new Promise(r=>server.close(r));}

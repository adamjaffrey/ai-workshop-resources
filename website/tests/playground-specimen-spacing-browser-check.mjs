import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage();
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:'+server.address().port+'/playground');
  for(const [tab,id,row] of [['typography','type-frame','.type-row,.agent-row,.notice-type-row'],['icons','icons-frame','.icon-row:not([hidden])'],['errors','errors-frame','.icon-row'],['focus','focus-frame','.focus-row']]){
   await page.locator('[data-tab='+tab+']').evaluate(e=>e.click());
   const frame=page.frameLocator('#'+id);await frame.locator(row).last().waitFor();await page.waitForTimeout(400);
   const result=await frame.locator('body').evaluate((body,row)=>{
    const rows=[...body.querySelectorAll(row)],first=rows[0],last=rows.at(-1);
    return {top:first.firstElementChild.getBoundingClientRect().top,bottom:body.getBoundingClientRect().bottom-last.getBoundingClientRect().bottom,paddings:rows.slice(1).map(e=>getComputedStyle(e).paddingTop)};
   },row);
   assert.equal(result.top,24,tab+' first edge '+width);assert.ok(Math.abs(result.bottom-24)<=1,tab+' last edge '+width+': '+result.bottom);
   assert.ok(result.paddings.every(p=>p==='24px'),tab+' row spacing '+width);
  }
  const focus=page.frameLocator('#focus-frame');assert.equal(await focus.locator('#focus-login>.focus-row').first().evaluate(e=>getComputedStyle(e).paddingTop),'24px');
  assert.equal(await page.locator('.panel').first().evaluate(e=>getComputedStyle(e).paddingTop),'24px');
 }
 console.log('PASS: specimen divider and first/last container spacing at 320, 390, 768 and 1440px');
}finally{await browser.close();server.close();}

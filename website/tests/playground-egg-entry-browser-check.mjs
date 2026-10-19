import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));const base='http://127.0.0.1:'+server.address().port;
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(base+'/playground/icons');
  assert.equal(await page.locator('#playground-icon-filter input[value=other]').count(),0);
  const tile=page.locator('[data-catalog-icon=toy-brick]'),before=await tile.boundingBox();await page.locator('#playground-icon-filter input[value=playground]').check({force:true});assert.equal((await tile.boundingBox()).width,before.width);
  if(width===1440)assert.equal(await page.locator('#playground-icon-catalog').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),4);
  await page.locator('[data-tab=discovery]').click();assert.equal(await page.locator('.egg-help').count(),4);assert.equal(await page.locator('.egg-help[open]').count(),0);
  const frame=page.frameLocator('#discovery-frame');
  for(const view of ['live','locked','ready','complete','reveal','success','after']){
   await page.locator('#egg input[value='+view+']').check({force:true});await page.waitForTimeout(600);
   const info=await frame.locator('body').evaluate(()=>({distance:document.documentElement.scrollHeight-innerHeight-scrollY,locked:document.querySelector('.controls .toggle').hasAttribute('data-locked'),visibility:document.querySelector('[data-brand-variant]')?.dataset.visibility,top:document.querySelector('.controls .toggle').getBoundingClientRect().top}));
   assert.ok(Math.abs(info.distance)<2,JSON.stringify({width,view,info}));assert.ok(info.locked,JSON.stringify({width,view,info}));assert.equal(info.visibility,'1');assert.equal(info.top,24);
  }
  await page.locator('#egg input[value=ready]').check({force:true});await page.waitForTimeout(500);await page.locator('#discovery-frame').scrollIntoViewIfNeeded();await page.waitForTimeout(600);await page.screenshot({path:'/tmp/playground-egg-'+width+'.png'});
 }
 assert.deepEqual(errors,[]);console.log('PASS: four-column stable filtered cards, removed empty category, collapsed help, all seven Easter Egg entry views at four widths, pinned real selector and visible brand');
}finally{await browser.close();server.close();}

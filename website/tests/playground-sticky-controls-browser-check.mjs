import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true}),origin='http://127.0.0.1:'+server.address().port;
try{
 const p=await browser.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const width of [390,768,1440]){
  await p.setViewportSize({width,height:1000});await p.goto(origin+'/component-playground/components');
  const button=p.locator('#login-preview .section-collapse');await button.scrollIntoViewIfNeeded();
  const rect=await button.boundingBox();await p.mouse.move(rect.x+20,rect.y+20);await p.mouse.down();await p.waitForTimeout(200);
  assert.equal(await button.evaluate(e=>getComputedStyle(e).scale),'none');const held=await button.boundingBox();assert.ok(Math.abs(held.width-rect.width)<.1);await p.mouse.up();
  const nav=p.locator('.tab-scroll-shell');await p.evaluate(()=>scrollTo(0,1300));await p.waitForTimeout(100);
  const geometry=await nav.evaluate(e=>({top:e.getBoundingClientRect().top,expected:parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sticky-tab-top')),gap:getComputedStyle(e.querySelector('nav')).gap}));assert.ok(Math.abs(geometry.top-geometry.expected)<1);assert.equal(geometry.gap,'0px');
  await p.locator('#tab-icons').click();const iframe=p.frameLocator('#icons-frame');await iframe.locator('.icon-row h3').first().waitFor();await p.waitForTimeout(700);assert.equal(await iframe.locator('.icon-row h3').first().evaluate(e=>getComputedStyle(e).borderTopWidth),'0px');
  const usage=p.locator('.icon-usages').first();assert.equal(await usage.locator('summary').evaluate(e=>getComputedStyle(e).fontWeight),'600');assert.equal(await usage.locator('summary').evaluate(e=>getComputedStyle(e).fontSize),await usage.locator('li').first().evaluate(e=>getComputedStyle(e).fontSize));
  await p.locator('#tab-url-reference').click();const copy=p.locator('.url-copy').first();await copy.scrollIntoViewIfNeeded();
  const properties=['fontFamily','fontSize','fontWeight','lineHeight','padding','borderRadius','gap'];const actual=await copy.evaluate((e,keys)=>Object.fromEntries(keys.map(k=>[k,getComputedStyle(e)[k]])),properties);
  const app=await browser.newPage({viewport:{width,height:1000}});await app.goto(origin+'/ai-workshop-resources');const expected=await app.locator('.copy').first().evaluate((e,keys)=>Object.fromEntries(keys.map(k=>[k,getComputedStyle(e)[k]])),properties);assert.deepEqual(actual,expected,'Copy Text uses Resources typography and spacing');await app.close();
  await p.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{}}}));await copy.click();assert.equal(await copy.locator('.copy-label').innerText(),'Text Copied');assert.equal(await copy.locator('.success-icon').isVisible(),true);
  await p.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied')}}}));await copy.click();assert.equal(await copy.locator('.error-icon').isVisible(),true);assert.equal(await copy.locator('.copy-icon').isVisible(),false);assert.equal(await copy.locator('.success-icon').isVisible(),false);assert.equal(await copy.locator('.copy-label').innerText(),'Copy Failed');
  await p.screenshot({path:'/tmp/playground-sticky-'+width+'.png'});
 }
 assert.deepEqual(errors,[]);console.log('PASS: held ordinary buttons do not scale, sticky adjacent tabs, single gallery dividers, disclosure hierarchy and copy control parity/states');
}finally{await browser.close();server.close();}

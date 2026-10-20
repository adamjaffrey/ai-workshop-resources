import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:'+server.address().port+'/component-playground/components');
  assert.equal(await page.locator('[data-tab]').last().getAttribute('data-tab'),'discovery');
  const button=page.locator('#login-preview .section-collapse');await button.scrollIntoViewIfNeeded();
  const geometry=()=>button.evaluate(e=>{const b=e.getBoundingClientRect(),r=e.parentElement.getBoundingClientRect(),i=e.querySelector('svg').getBoundingClientRect();return{left:b.left,right:b.right,pivot:i.left+i.width/2,clearance:r.left-b.left};});
  const before=await geometry();assert.equal(before.clearance,8);
  for(let i=0;i<20;i++){await button.click({position:{x:20,y:20},delay:5});const after=await geometry();assert.ok(Math.abs(after.left-before.left)<.6);assert.ok(Math.abs(after.right-before.right)<.6);assert.ok(Math.abs(after.pivot-before.pivot)<.6);}
  await button.click();await page.waitForTimeout(200);assert.equal(await button.locator('svg').evaluate(e=>getComputedStyle(e).transform),'matrix(0, 1, -1, 0, 0, 0)');
  await page.locator('#tab-icons').click();await page.waitForTimeout(700);
  for(const entry of await page.locator('.playground-icon-entry').all()){const count=await entry.locator('li').count();if(count>5){assert.equal(await entry.locator('details').getAttribute('open'),null);assert.equal(await entry.locator('details [data-playground-source]').count(),0);}}
  await page.locator('#show-playground-sources').check();assert.ok(await page.locator('.icon-usages + [data-playground-source]:visible').count()>0);
  await page.locator('#tab-url-reference').click();assert.equal(await page.locator('#tab-url-reference svg').getAttribute('data-icon-name'),'globe');
  const copy=page.locator('.url-copy').first();
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.copiedExample=text;}}}));await copy.click();assert.equal(await copy.innerText(),'Copied');assert.equal(await page.evaluate(()=>window.copiedExample),await page.locator('.url-code-block pre code').first().textContent());
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied')}}}));await copy.click();assert.equal(await copy.innerText(),'Failed');
  await page.locator('.url-code-block').first().scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/playground-polish-'+width+'.png'});
 }
 assert.deepEqual(errors,[]);console.log('PASS: rapid-click stable geometry, left-facing collapse, expanded hover, usage disclosures, source visibility, tab order and copy success/failure');
}finally{await browser.close();server.close();}

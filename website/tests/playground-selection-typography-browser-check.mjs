import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),app=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));const base='http://127.0.0.1:'+server.address().port;await page.goto(base+'/playground/typography');await app.goto(base+'/');
 const frame=page.frameLocator('#link-type-frame');await frame.locator('#link-colours tr').first().waitFor();assert.equal(await frame.locator('#link-colours tr').count(),4);assert.match(await frame.locator('#link-metrics').innerText(),/1px resting \/ 2px hover/);
 assert.equal(await frame.locator('a .link-arrow').count(),2);assert.equal(await frame.locator('a').first().getAttribute('href'),await page.locator('.breadcrumbs a').getAttribute('href'));
 const read=e=>{const s=getComputedStyle(e,'::selection');return [s.backgroundColor,s.color];};
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
   await page.evaluate(({theme,agent})=>{for(const [id,value] of Object.entries({theme,agent})){const e=document.getElementById(id);e.value=value;e.dispatchEvent(new Event('change'));}},{theme,agent});
   await app.evaluate(({theme,agent})=>{window.dispatchEvent(new StorageEvent('storage',{key:'workshop-colour-theme',newValue:theme}));window.workshopAgent.select(agent);},{theme,agent});await page.waitForTimeout(400);
   const expected=await app.locator('.intro').evaluate(read);
   for(const selector of ['#playground-title','.breadcrumbs a .link-label','#playground-typography .muted'])assert.deepEqual(await page.locator(selector).evaluate(read),expected,selector+' '+theme+' '+agent);
   assert.deepEqual(await frame.locator('.selection-example').evaluate(read),expected,'specimen selection');
   const selection=await frame.locator('.selection-example').evaluate(e=>{const range=document.createRange();range.selectNodeContents(e);const s=getSelection();s.removeAllRanges();s.addRange(range);return s.toString();});assert.ok(selection.startsWith('Select this text'));
   assert.equal(await frame.locator('.link-label').first().evaluate(e=>getComputedStyle(e).color),await page.locator('.breadcrumbs .link-label').evaluate(e=>getComputedStyle(e).color));
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
 }
 await page.locator('[data-tab=icons]').click();const entries=page.locator('.playground-icon-entry'),names=await entries.evaluateAll(es=>es.map(e=>e.dataset.catalogIcon));
 assert.deepEqual(names.slice(0,11),['toy-brick','ellipsis','x','arrow-up-to-line','rotate-ccw','rotate-cw','copy','minimize-2','maximize-2','chevron-right','arrow-up-right']);
 const headingNames=await page.evaluate(()=>[...new Set([...document.querySelectorAll('[data-tab]')].flatMap(tab=>[...document.querySelectorAll('[data-panel="'+tab.dataset.tab+'"] .section-heading h2 svg')].map(e=>e.dataset.iconName)))]);
 assert.deepEqual(names.slice(11),headingNames);
 for(const category of ['playground','ui','headings','other','all']){
  await page.locator('#playground-icon-filter input[value='+category+']').check({force:true});
  const shown=await entries.evaluateAll(es=>es.filter(e=>!e.hidden).map(e=>e.dataset.iconGroups));assert.ok(shown.every(g=>category==='all'||g.split(' ').includes(category)));assert.equal(await page.locator('#playground-icon-empty').isVisible(),shown.length===0);
 }
 await page.locator('#show-playground-sources').check();assert.equal(await page.locator('[data-playground-source]:visible').count(),names.length);
 await page.locator('[data-tab=typography]').click();await page.locator('#playground-typography').evaluate(e=>e.scrollIntoView({block:'start'}));await page.waitForTimeout(500);await page.screenshot({path:'/tmp/playground-link-typography.png'});
 assert.deepEqual(errors,[]);console.log('PASS: shared selection colours and rendered typography across 16 theme/agent/viewport combinations, live link states, source coverage, icon ordering and category filters');
}finally{await browser.close();server.close();}

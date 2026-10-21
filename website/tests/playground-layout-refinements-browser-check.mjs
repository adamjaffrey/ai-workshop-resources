import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const origin='http://127.0.0.1:'+server.address().port;
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});await page.goto(origin+'/playground/focus');await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(200);
  async function centered(){if(width>660)return;const d=await page.locator('[data-tab][aria-selected=true]').evaluate(e=>{const nav=e.parentElement,r=e.getBoundingClientRect(),n=nav.getBoundingClientRect(),target=nav.scrollLeft+r.left+r.width/2-n.left-nav.clientWidth/2;return Math.abs(nav.scrollLeft-Math.max(0,Math.min(nav.scrollWidth-nav.clientWidth,target)));});assert.ok(d<2,'clamped mobile tab '+width+': '+d);}
  await centered();assert.equal(await page.locator('[data-tab=focus] svg').getAttribute('data-icon-name'),'search');
  for(const tab of ['components','typography','colours','blocks','icons','errors','focus','branding','discovery']){
   await page.locator('[data-tab='+tab+']').click();await page.waitForTimeout(70);await centered();
   assert.equal(await page.locator('[data-tab='+tab+'] svg').getAttribute('data-icon-name'),await page.locator('[data-panel='+tab+'] .section-heading h2 svg').first().getAttribute('data-icon-name'));
   assert.equal(await page.locator('[data-panel='+tab+'] .section-heading button:visible').count(),0);
   assert.ok(await page.locator('[data-panel='+tab+'] .section-heading h2').evaluateAll(es=>es.every(e=>{const svg=e.querySelector('svg').getBoundingClientRect(),span=e.querySelector('span').getBoundingClientRect();return Math.abs(svg.top+svg.height/2-span.top-parseFloat(getComputedStyle(e).lineHeight)/2)<2;})),'first-line heading icon alignment');
   const gaps=await page.locator('[data-panel='+tab+'] .panel>.frame-wrap,[data-panel='+tab+'] .panel>#playground-icon-catalog,[data-panel='+tab+'] .panel>.samples').evaluateAll(es=>es.map(e=>{let previous=e.previousElementSibling;while(previous&&getComputedStyle(previous).display==='none')previous=previous.previousElementSibling;return previous?e.getBoundingClientRect().top-previous.getBoundingClientRect().bottom:24;}));
   assert.ok(gaps.every(g=>Math.abs(g-24)<2),JSON.stringify({width,tab,gaps}));
  }
  await page.locator('[data-tab=components]').click();
  const rows=await page.locator('#login-destination,#state').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().top));assert.ok(Math.abs(rows[0]-rows[1])<2);
  for(const id of ['login','resources','blocks','branding','discovery']){
   const tab={login:'components',resources:'components',blocks:'blocks',branding:'branding',discovery:'discovery'}[id];await page.locator('[data-tab='+tab+']').click();
   const dialog=page.locator('#'+id+'-preview');const expand=dialog.locator('.preview-expand');
   assert.equal(await expand.locator('.action-label').innerText(),'Expand View');assert.equal(await expand.evaluate(e=>e.parentElement.className),'frame-wrap');
   await expand.click();assert.equal(await dialog.locator('h2').evaluate(e=>document.activeElement===e),true);
   const heading=await dialog.locator('.section-heading').evaluate(e=>{const h=e.querySelector('h2');return {height:e.getBoundingClientRect().height,titleHeight:h.getBoundingClientRect().height,nowrap:getComputedStyle(h).whiteSpace,scroll:getComputedStyle(h).overflowX,icons:[...e.querySelectorAll('button .action-label')].every(n=>getComputedStyle(n).display==='none')};});
   assert.ok(heading.height===44&&heading.titleHeight===44&&heading.nowrap==='nowrap'&&heading.scroll==='auto'&&heading.icons,JSON.stringify({width,id,heading}));
   await page.waitForTimeout(50);if(await dialog.locator('h2').evaluate(e=>e.scrollWidth>e.clientWidth+2)){assert.equal(await dialog.locator('h2').getAttribute('data-overflow-right'),'');await dialog.locator('h2').evaluate(e=>e.scrollLeft=e.scrollWidth);assert.ok(await dialog.locator('h2').evaluate(e=>e.scrollLeft>0));}
   await page.keyboard.press('Tab');assert.equal(await dialog.locator('.heading-actions button').first().evaluate(e=>document.activeElement===e),true);
   await page.keyboard.press('Escape');assert.equal(await expand.evaluate(e=>e.parentElement.className),'frame-wrap');
  }
  await page.locator('[data-tab=icons]').click();assert.equal(await page.locator('[data-playground-source]:visible').count(),0);await page.locator('#show-playground-sources').check();assert.ok(await page.locator('[data-playground-source]:visible').count()>0);await page.locator('#show-playground-sources').uncheck();
  await page.locator('[data-tab=discovery]').click();await page.locator('#egg input[value=complete]').check({force:true});await page.waitForTimeout(350);
  const replay=page.locator('#perspective-replay');assert.equal(await replay.locator('svg').getAttribute('data-icon-name'),'rotate-cw');assert.ok(await replay.evaluate(e=>e.offsetWidth<e.parentElement.clientWidth));
  const frame=page.frameLocator('#discovery-frame');await frame.locator('[data-agent=claude]').click();assert.equal(await frame.locator('[data-agent=claude]').getAttribute('aria-pressed'),'true');
  assert.ok(await frame.locator('.controls .toggle').evaluate(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.top>=0&&r.bottom<innerHeight&&r.right<=innerWidth;}),'visible agent selector '+width);
  await page.screenshot({path:'/tmp/playground-refinement-'+width+'.png'});
 }
 assert.deepEqual(errors,[]);console.log('PASS: all panel/tab icons, tab centring, 24px inset gaps, compact login controls, relocated actions, expanded headings/focus, sources and live Easter Egg agent selector at 4 widths');
}finally{await browser.close();server.close();}

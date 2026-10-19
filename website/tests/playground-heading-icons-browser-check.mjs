import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port+'/playground/icons');
 await page.waitForSelector('.playground-icon-entry');
 const audit=await page.evaluate(()=>{
  const originals=[...document.querySelectorAll('svg')].filter(e=>!e.closest('#playground-icon-catalog'));
  const entries=[...document.querySelectorAll('.playground-icon-entry')];
  return {missing:originals.filter(e=>!e.dataset.iconName||!e.dataset.iconProvider||!e.dataset.iconUse).length,
   names:[...new Set(originals.map(e=>e.dataset.iconName))].sort(),catalog:entries.map(e=>e.dataset.catalogIcon).sort(),
   headings:[...document.querySelectorAll('.section-heading h2')].map(e=>[e.textContent,e.querySelector('svg')?.dataset.iconName]),
   links:entries.every(e=>e.querySelector('a').href==='https://lucide.dev/icons/'+e.dataset.catalogIcon),
   licenses:document.querySelector('[data-catalog-icon="file-badge"] ul').textContent,
   controls:['minimize-2','x','rotate-cw'].every(n=>entries.some(e=>e.dataset.catalogIcon===n))};
 });
 assert.equal(audit.missing,0);assert.deepEqual(audit.catalog,audit.names);assert.equal(audit.headings.length,16);assert.ok(audit.headings.every(([,n])=>n));assert.ok(audit.links&&audit.controls);assert.match(audit.licenses,/Lucide Licence/);assert.match(audit.licenses,/Lobe Icons Licence/);
 assert.equal(audit.headings.find(([t])=>t==='Blocks and Blur')[1],'layout-template');assert.equal(audit.headings.find(([t])=>t==='Playground Icons')[1],'blocks');
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
   await page.evaluate(({theme,agent})=>{for(const [id,value] of Object.entries({theme,agent})){const e=document.getElementById(id);e.value=value;e.dispatchEvent(new Event('change'));}},{theme,agent});
   for(const tab of ['components','typography','colours','blocks','icons','errors','focus','branding','discovery']){
    await page.locator('[data-tab='+tab+']').click();
    const valid=await page.locator('[data-panel='+tab+'] .section-heading h2').evaluateAll(es=>es.every(e=>{const svg=e.querySelector('svg'),r=svg.getBoundingClientRect(),c=getComputedStyle(svg);return r.width===24&&r.height===24&&c.color===getComputedStyle(e).color&&e.scrollWidth<=e.clientWidth+1&&svg.getAttribute('aria-hidden')==='true';}));
    if(!valid)console.log(await page.locator('[data-panel='+tab+'] .section-heading h2').evaluateAll(es=>es.map(e=>({html:e.innerHTML.slice(0,160),width:e.clientWidth,scroll:e.scrollWidth,svg:e.querySelector('svg').getBoundingClientRect().toJSON(),color:getComputedStyle(e).color,svgColor:getComputedStyle(e.querySelector('svg')).color}))));assert.ok(valid,JSON.stringify({width,theme,agent,tab}));
   }
  }
  await page.locator('[data-tab=components]').click();await page.locator('#login-preview .preview-expand').click();
  assert.equal(await page.locator('#login-preview-title').evaluate(e=>document.activeElement===e),true);
  assert.equal(await page.locator('#login-preview-title').evaluate(e=>getComputedStyle(e).outlineStyle),'none');
  await page.keyboard.press('Tab');assert.equal(await page.locator('#reset').evaluate(e=>document.activeElement===e),true);
  await page.keyboard.press('Escape');
 }
 await page.locator('[data-tab=icons]').click();await page.locator('#playground-icons-panel').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/playground-heading-icons-desktop.png'});
 await page.setViewportSize({width:390,height:844});await page.locator('#playground-icons-panel').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/playground-heading-icons-mobile.png'});
 assert.deepEqual(errors,[]);console.log('PASS: 16 heading icons, complete deduplicated DOM catalogue, hidden controls, 16 responsive theme/agent combinations and expanded heading focus');
}finally{await browser.close();server.close();}

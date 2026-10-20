import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import ink from '../lib/workshop-icon-ink.generated.json' with {type:'json'};
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const width of [390,1440]){
  await p.setViewportSize({width,height:1000});await p.goto('http://127.0.0.1:'+server.address().port+'/component-playground/icons');
  const frame=p.frameLocator('#icons-frame');await frame.locator('[data-icon-source]').first().waitFor({state:'attached'});
  assert.equal(await frame.locator('[data-icon-source]:visible').count(),0);
  await p.locator('#show-sources').check();await frame.locator('[data-icon-source]').first().waitFor({state:'visible'});
  assert.equal(await frame.locator('[data-icon-source]').first().evaluate(e=>getComputedStyle(e).marginTop),'16px');
  assert.equal(await frame.locator('.icon-row:not([hidden]):not([data-gallery-last])').evaluateAll(rows=>rows.every(e=>getComputedStyle(e).borderBottomWidth==='1px')),true,'Every non-final specimen has a divider');
  await p.locator('#show-sources').uncheck();await frame.locator('[data-icon-source]').first().waitFor({state:'hidden'});
  for(const family of ['lobe','unicode','other']){await p.locator('#playground-icon-family input[value="'+family+'"]').check();assert.equal(await p.locator('.playground-icon-entry:visible').count(),0);assert.equal(await p.locator('#playground-icon-empty').isVisible(),true);}
  await p.locator('#playground-icon-family input[value="all"]').check();
  await p.locator('#tab-typography').click();await p.waitForTimeout(400);await p.locator('#tab-icons').click();
  const uses=await p.locator('[data-catalog-variant="cropped"] ul').innerText();assert.match(uses,/Typography/);assert.match(uses,/lucide.dev/);assert.match(uses,/Licence/);
  for(const tab of await p.locator('[data-tab]').all()){
   await tab.click();await p.waitForTimeout(80);
   const issues=await p.evaluate(ink=>[...document.querySelectorAll('[data-panel]:not([hidden]) .section-heading h2')].flatMap(h=>{const i=h.querySelector(':scope>svg'),m=ink.icons[i?.dataset.iconName];if(!i||!m)return[];const r=i.getBoundingClientRect(),t=h.getBoundingClientRect(),centre=r.top+(r.height-m.bottom*r.height/24+m.top*r.height/24)/2,want=t.top+parseFloat(getComputedStyle(h).paddingTop)+Number(h.dataset.capCentre);return Math.abs(centre-want)>.8?[{title:h.textContent,centre,want}]:[];}),ink);assert.deepEqual(issues,[],'Heading ink centres match cap height');
   for(const wrap of await p.locator('[data-panel]:visible .frame-wrap:visible').all())assert.equal(await wrap.evaluate(e=>getComputedStyle(e).paddingRight),'16px');
  }
  await p.locator('#tab-url-reference').click();
  const unique=await p.evaluate(()=>{const names=[...document.querySelectorAll('[data-panel="url-reference"] .section-heading h2 svg')].map(e=>e.dataset.iconName),other=[...document.querySelectorAll('[data-panel]:not([data-panel="url-reference"]) .section-heading h2 svg')].map(e=>e.dataset.iconName);return new Set(names).size===names.length&&names.every(n=>!other.includes(n));});assert.equal(unique,true,'URL heading icons are globally distinct');
  assert.equal(await p.locator('.url-code-block').first().evaluate(e=>getComputedStyle(e).backgroundColor),await p.locator('.url-code-block').first().evaluate(e=>{const x=document.createElement('div');x.style.background='var(--content-surface)';e.append(x);const color=getComputedStyle(x).backgroundColor;x.remove();return color;}));
  await p.screenshot({path:'/tmp/playground-refinements-'+width+'.png'});
 }
 assert.deepEqual(errors,[]);console.log('PASS: sources, empty families, complete link inventory, cap-height alignment, bilateral iframe insets and prompt code surfaces');
}finally{await browser.close();server.close();}

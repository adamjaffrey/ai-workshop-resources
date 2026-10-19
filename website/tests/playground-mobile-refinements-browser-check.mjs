import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true}),origin='http://127.0.0.1:'+server.address().port;
try{
 const p=await browser.newPage();
 for(const width of [300,320,390,768,1440]){
  await p.setViewportSize({width,height:900});await p.goto(origin+'/playground/components');
  await p.waitForTimeout(500);
  if(width<=660){const d=await p.locator('#login-destination').boundingBox(),s=await p.locator('#state').boundingBox();assert.ok(s.y>=d.y+d.height);assert.ok(Math.abs(s.width-d.width)<1,JSON.stringify({width,d,s}));}
  await p.locator('[data-tab=typography]').evaluate(e=>e.click());const type=p.frameLocator('#type-frame');await type.locator('.notice-type-row').last().waitFor();await p.waitForTimeout(700);
  const sizes=await type.locator('body').evaluate(()=>[...document.querySelectorAll('[data-source-selector="pre"] [data-in-situ],.feedback-preview,.gate-submit,.notice-type-row>div')].map(e=>{const row=e.closest('.type-row,.notice-type-row'),r=e.getBoundingClientRect();return {w:r.width,row:row.getBoundingClientRect().width,max:parseFloat(getComputedStyle(e).maxWidth)||Infinity};}));
  for(const s of sizes)assert.ok(Math.abs(s.w-Math.min(s.row,s.max))<2,JSON.stringify({width,s}));
  await p.locator('[data-tab=focus]').evaluate(e=>e.click());const focus=p.frameLocator('#focus-frame');await focus.locator('#focus-resources>.focus-row').last().waitFor();await p.waitForTimeout(300);
  const last=focus.locator('#focus-resources>.focus-row').last();assert.equal(await last.evaluate(e=>getComputedStyle(e).paddingBottom),'24px');
  const toggle=last.locator('.segmented-toggle');assert.equal(await toggle.locator('button').last().evaluate(e=>getComputedStyle(e).whiteSpace),'nowrap');assert.equal(await last.locator('.focus-preview').evaluate(e=>getComputedStyle(e).overflowX),'auto');
  await p.locator('[data-tab=errors]').evaluate(e=>e.click());const states=p.frameLocator('#errors-frame');await states.locator('#errors-login .icon-row').last().waitFor();await p.waitForTimeout(300);
  const gaps=await states.locator('#errors-login .icon-row').evaluateAll(rows=>rows.map(row=>{const sample=row.querySelector('.error-sample'),panel=sample.querySelector('.gate-panel'),meta=row.querySelector('.icon-meta');return {state:row.dataset.state,gap:Math.round(meta.getBoundingClientRect().top-panel.getBoundingClientRect().bottom)};}));
  assert.ok(Math.abs(gaps.find(x=>x.state==='JavaScript Unavailable').gap-gaps.find(x=>x.state==='wrong').gap)<=1,JSON.stringify({width,gaps}));
  await p.locator('[data-tab=icons]').evaluate(e=>e.click());const original=p.locator('[data-catalog-variant=original] h3 svg'),cropped=p.locator('[data-catalog-variant=cropped] h3 svg');assert.equal(await original.getAttribute('viewBox'),'0 0 24 24');assert.equal(await cropped.getAttribute('viewBox'),'6 6 12 12');assert.equal((await cropped.boundingBox()).width,8);
  await p.locator('[data-tab=discovery]').evaluate(e=>e.click());await p.locator('#discovery-preview .preview-expand').click();const visible=await p.locator('#discovery-preview>details').evaluateAll(es=>es.filter(e=>e.getBoundingClientRect().height).map(e=>e.querySelector('summary').textContent.trim()));assert.deepEqual(visible,['Style Options','Preview Controls']);await p.locator('#discovery-preview .preview-expand').click();
  await p.goto(origin);await p.locator('.worm-halo').waitFor({state:'attached'});
  await p.evaluate(()=>window.workshopBrandHalo.configure({hold:true}));await p.waitForTimeout(100);
  if(width<320)assert.equal(await p.locator('.worm-halo').evaluate(e=>getComputedStyle(e).display),'none');
  else if(width<=660){const r=await p.locator('.worm-halo img').boundingBox();assert.ok(Math.abs(r.x+r.width/2-width/2)<1,JSON.stringify({width,r}));}
  const footer=await p.locator('footer').evaluate(e=>{const r=e.getBoundingClientRect(),button=e.querySelector('form').getBoundingClientRect();return {stacked:e.classList.contains('is-stacked'),center:r.left+r.width/2,button:button.left+button.width/2};});if(footer.stacked)assert.ok(Math.abs(footer.center-footer.button)<1);
 }
 console.log('PASS: stacked mobile controls, fluid capped specimens, focus overflow/group spacing, original/cropped icons, expanded controls, centred branding and stacked footer');
}finally{await browser.close();server.close();}

// Source dimensions, gallery rhythm, optical exceptions and page scroll ownership.
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
const origin='http://127.0.0.1:'+server.address().port;
const near=(a,b,label)=>assert.ok(Math.abs(a-b)<.6,`${label}: ${a} != ${b}`);
try{
 const source=await browser.newPage({viewport:{width:1440,height:900}});await source.goto(origin+'/ai-workshop-resources');
 const promptWidth=await source.locator('.code-wrap').first().evaluate(e=>e.getBoundingClientRect().width);
 for(const width of [390,1440]){
  const p=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(origin+'/component-playground/typography');const type=p.frameLocator('#type-frame');await type.locator('.feedback-row').last().waitFor();
  const gaps=await type.locator('.type-row').evaluateAll(rows=>rows.slice(0,11).map(r=>r.querySelector('output').getBoundingClientRect().top-r.querySelector('[data-type-sample]').getBoundingClientRect().bottom));for(const gap of gaps)near(gap,16,'type annotation gap');
  for(const sample of await type.locator('[data-in-situ].code-wrap,.feedback-preview>.code-wrap').all())near(await sample.evaluate(e=>e.getBoundingClientRect().width),promptWidth,'actual Resources prompt width');
  const rows=await type.locator('.feedback-row').evaluateAll(es=>es.map(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom})));assert.equal(rows.length,2);assert.ok(rows[1].top>=rows[0].bottom);
  for(const viewport of await type.locator('.prompt-specimen-viewport,.feedback-preview').all())if(width===390){assert.ok(await viewport.evaluate(e=>{e.scrollLeft=9999;return e.scrollLeft>0&&e.scrollHeight===e.clientHeight;}),'wide prompt is reachable horizontally without vertical scroll');}
  near(await type.locator('[data-source-selector="#gate-error"] [data-type-sample]').evaluate(e=>e.getBoundingClientRect().left),24.25,'standalone X group whitespace');
  near(await type.locator('.footer-meta[data-type-sample]').evaluate(e=>e.getBoundingClientRect().left),28,'isolated footer text');
  near(await type.locator('footer button[data-type-sample]').evaluate(e=>e.getBoundingClientRect().left),24,'isolated footer button');
  await p.locator('[data-tab=errors]').click();const states=p.frameLocator('#errors-frame');await states.locator('.full-login-context').first().waitFor();await p.waitForTimeout(300);
  const stateGaps=[];for(const state of ['network','service','retryReady'])stateGaps.push(await states.locator('[data-state='+state+']').evaluate(r=>r.querySelector('.icon-meta').getBoundingClientRect().top-r.querySelector('.full-login-context').getBoundingClientRect().bottom));near(stateGaps[0],stateGaps[1],'connection/service spacing');near(stateGaps[0],stateGaps[2],'retry spacing');
  near(await states.locator('[data-gallery-last] .icon-meta').evaluate(e=>innerHeight-e.getBoundingClientRect().bottom),24,'last annotation bottom');
  await p.locator('[data-tab=focus]').click();const focus=p.frameLocator('#focus-frame');await focus.locator('[data-exterior-ring]').first().waitFor();
  const focusOffsets=await focus.locator('[data-exterior-ring]').evaluateAll(es=>es.map(e=>({padding:parseFloat(getComputedStyle(e).paddingLeft),label:e.closest('.focus-row').querySelector('h3').getBoundingClientRect().left})));assert.equal(focusOffsets.length,9);for(const r of focusOffsets){near(r.padding,34,'focus-only six pixels');near(r.label,28,'unchanged label');}
  await p.locator('[data-tab=icons]').click();await p.frameLocator('#icons-frame').locator('.icon-row').first().waitFor();
  const groups=await p.locator('.playground-icon-entry').evaluateAll(es=>es.map(e=>e.dataset.iconGroups));assert.ok(groups[0].includes('playground'));let seenUI=false;for(const group of groups.slice(1)){if(group.includes('headings'))assert.equal(seenUI,false,'headings before UI');else if(group.includes('ui'))seenUI=true;}
  for(const [tab,id,ready] of [['typography','type','.feedback-row'],['icons','icons','.icon-row'],['errors','errors','.full-login-context'],['focus','focus','.focus-preview'],['components','resources','main'],['components','login','.gate-panel'],['blocks','blocks','.page-placeholder'],['branding','branding','main'],['discovery','discovery','main']]){
   await p.locator('[data-tab='+tab+']').click();const frame=p.locator('#'+id+'-frame');await frame.scrollIntoViewIfNeeded();await p.frameLocator('#'+id+'-frame').locator(ready).first().waitFor();await p.waitForTimeout(400);
   const dimensions=await p.frameLocator('#'+id+'-frame').locator('html').evaluate(e=>({height:innerHeight,scroll:e.scrollHeight}));assert.ok(dimensions.scroll-dimensions.height<2,`${width} ${id} inner vertical range ${JSON.stringify(dimensions)}`);
   assert.equal(await frame.evaluate(e=>e.parentElement.scrollHeight-e.parentElement.clientHeight),0,'outer grey vertical range');
   const box=await frame.boundingBox();await p.mouse.move(Math.max(1,box.x+box.width/2),Math.min(600,Math.max(200,box.y+120)));const before=await p.evaluate(()=>scrollY);await p.mouse.wheel(0,150);await p.waitForTimeout(200);assert.ok(await p.evaluate(()=>scrollY)>before,`${id} wheel scrolls page`);
  }
  await p.locator('[data-tab=colours]').click();const rules=p.locator('.source-rules');await rules.locator('summary').click();
  const alignment=await rules.evaluate(e=>{const range=document.createRange();range.selectNodeContents(e.querySelector('summary').lastChild);return{summary:range.getBoundingClientRect().left,body:e.querySelector('.rule-list>div').getBoundingClientRect().left};});near(alignment.body,alignment.summary,'colour disclosure text rail');
  await p.screenshot({path:'/tmp/colour-disclosure-'+width+'.png'});
  await p.locator('[data-tab=url-reference]').click();const intro=p.locator('.url-reference-intro details');assert.equal(await intro.getAttribute('open'),null);await intro.locator('summary').click();assert.ok(await intro.locator('.reference-intro-copy').isVisible());
  assert.deepEqual(errors,[]);await p.close();
 }
 const p=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});await p.goto(origin+'/component-playground/icons');const spinner=p.frameLocator('#icons-frame').locator('[data-state=loading] [data-input-icon=loading]');await spinner.waitFor();await spinner.evaluate(e=>e.closest('.icon-row').scrollIntoView({block:'center'}));assert.match(await spinner.evaluate(e=>getComputedStyle(e).animationName),/login-spin/);const first=await spinner.evaluate(e=>getComputedStyle(e).transform);await p.waitForTimeout(150);assert.notEqual(await spinner.evaluate(e=>getComputedStyle(e).transform),first);await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await spinner.evaluate(e=>getComputedStyle(e).animationName),'none');
 const nojs=await browser.newPage({javaScriptEnabled:false});for(const width of [390,1440]){await nojs.setViewportSize({width,height:900});await nojs.goto(origin+'/ai-workshop-resources');console.log('Resources no-JS notice',width,await nojs.locator('.javascript-notice').evaluate(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height,text:e.textContent.trim()})));}
 console.log('PASS: source widths, typography gaps, focused controls, ordered icons, spinner motion, no nested vertical scroll and wheel chaining');
}finally{await browser.close();server.close();}

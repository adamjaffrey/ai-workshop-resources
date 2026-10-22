import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
try{for(const engine of [chromium,webkit].filter(e=>!process.env.ENGINE||e.name()===process.env.ENGINE)){
 const browser=await engine.launch(engine===chromium?{channel:'chrome',headless:true}:{headless:true});
 try{for(const width of [390,1440].filter(w=>!process.env.WIDTH||w===Number(process.env.WIDTH))){
 const p=await browser.newPage({viewport:{width,height:1000},...(width===390?{isMobile:true,hasTouch:true}:{})}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(origin+'/ai-workshop-resources');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
 for(const group of ['.controls .toggle','.theme-toggle']){
  await p.keyboard.press('Tab');await p.locator(group+' button[aria-pressed=true]').focus();
  const selected=await p.locator(group+' button[aria-pressed=true]').getAttribute('aria-label');
  await p.keyboard.press('ArrowRight');assert.notEqual(await p.locator(group+' button:focus').getAttribute('aria-label'),selected);
  await p.keyboard.press('Enter');await p.waitForTimeout(400);assert.equal(await p.locator(group+' button:focus').getAttribute('aria-pressed'),'true');
  await p.keyboard.press('ArrowLeft');assert.notEqual(await p.locator(group+' button:focus').getAttribute('aria-pressed'),'true');
 }
 for(const length of ['long','short']){
  if(length==='short')await p.evaluate(()=>scrollTo({top:scrollY-200,behavior:'instant'}));
  await p.evaluate(()=>window.workshopResourceAnchors.navigate('step-3'));const y=await p.evaluate(()=>scrollY);
  for(const selector of ['.step-anchor[data-anchor="step-3-system-build-assistant"]']){
   await p.keyboard.press('Tab');await p.waitForTimeout(100);assert.equal(await p.locator(selector+':focus').count(),1,selector+' '+await p.evaluate(()=>document.activeElement.outerHTML.slice(0,180)));assert.ok(Math.abs(await p.evaluate(()=>scrollY)-y)<1,'Resources landing preserved');
  }
 }
 await p.goto(origin+'/component-playground/url-reference');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
 await p.keyboard.press('Tab');await p.locator('[role=tab][aria-selected=true]').focus();await p.keyboard.press('Tab');
 assert.equal(await p.locator('.url-reference-intro summary:focus').count(),1,'About This Reference follows tabs');
 for(const length of ['long','short']){
  if(length==='short')await p.evaluate(()=>scrollTo({top:scrollY-200,behavior:'instant'}));
  await p.evaluate(()=>window.workshopPlaygroundAnchors.navigate('/component-playground/url-reference#public-query-parameters'));const y=await p.evaluate(()=>scrollY);
  const route=['.heading-anchor[data-anchor="public-query-parameters"]'];
  for(const selector of route){await p.keyboard.press('Tab');await p.waitForTimeout(100);assert.equal(await p.locator(selector+':focus').count(),1,'arrival '+selector+' '+await p.evaluate(()=>document.activeElement.outerHTML.slice(0,180)));assert.ok(Math.abs(await p.evaluate(()=>scrollY)-y)<1,'Playground landing preserved '+selector);}
  assert.equal(await p.locator('#style-dialog[open]').count(),0,'no automatic mobile modal');
 }
 await p.goto(origin+'/component-playground/typography');await p.waitForTimeout(1800);
 if(width<=660){await p.locator('#style-options').click();await p.waitForTimeout(300);assert.equal(await p.locator('#hover>.hover-explainer').count(),1);assert.ok(await p.locator('#hover').evaluate(e=>e.querySelector('.hover-explainer').getBoundingClientRect().top>e.querySelector('.choice-options').getBoundingClientRect().bottom));await p.locator('#style-options').click();await p.waitForTimeout(300);}
 const frame=await (await p.locator('#type-frame').elementHandle()).contentFrame();
 assert.equal(await frame.locator('[tabindex="1"]').count(),0,'no priority inside typography');
 if(width<=660){await p.keyboard.press('Tab');await p.locator('#panel-typography>.panel:first-child .section-collapse').focus();await p.keyboard.press('Tab');await p.waitForTimeout(150);
  assert.equal(await frame.evaluate(()=>document.activeElement.closest('.type-row')?.dataset.sourceSelector),'.eyebrow');
  await p.keyboard.press('Tab');assert.equal(await frame.evaluate(()=>document.activeElement.className),'specimen-viewport');assert.equal(await frame.evaluate(()=>document.activeElement.closest('.type-row')?.dataset.sourceSelector),'h1');
  await p.keyboard.press('Tab');assert.equal(await frame.evaluate(()=>document.activeElement.tagName),'A');
 }
 const link=frame.locator('.page-title-link');await link.focus();
 const password=frame.locator('#workshop-password');await password.focus();await p.waitForTimeout(250);await p.keyboard.press('Tab');await p.waitForTimeout(300);assert.ok(!(await frame.locator('[data-source-selector="#workshop-password"] output').textContent()).includes('oklab'),'settled annotation');
 const rail=await p.locator('#playground-typography').evaluate(e=>[...e.querySelectorAll('.playground-subsection')].map(s=>({right:e.getBoundingClientRect().right-parseFloat(getComputedStyle(e).borderRightWidth)-s.querySelector('.frame-wrap').getBoundingClientRect().right,border:getComputedStyle(s).borderTopWidth})));
 for(const r of rail)assert.ok(Math.abs(r.right-24)<1,JSON.stringify(rail));assert.equal(rail[1].border,'1px');assert.equal(rail[2].border,'1px');
 await p.goto(origin+'/component-playground/icons');await p.waitForTimeout(1000);
 for(const variant of ['arrow-right-modified','arrow-up-right-modified']){assert.equal(await p.locator('#playground-icon-catalog [data-catalog-variant="'+variant+'"]').count(),1);assert.equal(await p.locator('#link-icon-catalog [data-catalog-variant="'+variant+'"]').count(),1);}
 const headingIcons=await p.locator('[data-panel] .section-heading :is(h2,h3)>svg').evaluateAll(es=>es.map(e=>({name:e.dataset.iconVariant||e.dataset.iconName,label:e.parentElement.textContent})));const names=headingIcons.map(e=>e.name);assert.equal(new Set(names).size,names.length,JSON.stringify(headingIcons));
 await p.goto(origin+'/component-playground/easter-egg');await p.waitForTimeout(1500);await p.locator('#egg input[value=after]').evaluate(e=>e.click());await p.waitForTimeout(700);
 const egg=await (await p.locator('#discovery-frame').elementHandle()).contentFrame();await egg.locator('.perspective-discover').click();await egg.locator('.perspective-dialog[open]').waitFor();await p.waitForTimeout(1500);await egg.locator('.perspective-dialog button').click();assert.equal(await egg.locator('.perspective-dialog[open]').count(),0,'Done closes dialog');
 assert.deepEqual(errors,[]);console.log('PASS queued focus, anchors, typography, icons and modal fixes',engine.name(),width);await p.close();
 }}finally{await browser.close();}
}}finally{await new Promise(r=>server.close(r));}

import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const near=(a,b,label)=>assert.ok(Math.abs(a-b)<.25,`${label}: ${a} != ${b}`);
try{for(const engine of [chromium,webkit]){const browser=await engine.launch(engine===chromium?{channel:'chrome',headless:true}:{headless:true});try{for(const width of [320,390,768,1440]){
 const page=await browser.newPage({viewport:{width,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/ai-workshop-resources');await page.evaluate(()=>document.fonts.ready);
 for(const selector of ['.controls .toggle','.theme-toggle']){
  const group=page.locator(selector).first();await page.waitForTimeout(100);
  assert.equal(await group.locator('button[tabindex="0"]').count(),1,'one Tab stop per group');
  const selected=await group.locator('[aria-pressed=true]').getAttribute(selector.includes('theme')?'data-theme-choice':'data-agent');
  await page.keyboard.press('Tab');await group.locator('[tabindex="0"]').focus();await page.keyboard.press('ArrowRight');
  assert.equal(await group.locator('[aria-pressed=true]').getAttribute(selector.includes('theme')?'data-theme-choice':'data-agent'),selected,'arrows do not commit');
  await page.keyboard.press('Tab');assert.equal(await group.evaluate(e=>e.contains(document.activeElement)),false,'Tab exits group');
 }
 if(width>660){const qr=page.locator('.qr-copy');await qr.focus();const result=await qr.locator('.qr-copy-overlay').evaluate(e=>{const c=getComputedStyle(e);return {opacity:c.opacity,duration:c.transitionDuration};});assert.equal(result.opacity,'1');assert.equal(result.duration,'0s','keyboard QR reveal immediate');}
 const anchor=page.locator('.step-anchor').nth(width>660?1:0);await anchor.scrollIntoViewIfNeeded();await page.keyboard.press('Tab');await anchor.focus();
 const bounds=await anchor.evaluate(e=>{const r=e.getBoundingClientRect(),f=e.querySelector('.workshop-link-focus').getBoundingClientRect(),font=parseFloat(getComputedStyle(e).fontSize);return {left:r.left-f.left,top:r.top-f.top,right:f.right-r.right,bottom:f.bottom-r.bottom,font,visible:getComputedStyle(e.querySelector('.workshop-link-focus')).opacity,outline:getComputedStyle(e).outlineStyle};});
 near(bounds.left,6+.075*bounds.font,'left exterior ring');near(bounds.top,6,'top exterior ring');near(bounds.right,6+.125*bounds.font,'right exterior ring');near(bounds.bottom,6+.05*bounds.font,'bottom exterior ring');assert.equal(bounds.visible,'1');assert.equal(bounds.outline,'none');
 if(width===390||width===1440)await page.screenshot({path:`/tmp/control-anchor-${engine.name()}-${width}.png`});
 await page.goto(origin+'/component-playground');await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('[role=tabpanel][tabindex]').count(),0,'no section tab stops');
 const icons=await page.locator('body :is(.icon-button,.preview-expand,#perspective-replay,#style-options,#back-to-top) svg').evaluateAll(es=>es.map(e=>({name:e.dataset.iconName,w:parseFloat(getComputedStyle(e).width),h:parseFloat(getComputedStyle(e).height),stroke:parseFloat(getComputedStyle(e).strokeWidth),viewBox:e.viewBox.baseVal.width})));
 for(const icon of icons){assert.equal(icon.w,22,JSON.stringify(icon));assert.equal(icon.h,22);assert.equal(icon.stroke,2);assert.equal(icon.viewBox,24);}
 const tabs=page.locator('[role=tab]');await page.keyboard.press('Tab');
 await page.locator('[role=tab][aria-selected=true]').focus();const tab=await page.locator('[role=tab][aria-selected=true]').getAttribute('data-tab'),url=page.url();await page.keyboard.press('ArrowRight');await page.waitForTimeout(200);assert.equal(await page.locator('[role=tab][aria-selected=true]').getAttribute('data-tab'),tab);assert.equal(page.url(),url);assert.equal(await page.locator('[role=tab]:focus').evaluate(e=>getComputedStyle(e).backgroundColor),await page.locator('[role=tab]:focus').evaluate(e=>{const probe=document.createElement('span');probe.style.background='var(--action-hover)';e.append(probe);const color=getComputedStyle(probe).backgroundColor;probe.remove();return color;}));const focusedTab=await page.evaluate(()=>document.activeElement.dataset.tab);assert.notEqual(focusedTab,tab);await page.keyboard.press('Enter');assert.equal(await page.locator('[role=tab][aria-selected=true]').getAttribute('data-tab'),focusedTab);
 await page.locator('[data-tab=components]').click();
 // Audit every visible radio group, including the mobile global-options menu.
 for(const menu of width<=660?[true,false]:[false]){
 if(menu)await page.locator('body>#style-options').click();
 for(const group of await page.locator('.choice-options').all()){
  if(!await group.isVisible()||menu&&!await group.evaluate(e=>Boolean(e.closest('#style-dialog'))))continue;
  const inputs=group.locator('input[type=radio]');if(await inputs.count()<2)continue;
  const value=await group.locator('input:checked').inputValue();await page.keyboard.press('Tab');await group.locator('input:checked').focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(100);
  assert.equal(await group.locator('input:checked').inputValue(),value,'browsing preserves value');
  assert.equal(await group.locator('input[tabindex="0"]').count(),1);
  const geometry=await group.evaluate(e=>{const host=e.parentElement,ring=host.querySelector('.workshop-group-ring'),target=document.activeElement.nextElementSibling,r=ring.getBoundingClientRect(),t=target.getBoundingClientRect(),c=getComputedStyle(ring);return {dx:r.x-t.x,dy:r.y-t.y,dw:r.width-t.width,dh:r.height-t.height,offset:c.outlineOffset,visible:c.display,overflow:getComputedStyle(host).overflow,group:e.closest('fieldset').id,modality:document.documentElement.dataset.focusInput,active:document.activeElement.outerHTML,marked:host.hasAttribute('data-group-focus')};});
  for(const k of ['dx','dy','dw','dh'])near(geometry[k],0,'ring '+k);assert.equal(geometry.offset,'3px');assert.notEqual(geometry.visible,'none',JSON.stringify(geometry));assert.equal(geometry.overflow,'visible');assert.equal(await group.evaluate(e=>getComputedStyle(document.activeElement.closest('.choice'),'::before').backgroundColor),await group.evaluate(e=>{const probe=document.createElement('span');probe.style.background='var(--action-hover)';e.append(probe);const color=getComputedStyle(probe).backgroundColor;probe.remove();return color;}),'keyboard focus uses grey hover');
  // Test actual activation separately from browsing, then restore the initial choice.
  const chosen=await page.evaluate(()=>document.activeElement.value);await page.keyboard.press(' ');assert.equal(await group.locator('input:checked').inputValue(),chosen);
  await group.locator('input').evaluateAll((es,value)=>es.find(e=>e.value===value).click(),value);
 }
 if(menu){await page.locator('#style-dialog #style-options').click();await page.locator('#style-dialog').waitFor({state:'hidden'});}
 }
 await page.locator('#state input:checked').focus();await page.keyboard.press('Tab');await page.locator('#state input:checked').focus();await page.keyboard.press('ArrowRight');
 if(width===390||width===1440)await page.screenshot({path:`/tmp/control-selector-${engine.name()}-${width}.png`});
 assert.deepEqual(errors,[]);console.log('PASS shared icons, manual activation, group Tab stops, QR and focus geometry',engine.name(),width);await page.close();
}}finally{await browser.close();}}}finally{await new Promise(r=>server.close(r));}

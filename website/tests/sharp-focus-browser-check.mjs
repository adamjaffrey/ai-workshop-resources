import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
const readRing=(e,pseudo)=>{const c=getComputedStyle(e,pseudo);return [c.outlineWidth,c.outlineOffset,c.borderTopLeftRadius,c.borderTopRightRadius,c.borderBottomRightRadius,c.outlineStyle];};
try{for(const engine of [chromium,webkit]){
 const browser=await engine.launch(engine===chromium?{channel:'chrome',headless:true}:{headless:true});
 try{for(const width of [320,390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:1000}});
  await page.goto(origin+'/ai-workshop-resources');
  await page.evaluate(()=>document.fonts.ready);
  for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
   await page.evaluate(({theme,agent})=>{document.documentElement.dataset.theme=theme;window.workshopAgent.select(agent);document.documentElement.dataset.focusInput='keyboard';},{theme,agent});
   await page.locator('pre').first().focus();
   const actual=await page.locator('.code-wrap').first().evaluate(e=>{const c=getComputedStyle(e,'::after');return [c.outlineWidth,c.outlineOffset,c.borderTopLeftRadius,c.borderTopRightRadius,c.borderBottomRightRadius,c.outlineStyle];});
   assert.deepEqual(actual,['3px','3px','1px','1px','11px','solid']);
  }
  if(width===390){await page.locator('pre').first().scrollIntoViewIfNeeded();await page.screenshot({path:`/tmp/prompt-comparison-${engine.name()}.png`});}
  await page.goto(origin+'/component-playground');await page.locator('[data-tab=typography]').click();
  const frame=page.frameLocator('#type-frame');const pre=frame.locator('.type-row[data-source-selector="pre"] pre');
  await pre.waitFor();await pre.click();await page.keyboard.press('Tab');await pre.focus();
  await page.waitForTimeout(200);
  const overlay=frame.locator('.workshop-focus-overlay');
  assert.deepEqual(await overlay.evaluate(readRing),['3px','3px','1px','1px','11px','solid']);
  assert.equal(await overlay.evaluate(e=>getComputedStyle(e).display),'block');
  assert.equal(await pre.evaluate(e=>getComputedStyle(e.closest('.code-wrap'),'::after').display),'none');
  await page.mouse.click(1,1);await page.waitForTimeout(50);
  assert.equal(await overlay.evaluate(e=>getComputedStyle(e).display),'none');
  await page.locator('[data-tab=url-reference]').click();
  const code=page.locator('#panel-url-reference pre').first();
  await code.evaluate(e=>{for(let p=e.parentElement;p;p=p.parentElement)if(p.matches('details'))p.open=true;});
  await page.keyboard.press('Tab');await code.focus();await page.waitForTimeout(100);
  assert.deepEqual(await code.evaluate(e=>{const c=getComputedStyle(e);return [c.borderTopLeftRadius,c.borderTopRightRadius,c.borderBottomLeftRadius];}),['1px','1px','11px']);
  const codeRing=page.locator('.workshop-focus-overlay');
  if(await codeRing.evaluate(e=>getComputedStyle(e).display)!=='none')assert.equal(await codeRing.evaluate(e=>getComputedStyle(e).borderTopLeftRadius),'7px');
  else assert.equal(await code.evaluate(e=>getComputedStyle(e).outlineOffset),'3px');
  await code.evaluate(e=>{e.style.maxHeight='20px';e.style.overflow='auto';});await page.waitForTimeout(100);await page.keyboard.press('Tab');await code.focus();await page.waitForTimeout(100);
  assert.equal(await codeRing.evaluate(e=>getComputedStyle(e).borderTopLeftRadius),'7px');
  await page.locator('[data-tab=focus]').click();
  const focus=page.frameLocator('#focus-frame');const focusRow=focus.locator('.focus-row').first();
  await focusRow.waitFor();await focusRow.click();await page.keyboard.press('Tab');await focusRow.focus();await page.waitForTimeout(100);
  assert.equal(await focus.locator('.workshop-focus-overlay').evaluate(e=>getComputedStyle(e).borderTopLeftRadius),'7px');
  console.log('PASS shared sharp prompt corners and specimen outline parity',engine.name(),width);
  await page.close();
 }}finally{await browser.close();}
}}finally{await new Promise(r=>server.close(r));}

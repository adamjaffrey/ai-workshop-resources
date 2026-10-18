import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port+'/playground');
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});await page.locator('[data-tab=typography]').click();await page.waitForTimeout(1200);
  const t=page.frameLocator('#type-frame');
  assert.equal(await t.locator('.button-variant').count(),6);
  for(const selector of ['.copy','.qr-copy'])assert.equal(await t.locator('[data-source-selector="'+selector+'"] > .specimen-context').isVisible(),false);
  assert.equal(await t.locator('.type-row').first().evaluate(e=>getComputedStyle(e).paddingTop),'0px');
  assert.equal(await t.locator('[data-source-selector="pre"] .code-wrap').evaluate(e=>getComputedStyle(e).borderTopStyle),'solid');
  assert.equal(await t.locator('[data-source-selector="#workshop-password"] .password-icon').count(),1);
  assert.equal(await t.locator('.feedback-grid').evaluate(e=>getComputedStyle(e).borderBottomStyle),'solid');
  await t.locator('[data-source-selector=".gate-submit"][style*="--source-width"]').waitFor();
  const buttonWidth=await t.locator('[data-type-sample].gate-submit').evaluate(e=>e.getBoundingClientRect().width);assert.ok(buttonWidth>180&&buttonWidth<=365,JSON.stringify({width,buttonWidth}));
  assert.equal(await t.locator('#type-specimens').evaluate(e=>getComputedStyle(e).paddingBottom),'16px');
  await page.locator('[data-tab=errors]').click();await page.waitForTimeout(800);const e=page.frameLocator('#errors-frame');
  const states=await e.locator('#errors-login .icon-row').evaluateAll(es=>es.map(e=>e.dataset.state));assert.equal(states.at(-2),'retryReady');assert.equal(states.at(-1),'JavaScript Unavailable');
  assert.equal(await e.locator('#errors-login').evaluate(e=>getComputedStyle(e).borderTopStyle),'solid');
  for(const node of await e.locator('#errors-resources .error-sample:not(:has(.fallback-context))').all())assert.equal(await node.evaluate(e=>getComputedStyle(e).paddingBottom),'8px');
  await page.locator('[data-tab=focus]').click();await page.waitForTimeout(1000);const f=page.frameLocator('#focus-frame');assert.equal(await f.locator('.focus-row').count(),12);
  assert.equal(await f.locator('.password-field[data-held-focus-within]').count(),4);
  for(const field of await f.locator('.password-field').all())assert.equal(await field.evaluate(e=>getComputedStyle(e).outlineWidth),'3px');
  assert.equal(await f.locator('.selection-preview').count(),6);
 }
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  await page.evaluate(({theme,agent})=>{for(const [name,value] of Object.entries({theme,agent})){const e=document.querySelector('input[name="'+name+'"][value="'+value+'"]');e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}));}},{theme,agent});await page.waitForTimeout(1000);
  const f=page.frameLocator('#focus-frame');for(const state of ['neutral','loading','success','wrong']){const row=f.locator('.focus-row').filter({has:f.locator('h3',{hasText:'Password · '+({neutral:'Neutral',loading:'Checking',success:'Success',wrong:'Incorrect Password'}[state])})});assert.equal(await row.locator('.password-field').evaluate((e,state)=>{const token=state==='wrong'?'--error':state==='success'?'--success':'--icon-ink';const probe=document.createElement('i');probe.style.color='var('+token+')';e.append(probe);const expected=getComputedStyle(probe).color;probe.remove();return getComputedStyle(e).outlineColor===expected;},state),true);}
 }
 assert.deepEqual(errors,[]);console.log('PASS: contextual typography, only three copy variants, spacing/dividers, bounded notices and controls, status ordering, shared focus/selection gallery');
}finally{await browser.close();server.close();}

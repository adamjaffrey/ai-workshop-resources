import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
try{for(const engine of [chromium,webkit]){
 const browser=await engine.launch(engine===chromium?{channel:'chrome',headless:true}:{headless:true});
 try{for(const width of [320,390,768,1440]){
  const p=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  await p.goto(origin+'/component-playground');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
  await p.keyboard.press('Tab');
  for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
   await p.evaluate(({theme,agent})=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.agent=agent;},{theme,agent});
   for(const tab of await p.locator('[role=tab]').all()){
    await tab.focus();await p.waitForTimeout(25);
    const state=await tab.evaluate(e=>{const ring=document.querySelector('.tab-scroll-shell>.workshop-group-ring'),c=getComputedStyle(ring),upper=c,overlay=document.querySelector('.workshop-focus-overlay');return {radii:[c.borderTopLeftRadius,c.borderTopRightRadius,c.borderBottomLeftRadius,c.borderBottomRightRadius],outline:[upper.outlineWidth,upper.outlineOffset,upper.outlineStyle],lowerLayers:document.querySelectorAll('.workshop-tab-ring-bottom').length,hostOutline:c.outlineStyle,upperClip:upper.clipPath,ring:c.display,buttonOutline:getComputedStyle(e).outlineStyle,overlay:getComputedStyle(overlay).display,overlayEligible:Boolean(document.documentElement.dataset.specimenGallery||e.matches('[data-scroll-focus],input[type=range],#style-dialog #style-options')||e.closest('.preview-dialog.is-expanded')),marked:e.hasAttribute('data-overlay-focus')};});
    assert.deepEqual(state.radii,['8px','8px','1px','1px']);assert.deepEqual(state.outline,['3px','3px','solid']);assert.equal(state.lowerLayers,0);assert.equal(state.hostOutline,'solid');assert.equal(state.upperClip,'none');assert.notEqual(state.ring,'none');assert.equal(state.buttonOutline,'none');assert.equal(state.overlay,'none');assert.equal(state.overlayEligible,false);assert.equal(state.marked,false);
   }
  }
  await p.evaluate(()=>{document.documentElement.dataset.theme='light';document.documentElement.dataset.agent='codex';});
  const first=p.locator('[role=tab]').first();await first.focus();await p.waitForTimeout(250);
  if(process.env.CAPTURE_PHASE){const r=await p.locator('.tab-scroll-shell>.workshop-group-ring').boundingBox();await p.screenshot({path:`/tmp/tab-geometry-${process.env.CAPTURE_PHASE}-${engine.name()}-${width}.png`,clip:{x:Math.max(0,r.x-8),y:Math.max(0,r.y-8),width:Math.min(width-Math.max(0,r.x-8),r.width+16),height:r.height+16}});}
  await p.locator('#login-preview .preview-expand').click();
  assert.equal(await p.locator('[role=tab]').first().evaluate(e=>Boolean(e.closest('.preview-dialog.is-expanded'))),false);
  await p.keyboard.press('Escape');await p.keyboard.press('Tab');await first.focus();await p.waitForTimeout(50);
  assert.equal(await p.locator('.workshop-focus-overlay').evaluate(e=>getComputedStyle(e).display),'none');
  await p.mouse.click(1,1);assert.equal(await p.locator('.tab-scroll-shell>.workshop-group-ring').evaluate(e=>getComputedStyle(e).display),'none');
  console.log('PASS tab ownership, 1px base bottom corners, single ring and modal restoration',engine.name(),width);await p.close();
 }}finally{await browser.close();}
}}finally{await new Promise(r=>server.close(r));}

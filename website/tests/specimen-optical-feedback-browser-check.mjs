import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
const near=(a,b,label)=>assert.ok(Math.abs(a-b)<.6,`${label}: ${a} != ${b}`);
try{
 for(const width of [390,1440])for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  const p=await browser.newPage({viewport:{width,height:1000},isMobile:width===390,reducedMotion:'reduce'});
  const origin=`http://127.0.0.1:${server.address().port}`,query=`?theme=${theme}&agent=${agent}`;
  await p.goto(origin+'/component-playground/typography'+query);
  const type=p.frameLocator('#type-frame');await type.locator('.notice-type-row').last().waitFor();
  near(await type.locator('figcaption[data-type-sample]').evaluate(e=>{const r=document.createRange();r.selectNodeContents(e);return r.getBoundingClientRect().left;}),28,'caption text rail');
  assert.ok(await type.locator('h1[data-type-sample]').evaluate(e=>{const r=document.createRange();r.selectNodeContents(e);return e.getBoundingClientRect().width-r.getBoundingClientRect().width<1.1;}),'responsive heading has no unused desktop column width');
  assert.equal(await type.locator('[data-source-selector=".footer-meta"] .specimen-viewport').evaluate(e=>e.scrollWidth-e.clientWidth),0,'compact footer has no empty source-column scrolling');
  for(const selector of ['.eyebrow','.step-title','label[for="workshop-password"]','#gate-error']){
   const row=type.locator('[data-source-selector='+JSON.stringify(selector)+']');
   if(await row.count())assert.equal(await row.locator('.specimen-viewport').evaluate(e=>e.scrollWidth-e.clientWidth),0,selector+' has no empty scrolling');
  }
  await p.locator('[data-tab=errors]').click();const errors=p.frameLocator('#errors-frame');await errors.locator('#errors-resources .fallback-context').waitFor();
  near(await errors.locator('#errors-resources .fallback-context').evaluate(e=>e.getBoundingClientRect().left),24,'full Resources boundary');
  assert.equal(await errors.locator('#errors-resources .error-sample:has(.fallback-context)').evaluate(e=>getComputedStyle(e).borderLeftWidth),'0px');
  await p.locator('[data-tab=focus]').click();const focus=p.frameLocator('#focus-frame');await focus.locator('.selection-preview').last().waitFor();
  for(const row of await focus.locator('.focus-row:has(.selection-preview)').all()){
   const styles=await row.evaluate(e=>{const read=n=>{const c=getComputedStyle(n);return ['fontFamily','fontSize','fontWeight','fontStyle','lineHeight','letterSpacing'].map(k=>c[k]);};return[read(e.querySelector('[data-focus-target]')),read(e.querySelector('.selection-preview'))];});
   assert.deepEqual(styles[1],styles[0],'selected text uses source typography');
  }
  for(const root of await focus.locator('.focus-preview>.qr-copy,.focus-preview>.segmented-toggle').all()){
   const target=root.locator('[data-focus-target]');const node=await root.getAttribute('data-focus-target')!==null?root:target;
   near(await node.evaluate(e=>{const c=getComputedStyle(e);return e.getBoundingClientRect().left-parseFloat(c.outlineWidth)-parseFloat(c.outlineOffset);}),24,'focus ink rail');
  }
  assert.equal(await focus.locator('.focus-preview:has(>.qr-copy)').evaluate(e=>e.scrollWidth-e.clientWidth),0,'QR control has no phantom overflow');
  assert.equal(await focus.locator('.focus-preview>.qr-copy .qr-copy-overlay').evaluate(e=>getComputedStyle(e).opacity),'1','QR uses the real keyboard-focus overlay');
  await p.locator('[data-tab=icons]').click();const icons=p.frameLocator('#icons-frame');await icons.locator('[data-unicode-target]').last().waitFor();
  const bullet=await icons.locator('[data-state="Unwrapped Footer"]').evaluate(e=>{
   const meta=e.querySelector('.footer-meta'),version=meta.querySelector('.footer-version'),copyright=meta.querySelector('.footer-copyright'),viewport=e.querySelector('.icon-sample');
   return {wrapped:meta.classList.contains('is-wrapped'),bullet:getComputedStyle(copyright,'::before').content,sameLine:Math.abs(version.getBoundingClientRect().top-copyright.getBoundingClientRect().top)<1,scroll:viewport.scrollWidth-viewport.clientWidth};
  });
  assert.equal(bullet.wrapped,false,'Icons preserves the unwrapped footer example');assert.ok(bullet.sameLine&&bullet.bullet.includes('•'),'bullet remains visible in its source line');if(width===390)assert.ok(bullet.scroll>0,'wide bullet example remains horizontally accessible');
  assert.ok(await icons.locator('[data-unicode-target]').count()>=4);
  for(const prompt of await icons.locator('[data-unicode-target]').all()){
   const result=await prompt.evaluate(e=>{const pre=e.querySelector('pre'),w=document.createTreeWalker(pre,NodeFilter.SHOW_TEXT);while(w.nextNode()){const i=w.currentNode.textContent.indexOf(e.dataset.unicodeTarget);if(i<0)continue;const r=document.createRange();r.setStart(w.currentNode,i);r.setEnd(w.currentNode,i+e.dataset.unicodeTarget.length);const a=r.getBoundingClientRect(),b=pre.getBoundingClientRect(),v=e.parentElement.getBoundingClientRect();return{full:pre.textContent.length>1000,scroll:pre.scrollTop,visible:a.top>=b.top&&a.bottom<=b.bottom&&a.left>=v.left&&a.right<=v.right,font:getComputedStyle(pre).fontFamily};}});
   assert.ok(result.full&&result.scroll>0&&result.visible,JSON.stringify(result));assert.match(result.font,/monospace/);
  }
  await p.close();console.log('PASS optical feedback',width,theme,agent);
 }
}finally{await browser.close();server.close();}

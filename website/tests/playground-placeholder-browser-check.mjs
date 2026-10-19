import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const app=createPhonePreview({protectPlayground:true});await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+app.server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const p=await browser.newPage({reducedMotion:'reduce'});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,660,661,700,701,768,1023,1024,1440])for(const height of [600,1000]){
  await p.setViewportSize({width,height});await p.goto(origin+'/playground/components');
  const frame=await p.locator('.playground-placeholder>iframe').elementHandle().then(e=>e.contentFrame());
  await frame.waitForSelector('.ph-word');await frame.evaluate(()=>document.fonts.ready);
  assert.equal(await p.evaluate(()=>document.activeElement.id),'gate-title');
  assert.equal(await p.locator('.playground-placeholder>iframe').getAttribute('sandbox'),'allow-same-origin');
  assert.equal(await frame.locator('[data-panel]').count(),1);
  assert.equal(await frame.locator('.inspector-dock').count(),1);
  assert.equal(await frame.locator('.inspector-dock').evaluate(e=>e.parentElement.matches('main.wrap')&&!e.nextElementSibling&&getComputedStyle(e).position==='static'),true);
  for(const doc of [frame,...frame.childFrames()]){assert.deepEqual(await doc.evaluate(()=>[...document.querySelectorAll('*')].filter(e=>['fixed','sticky'].includes(getComputedStyle(e).position)).map(e=>e.id||e.tagName)),[]);}
  const toolY=await frame.locator('#style-options').evaluate(e=>e.getBoundingClientRect().top);
  const delta=await frame.evaluate(()=>{scrollTo(0,180);return scrollY;});
  assert.ok(delta>0);if(await frame.locator('#style-options').isVisible())assert.ok(Math.abs((await frame.locator('#style-options').evaluate(e=>e.getBoundingClientRect().top))-toolY+delta)<1);
  await frame.evaluate(()=>scrollTo(0,0));
  assert.equal(await frame.locator('[data-panel]').getAttribute('data-panel'),'components');
  for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
   await p.evaluate(({theme,agent})=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.selectedAgent=agent;},{theme,agent});
   await frame.waitForFunction(({theme,agent})=>document.documentElement.dataset.theme===theme&&document.documentElement.dataset.selectedAgent===agent,{theme,agent});

   assert.equal((await frame.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--agent-accent'))).trim(),agent==='codex'?'#0285FF':'#D97757');
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   assert.equal(await frame.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${width} overflow`);
   const exposed=await frame.evaluate(()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let text='';while(w.nextNode())if(!w.currentNode.parentElement.closest('style,script'))text+=w.currentNode.textContent;return text;});
   assert.doesNotMatch(exposed,/[^x\s/\-]/);
   assert.equal(await frame.locator('script,[href],[onclick],form,input[value]').count(),0);
  }
  if([390,1440].includes(width)&&height===1000){await p.evaluate(()=>{document.documentElement.dataset.theme='light';document.documentElement.dataset.selectedAgent='codex';});await frame.waitForFunction(()=>document.documentElement.dataset.theme==='light'&&document.documentElement.dataset.selectedAgent==='codex');await p.screenshot({path:`/tmp/playground-login-${width}.png`});await p.evaluate(()=>{document.querySelector('.access-gate').style.display='none';document.querySelector('.page-placeholder').style.filter='none';});await p.screenshot({path:`/tmp/playground-blocks-${width}.png`});}
  console.log(`PASS Components backdrop ${width}x${height}, themes/agents, anonymous content and containment`);
 }
 assert.deepEqual(errors,[]);
}finally{await browser.close();await new Promise(r=>app.server.close(r));}

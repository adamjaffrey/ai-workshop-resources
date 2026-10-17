import assert from 'node:assert/strict';
import {once} from 'node:events';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();
server.listen(0,'127.0.0.1');await once(server,'listening');
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({reducedMotion:'reduce'});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const agent=()=>page.locator('html').getAttribute('data-selected-agent');
async function login(){
 await page.locator('#workshop-password').fill(password);
 await page.getByRole('button',{name:'Unlock Resources',exact:true}).click();
 await page.locator('#access-gate').waitFor({state:'detached'});
 await page.getByRole('button',{name:'Log Out',exact:true}).waitFor();
}
try{
 await page.goto(origin);assert.equal(await agent(),'codex');
 assert.equal(await page.locator('.gate-submit').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(2, 133, 255)');
 await login();
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:844});
  const boxes=await page.locator('footer').evaluate(e=>{
   const f=e.getBoundingClientRect(),b=e.querySelector('button').getBoundingClientRect();return{right:f.right-b.right,bottom:f.bottom-b.bottom,overflow:document.documentElement.scrollWidth>innerWidth};
  });
  assert.ok(Math.abs(boxes.right)<1&&Math.abs(boxes.bottom)<1);assert.equal(boxes.overflow,false);
 }
 await page.getByRole('button',{name:'Claude Code',exact:true}).click();assert.equal(await agent(),'claude-code');
 assert.match(await page.locator('#system-blueprint-creator').textContent(),/--agent claude-code/);
 const other=await context.newPage();await other.goto(origin);assert.equal(await other.locator('html').getAttribute('data-selected-agent'),'claude-code');
 await page.getByRole('button',{name:'Log Out',exact:true}).click();await page.locator('#access-gate').waitFor();
 assert.equal(await agent(),'claude-code');
 for(const theme of ['light','dark']){
  if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('[data-theme-choice="'+theme+'"]').click();
  assert.equal(await page.locator('.gate-submit').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(217, 119, 87)');
  const ink=await page.locator('.gate-toolbar .eyebrow').evaluate(e=>getComputedStyle(e).color);
  assert.equal(await page.locator('.password-field .icon').evaluate(e=>getComputedStyle(e).color),ink);
 }
 await page.reload();assert.equal(await agent(),'claude-code');await login();
 assert.equal(await page.getByRole('button',{name:'Claude Code',exact:true}).getAttribute('aria-pressed'),'true');
 await page.getByRole('button',{name:'Codex',exact:true}).click();
 await other.waitForFunction(()=>document.documentElement.dataset.selectedAgent==='codex');
 assert.equal(await other.getByRole('button',{name:'Codex',exact:true}).getAttribute('aria-pressed'),'true');
 await page.getByRole('button',{name:'Log Out',exact:true}).click();await page.locator('#access-gate').waitFor();assert.equal(await agent(),'codex');
 await page.evaluate(()=>localStorage.setItem('workshop-selected-agent','invalid'));await page.reload();assert.equal(await agent(),'codex');
 const denied=await browser.newContext({reducedMotion:'reduce'});await denied.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('Denied');}}));
 const blocked=await denied.newPage();await blocked.goto(origin);assert.equal(await blocked.locator('html').getAttribute('data-selected-agent'),'codex');
 await blocked.locator('#workshop-password').fill(password);await blocked.getByRole('button',{name:'Unlock Resources',exact:true}).click();await blocked.locator('#access-gate').waitFor({state:'detached'});
 await blocked.getByRole('button',{name:'Claude Code',exact:true}).click();assert.equal(await blocked.locator('html').getAttribute('data-selected-agent'),'claude-code');
 assert.deepEqual(errors,[]);
 console.log('PASS: default accent, login/logout/reload persistence, both themes, prompt selection, cross-tab sync, invalid/denied storage and footer alignment at four widths');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {handleRequest} from '../lib/workshop-handler.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const b=await chromium.launch({channel:'chrome',headless:true});
try{
const p=await b.newPage();const errors=[];const writes=[];
p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(r.method()!=='GET')writes.push(r.url());});
await p.goto(origin+'/style-guide');
const login=p.frameLocator('#login-frame'),resources=p.frameLocator('#resources-frame');
await login.locator('#workshop-password').waitFor();
for(const width of [390,1440]){
 await p.setViewportSize({width,height:900});
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  await p.selectOption('#theme',theme);await p.selectOption('#agent',agent);await p.waitForTimeout(500);
  assert.equal(await login.locator('html').getAttribute('data-theme'),theme);
  assert.equal(await resources.locator('html').getAttribute('data-selected-agent'),agent);
  for(const state of ['loading','success','wrong','empty','network','service','generic','limited','disabled','text','neutral']){
   await p.selectOption('#state',state);await p.waitForTimeout(40);
   const input=login.locator('#workshop-password');
   if(state==='wrong'){assert.equal(await input.getAttribute('aria-invalid'),'true');await input.fill('edited');assert.equal(await input.getAttribute('aria-invalid'),null);}
   if(state==='success')assert.equal(await login.locator('.gate-panel').evaluate(e=>e.classList.contains('is-success')),true);
   if(state==='loading')assert.equal(await login.locator('[data-input-icon=loading]').isVisible(),true);
   if(state==='text')assert.equal(await input.getAttribute('type'),'text');
  }
 }
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
}
await p.selectOption('#hover','on');await p.waitForTimeout(350);
assert.equal(await resources.locator('html').getAttribute('data-demo-hover'),'');
assert.equal(await resources.locator('.copy').first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(48, 57, 70)');
await p.selectOption('#width','320');await p.waitForTimeout(50);assert.equal(await resources.locator('html').evaluate(()=>innerWidth),320);
await p.selectOption('#width','fluid');await p.selectOption('#hover','off');
await p.selectOption('#copy','error');await resources.locator('[data-copy]').first().click();
assert.equal(await resources.locator('[data-copy]').first().getAttribute('data-copy-error')!==null,true);
await p.selectOption('#copy','success');await resources.locator('[data-copy]').first().click();
assert.equal(await resources.locator('[data-copy]').first().getAttribute('data-copied'),'true');
await resources.locator('footer button').click();assert.equal(p.url(),origin+'/style-guide');
await p.click('[data-tab=typography]');await p.frameLocator('#type-frame').locator('a').click();assert.equal(p.url(),origin+'/style-guide');
assert.match(await p.frameLocator('#type-frame').locator('output').first().textContent(),/48px/);
await p.click('[data-tab=colours]');assert.ok(await p.locator('[data-token]').count()>20);
assert.equal(writes.length,0);assert.deepEqual(errors,[]);
await p.screenshot({path:'/tmp/style-guide-colours.png',fullPage:true});
await p.click('[data-tab=components]');await p.locator('#login-frame').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/style-guide-components.png'});
await p.setViewportSize({width:390,height:844});await p.locator('#login-frame').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/style-guide-mobile.png'});
const production=await handleRequest(new Request('http://production/style-guide'),{});assert.notEqual(production.status,200);
console.log('PASS: mobile/desktop, both agents/themes, all held login states, copy feedback, navigation containment, tokens, typography and production exclusion');
}finally{await b.close();await new Promise(r=>server.close(r));}

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
const choose=async(id,value)=>{const input=p.locator('input[name="'+id+'"][value="'+value+'"]');await input.locator('..').click();assert.equal(await input.isChecked(),true);};
assert.equal(await p.locator('select').count(),0);
const login=p.frameLocator('#login-frame'),resources=p.frameLocator('#resources-frame');
await login.locator('#workshop-password').waitFor();
for(const width of [390,1440]){
 await p.setViewportSize({width,height:900});
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  await choose('theme',theme);await choose('agent',agent);await p.waitForTimeout(500);
  assert.equal(await login.locator('html').getAttribute('data-theme'),theme);
  assert.equal(await resources.locator('html').getAttribute('data-selected-agent'),agent);
  for(const state of ['loading','success','wrong','empty','network','service','generic','limited','disabled','text','neutral']){
   await choose('state',state);await p.waitForTimeout(40);
   const input=login.locator('#workshop-password');
   if(state==='wrong'){assert.equal(await input.getAttribute('aria-invalid'),'true');await input.fill('edited');assert.equal(await input.getAttribute('aria-invalid'),null);}
   if(state==='success')assert.equal(await login.locator('.gate-panel').evaluate(e=>e.classList.contains('is-success')),true);
   if(state==='loading')assert.equal(await login.locator('[data-input-icon=loading]').isVisible(),true);
   if(state==='text')assert.equal(await input.getAttribute('type'),'text');
  }
 }
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
}
await choose('hover','on');await p.waitForTimeout(350);
assert.equal(await resources.locator('html').getAttribute('data-demo-hover'),'');
assert.equal(await resources.locator('.copy').first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(48, 57, 70)');
await choose('width','320');await p.waitForTimeout(50);assert.equal(await resources.locator('html').evaluate(()=>innerWidth),320);
await choose('width','fluid');await choose('hover','off');
await choose('copy','error');await resources.locator('[data-copy]').first().click();
assert.equal(await resources.locator('[data-copy]').first().getAttribute('data-copy-error')!==null,true);
await choose('copy','success');await resources.locator('[data-copy]').first().click();
assert.equal(await resources.locator('[data-copy]').first().getAttribute('data-copied'),'true');
await resources.locator('footer button').click();assert.equal(p.url(),origin+'/style-guide');
await p.click('[data-tab=typography]');await p.frameLocator('#type-frame').locator('a').click();assert.equal(p.url(),origin+'/style-guide');
assert.match(await p.frameLocator('#type-frame').locator('output').first().textContent(),/48px/);
// Inspector stays docked and never changes its own geometry while inspecting.
await p.click('#inspector-details');
const type=p.frameLocator('#type-frame');await type.locator('h1').hover();await p.waitForTimeout(260);
const firstReading=await p.locator('#inspection-summary').textContent();assert.match(firstReading,/h1/);
await p.click('#freeze-inspector');await type.locator('h2').hover();await p.waitForTimeout(260);assert.equal(await p.locator('#inspection-summary').textContent(),firstReading);
await p.click('#freeze-inspector');await type.locator('h2').hover();await p.waitForTimeout(260);
assert.match(await p.locator('#inspection-summary').textContent(),/h2/);
const dock=await p.locator('.inspector-dock').boundingBox();assert.ok(Math.abs(dock.y+dock.height-900)<2);
// Same semantic specimen, even when crossing its generated metadata.
await type.locator('.type-row').nth(1).locator('output').hover();await p.waitForTimeout(260);assert.match(await p.locator('#inspection-summary').textContent(),/h2/);
await p.click('#inspector-details');
await p.click('[data-tab=blocks]');const blocks=p.frameLocator('#blocks-frame');
await choose('review','clear');await blocks.locator('.ph-word').first().click();
await p.waitForFunction(()=>document.getElementById('block-report').textContent.startsWith('Selected word block'));
assert.match(await p.locator('#block-report').textContent(),/Selected word block/);assert.equal(await blocks.locator('#block-highlight').isVisible(),true);
await p.locator('#strength').fill('70');await p.locator('#blur').fill('8.5');await choose('review','blurred');
assert.equal(await blocks.locator('.page-placeholder').evaluate(e=>getComputedStyle(e).filter),'blur(8.5px)');
assert.equal(await blocks.locator('.page-placeholder').evaluate(e=>getComputedStyle(e).getPropertyValue('--ph-strength')),'70%');
await choose('review','panel');assert.equal(await blocks.locator('.access-gate').isVisible(),true);
await choose('review','clear');assert.equal(await blocks.locator('.page-placeholder').evaluate(e=>getComputedStyle(e).filter),'none');
await p.click('#reset-blocks');assert.equal(await p.locator('#strength').inputValue(),'40');assert.equal(await p.locator('#blur').inputValue(),'4');
await p.screenshot({path:'/tmp/style-guide-blocks.png'});
await p.click('[data-tab=colours]');assert.ok(await p.locator('[data-token]').count()>20);
assert.equal(writes.length,0);assert.deepEqual(errors,[]);
await p.screenshot({path:'/tmp/style-guide-colours.png',fullPage:true});
await p.click('[data-tab=components]');await p.locator('#login-frame').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/style-guide-components.png'});
await p.setViewportSize({width:390,height:844});await p.locator('#login-frame').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/style-guide-mobile.png'});
const production=await handleRequest(new Request('http://production/style-guide'),{});assert.notEqual(production.status,200);
console.log('PASS: radios, docked/frozen/debounced inspector, block selection/blur controls, mobile/desktop, both agents/themes, all held login states, copy feedback, navigation containment, tokens, typography and production exclusion');
}finally{await b.close();await new Promise(r=>server.close(r));}

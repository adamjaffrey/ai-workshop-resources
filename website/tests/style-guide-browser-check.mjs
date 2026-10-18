import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {loginMessages} from '../lib/workshop-login-messages.mjs';
import {handleRequest} from '../lib/workshop-handler.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const b=await chromium.launch({channel:'chrome',headless:true});
try{
const p=await b.newPage();const errors=[];const writes=[];
p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(r.method()!=='GET')writes.push(r.url());});
await p.goto(origin+'/playground');
const choose=async(id,value)=>{const mobile=['theme','agent','width','hover'].includes(id)&&p.viewportSize().width<=660;if(mobile){await p.click('#style-options');assert.equal(await p.locator('#style-dialog').evaluate(e=>e.matches(':popover-open')),true);assert.equal(await p.locator('#style-dialog-title').evaluate(e=>document.activeElement===e),true);assert.equal(await p.locator('#style-dialog-title').evaluate(e=>getComputedStyle(e).outlineStyle),'none');await p.keyboard.press('Tab');await p.waitForTimeout(200);assert.equal(await p.locator('#style-options').evaluate(e=>document.activeElement===e),true);}const input=p.locator('input[name="'+id+'"][value="'+value+'"]');await input.locator('..').click();assert.equal(await input.isChecked(),true);if(mobile){await p.click('#style-options');await p.waitForFunction(()=>!document.getElementById('style-dialog').matches(':popover-open'));assert.equal(await p.locator('#style-options').evaluate(e=>document.activeElement===e),true);}};
assert.equal(await p.locator('select').count(),0);
async function verifySourceParity(){await p.click('[data-tab=typography]');await p.waitForTimeout(350);
const specimens=await p.frameLocator('#type-frame').locator('.type-row').evaluateAll(rows=>rows.map(row=>{const e=row.querySelector('[data-type-sample]'),c=getComputedStyle(e);return {page:row.dataset.sourcePage,selector:row.dataset.sourceSelector,text:e.textContent,style:[c.fontFamily,c.fontSize,c.fontWeight,c.lineHeight,c.letterSpacing,c.color,c.textTransform]};}));
for(const specimen of specimens){const actual=await (specimen.page==='login'?login:resources).locator(specimen.selector).first().evaluate(e=>{const c=getComputedStyle(e);return{text:e.textContent,style:[c.fontFamily,c.fontSize,c.fontWeight,c.lineHeight,c.letterSpacing,c.color,c.textTransform]};});assert.deepEqual({text:specimen.text,style:specimen.style},actual,specimen.page+' '+specimen.selector);}
await p.click('[data-tab=components]');}

const login=p.frameLocator('#login-frame'),resources=p.frameLocator('#resources-frame');
await login.locator('#workshop-password').waitFor();
for(const width of [390,1440]){
 await p.setViewportSize({width,height:900});
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  await choose('theme',theme);await choose('agent',agent);await p.waitForTimeout(500);
  assert.equal(await login.locator('html').getAttribute('data-theme'),theme);
  assert.equal(await resources.locator('html').getAttribute('data-selected-agent'),agent);
  for(const state of ['loading','success','wrong','empty','network','service','generic','limited','limitedLater','retryReady','neutral']){
   await choose('state',state);await p.waitForTimeout(40);
   const input=login.locator('#workshop-password');
   if(['empty','wrong','network','service','generic','limitedLater'].includes(state))assert.equal(await login.locator('#gate-error span').textContent(),loginMessages[state]);
   if(state==='wrong'){assert.equal(await input.getAttribute('aria-invalid'),'true');await input.fill('edited');assert.equal(await input.getAttribute('aria-invalid'),null);}
   if(state==='success')assert.equal(await login.locator('.gate-panel').evaluate(e=>e.classList.contains('is-success')),true);
   if(state==='retryReady')assert.equal(await login.locator('#login-announcement').textContent(),loginMessages.retryReady);
   if(state==='loading')assert.equal(await login.locator('[data-input-icon=loading]').isVisible(),true);
  }
  await verifySourceParity();
 }
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 if(width===390){const rail=await p.locator('#state .choice-options').evaluate(e=>({scroll:e.scrollWidth,width:e.clientWidth,rows:e.querySelectorAll('.state-row').length}));assert.ok(rail.scroll>rail.width);assert.equal(rail.rows,2);}

}
await choose('hover','on');await p.waitForTimeout(350);
assert.equal(await resources.locator('html').getAttribute('data-demo-hover'),'');
assert.equal(await resources.locator('.copy').first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(48, 57, 70)');
await choose('width','320');await p.waitForTimeout(50);assert.equal(await resources.locator('html').evaluate(()=>innerWidth),320);
await choose('width','fluid');await choose('hover','off');
const copyGap=await p.locator('#copy').evaluate(e=>e.nextElementSibling.getBoundingClientRect().top-e.getBoundingClientRect().bottom);assert.ok(copyGap>=20);
await choose('copy','error');await resources.locator('[data-copy]').first().click();
assert.equal(await resources.locator('[data-copy]').first().getAttribute('data-copy-error')!==null,true);
await choose('copy','success');await resources.locator('[data-copy]').first().click();
assert.equal(await resources.locator('[data-copy]').first().getAttribute('data-copied'),'true');
await resources.locator('footer button').click();assert.equal(p.url(),origin+'/playground');
await p.click('[data-tab=typography]');assert.equal(p.url(),origin+'/playground');
assert.match(await p.frameLocator('#type-frame').locator('output').first().textContent(),/48px/);
await p.waitForTimeout(400);
const headingStyles=await p.frameLocator('#type-frame').locator('h2[data-type-sample]').evaluateAll(es=>es.map(e=>{const c=getComputedStyle(e);return {size:c.fontSize,weight:c.fontWeight,colour:c.color};}));assert.equal(headingStyles.length,2);assert.equal(headingStyles[0].size,headingStyles[1].size);assert.equal(headingStyles[0].weight,headingStyles[1].weight);assert.notEqual(headingStyles[0].colour,headingStyles[1].colour);
// Inspector stays docked and never changes its own geometry while inspecting.
await p.click('#inspector-toggle');await p.click('#inspector-details');
const type=p.frameLocator('#type-frame');await type.locator('h1').hover();await p.waitForTimeout(260);
const firstReading=await p.locator('#inspection-summary').textContent();assert.match(firstReading,/h1/);
await p.click('#freeze-inspector');await type.locator('h2').first().hover();await p.waitForTimeout(260);assert.equal(await p.locator('#inspection-summary').textContent(),firstReading);
await p.click('#freeze-inspector');await type.locator('h2').first().hover();await p.waitForTimeout(260);
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
await p.locator('#dim').fill('25');await p.waitForTimeout(50);assert.equal(await blocks.locator('#preview-scrim').evaluate(e=>getComputedStyle(e).backgroundColor),'rgba(0, 0, 0, 0.25)');
await choose('review','panel');assert.equal(await blocks.locator('.access-gate').isVisible(),true);
assert.equal(await blocks.locator('.access-gate').evaluate(e=>getComputedStyle(e).backdropFilter),'none');
await choose('review','clear');assert.equal(await blocks.locator('.page-placeholder').evaluate(e=>getComputedStyle(e).filter),'none');
await p.click('#reset-blocks');await p.waitForTimeout(100);assert.equal(await p.locator('#strength').inputValue(),'40');assert.equal(await p.locator('#blur').inputValue(),'4');
await p.screenshot({path:'/tmp/style-guide-blocks.png'});
await p.click('[data-tab=colours]');assert.ok(await p.locator('[data-token]').count()>20);
assert.equal(writes.length,0);assert.deepEqual(errors,[]);
await p.screenshot({path:'/tmp/style-guide-colours.png',fullPage:true});
await p.click('[data-tab=components]');await p.locator('#login-frame').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/style-guide-components.png'});
await p.setViewportSize({width:390,height:844});await p.locator('#login-frame').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/style-guide-mobile.png'});
const production=await handleRequest(new Request('http://production/playground'),{});assert.notEqual(production.status,200);
console.log('PASS: radios, docked/frozen/debounced inspector, block selection/blur controls, mobile/desktop, both agents/themes, all held login states, copy feedback, navigation containment, tokens, typography and production exclusion');
}finally{await b.close();await new Promise(r=>server.close(r));}

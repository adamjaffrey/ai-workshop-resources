import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {loginMessages} from '../lib/workshop-login-messages.mjs';
import {handleRequest} from '../lib/workshop-handler.mjs';
const {server,password}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const b=await chromium.launch({channel:'chrome',headless:true});
try{
const p=await b.newPage();const errors=[];const writes=[];
p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(r.method()!=='GET')writes.push(r.url());});
await p.goto(origin+'/playground');
const choose=async(id,value)=>{const mobile=['theme','agent','width','hover'].includes(id)&&p.viewportSize().width<=660;if(mobile){await p.click('#style-options');assert.equal(await p.locator('#style-dialog').evaluate(e=>e.open),true);assert.equal(await p.locator('#style-dialog-title').evaluate(e=>document.activeElement===e),true);assert.equal(await p.locator('#style-dialog-title').evaluate(e=>getComputedStyle(e).outlineStyle),'none');await p.keyboard.press('Tab');await p.waitForTimeout(200);assert.equal(await p.locator('#style-options').evaluate(e=>document.activeElement===e),true);}const input=p.locator('input[name="'+id+'"][value="'+value+'"]');await input.locator('..').click();assert.equal(await input.isChecked(),true);if(mobile){await p.click('#style-options');await p.waitForFunction(()=>!document.getElementById('style-dialog').open);assert.equal(await p.locator('#style-options').evaluate(e=>document.activeElement===e),true);}};
assert.equal(await p.locator('select').count(),0);
async function verifySourceParity(){await p.click('[data-tab=typography]');await p.waitForTimeout(350);
// Typography specimens respond to their own padded viewport. The edge-to-edge
// login preview intentionally has a wider viewport at the same outer size.
for(const page of [actualLogin,actualResources])await page.setViewportSize({width:await p.frameLocator('#type-frame').locator('body').evaluate(()=>innerWidth),height:900});
const specimens=await p.frameLocator('#type-frame').locator('.type-row:not(.feedback-row)').evaluateAll(rows=>rows.map(row=>{const e=row.querySelector('[data-type-sample]'),c=getComputedStyle(e);return {page:row.dataset.sourcePage,selector:row.dataset.sourceSelector,text:e.textContent,style:[c.fontFamily,c.fontSize,c.fontWeight,c.lineHeight,c.letterSpacing,c.color,c.textTransform]};}));
for(const specimen of specimens){if(specimen.selector==='#gate-error')await actualLogin.evaluate(text=>showFailure(text,true,false,false),loginMessages.wrong);const actual=await (specimen.page==='login'?actualLogin:actualResources).locator(specimen.selector).first().evaluate(e=>{const c=getComputedStyle(e);return{text:e.textContent,style:[c.fontFamily,c.fontSize,c.fontWeight,c.lineHeight,c.letterSpacing,c.color,c.textTransform]};});assert.deepEqual({text:specimen.text,style:specimen.style},actual,specimen.page+' '+specimen.selector);if(specimen.selector==='#gate-error')await actualLogin.evaluate(()=>{resetPasswordError();setStatus('info','');});}
for(const success of [true,false]){await actualResources.evaluate(success=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{if(!success)throw Error('Test copy failure');}}});document.execCommand=()=>false;document.querySelector('.copy').click();},success);await actualResources.waitForTimeout(80);await actualResources.evaluate(()=>document.getAnimations().forEach(a=>{if(a.effect?.getTiming().iterations!==Infinity)try{a.finish();}catch{}}));const read=e=>{const c=getComputedStyle(e);return {text:e.textContent,font:c.fontFamily,size:c.fontSize,weight:c.fontWeight,line:c.lineHeight,colour:c.color};};const actual=await actualResources.locator('.status').first().evaluate(read),sample=await p.frameLocator('#type-frame').locator('[data-feedback='+ (success?'success':'error') +'] .status').evaluate(read);assert.deepEqual(sample,actual,'prompt helper feedback parity');}await actualResources.evaluate(()=>setStatus(document.querySelector('.copy'),''));
const savedAgent=await actualResources.evaluate(()=>window.workshopAgent.current);
for(const selected of ['codex','claude-code']){await actualResources.evaluate(agent=>window.workshopAgent.select(agent),selected);await actualResources.waitForTimeout(380);const read=e=>{const c=getComputedStyle(e);return {text:e.textContent,selected:e.getAttribute('aria-pressed'),font:c.fontFamily,size:c.fontSize,weight:c.fontWeight,colour:c.color};};for(const agent of ['codex','claude-code']){const sample=await p.frameLocator('#type-frame').locator('.agent-row[data-selected-agent="'+selected+'"] [data-agent="'+agent+'"]').evaluate(read);const original=await actualResources.locator('[data-agent="'+agent+'"]').evaluate(read);assert.deepEqual(sample,original,'selected/deselected agent typography');}const sampleFill=await p.frameLocator('#type-frame').locator('.agent-row[data-selected-agent="'+selected+'"] .toggle-indicator').evaluate(e=>getComputedStyle(e).backgroundColor);const realFill=await actualResources.locator('.controls .toggle-indicator').evaluate(e=>getComputedStyle(e).backgroundColor);assert.equal(sampleFill,realFill,'agent selection background');}
await actualResources.evaluate(agent=>window.workshopAgent.select(agent),savedAgent);await actualResources.waitForTimeout(380);
await p.click('[data-tab=components]');}

const actualLogin=await b.newPage();await actualLogin.goto(origin+'/');
const mainContext=await b.newContext();await mainContext.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});const actualResources=await mainContext.newPage();await actualResources.goto(origin+'/');
const login=p.frameLocator('#login-frame'),resources=p.frameLocator('#resources-frame');
await login.locator('#workshop-password').waitFor();
for(const width of [320,390,768,1440]){
 await p.setViewportSize({width,height:900});await p.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));for(const page of [actualLogin,actualResources])await page.setViewportSize({width:await resources.locator('body').evaluate(()=>innerWidth),height:900});
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  await choose('theme',theme);await choose('agent',agent);await p.waitForTimeout(500);
  const appShadow=await resources.locator('.page-toolbar .theme-toggle').evaluate(e=>getComputedStyle(e,'::after').boxShadow);
  assert.equal(await p.locator('#back-to-top').evaluate(e=>getComputedStyle(e).boxShadow),appShadow,'shared floating shadow');
  assert.equal(await p.locator('#back-to-top').evaluate(e=>parseFloat(getComputedStyle(e).top)-(innerWidth<=660?56:0)),await p.locator('.playground-brand-row').evaluate(e=>{const r=e.getBoundingClientRect();const t=document.querySelector('.tab-scroll-shell').getBoundingClientRect();return innerWidth<=660?Math.max(24,r.top+(r.height-48)/2,t.height+12-Math.max(0,t.top)):Math.max(24,r.top+(r.height-48)/2);}),'floating top inset');
  if(width<=660){
   assert.equal(await p.locator('#style-options').evaluate(e=>e.getBoundingClientRect().top),await p.locator('.playground-brand-row').evaluate(e=>{const r=e.getBoundingClientRect();const t=document.querySelector('.tab-scroll-shell').getBoundingClientRect();return innerWidth<=660?Math.max(24,r.top+(r.height-48)/2,t.height+12-Math.max(0,t.top)):Math.max(24,r.top+(r.height-48)/2);}));
   assert.equal(await p.locator('#style-options').evaluate(e=>getComputedStyle(e).boxShadow),appShadow);
   await p.click('#style-options');
   assert.equal(await p.locator('#style-dialog').evaluate(e=>e.getBoundingClientRect().top),await p.locator('.playground-brand-row').evaluate(e=>{const r=e.getBoundingClientRect();const t=document.querySelector('.tab-scroll-shell').getBoundingClientRect();return innerWidth<=660?Math.max(24,r.top+(r.height-48)/2,t.height+12-Math.max(0,t.top)):Math.max(24,r.top+(r.height-48)/2);}));
   assert.equal(await p.locator('#style-dialog').evaluate(e=>getComputedStyle(e).boxShadow),appShadow);
   await p.click('#style-options');
  }
  assert.equal(await login.locator('html').getAttribute('data-theme'),theme);
  assert.equal(await resources.locator('html').getAttribute('data-selected-agent'),agent);
  for(const consumer of [resources,actualResources]){
   const qr=await consumer.locator('.page-header>.qr-card').evaluate(e=>({visible:getComputedStyle(e).display!=='none',width:e.getBoundingClientRect().width,extension:e.getBoundingClientRect().right-e.parentElement.getBoundingClientRect().right}));
   if(qr.visible){assert.equal(qr.width,176);assert.equal(qr.extension,4,'Resources and Playground QR right rail');}
  }

  for(const state of ['loading','success','wrong','empty','network','service','generic','limited','limitedLater','retryReady','neutral']){
   await choose('state',state);await p.waitForTimeout(40);
   const input=login.locator('#workshop-password');
   if(['empty','wrong','network','service','generic','limitedLater'].includes(state))assert.equal(await login.locator('#gate-error span').textContent(),loginMessages[state]);
   if(state==='wrong'){assert.equal(await input.getAttribute('aria-invalid'),'true');await input.fill('edited');assert.equal(await input.getAttribute('aria-invalid'),null);}
   if(state==='success')assert.equal(await login.locator('.gate-panel').evaluate(e=>e.classList.contains('is-success')),true);
   if(state==='retryReady')assert.equal(await login.locator('#login-announcement').textContent(),loginMessages.retryReady);
   if(state==='loading')assert.equal(await login.locator('[data-input-icon=loading]').isVisible(),true);
  }
  for(const page of [actualLogin,actualResources])await page.evaluate(({theme,agent})=>{window.dispatchEvent(new StorageEvent('storage',{key:'workshop-colour-theme',newValue:theme}));window.workshopAgent?.select(agent);document.getAnimations().forEach(a=>{if(a.effect?.getTiming().iterations!==Infinity)try{a.finish();}catch{}});},{theme,agent});await p.waitForTimeout(200);await verifySourceParity();
 }
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 if(width===390){const rail=await p.locator('#state .choice-options').evaluate(e=>({scroll:e.scrollWidth,width:e.clientWidth,rows:e.querySelectorAll('.state-row').length}));assert.ok(rail.scroll>rail.width);assert.equal(rail.rows,0);}

}
await choose('hover','on');await p.waitForTimeout(350);
assert.equal(await resources.locator('html').getAttribute('data-demo-hover'),'');
assert.equal(await resources.locator('.copy').first().evaluate(e=>getComputedStyle(e).backgroundColor),await resources.locator('body').evaluate(e=>{const probe=document.createElement('span');probe.style.background='var(--hover)';e.append(probe);const colour=getComputedStyle(probe).backgroundColor;probe.remove();return colour;}));
await choose('width','320');await p.locator('#resources-frame').scrollIntoViewIfNeeded();for(let attempt=0;attempt<50&&await resources.locator('html').evaluate(()=>innerWidth)!==320;attempt++)await p.waitForTimeout(100);assert.equal(await resources.locator('html').evaluate(()=>innerWidth),320);
await choose('width','fluid');await choose('hover','off');await p.waitForTimeout(800);
const copyGap=await p.locator('#copy').evaluate(e=>e.nextElementSibling.getBoundingClientRect().top-e.getBoundingClientRect().bottom);assert.ok(copyGap>=20);
// Activate the simulated clipboard outcome by keyboard so the fixed inspector
// cannot intercept a cross-frame pointer action after viewport resizing.
const clickPrompt=async()=>{await resources.locator('[data-copy]').first().focus();await p.keyboard.press('Enter');};
await choose('copy','error');await clickPrompt();
await resources.locator('[data-copy][data-copy-error]').first().waitFor({state:'attached',timeout:3000});
assert.equal(await resources.locator('[data-copy]').first().getAttribute('data-copy-error')!==null,true);
await choose('copy','success');await resources.locator('body').evaluate(()=>new Promise(resolve=>{const check=()=>{if(!copyFailure)resolve();else setTimeout(check,20);};check();}));await resources.locator('[data-copy]').first().focus();await p.keyboard.press('Enter');
const resourceDocument=await (await p.locator('#resources-frame').elementHandle()).contentFrame();
await resourceDocument.waitForFunction(()=>document.querySelector('[data-copy]').dataset.copied==='true',null,{timeout:3000});
await resources.locator('footer form[action="/auth/logout"] button').focus();await p.keyboard.press('Enter');assert.ok(p.url().startsWith(origin+'/component-playground'));
await p.click('[data-tab=typography]');assert.ok(p.url().startsWith(origin+'/component-playground'));
assert.match(await p.frameLocator('#type-frame').locator('[data-source-selector="h1"] output').textContent(),/48px/);
await p.locator('#type-frame').scrollIntoViewIfNeeded();
const typographyDocument=await (await p.locator('#type-frame').elementHandle()).contentFrame();await typographyDocument.waitForFunction(()=>[...document.querySelectorAll('h2[data-type-sample]')].every(e=>getComputedStyle(e).color!==''));
const headingStyles=await typographyDocument.evaluate(()=>[...document.querySelectorAll('.type-row:not([data-source-selector="#perspective-title"]) h2[data-type-sample]')].map(e=>{const c=getComputedStyle(e);return {size:c.fontSize,weight:c.fontWeight,colour:c.color};}));assert.equal(headingStyles.length,2);assert.equal(headingStyles[0].size,headingStyles[1].size);assert.equal(headingStyles[0].weight,headingStyles[1].weight);assert.notEqual(headingStyles[0].colour,headingStyles[1].colour);
// Inspector stays docked and never changes its own geometry while inspecting.
await p.click('#inspector-toggle');await p.click('#inspector-details');
const type=p.frameLocator('#type-frame');await type.locator('h1').hover();await p.waitForTimeout(260);
const firstReading=await p.locator('#inspection-summary').textContent();assert.match(firstReading,/h1/);
await p.click('#freeze-inspector');await type.locator('h2').first().hover();await p.waitForTimeout(260);assert.equal(await p.locator('#inspection-summary').textContent(),firstReading);
await p.click('#freeze-inspector');await type.locator('h2').first().hover();await p.waitForTimeout(260);
assert.match(await p.locator('#inspection-summary').textContent(),/h2/);
const dock=await p.locator('.inspector-dock').boundingBox();assert.ok(Math.abs(dock.y+dock.height-900)<2);
// Same semantic specimen, even when crossing its generated metadata.
await type.locator('[data-source-selector=".step-title"] output').hover();await p.waitForTimeout(260);assert.match(await p.locator('#inspection-summary').textContent(),/h2/);
await p.click('#inspector-details');
await p.click('[data-tab=blocks]');const blocks=p.frameLocator('#blocks-frame');
await choose('review','clear');await p.locator('#blocks-frame').scrollIntoViewIfNeeded();
assert.equal(await blocks.locator('.page-placeholder').getAttribute('inert'),'');
assert.equal(await blocks.locator('.ph-word').first().evaluate(e=>getComputedStyle(e).cursor),'default');
assert.equal(await blocks.locator('#block-highlight').isVisible(),false);
await p.locator('#strength').fill('70');await p.locator('#blur').fill('8.5');await choose('review','blurred');
assert.equal(await blocks.locator('.page-placeholder').evaluate(e=>getComputedStyle(e).filter),'blur(8.5px)');
assert.equal(await blocks.locator('.page-placeholder').evaluate(e=>getComputedStyle(e).getPropertyValue('--ph-strength')),'70%');
await p.locator('#dim').fill('25');await p.waitForTimeout(50);assert.equal(await blocks.locator('#preview-scrim').evaluate(e=>getComputedStyle(e).backgroundColor),'rgba(0, 0, 0, 0.25)');
await choose('review','panel');assert.equal(await blocks.locator('.access-gate').isVisible(),true);
assert.equal(await blocks.locator('.access-gate').evaluate(e=>getComputedStyle(e).backdropFilter),'none');
await choose('review','clear');assert.equal(await blocks.locator('.page-placeholder').evaluate(e=>getComputedStyle(e).filter),'none');
await p.click('#reset-blocks');await p.waitForFunction(()=>document.querySelector('#strength').value==='40'&&document.querySelector('#blur').value==='4');assert.equal(await p.locator('#strength').inputValue(),'40');assert.equal(await p.locator('#blur').inputValue(),'4');
await p.screenshot({path:'/tmp/playground-blocks.png'});
await p.click('[data-tab=colours]');assert.ok(await p.locator('[data-token]').count()>20);
assert.equal(writes.length,0);assert.deepEqual(errors,[]);
await p.screenshot({path:'/tmp/playground-colours.png',fullPage:true});
await p.click('[data-tab=components]');await p.locator('#login-frame').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/playground-components.png'});
await p.setViewportSize({width:390,height:844});await p.locator('#login-frame').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/playground-mobile.png'});
const production=await handleRequest(new Request('http://production/playground'),{});assert.notEqual(production.status,200);
console.log('PASS: radios, docked/frozen/debounced inspector, inert blocks/blur controls, mobile/desktop, both agents/themes, all held login states, copy feedback, navigation containment, tokens, typography and unconfigured hosted access fails closed');
}finally{await b.close();await new Promise(r=>server.close(r));}

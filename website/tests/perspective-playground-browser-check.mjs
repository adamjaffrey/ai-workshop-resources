import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const b=await chromium.launch({channel:'chrome',headless:true});
try{
 const c=await b.newContext();await c.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});const app=await c.newPage(),guide=await c.newPage();await app.goto(origin);await guide.goto(origin+'/playground');await guide.locator('[data-tab=discovery]').click();const f=guide.frameLocator('#discovery-frame');await f.locator('.perspective').waitFor();
 assert.equal(await guide.locator('#discovery-preview .section-heading #perspective-reset.icon-button svg').count(),1);assert.equal(await guide.locator('#discovery-preview .state-tools p').count(),0);
 assert.deepEqual(await guide.locator('#discovery-preview input[type=range]').evaluateAll(es=>es.map(e=>e.id)),['duration','gap','intensity','particleDuration','gravity','ringRadius','hoverHeight','halo'].map(k=>'perspective-'+k));
 const read=e=>{const s=getComputedStyle(e);return {text:e.textContent,font:s.fontFamily,size:s.fontSize,line:s.lineHeight,colour:s.color,align:s.textAlign,background:s.backgroundColor};};
 for(const width of [320,390,768,1440])for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  await guide.evaluate(values=>{for(const [name,value]of Object.entries(values)){const el=document.querySelector('input[name="'+name+'"][value="'+value+'"]');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}},{width:String(width),theme,agent,egg:'ready'});
  await app.setViewportSize({width,height:900});await app.evaluate(({theme,agent})=>{window.dispatchEvent(new StorageEvent('storage',{key:'workshop-colour-theme',newValue:theme}));window.workshopAgent.select(agent);window.workshopPerspective.preview('ready');}, {theme,agent});await app.locator('.perspective').scrollIntoViewIfNeeded();await guide.waitForTimeout(500);
  for(const selector of ['.perspective-day','.perspective-night','.perspective-ellipsis','.perspective-discover'])assert.deepEqual(await f.locator(selector).evaluate(read),await app.locator(selector).evaluate(read),selector+' '+width+' '+theme+' '+agent);
  for(const page of [app,f])assert.equal(await page.locator('.perspective-discover svg').count(),0);
  const dims=e=>{const r=e.getBoundingClientRect();return [r.width,r.height];};assert.deepEqual(await f.locator('.perspective-discover').evaluate(dims),await app.locator('.perspective-discover').evaluate(dims));
 }
 await guide.locator('input[name=egg][value=success]').locator('..').click();await f.locator('.perspective-dialog').waitFor({state:'visible'});await app.evaluate(()=>window.workshopPerspective.preview('success'));for(const selector of ['#perspective-title','.perspective-dialog p','.perspective-dialog button'])assert.deepEqual(await f.locator(selector).first().evaluate(read),await app.locator(selector).first().evaluate(read));
 for(const [key,value] of Object.entries({duration:8000,gap:750,intensity:150,halo:25,gravity:150,particleDuration:6000,ringRadius:80,hoverHeight:160})){await guide.locator('#perspective-'+key).evaluate((el,value)=>{el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));},value);}
 await guide.waitForTimeout(300);
 assert.deepEqual(await f.locator('body').evaluate(()=>window.workshopPerspective.config),{duration:8000,gap:750,intensity:150,halo:25,gravity:150,particleDuration:6000,ringRadius:80,hoverHeight:160});
 assert.deepEqual(await app.evaluate(()=>window.workshopPerspective.config),{duration:4000,gap:2000,intensity:400,halo:100,gravity:160,particleDuration:4000,ringRadius:16,hoverHeight:60});
 assert.equal(await f.locator('.perspective-particle:not([hidden])').count(),72);await guide.locator('input[name=egg][value=ready]').locator('..').click();await guide.waitForTimeout(200);assert.ok((await f.locator('.perspective-discover').boundingBox()).height>=144);await guide.locator('input[name=egg][value=success]').locator('..').click();
 assert.equal(await f.locator('.perspective-dialog').evaluate(e=>e.style.getPropertyValue('--perspective-halo')),'0.25');
 await guide.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>window.copiedSettings=text}});});await guide.locator('#perspective-copy').click();
 const copied=await guide.evaluate(()=>JSON.parse(window.copiedSettings));assert.deepEqual(copied.values,await f.locator('body').evaluate(()=>window.workshopPerspective.config));assert.equal(copied.units.hoverHeight,'px');assert.equal(copied.units.duration,'ms');
 await guide.evaluate(()=>{navigator.clipboard.writeText=async()=>{throw Error('Denied')};document.execCommand=()=>false;});await guide.locator('#perspective-copy').click();assert.equal(await guide.locator('#perspective-copy-fallback').isVisible(),true);assert.deepEqual(JSON.parse(await guide.locator('#perspective-copy-text').inputValue()).values,copied.values);
 await guide.evaluate(()=>{document.execCommand=()=>true;});await guide.locator('#perspective-copy').click();assert.equal(await guide.locator('#perspective-copy-fallback').isVisible(),false);
 await guide.locator('#perspective-intensity').evaluate(el=>{el.value=400;el.dispatchEvent(new Event('input',{bubbles:true}));});await guide.waitForTimeout(150);assert.equal(await f.locator('.perspective-particle:not([hidden])').count(),192,'expanded intensity produces additional particles');
 await guide.locator('#perspective-reset').click();await guide.waitForTimeout(300);
 assert.deepEqual(await f.locator('body').evaluate(()=>window.workshopPerspective.config),await app.evaluate(()=>window.workshopPerspective.config));
 await guide.locator('input[name=egg][value=ready]').locator('..').click();await f.locator('.perspective-discover').hover();await guide.waitForTimeout(600);
 assert.ok(await f.locator('.perspective-particle').evaluateAll(points=>points.some(p=>new DOMMatrixReadOnly(getComputedStyle(p).transform).a>1.1)),'nearby sparkles respond to pointer gravity');
 await guide.setViewportSize({width:320,height:900});assert.ok(await guide.locator('#discovery-preview .section-heading').evaluate(e=>e.scrollWidth<=e.clientWidth+1),'copy/reset header fits mobile');
 console.log('PASS: dedicated Discovery tab matches independent app typography, colours and target geometry in 16 width/theme/agent combinations, plus success dialog');
}finally{await b.close();await new Promise(r=>server.close(r));}

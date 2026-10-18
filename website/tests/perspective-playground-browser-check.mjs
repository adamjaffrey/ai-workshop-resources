import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const b=await chromium.launch({channel:'chrome',headless:true});
try{
 const c=await b.newContext();await c.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});const app=await c.newPage(),guide=await c.newPage();await app.goto(origin);await guide.goto(origin+'/playground');await guide.locator('[data-tab=discovery]').click();const f=guide.frameLocator('#discovery-frame');await f.locator('.perspective').waitFor();
 const read=e=>{const s=getComputedStyle(e);return {text:e.textContent,font:s.fontFamily,size:s.fontSize,line:s.lineHeight,colour:s.color,align:s.textAlign,background:s.backgroundColor};};
 for(const width of [320,390,768,1440])for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  await guide.evaluate(values=>{for(const [name,value]of Object.entries(values)){const el=document.querySelector('input[name="'+name+'"][value="'+value+'"]');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}},{width:String(width),theme,agent,egg:'ready'});
  await app.setViewportSize({width,height:900});await app.evaluate(({theme,agent})=>{window.dispatchEvent(new StorageEvent('storage',{key:'workshop-colour-theme',newValue:theme}));window.workshopAgent.select(agent);window.workshopPerspective.preview('ready');}, {theme,agent});await app.locator('.perspective').scrollIntoViewIfNeeded();await guide.waitForTimeout(500);
  for(const selector of ['.perspective-day','.perspective-night','.perspective-ellipsis','.perspective-discover'])assert.deepEqual(await f.locator(selector).evaluate(read),await app.locator(selector).evaluate(read),selector+' '+width+' '+theme+' '+agent);
  for(const page of [app,f])assert.equal(await page.locator('.perspective-discover svg').count(),0);
  const dims=e=>{const r=e.getBoundingClientRect();return [r.width,r.height];};assert.deepEqual(await f.locator('.perspective-discover').evaluate(dims),await app.locator('.perspective-discover').evaluate(dims));
 }
 await guide.locator('input[name=egg][value=success]').locator('..').click();await f.locator('.perspective-dialog').waitFor({state:'visible'});await app.evaluate(()=>window.workshopPerspective.preview('success'));for(const selector of ['#perspective-title','.perspective-dialog p','.perspective-dialog button'])assert.deepEqual(await f.locator(selector).first().evaluate(read),await app.locator(selector).first().evaluate(read));
 for(const [key,value] of Object.entries({duration:8000,gap:750,intensity:150,halo:25})){await guide.locator('#perspective-'+key).evaluate((el,value)=>{el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));},value);}
 await guide.waitForTimeout(300);
 assert.deepEqual(await f.locator('body').evaluate(()=>window.workshopPerspective.config),{duration:8000,gap:750,intensity:150,halo:25});
 assert.deepEqual(await app.evaluate(()=>window.workshopPerspective.config),{duration:4500,gap:2000,intensity:100,halo:100});
 assert.equal(await f.locator('.perspective-particle:not([hidden])').count(),72);
 assert.equal(await f.locator('.perspective-dialog').evaluate(e=>e.style.getPropertyValue('--perspective-halo')),'0.25');
 await guide.locator('#perspective-reset').click();await guide.waitForTimeout(300);
 assert.deepEqual(await f.locator('body').evaluate(()=>window.workshopPerspective.config),await app.evaluate(()=>window.workshopPerspective.config));
 await guide.locator('input[name=egg][value=ready]').locator('..').click();await f.locator('.perspective-discover').hover();await guide.waitForTimeout(600);
 assert.ok(await f.locator('.perspective-particle').evaluateAll(points=>points.some(p=>parseFloat(p.style.getPropertyValue('--pull-scale'))>1.1)),'nearby sparkles respond to pointer gravity');
 console.log('PASS: dedicated Discovery tab matches independent app typography, colours and target geometry in 16 width/theme/agent combinations, plus success dialog');
}finally{await b.close();await new Promise(r=>server.close(r));}

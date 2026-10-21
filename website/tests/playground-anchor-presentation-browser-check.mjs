import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
const b=await chromium.launch({channel:'chrome'});
try{
const p=await b.newPage({viewport:{width:390,height:900},reducedMotion:'reduce'});const hash='#typography-and-text-styles';
await p.goto(base+'/component-playground/typography?show-login=true'+hash);await p.locator('#workshop-password').fill(password);await p.locator('.gate-submit').click();await p.waitForFunction(()=>document.documentElement.dataset.playgroundAnchorLanded==='typography-and-text-styles');assert.equal(new URL(p.url()).hash,hash);assert.ok(!p.url().includes('show-login'));
for(const width of [390,1440]){
 await p.setViewportSize({width,height:900});
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  await p.goto(base+'/component-playground/typography?theme='+theme+'&agent='+agent+hash);await p.waitForFunction(()=>document.documentElement.dataset.playgroundAnchorLanded==='typography-and-text-styles');const c=p.locator('.heading-anchor[data-anchor="typography-and-text-styles"]');await c.hover();
  const result=await c.evaluate(e=>{const slot=e.querySelector('.step-anchor-icon'),text=e.querySelector('.step-anchor-label'),probe=document.createElement('span');probe.style.background='var(--link-hover-bg)';document.body.append(probe);const data={gap:slot.getBoundingClientRect().left-text.getBoundingClientRect().right,font:parseFloat(getComputedStyle(e).fontSize),fill:getComputedStyle(e).backgroundColor,expected:getComputedStyle(probe).backgroundColor,hash:getComputedStyle(e.querySelector('.step-anchor-hash')).opacity};probe.remove();return data;});assert.ok(Math.abs(result.gap-result.font*.2)<.1);assert.equal(result.fill,result.expected);assert.equal(result.hash,'1');
  if(agent==='claude-code')await p.screenshot({path:'/tmp/playground-anchor-'+width+'-'+theme+'.png'});
 }
}
await p.goto(base+'/component-playground/icons#playground-icons');await p.waitForFunction(()=>document.documentElement.dataset.playgroundAnchorLanded==='playground-icons');assert.match(await p.locator('[data-catalog-variant="hash-modified"]').textContent(),/Modified Hash/);assert.match(await p.locator('[data-catalog-variant="hash-modified"]').textContent(),/playground-anchor-copy/);assert.equal(await p.locator('[data-catalog-variant="hash-modified"] h3 svg').evaluate(e=>getComputedStyle(e).position),'static');
// A normal tab selection clears the fragment; Back restores and lands it.
await p.locator('[data-tab="typography"]').click();assert.equal(new URL(p.url()).hash,'');await p.goBack();await p.waitForFunction(()=>document.documentElement.dataset.playgroundAnchorLanded==='playground-icons'&&!document.documentElement.hasAttribute('data-playground-anchor-arriving'));assert.equal(new URL(p.url()).hash,'#playground-icons');
await p.goto(base+'/component-playground/url-reference');await p.emulateMedia({reducedMotion:'no-preference'});
await p.evaluate(()=>{window.arrivalSamples=[];function sample(){if(document.documentElement.hasAttribute('data-playground-anchor-arriving')){const el=document.querySelector('[data-playground-anchor-leaving]');if(el)arrivalSamples.push({progress:+document.documentElement.style.getPropertyValue('--playground-anchor-progress'),opacity:+getComputedStyle(el).opacity});}requestAnimationFrame(sample);}requestAnimationFrame(sample);});
await p.evaluate(()=>window.workshopPlaygroundAnchors.navigate('/component-playground/url-reference#public-query-parameters'));
const samples=await p.evaluate(()=>arrivalSamples.filter(x=>x.progress>.05&&x.progress<.95));assert.ok(samples.length>3,'preceding cards fade during travel');assert.ok(samples.every(x=>Math.abs(x.opacity+x.progress-1)<.01),'fade follows shared arrival progress');
console.log('PASS login, palettes, icon gap, catalogue, history and synchronised arrival fade');
}finally{await b.close();await new Promise(r=>server.close(r))}

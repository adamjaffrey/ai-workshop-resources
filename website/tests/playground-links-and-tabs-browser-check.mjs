import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
const base='http://127.0.0.1:'+server.address().port;
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),real=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/playground/icons');await page.locator('#show-playground-sources').check();
 const link=page.locator('#playground-icon-catalog a').first();assert.match(await link.innerText(),/^View Source · Lucide · /);
 assert.equal(await link.locator('.link-arrow').count(),1);assert.equal(await link.evaluate(e=>getComputedStyle(e).textDecorationLine),'none');assert.equal(await link.locator('.link-label').first().evaluate(e=>getComputedStyle(e).textDecorationLine),'underline');
 const colours=[];
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  await page.evaluate(({theme,agent})=>{for(const [id,value] of Object.entries({theme,agent})){const e=document.getElementById(id);e.value=value;e.dispatchEvent(new Event('change'));}},{theme,agent});await page.waitForTimeout(220);await link.hover();await page.waitForTimeout(200);
  const values=await link.evaluate(e=>{const c=getComputedStyle(e),label=getComputedStyle(e.querySelector('.link-label')),arrow=getComputedStyle(e.querySelector('.link-arrow'));const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');const hex=value=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=value;ctx.fillRect(0,0,1,1);return '#'+[...ctx.getImageData(0,0,1,1).data].map(n=>n.toString(16).padStart(2,'0')).join('').toUpperCase();};return {text:hex(c.color),underline:hex(label.textDecorationColor),hover:c.backgroundColor,arrow:hex(arrow.color),padding:c.padding,thickness:label.textDecorationThickness};});assert.equal(values.text,values.underline);assert.equal(values.text,values.arrow);assert.equal(values.padding,'2px 3px');assert.equal(values.thickness,'1px');colours.push({theme,agent,...values});
 }
 console.log(JSON.stringify(colours));
 await page.locator('#show-sources').check();const app=page.frameLocator('#icons-frame').locator('[data-icon-source]').first();await app.waitFor();assert.match(await app.innerText(),/^View Source · Lucide · /);assert.equal(await app.locator('.link-arrow').count(),1);
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(base+'/playground/easter-egg');await page.waitForTimeout(600);
  const nav=page.locator('nav[role=tablist]');assert.equal(await nav.evaluate(e=>getComputedStyle(e,'::before').content),'none');assert.equal(await nav.evaluate(e=>getComputedStyle(e).paddingBottom),'14px');
  if(width<=660){for(const tab of ['components','discovery']){await page.locator('[data-tab='+tab+']').click();await page.waitForTimeout(50);assert.ok(await nav.evaluate((e,tab)=>Math.abs(e.scrollLeft-(tab==='components'?0:e.scrollWidth-e.clientWidth))<2,tab));}}
  else{await page.locator('[data-tab=components]').click();await nav.evaluate(e=>e.scrollLeft=0);const before=await nav.evaluate(e=>e.scrollLeft);await page.locator('[data-tab=typography]').click();assert.equal(await nav.evaluate(e=>e.scrollLeft),before,'visible desktop/tablet tab must not centre');}
  await page.locator('[data-tab=discovery]').click();const frame=page.frameLocator('#discovery-frame');await frame.locator('.controls .toggle').waitFor();await page.locator('#discovery-frame').scrollIntoViewIfNeeded();await page.waitForTimeout(300);const size=await frame.locator('body').evaluate(()=>({width:innerWidth,height:innerHeight}));await real.setViewportSize(size);await real.goto(base+'/');await real.evaluate(()=>document.fonts.ready);
  for(const target of ['top','bottom','top']){
   const scroll=target=>window.scrollTo(0,target==='top'?0:document.documentElement.scrollHeight);
   await frame.locator('body').evaluate((_,target)=>window.scrollTo(0,target==='top'?0:document.documentElement.scrollHeight),target);await real.evaluate(scroll,target);await page.waitForTimeout(500);
   const read=e=>{const r=e.getBoundingClientRect(),s=e.closest('.sticky-control-slot').getBoundingClientRect();return {compact:e.hasAttribute('data-compact'),locked:e.hasAttribute('data-locked'),left:Math.round(r.left),width:Math.round(r.width),slotLeft:Math.round(s.left)};};
   const specimen=await frame.locator('.controls .toggle').evaluate(read),actual=await real.locator('.controls .toggle').evaluate(read);
   if(specimen.compact!==actual.compact)console.log(await frame.locator('.controls .toggle').evaluate(e=>{const a=[];for(let n=e;n;n=n.parentElement)a.push({tag:n.tagName,cls:n.className,display:getComputedStyle(n).display,box:n.getBoundingClientRect().toJSON()});return a;}));assert.equal(specimen.compact,actual.compact,JSON.stringify({width,target,specimen,actual}));assert.equal(specimen.left,actual.left,'real selector alignment');assert.equal(specimen.width,actual.width,'real selector width');
  }
  await page.screenshot({path:'/tmp/playground-edge-'+width+'.png'});
 }
 assert.deepEqual(errors,[]);console.log('PASS: source-link parity, un-underlined Lucide arrows, padded accent hover, mobile clamping, desktop noncentring, separated scrollbar and real sticky-selector parity');
}finally{await browser.close();server.close();}

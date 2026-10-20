import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {resourceAnchors} from '../lib/workshop-resource-anchors.mjs';
const {server,password}=createPhonePreview({autoLogin:true});await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const visibleTop=e=>{const c=getComputedStyle(e),ctx=document.createElement('canvas').getContext('2d');ctx.font=c.fontWeight+' '+c.fontSize+' '+c.fontFamily;const m=ctx.measureText(e.querySelector('.step-anchor-label').textContent);return e.getBoundingClientRect().top+(parseFloat(c.lineHeight)-m.fontBoundingBoxAscent-m.fontBoundingBoxDescent)/2+m.fontBoundingBoxAscent-m.actualBoundingBoxAscent;};
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const width of [320,390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const [index,anchor] of resourceAnchors.entries()){
   await page.goto(origin+'/ai-workshop-resources#step-'+(index+1));
   await page.waitForFunction(anchor=>location.hash==='#'+anchor&&!document.documentElement.hasAttribute('data-resource-anchor-arriving'),anchor);
   await page.waitForTimeout(700);
   const result=await page.evaluate(index=>{const b=document.querySelectorAll('.step-anchor')[index],range=document.createRange();range.selectNodeContents(b.querySelector('.step-anchor-label'));return {bottom:Math.max(...[...document.querySelectorAll('[data-sticky-control]')].map(e=>e.getBoundingClientRect().bottom)),hidden:[...document.querySelectorAll('.step-row')].map(e=>e.hasAttribute('data-anchor-hidden')),brand:document.querySelector('.worm-halo').dataset.visibility,overflow:document.documentElement.scrollWidth>innerWidth};},index);
   result.gap=await page.locator('.step-anchor').nth(index).evaluate(visibleTop)-result.bottom;
   assert.ok(Math.abs(result.gap-60)<1.1,JSON.stringify({width,index,...result}));assert.equal(result.brand,'1');assert.equal(result.overflow,false);assert.deepEqual(result.hidden,resourceAnchors.map((_,i)=>i<index));
   await page.mouse.wheel(0,80);await page.waitForTimeout(100);assert.equal(await page.locator('[data-anchor-hidden]').count(),index);
   await page.mouse.wheel(0,-40);await page.waitForTimeout(800);assert.equal(await page.locator('[data-anchor-hidden]').count(),0);
  }
  await page.evaluate(()=>location.hash='step-2');await page.waitForURL('**#'+resourceAnchors[1]);await page.waitForFunction(()=>!document.documentElement.hasAttribute('data-resource-anchor-arriving'));
  const revisitGap=await page.locator('.step-anchor').nth(1).evaluate(visibleTop)-await page.locator('[data-sticky-control]').evaluateAll(es=>Math.max(...es.map(e=>e.getBoundingClientRect().bottom)));assert.ok(Math.abs(revisitGap-60)<1.1,'repeated navigation preserves landing');
  await page.goto(origin+'/ai-workshop-resources');await page.waitForTimeout(1100);
  await page.evaluate(()=>{window.copies=[];Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>window.copies.push(text)}});});
  const button=page.locator('.step-anchor').first();await button.hover();
  const before=await page.evaluate(()=>scrollY);await button.click();assert.equal(await button.getAttribute('data-result'),'success');assert.equal(await page.evaluate(()=>scrollY),before);assert.equal(await page.evaluate(()=>window.copies[0]),origin+'/ai-workshop-resources#'+resourceAnchors[0]);
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied');}}}));await button.click();assert.equal(await button.getAttribute('data-result'),'failure');
  assert.deepEqual(errors,[]);await page.close();console.log('PASS anchors at width '+width);
 }

 const page=await browser.newPage({viewport:{width:390,height:844}});
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  await page.goto(origin+'/ai-workshop-resources?theme='+theme+'&agent='+agent+'#'+resourceAnchors[1]);
  await page.waitForFunction(()=>!document.documentElement.hasAttribute('data-resource-anchor-arriving'));
  const button=page.locator('.step-anchor').nth(1);await button.hover();
  assert.equal(await button.evaluate(e=>getComputedStyle(e).cursor),'pointer');
  const appearance=await button.evaluate(e=>{const probe=document.createElement('span');probe.style.background='var(--link-hover-bg)';document.body.append(probe);const expected=getComputedStyle(probe).backgroundColor;probe.remove();return {actual:getComputedStyle(e,'::before').backgroundColor,expected,icon:e.querySelector('.step-anchor-icon').getBoundingClientRect().toJSON(),text:e.getBoundingClientRect().toJSON()};});
  await page.waitForTimeout(200);assert.ok(appearance.icon.right<=appearance.text.left+.5,'mobile exterior left indicator');
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{}}}));await button.click();
  const colours=await button.evaluate(e=>{const probe=document.createElement('span');probe.style.color='var(--success)';document.body.append(probe);const expected=getComputedStyle(probe).color;probe.remove();return {actual:getComputedStyle(e.querySelector('.step-anchor-success')).color,expected};});assert.equal(colours.actual,colours.expected);
  await page.waitForTimeout(700);if(theme==='dark'&&agent==='claude-code')await page.screenshot({path:'/tmp/resources-anchor-mobile.png'});
 }
 await page.clock.install();const button=page.locator('.step-anchor').nth(1);await button.click();
 await page.clock.fastForward(4999);assert.equal(await button.getAttribute('data-cooling'),null);await page.clock.fastForward(1);assert.equal(await button.getAttribute('data-cooling'),'');await page.clock.fastForward(650);assert.equal(await button.getAttribute('data-result'),null);
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied');}}}));await button.click();await page.clock.fastForward(11999);assert.equal(await button.getAttribute('data-result'),'failure');await page.clock.fastForward(1);await page.clock.fastForward(650);assert.equal(await button.getAttribute('data-result'),null);await page.close();
 // The real login flow must retain the incoming fragment and then rewrite it.
 const login=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 await login.goto(origin+'/ai-workshop-resources?show-login=true#step-2');await login.locator('#workshop-password').fill(password);await login.locator('.gate-submit').click();await login.waitForURL('**#'+resourceAnchors[1]);await login.waitForFunction(()=>!document.documentElement.hasAttribute('data-resource-anchor-arriving'));await login.locator('.step-anchor').nth(1).hover();await login.screenshot({path:'/tmp/resources-anchor-desktop.png'});
 assert.ok(!login.url().includes('show-login'));await login.close();
 const safari=await webkit.launch({headless:true});try{for(const width of [390,1440]){const p=await safari.newPage({viewport:{width,height:844},isMobile:width===390,hasTouch:width===390,reducedMotion:'reduce'});await p.goto(origin+'/ai-workshop-resources#step-3');await p.waitForURL('**#'+resourceAnchors[2]);await p.waitForFunction(()=>!document.documentElement.hasAttribute('data-resource-anchor-arriving'));const gap=await p.locator('.step-anchor').nth(2).evaluate(visibleTop)-await p.locator('[data-sticky-control]').evaluateAll(es=>Math.max(...es.map(e=>e.getBoundingClientRect().bottom)));assert.ok(Math.abs(gap-60)<1.1,'WebKit landing '+width+': '+gap);await p.close();}}finally{await safari.close();}
 console.log('PASS themes/agents, feedback cooldown, real login, reduced motion and WebKit anchors');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}

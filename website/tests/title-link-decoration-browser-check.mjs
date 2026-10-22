import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
try{for(const [name,engine] of Object.entries({chromium,webkit})){
 const browser=await engine.launch({headless:true,...(name==='chromium'?{channel:'chrome'}:{})});
 try{for(const width of [320,390,768,1440]){const page=await browser.newPage({viewport:{width,height:900}});
 for(const route of ['/ai-workshop-resources','/component-playground']){
 await page.goto(origin+route);const link=page.locator('a.page-title-link').first();await page.waitForTimeout(300);await link.hover();
 const hover=await link.evaluate(e=>[...e.querySelectorAll('.workshop-title-paint')].map(p=>({opacity:getComputedStyle(p).opacity,fill:getComputedStyle(p).backgroundColor,shadow:getComputedStyle(p).boxShadow})));assert.ok(hover.length);assert.ok(hover.every(p=>p.opacity==='1'&&p.fill!=='rgba(0, 0, 0, 0)'&&p.shadow!=='none'));
 await page.keyboard.press('Tab');await link.focus();await page.waitForTimeout(50);
 const geometry=await link.evaluate(e=>{const ring=e.querySelector('.workshop-link-focus'),r=ring.getBoundingClientRect(),font=parseFloat(getComputedStyle(e.querySelector('h1')).fontSize),paints=[...e.querySelectorAll('.workshop-title-paint')].map(p=>p.getBoundingClientRect());return {count:paints.length,opacity:getComputedStyle(ring).opacity,left:Math.min(...paints.map(p=>p.left))-.075*font-r.left,right:r.right-Math.max(...paints.map(p=>p.right))-.125*font,top:Math.min(...paints.map(p=>p.top))-r.top,bottom:r.bottom-Math.max(...paints.map(p=>p.bottom))-.05*font,hash:e.querySelectorAll('.step-anchor-icon,.link-arrow').length};});
 assert.equal(geometry.opacity,'1');assert.equal(geometry.hash,0);for(const edge of ['left','right','top','bottom'])assert.ok(Math.abs(geometry[edge]-6)<.1,JSON.stringify(geometry));if(width===320)assert.ok(geometry.count>1,'wrapped title gets multiple decorated fragments');
 if(width===320)await page.screenshot({path:'/tmp/title-hover-'+name+'-'+(route.includes('component')?'playground':'resources')+'.png'});
 await page.mouse.click(1,1);assert.equal(await link.locator('.workshop-link-focus').evaluate(e=>getComputedStyle(e).opacity),'0');
 }
 await page.goto(origin+'/component-playground/status-states');const gallery=page.frameLocator('#errors-frame');const titleSample=gallery.locator('[data-state="Clickable Link · Page Title"] a.page-title-link');await titleSample.waitFor();assert.equal(await titleSample.getAttribute('href'),'/ai-workshop-resources');await titleSample.evaluate(e=>e.scrollIntoView({block:"center"}));await titleSample.evaluate(e=>{document.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',bubbles:true}));e.focus();});await page.waitForTimeout(100);assert.equal(await titleSample.locator('.workshop-link-focus').evaluate(e=>getComputedStyle(e).opacity),'1');
 const left=gallery.locator('[data-state="Left-Aligned Step 2 · Copy Link"] .step-anchor');assert.match(await left.textContent(),/Step 2/);assert.ok(['left','start'].includes(await left.evaluate(e=>getComputedStyle(e).textAlign)));assert.equal(await left.locator('.link-tail').evaluate(e=>getComputedStyle(e).flexDirection),'row');
 await page.close();console.log('PASS title decoration and wrapped exterior rings',name,width);
 }}finally{await browser.close();}
}}finally{server.close();}

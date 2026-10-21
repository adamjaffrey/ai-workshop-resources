import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
try{for(const engine of [chromium,webkit]){const browser=await engine.launch({headless:true,...(engine===chromium?{channel:'chrome'}:{})});try{for(const width of [320,390,768,1440]){
 const page=await browser.newPage({viewport:{width,height:1000},hasTouch:true,reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/ai-workshop-resources');await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>{const p=document.createElement('p');p.style.cssText='width:180px;margin:40px';p.innerHTML='<a id="wrap" href="#test">A long navigation link wrapping across several separate lines</a>';document.querySelector('main').prepend(p);window.decorateWorkshopLinks(p);window.linkClicks=0;p.querySelector('a').onclick=e=>{e.preventDefault();window.linkClicks++;};});
 await page.waitForTimeout(200);
 for(const selector of ['#wrap','.step-anchor']){
  const link=page.locator(selector).first();await link.scrollIntoViewIfNeeded();
  const geometry=await link.evaluate(e=>{const f=parseFloat(getComputedStyle(e).fontSize);return [...e.getClientRects()].map((r,i)=>{const s=e.querySelectorAll(':scope>.workshop-link-surface')[i].getBoundingClientRect();const x=r.right+.06*f,y=r.top+r.height/2;return {delta:[s.left-r.left,s.top-r.top,s.right-r.right,s.bottom-r.bottom],expected:[-.075*f,0,.125*f,.05*f],hit:e.contains(document.elementFromPoint(x,y)),x,y};});});
  for(const g of geometry){g.delta.forEach((v,i)=>assert.ok(Math.abs(v-g.expected[i])<.15,JSON.stringify(g)));assert.ok(g.hit,'paint extension belongs to native link');}
  await page.mouse.move(geometry[0].x,geometry[0].y);assert.equal(await link.evaluate(e=>e.matches(':hover')),true);
  if(selector==='#wrap'){await page.mouse.click(geometry[0].x,geometry[0].y);await page.touchscreen.tap(geometry[0].x,geometry[0].y);assert.equal(await page.evaluate(()=>window.linkClicks),2);}
  for(const agent of ['codex','claude-code'])for(const theme of ['light','dark']){
   await page.evaluate(({agent,theme})=>{document.documentElement.dataset.selectedAgent=agent;document.documentElement.dataset.theme=theme;},{agent,theme});
   await page.keyboard.press('Tab');await link.focus();
   const ring=await link.evaluate(e=>{const focus=e.querySelector('.workshop-link-focus'),r=focus.getBoundingClientRect(),b=e.getBoundingClientRect(),font=parseFloat(getComputedStyle(e).fontSize);return {visible:getComputedStyle(focus).opacity,left:b.left-r.left,right:r.right-b.right,top:b.top-r.top,bottom:r.bottom-b.bottom,font};});assert.equal(ring.visible,'1');for(const [key,expected]of Object.entries({left:6+.075*ring.font,right:6+.125*ring.font,top:6,bottom:6+.05*ring.font}))assert.ok(Math.abs(ring[key]-expected)<.15,JSON.stringify(ring));
  }
 }
 await page.goto(origin+'/component-playground/icons');await page.locator('.icon-usages').first().waitFor();await page.locator('#show-playground-sources').check();
 const gap=()=>page.locator('.icon-usages').first().evaluate(e=>e.nextElementSibling.getBoundingClientRect().top-e.getBoundingClientRect().bottom);
 const heading=page.locator('.heading-anchor').filter({visible:true}).first();await page.keyboard.press('Tab');await heading.focus();assert.equal(await heading.locator('.workshop-link-focus').evaluate(e=>getComputedStyle(e).opacity),'1');
 const closed=await gap();await page.locator('.icon-usages summary').first().click();const opened=await gap();assert.ok(Math.abs(closed-opened)<.1,`source gap ${closed} / ${opened}`);
 await page.goto(origin+'/component-playground/status-states');const frame=page.frameLocator('#errors-frame');await frame.getByText('Right-Aligned Step 2 · Copy Failed',{exact:true}).waitFor();
 const examples=frame.locator('.icon-row').filter({has:frame.getByText('Right-Aligned Step 2 · Copy Link',{exact:true})});
 // The capture preserves the real desktop Step 2 component inside mobile galleries too.
 const side=await examples.locator('.step-anchor').evaluate(e=>{const t=e.querySelector('.step-anchor-label').getBoundingClientRect(),i=e.querySelector('.step-anchor-icon').getBoundingClientRect();return i.right<=t.left&&Math.abs(t.right-e.parentElement.getBoundingClientRect().right+28)<.2;});assert.ok(side,'captured right-aligned icon leads Step 2');
 if(width===390||width===1440)await examples.evaluate(e=>e.scrollIntoView({block:"center"}));
 await page.waitForTimeout(500);
 if(width===390||width===1440)await page.screenshot({path:'/tmp/link-surfaces-'+engine.name()+'-'+width+'.png'});
 assert.deepEqual(errors,[]);await page.close();console.log('PASS link hit areas, focus, source spacing and Step 2 specimens',engine.name(),width);
}}finally{await browser.close();}}}finally{await new Promise(r=>server.close(r));}

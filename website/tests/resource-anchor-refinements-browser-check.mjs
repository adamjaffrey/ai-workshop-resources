import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
try{for(const engine of [chromium,webkit]){
 const browser=await engine.launch({headless:true,...(engine===chromium?{channel:'chrome'}:{})});
 try{for(const width of [390,1440]){
 const p=await browser.newPage({viewport:{width,height:900}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(origin+'/ai-workshop-resources');await p.waitForTimeout(900);
 await p.evaluate(()=>{window.samples=[];let last=performance.now(),y=scrollY;function sample(now){if(document.documentElement.hasAttribute('data-resource-anchor-arriving')){const r=document.querySelector('.step-row'),a=document.querySelector('.controls .toggle'),mark=document.querySelector('.worm-halo>.brand');window.samples.push({time:now,y:scrollY,speed:Math.abs(scrollY-y)/(now-last),row:+getComputedStyle(r).opacity,shadow:+getComputedStyle(a,'::after').opacity,brand:+getComputedStyle(mark).opacity});}y=scrollY;last=now;requestAnimationFrame(sample);}requestAnimationFrame(sample);});
 await p.evaluate(()=>window.workshopResourceAnchors.navigate('step-3'));
 const samples=await p.evaluate(()=>samples);const speeds=samples.slice(6).map((x,i)=>Math.abs(x.y-samples[i].y)/(x.time-samples[i].time));assert.ok(Math.max(...speeds)<1.1,'scroll speed capped: '+Math.max(...speeds));
 const middle=samples.filter(x=>x.row>.05&&x.row<.95);assert.ok(middle.length>5,'fade happens during travel');for(const x of middle){assert.ok(Math.abs(x.row+x.shadow-1)<.03);assert.ok(Math.abs(x.shadow-x.brand)<.03);}
 const y=await p.evaluate(()=>scrollY);await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.closest('.controls .toggle')!==null),true);await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.closest('.theme-toggle')!==null),true);await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.closest('.step-row')===document.querySelectorAll('.step-row')[2]),true);assert.equal(await p.evaluate(()=>scrollY),y);
 // Same URL navigation corresponds to pressing Enter on the existing address.
 const url=p.url();await p.mouse.wheel(0,-120);await p.waitForTimeout(700);await p.goto(url);await p.waitForFunction(()=>!document.documentElement.hasAttribute('data-resource-anchor-arriving')&&document.querySelectorAll('[data-anchor-hidden]').length===2);assert.ok(Math.abs(await p.evaluate(()=>scrollY)-y)<2,'same URL re-entry lands again');
 await p.reload();await p.waitForFunction(()=>!document.documentElement.hasAttribute('data-resource-anchor-arriving')&&document.querySelectorAll('[data-anchor-hidden]').length===2);assert.ok(Math.abs(await p.evaluate(()=>scrollY)-y)<2,'reload lands again');
 await p.evaluate(()=>window.workshopResourceAnchors.navigate('step-1'));assert.equal(await p.locator('.controls .toggle').evaluate(e=>getComputedStyle(e,'::after').opacity),'1');
 const anchor=p.locator('.step-anchor').first();await anchor.hover();await p.waitForTimeout(200);const surfaces=await anchor.evaluate(e=>{const i=e.querySelector('.step-anchor-icon'),t=e.getBoundingClientRect(),b=i.getBoundingClientRect();return {right:b.left>=t.right,joined:getComputedStyle(e,'::before').right==='-6px'&&getComputedStyle(i,'::before').left==='6px',coloured:getComputedStyle(e.querySelector('.step-anchor-label')).color===getComputedStyle(i).color};});assert.deepEqual(surfaces,{right:true,joined:true,coloured:true});
 for(const success of [true,false]){
  await p.evaluate(()=>{document.execCommand=()=>false;});
  await p.evaluate(success=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{if(!success)throw Error('denied');}}}),success);
  for(const selector of ['.step-anchor','.copy','.qr-copy']){
   const b=p.locator(selector).first();await b.evaluate(e=>e.click());await p.waitForTimeout(40);
   const info=await b.evaluate((e,success)=>{const node=e.matches('.step-anchor')?e.querySelector(success?'.step-anchor-success':'.step-anchor-failure'):e.querySelector('.copy-content');const a=node.getAnimations()[0];return {duration:a.effect.getTiming().duration,frames:a.effect.getKeyframes().map(k=>k.transform),icon:e.matches('.step-anchor')?node.dataset.iconName:null};},success);
   assert.equal(info.duration,600);assert.deepEqual(info.frames,[success?'translateY(2px)':'translateY(0px)','translateY(0px)']);if(selector==='.step-anchor')assert.equal(info.icon,success?'circle-check':'circle-x');
  }
 }
 await p.evaluate(()=>{window.workshopResourceAnchors.navigate('step-3');});await p.waitForTimeout(150);await p.mouse.wheel(0,-50);await p.waitForTimeout(100);assert.equal(await p.locator('html[data-resource-anchor-arriving]').count(),0);assert.equal(await p.locator('[data-anchor-hidden],[data-anchor-leaving]').count(),0);
 await p.emulateMedia({reducedMotion:'reduce'});await p.evaluate(()=>window.workshopResourceAnchors.navigate('step-1'));assert.equal(await p.evaluate(()=>parseFloat(document.documentElement.style.getPropertyValue('--anchor-scroll-room'))||0),0,'unneeded footer space removed');
 assert.deepEqual(errors,[]);await p.close();console.log('PASS synchronized arrival, focus, same URL/reload, icon geometry and feedback motion: '+engine.name()+' '+width);
 }}finally{await browser.close();}
}}finally{await new Promise(r=>server.close(r));}

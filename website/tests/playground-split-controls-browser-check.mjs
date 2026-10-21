import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {anchorJourney} from '../lib/workshop-anchor-motion.mjs';
for(const distance of [0,300,1200,3000,20000,100000]){const j=anchorJourney(distance);assert.ok(j.duration>=600&&j.duration<=3000);assert.equal(j.position(0),0);assert.equal(j.position(j.duration),1);let previous=0;for(let t=0;t<=j.duration;t+=10){assert.ok(j.position(t)>=previous);previous=j.position(t);}assert.equal(j.fade(j.duration),1);}
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
try{for(const engine of [chromium,webkit]){const browser=await engine.launch(engine===chromium?{channel:'chrome'}:{});try{for(const width of [390,1440]){
 const p=await browser.newPage({viewport:{width,height:1000}});await p.goto(origin+'/component-playground/components');await p.waitForFunction(()=>window.workshopPlaygroundAnchors);
 await p.evaluate(()=>scrollTo(0,40));await p.waitForTimeout(100);const y=await p.evaluate(()=>scrollY);
 await p.locator('#tab-typography').click();await p.waitForTimeout(400);assert.ok(Math.abs(await p.evaluate(()=>scrollY)-y)<1,'regular tab retains header depth');
 await p.evaluate(async()=>{const e=workshopPlaygroundAnchors.entries.find(e=>e.tab==='icons');await workshopPlaygroundAnchors.navigate(e.path+'#'+e.id);});assert.ok(Math.abs(await p.evaluate(()=>scrollY)-y)<1,'anchor tab retains header depth');
 await p.locator('#tab-components').click();await p.waitForTimeout(250);
 await p.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{window.copyCount=(window.copyCount||0)+1;}}}));
 const row=p.locator('#login-preview>.section-heading'),button=row.locator('.section-collapse');
 const box=await row.evaluate(e=>{const r=e.getBoundingClientRect(),t=e.querySelector('h2').getBoundingClientRect(),b=e.querySelector('button.section-collapse').getBoundingClientRect();return{left:r.left,top:r.top,right:r.right,split:t.right,button:b.left};});
 // Exercise the two regions directly; neither is a full-row overlay.
 await p.mouse.click(box.left+1,box.top+10);assert.equal(await p.evaluate(()=>window.copyCount),1);assert.equal(await button.getAttribute('aria-expanded'),'true');
 await p.mouse.click(box.split+4,box.top+10);assert.equal(await p.evaluate(()=>window.copyCount),1);assert.equal(await button.getAttribute('aria-expanded'),'true','neutral gap does nothing');
 const x=box.split+9;
 await p.mouse.move(x,box.top+10);assert.equal(await button.getAttribute('data-region-hover'),'');await p.waitForTimeout(180);assert.equal(await row.evaluate(e=>getComputedStyle(e,'::before').opacity),'1','right hover tints whole header');
 await p.mouse.click(x,box.top+10);assert.equal(await button.getAttribute('aria-expanded'),'false');assert.equal(await p.evaluate(()=>window.copyCount),1);
 await p.waitForTimeout(200);assert.equal(await button.evaluate(e=>getComputedStyle(e).transitionDuration),'0.16s');
 await p.mouse.move(0,0);await p.waitForTimeout(200);assert.notEqual(await button.evaluate(e=>getComputedStyle(e).backgroundColor),'rgba(0, 0, 0, 0)');
 const optical=await button.evaluate(e=>{const b=e.getBoundingClientRect(),s=e.querySelector('svg').getBoundingClientRect();return{x:(s.left+s.right-b.left-b.right)/2,y:(s.top+s.bottom-b.top-b.bottom)/2};});assert.ok(Math.abs(optical.x+1)<.1&&Math.abs(optical.y)<.1,'collapsed optical offset');
 await p.screenshot({path:'/tmp/heading-gap-'+engine.name()+'-'+width+'.png'});
 await button.click();await p.waitForTimeout(200);assert.equal(await button.getAttribute('aria-expanded'),'true');
 // A near-footer anchor needs temporary room. Collapse must not clamp or
 // automatically re-anchor the viewport during its 160ms height transition.
 await p.evaluate(async()=>{const e=workshopPlaygroundAnchors.entries.filter(e=>e.tab==='urls').at(-1)||workshopPlaygroundAnchors.entries.at(-1);selectTab(document.querySelector('[data-tab="'+e.tab+'"]'),false);await workshopPlaygroundAnchors.navigate(e.path+'#'+e.id);window.endEntry=e;});
 assert.ok(await p.evaluate(()=>parseFloat(document.documentElement.style.getPropertyValue('--playground-anchor-room')))>0);
 const anchoredY=await p.evaluate(()=>scrollY);
 await p.evaluate(()=>endEntry.row.querySelector('.section-collapse').click());
 for(let n=0;n<10;n++){await p.waitForTimeout(30);assert.ok(Math.abs(await p.evaluate(()=>scrollY)-anchoredY)<2,'collapse retains viewport while bottom room exists');}
 assert.equal(await p.evaluate(()=>getComputedStyle(endEntry.row.querySelector('.section-collapse')).webkitTapHighlightColor),'rgba(0, 0, 0, 0)');
 console.log('PASS split copy/toggle, collapsed tint, tab depth and bounded travel',engine.name(),width);await p.close();
}}finally{await browser.close()}}}finally{server.close()}

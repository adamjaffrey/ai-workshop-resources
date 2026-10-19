import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:'+server.address().port+'/playground');await p.click('[data-tab=branding]');const frame=p.frameLocator('#branding-frame');
 for(const width of [320,390,768,1440]){
  await p.setViewportSize({width,height:900});await p.locator('#branding-frame').scrollIntoViewIfNeeded();
  for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
   await p.evaluate(({theme,agent})=>{document.querySelector('[name=theme][value="'+theme+'"]').click();document.querySelector('[name=agent][value="'+agent+'"]').click();},{theme,agent});await p.waitForTimeout(250);
   const geometry=await frame.locator('.worm-halo').evaluate(e=>{const r=e.getBoundingClientRect(),img=e.querySelector('img').getBoundingClientRect(),src=document.querySelector('.page-toolbar .brand-mark img').getBoundingClientRect(),theme=document.querySelector('.theme-toggle').getBoundingClientRect();return {centre:r.left+r.width/2,expected:innerWidth/2,cy:r.top+r.height/2,expectedY:24+theme.height/2,width:img.width,sourceWidth:src.width,height:img.height,sourceHeight:src.height,opacity:getComputedStyle(e).opacity,outline:getComputedStyle(e.querySelector('.worm-halo-outline')).display,blur:getComputedStyle(e.querySelector('.worm-halo-veil')).backdropFilter};});
   assert.ok(Math.abs(geometry.centre-geometry.expected)<1);assert.ok(Math.abs(geometry.cy-geometry.expectedY)<1,JSON.stringify({width,theme,agent,geometry,errors}));assert.equal(geometry.width,geometry.sourceWidth);assert.equal(geometry.height,geometry.sourceHeight);assert.equal(geometry.opacity,'1');assert.equal(geometry.outline,'none');assert.equal(geometry.blur,'blur(12px)');
  }
 }
 await p.locator('#worm-outline').check();await p.locator('#worm-blur').fill('24');await p.locator('#worm-width').fill('150');await p.waitForTimeout(100);
 assert.equal(await frame.locator('.worm-halo-outline').evaluate(e=>getComputedStyle(e).width),'150px');assert.equal(await frame.locator('.worm-halo-outline').evaluate(e=>getComputedStyle(e).display),'block');assert.equal(await frame.locator('.worm-halo-veil').evaluate(e=>getComputedStyle(e).backdropFilter),'blur(24px)');
 await p.locator('#worm-hold').uncheck();await frame.locator('body').evaluate(()=>scrollTo(0,0));await p.waitForTimeout(100);assert.equal(await frame.locator('.worm-halo').evaluate(e=>getComputedStyle(e).opacity),'0');
 await frame.locator('body').evaluate(()=>scrollTo(0,900));await p.waitForTimeout(450);assert.equal(await frame.locator('.worm-halo').evaluate(e=>getComputedStyle(e).opacity),'1');
 await p.click('#reset-worm');await p.waitForTimeout(100);assert.equal(await frame.locator('.worm-halo-veil').evaluate(e=>getComputedStyle(e).backdropFilter),'blur(12px)');
 await p.setViewportSize({width:390,height:900});await p.locator('#branding-frame').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/workshop-worm-halo.png'});
 assert.deepEqual(errors,[]);console.log('PASS: worm size, page centring, theme/agent variants, slider settings, bounds, reset and shadow-linked visibility');
}finally{await browser.close();server.close();}

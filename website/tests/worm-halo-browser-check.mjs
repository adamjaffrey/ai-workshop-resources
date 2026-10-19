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
   const geometry=await frame.locator('.worm-halo').evaluate(e=>{const r=e.getBoundingClientRect(),img=e.querySelector('img').getBoundingClientRect(),src=document.querySelector('.page-toolbar .brand-mark img').getBoundingClientRect(),theme=document.querySelector('.theme-toggle').getBoundingClientRect();return {centre:r.left+r.width/2,expected:innerWidth/2,cy:r.top+r.height/2,expectedY:24+theme.height/2,width:img.width,sourceWidth:src.width,height:img.height,sourceHeight:src.height,wordmark:getComputedStyle(e.querySelector('.brand-name')).display,full:innerWidth>=1024,opacity:getComputedStyle(e).opacity,outline:getComputedStyle(e.querySelector('.worm-halo-outline')).display,blur:getComputedStyle(e.querySelector('.worm-halo-veil')).backdropFilter};});
   assert.ok(Math.abs(geometry.centre-geometry.expected)<1);assert.ok(Math.abs(geometry.cy-geometry.expectedY)<1,JSON.stringify({width,theme,agent,geometry,errors}));assert.equal(geometry.width,geometry.sourceWidth);assert.equal(geometry.height,geometry.sourceHeight);assert.equal(geometry.wordmark==='none',!geometry.full);assert.equal(geometry.opacity,'1');assert.equal(geometry.outline,'none');assert.equal(geometry.blur,'blur(32px)');
  }
 }
 const mask=await frame.locator('.worm-halo-veil').evaluate(async e=>{
  const url=e.style.maskImage.slice(5,-2),img=new Image();img.src=url;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);
  const alpha=x=>ctx.getImageData(x,Math.floor(c.height/2),1,1).data[3];return {edge:alpha(40),outside:alpha(20),outer:alpha(0),inside:alpha(100)};
 });assert.equal(mask.edge,255);assert.equal(mask.inside,255);assert.ok(mask.outside>100&&mask.outside<160);assert.ok(mask.outer<3);
 await p.evaluate(()=>{window.copiedSettings=[];Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>window.copiedSettings.push(JSON.parse(text))}});});
 await p.click('#copy-worm');const copied=await p.evaluate(()=>window.copiedSettings.at(-1));assert.equal(copied.preset,'Floating Brand Blur');assert.deepEqual(copied.values,{width:100,height:50,blur:32,feather:20,tint:50});assert.equal(copied.featherDirection,'outward');
 await p.click('[data-tab=discovery]');await p.click('#perspective-copy');assert.equal(await p.evaluate(()=>window.copiedSettings.at(-1).preset),'Easter Egg');await p.click('[data-tab=branding]');
 await p.evaluate(()=>{navigator.clipboard.writeText=async()=>{throw Error('test unavailable')};document.execCommand=()=>false;});await p.click('#copy-worm');assert.equal(await p.locator('#worm-copy-fallback').isVisible(),true);assert.equal(JSON.parse(await p.locator('#worm-copy-text').inputValue()).values.width,100);
 await p.locator('#worm-outline').check();await p.locator('#worm-blur').fill('24');await p.locator('#worm-width').fill('150');await p.waitForTimeout(100);
 assert.equal(await frame.locator('.worm-halo-outline').evaluate(e=>getComputedStyle(e).width),'150px');assert.equal(await frame.locator('.worm-halo-outline').evaluate(e=>getComputedStyle(e).display),'block');assert.equal(await frame.locator('.worm-halo-veil').evaluate(e=>getComputedStyle(e).backdropFilter),'blur(24px)');
 await p.locator('#worm-hold').uncheck();await frame.locator('body').evaluate(()=>scrollTo(0,0));await p.waitForTimeout(100);assert.equal(await frame.locator('.worm-halo').evaluate(e=>getComputedStyle(e).opacity),'0');
 await frame.locator('body').evaluate(()=>scrollTo(0,900));await p.waitForTimeout(450);assert.equal(await frame.locator('.worm-halo').evaluate(e=>getComputedStyle(e).opacity),'1');
 await p.click('#reset-worm');await p.waitForTimeout(100);assert.equal(await frame.locator('.worm-halo-veil').evaluate(e=>getComputedStyle(e).backdropFilter),'blur(32px)');
 await p.setViewportSize({width:390,height:900});await p.locator('#branding-frame').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/workshop-worm-halo.png'});
 assert.deepEqual(errors,[]);console.log('PASS: worm size, page centring, theme/agent variants, slider settings, bounds, reset and shadow-linked visibility');
}finally{await browser.close();server.close();}

import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:'+server.address().port+'/playground/branding');assert.equal(await p.locator('[data-tab=branding]').getAttribute('aria-selected'),'true');await p.click('[data-tab=typography]');assert.ok(p.url().endsWith('/playground/typography'));await p.goBack();assert.equal(await p.locator('[data-tab=branding]').getAttribute('aria-selected'),'true');assert.equal(await p.locator('.playground-heading').evaluate(e=>getComputedStyle(e).backgroundColor),await p.locator('.toolbar').evaluate(e=>getComputedStyle(e).backgroundColor));const frame=p.frameLocator('#branding-frame');
 for(const width of [320,390,768,1440]){
  await p.setViewportSize({width,height:900});await p.locator('#branding-frame').scrollIntoViewIfNeeded();
  for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
   await p.evaluate(({theme,agent})=>{document.querySelector('[name=theme][value="'+theme+'"]').click();document.querySelector('[name=agent][value="'+agent+'"]').click();},{theme,agent});await p.waitForTimeout(250);
   const geometry=await frame.locator('.worm-halo').evaluate(e=>{const r=e.getBoundingClientRect(),img=e.querySelector('img').getBoundingClientRect(),src=document.querySelector('.page-toolbar .brand-mark img').getBoundingClientRect(),theme=document.querySelector('.theme-toggle').getBoundingClientRect();return {hidden:getComputedStyle(e).display==='none',viewportWidth:innerWidth,centre:r.left+r.width/2,expected:innerWidth<=660?(document.querySelector('.controls .toggle').getBoundingClientRect().right+theme.left)/2:innerWidth/2,cy:r.top+r.height/2,expectedY:24+theme.height/2,width:img.width,sourceWidth:src.width,height:img.height,sourceHeight:src.height,wordmark:getComputedStyle(e.querySelector('.brand-name')).display,full:innerWidth>660,opacity:e.dataset.visibility,outline:getComputedStyle(e.querySelector('.worm-halo-outline')).display,blur:getComputedStyle(e.querySelector('.worm-halo-veil')).backdropFilter};});
   if(geometry.viewportWidth<320){assert.equal(geometry.hidden,true);continue;}assert.equal(geometry.hidden,false);assert.ok(Math.abs(geometry.centre-geometry.expected)<1);assert.ok(Math.abs(geometry.cy-geometry.expectedY)<1,JSON.stringify({width,theme,agent,geometry,errors}));assert.equal(geometry.width,geometry.sourceWidth);assert.equal(geometry.height,geometry.sourceHeight);assert.equal(geometry.wordmark==='none',!geometry.full);assert.equal(geometry.opacity,'0');assert.equal(geometry.outline,'none');assert.equal(geometry.blur,'blur(36px)');
  }
 }
 const mask=await frame.locator('.worm-halo-veil').evaluate(async e=>{
  const url=e.style.maskImage.slice(5,-2),img=new Image();img.src=url;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);
  const alpha=x=>ctx.getImageData(x,Math.floor(c.height/2),1,1).data[3];return {edge:alpha(96),outside:alpha(48),outer:alpha(0),inside:alpha(120)};
 });assert.equal(mask.edge,255);assert.equal(mask.inside,255);assert.ok(mask.outside>100&&mask.outside<160);assert.ok(mask.outer<3);
 await p.evaluate(()=>{window.copiedSettings=[];Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>window.copiedSettings.push(JSON.parse(text))}});});
 await p.click('#copy-worm');const copied=await p.evaluate(()=>window.copiedSettings.at(-1));assert.equal(copied.preset,'Floating Brand Blur');assert.deepEqual(copied.values,{paddingX:8,paddingY:8,blur:36,feather:48,radius:100,tint:48});assert.equal(copied.featherDirection,'outward');
 await p.click('[data-tab=discovery]');await p.click('#perspective-copy');assert.equal(await p.evaluate(()=>window.copiedSettings.at(-1).preset),'Easter Egg');await p.click('[data-tab=branding]');
 await p.evaluate(()=>{navigator.clipboard.writeText=async()=>{throw Error('test unavailable')};document.execCommand=()=>false;});await p.click('#copy-worm');assert.equal(await p.locator('#worm-copy-fallback').isVisible(),true);assert.equal(JSON.parse(await p.locator('#worm-copy-text').inputValue()).values.paddingX,8);
 await p.locator('#worm-radius').fill('0');await p.waitForTimeout(100);assert.equal(await frame.locator('.worm-halo-outline').evaluate(e=>e.style.borderRadius),'0px');
 await p.locator('#worm-outline').check();await p.locator('#worm-blur').fill('80');await p.locator('#worm-paddingX').fill('40');await p.waitForTimeout(100);
 assert.ok(await frame.locator('.worm-halo-outline').evaluate(e=>Math.abs(e.getBoundingClientRect().width-e.parentElement.querySelector('.brand').getBoundingClientRect().width-80)<1));assert.equal(await frame.locator('.worm-halo-outline').evaluate(e=>getComputedStyle(e).display),'block');assert.equal(await frame.locator('.worm-halo-veil').evaluate(e=>getComputedStyle(e).backdropFilter),'blur(80px)');
 await p.locator('#worm-hold').uncheck();await frame.locator('body').evaluate(()=>scrollTo(0,0));await p.waitForTimeout(100);assert.equal(await frame.locator('.worm-halo').evaluate(e=>e.dataset.visibility),'0');
 await frame.locator('body').evaluate(()=>scrollTo(0,900));await p.waitForTimeout(450);assert.equal(await frame.locator('.worm-halo').evaluate(e=>e.dataset.visibility),'1');
 for(const variant of ['mark','full','auto']){await p.locator('[name=worm-brand][value='+variant+']').check({force:true});await p.waitForTimeout(100);assert.equal(await frame.locator('.worm-halo').getAttribute('data-brand-variant'),variant==='mark'?'mark':'full');}
 const state=()=>frame.locator('.worm-halo-veil').evaluate(e=>({mask:e.style.maskImage,blur:e.style.backdropFilter,tint:e.style.background,opacity:e.style.opacity}));
 const before=await state();for(let i=0;i<3;i++){await frame.locator('body').evaluate(()=>scrollTo(0,0));await p.waitForTimeout(100);await frame.locator('body').evaluate(()=>scrollTo(0,900));await p.waitForTimeout(150);assert.deepEqual(await state(),before);}
 await p.click('#reset-worm');await p.waitForTimeout(100);assert.equal(await frame.locator('.worm-halo-veil').evaluate(e=>getComputedStyle(e).backdropFilter),'blur(36px)');

 await p.setViewportSize({width:1440,height:1000});
 for(const [tab,grid] of [['branding','#worm-settings'],['discovery','#discovery-preview .state-tools'],['blocks','#blocks-preview .state-tools']]){
  await p.click('[data-tab='+tab+']');
  assert.equal(await p.locator(grid).evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),3);
 }
 for(const id of ['reset','reset-worm','perspective-reset','reset-blocks','copy-worm','perspective-copy'])assert.equal(await p.locator('#'+id+' svg[data-icon-provider="lucide"]').count(),1);
 await p.click('[data-tab=branding]');await p.locator('[name=width][value="768"]').check({force:true});await p.waitForTimeout(450);
 await p.locator('#branding-frame').scrollIntoViewIfNeeded();
 const collisions=await frame.locator('body').evaluate(async()=>{let collisions=0;for(const y of [0,800,0,800]){scrollTo(0,y);for(let i=0;i<30;i++){await new Promise(requestAnimationFrame);const host=document.querySelector('.worm-halo'),mark=host.querySelector('.brand').getBoundingClientRect(),a=document.querySelector('.controls .toggle').getBoundingClientRect();if(Number(host.dataset.visibility)>0&&a.right>mark.left&&a.top<mark.bottom&&a.bottom>mark.top)collisions++;}}return collisions;});assert.equal(collisions,0);
 await p.setViewportSize({width:390,height:900});await p.locator('#branding-frame').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/workshop-worm-halo.png'});
 assert.deepEqual(errors,[]);console.log('PASS: worm size, page centring, theme/agent variants, slider settings, bounds, reset and shadow-linked visibility');
}finally{await browser.close();server.close();}

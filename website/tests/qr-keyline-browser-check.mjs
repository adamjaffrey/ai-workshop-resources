import assert from 'node:assert/strict';
import sharp from 'sharp';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
try {
 for(const engine of [chromium,webkit]){
  const browser=await engine.launch(engine===chromium?{channel:'chrome',headless:true}:{headless:true});
  try {for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
   const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
   await page.goto(`${origin}/ai-workshop-resources?theme=${theme}&agent=${agent}`);
   const qr=page.locator('.qr-copy');
   async function check(target,state){
    const expected=await target.evaluate(e=>{const c=getComputedStyle(e,'::after'),r=e.getBoundingClientRect();return {colour:c.borderTopColor,neutral:getComputedStyle(e.closest('.qr-card')).borderTopColor,width:r.width,height:r.height,pointer:c.pointerEvents,style:c.borderTopStyle,thickness:c.borderTopWidth,layer:c.zIndex};});
    assert.equal(expected.width,150);assert.equal(expected.height,150);assert.equal(expected.pointer,'none');
    assert.equal(expected.colour,expected.neutral,'Keyline retains the neutral card border colour');
    assert.equal(expected.style,'solid');assert.equal(expected.thickness,'1px');assert.equal(expected.layer,'1');
    // Page embeds clip their own viewport; source pixels are checked independently.
    if(state.startsWith('Playground'))return;
    const rgb=expected.colour.match(/[\d.]+/g).slice(0,3).map(Number);
    const {data,info}=await sharp(await target.page().screenshot({clip:await target.boundingBox()})).removeAlpha().raw().toBuffer({resolveWithObject:true});
    const edges=[[[75,0],[75,1]],[[75,info.height-1],[75,info.height-2]],[[0,75],[1,75]],[[info.width-1,75],[info.width-2,75]]];
    // Inspect both edge raster rows to accommodate screenshot boundary rounding.
    for(const points of edges){
     const pixels=points.map(([x,y])=>[...data.subarray((y*info.width+x)*info.channels,(y*info.width+x)*info.channels+3)]);
     assert.ok(pixels.some(pixel=>pixel.every((v,i)=>Math.abs(v-rgb[i])<=2)),`${engine.name()} ${theme} ${agent} ${state}: ${JSON.stringify(pixels)} != ${rgb}`);
    }
   }
   await check(qr,'rest');await qr.hover();await check(qr,'hover');
   await page.mouse.down();await check(qr,'press');await page.mouse.move(0,0);await page.mouse.up();
   await qr.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');await check(qr,'keyboard focus');
   for(const success of [true,false]){
    await page.evaluate(success=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{if(!success)throw Error('Simulated failure');}}});document.execCommand=()=>false;},success);
    await qr.press('Enter');await page.waitForFunction(success=>document.querySelector('.qr-copy .copy-label').textContent===(success?'Link Copied':'Copy Failed'),success);
    await check(qr,success?'success':'failure');
   }
   await qr.locator('.qr-copy-overlay').evaluate(e=>{const a=e.animate([{opacity:1},{opacity:0}],{duration:600,fill:'both'});a.pause();a.currentTime=300;});
   await check(qr,'feedback exit midpoint');
   await page.goto(`${origin}/component-playground/components?theme=${theme}&agent=${agent}`);
   const sample=page.frameLocator('#resources-frame').locator('.qr-copy');await sample.waitFor();await page.locator('#resources-frame').scrollIntoViewIfNeeded();await sample.evaluate(e=>e.scrollIntoView({block:'center'}));await page.waitForTimeout(200);await check(sample,'Playground rest');await sample.hover();await check(sample,'Playground hover');
   await page.close();
   const touch=await browser.newPage({viewport:{width:768,height:1000},hasTouch:true,reducedMotion:'reduce'});
   await touch.goto(`${origin}/ai-workshop-resources?theme=${theme}&agent=${agent}`);const tq=touch.locator('.qr-copy');await tq.tap();await check(tq,'touch preview');await touch.close();
   console.log('PASS QR keyline pixels',engine.name(),theme,agent);
  }}finally{await browser.close();}
 }
}finally{server.close();}

import assert from 'node:assert/strict';
import {once} from 'node:events';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({colorScheme:'light'});
 for(const width of [390,1440]) {
  await page.setViewportSize({width,height:844});await page.goto('http://127.0.0.1:'+server.address().port);await page.evaluate(()=>document.fonts.ready);
  for(const mode of ['dark','light']) {
   const clip={x:0,y:0,width,height:120};
   const before=(await page.screenshot({clip})).toString('base64');
   await page.locator('.theme-toggle:not(.ph-static) [data-theme-choice="'+mode+'"]').click();
   await page.waitForFunction(()=>document.getAnimations().some(a=>a.animationName==='theme-circle'));
   await page.evaluate(()=>{window.circle=document.getAnimations().find(a=>a.animationName==='theme-circle');circle.pause();circle.currentTime=0;});
   const during=(await page.screenshot({clip})).toString('base64');
   const difference=await page.evaluate(async({before,during})=>{
    const pixels=async data=>{const img=new Image();img.src='data:image/png;base64,'+data;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);return ctx.getImageData(0,0,c.width,c.height).data;};
    const a=await pixels(before),b=await pixels(during);let total=0;for(let i=0;i<a.length;i++)total+=Math.abs(a[i]-b[i]);return total/a.length;
   },{before,during});
   assert.ok(difference<2,`background snapshot changed: ${difference} at ${width}/${mode}`);
   for(const progress of [.25,.75]){
    await page.evaluate(p=>circle.currentTime=circle.effect.getTiming().duration*p,progress);
    const styles=await page.evaluate(()=>({background:getComputedStyle(document.querySelector('.page-placeholder')).filter,gate:getComputedStyle(document.querySelector('.access-gate')).backdropFilter}));
    assert.equal(styles.background,'blur(4px)');assert.equal(styles.gate,'none');
   }
   await page.evaluate(()=>circle.finish());await page.waitForFunction(()=>!document.documentElement.classList.contains('theme-reveal'));
  }
 }
 console.log('PASS: login blur snapshot continuity in both directions and desktop/mobile sizes; the single blur pass remains active during transitions');
} finally {await browser.close();server.close();}

import assert from 'node:assert/strict';
import {once} from 'node:events';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:390,height:844},colorScheme:'light'});
 await page.goto('http://127.0.0.1:'+server.address().port);
 for(const unlocked of [false,true]) {
  if(unlocked){await page.locator('#workshop-password').fill(password);await page.getByRole('button',{name:'Unlock Resources',exact:true}).click();await page.locator('#access-gate').waitFor({state:'detached'});}
  for(const width of [390,1440]) {
   await page.setViewportSize({width,height:844});
   for(const mode of ['dark','light']) {
    await page.locator('.theme-toggle:not(.ph-static) button').first().evaluate(e=>e.click());
    await page.waitForFunction(()=>document.getAnimations().some(a=>a.animationName==='theme-circle'));
    await page.evaluate(()=>{window.circle=document.getAnimations().find(a=>a.animationName==='theme-circle');circle.pause();});
    const samples=[];
    for(const time of [0,210,419]) {
     await page.evaluate(time=>circle.currentTime=time,time);
     await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
     samples.push(await page.locator('.theme-toggle:not(.ph-static)').evaluate(e=>parseFloat(e.style.getPropertyValue('--theme-control-previous'))));
    }
    if(mode==='dark') {assert.ok(samples[0]>99);assert.ok(samples[1]>99);assert.ok(samples[2]<80);}
    else {assert.ok(samples[1]<1);assert.ok(samples[2]<1);}
    await page.evaluate(()=>circle.play());
    await page.waitForFunction(()=>!document.documentElement.classList.contains('theme-reveal'));
    assert.equal(await page.locator('.theme-toggle:not(.ph-static)').evaluate(e=>e.style.getPropertyValue('--theme-control-previous')),'');
   }
  }
 }
 console.log('PASS: toggle colours follow actual feather timing on login/resources at mobile/desktop widths; overrides clean up');
} finally {await browser.close();server.close();}

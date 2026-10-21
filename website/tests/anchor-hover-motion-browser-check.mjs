import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
try{for(const engine of [chromium,webkit]){const browser=await engine.launch(engine===chromium?{channel:'chrome'}:{});try{for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:900}});await page.goto('http://127.0.0.1:'+server.address().port+'/ai-workshop-resources');await page.waitForTimeout(900);
 const button=page.locator('.step-anchor').first();await button.scrollIntoViewIfNeeded();await page.mouse.move(0,0);await page.waitForTimeout(100);
 const mid=await button.evaluate(e=>{e.setAttribute('data-anchor-preview','');getComputedStyle(e).backgroundColor;const animations=e.getAnimations({subtree:true});for(const a of animations){a.pause();a.currentTime=40;}return {animations:animations.map(a=>({property:a.transitionProperty,duration:a.effect.getTiming().duration,easing:a.effect.getTiming().easing})),hash:+getComputedStyle(e.querySelector('.step-anchor-hash')).opacity,underline:getComputedStyle(e.querySelector('.step-anchor-label')).textDecorationLine,fill:getComputedStyle(e).backgroundColor}});
 assert.ok(mid.animations.some(a=>a.property==='opacity'));for(const a of mid.animations){assert.equal(a.duration,80);assert.equal(a.easing,'ease-out');assert.notEqual(a.property,'background-color');}assert.ok(mid.hash>0&&mid.hash<1);assert.equal(mid.underline,'none');assert.notEqual(mid.fill,'rgba(0, 0, 0, 0)');
 await button.evaluate(e=>e.getAnimations({subtree:true}).forEach(a=>a.finish()));
 const gap=await button.evaluate(e=>{const label=e.querySelector('.step-anchor-label'),slot=e.querySelector('.step-anchor-icon');return {actual:slot.getBoundingClientRect().left-label.getBoundingClientRect().right,expected:parseFloat(getComputedStyle(e).fontSize)*.2}});assert.ok(Math.abs(gap.actual-gap.expected)<.1);
 await button.evaluate(e=>e.removeAttribute('data-anchor-preview'));await page.waitForTimeout(100);assert.equal(await button.locator('.step-anchor-hash').evaluate(e=>getComputedStyle(e).opacity),'0');
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await button.evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
 console.log('PASS 80ms hover, atomic solid fill and proportional gap',engine.name(),width);await page.close();
}}finally{await browser.close()}}}finally{await new Promise(r=>server.close(r))}

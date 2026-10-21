import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome'});
try{
 const p=await browser.newPage({viewport:{width:1440,height:900}});await p.goto('http://127.0.0.1:'+server.address().port+'/ai-workshop-resources');await p.waitForTimeout(900);await p.clock.install();await p.clock.pauseAt(new Date());
 for(const selector of ['.step-anchor','.qr-copy','[data-copy]'])for(const success of [true,false]){
  await p.evaluate(success=>{document.execCommand=()=>false;Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{if(!success)throw Error('denied');}}});},success);
  const control=p.locator(selector).first();await control.evaluate(e=>e.click());
  const target=selector==='.step-anchor'?(success?'.step-anchor-success':'.step-anchor-failure'):'.copy-content';
  const entrance=await control.locator(target).evaluate(e=>{const a=e.getAnimations()[0];a.pause();return {duration:a.effect.getTiming().duration,easing:a.effect.getTiming().easing,frames:a.effect.getKeyframes().map(k=>k.transform)};});
  assert.equal(entrance.duration,success?600:300);assert.equal(entrance.easing,'ease-out');assert.deepEqual(entrance.frames,[success?'translateY(2px)':'translateY(0px)','translateY(0px)']);
  // Pausing entry longer than the hold must not consume any fully visible time.
  await p.clock.fastForward(13000);
  await control.evaluate(e=>{const root=e.closest('article')||e;root.getAnimations({subtree:true}).forEach(a=>a.finish());});
  await control.locator(target).evaluate(async e=>{await Promise.all(e.getAnimations().map(a=>a.finished));});
  const hold=selector==='[data-copy]'?(success?6000:12000):(success?3000:6000);
  await p.clock.fastForward(hold-1);
  assert.equal(await control.locator(target).evaluate(e=>e.getAnimations().filter(a=>a.playState!=='finished').length),0,'full hold before exit: '+selector);
  await p.clock.fastForward(1);
  const exit=await control.evaluate((e,target)=>{const a=(e.getAnimations({subtree:true}).find(a=>a.effect.getTiming().fill==='forwards'));return {duration:a.effect.getTiming().duration,easing:a.effect.getTiming().easing,frames:a.effect.getKeyframes().map(k=>k.transform)};},target);
  assert.equal(exit.duration,600);assert.equal(exit.easing,'ease-in');assert.deepEqual(exit.frames,['translateY(0px)','translateY(-2px)']);
  await control.evaluate(e=>{(e.closest('article')||e).getAnimations({subtree:true}).forEach(a=>a.finish());});await p.clock.fastForward(600);
  console.log('PASS full hold and motion: '+selector+' '+(success?'success':'failure'));
 }
}finally{await browser.close();await new Promise(r=>server.close(r));}

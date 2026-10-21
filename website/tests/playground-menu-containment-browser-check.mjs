import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
const near=(a,b,label)=>assert.ok(Math.abs(a-b)<.2,`${label}: ${a}, expected ${b}`);
try{
 const p=await browser.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,660]){
  await p.setViewportSize({width,height:844});await p.goto('http://127.0.0.1:'+server.address().port+'/playground');
  for(const scroll of [0,200,700]){
   await p.evaluate(y=>scrollTo(0,y),scroll);await p.waitForTimeout(100);const before=await p.locator('body>#style-options').boundingBox();
   await p.locator('body>#style-options').click();
   const dialog=p.locator('#style-dialog');await p.waitForTimeout(280);const panel=await dialog.boundingBox(),close=await dialog.locator('#style-options').boundingBox();
   near(panel.y,before.y,'panel emanates from button top');near(panel.x+panel.width,before.x+before.width,'panel right edge');
   for(const key of ['x','y','width','height'])near(close[key],before[key],'close button '+key);
   const svg=await dialog.locator('.options-close svg').boundingBox();near(svg.width,24,'Lucide X width');near(svg.height,24,'Lucide X height');near(svg.x+12,close.x+close.width/2,'X centre');
   await dialog.locator('#style-options').click();await p.waitForTimeout(280);const restored=await p.locator('body>#style-options').boundingBox();near(restored.y,before.y,'restored origin');
  }
  await p.locator('[data-tab=components]').click();const gap=await p.evaluate(()=>document.querySelector('#state legend').getBoundingClientRect().top-document.querySelector('#login-destination .choice-shell').getBoundingClientRect().bottom);near(gap,32,'control-group gap');
  for(const [tab,ids]of [['typography',['type','link-type']],['icons',['icons']],['errors',['errors']],['focus',['focus']]]){
   await p.locator('[data-tab='+tab+']').click();for(const id of ids){const metrics=await p.locator('#'+id+'-frame').evaluate(e=>{const f=e.parentElement,p=f.closest('.panel'),r=f.getBoundingClientRect(),b=p.getBoundingClientRect(),s=getComputedStyle(f);return{left:r.left-b.left,right:b.right-r.right,radius:parseFloat(s.borderRadius),border:parseFloat(s.borderLeftWidth),overflow:document.documentElement.scrollWidth>innerWidth};});near(metrics.left,25,'specimen left inset');near(metrics.right,25,'specimen right inset');assert.equal(metrics.radius,12);assert.equal(metrics.border,1);assert.equal(metrics.overflow,false);}
  }
 }
 await p.screenshot({path:'/tmp/playground-contained-specimens.png'});
 assert.deepEqual(errors,[]);console.log('PASS: menu origin at three scroll positions, stable 50px close control/24px X, 32px group spacing and five contained mobile reference frames');
}finally{await browser.close();server.close();}

import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const{server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
const near=(a,b,label)=>assert.ok(Math.abs(a-b)<.6,`${label}: ${a}, expected ${b}`);
try{const p=await browser.newPage({reducedMotion:'reduce'});
for(const width of [320,390,660,661,768,1024,1440]){
 await p.setViewportSize({width,height:900});await p.goto('http://127.0.0.1:'+server.address().port+'/playground');
 const nav=p.locator('nav[role=tablist]');await p.evaluate(()=>document.fonts.ready);
 const max=await nav.evaluate(e=>e.scrollWidth-e.clientWidth);
 for(const [name,position]of [['start',0],['middle',max/2],['end',max]]){
  await nav.evaluate((e,x)=>{e.scrollLeft=x;},position);await p.waitForTimeout(80);
  const r=await nav.evaluate(e=>{const b=e.getBoundingClientRect(),s=e.parentElement.getBoundingClientRect(),first=e.firstElementChild.getBoundingClientRect(),last=e.lastElementChild.getBoundingClientRect(),c=getComputedStyle(e);return{left:b.left,right:b.right,shellLeft:s.left,shellRight:s.right,first:first.left,last:last.right,padding:c.paddingLeft,labelPadding:getComputedStyle(e.firstElementChild).paddingLeft,leftFade:e.hasAttribute('data-overflow-left'),rightFade:e.hasAttribute('data-overflow-right'),mask:c.maskImage};});
  near(r.left,Math.max(24,(width-1200)/2),'text rail');near(r.shellLeft,width<=660?0:r.left,'header left');near(r.shellRight,width<=660?width:r.right,'header right');assert.equal(r.padding,'0px');assert.equal(r.labelPadding,'14px','keep tab interior padding');
  if(name==='start')near(r.first,r.left,'first indicator at scroll edge');if(name==='end'&&max>0)near(r.last,r.right,'last indicator at scroll edge');
  assert.equal(r.leftFade,position>2,name+' left fade');assert.equal(r.rightFade,max-position>2,name+' right fade');
  if(r.leftFade||r.rightFade){assert.notEqual(r.mask,'none');assert.ok(r.mask.includes(width<=660?'54px':'108px'),'retain fade width');}
 }
 if(max>80){
  await nav.evaluate(e=>{e.scrollLeft=0;});await p.waitForTimeout(80);
  for(const [position,alpha]of [[4,14/18],[9,.5],[18,0],[9,0],[0,1]]){
   await nav.evaluate((e,x)=>{e.scrollLeft=x;},position);await p.waitForTimeout(80);
   const actual=await nav.evaluate(e=>Number(e.style.getPropertyValue('--overflow-left-alpha')));
   assert.ok(Math.abs(actual-alpha)<.02,`fade at ${position}: ${actual}, expected ${alpha}`);
  }
 }
}
console.log('PASS: tab surface-rail endpoints and responsive directional fades at seven widths');
}finally{await browser.close();server.close();}

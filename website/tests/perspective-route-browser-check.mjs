import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {perspectiveRoute} from '../lib/workshop-easter-egg.mjs';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage();
 let worst=0;
 for(const width of [320,390,768,1440])for(const dark of [false,true])for(const height of [568,844,1200]){
  const w=Math.min(440,width-48),h=360,origin={x:dark?24:width-24,y:height-80,dark},data=perspectiveRoute(origin,width,height,w,h);
  const result=await page.evaluate(({width,height,w,h,origin,data})=>{
   const cx=width/2,cy=height/2,left=cx-w/2,right=cx+w/2,top=cy-h/2,bottom=cy+h/2,r=24,sign=origin.dark?-1:1,endX=cx+sign*w/2,clamp=x=>Math.max(16,Math.min(width-16,x));
   const path=d=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',d);return p;};
   const approach=path(`M ${origin.x} ${origin.y} C ${clamp(origin.x+sign*90)} ${origin.y-35} ${clamp(endX+sign*40)} ${cy+80} ${endX} ${cy}`),loop=path(`M ${right} ${cy} V ${top+r} Q ${right} ${top} ${right-r} ${top} H ${left+r} Q ${left} ${top} ${left} ${top+r} V ${bottom-r} Q ${left} ${bottom} ${left+r} ${bottom} H ${right-r} Q ${right} ${bottom} ${right} ${bottom-r} Z`),a=approach.getTotalLength(),total=a+loop.getTotalLength();
   let worst=0,i=0;for(let d=0;d<=total;d++) {let p;if(d<a)p=approach.getPointAtLength(d);else{const q=loop.getPointAtLength(d-a);p={x:origin.dark?2*cx-q.x:q.x,y:q.y};}const q=d/total*data.routeLength;while(i<data.route.length-2&&data.route[i+1].d<q)i++;const l=data.route[i],r=data.route[i+1],u=(q-l.d)/(r.d-l.d);worst=Math.max(worst,Math.hypot(p.x-l.x-(r.x-l.x)*u,p.y-l.y-(r.y-l.y)*u));}
   return {worst,lengthError:Math.abs(total-data.routeLength)};
  },{width,height,w,h,origin,data});
  assert.ok(result.worst<.2,JSON.stringify({width,height,dark,...result}));worst=Math.max(worst,result.worst);
 }
 console.log('Original SVG route parity: 24 desktop/mobile routes; maximum deviation',worst.toFixed(4),'CSS px');
}finally{await browser.close();}

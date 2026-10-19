import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const app=createPhonePreview();await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage({viewport:{width:390,height:1000},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 const cdp=await p.context().newCDPSession(p);
 await p.goto('http://127.0.0.1:'+app.server.address().port+'/component-playground/components');
 for(const width of [320,390])for(const id of ['login','resources'])for(const expanded of [false,true]){
 await p.setViewportSize({width,height:1000});
 if(expanded)await p.locator('#'+id+'-preview .preview-expand').click();
 await p.evaluate(()=>{const e=document.getElementById('width');e.value='768';e.dispatchEvent(new Event('change'));});
 const frame=p.locator('#'+id+'-frame'),wrap=frame.locator('..');
 await wrap.evaluate(e=>e.scrollLeft=0);
 await frame.evaluate(e=>e.scrollIntoView({block:'center'}));await p.waitForTimeout(300);
 const box=await wrap.boundingBox();const x=box.x+box.width-25,y=Math.max(box.y+30,Math.min(800,box.y+box.height/2));
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
 for(let i=1;i<=8;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-i*Math.min(22,(box.width-50)/8),y}]});await p.waitForTimeout(20);}
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(500);
 const state=await wrap.evaluate(e=>({left:e.scrollLeft,width:e.clientWidth,full:e.scrollWidth}));console.log({viewport:width,id,expanded,...state});assert.ok(state.left>30,'Swipe starting inside iframe must pan its overflowing preview');
 assert.ok(state.width<width,'Wrapper stays inside mobile viewport');
 await p.evaluate(()=>{const e=document.getElementById('width');e.value='fluid';e.dispatchEvent(new Event('change'));});
 await p.waitForTimeout(100);
 assert.ok(await wrap.evaluate(e=>e.scrollWidth<=e.clientWidth+1),'Fit removes horizontal overflow');
 if(expanded)await p.locator('#'+id+'-preview .preview-expand').click();
 }
}finally{await browser.close();app.server.closeAllConnections();await new Promise(r=>app.server.close(r));}

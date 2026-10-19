import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const app=createPhonePreview();await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage();p.setDefaultTimeout(15000);const errors=[];p.on('pageerror',e=>{errors.push(e.message);console.error(e.message);});
 await p.goto('http://127.0.0.1:'+app.server.address().port+'/playground/blocks-and-blur');
 const set=async(id,value)=>p.evaluate(({id,value})=>{const el=document.getElementById(id);el.value=value;el.dispatchEvent(new Event(el.type==='range'?'input':'change',{bubbles:true}));},{id,value});
 const frame=await p.locator('#blocks-frame').elementHandle().then(e=>e.contentFrame());
 const wait=(fn,arg)=>frame.waitForFunction(fn,arg,{polling:100});
 for(const width of [320,390,768,1440]){
  await p.setViewportSize({width,height:1000});
  for(const destination of ['resources','playground']){
   await p.locator(`input[name="block-destination"][value="${destination}"]`).locator('..').click();
   await wait(d=>!!document.querySelector('.playground-placeholder')===(d==='playground'),destination);
   for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
    await set('theme',theme);await set('agent',agent);
    for(const layer of ['clear','blurred','panel']){
     await set('review',layer);await wait(v=>document.body.dataset.review===v,layer);
     const result=await frame.evaluate(()=>({filter:getComputedStyle(document.querySelector('.page-placeholder')).filter,panel:getComputedStyle(document.querySelector('.access-gate')).display,scrim:getComputedStyle(document.querySelector('#preview-scrim')).display}));
     assert.equal(result.panel!=='none',layer==='panel');assert.equal(result.scrim!=='none',layer==='blurred');if(layer==='clear')assert.equal(result.filter,'none');
    }
    if(destination==='playground'){
     const bg=await frame.locator('.playground-placeholder>iframe').elementHandle().then(e=>e.contentFrame());
     await bg.waitForFunction(({theme,agent})=>document.documentElement.dataset.theme===theme&&document.documentElement.dataset.selectedAgent===agent,{theme,agent},{polling:100});
     await set('strength','65');await bg.waitForFunction(()=>getComputedStyle(document.body).getPropertyValue('--ph-strength').trim()==='65%',undefined,{polling:100});
    }
   }
   await set('blur','9');await wait(()=>getComputedStyle(document.querySelector('.page-placeholder')).getPropertyValue('--ph-blur').trim()==='9px');
   await set('dim','25');await wait(()=>document.documentElement.style.getPropertyValue('--gate-overlay').includes('25%'));
   await p.locator('#reset-blocks').click();await wait(()=>document.body.dataset.review==='clear');
   assert.equal(await p.locator('#block-destination').evaluate(e=>e.value),destination);
  }
  await set('theme','light');await set('agent','codex');
  await p.locator('#blocks-preview .preview-expand').click();assert.equal(await p.locator('#blocks-preview').evaluate(e=>e.classList.contains('is-expanded')),true);
  await p.screenshot({path:`/tmp/blocks-destinations-${width}.png`});
  await p.locator('#blocks-preview .preview-expand').click();
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  console.log('PASS both destinations, layers, colours, sliders, reset and expansion at '+width+'px');
 }
 assert.deepEqual(errors,[]);
}finally{await browser.close();app.server.closeAllConnections();await new Promise(r=>app.server.close(r));}

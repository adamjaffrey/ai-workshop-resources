import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const app=createPhonePreview();await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome'});
try{
 const p=await browser.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:'+app.server.address().port+'/component-playground/blocks-and-blur');
 const set=async(id,value)=>p.evaluate(({id,value})=>{const el=document.getElementById(id);el.value=value;el.dispatchEvent(new Event(el.type==='range'?'input':'change',{bubbles:true}));},{id,value});
 for(const width of [320,390,768,1440]){
  await p.setViewportSize({width,height:1000});
  for(const destination of ['resources','playground']){
   await set('block-destination',destination);
   for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
    await set('theme',theme);await set('agent',agent);
    for(const layer of ['clear','blurred','panel']){
     await set('review',layer);
     if(layer==='panel'){await p.locator('#blocks-frame').waitFor({state:'visible'});assert.ok(await p.frameLocator('#blocks-frame').locator('.access-gate').isVisible());continue;}
     const doc=await p.locator('#backdrop-inspection-frame').elementHandle().then(e=>e.contentFrame());
     await doc.waitForFunction(s=>{const d=document.documentElement.dataset;return d.backdropDestination===s.destination&&d.review===s.layer&&d.theme===s.theme&&d.selectedAgent===s.agent;},{destination,layer,theme,agent});
     assert.equal(await doc.locator('body').evaluate(e=>getComputedStyle(e).filter),layer==='clear'?'none':'blur(4px)');
     if(layer==='blurred'){
      await set('strength','65');await set('blur','9');await set('dim','25');
      assert.equal(await doc.locator('body').evaluate(e=>getComputedStyle(e).filter),'blur(9px)');
      assert.equal(await doc.locator('.ph-word').first().evaluate(e=>getComputedStyle(e).getPropertyValue('--ph-strength').trim()),'65%');
      await p.locator('#reset-blocks').click();
     }
    }
   }
   await p.locator('#reset-blocks').click();assert.equal(await p.locator('#block-destination').evaluate(e=>e.value),destination);
  }
  await p.locator('#blocks-preview .preview-expand').click();assert.ok(await p.locator('#backdrop-inspection-frame').isVisible());await p.locator('#blocks-preview .preview-expand').click();
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));console.log('PASS shared destination controls',width);
 }
 assert.deepEqual(errors,[]);
}finally{await browser.close();await new Promise(r=>app.server.close(r));}

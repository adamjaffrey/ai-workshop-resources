import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
try{for(const engine of [chromium,webkit]){
 const browser=await engine.launch(engine===chromium?{channel:'chrome'}:{});
 try{for(const width of [320,390,768,1440]){
  const context=await browser.newContext({viewport:{width,height:1000},...(engine===chromium?{permissions:['clipboard-read','clipboard-write']}:{})});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/component-playground/components#resource-page-and-controls');
  await page.waitForFunction(()=>document.documentElement.dataset.playgroundAnchorLanded==='resource-page-and-controls'&&!document.documentElement.hasAttribute('data-playground-anchor-arriving'));
  await page.evaluate(()=>{window.nativeClipboard=navigator.clipboard;window.nativeExecCommand=document.execCommand.bind(document);document.addEventListener('copy',()=>{const field=document.activeElement;window.copySelection={modal:!!field.closest('dialog:modal'),text:field.value?.slice(field.selectionStart,field.selectionEnd)};});});
  const modules=await page.locator('.preview-dialog').evaluateAll(es=>es.map(e=>({id:e.id,tab:e.closest('[data-panel]').dataset.panel})));
  assert.equal(modules.length,5);
  for(const {id,tab} of modules){
   await page.locator('[data-tab='+tab+']').click();const dialog=page.locator('#'+id);
   for(const entry of ['first','reopen']){
    await dialog.locator('.preview-expand').click();
    const state=await dialog.evaluate(e=>{const r=e.getBoundingClientRect();return {style:e.querySelector('.preview-settings').open,preview:e.querySelector('.preview-state-settings').open,top:r.top,bottom:r.bottom,viewportTop:visualViewport.offsetTop,viewportBottom:visualViewport.offsetTop+visualViewport.height,margin:getComputedStyle(e).marginTop};});
    assert.equal(state.style,false,id+' '+entry+' Style Options');assert.equal(state.preview,true,id+' '+entry+' Preview Controls');assert.ok(Math.abs(state.top-state.viewportTop)<1,JSON.stringify({id,state}));assert.ok(Math.abs(state.bottom-state.viewportBottom)<1,JSON.stringify({id,state}));assert.equal(state.margin,'0px');
    if(entry==='first'){await dialog.locator('.preview-settings>summary').click();await dialog.locator('.preview-state-settings>summary').click();}
    else{
     const copy=dialog.locator('.heading-anchor');const expected=await copy.evaluate(e=>{const entry=window.workshopPlaygroundAnchors.entries.find(item=>item.copy===e);const u=new URL(entry.path,location.origin);u.search=location.search;u.searchParams.delete('login');u.hash=entry.id;return u.href;});
     for(const mode of engine===chromium?['native','fallback']:['fallback']){
      await page.evaluate(async mode=>{if(window.nativeClipboard?.writeText)try{await window.nativeClipboard.writeText('expanded-copy-test-marker');}catch{}Object.defineProperty(navigator,'clipboard',{configurable:true,value:mode==='native'?window.nativeClipboard:undefined});window.copySelection=null;},mode);
      await copy.click();await page.waitForFunction(id=>document.querySelector('#'+id+' .heading-anchor').dataset.result==='success',id);
      if(engine===chromium)assert.equal(await page.evaluate(()=>window.nativeClipboard.readText()),expected,id+' actual clipboard '+mode);
      if(mode==='fallback')assert.deepEqual(await page.evaluate(()=>window.copySelection),{modal:true,text:expected});
      assert.ok(await copy.evaluate(e=>document.activeElement===e),'focus remains on heading');
     }
     // A failed platform copy must never receive the success checkmark.
     await page.evaluate(()=>{document.execCommand=()=>false;});await copy.click();await page.waitForFunction(id=>document.querySelector('#'+id+' .heading-anchor').dataset.result==='failure',id);await page.evaluate(()=>document.execCommand=window.nativeExecCommand);
     // Pointer-independent heading activation uses the same real copy path.
     await copy.focus();await page.keyboard.press('Enter');await page.waitForFunction(id=>document.querySelector('#'+id+' .heading-anchor').dataset.result==='success',id);
     if(engine===chromium)assert.equal(await page.evaluate(()=>window.nativeClipboard.readText()),expected);
    }
    await dialog.locator('.preview-expand').click();
   }
  }
  assert.deepEqual(errors,[]);await page.screenshot({path:'/tmp/expanded-fixed-'+engine.name()+'-'+width+'.png'});await context.close();console.log('PASS expanded defaults, full viewport and heading copy',engine.name(),width);
 }}finally{await browser.close();}
}}finally{server.close();}

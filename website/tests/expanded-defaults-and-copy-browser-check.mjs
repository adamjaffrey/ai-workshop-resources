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
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{}}}));
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
     const title=dialog.locator(':scope>.section-heading h2');
     assert.equal(await title.locator('.heading-anchor,[role=button],a,[tabindex="0"]').count(),0,id+' plain expanded H2');
     await page.evaluate(()=>{window.headingCopies=0;Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{window.headingCopies++;}}});});
     await title.click();assert.equal(await page.evaluate(()=>window.headingCopies),0,id+' heading does not copy');
     assert.equal(await title.evaluate(e=>getComputedStyle(e).cursor),'default');
    }
    await dialog.locator('.preview-expand').click();
    const restored=dialog.locator('.heading-anchor');assert.equal(await restored.count(),1);
    await page.waitForTimeout(100);await restored.click();await page.waitForFunction(id=>document.querySelector('#'+id+' .heading-anchor').dataset.result==='success',id);
   }
  }
  assert.deepEqual(errors,[]);await page.screenshot({path:'/tmp/expanded-fixed-'+engine.name()+'-'+width+'.png'});await context.close();console.log('PASS expanded defaults, full viewport and plain expanded headings and restored inline copy',engine.name(),width);
 }}finally{await browser.close();}
}}finally{server.close();}

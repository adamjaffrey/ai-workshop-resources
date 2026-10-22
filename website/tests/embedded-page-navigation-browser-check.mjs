import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
try{for(const engine of [chromium,webkit]){
 const browser=await engine.launch(engine===chromium?{channel:'chrome'}:{});
 try{for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/component-playground');
 for(const [tab,dialogId,frameId,root] of [['components','resources-preview','resources-frame','body'],['branding','branding-preview','branding-frame','body'],['errors','errors-preview','errors-frame','.fallback-context:not(.full-login-context)']]){
  await page.locator('[data-tab='+tab+']').click();
  const frame=page.frameLocator('#'+frameId),context=frame.locator(root);
  await context.locator('.skip-main').waitFor({state:'attached'});
  for(const expanded of tab==='errors'?[false]:[false,true]){
   if(expanded){await page.locator('#'+dialogId+' .preview-expand').click();await page.waitForTimeout(200);}
   const mobile=await context.evaluate(e=>(e.ownerDocument.defaultView.innerWidth<=660));
   // Captured fallback retains source-width geometry; use actual control visibility.
   const qr=await context.locator('.qr-copy').isVisible();
   const order=['.skip-main','.theme-toggle button','.page-title-link',...(qr?['.qr-copy']:[]),'button[data-agent]','.step-anchor'];
   if(tab!=='errors'){await page.locator('#'+dialogId+' .page-embed-scroll').focus();await page.keyboard.press('Tab');await page.waitForTimeout(80);assert.ok(await context.locator('.skip-main').evaluate(e=>e.ownerDocument.activeElement===e),'iframe entry starts at skip');}
   else{await context.locator('..').focus();await page.keyboard.press('Tab');assert.ok(await context.locator('.skip-main').evaluate(e=>e.ownerDocument.activeElement===e),'fallback entry starts at skip');}
   for(const selector of order.slice(1)){await page.keyboard.press('Tab');assert.ok(await context.evaluate((e,s)=>e.ownerDocument.activeElement.matches(s),selector),[engine.name(),width,tab,expanded,selector,await context.evaluate(e=>e.ownerDocument.activeElement.outerHTML.slice(0,150))].join(' '));}
   for(const selector of order.slice(0,-1).reverse()){await page.keyboard.press('Shift+Tab');assert.ok(await context.evaluate((e,s)=>e.ownerDocument.activeElement.matches(s),selector),'reverse '+tab+' '+selector);}
   const skipGeometry=await context.locator('.skip-main').evaluate(e=>{const r=e.getBoundingClientRect(),context=e.closest('.fallback-context'),b=(context||document.body).getBoundingClientRect();return {left:r.left,top:r.top,contextTop:b.top};});assert.ok(skipGeometry.left>=0&&skipGeometry.top>=skipGeometry.contextTop-1,JSON.stringify(skipGeometry));
   if(tab==='errors'&&engine===chromium)await page.screenshot({path:'/tmp/embedded-skip-'+width+'.png'});
   await page.keyboard.press('Enter');assert.ok(await context.evaluate(e=>e.ownerDocument.activeElement.matches('.step-anchor')),'skip targets first H2');
   if(expanded){await page.locator('#'+dialogId+' .preview-expand').click();await page.waitForTimeout(200);}
   console.log('PASS embedded page',engine.name(),width,tab,expanded?'expanded':'inline',mobile?'mobile':'desktop');
  }
 }
 // Every Expand View uses the same controls, including the gallery expansions.
 for(const tab of ['components','typography','colours','blocks','icons','errors','focus','branding','discovery']){
  await page.locator('[data-tab='+tab+']').click();
  const ids=await page.locator('[data-panel='+tab+'] .preview-dialog').evaluateAll(es=>es.map(e=>e.id));
  for(const id of ids){
   const dialog=page.locator('#'+id);await dialog.locator('.preview-expand').click();
   const details=dialog.locator('.preview-settings');await details.locator('summary').click();
   await dialog.locator('#width input[tabindex="0"]').focus();
   for(const selector of ['#hover input','.hover-explainer']){await page.keyboard.press('Tab');assert.ok(await page.evaluate(s=>document.activeElement.matches(s),selector),id+' '+selector);}
   for(const selector of ['#hover input','#width input','#theme input','#agent input']){await page.keyboard.press('Shift+Tab');assert.ok(await page.evaluate(s=>document.activeElement.matches(s),selector),id+' reverse '+selector);}
   await dialog.locator('.preview-expand').click();
  }
 }
 assert.deepEqual(errors,[]);await page.close();console.log('PASS all expanded Style Options',engine.name(),width);
 }}finally{await browser.close();}
}}finally{server.close();}

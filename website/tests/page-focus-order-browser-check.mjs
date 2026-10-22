import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
try{for(const engine of [chromium,webkit]){
 const browser=await engine.launch(engine===chromium?{channel:'chrome'}:{});
 try{for(const width of [390,768,1440])for(const route of ['ai-workshop-resources','component-playground']){
 const page=await browser.newPage({viewport:{width,height:1100}});
 await page.goto(origin+'/'+route);await page.locator('.skip-main').waitFor({state:'attached'});await page.waitForTimeout(500);
 const playground=route==='component-playground';
 const order=playground?['.skip-main',...(width<=660?['#style-options']:[]),'#back-to-top','.page-title-link',...(width>660?['#agent input','#theme input','#width input','#hover input','.hover-explainer']:[]),'[role=tablist] button','.step-anchor']:['.skip-main','.theme-toggle button','.page-title-link',...(width>660?['.qr-copy']:[]),'button[data-agent]','.step-anchor'];
 for(const selector of order){await page.keyboard.press('Tab');assert.ok(await page.evaluate(s=>document.activeElement.matches(s),selector),engine.name()+' '+width+' '+route+' expected '+selector+' actual '+await page.evaluate(()=>document.activeElement.outerHTML.slice(0,200)));}
 for(const selector of order.slice(0,-1).reverse()){await page.keyboard.press('Shift+Tab');assert.ok(await page.evaluate(s=>document.activeElement.matches(s),selector),'reverse '+selector);}
 // Click just outside each visible target/group, then verify spatial continuation.
 for(const selector of order){for(const direction of ['above','left']){
 await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(80);
 const point=await page.locator(selector).evaluateAll((es,d)=>{const e=es.find(e=>e.tabIndex>=0&&e.checkVisibility({checkVisibilityCSS:true}));if(!e)return null;const v=e.closest('.segmented-toggle,[role=tablist],.section-heading')||e;const r=v.getBoundingClientRect(),ink=e.getBoundingClientRect();return {x:d==='left'?r.left-10:e.matches('.step-anchor')?ink.left+ink.width/2:r.left+r.width/2,y:d==='above'?r.top-10:ink.top+ink.height/2};},direction);
 if(!point||point.x<0||point.y<0||point.y>1050)continue;
 // Some adjacent controls overlap a nominal probe: only blank-space clicks apply.
 const blank=await page.evaluate(({x,y})=>!document.elementFromPoint(x,y)?.closest('button,input,a,summary,label'),point);if(!blank)continue;
 await page.mouse.click(point.x,point.y);const clicked=await page.evaluate(({x,y})=>({hit:document.elementFromPoint(x,y)?.outerHTML.slice(0,200),active:document.activeElement.outerHTML.slice(0,150)}),point);await page.keyboard.press('Tab');
 assert.ok(await page.evaluate(s=>document.activeElement.matches(s),selector),JSON.stringify({engine:engine.name(),width,route,selector,direction,point,clicked,actual:await page.evaluate(()=>document.activeElement.outerHTML.slice(0,200))}));
 }}
 if(playground&&width<=660){await page.locator('#style-options').click();await page.waitForTimeout(400);for(const selector of ['#style-options','#agent input','#theme input','#width input','#hover input','.hover-explainer','#style-options']){await page.keyboard.press('Tab');assert.ok(await page.evaluate(s=>document.activeElement.matches(s),selector),'mobile menu '+selector);}await page.keyboard.press('Escape');}
 await page.close();console.log('PASS',engine.name(),width,route);
 }}finally{await browser.close();}
}}finally{server.close();}

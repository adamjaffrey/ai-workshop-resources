import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const previews=[createPhonePreview({autoLogin:true,protectPlayground:true}),createPhonePreview({autoLogin:true,protectPlayground:true})];
await Promise.all(previews.map(({server})=>new Promise(resolve=>server.listen(0,'127.0.0.1',resolve))));
const origins=previews.map(({server})=>'http://127.0.0.1:'+server.address().port);
try{
 for(const engine of [chromium,webkit]){
  const browser=await engine.launch({headless:true,...(engine===chromium?{channel:'chrome'}:{})});
  try{
   const context=await browser.newContext();
   // Old shared cookies must not be adopted or cleared on another port's behalf.
   await context.addCookies([{name:'workshop_preview_session',value:'stale-legacy-session',url:origins[0]}]);
   const pages=await Promise.all(origins.map(async origin=>{const page=await context.newPage();await page.goto(origin+'/ai-workshop-resources');await page.evaluate(()=>window.workshopPageReady);return page;}));
   const names=origins.map(origin=>'workshop_preview_session_'+new URL(origin).port);
   const cookies=await context.cookies();
   for(const name of names){const cookie=cookies.find(c=>c.name===name);assert.ok(cookie);assert.equal(cookie.httpOnly,true);assert.equal(cookie.sameSite,'Lax');}
   const sessionStatus=async origin=>(await context.request.get(origin+'/auth/session')).status();
   for(const origin of origins)assert.equal(await sessionStatus(origin),200);
   for(const path of ['/ai-workshop-resources','/component-playground']){
    if(path.includes('playground'))for(let i=0;i<2;i++){await pages[i].goto(origins[i]+path);await pages[i].evaluate(()=>window.workshopPageReady);}
    const stamps=await Promise.all(pages.map(page=>page.evaluate(()=>performance.timeOrigin)));
    for(let round=0;round<3;round++)for(let i=0;i<2;i++){
     await pages[i].bringToFront();
     // Exercise the same visibility-return handler in headless engines too.
     const checked=pages[i].waitForResponse(response=>response.url()===origins[i]+'/auth/session');
     await pages[i].evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));
     assert.equal((await checked).status(),200);
     assert.equal(await pages[i].evaluate(()=>performance.timeOrigin),stamps[i],'tab activation must not reload');
    }
   }
   // Logging out A must invalidate A only; both pages on B remain authorised.
   const logout=await context.request.post(origins[0]+'/auth/logout',{headers:{origin:origins[0]},maxRedirects:0});
   assert.equal(logout.status(),303);assert.equal(await sessionStatus(origins[0]),401);assert.equal(await sessionStatus(origins[1]),200);
   assert.match(logout.headers()['set-cookie'],new RegExp('^'+names[0]+'='));
   const after=await context.cookies();assert.ok(after.some(c=>c.name===names[1]));assert.ok(after.some(c=>c.name==='workshop_preview_session'));
   await pages[0].goto(origins[0]+'/ai-workshop-resources');assert.equal(await sessionStatus(origins[0]),200);assert.equal(await sessionStatus(origins[1]),200);
   console.log('PASS',engine.name(),'two-port cookies, repeated Resources/Playground tab activation, isolated logout and re-login');
   await context.close();
  }finally{await browser.close();}
 }
}finally{await Promise.all(previews.map(({server})=>new Promise(resolve=>server.close(resolve))));}

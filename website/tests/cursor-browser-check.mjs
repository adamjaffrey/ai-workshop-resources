import assert from 'node:assert/strict';
import {once} from 'node:events';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const origin='http://127.0.0.1:'+server.address().port;
 for (const width of [1440,390]) {
  await page.context().clearCookies();await page.setViewportSize({width,height:1000});await page.goto(origin);
  for (const unlocked of [false,true]) {
   if(unlocked){await page.locator('#workshop-password').fill(password);await page.getByRole('button',{name:'Unlock Resources',exact:true}).click();await page.locator('#access-gate').waitFor({state:'detached'});}
   const issues=await page.evaluate(()=>{
    const issues=[];
    const visible=e=>e.getClientRects().length&&!e.closest('[inert]');
    const check=(e,expected)=>{if(getComputedStyle(e).cursor!==expected)issues.push(e.tagName+'.'+e.className+': '+getComputedStyle(e).cursor+' expected '+expected);};
    const controls=[...document.querySelectorAll('button,a[href],.segmented-toggle')].filter(visible);
    for(const control of controls) {
     for(const e of [control,...control.querySelectorAll('*')])check(e,'pointer');
     // Native disabled and ARIA-disabled styles must override every child.
     if(control.tagName==='BUTTON'){
      control.disabled=true;for(const e of [control,...control.querySelectorAll('*')])check(e,'not-allowed');control.disabled=false;
     }
     control.setAttribute('aria-disabled','true');for(const e of [control,...control.querySelectorAll('*')])check(e,'not-allowed');control.removeAttribute('aria-disabled');
    }
    for(const e of document.querySelectorAll('h1,h2,h3,p,pre,code,label,input[type="password"],figcaption,.brand-name,.code-label,.footer-meta span')) {
     if(visible(e)&&!e.closest('button,a[href],.segmented-toggle'))check(e,'text');
    }
    check(document.body,'default');
    return issues;
   });
   assert.deepEqual(issues,[],`${width} ${unlocked?'main':'login'}`);
  }
 }
 // Real in-flight login state, not just an injected disabled attribute.
 await page.context().clearCookies();await page.goto(origin);
 let release;const pending=new Promise(resolve=>release=resolve);
 await page.route('**/auth/login',async route=>{await pending;await route.continue();});
 await page.locator('#workshop-password').fill(password);await page.getByRole('button',{name:'Unlock Resources',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('.gate-submit').disabled);
 assert.equal(await page.locator('.gate-submit').evaluate(e=>getComputedStyle(e).cursor),'not-allowed');
 release();await page.locator('#access-gate').waitFor({state:'detached'});
 console.log('PASS: login/main desktop/mobile cursor audit, control children, disabled/ARIA states, text and real login busy state');
} finally {await browser.close();server.close();}

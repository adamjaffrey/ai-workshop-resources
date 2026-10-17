import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {loginPage} from '../lib/workshop-pages.mjs';
import {handleRequest} from '../lib/workshop-handler.mjs';
const script=await (await handleRequest(new Request('https://workshop.example/login.js'),{})).text();
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 for(const theme of ['light','dark'])for(const width of [320,1440]){
  const page=await browser.newPage({viewport:{width,height:844},colorScheme:theme});
  let mode='wrong',pending;let requests=0;
  await page.route('https://workshop.example/**',async route=>{
   const path=new URL(route.request().url()).pathname;
   if(path==='/login.js')return route.fulfill({contentType:'text/javascript',body:script});
   if(path==='/')return route.fulfill({contentType:'text/html',body:loginPage});
   if(path!=='/auth/login')return route.fulfill({status:404,body:''});
   requests++;
   if(mode==='pending')await new Promise(resolve=>pending=resolve);
   if(mode==='network')return route.abort('failed');
   if(mode==='service')return route.fulfill({status:503,body:'Sensitive internal exception'});
   if(mode==='malformed')return route.fulfill({status:200,body:'not JSON'});
   if(mode==='unexpected')return route.fulfill({status:400,contentType:'application/json',body:JSON.stringify({error:'Sensitive internal exception'})});
   if(mode==='limited')return route.fulfill({status:429,headers:{'Retry-After':'2'},body:'{}'});
   return route.fulfill({status:mode==='success'?200:401,contentType:'application/json',body:JSON.stringify(mode==='success'?{ok:true}:{error:'wrong'})});
  });
  await page.goto('https://workshop.example/');
  const input=page.locator('#workshop-password'),button=page.locator('.gate-submit'),status=page.locator('#gate-error');
  const submit=async()=>{await input.fill('example');await button.click();};
  const hasShake=()=>page.locator('#access-form').evaluate(e=>e.classList.contains('shake'));
  const state=async(kind,text)=>{
   await page.waitForFunction(({kind,text})=>{const e=document.querySelector('#gate-error');return e.classList.contains('is-'+kind)&&e.textContent===text;},{kind,text});
   if(kind!=='info')assert.equal(await status.locator('[data-status-icon="'+kind+'"]').isVisible(),true);
  };
  await button.click();await state('error','Enter your workshop password.');assert.equal(requests,0);assert.equal(await hasShake(),false);
  mode='pending';await submit();await state('loading','Checking password…');
  assert.equal(await status.evaluate(e=>getComputedStyle(e).color),theme==='light'?'rgb(91, 96, 102)':'rgb(183, 190, 200)');
  assert.equal(await status.locator('[data-status-icon="loading"]').evaluate(e=>getComputedStyle(e).animationName),'login-spin');
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await status.locator('[data-status-icon="loading"]').evaluate(e=>getComputedStyle(e).animationName),'none');
  await page.emulateMedia({reducedMotion:'no-preference'});mode='wrong';pending();
  await state('error','That password isn’t correct. Please try again.');assert.equal(await hasShake(),true);assert.equal(await input.getAttribute('aria-invalid'),'true');
  assert.equal(await status.evaluate(e=>getComputedStyle(e).color),theme==='light'?'rgb(166, 35, 35)':'rgb(255, 155, 155)');
  for(const [next,text] of [['network','Unable to connect. Check your connection and try again.'],['service','Workshop access is temporarily unavailable. Please try again later.'],['malformed','Unable to sign in. Please try again.'],['unexpected','Unable to sign in. Please try again.']]){
   mode=next;await submit();await state('error',text);assert.equal(await hasShake(),false);assert.equal(await input.getAttribute('aria-invalid'),null);assert.equal(await button.isEnabled(),true);
  }
  mode='limited';await submit();await state('error','Too many attempts. Please try again in less than a minute.');assert.equal(await button.isDisabled(),true);assert.equal(await hasShake(),false);assert.equal(await input.getAttribute('aria-invalid'),null);
  await state('info','You can try signing in again.');assert.equal(await button.isEnabled(),true);
  mode='success';await submit();await state('success','Access granted.');assert.equal(await button.textContent(),'Opening Resources…');
  assert.equal(await status.evaluate(e=>getComputedStyle(e).color),theme==='light'?'rgb(22, 115, 66)':'rgb(117, 214, 163)');
  assert.equal(await status.locator('[data-status-icon="error"]').isVisible(),false);
  const checkSuccessColours=async()=>{
   const green=theme==='light'?'rgb(22, 115, 66)':'rgb(117, 214, 163)';
   const styles=await page.locator('.password-field').evaluate(e=>{const c=getComputedStyle(e);return{outline:c.outlineColor,width:c.outlineWidth,style:c.outlineStyle,border:c.borderColor,lock:getComputedStyle(e.querySelector('svg')).color};});
   assert.deepEqual(styles,{outline:green,width:'3px',style:'solid',border:green,lock:green});
   assert.equal(await button.evaluate(e=>getComputedStyle(e).backgroundColor),green);
   assert.equal(await button.evaluate(e=>getComputedStyle(e).color),theme==='light'?'rgb(255, 255, 255)':'rgb(16, 18, 22)');
  };
  // Mouse submission moves focus off the input; success still needs a full ring.
  await input.evaluate(e=>e.blur());await checkSuccessColours();
  await page.reload();await input.fill('example');await input.press('Enter');
  await state('success','Access granted.');await checkSuccessColours();

  await page.close();
 }
 console.log('PASS: empty input, neutral spinner/reduced motion, incorrect-only shake, network/service/malformed failures, retry countdown and success in both themes at mobile/desktop widths');
}finally{await browser.close();}

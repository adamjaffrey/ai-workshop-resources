import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {loginPage} from '../lib/workshop-pages.mjs';
import {handleRequest} from '../lib/workshop-handler.mjs';
const script=await (await handleRequest(new Request('https://workshop.example/login.js'),{})).text();
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 for(const theme of ['light','dark'])for(const width of [320,390,768,1440]){
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
  const initial=await page.locator('#access-form').boundingBox();
  assert.deepEqual(await status.evaluate(e=>{const c=getComputedStyle(e);return [c.marginTop,c.marginBottom];}),['12px','16px']);
  const hasShake=()=>page.locator('#access-form').evaluate(e=>e.classList.contains('shake'));
  const state=async(kind,text)=>{
   await page.waitForFunction(({kind,text})=>{const e=document.querySelector('#gate-error');return e.classList.contains('is-'+kind)&&(kind==='error'?e.textContent:document.querySelector('#login-announcement').textContent)===text;},{kind,text});
   assert.equal(await status.evaluate(e=>getComputedStyle(e).fontWeight),'400');
   assert.equal(await button.evaluate(e=>getComputedStyle(e).fontWeight),'600');
   const box=await page.locator('#access-form').boundingBox();assert.ok(Math.abs(box.height-initial.height)<1,'panel height must not jump');
   if(kind==='error'){assert.equal(await status.locator('[data-status-icon="error"]').isVisible(),true);assert.ok(await status.evaluate(e=>e.getBoundingClientRect().height<=parseFloat(getComputedStyle(e).lineHeight)+1),'default error must fit one line');}
   else {assert.equal(await status.locator('span').textContent(),'');if(kind!=='info')assert.equal(await page.locator('[data-input-icon="'+kind+'"]').isVisible(),true);}
  };
  await button.click();await state('error','Enter your password.');assert.equal(requests,0);assert.equal(await hasShake(),false);
  mode='pending';await submit();await state('loading','Checking password…');
  assert.equal(await status.evaluate(e=>getComputedStyle(e).color),theme==='light'?'rgb(91, 96, 102)':'rgb(183, 190, 200)');
  assert.match(await page.locator('[data-input-icon="loading"]').evaluate(e=>getComputedStyle(e).animationName),/login-spin/);
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('[data-input-icon="loading"]').evaluate(e=>getComputedStyle(e).animationName),'none');
  await page.emulateMedia({reducedMotion:'no-preference'});mode='wrong';pending();
  await state('error','Incorrect password. Try again.');assert.equal(await hasShake(),true);assert.equal(await input.getAttribute('aria-invalid'),'true');
  assert.equal(await status.evaluate(e=>getComputedStyle(e).color),theme==='light'?'rgb(133, 0, 155)':'rgb(255, 141, 206)');
  const lock=page.locator('[data-input-icon="lock"]');
  const red=theme==='light'?'rgb(133, 0, 155)':'rgb(255, 141, 206)';
  assert.deepEqual(await input.evaluate(e=>[e.selectionStart,e.selectionEnd]),[7,7]);
  assert.equal(await lock.evaluate(e=>getComputedStyle(e).color),red);
  await input.click();assert.equal(await input.getAttribute('aria-invalid'),'true');
  assert.equal(await lock.evaluate(e=>getComputedStyle(e).color),red);
  assert.equal(await input.evaluate(e=>getComputedStyle(e).color),red);
  mode='wrong';await submit();await state('error','Incorrect password. Try again.');
  await input.fill('new input');await page.waitForTimeout(180);assert.notEqual(await lock.evaluate(e=>getComputedStyle(e).color),red);
  mode='wrong';await submit();await state('error','Incorrect password. Try again.');
  await button.focus();await page.keyboard.press('Shift+Tab');assert.equal(await input.getAttribute('aria-invalid'),'true');
  for(const [next,text] of [['network','Check your connection.'],['service','Sign-in unavailable. Try later.'],['malformed','Sign-in failed. Try again.'],['unexpected','Sign-in failed. Try again.']]){
   mode=next;await submit();await state('error',text);assert.equal(await hasShake(),false);assert.equal(await input.getAttribute('aria-invalid'),null);assert.equal(await button.isEnabled(),true);
  }
  mode='limited';await submit();await state('error','Too many tries. Wait <1 min.');assert.equal(await button.isDisabled(),true);assert.equal(await hasShake(),false);assert.equal(await input.getAttribute('aria-invalid'),null);
  await state('info','You can try again.');assert.equal(await button.isEnabled(),true);
  mode='success';await submit();await state('success','Access granted.');assert.equal(await button.textContent(),'Opening Resources…');
  assert.equal(await status.evaluate(e=>getComputedStyle(e).color),theme==='light'?'rgb(20, 108, 62)':'rgb(117, 214, 163)');
  assert.equal(await status.locator('[data-status-icon="error"]').isVisible(),false);
  const checkSuccessColours=async(focused)=>{
   await page.locator('.password-field').evaluate(async e=>{await Promise.all(e.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{})));});
   const green=theme==='light'?'rgb(20, 108, 62)':'rgb(117, 214, 163)';
   const styles=await page.locator('.password-field').evaluate(e=>{const c=getComputedStyle(e);return{outline:c.outlineColor,width:c.outlineWidth,style:c.outlineStyle,border:c.borderColor,lock:getComputedStyle(e.querySelector('svg')).color};});
   assert.equal(styles.border,green);assert.equal(styles.lock,green);assert.equal(styles.width,'3px');assert.equal(styles.outline,focused?green:'rgba(0, 0, 0, 0)');
   assert.equal(await input.evaluate(e=>getComputedStyle(e).color),green);
   assert.equal(await input.inputValue(),'example');
   assert.equal(await button.evaluate(e=>getComputedStyle(e).backgroundColor),green);
   assert.equal(await button.evaluate(e=>getComputedStyle(e).color),theme==='light'?'rgb(255, 255, 255)':'rgb(16, 18, 22)');
  };
  // Only a genuinely focused input receives a success focus ring.
  await input.evaluate(e=>e.blur());await checkSuccessColours(false);
  await page.reload();await input.fill('example');await input.press('Enter');
  await state('success','Access granted.');await checkSuccessColours(true);

  await page.close();
 }
 console.log('PASS: empty input, neutral spinner/reduced motion, incorrect-only shake, network/service/malformed failures, retry countdown and success in both themes at mobile/desktop widths');
}finally{await browser.close();}

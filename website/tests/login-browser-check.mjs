import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {loginPage,resourcePage} from '../lib/workshop-pages.mjs';
import {handleRequest} from '../lib/workshop-handler.mjs';
const script=await (await handleRequest(new Request('https://workshop.example/login.js'),{})).text();
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
  for(const width of [320,390,768,1440]) for(const theme of ['light','dark']) {
    const page=await browser.newPage({viewport:{width,height:844},colorScheme:theme});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.route('https://workshop.example/**',route=>{
      const path=new URL(route.request().url()).pathname;
      if(path==='/login.js')return route.fulfill({contentType:'text/javascript',body:script});
      if(path==='/auth/login')return route.fulfill({status:401,contentType:'application/json',body:JSON.stringify({error:'That password isn’t correct. Please try again.'})});
      if(path==='/')return route.fulfill({contentType:'text/html',body:loginPage});
      return route.fulfill({status:404,body:''});
    });
    await page.goto('https://workshop.example/');
    assert.equal(await page.evaluate(()=>document.activeElement.id),'gate-title');
    assert.equal(await page.locator('#gate-title').evaluate(el=>getComputedStyle(el).outlineStyle),'none');
    assert.equal(await page.locator('#gate-description').textContent(),'Enter your workshop password to unlock the tools for your next build.');
    // The root stays locked before keyboard activation, including desktop input.
    assert.equal(await page.locator('html').evaluate(el=>getComputedStyle(el).overflowY),'hidden');
    await page.mouse.move(width/2,100);
    await page.mouse.wheel(0,800);
    await page.keyboard.press('PageDown');
    await page.keyboard.press('End');
    await page.evaluate(()=>window.scrollTo(0,1000));
    assert.equal(await page.evaluate(()=>window.scrollY),0);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(()=>document.activeElement.dataset.themeChoice),theme);
    await page.keyboard.press('Space');
    assert.equal(await page.locator('html').getAttribute('data-theme'),theme==='light'?'dark':'light');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(()=>document.activeElement.id),'workshop-password');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(()=>document.activeElement.className),'gate-submit');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(()=>document.activeElement.id),'workshop-password');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    // Simulate a keyboard reducing the visual viewport without resizing layout.
    await page.evaluate(()=>{
      Object.defineProperty(visualViewport,'height',{configurable:true,value:300});
      Object.defineProperty(visualViewport,'offsetTop',{configurable:true,value:80});
      visualViewport.dispatchEvent(new Event('resize'));
    });
    await page.waitForTimeout(80);
    const bounds=await page.locator('#workshop-password').boundingBox();
    assert.ok(bounds.y>=80&&bounds.y+bounds.height<=380,JSON.stringify({width,theme,bounds}));
    // Scroll while the field is focused and the visual viewport is keyboard-sized.
    const backgroundTop=await page.locator('.page-placeholder').evaluate(el=>el.getBoundingClientRect().top);
    await page.locator('#access-gate').evaluate(el=>el.scrollTop=0);
    await page.mouse.move(width/2,180);
    await page.mouse.wheel(0,400);
    await page.waitForTimeout(150);
    assert.ok(await page.locator('#access-gate').evaluate(el=>el.scrollTop>0));
    assert.equal(await page.evaluate(()=>window.scrollY),0);
    assert.equal(await page.locator('.page-placeholder').evaluate(el=>el.getBoundingClientRect().top),backgroundTop);
    await page.locator('#workshop-password').fill('wrong-password');
    await page.keyboard.press('Enter');
    await page.getByText('That password isn’t correct. Please try again.').waitFor();
    assert.equal(await page.locator('.gate-submit').isDisabled(),false);
    assert.equal(await page.evaluate(()=>document.activeElement.id),'workshop-password');
    await page.evaluate(()=>{delete visualViewport.height;delete visualViewport.offsetTop;visualViewport.dispatchEvent(new Event('resize'));document.getElementById('gate-title').focus({preventScroll:true});});
    if(width===390||width===1440)await page.screenshot({path:`/tmp/workshop-login-${width}-${theme}.png`});
    assert.deepEqual(errors,[]);
    await page.close();
  }
  // Browsers without VisualViewport still get a sized, scrollable gate.
  const fallback=await browser.newPage({viewport:{width:390,height:300}});
  await fallback.addInitScript(()=>Object.defineProperty(window,'visualViewport',{value:undefined}));
  await fallback.route('https://workshop.example/**',route=>route.fulfill({contentType:route.request().url().endsWith('/login.js')?'text/javascript':'text/html',body:route.request().url().endsWith('/login.js')?script:loginPage}));
  await fallback.goto('https://workshop.example/');
  assert.equal(await fallback.locator('#access-gate').evaluate(el=>el.clientHeight),300);
  await fallback.mouse.move(195,150);await fallback.mouse.wheel(0,400);await fallback.waitForTimeout(150);
  assert.ok(await fallback.locator('#access-gate').evaluate(el=>el.scrollTop>0));
  assert.equal(await fallback.evaluate(()=>window.scrollY),0);
  await fallback.close();
  // Successful login navigates to a fresh, unlocked document with normal scrolling.
  const unlocked=await browser.newPage({viewport:{width:390,height:844}});
  await unlocked.setContent(resourcePage.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,''));
  await unlocked.evaluate(()=>window.scrollTo(0,400));
  assert.ok(await unlocked.evaluate(()=>window.scrollY>0));
  await unlocked.close();
  console.log('PASS: desktop/mobile initial heading focus, single theme Tab stop, keyboard toggle, password/submit order, viewport keyboard simulation, error recovery, themes and overflow');
} finally {await browser.close();}

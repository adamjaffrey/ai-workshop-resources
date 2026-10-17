import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {loginPage} from '../lib/workshop-pages.mjs';
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
  console.log('PASS: desktop/mobile initial heading focus, single theme Tab stop, keyboard toggle, password/submit order, viewport keyboard simulation, error recovery, themes and overflow');
} finally {await browser.close();}

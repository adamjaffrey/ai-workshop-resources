import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
try{for(const engine of [chromium,webkit]){const browser=await engine.launch(engine===chromium?{channel:"chrome"}:{});try{for(const width of [320,390,768,1440]){
 const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
 await page.goto(origin+'/component-playground/url-reference');await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(250);
 for(const row of await page.locator('#panel-url-reference .section-heading').all()){
  if(!await row.isVisible())continue;
  const title=row.locator('h2,h3'),button=row.locator('.section-collapse');
  const check=await title.evaluate(e=>{const c=getComputedStyle(e),row=e.closest('.section-heading'),label=e.querySelector(':scope>span');return {compact:e.hasAttribute('data-compact-leading'),line:parseFloat(c.lineHeight)/parseFloat(c.fontSize),cap:parseFloat(row.style.getPropertyValue('--section-cap-y')),wrapped:label.getBoundingClientRect().height>parseFloat(c.lineHeight)*1.5};});
  assert.ok(Math.abs(check.cap-25)<.6,'preserve first-line cap alignment');if(width<=660||check.wrapped){assert.equal(check.compact,true);assert.ok(Math.abs(check.line-1.25)<.001);}
  await button.hover();const paint=await row.evaluate(e=>({height:parseFloat(getComputedStyle(e,'::before').height),row:e.getBoundingClientRect().height,opacity:getComputedStyle(e,'::before').opacity}));assert.ok(Math.abs(paint.height-paint.row)<.1,'paint covers every line');assert.equal(paint.opacity,'1');
  await button.click();await page.waitForTimeout(60);const balance=await row.evaluate(e=>({actual:e.getBoundingClientRect().height,expected:parseFloat(e.style.getPropertyValue('--collapsed-heading-height'))}));assert.ok(Math.abs(balance.actual-balance.expected)<1,'collapsed H2/H3 honours measured balanced height '+JSON.stringify(balance));const offset=await button.evaluate(e=>{const b=e.getBoundingClientRect(),s=e.querySelector('svg').getBoundingClientRect();return{x:s.x+s.width/2-b.x-b.width/2,y:s.y+s.height/2-b.y-b.height/2};});assert.ok(Math.abs(offset.x+1)<.1);assert.ok(Math.abs(offset.y)<.1);await button.click();
 }
 assert.equal(await page.locator('[data-compact-leading]:not(.section-heading h2,.section-heading h3)').count(),0);
 // Force desktop wrapping as well as ordinary mobile layouts.
 const first=page.locator('#panel-url-reference .section-heading').first();await first.locator('h2').evaluate(e=>e.style.maxWidth='160px');await page.evaluate(()=>dispatchEvent(new Event('resize')));await page.waitForTimeout(100);assert.equal(await first.locator('h2').getAttribute('data-compact-leading'),'');
 await first.locator('.section-collapse').hover();await first.scrollIntoViewIfNeeded();if(width===390||width===1440)await page.screenshot({path:`/tmp/heading-wrap-${engine.name()}-${width}.png`});
 await page.emulateMedia({reducedMotion:'no-preference'});const transition=await first.locator('.section-collapse svg').evaluate(e=>getComputedStyle(e).transitionDuration);assert.equal(transition,'0.16s');
 await page.close();console.log('PASS wrapped heading leading, full tint and chevron offsets',engine.name(),width);
}}finally{await browser.close();}}}finally{await new Promise(r=>server.close(r));}

import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
const near=(actual,expected,label)=>assert.ok(Math.abs(actual-expected)<1,`${label}: ${actual} != ${expected}`);
try {
 const page=await browser.newPage({reducedMotion:'reduce'});
 for(const width of [320,380,381,660,661,940,941,1008,1248,1440]) {
  await page.setViewportSize({width,height:1000});
  await page.goto(origin+'/ai-workshop-resources');await page.evaluate(()=>document.fonts.ready);
  const app=await page.evaluate(()=>{
   const css=s=>getComputedStyle(document.querySelector(s)),box=s=>document.querySelector(s).getBoundingClientRect();
   return {rail:box('.cards').width,card:css('article').padding,header:css('.code-header').padding,pre:css('pre').paddingLeft,icon:css('.copy .icon').display,qr:css('.qr-card').display,overflow:document.documentElement.scrollWidth>innerWidth};
  });
  near(app.rail,Math.min(width-56,952),'Resources rail');
  assert.equal(app.card,width<=660?'24px 28px':'32px 36px');
  assert.equal(app.header,width<=660?'8px 16px':'12px 20px');
  assert.equal(app.pre,width<=660?'16px':'20px');
  assert.equal(app.icon==='none',width<=380);assert.equal(app.qr==='none',width<=660);assert.equal(app.overflow,false);
  for(const path of ['/ai-workshop-resources','/component-playground']) {
   await page.goto(origin+path+'?login=false');
   assert.equal(await page.locator('.gate-panel').evaluate(e=>getComputedStyle(e).padding),width<=660?'24px 28px':'32px 36px');
   assert.equal(await page.locator('.access-gate').evaluate(e=>getComputedStyle(e).padding),'24px');
  }
  await page.goto(origin+'/component-playground');await page.evaluate(()=>document.fonts.ready);
  await page.locator('#inspector-toggle').click();await page.locator('#inspector-details').click();
  const pg=await page.evaluate(()=>{
   const box=s=>document.querySelector(s).getBoundingClientRect(),css=s=>getComputedStyle(document.querySelector(s));
   return {wrapper:box('main.wrap').width,header:box('header.wrap').width,panel:box('[data-panel]:not([hidden])>.panel').width,inspector:parseFloat(css('.inspector-dock').paddingLeft),cols:css('.inspector-dock dl').gridTemplateColumns.split(' ').length,overflow:document.documentElement.scrollWidth>innerWidth};
  });
  near(pg.wrapper,Math.min(width,1248),'Playground wrapper');near(pg.header,Math.min(width-56,1192),'Playground text rail');near(pg.panel,Math.min(width-48,1200),'Playground visible cap');near(pg.inspector,Math.max(28,(width-1192)/2),'Inspector rail');assert.equal(pg.cols,width<=660?2:4);assert.equal(pg.overflow,false);
  if(width<=660){
   await page.locator('#style-options').click();
   assert.equal(await page.locator('#mobile-style-controls .primary-style-choices .choice span').first().evaluate(e=>getComputedStyle(e).fontSize),width<=380?'13px':'14px');
   await page.keyboard.press('Escape');
  }
  if([380,661,1440].includes(width))await page.screenshot({path:`/tmp/responsive-layout-${width}.png`});
  console.log('PASS responsive layout',width);
 }
}finally{await browser.close();server.close();}

const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:800},hasTouch:true});
await page.goto(new URL('../outputs/workshop-resources-preview.html', import.meta.url).href);
const rail=page.locator('.cards');
for(const width of [1920,1440,1024,390,320]){
 await page.setViewportSize({width,height:800});await page.evaluate(()=>{document.querySelector('.cards').scrollLeft=0;scrollTo(0,0)});
 const m=await page.evaluate(()=>{const box=s=>document.querySelector(s).getBoundingClientRect();return {brand:box('.brand').left,header:box('.page-header').left,footer:box('footer').left,card:box('article').left,rail:box('.cards').width,page:document.documentElement.clientWidth,overflow:document.documentElement.scrollWidth>innerWidth,content:box('.page-header').width}});
 assert.equal(m.card,m.brand);assert.equal(m.header,m.brand);assert.equal(m.footer,m.brand);assert.equal(m.rail,m.page);assert.ok(!m.overflow);assert.equal(m.content,Math.min(1152,width-48));console.log(width,m);
}
await page.setViewportSize({width:1440,height:650});
const state=()=>page.evaluate(()=>({x:document.querySelector('.cards').scrollLeft,y:scrollY,pre:document.querySelector('pre').scrollTop}));
await page.locator('pre').first().hover();let before=await state();
await page.mouse.wheel(120,0);await page.waitForTimeout(60);let after=await state();assert.ok(after.x>before.x);assert.equal(after.y,before.y);
// A vertical event immediately after horizontal input is never locked or remapped.
before=after;await page.mouse.wheel(0,-60);await page.waitForTimeout(60);after=await state();assert.equal(after.x,before.x);assert.ok(after.y<before.y);assert.equal(after.pre,before.pre);
await page.locator('pre').first().hover();before=await state();await page.mouse.wheel(0,-40);await page.waitForTimeout(60);after=await state();assert.equal(after.x,before.x);assert.ok(after.y<before.y);assert.equal(after.pre,before.pre);
await page.locator('pre').first().focus();before=await state();await page.keyboard.press('PageUp');await page.waitForTimeout(100);after=await state();assert.equal(after.x,before.x);assert.ok(after.y<before.y);assert.equal(after.pre,before.pre);
await page.evaluate(()=>{document.querySelector('.cards').scrollLeft=100;scrollTo(0,150)});
const cdp=await page.context().newCDPSession(page);const top=await page.locator('.card-top').first().boundingBox();const x=top.x+180,y=top.y+10;
before=await state();await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
for(let i=1;i<=4;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y+i*15}]});
await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});after=await state();assert.equal(after.x,before.x);assert.ok(after.y<before.y);assert.equal(after.pre,before.pre);
await browser.close();console.log('PASS: centred layout and independent axes; vertical wheel, keyboard and touch move only the page, including immediately after horizontal input');

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
await page.setViewportSize({width:1440,height:800});await page.evaluate(()=>{scrollTo(0,100);document.querySelector('.cards').scrollLeft=0});
const state=()=>page.evaluate(()=>({x:document.querySelector('.cards').scrollLeft,y:scrollY,pre:document.querySelector('pre').scrollTop}));
await page.locator('.card-top').first().hover();let before=await state();await page.mouse.wheel(0,60);await page.waitForTimeout(80);let after=await state();assert.equal(after.x,before.x);assert.ok(after.y>before.y);
await page.waitForTimeout(250);await page.locator('.card-top').first().hover();before=await state();await page.mouse.wheel(180,30);await page.waitForTimeout(60);after=await state();assert.ok(after.x>before.x);assert.equal(after.y,before.y);
await page.mouse.wheel(0,80);await page.waitForTimeout(60);assert.deepEqual(await state(),after);await page.keyboard.press('PageDown');assert.deepEqual(await state(),after);
// Vertical lock also applies at the end of the rail and to prompt overflow.
await page.evaluate(()=>document.querySelector('.cards').scrollLeft=99999);before=await state();await page.mouse.wheel(90,40);await page.waitForTimeout(60);after=await state();assert.equal(after.y,before.y);
await page.waitForTimeout(250);await page.evaluate(()=>{document.querySelector('.cards').scrollLeft=0;scrollTo(0,200)});await page.locator('pre').first().hover();before=await state();await page.mouse.wheel(0,70);await page.waitForTimeout(60);after=await state();assert.equal(after.x,before.x);assert.ok(after.pre>before.pre);
await page.waitForTimeout(250);before=await state();await page.mouse.wheel(100,40);await page.waitForTimeout(60);after=await state();assert.equal(after.y,before.y);assert.equal(after.pre,before.pre);assert.ok(after.x>before.x);
await page.waitForTimeout(250);await page.evaluate(()=>{document.querySelector('.cards').scrollLeft=0;scrollTo(0,100)});
const cdp=await page.context().newCDPSession(page);const top=await page.locator('.card-top').first().boundingBox();const x=top.x+180,y=top.y+10;before=await state();
await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
for(let i=1;i<=5;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-i*25,y:y+i*3}]});
await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});after=await state();assert.ok(after.x>before.x);assert.equal(after.y,before.y);

await page.waitForTimeout(250);before=await state();
await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
for(let i=1;i<=5;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y-i*15}]});
await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(100);after=await state();assert.equal(after.x,before.x);assert.ok(after.y>before.y);
await browser.close();console.log('PASS: restored widths, first-card alignment, viewport overflow, wheel axis lock, boundary lock, prompt scroll and touch horizontal lock');

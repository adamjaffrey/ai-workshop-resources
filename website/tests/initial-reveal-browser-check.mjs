import assert from 'node:assert/strict';
import {readFile,writeFile,unlink} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright';
const browser=await chromium.launch({channel:'chrome',headless:true});
const extraFile=join(tmpdir(),'workshop-five-card-reveal.html');
try {
 const page=await browser.newPage({reducedMotion:'no-preference'});
 await page.addInitScript(()=>{
  window.revealEvents=[];
  new MutationObserver(records=>{for(const {target} of records){if(target.matches?.('.step-row.is-revealed')&&!target.dataset.recorded){target.dataset.recorded='true';window.revealEvents.push({index:[...document.querySelectorAll('.step-row')].indexOf(target),time:performance.now()});}}}).observe(document,{attributes:true,attributeFilter:['class'],subtree:true});
 });
 const url=new URL('../outputs/workshop-resources-preview.html',import.meta.url).href;
 for(const [width,height] of [[320,320],[390,844],[660,900],[661,900],[768,1024],[1024,768],[1440,900],[1440,1600],[1920,2160]]) {
  await page.setViewportSize({width,height});await page.goto(url);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(700);
  const result=await page.evaluate(()=>{
   const visible=r=>Math.min(r.bottom,innerHeight)-Math.max(r.top,0)>=10&&r.right>0&&r.left<innerWidth;
   return {rows:[...document.querySelectorAll('.step-row')].map(row=>({expected:visible(row.querySelector('article').getBoundingClientRect())||[...row.querySelectorAll('.step-copy')].some(copy=>{const range=document.createRange();range.selectNodeContents(copy);return [...range.getClientRects()].some(visible);}),actual:row.classList.contains('is-revealed')})),events:window.revealEvents};
  });
  for(const row of result.rows)assert.equal(row.actual,row.expected,`${width}x${height} initial visibility`);
  for(let i=1;i<result.events.length;i++)assert.ok(result.events[i].time-result.events[i-1].time>=80,'initial pairs must stagger');
 }
 // Initial visible pairs move vertically, never sideways or beyond their resting position.
 await page.setViewportSize({width:1440,height:1600});await page.goto(url);
 for(let sample=0;sample<8;sample++){await page.waitForTimeout(80);const offsets=await page.locator('.reveal-initial > *').evaluateAll(es=>es.map(e=>{const c=getComputedStyle(e);const m=c.transform==='none'?new DOMMatrix():new DOMMatrix(c.transform);return [m.m41,m.m42];}));for(const [x,y] of offsets){assert.equal(x,0);assert.ok(y>=0&&y<=16);}}
 // A step heading alone in the initial viewport reveals its offscreen card.
 await page.setViewportSize({width:390,height:844});await page.goto(url);
 await page.waitForTimeout(1000);
 const stepTop=await page.locator('.step-copy').first().evaluate(e=>e.getBoundingClientRect().top);
 await page.setViewportSize({width:390,height:Math.ceil(stepTop+20)});await page.goto(url);await page.waitForTimeout(250);
 assert.equal(await page.locator('.step-row').first().evaluate(e=>e.classList.contains('is-revealed')&&e.querySelector('article').getBoundingClientRect().top>=innerHeight),true);
 // A tiny initial sliver must wait; ten pixels qualifies.
 await page.setViewportSize({width:390,height:Math.floor(stepTop+5)});await page.goto(url);await page.waitForTimeout(250);
 assert.equal(await page.locator('.step-row').first().evaluate(e=>e.classList.contains('is-revealed')),false);
 // Fully offscreen pairs use exactly the later 40px step-text trigger, including the first.
 await page.setViewportSize({width:390,height:320});await page.goto(url);await page.waitForTimeout(200);
 for(const row of await page.locator('.step-row').all()) {
  await row.evaluate(e=>scrollTo(0,e.querySelector('.step-copy').getBoundingClientRect().top+scrollY-innerHeight+39));await page.waitForTimeout(80);
  assert.equal(await row.evaluate(e=>e.classList.contains('is-revealed')),false);
  await row.evaluate(e=>scrollBy(0,2));await page.waitForTimeout(80);
  assert.equal(await row.evaluate(e=>e.classList.contains('is-revealed')),true);
  assert.equal(await row.evaluate(e=>e.querySelector('article').getBoundingClientRect().top>innerHeight),true,'stacked card must reveal before its own edge arrives');
 }
 // More cards require no new index-specific logic.
 const html=await readFile(new URL('../outputs/workshop-resources-preview.html',import.meta.url),'utf8');
 const cards=[...html.matchAll(/<section class="step-row"[\s\S]*?<\/article>\s*<\/section>/g)];assert.equal(cards.length,3);
 await writeFile(extraFile,html.replace(cards[2][0],cards[2][0].repeat(3)));
 await page.setViewportSize({width:1440,height:4000});await page.goto(pathToFileURL(extraFile).href);await page.waitForTimeout(900);
 assert.equal(await page.locator('.step-row').count(),5);
 const events=await page.evaluate(()=>window.revealEvents);assert.ok(events.length>=3);
 for(let i=1;i<events.length;i++)assert.ok(events[i].time-events[i-1].time>=80);
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);
 assert.equal(await page.locator('.step-marker').last().evaluate(e=>getComputedStyle(e).opacity),'1');
 console.log('PASS: initial viewport visibility and 120ms stagger at nine sizes, step-only visibility, 40px triggers for all cards, five-card fixture and reduced motion');
} finally {await browser.close();await unlink(extraFile).catch(()=>{});}

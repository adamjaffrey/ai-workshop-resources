import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:390,height:844}});
 const url=new URL('../outputs/workshop-resources-preview.html',import.meta.url).href;
 for(const width of [320,390,660,768,1440]) {
  await page.setViewportSize({width,height:844});await page.goto(url);await page.evaluate(()=>document.fonts.ready);
  const row=page.locator('.step-row').nth(1);
  await row.evaluate(e=>scrollTo(0,e.querySelector('article').getBoundingClientRect().top+scrollY-innerHeight+24));
  await page.waitForTimeout(100);
  assert.equal(await row.evaluate(e=>e.classList.contains('is-revealed')),false,`early reveal at ${width}`);
  await row.evaluate(e=>scrollTo(0,e.querySelector('article').getBoundingClientRect().top+scrollY-innerHeight+64));
  await page.waitForTimeout(100);
  assert.equal(await row.evaluate(e=>e.classList.contains('is-revealed')),true,`missing reveal at ${width}`);
  await page.waitForTimeout(800);
  const alignment=await page.locator('footer').evaluate(e=>{
   const f=e.getBoundingClientRect(),t=e.querySelector('.footer-meta').getBoundingClientRect(),b=e.querySelector('button').getBoundingClientRect();
   return b.top>=t.bottom?b.left-t.left:f.right-b.right;
  });
  assert.ok(Math.abs(alignment)<1,`footer action alignment at ${width}`);
  const footer=await page.locator('.footer-meta').evaluate(e=>{
   const parts=[...e.children];const rects=parts.map(x=>x.getBoundingClientRect());
   return {wrapped:e.classList.contains('is-wrapped'),differentLine:Math.abs(rects[0].top-rects[1].top)>2,separator:getComputedStyle(parts[1],'::before').content,nowrap:parts.every(x=>getComputedStyle(x).whiteSpace==='nowrap'),overflow:document.documentElement.scrollWidth>innerWidth};
  });
  assert.equal(footer.wrapped,footer.differentLine);assert.equal(footer.nowrap,true);assert.equal(footer.overflow,false);
  assert.equal(footer.separator,footer.wrapped?'none':'"•"');
  if(width<=660)assert.equal(await page.locator('.step-connector').first().evaluate(e=>e.getBoundingClientRect().width),112);
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);
 assert.equal(await page.locator('.step-marker').last().evaluate(e=>getComputedStyle(e).opacity),'1');
 console.log('PASS: card-driven paired reveals, reduced motion, footer wrap/separator, no overflow, and mobile lines at five widths');
}finally{await browser.close();}

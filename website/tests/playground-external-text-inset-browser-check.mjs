import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({reducedMotion:'reduce'});
 for(const width of [320,390,660,661,768,1024,1440]) {
  await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:'+server.address().port+'/playground');
  for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
   await page.evaluate(({theme,agent})=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.selectedAgent=agent;},{theme,agent});
   const results=await page.evaluate(()=>{
    const checks=[];
    for(const element of document.querySelectorAll('.choices legend,.field>.slider-label,#hover .hover-explanation')){
     const style=getComputedStyle(element);checks.push([element.tagName,style.paddingInlineStart,style.paddingInlineEnd]);
    }
    return checks;
   });
   assert.ok(results.length>20);
   for(const [label,start,end] of results){assert.equal(start,'4px',label);assert.equal(end,'4px',label);}
  }
  if(width<=660){await page.locator('body>#style-options').click();assert.equal(await page.locator('#theme legend').evaluate(e=>getComputedStyle(e).paddingLeft),'4px');await page.keyboard.press('Escape');}
  assert.equal(await page.locator('#theme .choice span').first().evaluate(e=>getComputedStyle(e).paddingLeft),width<=360?'6px':'12px');
  assert.equal(await page.locator('#login-preview .section-heading h2').evaluate(e=>getComputedStyle(e).paddingLeft),'0px');
  assert.ok(['12px','18px'].includes(await page.frameLocator('#resources-frame').locator('.toggle button').first().evaluate(e=>getComputedStyle(e).paddingLeft))); // The existing sticky selector can be compact.
  assert.equal(await page.frameLocator('#login-frame').locator('#workshop-password').evaluate(e=>getComputedStyle(e).paddingLeft),'44px');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 }
 console.log('PASS: outer labels inset 4px at seven widths/both themes/agents; mobile dialog, control interiors and specimen headings/input padding preserved.');
} finally {await browser.close();await new Promise(r=>server.close(r));}

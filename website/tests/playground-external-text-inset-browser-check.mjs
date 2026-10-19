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
   const cardStyles=await page.evaluate(()=>{
    const font=e=>{const c=getComputedStyle(e);return [c.fontFamily,c.fontSize,c.fontWeight,c.lineHeight];};
    return {insets:[...document.querySelectorAll('.panel>.section-heading h2,.panel>p,.panel>.feather-notice>p')].map(e=>getComputedStyle(e).paddingInlineStart),checkboxes:[...document.querySelectorAll('.source-choice')].map(font),choice:font(document.querySelector('#state .choice span')),licencePadding:getComputedStyle(document.querySelector('.licence-text')).paddingLeft,disclosures:[...document.querySelectorAll('.panel>details:not(.preview-settings):not(.preview-state-settings)>:not(summary),.panel>.feather-notice>details>:not(summary)')].map(e=>getComputedStyle(e).marginInlineStart),hover:getComputedStyle(document.querySelector('#hover-explanation')).marginInlineStart};
   });
   assert.ok(cardStyles.insets.length>20);for(const inset of cardStyles.insets)assert.equal(inset,'4px');
   for(const font of cardStyles.checkboxes)assert.deepEqual(font,cardStyles.choice);
   for(const margin of cardStyles.disclosures)assert.equal(margin,'26px');
   assert.equal(cardStyles.licencePadding,'16px');assert.equal(cardStyles.hover,'0px');
   assert.ok(results.length>20);
   for(const [label,start,end] of results){assert.equal(start,'4px',label);assert.equal(end,'4px',label);}
  }
  if(width<=660){await page.locator('body>#style-options').click();assert.equal(await page.locator('#theme legend').evaluate(e=>getComputedStyle(e).paddingLeft),'4px');await page.keyboard.press('Escape');}
  assert.equal(await page.locator('#theme .choice span').first().evaluate(e=>getComputedStyle(e).paddingLeft),width<=360?'6px':'12px');
  assert.equal(await page.locator('#login-preview .section-heading h2').evaluate(e=>getComputedStyle(e).paddingLeft),'4px');
  assert.ok(['12px','18px'].includes(await page.frameLocator('#resources-frame').locator('.toggle button').first().evaluate(e=>getComputedStyle(e).paddingLeft))); // The existing sticky selector can be compact.
  assert.equal(await page.frameLocator('#login-frame').locator('#workshop-password').evaluate(e=>getComputedStyle(e).paddingLeft),'44px');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 }
 console.log('PASS: outer labels inset 4px at seven widths/both themes/agents; mobile dialog, white-card copy and disclosure indents, matching checkbox fonts, control interiors and specimen input padding preserved.');
} finally {await browser.close();await new Promise(r=>server.close(r));}

import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});const origin='http://127.0.0.1:'+server.address().port;
const near=(a,b,label)=>assert.ok(Math.abs(a-b)<.6,`${label}: ${a} expected ${b}`);
try{
 const page=await browser.newPage({reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(origin+'/component-playground/components');
  const count=await page.locator('[data-panel]>.panel').count();assert.equal(await page.locator('[data-panel]>.panel>.section-heading>.section-collapse').count(),count,'Every section has a collapse control');
  for(const tab of await page.locator('[data-tab]').all()){
   await tab.click();const panels=page.locator('[data-panel]:visible>.panel');
   for(const panel of await panels.all()){
    const button=panel.locator(':scope>.section-heading>.section-collapse');
    const expandedHeight=(await panel.boundingBox()).height;
    const geometry=await button.evaluate(e=>{const p=e.closest('.panel').getBoundingClientRect(),b=e.getBoundingClientRect(),r=e.querySelector('svg').getBoundingClientRect();return{gap:p.right-b.right-1,top:b.top-p.top-1,width:b.width,height:b.height,dx:(r.left+r.right-b.left-b.right)/2,dy:(r.top+r.bottom-b.top-b.bottom)/2,border:getComputedStyle(e).borderTopWidth};});
    near(geometry.gap,20,'button right padding');near(geometry.top,24,'button top padding');near(geometry.width,50,'button width');near(geometry.height,50,'button height');near(geometry.dx,0,'SVG horizontal centre');near(geometry.dy,0,'SVG vertical centre');assert.equal(geometry.border,'1px');
    const next=await panel.evaluate(e=>e.nextElementSibling?e.nextElementSibling.getBoundingClientRect().top-e.getBoundingClientRect().top:undefined);
    await button.click({position:{x:18,y:18}});assert.equal(await button.getAttribute('aria-expanded'),'false');
    assert.ok((await panel.boundingBox()).height<expandedHeight,'Collapsed section shrinks');
    assert.equal(await panel.locator(':scope>:not(.section-heading):visible').count(),0,'Only heading row remains');
    assert.equal(await button.evaluate(e=>document.activeElement===e),true,'Pointer activation retains focus');
    assert.ok(await button.evaluate(e=>{const p=e.closest('.panel').getBoundingClientRect(),b=e.getBoundingClientRect();return p.bottom-b.bottom-1>=23.5;}),'collapsed bottom padding is at least 24px for wrapped headings');
    if(next!==undefined)assert.ok(await panel.evaluate((e,y)=>e.nextElementSibling.getBoundingClientRect().top-e.getBoundingClientRect().top<y,next),'Following sections reflow upward');
    await button.focus();await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.checkVisibility()),true,'Tab skips collapsed contents');await page.keyboard.press('Shift+Tab');assert.equal(await button.evaluate(e=>document.activeElement===e),true);assert.ok(await button.evaluate(e=>parseFloat(getComputedStyle(e).outlineWidth)>=2),'Keyboard ring remains visible');await page.keyboard.press('Enter');assert.equal(await button.getAttribute('aria-expanded'),'true');
   }
  }
  await page.locator('#tab-components').click();const first=page.locator('#login-preview .section-collapse');await first.click();await page.locator('#tab-icons').click();await page.locator('#tab-components').click();assert.equal(await first.getAttribute('aria-expanded'),'false','State lasts within the current page');if([390,1440].includes(width)){await first.scrollIntoViewIfNeeded();await page.waitForTimeout(150);await page.screenshot({path:'/tmp/playground-collapse-'+width+'.png'});}
  await page.reload();assert.equal(await page.locator('[data-collapsed]').count(),0,'Reload expands every tab');
  await page.locator('#login-preview .preview-expand').click();assert.equal(await first.isVisible(),false,'Fullscreen keeps its existing controls');await page.keyboard.press('Escape');assert.equal(await first.isVisible(),true);
  await page.locator('#tab-icons').click();assert.ok((await page.locator('[data-catalog-icon="chevron-down"]').textContent()).includes('toggle-playground-section'),'New icon appears in Playground catalogue');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 }
 assert.deepEqual(errors,[]);console.log('PASS: all section controls, optical alignment, keyboard/pointer toggles, reflow, fullscreen compatibility and reload reset at four widths');
}finally{await browser.close();server.close();}

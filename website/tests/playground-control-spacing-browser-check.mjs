import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await page.goto(origin+'/component-playground/typography');await page.waitForTimeout(2000);
 const links=page.frameLocator('#link-type-frame');assert.ok(await links.locator('.list-examples').evaluate(e=>e.previousElementSibling.matches('.colour-table')));
 assert.deepEqual(await links.locator('#link-colours tr td:first-child').allTextContents(),['light / codex','light / claude-code','dark / codex','dark / claude-code']);
 const sizes=await links.locator('.hex-chip').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().width));assert.ok(sizes.every(n=>n===sizes[0]));
 await page.locator('#tab-icons').click();await page.waitForTimeout(2500);const groups=page.locator('#playground-icons-panel>.selector-row>.choices');assert.equal(await groups.count(),2);const [a,b]=await groups.evaluateAll(es=>es.map(e=>{const r=e.querySelector('.choice-shell').getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}}));assert.equal(a.y,b.y);assert.ok(Math.abs(b.x-a.x-a.width-32)<1);
 const summary=page.locator('.icon-usages summary').first();await summary.click();await page.waitForTimeout(100);assert.equal(await summary.evaluate(e=>getComputedStyle(e).borderBottomWidth),'0px');
 const indent=await summary.evaluate(e=>{const t=[...e.childNodes].find(n=>(n.nodeType===3&&n.textContent.trim())||(n.nodeType===1&&n.tagName!=='svg'&&n.textContent.trim())),r=document.createRange();r.selectNodeContents(t);return {text:r.getBoundingClientRect().left,list:e.nextElementSibling.getBoundingClientRect().left,padding:parseFloat(getComputedStyle(e.nextElementSibling).paddingLeft)}});assert.ok(Math.abs(indent.text-indent.list)<1);assert.equal(indent.padding,20);
 await page.screenshot({path:'/tmp/playground-controls-wide.png'});
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(200);const narrowA=await groups.nth(0).boundingBox(),narrowB=await groups.nth(1).boundingBox();assert.ok(narrowB.y>=narrowA.y+narrowA.height+31);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.goto(origin+'/ai-workshop-resources');for(const selector of ['[data-agent][aria-pressed=false]','[data-theme-choice][aria-pressed=false]']){const button=page.locator(selector).first();const before=await button.evaluate(e=>getComputedStyle(e,'::before').backgroundColor);await button.hover();const after=await button.evaluate(e=>getComputedStyle(e,'::before').backgroundColor);assert.notEqual(after,before,selector+' hover fill');await page.mouse.move(0,0);}
 await page.goto(origin+'/ai-workshop-resources?show-login=true');const loginTheme=page.locator('[data-theme-choice][aria-pressed=false]').first();await loginTheme.hover();const fill=await loginTheme.evaluate(e=>getComputedStyle(e,'::before').backgroundColor);assert.notEqual(fill,'rgba(0, 0, 0, 0)');
 await page.setViewportSize({width:1440,height:1000});await page.goto(origin+'/component-playground');for(const id of ['agent','theme']){const option=page.locator('#'+id+' input:not(:checked)+span');await option.hover();assert.equal(await option.evaluate(e=>getComputedStyle(e.parentElement,'::before').backgroundColor),fill);}
 console.log('PASS: typography order, query labels, chip sizes, wrapping selectors, disclosure bullets and Resources hover feedback');
}finally{await browser.close();await new Promise(r=>server.close(r));}

import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {linkTypographyPage} from '../scripts/style-guide-link-typography.mjs';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{const page=await browser.newPage({hasTouch:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.setContent(linkTypographyPage);await page.waitForFunction(()=>document.querySelector('a.workshop-link'));
await page.evaluate(()=>{window.linkActivations=0;document.querySelector('a').addEventListener('click',e=>{e.preventDefault();window.linkActivations++;});});
for(const width of [320,1440])for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
 await page.setViewportSize({width,height:900});await page.evaluate(({theme,agent})=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.selectedAgent=agent;},{theme,agent});
 const link=page.locator('a').first();const box=await link.boundingBox(),text=await link.locator('.link-tail').boundingBox();
 const hit=await link.evaluate(e=>{const r=e.getBoundingClientRect(),mid=r.top+r.height/2,isLink=(x,y)=>document.elementFromPoint(x,y)?.closest('a')===e;return {removedTop:isLink(r.left+r.width/2,r.top+1),newTop:isLink(r.left+r.width/2,r.top+2.5),extraRight:isLink(r.right+.5,mid),outsideRight:isLink(r.right+1.5,mid),left:isLink(r.left+.5,mid),outsideLeft:isLink(r.left-1.5,mid),bottom:isLink(r.left+r.width/2,r.bottom-.5),outsideBottom:isLink(r.left+r.width/2,r.bottom+.5)};});
 assert.deepEqual(hit,{removedTop:false,newTop:true,extraRight:true,outsideRight:false,left:true,outsideLeft:false,bottom:true,outsideBottom:false});
 const count=await page.evaluate(()=>window.linkActivations);await page.mouse.click(box.x+box.width/2,box.y+1);assert.equal(await page.evaluate(()=>window.linkActivations),count);await page.mouse.click(box.x+box.width+.5,box.y+box.height/2);assert.equal(await page.evaluate(()=>window.linkActivations),count+1);await page.touchscreen.tap(box.x+box.width/2,box.y+box.height/2);assert.equal(await page.evaluate(()=>window.linkActivations),count+2);
 await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.waitForTimeout(180);
 const appearance=await link.evaluate(e=>{const s=getComputedStyle(e),p=getComputedStyle(e,'::before');return {background:s.backgroundColor,padding:s.padding,top:p.top,right:p.right,bottom:p.bottom,left:p.left,fill:p.backgroundColor,cursor:p.cursor};});
 assert.deepEqual([appearance.top,appearance.right,appearance.bottom,appearance.left],['2px','-1px','0px','0px']);assert.equal(appearance.background,'rgba(0, 0, 0, 0)');assert.notEqual(appearance.fill,'rgba(0, 0, 0, 0)');assert.equal(appearance.padding,'2px 3px');assert.equal(appearance.cursor,'pointer');
 assert.deepEqual(await link.boundingBox(),box);assert.deepEqual(await link.locator('.link-tail').boundingBox(),text);
 assert.equal(await link.evaluate(e=>getComputedStyle(e,'::before').outlineStyle),'none');await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');assert.equal(await link.evaluate(e=>getComputedStyle(e,'::before').outlineWidth),'3px');assert.equal(await link.evaluate(e=>getComputedStyle(e,'::before').outlineOffset),'3px');assert.equal(await link.evaluate(e=>getComputedStyle(e).outlineStyle),'none');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>window.linkActivations),count+3);
 assert.equal(await link.evaluate(e=>getComputedStyle(e,'::before').backgroundColor),await page.locator('a[data-link-preview]').evaluate(e=>getComputedStyle(e,'::before').backgroundColor));
}
await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('a').first().evaluate(e=>getComputedStyle(e,'::before').transitionDuration),'0s');assert.deepEqual(errors,[]);console.log('PASS: exact adjusted hit bounds, unchanged text/arrow/layout, mouse/touch/keyboard activation, focus-ring bounds, theme/agent held-hover parity and reduced motion');
}finally{await browser.close();}

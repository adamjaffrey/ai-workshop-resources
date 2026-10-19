import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),app=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));const base='http://127.0.0.1:'+server.address().port;await page.goto(base+'/playground');await app.goto(base+'/');
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:1000});await app.setViewportSize({width,height:1000});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(300);
  assert.equal(await page.locator('.breadcrumbs').count(),0);
  const top=await app.locator('.eyebrow').evaluate(e=>e.getBoundingClientRect().top+scrollY);
  assert.equal(await page.locator('.kicker').evaluate(e=>e.getBoundingClientRect().top+scrollY),top);
  for(const [a,b] of [['.kicker','.eyebrow'],['#playground-title','h1'],['header.wrap p','.intro']]){
   const read=e=>{const s=getComputedStyle(e);return [s.fontSize,s.lineHeight,s.marginBottom];};assert.deepEqual(await page.locator(a).evaluate(read),await app.locator(b).evaluate(read));
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'page overflow '+width);
  if(width>660)assert.equal(await page.locator('#agent legend').evaluate(e=>e.getBoundingClientRect().top-document.querySelector('header.wrap p').getBoundingClientRect().bottom),32);
  await page.locator('[data-tab=icons]').click();const group=page.locator('#icon-filter .choice-options');
  await page.locator('#icon-filter input[value=lucide]').check({force:true});await page.waitForTimeout(380);
  assert.ok(await group.evaluate(e=>{const c=e.querySelector('input:checked').closest('label'),i=e.querySelector('.toggle-indicator');return Math.abs(c.offsetLeft-parseFloat(i.style.left))<1&&Math.abs(c.offsetWidth-parseFloat(i.style.width))<1;}));
  const r=await group.boundingBox();await page.mouse.click(r.x+2,r.y+r.height/2);assert.ok(await page.locator('#icon-filter input[value=lucide]').isChecked(),'track padding must not toggle');
  await page.locator('#icon-filter input[value=lucide]').focus();await page.keyboard.press('ArrowRight');assert.ok(await page.locator('#icon-filter input[value=lobe]').isChecked());await page.waitForTimeout(380);
 }
 await page.locator('[data-tab=typography]').click();const frame=page.frameLocator('#link-type-frame');await frame.locator('#link-colours tr').first().waitFor();
 assert.ok(await frame.locator('.hex-chip').count()>10);
 assert.ok(await frame.locator('.hex-chip').evaluateAll(es=>es.every(e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e),probe=document.createElement('span');probe.style.color=e.parentElement.textContent;document.body.append(probe);const exact=getComputedStyle(probe).color;probe.remove();return r.width===r.height&&r.width>0&&r.width<parseFloat(c.fontSize)&&c.backgroundColor===exact&&e.getAttribute('aria-hidden')==='true';})));assert.ok(await frame.locator('.hex-value').first().evaluate(e=>getComputedStyle(e).fontFamily.includes('monospace')));
 assert.match(await frame.locator('#link-metrics').innerText(),/1px resting \/ 1px hover/);
 assert.ok(await frame.locator('a').first().evaluate(e=>{const tail=e.querySelector('.link-tail');return tail.textContent.includes('\u00a0')&&getComputedStyle(tail).whiteSpace==='nowrap';}));
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){await page.evaluate(({theme,agent})=>{for(const [id,value] of Object.entries({theme,agent})){const e=document.getElementById(id);e.value=value;e.dispatchEvent(new Event('change'));}},{theme,agent});await page.waitForTimeout(350);const colours=await frame.locator('a').last().evaluate(e=>{const s=getComputedStyle(e);const c=document.createElement('canvas').getContext('2d');const rgba=value=>{c.clearRect(0,0,1,1);c.fillStyle=value;c.fillRect(0,0,1,1);return [...c.getImageData(0,0,1,1).data].join(',');};return {padding:s.padding,background:rgba(getComputedStyle(e,'::before').backgroundColor),selection:rgba(getComputedStyle(e,'::selection').backgroundColor)};});assert.equal(colours.padding,'2px 3px');if(theme==='dark')assert.equal(colours.background,colours.selection);}
 await page.locator('#playground-typography').scrollIntoViewIfNeeded();await page.waitForTimeout(500);await page.screenshot({path:'/tmp/playground-connected-links.png'});
 assert.deepEqual(errors,[]);console.log('PASS: header rhythm, responsive connected controls, exact-target selection, keyboard arrows, pill alignment, nonbreaking link arrows and theme hover styles');
}finally{await browser.close();server.close();}

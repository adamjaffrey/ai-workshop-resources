import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const local=createPhonePreview(),hosted=createPhonePreview({protectPlayground:true});
for(const app of [local,hosted])await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
const origin=app=>'http://127.0.0.1:'+app.server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),main=await browser.newPage(),gate=await browser.newPage();const errors=[];
 for(const p of [page,main,gate])p.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin(local)+'/playground');await main.goto(origin(hosted));await gate.goto(origin(hosted)+'/playground');
 assert.equal(await gate.locator('.page-placeholder > *').count(),0);assert.ok(await main.locator('.page-placeholder .ph-word').count()>0);
 assert.equal(await gate.evaluate(()=>document.activeElement.id),'gate-title');await gate.keyboard.press('Tab');assert.ok(await gate.locator('.theme-toggle').evaluate(e=>e.contains(document.activeElement)));
 const snapshot=()=>['.access-gate','.gate-panel','.password-field','.page-placeholder'].map(selector=>{const c=getComputedStyle(document.querySelector(selector));return [c.backgroundColor,c.filter,c.backdropFilter,c.padding,c.borderRadius,c.fontFamily,c.fontSize];});
 for(const width of [320,390,768,1440]){
  for(const p of [page,main,gate])await p.setViewportSize({width,height:844});
  assert.equal(await page.locator('.breadcrumbs').count(),0);
  for(const theme of ['light','dark'])for(const agent of ['codex','claude']){
   for(const p of [main,gate])await p.evaluate(({theme,agent})=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.selectedAgent=agent},{theme,agent});
   assert.deepEqual(await gate.evaluate(snapshot),await main.evaluate(snapshot));
   await page.evaluate(({theme,agent})=>{for(const [id,value] of Object.entries({theme,agent})){const e=document.getElementById(id);e.value=value;e.dispatchEvent(new Event('change'));}},{theme,agent});
   for(const destination of ['playground','resources','playground']){
    await page.locator('input[name=login-destination][value='+destination+']').locator('..').click();
    const frame=page.frames().find(f=>f.name()==='login-frame')||await page.locator('#login-frame').elementHandle().then(e=>e.contentFrame());
    await frame.waitForFunction(blank=>(document.querySelector('.page-placeholder').children.length===0)===blank,destination==='playground');
    await gate.setViewportSize({width:await frame.evaluate(()=>innerWidth),height:844});
    assert.deepEqual(await frame.evaluate(snapshot),await gate.evaluate(snapshot));
    await gate.setViewportSize({width,height:844});
   }
  }
 }
 assert.deepEqual(errors,[]);console.log('PASS: breadcrumb removal and shared login styling with blank/block backgrounds at four widths, both themes and agents');
}finally{await browser.close();for(const app of [local,hosted])app.server.close();}

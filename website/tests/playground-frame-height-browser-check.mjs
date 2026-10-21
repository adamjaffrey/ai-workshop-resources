import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port+'/component-playground');
 assert.equal(await page.locator('.preview-expand').count(),5);
 const tabs=await page.locator('[data-tab]').evaluateAll(es=>es.map(e=>e.dataset.tab));
 for(const tab of tabs){
  await page.locator('[data-tab="'+tab+'"]').click();
  const frames=await page.locator('#panel-'+tab+' iframe').all();
  for(const frame of frames){
   await frame.scrollIntoViewIfNeeded();
   const f=await(await frame.elementHandle()).contentFrame();await f.waitForLoadState();
   const embedded=await frame.evaluate(e=>!!e.closest('.preview-dialog'));
   if(!embedded){assert.equal(await frame.locator('..').locator('.preview-expand').count(),0);continue;} // Palette scroll ownership is covered by the fidelity check.
   for(const viewport of [{width:1440,height:1000},{width:390,height:700},{width:940,height:500}]){
    await page.setViewportSize(viewport);await page.waitForTimeout(250);
    const state=await frame.evaluate(e=>({id:e.id,height:e.getBoundingClientRect().height,cap:(visualViewport?.height||innerHeight)*.6,wrap:e.closest('.frame-wrap').getBoundingClientRect().height}));
    assert.ok(state.height<=state.cap+1,JSON.stringify(state));assert.ok(state.wrap<=state.cap+2,JSON.stringify(state));
    console.log('PASS',tab,viewport,state);
   }
   const expand=page.locator('#'+await frame.getAttribute('id').then(id=>id.replace('-frame','-preview'))+' .preview-expand');
   await page.setViewportSize({width:1440,height:1000});await expand.click();
   assert.ok(await frame.evaluate(e=>e.closest('.is-expanded')!==null),'Page embed expands');
   const expandedHeight=await frame.evaluate(e=>e.getBoundingClientRect().height);
   assert.ok(expandedHeight>0,'Expanded frame remains visible');
   assert.equal(await frame.evaluate(e=>getComputedStyle(e).maxHeight),'none','Expanded frame has no inline cap');
   assert.equal(await frame.evaluate(e=>e.closest('.is-expanded').getBoundingClientRect().height),1000,'Modal uses full window');
   await page.keyboard.press('Escape');
   assert.ok(await frame.evaluate(e=>e.getBoundingClientRect().height)<=600,'Contract restores cap');
   if(tab==='components'&&await frame.getAttribute('id')==='resources-frame'){
    await page.setViewportSize({width:1440,height:1000});await frame.evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY-200));await page.waitForTimeout(300);await f.evaluate(()=>scrollTo(0,0));const box=await frame.boundingBox();await page.mouse.move(box.x+Math.min(box.width/2,120),box.y+80);await page.mouse.wheel(0,160);await page.waitForTimeout(200);assert.ok(await f.evaluate(()=>scrollY)>0,'Page embed scrolls internally');
   }
  }
 }
 assert.deepEqual(errors,[]);console.log('PASS all Playground tabs audited; embedded pages capped on resize; page embeds retain Expand View');
}finally{await browser.close();server.close();}

import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true}),origin='http://127.0.0.1:'+server.address().port;
try{
 const p=await browser.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const width of [390,768,1440]){
  await p.setViewportSize({width,height:1000});await p.goto(origin+'/component-playground/blocks-and-blur');
  const label=p.locator('#blocks-preview .slider-label').first(),range=p.locator('#blocks-preview input[type=range]').first();
  assert.equal(await label.evaluate(e=>getComputedStyle(e).fontSize),'14px');assert.equal(await label.locator('output').evaluate(e=>getComputedStyle(e).fontFamily),await label.evaluate(e=>getComputedStyle(e).fontFamily));
  assert.equal(Math.round((await range.boundingBox()).y-((await label.boundingBox()).y+(await label.boundingBox()).height)),4);
  assert.equal(await p.locator('#blocks-preview .state-tools').evaluate(e=>getComputedStyle(e).marginBottom),'32px');
  const columns=await p.locator('#blocks-preview .state-tools').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length);assert.equal(columns,width===1440?3:width===768?2:1,'Slider columns follow icon breakpoints');
  await p.evaluate(()=>scrollTo(0,900));await p.waitForTimeout(100);
  const tab=p.locator('.tab-scroll-shell');const box=await tab.boundingBox();if(width<=660){for(const selector of ['body>#style-options','#back-to-top']){const b=await p.locator(selector).boundingBox();assert.ok(b.y+b.height<=box.y-23,selector+' leaves 24px gap');assert.equal(await p.locator(selector).evaluate(e=>{const r=e.getBoundingClientRect();return e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));}),true);}}
  assert.match(await tab.evaluate(e=>getComputedStyle(e).boxShadow),/4px/);
  await tab.hover();const start=await p.evaluate(()=>scrollY);await p.mouse.wheel(0,-200);await p.waitForTimeout(300);assert.ok(await p.evaluate(()=>scrollY)<start,'Vertical wheel chains over tabs');
  await p.locator('#tab-icons').click();await p.locator('#playground-icon-family').scrollIntoViewIfNeeded();const track=p.locator('#playground-icon-family .choice-options');await track.hover();const y=await p.evaluate(()=>scrollY);await p.mouse.wheel(0,200);await p.waitForTimeout(300);assert.ok(await p.evaluate(()=>scrollY)>y,'Vertical wheel chains over selector');
  for(const [id,tabName] of [['login','components'],['resources','components'],['blocks','blocks'],['branding','branding'],['discovery','discovery']]){
   await p.locator('[data-tab="'+tabName+'"]').click();const panel=p.locator('#'+id+'-preview');const ids=await panel.locator('button[id],input[type=checkbox]').evaluateAll(es=>es.filter(e=>!e.closest('.preview-settings')).map(e=>e.id).filter(Boolean));
   await panel.locator('.preview-expand').click();
   for(const cid of ids){const control=panel.locator('[id="'+cid+'"]');if(await control.getAttribute('hidden')!==null)continue;assert.equal(await control.evaluate(e=>e.closest('.expanded-state-controls,.heading-actions')!==null),true,id+' includes '+cid);}
   assert.equal(await panel.locator('.heading-actions button').count(),1,'Only contract view remains in heading');
   await p.keyboard.press('Escape');
  }
  await p.locator('#tab-typography').click();const frame=p.frameLocator('#link-type-frame');await frame.locator('.list-examples').waitFor();assert.equal(await frame.locator('.list-examples>ul').evaluate(e=>getComputedStyle(e).paddingLeft),'20px');assert.match(await frame.locator('.list-examples code').first().evaluate(e=>getComputedStyle(e).fontFamily),/monospace/);
  await frame.locator('.list-examples').evaluate(e=>e.scrollIntoView());await p.waitForTimeout(500);await p.screenshot({path:'/tmp/playground-rhythm-'+width+'.png'});
 }
 assert.deepEqual(errors,[]);console.log('PASS: slider hierarchy and clearance, 32px controls, mobile tool clearance, background overhang, vertical wheel chaining, expanded controls and shared list specimens');
}finally{await browser.close();server.close();}

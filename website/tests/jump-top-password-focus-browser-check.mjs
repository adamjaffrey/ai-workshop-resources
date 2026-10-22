import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
try {
 for(const engine of [chromium,webkit]) {
  const browser=await engine.launch(engine===chromium?{channel:'chrome'}:{});
  try { for(const width of [320,390,768,1440]) {
   const page=await browser.newPage({viewport:{width,height:1000}});
   await page.goto(origin+'/component-playground');
   await page.locator('.skip-main').waitFor({state:'attached'});
   for(const activation of ['pointer','keyboard']) {
    await page.evaluate(()=>scrollTo(0,800));
    if(activation==='pointer')await page.locator('#back-to-top').click();
    else {await page.locator('#back-to-top').focus();await page.keyboard.press('Enter');}
    await page.waitForTimeout(700);
    assert.ok(await page.evaluate(()=>scrollY<2),'returned to page top '+activation+' '+await page.evaluate(()=>scrollY));
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.skip-main').evaluate(e=>document.activeElement===e),true,activation+' returns next Tab to skip');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.page-title-link').evaluate(e=>document.activeElement===e),true,'normal order resumes at H1');
   }
   for(const agent of ['codex','claude'])for(const theme of ['light','dark']) {
    await page.goto(origin+'/component-playground?agent='+agent+'&theme='+theme);
    for(const panel of ['icons','errors']) {
     await page.locator('[data-tab='+panel+']').click();
     const frame=page.frameLocator('#'+panel+'-frame');
     for(const state of panel==='icons'?['neutral','loading']:['loading']) {
      const input=frame.locator('[data-state='+state+'] .password-field input').first();
      await input.waitFor();
      await input.evaluate(e=>{const before=document.createElement('button');e.closest('.password-field').before(before);before.focus();before.addEventListener('blur',()=>before.remove(),{once:true});});
      await page.keyboard.press('Tab');
      assert.equal(await input.evaluate(e=>document.activeElement===e),true);
      await page.waitForTimeout(300);
      const colours=await input.evaluate(e=>{
       const field=e.closest('.password-field'),probe=document.createElement('i');probe.style.color='var(--icon-ink)';field.append(probe);
       const expected=getComputedStyle(probe).color;probe.remove();
       const ring=document.querySelector('.workshop-focus-overlay');
       return {border:getComputedStyle(field).borderColor,width:getComputedStyle(field).borderTopWidth,ring:getComputedStyle(ring).borderColor,visible:getComputedStyle(ring).display,expected};
      });
      assert.equal(colours.border,colours.expected,JSON.stringify({panel,state,agent,theme,colours}));
      assert.equal(colours.width,'1px');assert.equal(colours.ring,colours.expected);assert.notEqual(colours.visible,'none');
     }
    }
   }
   await page.close();console.log('PASS Jump to Top and all three password states',engine.name(),width);
  }}finally{await browser.close();}
 }
}finally{server.close();}

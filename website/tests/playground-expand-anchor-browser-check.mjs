import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
try {
 for(const engine of [chromium,webkit]){
  const browser=await engine.launch(engine===chromium?{channel:'chrome',headless:true}:{headless:true});
  try {
   for(const width of [320,390,660,661,768,940,941,1440]){
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    await page.goto('http://127.0.0.1:'+server.address().port+'/component-playground');
    for(const [name,tab] of [['login','components'],['resources','components'],['blocks','blocks'],['branding','branding'],['discovery','discovery']]){
     await page.locator('[data-tab='+tab+']').click();
     const dialog=page.locator('#'+name+'-preview'),frame=page.locator('#'+name+'-frame'),button=dialog.locator('.preview-expand');
     await frame.scrollIntoViewIfNeeded();await page.waitForTimeout(150);
     const child=await(await frame.elementHandle()).contentFrame();await child.waitForLoadState();
     await child.evaluate(()=>window.anchorSentinel='retained');
     // Force the supported wide-screen preview geometry, including on desktop.
     await frame.evaluate(e=>{e.style.setProperty('width','1800px','important');});
     const position=()=>button.evaluate(e=>{const b=e.getBoundingClientRect(),r=e.closest('.preview-dialog').querySelector('.frame-wrap').getBoundingClientRect();return {right:r.right-b.right,bottom:r.bottom-b.bottom};});
     const before=await position();assert.ok(Math.abs(before.right-13)<1,JSON.stringify(before));assert.ok(Math.abs(before.bottom-13)<1,JSON.stringify(before));
     const scroller=dialog.locator('.page-embed-scroll');
     for(const fraction of [.5,1,0]){
      const offset=await scroller.evaluate((e,f)=>{e.scrollLeft=(e.scrollWidth-e.clientWidth)*f;return e.scrollLeft;},fraction);
      if(fraction)assert.ok(offset>0,'Wide iframe remains horizontally accessible');
      await child.evaluate(f=>scrollTo(f*document.documentElement.scrollWidth,f*document.documentElement.scrollHeight),fraction);
      assert.deepEqual(await position(),before,name+' action stays anchored during both axes of scrolling');
     }
     await button.click();assert.equal(await dialog.evaluate(e=>e.matches(':modal')),true);
     assert.equal(await child.evaluate(()=>window.anchorSentinel),'retained');
     await page.keyboard.press('Escape');assert.equal(await button.getAttribute('aria-expanded'),'false');
     assert.equal(await button.evaluate(e=>document.activeElement===e),true);
     assert.deepEqual(await position(),before,'Contract restores bottom-right anchor');
     await frame.evaluate(e=>e.style.removeProperty('width'));
     await scroller.evaluate(e=>e.scrollLeft=0);
     if(name==='resources'&&[390,1440].includes(width))await dialog.screenshot({path:'/tmp/expand-anchor-'+engine.name()+'-'+width+'.png'});
    }
    console.log('PASS',engine.name(),width,'all five embeds, horizontal endpoints, document scrolling, expand/contract and focus');
    await page.close();
   }
  } finally {await browser.close();}
 }
} finally {server.close();}

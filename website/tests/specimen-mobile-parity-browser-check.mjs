// Exercise mobile layout engines, not just a narrow desktop viewport.
import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
const readText=e=>{const c=getComputedStyle(e),r=document.createRange();r.setStart(e.firstChild,0);r.setEnd(e.firstChild,1);return {text:e.textContent,font:c.fontFamily,size:c.fontSize,line:c.lineHeight,weight:c.fontWeight,colour:c.color,glyphHeight:r.getBoundingClientRect().height};};
try{
 for(const engine of [chromium,webkit]){
  const browser=await engine.launch(engine===chromium?{channel:'chrome',headless:true}:{headless:true});
  try{for(const width of [320,390,768,1440])for(const [theme,agent] of [['light','codex'],['dark','claude-code']]){
   const context=await browser.newContext({viewport:{width,height:1000},isMobile:width<768,hasTouch:width<768,reducedMotion:'reduce'});
   const page=await context.newPage(),actual=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await actual.goto(`${origin}/ai-workshop-resources?theme=${theme}&agent=${agent}`);
   assert.equal(await actual.locator('style[data-specimen-layout],[data-specimen-width]').count(),0,'gallery sizing never enters the app');
   await actual.evaluate(()=>{document.execCommand=()=>false;});
   for(const [slug,id]of [['typography','type'],['icons','icons'],['status-states','errors'],['focus-and-selection','focus']]){
    await page.goto(`${origin}/component-playground/${slug}?theme=${theme}&agent=${agent}`);
    const frame=page.frameLocator('#'+id+'-frame');await frame.locator('[data-specimen-width]').first().waitFor();
    await page.waitForFunction(id=>document.getElementById(id+'-frame').style.visibility!=='hidden',id);
    await page.waitForTimeout(150);
    const height=await frame.locator('html').evaluate(e=>({viewport:innerHeight,content:e.scrollHeight}));assert.ok(height.content-height.viewport<2,`${id}: complete gallery is visible without internal vertical scrolling`);
    const failures=await frame.locator('body').evaluate(()=>[...document.querySelectorAll('[data-specimen-width]')].filter(e=>e.checkVisibility()).flatMap(e=>{const expected=parseFloat(e.style.getPropertyValue('--specimen-width')),actual=e.getBoundingClientRect().width;return Math.abs(actual-expected)>.6?[{element:e.tagName,class:e.className,expected,actual}]:[]}));
    assert.deepEqual(failures,[],`${engine.name()} ${width} ${id}: no squeezed source boundaries`);
    assert.equal(await frame.locator('html').evaluate(e=>e.scrollWidth>innerWidth+1),false,'overflow remains inside the grey frame');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'no outer page overflow');
    const inaccessible=await frame.locator('.icon-sample,.focus-preview,.agent-preview,.feedback-preview,.variant-preview,.specimen-viewport,.prompt-specimen-viewport').evaluateAll(es=>es.filter(e=>e.checkVisibility()).flatMap(e=>{if(!e.querySelector('[data-specimen-width]'))return ['missing source boundary'];if(e.scrollWidth<=e.clientWidth+1)return [];e.scrollLeft=e.scrollWidth;const reachable=e.scrollLeft>0;e.scrollLeft=0;return reachable?[]:['inaccessible horizontal overflow'];}));
    assert.deepEqual(inaccessible,[],'every rendered sample has a source width and horizontal access');
    if(id==='type'||id==='errors'){
     for(const success of [true,false]){
      const status=frame.locator(id==='type'?`[data-feedback=${success?'success':'error'}] .status`:`[data-state="Prompt Copy ${success?'Success':'Failure'}"] .status`);
      await status.waitFor();await status.evaluate(e=>e.scrollIntoView({block:'center'}));
      await actual.evaluate(success=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{if(!success)throw Error('Simulated failure');}}});document.querySelector('.copy').click();},success);
      await actual.waitForTimeout(80);
      const original=await actual.locator('.status').first().evaluate(readText),specimen=await status.evaluate(readText);
      assert.equal(original.size,'12px','actual Resources overlay size');assert.equal(original.line,'18px','actual Resources overlay leading');
      assert.deepEqual(specimen,original,`${engine.name()} ${width} ${id}: rendered feedback equals Resources`);
      if(width===390&&theme==='light'){await page.waitForTimeout(600);await page.screenshot({path:`/tmp/${engine.name()}-${id}-${success?'success':'failure'}-mobile.png`});}
     }
    }
    if(width===390&&theme==='light'&&id==='focus'){await frame.locator('.focus-row').last().evaluate(e=>e.scrollIntoView({block:'center'}));await page.waitForTimeout(600);await page.screenshot({path:`/tmp/${engine.name()}-focus-mobile.png`});}
   }
   assert.deepEqual(errors,[]);await context.close();console.log('PASS',engine.name(),width,theme,agent);
  }}finally{await browser.close();}
 }
}finally{server.close();}

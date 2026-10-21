import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import captures from '../lib/workshop-backdrop-comparisons.generated.json' with {type:'json'};
import {playgroundPlaceholderDocument} from '../lib/workshop-playground-placeholder.mjs';
const tabs=['typography','colours','errors','focus','branding'];
assert.deepEqual(Object.keys(captures),tabs);
assert.match(playgroundPlaceholderDocument(),/data-panel="colours"/);
const app=createPhonePreview();await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
const engine=process.env.BACKDROP_WEBKIT?webkit:chromium;
const browser=await engine.launch({headless:true,...(engine===chromium?{channel:'chrome'}:{})});
try{
 const p=await browser.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:'+app.server.address().port+'/component-playground/blocks-and-blur');
 const blocks=await (await p.locator('#blocks-frame').elementHandle()).contentFrame();
 await blocks.waitForFunction(()=>typeof demoBlocks==='function');
 assert.equal(await p.locator('input[name=block-destination]').count(),7);
 for(const width of [320,390,768,1440]){
  await p.setViewportSize({width,height:900});
  for(const tab of tabs){
   await p.locator('input[name=block-destination][value='+tab+']').locator('..').click();
   await p.locator('input[name=review][value=clear]').locator('..').click();
   await blocks.waitForFunction(tab=>document.querySelector('.playground-placeholder>iframe')?.dataset.backdropVariant===tab,tab);
   let doc=await (await blocks.locator('.playground-placeholder>iframe').elementHandle()).contentFrame();
   await doc.waitForSelector('[data-panel="'+tab+'"]');await doc.evaluate(()=>document.fonts.ready);
   assert.equal(await doc.locator('[data-panel]').count(),1);
   assert.equal(await doc.locator('.tab-scroll-shell.is-pinned,.toolbar.controls-pinned').count(),0,'Capture starts at the top, without pinned header state');
   assert.ok(await doc.locator('.ph-word').count()>50);
   for(const frame of [doc,...doc.childFrames()]){
    assert.equal(await frame.locator('script,[href],[onclick],form').count(),0);
    assert.equal(await frame.locator('body *').evaluateAll(es=>es.every(e=>getComputedStyle(e).cursor==='default')),true);
    const text=await frame.evaluate(()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let t='';while(w.nextNode())if(!w.currentNode.parentElement.closest('style,script'))t+=w.currentNode.textContent;return t;});
    assert.doesNotMatch(text,/[^x\s/\-]/);
   }
   if([390,1440].includes(width)){await p.evaluate(()=>scrollTo(0,document.getElementById('blocks-frame').getBoundingClientRect().top+scrollY-80));await p.screenshot({path:`/tmp/backdrop-${tab}-${width}.png`});}
   for(const theme of ['light','dark']){
    await blocks.evaluate(({tab,theme})=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.selectedAgent='claude-code';demoBlocks({blockDestination:tab,review:'panel'});},{tab,theme});
    await doc.waitForFunction(theme=>document.documentElement.dataset.theme===theme,theme);
    assert.equal(await doc.locator('html').getAttribute('data-selected-agent'),'claude-code');
    assert.equal(await blocks.locator('.playground-placeholder').getAttribute('inert'),'');
   }
   console.log(`PASS ${tab} at ${width}px: anonymous, inert, themes and panel mode`);
  }
 }
 await blocks.evaluate(()=>demoBlocks({blockDestination:'playground',review:'clear'}));
 const current=await (await blocks.locator('.playground-placeholder>iframe').elementHandle()).contentFrame();await current.waitForSelector('[data-panel=colours]');
 assert.deepEqual(errors,[]);
}finally{await browser.close();await new Promise(r=>app.server.close(r));}

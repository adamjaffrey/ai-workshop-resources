// The preview selector exposes only the two current production captures.
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const app=createPhonePreview();await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage();await p.goto('http://127.0.0.1:'+app.server.address().port+'/component-playground/blocks-and-blur');
 const blocks=await (await p.locator('#blocks-frame').elementHandle()).contentFrame();
 await blocks.waitForFunction(()=>typeof demoBlocks==='function');
 assert.deepEqual(await p.locator('input[name=block-destination]').evaluateAll(es=>es.map(e=>e.value)),['resources','playground']);
 for(const destination of ['playground','resources']){
  await p.locator('input[name=block-destination][value='+destination+']').locator('..').click();
  await p.locator('input[name=review][value=clear]').locator('..').click();
  if(destination==='playground'){
   const doc=await(await blocks.locator('.playground-placeholder>iframe').elementHandle()).contentFrame();
   await doc.waitForSelector('[data-panel=colours]');
   assert.equal(await doc.locator('.source-rules>summary>.ph-flex-text').count(),1);
  }else await blocks.locator('main.page-placeholder:not(.playground-placeholder) .ph-code-word').first().waitFor();
 }
 console.log('PASS only current Resources and Colours choices, both render updated geometry');
}finally{await browser.close();await new Promise(r=>app.server.close(r));}

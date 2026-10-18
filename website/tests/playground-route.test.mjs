import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {handleRequest} from '../lib/workshop-handler.mjs';
test('canonical playground route and legacy redirects remain local-only',async()=>{
 const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 try{
  const page=await fetch(origin+'/playground');assert.equal(page.status,200);assert.match(await page.text(),/<title>Workshop Component Playground<\/title>/);
  const head=await fetch(origin+'/playground',{method:'HEAD'});assert.equal(head.status,200);assert.equal(await head.text(),'');
  for(const path of ['/style-guide','/style-guide/','/playground/']){const r=await fetch(origin+path+'?test=1',{redirect:'manual'});assert.equal(r.status,308);assert.equal(r.headers.get('location'),'/playground?test=1');}
  for(const path of ['/playground','/style-guide']){const r=await handleRequest(new Request('https://production.example'+path),{});assert.doesNotMatch(await r.text(),/<title>Workshop Component Playground<\/title>/);}
 }finally{await new Promise(r=>server.close(r));}
});

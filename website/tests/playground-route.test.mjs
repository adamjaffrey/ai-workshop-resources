import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {handleRequest} from '../lib/workshop-handler.mjs';
test('local playground stays anonymous while hosted routes protect specimens',async()=>{
 const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 try{
  const page=await fetch(origin+'/playground');assert.equal(page.status,200);assert.match(await page.text(),/<title>Workshop Component Playground<\/title>/);
  const head=await fetch(origin+'/playground',{method:'HEAD'});assert.equal(head.status,200);assert.equal(await head.text(),'');
  for(const path of ['/style-guide','/style-guide/','/playground/']){const r=await fetch(origin+path+'?test=1',{redirect:'manual'});assert.equal(r.status,308);assert.equal(r.headers.get('location'),'/playground?test=1');}
  for(const path of ['/playground','/style-guide']){const r=await handleRequest(new Request('https://production.example'+path),{});assert.doesNotMatch(await r.text(),/<title>Workshop Component Playground<\/title>/);}
 }finally{await new Promise(r=>server.close(r));}
});

test('section paths are local previews but require hosted authentication',async()=>{
 const {server,password}=createPhonePreview({protectPlayground:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 try{
  const locked=await fetch(origin+'/playground/branding');assert.match(await locked.text(),/id="access-form"/);
  const login=await fetch(origin+'/auth/login',{method:'POST',headers:{origin,'content-type':'application/x-www-form-urlencoded',accept:'application/json'},body:new URLSearchParams({password})});const cookie=login.headers.get('set-cookie').split(';')[0];
  assert.match(await(await fetch(origin+'/playground/branding',{headers:{cookie}})).text(),/<title>Workshop Component Playground<\/title>/);
  assert.equal((await fetch(origin+'/playground/unknown',{headers:{cookie}})).status,404);
  const js=await(await fetch(origin+'/login.js')).text();assert.match(js,/location.pathname.startsWith\('\/playground'\)/);
 }finally{await new Promise(r=>server.close(r));}
});

test('renamed sections permanently redirect with query strings',async()=>{
 const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 try{for(const [old,next] of [['errors','statuses'],['discovery','easter-egg'],['colors','colours']])for(const suffix of ['','/'])for(const method of ['GET','HEAD']){
  const path='/playground/'+old+suffix+'?theme=dark';
  const local=await fetch(origin+path,{method,redirect:'manual'}),hosted=await handleRequest(new Request('https://production.example'+path,{method}),{});
  for(const response of [local,hosted]){assert.equal(response.status,301);assert.equal(response.headers.get('location'),'/playground/'+next+'?theme=dark');}
  assert.equal((await fetch(origin+'/playground/'+next)).status,200);
 }}finally{await new Promise(r=>server.close(r));}
});

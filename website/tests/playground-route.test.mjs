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
  const locked=await fetch(origin+'/playground/branding');const lockedHtml=await locked.text();assert.match(lockedHtml,/id="access-form"/);assert.match(lockedHtml,/data:image\/svg\+xml/);assert.ok(decodeURIComponent(lockedHtml.match(/href="(data:image\/svg\+xml,[^"]+)"/)[1]).includes('#0285FF'));
  const login=await fetch(origin+'/auth/login',{method:'POST',headers:{origin,'content-type':'application/x-www-form-urlencoded',accept:'application/json'},body:new URLSearchParams({password})});const cookie=login.headers.get('set-cookie').split(';')[0];
  assert.match(await(await fetch(origin+'/playground/branding',{headers:{cookie}})).text(),/<title>Workshop Component Playground<\/title>/);
  assert.equal((await fetch(origin+'/playground/unknown',{headers:{cookie}})).status,404);
  const js=await(await fetch(origin+'/login.js')).text();assert.match(js,/location.pathname.startsWith\('\/playground'\)/);
 }finally{await new Promise(r=>server.close(r));}
});

test('renamed sections permanently redirect with query strings',async()=>{
 const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 try{for(const [old,next] of [['errors','status-states'],['discovery','easter-egg'],['colors','colours']])for(const suffix of ['','/'])for(const method of ['GET','HEAD']){
  const path='/playground/'+old+suffix+'?theme=dark';
  const local=await fetch(origin+path,{method,redirect:'manual'}),hosted=await handleRequest(new Request('https://production.example'+path,{method}),{});
  for(const response of [local,hosted]){assert.equal(response.status,301);assert.equal(response.headers.get('location'),'/playground/'+next+'?theme=dark');}
  assert.equal((await fetch(origin+'/playground/'+next)).status,200);
 }}finally{await new Promise(r=>server.close(r));}
});


test('home redirects locally and on the hosted handler without bypassing login',async()=>{
 const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 try{for(const path of ['/home','/home/'])for(const method of ['GET','HEAD']){
  for(const response of [await fetch(origin+path+'?login=1',{method,redirect:'manual'}),await handleRequest(new Request('https://production.example'+path+'?login=1',{method}),{})]){assert.equal(response.status,301);assert.equal(response.headers.get('location'),'/?login=1');}
 }assert.match(await(await fetch(origin+'/home')).text(),/id="access-form"/);
 }finally{await new Promise(r=>server.close(r));}
});

test('all aliases and slash variants redirect once locally and hosted, preserving exact queries',async()=>{
 const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 const aliases=[['/style-guide','/playground'],['/home','/'],['/playground/colors','/playground/colours'],['/playground/blocks','/playground/blocks-and-blur'],['/playground/blur','/playground/blocks-and-blur'],['/playground/errors','/playground/status-states'],['/playground/statuses','/playground/status-states'],['/playground/status','/playground/status-states'],['/playground/states','/playground/status-states'],['/playground/focus','/playground/focus-and-selection'],['/playground/selection','/playground/focus-and-selection'],['/playground/discovery','/playground/easter-egg'],['/playground/easter','/playground/easter-egg'],['/playground/egg','/playground/easter-egg']];
 const canonical=['/playground',...['components','typography','colours','blocks-and-blur','icons','status-states','focus-and-selection','branding','easter-egg'].map(s=>'/playground/'+s)];
 const query='?theme=dark&value=a%2Fb&value=c+d&empty=';
 try{
  for(const [source,target] of [...aliases,...canonical.map(p=>[p,p]),['/unknown/path','/unknown/path']])for(const suffix of ['','/','///'])for(const method of ['GET','HEAD']){
   if(source===target&&!suffix)continue;
   const requestPath=source+suffix+query;
   const responses=[await fetch(origin+requestPath,{method,redirect:'manual'}),await handleRequest(new Request('https://production.example'+requestPath,{method}),{})];
   for(const response of responses){assert.equal(response.status,source!==target&&source!=='/style-guide'?301:308,requestPath);assert.equal(response.headers.get('location'),target+query);if(method==='HEAD')assert.equal(await response.text(),'');}
   // The destination itself must never issue a further redirect, even without hosted configuration.
   for(const response of [await fetch(origin+target+query,{method,redirect:'manual'}),await handleRequest(new Request('https://production.example'+target+query,{method}),{})])assert.equal(response.headers.get('location'),null,target);
  }
  for(const target of canonical)assert.equal((await fetch(origin+target,{redirect:'manual'})).status,200);
  const post=await fetch(origin+'/playground/blur/',{method:'POST',redirect:'manual'});assert.equal(post.status,404);assert.equal(post.headers.get('location'),null);
  assert.equal((await fetch(origin+'/',{redirect:'manual'})).status,200);
 }finally{await new Promise(r=>server.close(r));}
});

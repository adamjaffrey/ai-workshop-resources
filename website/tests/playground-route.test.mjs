import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {handleRequest} from '../lib/workshop-handler.mjs';
test('local playground stays anonymous while hosted routes protect specimens',async()=>{
 const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 try{
  const page=await fetch(origin+'/component-playground');assert.equal(page.status,200);assert.match(await page.text(),/<title>Component Playground<\/title>/);
  const head=await fetch(origin+'/component-playground',{method:'HEAD'});assert.equal(head.status,200);assert.equal(await head.text(),'');
  for(const path of ['/style-guide','/style-guide/','/component-playground/']){const r=await fetch(origin+path+'?test=1',{redirect:'manual'});assert.equal(r.status,301);assert.equal(r.headers.get('location'),'/component-playground?test=1');}
  for(const path of ['/component-playground','/style-guide']){const r=await handleRequest(new Request('https://production.example'+path),{});assert.doesNotMatch(await r.text(),/id="playground-title"/);}
 }finally{await new Promise(r=>server.close(r));}
});

test('section paths are local previews but require hosted authentication',async()=>{
 const {server,password}=createPhonePreview({protectPlayground:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 try{
  const locked=await fetch(origin+'/component-playground/branding');const lockedHtml=await locked.text();assert.match(lockedHtml,/id="access-form"/);assert.match(lockedHtml,/data:image\/svg\+xml/);assert.ok(decodeURIComponent(lockedHtml.match(/href="(data:image\/svg\+xml,[^"]+)"/)[1]).includes('#0285FF'));
  const login=await fetch(origin+'/auth/login',{method:'POST',headers:{origin,'content-type':'application/x-www-form-urlencoded',accept:'application/json'},body:new URLSearchParams({password})});const cookie=login.headers.get('set-cookie').split(';')[0];
  assert.match(await(await fetch(origin+'/component-playground/branding',{headers:{cookie}})).text(),/<title>Component Playground<\/title>/);
  assert.equal((await fetch(origin+'/component-playground/unknown',{headers:{cookie}})).status,404);
  const js=await(await fetch(origin+'/login.js')).text();assert.match(js,/target.pathname.startsWith\('\/component-playground'\)/);
 }finally{await new Promise(r=>server.close(r));}
});

test('renamed sections permanently redirect with query strings',async()=>{
 const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 try{for(const [old,next] of [['errors','status-states'],['discovery','easter-egg'],['colors','colours']])for(const suffix of ['','/'])for(const method of ['GET','HEAD']){
  const path='/component-playground/'+old+suffix+'?theme=dark';
  const local=await fetch(origin+path,{method,redirect:'manual'}),hosted=await handleRequest(new Request('https://production.example'+path,{method}),{});
  for(const response of [local,hosted]){assert.equal(response.status,301);assert.equal(response.headers.get('location'),'/component-playground/'+next+'?theme=dark');}
  assert.equal((await fetch(origin+'/component-playground/'+next)).status,200);
 }}finally{await new Promise(r=>server.close(r));}
});


test('home redirects locally and on the hosted handler without bypassing login',async()=>{
 const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 try{for(const path of ['/home','/home/'])for(const method of ['GET','HEAD']){
  for(const response of [await fetch(origin+path+'?login=1',{method,redirect:'manual'}),await handleRequest(new Request('https://production.example'+path+'?login=1',{method}),{})]){assert.equal(response.status,301);assert.equal(response.headers.get('location'),'/ai-workshop-resources?show-login=true');}
 }assert.match(await(await fetch(origin+'/home')).text(),/id="access-form"/);
 }finally{await new Promise(r=>server.close(r));}
});

test('all aliases and slash variants redirect once locally and hosted, preserving exact queries',async()=>{
 const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 const aliases=[['/style-guide','/component-playground'],['/home','/ai-workshop-resources'],['/component-playground/colors','/component-playground/colours'],['/component-playground/blocks','/component-playground/blocks-and-blur'],['/component-playground/blur','/component-playground/blocks-and-blur'],['/component-playground/errors','/component-playground/status-states'],['/component-playground/statuses','/component-playground/status-states'],['/component-playground/status','/component-playground/status-states'],['/component-playground/states','/component-playground/status-states'],['/component-playground/focus','/component-playground/focus-and-selection'],['/component-playground/selection','/component-playground/focus-and-selection'],['/component-playground/discovery','/component-playground/easter-egg'],['/component-playground/easter','/component-playground/easter-egg'],['/component-playground/egg','/component-playground/easter-egg']];
 const canonical=['/component-playground',...['components','typography','colours','blocks-and-blur','icons','status-states','focus-and-selection','branding','easter-egg'].map(s=>'/component-playground/'+s)];
 const query='?theme=dark&value=a%2Fb&value=c+d&empty=';
 try{
  for(const [source,target] of [...aliases,...canonical.map(p=>[p,p]),['/unknown/path','/unknown/path']])for(const suffix of ['','/','///'])for(const method of ['GET','HEAD']){
   if(source===target&&!suffix)continue;
   const requestPath=source+suffix+query;
   const responses=[await fetch(origin+requestPath,{method,redirect:'manual'}),await handleRequest(new Request('https://production.example'+requestPath,{method}),{})];
   for(const response of responses){assert.equal(response.status,301,requestPath);assert.equal(response.headers.get('location'),target+query);if(method==='HEAD')assert.equal(await response.text(),'');}
   // The destination itself must never issue a further redirect, even without hosted configuration.
   for(const response of [await fetch(origin+target+query,{method,redirect:'manual'}),await handleRequest(new Request('https://production.example'+target+query,{method}),{})])assert.equal(response.headers.get('location'),null,target);
  }
  for(const target of canonical)assert.equal((await fetch(origin+target,{redirect:'manual'})).status,200);
  const post=await fetch(origin+'/component-playground/blur/',{method:'POST',redirect:'manual'});assert.equal(post.status,404);assert.equal(post.headers.get('location'),null);
  assert.equal((await fetch(origin+'/ai-workshop-resources',{redirect:'manual'})).status,200);
 }finally{await new Promise(r=>server.close(r));}
});

test('prefix wildcards, case and singular/plural sections redirect in one hop',async()=>{
 const {playgroundRedirect}=await import('../lib/workshop-playground-routes.mjs');
 for(const root of ['component','components','playground','playgrounds','components-playgrounds','component-playground']){
  for(const [alias,canonical] of [['component','components'],['icon','icons'],['colour','colours'],['typographies','typography'],['block-and-blurs','blocks-and-blur'],['status-state','status-states'],['focus-and-selections','focus-and-selection'],['brandings','branding'],['easter-eggs','easter-egg']]){
   const source='/'+root.toUpperCase()+'/'+alias.toUpperCase()+'/Nested/';
   const target='/component-playground/'+canonical+'/nested';
   assert.deepEqual(playgroundRedirect(source),{location:target,status:301});
   assert.equal(playgroundRedirect(target),null);
   const response=await handleRequest(new Request('https://production.example'+source+'?agent=Claude&theme=Dark'),{});
   assert.equal(response.status,301);assert.equal(response.headers.get('location'),target+'?agent=claude-code&theme=dark');
  }
 }
 for(const root of ['component','components','playground'])assert.deepEqual(playgroundRedirect('/'+root),{location:'/component-playground',status:301});
});

test('www, case and aliases share one permanent destination',async()=>{
 for(const method of ['GET','HEAD']){
  const r=await handleRequest(new Request('https://www.example.com/COMPONENTS/ICON/?agent=Claude&keep=Case',{method}),{});
  assert.equal(r.status,301);assert.equal(r.headers.get('location'),'https://example.com/component-playground/icons?agent=claude-code&keep=Case');
 }
 const post=await handleRequest(new Request('https://www.example.com/COMPONENTS',{method:'POST'}),{});assert.equal(post.headers.get('location'),null);
});

test('Resources aliases, case, plural forms and queries share the canonical URL',async()=>{
 const {canonicalRedirect}=await import('../lib/workshop-playground-routes.mjs');
 for(const alias of ['','workshop-resources','home','homes','index.html','workshop','workshops','resource','resources','workshop-resource','workshops-resource','workshops-resources','ai','ais','ai-workshop-resource','ai-workshop-resources','ai-workshops-resource','ai-workshops-resources'])for(const suffix of ['','/']){
  const path='/'+alias.toUpperCase()+suffix;
  if(path==='//')continue;
  const url=new URL('https://www.example.com'+path+'?agent=Claude&theme=Moon');
  assert.deepEqual(canonicalRedirect(url),{location:'https://example.com/ai-workshop-resources?agent=claude-code&theme=dark',status:301});
  const r=await handleRequest(new Request(url),{});assert.equal(r.status,301);assert.equal(r.headers.get('location'),'https://example.com/ai-workshop-resources?agent=claude-code&theme=dark');
 }
 assert.equal(canonicalRedirect(new URL('https://example.com/ai-workshop-resources')),null);
});


test('public query names and values canonicalise without changing opaque parameters',async()=>{
 const {canonicalRedirect}=await import('../lib/workshop-playground-routes.mjs');
 for(const method of ['GET','HEAD']){
  const response=await handleRequest(new Request('https://www.example.com/PLAYGROUND/ICON/?AGENT=Claude&Theme=MOON&LOGIN=1&Token=AbC%2FZ+Q&agent=CODEX',{method}),{});
  assert.equal(response.status,301);
  const destination='https://example.com/component-playground/icons?agent=claude-code&theme=dark&show-login=true&Token=AbC%2FZ+Q&agent=codex';
  assert.equal(response.headers.get('location'),destination);
  assert.equal(canonicalRedirect(new URL(destination)),null);
 }
 for(const [query,expected] of [['%41gent=%43ODEX','agent=codex'],['Agent=CODE&agent=CODEX','agent=claude-code&agent=codex']]){
  assert.deepEqual(canonicalRedirect(new URL('https://example.com/ai-workshop-resources?'+query)),{location:'/ai-workshop-resources?'+expected,status:301});
 }
 assert.equal(canonicalRedirect(new URL('https://example.com/ai-workshop-resources?Token=AbC%2FZ+Q&theme=dark')),null);
 const post=await handleRequest(new Request('https://example.com/auth/login?AGENT=CODEX',{method:'POST'}),{});
 assert.equal(post.headers.get('location'),null);
});

test('login aliases redirect to explicit show-login booleans and invalid values disappear',async()=>{
 const {canonicalRedirect}=await import('../lib/workshop-playground-routes.mjs');
 for(const key of ['show-login','login','logged-in','loggedin','logged-out','loggedout'])for(const [inputs,truth] of [[['true','yes','1'],true],[['false','no','0'],false]])for(const input of inputs){
  const alias=key+'='+input,value=String(['logged-in','loggedin'].includes(key)?!truth:truth);
  for(const method of ['GET','HEAD']){
   const response=await handleRequest(new Request('https://www.example.com/Resources/?'+alias.toUpperCase()+'&Token=AbC',{method}),{});
   const destination='https://example.com/ai-workshop-resources?show-login='+value+'&Token=AbC';
   assert.equal(response.status,301);assert.equal(response.headers.get('location'),destination);
   assert.equal(canonicalRedirect(new URL(destination)),null);
  }
 }
 for(const query of ['login=2','login=-1','login=anything','login=','login','loggedin=maybe','loggedout=','show-login=anything']){
  assert.deepEqual(canonicalRedirect(new URL('https://example.com/ai-workshop-resources?'+query)),{status:301,location:'/ai-workshop-resources'});
  assert.deepEqual(canonicalRedirect(new URL('https://example.com/ai-workshop-resources?'+query+'&Token=AbC')), {status:301,location:'/ai-workshop-resources?Token=AbC'});
 }
 assert.deepEqual(canonicalRedirect(new URL('https://example.com/ai-workshop-resources?login=0&logged-out=true')),{status:301,location:'/ai-workshop-resources?show-login=false&show-login=true'});
});

test('all registered path alias families preserve descendants and word pluralisations',async()=>{
 const {canonicalRedirect}=await import('../lib/workshop-playground-routes.mjs');
 const resources=['home','homes','index.html','workshop','workshops','resource','resources','ai','ais'];
 for(const workshop of ['workshop','workshops'])for(const resource of ['resource','resources']){
  resources.push(workshop+'-'+resource);
  for(const ai of ['ai','ais'])resources.push(ai+'-'+workshop+'-'+resource);
 }
 const playground=['style','styles','guide','guides','component','components','playground','playgrounds','component-playground','component-playgrounds','components-playground','components-playgrounds'];
 for(const style of ['style','styles'])for(const guide of ['guide','guides'])playground.push(style+'-'+guide);
 for(const [aliases,target] of [[resources,'/ai-workshop-resources'],[playground,'/component-playground']])for(const alias of aliases){
  const url=new URL('https://example.com/'+alias.toUpperCase()+'/Day-1-Resources/Notes/?Theme=SUN&Agent=CHATGPT&Keep=Case');
  const destination=target+'/day-1-resources/notes?theme=light&agent=codex&Keep=Case';
  assert.deepEqual(canonicalRedirect(url),{location:destination,status:301});
  assert.equal(canonicalRedirect(new URL(destination,url)),null);
 }
 for(const focus of ['focus','focuses','foci'])for(const selection of ['selection','selections']){
  const url=new URL('https://example.com/styles-guides/'+focus+'-and-'+selection+'/Nested/');
  assert.deepEqual(canonicalRedirect(url),{location:'/component-playground/focus-and-selection/nested',status:301});
 }
 for(const easter of ['easter','easters'])for(const egg of ['egg','eggs'])assert.deepEqual(canonicalRedirect(new URL('https://example.com/components/'+easter+'-'+egg+'/Nested/')),{location:'/component-playground/easter-egg/nested',status:301});
 for(const path of ['/unknown','/resources-other/day-1','/style-guidebook/icons','//example.com/path'])assert.equal(canonicalRedirect(new URL('https://example.com'+path)),null);
 assert.deepEqual(canonicalRedirect(new URL('https://example.com/unknown/path/')),{location:'/unknown/path',status:301});
});

test('agent and theme aliases redirect to canonical values, preserving opaque queries',async()=>{
 const {canonicalRedirect}=await import('../lib/workshop-playground-routes.mjs');
 for(const [key,aliases] of [['agent',[['codex','codex'],['chatgpt','codex'],['chatgpt-codex','codex'],['claude','claude-code'],['claude-code','claude-code'],['code','claude-code']]],['theme',[['light','light'],['day','light'],['sun','light'],['dark','dark'],['night','dark'],['moon','dark']]]])for(const [alias,value] of aliases){
  const url=new URL('https://www.example.com/Resources/Day-1/?'+key.toUpperCase()+'='+alias.toUpperCase()+'&Opaque=AbC%2fX+Y');
  const destination='https://example.com/ai-workshop-resources/day-1?'+key+'='+value+'&Opaque=AbC%2fX+Y';
  assert.deepEqual(canonicalRedirect(url),{location:destination,status:301});assert.equal(canonicalRedirect(new URL(destination)),null);
 }
});

test('invalid public preferences are removed while unrelated query bytes survive',async()=>{
 const {canonicalRedirect}=await import('../lib/workshop-playground-routes.mjs');
 for(const query of ['agent=unknown','theme=unknown','agent=','theme','agent=__proto__','theme=constructor','AGENT=INVALID&THEME=INVALID']){
  assert.deepEqual(canonicalRedirect(new URL('https://example.com/ai-workshop-resources?'+query)),{location:'/ai-workshop-resources',status:301});
  assert.deepEqual(canonicalRedirect(new URL('https://example.com/ai-workshop-resources?'+query+'&Token=AbC%2fD+E')),{location:'/ai-workshop-resources?Token=AbC%2fD+E',status:301});
 }
 assert.deepEqual(canonicalRedirect(new URL('https://example.com/guide/icons?agent=bad&agent=CLAUDE&theme=bad&theme=MOON')),{location:'/component-playground/icons?agent=claude-code&theme=dark',status:301});
});

test('URL Reference shortcuts canonicalise roots, sections and descendants in one hop',async()=>{
 const aliases=['url','urls','reference','references','url-reference','url-references','urls-reference','urls-references'];
 const {server}=createPhonePreview();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin='http://127.0.0.1:'+server.address().port;
 try{
  for(const prefix of ['','component-playground/','styles-guides/'])for(const alias of aliases)for(const suffix of ['','/Example/'])for(const method of ['GET','HEAD']){
   const path='/'+(prefix+alias).toUpperCase()+suffix+'?Theme=MOON&Keep=AbC%2FZ+Q';
   const expected='/component-playground/url-reference'+(suffix?'/example':'')+'?theme=dark&Keep=AbC%2FZ+Q';
   for(const response of [await fetch(origin+path,{method,redirect:'manual'}),await handleRequest(new Request('https://production.example'+path,{method}),{})]){assert.equal(response.status,301,path);assert.equal(response.headers.get('location'),expected,path);}
  }
  assert.equal((await fetch(origin+'/url-reference/example')).status,404,'Redirects do not create descendant pages');
  assert.equal((await fetch(origin+'/reference-example',{redirect:'manual'})).status,404,'Segment boundary required');
  assert.equal((await fetch(origin+'/url-reference',{method:'POST',redirect:'manual'})).status,404,'POST does not canonicalise');
  assert.equal((await fetch(origin+'/component-playground/url-reference',{redirect:'manual'})).status,200,'Canonical destination does not redirect');
 }finally{await new Promise(resolve=>server.close(resolve));}
});


test('ai and mode accept every preference value and preserve mixed duplicate order',async()=>{
 const {canonicalRedirect}=await import('../lib/workshop-playground-routes.mjs');
 for(const [key,target,groups] of [['ai','agent',[['codex',['codex','chatgpt','chatgpt-codex']],['claude-code',['claude-code','claude','code']]]],['mode','theme',[['light',['light','day','sun']],['dark',['dark','night','moon']]]]]){
  for(const [canonical,values] of groups)for(const value of values)for(const method of ['GET','HEAD']){
   const response=await handleRequest(new Request('https://example.com/Resources/?'+key.toUpperCase()+'='+value.toUpperCase()+'&Keep=AbC%2FZ+Q',{method}),{});
   assert.equal(response.status,301);assert.equal(response.headers.get('location'),'/ai-workshop-resources?'+target+'='+canonical+'&Keep=AbC%2FZ+Q');
   assert.equal(canonicalRedirect(new URL(response.headers.get('location'),'https://example.com')),null);
  }
  for(const value of ['', 'unknown','__proto__','true','0'])assert.deepEqual(canonicalRedirect(new URL('https://example.com/ai-workshop-resources?'+key+'='+value+'&Keep=Case')),{status:301,location:'/ai-workshop-resources?Keep=Case'});
 }
 assert.deepEqual(canonicalRedirect(new URL('https://example.com/ai-workshop-resources?ai=bad&agent=claude&ai=codex&mode=moon&theme=light&loggedin=no&show-login=0')),{status:301,location:'/ai-workshop-resources?agent=claude-code&agent=codex&theme=dark&theme=light&show-login=true&show-login=false'});
});

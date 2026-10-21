import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {handleRequest,makeVerifier} from '../lib/workshop-handler.mjs';

test('local sign-in, session, logout and independent preview credentials',async()=>{
  const a=createPhonePreview(),b=createPhonePreview();
  a.server.listen(0,'127.0.0.1');b.server.listen(0,'127.0.0.1');
  await Promise.all([once(a.server,'listening'),once(b.server,'listening')]);
  const origin='http://127.0.0.1:'+a.server.address().port;
  const other='http://127.0.0.1:'+b.server.address().port;
  const login=(base,password)=>fetch(base+'/auth/login',{method:'POST',headers:{origin:base,'content-type':'application/x-www-form-urlencoded',accept:'application/json'},body:new URLSearchParams({password})});
  try{
    assert.notEqual(a.password,b.password);
    assert.equal((await login(origin,'wrong')).status,401);
    const response=await login(origin,a.password);assert.equal(response.status,200);
    const cookie=response.headers.get('set-cookie');assert.match(cookie,/^workshop_preview_session=/);assert.match(cookie,/HttpOnly/);assert.doesNotMatch(cookie,/; Secure/);
    const headers={cookie:cookie.split(';')[0]};
    assert.match(await(await fetch(origin,{headers})).text(),/id="workshop-content"/);
    assert.equal((await fetch(origin+'/auth/session',{headers})).status,200);
    assert.equal((await login(other,a.password)).status,401);
    assert.equal((await fetch(other+'/auth/session',{headers})).status,401);
    await fetch(origin+'/auth/logout',{method:'POST',headers:{...headers,origin},redirect:'manual'});
    assert.equal((await fetch(origin+'/auth/session',{headers})).status,401);
    // The production handler has no preview bypass and still requires its configured verifier.
    const req=()=>new Request('https://production.example/auth/login',{method:'POST',headers:{origin:'https://production.example','content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({password:a.password})});
    assert.equal((await handleRequest(req(),{})).status,503);
    const env={WORKSHOP_PASSWORD_VERIFIER:makeVerifier('independent-production-test-credential'),DB:{prepare(){return{bind(){return{async run(){return{}},async first(){return{count:0}}}}}}}};
    assert.equal((await handleRequest(req(),env)).status,401);
  }finally{await Promise.all([new Promise(resolve=>a.server.close(resolve)),new Promise(resolve=>b.server.close(resolve))]);}
});

test('automatic preview sign-in uses an isolated real session and retains login review',async()=>{
 const {server,password}=createPhonePreview({autoLogin:true});server.listen(0,'127.0.0.1');await once(server,'listening');const origin='http://127.0.0.1:'+server.address().port;
 try{
  const first=await fetch(origin);assert.match(await first.text(),/id="workshop-content"/);assert.match(password,/^preview-/);
  const cookie=first.headers.get('set-cookie').split(';')[0];assert.match(cookie,/^workshop_preview_session=/);
  assert.equal((await fetch(origin+'/auth/session',{headers:{cookie}})).status,200);
  assert.equal((await fetch(origin+'/auth/session')).status,401);
  assert.match(await(await fetch(origin+'/?login=false')).text(),/id="access-form"/);
  const logout=await fetch(origin+'/auth/logout',{method:'POST',headers:{cookie,origin},redirect:'manual'});assert.equal(logout.headers.get('location'),'/ai-workshop-resources?login=false');
  assert.equal((await fetch(origin+'/auth/session',{headers:{cookie}})).status,401);
  // A stale cookie after a preview restart is replaced on the next normal visit.
  const again=await fetch(origin,{headers:{cookie}});assert.match(await again.text(),/id="workshop-content"/);assert.notEqual(again.headers.get('set-cookie').split(';')[0],cookie);
 }finally{await new Promise(r=>server.close(r));}
});

test('logout aliases revoke sessions; login=true never creates a local session',async()=>{
 const {server}=createPhonePreview({autoLogin:true});server.listen(0,'127.0.0.1');await once(server,'listening');const origin='http://127.0.0.1:'+server.address().port;
 try{
  for(const query of ['login=false','login=0','hide-login=no','logout=yes','logged-in=false','logged-out=true','SHOW-LOGIN=TRUE']){
   const first=await fetch(origin+'/ai-workshop-resources');const cookie=first.headers.get('set-cookie').split(';')[0];
   const response=await fetch(origin+'/ai-workshop-resources?'+query,{headers:{cookie}});
   assert.equal(new URL(response.url).search,'?login=false');assert.match(await response.text(),/id="access-form"/);
   assert.equal((await fetch(origin+'/auth/session',{headers:{cookie}})).status,401);
  }
  for(const query of ['login=true','login=1','hide-login=yes','logout=no','logged-in=true','logged-out=false']){
   assert.match(await(await fetch(origin+'/ai-workshop-resources?'+query)).text(),/id="access-form"/);
   const first=await fetch(origin+'/ai-workshop-resources');const cookie=first.headers.get('set-cookie').split(';')[0];
   assert.match(await(await fetch(origin+'/ai-workshop-resources?'+query,{headers:{cookie}})).text(),/id="workshop-content"/);
  }
 }finally{await new Promise(r=>server.close(r));}
});

test('explicit login booleans enforce real sessions on every local page',async()=>{
 const {playgroundSections}=await import('../lib/workshop-playground-routes.mjs');
 const {server}=createPhonePreview({autoLogin:true});server.listen(0,'127.0.0.1');await once(server,'listening');const origin='http://127.0.0.1:'+server.address().port;
 try{
  for(const path of ['/ai-workshop-resources','/component-playground',...playgroundSections.map(section=>'/component-playground/'+section)]){
   const locked=await fetch(origin+path+'?login=true');assert.match(await locked.text(),/id="access-form"/,path);
   assert.equal((await fetch(origin+'/auth/session')).status,401);
   const app=await fetch(origin+'/ai-workshop-resources');const cookie=app.headers.get('set-cookie').split(';')[0];
   const unlocked=await fetch(origin+path+'?login=true',{headers:{cookie}});assert.doesNotMatch(await unlocked.text(),/id="access-form"/,path);
   const logout=await fetch(origin+path+'?login=false',{headers:{cookie}});assert.match(await logout.text(),/id="access-form"/,path);
   assert.equal((await fetch(origin+'/auth/session',{headers:{cookie}})).status,401);
  }
  assert.equal((await fetch(origin+'/resources/day-1-resources')).status,404);
  assert.equal((await fetch(origin+'/styles-guides/not-a-page')).status,404);
 }finally{await new Promise(r=>server.close(r));}
});

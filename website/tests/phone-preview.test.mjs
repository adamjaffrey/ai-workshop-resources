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

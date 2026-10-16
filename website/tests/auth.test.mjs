import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {handleRequest,makeVerifier,COOKIE,SESSION_SECONDS} from '../lib/workshop-handler.mjs';
const password='test-only-long-workshop-password';
const verifier=makeVerifier(password);
const origin='https://workshop.example';
function env() {
 const sql=new DatabaseSync(':memory:');
 sql.exec(readFileSync(new URL('../drizzle/0000_early_felicia_hardy.sql',import.meta.url),'utf8'));
 return {WORKSHOP_PASSWORD_VERIFIER:verifier, DB:{prepare(query){return{bind(...values){return{async first(){return sql.prepare(query).get(...values)||null},async run(){return sql.prepare(query).run(...values)}}}}}}};
}
function get(path='/',cookie){return new Request(origin+path,{headers:cookie?{cookie}:{}})}
function post(path='/auth/login',value=password,headers={}){return new Request(origin+path,{method:'POST',headers:{origin,'content-type':'application/x-www-form-urlencoded',accept:'application/json',...headers},body:new URLSearchParams({password:value})})}
async function login(e,now=1000000){const r=await handleRequest(post(),e,now);assert.equal(r.status,200);return r.headers.get('set-cookie')}
test('anonymous visitors receive only login; no protected content or old browser gate',async()=>{
 const e=env(); const r=await handleRequest(get(),e);const body=await r.text();
 assert.equal(r.status,200);assert.match(body,/workshop-password/);assert.doesNotMatch(body,/system-blueprint-creator|system-build-assistant|github.com\/adamjaffrey|const skills|sessionStorage/);
 for(const p of ['/index.html','/?_rsc=123'])assert.doesNotMatch(await (await handleRequest(get(p),e)).text(),/system-blueprint-creator/);
 assert.equal((await handleRequest(get('/dist/index.html'),e)).status,404);
 assert.equal((await handleRequest(get('/auth/session'),e)).status,401);
 assert.match(r.headers.get('cache-control'),/no-store/);
});
test('persistent cookie and server session expire at exactly seven days, without sliding renewal',async()=>{
 const e=env();const now=1000000;const cookie=await login(e,now);
 for(const flag of ['HttpOnly','Secure','SameSite=Lax','Path=/','Max-Age=604800','Expires='])assert.ok(cookie.includes(flag));
 const fresh=await handleRequest(get('/',cookie),e,now+1000);
 assert.match(await fresh.text(),/system-blueprint-creator/);assert.equal(fresh.headers.get('set-cookie'),null);
 assert.equal((await handleRequest(get('/auth/session',cookie),e,now+SESSION_SECONDS*1000-1)).status,200);
 assert.equal((await handleRequest(get('/auth/session',cookie),e,now+SESSION_SECONDS*1000)).status,401);
 assert.doesNotMatch(await (await handleRequest(get('/',cookie),e,now+SESSION_SECONDS*1000+1)).text(),/system-blueprint-creator/);
});
test('wrong password and forged cookies never unlock',async()=>{
 const e=env();assert.equal((await handleRequest(post('/auth/login','incorrect'),e)).status,401);
 assert.equal((await handleRequest(get('/auth/session',COOKIE+'='+'a'.repeat(64)),e)).status,401);
 const cookie=await login(e);assert.equal((await handleRequest(get('/auth/session',cookie+'; '+COOKIE+'='+'a'.repeat(64)),e,1000001)).status,401);
});
test('logout revokes the server session and clears its cookie',async()=>{
 const e=env();const cookie=await login(e);const r=await handleRequest(post('/auth/logout','',{cookie}),e,1000001);
 assert.equal(r.status,303);assert.match(r.headers.get('set-cookie'),/Max-Age=0/);
 assert.equal((await handleRequest(get('/auth/session',cookie),e,1000002)).status,401);
});
test('password rotation invalidates existing sessions',async()=>{
 const e=env(); const cookie=await login(e);e.WORKSHOP_PASSWORD_VERIFIER=makeVerifier('different-test-password');
 assert.equal((await handleRequest(get('/auth/session',cookie),e,1000001)).status,401);
});
test('cross-origin writes and oversized bodies are rejected',async()=>{
 const e=env();assert.equal((await handleRequest(post('/auth/login',password,{origin:'https://evil.example'}),e)).status,403);
 assert.equal((await handleRequest(post('/auth/logout','',{origin:'https://evil.example'}),e)).status,403);
 assert.equal((await handleRequest(post('/auth/login','a'.repeat(5000)),e)).status,413);
});
test('persisted attempts throttle even across handler calls, then reset next window',async()=>{
 const e=env();for(let i=0;i<50;i++)assert.equal((await handleRequest(post('/auth/login',''),e,1000)).status,401);
 const r=await handleRequest(post(),e,1000);assert.equal(r.status,429);assert.equal(r.headers.get('retry-after'),'900');
 assert.equal((await handleRequest(post(),e,901000)).status,200);
});
test('missing configuration and database failure fail closed',async()=>{
 assert.equal((await handleRequest(get(),{})).status,503);
 const e=env();e.DB.prepare=()=>{throw Error('database down')};
 const r=await handleRequest(post(),e);assert.equal(r.status,503);assert.doesNotMatch(await r.text(),/system-blueprint-creator/);
});

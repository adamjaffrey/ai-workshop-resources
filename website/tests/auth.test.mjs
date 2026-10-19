import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {playgroundPage} from '../scripts/playground.mjs';
import {handleRequest,makeVerifier,COOKIE,SESSION_SECONDS} from '../lib/workshop-handler.mjs';
const password='test-only-long-workshop-password';
const verifier=makeVerifier(password);
const origin='https://workshop.example';
function env() {
 const sql=new DatabaseSync(':memory:');
 sql.exec(readFileSync(new URL('../drizzle/0000_early_felicia_hardy.sql',import.meta.url),'utf8'));
 return {WORKSHOP_PASSWORD_VERIFIER:verifier, DB:{prepare(query){return{bind(...values){return{async first(){return sql.prepare(query).get(...values)||null},async run(){return sql.prepare(query).run(...values)}}}}}}};
}
function get(path='/ai-workshop-resources',cookie){return new Request(origin+path,{headers:cookie?{cookie}:{}})}
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
 const fresh=await handleRequest(get('/ai-workshop-resources',cookie),e,now+1000);
 assert.match(await fresh.text(),/system-blueprint-creator/);assert.equal(fresh.headers.get('set-cookie'),null);
 assert.equal((await handleRequest(get('/auth/session',cookie),e,now+SESSION_SECONDS*1000-1)).status,200);
 assert.equal((await handleRequest(get('/auth/session',cookie),e,now+SESSION_SECONDS*1000)).status,401);
 assert.doesNotMatch(await (await handleRequest(get('/ai-workshop-resources',cookie),e,now+SESSION_SECONDS*1000+1)).text(),/system-blueprint-creator/);
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
 const r=await handleRequest(post(),e,1000);assert.equal(r.status,429);assert.equal(r.headers.get('retry-after'),'899');
 assert.equal((await handleRequest(post(),e,901000)).status,200);
});
test('missing configuration and database failure fail closed',async()=>{
 const unavailable=await handleRequest(get(),{});assert.equal(unavailable.status,503);
 assert.match(unavailable.headers.get('content-type'),/text\/html/);
 const html=await unavailable.text();assert.match(html,/workshop-password/);assert.match(html,/Sign-in unavailable/);
 assert.doesNotMatch(html,/system-blueprint-creator/);
 const e=env();e.DB.prepare=()=>{throw Error('database down')};
 const r=await handleRequest(post(),e);assert.equal(r.status,503);assert.doesNotMatch(await r.text(),/system-blueprint-creator/);
});
test('hosted playground shares the main session and never exposes specimens anonymously',async()=>{
 const e=env(),now=1000000;
 for(const path of ['/component-playground','/component-playground?test=1']){
  const r=await handleRequest(get(path),e,now);const text=await r.text();assert.match(text,/workshop-password/);assert.doesNotMatch(text,/id="playground-title"|system-blueprint-creator|srcdoc=/);assert.match(r.headers.get('cache-control'),/no-store/);
 }
 const cookie=await login(e,now);
 for(const path of ['/ai-workshop-resources','/component-playground']){const r=await handleRequest(get(path,cookie),e,now+1,{renderPlayground:()=>playgroundPage({authenticated:true})});assert.equal(r.status,200);assert.match(await r.text(),path==='/ai-workshop-resources'?/system-blueprint-creator/:/Component Playground/);assert.equal(r.headers.get('set-cookie'),null);}
 const expired=await handleRequest(get('/component-playground',cookie),e,now+SESSION_SECONDS*1000);assert.doesNotMatch(await expired.text(),/id="playground-title"|srcdoc=/);
 await handleRequest(post('/auth/logout','',{cookie}),e,now+2);
 assert.doesNotMatch(await(await handleRequest(get('/component-playground',cookie),e,now+3)).text(),/id="playground-title"|srcdoc=/);
});

test('service failures preserve every login destination, background and query URL',async()=>{
 const paths=['/ai-workshop-resources','/component-playground',...['components','typography','colours','blocks-and-blur','icons','status-states','focus-and-selection','branding','easter-egg'].map(x=>'/component-playground/'+x)];
 for(const path of paths)for(const failure of ['missing-config','invalid-verifier','database']){
  const e=failure==='missing-config'?{}:env();
  if(failure==='invalid-verifier')e.WORKSHOP_PASSWORD_VERIFIER='invalid';
  if(failure==='database')e.DB.prepare=()=>{throw Error('database unavailable');};
  const request=get(path+'?theme=dark&agent=claude-code',COOKIE+'='+'a'.repeat(64));
  const response=await handleRequest(request,e);const html=await response.text();
  assert.equal(response.status,503,path+' '+failure);assert.equal(response.headers.get('location'),null);
  assert.equal(request.url,origin+path+'?theme=dark&agent=claude-code');
  assert.match(html,/Sign-in unavailable/);assert.match(html,/id="access-form"/);
  assert.equal(html.includes('class="page-placeholder playground-placeholder"'),path.startsWith('/component-playground'));
  if(path.startsWith('/component-playground'))assert.match(html,/src="\/login-backdrop\/components/);
  assert.doesNotMatch(html,/system-blueprint-creator|system-build-assistant|__NONCE__/);
 }
});

test('show-login logs out hosted sessions and false never authenticates',async()=>{
 for(const path of ['/ai-workshop-resources','/component-playground','/component-playground/icons']){
  const e=env(),now=1000000,cookie=await login(e,now);
  const options={renderPlayground:()=>'<div id="playground-title">protected</div>'};
  const kept=await handleRequest(get(path+'?show-login=false',cookie),e,now+1,options);
  assert.doesNotMatch(await kept.text(),/id="access-form"/);
  assert.equal((await handleRequest(get('/auth/session',cookie),e,now+2)).status,200);
  const out=await handleRequest(get(path+'?show-login=true',cookie),e,now+3,options);
  assert.match(await out.text(),/id="access-form"/);assert.match(out.headers.get('set-cookie'),/Max-Age=0/);
  assert.equal((await handleRequest(get('/auth/session',cookie),e,now+4)).status,401);
  const locked=await handleRequest(get(path+'?show-login=false',cookie),e,now+5,options);
  assert.match(await locked.text(),/id="access-form"/);
 }
});

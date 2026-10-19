import {playgroundPlaceholderDocument} from './workshop-playground-placeholder.mjs';
import {isPlaygroundPath,canonicalRedirect} from './workshop-playground-routes.mjs';
import { randomBytes, createHash, createHmac, scryptSync, timingSafeEqual } from 'node:crypto';
import {loginMessages, loginRetryMessage, loginControlLabels} from './workshop-login-messages.mjs';
import { loginPage, playgroundLoginPage, resourcePage } from './workshop-pages.mjs';

export const SESSION_SECONDS = 7 * 24 * 60 * 60;
export const COOKIE = '__Host-workshop_session';
const ATTEMPT_WINDOW = 15 * 60;
const MAX_BODY = 4096;
const sha = value => createHash('sha256').update(value).digest('hex');

export function makeVerifier(password, salt = randomBytes(16).toString('hex')) {
  const derived = scryptSync(password, salt, 32, {N:32768, r:8, p:3, maxmem:64*1024*1024});
  return `scrypt$32768$8$3$${salt}$${derived.toString('hex')}`;
}
function validVerifier(value) {
  return typeof value === 'string' && /^scrypt\$32768\$8\$3\$[a-f0-9]{32}\$[a-f0-9]{64}$/.test(value);
}
function verify(password, verifier) {
  const salt = verifier.split('$')[4];
  return timingSafeEqual(Buffer.from(makeVerifier(password, salt).split('$')[5], 'hex'), Buffer.from(verifier.split('$')[5], 'hex'));
}
function tokenFrom(request) {
  const values = (request.headers.get('cookie') || '').split(';').map(x => x.trim()).filter(x => x.startsWith(COOKIE+'='));
  if (values.length !== 1) return null;
  const token = values[0].slice(COOKIE.length+1);
  return /^[a-f0-9]{64}$/.test(token) ? token : null;
}
function cookie(token, now, ttl = SESSION_SECONDS) {
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${ttl}; Expires=${new Date(now + ttl * 1000).toUTCString()}`;
}
async function readSession(request, db, version, now) {
  const token = tokenFrom(request);
  if (!token) return null;
  return db.prepare('SELECT expires_at FROM workshop_sessions WHERE token_hash = ? AND expires_at > ? AND password_version = ?').bind(sha(token), now, version).first();
}
async function limited(request, db, verifier, now) {
  const window = Math.floor(now / (ATTEMPT_WINDOW*1000));
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const identity = createHmac('sha256', verifier).update(ip).digest('hex');
  // Atomic persisted counters, shared by all server instances; no raw IP stored.
  for (const [name, limit] of [[`global:${window}`,1000],[`${identity}:${window}`,50]]) {
    const row = await db.prepare('INSERT INTO workshop_attempts (key, count, expires_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count = count + 1 RETURNING count').bind(name, (window+1)*ATTEMPT_WINDOW*1000).first();
    if (!row || row.count > limit) return true;
  }
  return false;
}
async function bodyText(request) {
  if (Number(request.headers.get('content-length')) > MAX_BODY) throw new Error('body-size');
  if (!request.body) return '';
  const reader = request.body.getReader(); const chunks=[]; let size=0;
  for (;;) {
    const {done,value}=await reader.read(); if(done) break;
    size += value.byteLength;
    if(size>MAX_BODY) { await reader.cancel(); throw new Error('body-size'); }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export async function handleRequest(request, env, now = Date.now(), options = {}) {
  const nonce = randomBytes(18).toString('base64');
  const headers = {
    'Cache-Control':'private, no-store, max-age=0',
    'Pragma':'no-cache', 'Vary':'Cookie',
    'X-Content-Type-Options':'nosniff',
    'Referrer-Policy':'same-origin',
    'X-Frame-Options':'DENY',
    'Content-Security-Policy':`default-src 'none'; script-src 'self' 'nonce-${nonce}'; style-src 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'self' about:; base-uri 'none'; form-action 'self'; frame-ancestors 'none'`,
  };
  const reply = (body,status=200,extra={}) => new Response(request.method==='HEAD'?null:body,{status,headers:{...headers,...extra}});
  const json = (data,status=200,extra={}) => reply(JSON.stringify(data),status,{'Content-Type':'application/json',...extra});
  const path = new URL(request.url).pathname;
  if (!['GET','HEAD','POST'].includes(request.method)) return reply('Method not allowed',405,{'Allow':'GET, HEAD, POST'});
  const redirect=canonicalRedirect(new URL(request.url));
  if(redirect&&['GET','HEAD'].includes(request.method))return reply(null,redirect.status,{Location:redirect.location});
  if (path==='/robots.txt') return reply('User-agent: *\nDisallow: /\n',200,{'Content-Type':'text/plain'});
  if (path==='/login.js' && request.method!=='POST') return reply(loginScript,200,{'Content-Type':'text/javascript; charset=utf-8'});
  // Public decorative geometry only. This route cannot render authenticated content.
  if(path==='/login-backdrop/components' && request.method!=='POST') {
    const url=new URL(request.url);
    return reply(playgroundPlaceholderDocument(url.searchParams.get('theme'),url.searchParams.get('agent')),200,{
      'Content-Type':'text/html; charset=utf-8','X-Frame-Options':'SAMEORIGIN',
      'Content-Security-Policy':"default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; img-src 'self' data:; font-src 'none'; frame-src 'self' about:; base-uri 'none'; form-action 'none'; frame-ancestors 'self'",
    });
  }
  const unavailable = () => {
    const message = loginMessages.service;
    if (request.method === 'POST' || path === '/auth/session') return json({error:message},503);
    const page = loginPage.replace('class="gate-error"', 'class="gate-error is-error"')
      .replace('data-status-icon="error" hidden', 'data-status-icon="error"')
      .replace('<span></span></p>', '<span>' + message + '</span></p>');
    return reply(page.replaceAll('__NONCE__',nonce),503,{'Content-Type':'text/html; charset=utf-8'});
  };
  if (!env.DB || !validVerifier(env.WORKSHOP_PASSWORD_VERIFIER)) return unavailable();
  try {
    const version=sha(env.WORKSHOP_PASSWORD_VERIFIER);
    if (request.method==='POST') {
      if (!['/auth/login','/auth/logout'].includes(path)) return reply('Not found',404);
      if (request.headers.get('origin') !== new URL(request.url).origin || request.headers.get('sec-fetch-site')==='cross-site') return reply('Request not allowed',403);
      if(path==='/auth/logout') {
        const token=tokenFrom(request);
        if(token) await env.DB.prepare('DELETE FROM workshop_sessions WHERE token_hash = ?').bind(sha(token)).run();
        return reply(null,303,{'Location':'/workshop-resources','Set-Cookie':cookie('',now,0)});
      }
      if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) return json({error:'Unsupported request format.'},415);
      // Remove expired records without a scheduled job or schema mutation.
      await env.DB.prepare('DELETE FROM workshop_sessions WHERE expires_at <= ?').bind(now).run();
      await env.DB.prepare('DELETE FROM workshop_attempts WHERE expires_at <= ?').bind(now).run();
      if(await limited(request,env.DB,env.WORKSHOP_PASSWORD_VERIFIER,now)) {
        const retryAfter = Math.ceil((ATTEMPT_WINDOW*1000 - now % (ATTEMPT_WINDOW*1000))/1000);
        return json({error:loginMessages.limitedLater},429,{'Retry-After':String(retryAfter)});
      }
      let raw;
      try { raw=await bodyText(request); } catch { return json({error:'Request too large.'},413); }
      const password=new URLSearchParams(raw).get('password');
      if(!password || Buffer.byteLength(password)>1024 || !verify(password,env.WORKSHOP_PASSWORD_VERIFIER)) return json({error:loginMessages.wrong},401);
      const token=randomBytes(32).toString('hex');
      const expires=now+SESSION_SECONDS*1000;
      const previous=tokenFrom(request);
      if(previous) await env.DB.prepare('DELETE FROM workshop_sessions WHERE token_hash = ?').bind(sha(previous)).run();
      await env.DB.prepare('INSERT INTO workshop_sessions (token_hash, expires_at, password_version) VALUES (?, ?, ?)').bind(sha(token),expires,version).run();
      const extra={'Set-Cookie':cookie(token,now)};
      if(request.headers.get('accept')?.includes('application/json')) return json({ok:true,expiresAt:expires},200,extra);
      return reply(null,303,{...extra,'Location':'/workshop-resources'});
    }
    const session=await readSession(request,env.DB,version,now);
    if(path==='/auth/session') return session?json({expiresAt:session.expires_at}):json({error:'Please sign in again.'},401,{'Set-Cookie':cookie('',now,0)});
    if(isPlaygroundPath(path) && session) {
      const html=options.renderPlayground ? await options.renderPlayground() : (await import('./workshop-playground.generated.mjs')).playgroundPage;
      return reply(html.replaceAll('__SESSION_EXPIRES__',String(session.expires_at)),200,{'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':"default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"});
    }
    if(!['/workshop-resources'].includes(path)&&!isPlaygroundPath(path)) return reply('Not found',404);
    const page=session?resourcePage.replace('__SESSION_EXPIRES__',String(session.expires_at)):(isPlaygroundPath(path)?playgroundLoginPage:loginPage);
    return reply(page.replaceAll('__NONCE__',nonce),200,{'Content-Type':'text/html; charset=utf-8',...(!session?{'Set-Cookie':cookie('',now,0)}:{})});
  } catch {
    // Fail closed. Do not log requests, passwords, verifier values or cookies.
    return unavailable();
  }
}

const loginScript = `
const loginMessages=${JSON.stringify(loginMessages)};
const loginControlLabels=${JSON.stringify(loginControlLabels)};
const loginRetryMessage=${loginRetryMessage.toString()};
const form=document.getElementById('access-form');
const password=document.getElementById('workshop-password');
const button=form.querySelector('button[type="submit"]');
const error=document.getElementById('gate-error');
const message=error.querySelector('span');
const announcement=document.getElementById('login-announcement');
// Focus the heading without opening a software keyboard or scrolling the page.
window.workshopFocusPanel(document.getElementById('access-gate'));
const gate=document.getElementById('access-gate');
const viewport=window.visualViewport;
function fitViewport() {
  gate.style.setProperty('--gate-height',(viewport?.height ?? innerHeight)+'px');
  gate.style.setProperty('--gate-top',(viewport?.offsetTop ?? 0)+'px');
  if(document.activeElement===password) password.scrollIntoView({block:'nearest',behavior:'instant'});
}
viewport?.addEventListener('resize',fitViewport);
viewport?.addEventListener('scroll',fitViewport);
window.addEventListener('resize',fitViewport);
password.addEventListener('focus',()=>requestAnimationFrame(fitViewport));
fitViewport();
// The two halves are one Tab stop; either half still works with pointer input.
const theme=form.querySelector('.theme-toggle');
function syncThemeTabStop() {
  const target=theme.contains(document.activeElement) ? document.activeElement : theme.querySelector('[aria-pressed="true"]');
  theme.querySelectorAll('button').forEach(item=>item.tabIndex=item===target?0:-1);
}
document.addEventListener('DOMContentLoaded',syncThemeTabStop);
theme.addEventListener('focusin',syncThemeTabStop);
new MutationObserver(syncThemeTabStop).observe(theme,{subtree:true,attributes:true,attributeFilter:['aria-pressed']});
let busy=false;
let retryUntil=0;
let retryTimer;
const genericFailure=loginMessages.generic;
const serviceFailure=loginMessages.service;
function setStatus(state,text) {
  error.classList.remove('is-loading','is-success','is-error','is-info');
  error.classList.add('is-'+state);
  const visibleText=state==='error'?text:'';
  if(message.textContent!==visibleText) message.textContent=visibleText;
  announcement.textContent=state==='error'?'':text;
  const inputIcon=state==='loading'||state==='success'?state:'lock';
  form.querySelectorAll('[data-input-icon]').forEach(icon=>icon.toggleAttribute('hidden',icon.dataset.inputIcon!==inputIcon));
  error.querySelectorAll('[data-status-icon]').forEach(icon=>icon.toggleAttribute('hidden',icon.dataset.statusIcon!==state));
  form.classList.toggle('is-success',state==='success');
}
function release() {
  busy=false; button.disabled=false; button.removeAttribute('aria-busy');
}
function showFailure(text,invalid=false,shake=false,focusInput=true) {
  setStatus('error',text);
  if(invalid) {
    if(focusInput){password.focus();password.setSelectionRange(password.value.length,password.value.length);}password.setAttribute('aria-invalid','true');
  }
  if(shake) { form.classList.add('is-password-error');void form.offsetWidth;form.classList.add('shake'); }
  release();
}
function updateRetry() {
  const seconds=Math.max(0,Math.ceil((retryUntil-Date.now())/1000));
  if(!seconds) {
    clearInterval(retryTimer);retryUntil=0;button.disabled=false;
    setStatus('info',loginMessages.retryReady);return;
  }
  const minutes=Math.ceil(seconds/60);
  const duration=seconds<60?'less than a minute':minutes+' '+(minutes===1?'minute':'minutes');
  setStatus('error',loginRetryMessage(duration));
  button.disabled=true;
}
function resetPasswordError() {
  if(busy)return;
  password.removeAttribute('aria-invalid');form.classList.remove('shake','is-password-error');
}
password.addEventListener('input',()=>{
  resetPasswordError();
  if(!busy&&!retryUntil) setStatus('info','');
});
form.addEventListener('submit',async event=>{
  event.preventDefault();if(busy||retryUntil>Date.now())return;
  form.classList.remove('shake','is-password-error');password.removeAttribute('aria-invalid');
  if(!password.value) { showFailure(loginMessages.empty,true);return; }
  busy=true;button.disabled=true;button.setAttribute('aria-busy','true');
  setStatus('loading',loginMessages.loading);
  let response;
  try {
    response=await fetch('/auth/login',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},body:new URLSearchParams({password:password.value})});
  } catch {
    showFailure(loginMessages.network);return;
  }
  if(response.status===401) {
    showFailure(loginMessages.wrong,true,true);return;
  }
  if(response.status===429) {
    const retryHeader=response.headers.get('Retry-After');
    const seconds=Number(retryHeader);
    const delay=retryHeader && Number.isFinite(seconds)&&seconds>0?seconds*1000:Date.parse(retryHeader)-Date.now();
    if(!Number.isFinite(delay)||delay<=0) {showFailure(loginMessages.limitedLater);return;}
    release();retryUntil=Date.now()+delay;updateRetry();
    clearInterval(retryTimer);retryTimer=setInterval(updateRetry,1000);return;
  }
  if(!response.ok) {showFailure(response.status>=500?serviceFailure:genericFailure);return;}
  let result;
  try {result=await response.json();} catch {showFailure(genericFailure);return;}
  if(result?.ok!==true) {showFailure(genericFailure);return;}
  password.setSelectionRange(password.value.length,password.value.length);password.readOnly=true;
  setStatus('success',loginMessages.success);button.removeAttribute('aria-busy');
  button.textContent=loginControlLabels.opening;
  setTimeout(()=>{password.value='';const target=new URL(location.href);if(!target.pathname.startsWith('/component-playground')){target.pathname='/workshop-resources';target.searchParams.delete('login');}location.replace(target.pathname+target.search+target.hash);},900);
});
`;

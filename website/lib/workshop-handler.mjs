import { randomBytes, createHash, createHmac, scryptSync, timingSafeEqual } from 'node:crypto';
import { loginPage, resourcePage } from './workshop-pages.mjs';

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

export async function handleRequest(request, env, now = Date.now()) {
  const nonce = randomBytes(18).toString('base64');
  const headers = {
    'Cache-Control':'private, no-store, max-age=0',
    'Pragma':'no-cache', 'Vary':'Cookie',
    'X-Content-Type-Options':'nosniff',
    'Referrer-Policy':'same-origin',
    'X-Frame-Options':'DENY',
    'Content-Security-Policy':`default-src 'none'; script-src 'self' 'nonce-${nonce}'; style-src 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'`,
  };
  const reply = (body,status=200,extra={}) => new Response(request.method==='HEAD'?null:body,{status,headers:{...headers,...extra}});
  const json = (data,status=200,extra={}) => reply(JSON.stringify(data),status,{'Content-Type':'application/json',...extra});
  const path = new URL(request.url).pathname;
  if (!['GET','HEAD','POST'].includes(request.method)) return reply('Method not allowed',405,{'Allow':'GET, HEAD, POST'});
  if (path==='/robots.txt') return reply('User-agent: *\nDisallow: /\n',200,{'Content-Type':'text/plain'});
  if (path==='/login.js' && request.method!=='POST') return reply(loginScript,200,{'Content-Type':'text/javascript; charset=utf-8'});
  if (!env.DB || !validVerifier(env.WORKSHOP_PASSWORD_VERIFIER)) return reply('Workshop access is temporarily unavailable. Please try again later.',503);
  try {
    const version=sha(env.WORKSHOP_PASSWORD_VERIFIER);
    if (request.method==='POST') {
      if (!['/auth/login','/auth/logout'].includes(path)) return reply('Not found',404);
      if (request.headers.get('origin') !== new URL(request.url).origin || request.headers.get('sec-fetch-site')==='cross-site') return reply('Request not allowed',403);
      if(path==='/auth/logout') {
        const token=tokenFrom(request);
        if(token) await env.DB.prepare('DELETE FROM workshop_sessions WHERE token_hash = ?').bind(sha(token)).run();
        return reply(null,303,{'Location':'/','Set-Cookie':cookie('',now,0)});
      }
      if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) return json({error:'Unsupported request format.'},415);
      // Remove expired records without a scheduled job or schema mutation.
      await env.DB.prepare('DELETE FROM workshop_sessions WHERE expires_at <= ?').bind(now).run();
      await env.DB.prepare('DELETE FROM workshop_attempts WHERE expires_at <= ?').bind(now).run();
      if(await limited(request,env.DB,env.WORKSHOP_PASSWORD_VERIFIER,now)) return json({error:'Too many attempts. Please wait 15 minutes and try again.'},429,{'Retry-After':String(ATTEMPT_WINDOW)});
      let raw;
      try { raw=await bodyText(request); } catch { return json({error:'Request too large.'},413); }
      const password=new URLSearchParams(raw).get('password');
      if(!password || Buffer.byteLength(password)>1024 || !verify(password,env.WORKSHOP_PASSWORD_VERIFIER)) return json({error:'That password isn’t correct. Please try again.'},401);
      const token=randomBytes(32).toString('hex');
      const expires=now+SESSION_SECONDS*1000;
      const previous=tokenFrom(request);
      if(previous) await env.DB.prepare('DELETE FROM workshop_sessions WHERE token_hash = ?').bind(sha(previous)).run();
      await env.DB.prepare('INSERT INTO workshop_sessions (token_hash, expires_at, password_version) VALUES (?, ?, ?)').bind(sha(token),expires,version).run();
      const extra={'Set-Cookie':cookie(token,now)};
      if(request.headers.get('accept')?.includes('application/json')) return json({ok:true,expiresAt:expires},200,extra);
      return reply(null,303,{...extra,'Location':'/'});
    }
    const session=await readSession(request,env.DB,version,now);
    if(path==='/auth/session') return session?json({expiresAt:session.expires_at}):json({error:'Please sign in again.'},401,{'Set-Cookie':cookie('',now,0)});
    if(path!=='/' && path!=='/index.html') return reply('Not found',404);
    const page=session?resourcePage.replace('__SESSION_EXPIRES__',String(session.expires_at)):loginPage;
    return reply(page.replaceAll('__NONCE__',nonce),200,{'Content-Type':'text/html; charset=utf-8',...(!session?{'Set-Cookie':cookie('',now,0)}:{})});
  } catch {
    // Fail closed. Do not log requests, passwords, verifier values or cookies.
    return reply('Workshop access is temporarily unavailable. Please try again later.',503);
  }
}

const loginScript = `
const form=document.getElementById('access-form');
const password=document.getElementById('workshop-password');
const button=form.querySelector('button[type="submit"]');
const error=document.getElementById('gate-error');
const message=error.querySelector('span');
// Focus the heading without opening a software keyboard or scrolling the page.
document.getElementById('gate-title').focus({preventScroll:true});
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
form.addEventListener('submit',async event=>{
  event.preventDefault(); if(busy)return; busy=true; button.disabled=true;
  message.textContent='Checking…'; password.removeAttribute('aria-invalid');
  try {
    const response=await fetch('/auth/login',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},body:new URLSearchParams({password:password.value})});
    const result=await response.json();
    if(!response.ok)throw new Error(result.error||'Unable to sign in. Please try again.');
    password.value='';password.readOnly=true;
    form.classList.add('is-success'); error.classList.add('is-success');error.querySelector('svg').removeAttribute('hidden');
    message.textContent='Access granted';button.textContent='Opening Resources…';
    setTimeout(()=>location.replace('/'),900);
  } catch(failure) {
    message.textContent=failure.message==='Failed to fetch'?'Unable to connect. Please try again.':failure.message;
    form.classList.remove('shake');void form.offsetWidth;form.classList.add('shake');
    password.setAttribute('aria-invalid','true');password.focus();password.select();busy=false;button.disabled=false;
  }
});
`;

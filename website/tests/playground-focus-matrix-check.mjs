import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {resourcePage,loginPage} from '../lib/workshop-pages.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
const strip=html=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
const metrics=e=>{const c=getComputedStyle(e);return [c.color,c.backgroundColor,c.borderRadius,c.fontSize,c.fontWeight,c.lineHeight,c.outlineColor,c.outlineWidth];};
try{
 const p=await browser.newPage(),source=await browser.newPage(),login=await browser.newPage();await source.setContent(strip(resourcePage));await login.setContent(strip(loginPage));await p.goto('http://127.0.0.1:'+server.address().port+'/playground');await p.locator('[data-tab=focus]').click();const f=p.frameLocator('#focus-frame');await f.locator('.focus-row').last().waitFor();await p.waitForTimeout(600);
 for(const width of [320,390,768,1440]){
 await p.setViewportSize({width,height:900});
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
 const before=await f.locator('#focus-catalog').getAttribute('data-capture-id');
 await p.evaluate(({theme,agent})=>{for(const [name,value] of Object.entries({theme,agent})){const el=document.querySelector('input[name="'+name+'"][value="'+value+'"]');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}},{theme,agent});

 await f.locator('#focus-catalog').evaluate((e,before)=>new Promise(resolve=>{const done=()=>{if(e.dataset.captureId!==before){observer.disconnect();resolve();}};const observer=new MutationObserver(done);observer.observe(e,{attributes:true});done();}),before);await p.waitForTimeout(250);
 for(const app of [source,login])await app.evaluate(({theme,agent})=>{Object.assign(document.documentElement.dataset,{theme,selectedAgent:agent,focusInput:'keyboard'});},{theme,agent});
 for(const selector of ['.copy','.qr-copy','footer form[action="/auth/logout"] button']){await source.locator(selector).first().focus();assert.deepEqual(await f.locator(selector==='footer form[action="/auth/logout"] button'?'footer [data-focus-target]':'[data-focus-target]'+selector).first().evaluate(metrics),await source.locator(selector).first().evaluate(metrics));}
 // Check app-scoped surface rules as well as text and control styles.
 assert.equal(await f.locator('.code-wrap').first().evaluate(e=>getComputedStyle(e).backgroundColor),await source.locator('.code-wrap').first().evaluate(e=>getComputedStyle(e).backgroundColor));
 for(const state of ['Neutral','Checking','Success','Incorrect Password']){
 await login.locator('.gate-panel').evaluate((e,state)=>{e.classList.toggle('is-success',state==='Success');e.classList.toggle('is-password-error',state==='Incorrect Password');},state);await login.locator('input').focus();await login.waitForTimeout(180);
 const row=f.locator('.focus-row').filter({has:f.locator('h3',{hasText:'Password · '+state})});assert.deepEqual(await row.locator('.password-field').evaluate(metrics),await login.locator('.password-field').evaluate(metrics));
 }
 assert.equal(await f.locator('body').evaluate(e=>e.scrollWidth<=e.clientWidth+1),true,'No horizontal clipping/overflow '+width);
 const positions=await f.locator('.focus-row').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().top));await p.waitForTimeout(250);assert.deepEqual(await f.locator('.focus-row').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().top)),positions,'No late row jump');
 }
 }
 await p.evaluate(async()=>{for(const value of ['codex','claude-code','codex','claude-code']){const el=document.querySelector('input[name=agent][value="'+value+'"]');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,20));}});await p.waitForTimeout(800);assert.equal(await f.locator('.toggle [data-agent][aria-pressed=true]').getAttribute('data-agent'),'claude-code');await p.waitForTimeout(300);assert.equal(await f.locator('.toggle [data-agent][aria-pressed=true]').getAttribute('data-agent'),'claude-code');
 console.log('PASS: 16 viewport/theme/agent combinations match independent app control styles, password rings, prompt surfaces; no horizontal overflow or late layout jumps');
}finally{await browser.close();server.close();}

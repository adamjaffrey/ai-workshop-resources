import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext(),app=await context.newPage(),play=await context.newPage(),errors=[];
 for(const page of [app,play])page.on('pageerror',e=>errors.push(e.message));
 const base='http://127.0.0.1:'+server.address().port;
 await app.goto(base+'/ai-workshop-resources');await play.goto(base+'/component-playground?agent=codex&theme=light');
 await play.frameLocator('#resources-frame').locator('h1').waitFor();
 await play.evaluate(()=>{window.busy=setInterval(()=>document.dispatchEvent(new Event('pointermove')),60);window.bulkTransitions=0;const original=window.workshopColourTransition;window.workshopColourTransition=(...args)=>{bulkTransitions++;return original(...args);};});
 const choose=(page,id,value)=>page.evaluate(({id,value})=>{const node=document.querySelector('#'+id+' input[value="'+value+'"]');node.click();},{id,value});
 const verify=async(agent,theme)=>{
  for(const page of [app,play])await page.waitForFunction(({agent,theme})=>document.documentElement.dataset.selectedAgent===agent&&document.documentElement.dataset.theme===theme,{agent,theme});
  await play.waitForFunction(({agent,theme})=>document.querySelector('#agent input:checked').value===agent&&document.querySelector('#theme input:checked').value===theme&&!document.getElementById('resources-frame').style.visibility,{agent,theme});
  assert.equal(await app.locator('.controls [aria-pressed=true]').getAttribute('data-agent'),agent);
  assert.equal(await app.locator('.theme-toggle [aria-pressed=true]').getAttribute('data-theme-choice'),theme);
  assert.equal(await play.frameLocator('#resources-frame').locator('html').getAttribute('data-selected-agent'),agent);
  assert.equal(await play.frameLocator('#resources-frame').locator('html').getAttribute('data-theme'),theme);
 };
 await app.locator('[data-agent="claude-code"]').click();await verify('claude-code','light');
 await app.locator('[data-theme-choice="dark"]').click();await verify('claude-code','dark');
 await choose(play,'agent','codex');await choose(play,'theme','light');await verify('codex','light');
 // A remote update interrupts a local circular reveal; the newest stored state wins.
 await app.evaluate(()=>document.querySelector('[data-theme-choice=dark]').click());
 await choose(play,'theme','dark');await choose(play,'theme','light');await app.waitForTimeout(700);await verify('codex','light');
 for(const agent of ['claude-code','codex','claude-code'])await app.evaluate(agent=>window.workshopAgent.select(agent),agent);
 await verify('claude-code','light');
 assert.equal(await play.evaluate(()=>bulkTransitions),0,'cross-tab changes do not scan/animate the whole Playground');
 assert.equal(new URL(play.url()).searchParams.get('agent'),'claude-code');assert.equal(new URL(play.url()).searchParams.get('theme'),'light');
 await play.locator('[data-tab=typography]').click();await play.waitForFunction(()=>!document.getElementById('type-frame').style.visibility);
 assert.equal(await play.frameLocator('#type-frame').locator('html').getAttribute('data-selected-agent'),'claude-code');
 await app.evaluate(()=>window.workshopAgent.select('codex'));await play.waitForFunction(()=>document.querySelector('#agent input:checked').value==='codex'&&!document.getElementById('type-frame').style.visibility);
 assert.equal(await play.frameLocator('#type-frame').locator('html').getAttribute('data-selected-agent'),'codex');
 await play.reload();await play.frameLocator('#type-frame').locator('.agent-row').first().waitFor();assert.equal(await play.locator('#agent input:checked').inputValue(),'codex');
 assert.deepEqual(errors,[]);console.log('PASS: real shared-context storage events in both directions, controls/specimens, rapid changes, reveal interruption, URL/reload persistence, no Playground bulk transitions');
}finally{await browser.close();server.close();}

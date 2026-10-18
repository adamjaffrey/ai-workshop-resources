import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:'+server.address().port+'/playground');await p.waitForTimeout(1200);
 const ys=await p.locator('#global-style-controls fieldset').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().top));assert.ok(Math.max(...ys)-Math.min(...ys)<1);
 assert.equal(await p.locator('#width legend').innerText(),'Screen Width');
 assert.deepEqual(await p.locator('.breadcrumbs a,.breadcrumbs [aria-current]').evaluateAll(es=>es.map(e=>[getComputedStyle(e).fontSize,getComputedStyle(e).fontWeight])),[['14px','400'],['14px','600']]);
 const initialHeight=await p.locator('#login-frame').evaluate(e=>e.clientHeight);const available=await p.evaluate(()=>innerHeight-document.querySelector('.toolbar').offsetHeight-document.querySelector('.inspector-dock').offsetHeight-32);assert.ok(initialHeight<=available*.7+1);
 await p.evaluate(()=>scrollTo(0,700));
 for(const [id,value] of [['agent','claude-code'],['theme','dark'],['width','390'],['hover','on']]){const r=await p.locator('#'+id+' input[value="'+value+'"]').locator('..').boundingBox();const before=await p.evaluate(()=>scrollY);await p.mouse.click(r.x+r.width/2,r.y+r.height/2);await p.waitForTimeout(350);assert.equal(await p.evaluate(()=>scrollY),before,id+' scroll jump');}
 await p.click('#inspector-toggle');assert.equal(await p.locator('#login-frame').evaluate(e=>e.clientHeight),initialHeight);
 await p.click('[data-tab=typography]');await p.waitForTimeout(700);const type=p.frameLocator('#type-frame');assert.match(await type.locator('[data-source-selector="#gate-error"] [data-type-sample]').innerText(),/Incorrect password/);
 await p.click('[data-tab=icons]');await p.waitForTimeout(600);assert.ok((await p.frameLocator('#icons-frame').locator('h3').allTextContents()).some(t=>t.includes('➡️')));
 await p.click('[data-tab=errors]');await p.waitForTimeout(600);const errorsFrame=p.frameLocator('#errors-frame');assert.equal(await errorsFrame.locator('#errors-login .gate-panel').count(),7);assert.equal(await errorsFrame.locator('#errors-resources .qr-copy').count(),1);assert.equal(await errorsFrame.locator('#errors-resources .copy').count(),1);
 for(const width of [320,390,768,1440]){await p.setViewportSize({width,height:900});for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){await p.evaluate(({theme,agent})=>{for(const [id,value] of Object.entries({theme,agent,width:'fluid'})){const control=document.getElementById(id);control.value=value;control.dispatchEvent(new Event('change'));}},{theme,agent});await p.waitForTimeout(700);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);const overflow=await errorsFrame.locator('.icon-sample').evaluateAll(es=>es.map(e=>e.scrollWidth-e.clientWidth));assert.ok(overflow.every(n=>n<=1),JSON.stringify({width,theme,agent,overflow}));}}
 await p.screenshot({path:'/tmp/playground-errors-audit.png'});
 assert.deepEqual(errors,[]);console.log('PASS: toolbar alignment, pointer scroll stability, breadcrumb, stable available-height cap, emoji presentation and in-context errors');
}finally{await browser.close();server.close();}

import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {handleRequest} from '../lib/workshop-handler.mjs';
import {playgroundSections} from '../lib/workshop-playground-routes.mjs';
const app=createPhonePreview({protectPlayground:true});await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+app.server.address().port,browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage({reducedMotion:'reduce'});
 for(const width of [390,1440]){
 await p.setViewportSize({width,height:1000});
 for(const path of ['/workshop-resources','/component-playground',...playgroundSections.map(s=>'/component-playground/'+s)]){
 const url=origin+path+'?theme=dark&agent=claude';
 await p.route(url,async route=>{const r=await handleRequest(new Request(url),{});await route.fulfill({status:r.status,headers:Object.fromEntries(r.headers),body:await r.text()});});
 const r=await p.goto(url);assert.equal(r.status(),503);assert.equal(p.url(),url);
 await p.locator('#gate-error').filter({hasText:'Sign-in unavailable'}).waitFor();
 assert.equal(await p.locator('.playground-placeholder').count(),path.startsWith('/component-playground')?1:0);
 assert.match(await p.locator('.page-placeholder').evaluate(e=>getComputedStyle(e).filter),/blur/);
 if(path==='/component-playground'){const f=await p.locator('.playground-placeholder>iframe').elementHandle().then(e=>e.contentFrame());await f.waitForSelector('.ph-word');await p.screenshot({path:'/tmp/login-error-playground-'+width+'.png'});}
 await p.unroute(url);
 }
 for(const path of ['/workshop-resources','/component-playground/blocks-and-blur'])for(const status of [401,429,503,'network']){
 const url=origin+path+'?theme=light&agent=codex';await p.goto(url);
 await p.route('**/auth/login',route=>status==='network'?route.abort():route.fulfill({status,headers:{'content-type':'application/json',...(status===429?{'retry-after':'60'}:{})},body:'{"error":"test"}'}));
 await p.locator('#workshop-password').fill('incorrect-test-password');await p.locator('.gate-submit').click();
 await p.waitForFunction(()=>document.querySelector('#gate-error').classList.contains('is-error')&&document.querySelector('#gate-error span').textContent.length>0);
 assert.equal(p.url(),url);assert.equal(await p.locator('.playground-placeholder').count(),path.startsWith('/component-playground')?1:0);
 assert.match(await p.locator('.page-placeholder').evaluate(e=>getComputedStyle(e).filter),/blur/);await p.unroute('**/auth/login');
 }
 console.log('PASS login error destination, URL, backdrop and blur at '+width+'px');
 }
}finally{await browser.close();app.server.closeAllConnections();app.server.close();}

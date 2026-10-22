import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
try{for(const engine of [chromium,webkit]){const browser=await engine.launch(engine===chromium?{channel:'chrome'}:{});try{for(const width of [390,1440]){
 const p=await browser.newPage({viewport:{width,height:1000}});await p.goto('http://127.0.0.1:'+server.address().port+'/component-playground/icons');
 const right=p.locator('#link-icon-catalog [data-catalog-variant=arrow-right-modified]');
 await p.waitForFunction(()=>document.querySelector('#link-icon-catalog [data-catalog-variant=arrow-right-modified]')?.textContent.includes('Resources → Skip to Main Content'),undefined,{timeout:90000});
 for(const name of ['arrow-right-modified','arrow-up-right-modified','hash-modified'])assert.equal(await p.locator('#link-icon-catalog [data-catalog-variant='+name+'] h3').textContent(),name+'.svg');
 assert.match(await right.textContent(),/Resources → Skip to Main Content/);await p.close();console.log('PASS filenames and Resources skip usage',engine.name(),width);
 }}finally{await browser.close();}}}finally{server.close();}

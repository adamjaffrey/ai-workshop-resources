import assert from 'node:assert/strict';
import http from 'node:http';
import {gunzipSync} from 'node:zlib';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const request=encoding=>new Promise(resolve=>http.get({hostname:'127.0.0.1',port:server.address().port,path:'/playground',headers:{'Accept-Encoding':encoding}},res=>{const chunks=[];res.on('data',chunk=>chunks.push(chunk));res.on('end',()=>resolve({headers:res.headers,body:Buffer.concat(chunks)}));}));
 const plain=await request('identity'),compressed=await request('gzip');assert.equal(compressed.headers['content-encoding'],'gzip');assert.ok(gunzipSync(compressed.body).equals(plain.body));assert.ok(compressed.body.length<plain.body.length*.25);console.log(JSON.stringify({plainBytes:plain.body.length,gzipBytes:compressed.body.length}));
 for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:900}}),cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 const start=Date.now();await page.goto((process.env.FOCUS_PREVIEW_URL||'http://127.0.0.1:'+server.address().port)+'/playground');await page.locator('[data-tab=focus]').click();const f=page.frameLocator('#focus-frame');await f.locator('.focus-row').last().waitFor();await f.locator('#focus-resources .focus-row').first().waitFor();const elapsed=Date.now()-start;console.log(JSON.stringify({width,coldLoadMs:elapsed}));assert.ok(elapsed<5000,'Focus initial load under 5s with 4x CPU slowdown');
 await page.close();
}}finally{await browser.close();server.close();}

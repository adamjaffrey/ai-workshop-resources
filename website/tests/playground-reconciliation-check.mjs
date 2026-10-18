import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {resourcePage,loginPage} from '../lib/workshop-pages.mjs';
const {server,password}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port,browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext(),p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(origin+'/playground');await p.click('[data-tab=icons]');await p.waitForTimeout(1400);
 const actual=await browser.newContext();await actual.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});const resources=await actual.newPage();await resources.goto(origin+'/');const login=await browser.newPage();await login.goto(origin+'/');
 // Every canonical element and its children must survive in the full-page specimen.
 for(const [name,html,root] of [['resources',resourcePage,'#workshop-content'],['login',loginPage,'#access-gate']]){
  const frame=p.frames().find(f=>f.name()===name+'-frame')||await p.locator('#'+name+'-frame').elementHandle().then(h=>h.contentFrame());
  const missing=await frame.evaluate(({html,root})=>{const doc=new DOMParser().parseFromString(html,'text/html'),fail=[];function walk(source,path){const target=document.querySelector(path);if(!target){fail.push(path);return;}for(const child of source.children){if(['SCRIPT','STYLE','NOSCRIPT'].includes(child.tagName))continue;const peers=[...source.children].filter(n=>n.tagName===child.tagName);walk(child,path+' > '+child.tagName.toLowerCase()+':nth-of-type('+(peers.indexOf(child)+1)+')');}}walk(doc.querySelector(root),root);return fail;},{html,root});assert.deepEqual(missing,[],name+' missing component descendants');
 }
 for(const page of [p,resources,login]){const unnamed=await page.locator('svg').evaluateAll(es=>es.filter(e=>!e.dataset.iconUse||!e.dataset.iconName||!e.dataset.iconProvider).map(e=>e.outerHTML.slice(0,120)));assert.deepEqual(unnamed,[],'Every app and tooling SVG has purpose and provenance');}
 // Every gallery origin resolves in an independently rendered app, including hidden state icons.
 const iconFrame=p.frameLocator('#icons-frame'),rows=await iconFrame.locator('.icon-row').evaluateAll(es=>es.map(e=>({page:e.dataset.sourcePage,selector:e.dataset.sourceSelector,svg:e.querySelector('[data-icon-target]')?.tagName.toLowerCase()==='svg'?e.querySelector('[data-icon-target]').innerHTML:null,src:e.querySelector('[data-icon-target]')?.getAttribute('src')})));
 for(const row of rows){const page=row.page==='resources'?resources:login,selector=row.selector.replace('::before','');assert.ok(await page.locator(selector).count(),JSON.stringify(row));}
 for(const row of await iconFrame.locator('.icon-row').all()){const icon=row.locator('svg[data-icon-target]');if(await icon.count()){const use=await icon.getAttribute('data-icon-use'),name=await icon.getAttribute('data-icon-name');assert.ok((await row.locator('.icon-meta').innerText()).includes(use),'Visible usage name');assert.ok((await row.locator('h3').innerText()).toLowerCase().includes(name.toLowerCase()),'Official name retained');assert.equal(await row.locator('[data-icon-source]').count(),1,'Original library source link');}}
 const signature=html=>html.replace(/\sstyle="[^"]*"|\sdata-icon-target=""/g,'').replace(/>\s+</g,'><').replace(/\s+/g,' ').trim();
 const catalog=await iconFrame.locator('[data-icon-target]').evaluateAll(es=>es.filter(e=>e.tagName.toLowerCase()==='svg').map(e=>[...e.children].map(n=>{const c=n.cloneNode(true);c.removeAttribute('style');return c.outerHTML;}).join('')));
 for(const page of [resources,login]){const selector=page===resources?'#workshop-content svg':'#access-gate svg';const icons=await page.locator(selector).evaluateAll(es=>es.map(e=>e.innerHTML));for(const icon of icons)assert.ok(catalog.some(c=>signature(c)===signature(icon)),'Uncatalogued SVG: '+icon.slice(0,120));}
 const imageSources=await iconFrame.locator('[data-icon-target]').evaluateAll(es=>es.map(e=>e.getAttribute('src')).filter(Boolean));
 for(const src of await resources.locator('#workshop-content img').evaluateAll(es=>es.map(e=>e.getAttribute('src')))){const bytes=await readFile(new URL('../public'+src,import.meta.url));assert.ok(imageSources.includes('data:image/png;base64,'+bytes.toString('base64')),'Uncatalogued image bytes: '+src);}

 // Repeated cards retain complete child groups and all copy outcomes use the real renderer.
 for(const card of await resources.locator('article').all()){for(const selector of ['.symbol svg','h3','.description','.code-header','.copy','pre code','.status'])assert.equal(await card.locator(selector).count(),1,selector);}
 await p.click('[data-tab=errors]');await p.waitForTimeout(250);const errorRows=await p.frameLocator('#errors-frame').locator('.icon-row').evaluateAll(es=>es.map(e=>({page:e.dataset.sourcePage,selector:e.dataset.sourceSelector,state:e.dataset.state})));assert.equal(errorRows.length,11);for(const row of errorRows)assert.equal(await (row.page==='resources'?resources:login).locator(row.selector).count(),1);
 // Compare fallback notices to actual browsers with scripting disabled.
 for(const name of ['resources','login']){const noJS=await browser.newContext({javaScriptEnabled:false});if(name==='resources')await noJS.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});const page=await noJS.newPage();await page.goto(origin+'/');const original=await page.locator(name==='resources'?'#workshop-content noscript p':'#access-form noscript p').textContent();const specimen=p.frameLocator('#errors-frame').locator('#errors-'+name+' [data-state="JavaScript Unavailable"] .error-sample');assert.equal(await specimen.textContent(),original);await noJS.close();}
 await p.click('[data-tab=typography]');await p.waitForTimeout(200);const type=p.frameLocator('#type-frame');assert.equal(await type.locator('.type-row:not(.feedback-row)').count(),26);assert.equal(await type.locator('.feedback-row').count(),2);
 assert.deepEqual(errors,[]);console.log('PASS: complete source trees, component children, all SVG origins, 11 error/fallback groups, 26 typography roles and 2 helper outcomes');
}finally{await browser.close();server.close();}

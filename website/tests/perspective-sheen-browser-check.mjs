import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const b=await chromium.launch({channel:'chrome',headless:true});
try{
const c=await b.newContext();await c.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});const p=await c.newPage();
for(const width of [320,390,1440])for(const theme of ['light','dark']){
 await p.setViewportSize({width,height:900});await p.goto(origin);await p.evaluate(theme=>window.dispatchEvent(new StorageEvent('storage',{key:'workshop-colour-theme',newValue:theme})),theme);await p.locator('.perspective').scrollIntoViewIfNeeded();await p.waitForTimeout(500);await p.evaluate(()=>window.workshopPerspective.preview('ready'));
 await p.waitForFunction(()=>document.querySelector('.perspective').hasAttribute('data-sheening'));
 const selector=theme==='light'?'.perspective-day':'.perspective-night',hidden=theme==='light'?'.perspective-night':'.perspective-day';
 const hit=await p.locator('.perspective-discover').boundingBox(),fragment=await p.locator(hidden).evaluate(e=>e.getBoundingClientRect().toJSON());
 const text=await p.locator(hidden).evaluate(e=>{const r=document.createRange();r.selectNodeContents(e);return r.getBoundingClientRect().toJSON();}),padding=(hit.height-fragment.height)/2;assert.ok(Math.abs(hit.x-(text.x-padding))<1&&Math.abs(hit.width-(text.width+padding*2))<1,'text width with equal padding');assert.equal(await p.locator('.perspective-discover').evaluate(e=>getComputedStyle(e).appearance),'none');assert.ok(await p.locator('.perspective-particles').evaluate(e=>getComputedStyle(e).maskImage.includes('data:image/png')),'mask follows measured line capsules');assert.ok(await p.locator('.perspective').evaluate((e,angle)=>e.style.getPropertyValue('--wave-paint').includes(angle+'deg'),theme==='dark'?315:135));assert.ok(hit.y<=fragment.y&&hit.y+hit.height>=fragment.y+fragment.height,'entire concealed fragment covered');
 const mask=await p.locator(hidden).evaluate(async e=>{const target=document.querySelector('.perspective-discover'),field=target.querySelector('.perspective-particles'),r=target.getBoundingClientRect(),range=document.createRange();range.selectNodeContents(e);const img=new Image();img.src=field.style.getPropertyValue('--particle-mask').slice(5,-2);await img.decode();const canvas=document.createElement('canvas');canvas.width=img.width;canvas.height=img.height;const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);const pixels=ctx.getImageData(0,0,img.width,img.height).data;return {corner:pixels[3],rows:[...range.getClientRects()].map(line=>{const y=Math.min(img.height-1,Math.max(0,Math.floor(line.top+line.height/2-r.top)));let count=0;for(let x=0;x<img.width;x++)if(pixels[(y*img.width+x)*4+3]>10)count++;return {text:line.width,mask:count};})};});assert.equal(mask.corner,0,'rounded corners fade fully transparent');if(mask.rows.length>1&&Math.max(...mask.rows.map(r=>r.text))-Math.min(...mask.rows.map(r=>r.text))>20)assert.ok(Math.max(...mask.rows.map(r=>r.mask))-Math.min(...mask.rows.map(r=>r.mask))>10,'particle silhouette follows unequal wrapped lines');
 const rest=await p.locator('.perspective').screenshot();await p.waitForTimeout(1000);
 assert.equal(await p.locator(selector).evaluate(e=>getComputedStyle(e,'::after').animationName),'none');
 const active=await p.locator('.perspective').screenshot();assert.notDeepEqual(active,rest,'shared wave changes rendered pixels');
 if(width===390)await p.locator('.perspective').screenshot({path:'/tmp/perspective-sheen-'+theme+'.png'});
 await p.locator('.perspective-discover').hover();await p.waitForTimeout(650);assert.equal(await p.locator(hidden).evaluate(e=>getComputedStyle(e,'::after').opacity),'0');assert.equal(await p.locator('.perspective-particle').count(),192);assert.ok(await p.locator('.perspective-particle').first().evaluate(e=>new DOMMatrixReadOnly(getComputedStyle(e).transform).a>.4),'particles expand into visible sparks');
 assert.equal(await p.locator('.perspective-discover svg').count(),0);
 if(width===390)await p.locator('.perspective').screenshot({path:'/tmp/perspective-glimmer-'+theme+'.png'});
 await p.mouse.move(hit.x+hit.width-2,hit.y+hit.height/2);assert.equal(await p.evaluate(({x,y})=>getComputedStyle(document.elementFromPoint(x,y)).cursor,{x:hit.x+hit.width-2,y:hit.y+hit.height/2}),'pointer');
}
await p.evaluate(()=>window.workshopPerspective.preview('success'));await p.waitForTimeout(180);await p.screenshot({path:'/tmp/perspective-emergence.png'});
await p.waitForTimeout(2500);const shadow=await p.locator('.perspective-dialog').evaluate(e=>getComputedStyle(e,'::before').backgroundImage);await p.waitForTimeout(500);assert.notEqual(await p.locator('.perspective-dialog').evaluate(e=>getComputedStyle(e,'::before').backgroundImage),shadow,'halo rotates slowly');assert.equal(await p.locator('.perspective-dialog button').textContent(),'Done');await p.screenshot({path:'/tmp/perspective-rainbow-dialog.png'});
await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await p.locator('.perspective-dialog').evaluate(e=>getComputedStyle(e).animationName),'none');
console.log('PASS: rendered sheen pixels, twinkling particle field and full-fragment target bounds at phone/desktop widths in both themes');
}finally{await b.close();await new Promise(r=>server.close(r));}

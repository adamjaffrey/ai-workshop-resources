import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({channel:'chrome',headless:true});
const origin='http://127.0.0.1:'+server.address().port;
try {
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const route of ['ai-workshop-resources','component-playground/branding'])for(const width of [320,390,768,1440])for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  await page.setViewportSize({width,height:900});
  await page.goto(origin+`/${route}?theme=${theme}&agent=${agent}`);
  await page.evaluate(()=>document.fonts.ready);
  const brand=page.locator(route==='ai-workshop-resources'?'.page-toolbar .brand':'.playground-brand-row .brand'),mark=brand.locator('.brand-worm');
  const before=await mark.boundingBox();assert.equal(before.width,width<=380?36:48);
  assert.equal(await mark.getAttribute('aria-hidden'),'true');
  assert.equal(await mark.evaluate(e=>getComputedStyle(e,'::after').backgroundColor),theme==='dark'?'rgb(255, 255, 255)':'rgb(0, 0, 0)');
  await brand.evaluate(e=>{const range=document.createRange();range.selectNodeContents(e);getSelection().removeAllRanges();getSelection().addRange(range);});
  const png=await brand.screenshot();
  const pixels=await brand.evaluate(async(e,png)=>{
   const image=new Image();image.src='data:image/png;base64,'+png;await image.decode();const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);const bounds=e.getBoundingClientRect();
   function colours(selector){const r=e.querySelector(selector).getBoundingClientRect(),counts=new Map();const data=ctx.getImageData(Math.ceil(r.x-bounds.x),Math.ceil(r.y-bounds.y),Math.floor(r.width),Math.floor(r.height)).data;for(let i=0;i<data.length;i+=4){const key=[...data.slice(i,i+3)].join(',');counts.set(key,(counts.get(key)||0)+1);}return [...counts].sort((a,b)=>b[1]-a[1]);}
   return {mark:colours('.brand-worm'),text:colours('.brand-name')};
  },png.toString('base64'));
  assert.equal(pixels.mark[0][0],pixels.text[0][0],`selection backing: ${width}/${theme}/${agent}`);
  assert.ok(pixels.mark.some(([colour,count])=>colour===(theme==='dark'?'255,255,255':'0,0,0')&&count>0),`worm ink preserved: ${width}/${theme}/${agent}`);
  assert.deepEqual(await mark.boundingBox(),before,'selection must not change geometry');
  if(route==='ai-workshop-resources'){
   await page.evaluate(()=>{getSelection().removeAllRanges();scrollTo(0,900);});await page.waitForTimeout(200);
   const floating=await page.locator('.worm-halo').evaluate(e=>{const r=e.querySelector('.brand').getBoundingClientRect(),a=document.querySelector('.controls .toggle').getBoundingClientRect(),t=document.querySelector('.theme-toggle').getBoundingClientRect();return {centre:r.x+r.width/2,expected:innerWidth<=660?(a.right+t.left)/2:innerWidth/2,width:e.querySelector('.brand-worm').getBoundingClientRect().width};});
   assert.ok(Math.abs(floating.centre-floating.expected)<1);assert.equal(floating.width,before.width);
   await page.evaluate(()=>scrollTo(0,0));
   await brand.evaluate(e=>{const r=document.createRange();r.selectNodeContents(e);getSelection().addRange(r);});
  }
  if(width===390&&agent==='codex')await brand.screenshot({path:`/private/tmp/wavelength-${route.split("/")[0]}-${theme}-selected.png`});
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: selected backing pixels match text; ink and geometry preserved at four widths, both themes and agents.');
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}

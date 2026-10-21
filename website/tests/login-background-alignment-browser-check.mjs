// Verify the final measured background against the real responsive Resources page.
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const p=await browser.newPage({reducedMotion:'reduce'});
 for(const width of [320,390,660,661,700,701,768,1023,1024,1440])for(const height of [600,1000]) {
  await p.setViewportSize({width,height});await p.goto(origin);await p.evaluate(()=>document.fonts.ready);
  const original=await p.evaluate(()=>{
   document.querySelectorAll('.step-row').forEach(e=>e.classList.remove('reveal-ready','is-revealed'));
   const words=[],walker=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);
   while(walker.nextNode()) {const n=walker.currentNode;if(n.parentElement.closest('svg,script,style,noscript'))continue;
    for(const m of n.textContent.matchAll(/\S+/gu)){const range=document.createRange();range.setStart(n,m.index);range.setEnd(n,m.index+m[0].length);const r=range.getBoundingClientRect();if(r.width&&r.height)words.push({text:m[0],x:r.x,y:r.y,width:r.width,height:r.height});}}
   return words;
  });
  await p.goto(origin+'/?show-login=true');await p.evaluate(()=>document.fonts.ready);
  for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
   await p.evaluate(({theme,agent})=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.selectedAgent=agent;document.querySelector('.page-placeholder').style.filter='none';},{theme,agent});
   const projected=await p.locator('.ph-word').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height};}).filter(r=>r.width&&r.height));
   assert.equal(projected.length,original.length,'word count');
   const differences=original.flatMap((r,i)=>Math.abs(r.x-projected[i].x)>1||Math.abs(r.y-projected[i].y)>1||Math.abs(r.width-projected[i].width)>1||Math.abs(r.height-projected[i].height)>1?[{i,original:r,projected:projected[i]}]:[]);
   assert.deepEqual(differences.slice(0,5),[],`${width}×${height} ${theme} ${agent}: ${differences.length} word mismatches`);
   assert.equal(await p.locator('.page-placeholder svg').count(),0,'no original icons leak into anonymous geometry');
  }
  console.log(`PASS: ${original.length} background words within 1px at ${width}×${height}, both themes and agents`);
 }
}finally{await browser.close();server.close();}

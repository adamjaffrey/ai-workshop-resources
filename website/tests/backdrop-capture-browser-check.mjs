import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {readFile,mkdir} from 'node:fs/promises';
import {loginPage} from '../lib/workshop-pages.mjs';
import {playgroundPlaceholderDocument} from '../lib/workshop-playground-placeholder.mjs';
import {measurePlaygroundDocument} from '../scripts/measure-playground-document.mjs';
import {placeholderBaseStyles} from '../lib/workshop-placeholder.mjs';
const widths=[380,660,940,1008,1248];
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage();await mkdir(new URL('../work/backdrop-check/',import.meta.url),{recursive:true});
 for(const kind of ['resources','colours']){
  const saved=JSON.parse(await readFile(new URL('../lib/'+(kind==='resources'?'workshop-placeholder':'workshop-playground-placeholder')+'.generated.json',import.meta.url)));
  assert.deepEqual(saved.captureWidths,widths);
  for(const width of widths){
   await p.setViewportSize({width,height:1000});
   let html=kind==='resources'?loginPage.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace('</head>','<style>.access-gate{display:none!important}html,body{position:static!important;height:auto!important;overflow:auto!important}.page-placeholder{filter:none!important}</style></head>'):playgroundPlaceholderDocument();
   await p.setContent(html);await p.evaluate(()=>document.fonts.ready);
   const root=kind==='resources'?p.locator('main.page-placeholder'):p.locator('body');
   assert.equal(await root.locator('iframe,script,[href],[onclick],form').count(),0);
   assert.ok(await root.locator('.ph-word').count()>1000);
   const text=await root.evaluate(e=>{const w=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let s='';while(w.nextNode())if(!w.currentNode.parentElement.closest('style,script'))s+=w.currentNode.textContent;return s;});
   assert.doesNotMatch(text,/[^x\s/\-]/);
   assert.equal(await root.locator('*').evaluateAll(es=>es.every(e=>getComputedStyle(e).cursor==='default')),true);
   const last=kind==='resources'?p.locator('main footer'):p.locator('.inspector-dock');
   assert.ok(await last.evaluate(e=>e.getBoundingClientRect().bottom<=document.documentElement.scrollHeight+1),'Last section fits document');
   if(kind==='resources')assert.ok(await p.locator('pre .ph-code-word').count()>0,'Prompt scaffolding retained');
   await p.screenshot({path:new URL(`../work/backdrop-check/${kind}-${width}.png`,import.meta.url).pathname,fullPage:true});
   console.log(`PASS ${kind} ${width}: anonymous, inert cursors, complete document`);
  }
 }
 // Regression: replacement must not resurrect password loading/success SVGs.
 await p.setContent('<style>.password-icon{display:grid;width:18px;height:18px}svg{width:18px;height:18px}svg[hidden]{display:none}</style><span class="password-icon"><svg></svg><svg hidden></svg><svg hidden></svg></span>');
 const measured=await p.evaluate(measurePlaygroundDocument);
 await p.setContent('<style>'+placeholderBaseStyles+'</style>'+measured.markup);
 assert.equal(await p.locator('.password-icon svg:visible').count(),1);
 assert.equal(await p.locator('.password-icon svg[hidden]').count(),2);
 console.log('PASS password state: one visible layer, two inactive layers remain hidden');
}finally{await browser.close();}

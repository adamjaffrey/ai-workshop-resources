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
   const unbounded=await root.locator('svg.ph-icon').evaluateAll(es=>es.filter(e=>getComputedStyle(e).clipPath==='none').map(e=>e.dataset.iconName||e.outerHTML));
   assert.deepEqual(unbounded,[],'Every captured SVG must use cached visible ink bounds');
   const text=await root.evaluate(e=>{const w=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let s='';while(w.nextNode())if(!w.currentNode.parentElement.closest('style,script'))s+=w.currentNode.textContent;return s;});
   assert.doesNotMatch(text,/[^x\s/\-]/);
   assert.equal(await root.locator('*').evaluateAll(es=>es.every(e=>getComputedStyle(e).cursor==='default')),true);
   const last=kind==='resources'?p.locator('main footer'):p.locator('.inspector-dock');
   assert.ok(await last.evaluate(e=>e.getBoundingClientRect().bottom<=document.documentElement.scrollHeight+1),'Last section fits document');
   if(kind==='colours'){assert.equal(await p.locator('.source-rules>summary>.ph-flex-text').count(),1);assert.equal(await p.locator('.source-rules>summary').evaluate(e=>e.getBoundingClientRect().height),40);
    const clearance=await p.locator('.source-rules>summary').evaluate(e=>{const icon=e.querySelector('.ph-icon'),label=e.querySelector('.ph-flex-text'),r=icon.getBoundingClientRect(),insets=getComputedStyle(icon).clipPath.match(/[\d.]+/g).map(Number);return label.getBoundingClientRect().left-(r.right-r.width*insets[1]/100);});assert.ok(clearance>=4,'Chevron painted block must clear the label');}
   if(kind==='resources')assert.ok(await p.locator('pre .ph-code-word').count()>0,'Prompt scaffolding retained');
   await p.screenshot({path:new URL(`../work/backdrop-check/${kind}-${width}.png`,import.meta.url).pathname,fullPage:true});
   console.log(`PASS ${kind} ${width}: anonymous, inert cursors, complete document`);
  }
 }
 // Cropped viewBoxes must retain their own cached bounds, not the 24-unit default.
 await p.setContent('<svg data-icon-provider="lucide" data-icon-name="arrow-up-right" viewBox="6 6 12 12" style="width:24px;height:24px"></svg>');
 const cropped=await p.evaluate(measurePlaygroundDocument);
 await p.setContent('<style>'+placeholderBaseStyles+'</style>'+cropped.markup);
 assert.equal(await p.locator('svg').getAttribute('viewBox'),'6 6 12 12');
 assert.equal(await p.locator('svg').evaluate(e=>getComputedStyle(e).clipPath),'inset(0%)');
 console.log('PASS cropped SVG: variant bounds preserved');
 // Regression: replacement must not resurrect password loading/success SVGs.
 await p.setContent('<style>.password-icon{display:grid;width:18px;height:18px}svg{width:18px;height:18px}svg[hidden]{display:none}</style><span class="password-icon"><svg></svg><svg hidden></svg><svg hidden></svg></span>');
 const measured=await p.evaluate(measurePlaygroundDocument);
 await p.setContent('<style>'+placeholderBaseStyles+'</style>'+measured.markup);
 assert.equal(await p.locator('.password-icon svg:visible').count(),1);
 assert.equal(await p.locator('.password-icon svg[hidden]').count(),2);
 console.log('PASS password state: one visible layer, two inactive layers remain hidden');
 // A grid disclosure's anonymous words must remain one wrapping label item.
 await p.setContent('<style>summary{display:grid;grid-template-columns:20px minmax(0,1fr);font:16px/24px Arial;padding:8px 0}svg{width:18px;height:18px}</style><details><summary><svg></svg>Inspect 200 Source Declarations</summary><p>Hidden body</p></details>');
 const sourceHeight=await p.locator('summary').evaluate(e=>e.getBoundingClientRect().height);
 const grid=await p.evaluate(measurePlaygroundDocument);
 await p.setContent('<style>'+grid.css+placeholderBaseStyles+'</style>'+grid.markup);
 assert.equal(await p.locator('summary').evaluate(e=>e.getBoundingClientRect().height),sourceHeight);
 assert.equal(await p.locator('summary>.ph-flex-text').count(),1);
 assert.equal(await p.locator('details').getAttribute('open'),null);
 console.log('PASS grid disclosure: one label item and unchanged closed height');
}finally{await browser.close();}

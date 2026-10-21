// Explicit comparison capture only; never run by builds or ordinary previews.
import {writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {playgroundPage} from './playground.mjs';
import {prepareBackdropCapture} from './prepare-backdrop-capture.mjs';
import {measurePlaygroundDocument} from './measure-playground-document.mjs';
import {placeholderStyles} from '../lib/workshop-placeholder.mjs';
import {staticBackdropDocument} from '../lib/workshop-backdrop-static.mjs';
const tabs=['typography','colours','errors','focus','branding'];
const html=await playgroundPage({includeBackdropComparisons:false});
const browser=await chromium.launch({channel:'chrome',headless:true});
const documents={};
const toDocument=r=>`<!doctype html><html lang="en-AU" data-theme="light" data-selected-agent="codex"${r.gallery?` data-specimen-gallery="${r.gallery}"`:''}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${r.css}\n${placeholderStyles}\nbody{--ph-strength:40%;--ph-surface:var(--page);margin:0}body>.page-placeholder{filter:none}.ph-word:not(.ph-code-word){display:inline-block!important}.choice :is(.ph-word,.ph-flex-text){padding:0!important;display:inline-block!important;border:0!important;background:none!important}.choice .ph-flex-text{height:auto!important;min-height:0!important}</style></head>${r.markup}</html>`;
try{
 for(const tab of tabs){
  console.log(`Preparing ${tab}`);
  let page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await page.route('http://backdrop-capture.test/**',async route=>{const path=new URL(route.request().url()).pathname;if(path.startsWith('/assets/')){await route.fulfill({body:await readFile(new URL('../public'+path,import.meta.url)),contentType:path.endsWith('.ttf')?'font/ttf':'image/png'});}else await route.fulfill({body:html,contentType:'text/html; charset=utf-8'});});
  await page.goto('http://backdrop-capture.test/component-playground',{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);
  await page.locator('[data-tab='+tab+']').click();
  await page.locator('#panel-'+tab).waitFor({state:'visible'});
  await page.waitForFunction(tab=>[...document.querySelectorAll('#panel-'+tab+' iframe')].every(f=>f.hasAttribute('srcdoc')&&!f.hasAttribute('aria-busy')),tab);
  await page.evaluate(()=>scrollTo({top:0,left:0,behavior:'instant'}));await page.waitForTimeout(200);
  const frozenFrames={};
  for(const el of await page.locator('#panel-'+tab+' iframe').elementHandles()){
   const id=await el.getAttribute('id'),frame=await el.contentFrame();
   await frame.evaluate(()=>document.fonts.ready);
   await frame.evaluate(prepareBackdropCapture);
   frozenFrames[id]=await frame.evaluate(()=>{const root=document.documentElement.cloneNode(true);root.querySelectorAll('script').forEach(e=>e.remove());return '<!doctype html>'+root.outerHTML;});
  }
  await page.evaluate(prepareBackdropCapture,{playground:true,panel:tab});
  const frozenHTML=await page.evaluate(frames=>{const root=document.documentElement.cloneNode(true);root.querySelectorAll('script').forEach(e=>e.remove());root.querySelectorAll('iframe').forEach(f=>{f.srcdoc=frames[f.id]||'';f.removeAttribute('data-srcdoc');f.style.visibility='visible';f.removeAttribute('aria-busy');});return '<!doctype html>'+root.outerHTML;},frozenFrames);
  // A fresh script-free document prevents the live scheduler from mutating capture.
  await page.close();page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await page.setContent(frozenHTML,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);
  const handles={};
  for(const el of await page.locator('#panel-'+tab+' iframe').elementHandles()){const id=await el.getAttribute('id');handles[id]=await el.contentFrame();await handles[id].evaluate(()=>document.fonts.ready);}
  console.log(`Measuring responsive heights for ${tab}`);
  const heights=Object.fromEntries(Object.keys(handles).map(id=>[id,[]]));
  const maxWidth=await page.locator('main.wrap').evaluate(e=>Math.ceil(parseFloat(getComputedStyle(e).maxWidth)));
  for(let width=320;width<=maxWidth;width++){
   await page.setViewportSize({width,height:100000});await page.waitForTimeout(20);
   await Promise.all(Object.entries(handles).map(async([id,frame])=>{
    const height=await frame.evaluate(async()=>{return Math.ceil((()=>{const root=document.querySelector('#type-specimens,#icon-catalog,#error-catalog,#focus-catalog,#link-type-specimens,main:not(.page-placeholder)');return root?root.getBoundingClientRect().bottom+scrollY+parseFloat(getComputedStyle(document.body).paddingBottom):document.body.scrollHeight;})());});
    if(heights[id].at(-1)?.height!==height)heights[id].push({width,height});
    await page.locator('#'+id).evaluate((el,height)=>{el.style.height=height+'px';el.style.setProperty('--natural-frame-height',height+'px');},height);
   }));
   if(width%200===0)console.log(`${tab}: measured through ${width}px`);
  }
  await page.setViewportSize({width:1440,height:1000});await page.waitForTimeout(100);
  for(const [id,steps] of Object.entries(heights))await page.locator('#'+id).evaluate((el,height)=>{el.style.height=height+'px';el.style.setProperty('--natural-frame-height',height+'px');},steps.at(-1).height);
  const frames={};let words=0;
  for(const [id,frame] of Object.entries(handles)){const r=await frame.evaluate(measurePlaygroundDocument,{preserveSpecimenLayout:true});if(r.words<50)throw Error('Unpopulated capture: '+tab+'/'+id+' ('+r.words+' words)');words+=r.words;frames[id]=toDocument(r);}
  const r=await page.evaluate(measurePlaygroundDocument,{frames,preserveSpecimenLayout:true});if(r.words<100)throw Error('Unpopulated outer capture: '+tab);words+=r.words;
  for(const [id,steps] of Object.entries(heights)){
   r.css+=`\n#${id}{height:${steps[0].height}px!important;--natural-frame-height:${steps[0].height}px!important}`;
   for(const {width,height} of steps.slice(1))r.css+=`\n@media(min-width:${width}px){#${id}{height:${height}px!important;--natural-frame-height:${height}px!important}}`;
  }
  let document=staticBackdropDocument(toDocument(r));
  for(const [name,mime] of [['wavelength-worm.png','image/png'],['markpro-bold.ttf','font/ttf']])document=document.replaceAll('/assets/'+name,'data:'+mime+';base64,'+(await readFile(new URL('../public/assets/'+name,import.meta.url))).toString('base64'));
  documents[tab]={source:tab,words,fingerprint:createHash('sha256').update(html).digest('hex'),document};
  console.log(`Captured ${tab}: ${words} words, ${Object.keys(frames).length} frames`);
  await writeFile(new URL('../lib/workshop-backdrop-comparisons.generated.json',import.meta.url),JSON.stringify(documents)+'\n');
  await page.close();
 }
 await writeFile(new URL('../lib/workshop-backdrop-comparisons.generated.json',import.meta.url),JSON.stringify(documents)+'\n');
}finally{await browser.close();}

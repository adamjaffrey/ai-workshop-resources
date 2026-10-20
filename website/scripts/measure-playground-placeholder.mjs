import {staticBackdropDocument} from '../lib/workshop-backdrop-static.mjs';
// Explicit initial capture or publication preparation only. Never imported by a build.
import {writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {playgroundPage} from './playground.mjs';
import {prepareBackdropCapture} from './prepare-backdrop-capture.mjs';
import {measurePlaygroundDocument} from './measure-playground-document.mjs';
import {playgroundPlaceholderLayoutRevision} from '../lib/workshop-layout.mjs';
import {placeholderStyles} from '../lib/workshop-placeholder.mjs';
const target=new URL('../lib/workshop-playground-placeholder.generated.json',import.meta.url);
const html=await playgroundPage();
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await page.setContent(html,{waitUntil:'load'});
 await page.evaluate(()=>document.fonts.ready);
 await page.locator('#login-frame').waitFor();
 const frames={}, frameHandles={}; let words=0;
 const toDocument=result=>`<!doctype html><html lang="en-AU" data-theme="light" data-selected-agent="codex"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${result.css}\n${placeholderStyles}\nbody{--ph-strength:40%;--ph-surface:var(--page);pointer-events:none;user-select:none}body>.page-placeholder{filter:none}body{overflow:hidden!important}*{animation:none!important;transition:none!important}.ph-word:not(.ph-code-word){display:inline-block!important}.choice :is(.ph-word,.ph-flex-text){padding:0!important;display:inline-block!important;border:0!important;background:none!important}.choice .ph-flex-text{height:auto!important;min-height:0!important}iframe{pointer-events:none}</style></head>${result.markup}</html>`;
 for(const id of ['login-frame','resources-frame']) {
  const handle=await page.locator('#'+id).elementHandle();
  if(!handle)continue;
  const frame=frameHandles[id]=await handle.contentFrame();await frame.evaluate(()=>document.fonts.ready);
  await frame.evaluate(prepareBackdropCapture);
  const result=await frame.evaluate(measurePlaygroundDocument);words+=result.words;frames[id]=toDocument(result);
 }
 await page.evaluate(prepareBackdropCapture,{playground:true});
 // Script-disabled frames cannot report their responsive content height at runtime.
 // Save measured height transitions at whole CSS pixels, through the outer width cap.
 const maxWidth=await page.locator('main.wrap').evaluate(el=>Math.ceil(parseFloat(getComputedStyle(el).maxWidth)));
 const heights=Object.fromEntries(Object.keys(frameHandles).map(id=>[id,[]]));
 for(let width=320;width<=maxWidth;width++) {
  // Keep both frames visible so Chrome does not throttle their resize callbacks.
  await page.setViewportSize({width,height:12000});
  const samples=await Promise.all(Object.entries(frameHandles).map(async([id,frame])=>[id,await frame.evaluate(async()=>{
   // Each child frame has its own resize/observer cycle (including footer wrapping).
   await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
   return Math.max(600,measureNaturalPreview());
  })]));
  for(const [id,height] of samples) {
   const transitions=heights[id];
   if(transitions.at(-1)?.height!==height)transitions.push({width,height});
  }
 }
 await page.setViewportSize({width:1440,height:1000});
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 const result=await page.evaluate(measurePlaygroundDocument,{frames});words+=result.words;
 for(const [id,transitions] of Object.entries(heights))for(const [index,{width,height}] of transitions.entries()) {
  const rule=`#${id}{--natural-frame-height:${height}px}`;
  result.css+='\n'+(index?`@media(min-width:${width}px){${rule}}`:rule);
 }
 // The inspector uses distinct mobile font sizes; measure those glyph metrics directly.
 await page.setViewportSize({width:390,height:1000});await page.evaluate(()=>document.fonts.ready);
 const mobile=await page.evaluate(measurePlaygroundDocument,{frames});
 if(mobile.inspectorMetrics.length!==result.inspectorMetrics.length)throw Error('Inspector word count changed between capture widths');
 result.css+='\n@media(max-width:600px){'+mobile.inspectorMetrics.map((style,i)=>'.inspector-dock .ph-inspector-'+i+'{'+style.replaceAll(';','!important;')+'}').join('')+'}';
 let document=staticBackdropDocument(toDocument(result));
 // The captured page already embeds assets; no runtime requests or original scripts/actions survive.
 for(const [name,mime] of [['wavelength-worm.png','image/png'],['markpro-bold.ttf','font/ttf']])document=document.replaceAll('/assets/'+name,'data:'+mime+';base64,'+(await readFile(new URL('../public/assets/'+name,import.meta.url))).toString('base64'));
 await writeFile(target,JSON.stringify({source:'components',layoutRevision:playgroundPlaceholderLayoutRevision,fingerprint:createHash('sha256').update(html).digest('hex'),words,document})+'\n');
 console.log(`Measured Components backdrop: ${words} anonymous words; ${Buffer.byteLength(document)} bytes`);
} finally {await browser.close();}

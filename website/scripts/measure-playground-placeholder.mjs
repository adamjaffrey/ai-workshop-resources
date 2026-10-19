// Explicit initial capture or publication preparation only. Never imported by a build.
import {writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {playgroundPage} from './playground.mjs';
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
 const frames={}; let words=0;
 const toDocument=result=>`<!doctype html><html lang="en-AU" data-theme="light" data-selected-agent="codex"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${result.css}\n${placeholderStyles}\nbody{--ph-strength:40%;--ph-surface:var(--page);pointer-events:none;user-select:none}body>.page-placeholder{filter:none}body{overflow:hidden!important}*{animation:none!important;transition:none!important}.ph-word:not(.ph-code-word){display:inline-block!important}.choice :is(.ph-word,.ph-flex-text){padding:0!important;display:inline-block!important;border:0!important;background:none!important}.choice .ph-flex-text{height:auto!important;min-height:0!important}iframe{pointer-events:none}</style></head>${result.markup}</html>`;
 for(const id of ['login-frame','resources-frame']) {
  const handle=await page.locator('#'+id).elementHandle();
  if(!handle)continue;
  const frame=await handle.contentFrame();await frame.evaluate(()=>document.fonts.ready);
  const result=await frame.evaluate(measurePlaygroundDocument);words+=result.words;frames[id]=toDocument(result);
 }
 await page.evaluate(()=>{document.querySelectorAll('[data-panel]:not([data-panel="components"]),.catalog-sources,#style-dialog,.inspector-dock').forEach(el=>el.remove());});
 await page.addStyleTag({content:'main.wrap{padding-bottom:24px!important}html{scroll-padding-bottom:0!important}'});
 const result=await page.evaluate(measurePlaygroundDocument,{frames});words+=result.words;
 let document=toDocument(result);
 // The captured page already embeds assets; no runtime requests or original scripts/actions survive.
 for(const [name,mime] of [['wavelength-worm.png','image/png'],['MarkPro-Bold.ttf','font/ttf']])document=document.replaceAll('/assets/'+name,'data:'+mime+';base64,'+(await readFile(new URL('../public/assets/'+name,import.meta.url))).toString('base64'));
 await writeFile(target,JSON.stringify({source:'components',layoutRevision:playgroundPlaceholderLayoutRevision,fingerprint:createHash('sha256').update(html).digest('hex'),words,document})+'\n');
 console.log(`Measured Components backdrop: ${words} anonymous words; ${Buffer.byteLength(document)} bytes`);
} finally {await browser.close();}

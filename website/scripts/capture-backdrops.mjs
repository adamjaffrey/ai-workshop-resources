// Explicit capture only. Builds never import this module.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright';
import {resourcePage} from '../lib/workshop-resource-page.mjs';
import {playgroundPage} from './playground.mjs';
import {prepareBackdropCapture} from './prepare-backdrop-capture.mjs';
import {measurePlaygroundDocument} from './measure-playground-document.mjs';
import {placeholderBaseStyles} from '../lib/workshop-placeholder.mjs';
import {staticBackdropDocument} from '../lib/workshop-backdrop-static.mjs';
import {placeholderLayoutRevision,playgroundPlaceholderLayoutRevision} from '../lib/workshop-layout.mjs';
export const captureWidths=[380,660,940,1008,1248];
export async function embedAssets(html){
 for(const [name,mime] of [['wavelength-worm.png','image/png'],['workshop-resources-qr.png','image/png'],['markpro-bold.ttf','font/ttf']])html=html.replaceAll('/assets/'+name,'data:'+mime+';base64,'+(await readFile(new URL('../public/assets/'+name,import.meta.url))).toString('base64'));
 return html;
}
export async function prepareSource(browser,kind){
 let html=kind==='resources'?resourcePage:await playgroundPage({includeBackdropComparisons:false});
 const fingerprint=createHash('sha256').update(html).digest('hex');
 if(kind==='resources'){
  const start=html.indexOf('    async function checkSession()'),end=html.indexOf('  </script>',start);
  if(start<0||end<0)throw Error('Resource session boundary missing');
  html=html.slice(0,start)+html.slice(end);
 }
 html=await embedAssets(html);
 const live=await browser.newPage({viewport:{width:1248,height:1000},reducedMotion:'reduce'});
 await live.route('http://capture.test/**',route=>route.fulfill({body:html,contentType:'text/html; charset=utf-8'}));
 await live.goto('http://capture.test/'+(kind==='colours'?'component-playground/colours':'ai-workshop-resources'));await live.evaluate(()=>document.fonts.ready);
 if(kind==='colours'){await live.locator('[data-tab=colours]').click();await live.locator('#panel-colours').waitFor({state:'visible'});}
 await live.evaluate(()=>scrollTo(0,0));
 await live.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
 await live.evaluate(prepareBackdropCapture,{playground:kind==='colours',panel:'colours'});
 if(kind==='resources')await live.evaluate(()=>document.querySelectorAll('.step-row').forEach(e=>e.classList.remove('reveal-ready','is-revealed')));
 const frozen=await live.evaluate(()=>{const root=document.documentElement.cloneNode(true);root.querySelectorAll('script').forEach(e=>e.remove());return '<!doctype html>'+root.outerHTML;});
 await live.close();
 const page=await browser.newPage({viewport:{width:1248,height:1000},reducedMotion:'reduce'});
 await page.setContent(frozen);await page.evaluate(()=>document.fonts.ready);
 if(await page.locator('iframe').count())throw Error('Active backdrop must not contain nested frames');
 return {page,fingerprint};
}
export async function measureAt(page,kind,width){
 await page.setViewportSize({width,height:1000});
 await page.evaluate(()=>new Promise(r=>requestAnimationFrame(r)));
 return page.evaluate(measurePlaygroundDocument,{resources:kind==='resources'});
}
export function documentFor(result,kind,extraCSS=''){
 const markup=kind==='resources'?'<body>'+result.markup+'</body>':result.markup;
 return staticBackdropDocument('<!doctype html><html lang="en-AU" data-theme="light" data-selected-agent="codex"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+result.css+'\n'+placeholderBaseStyles+'\nbody{--ph-strength:40%;--ph-surface:var(--page);margin:0}body>.page-placeholder{filter:none}.ph-word:not(.ph-code-word){display:inline-block!important}.choice :is(.ph-word,.ph-flex-text){padding:0!important;display:inline-block!important;border:0!important;background:none!important}.choice .ph-flex-text{height:auto!important;min-height:0!important}'+extraCSS+'</style></head>'+markup+'</html>');
}
function metricRules(metrics,kind){
 const scope=kind==='resources'?'#workshop-content.page-placeholder ':'';
 return Object.entries(metrics).map(([key,style])=>scope+'.'+key+'{'+style.replaceAll(';','!important;')+'}').join('');
}
export async function capture(kind){
 const started=performance.now(),browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const {page,fingerprint}=await prepareSource(browser,kind),samples={};
  // Descend from the widest layout; narrower samples override metrics only.
  for(const width of [...captureWidths].reverse())samples[width]=await measureAt(page,kind,width);
  const base=samples[1248];let metricCSS='';
  const changed=new Set(captureWidths.flatMap(width=>Object.entries(samples[width].metrics).filter(([key,value])=>base.metrics[key]&&base.metrics[key]!==value).map(([key])=>key)));
  // Reset only changing words in each interval; keep one shared DOM and stable metrics.
  for(const width of [...captureWidths].reverse().slice(1)){
   const metrics=Object.fromEntries([...changed].map(key=>[key,samples[width].metrics[key]||base.metrics[key]]));
   metricCSS+='\n@media(max-width:'+width+'px){'+metricRules(metrics,kind)+'}';
  }
  const record={source:kind,layoutRevision:kind==='resources'?placeholderLayoutRevision:playgroundPlaceholderLayoutRevision,fingerprint,captureWidths,words:base.words,iconSizes:base.iconSizes};
  if(kind==='resources'){record.markup=base.markup;record.metricCSS=metricCSS;}
  else record.document=await embedAssets(documentFor(base,kind,metricCSS));
  const name=kind==='resources'?'workshop-placeholder.generated.json':'workshop-playground-placeholder.generated.json';
  await writeFile(new URL('../lib/'+name,import.meta.url),JSON.stringify(record)+'\n');
  console.log(`PASS ${kind}: ${captureWidths.length} widths, ${base.words} words, no nested frames, ${((performance.now()-started)/1000).toFixed(1)}s`);
 }finally{await browser.close();}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const kinds=process.argv.includes('--resources')?['resources']:process.argv.includes('--playground')?['colours']:['resources','colours'];
 for(const kind of kinds)await capture(kind);
}

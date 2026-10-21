// Authoring-time measurement, never a runtime layout guess. Re-run after adding
// an icon or updating Lucide; alpha bounds include the actual round stroke caps.
import {readFile,writeFile,readdir} from 'node:fs/promises';
import {chromium} from 'playwright';
import {textIcon} from '../lib/workshop-link-icons.mjs';
import {resourcePage} from '../lib/workshop-resource-page.mjs';
const names=new Set(['hash','arrow-up-right','sun','moon','copy','check','monitor-down','clipboard-list','code-xml','log-out','lock','loader-circle','x']);
for(const dir of ['../lib/','./'])for(const file of await readdir(new URL(dir,import.meta.url))){if(!file.endsWith('.mjs'))continue;const source=await readFile(new URL(dir+file,import.meta.url),'utf8');for(const m of source.matchAll(/lucide-react\/dist\/esm\/icons\/([a-z0-9-]+)\.mjs/g))names.add(m[1]);}
const browser=await chromium.launch({channel:'chrome',headless:true});
try{const page=await browser.newPage();const bounds={};const variants={};const brands={};
const brandSVGs=await page.evaluate(html=>[...new DOMParser().parseFromString(html,'text/html').querySelectorAll('svg[data-icon-provider="lobe"]')].map(svg=>{svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.setAttribute('width','480');svg.setAttribute('height','480');svg.style.cssText='color:black';return [svg.dataset.iconName,svg.outerHTML];}),resourcePage);
for(const [name,viewBox] of [...[...names].sort().map(name=>[name,'0 0 24 24']),['arrow-up-right','6 6 12 12'],['hash-modified','modified'],['arrow-up-right-modified','modified'],...[...new Map(brandSVGs).keys()].map(name=>[name,'brand'])]){
 const nodes=['brand','modified'].includes(viewBox)?[]:(await import('../node_modules/lucide-react/dist/esm/icons/'+name+'.mjs')).__iconNode;
 const paths=nodes.map(([tag,attrs])=>'<'+tag+' '+Object.entries(attrs).filter(([key])=>key!=='key').map(([key,value])=>key+'="'+value+'"').join(' ')+'/>').join('');
 const svg=viewBox==='modified'?textIcon(name,'measurement').replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" ').replace('currentColor','black'):viewBox==='brand'?new Map(brandSVGs).get(name):'<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="'+viewBox+'" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+paths+'</svg>';
 const measured=await page.evaluate(async svg=>{const image=new Image();image.src='data:image/svg+xml,'+encodeURIComponent(svg);await image.decode();const canvas=document.createElement('canvas');canvas.width=canvas.height=480;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);const pixels=ctx.getImageData(0,0,480,480).data;let left=480,right=0,top=480,bottom=0;for(let y=0;y<480;y++)for(let x=0;x<480;x++)if(pixels[(y*480+x)*4+3]>=32){left=Math.min(left,x);right=Math.max(right,x+1);top=Math.min(top,y);bottom=Math.max(bottom,y+1);}return {left:left/20,right:(480-right)/20,top:top/20,bottom:(480-bottom)/20};},svg);
 if(viewBox==='modified')variants[name]={...measured,viewBox:24};else if(viewBox==='brand')brands[name]=measured;else if(viewBox==='0 0 24 24')bounds[name]=measured;else variants[name+':'+viewBox]={left:measured.left/2,right:measured.right/2,top:measured.top/2,bottom:measured.bottom/2,viewBox:12};
 }
 const target=new URL('../lib/workshop-icon-ink.generated.json',import.meta.url);const json=JSON.stringify({viewBox:24,strokeWidth:2,alphaThreshold:32,samplesPerUnit:20,icons:bounds,variants,brands},null,2)+'\n';
 if(process.argv.includes('--check')){if(await readFile(target,'utf8')!==json)throw Error('Icon ink measurements are stale; run scripts/measure-alignment-icons.mjs');console.log('PASS: icon ink measurements match installed Lucide and agent logos');}
 else{await writeFile(target,json);console.log('Measured '+names.size+' Lucide icons and '+Object.keys(brands).length+' agent logos (visible ink bounds)');}
}finally{await browser.close();}

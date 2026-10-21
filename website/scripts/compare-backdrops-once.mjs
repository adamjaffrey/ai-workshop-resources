// Optional migration diagnostic. Not imported by routine capture/build/tests.
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';
import {prepareSource,measureAt,documentFor} from './capture-backdrops.mjs';
const pairs=[[381,660],[661,940],[941,1008],[1009,1248],[1249,1440]];
const output=new URL('../work/backdrop-comparison/',import.meta.url);await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true}),report=[];
const bounds=()=>[...document.querySelectorAll('.page-header,.step-row,article,.code-wrap,pre,.panel,.swatch,.inspector-dock')].filter(e=>e.getBoundingClientRect().height).map(e=>({tag:e.tagName,cls:e.className,y:e.getBoundingClientRect().y,height:e.getBoundingClientRect().height,width:e.getBoundingClientRect().width}));
try{
 for(const kind of ['resources','colours']){
  const {page:source}=await prepareSource(browser,kind);
  for(const [width,referenceWidth] of pairs){
   const reference=await measureAt(source,kind,referenceWidth);
   const direct=await measureAt(source,kind,width),actual=await source.evaluate(bounds);
   const rendered=[];
   for(const [label,result] of [['reflow',reference],['direct',direct]]){
    const p=await browser.newPage({viewport:{width,height:1000}});await p.setContent(documentFor(result,kind));await p.evaluate(()=>document.fonts.ready);
    rendered.push(await p.evaluate(bounds));
    await p.screenshot({path:new URL(`${kind}-${width}-${label}.png`,output).pathname,fullPage:true});await p.close();
   }
   const delta=(a,b)=>a.length===b.length?{maxY:Math.max(0,...a.map((e,i)=>Math.abs(e.y-b[i].y))),maxHeight:Math.max(0,...a.map((e,i)=>Math.abs(e.height-b[i].height))),maxWidth:Math.max(0,...a.map((e,i)=>Math.abs(e.width-b[i].width)))}:{countMismatch:[a.length,b.length]};
   const row={kind,width,referenceWidth,containers:actual.length,reflowVsDirect:delta(rendered[0],rendered[1]),reflowVsSource:delta(rendered[0],actual)};
   report.push(row);console.log(JSON.stringify(row));
  }
  await source.close();
 }
 await writeFile(new URL('results.json',output),JSON.stringify(report,null,2)+'\n');
}finally{await browser.close();}

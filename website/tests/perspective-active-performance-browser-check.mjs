// Diagnostic benchmark: frame cadence and main-thread time, not a physical-phone guarantee.
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
try{
for(const scenario of [{name:'desktop',width:1440,height:900,dpr:1,rate:1},{name:'phone',width:390,height:844,dpr:3,rate:1},{name:'phone-4x',width:390,height:844,dpr:3,rate:4}]){
 const context=await browser.newContext({viewport:{width:scenario.width,height:scenario.height},deviceScaleFactor:scenario.dpr,isMobile:scenario.dpr===3,hasTouch:scenario.dpr===3});const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(origin+'/home');await p.locator('.perspective').scrollIntoViewIfNeeded();await p.waitForTimeout(800);const cdp=await context.newCDPSession(p);await cdp.send('Performance.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:scenario.rate});
 const metadata=await p.evaluate(()=>{const c=document.createElement('canvas'),g=c.getContext('webgl'),ext=g?.getExtension('WEBGL_debug_renderer_info');return {settings:window.workshopPerspective.config,renderer:ext?g.getParameter(ext.UNMASKED_RENDERER_WEBGL):null,userAgent:navigator.userAgent};});
 await p.evaluate(()=>{window.prof={frames:[],long:[],active:false,kind:'',prev:0,was:false};new PerformanceObserver(l=>{if(prof.active)prof.long.push(...l.getEntries().map(x=>x.duration));}).observe({type:'longtask',buffered:false});const loop=t=>{const a=document.querySelector('.perspective'),canvas=document.querySelector('.perspective-burst'),eligible=prof.kind==='trail'?canvas&&Number(canvas.dataset.progress)<1:prof.kind==='sweep'?a.hasAttribute('data-sheening'):true;if(prof.active&&eligible&&prof.was&&prof.prev)prof.frames.push(t-prof.prev);prof.prev=t;prof.was=eligible;requestAnimationFrame(loop);};requestAnimationFrame(loop);});
 const metrics=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
 const sample=async(kind,ms)=>{await p.evaluate(kind=>{prof.frames=[];prof.long=[];prof.kind=kind;prof.was=false;prof.prev=0;prof.active=true;},kind);const a=await metrics(),start=Date.now();await p.waitForTimeout(ms);const z=await metrics(),elapsed=Date.now()-start;const data=await p.evaluate(()=>{prof.active=false;return {frames:prof.frames,long:prof.long};});const f=data.frames.sort((a,b)=>a-b),q=x=>f[Math.min(f.length-1,Math.floor(f.length*x))]??0;return {kind,elapsedMs:elapsed,frames:f.length,medianMs:+q(.5).toFixed(2),p95Ms:+q(.95).toFixed(2),maxMs:+q(1).toFixed(2),over33:f.filter(x=>x>33.4).length,over50:f.filter(x=>x>50).length,longTasks:data.long.length,longTaskMs:+data.long.reduce((a,b)=>a+b,0).toFixed(1),taskMs:+((z.TaskDuration-a.TaskDuration)*1000).toFixed(1),layoutMs:+((z.LayoutDuration-a.LayoutDuration)*1000).toFixed(1),styleMs:+((z.RecalcStyleDuration-a.RecalcStyleDuration)*1000).toFixed(1)};};
 for(const theme of ['light','dark']){
 await p.evaluate(theme=>{window.workshopPerspective.preview('locked');window.dispatchEvent(new StorageEvent('storage',{key:'workshop-colour-theme',newValue:theme}));},theme);await p.waitForTimeout(700);
 const rows=[];rows.push(await sample('baseline',1500));
 await p.evaluate(()=>window.workshopPerspective.preview('ready'));await p.waitForTimeout(100);rows.push(await sample('sweep',7400));
 const box=await p.locator('.perspective-discover').boundingBox();await p.mouse.move(box.x+box.width*.5,box.y+box.height*.5);rows.push(await sample('hover',4500));await p.mouse.move(0,0);
 for(let i=0;i<3;i++){const startupMs=await p.evaluate(()=>{const start=performance.now();window.workshopPerspective.preview('reveal',{loop:true});return performance.now()-start;});rows.push({...await sample('trail',1250),startupMs});await p.evaluate(()=>window.workshopPerspective.preview('locked'));}
 await p.evaluate(()=>window.workshopPerspective.preview('success'));await p.locator('.perspective-dialog').waitFor({state:'visible'});await p.waitForTimeout(700);rows.push(await sample('halo',4500));await p.evaluate(()=>window.workshopPerspective.preview('locked'));
 if(errors.length)throw new Error(errors.join('\n'));
 const result={scenario:scenario.name,theme,renderer:metadata.renderer,settings:metadata.settings,rows,errors};results.push(result);console.log(JSON.stringify(result));
 }
 await context.close();
}
}finally{await browser.close();await new Promise(r=>server.close(r));}

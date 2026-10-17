import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {loginPage,resourcePage} from '../lib/workshop-pages.mjs';
const b=await chromium.launch({channel:'chrome',headless:true});
try{
for(const [name,html] of [['login',loginPage],['resources',resourcePage]])for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
 const p=await b.newPage();await p.setContent(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,''));
 const values=await p.evaluate(({theme,agent})=>{
 document.documentElement.dataset.theme=theme;document.documentElement.dataset.selectedAgent=agent;
 const probe=document.createElement('span');document.body.append(probe);const c=document.createElement('canvas').getContext('2d');
 const rgb=token=>{probe.style.color='var('+token+')';c.fillStyle=getComputedStyle(probe).color;c.fillRect(0,0,1,1);return [...c.getImageData(0,0,1,1).data].slice(0,3);};
 const luminance=a=>a.map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((sum,x,i)=>sum+x*[.2126,.7152,.0722][i],0);
 const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
 const backgrounds=['--page','--surface','--content-surface','--field-bg','--card-bg','--tile-bg','--control-bg','--hover'];
 const result={};for(const role of ['success','warning','error']){const colour=rgb('--'+role);result[role]={colour,ratios:backgrounds.map(bg=>[bg,ratio(colour,rgb(bg))]),fillContrast:role==='error'?null:ratio(colour,rgb('--'+role+'-ink'))};}
 result.info=rgb('--info');result.muted=rgb('--muted-text');probe.remove();return result;
 },{theme,agent});
 for(const role of ['success','warning','error']){
 for(const [bg,ratio] of values[role].ratios)assert.ok(ratio>=4.5,JSON.stringify({name,theme,agent,role,bg,ratio}));
 if(role!=='error')assert.ok(values[role].fillContrast>=4.5);
 }
 assert.deepEqual(values.info,values.muted);
 console.log(name,theme,agent,JSON.stringify(values));await p.close();
}
}finally{await b.close();}

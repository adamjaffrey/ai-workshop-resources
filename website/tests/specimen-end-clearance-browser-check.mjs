import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
try{for(const engine of [chromium,webkit]){const browser=await engine.launch(engine===chromium?{channel:'chrome',headless:true}:{headless:true});try{
for(const width of [320,390,768,1440])for(const [theme,agent]of [['light','codex'],['dark','claude-code']]){
 const p=await browser.newPage({viewport:{width,height:1000},isMobile:width<768,reducedMotion:'reduce'});
 for(const [slug,id]of [['typography','type'],['icons','icons'],['status-states','errors'],['focus-and-selection','focus']]){
 await p.goto(`http://127.0.0.1:${server.address().port}/component-playground/${slug}?theme=${theme}&agent=${agent}`);
 const f=p.frameLocator('#'+id+'-frame');await f.locator('[data-specimen-width]').last().waitFor({state:'attached'});await p.locator('#'+id+'-frame').evaluate(e=>e.scrollIntoView({block:'start'}));await p.waitForTimeout(250);
 const failures=await f.locator('.icon-sample,.focus-preview,.agent-preview,.feedback-preview,.variant-preview,.specimen-viewport,.prompt-specimen-viewport').evaluateAll(async es=>{for(const e of es)e.scrollLeft=e.scrollWidth;await new Promise(r=>setTimeout(r,100));return es.filter(e=>e.checkVisibility()).flatMap(e=>{
 e.scrollLeft=e.scrollWidth;const edge=e.getBoundingClientRect().right;const roots=[...e.querySelectorAll('[data-specimen-width]')].filter(n=>n.checkVisibility());let right=Math.max(...roots.map(n=>n.getBoundingClientRect().right));for(const n of e.querySelectorAll('[data-held-focus]')){const c=getComputedStyle(n);right=Math.max(right,n.getBoundingClientRect().right+parseFloat(c.outlineWidth)+parseFloat(c.outlineOffset));}const gap=edge-right;const mask=getComputedStyle(e).maskImage,expectedFade=innerWidth<=660?'27px':'54px';
 return (e.scrollLeft>2&&!mask.includes(expectedFade))||gap<23.4||(e.scrollLeft>0&&gap>24.6)||e.hasAttribute('data-overflow-right')||(e.scrollLeft>2&&!e.hasAttribute('data-overflow-left'))?[{fadeLeft:e.hasAttribute('data-overflow-left'),fadeRight:e.hasAttribute('data-overflow-right'),scroll:e.scrollLeft,label:e.closest('section')?.querySelector('h3')?.textContent||roots[0]?.className,gap}]:[];
 });});assert.deepEqual(failures,[],`${engine.name()} ${width} ${id} end clearance`);
 if(id==='focus'){
 const qr=f.locator('.qr-card');assert.equal(await qr.locator('figcaption').count(),1);const geometry=await qr.evaluate(e=>{const b=e.querySelector('.qr-copy'),c=getComputedStyle(b),r=b.getBoundingClientRect(),outer=e.getBoundingClientRect();return {x:outer.x,inside:r.x-parseFloat(c.outlineOffset)-parseFloat(c.outlineWidth)>=outer.x,right:r.right+parseFloat(c.outlineOffset)+parseFloat(c.outlineWidth)<=outer.right};});assert.ok(geometry.inside&&geometry.right,JSON.stringify(geometry));
 const toggle=f.locator('.theme-toggle');const buttons=await toggle.locator('button').evaluateAll(es=>es.map(e=>({x:e.offsetLeft,width:e.offsetWidth})));assert.equal(buttons[0].width,44);assert.equal(buttons[1].width,44);assert.equal(buttons[1].x-buttons[0].x,48);
 }
 }
 console.log('PASS end clearance',engine.name(),width,theme,agent);await p.close();
}
}finally{await browser.close();}}}finally{server.close();}

// Check visible SVG ink and actual text, including dynamically generated toggles.
import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const selector='summary:has(>.disclosure-chevron),.hover-explainer,#inspector-toggle,#inspector-details';
try{
 for(const engine of [chromium,webkit]){
 const browser=await engine.launch({...(engine===chromium?{channel:'chrome'}:{}),headless:true});
 try{
 const page=await browser.newPage({reducedMotion:'reduce'});
 for(const width of [320,390,768,1440]){
 await page.setViewportSize({width,height:1000});await page.goto(origin+'/component-playground');
 const check=async(expanded)=>{
 const results=await page.locator(selector).evaluateAll(es=>es.filter(e=>e.checkVisibility()).map(e=>{
 const c=getComputedStyle(e),rail=e.getBoundingClientRect().x+parseFloat(c.borderLeftWidth)+parseFloat(c.paddingLeft);
 const svg=e.querySelector(':scope>svg'),b=svg.getBBox(),centre=new DOMPoint(b.x+b.width/2,b.y+b.height/2).matrixTransform(svg.getScreenCTM());
 const node=[...e.childNodes].find(n=>n!==svg&&(n.textContent||'').trim()),range=document.createRange();range.selectNodeContents(node);
 return {label:e.textContent.trim(),centre:centre.x-rail,text:range.getBoundingClientRect().x-rail};
 }));
 for(const r of results){assert.ok(Math.abs(r.centre-10)<.2,JSON.stringify({width,expanded,...r}));assert.ok(Math.abs(r.text-20)<.2,JSON.stringify({width,expanded,...r}));}
 };
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
 await page.evaluate(({theme,agent})=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.selectedAgent=agent;},{theme,agent});
 for(const tab of ['components','colours','icons','discovery','url-reference']){
 await page.locator('[data-tab="'+tab+'"]').click();
 for(const expanded of [false,true]){
 await page.locator('details').evaluateAll((es,open)=>es.forEach(e=>e.open=open),expanded);
 await page.locator('#inspector-toggle').evaluate((e,open)=>{if(e.getAttribute('aria-expanded')!==String(open))e.click();},true);
 await page.locator('#inspector-details').evaluate((e,open)=>{if(e.getAttribute('aria-expanded')!==String(open))e.click();},expanded);
 await check(expanded);
 }
 }
 }
 for(const [tab,id] of [['components','login'],['components','resources'],['branding','branding'],['discovery','discovery'],['blocks','blocks']]){
 await page.locator('[data-tab="'+tab+'"]').click();const dialog=page.locator('#'+id+'-preview');await dialog.locator('.preview-expand').click();
 for(const open of [false,true]){await dialog.locator('details').evaluateAll((es,open)=>es.forEach(e=>e.open=open),open);await check(open);}
 await page.keyboard.press('Escape');
 }
 if(width<=660)await page.locator('body>#style-options').click();
 const explainer=page.locator('.hover-explainer');
 for(const open of [false,true]){await explainer.evaluate((e,open)=>{if(e.getAttribute('aria-expanded')!==String(open))e.click();},open);await check(open);}
 if(width<=660)await page.keyboard.press('Escape');
 // Verify native keyboard activation and a wrapped label without moving its rail.
 await page.locator('[data-tab=colours]').click();const summary=page.locator('.source-rules>summary');
 await summary.evaluate(e=>e.parentElement.open=false);await summary.focus();await page.keyboard.press('Enter');
 assert.equal(await summary.evaluate(e=>e.parentElement.open),true);
 if(engine===chromium&&[390,1440].includes(width))await page.screenshot({path:'/tmp/disclosure-'+width+'.png'});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 }
 console.log('PASS: '+engine.name()+' visible chevron centre 10px and text 20px; four widths, both themes/agents, open/closed and keyboard');
 }finally{await browser.close();}
 }
}finally{server.close();}

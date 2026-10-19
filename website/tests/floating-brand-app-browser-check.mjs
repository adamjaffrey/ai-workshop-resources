import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port,browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,660,661,768,1023,1024,1440])for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  await p.setViewportSize({width,height:844});await p.goto(origin+'/home');
  await p.evaluate(({theme,agent})=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.agent=agent;},{theme,agent});
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(100);
  assert.equal(await p.locator('.worm-halo').count(),1);assert.equal(await p.locator('.worm-halo').getAttribute('data-visibility'),'0');
  await p.evaluate(()=>scrollTo(0,900));await p.waitForTimeout(500);
  const data=await p.locator('.worm-halo').evaluate(e=>{const brand=e.querySelector('.brand').getBoundingClientRect(),a=document.querySelector('.controls .toggle').getBoundingClientRect(),t=document.querySelector('.theme-toggle').getBoundingClientRect();return {opacity:+e.dataset.visibility,variant:e.dataset.brandVariant,centre:brand.x+brand.width/2,cy:brand.y+brand.height/2,controlCy:t.y+t.height/2,leftGap:brand.left-a.right,rightGap:t.left-brand.right,blur:e.querySelector('.worm-halo-veil').style.backdropFilter};});
  assert.equal(data.opacity,1,JSON.stringify({width,data}));assert.equal(data.variant,width<=660?'mark':'full');assert.ok(Math.abs(data.centre-width/2)<1);assert.ok(Math.abs(data.cy-data.controlCy)<1);assert.ok(data.leftGap>=8&&data.rightGap>=8);assert.equal(data.blur,'blur(36px)');
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(60);assert.equal(await p.locator('.worm-halo').getAttribute('data-visibility'),'0');
 }
 await p.setViewportSize({width:1440,height:900});await p.goto(origin+'/playground/branding');
 assert.equal(await p.locator('#playground-title svg[data-icon-name="toy-brick"]').count(),1);
 const icon=await p.locator('#playground-title svg').evaluate(e=>({size:e.getBoundingClientRect().width,font:parseFloat(getComputedStyle(e.parentElement).fontSize)}));assert.equal(icon.size,icon.font);
 const favicon=await p.locator('link[rel=icon]').getAttribute('href');assert.ok(decodeURIComponent(favicon).includes('#0285FF'));assert.ok(decodeURIComponent(favicon).includes('stroke="white"'));
 for(const width of [390,768,1440]){await p.setViewportSize({width,height:900});const boxes=await p.locator('.checkbox-controls label').evaluateAll(nodes=>nodes.map(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom})));assert.equal(boxes.length,2);if(width>=768)assert.equal(boxes[0].top,boxes[1].top);const lastSlider=await p.locator('#worm-tint').evaluate(e=>e.getBoundingClientRect().bottom);assert.ok(boxes[0].top>=lastSlider);}

 for(const width of [390,768,1440]){await p.setViewportSize({width,height:900});const headings=[];for(const tab of ['components','typography','colours','blocks','icons','errors','focus','branding','discovery']){await p.click('[data-tab='+tab+']');headings.push(...await p.locator('[data-panel="'+tab+'"]>.panel>.section-heading>h2').evaluateAll(nodes=>nodes.map(e=>{const c=getComputedStyle(e);return {font:c.fontSize,line:c.lineHeight,weight:c.fontWeight,inset:e.getBoundingClientRect().top-e.closest('.panel').getBoundingClientRect().top};})));}for(const heading of headings)assert.deepEqual(heading,headings[0]);}
 await p.click('[data-tab=branding]');
 await p.screenshot({path:'/tmp/workshop-branding-controls.png'});assert.deepEqual(errors,[]);console.log('PASS main-app floating branding across widths/themes/agents, clearance, checkbox layout and Playground branding');
}finally{await browser.close();server.close();}

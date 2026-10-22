import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {textIcon} from '../lib/workshop-link-icons.mjs';
const variants=['arrow-right-modified','arrow-up-right-modified','hash-modified'];
const paths=variant=>[...textIcon(variant,'test').matchAll(/<path d="([^"]+)"/g)].map(m=>m[1]);
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
try{for(const engine of [chromium,webkit]){const browser=await engine.launch({headless:true,...(engine===chromium?{channel:'chrome'}:{})});try{for(const width of [320,390,768,1440]){
 const p=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'/component-playground/typography#hyperlink-styles');const f=p.frameLocator('#link-type-frame');await f.locator('.workshop-link--external svg').first().waitFor();
 for(const agent of ['codex','claude-code'])for(const theme of ['light','dark']){
  for(const frame of [f,p.frameLocator('#internal-link-type-frame')])await frame.locator('html').evaluate((e,{agent,theme})=>{e.dataset.selectedAgent=agent;e.dataset.theme=theme},{agent,theme});
  const style=[];
  for(const [kind,variant] of [['internal',variants[0]],['external',variants[1]]]){
   const group=(kind==='internal'?p.frameLocator('#internal-link-type-frame'):f).locator('[data-link-kind='+kind+']'),links=group.locator('a');assert.equal(await links.count(),4);
   for(const link of await links.all()){
    assert.deepEqual(await link.locator('svg path').evaluateAll(es=>es.map(e=>e.getAttribute('d'))),paths(variant));
    assert.equal(await link.locator('.link-tail').evaluate(e=>getComputedStyle(e).whiteSpace),'nowrap');
   }
   style.push(await links.first().evaluate(e=>{const c=getComputedStyle(e),slot=getComputedStyle(e.querySelector('.text-link-slot'));return [c.fontSize,c.color,c.padding,slot.marginLeft,slot.width]}));
   assert.equal(await links.nth(1).locator('.link-label').first().evaluate(e=>getComputedStyle(e).textDecorationColor),'rgba(0, 0, 0, 0)');
   assert.ok(await links.nth(2).evaluate(e=>e.getClientRects().length)>1,'long example wraps');
  }
  assert.deepEqual(style[0],style[1],'both variants share typography, ink, padding and icon spacing');
 }
 const colours=p.frameLocator('#link-colours-frame');await colours.locator('#link-colours tr').last().waitFor();assert.equal(await colours.locator('#link-colours tr').count(),4);
 const lists=p.frameLocator('#list-type-frame');await lists.locator('.list-examples ul ul').waitFor();assert.ok(await lists.locator('code').count()>=6);
 for(const id of ['link-type-frame','internal-link-type-frame','link-colours-frame']){
  const section=p.locator('#'+id).locator('xpath=../..'),toggle=section.locator(':scope>.section-heading>.section-collapse');
  await toggle.focus();await p.keyboard.press('Space');assert.equal(await toggle.getAttribute('aria-expanded'),'false');assert.equal(await section.locator('iframe').isVisible(),false);
  await p.keyboard.press('Space');assert.equal(await toggle.getAttribute('aria-expanded'),'true');assert.equal(await section.locator('iframe').isVisible(),true);
 }
 if(engine===chromium&&[320,1440].includes(width)){await p.waitForFunction(()=>document.documentElement.dataset.playgroundAnchorLanded==='hyperlink-styles');await p.screenshot({path:'/tmp/link-styles-'+width+'.png'});}
 await p.goto(base+'/component-playground/icons#link-icons');await p.locator('#link-icon-catalog .playground-icon-entry').first().waitFor();await p.waitForFunction(()=>document.documentElement.dataset.playgroundAnchorLanded==='link-icons');
 assert.deepEqual(await p.locator('#link-icon-catalog>.playground-icon-entry').evaluateAll(es=>es.map(e=>e.dataset.catalogVariant)),variants);
 assert.equal(await p.locator('#link-icons-panel').evaluate(e=>e.nextElementSibling.id),'playground-icons-panel');
 for(const variant of variants){
  const item=p.locator('#link-icon-catalog [data-catalog-variant="'+variant+'"]');assert.deepEqual(await item.locator('h3>svg path').evaluateAll(es=>es.map(e=>e.getAttribute('d'))),paths(variant));
  assert.equal(await p.locator('#playground-icon-catalog [data-catalog-variant="'+variant+'"]').count(),variant==='hash-modified'?0:1);
  assert.equal(await item.locator('[data-link-source]').getAttribute('href'),'https://lucide.dev/icons/'+variant.replace('-modified',''));
 }
 await p.locator('#show-link-sources').focus();await p.keyboard.press('Space');assert.equal(await p.locator('#show-link-sources').isChecked(),true);assert.equal(await p.locator('[data-link-source]:not([hidden])').count(),3);assert.equal(await p.locator('[data-playground-source]:not([hidden])').count(),0);
 await p.locator('#playground-icon-family input[value=lobe]').check();assert.equal(await p.locator('#playground-icon-catalog>.playground-icon-entry:not([hidden])').count(),0);assert.equal(await p.locator('#link-icon-catalog>.playground-icon-entry:not([hidden])').count(),3);await p.locator('#playground-icon-family input[value=all]').check();
 await p.locator('#icons-frame').scrollIntoViewIfNeeded();const icons=p.frameLocator('#icons-frame');await icons.locator('#icons-resources .icon-row').first().waitFor();assert.equal(await icons.locator('.icon-row[data-state="Step Anchor · Copy Link"]').count(),0);
 await p.waitForFunction(()=>document.querySelector('#link-icon-catalog [data-catalog-variant="hash-modified"] ul').textContent.includes('Resources'));
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 if(engine===chromium&&[320,1440].includes(width)){await p.locator('#link-icons-panel').scrollIntoViewIfNeeded();await p.screenshot({path:'/tmp/link-icons-'+width+'.png'});}
 assert.deepEqual(errors,[]);await p.close();console.log('PASS link variants, shared styles, icon ownership, source toggles and filters',engine.name(),width);
 }}finally{await browser.close();}}}finally{await new Promise(r=>server.close(r));}

// Secondary surfaces: expanded disclosures, licences, replay, and isolated specimens.
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
const near=(a,b,label)=>assert.ok(Math.abs(a-b)<.2,`${label}: ${a}, expected ${b}`);
try{
 const p=await browser.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,660,661,768,1024,1440]){
  await p.setViewportSize({width,height:1000});await p.goto('http://127.0.0.1:'+server.address().port+'/playground/typography');
  near(await p.locator('nav[role=tablist]').evaluate(e=>e.getBoundingClientRect().x),Math.max(24,(width-1120)/2),'tab surface rail');
  const type=p.frameLocator('#type-frame');await type.locator('.notice-type-row').first().waitFor();
  const samples=await type.locator('body').evaluate(()=>{
   const out=[];for(const row of document.querySelectorAll('.notice-type-row')){const e=row.querySelector('.javascript-notice');out.push({name:'notice',gap:row.firstElementChild.getBoundingClientRect().x-e.getBoundingClientRect().x});}
   const button=document.querySelector('.type-row footer button[data-type-sample]');if(button&&!button.closest('footer').classList.contains('is-stacked'))out.push({name:'logout',gap:button.closest('.type-row').querySelector('.sample-label').getBoundingClientRect().x-button.getBoundingClientRect().x});
   const panel=document.querySelector('.type-row [data-in-situ].code-wrap'),row=panel.closest('.type-row'),bounds=row.getBoundingClientRect(),inset=parseFloat(getComputedStyle(row).paddingLeft),rail={x:bounds.x+inset,width:bounds.width-2*inset};out.push({name:'prompt left',gap:rail.x-panel.getBoundingClientRect().x},{name:'prompt right',gap:4+panel.getBoundingClientRect().width-parseFloat(getComputedStyle(row).getPropertyValue('--source-width'))});return out;
  });for(const {name,gap}of samples)near(gap,4,`${width} ${name}`);
  await p.locator('[data-tab=icons]').click();await p.locator('details').evaluateAll(es=>es.forEach(e=>e.open=true));
  for(const licence of await p.locator('.licence-text').all()){const gap=await licence.evaluate(e=>{const s=e.parentElement.querySelector('summary'),r=document.createRange();r.selectNodeContents(s.lastChild);return r.getBoundingClientRect().x-e.getBoundingClientRect().x;});near(gap,4,'licence surface');}
  await p.locator('[data-tab=discovery]').click();await p.locator('#egg input[value=reveal]').evaluate(e=>e.click());assert.equal(await p.locator('#perspective-replay').evaluate(e=>e.parentElement.className),'panel-actions','Replay shares the action row');
  for(const field of await p.locator('#discovery-preview .field:visible').all())near(await field.evaluate(e=>e.querySelector('.slider-label').getBoundingClientRect().x-e.querySelector('input').getBoundingClientRect().x),4,'rounded slider');
  for(const [tab,id]of [['components','login'],['components','resources'],['branding','branding'],['discovery','discovery'],['blocks','blocks']]){
   await p.locator('[data-tab='+tab+']').click();const d=p.locator('#'+id+'-preview');await d.locator('.preview-expand').click();
   for(const details of await d.locator(':scope>.preview-settings,:scope>.preview-state-settings').all()){
    await details.evaluate(e=>e.open=true);
    const geometry=await details.evaluate(e=>{const s=e.querySelector('summary'),r=document.createRange();r.selectNodeContents(s.lastChild);const body=e.querySelector('.expanded-global-controls,.expanded-state-controls');const child=body.querySelector('legend,.slider-label');return {heading:r.getBoundingClientRect().x,label:child?child.getBoundingClientRect().x:undefined,overflow:document.documentElement.scrollWidth>innerWidth};});
    if(geometry.label!==undefined)near(geometry.label,geometry.heading,id+' disclosure text');assert.equal(geometry.overflow,false,'no page overflow');
   }
   await p.keyboard.press('Escape');
  }
 }
 const nojs=await browser.newPage({javaScriptEnabled:false});
 for(const width of [320,390,768,1440])for(const path of ['/','/?login=1']){
  await nojs.setViewportSize({width,height:844});await nojs.goto('http://127.0.0.1:'+server.address().port+path);
  const geometry=await nojs.locator('.javascript-notice').evaluate(e=>{const rail=document.querySelector('.gate-panel #gate-title')||document.querySelector('.page-header');return{gap:rail.getBoundingClientRect().x-e.getBoundingClientRect().x,right:e.getBoundingClientRect().right,overflow:document.documentElement.scrollWidth>innerWidth};});near(geometry.gap,4,'real no-script notice');assert.equal(geometry.overflow,false);
 }
 assert.deepEqual(errors,[]);console.log('PASS: secondary surfaces and disclosure text at seven widths, all five expanded views');
}finally{await browser.close();server.close();}

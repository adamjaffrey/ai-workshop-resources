import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await browser.newPage({reducedMotion:'reduce'});
 for(const width of [320,390,660,661,768,1024,1440]){
  await p.setViewportSize({width,height:1000});
  await p.goto('http://127.0.0.1:'+server.address().port+'/component-playground/typography');
  for(const [tab,id,ready] of [['typography','type','.notice-type-row'],['icons','icons','.icon-sample'],['errors','errors','.full-login-context'],['focus','focus','.focus-preview']]){
   await p.locator('[data-tab='+tab+']').click();const frame=p.frameLocator('#'+id+'-frame');await frame.locator(ready).first().waitFor();await p.waitForTimeout(350);
   const result=await frame.locator('body').evaluate(()=>{
    const failures=[];const near=(a,b)=>Math.abs(a-b)<.6;
    for(const e of document.querySelectorAll('.icon-row>h3,.focus-row>h3,#type-specimens>.type-row>.sample-label,#type-specimens>.agent-row>.sample-label'))if(e.checkVisibility()&&!near(e.getBoundingClientRect().left,28))failures.push(['text',e.textContent,e.getBoundingClientRect().left]);
    for(const e of document.querySelectorAll('.icon-sample:not(.error-sample)>button,.icon-sample:not(.error-sample)>.segmented-toggle,.focus-preview>.segmented-toggle,.agent-preview>.segmented-toggle,.full-login-context'))if(e.checkVisibility()){
     const r=e.getBoundingClientRect(),w=e.parentElement.getBoundingClientRect();if(!near(r.left,24))failures.push(['surface',e.className,r.left]);
     // A real scroll viewport must include the entire outset focus treatment.
     if(getComputedStyle(e.parentElement).overflowX!=='visible'&&r.left-w.left<8)failures.push(['focus clearance',e.className,r.left-w.left]);
    }
    for(const e of document.querySelectorAll('.full-login-context,.variant-preview,.feedback-preview'))if(e.checkVisibility())for(let a=e;a&&a!==document.body;a=a.parentElement){const c=getComputedStyle(a);if(c.maskImage!=='none')failures.push(['masked shadow',a.className]);}
    return {failures,overflow:document.documentElement.scrollWidth>innerWidth};
   });assert.deepEqual(result.failures,[],width+' '+tab);assert.equal(result.overflow,false,width+' '+tab+' iframe overflow');
   const wrapper=await p.locator('#'+id+'-frame').evaluate(e=>({padding:getComputedStyle(e.parentElement).paddingLeft,gap:e.getBoundingClientRect().left-e.parentElement.getBoundingClientRect().left}));assert.equal(wrapper.padding,'0px');assert.ok(Math.abs(wrapper.gap-1)<.5);
   if([390,1440].includes(width)){
    await p.screenshot({path:'/tmp/specimen-'+tab+'-'+width+'.png'});
    const target=tab==='errors'?'.full-login-context':tab==='focus'?'.focus-preview:has(>.segmented-toggle)':tab==='icons'?'.icon-sample:has(>.qr-copy)':'.variant-preview';
    if(await frame.locator(target).count()){
     await frame.locator(target).first().scrollIntoViewIfNeeded();
     await p.screenshot({path:'/tmp/specimen-detail-'+tab+'-'+width+'.png'});
    }
   }
  }
 }
 console.log('PASS: 28/24 specimen rails, scroll paint clearance, unmasked contexts and iframe containment at seven widths');
}finally{await browser.close();server.close();}

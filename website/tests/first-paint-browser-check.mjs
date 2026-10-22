import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
try {
 for(const engine of [chromium,webkit]){
  const browser=await engine.launch({headless:true,...(engine===chromium?{channel:'chrome'}:{})});
  try{
   for(const width of [320,390,768,1440])for(const path of ['/ai-workshop-resources','/component-playground']){
    const page=await browser.newPage({viewport:{width,height:900}}),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('**/assets/*',async route=>{await new Promise(resolve=>setTimeout(resolve,350));await route.continue();});
    await page.addInitScript(()=>{
     if(window!==top)return;
     localStorage.setItem('workshop-colour-theme',innerWidth<700?'dark':'light');
     localStorage.setItem('workshop-selected-agent',innerWidth<700?'claude':'codex');
     window.paintSamples=[];
     const sample=()=>{
      if(document.body&&getComputedStyle(document.body).opacity!=='0'){
       const theme=document.querySelector('.page-toolbar .theme-toggle'),slot=theme?.parentElement;
       window.paintSamples.push({
        fonts:document.fonts.status,
        geometry:[...document.querySelectorAll('.page-toolbar .brand-name,.playground-brand .brand-name,#playground-title>svg,.qr-card')].map(e=>{const r=e.getBoundingClientRect();return [r.x,r.y+scrollY,r.width,r.height];}),
        legacyHelp:!!document.querySelector('.hover-help'),
        selectors:[...document.querySelectorAll('.choice-options')].every(e=>e.classList.contains('segmented-toggle')),
        tabIcons:[...document.querySelectorAll('[data-tab]')].every(e=>!!e.querySelector('svg')),
        theme:theme&&{height:theme.offsetHeight,slot:slot.offsetHeight,right:theme.getBoundingClientRect().right,rail:document.querySelector('.page-toolbar').getBoundingClientRect().right},
       });
      }
      window.paintFrame=requestAnimationFrame(sample);
     };requestAnimationFrame(sample);
    });
    await page.goto(origin+path);
    await page.evaluate(()=>window.workshopPageReady);
    await page.waitForTimeout(200);
    for(const reload of [false,true]){
     if(reload){await page.evaluate(()=>scrollTo(0,650));await page.waitForTimeout(100);await page.reload();await page.evaluate(()=>window.workshopPageReady);await page.waitForTimeout(200);}
     const samples=await page.evaluate(()=>window.paintSamples);
     assert.ok(samples.length,`${engine.name()} ${width} ${path}: visible page`);
     for(const sample of samples){
      sample.geometry.forEach((box,i)=>box.forEach((value,j)=>assert.ok(Math.abs(value-samples.at(-1).geometry[i][j])<1,`brand/title/QR geometry drift ${engine.name()} ${width} ${path}: ${JSON.stringify(samples)}`)));
      assert.equal(sample.fonts,'loaded');assert.equal(sample.legacyHelp,false);assert.equal(sample.selectors,true);assert.equal(sample.tabIcons,true);
      if(sample.theme){assert.ok(sample.theme.height>=40,JSON.stringify(sample));assert.ok(sample.theme.slot>=sample.theme.height,JSON.stringify(sample));assert.ok(sample.theme.right<=sample.theme.rail+5,JSON.stringify(sample));}
     }
    }
    if(path.includes('playground')){
     if(width<=660)await page.locator('#style-options').click();
     else await page.evaluate(()=>scrollTo(0,0));
     await page.locator('.hover-explainer').click();assert.equal(await page.locator('#hover-explanation').isVisible(),true);
     await page.locator('.hover-explainer').click();assert.equal(await page.locator('#hover-explanation').isVisible(),false);
    }
    assert.deepEqual(errors,[]);
    if(width===1440)await page.screenshot({path:'/tmp/first-paint-'+engine.name()+(path.includes('playground')?'-playground':'-resources')+'.png'});
    await page.close();
    console.log('PASS',engine.name(),width,path,'delayed assets, initial and restored-scroll refresh');
   }
   const noJS=await browser.newPage({javaScriptEnabled:false});await noJS.goto(origin+'/ai-workshop-resources');assert.equal(await noJS.locator('body').evaluate(e=>getComputedStyle(e).opacity),'1');await noJS.close();
   const failed=await browser.newPage();await failed.route('**/assets/*',route=>route.abort());await failed.goto(origin+'/ai-workshop-resources');await failed.waitForFunction(()=>!document.documentElement.hasAttribute('data-workshop-preparing'));await failed.close();
  }finally{await browser.close();}
 }
}finally{server.close();}

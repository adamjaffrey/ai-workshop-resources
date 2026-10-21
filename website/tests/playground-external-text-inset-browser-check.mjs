// Geometry contract: verify relationships, not a particular padding implementation.
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import ink from '../lib/workshop-icon-ink.generated.json' with {type:'json'};
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
const near=(actual,expected,label)=>assert.ok(Math.abs(actual-expected)<.2,`${label}: ${actual}, expected ${expected}`);
const x=async(page,selector)=>page.locator(selector).first().evaluate(e=>e.getBoundingClientRect().left);
const gap=async(page,text,surface,label)=>near(await x(page,text)-await x(page,surface),4,label);
const headingInk=async(page,selector,rail)=>{
 const result=await page.locator(selector).first().evaluate((e,icons)=>{const svg=e.querySelector(':scope>svg');if(!svg)return null;const name=svg.dataset.iconName,m=icons[name];if(!m)throw Error('Unmeasured heading icon: '+name);const r=svg.getBoundingClientRect();return r.x+m.left*r.width/24;},ink.icons);
 if(result!==null)near(result,rail,selector+' visible icon');
};
try{
 const p=await browser.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,660,661,768,1024,1440]){
  await p.setViewportSize({width,height:1000});await p.goto(origin);
  const rail=Math.max(28,(width-952)/2);
  near(await x(p,'.page-header'),rail,'main text rail');near(await x(p,'.brand'),rail,'brand group');
  await gap(p,'.controls-label','.controls .toggle','agent rail');
  await gap(p,'article .description','article .code-wrap','nested prompt rail');
  if(width<=660)await gap(p,'.step-copy','article','stacked panel rail');
  await p.goto(origin+'/?login=1');await gap(p,'#gate-title','.password-field','login title');await gap(p,'#gate-description','.gate-submit','login intro');
  near(await x(p,'.gate-panel label'),await x(p,'#gate-title'),'password label');
  assert.ok(await x(p,'.gate-panel')>=23.9,'login surface keeps mobile gutter');
  await p.goto(origin);await p.evaluate(()=>document.querySelector('.perspective-dialog').showModal());await gap(p,'.perspective-dialog h2','.perspective-dialog button','Easter Egg dialog');
  await p.goto(origin+'/playground/components');
  for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
   await p.evaluate(({theme,agent})=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.selectedAgent=agent;},{theme,agent});
   for(const tab of ['components','typography','colours','focus','icons','errors','branding','discovery','blocks','url-reference']){
    await p.locator('[data-tab='+tab+']').click();
    if(tab==='icons'){
     const failures=await p.evaluate(ink=>[...document.querySelectorAll('.playground-icon-entry')].filter(e=>e.checkVisibility()).flatMap(entry=>{const svg=entry.querySelector('h3>svg'),r=svg.getBoundingClientRect(),v=svg.getAttribute('viewBox'),m=svg.dataset.iconVariant?ink.variants[svg.dataset.iconVariant]:v==='0 0 24 24'?{...ink.icons[svg.dataset.iconName],viewBox:24}:ink.variants[svg.dataset.iconName+':'+v];if(!m)return ['Missing icon ink '+svg.dataset.iconName+' '+v];const c=getComputedStyle(entry),rail=entry.getBoundingClientRect().left+parseFloat(c.borderLeftWidth)+parseFloat(c.paddingLeft),actual=r.x+m.left*r.width/m.viewBox;return Math.abs(actual-rail)<.2?[]:[svg.dataset.iconName+' ink '+actual+' rail '+rail];}),ink);assert.deepEqual(failures,[],'catalogue icon ink');
    }
    const panels=p.locator('[data-panel]:visible>.panel');
    for(const panel of await panels.all()){
     const rail=await panel.locator(':scope>.section-heading').evaluate(e=>e.getBoundingClientRect().left);
     const id=await panel.getAttribute('id');
     const heading=panel.locator(':scope>.section-heading h2');
     const result=await heading.evaluate((e,icons)=>{const svg=e.querySelector('svg');if(!svg)return e.getBoundingClientRect().left;const r=svg.getBoundingClientRect();if(!icons[svg.dataset.iconName])throw Error('Missing measured icon '+svg.dataset.iconName);return r.x+icons[svg.dataset.iconName].left*r.width/24;},ink.icons);near(result,rail,'card heading ink');
     for(const copy of await panel.locator(':scope>p,:scope>.feather-notice>p').all())if(await copy.isVisible())near(await copy.evaluate(e=>e.getBoundingClientRect().left),rail,'card text');
     for(const choices of await panel.locator('.choices:visible').all()){
      const legend=choices.locator('legend'),shell=choices.locator(':scope>.choice-shell');if(await shell.count())near((await legend.boundingBox()).x-(await shell.boundingBox()).x,4,'toggle label stays on text rail');
     }
    }
   }
  }
  await p.locator('[data-tab=components]').click();await p.evaluate(()=>scrollTo(0,0));
  await headingInk(p,'#playground-title',Math.max(28,(width-1192)/2));
  if(width<=660){await p.locator('body>#style-options').click();near(await x(p,'#theme legend')-await x(p,'#theme .choice-shell'),4,'mobile options');near(await x(p,'#style-dialog-title'),await x(p,'#agent legend'),'dialog heading rail');await p.keyboard.press('Escape');}
  for(const [tab,name] of [['components','login'],['components','resources'],['branding','branding'],['discovery','discovery'],['blocks','blocks']]){
   await p.locator('[data-tab='+tab+']').click();const dialog=p.locator('#'+name+'-preview');await dialog.locator('.preview-expand').click();
   const frame=await dialog.locator(':scope>.frame-wrap').boundingBox();near(frame.x,24,'expanded surface gutter');
   await headingInk(p,'#'+name+'-preview>.section-heading h2',frame.x+4);
   await p.keyboard.press('Escape');
  }
  await p.locator('[data-tab=branding]').click();await p.evaluate(()=>document.getElementById('worm-copy-fallback').hidden=false);near(await x(p,'#worm-copy-fallback'),await x(p,'#worm-copy-text'),'square textarea rail');
  await p.locator('[data-tab=discovery]').click();await p.evaluate(()=>{document.getElementById('perspective-copy-fallback').hidden=false;document.getElementById('perspective-copy-status').textContent='Select and copy the settings below.'});near(await x(p,'#perspective-copy-status'),await x(p,'#perspective-copy-text'),'copy status and square field');
  if([390,1440].includes(width))for(const [tab,id] of [['icons','icons'],['errors','errors'],['focus','focus']]){
   await p.locator('[data-tab='+tab+']').click();const frame=p.frameLocator('#'+id+'-frame');await frame.locator('.icon-row,.focus-row').first().waitFor();
   // Unicode prompts intentionally open scrolled to their symbol. Rail geometry
   // is measured at the start; the dedicated Unicode check covers initial scroll.
   await frame.locator('.icon-sample,.focus-preview').evaluateAll(es=>es.forEach(e=>e.scrollLeft=0));
   const problems=await frame.locator('body').evaluate(()=>[...document.querySelectorAll('.icon-sample>button,.icon-sample>.toggle,.icon-sample>.theme-toggle,.icon-sample>.code-wrap,.focus-preview>.code-wrap,.focus-preview>.segmented-toggle')].filter(e=>e.checkVisibility()).flatMap(e=>{const row=e.closest('.icon-row,.focus-row'),rail=row.querySelector('h3').getBoundingClientRect().left,r=e.getBoundingClientRect(),wrap=e.parentElement.getBoundingClientRect();return Math.abs(rail-r.left-(e.matches('.step-anchor')?0:e.closest('[data-exterior-ring]')?-2:e.matches('.focus-preview>.segmented-toggle')?3:4))<.2&&r.left>=(getComputedStyle(e.parentElement).overflowX==='visible'?0:wrap.left)-.2?[]:[e.className+' rail '+rail+' surface '+r.left+' wrapper '+wrap.left];}));assert.deepEqual(problems,[],tab+' specimen surfaces and clipping clearance');
  }
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no page overflow');
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: two-rail alignment at seven widths, all Playground tabs/both themes/agents, five expanded views, login, Easter Egg dialog, square fallback fields and measured heading ink');
}finally{await browser.close();await new Promise(r=>server.close(r));}

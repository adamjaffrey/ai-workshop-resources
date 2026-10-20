import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:1000});
  // Deliberately initialise Components while hidden: this used to pin both controls at x=0.
  await page.goto(origin+'/component-playground/url-reference');
  await page.locator('#tab-components').click();
  const resources=page.frameLocator('#resources-frame');
  await resources.locator('.controls .toggle').waitFor();
  await page.locator('#resources-frame').scrollIntoViewIfNeeded();
  // The scheduler may still be delivering settings after the frame becomes visible.
  await resources.locator('body').evaluate(()=>new Promise((resolve,reject)=>{
   const deadline=performance.now()+5000;const check=()=>{
    const controls=[...document.querySelectorAll('.segmented-toggle')];
    if(controls.length&&controls.every(e=>e.getBoundingClientRect().width>90&&e.querySelector('.toggle-indicator').getBoundingClientRect().width>30))return resolve();
    if(performance.now()>deadline)return reject(Error('Revealed controls did not finish layout'));
    setTimeout(check,50);
   };check();
  }));
  assert.equal(await resources.locator('[data-locked]').count(),0,'Revealed iframe controls are in their normal positions');
  const controls=await resources.locator('.segmented-toggle').evaluateAll(es=>es.map(e=>({width:e.getBoundingClientRect().width,indicator:e.querySelector('.toggle-indicator').getBoundingClientRect().width})));
  assert.ok(controls.every(c=>c.width>90&&c.indicator>30),'Both controls and their indicators have real dimensions: '+JSON.stringify({width,controls}));
  if([390,1440].includes(width)){await page.locator('#resources-frame').scrollIntoViewIfNeeded();await page.waitForTimeout(200);await page.screenshot({path:'/tmp/fixed-controls-'+width+'.png'});}
  await page.locator('#tab-icons').click();
  await page.locator('#playground-icon-family input[value=lucide]').check();
  assert.ok(await page.locator('.playground-icon-entry:visible').count()>0);
  assert.equal(await page.locator('.playground-icon-entry:visible:not([data-icon-family=lucide])').count(),0);
  const cropped=page.locator('[data-catalog-variant=cropped]');
  assert.equal(await cropped.locator('h3 svg').getAttribute('viewBox'),'6 6 12 12');
  assert.ok((await cropped.textContent()).includes('Cropped for Links'));
  for(const [tab,frameId,selector] of [['icons','icons','.icon-sample'],['focus','focus','.focus-preview'],['errors','errors','.error-sample:has(.full-login-context)']]){
   await page.locator('#tab-'+tab).click();const frame=page.frameLocator('#'+frameId+'-frame');await frame.locator(selector).first().waitFor();
   const failures=await frame.locator(selector).evaluateAll(es=>es.filter(e=>e.checkVisibility()).flatMap(e=>{const child=e.firstElementChild;if(!child)return [];const c=child.getBoundingClientRect(),style=getComputedStyle(e);const gap=c.left;return gap>=23.5&&(!e.querySelector('.full-login-context')||style.maskImage==='none')?[]:[{class:e.className,gap,mask:style.maskImage}];}));
   assert.deepEqual(failures,[],tab+' retains grey-gutter paint clearance without duplicate inset');
   if(width===390){await frame.locator(selector).first().evaluate(e=>e.scrollIntoView({block:'center'}));await page.waitForTimeout(150);await page.screenshot({path:'/tmp/fixed-'+tab+'.png'});}
  }
  const errorFrame=page.frameLocator('#errors-frame');
  const notice=errorFrame.locator('#errors-login [data-state="JavaScript Unavailable"] .javascript-notice');
  const noticeGap=await notice.evaluate(e=>{const panel=e.closest('.gate-panel'),style=getComputedStyle(panel);const zoom=parseFloat(style.zoom)||1;return (panel.getBoundingClientRect().left-e.getBoundingClientRect().left)/zoom+parseFloat(style.borderLeftWidth)+parseFloat(style.paddingLeft);});
  assert.ok(Math.abs(noticeGap-4)<.5,'Captured login notice retains its 4px outdent');
  await page.locator('#tab-url-reference').click();
  const names=await page.locator('#panel-url-reference h2>svg,#panel-url-reference h3>svg').evaluateAll(es=>es.map(e=>e.dataset.iconName));assert.equal(new Set(names).size,names.length,'Unique URL section icons');
  assert.ok(await page.locator('#panel-url-reference .url-code-block').count()>0,'Fenced examples are visible code panels');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  if(width===390){await page.locator('.url-code-block').first().scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/fixed-url-code.png'});}
 }
 assert.deepEqual(errors,[]);console.log('PASS: hidden iframe recovery, specimen clearance, login notice, icon family, cropped arrow and URL code panels at four widths');
}finally{await browser.close();server.close();}

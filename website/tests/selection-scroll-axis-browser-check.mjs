import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';

const {server}=createPhonePreview({autoLogin:true});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage();
let count=0;
const issues=[];
try {
 for(const width of [320,390,768,1440]) {
  await page.setViewportSize({width,height:900});
  for(const path of ['/','/?login=1','/playground']) {
   await page.goto('http://127.0.0.1:'+server.address().port+path);
   const tabs=path==='/playground'?['components','typography','icons','focus','errors','colours','branding','discovery','blocks']:[null];
   for(const tab of tabs) {
    if(tab) {await page.locator('[data-tab='+tab+']').click();await page.waitForTimeout(350);}
    for(const frame of page.frames()) {
     const result=await frame.evaluate(()=>{
      const out=[];
      let count=0;
      const selectors='.choice-options,nav[role=tablist],.segmented-toggle,.agent-preview,.icon-sample:has(>.segmented-toggle),.focus-preview:has(>.segmented-toggle)';
      for(const element of document.querySelectorAll(selectors)) {
       if(!element.checkVisibility())continue;
       const style=getComputedStyle(element);
       if(!/auto|scroll/.test(style.overflowX))continue;
       count++;
       const rangeX=element.scrollWidth-element.clientWidth;
       element.scrollLeft=100;
       if(rangeX<=0&&element.scrollLeft!==0)out.push({cls:element.className,unexpectedHorizontalOffset:element.scrollLeft});
       if(style.overflowX==='scroll')out.push({cls:element.className,forcedHorizontalScrollbar:true});
       element.scrollLeft=0;
       element.scrollTop=100;
       if(!['hidden','clip'].includes(style.overflowY)||element.scrollTop!==0)out.push({id:element.id,cls:element.className,y:style.overflowY,offset:element.scrollTop,range:element.scrollHeight-element.clientHeight});
       element.scrollTop=0;
      }
      return {count,out};
     });
     count+=result.count;
     issues.push(...result.out.map(issue=>({width,path,tab,frame:frame.name(),...issue})));
    }
   }
  }
 }
 assert.ok(count>100);
 assert.deepEqual(issues,[]);
 console.log('PASS: '+count+' selection regions have no vertical movement or forced horizontal scrolling; fitting content stays still');
} finally {await browser.close();server.close();}

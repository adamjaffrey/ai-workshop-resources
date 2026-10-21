import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
  const page=await browser.newPage({reducedMotion:'reduce'});
  for(const width of [320,390,660,661,768,1024,1440]) for(const theme of ['light','dark']) for(const agent of ['codex','claude-code']) {
    await page.setViewportSize({width,height:900});
    for(const path of ['/','/?show-login=true']) {
      await page.goto(origin+path);
      await page.evaluate(({theme,agent})=>{document.documentElement.dataset.theme=theme;window.workshopAgent.select(agent);},{theme,agent});
      const login=path.includes('login');
      const data=await page.evaluate(login=>{
        const style=selector=>{const c=getComputedStyle(document.querySelector(selector));return {start:c.paddingInlineStart,end:c.paddingInlineEnd};};
        const external=login?['.gate-panel label','.gate-error']:['.controls-label','.step-copy','.description'];
        return {external:external.map(style),control:style(login?'.password-field input':'.toggle button'),panel:style(login?'.gate-panel':'article'),prompt:login?null:style('pre'),overflow:document.documentElement.scrollWidth>innerWidth,
          stepAlign:login?null:getComputedStyle(document.querySelector('.step-row:nth-child(even) .step-marker')).textAlign};
      },login);
      for(const padding of data.external)assert.deepEqual(padding,{start:'4px',end:'4px'});
      assert.deepEqual(data.control,login?{start:'44px',end:'14px'}:{start:'18px',end:'18px'});
      assert.deepEqual(data.panel,{start:width<=700?'24px':'32px',end:width<=700?'24px':'32px'});
      if(!login){assert.deepEqual(data.prompt,{start:'16px',end:'16px'});assert.equal(data.stepAlign,width<=660?'left':'right');}
      assert.equal(data.overflow,false,`${width} ${theme} ${agent} ${path}`);
    }
  }
  console.log('External 4px insets, unchanged control/panel/prompt padding, responsive alignment and overflow passed across seven widths, two themes and both agents.');
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}

import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
  for(const destination of ['login','resources']) {
    const context=await browser.newContext({javaScriptEnabled:false});
    if(destination==='resources')await context.request.post(origin+'/auth/login',{headers:{origin,accept:'application/json'},form:{password}});
    const page=await context.newPage();
    await page.goto(origin+'/');
    for(const width of [320,390,768,1440])for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']) {
      await page.setViewportSize({width,height:900});
      await page.evaluate(({theme,agent})=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.selectedAgent=agent;},{theme,agent});
      const notice=page.locator('.javascript-notice');
      assert.equal(await notice.isVisible(),true);
      assert.equal(await notice.locator('[data-icon-name=x]').count(),1);
      const metrics=await notice.evaluate(e=>{const c=getComputedStyle(e),r=e.getBoundingClientRect();const probe=document.createElement('span');probe.style.color='var(--error)';e.append(probe);const error=getComputedStyle(probe).color;probe.remove();return {colour:c.color,error,size:c.fontSize,weight:c.fontWeight,line:c.lineHeight,left:r.left,right:r.right,top:r.top,bottom:r.bottom};});
      assert.equal(metrics.colour,metrics.error);assert.equal(metrics.size,'14px');assert.equal(metrics.weight,'400');assert.equal(metrics.line,'21px');
      assert.ok(metrics.left>=0&&metrics.right<=width);
      if(destination==='login') {
        const description=await page.locator('#gate-description').boundingBox(),label=await page.locator('label[for=workshop-password]').boundingBox();
        assert.ok(metrics.top>=description.y+description.height);assert.ok(metrics.bottom<label.y);
        assert.equal(await page.locator('#workshop-password').getAttribute('aria-invalid'),null);
      } else {
        const header=await page.locator('.page-header').boundingBox(),cards=await page.locator('.cards').boundingBox();
        assert.ok(metrics.top>=header.y+header.height);assert.ok(metrics.bottom<=cards.y);
      }
      if(width===390&&theme==='light'&&agent==='codex')await page.screenshot({path:'/tmp/'+destination+'-nojs.png'});
    }
    await context.close();
  }
  console.log('PASS: real no-JavaScript notices, placement, shared error tokens, X icons and typography at four widths in both themes and agents');
}finally{await browser.close();server.close();}

import assert from 'node:assert/strict';
import {once} from 'node:events';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {dayOnePrompt} from '../lib/workshop-day-one-page.mjs';
const {server,password}=createPhonePreview({autoLogin:true});
server.listen(0,'127.0.0.1');await once(server,'listening');
const origin='http://127.0.0.1:'+server.address().port;
try {
 for(const engine of [chromium,webkit]){
  const browser=await engine.launch({headless:true,...(engine===chromium?{channel:'chrome'}:{})});
  try{
   for(const width of [390,1440]){
    const page=await browser.newPage({viewport:{width,height:900}}),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.addInitScript(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{window.copied=text;}}}));
    console.log(engine.name(),width,'open');
    await page.goto(origin+'/day-1-resources');
    await page.waitForFunction(()=>!document.documentElement.hasAttribute('data-workshop-preparing'));
    assert.equal(await page.locator('h1').innerText(),'Day 1 Resources');
    assert.equal(await page.locator('a.page-title-link').getAttribute('href'),'/day-1-resources');
    assert.equal(await page.locator('.step-row').count(),2);
    assert.equal(await page.locator('.step-row').nth(1).locator('h3').innerText(),'System Brick Builder');
    assert.equal(await page.locator('.step-row').nth(1).locator('.slug').innerText(),'system-brick-builder');
    for(const agent of ['codex','claude-code']){
     await page.locator('[data-agent="'+agent+'"]').click();
     assert.equal(await page.locator('#system-brick-builder').textContent(),dayOnePrompt);
     await page.locator('[data-copy="system-brick-builder"]').click();
     assert.equal(await page.evaluate(()=>window.copied),dayOnePrompt);
    }
    await page.locator('[data-anchor="step-2-system-brick-builder"]').click();
    assert.match(await page.evaluate(()=>window.copied),/\/day-1-resources(?:\?[^#]*)?#step-2-system-brick-builder$/);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.screenshot({path:'/tmp/day-one-'+engine.name()+'-'+width+'.png',fullPage:true});
    await page.goto(origin+'/ai-workshop-resources');
    assert.equal(await page.locator('.step-row').count(),3);
    assert.notEqual(await page.locator('#system-blueprint-creator').textContent(),dayOnePrompt);
    await page.goto(origin+'/day-1-resources?login=false&theme=dark#step-2');
    await page.locator('#workshop-password').fill(password);
    await page.locator('#access-form button[type="submit"]').click();
    await page.waitForURL('**/day-1-resources?theme=dark#step-2-system-brick-builder');
    assert.equal(await page.locator('#system-brick-builder').textContent(),dayOnePrompt);
    await page.goto(origin+'/day-1-resources#step-3');
    await page.waitForTimeout(200);
    assert.deepEqual(errors,[]);
    await page.close();
   }
  }finally{await browser.close();}
 }
 console.log('Day 1: Chromium/WebKit, 390/1440px, both agents, exact prompt/copy, original page, login return, anchors and overflow passed.');
}finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}

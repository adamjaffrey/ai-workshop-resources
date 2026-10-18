import assert from 'node:assert/strict';
import {once} from 'node:events';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:768,height:1000},hasTouch:true,reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:'+server.address().port);
 await page.locator('#workshop-password').fill(password);await page.locator('.gate-submit').click();await page.locator('#access-gate').waitFor({state:'detached'});
 await page.evaluate(()=>{window.copyCount=0;Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>window.copyCount++}});});
 const qr=page.locator('.qr-copy');const count=()=>page.evaluate(()=>window.copyCount);
 assert.equal(await page.evaluate(()=>matchMedia('(hover: none)').matches),true);
 await qr.tap();assert.equal(await count(),0);assert.equal(await qr.locator('.qr-copy-overlay').evaluate(e=>getComputedStyle(e).opacity),'1');
 await qr.tap();assert.equal(await count(),0,'rapid second tap is ignored');
 await qr.dispatchEvent('blur');assert.equal(await qr.getAttribute('data-touch-preview'),'');await page.waitForTimeout(320);await qr.tap();assert.equal(await count(),1);
 await page.waitForTimeout(5100);assert.equal(await qr.locator('.qr-copy-overlay').evaluate(e=>getComputedStyle(e).opacity),'0');
 await qr.tap();await page.locator('h1').tap();assert.equal(await qr.getAttribute('data-touch-preview'),null);
 await qr.tap();assert.equal(await count(),1);await qr.press('Enter');assert.equal(await count(),2,'keyboard activation remains immediate');
 await qr.click();assert.equal(await count(),3,'mouse activation remains immediate on hybrid devices');
 // Reproduce Safari's touch pointerdown followed by a MouseEvent click.
 await page.reload();await page.evaluate(()=>{window.copyCount=0;Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>window.copyCount++}});});
 const safariTap=()=>qr.evaluate(e=>{e.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerType:'touch'}));e.dispatchEvent(new MouseEvent('click',{bubbles:true,detail:1}));});
 await safariTap();assert.equal(await count(),0);await page.waitForTimeout(320);await safariTap();assert.equal(await count(),1);
 // Same production script inside a 768px-wide specimen on a narrow touch host.
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:'+server.address().port+'/playground');
 await page.locator('#style-options').click();await page.locator('input[name=width][value="768"]').locator('..').click();await page.locator('#style-options').click();
 const source=page.frameLocator('#resources-frame');
 await source.locator('body').evaluate(()=>{window.copyCount=0;Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>window.copyCount++}});});
 const sampleQR=source.locator('.qr-copy');await sampleQR.tap();assert.equal(await source.locator('body').evaluate(()=>window.copyCount),0);await page.waitForTimeout(320);await sampleQR.tap();assert.equal(await source.locator('body').evaluate(()=>window.copyCount),1);
 console.log('PASS: touch reveal, cooldown, second-tap copy, outside dismissal, feedback reset, keyboard and mouse activation');
}finally{await browser.close();server.close();}

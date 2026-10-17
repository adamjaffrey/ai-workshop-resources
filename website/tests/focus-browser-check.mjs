import assert from 'node:assert/strict';
import {once} from 'node:events';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview();server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 for(const width of [390,1440]){
 const page=await browser.newPage({viewport:{width,height:844},hasTouch:true,reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:'+server.address().port);
 const active=()=>page.evaluate(()=>({id:document.activeElement.id,agent:document.activeElement.dataset.agent,theme:document.activeElement.dataset.themeChoice,ring:getComputedStyle(document.activeElement).outlineStyle}));
 assert.equal((await active()).id,'gate-title');assert.equal((await active()).ring,'none');
 await page.keyboard.press('Tab');assert.notEqual((await active()).ring,'none');
 await page.keyboard.press('Space');assert.equal((await active()).theme,await page.locator('html').getAttribute('data-theme'));assert.notEqual((await active()).ring,'none');
 await page.keyboard.press('Tab');assert.equal((await active()).id,'workshop-password');
 await page.locator('#workshop-password').tap();assert.notEqual(await page.locator('.password-field').evaluate(e=>getComputedStyle(e).outlineStyle),'none');
 await page.locator('#workshop-password').fill(password);await page.getByRole('button',{name:'Unlock Resources',exact:true}).click();await page.locator('#access-gate').waitFor({state:'detached'});
 await page.locator('[data-agent="codex"]').focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');
 await page.keyboard.press('Space');assert.equal((await active()).agent,'claude-code');assert.notEqual((await active()).ring,'none');
 const toggle=await page.locator('.toggle').boundingBox();await page.mouse.click(toggle.x+2,toggle.y+toggle.height/2);
 assert.equal((await active()).agent,'codex');assert.equal((await active()).ring,'none');
 await page.locator('[data-agent="claude-code"]').tap();assert.equal((await active()).agent,'claude-code');assert.equal((await active()).ring,'none');
 await page.locator('[data-agent="claude-code"]').tap();assert.equal((await active()).agent,'codex');assert.equal((await active()).ring,'none');
 await page.locator('pre').first().click();assert.equal(await page.locator('.code-wrap').first().evaluate(e=>getComputedStyle(e,'::after').outlineStyle),'none');
 // Exercise the same opening policy for native panels added after load.
 for(const kind of ['dialog','popover']){
 await page.evaluate(kind=>{const p=document.createElement(kind==='dialog'?'dialog':'div');p.id='test-panel';if(kind==='popover')p.setAttribute('popover','');p.innerHTML='<h2 id="test-title">Panel</h2><button id="test-action">Continue</button>';p.setAttribute('aria-labelledby','test-title');document.body.append(p);kind==='dialog'?p.showModal():p.showPopover();},kind);
 await page.waitForFunction(()=>document.activeElement.id==='test-title');assert.equal((await active()).ring,'none');
 await page.keyboard.press('Tab');assert.equal((await active()).id,'test-action');assert.notEqual((await active()).ring,'none');
 await page.locator('#test-action').tap();assert.equal((await active()).ring,'none');
 await page.evaluate(()=>document.getElementById('test-panel').remove());
 }
 await page.close();
 }
 console.log('PASS: heading-first panel opening, first Tab ring, input focus, selector destination focus, pointer/touch suppression, keyboard rings, dialog and popover openings');
}finally{await browser.close();await new Promise(r=>server.close(r));}

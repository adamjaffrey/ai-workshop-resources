import assert from 'node:assert/strict';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({channel:'chrome', headless:true});
const page = await browser.newPage({viewport:{width:1440,height:900}});
const errors=[];
page.on('pageerror', error=>errors.push(error.message));
await page.goto(new URL('../outputs/workshop-resources-preview.html',import.meta.url).href);
await page.waitForTimeout(800);
assert.deepEqual(await page.locator('.step-row').evaluateAll(rows => rows.map(row =>
 [...row.children].map(element => getComputedStyle(element).getPropertyValue('--reveal-offset').trim())
)), [['-64px','-64px'],['64px','64px'],['-64px','-64px']]);
assert.equal(await page.locator('.step-row').last().evaluate(e=>e.classList.contains('is-revealed')),false);
await page.locator('[data-agent="claude-code"]').click();
assert.ok(await page.locator('.controls .toggle-indicator').evaluate(e=>e.getAnimations().length>0));
await page.waitForTimeout(600);
assert.ok(await page.locator('.toggle').evaluate(e=>{
 const indicator=e.querySelector('.toggle-indicator').getBoundingClientRect();
 const button=e.querySelector('[aria-pressed="true"]').getBoundingClientRect();
 return Math.abs(indicator.left-button.left)<1 && Math.abs(indicator.width-button.width)<1;
}));
for (const row of await page.locator('.step-row').all()) {
 await row.scrollIntoViewIfNeeded();
 await page.waitForTimeout(800);
 assert.ok(await row.evaluate(e=>e.classList.contains('is-revealed')));
}
for (const agent of ['claude-code','codex']) {
 if(await page.locator(`[data-agent="${agent}"]`).getAttribute("aria-pressed")!=="true")await page.locator(`[data-agent="${agent}"]`).click();
 await page.waitForFunction(agent=>window.workshopAgent.current===agent,agent);
 for(const skill of ['system-blueprint-creator','system-build-assistant']) {
  assert.match(await page.locator(`code#${skill}`).textContent(), new RegExp('```\\nnpx[^\\n]+--agent '+agent+'[^\\n]+\\n```'));
 }
}
await page.evaluate(()=>scrollTo(0,0));
await page.waitForTimeout(800);
await page.screenshot({path:'/tmp/workshop-motion-desktop.png',fullPage:true});
await page.emulateMedia({reducedMotion:'reduce'});
await page.locator('[data-agent="claude-code"]').click();
assert.equal(await page.locator('.controls .toggle-indicator').evaluate(e=>e.getAnimations().length),0);
assert.deepEqual(errors,[]);
await browser.close();
console.log('PASS: toggle spring, final alignment, alternating scroll reveals, fenced commands and reduced motion');

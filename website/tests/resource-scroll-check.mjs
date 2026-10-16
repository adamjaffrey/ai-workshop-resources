const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
const browser = await chromium.launch({channel: 'chrome', headless: true});
const page = await browser.newPage({viewport: {width: 1440, height: 1000}, hasTouch: true});
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.goto(new URL('../outputs/workshop-resources-preview.html', import.meta.url).href);
for (const width of [1920, 1440, 1024, 801, 800, 390, 320]) {
  await page.setViewportSize({width, height: 1000});
  const layout = await page.evaluate(() => {
    const box = element => { const r = element.getBoundingClientRect(); return {x:r.x, y:r.y, width:r.width, bottom:r.bottom}; };
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      scrollable: document.querySelector('.cards').scrollWidth > document.querySelector('.cards').clientWidth,
      headings: [...document.querySelectorAll('.step-title')].map(e => e.textContent),
      rows: [...document.querySelectorAll('.step-row')].map(e => ({marker:box(e.querySelector('.step-marker')), card:box(e.querySelector('article'))})),
      codeHeights: [...document.querySelectorAll('pre')].map(e => e.offsetHeight)
    };
  });
  assert.ok(!layout.overflow && !layout.scrollable);
  assert.deepEqual(layout.headings, ['Step 1', 'Step 2', 'Step 3']);
  assert.equal(new Set(layout.codeHeights).size, 1);
  layout.rows.forEach(({marker, card}, index) => {
    if (width > 800) assert.ok(index % 2 ? card.x < marker.x : card.x > marker.x);
    else { assert.equal(card.x, marker.x); assert.ok(card.y >= marker.bottom + 23); }
    if (index) assert.ok(card.y > layout.rows[index - 1].card.bottom);
  });
  console.log(`PASS: alternating layout at ${width}px`);
}
await page.setViewportSize({width:1440, height:1000});
await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {configurable:true, value:{writeText:async text => { window.copiedPrompt = text; }}}));
for (const agent of ['codex', 'claude-code']) {
  await page.locator(`[data-agent="${agent}"]`).click();
  for (const button of await page.locator('[data-copy]').all()) {
    await button.click();
    const card = button.locator('xpath=ancestor::article');
    assert.equal(await button.locator('.copy-label').textContent(), 'Copied');
    assert.equal(await page.evaluate(() => window.copiedPrompt), await card.locator('code').textContent());
    assert.match(await card.locator('.status').textContent(), /^Prompt copied/);
  }
}
await page.locator('[data-agent="codex"]').click();
await page.locator('pre').first().hover();
const before = await page.evaluate(() => ({y:scrollY, prompt:document.querySelector('pre').scrollTop}));
await page.mouse.wheel(0, 80);
await page.waitForTimeout(80);
const after = await page.evaluate(() => ({y:scrollY, prompt:document.querySelector('pre').scrollTop, x:document.querySelector('.cards').scrollLeft}));
assert.ok(after.y > before.y);
assert.equal(after.prompt, before.prompt);
assert.equal(after.x, 0);
assert.deepEqual(errors, []);
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({path:'/tmp/workshop-alternating-desktop.png', fullPage:true});
await page.setViewportSize({width:390, height:844});
await page.locator('.step-row').first().scrollIntoViewIfNeeded();
await page.screenshot({path:'/tmp/workshop-alternating-mobile.png'});
await browser.close();
console.log('PASS: all copy actions in both themes; vertical page scrolling; no horizontal row or page scrolling; no page errors');

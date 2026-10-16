import assert from 'node:assert/strict';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({channel: 'chrome', headless: true});
try {
  const page = await browser.newPage();
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({width, height: 1000});
    for (const theme of ['light', 'dark']) {
      await page.goto(new URL('../outputs/login-design-preview.html', import.meta.url).href);
      await page.evaluate(theme => {document.documentElement.dataset.theme = theme;}, theme);
      assert.equal(await page.locator('.page-placeholder .step-row').count(), 3);
      assert.equal(await page.locator('.page-placeholder').getAttribute('inert'), '');
      assert.equal((await page.locator('.page-placeholder').innerText()).trim(), '');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      const layout = await page.locator('.step-row').first().evaluate(el => ({x: el.getBoundingClientRect().x, width: el.getBoundingClientRect().width, columns: getComputedStyle(el).gridTemplateColumns}));
      if (width === 1440 && theme === 'light') await page.screenshot({path: new URL('../outputs/blur-preview.png', import.meta.url).pathname});
      await page.getByRole('button', {name: 'Password panel', exact: true}).click();
      await page.locator('#access-form').waitFor({state:'visible'});
      await page.goto(new URL('../outputs/workshop-resources-preview.html', import.meta.url).href);
      const resource = await page.locator('.step-row').first().evaluate(el => ({x: el.getBoundingClientRect().x, width: el.getBoundingClientRect().width, columns: getComputedStyle(el).gridTemplateColumns}));
      assert.deepEqual(layout, resource);
    }
  }
  console.log('Placeholder Chrome checks passed: shared columns, three steps, no text, no overflow, panel, four widths and both themes');
} finally { await browser.close(); }

// Generate both standalone previews before running. Uses installed Chrome.
import assert from 'node:assert/strict';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({channel: 'chrome', headless: true});
const context = await browser.newContext({colorScheme: 'dark', reducedMotion: 'reduce'});
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const resource = new URL('../outputs/workshop-resources-preview.html', import.meta.url).href;
const login = new URL('../outputs/login-design-preview.html', import.meta.url).href;
const theme = () => page.locator('html').getAttribute('data-theme');
const choose = async mode => { if (await theme() !== mode) await page.getByRole('button', {name: mode === 'dark' ? 'Dark mode' : 'Light mode', exact: true}).click(); };
const selectAgent = async agent => { const button = page.locator(`[data-agent="${agent}"]`); if (await button.getAttribute('aria-pressed') !== 'true') await button.click(); };
await page.goto(resource);
assert.equal(await theme(), 'dark');
await page.emulateMedia({colorScheme: 'light'});
await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
assert.equal(await theme(), 'light');
await choose('dark');
await page.reload();
assert.equal(await theme(), 'dark');
await page.emulateMedia({colorScheme: 'light'});
assert.equal(await theme(), 'dark');
for (const width of [1440, 768, 390, 320]) {
  await page.setViewportSize({width, height: 1000});
  for (const mode of ['light', 'dark']) {
    await choose(mode);
    for (const agent of ['codex', 'claude-code']) {
      await selectAgent(agent);
      assert.equal(await page.locator(`[data-theme-choice="${mode}"]`).getAttribute('aria-pressed'), 'true');
      assert.equal(await page.locator('[data-theme-choice][aria-pressed="true"]').count(), 1);
      const metrics = await page.evaluate(() => {
        const css = selector => getComputedStyle(document.querySelector(selector));
        const light = document.querySelector('[data-theme-choice="light"]').getBoundingClientRect();
        const dark = document.querySelector('[data-theme-choice="dark"]').getBoundingClientRect();
        return {overflow: document.documentElement.scrollWidth > innerWidth, ordered: light.right <= dark.left,
          text: css('.description').color, surface: css('.code-wrap').backgroundColor, qr: css('.qr-card').backgroundColor,
          copy: css('.copy').color, heading: css('h1').color};
      });
      assert.ok(!metrics.overflow && metrics.ordered);
      assert.equal(metrics.surface, metrics.qr);
      assert.equal(metrics.copy, metrics.heading);
      assert.equal(metrics.text, mode === 'dark' ? 'rgb(183, 190, 200)' : 'rgb(91, 96, 102)');
      assert.ok((await page.locator('#system-build-assistant').textContent()).includes('--agent ' + agent));
    }
  }
}
// Check text against its actual composited surface in both accent palettes.
for (const mode of ['light', 'dark']) {
  await choose(mode);
  for (const agent of ['codex', 'claude-code']) {
    await selectAgent(agent);
    const ratios = await page.evaluate(() => {
      const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d');
      const rgb = colour => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = colour; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3); };
      const lum = colour => rgb(colour).map(c => { const v = c / 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }).reduce((a, v, i) => a + v * [.2126, .7152, .0722][i], 0);
      return [['.description', 'article'], ['.slug', 'article'], ['pre', '.code-wrap'], ['.code-label', '.code-wrap'], ['.intro', 'html'], ['.step-title', 'html']].map(([fg, bg]) => {
        const a = lum(getComputedStyle(document.querySelector(fg)).color), b = lum(getComputedStyle(document.querySelector(bg)).backgroundColor);
        return {fg, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05)};
      });
    });
    for (const {fg, ratio} of ratios) assert.ok(ratio >= (fg === '.step-title' ? 3 : 4.5), `${mode}/${agent}/${fg}: ${ratio}`);
  }
}
// Either half reverses its control, even when already selected.
for (const selector of ['[data-theme-choice="light"]', '[data-theme-choice="dark"]', '[data-agent="codex"]', '[data-agent="claude-code"]']) {
  const attribute = selector.includes('theme-choice') ? 'data-theme' : 'data-selected-agent';
  const before = await page.locator('html').getAttribute(attribute);
  await page.locator(selector).click();
  assert.notEqual(await page.locator('html').getAttribute(attribute), before);
  await page.locator(selector).click();
  assert.equal(await page.locator('html').getAttribute(attribute), before);
}
for (const width of [1440, 390, 320]) {
  await page.setViewportSize({width, height: 1000});
  assert.deepEqual(await page.locator('.segmented-toggle').evaluateAll(els => els.map(e => e.getBoundingClientRect().height)), [50, 50]);
}
await page.setViewportSize({width: 1440, height: 1000});
await selectAgent('codex');
await choose('dark');
await page.locator('[data-theme-choice="light"]').focus();
await page.keyboard.press('Enter');
assert.equal(await theme(), 'light');
await page.keyboard.press('Tab');
await page.keyboard.press('Space');
assert.equal(await theme(), 'dark');
await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {value: {writeText: async text => { window.copiedText = text; }}, configurable: true}));
await page.locator('[data-copy]').first().click();
assert.equal(await page.locator('.copy-label').first().textContent(), 'Copied');
assert.equal(await page.evaluate(() => window.copiedText), await page.locator('#nodejs-setup').textContent());
await page.screenshot({path: '/tmp/workshop-theme-dark.png', fullPage: true});
await choose('light');
await page.screenshot({path: '/tmp/workshop-theme-light.png', fullPage: true});
await page.goto(login);
await page.getByRole('button', {name: 'Password panel', exact: true}).click();
for (const mode of ['dark', 'light']) {
  await choose(mode);
  assert.equal(await page.locator('.gate-panel').evaluate(e => getComputedStyle(e).backgroundColor), mode === 'dark' ? 'rgb(25, 29, 35)' : 'rgb(255, 255, 255)');
}
await page.setViewportSize({width: 320, height: 800});
await choose('dark');
assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
await page.screenshot({path: '/tmp/workshop-theme-login.png', fullPage: true});
// Storage may be disabled by the browser; toggling must still work.
const blocked = await browser.newContext({colorScheme: 'dark'});
await blocked.addInitScript(() => Object.defineProperty(window, 'localStorage', {get() { throw new Error('Storage disabled'); }}));
const blockedPage = await blocked.newPage();
await blockedPage.goto(resource);
await blockedPage.getByRole('button', {name: 'Light mode', exact: true}).click();
assert.equal(await blockedPage.locator('html').getAttribute('data-theme'), 'light');
const {resourcePage, loginPage} = await import('../lib/workshop-pages.mjs');
const originContext = await browser.newContext({colorScheme: 'light'});
await originContext.route('http://workshop.test/**', route => {
  const path = new URL(route.request().url()).pathname;
  if (path === '/login.js') return route.fulfill({contentType: 'text/javascript', body: ''});
  if (path === '/auth/session') return route.fulfill({contentType: 'application/json', body: '{}'});
  if (path.startsWith('/assets/') || path === '/favicon.png') return route.fulfill({status: 404, body: ''});
  return route.fulfill({contentType: 'text/html', headers: {'Content-Security-Policy': "script-src 'self' 'nonce-test-theme'"}, body: (path === '/login' ? loginPage : resourcePage).replaceAll('__NONCE__', 'test-theme').replace('__SESSION_EXPIRES__', String(Date.now() + 3600000))});
});
const first = await originContext.newPage(), second = await originContext.newPage();
await first.goto('http://workshop.test/login');
await first.getByRole('button', {name: 'Dark mode', exact: true}).click();
await first.goto('http://workshop.test/');
assert.equal(await first.locator('html').getAttribute('data-theme'), 'dark');
await second.goto('http://workshop.test/');
await second.getByRole('button', {name: 'Light mode', exact: true}).click();
await first.waitForFunction(() => document.documentElement.dataset.theme === 'light');
assert.equal(await first.locator('[data-theme-choice="light"]').getAttribute('aria-pressed'), 'true');
await first.emulateMedia({reducedMotion: 'no-preference'});
await first.locator('[data-agent="claude-code"]').click();
assert.ok(await first.locator('.toggle .toggle-indicator').evaluate(e => e.getAnimations().length > 0));
await first.getByRole('button', {name: 'Dark mode', exact: true}).click();
const animations = await first.locator('.segmented-toggle .toggle-indicator').evaluateAll(els => els.map(e => {
  const animation = e.getAnimations()[0];
  return {duration: animation.effect.getTiming().duration, easing: animation.effect.getTiming().easing, transforms: animation.effect.getKeyframes().slice(1).map(f => [f.offset, f.transform, f.easing])};
}));
assert.deepEqual(animations[0], animations[1]);
// Hold stretches without committing; release commits once and starts the shared bounce.
await first.waitForTimeout(750);
for (const [selector, attribute] of [['.theme-toggle', 'data-theme'], ['.toggle', 'data-selected-agent']]) {
  const button = first.locator(selector + ' button').first();
  const indicator = first.locator(selector + ' .toggle-indicator');
  const before = await first.locator('html').getAttribute(attribute);
  const box = await button.boundingBox();
  await first.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await first.mouse.down();
  await first.waitForTimeout(220);
  assert.equal(await first.locator('html').getAttribute(attribute), before);
  assert.ok(await indicator.evaluate(e => new DOMMatrix(getComputedStyle(e).transform).a > 1.1));
  await first.waitForTimeout(150);
  assert.equal(await first.locator('html').getAttribute(attribute), before);
  await first.mouse.up();
  assert.notEqual(await first.locator('html').getAttribute(attribute), before);
  assert.equal(await indicator.evaluate(e => e.getAnimations()[0].effect.getTiming().duration), 680);
  await first.waitForTimeout(750);
  const after = await first.locator('html').getAttribute(attribute);
  // Releasing outside cancels rather than changing the setting.
  await first.mouse.down();
  await first.mouse.move(10, 10);
  await first.mouse.up();
  await first.waitForTimeout(40);
  assert.equal(await first.locator('html').getAttribute(attribute), after);
  assert.equal(await indicator.evaluate(e => getComputedStyle(e).transform), 'none');
  // Space and Enter have the same held phase and commit once on key release.
  for (const key of ['Space', 'Enter']) {
    await button.focus();
    const old = await first.locator('html').getAttribute(attribute);
    await first.keyboard.down(key);
    await first.waitForTimeout(180);
    assert.equal(await first.locator('html').getAttribute(attribute), old);
    await first.keyboard.up(key);
    assert.notEqual(await first.locator('html').getAttribute(attribute), old);
    await first.waitForTimeout(750);
  }
}
await first.emulateMedia({reducedMotion: 'reduce'});
await first.locator('[data-agent="codex"]').click();
assert.equal(await first.locator('.toggle .toggle-indicator').evaluate(e => e.getAnimations().length), 0);
assert.deepEqual(errors, []);
await browser.close();
console.log('PASS: system preference, explicit override, reload, both themes/agents at four widths, icon order, keyboard, copying, login palette, storage denial, text contrast, cross-page/tab persistence, CSP, agent animation/reduced motion, shared motion, equal heights, either-half reversal, no script errors');

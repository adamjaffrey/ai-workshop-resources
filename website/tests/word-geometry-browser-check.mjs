import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const browser = await chromium.launch({channel: 'chrome', headless: true});
try {
  const page = await browser.newPage({reducedMotion:'reduce'});
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({width, height:1000});
    await page.goto(new URL('../outputs/workshop-resources-preview.html', import.meta.url).href);
    await page.evaluate(() => document.fonts.ready);
    const original = await page.evaluate(() => {
      document.querySelectorAll('.step-row').forEach(el => el.classList.remove('reveal-ready', 'is-revealed'));
      const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
      const words = [];
      while(walker.nextNode()) {
        const node = walker.currentNode;
        if (node.parentElement.closest('svg,script,style,noscript')) continue;
        for (const match of node.textContent.matchAll(/\S+/gu)) {
          const range = document.createRange();range.setStart(node,match.index);range.setEnd(node,match.index+match[0].length);
          const r=range.getBoundingClientRect();
          if (r.width && r.height) words.push({x:r.x,y:r.y,width:r.width,height:r.height,code:!!node.parentElement.closest('pre')});
        }
      }
      return words;
    });
    await page.goto(new URL('../outputs/login-design-preview.html', import.meta.url).href);
    await page.getByRole('button',{name:'No blur',exact:true}).click();
    await page.evaluate(() => document.fonts.ready);
    const projected = await page.locator('.ph-word').evaluateAll(elements=>elements.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};}).filter(r=>r.width && r.height));
    assert.equal(projected.length,original.length);
    const decorationErrors = await page.evaluate(() => {
      const failures = [], groups = new Map();
      for (const el of document.querySelectorAll('.ph-icon')) {
        const css = getComputedStyle(el);
        const key = el.dataset.phIconSet;
        const size = `${css.width}/${css.height}`;
        if (groups.has(key) && groups.get(key) !== size) failures.push(`Mismatched ${key} size`);
        groups.set(key, size);
      }
      const expected = {step:'26px/26px', agent:'20px/20px', theme:'20px/20px', copy:'18px/18px'};
      for (const [key, size] of Object.entries(expected)) if (groups.get(key) !== size) failures.push(`Unexpected ${key} dimensions`);
      if (document.querySelector('.page-placeholder svg')) failures.push('Original icon remains');
      const qr = document.querySelector('.ph-qr-block');
      if (!qr || !qr.src.startsWith('data:image/svg+xml,') || qr.naturalWidth !== qr.naturalHeight) failures.push('QR is not empty square geometry');
      if (qr) {
        const canvas = document.createElement('canvas');canvas.width = canvas.height = 540;
        const context = canvas.getContext('2d');context.drawImage(qr,0,0);
        for (const [x,y] of [[0,270],[47,270],[492,270],[270,47],[270,492]]) {
          if ([...context.getImageData(x,y,1,1).data].join(',') !== '255,255,255,255') failures.push('QR white padding changed');
        }
        if (context.getImageData(270,270,1,1).data[3] !== 0) failures.push('QR centre is not a blendable block');
      }
      if (innerWidth > 660 && Math.abs(qr.getBoundingClientRect().width - 150) > .1) failures.push('QR size changed');
      return failures;
    });
    assert.deepEqual(decorationErrors, [], `Icon or QR block mismatch at ${width}px`);

    const capErrors = await page.locator('.ph-word').evaluateAll(elements => {
      const canvas = document.createElement('canvas').getContext('2d');
      return elements.flatMap((el, i) => {
        const css = getComputedStyle(el), size = parseFloat(css.fontSize);
        canvas.font = `${css.fontWeight} ${css.fontSize} ${css.fontFamily}`;
        const expected = canvas.measureText('H').actualBoundingBoxAscent;
        const cap = parseFloat(css.getPropertyValue('--ph-cap')) * size;
        const bottom = parseFloat(css.getPropertyValue('--ph-bottom')) * size;
        const descent = canvas.measureText('Mg').fontBoundingBoxDescent;
        const painted = el.classList.contains('ph-code-word') ? cap : parseFloat(getComputedStyle(el, '::before').height);
        return Math.abs(cap - expected) > 1 || Math.abs(bottom - descent) > 1 || Math.abs(painted - cap) > .05 ? [{i, cap, expected, bottom, descent, painted}] : [];
      });
    });
    assert.deepEqual(capErrors, [], `Cap height or baseline drift at ${width}px`);

    const differences = original.map((r,i)=>({i,code:r.code,dx:Math.abs(r.x-projected[i].x),dy:Math.abs(r.y-projected[i].y),dw:Math.abs(r.width-projected[i].width)}));
    assert.deepEqual(differences.filter(r=>r.dx>1||r.dy>1||r.dw>1), [], `Word geometry drift at ${width}px`);
    console.log(`PASS: ${original.length} word positions and widths within 1px at ${width}px`);
    for (const mode of ['light','dark']) {
      await page.evaluate(mode => document.documentElement.dataset.theme = mode, mode);
      const surface = await page.locator('.page-placeholder article').first().evaluate(el => getComputedStyle(el).backgroundColor);
      await page.locator('#block-strength').fill('80');
      await page.locator('#block-strength').dispatchEvent('input');
      assert.equal(await page.locator('#block-strength-value').textContent(), '80%');
      assert.equal(await page.locator('.page-placeholder article').first().evaluate(el => getComputedStyle(el).backgroundColor), surface);
      assert.equal(await page.locator('.ph-word').first().evaluate(el => getComputedStyle(el, '::before').opacity), '1');
      await page.locator('#block-strength').fill('35');
      await page.locator('#block-strength').dispatchEvent('input');
    }
    await page.evaluate(() => document.documentElement.dataset.theme = 'light');
    if(width===1440){await page.getByRole('button',{name:'Blur only',exact:true}).click();await page.screenshot({path:new URL('../outputs/word-blocks.png',import.meta.url).pathname});}
  }
} finally {await browser.close();}

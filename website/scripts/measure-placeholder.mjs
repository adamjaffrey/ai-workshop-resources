// Build-time only: measure rendered text, then serialise geometry without content.
import {readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {resourcePage} from '../lib/workshop-resource-page.mjs';
import {placeholderLayoutRevision} from '../lib/workshop-layout.mjs';
const target = new URL('../lib/workshop-placeholder.generated.json', import.meta.url);
if (process.argv.includes('--if-needed')) {
  let existing;
  try {existing = JSON.parse(await readFile(target, 'utf8'));} catch (error) {if (error.code !== 'ENOENT') throw error;}
  if (existing?.layoutRevision === placeholderLayoutRevision) {
    console.log(`Reusing block geometry for layout revision ${placeholderLayoutRevision}; no browser measurement needed`);
    process.exit(0);
  }
}
await import('./preview-resources.mjs');
const browser = await chromium.launch({channel: 'chrome', headless: true});
try {
  const page = await browser.newPage({viewport: {width: 1440, height: 1000}, reducedMotion: 'reduce'});
  await page.goto(new URL('../outputs/workshop-resources-preview.html', import.meta.url).href);
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate(() => {
    const source = document.querySelector('main');
    // Freeze the visible initial state before cloning (no reveal/interaction scripts).
    source.querySelectorAll('.step-row').forEach(el => el.classList.remove('reveal-ready', 'is-revealed'));
    const clone = source.cloneNode(true);
    const sourceElements = [source, ...source.querySelectorAll('*')];
    const cloneElements = [clone, ...clone.querySelectorAll('*')];
    const sourceNodes = [];
    const walker = document.createTreeWalker(source, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) sourceNodes.push(walker.currentNode);
    const cloneNodes = [];
    const cloneWalker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
    while (cloneWalker.nextNode()) cloneNodes.push(cloneWalker.currentNode);
    let words = 0;
    const canvas = document.createElement('canvas').getContext('2d');
    for (let index = 0; index < sourceNodes.length; index++) {
      const node = sourceNodes[index];
      const target = cloneNodes[index];
      if (node.parentElement.closest('svg, script, style, noscript')) continue;
      const css = getComputedStyle(node.parentElement);
      const fontSize = parseFloat(css.fontSize);
      canvas.font = `${css.fontWeight} ${css.fontSize} ${css.fontFamily}`;
      const font = canvas.measureText('Mg');
      const descent = font.fontBoundingBoxDescent / fontSize;
      const capHeight = canvas.measureText('H').actualBoundingBoxAscent / fontSize;
      const fragment = document.createDocumentFragment();
      for (const match of node.textContent.matchAll(/\S+|\s+/gu)) {
        if (!match[0].trim()) { fragment.append(document.createTextNode(match[0])); continue; }
        const range = document.createRange();
        range.setStart(node, match.index); range.setEnd(node, match.index + match[0].length);
        const rect = range.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        const word = document.createElement('span');
        // One cap-height rectangle per text style, ending on the baseline.
        word.style.setProperty('--ph-cap', `${capHeight}em`);
        word.style.setProperty('--ph-bottom', `${descent}em`);
        if (node.parentElement.closest('pre, .slug') && [...match[0]].every(char => Math.abs(canvas.measureText(char).width - canvas.measureText('x').width) < .01)) {
          word.className = 'ph-word ph-code-word';
          if (node.parentElement.closest('.slug')) word.style.setProperty('--ph-ink', 'var(--muted-text)');
          // Prompt fonts are monospaced. Anonymous glyphs preserve native wrapping,
          // including native punctuation breaks, without sending any letters or digits.
          for (const char of match[0]) {
            word.append(document.createTextNode('/-'.includes(char) ? char : 'x'));
          }
          fragment.append(word); words++;
          continue;
        }
        word.className = 'ph-word';
        word.style.width = `${rect.width / fontSize}em`;
        word.style.height = `${rect.height / fontSize}em`;
        word.style.verticalAlign = `${-descent}em`;
        fragment.append(word); words++;
      }
      // Preserve the anonymous flex text item (e.g. the two-word logout label).
      if (/flex/.test(css.display) && node.textContent.trim()) { const label=document.createElement('span'); label.append(fragment); target.replaceWith(label); }
      else target.replaceWith(fragment);
    }
    for (let i = 0; i < cloneElements.length; i++) {
      const el = cloneElements[i];
      const original = sourceElements[i];
      if (el.matches('script, style, noscript, title')) {el.remove(); continue;}
      const svg = el.closest('svg');
      const allowed = svg ? new Set(['class','xmlns','viewBox','width','height','fill','fill-rule','stroke','stroke-width','stroke-linecap','stroke-linejoin','d','x','y','x1','x2','y1','y2','cx','cy','r','rx','ry','points']) : new Set(['class']);
      for (const attr of [...el.attributes]) if (!allowed.has(attr.name)) el.removeAttribute(attr.name);
      if (el.tagName === 'BUTTON') {el.type = 'button'; el.tabIndex = -1;}
      if (el.matches('.theme-toggle')) el.classList.add('ph-static');
      if (el.matches('.toggle-indicator')) {
        const css = getComputedStyle(original);
        el.style.width = css.width;
        el.style.transform = css.transform;
      }
      if (el.tagName === 'IMG') {
        // Retain the public brand mark; the QR uses empty square geometry.
        const brand = original.closest('.brand-mark');
        if (brand) {
          el.src = '/assets/wavelength-worm.png';
        } else {
          // Measure the actual QR quiet zone; retain its opaque white padding.
          const raster = document.createElement('canvas');
          const width = raster.width = original.naturalWidth;
          const height = raster.height = original.naturalHeight;
          const context = raster.getContext('2d');
          context.drawImage(original, 0, 0);
          const pixels = context.getImageData(0, 0, width, height).data;
          let left = width, top = height, right = 0, bottom = 0;
          for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;
            if (pixels[offset + 3] > 127 && Math.min(...pixels.subarray(offset, offset + 3)) < 128) {
              left = Math.min(left, x); top = Math.min(top, y);
              right = Math.max(right, x + 1); bottom = Math.max(bottom, y + 1);
            }
          }
          if (right <= left || bottom <= top) throw new Error('QR pattern bounds missing');
          const frame = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><path fill="white" fill-rule="evenodd" d="M0 0H${width}V${height}H0Z M${left} ${top}H${right}V${bottom}H${left}Z"/></svg>`;
          el.src = 'data:image/svg+xml,' + encodeURIComponent(frame);
          el.classList.add('ph-qr-block');
        }
        el.alt = '';
      }
      if (el.tagName === 'FORM') {const replacement = document.createElement('div'); replacement.className='ph-form'; replacement.append(...el.childNodes); el.replaceWith(replacement);}
    }
    // Match each icon family to its largest measured layout box. Hidden variants
    // use their CSS dimensions, so Copy/Success states share the same geometry.
    const iconSet = el => el.dataset.iconUse==='log-out-session' ? 'footer' : el.closest('.symbol') ? 'step' : el.classList.contains('brand-icon') ? 'agent' : el.closest('.theme-toggle') ? 'theme' : el.closest('.copy') ? 'copy' : 'other';
    const iconSizes = {};
    for (const el of source.querySelectorAll('svg')) {
      const group = iconSet(el), rect = el.getBoundingClientRect(), css = getComputedStyle(el);
      const size = iconSizes[group] ||= {width: 0, height: 0};
      size.width = Math.max(size.width, rect.width || parseFloat(css.width) || 0);
      size.height = Math.max(size.height, rect.height || parseFloat(css.height) || 0);
    }
    for (let i = 0; i < sourceElements.length; i++) {
      const original = sourceElements[i];
      if (original.tagName.toLowerCase() !== 'svg') continue;
      const group = iconSet(original), size = iconSizes[group];
      const block = document.createElement('span');
      block.className = `${original.getAttribute('class') || ''} ph-icon`;
      block.dataset.phIconSet = group;
      block.style.width = `${size.width}px`;
      block.style.height = `${size.height}px`;
      cloneElements[i].replaceWith(block);
    }
    clone.id = 'workshop-content'; clone.className = 'page-placeholder';
    clone.setAttribute('aria-hidden', 'true'); clone.setAttribute('inert', '');
    return {markup: clone.outerHTML, words, iconSizes};
  });
  const fingerprint = createHash('sha256').update(resourcePage).digest('hex');
  await writeFile(new URL('../lib/workshop-placeholder.generated.json', import.meta.url), JSON.stringify({layoutRevision: placeholderLayoutRevision, fingerprint, ...result}) + '\n');
  console.log(`Measured ${result.words} anonymous word shapes in Chrome`);
} finally {await browser.close();}

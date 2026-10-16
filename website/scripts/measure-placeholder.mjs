// Build-time only: measure rendered text, then serialise geometry without content.
import {writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {resourcePage} from '../lib/workshop-resource-page.mjs';
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
          // including a word continuing across lines, without sending its text.
          for (const char of match[0]) {
            word.append(document.createTextNode('x'));
            if ('/-'.includes(char)) word.append(document.createElement('wbr'));
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
      target.replaceWith(fragment);
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
        // Both are public decorative assets; no arbitrary source URLs are copied.
        el.src = original.closest('.brand-mark') ? '/assets/wavelength-worm.png' : '/assets/workshop-resources-qr.png';
        el.alt = '';
      }
      if (el.tagName === 'FORM') {const replacement = document.createElement('div'); replacement.append(...el.childNodes); el.replaceWith(replacement);}
    }
    clone.id = 'workshop-content'; clone.className = 'page-placeholder';
    clone.setAttribute('aria-hidden', 'true'); clone.setAttribute('inert', '');
    return {markup: clone.outerHTML, words};
  });
  const fingerprint = createHash('sha256').update(resourcePage).digest('hex');
  await writeFile(new URL('../lib/workshop-placeholder.generated.json', import.meta.url), JSON.stringify({fingerprint, ...result}) + '\n');
  console.log(`Measured ${result.words} anonymous word shapes in Chrome`);
} finally {await browser.close();}

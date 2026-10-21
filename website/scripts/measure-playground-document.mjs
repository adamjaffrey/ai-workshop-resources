// Browser-side anonymisation using the same word, cap-height, glyph and icon rules as Resources.
export function measurePlaygroundDocument({frames={},preserveSpecimenLayout=false,resources=false}={}) {

    const source = resources ? document.querySelector('main') : document.body;
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
      if (node.parentElement.closest('svg, script, style, noscript, .page-placeholder')) continue;
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
          word.className = `ph-word ph-code-word ph-m-${index}-${match.index}`;
          if (node.parentElement.closest('.slug')) word.style.setProperty('--ph-ink', 'var(--muted-text)');
          // Prompt fonts are monospaced. Anonymous glyphs preserve native wrapping,
          // including native punctuation breaks, without sending any letters or digits.
          for (const char of match[0]) {
            word.append(document.createTextNode('/-'.includes(char) ? char : 'x'));
          }
          fragment.append(word); words++;
          continue;
        }
        // Prose filenames also have native slash/hyphen break opportunities.
        // Use measured empty fragments here, not dummy glyphs outside pre/.slug.
        if (!node.parentElement.closest('pre, .slug') && /[/-]/.test(match[0])) {
          let offset=match.index;
          for(const part of match[0].match(/[^/-]*[/-]|[^/-]+$/g)) {
            const piece=word.cloneNode(false),partRange=document.createRange();
            partRange.setStart(node,offset);partRange.setEnd(node,offset+part.length);
            const box=partRange.getBoundingClientRect();piece.className=`ph-word ph-m-${index}-${offset}`;
            piece.style.width=`${box.width/fontSize}em`;piece.style.height=`${box.height/fontSize}em`;piece.style.verticalAlign=`${-descent}em`;
            fragment.append(piece);offset+=part.length;words++;
          }
          continue;
        }
        word.className = `ph-word ph-m-${index}-${match.index}`;
        word.style.width = `${rect.width / fontSize}em`;
        word.style.height = `${rect.height / fontSize}em`;
        word.style.verticalAlign = `${-descent}em`;
        // Empty inline blocks must not enlarge a source line box shorter than its glyphs.
        const lineHeight = parseFloat(css.lineHeight);
        if (lineHeight < rect.height) {
          word.style.verticalAlign = 'top';
          word.style.marginBlock = `${(lineHeight - rect.height) / (2 * fontSize)}em`;
        }
        fragment.append(word); words++;
      }
      // Preserve the anonymous flex text item (e.g. the two-word logout label).
      if (/flex/.test(css.display) && node.textContent.trim()) { const label=document.createElement('span'); label.className='ph-flex-text'; label.append(fragment); target.replaceWith(label); }
      else target.replaceWith(fragment);
    }
    for (let i = 0; i < cloneElements.length; i++) {
      const el = cloneElements[i];
      const original = sourceElements[i];
      if (original.closest('.page-placeholder')) continue;
      if (el.matches('script, style, noscript, title')) {el.remove(); continue;}
      const svg = el.closest('svg');
      const allowed = svg ? new Set(['class','xmlns','viewBox','width','height','fill','fill-rule','stroke','stroke-width','stroke-linecap','stroke-linejoin','d','x','y','x1','x2','y1','y2','cx','cy','r','rx','ry','points']) : new Set(['class','id','style','hidden','open','type','checked','disabled','width','height','role','aria-selected','aria-pressed','data-panel','data-tab','data-review','data-inspect']);
      if(preserveSpecimenLayout)for(const name of ['data-exterior-ring','data-first-visible','data-gallery-last','data-in-situ','data-specimen-scroll-end','data-specimen-width','data-type-sample','data-unicode-target','data-source-selector','data-source-page'])allowed.add(name);
      for (const attr of [...el.attributes]) if (!allowed.has(attr.name)) el.removeAttribute(attr.name);
      if (el.matches('pre code[id]')) el.removeAttribute('id');
      if (el.tagName === 'IFRAME') { el.style.removeProperty('--natural-frame-height'); el.setAttribute('sandbox',''); el.setAttribute('tabindex','-1'); el.setAttribute('srcdoc', frames[original.id] || '<!doctype html><html><body></body></html>'); }
      if (el.matches('input,textarea,select')) { el.removeAttribute('value'); el.removeAttribute('placeholder'); el.disabled=true; el.tabIndex=-1; }
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
      if (el.tagName === 'FORM') {const replacement = document.createElement('div'); replacement.className=el.className+' ph-form'; if(el.id)replacement.id=el.id; replacement.append(...el.childNodes); el.replaceWith(replacement);}
    }
    // Match each icon family to its largest measured layout box. Hidden variants
    // use their CSS dimensions, so Copy/Success states share the same geometry.
    const iconSet = el => el.dataset.iconUse || el.getAttribute('class') || 'icon';
    const iconSizes = {};
    for (const el of source.querySelectorAll('svg')) {
      const group = iconSet(el), rect = el.getBoundingClientRect(), css = getComputedStyle(el);
      const size = iconSizes[group] ||= {width: 0, height: 0};
      size.width = Math.max(size.width, rect.width || parseFloat(css.width) || 0);
      size.height = Math.max(size.height, rect.height || parseFloat(css.height) || 0);
    }
    for (let i = 0; i < sourceElements.length; i++) {
      const original = sourceElements[i];
      if (original.tagName.toLowerCase() !== 'svg' || original.closest('.page-placeholder')) continue;
      const group = iconSet(original), size = iconSizes[group];
      const block = document.createElementNS('http://www.w3.org/2000/svg','svg');
      block.setAttribute('class',`${original.getAttribute('class') || ''} ph-icon`);
      for(const name of ['data-icon-use','data-icon-name','data-icon-provider','data-input-icon'])if(original.hasAttribute(name))block.setAttribute(name,original.getAttribute(name));
      block.dataset.phIconSet = group;
      // Inactive layers must never become visible when their SVG is replaced.
      if(original.hasAttribute('hidden'))block.setAttribute('hidden','');
      // Keep inline state, but leave media-query visibility responsive through classes.
      for(const property of ['display','visibility','opacity'])if(original.style[property])block.style[property]=original.style[property];
      const fontSize=parseFloat(getComputedStyle(original).fontSize);
      block.style.width = `${size.width/fontSize}em`;
      block.style.height = `${size.height/fontSize}em`;
      cloneElements[i].replaceWith(block);
    }
    clone.querySelectorAll('script,style,noscript,title,link,meta').forEach(el=>el.remove());
    if(resources){clone.id='workshop-content';clone.className='page-placeholder';}
    clone.setAttribute('aria-hidden', 'true'); clone.setAttribute('inert', '');
    const css=[...document.querySelectorAll('style')].map(el=>el.textContent).join('\n');
    const inspectorMetrics=[...clone.querySelectorAll('.inspector-dock .ph-word')].map((el,i)=>{el.classList.add('ph-inspector-'+i);return el.getAttribute('style');});
    const metrics=Object.fromEntries([...clone.querySelectorAll('.ph-word')].map(el=>[[...el.classList].find(c=>c.startsWith('ph-m-')),el.getAttribute('style')]));
    return {metrics,markup: clone.outerHTML, css, words, iconSizes, inspectorMetrics, gallery:preserveSpecimenLayout?document.documentElement.getAttribute('data-specimen-gallery'):null};
}

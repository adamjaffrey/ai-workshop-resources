// Reuse source typography for every isolated root and derived text example.
export function specimenTypography(source) {
 const style = getComputedStyle(source);
 return Object.fromEntries(['font-family','font-size','font-weight','font-style','line-height','letter-spacing','text-transform'].map(property => [property,style.getPropertyValue(property)]));
}

// Plain text has no painted column boundary: discard unused column width,
// retaining enough room for every source line. Boxed components keep their width.
export function isTextSpecimen(source) {
 if (!source.matches('h1,h2,h3,p,label,.eyebrow,.gate-error,.footer-meta')) return false;
 const style = getComputedStyle(source);
 return !parseFloat(style.paddingLeft) && !parseFloat(style.paddingRight) && !parseFloat(style.borderLeftWidth) && !parseFloat(style.borderRightWidth) && style.backgroundColor === 'rgba(0, 0, 0, 0)';
}
export function specimenWidth(source) {
 const width = source.getBoundingClientRect().width;
 if (!isTextSpecimen(source)) return width;
 const left = source.getBoundingClientRect().left;
 let right = left;
 const walker = document.createTreeWalker(source,NodeFilter.SHOW_TEXT);
 while (walker.nextNode()) {
  if (!walker.currentNode.textContent.trim()) continue;
  const range = document.createRange();range.selectNodeContents(walker.currentNode);
  for (const rect of range.getClientRects()) right = Math.max(right,rect.right);
 }
 for (const element of source.querySelectorAll('svg,img')) if (element.getBoundingClientRect().width) right = Math.max(right,element.getBoundingClientRect().right);
 return right > left ? Math.min(width,Math.ceil(right-left)) : width;
}

// Preserve a real source boundary without baking gallery width into the component.
// Serialised into capture frames together with the helpers above.
export function preserveSpecimenSize(copy, source) {
 const width = specimenWidth(source);
 if (!(width > 0)) throw new Error('Cannot capture an unmeasured specimen');
 copy.dataset.specimenWidth = '';
 if (isTextSpecimen(source)) copy.dataset.specimenTextWidth = source.getBoundingClientRect().width;
 copy.style.setProperty('--specimen-width', width + 'px');
 for (const property of ['width', 'min-width', 'max-width']) copy.style.removeProperty(property);
 const style = getComputedStyle(source);
 // Inline text needs a box for its captured width once isolated from its line.
 if (style.display === 'inline') copy.style.display = 'inline-block';
 // Isolated roots no longer inherit the app body. Preserve that inheritance.
 for (const [property,value] of Object.entries(specimenTypography(source))) copy.style.setProperty(property,value);
}

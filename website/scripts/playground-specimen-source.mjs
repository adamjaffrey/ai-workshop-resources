// Preserve a real source boundary without baking gallery width into the component.
// Serialised into capture frames; keep this helper self-contained.
export function preserveSpecimenSize(copy, source) {
 const width = source.getBoundingClientRect().width;
 if (!(width > 0)) throw new Error('Cannot capture an unmeasured specimen');
 copy.dataset.specimenWidth = '';
 copy.style.setProperty('--specimen-width', width + 'px');
 for (const property of ['width', 'min-width', 'max-width']) copy.style.removeProperty(property);
 const style = getComputedStyle(source);
 // Inline text needs a box for its captured width once isolated from its line.
 if (style.display === 'inline') copy.style.display = 'inline-block';
 // Isolated roots no longer inherit the app body. Preserve that inheritance.
 for (const property of ['font-family', 'font-size', 'line-height']) copy.style.setProperty(property, style.getPropertyValue(property));
}

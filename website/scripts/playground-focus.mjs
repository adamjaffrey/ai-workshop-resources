// Derive held selectors from app CSS, with independent modality so preview clicks cannot erase them.
export const heldFocusCSS = css => css.replaceAll('[data-focus-input="keyboard"]','[data-held-keyboard]').replaceAll(':focus-within','[data-held-focus-within]').replaceAll(':focus-visible','[data-held-focus]').replaceAll(':focus','[data-held-focus]');
export const focusGalleryScript = String.raw`
const catalog=document.getElementById('focus-catalog'),focusCache={};
// Native selection occupies each source line box, not just its glyph bounds.
// Paint individual lines so the last line does not highlight empty trailing space.
function paintSelections(){
 for(const e of catalog.querySelectorAll('.selection-preview')){
  const range=document.createRange();range.selectNodeContents(e);
  const rects=[...range.getClientRects()],box=e.getBoundingClientRect(),height=parseFloat(getComputedStyle(e).lineHeight);
  e.style.backgroundImage=rects.map(()=> 'linear-gradient(var(--selection-preview-background),var(--selection-preview-background))').join(',');
  e.style.backgroundSize=rects.map((r,i)=>(i<rects.length-1?box.width:r.width)+'px '+height+'px').join(',');
  e.style.backgroundPosition=rects.map((r,i)=>'0 '+(i*height)+'px').join(',');
 }
}
new ResizeObserver(paintSelections).observe(catalog);
document.fonts.ready.then(paintSelections);
document.documentElement.setAttribute('data-held-keyboard','');
window.addEventListener('message',event=>{
 if(event.source!==parent||event.data?.guide!=='focus-catalog-data')return;
 if(event.data.requestId<(focusCache[event.data.page]?.requestId||0))return;
 focusCache[event.data.page]=event.data;
 if(!focusCache.resources||!focusCache.login||focusCache.resources.requestId!==focusCache.login.requestId)return;
 if(catalog.dataset.captureId===String(event.data.requestId))return;
 // Commit both sources together: never insert login first and prepend resources later.
 for(const page of ['resources','login']){
 const section=document.getElementById('focus-'+page),signature=JSON.stringify(focusCache[page].focusItems);if(section.captureSignature===signature)continue;section.captureSignature=signature;const fragment=document.createDocumentFragment();
 for(const item of focusCache[page].focusItems){
  const row=document.createElement('section');row.className='focus-row';
  const title=document.createElement('h3');title.textContent=item.label;
  const preview=document.createElement('div');preview.className='focus-preview';preview.innerHTML=item.html;
  // Discard page-positioning state before applying gallery optical alignment.
  preview.firstElementChild?.style.removeProperty('translate');
  const target=preview.querySelector('[data-focus-target]');
  if(item.ring&&!preview.querySelector(':scope>.segmented-toggle')&&!preview.querySelector(':scope>.qr-card')&&item.label!=='Copy Prompt · Keyboard Focus')preview.dataset.exteriorRing='';
  if(item.ring){target.setAttribute('data-held-focus','');for(let p=target.parentElement;p&&p!==preview;p=p.parentElement)p.setAttribute('data-held-focus-within','');}
  row.append(title,preview);
  if(item.selectable){const selected=document.createElement('p');selected.className='selection-preview';selected.textContent=item.selectionText;for(const [property,value] of Object.entries(item.selectionTypography))selected.style.setProperty(property,value);selected.style.setProperty('--selection-preview-background',item.selection[0]);selected.style.setProperty('--selection-preview-foreground',item.selection[1]);row.append(selected);}
  const detail=document.createElement('p');detail.className='focus-meta';detail.textContent=item.page+' → '+item.selector+(item.selectable?' · Selection: '+item.selection.join(' / '):' · Keyboard focus; control label is not selectable.');
  row.append(detail);fragment.append(row);
 }
 section.replaceChildren(fragment);
 }
 paintSelections();
 catalog.dataset.captureId=event.data.requestId;
 catalog.querySelectorAll('.segmented-toggle').forEach(e=>window.layoutWorkshopToggle(e));
});
new ResizeObserver(()=>{if(catalog.getBoundingClientRect().width)parent.postMessage({guide:'reference-height',height:window.measureWorkshopGallery?.()||Math.ceil(catalog.getBoundingClientRect().height+48)},'*');}).observe(catalog);
`;

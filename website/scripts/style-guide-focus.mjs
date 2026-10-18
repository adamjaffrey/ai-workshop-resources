// Held focus selectors are derived from canonical app rules, never a second ring palette.
export const heldFocusCSS = css => css.replaceAll(':focus-within','[data-held-focus-within]').replaceAll(':focus-visible','[data-held-focus]').replaceAll(':focus','[data-held-focus]');
export const focusGalleryScript = String.raw`
const catalog=document.getElementById('focus-catalog');
window.addEventListener('message',event=>{
 if(event.source!==parent||event.data?.guide!=='icon-catalog-data')return;
 const section=document.getElementById('focus-'+event.data.page);section.replaceChildren();
 for(const item of event.data.focusItems){
  const row=document.createElement('section');row.className='focus-row';
  const title=document.createElement('h3');title.textContent=item.label;
  const preview=document.createElement('div');preview.className='focus-preview';preview.innerHTML=item.html;
  const target=preview.querySelector('[data-focus-target]');
  if(item.ring){target.setAttribute('data-held-focus','');for(let p=target.parentElement;p&&p!==preview;p=p.parentElement)p.setAttribute('data-held-focus-within','');}
  const selected=document.createElement('p');selected.className='selection-preview';selected.textContent=item.selectionText;selected.style.background=item.selection[0];selected.style.color=item.selection[1];
  const detail=document.createElement('p');detail.className='focus-meta';detail.textContent=item.page+' → '+item.selector+' · Selection: '+item.selection.join(' / ');
  row.append(title,preview,selected,detail);section.append(row);
 }
 document.documentElement.dataset.focusInput='keyboard';
});
new ResizeObserver(()=>{if(catalog.getBoundingClientRect().width)parent.postMessage({guide:'reference-height',height:Math.ceil(catalog.getBoundingClientRect().height+32)},'*');}).observe(catalog);
`;

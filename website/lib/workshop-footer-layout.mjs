// Shared by the live page and anonymous login geometry so responsive wrapping matches.
export function updateFooterWrap(meta) {
  const footer=meta.closest('footer'),action=footer.querySelector('form,.ph-form');
  if(action){const row=footer.querySelector('.footer-content')||footer,text=document.createRange();text.selectNodeContents(meta.querySelector('.footer-copyright'));footer.classList.toggle('is-stacked',text.getBoundingClientRect().width+action.getBoundingClientRect().width+parseFloat(getComputedStyle(row).columnGap)>row.clientWidth);}
  meta.classList.toggle('is-wrapped',Math.abs(meta.querySelector('.footer-version').getBoundingClientRect().top-meta.querySelector('.footer-copyright').getBoundingClientRect().top)>2);
}
export function initialiseFooterLayout(root=document) {
 const meta=root.querySelector('.footer-meta');if(!meta)return;
 const update=()=>updateFooterWrap(meta);
 update();if('ResizeObserver' in window)new ResizeObserver(update).observe(meta);
 window.addEventListener('resize',update);document.fonts.ready.then(update);
}
export const footerLayoutScript=updateFooterWrap.toString()+';('+initialiseFooterLayout.toString()+')(document.querySelector("main"));';

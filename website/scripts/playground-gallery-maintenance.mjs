import {updateHorizontalOverflow} from '../lib/workshop-overflow.mjs';
import {isTextSpecimen,specimenWidth} from './playground-specimen-source.mjs';
// A gallery has one final specimen, even when its sources live in separate groups.
export const galleryMaintenanceScript=String.raw`
(()=>{
const isTextSpecimen=${isTextSpecimen.toString()},specimenWidth=${specimenWidth.toString()};
let galleryTick=0,lastLinks='';
const updateOverflow=${updateHorizontalOverflow.toString()},overflowState=new WeakMap();
const refreshOverflow=e=>overflowState.set(e,updateOverflow(e,overflowState.get(e)));
document.addEventListener('scroll',event=>{if(event.target.matches?.('[data-specimen-scroll-end]'))refreshOverflow(event.target);},true);
window.measureWorkshopGallery=()=>{
 const root=document.querySelector('#type-specimens,#icon-catalog,#error-catalog,#focus-catalog,#link-type-specimens');
 if(!root||!root.getBoundingClientRect().width)return 0;
 return Math.ceil(root.getBoundingClientRect().bottom+scrollY+parseFloat(getComputedStyle(document.body).paddingBottom));
};
function maintainGallery(){
 galleryTick=0;
 // Re-measure transparent text at its original line measure after font/viewport
 // changes, then discard only the unpainted remainder. Boxed widths are untouched.
 for(const sample of document.querySelectorAll('[data-specimen-text-width]')){
  if(!sample.checkVisibility())continue;
  sample.style.setProperty('--specimen-width',sample.dataset.specimenTextWidth+'px');
  sample.style.setProperty('--specimen-width',specimenWidth(sample)+'px');
 }
 // Nested block overflow does not consistently include the scroller's end padding.
 // Represent the final painted edge explicitly so both engines can reach its gutter.
 const rails=getComputedStyle(document.documentElement),endClearance=parseFloat(rails.getPropertyValue('--specimen-text-rail'))-parseFloat(rails.getPropertyValue('--optical-offset'));
 for(const viewport of document.querySelectorAll('.icon-sample,.focus-preview,.agent-preview,.prompt-specimen-viewport,.feedback-preview,.specimen-viewport,.variant-preview')){
  if(!viewport.checkVisibility())continue;
  if(viewport.dataset.specimenAlignment==='right'){viewport.removeAttribute('data-specimen-scroll-end');viewport.scrollLeft=0;refreshOverflow(viewport);continue;}
  const samples=[...viewport.querySelectorAll('[data-specimen-width]')].filter(e=>e.checkVisibility());if(!samples.length)continue;
  let right=Math.max(...samples.map(e=>e.getBoundingClientRect().right));
  for(const target of viewport.querySelectorAll('[data-held-focus]')){const c=getComputedStyle(target);right=Math.max(right,target.getBoundingClientRect().right+parseFloat(c.outlineWidth)+parseFloat(c.outlineOffset));}
  const start=viewport.getBoundingClientRect().left+parseFloat(getComputedStyle(viewport).paddingLeft)-viewport.scrollLeft;
  viewport.setAttribute('data-specimen-scroll-end','');viewport.style.setProperty('--specimen-scroll-end',Math.max(0,right-start+endClearance)+'px');refreshOverflow(viewport);
 }
 const rows=[...document.querySelectorAll('.icon-row,.focus-row,.type-row,.agent-row,.notice-type-row')].filter(e=>!e.hidden);
 for(const row of rows)row.toggleAttribute('data-gallery-last',row===rows.at(-1));
 const height=window.measureWorkshopGallery();if(height)parent.postMessage({guide:'reference-height',height},'*');
 const links=[...document.querySelectorAll('a[data-icon-source],#link-type-specimens a[href]')].map(a=>({label:(a.closest('section')?.querySelector('h3')?.textContent.trim()||a.textContent.trim()),href:a.getAttribute('href'),variant:a.querySelector('[data-icon-variant]')?.dataset.iconVariant||'arrow-up-right-modified'}));
 const signature=JSON.stringify(links);if(signature!==lastLinks){lastLinks=signature;parent.postMessage({guide:'playground-links',links},'*');}
}
// Animation frames may be suspended for offscreen iframes. Geometry must be
// committed before the user reaches the gallery, independent of painting.
new MutationObserver(()=>{if(!galleryTick){galleryTick=1;queueMicrotask(maintainGallery);}}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','data-specimen-text-width']});
window.updateWorkshopGallery=maintainGallery;
window.addEventListener('resize',maintainGallery);document.fonts.ready.then(maintainGallery);
maintainGallery();
})();
`;

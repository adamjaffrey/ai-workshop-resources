// A gallery has one final specimen, even when its sources live in separate groups.
export const galleryMaintenanceScript=String.raw`
let galleryTick=0,lastLinks='';
window.measureWorkshopGallery=()=>{
 const root=document.querySelector('#type-specimens,#icon-catalog,#error-catalog,#focus-catalog,#link-type-specimens');
 if(!root||!root.getBoundingClientRect().width)return 0;
 return Math.ceil(root.getBoundingClientRect().bottom+scrollY+parseFloat(getComputedStyle(document.body).paddingBottom));
};
function maintainGallery(){
 galleryTick=0;
 const rows=[...document.querySelectorAll('.icon-row,.focus-row,.type-row,.agent-row,.notice-type-row')].filter(e=>!e.hidden);
 for(const row of rows)row.toggleAttribute('data-gallery-last',row===rows.at(-1));
 const height=window.measureWorkshopGallery();if(height)parent.postMessage({guide:'reference-height',height},'*');
 const links=[...document.querySelectorAll('a[data-icon-source],#link-type-specimens a[href]')].map(a=>({label:(a.closest('section')?.querySelector('h3')?.textContent.trim()||a.textContent.trim()),href:a.getAttribute('href')}));
 const signature=JSON.stringify(links);if(signature!==lastLinks){lastLinks=signature;parent.postMessage({guide:'playground-links',links},'*');}
}
// Animation frames may be suspended for offscreen iframes. Geometry must be
// committed before the user reaches the gallery, independent of painting.
new MutationObserver(()=>{if(!galleryTick){galleryTick=1;queueMicrotask(maintainGallery);}}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden']});
maintainGallery();
`;

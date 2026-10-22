// Keep layout measurable while the parser and shared controllers prepare it.
// Only the two full pages opt in; login and anonymous backdrops are unchanged.
function prepareFirstPaint(maskURL) {
 const root=document.documentElement;
 root.dataset.workshopPreparing='';
 let resolveReady,finished=false;
 window.workshopPageReady=new Promise(resolve=>{resolveReady=resolve;});
 const reveal=()=>{
  if(finished)return;
  finished=true;clearTimeout(fallback);
  delete root.dataset.workshopPreparing;
  resolveReady();
 };
 // A failed asset/controller must never leave the page permanently invisible.
 const fallback=setTimeout(reveal,4000);
 const mask=new Image();mask.src=maskURL;
 const maskReady=mask.decode().catch(()=>{});
 document.addEventListener('DOMContentLoaded',async()=>{
  const images=[...document.images].filter(image=>image.getBoundingClientRect().width>0&&image.loading!=='lazy');
  await Promise.allSettled([document.fonts.ready,maskReady,...images.map(image=>image.decode())]);
  // Font/DOM observers schedule their measurements on the next frame. Allow
  // those callbacks and restored-scroll positioning to finish before revealing.
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
   window.workshopStickyControls?.refresh();
   reveal();
  }));
 },{once:true});
}
export function withFirstPaint(html){
 const maskURL=html.match(/mask:\s*url\(['"]?([^)'"\s]+)['"]?\)/)?.[1]||'/assets/wavelength-worm.png';
 return html.replace('</head>',`<style data-first-paint>html[data-workshop-preparing] body{opacity:0!important;pointer-events:none!important}</style><script nonce="__NONCE__">(${prepareFirstPaint.toString()})(${JSON.stringify(maskURL)});</script></head>`);
}

// Native child targets extend each inline fragment without changing text layout.
// Backgrounds remain native CSS paint; these boxes own hit testing only.
export const linkSurfaceCSS=`
.workshop-link-surface{position:absolute;display:block;box-sizing:border-box;padding:0;margin:0;border:0;border-radius:.2em;background:transparent;pointer-events:auto;cursor:inherit}
:root[data-focus-input="keyboard"] :is(a.workshop-link[href],.step-anchor):focus{outline:3px solid var(--icon-ink)!important;outline-offset:round(up,calc(3px + .125em),1px)!important}
`;
export function installLinkSurfaces(){
 let pending=false;
 const watched=new WeakSet(),resize=new ResizeObserver(schedule);
 function schedule(){if(!pending){pending=true;requestAnimationFrame(refresh);}}
 function refresh(){
  pending=false;
  for(const link of document.querySelectorAll('a.workshop-link[href],.step-anchor')){
   const parent=link.parentElement;if(!watched.has(parent)){watched.add(parent);resize.observe(parent);}
   const rects=[...link.getClientRects()].filter(r=>r.width&&r.height);
   const old=[...link.querySelectorAll(':scope>.workshop-link-surface')];
   if(!rects.length){old.forEach(el=>el.remove());continue;}
   const font=parseFloat(getComputedStyle(link).fontSize);
   // An absolute zero-origin probe handles inline containing blocks and transforms.
   const probe=old[0]||document.createElement('span');
   probe.className='workshop-link-surface';probe.setAttribute('aria-hidden','true');
   probe.style.cssText='left:0;top:0;width:0;height:0;pointer-events:none';if(!probe.parentElement)link.append(probe);
   const origin=probe.getBoundingClientRect();
   rects.forEach((r,i)=>{
    const surface=i===0?probe:old[i]||document.createElement('span');
    surface.className='workshop-link-surface';surface.setAttribute('aria-hidden','true');
    surface.style.cssText='left:'+(r.left-origin.left-.075*font)+'px;top:'+(r.top-origin.top)+'px;width:'+(r.width+.2*font)+'px;height:'+(r.height+.05*font)+'px';
    if(!surface.parentElement)link.append(surface);
   });
   old.slice(rects.length).forEach(el=>el.remove());
  }
 }
 window.refreshWorkshopLinkSurfaces=schedule;
 new MutationObserver(records=>{if(records.some(r=>!r.target.closest?.('.workshop-link-surface')&&[...r.addedNodes,...r.removedNodes].some(n=>!n.classList?.contains('workshop-link-surface'))))schedule();}).observe(document.body,{childList:true,subtree:true});
 document.addEventListener('toggle',schedule,true);
 window.addEventListener('resize',schedule);
 document.fonts.ready.then(schedule);schedule();
}

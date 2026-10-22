// Native child targets extend each inline fragment without changing text layout.
// Backgrounds remain native CSS paint; these boxes own hit testing only.
export const linkSurfaceCSS=`
.workshop-link-surface{position:absolute;display:block;box-sizing:border-box;padding:0;margin:0;border:0;border-radius:.2em;background:transparent;pointer-events:auto;cursor:inherit}
.workshop-link-focus{position:absolute;display:block;pointer-events:none;background:var(--icon-ink);opacity:0;mask-size:100% 100%;mask-repeat:no-repeat}
:root[data-focus-input="keyboard"] :is(a.workshop-link[href],.step-anchor,a.page-title-link):focus:has(>.workshop-link-focus){outline:none!important}
:root[data-focus-input="keyboard"] :is(a.workshop-link[href],.step-anchor,a.page-title-link):focus>.workshop-link-focus{opacity:1}
`;
export function installLinkSurfaces(){
 let pending=false;
 const watched=new WeakSet(),resize=new ResizeObserver(schedule);
 function schedule(){if(!pending){pending=true;requestAnimationFrame(refresh);}}
 function refresh(){
  pending=false;
  for(const link of document.querySelectorAll('a.workshop-link[href],.step-anchor,a.page-title-link')){
   const parent=link.parentElement;if(!watched.has(parent)){watched.add(parent);resize.observe(parent);}
   const heading=link.matches('.page-title-link')?link.querySelector('h1'):null;
   let rects=[...link.getClientRects()].filter(r=>r.width&&r.height);
   if(heading){
    const pieces=[],walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);let text;
    while(text=walker.nextNode()){if(!text.textContent.trim()||text.parentElement.closest('svg'))continue;const range=document.createRange();range.selectNodeContents(text);pieces.push(...range.getClientRects());}
    pieces.push(...[...heading.querySelectorAll(':scope>svg')].map(e=>e.getBoundingClientRect()));
    rects=[];
    for(const r of pieces.sort((a,b)=>a.top-b.top||a.left-b.left)){
     if(!r.width||!r.height)continue;
     const line=rects.find(b=>Math.min(b.bottom,r.bottom)-Math.max(b.top,r.top)>Math.min(b.height,r.height)/2);
     if(line){line.left=Math.min(line.left,r.left);line.top=Math.min(line.top,r.top);line.right=Math.max(line.right,r.right);line.bottom=Math.max(line.bottom,r.bottom);line.width=line.right-line.left;line.height=line.bottom-line.top;}
     else rects.push({left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height});
    }
   }
   const old=[...link.querySelectorAll(':scope>.workshop-link-surface')];
   if(!rects.length){old.forEach(el=>el.remove());continue;}
   const font=parseFloat(getComputedStyle(heading||link).fontSize);
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
   if(heading){
    const paints=[...link.querySelectorAll(':scope>.workshop-title-paint')];
    rects.forEach((r,i)=>{const paint=paints[i]||document.createElement('span');paint.className='workshop-title-paint';paint.setAttribute('aria-hidden','true');Object.assign(paint.style,{left:r.left-origin.left+'px',top:r.top-origin.top+'px',width:r.width+'px',height:r.height+'px',fontSize:font+'px'});if(!paint.parentElement)link.prepend(paint);});
    paints.slice(rects.length).forEach(e=>e.remove());
   }
   // The ring follows the union of the actual background and two shadow shapes.
   // A mask subtracts the 3px clearance region from the 6px outer extent, so
   // wrapped lines share one perimeter without internal overlapping outlines.
   const shapes=rects.flatMap(r=>[
    {x:r.left-origin.left,y:r.top-origin.top,w:r.width,h:r.height,r:.2*font},
    {x:r.left-origin.left-.075*font,y:r.top-origin.top,w:r.width+.05*font,h:r.height+.05*font,r:.225*font},
    {x:r.left-origin.left+.075*font,y:r.top-origin.top,w:r.width+.05*font,h:r.height+.05*font,r:.225*font}
   ]);
   const left=Math.min(...shapes.map(r=>r.x))-6,top=Math.min(...shapes.map(r=>r.y))-6;
   const width=Math.max(...shapes.map(r=>r.x+r.w))+6-left,height=Math.max(...shapes.map(r=>r.y+r.h))+6-top;
   const rectangles=(outset,fill)=>'<g fill="'+fill+'">'+shapes.map(r=>'<rect x="'+(r.x-left-outset)+'" y="'+(r.y-top-outset)+'" width="'+(r.w+2*outset)+'" height="'+(r.h+2*outset)+'" rx="'+(r.r+outset)+'"/>').join('')+'</g>';
   const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'" viewBox="0 0 '+width+' '+height+'"><defs><mask id="ring" maskUnits="userSpaceOnUse" x="0" y="0" width="'+width+'" height="'+height+'">'+rectangles(6,'white')+rectangles(3,'black')+'</mask></defs><rect width="100%" height="100%" fill="white" mask="url(#ring)"/></svg>';
   const focus=link.querySelector(':scope>.workshop-link-focus')||document.createElement('span');focus.className='workshop-link-focus';focus.setAttribute('aria-hidden','true');
   Object.assign(focus.style,{left:left+'px',top:top+'px',width:width+'px',height:height+'px',maskImage:'url("data:image/svg+xml,'+encodeURIComponent(svg)+'")'});
   if(!focus.parentElement)link.append(focus);
  }
 }
 window.refreshWorkshopLinkSurfaces=schedule;
 new MutationObserver(records=>{if(records.some(r=>!r.target.closest?.('.workshop-link-surface,.workshop-link-focus,.workshop-title-paint')&&[...r.addedNodes,...r.removedNodes].some(n=>!n.matches?.('.workshop-link-surface,.workshop-link-focus,.workshop-title-paint'))))schedule();}).observe(document.body,{childList:true,subtree:true});
 document.addEventListener('toggle',schedule,true);
 document.addEventListener('focusin',event=>{if(event.target.matches('a.workshop-link[href],.step-anchor,a.page-title-link'))refresh();});
 window.addEventListener('resize',schedule);
 document.fonts.ready.then(schedule);schedule();
}

// Shared pointer-to-keyboard continuation and viewport clearance, including frames.
export function installKeyboardNavigation(){
 const selector='button,input,select,textarea,summary,a[href],[tabindex]';
 const eligible=e=>e instanceof HTMLElement&&e.tabIndex>=0&&!e.disabled&&!e.closest('[inert],[hidden]')&&e.checkVisibility({checkVisibilityCSS:true});
 // Keep page-level traversal explicit while leaving specimens and modal traps local.
 const pageOrder=()=>{
  const skip=document.querySelector('.skip-main');if(!skip)return [];
  const modal=document.querySelector('dialog:modal');if(modal&&modal.id!=='style-dialog')return [];
  const one=selector=>[...document.querySelectorAll(selector)].find(eligible);
  if(modal)return ['#style-options','#agent input','#theme input','#width input','#hover input','.hover-explainer'].map(one).filter(Boolean);
  const playground=Boolean(document.getElementById('playground-title'));
  return [skip,...(playground?['#style-options','#back-to-top','.page-title-link','#agent input','#theme input','#width input','#hover input','.hover-explainer','[role=tablist] button']:['.theme-toggle button','.page-title-link','.qr-copy','button[data-agent]']).map(one)].filter(Boolean);
 };
 const visual=e=>e.matches('.choice input')?e.closest('.choice'):e;
 const bounds=e=>{
  const group=e.closest('.segmented-toggle,[role=tablist]');
  return (group||visual(e)).getBoundingClientRect();
 };
 let pointerOrigin=null,nextTabTarget=null;
 const preserveScroll=new WeakSet();
 // Anchor arrival owns the viewport while routing through its visible controls.
 window.workshopFocusAtCurrentScroll=target=>{preserveScroll.add(target);target.focus({preventScroll:true});queueMicrotask(()=>preserveScroll.delete(target));};
 window.workshopSetNextTabTarget=target=>{pointerOrigin=null;nextTabTarget=target;};
 document.addEventListener('pointerdown',event=>{
  if(!event.isPrimary||event.button!==0)return;
  nextTabTarget=null;
  const interactive=event.target.closest(selector);
  pointerOrigin=interactive&&eligible(interactive)?null:{x:event.clientX,y:event.clientY};
 },true);
 document.addEventListener('keydown',event=>{
  if(event.key!=='Tab'||event.defaultPrevented)return;
  if(nextTabTarget){const target=nextTabTarget;nextTabTarget=null;if(!event.shiftKey&&target.isConnected&&eligible(target)){event.preventDefault();document.documentElement.dataset.focusInput='keyboard';target.focus({preventScroll:true});return;}}
  if(!pointerOrigin){
   const order=pageOrder(),active=document.activeElement;
   // Arrow browsing may focus a different option within the same one-stop group.
   const index=order.findIndex(e=>e===active||(e.closest('.segmented-toggle,[role=tablist]')?.contains(active)));
   let next=index>=0?order[index+(event.shiftKey?-1:1)]:null;
   if(document.querySelector('#style-dialog:modal')&&index>=0&&!next)next=event.shiftKey?order.at(-1):order[0];
   if(!next&&order.length){
    const first=[...document.querySelectorAll(selector)].find(e=>eligible(e)&&!order.includes(e)&&!e.closest('.playground-heading,.toolbar')&&e.matches('.step-anchor'));
    if(event.shiftKey&&active===first)next=order.at(-1);
    else if(!event.shiftKey&&index===order.length-1)next=first;
   }
   if(next){event.preventDefault();document.documentElement.dataset.focusInput='keyboard';next.focus({preventScroll:true});}
   return;
  }
  const {x,y}=pointerOrigin;pointerOrigin=null;
  const scope=document.querySelector('dialog:modal')||document;
  const items=[...scope.querySelectorAll(selector)].filter(eligible);
  // Select the nearest visible shape in the requested reading direction, rather
  // than the first DOM match (which may be in a distant toolbar or column).
  const candidates=items.map(e=>{const r=bounds(e),dy=event.shiftKey?Math.max(0,y-r.bottom):Math.max(0,r.top-y),dx=x<r.left?r.left-x:x>r.right?x-r.right:0;
   const ahead=event.shiftKey?r.bottom<y||(r.top<=y&&r.right<x):r.top>y||(r.bottom>=y&&r.left>x);
   return {e,r,ahead,distance:Math.hypot(dx,dy)};
  }).filter(c=>c.ahead&&c.r.width&&c.r.height).sort((a,b)=>a.distance-b.distance);
  const next=candidates[0]?.e;
  if(next){event.preventDefault();document.documentElement.dataset.focusInput='keyboard';next.focus({preventScroll:true});}
 },true);
 window.workshopRevealFocus=element=>{
  if(!(element instanceof HTMLElement)||!element.isConnected||!document.hasFocus()||preserveScroll.has(element))return;
  const margin=16;
  let visual=element.matches('.choice input')?element.nextElementSibling:element.closest('.password-field')||element;
  for(let parent=visual.parentElement;parent&&parent!==document.body;parent=parent.parentElement){
   const css=getComputedStyle(parent),r=visual.getBoundingClientRect(),box=parent.getBoundingClientRect();
   const delta=(start,end,min,max)=>end-start>max-min?start-min:start<min?start-min:end>max?end-max:0;
   if(/auto|scroll/.test(css.overflowY))parent.scrollTop+=delta(r.top,r.bottom,box.top+margin,box.bottom-margin);
   if(/auto|scroll/.test(css.overflowX))parent.scrollLeft+=delta(r.left,r.right,box.left+margin,box.right-margin);
  }
  // Full-height galleries are revealed by their parent; never scroll their root.
  if(!document.documentElement.dataset.specimenGallery){
   let top=margin,bottom=innerHeight-margin;
   for(const bar of document.querySelectorAll('.tab-scroll-shell.is-pinned,.toolbar.controls-pinned,[data-sticky-control],.inspector-dock')){
    const r=bar.getBoundingClientRect(),css=getComputedStyle(bar);if(!r.height||!['fixed','sticky'].includes(css.position))continue;
    if(r.top<innerHeight/3)top=Math.max(top,r.bottom+margin);else if(r.bottom>=innerHeight-2)bottom=Math.min(bottom,r.top-margin);
   }
   const r=visual.getBoundingClientRect(),dy=r.height>bottom-top?r.top-top:r.top<top?r.top-top:r.bottom>bottom?r.bottom-bottom:0;
   if(dy)window.scrollBy({top:dy,behavior:'instant'});
  }
  if(window!==parent){const r=visual.getBoundingClientRect();parent.postMessage({guide:'keyboard-target',rect:{top:r.top,bottom:r.bottom,left:r.left,right:r.right}},'*');}
 };
 document.addEventListener('focusin',event=>{if(document.documentElement.dataset.focusInput!=='keyboard'&&eligible(event.target))pointerOrigin=null;if(document.documentElement.dataset.focusInput==='keyboard')queueMicrotask(()=>window.workshopRevealFocus(event.target));});
}
export const keyboardNavigationScript='('+installKeyboardNavigation.toString()+')();';

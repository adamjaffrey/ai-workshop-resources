// Shared pointer-to-keyboard continuation and viewport clearance, including frames.
export function installKeyboardNavigation(){
 const selector='button,input,select,textarea,summary,a[href],[tabindex]';
 const eligible=e=>e instanceof HTMLElement&&e.tabIndex>=0&&!e.disabled&&!e.closest('[inert],[hidden]')&&e.checkVisibility({checkVisibilityCSS:true});
 let pointerOrigin=null,nextTabTarget=null;
 window.workshopSetNextTabTarget=target=>{pointerOrigin=null;nextTabTarget=target;};
 document.addEventListener('pointerdown',event=>{
  if(!event.isPrimary||event.button!==0)return;
  nextTabTarget=null;
  const interactive=event.target.closest(selector);
  pointerOrigin=interactive&&eligible(interactive)?null:{x:event.clientX,y:event.clientY,target:event.target};
 },true);
 document.addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  if(nextTabTarget){const target=nextTabTarget;nextTabTarget=null;if(!event.shiftKey&&target.isConnected&&eligible(target)){event.preventDefault();document.documentElement.dataset.focusInput='keyboard';target.focus({preventScroll:true});return;}}
  if(!pointerOrigin)return;
  const {x,y,target}=pointerOrigin;pointerOrigin=null;
  const scope=target.closest('dialog[open]')||document;
  const items=[...scope.querySelectorAll(selector)].filter(eligible).filter(e=>!e.matches('.skip-main'));
  const candidates=items.filter(e=>{const r=e.getBoundingClientRect();return event.shiftKey?r.bottom<y+4||(r.top<=y&&r.right<x):r.top>y-4||(r.bottom>=y&&r.left>x);});
  const next=event.shiftKey?candidates.at(-1):candidates[0];
  if(next){event.preventDefault();document.documentElement.dataset.focusInput='keyboard';next.focus({preventScroll:true});}
 },true);
 window.workshopRevealFocus=element=>{
  if(!(element instanceof HTMLElement)||!element.isConnected||!document.hasFocus())return;
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

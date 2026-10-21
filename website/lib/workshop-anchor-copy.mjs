import {linkPaint} from './workshop-links.mjs';
import {textIconGap} from './workshop-link-icons.mjs';
export const anchorCopyCSS=`
.step-anchor{position:relative;display:inline;padding:${linkPaint.padding};border:0;border-radius:${linkPaint.radius};background:transparent;color:inherit;font:inherit;letter-spacing:inherit;line-height:inherit;text-align:inherit;vertical-align:baseline;cursor:pointer;box-decoration-break:clone;-webkit-box-decoration-break:clone;transition:color ${linkPaint.motion}}
.step-anchor,.step-anchor *{cursor:pointer!important;user-select:none}
.step-anchor:is(:hover,[data-anchor-preview]){background:${linkPaint.fill};box-shadow:${linkPaint.shadow};color:var(--link-hover)}
.step-anchor-label{text-decoration:none}
.step-anchor-icon{color:var(--link-hover);opacity:1;margin-left:${textIconGap}}
.step-anchor-icon svg{opacity:0;transition:none}
.step-anchor-icon .step-anchor-hash{transition:opacity ${linkPaint.motion}}
.step-anchor:not([data-result]):is(:hover,[data-anchor-preview]) .step-anchor-hash,:root[data-focus-input="keyboard"] .step-anchor:not([data-result]):focus .step-anchor-hash{opacity:1}
.step-anchor[data-result="success"] .step-anchor-success{opacity:1;color:var(--success)}
.step-anchor[data-result="failure"] .step-anchor-failure{opacity:1;color:var(--error)}

.step-anchor-announcement{position:fixed;top:0;left:0;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
`;
export function installAnchorCopy(buttons,urlFor,timing,frames){
 const motion=matchMedia('(prefers-reduced-motion:reduce)');
 const status=document.createElement('span');status.className='step-anchor-announcement';status.setAttribute('role','status');document.body.append(status);
 const feedback=new WeakMap();
 const align=()=>window.sizeTextLinkIcons?.();
 document.fonts.ready.then(align);window.addEventListener('resize',align);align();
 for(const button of buttons){
  button.addEventListener('click',async()=>{
   const previous=feedback.get(button);if(previous){clearTimeout(previous.hold);clearTimeout(previous.fade);previous.animation?.cancel();}
   const state={};feedback.set(button,state);button.removeAttribute('data-cooling');
   let success=false;
   const url=urlFor(button);
   try{
    if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(url.href);
    else{const field=document.createElement('textarea');field.value=url.href;field.style.cssText='position:fixed;left:-10000px;top:0';document.body.append(field);try{field.select();if(!document.execCommand('copy'))throw Error('Copy unavailable');}finally{field.remove();button.focus({preventScroll:true});}}
    success=true;
   }catch{}
   if(feedback.get(button)!==state)return;
   const message=success?'Link Copied':'Copy Failed';button.dataset.result=success?'success':'failure';button.querySelector('.step-anchor-icon').title=message;status.textContent=message;
   const icon=button.querySelector(success?'.step-anchor-success':'.step-anchor-failure');
   if(!motion.matches){state.animation=icon.animate(frames(success),{duration:success?timing.fade:timing.failureEntry,easing:'ease-out'});try{await state.animation.finished;}catch{return;}}
   if(feedback.get(button)!==state)return;
   state.hold=setTimeout(()=>{button.setAttribute('data-cooling','');if(!motion.matches)state.animation=icon.animate(frames(success,true),{duration:timing.fade,easing:'ease-in',fill:'forwards'});state.fade=setTimeout(()=>{state.animation?.cancel();button.removeAttribute('data-result');button.removeAttribute('data-cooling');button.querySelector('.step-anchor-icon').title='Copy Link';status.textContent='';feedback.delete(button);},motion.matches?0:timing.fade);},success?timing.success:timing.failure);
  });
 }
 return {resetCopy(button){const state=feedback.get(button);if(state){clearTimeout(state.hold);clearTimeout(state.fade);state.animation?.cancel();}feedback.delete(button);button.removeAttribute('data-result');button.removeAttribute('data-cooling');button.querySelector('.step-anchor-icon').title='Copy Link';status.textContent='';}};
}

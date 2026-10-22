// Keyboard behaviour shared by the outer Playground and its sandbox documents.
export const playgroundKeyboardCSS=`
.workshop-focus-overlay{position:fixed;pointer-events:none;z-index:2147483647;margin:0;padding:0;inset:auto;background:transparent;box-shadow:none;max-width:none;max-height:none;overflow:visible;box-sizing:border-box;border:3px solid var(--icon-ink);border-radius:9px;display:none}
:root[data-focus-input=keyboard] [data-overlay-focus]{outline:none!important}
:root[data-focus-input=keyboard] [data-overlay-focus]+span,:root[data-focus-input=keyboard] .source-choice:has([data-overlay-focus]),:root[data-focus-input=keyboard] .password-field:has([data-overlay-focus]){outline:none!important}
.code-wrap:has(pre[data-overlay-focus])::after{display:none!important}
:root[data-focus-input=keyboard] :is([data-scroll-focus],.expanded-global-controls,.expanded-state-controls):focus-within{mask-image:none!important;-webkit-mask-image:none!important}
`;
export function installPlaygroundKeyboard(){
 const gallery=Boolean(document.documentElement.dataset.specimenGallery),staticFocus=Boolean(document.getElementById('focus-catalog')),hydrated=new WeakSet();
 const overlay=document.createElement('div');overlay.className='workshop-focus-overlay';overlay.setAttribute('aria-hidden','true');document.body.append(overlay);if(overlay.showPopover)overlay.setAttribute('popover','manual');
 let active=null,scheduled=false,heldPreview=null,heldAttributes=[],entryDirection=null;
 function restoreHeld(){for(const [element,name] of heldAttributes)if(element.isConnected)element.setAttribute(name,'');heldAttributes=[];heldPreview=null;}
 function showActualFocus(element){const preview=element.closest('.focus-preview');if(preview===heldPreview)return;restoreHeld();if(!preview)return;heldPreview=preview;for(const name of ['data-held-focus','data-held-focus-within'])for(const node of preview.querySelectorAll('['+name+']')){heldAttributes.push([node,name]);node.removeAttribute(name);}}
 const visual=e=>e.matches('.page-embed-scroll')?e.closest('.frame-wrap'):e.matches('.error-sample')&&e.querySelector(':scope>.fallback-context')?e.querySelector(':scope>.fallback-context'):e.matches('.choice input')?e.nextElementSibling:e.matches('input[type=checkbox]')?(e.closest('.source-choice')||e):e.matches('summary')&&e.closest('.preview-settings,.preview-state-settings')?e.parentElement:e.closest('.password-field')||e;
 function paint(){
  if(!document.hasFocus()||!active?.isConnected||document.activeElement!==active||document.documentElement.dataset.focusInput!=='keyboard'){overlay.style.display='none';if(overlay.matches(':popover-open'))overlay.hidePopover();return;}
  const target=visual(active),r=target.getBoundingClientRect(),c=getComputedStyle(target),extra=active.matches('.focus-row')?12:0;let top=r.top,height=r.height;
  const field=active.closest('.password-field'),ringColour=field?((field.closest('.is-password-error')||field.dataset.passwordState==='wrong')?getComputedStyle(field).getPropertyValue('--error'):(field.closest('.is-success')||field.dataset.passwordState==='success')?getComputedStyle(field).getPropertyValue('--success'):getComputedStyle(field).getPropertyValue('--icon-ink')):getComputedStyle(active).getPropertyValue('--icon-ink');
  if(active.matches('.focus-row')){const rows=[...document.querySelectorAll('.focus-row')],first=active===rows[0],last=active===rows.at(-1);const edgeTop=first?r.top-14:r.top+3,edgeBottom=last?r.bottom+14:r.bottom-parseFloat(c.borderBottomWidth)-3;top=edgeTop+6;height=edgeBottom-edgeTop-12;}
  if(active.matches('input[type=range]')){height=28;top=r.top+(r.height-height)/2;}
  const host=active.closest('dialog[open]')||document.body;if(overlay.parentElement!==host)host.append(overlay);if(overlay.showPopover&&!overlay.matches(':popover-open'))overlay.showPopover();
  Object.assign(overlay.style,{outline:'none',outlineOffset:'0px',borderWidth:'3px'});
  Object.assign(overlay.style,{display:'block',borderColor:ringColour,left:r.left-6-extra+'px',top:top-6+'px',width:r.width+12+2*extra+'px',height:height+12+'px',borderRadius:['borderTopLeftRadius','borderTopRightRadius','borderBottomRightRadius','borderBottomLeftRadius'].map(key=>parseFloat(c[key])>3?parseFloat(c[key])+6+'px':'var(--focus-sharp-outer-radius)').join(' ')});
  if(active.matches('pre')&&active.closest('.code-wrap')){
   const source=getComputedStyle(active.closest('.code-wrap'),'::after');
   if(source.outlineStyle!=='none'&&parseFloat(source.outlineWidth)>0)Object.assign(overlay.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px',borderWidth:'0px',outline:source.outline,outlineOffset:source.outlineOffset,borderRadius:source.borderRadius});
  }
 }
 function reveal(target){window.workshopRevealFocus?.(target);}
 document.addEventListener('focusin',event=>{
  const e=event.target;if(!(e instanceof HTMLElement))return;
  if(document.documentElement.dataset.focusInput!=='keyboard')return;
  if(gallery&&!staticFocus)showActualFocus(e);
  const use=!e.matches('[data-panel-heading],.step-anchor,a.workshop-link,a.page-title-link,.perspective-discover')&&(gallery||e.matches('[data-scroll-focus],input[type=range],#style-dialog #style-options')||e.closest('.preview-dialog.is-expanded'));
  if(active)active.removeAttribute('data-overlay-focus');active=use?e:null;if(active)active.setAttribute('data-overlay-focus','');
  queueMicrotask(()=>{reveal(e);paint();});
 });
 document.addEventListener('focusout',()=>requestAnimationFrame(()=>{if(heldPreview&&!heldPreview.contains(document.activeElement))restoreHeld();paint();}));
 document.addEventListener('pointerdown',()=>{entryDirection=null;overlay.style.display='none';for(const frame of document.querySelectorAll('iframe'))frame.contentWindow?.postMessage({guide:'pointer-mode'},'*');},true);
 window.addEventListener('focus',()=>{if(entryDirection===null)return;const reverse=entryDirection;entryDirection=null;queueMicrotask(()=>{if(document.documentElement.dataset.focusInput!=='keyboard'||document.querySelector('dialog:modal'))return;const candidates=[...document.querySelectorAll('button,input,select,textarea,summary,a[href],[tabindex]')].filter(e=>e.tabIndex>=0&&!e.disabled&&!e.closest('[inert]')&&e.checkVisibility({checkVisibilityCSS:true})).sort((a,b)=>(a.tabIndex||Infinity)-(b.tabIndex||Infinity));(reverse?candidates.at(-1):candidates[0])?.focus({preventScroll:true});});});
 window.addEventListener('blur',()=>{overlay.style.display='none';});
 document.addEventListener('toggle',()=>requestAnimationFrame(paint),true);
 document.addEventListener('scroll',paint,true);window.addEventListener('resize',()=>{scan();paint();});
 document.addEventListener('keydown',event=>{
  if(event.key==='Tab')for(const frame of document.querySelectorAll('iframe'))frame.contentWindow?.postMessage({guide:'keyboard-mode',reverse:event.shiftKey},'*');
 },true);
 document.addEventListener('keydown',event=>{
  const e=event.target;
  if(event.defaultPrevented)return;
  if(event.key==='Tab'&&!event.shiftKey&&e.matches?.('.error-sample:has(>.fallback-context):not(:has(>.full-login-context))')){const skip=e.querySelector('.skip-main');if(skip){event.preventDefault();skip.focus({preventScroll:true});return;}}
  if(e.matches?.('input[type=checkbox]')&&event.key==='Enter'){event.preventDefault();if(!event.repeat&&!e.disabled)e.click();return;}
  if(!e.hasAttribute?.('data-scroll-focus')||event.target!==e)return;
  const capture=e.querySelector(':scope>iframe[data-static-scroll]:not([hidden])'),page=capture?.clientHeight||e.clientHeight;
  const direction={ArrowLeft:[-48,0],ArrowRight:[48,0],ArrowUp:[0,-48],ArrowDown:[0,48],...(capture?{PageUp:[0,-page*.9],PageDown:[0,page*.9],Home:[0,-Infinity],End:[0,Infinity]}:{})}[event.key];
  if(!direction)return;event.preventDefault();event.stopPropagation();
  if(capture?.contentDocument){e.scrollBy({left:direction[0],top:0,behavior:'instant'});const target=capture.contentDocument.scrollingElement;target.scrollTo({left:target.scrollLeft+direction[0],top:Number.isFinite(direction[1])?target.scrollTop+direction[1]:direction[1]>0?target.scrollHeight:0,behavior:'instant'});return;}
  const scroller=e.matches('.full-login-context')?e.closest('.error-sample')||e:e;
  scroller.scrollBy({left:direction[0],top:direction[1],behavior:'instant'});
  const frame=e.querySelector(':scope>iframe');if(frame)frame.contentWindow.postMessage({guide:'keyboard-pan',dx:direction[0],dy:direction[1]},'*');
 });
 window.addEventListener('message',event=>{
  if(event.source===parent&&event.data?.guide==='pointer-mode'){entryDirection=null;document.documentElement.dataset.focusInput='pointer';overlay.style.display='none';}
  if(event.source===parent&&event.data?.guide==='keyboard-mode'){
   if(!document.hasFocus())entryDirection=Boolean(event.data.reverse);
   document.documentElement.dataset.focusInput='keyboard';
   for(const frame of document.querySelectorAll('iframe'))frame.contentWindow?.postMessage({guide:'keyboard-mode',reverse:event.data.reverse},'*');
   const e=document.activeElement;if(document.hasFocus()&&e&&e!==document.body){const use=!e.matches('[data-panel-heading],.step-anchor,a.workshop-link,a.page-title-link,.perspective-discover')&&(gallery||e.matches('[data-scroll-focus],input[type=range],#style-dialog #style-options')||e.closest('.preview-dialog.is-expanded'));if(use){if(gallery&&!staticFocus)showActualFocus(e);active=e;e.setAttribute('data-overlay-focus','');queueMicrotask(()=>{reveal(e);paint();});}}
  }
  if(event.source===parent&&event.data?.guide==='keyboard-pan')window.scrollBy({left:event.data.dx,top:event.data.dy,behavior:'instant'});
  if(event.data?.guide!=='keyboard-target')return;
  const frame=[...document.querySelectorAll('iframe')].find(e=>e.contentWindow===event.source);if(!frame||document.activeElement!==frame||frame.closest('[inert]'))return;
  const rect=event.data.rect;if(!rect||!Number.isFinite(rect.top))return;
  for(let container=frame.parentElement;container&&container!==document.body;container=container.parentElement){const css=getComputedStyle(container),box=container.getBoundingClientRect(),f=frame.getBoundingClientRect(),y=f.top+rect.top,end=f.top+rect.bottom;const delta=(start,end,min,max)=>end-start>max-min?start-min:start<min?start-min:end>max?end-max:0;if(/auto|scroll/.test(css.overflowY))container.scrollTop+=delta(y,end,box.top+16,box.bottom-16);if(/auto|scroll/.test(css.overflowX))container.scrollLeft+=delta(f.left+rect.left,f.left+rect.right,box.left+16,box.right-16);}
  const r=frame.getBoundingClientRect();
  const top=(document.querySelector('.tab-scroll-shell.is-pinned')?.getBoundingClientRect().bottom||0)+12,bottom=innerHeight-(document.querySelector('.inspector-dock')?.getBoundingClientRect().height||0)-12;
  const y=r.top+rect.top, end=r.top+rect.bottom;if(y<top)window.scrollBy(0,y-top);else if(end>bottom)window.scrollBy(0,Math.min(end-bottom,y-top));
 });
 function scan(){
  scheduled=false;
  if(gallery&&!staticFocus)for(const group of document.querySelectorAll('.segmented-toggle')){
   if(hydrated.has(group))continue;hydrated.add(group);
   const controller=window.installWorkshopGroupFocus?.(group,{items:()=>group.querySelectorAll('button'),selected:()=>group.querySelector('[aria-pressed=true]')});
   group.addEventListener('click',event=>{const button=event.target.closest('button');if(!button||button.disabled)return;for(const b of group.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b===button));window.layoutWorkshopToggle?.(group);controller?.sync(button);});
  }
  for(const context of document.querySelectorAll('.fallback-context:not(.full-login-context)'))window.installWorkshopSkipNavigation?.(context);
  for(const e of document.querySelectorAll('.icon-sample,.full-login-context,.focus-preview,.agent-preview,.prompt-specimen-viewport,.feedback-preview,.specimen-viewport,.variant-preview,.page-embed-scroll,.frame-wrap,pre,.expanded-state-controls,.expanded-global-controls>#global-style-controls')){
   if(e.closest('.catalog-sources,[inert]')||!e.getClientRects().length)continue;
   if(e.closest('.type-row[data-source-selector=".qr-card figcaption"]')){e.removeAttribute('data-scroll-focus');e.tabIndex=-1;continue;}
   if(e.matches('.error-sample:has(>.full-login-context)')){e.removeAttribute('data-scroll-focus');e.removeAttribute('tabindex');continue;}
   const c=getComputedStyle(e),typographyStop=innerWidth<=660&&e.matches('.specimen-viewport')&&e.closest('.type-row:not([data-source-selector=".brand-name"]):not(.has-variants)'),scrollable=Boolean(typographyStop)||(/auto|scroll/.test(c.overflowX)&&e.scrollWidth>e.clientWidth+2)||(/auto|scroll/.test(c.overflowY)&&e.scrollHeight>e.clientHeight+2)||e.matches('.page-embed-scroll,.full-login-context,.error-sample:has(>.fallback-context):not(:has(>.full-login-context))');
   if(scrollable){e.setAttribute('data-scroll-focus','');e.tabIndex=0;if(!e.hasAttribute('aria-label'))e.setAttribute('aria-label',(e.querySelector(':scope>iframe')?.title||e.closest('section')?.querySelector('h2,h3')?.textContent?.trim()||'Specimen')+' — Scroll with Arrow Keys');}
   else if(e.hasAttribute('data-scroll-focus')){e.removeAttribute('data-scroll-focus');e.removeAttribute('tabindex');}
  }
 }
 new MutationObserver(records=>{if(records.every(r=>r.target===overlay)||scheduled)return;scheduled=true;queueMicrotask(scan);}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','open']});
 new ResizeObserver(()=>{if(!scheduled){scheduled=true;requestAnimationFrame(scan);}}).observe(document.body);
 document.fonts.ready.then(scan);scan();
}
export const playgroundKeyboardScript='('+installPlaygroundKeyboard.toString()+')();';

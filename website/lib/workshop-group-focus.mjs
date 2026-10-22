// Manual activation: browsing a group never commits a value.
export const groupFocusCSS=`
:root[data-focus-input="keyboard"] .segmented-toggle button[aria-pressed="false"]:focus::before,:root[data-focus-input="keyboard"] .segmented-toggle .choice:has(input:not(:checked):focus)::before{background:var(--action-hover)}
:root[data-focus-input="keyboard"] .segmented-toggle button[aria-pressed="false"]:focus,:root[data-focus-input="keyboard"] .segmented-toggle .choice input:not(:checked):focus+span{color:var(--text)}
:root[data-focus-input="keyboard"] [role=tablist] button:focus{background:var(--hover);color:var(--text)}
.workshop-group-ring{position:absolute;display:none;pointer-events:none;border-radius:8px;outline:3px solid var(--icon-ink);outline-offset:3px;z-index:5}
:root[data-focus-input="keyboard"] [data-group-focus]>.workshop-group-ring{display:block}
:root[data-focus-input="keyboard"] [data-group-focus] :is(input,button):focus,:root[data-focus-input="keyboard"] [data-group-focus] .choice input:focus+span{outline:none!important}
`;
export function installGroupFocus(group,{items,selected,reveal,ringHost}={}){
 const choices=()=>[...items()].filter(e=>!e.disabled&&!e.closest('[hidden]'));
 const visual=e=>e.matches('input')?e.nextElementSibling:e;
 const ring=ringHost?Object.assign(document.createElement('span'),{className:'workshop-group-ring'}):null;
 if(ring){ring.setAttribute('aria-hidden','true');ringHost.append(ring);}
 const updateRing=()=>{
  const active=choices().includes(document.activeElement)?document.activeElement:null;
  if(!ring)return;
  ringHost.toggleAttribute('data-group-focus',Boolean(active));if(!active)return;
  const r=visual(active).getBoundingClientRect(),h=ringHost.getBoundingClientRect(),css=getComputedStyle(ringHost);
  Object.assign(ring.style,{left:r.left-h.left-parseFloat(css.borderLeftWidth)+'px',top:r.top-h.top-parseFloat(css.borderTopWidth)+'px',width:r.width+'px',height:r.height+'px'});
 };
 const sync=(target=selected?.()||choices()[0])=>{if(!target)return;for(const item of choices())item.tabIndex=item===target?0:-1;updateRing();};
 group.addEventListener('focusin',event=>{if(!choices().includes(event.target))return;sync(event.target);if(document.documentElement.dataset.focusInput==='keyboard')reveal?.(event.target);requestAnimationFrame(updateRing);});
 group.addEventListener('focusout',event=>{if(!group.contains(event.relatedTarget)){sync();ringHost?.removeAttribute('data-group-focus');}});
 group.addEventListener('keydown',event=>{
  const list=choices(),index=list.indexOf(event.target);if(index<0)return;
  const direction={ArrowLeft:-1,ArrowUp:-1,ArrowRight:1,ArrowDown:1}[event.key];
  const next=event.key==='Home'?list[0]:event.key==='End'?list.at(-1):direction?list[(index+direction+list.length)%list.length]:null;
  if(next){event.preventDefault();event.stopPropagation();sync(next);next.focus({preventScroll:true});return;}
  // Radio inputs do not natively activate on Enter. Suppress native arrow selection.
  if(event.target.matches('input[type=radio]')&&['Enter',' '].includes(event.key)){event.preventDefault();if(!event.repeat)event.target.click();}
 });
 group.addEventListener('change',()=>sync());
 group.addEventListener('scroll',updateRing,{passive:true});
 window.addEventListener('resize',updateRing);
 if(ringHost)new ResizeObserver(updateRing).observe(ringHost);
 sync();return {sync,updateRing};
}

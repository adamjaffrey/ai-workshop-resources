// Page-level bypass; specimens retain their own local navigation contracts.
export const skipNavigationCSS=`
.skip-main-position{position:absolute;z-index:1000;left:var(--skip-left,28px);top:var(--skip-top,20px);transform:translateY(-50%);width:max-content;max-width:calc(100% - 56px);opacity:0;pointer-events:none;line-height:24px;font-size:14px}
.skip-main-position:focus-within{opacity:1;pointer-events:auto}
`;
export function installSkipNavigation(){
 if(window!==top)return;
 const install=()=>{
  const title=document.querySelector('.page-title-link'),playground=!!document.getElementById('playground-title');
  if(!title||document.querySelector('.skip-main'))return;
  const brand=document.querySelector(playground?'.playground-brand-row .brand':'.page-toolbar .brand');if(!brand)return;
  const wrapper=document.createElement('div');wrapper.className='skip-main-position';
  const link=document.createElement('a');link.className='skip-main';link.textContent='Skip to Main Content';link.tabIndex=1;
  link.href=playground?'#playground-main':'#resource-step-1';title.tabIndex=2;
  if(playground)document.querySelector('main.wrap').id='playground-main';
  wrapper.append(link);document.body.prepend(wrapper);window.decorateWorkshopLinks?.();
  const position=()=>{const rect=brand.getBoundingClientRect();wrapper.style.setProperty('--skip-left',rect.left+scrollX+'px');wrapper.style.setProperty('--skip-top',Math.max(14,(rect.top+scrollY)/2)+'px');window.refreshWorkshopLinkSurfaces?.();};
  document.fonts.ready.then(position);new ResizeObserver(position).observe(brand);window.addEventListener('resize',position);position();
  link.addEventListener('click',event=>{event.preventDefault();let target;
   if(playground){const panel=[...document.querySelectorAll('[data-panel]')].find(e=>!e.hidden);target=[...panel.querySelectorAll('button,input,summary,a[href],[tabindex],iframe')].find(e=>e.tabIndex>=0&&!e.disabled&&!e.closest('[inert],[hidden]')&&e.checkVisibility({checkVisibilityCSS:true}));}
   else target=document.querySelector('#resource-step-1 .step-anchor');
   if(target){document.documentElement.dataset.focusInput='keyboard';target.focus({preventScroll:true});window.workshopRevealFocus?.(target);}
  });
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
}
export const skipNavigationScript='('+installSkipNavigation.toString()+')();';

// Shared page bypass, also available to explicitly opted-in full-page specimens.
export const skipNavigationCSS=`
.skip-main-position{position:absolute;z-index:1000;left:var(--skip-left,28px);top:var(--skip-top,20px);transform:translateY(-50%);width:max-content;max-width:calc(100% - 56px);opacity:0;pointer-events:none;line-height:24px;font-size:14px}
.skip-main-position:focus-within{opacity:1;pointer-events:auto}
`;
export function installSkipNavigation(){
 const install=(root=document)=>{
  const title=root.querySelector('.page-title-link'),playground=root===document&&!!document.getElementById('playground-title');
  if(!title||root.querySelector('.skip-main'))return;
  const brand=root.querySelector(playground?'.playground-brand-row .brand':'.page-toolbar .brand');if(!brand)return;
  const wrapper=document.createElement('div');wrapper.className='skip-main-position';
  const link=document.createElement('a');link.className='skip-main workshop-link--internal';link.textContent='Skip to Main Content';link.tabIndex=root===document?1:0;
  link.href=playground?'#playground-main':'#resource-step-1';title.tabIndex=0;
  if(playground)document.querySelector('main.wrap').id='playground-main';
  wrapper.append(link);(root===document?document.body:root).prepend(wrapper);if(root!==document)root.style.position='relative';window.decorateWorkshopLinks?.();
  const position=()=>{const rect=brand.getBoundingClientRect(),box=root===document?{left:-scrollX,top:-scrollY}:root.getBoundingClientRect();wrapper.style.setProperty('--skip-left',rect.left-box.left+'px');wrapper.style.setProperty('--skip-top',Math.max(14,(rect.top-box.top)/2)+'px');window.refreshWorkshopLinkSurfaces?.();};
  document.fonts.ready.then(position);new ResizeObserver(position).observe(brand);window.addEventListener('resize',position);position();
  link.addEventListener('click',event=>{event.preventDefault();let target;
   if(playground){const panel=[...document.querySelectorAll('[data-panel]')].find(e=>!e.hidden);target=[...panel.querySelectorAll('button,input,summary,a[href],[tabindex],iframe')].find(e=>e.tabIndex>=0&&!e.disabled&&!e.closest('[inert],[hidden]')&&e.checkVisibility({checkVisibilityCSS:true}));}
   else target=root.querySelector('#resource-step-1 .step-anchor,.step-anchor');
   if(target){document.documentElement.dataset.focusInput='keyboard';target.focus({preventScroll:true});window.workshopRevealFocus?.(target);}
  });
 };
 window.installWorkshopSkipNavigation=install;
 const ready=()=>{if(window===top||document.documentElement.hasAttribute('data-page-navigation'))install();};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
}
export const skipNavigationScript='('+installSkipNavigation.toString()+')();';

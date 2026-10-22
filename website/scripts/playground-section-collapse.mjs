import {__iconNode as chevronDown} from '../node_modules/lucide-react/dist/esm/icons/chevron-down.mjs';
import {assertMeasuredHeadingIcon} from '../lib/workshop-alignment.mjs';
assertMeasuredHeadingIcon('chevron-down');
const svg='<svg data-icon-provider="lucide" data-icon-name="chevron-down" data-icon-use="toggle-playground-section" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+chevronDown.map(([tag,attrs])=>'<'+tag+' '+Object.entries(attrs).filter(([key])=>key!=='key').map(([key,value])=>key+'="'+value+'"').join(' ')+'></'+tag+'>').join('')+'</svg>';
export const sectionCollapseCSS=`
html:has(#playground-title){scrollbar-gutter:stable}
/* The bordered target sits on the 24px surface rail; text retains its 28px rail. */
[data-panel]>.panel:not(.is-expanded){padding-block:20px}
:is([data-panel]>.panel,.url-subsection)>.section-heading{position:relative;padding-right:72px;min-height:50px;margin-bottom:20px;isolation:isolate;-webkit-tap-highlight-color:transparent}
:is([data-panel]>.panel,.url-subsection)>.section-heading>.section-collapse{position:absolute;right:-8px;top:0;margin:0;z-index:0;display:grid;place-items:center;width:50px;height:50px;min-height:50px;padding:0;border:1px solid var(--control-border);border-radius:12px;background:transparent;color:var(--text);cursor:pointer;box-shadow:none;isolation:isolate;appearance:none;-webkit-tap-highlight-color:transparent;user-select:none;transition:none}
:is([data-panel]>.panel,.url-subsection):not(.is-expanded)>.section-heading :is(h2,h3){position:relative;z-index:1;user-select:none}
:is([data-panel]>.panel,.url-subsection):not(.is-expanded)>.section-heading :is(h2,h2 *,h3,h3 *,button,button *){cursor:pointer!important}
.section-collapse>svg{position:relative;z-index:1;display:block;width:24px;height:24px;transform:translate(0,1px) rotate(0deg);transform-origin:center;transition:transform 160ms ease}
#panel-url-reference .panel .url-subsection{padding-top:20px}
#panel-url-reference .panel .url-subsection>.section-heading{min-height:50px;margin-bottom:20px}
#panel-url-reference .panel .url-subsection[data-collapsed]{padding-bottom:20px}
#panel-url-reference .panel .url-subsection[data-collapsed]+.url-subsection{margin-top:0}
#panel-url-reference .panel .url-subsection[data-collapsed]:last-child{padding-bottom:0}
#panel-url-reference .panel .url-subsection[data-collapsed]>.section-heading{margin-bottom:0}
.section-heading::before{content:"";position:absolute;top:0;left:-8px;right:-8px;height:100%;border-radius:12px;background:var(--hover);opacity:0;pointer-events:none;z-index:-1;transition:none}
.section-heading:is([data-collapse-hover],:has(>.section-collapse:hover),:has(>.section-collapse:active))::before,:root[data-focus-input="keyboard"] .section-heading:has(>.section-collapse:focus)::before{opacity:1}
.section-collapse::before,.section-collapse::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:0;opacity:0}
.section-collapse::before{background:var(--control-bg);transition:opacity 160ms ease}
.section-collapse::after{background:var(--hover)}
.section-collapse:is(:hover,[data-region-hover]){background:transparent!important}
.section-collapse:is(:hover,[data-region-hover])::after{opacity:1}
:is([data-panel]>.panel,.url-subsection)[data-collapsed]>.section-heading>.section-collapse::before{opacity:1}
[data-collapsed]>.section-heading>.section-collapse>svg{transform:translate(-1px,0) rotate(90deg)}
[data-panel]>.panel[data-collapsed]>:not(.section-heading),[data-panel]>.panel[data-collapsed]>.section-heading>:not(h2):not(.section-collapse){display:none!important}
[data-panel]>.panel[data-collapsed]>.section-heading{margin-bottom:0}
[data-panel]>.panel.is-expanded>.section-heading{padding-right:0}
[data-panel]>.panel.is-expanded>.section-heading>.section-collapse{display:none}
@media(prefers-reduced-motion:reduce){.section-heading::before,.section-collapse::before,.section-collapse,.section-collapse>svg{transition:none}}
`;
export const sectionCollapseScript=String.raw`
// Keep native section children in place: existing specimen and expansion selectors
// continue to work. Hiding content removes it from layout and keyboard navigation.
for(const [index,panel] of [...document.querySelectorAll('[data-panel]>.panel,.url-subsection')].entries()){
 const heading=panel.querySelector(':scope>.section-heading'),title=heading?.querySelector('h2,h3');if(!title)continue;
 const button=document.createElement('button');button.type='button';button.className='section-collapse';button.innerHTML=${JSON.stringify(svg)};
 const name=title.textContent.trim();button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Collapse '+name);
 const ids=[...panel.children].filter(e=>e!==heading).map((child,i)=>{if(!child.id)child.id='section-content-'+index+'-'+i;return child.id;});
 button.setAttribute('aria-controls',ids.join(' '));heading.append(button);let hiddenContent=[],resizeAnimation=null;
 panel.workshopSetCollapsed=(collapsed,preserveViewport=false)=>{
  if(panel.hasAttribute('data-collapsed')===collapsed)return;
  const finish=preserveViewport?window.workshopPlaygroundAnchors?.prepareDisclosure(panel):null;
  const from=panel.getBoundingClientRect().height;resizeAnimation?.cancel();
  panel.toggleAttribute('data-collapsed',collapsed);button.setAttribute('aria-expanded',String(!collapsed));button.setAttribute('aria-label',(collapsed?'Expand ':'Collapse ')+name);
  // Inline priority also overrides existing ID-specific display: flex !important.
  if(collapsed){hiddenContent=[...panel.children].filter(child=>child!==heading).map(child=>({child,display:child.style.getPropertyValue('display'),priority:child.style.getPropertyPriority('display')}));for(const {child} of hiddenContent)child.style.setProperty('display','none','important');}
  else{for(const {child,display,priority} of hiddenContent){if(display)child.style.setProperty('display',display,priority);else child.style.removeProperty('display');}hiddenContent=[];}
  finish?.();
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches){const to=panel.getBoundingClientRect().height;resizeAnimation=panel.animate([{height:from+'px',overflowX:'visible',overflowY:'clip'},{height:to+'px',overflowX:'visible',overflowY:'clip'}],{duration:160,easing:'ease'});}
  if(!collapsed)requestAnimationFrame(()=>{for(const frame of panel.querySelectorAll('iframe'))frame.contentWindow.postMessage({guide:'measure-reference'},'*');});
 };
 button.addEventListener('click',()=>{panel.workshopSetCollapsed(!panel.hasAttribute('data-collapsed'),true);});
}
`;

import {__iconNode as chevronDown} from '../node_modules/lucide-react/dist/esm/icons/chevron-down.mjs';
import {assertMeasuredHeadingIcon} from '../lib/workshop-alignment.mjs';
assertMeasuredHeadingIcon('chevron-down');
const svg='<svg data-icon-provider="lucide" data-icon-name="chevron-down" data-icon-use="toggle-playground-section" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+chevronDown.map(([tag,attrs])=>'<'+tag+' '+Object.entries(attrs).filter(([key])=>key!=='key').map(([key,value])=>key+'="'+value+'"').join(' ')+'></'+tag+'>').join('')+'</svg>';
export const sectionCollapseCSS=`
html:has(#playground-title){scrollbar-gutter:stable}
/* The bordered target sits on the 24px surface rail; text retains its 28px rail. */
[data-panel]>.panel:not(.is-expanded){padding-block:24px}
:is([data-panel]>.panel,.url-subsection)>.section-heading{position:relative;padding-right:56px;min-height:44px;margin-bottom:24px;isolation:isolate}
:is([data-panel]>.panel,.url-subsection)>.section-heading>.section-collapse{position:absolute;right:-4px;top:0;margin:0;z-index:0;display:grid;place-items:center;width:44px;height:44px;min-height:44px;padding:0;border:1px solid var(--control-border);border-radius:8px;background:transparent;color:var(--text);cursor:pointer;box-shadow:none}
:is([data-panel]>.panel,.url-subsection):not(.is-expanded)>.section-heading :is(h2,h3){position:relative;z-index:1;user-select:none}
:is([data-panel]>.panel,.url-subsection):not(.is-expanded)>.section-heading :is(h2,h2 *,h3,h3 *,button,button *){cursor:pointer!important}
.section-collapse>svg{display:block;width:24px;height:24px;transform-origin:center;transition:transform 160ms ease}
#panel-url-reference .url-subsection>.section-heading{min-height:44px;margin-bottom:24px}
#panel-url-reference .url-subsection[data-collapsed]{padding-bottom:24px}
#panel-url-reference .url-subsection[data-collapsed]>.section-heading{margin-bottom:0}
.section-collapse:hover{background:var(--hover)!important}
[data-collapsed]>.section-heading>.section-collapse>svg{transform:rotate(90deg)}
[data-panel]>.panel[data-collapsed]>:not(.section-heading),[data-panel]>.panel[data-collapsed]>.section-heading>:not(h2):not(.section-collapse){display:none!important}
[data-panel]>.panel[data-collapsed]>.section-heading{margin-bottom:0}
[data-panel]>.panel.is-expanded>.section-heading{padding-right:0}
[data-panel]>.panel.is-expanded>.section-heading>.section-collapse{display:none}
@media(prefers-reduced-motion:reduce){.section-collapse>svg{transition:none}}
`;
export const sectionCollapseScript=String.raw`
// Keep native section children in place: existing specimen and expansion selectors
// continue to work. Hiding content removes it from layout and keyboard navigation.
for(const [index,panel] of [...document.querySelectorAll('[data-panel]>.panel,.url-subsection')].entries()){
 const heading=panel.querySelector(':scope>.section-heading'),title=heading?.querySelector('h2,h3');if(!title)continue;
 const button=document.createElement('button');button.type='button';button.className='section-collapse';button.innerHTML=${JSON.stringify(svg)};
 const name=title.textContent.trim();button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Collapse '+name);
 const ids=[...panel.children].filter(e=>e!==heading).map((child,i)=>{if(!child.id)child.id='section-content-'+index+'-'+i;return child.id;});
 button.setAttribute('aria-controls',ids.join(' '));heading.append(button);let hiddenContent=[];
 panel.workshopSetCollapsed=collapsed=>{
  if(panel.hasAttribute('data-collapsed')===collapsed)return;
  panel.toggleAttribute('data-collapsed',collapsed);button.setAttribute('aria-expanded',String(!collapsed));button.setAttribute('aria-label',(collapsed?'Expand ':'Collapse ')+name);
  // Inline priority also overrides existing ID-specific display: flex !important.
  if(collapsed){hiddenContent=[...panel.children].filter(child=>child!==heading).map(child=>({child,display:child.style.getPropertyValue('display'),priority:child.style.getPropertyPriority('display')}));for(const {child} of hiddenContent)child.style.setProperty('display','none','important');}
  else{for(const {child,display,priority} of hiddenContent){if(display)child.style.setProperty('display',display,priority);else child.style.removeProperty('display');}hiddenContent=[];}
  if(!collapsed)requestAnimationFrame(()=>{for(const frame of panel.querySelectorAll('iframe'))frame.contentWindow.postMessage({guide:'measure-reference'},'*');});
 };
 button.addEventListener('click',()=>{window.workshopPlaygroundAnchors?.leave();panel.workshopSetCollapsed(!panel.hasAttribute('data-collapsed'));});
}
`;

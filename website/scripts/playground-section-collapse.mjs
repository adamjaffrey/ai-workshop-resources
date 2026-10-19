import {__iconNode as chevronDown} from '../node_modules/lucide-react/dist/esm/icons/chevron-down.mjs';
import {assertMeasuredHeadingIcon} from '../lib/workshop-alignment.mjs';
import ink from '../lib/workshop-icon-ink.generated.json' with {type:'json'};
assertMeasuredHeadingIcon('chevron-down');
const svg='<svg data-icon-provider="lucide" data-icon-name="chevron-down" data-icon-use="toggle-playground-section" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+chevronDown.map(([tag,attrs])=>'<'+tag+' '+Object.entries(attrs).filter(([key])=>key!=='key').map(([key,value])=>key+'="'+value+'"').join(' ')+'></'+tag+'>').join('')+'</svg>';
export const sectionCollapseCSS=`
/* Compensate the 10px hit-target padding, measured SVG whitespace and 1px
   panel border so the visible stroke stays 28px from the outer right edge. */
[data-panel]>.panel>.section-heading{position:relative;padding-right:44px}
[data-panel]>.panel>.section-heading>.section-collapse{position:absolute;right:calc(-11px - ${ink.icons['chevron-down'].right}px);top:calc(4px + (1.5em - 44px)/2);font-size:24px;display:grid;place-items:center;width:44px;height:44px;min-width:44px;padding:10px;border:0;border-radius:8px;background:transparent;color:var(--text);cursor:pointer;box-shadow:none}
.section-collapse>svg{display:block;width:24px;height:24px;transition:transform 160ms ease}
.section-collapse:hover{background:var(--hover)!important}
[data-panel]>.panel[data-collapsed]>.section-heading>.section-collapse{right:calc(-11px - ${ink.icons['chevron-right'].right}px)}
[data-collapsed]>.section-heading>.section-collapse>svg{transform:rotate(-90deg)}
[data-panel]>.panel[data-collapsed]>:not(.section-heading),[data-panel]>.panel[data-collapsed]>.section-heading>:not(h2):not(.section-collapse){display:none!important}
[data-panel]>.panel[data-collapsed]>.section-heading{margin-bottom:0}
[data-panel]>.panel.is-expanded>.section-heading{padding-right:0}
[data-panel]>.panel.is-expanded>.section-heading>.section-collapse{display:none}
@media(prefers-reduced-motion:reduce){.section-collapse>svg{transition:none}}
`;
export const sectionCollapseScript=String.raw`
// Keep native section children in place: existing specimen and expansion selectors
// continue to work. Hiding content removes it from layout and keyboard navigation.
for(const [index,panel] of [...document.querySelectorAll('[data-panel]>.panel')].entries()){
 const heading=panel.querySelector(':scope>.section-heading'),title=heading?.querySelector('h2');if(!title)continue;
 const button=document.createElement('button');button.type='button';button.className='section-collapse';button.innerHTML=${JSON.stringify(svg)};
 const name=title.textContent.trim();button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Collapse '+name);
 const ids=[...panel.children].filter(e=>e!==heading).map((child,i)=>{if(!child.id)child.id='section-content-'+index+'-'+i;return child.id;});
 button.setAttribute('aria-controls',ids.join(' '));heading.append(button);let hiddenContent=[];
 button.addEventListener('click',()=>{
  const collapsed=panel.toggleAttribute('data-collapsed');button.setAttribute('aria-expanded',String(!collapsed));button.setAttribute('aria-label',(collapsed?'Expand ':'Collapse ')+name);
  // Inline priority also overrides existing ID-specific display: flex !important.
  if(collapsed){hiddenContent=[...panel.children].filter(child=>child!==heading).map(child=>({child,display:child.style.getPropertyValue('display'),priority:child.style.getPropertyPriority('display')}));for(const {child} of hiddenContent)child.style.setProperty('display','none','important');}
  else{for(const {child,display,priority} of hiddenContent){if(display)child.style.setProperty('display',display,priority);else child.style.removeProperty('display');}hiddenContent=[];}
  if(!collapsed)requestAnimationFrame(()=>{for(const frame of panel.querySelectorAll('iframe'))frame.contentWindow.postMessage({guide:'measure-reference'},'*');});
 });
}
`;

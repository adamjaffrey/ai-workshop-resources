import {linkArrowSVG} from '../lib/workshop-links.mjs';
// Catalogue the real outer Playground DOM, including hidden/mobile controls.
// Iframe app specimens belong exclusively to the separate app icon catalogue.
export const playgroundIconCatalogScript = String.raw`
function iconUsageItem(text){const item=document.createElement('li'),split=text.lastIndexOf(' · ');if(split<0){item.textContent=text;return item;}item.append(document.createTextNode(text.slice(0,split+3)));const code=document.createElement('code');code.textContent=text.slice(split+3);item.append(code);return item;}
function foldIconUsages(list){
 const count=list.children.length;let details=list.closest('.icon-usages');
 if(count<=5)return;
 if(!details){details=document.createElement('details');details.className='icon-usages';const summary=document.createElement('summary');
 const icon=document.querySelector('summary .disclosure-chevron').cloneNode(true);icon.dataset.iconUse='toggle-icon-usages';summary.append(icon,document.createElement('span'));details.append(summary);list.before(details);details.append(list);}
 details.querySelector('summary span').textContent=count+' Locations';
}
function renderPlaygroundIcons(){
 const catalog=document.getElementById('playground-icon-catalog'),icons=new Map(),originalArrowUsages=new Set();
 const headingOrder=[...document.querySelectorAll('[data-tab]')].flatMap(tab=>[...document.querySelectorAll('[data-panel="'+tab.dataset.tab+'"] .section-heading h2>svg,[data-panel="'+tab.dataset.tab+'"] .url-reference-subheading>svg')].map(svg=>svg.dataset.iconName));
 const uiOrder=['ellipsis','x','arrow-up-to-line','rotate-ccw','rotate-cw','copy','minimize-2','maximize-2','chevron-right','arrow-up-right'];
 for(const svg of document.querySelectorAll('svg[data-icon-provider]')){
  if(catalog.contains(svg))continue;
  const {iconProvider:provider,iconName:name,iconUse:use}=svg.dataset;
  if(!name||!use)throw Error('Missing Playground icon metadata');
  const key=provider+':'+name+(svg.dataset.iconVariant?':modified':'');
  if(!icons.has(key))icons.set(key,{svg,provider,name,variant:svg.dataset.iconVariant||undefined,usages:new Set(),groups:new Set()});
  const panel=svg.closest('.panel'),heading=svg.closest('h1,h2,h3'),control=svg.closest('button,a,summary');
 const group=svg.closest('#playground-title')?'playground':svg.closest('.heading-anchor')?'ui':svg.closest('.section-heading h2,.url-reference-subheading,[data-tab]')?'headings':svg.closest('button,a,summary,.breadcrumbs')?'ui':'other';
 icons.get(key).groups.add(group);
  const location=panel?.querySelector('.section-heading h2')?.textContent.trim()||'Playground';
  // Hidden alternate icons describe their own action, not the button's resting label.
  const alternate=svg.closest('[hidden]')&&control;
  const label=alternate?use.split('-').map(word=>word[0].toUpperCase()+word.slice(1)).join(' '):heading?.textContent.trim()||control?.getAttribute('aria-label')||control?.textContent.trim()||'Breadcrumb';
  const usage=(location===label?location:location+' → '+label)+' · '+use;
 icons.get(key).usages.add(usage);
 if(name==='arrow-up-right'&&svg.getAttribute('viewBox')==='0 0 24 24')originalArrowUsages.add(usage);
 }
 // Preserve canonical Lucide entries and catalogue approved derivatives separately.
 const template=document.createElement('template');template.innerHTML=${JSON.stringify(linkArrowSVG)};
 const modified=template.content.querySelector('svg');
 icons.set('lucide:arrow-up-right:modified',{svg:modified,provider:'lucide',name:'arrow-up-right',groups:new Set(['ui']),variant:'arrow-up-right-modified',usages:new Set(['Typography → Links · follow-link'])});
 catalog.replaceChildren();
 const rank=item=>item.groups.has('playground')?0:item.groups.has('headings')?10+Math.max(0,headingOrder.indexOf(item.name)):item.groups.has('ui')?1000+(uiOrder.includes(item.name)?uiOrder.indexOf(item.name):uiOrder.length):2000;
 for(const {svg,provider,name,usages,groups,variant} of [...icons.values()].sort((a,b)=>rank(a)-rank(b)||a.name.localeCompare(b.name))){
  const entry=document.createElement('section');entry.className='playground-icon-entry';entry.dataset.catalogIcon=name;entry.dataset.iconFamily=provider;if(variant)entry.dataset.catalogVariant=variant;entry.dataset.iconGroups=[...groups].join(' ');
  const heading=document.createElement('h3'),sample=svg.cloneNode(true);
  sample.removeAttribute('id');if(sample.classList.contains('text-link-icon')){sample.removeAttribute('style');sample.classList.remove('text-link-icon','link-arrow','step-anchor-hash','step-anchor-success','step-anchor-failure');sample.setAttribute('stroke-width','2');}sample.setAttribute('width','24');sample.setAttribute('height','24');sample.setAttribute('aria-hidden','true');
  if(variant)sample.style.cssText='width:24px;height:24px';heading.append(sample,document.createTextNode(variant==='hash-modified'?'Modified Hash':variant==='arrow-up-right-modified'?'Modified Arrow Up Right':variant==='arrow-right-modified'?'Modified Arrow Right':name));
  const list=document.createElement('ul');
  for(const usage of usages)list.append(iconUsageItem(usage));
  const link=document.createElement('a');
  if(provider!=='lucide')throw Error('Add an official source route for Playground provider: '+provider);
  link.href='https://lucide.dev/icons/'+name;link.target='_blank';link.rel='noopener noreferrer';link.textContent='View Source · Lucide · '+name;window.decorateWorkshopLinks(link);link.hidden=!document.getElementById('show-playground-sources').checked;link.dataset.playgroundSource='';
  entry.append(heading,list,link);catalog.append(entry);foldIconUsages(list);
 }
}
window.decorateWorkshopLinks();
renderPlaygroundIcons();
function filterPlaygroundIcons(){const value=document.querySelector('#playground-icon-filter input:checked').value,family=document.querySelector('#playground-icon-family input:checked').value;document.querySelectorAll('.playground-icon-entry').forEach(entry=>entry.hidden=(family!=='all'&&entry.dataset.iconFamily!==family)||(value!=='all'&&!entry.dataset.iconGroups.split(' ').includes(value)));document.getElementById('playground-icon-empty').hidden=Boolean(document.querySelector('.playground-icon-entry:not([hidden])'));}
document.getElementById('playground-icon-family').addEventListener('change',filterPlaygroundIcons);
document.getElementById('playground-icon-filter').addEventListener('change',filterPlaygroundIcons);filterPlaygroundIcons();
document.getElementById('show-playground-sources').addEventListener('change',event=>{document.querySelectorAll('[data-playground-source]').forEach(link=>link.hidden=!event.target.checked);});
const frameLinkInventory=new Map();
function refreshLinkInventory(){
 const list=document.querySelector('[data-catalog-icon="arrow-up-right"][data-catalog-variant="arrow-up-right-modified"] ul');if(!list)return;
 const usages=new Set([...document.querySelectorAll('a[href]')].filter(a=>a.querySelector('[data-icon-variant="arrow-up-right-modified"]')).map(a=>{const panel=a.closest('.panel');return (panel?.querySelector('.section-heading h2')?.textContent.trim()||'Playground')+' → '+a.textContent.trim()+' · '+a.getAttribute('href');}));
 for(const [name,links] of frameLinkInventory)for(const link of links)usages.add(name+' → '+link.label+' · '+link.href);
 list.replaceChildren(...[...usages].map(iconUsageItem));foldIconUsages(list);
}
window.addEventListener('message',event=>{if(event.data?.guide!=='playground-links')return;const frame=[...document.querySelectorAll('#icons-frame,#link-type-frame')].find(f=>f.contentWindow===event.source);if(!frame)return;frameLinkInventory.set(frame.id==='link-type-frame'?'Typography':'App Icons and Symbols',event.data.links);refreshLinkInventory();});
refreshLinkInventory();
// Page-level skip navigation is installed at DOMContentLoaded.
document.addEventListener('DOMContentLoaded',()=>{renderPlaygroundIcons();filterPlaygroundIcons();refreshLinkInventory();});
`;

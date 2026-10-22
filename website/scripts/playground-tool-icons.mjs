import {textIcon} from '../lib/workshop-link-icons.mjs';
const linkVariants=['arrow-right-modified','arrow-up-right-modified','hash-modified'];
const linkIconTemplates=linkVariants.map(variant=>textIcon(variant,'link-icon-catalogue'));
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
 const catalog=document.getElementById('playground-icon-catalog'),linkCatalog=document.getElementById('link-icon-catalog'),icons=new Map();
 const headingOrder=[...document.querySelectorAll('[data-tab]')].flatMap(tab=>[...document.querySelectorAll('[data-panel="'+tab.dataset.tab+'"] .section-heading h2>svg,[data-panel="'+tab.dataset.tab+'"] :is(.url-reference-subheading,.playground-subheading)>svg')].map(svg=>svg.dataset.iconName));
 const uiOrder=['ellipsis','x','arrow-up-to-line','rotate-ccw','rotate-cw','copy','minimize-2','maximize-2','chevron-right','arrow-up-right'];
 for(const svg of document.querySelectorAll('svg[data-icon-provider]')){
  if(catalog.contains(svg)||linkCatalog.contains(svg))continue;
  const {iconProvider:provider,iconName:name,iconUse:use}=svg.dataset;
  if(!name||!use)throw Error('Missing Playground icon metadata');
  const key=provider+':'+name+(svg.dataset.iconVariant?':modified':'');
  if(!icons.has(key))icons.set(key,{svg,provider,name,variant:svg.dataset.iconVariant||undefined,usages:new Set(),groups:new Set()});
  const panel=svg.closest('.panel'),heading=svg.closest('h1,h2,h3'),control=svg.closest('button,a,summary');
 const group=svg.closest('#playground-title')?'playground':svg.closest('.heading-anchor')?'ui':svg.closest('.section-heading h2,:is(.url-reference-subheading,.playground-subheading),[data-tab]')?'headings':svg.closest('button,a,summary,.breadcrumbs')?'ui':'other';
 icons.get(key).groups.add(group);
  const location=panel?.querySelector('.section-heading h2')?.textContent.trim()||'Playground';
  // Hidden alternate icons describe their own action, not the button's resting label.
  const alternate=svg.closest('[hidden]')&&control;
  const label=alternate?use.split('-').map(word=>word[0].toUpperCase()+word.slice(1)).join(' '):heading?.textContent.trim()||control?.getAttribute('aria-label')||control?.textContent.trim()||'Breadcrumb';
  const usage=(location===label?location:location+' → '+label)+' · '+use;
 icons.get(key).usages.add(usage);
 }
 const linkVariants=${JSON.stringify(linkVariants)};
 for(const html of ${JSON.stringify(linkIconTemplates)}){
  const template=document.createElement('template');template.innerHTML=html;const svg=template.content.querySelector('svg'),name=svg.dataset.iconName,variant=svg.dataset.iconVariant,key='lucide:'+name+':modified';
  if(!icons.has(key))icons.set(key,{svg,provider:'lucide',name,variant,groups:new Set(['ui']),usages:new Set()});
 }
 for(const [key,item] of [...icons])if(linkVariants.includes(item.variant)&&item.groups.has('headings'))icons.set(key+':heading',{...item,headingOnly:true,groups:new Set(['headings']),usages:new Set([...item.usages].filter(use=>use.includes('playground-heading-')))});
 catalog.replaceChildren();linkCatalog.replaceChildren();
 const rank=item=>linkVariants.includes(item.variant)&&!item.headingOnly?-3+linkVariants.indexOf(item.variant):item.groups.has('playground')?0:item.groups.has('headings')?10+Math.max(0,headingOrder.indexOf(item.name)):item.groups.has('ui')?1000+(uiOrder.includes(item.name)?uiOrder.indexOf(item.name):uiOrder.length):2000;
 for(const {svg,provider,name,usages,groups,variant,headingOnly} of [...icons.values()].sort((a,b)=>rank(a)-rank(b)||a.name.localeCompare(b.name))){
  const isLinkIcon=linkVariants.includes(variant)&&!headingOnly;
  const entry=document.createElement('section');entry.className='playground-icon-entry';entry.dataset.catalogIcon=name;entry.dataset.iconFamily=provider;if(variant)entry.dataset.catalogVariant=variant;entry.dataset.iconGroups=[...groups].join(' ');
  const heading=document.createElement('h3'),sample=svg.cloneNode(true);
  sample.removeAttribute('id');if(sample.classList.contains('text-link-icon')){sample.removeAttribute('style');sample.classList.remove('text-link-icon','link-arrow','step-anchor-hash','step-anchor-success','step-anchor-failure');sample.setAttribute('stroke-width','2');}sample.setAttribute('width','24');sample.setAttribute('height','24');sample.setAttribute('aria-hidden','true');
  if(variant)sample.style.cssText='width:24px;height:24px';heading.append(sample,document.createTextNode(variant==='hash-modified'?'hash-modified.svg':variant==='arrow-up-right-modified'?'arrow-up-right-modified.svg':variant==='arrow-right-modified'?'arrow-right-modified.svg':name));
  const list=document.createElement('ul');
  for(const usage of usages)list.append(iconUsageItem(usage));
  const link=document.createElement('a');
  if(provider!=='lucide')throw Error('Add an official source route for Playground provider: '+provider);
  link.href='https://lucide.dev/icons/'+name;link.target='_blank';link.rel='noopener noreferrer';link.textContent='View Source · Lucide · '+name;window.decorateWorkshopLinks(link);link.hidden=!document.getElementById(isLinkIcon?'show-link-sources':'show-playground-sources').checked;link.setAttribute(isLinkIcon?'data-link-source':'data-playground-source','');
  entry.append(heading,list,link);(isLinkIcon?linkCatalog:catalog).append(entry);foldIconUsages(list);
 }
}
window.decorateWorkshopLinks();
renderPlaygroundIcons();
function filterPlaygroundIcons(){const value=document.querySelector('#playground-icon-filter input:checked').value,family=document.querySelector('#playground-icon-family input:checked').value;document.querySelectorAll('#playground-icon-catalog .playground-icon-entry').forEach(entry=>entry.hidden=(family!=='all'&&entry.dataset.iconFamily!==family)||(value!=='all'&&!entry.dataset.iconGroups.split(' ').includes(value)));document.getElementById('playground-icon-empty').hidden=Boolean(document.querySelector('#playground-icon-catalog .playground-icon-entry:not([hidden])'));}
document.getElementById('playground-icon-family').addEventListener('change',filterPlaygroundIcons);
document.getElementById('playground-icon-filter').addEventListener('change',filterPlaygroundIcons);filterPlaygroundIcons();
document.getElementById('show-playground-sources').addEventListener('change',event=>{document.querySelectorAll('[data-playground-source]').forEach(link=>link.hidden=!event.target.checked);});
document.getElementById('show-link-sources').addEventListener('change',event=>{document.querySelectorAll('[data-link-source]').forEach(link=>link.hidden=!event.target.checked);});
const frameLinkInventory=new Map();
function refreshLinkInventory(){
 for(const variant of ${JSON.stringify(linkVariants)}){
  const list=document.querySelector('#link-icon-catalog [data-catalog-variant="'+variant+'"] ul');if(!list)continue;
  const usages=new Set([...document.querySelectorAll('a[href],.heading-anchor')].filter(a=>a.querySelector('[data-icon-variant="'+variant+'"]')).map(a=>{const panel=a.closest('.panel');return (panel?.querySelector('.section-heading h2')?.textContent.trim()||'Playground')+' → '+a.textContent.trim()+' · '+(a.getAttribute('href')||a.querySelector('[data-icon-variant]')?.dataset.iconUse);}));
  for(const [name,links] of frameLinkInventory)for(const link of links)if(link.variant===variant)usages.add(name+' → '+link.label+' · '+link.href);
  list.replaceChildren(...[...usages].map(iconUsageItem));foldIconUsages(list);
 }
}
window.addEventListener('message',event=>{if(!['playground-links','playground-link-icons'].includes(event.data?.guide))return;const frame=[...document.querySelectorAll('#icons-frame,[data-link-specimen]')].find(f=>f.contentWindow===event.source);if(!frame)return;frameLinkInventory.set(frame.hasAttribute('data-link-specimen')?frame.title:event.data.guide==='playground-link-icons'?'Resources':'App Icons and Symbols',event.data.links);refreshLinkInventory();});
refreshLinkInventory();
// Page-level skip navigation is installed at DOMContentLoaded.
document.addEventListener('DOMContentLoaded',()=>{renderPlaygroundIcons();filterPlaygroundIcons();refreshLinkInventory();});
`;

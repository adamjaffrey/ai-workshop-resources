// Catalogue the real outer Playground DOM, including hidden/mobile controls.
// Iframe app specimens belong exclusively to the separate app icon catalogue.
export const playgroundIconCatalogScript = String.raw`
function renderPlaygroundIcons(){
 const catalog=document.getElementById('playground-icon-catalog'),icons=new Map();
 const headingOrder=[...document.querySelectorAll('[data-tab]')].flatMap(tab=>[...document.querySelectorAll('[data-panel="'+tab.dataset.tab+'"] .section-heading h2 svg')].map(svg=>svg.dataset.iconName));
 const uiOrder=['ellipsis','x','arrow-up-to-line','rotate-ccw','rotate-cw','copy','minimize-2','maximize-2','chevron-right','arrow-up-right'];
 for(const svg of document.querySelectorAll('svg[data-icon-provider]')){
  if(catalog.contains(svg))continue;
  const {iconProvider:provider,iconName:name,iconUse:use}=svg.dataset;
  if(!name||!use)throw Error('Missing Playground icon metadata');
  const key=provider+':'+name;
  if(!icons.has(key))icons.set(key,{svg,provider,name,usages:new Set(),groups:new Set()});
  const panel=svg.closest('.panel'),heading=svg.closest('h1,h2'),control=svg.closest('button');
 const group=svg.closest('#playground-title')?'playground':svg.closest('.section-heading h2,[data-tab]')?'headings':svg.closest('button,a,.breadcrumbs')?'ui':'other';
 icons.get(key).groups.add(group);
  const location=panel?.querySelector('.section-heading h2')?.textContent.trim()||'Playground';
  // Hidden alternate icons describe their own action, not the button's resting label.
  const alternate=svg.closest('[hidden]')&&control;
  const label=alternate?use.split('-').map(word=>word[0].toUpperCase()+word.slice(1)).join(' '):heading?.textContent.trim()||control?.getAttribute('aria-label')||control?.textContent.trim()||'Breadcrumb';
  icons.get(key).usages.add((location===label?location:location+' → '+label)+' · '+use);
 }
 const cropped=icons.get('lucide:arrow-up-right');
 if(cropped){const original=cropped.svg.cloneNode(true);original.setAttribute('viewBox','0 0 24 24');original.classList.remove('link-arrow');icons.set('lucide:arrow-up-right',{...cropped,svg:original,variant:'original',usages:new Set(['Original Lucide source geometry; the hyperlink uses the cropped variant below.'])});icons.set('lucide:arrow-up-right:cropped',{...cropped,variant:'cropped'});}
 catalog.replaceChildren();
 const rank=item=>item.groups.has('playground')?0:item.groups.has('ui')?10+(uiOrder.includes(item.name)?uiOrder.indexOf(item.name):uiOrder.length):item.groups.has('headings')?100+headingOrder.indexOf(item.name):1000;
 for(const {svg,provider,name,usages,groups,variant} of [...icons.values()].sort((a,b)=>rank(a)-rank(b)||a.name.localeCompare(b.name))){
  const entry=document.createElement('section');entry.className='playground-icon-entry';entry.dataset.catalogIcon=name;if(variant)entry.dataset.catalogVariant=variant;entry.dataset.iconGroups=[...groups].join(' ');
  const heading=document.createElement('h3'),sample=svg.cloneNode(true);
  sample.removeAttribute('id');sample.setAttribute('width','24');sample.setAttribute('height','24');sample.setAttribute('aria-hidden','true');
  if(variant==='cropped'){sample.style.width='8px';sample.style.height='8px';sample.setAttribute('width','8');sample.setAttribute('height','8');}heading.append(sample,document.createTextNode(name+(variant==='cropped'?' · Cropped for Links':'')));
  const list=document.createElement('ul');
  for(const usage of usages){const item=document.createElement('li');item.textContent=usage;list.append(item);}
  const link=document.createElement('a');
  if(provider!=='lucide')throw Error('Add an official source route for Playground provider: '+provider);
  link.href='https://lucide.dev/icons/'+name;link.target='_blank';link.rel='noopener noreferrer';link.textContent='View Source · Lucide · '+name;window.decorateWorkshopLinks(link);link.hidden=!document.getElementById('show-playground-sources').checked;link.dataset.playgroundSource='';
  entry.append(heading,list,link);catalog.append(entry);
 }
}
window.decorateWorkshopLinks();
renderPlaygroundIcons();
function filterPlaygroundIcons(){const value=document.querySelector('#playground-icon-filter input:checked').value;document.querySelectorAll('.playground-icon-entry').forEach(entry=>entry.hidden=value!=='all'&&!entry.dataset.iconGroups.split(' ').includes(value));document.getElementById('playground-icon-empty').hidden=Boolean(document.querySelector('.playground-icon-entry:not([hidden])'));}
document.getElementById('playground-icon-filter').addEventListener('change',filterPlaygroundIcons);filterPlaygroundIcons();
document.getElementById('show-playground-sources').addEventListener('change',event=>{document.querySelectorAll('[data-playground-source]').forEach(link=>link.hidden=!event.target.checked);});
`;

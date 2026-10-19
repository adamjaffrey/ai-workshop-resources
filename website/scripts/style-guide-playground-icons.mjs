// Catalogue the real outer Playground DOM, including hidden/mobile controls.
// Iframe app specimens belong exclusively to the separate app icon catalogue.
export const playgroundIconCatalogScript = String.raw`
function renderPlaygroundIcons(){
 const catalog=document.getElementById('playground-icon-catalog'),icons=new Map();
 for(const svg of document.querySelectorAll('svg[data-icon-provider]')){
  if(catalog.contains(svg))continue;
  const {iconProvider:provider,iconName:name,iconUse:use}=svg.dataset;
  if(!name||!use)throw Error('Missing Playground icon metadata');
  const key=provider+':'+name;
  if(!icons.has(key))icons.set(key,{svg,provider,name,usages:new Set()});
  const panel=svg.closest('.panel'),heading=svg.closest('h1,h2'),control=svg.closest('button');
  const location=panel?.querySelector('.section-heading h2')?.textContent.trim()||'Playground';
  // Hidden alternate icons describe their own action, not the button's resting label.
  const alternate=svg.closest('[hidden]')&&control;
  const label=alternate?use.split('-').map(word=>word[0].toUpperCase()+word.slice(1)).join(' '):heading?.textContent.trim()||control?.getAttribute('aria-label')||control?.textContent.trim()||'Breadcrumb';
  icons.get(key).usages.add((location===label?location:location+' → '+label)+' · '+use);
 }
 catalog.replaceChildren();
 for(const {svg,provider,name,usages} of icons.values()){
  const entry=document.createElement('section');entry.className='playground-icon-entry';entry.dataset.catalogIcon=name;
  const heading=document.createElement('h3'),sample=svg.cloneNode(true);
  sample.removeAttribute('id');sample.setAttribute('width','24');sample.setAttribute('height','24');sample.setAttribute('aria-hidden','true');
  heading.append(sample,document.createTextNode(name));
  const list=document.createElement('ul');
  for(const usage of usages){const item=document.createElement('li');item.textContent=usage;list.append(item);}
  const link=document.createElement('a');
  if(provider!=='lucide')throw Error('Add an official source route for Playground provider: '+provider);
  link.href='https://lucide.dev/icons/'+name;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Lucide Source ↗';
  entry.append(heading,list,link);catalog.append(entry);
 }
}
renderPlaygroundIcons();
`;

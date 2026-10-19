import {agentAliases,themeAliases} from './workshop-url-preferences.mjs';
export const playgroundSections=['components','typography','colours','blocks-and-blur','icons','status-states','focus-and-selection','branding','easter-egg'];
export const playgroundTabPaths={blocks:'blocks-and-blur',errors:'status-states',focus:'focus-and-selection',discovery:'easter-egg'};
export const resourcesRoot='/ai-workshop-resources';
const resourceRoots=new Set(['home','homes','index.html','workshop','workshops','resource','resources','workshop-resource','workshop-resources','workshops-resource','workshops-resources','ai','ais','ai-workshop-resource','ai-workshop-resources','ai-workshops-resource','ai-workshops-resources','ais-workshop-resource','ais-workshop-resources','ais-workshops-resource','ais-workshops-resources']);
export const playgroundRoot='/component-playground';
const roots=new Set(['component-playground','components-playground','component-playgrounds','components-playgrounds','component','components','playground','playgrounds','style-guide','style-guides','styles-guide','styles-guides']);
const sectionAliases=new Map([
 ['component','components'],['typographies','typography'],['colour','colours'],['color','colours'],['colors','colours'],
 ['block','blocks-and-blur'],['blocks','blocks-and-blur'],['blur','blocks-and-blur'],['blurs','blocks-and-blur'],
 ['block-and-blur','blocks-and-blur'],['block-and-blurs','blocks-and-blur'],['blocks-and-blurs','blocks-and-blur'],
 ['icon','icons'],['error','status-states'],['errors','status-states'],['status','status-states'],['statuses','status-states'],['state','status-states'],['states','status-states'],
 ['status-state','status-states'],['statuses-state','status-states'],['statuses-states','status-states'],
 ['focus','focus-and-selection'],['focuses','focus-and-selection'],['foci','focus-and-selection'],['foci-and-selection','focus-and-selection'],['foci-and-selections','focus-and-selection'],['selection','focus-and-selection'],['selections','focus-and-selection'],['focus-and-selections','focus-and-selection'],['focuses-and-selection','focus-and-selection'],['focuses-and-selections','focus-and-selection'],
 ['brand','branding'],['brands','branding'],['brandings','branding'],['discovery','easter-egg'],['discoveries','easter-egg'],['easter','easter-egg'],['egg','easter-egg'],['eggs','easter-egg'],['easter-eggs','easter-egg'],['easters','easter-egg'],['easters-egg','easter-egg'],['easters-eggs','easter-egg'],
]);
// Prefix aliases preserve arbitrary descendants; only known sections are normalised.
// GET/HEAD callers normalise public selectors and never redirect POSTs.
export function playgroundRedirect(path){
 const normalised=path.toLowerCase().replace(/\/+$/,'')||'/';
 const parts=normalised.split('/');
 // All registered path aliases retain descendants; the root is exact-only.
 if(normalised==='/'||resourceRoots.has(parts[1])){
  parts[1]=resourcesRoot.slice(1);
  const location=parts.join('/');
  return location===path?null:{location,status:301};
 }
 if(roots.has(parts[1])){
  parts[1]='component-playground';
  if(parts[2])parts[2]=sectionAliases.get(parts[2])||parts[2];
  const location=parts.join('/');
  return location===path?null:{location,status:301};
 }
 return normalised===path||normalised.startsWith('//')?null:{location:normalised,status:301};
}
export const isPlaygroundPath=path=>path===playgroundRoot||playgroundSections.some(section=>path===playgroundRoot+'/'+section);

// Preserve unrelated query components byte-for-byte, including signed values.
const publicParameters=new Map([['agent',agentAliases],['theme',themeAliases]]);
const loginParameters=new Set(['show-login','login','logged-in','logged-out']);
function canonicalSearch(search){
 if(!search)return search;
 const parts=search.slice(1).split('&').map(part=>{
  const entry=new URLSearchParams(part).entries().next().value;
  if(!entry)return part;
  const [name,value]=entry,key=name.toLowerCase();
  const lower=value.toLowerCase();
  if(loginParameters.has(key)){
   let show;
   if(key==='login')show=lower==='1'?'true':lower==='0'?'false':undefined;
   else if(lower==='true'||lower==='false')show=key==='logged-in'?(lower==='true'?'false':'true'):lower;
   // Invalid login selectors are removed, never interpreted as authentication.
   if(show===undefined)return null;
   return 'show-login='+show;
  }
  if(!publicParameters.has(key))return part;
  const aliases=publicParameters.get(key);
  const canonical=Object.hasOwn(aliases,lower)?aliases[lower]:lower;
  if(name===key&&value===canonical)return part;
  return new URLSearchParams([[key,canonical]]).toString();
 }).filter(part=>part!==null).join('&');
 return parts?'?'+parts:'';
}

// Host, path and public query rules share one permanent destination.
export function canonicalRedirect(url){
 const path=playgroundRedirect(url.pathname);
 const search=canonicalSearch(url.search),queryChanged=search!==url.search;
 if(url.hostname.startsWith('www.')){
  const destination=new URL(url);destination.hostname=destination.hostname.slice(4);
  destination.pathname=path?.location||url.pathname;destination.search=search;
  return {location:destination.href,status:301};
 }
 return path||queryChanged?{location:(path?.location||url.pathname)+search,status:queryChanged?301:path.status}:null;
}

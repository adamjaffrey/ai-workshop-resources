export const playgroundSections=['components','typography','colours','blocks-and-blur','icons','status-states','focus-and-selection','branding','easter-egg'];
export const playgroundTabPaths={blocks:'blocks-and-blur',errors:'status-states',focus:'focus-and-selection',discovery:'easter-egg'};
export const resourcesRoot='/workshop-resources';
const resourceRoots=new Set(['','home','homes','index.html','workshop','workshops','resource','resources','workshop-resource','workshop-resources','workshops-resource','workshops-resources','ai','ais','ai-workshop-resource','ai-workshop-resources','ai-workshops-resource','ai-workshops-resources']);
export const playgroundRoot='/component-playground';
const roots=new Set(['component-playground','components-playground','component-playgrounds','components-playgrounds','component','components','playground','playgrounds','style-guide']);
const sectionAliases=new Map([
 ['component','components'],['typographies','typography'],['colour','colours'],['color','colours'],['colors','colours'],
 ['block','blocks-and-blur'],['blocks','blocks-and-blur'],['blur','blocks-and-blur'],['blurs','blocks-and-blur'],
 ['block-and-blur','blocks-and-blur'],['block-and-blurs','blocks-and-blur'],['blocks-and-blurs','blocks-and-blur'],
 ['icon','icons'],['error','status-states'],['errors','status-states'],['status','status-states'],['statuses','status-states'],['state','status-states'],['states','status-states'],
 ['status-state','status-states'],['statuses-state','status-states'],['statuses-states','status-states'],
 ['focus','focus-and-selection'],['selection','focus-and-selection'],['selections','focus-and-selection'],['focus-and-selections','focus-and-selection'],['focuses-and-selection','focus-and-selection'],['focuses-and-selections','focus-and-selection'],
 ['brand','branding'],['brands','branding'],['brandings','branding'],['discovery','easter-egg'],['discoveries','easter-egg'],['easter','easter-egg'],['egg','easter-egg'],['eggs','easter-egg'],['easter-eggs','easter-egg'],
]);
// Prefix aliases preserve arbitrary descendants; only known sections are normalised.
// GET/HEAD callers preserve the original query string and never redirect POSTs.
export function playgroundRedirect(path){
 const normalised=path.toLowerCase().replace(/\/+$/,'')||'/';
 if(resourceRoots.has(normalised.slice(1)))return path===resourcesRoot?null:{location:resourcesRoot,status:301};
 const parts=normalised.split('/');
 if(roots.has(parts[1])){
  parts[1]='component-playground';
  if(parts[2])parts[2]=sectionAliases.get(parts[2])||parts[2];
  const location=parts.join('/');
  return location===path?null:{location,status:301};
 }
 return normalised===path||normalised.startsWith('//')?null:{location:normalised,status:normalised!==path.replace(/\/+$/,'')?301:308};
}
export const isPlaygroundPath=path=>path===playgroundRoot||playgroundSections.some(section=>path===playgroundRoot+'/'+section);

// Host and path rules share one final destination, with no case-specific entries.
export function canonicalRedirect(url){
 const path=playgroundRedirect(url.pathname);
 if(url.hostname.startsWith('www.')){
  const destination=new URL(url);destination.hostname=destination.hostname.slice(4);
  destination.pathname=path?.location||url.pathname;
  return {location:destination.href,status:301};
 }
 return path?{...path,location:path.location+url.search}:null;
}

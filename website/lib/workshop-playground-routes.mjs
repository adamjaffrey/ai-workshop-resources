export const playgroundSections=['components','typography','colours','blocks-and-blur','icons','status-states','focus-and-selection','branding','easter-egg'];
export const playgroundTabPaths={blocks:'blocks-and-blur',errors:'status-states',focus:'focus-and-selection',discovery:'easter-egg'};
const aliases=new Map([
  ['/style-guide','/playground'],
  ['/home','/'],
  ['/playground/colors','/playground/colours'],
  ['/playground/blocks','/playground/blocks-and-blur'],
  ['/playground/blur','/playground/blocks-and-blur'],
  ['/playground/errors','/playground/status-states'],
  ['/playground/statuses','/playground/status-states'],
  ['/playground/status','/playground/status-states'],
  ['/playground/states','/playground/status-states'],
  ['/playground/focus','/playground/focus-and-selection'],
  ['/playground/selection','/playground/focus-and-selection'],
  ['/playground/discovery','/playground/easter-egg'],
  ['/playground/easter','/playground/easter-egg'],
  ['/playground/egg','/playground/easter-egg'],
]);
// Resolve aliases and slash normalisation together so every redirect is one hop.
// Call only for GET/HEAD; POST endpoints retain their exact-path semantics.
export function playgroundRedirect(path){
  const normalised=path.replace(/\/+$/,'')||'/';
  const destination=aliases.get(normalised)||normalised;
  if(destination===path||destination.startsWith('//'))return null;
  return {location:destination,status:aliases.has(normalised)&&normalised!=='/style-guide'?301:308};
}
export const isPlaygroundPath=path=>path==='/playground'||playgroundSections.some(section=>path==='/playground/'+section);

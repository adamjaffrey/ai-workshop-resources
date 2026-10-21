import {backdropIconCSS} from './workshop-placeholder.mjs';
// Shared by capture and delivery: saved geometry remains reusable without measurement.
export function freezeBackdropCSS(css) {
 return css.replace(/:(?:hover|active|focus-visible|focus-within|focus)\b/g,':where([data-capture-interaction-disabled])')
  .replace(/cursor\s*:[^;}]+/gi,'cursor:default!important')
  .replace(/(overflow(?:-[xy])?\s*:)\s*(?:auto|scroll)\b/gi,'$1hidden');
}
export const backdropStaticCSS=`
*,*::before,*::after{cursor:default!important;user-select:none!important;-webkit-user-select:none!important;animation:none!important;transition:none!important;caret-color:transparent!important;resize:none!important}
body *{pointer-events:none!important}
html{scroll-behavior:auto!important}html,body{overflow:hidden!important}
body{position:relative;min-height:100vh}
body:has(>.access-gate)::after{content:'';position:absolute;inset:0;z-index:99;background:var(--gate-overlay);pointer-events:none}
body>.access-gate{background:transparent!important}
`;
// Apply the same policy to embedded srcdoc documents, at every escaping depth.
export function staticBackdropDocument(html) {
 // Refresh this paint-only rule on saved documents without geometry measurement.
 if(!html.includes('data-backdrop-icon-ink'))html=html.replace('</head>','<style data-backdrop-icon-ink>'+backdropIconCSS+'</style></head>');
 if(html.includes('data-backdrop-static'))return html;
 html=freezeBackdropCSS(html);
 return html.replace(/(<|&(?:amp;)*lt;)\/head(>|&(?:amp;)*gt;)/g,(tag,open)=>{
  let style='<style data-backdrop-static>'+backdropStaticCSS+'</style>';
  const depth=open==='<'?0:1+(open.match(/amp;/g)||[]).length;
  for(let i=0;i<depth;i++)style=style.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  return style+tag;
 });
}

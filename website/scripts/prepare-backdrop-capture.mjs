// Capture preparation only: never apply this to an interactive app or Playground.
export function prepareBackdropCapture({playground=false,panel='components'}={}) {
 const freezeCSS=css=>css.replace(/position\s*:\s*fixed\b/gi,'position:absolute').replace(/position\s*:\s*sticky\b/gi,'position:relative;inset:auto!important').replace(/cursor\s*:[^;}]+/gi,'cursor:default!important').replace(/(overflow(?:-[xy])?\s*:)\s*(?:auto|scroll)\b/gi,'$1hidden').replace(/:(?:hover|active|focus-visible|focus-within|focus)\b/g,':where([data-capture-interaction-disabled])');
 document.querySelectorAll('style').forEach(style=>{style.textContent=freezeCSS(style.textContent);});
 document.querySelectorAll('[style]').forEach(el=>{el.setAttribute('style',freezeCSS(el.getAttribute('style')));});
 document.documentElement.removeAttribute('data-demo-hover');
 const style=document.createElement('style');
 style.textContent='*,*::before,*::after{cursor:default!important;user-select:none!important;animation:none!important;transition:none!important}html{scroll-behavior:auto!important}';
 if(playground){
  document.querySelectorAll('[data-panel]:not([data-panel="'+panel+'"]),.catalog-sources,#style-dialog').forEach(el=>el.remove());
  const inspector=document.querySelector('.inspector-dock');
  if(inspector){
   document.querySelector('main.wrap').append(inspector);
   inspector.querySelectorAll('[hidden]').forEach(el=>el.hidden=false);
   inspector.querySelectorAll('[aria-expanded]').forEach(el=>el.setAttribute('aria-expanded','true'));
   inspector.querySelector('#inspection-summary').textContent='No item selected yet.';
  }
  style.textContent+=':root{--embedded-preview-height:70dvh!important}main.wrap{padding-bottom:24px!important}html{scroll-padding-bottom:0!important}.inspector-dock{position:static!important;inset:auto!important;width:auto!important;margin-top:24px;box-shadow:none!important;padding:24px!important;border:1px solid var(--control-border);border-radius:12px}.inspector-dock dl{height:auto!important;overflow:visible!important}';
 }
 document.head.append(style);
}

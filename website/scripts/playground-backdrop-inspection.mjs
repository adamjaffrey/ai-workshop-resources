import {updateFooterWrap} from '../lib/workshop-footer-layout.mjs';
import {staticBackdropDocument} from '../lib/workshop-backdrop-static.mjs';
import {playgroundPlaceholderDocument} from '../lib/workshop-playground-placeholder.mjs';
// A direct, script-disabled capture lets the parent scroll it without crossing
// the opaque origin of the interactive login specimen. Never enable scripts here.
export function backdropInspectionScript(resourceLoginPage){
 const styles=[...resourceLoginPage.matchAll(/<style[^>]*>[\s\S]*?<\/style>/g)].map(m=>m[0]).join('\n');
 const markup=resourceLoginPage.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0];
 if(!styles||!markup)throw Error('Missing Resources backdrop source');
 const resources=staticBackdropDocument('<!doctype html><html lang="en-AU" data-theme="light" data-selected-agent="codex"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+styles+'</head><body>'+markup+'</body></html>');
 return String.raw`
const backdropInspection=document.createElement('iframe');
backdropInspection.id='backdrop-inspection-frame';backdropInspection.title='Colours Background Inspection';backdropInspection.setAttribute('aria-hidden','true');
backdropInspection.setAttribute('sandbox','allow-same-origin');backdropInspection.setAttribute('data-static-scroll','');backdropInspection.tabIndex=-1;backdropInspection.hidden=true;
document.getElementById('blocks-frame').after(backdropInspection);
let backdropInspectionSettings=null,inspectionDestination=null;
function paintBackdropInspection(){
 const doc=backdropInspection.contentDocument,s=backdropInspectionSettings;
 if(!doc?.querySelector('[data-backdrop-inspection]')||!s||doc.documentElement.dataset.backdropDestination!==s.blockDestination)return;
 doc.documentElement.dataset.review=s.review;doc.documentElement.dataset.theme=s.theme;doc.documentElement.dataset.selectedAgent=s.agent;
 doc.body.style.setProperty('--ph-strength',(s.strength??40)+'%');
 doc.body.style.filter=s.review==='blurred'?'blur('+(s.blur??4)+'px)':'none';
 const context=doc.createElement('canvas').getContext('2d');context.canvas.width=context.canvas.height=1;
 context.fillStyle=doc.defaultView.getComputedStyle(doc.documentElement).getPropertyValue('--gate-overlay');context.fillRect(0,0,1,1);
 const rgba=[...context.getImageData(0,0,1,1).data];
 doc.documentElement.style.setProperty('--inspection-overlay',s.review==='blurred'?'rgb('+rgba.slice(0,3).join(' ')+' / '+(s.dim??rgba[3]/255*100)+'%)':'transparent');
}
const updateInspectionFooter=${updateFooterWrap.toString()};
function layoutInspectionFooter(){const meta=backdropInspection.contentDocument?.querySelector('.footer-meta');if(meta)updateInspectionFooter(meta);}
new ResizeObserver(layoutInspectionFooter).observe(backdropInspection);
backdropInspection.addEventListener('load',()=>{paintBackdropInspection();layoutInspectionFooter();backdropInspection.contentDocument.fonts.ready.then(layoutInspectionFooter);});
function syncBackdropInspection(s){
 backdropInspectionSettings=s;
 const visible=s.review!=='panel';
 backdropInspection.hidden=!visible;document.getElementById('blocks-frame').hidden=visible;
 if(!visible){backdropInspection.contentWindow?.scrollTo(0,0);return;}
 if(document.getElementById('panel-blocks').hidden)return;
 if(inspectionDestination!==s.blockDestination){
  inspectionDestination=s.blockDestination;backdropInspection.title=(inspectionDestination==='resources'?'Resources':'Colours')+' Background Inspection';
  const documents=${JSON.stringify({resources,playground:playgroundPlaceholderDocument()}).replaceAll('<','\\u003c')};
  const doc=new DOMParser().parseFromString(documents[inspectionDestination],'text/html');
  doc.documentElement.dataset.backdropDestination=inspectionDestination;
  doc.body.removeAttribute('inert');Array.from(doc.body.children).forEach(e=>e.inert=true);
  const policy=doc.createElement('meta');policy.httpEquiv='Content-Security-Policy';policy.content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src data:";doc.head.prepend(policy);
  const style=doc.createElement('style');style.dataset.backdropInspection='';style.textContent='html{overflow:auto!important;pointer-events:auto!important}body{overflow:visible!important;pointer-events:none!important}body>.page-placeholder{filter:none!important;--ph-strength:inherit!important}html::after{content:"";position:fixed;inset:0;pointer-events:none;background:var(--inspection-overlay,transparent);z-index:2147483647}';doc.head.append(style);
  backdropInspection.srcdoc='<!doctype html>'+doc.documentElement.outerHTML;
 }else paintBackdropInspection();
}
`;
}

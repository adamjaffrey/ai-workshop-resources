import {playgroundPlaceholderDocument} from '../lib/workshop-playground-placeholder.mjs';
// A direct, script-disabled capture lets the parent scroll it without crossing
// the opaque origin of the interactive login specimen. Never enable scripts here.
export const coloursInspectionScript=String.raw`
const coloursInspection=document.createElement('iframe');
coloursInspection.id='colours-inspection-frame';coloursInspection.title='Colours Background Inspection';coloursInspection.setAttribute('aria-hidden','true');
coloursInspection.setAttribute('sandbox','allow-same-origin');coloursInspection.setAttribute('data-static-scroll','');coloursInspection.tabIndex=-1;coloursInspection.hidden=true;
document.getElementById('blocks-frame').after(coloursInspection);
let coloursInspectionSettings=null;
function paintColoursInspection(){
 const doc=coloursInspection.contentDocument,s=coloursInspectionSettings;
 if(!doc?.querySelector('[data-colours-inspection]')||!s)return;
 doc.documentElement.dataset.theme=s.theme;doc.documentElement.dataset.selectedAgent=s.agent;
 doc.body.style.setProperty('--ph-strength',(s.strength??40)+'%');
 doc.body.style.filter=s.review==='blurred'?'blur('+(s.blur??4)+'px)':'none';
 const context=doc.createElement('canvas').getContext('2d');context.canvas.width=context.canvas.height=1;
 context.fillStyle=doc.defaultView.getComputedStyle(doc.documentElement).getPropertyValue('--gate-overlay');context.fillRect(0,0,1,1);
 const rgba=[...context.getImageData(0,0,1,1).data];
 doc.documentElement.style.setProperty('--inspection-overlay',s.review==='blurred'?'rgb('+rgba.slice(0,3).join(' ')+' / '+(s.dim??rgba[3]/255*100)+'%)':'transparent');
}
coloursInspection.addEventListener('load',paintColoursInspection);
function syncColoursInspection(s){
 coloursInspectionSettings=s;
 const visible=s.blockDestination==='playground'&&s.review!=='panel';
 coloursInspection.hidden=!visible;document.getElementById('blocks-frame').hidden=visible;
 if(!visible){coloursInspection.contentWindow?.scrollTo(0,0);return;}
 if(!coloursInspection.hasAttribute('srcdoc')){
  const doc=new DOMParser().parseFromString(${JSON.stringify(playgroundPlaceholderDocument()).replaceAll('<','\\u003c')},'text/html');
  doc.body.removeAttribute('inert');Array.from(doc.body.children).forEach(e=>e.inert=true);
  const policy=doc.createElement('meta');policy.httpEquiv='Content-Security-Policy';policy.content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src data:";doc.head.prepend(policy);
  const style=doc.createElement('style');style.dataset.coloursInspection='';style.textContent='html{overflow:auto!important;pointer-events:auto!important}body{overflow:visible!important;pointer-events:none!important}html::after{content:"";position:fixed;inset:0;pointer-events:none;background:var(--inspection-overlay,transparent);z-index:2147483647}';doc.head.append(style);
  coloursInspection.srcdoc='<!doctype html>'+doc.documentElement.outerHTML;
 }else paintColoursInspection();
}
`;

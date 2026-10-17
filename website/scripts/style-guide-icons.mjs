// Capture specimens from running app frames; never store separate icon artwork.
export const iconCaptureScript = `
function iconSnapshot(node,page,state){
 const container=node.closest('.toggle,.theme-toggle')||node.closest('button,.symbol,.password-field,.gate-error,.brand-mark')||node;
 const clone=container.cloneNode(true), originals=[container,...container.querySelectorAll('*')], copies=[clone,...clone.querySelectorAll('*')];
 originals.forEach((original,i)=>{const computed=getComputedStyle(original);for(const property of computed)copies[i].style.setProperty(property,computed.getPropertyValue(property));copies[i].removeAttribute('id');copies[i].removeAttribute('autofocus');if(original instanceof HTMLInputElement)copies[i].value=original.value;});
 copies[originals.indexOf(node)]?.setAttribute('data-icon-target','');
 clone.style.margin='0';clone.style.flexShrink='0';
 const c=getComputedStyle(node),r=node.getBoundingClientRect();
 return {html:clone.outerHTML,svg:node.tagName.toLowerCase()==='svg'?node.outerHTML:null,label:node.querySelector('title')?.textContent||node.getAttribute('alt')||(node.closest('.brand-mark')?'Wavelength · Brand Image':''),page,state,selector:node.tagName.toLowerCase()+(node.getAttribute('class')?'.'+node.getAttribute('class').trim().split(/\\s+/).join('.'):''),width:parseFloat(c.width)||r.width,height:parseFloat(c.height)||r.height,colour:c.color,fill:c.fill,stroke:c.stroke,src:node.getAttribute('src')};
}
// Catalog source frames must never steal focus from visible controls.
HTMLElement.prototype.focus=function(){};
let capturingIcons=false,pendingIcons;
window.addEventListener('message',async event=>{
 if(event.source!==parent||event.data?.guide!=='icon-catalog')return;
 if(capturingIcons){pendingIcons=event.data;return;}capturingIcons=true;try{
 const page=event.data.page,items=[];
 const collect=(state,predicate=()=>true)=>document.querySelectorAll('svg,img').forEach(node=>{if(node.closest('.page-placeholder')||!predicate(node)||!node.checkVisibility({checkOpacity:false,checkVisibilityCSS:true})||!node.getBoundingClientRect().width)return;items.push(iconSnapshot(node,page,state));});
 if(page==='login'){
  for(const state of ['neutral','loading','success','wrong']){window.demoLogin(state);document.getAnimations().forEach(a=>{if(a.effect?.getTiming().iterations!==Infinity)try{a.finish();}catch{}});collect(state,node=>state==='neutral'||node.matches('[data-input-icon],[data-status-icon]'));}
  window.demoLogin('neutral');document.getAnimations().forEach(a=>{if(a.effect?.getTiming().iterations!==Infinity)try{a.finish();}catch{}});
 }else{
  for(const button of document.querySelectorAll('.copy,.qr-copy'))setStatus(button,'');
  const qr=document.querySelector('.qr-copy');qr?.setAttribute('data-feedback','');await new Promise(r=>setTimeout(r,200));
  collect('Default');copyFailure=false;
  for(const button of document.querySelectorAll('.copy,.qr-copy')){button.click();await new Promise(r=>setTimeout(r,0));document.getAnimations().forEach(a=>{if(a.effect?.getTiming().iterations!==Infinity)try{a.finish();}catch{}});collect('Copy Success',node=>button.contains(node)&&node.matches('.success-icon'));resetCopy(button);}

 }
 // Include actual non-ASCII symbols from visible UI copy and CSS-generated separators.
 const seen=new Set(),walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 while(walker.nextNode()){const node=walker.currentNode,el=node.parentElement;if(el.closest('script,style,svg,.page-placeholder')||!el.checkVisibility({checkVisibilityCSS:true}))continue;for(const match of node.textContent.matchAll(/[\\p{S}\\p{Extended_Pictographic}]/gu)){const character=match[0];if(character.codePointAt(0)<128||seen.has(character))continue;seen.add(character);const snapshot=iconSnapshot(el,page,'Text'),excerpt=document.createElement('template');excerpt.innerHTML=snapshot.html;const sample=excerpt.content.firstElementChild;sample.textContent=node.textContent.split('\\n').find(line=>line.includes(character));sample.style.maxWidth='100%';sample.style.height='auto';sample.style.maxHeight='none';items.push({symbol:character,label:'Unicode U+'+character.codePointAt(0).toString(16).toUpperCase(),page,state:'Source Text Excerpt',selector:el.tagName.toLowerCase(),colour:getComputedStyle(el).color,html:sample.outerHTML});}}
 document.querySelectorAll('.footer-copyright:not(.page-placeholder *)').forEach(el=>{const c=getComputedStyle(el,'::before');if(c.content&&c.content!=='none'&&c.content!=='normal')items.push({symbol:c.content.replaceAll('"',''),label:'CSS Separator · U+2022',page,state:'Unwrapped Footer',selector:'.footer-copyright::before',colour:c.color,html:iconSnapshot(el.closest('.footer-meta'),page,'Footer').html});});
 parent.postMessage({guide:'icon-catalog-data',page,items},'*');
 }finally{capturingIcons=false;if(pendingIcons){const data=pendingIcons;pendingIcons=null;window.dispatchEvent(new MessageEvent('message',{source:parent,data}));}}
});`;

export const iconGalleryScript = `
function signature(svg){return [...svg.children].filter(n=>n.tagName.toLowerCase()!=='title').map(n=>n.tagName.toLowerCase()+JSON.stringify([...n.attributes].filter(a=>a.name!=='key'&&!(a.name==='ry'&&a.value===n.getAttribute('rx'))).map(a=>[a.name,a.value]).sort())).sort().join('|');}
window.addEventListener('message',event=>{if(event.source!==parent||event.data?.guide!=='icon-catalog-data')return;
 const section=document.getElementById('icons-'+event.data.page);section.replaceChildren();
 for(const item of event.data.items){const row=document.createElement('section');row.className='icon-row';row.dataset.sourcePage=item.page;row.dataset.sourceSelector=item.selector;row.dataset.sourceWidth=item.width||'';row.dataset.sourceHeight=item.height||'';
 let name=item.label||'Image Asset';if(item.svg){const svg=new DOMParser().parseFromString(item.svg,'image/svg+xml').documentElement;name=iconNames[signature(svg)]||(item.label?'Lobe Icons · '+item.label:'App SVG · '+item.selector);}
 const title=document.createElement('h3');title.textContent=name;const sample=document.createElement('div');sample.className='icon-sample';sample.innerHTML=item.html;sample.querySelectorAll('input').forEach(e=>e.readOnly=true);const detail=document.createElement('p');detail.className='icon-meta';detail.textContent=item.page+' → '+item.selector+' · '+item.state+(item.width?' · '+Math.round(item.width)+' × '+Math.round(item.height)+'px':'')+' · '+item.colour+(item.src?' · '+(item.src.startsWith('data:')?'Embedded app image':item.src):'');row.append(title,sample,detail);section.append(row);}
});`;

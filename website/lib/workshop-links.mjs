import {__iconNode as arrow} from '../node_modules/lucide-react/dist/esm/icons/arrow-up-right.mjs';
const arrowSVG='<svg class="link-arrow" data-icon-provider="lucide" data-icon-name="arrow-up-right" data-icon-use="follow-link" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+arrow.map(([tag,attrs])=>'<'+tag+' '+Object.entries(attrs).filter(([key])=>key!=='key').map(([key,value])=>key+'="'+value+'"').join(' ')+'></'+tag+'>').join('')+'</svg>';
export const linkCSS=`
.link-tail{white-space:nowrap}
a.workshop-link[href]{display:inline-block;max-width:100%;padding:2px 3px;border-radius:5px;text-decoration:none;overflow-wrap:anywhere;vertical-align:baseline}
a.workshop-link[href] .link-label{text-decoration-line:underline;text-decoration-color:currentColor;text-decoration-thickness:1px;text-underline-offset:.18em}
a.workshop-link[href]:hover .link-label,a.workshop-link[href][data-link-preview="hover"] .link-label{text-decoration-thickness:1px}
a.workshop-link[href] .link-arrow{display:inline-block;width:16px;height:16px;margin-left:0;vertical-align:-3px;color:inherit;text-decoration:none;flex:none}
`;
export const linkScript=`
window.decorateWorkshopLinks=function(root=document){
 const anchors=[...(root.matches?.('a[href]')?[root]:[]),...root.querySelectorAll('a[href]')];
 for(const a of anchors){if(a.classList.contains('workshop-link')||a.getAttribute('href').startsWith('#'))continue;
  const label=document.createElement('span');label.className='link-label';label.append(...a.childNodes);a.append(label);
  const walker=document.createTreeWalker(label,NodeFilter.SHOW_TEXT);let node,last;while(node=walker.nextNode())if(node.textContent.trim())last=node;
  const tail=document.createElement('span');tail.className='link-tail';
  if(last){const match=last.textContent.match(/\\S+\\s*$/);const word=document.createElement('span');word.className='link-label';word.textContent=match[0].trimEnd();last.textContent=last.textContent.slice(0,match.index);tail.append(word);}
  tail.append(document.createTextNode('\u00a0'));tail.insertAdjacentHTML('beforeend',${JSON.stringify(arrowSVG)});a.append(tail);a.classList.add('workshop-link');
 }
};
document.addEventListener('DOMContentLoaded',()=>{
 window.decorateWorkshopLinks();
 new MutationObserver(records=>{for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1)window.decorateWorkshopLinks(node);}).observe(document.body,{childList:true,subtree:true});
});
`;

import {linkSurfaceCSS,installLinkSurfaces} from './workshop-link-surfaces.mjs';
import {textIcon,textIconCSS,sizeTextLinkIcons} from './workshop-link-icons.mjs';
export const linkArrowSVG='<span class="text-link-slot">'+textIcon('arrow-up-right-modified','follow-link','link-arrow')+'</span>';
const linkMotion='0ms';
export const linkPaint={radius:'.2em',motion:linkMotion,padding:'0',shadow:'-.05em .025em 0 .025em var(--link-hover-bg), .1em .025em 0 .025em var(--link-hover-bg)',fill:'var(--link-hover-bg)',underline:'text-decoration-color:currentColor;text-decoration-thickness:auto;text-decoration-skip-ink:auto;text-underline-offset:.1em'};
export const linkCSS=`
${textIconCSS}
${linkSurfaceCSS}
a.page-title-link{position:relative;isolation:isolate}
.workshop-title-paint{position:absolute;pointer-events:none;z-index:-1;border-radius:${linkPaint.radius};opacity:0}
a.page-title-link[href]:is(:hover,[data-link-preview="hover"]),:root[data-focus-input="keyboard"] a.page-title-link[href]:focus{color:var(--link-hover);background:transparent}
a.page-title-link[href]:is(:hover,[data-link-preview="hover"])>.workshop-title-paint,:root[data-focus-input="keyboard"] a.page-title-link[href]:focus>.workshop-title-paint{opacity:1;background:${linkPaint.fill};box-shadow:${linkPaint.shadow}}

a.workshop-link[hidden]{display:none!important}
.link-tail{white-space:nowrap}
a.workshop-link[href]{display:inline;max-width:100%;padding:${linkPaint.padding};border-radius:${linkPaint.radius};text-decoration:none;overflow-wrap:normal;vertical-align:baseline;position:relative;background-color:transparent;box-decoration-break:clone;-webkit-box-decoration-break:clone;transition:color ${linkPaint.motion}}
/* Zero-blur shadows extend each cloned fragment without occupying inline space.
   Paint switches atomically to an opaque tint: overlapping line fragments never compound. */
a.workshop-link[href]:hover,a.workshop-link[href][data-link-preview="hover"],:root[data-focus-input="keyboard"] a.skip-main.workshop-link[href]:focus{background-color:${linkPaint.fill};box-shadow:${linkPaint.shadow};color:var(--link-hover)}
a.workshop-link[href] .link-label{text-decoration-line:underline;${linkPaint.underline};transition:text-decoration-color ${linkPaint.motion}}
a.workshop-link[href]:hover .link-label,a.workshop-link[href][data-link-preview="hover"] .link-label,:root[data-focus-input="keyboard"] a.skip-main.workshop-link[href]:focus .link-label{text-decoration-color:transparent}
a.workshop-link[href]:focus{outline:none!important}
:root[data-focus-input="keyboard"] a.workshop-link[href]:focus{outline:3px solid var(--icon-ink)!important;outline-offset:3px}
a.workshop-link[href] .link-arrow{color:inherit;text-decoration:none}
a.workshop-link[href][data-link-preview],a.workshop-link[href][data-link-preview] .link-label{transition:none}
@media(prefers-reduced-motion:reduce){a.workshop-link[href],a.workshop-link[href] .link-label{transition:none}}
`;
export const linkScript=`
window.decorateWorkshopLinks=function(root=document){
 const anchors=[...(root.matches?.('a[href]')?[root]:[]),...root.querySelectorAll('a[href]')];
 for(const a of anchors){if(a.classList.contains('workshop-link')||a.hasAttribute('data-no-link-decoration'))continue;
  const label=document.createElement('span');label.className='link-label';label.append(...a.childNodes);a.append(label);
  const walker=document.createTreeWalker(label,NodeFilter.SHOW_TEXT);let node,last;while(node=walker.nextNode())if(node.textContent.trim())last=node;
  const tail=document.createElement('span');tail.className='link-tail';
  if(last){const match=last.textContent.match(/\\S+\\s*$/);const word=document.createElement('span');word.className='link-label';word.textContent=match[0].trimEnd();last.textContent=last.textContent.slice(0,match.index);tail.append(word);}
  tail.insertAdjacentHTML('beforeend',${JSON.stringify(linkArrowSVG)});a.append(tail);a.classList.add('workshop-link');
 }
 window.sizeTextLinkIcons(root);
};
window.sizeTextLinkIcons=${sizeTextLinkIcons.toString()};
window.addEventListener('resize',()=>window.sizeTextLinkIcons());
document.fonts.ready.then(()=>window.sizeTextLinkIcons());
document.addEventListener('DOMContentLoaded',()=>{
 window.decorateWorkshopLinks();
 (${installLinkSurfaces.toString()})();
 new MutationObserver(records=>{for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1)window.decorateWorkshopLinks(node);}).observe(document.body,{childList:true,subtree:true});
});
`;

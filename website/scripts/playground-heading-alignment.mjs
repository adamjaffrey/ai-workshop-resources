import {headingMetrics} from '../lib/workshop-heading-metrics.mjs';
import ink from '../lib/workshop-icon-ink.generated.json' with {type:'json'};
export const headingCapCSS=`
:is(#playground-title,.section-heading h2,.url-reference-subheading,.playground-icon-entry h3)>svg{margin-top:var(--heading-icon-top,0px)!important;align-self:flex-start}
`;
export const headingCapScript=String.raw`
const headingInk=${JSON.stringify(ink)},measureHeading=${headingMetrics.toString()};
let capFrame=0;
function alignHeadingCaps(){
 capFrame=0;
 for(const title of document.querySelectorAll('#playground-title,.section-heading h2,.url-reference-subheading,.playground-icon-entry h3')){
  if(!title.getBoundingClientRect().width)continue;
  const icon=title.querySelector(':scope>svg');if(!icon)continue;
  const c=getComputedStyle(title),centre=measureHeading(title).centre;
  const box=icon.getAttribute('viewBox'),m=icon.dataset.iconVariant?headingInk.variants[icon.dataset.iconVariant]:box==='0 0 24 24'?headingInk.icons[icon.dataset.iconName]:headingInk.variants[icon.dataset.iconName+':'+box],size=parseFloat(getComputedStyle(icon).height),scale=size/(m?.viewBox||24);
  title.style.setProperty('--heading-icon-top',(centre-size/2+((m?.bottom||0)-(m?.top||0))*scale/2)+'px');
  title.dataset.capCentre=String(centre);
  const row=title.closest('.section-heading');if(row)row.style.setProperty('--section-cap-y',(title.getBoundingClientRect().top-row.getBoundingClientRect().top+parseFloat(c.paddingTop)+centre)+'px');
 }
 for(const details of document.querySelectorAll('details[open]')){
  const summary=details.querySelector(':scope>summary');if(!summary||!summary.getBoundingClientRect().width)continue;
  const text=[...summary.childNodes].find(n=>(n.nodeType===3&&n.textContent.trim())||(n.nodeType===1&&n.tagName!=='svg'&&n.textContent.trim()));if(!text)continue;
  const range=document.createRange();range.selectNodeContents(text);const x=range.getBoundingClientRect().left;
  for(const body of details.querySelectorAll(':scope>p,:scope>ul,:scope>ol'))body.style.marginLeft=(x-details.getBoundingClientRect().left-parseFloat(getComputedStyle(details).paddingLeft))+'px';
 }
}
document.addEventListener('toggle',scheduleHeadingCaps,true);
function scheduleHeadingCaps(){if(!capFrame)capFrame=requestAnimationFrame(alignHeadingCaps);}
window.addEventListener('resize',scheduleHeadingCaps);document.fonts.ready.then(scheduleHeadingCaps);
new MutationObserver(scheduleHeadingCaps).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
scheduleHeadingCaps();
`;

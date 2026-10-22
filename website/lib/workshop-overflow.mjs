// Shared directional overflow paint and endpoint handling for tooling and specimens.
export const overflowFadeCSS=String.raw`
:root{--overflow-feather:54px;--overflow-shoulder:18px}
@media(max-width:660px){:root{--overflow-feather:27px;--overflow-shoulder:9px}}
.choice-shell .choice-options[data-overflow-left],.choice-shell .choice-options[data-overflow-right],[data-overflow-left],[data-overflow-right]{mask-composite:intersect;-webkit-mask-composite:source-in;mask-image:linear-gradient(to right,rgba(0,0,0,var(--overflow-left-alpha,1)) 0,rgba(0,0,0,var(--overflow-left-alpha,1)) var(--overflow-shoulder,18px),#000 var(--overflow-feather,54px),#000 calc(100% - var(--overflow-feather,54px)),rgba(0,0,0,var(--overflow-right-alpha,1)) calc(100% - var(--overflow-shoulder,18px)),rgba(0,0,0,var(--overflow-right-alpha,1))),linear-gradient(to bottom,#000 calc(100% - var(--overflow-bottom,0px)),transparent);-webkit-mask-image:linear-gradient(to right,rgba(0,0,0,var(--overflow-left-alpha,1)) 0,rgba(0,0,0,var(--overflow-left-alpha,1)) var(--overflow-shoulder,18px),#000 var(--overflow-feather,54px),#000 calc(100% - var(--overflow-feather,54px)),rgba(0,0,0,var(--overflow-right-alpha,1)) calc(100% - var(--overflow-shoulder,18px)),rgba(0,0,0,var(--overflow-right-alpha,1))),linear-gradient(to bottom,#000 calc(100% - var(--overflow-bottom,0px)),transparent)}
`;
export function updateHorizontalOverflow(el,previous=[0,0]){
 const c=getComputedStyle(el),horizontal=el.getClientRects().length>0&&/auto|scroll/.test(c.overflowX);
 const extent=Math.max(0,el.scrollWidth-el.clientWidth),left=c.direction==='rtl'?extent+el.scrollLeft:el.scrollLeft;
 const distances=[Math.max(0,left),Math.max(0,extent-left)];
 const strength=distances.map((distance,i)=>horizontal&&distance>2?Math.max(previous[i],Math.min(1,distance/18)):0);
 for(const [i,edge] of ['left','right'].entries()){el.toggleAttribute('data-overflow-'+edge,strength[i]>0);const value=String(1-strength[i]),property='--overflow-'+edge+'-alpha';if(el.style.getPropertyValue(property)!==value)el.style.setProperty(property,value);}
 return strength;
}

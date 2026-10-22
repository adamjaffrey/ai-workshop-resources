// User-approved derivatives of Lucide Hash, Arrow Up Right and Arrow Right; retain ISC provenance.
import {__iconNode as check} from '../node_modules/lucide-react/dist/esm/icons/check.mjs';
import {__iconNode as cross} from '../node_modules/lucide-react/dist/esm/icons/x.mjs';
const paths={
 'arrow-right-modified':'<path d="M13.929 4.929 L21 12"/><path d="M21 12 L13.929 19.071"/><path d="M3 12 L21 12"/>',
 'hash-modified':'<path d="M16.5 3 L14.5 21"/><path d="M4 16 L20 16"/><path d="M4 8 L20 8"/><path d="M9.5 3 L7.5 21"/>',
 'arrow-up-right-modified':'<path d="M20 4 L20 14.5"/><path d="M4 20 L20 4"/><path d="M9.5 4 L20 4"/>',
};
const nodes=list=>list.map(([tag,attrs])=>`<${tag} ${Object.entries(attrs).filter(([key])=>key!=='key').map(([key,value])=>`${key}="${value}"`).join(' ')}></${tag}>`).join('');
paths.check=nodes(check);paths.x=nodes(cross);
export function textIcon(name,use,className=''){
 const original=name.startsWith('hash')?'hash':name==='arrow-right-modified'?'arrow-right':name.startsWith('arrow')?'arrow-up-right':name;
 return `<svg class="text-link-icon ${className}" data-icon-provider="lucide" data-icon-name="${original}"${name!==original?` data-icon-variant="${name}"`:''} data-icon-use="${use}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
}
// Shared sizing from the approved lab: 24-unit canvas at 1.2cap, .08em stroke,
// with 400/600/700 weight multipliers 1/1.3/1.5. No background measurement.
export function sizeTextLinkIcons(root=document){
 const watched=window.workshopTextIconSlots||(window.workshopTextIconSlots=new WeakSet());
 const observer=window.workshopTextIconResize||(window.workshopTextIconResize=new ResizeObserver(()=>window.sizeTextLinkIcons()));
 for(const svg of root.querySelectorAll('svg.text-link-icon')){
  const slot=svg.parentElement;if(!watched.has(slot)){watched.add(slot);observer.observe(slot);}const css=getComputedStyle(slot),font=parseFloat(css.fontSize),cap=slot.getBoundingClientRect().width;
  if(!cap)continue;
  const factor=Number(css.fontWeight)>=700?1.5:Number(css.fontWeight)>=600?1.3:1;
  svg.setAttribute('stroke-width',String(.08*font*factor*24/(1.2*cap)));
 }
}
export const textIconGap='.2em';
export const textIconCSS=`
.text-link-slot{position:relative;display:inline-block;width:1cap;height:0;vertical-align:baseline;margin-left:${textIconGap};letter-spacing:0;flex:none}
.text-link-slot>.text-link-icon{position:absolute;left:-10%;top:-1.1cap;width:1.2cap;height:1.2cap;overflow:visible}
`;

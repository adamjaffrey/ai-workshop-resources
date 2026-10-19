// Experimental shared renderer; mounted only by the Playground until approved.
export const wormHaloControls=[
 {key:'width',label:'Pill Width',min:48,max:200,step:2,value:96,unit:'px'},
 {key:'height',label:'Pill Height',min:20,max:100,step:2,value:44,unit:'px'},
 {key:'blur',label:'Backdrop Blur',min:0,max:32,step:1,value:12,unit:'px'},
 {key:'feather',label:'Feather Width',min:0,max:64,step:1,value:24,unit:'px'},
 {key:'tint',label:'Canvas Tint',min:0,max:100,step:1,value:35,unit:'%'},
];
export function mountWormHalo(controls){
 const source=document.querySelector('.page-toolbar .brand-mark'),agent=document.querySelector('.controls .toggle'),theme=document.querySelector('.page-toolbar .theme-toggle');
 if(!source||!agent||!theme)throw Error('Worm halo source controls missing');
 const host=document.createElement('div');host.className='worm-halo';host.setAttribute('aria-hidden','true');
 host.style.cssText='position:fixed;left:50%;translate:-50% -50%;z-index:29;pointer-events:none;display:grid;place-items:center;';
 const veil=document.createElement('div'),outline=document.createElement('div'),mark=source.cloneNode(true);
 veil.className='worm-halo-veil';outline.className='worm-halo-outline';
 for(const el of [veil,outline])el.style.cssText='position:absolute;left:50%;top:50%;translate:-50% -50%;pointer-events:none;';
 outline.style.border='1px dotted var(--text)';outline.style.borderRadius='999px';outline.style.boxSizing='border-box';
 mark.style.cssText='position:relative;flex:none;';host.append(veil,outline,mark);document.body.append(host);
 let config=Object.fromEntries(controls.map(c=>[c.key,c.value]));config.hold=true;config.outline=false;
 function render(){
  const {width,height,blur,feather,tint}=config,pad=feather*2,w=width+pad*2,h=height+pad*2;
  // A feathered capsule alpha mask softens the backdrop filter itself, not the logo.
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'"><defs><filter id="f" x="-100%" y="-200%" width="300%" height="500%"><feGaussianBlur stdDeviation="'+feather/3+'"/></filter></defs><rect x="'+pad+'" y="'+pad+'" width="'+width+'" height="'+height+'" rx="'+height/2+'" fill="white" filter="url(#f)"/></svg>';
  const mask='url("data:image/svg+xml,'+encodeURIComponent(svg)+'")';
  Object.assign(veil.style,{width:w+'px',height:h+'px',backdropFilter:'blur('+blur+'px)',webkitBackdropFilter:'blur('+blur+'px)',background:'color-mix(in srgb,var(--page) '+tint+'%,transparent)',maskImage:mask,webkitMaskImage:mask,maskSize:'100% 100%',webkitMaskSize:'100% 100%'});
  Object.assign(outline.style,{width:width+'px',height:height+'px',display:config.outline?'block':'none'});position();
 }
 function position(){
  const rect=theme.getBoundingClientRect(),src=source.querySelector('img'),img=mark.querySelector('img'),size=src.getBoundingClientRect();
  img.style.width=size.width+'px';img.style.height=size.height+'px';
  const inset=Math.max(24,parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sticky-safe-top'))||0);
  host.style.top=(inset+rect.height/2)+'px';
  host.style.opacity=config.hold?'1':getComputedStyle(agent).getPropertyValue('--sticky-shadow');
 }
 function configure(next){
  for(const c of controls)if(Number.isFinite(next[c.key]))config[c.key]=Math.max(c.min,Math.min(c.max,next[c.key]));
  for(const k of ['hold','outline'])if(typeof next[k]==='boolean')config[k]=next[k];render();
 }
 const schedule=position;
 new MutationObserver(schedule).observe(agent,{attributes:true,attributeFilter:['style']});
 const geometryObserver=new ResizeObserver(schedule);geometryObserver.observe(source);geometryObserver.observe(theme);
 window.addEventListener('resize',schedule);document.fonts.ready.then(position);source.querySelector('img').addEventListener('load',position);
 render();return {configure};
}

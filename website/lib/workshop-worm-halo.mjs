// Experimental shared renderer; mounted only by the Playground until approved.
export const wormHaloControls=[
 {key:'paddingX',label:'Horizontal Padding',min:0,max:100,step:1,value:12,unit:'px'},
 {key:'paddingY',label:'Vertical Padding',min:0,max:60,step:1,value:12,unit:'px'},
 {key:'blur',label:'Backdrop Blur',min:0,max:100,step:1,value:36,unit:'px'},
 {key:'feather',label:'Feather Width',min:0,max:64,step:1,value:36,unit:'px'},
 {key:'radius',label:'Corner Radius',min:0,max:100,step:1,value:100,unit:'px'},
 {key:'tint',label:'Canvas Tint',min:0,max:100,step:1,value:50,unit:'%'},
];
export function mountWormHalo(controls){
 const source=document.querySelector('.page-toolbar .brand'),agent=document.querySelector('.controls .toggle'),theme=document.querySelector('.page-toolbar .theme-toggle');
 if(!source||!agent||!theme)throw Error('Worm halo source controls missing');
 const host=document.createElement('div');host.className='worm-halo';host.setAttribute('aria-hidden','true');
 host.style.cssText='position:fixed;left:50%;translate:-50% -50%;z-index:29;pointer-events:none;display:grid;place-items:center;';
 const veil=document.createElement('div'),outline=document.createElement('div'),mark=source.cloneNode(true);
 veil.className='worm-halo-veil';outline.className='worm-halo-outline';
 for(const el of [veil,outline])el.style.cssText='position:absolute;left:50%;top:50%;translate:-50% -50%;pointer-events:none;';
 outline.style.border='1px dotted var(--text)';outline.style.borderRadius='999px';outline.style.boxSizing='border-box';
 mark.style.cssText='position:relative;flex:none;margin:0;white-space:nowrap;';host.append(veil,outline,mark);document.body.append(host);
 let config=Object.fromEntries(controls.map(c=>[c.key,c.value]));config.hold=false;config.outline=false;config.brand='auto';
 let geometryKey='',lastOpacity=0;
 function render(){
  const bounds=mark.getBoundingClientRect();
  const {blur,feather,tint}=config,width=bounds.width+2*config.paddingX,height=bounds.height+2*config.paddingY,pad=feather,w=width+pad*2,h=height+pad*2;
  // Signed distance to the pill: full alpha inside; only the exterior feathers.
  const scale=2,canvas=document.createElement('canvas');canvas.width=w*scale;canvas.height=h*scale;
  const context=canvas.getContext('2d'),pixels=context.createImageData(canvas.width,canvas.height),radius=Math.min(config.radius,width/2,height/2);
  for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++){
   const qx=Math.abs((x+.5)/scale-w/2)-(width/2-radius),qy=Math.abs((y+.5)/scale-h/2)-(height/2-radius);
   const distance=Math.hypot(Math.max(qx,0),Math.max(qy,0))+Math.min(Math.max(qx,qy),0)-radius;
   const t=feather?Math.max(0,Math.min(1,distance/feather)):Number(distance>0),alpha=1-t*t*(3-2*t),i=(y*canvas.width+x)*4;
   pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=255;pixels.data[i+3]=Math.round(alpha*255);
  }
  context.putImageData(pixels,0,0);const mask='url("'+canvas.toDataURL()+'")';
  Object.assign(veil.style,{width:w+'px',height:h+'px',backdropFilter:'blur('+blur+'px)',webkitBackdropFilter:'blur('+blur+'px)',background:'color-mix(in srgb,var(--page) '+tint+'%,transparent)',maskImage:mask,webkitMaskImage:mask,maskSize:'100% 100%',webkitMaskSize:'100% 100%'});
  Object.assign(outline.style,{width:width+'px',height:height+'px',borderRadius:radius+'px',display:config.outline?'block':'none'});
 }
 function position(){
  const rect=theme.getBoundingClientRect(),src=source.querySelector('img'),img=mark.querySelector('img'),size=src.getBoundingClientRect();
  img.style.width=size.width+'px';img.style.height=size.height+'px';
  const full=config.brand==='full'||(config.brand==='auto'&&innerWidth>660);
  mark.querySelector('.brand-name').style.display=full?'':'none';
  host.dataset.brandVariant=full?'full':'mark';
  const inset=Math.max(24,parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sticky-safe-top'))||0);
  host.style.top=(inset+rect.height/2)+'px';
  const opacity=config.hold?1:Number(getComputedStyle(agent).getPropertyValue('--sticky-shadow'))||0,bounds=mark.getBoundingClientRect();
  const key=JSON.stringify([bounds.width,bounds.height,config]);
  // Never fade the backdrop-filter's ancestor: that creates a new backdrop root.
  // Refresh the mask on re-entry as well, retaining all chosen configuration.
  if(key!==geometryKey||(opacity>0&&lastOpacity===0)){geometryKey=key;render();}
  veil.style.opacity=mark.style.opacity=outline.style.opacity=String(opacity);host.dataset.visibility=String(opacity);lastOpacity=opacity;
 }
 function configure(next){
  for(const c of controls)if(Number.isFinite(next[c.key]))config[c.key]=Math.max(c.min,Math.min(c.max,next[c.key]));
  for(const k of ['hold','outline'])if(typeof next[k]==='boolean')config[k]=next[k];
  if(['auto','mark','full'].includes(next.brand))config.brand=next.brand;position();
 }
 const schedule=position;
 new MutationObserver(schedule).observe(agent,{attributes:true,attributeFilter:['style']});
 const geometryObserver=new ResizeObserver(schedule);geometryObserver.observe(source);geometryObserver.observe(theme);
 window.addEventListener('resize',schedule);document.fonts.ready.then(position);source.querySelector('img').addEventListener('load',position);
 position();return {configure};
}

// Original implementation inspired by Magic UI Aurora Text/Shine Border and Aceternity Sparkles.
// Reference links and rationale are recorded in website/README.md; no third-party code copied.
export const perspectiveControls = Object.freeze([{"key":"duration","label":"Sweep Duration","value":4000,"max":24000,"step":100,"unit":"s","group":"sweep"},{"key":"gap","label":"Gap Between Sweeps","value":0,"max":20000,"step":100,"unit":"s","group":"sweep"},{"key":"bandWidth","label":"Sheen Width","value":22,"max":100,"step":1,"unit":"%","group":"sweep"},{"key":"sheenStrength","label":"Sheen Strength","value":100,"max":300,"step":5,"unit":"%","group":"sweep"},{"key":"intensity","label":"Particle Intensity","value":400,"max":400,"step":5,"unit":"%","group":"particles"},{"key":"particleDuration","label":"Particle Tail","value":500,"max":10000,"step":50,"unit":"s","group":"particles"},{"key":"particleSize","label":"Particle Size","value":150,"max":400,"step":5,"unit":"%","group":"particles"},{"key":"particleBrightness","label":"Particle Brightness","value":140,"max":400,"step":5,"unit":"%","group":"particles"},{"key":"twinklePeriod","label":"Twinkle Interval","value":700,"max":5000,"step":50,"unit":"s","group":"particles"},{"key":"twinkleDuration","label":"Twinkle Flash Duration","value":220,"max":3000,"step":20,"unit":"s","group":"particles"},{"key":"drift","label":"Particle Drift","value":100,"max":400,"step":5,"unit":"%","group":"particles"},{"key":"feather","label":"Particle Edge Feather","value":48,"max":160,"step":1,"unit":"px","group":"particles"},{"key":"gravity","label":"Gravity Strength","value":160,"max":400,"step":5,"unit":"%","group":"particles"},{"key":"gravityRange","label":"Gravity Range","value":75,"max":240,"step":1,"unit":"px","group":"particles"},{"key":"gravityEase","label":"Gravity Settling Time","value":220,"max":2000,"step":20,"unit":"s","group":"particles"},{"key":"gravitySlowdown","label":"Gravity Twinkle Slowdown","value":900,"max":2000,"step":25,"unit":"%","group":"particles"},{"key":"ringRadius","label":"Particle Ring Radius","value":16,"max":128,"step":1,"unit":"px","group":"particles"},{"key":"hoverHeight","label":"Hover Area Height","value":60,"max":360,"step":2,"unit":"px","group":"particles"},{"key":"finalDuration","label":"Final Sheen Duration","value":2200,"max":12000,"step":100,"unit":"s","group":"reveal"},{"key":"revealDuration","label":"Text Reveal Duration","value":800,"max":4000,"step":50,"unit":"s","group":"reveal"},{"key":"burstDuration","label":"Halo Formation Duration","value":1800,"max":4000,"step":50,"unit":"s","group":"reveal"},{"key":"burstFeather","label":"Rainbow Trail Feather","value":90,"max":240,"step":1,"unit":"px","group":"reveal"},{"key":"modalFade","label":"Modal Fade Duration","value":500,"max":3000,"step":50,"unit":"s","group":"reveal"},{"key":"halo","label":"Halo Strength","value":300,"max":500,"step":5,"unit":"%","group":"halo"},{"key":"haloSpeed","label":"Halo Speed","value":250,"max":500,"step":5,"unit":"%","group":"halo"},{"key":"haloBlur","label":"Halo Blur","value":36,"max":160,"step":1,"unit":"px","group":"halo"},{"key":"auroraIntensity","label":"Aurora Intensity","value":60,"max":300,"step":5,"unit":"%","group":"halo"}]);
export const perspectiveDefaults = Object.freeze(Object.fromEntries(perspectiveControls.map(c=>[c.key,c.value])));
const scatter = (i,seed) => ((Math.sin((i+1)*seed)*43758.5453)%1+1)%1*100;
const particles = Array.from({length:192},(_,i)=>`<span class="perspective-particle" style="--x:${scatter(i,12.9898)}%;--y:${scatter(i,78.233)}%;--size:${1+(i%5)*.35}px"></span>`).join('');
export const eggMarkup = `<section class="perspective" data-state="locked" aria-label="A Different Perspective">
<p class="perspective-fragment perspective-day">Look at things a little differently</p>
<span class="perspective-join"><span class="perspective-ellipsis">…</span><button class="perspective-discover" type="button" hidden aria-label="Discover Another Perspective"><span class="perspective-particles" aria-hidden="true">${particles}</span></button></span>
<p class="perspective-fragment perspective-night" aria-hidden="true">there’s more here than meets the eye.</p>
</section>
<dialog class="perspective-dialog" aria-labelledby="perspective-title"><div class="perspective-dialog-content"><h2 id="perspective-title" tabindex="-1">Congratulations</h2><p>You saw the bigger picture!</p><p>Sometimes a little curiosity helps you see things you might have otherwise missed.</p><p>I wonder what else you might find when you see your business from a different perspective?</p><p>To find out, ask Adam <strong>"What else is hiding?"</strong></p><form method="dialog"><button type="submit">Done</button></form></div></dialog>`;
export const eggCSS = `
/* Preserve each fragment's intrinsic height even when its theme is hidden. */
.perspective { --egg-line: 24px; position:relative; display:grid; grid-template-columns:minmax(0,1fr) 1.2em minmax(0,1fr); grid-template-rows:auto auto; margin-top:max(40px,calc(var(--hover-height,60px) / 2)); margin-bottom:max(40px,calc(var(--hover-height,60px) / 2)); font-size:14px; line-height:var(--egg-line); color:var(--muted-text); }
.perspective + .perspective-dialog + footer { margin-top:0; }
.perspective-fragment,.perspective-ellipsis { font-size:14px; line-height:24px; color:var(--muted-text); }
.perspective-fragment { margin:0; min-width:0; overflow-wrap:anywhere; position:relative; }
.perspective-day { grid-column:1; grid-row:1; text-align:right; }
.perspective-night { grid-column:3; grid-row:2; margin-top:calc(-1 * var(--egg-line)); text-align:left; visibility:hidden; }
.perspective-join { grid-column:2; grid-row:1; align-self:end; height:var(--egg-line); text-align:center; position:static; }
:root[data-theme="dark"] .perspective-day { visibility:hidden; }
:root[data-theme="dark"] .perspective-night { visibility:visible; }
.perspective[data-state="revealing"] .perspective-fragment,.perspective[data-state="complete"] .perspective-fragment { visibility:visible; }
.perspective-discover { position:absolute; left:100%; top:50%; transform:translateY(-50%); width:44px; height:44px; padding:0; border:0; border-radius:0; appearance:none; -webkit-appearance:none; -webkit-tap-highlight-color:transparent; box-shadow:none; background:transparent; color:var(--muted-text); z-index:2; }
:root[data-theme="dark"] .perspective-discover { left:auto; right:100%; }
.perspective[data-state="complete"] .perspective-join { position:static; }
.perspective[data-state="complete"] .perspective-discover { top:100%; left:50%; right:auto; transform:translateX(-50%); }
.perspective-discover:enabled:is(:active,.is-held) { scale:1; }
.perspective-discover[hidden] { display:none; }
/* All glyphs crop the same area-sized colour field, including the ellipsis. */
.perspective-fragment::after,.perspective-ellipsis::after { content:attr(data-sheen-text); position:absolute; inset:0; pointer-events:none; user-select:none; visibility:visible; color:transparent; background-image:var(--wave-paint,none); background-size:var(--wave-width) var(--wave-height); background-position:var(--wave-offset-x) var(--wave-offset-y); background-repeat:no-repeat; filter:brightness(var(--sheen-strength,1)); background-clip:text; -webkit-background-clip:text; opacity:0; }
.perspective-ellipsis { position:relative; display:inline-block; }
.perspective[data-sheening] .perspective-ellipsis::after,:root[data-theme="light"] .perspective[data-sheening] .perspective-day::after,:root[data-theme="dark"] .perspective[data-sheening] .perspective-night::after { opacity:var(--sheen-strength,1); }
:root[data-theme="light"] .perspective-particle { background:var(--particle-colour); box-shadow:0 0 1px var(--particle-colour),0 0 3px var(--particle-colour); }
/* Travelling twinkling points; the concealed glyphs never supply the cue. */
.perspective-particles { position:absolute; inset:0; pointer-events:none; opacity:0; overflow:visible; -webkit-mask-image:var(--particle-mask,none); mask-image:var(--particle-mask,none); mask-size:100% 100%; mask-repeat:no-repeat; }
.perspective-particle { position:absolute; left:var(--x); top:var(--y); width:calc(var(--size) * var(--particle-size,1)); height:calc(var(--size) * var(--particle-size,1)); border-radius:50%; background:radial-gradient(circle,#fff 0 18%,var(--particle-colour,var(--agent-accent)) 45% 65%,transparent 76%); box-shadow:0 0 2px var(--particle-colour,var(--agent-accent)),0 0 6px var(--particle-colour,var(--agent-accent)); opacity:0; transform:translate(var(--pull-x,0px),var(--pull-y,0px)) scale(var(--pull-scale,1)); will-change:transform,opacity; }
.perspective-particle[hidden] { display:none; }
.perspective[data-state="ready"] .perspective-particles { opacity:1; }
.perspective[data-state="complete"] .perspective-fragment::after { visibility:hidden; }
.perspective[data-celebrating][data-sheening] .perspective-fragment::after { visibility:visible; opacity:1; }
/* One rotating conic field supplies both the border and its blurred halo. */
.perspective-dialog { --halo-paint:conic-gradient(from var(--perspective-halo-angle),rgb(255 83 90) 0deg,rgb(255 183 70) 72deg,rgb(100 230 155) 144deg,rgb(65 200 255) 216deg,rgb(130 110 255) 288deg,rgb(255 83 90) 360deg); box-sizing:border-box; width:min(440px,calc(100% - 48px)); max-width:440px; max-height:calc(100dvh - 48px); padding:0; border:2px solid transparent; border-radius:24px; background:var(--halo-paint) border-box; color:var(--text); overflow:visible; isolation:isolate; }
.perspective-dialog-content { position:relative; border-radius:22px; background:var(--surface); padding:28px; max-height:calc(100dvh - 52px); overflow:auto; box-sizing:border-box; }
.perspective-dialog::before { content:""; position:absolute; inset:-12px; z-index:-1; pointer-events:none; border-radius:inherit; background:var(--halo-paint); filter:blur(var(--halo-blur,24px)); opacity:calc(.85 * var(--perspective-halo,1)); }
@property --perspective-halo-angle { syntax:"<angle>"; initial-value:0deg; inherits:true; }
.perspective-dialog[open] { animation:perspective-halo-rotate var(--halo-period,14000ms) linear infinite; }
.perspective-dialog[open]::before { animation:perspective-aurora-drift var(--aurora-period,7000ms) ease-in-out infinite alternate; transform-origin:50% 50%; animation-play-state:var(--aurora-play,running); }
@keyframes perspective-aurora-drift { 0% { transform:translate(calc(-3px * var(--aurora-intensity,1)),calc(2px * var(--aurora-intensity,1))) scale(calc(1 + .02 * var(--aurora-intensity,1)),calc(1 - .02 * var(--aurora-intensity,1))) skew(calc(-2deg * var(--aurora-intensity,1))); filter:blur(calc(var(--halo-blur,24px) * (1 - .08 * var(--aurora-intensity,1)))); } 50% { transform:translate(calc(3px * var(--aurora-intensity,1)),calc(-3px * var(--aurora-intensity,1))) scale(calc(1 - .01 * var(--aurora-intensity,1)),calc(1 + .06 * var(--aurora-intensity,1))) skew(calc(1deg * var(--aurora-intensity,1))); filter:blur(calc(var(--halo-blur,24px) * (1 + .25 * var(--aurora-intensity,1)))); } 100% { transform:translate(calc(2px * var(--aurora-intensity,1)),calc(3px * var(--aurora-intensity,1))) scale(calc(1 + .05 * var(--aurora-intensity,1)),calc(1 + .01 * var(--aurora-intensity,1))) skew(calc(2deg * var(--aurora-intensity,1))); filter:blur(calc(var(--halo-blur,24px) * (1 + .04 * var(--aurora-intensity,1)))); } }
@keyframes perspective-halo-rotate { from { --perspective-halo-angle:0deg; } to { --perspective-halo-angle:360deg; } }
.perspective-dialog::backdrop { background:var(--gate-overlay); backdrop-filter:blur(4px); animation:perspective-backdrop-in var(--modal-fade,500ms) ease-out; }
@keyframes perspective-backdrop-in { from { opacity:0; } to { opacity:1; } }
.perspective-dialog h2 { font-size:24px; line-height:1.2; margin:0 0 20px; }
.perspective-dialog p { font-size:16px; line-height:1.5; color:var(--muted-text); margin:0 0 20px; }
.perspective-dialog button { background:var(--surface); color:var(--text); border:1px solid var(--control-border); border-radius:8px; padding:10px 16px; }
.perspective-dialog button:hover { background:var(--hover); }
body:has(.perspective-dialog[open]) { overflow:hidden; }
@media(prefers-reduced-motion:reduce) { .perspective-fragment::after,.perspective-ellipsis::after,.perspective-dialog[open],.perspective-dialog[open]::before,.perspective-dialog::backdrop,.perspective-particle { animation:none!important; } .perspective[data-state="ready"] .perspective-particles { opacity:.6; } .perspective[data-state="ready"] .perspective-particle { opacity:.7!important; transform:none!important; filter:none!important; } .perspective-dialog { --perspective-halo-angle:0deg!important; } }

`;
export function initPerspective(defaults,controls) {
 const root=document.documentElement, area=document.querySelector('.perspective');
 if(!area)return;
 const day=area.querySelector('.perspective-day'),night=area.querySelector('.perspective-night'),button=area.querySelector('button'),dialog=document.querySelector('.perspective-dialog');
 const config={...defaults},points=[...button.querySelectorAll('.perspective-particle')];
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 for(const fragment of [day,night,area.querySelector('.perspective-ellipsis')])fragment.dataset.sheenText=fragment.textContent;
 let seen=new Set(),candidate=null,since=0,state='locked',cycle=0,sequence=0,hovering=false,held=false;
 let waves=[],pointer=null,lastFrame=0,maskKey="",opening=false,burst=null,flightFrame=0,finishFlight=null;
 const floats=points.map((el,i)=>({el,x:parseFloat(el.style.getPropertyValue('--x'))/100,y:parseFloat(el.style.getPropertyValue('--y'))/100,phase:i*2.399,clock:i*.13,lit:false,pullX:0,pullY:0,alpha:0,chargedAt:-Infinity,tail:0,colour:null}));
 let timers=[];
 const later=(fn,ms)=>{const id=setTimeout(fn,ms);timers.push(id);return id;};
 const clearTimers=()=>{timers.forEach(clearTimeout);timers=[];};
 const visible=()=>{const r=area.getBoundingClientRect();return !document.hidden&&r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth;};
 const stable=()=>!window.workshopThemeBusy?.();
 function setState(next){state=next;area.dataset.state=next;window.dispatchEvent(new CustomEvent('perspective-state',{detail:next}));}
 // Union of soft capsules around actual wrapped line boxes, not their bounding rectangle.
 function shapeParticles(rects,left,top,width,height,padding){
  const lines=rects.filter(r=>r.width>0).map(r=>({x:r.left-left-padding,y:r.top-top+(r.height-24)/2-padding,w:r.width+padding*2,h:24+padding*2}));
  const key=JSON.stringify([width,height,lines,config.feather]);if(key===maskKey)return;maskKey=key;
  const canvas=document.createElement('canvas');canvas.width=Math.ceil(width);canvas.height=Math.ceil(height);const ctx=canvas.getContext('2d'),pixels=ctx.createImageData(canvas.width,canvas.height);
  for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++){
   let alpha=0;for(const r of lines){const radius=Math.min(r.w,r.h)/2,qx=Math.abs(x+.5-r.x-r.w/2)-(r.w/2-radius),qy=Math.abs(y+.5-r.y-r.h/2)-(r.h/2-radius),distance=Math.hypot(Math.max(qx,0),Math.max(qy,0))+Math.min(Math.max(qx,qy),0)-radius,t=Math.max(0,Math.min(1,(config.feather===0?(distance<0?1:0):-distance/Math.min(config.feather,r.h/2))));alpha=Math.max(alpha,t*t*(3-2*t));}
   pixels.data[(y*canvas.width+x)*4+3]=Math.round(alpha*255);
  }
  ctx.putImageData(pixels,0,0);button.querySelector('.perspective-particles').style.setProperty('--particle-mask','url("'+canvas.toDataURL()+'")');
 }
 function positionTarget(){if(state==='complete'){const a=area.getBoundingClientRect();Object.assign(button.style,{left:'0px',right:'auto',top:'-10px',width:a.width+'px',height:Math.max(44,a.height+20)+'px',transform:'none'});button.setAttribute('aria-label','Reopen Discovery Message');return;}button.setAttribute('aria-label','Discover Another Perspective');const fragment=root.dataset.theme==='dark'?day:night;const r=fragment.getBoundingClientRect(),a=area.getBoundingClientRect(),height=Math.max(config.hoverHeight,r.height),padding=(height-r.height)/2,range=document.createRange();range.selectNodeContents(fragment);const text=range.getBoundingClientRect();Object.assign(button.style,{left:(text.left-a.left-padding)+'px',right:'auto',top:(r.top-a.top-padding)+'px',width:(text.width+padding*2)+'px',height:height+'px',transform:'none'});shapeParticles([...range.getClientRects()],text.left-padding,r.top-padding,text.width+padding*2,height,padding);}
 function sync(){const all=state==='revealing'||state==='complete';day.setAttribute('aria-hidden',String(!all&&root.dataset.theme==='dark'));night.setAttribute('aria-hidden',String(!all&&root.dataset.theme!=='dark'));positionTarget();}
 function configure(next={}){const before=JSON.stringify(config);for(const {key,max} of controls){if(Number.isFinite(next[key]))config[key]=Math.min(max,Math.max(0,next[key]));}area.style.setProperty('--particle-size',config.particleSize/100);area.style.setProperty('--sheen-strength',config.sheenStrength/100);area.style.setProperty('--hover-height',config.hoverHeight+'px');area.style.setProperty('--particle-radius',config.ringRadius+'px');area.style.setProperty('--perspective-duration',config.duration+'ms');dialog.style.setProperty('--modal-fade',config.modalFade+'ms');dialog.style.setProperty('--perspective-halo',config.halo/100);dialog.style.setProperty('--halo-blur',config.haloBlur+'px');dialog.style.setProperty('--aurora-intensity',config.auroraIntensity/100);dialog.style.setProperty('--halo-period',(1400000/Math.max(1,config.haloSpeed))+'ms');dialog.style.setProperty('--aurora-period',(700000/Math.max(1,config.haloSpeed))+'ms');dialog.style.animationPlayState=config.haloSpeed?'running':'paused';dialog.style.setProperty('--aurora-play',config.haloSpeed?'running':'paused');points.forEach((point,i)=>point.hidden=i>=Math.round(config.intensity*.48));if(state==='ready'&&before!==JSON.stringify(config)){clearTimers();waves=[];floats.forEach(f=>{f.chargedAt=-Infinity;f.tail=0;f.lit=false;f.alpha=0;});area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');cycle=performance.now()+100;}return {...config};}
 button.addEventListener('pointermove',event=>{const r=button.getBoundingClientRect();pointer={x:event.clientX-r.left,y:event.clientY-r.top};});
 button.addEventListener('pointerleave',()=>pointer=null);
 // The palette, geometry and clock are shared by text, punctuation and particles.
 const palette=[[255,83,90],[255,183,70],[100,230,155],[65,200,255],[130,110,255]];
 function colourAt(u){const v=Math.max(0,Math.min(1,u))*(palette.length-1),i=Math.min(palette.length-2,Math.floor(v)),mix=v-i;return palette[i].map((n,k)=>Math.round(n+(palette[i+1][k]-n)*mix));}
 function waveSample(q,centre,band){if(!config.bandWidth||!config.sheenStrength)return null;const u=(q-centre)/band+.5;if(u<0||u>1)return null;return {u,colour:colourAt(u),alpha:Math.sin(Math.PI*u)**2};}
 function waveGeometry(w,now,box){const band=Math.max(1,box.width*config.bandWidth/100),extent=box.width+box.height,centre=-band/2+(now-w.start)/Math.max(1,w.sweep)*(extent+band);return {band,centre};}
 function paintWave(w,now,box){const {band,centre}=waveGeometry(w,now,box),stops=Array.from({length:25},(_,i)=>{const u=i/24;return 'rgba('+colourAt(u).join(',')+','+(Math.sin(Math.PI*u)**2)+') '+((centre-band/2+band*u)/Math.SQRT2)+'px';});area.style.setProperty('--wave-paint',!config.bandWidth||!config.sheenStrength?'none':'linear-gradient('+(w.dark?315:135)+'deg,'+stops.join(',')+')');area.style.setProperty('--wave-width',box.width+'px');area.style.setProperty('--wave-height',box.height+'px');for(const el of [day,night,area.querySelector('.perspective-ellipsis')]){const r=el.getBoundingClientRect();el.style.setProperty('--wave-offset-x',-(r.left-box.left)+'px');el.style.setProperty('--wave-offset-y',-(r.top-box.top)+'px');}
  if(w.complete&&!w.handoff){const end=sentenceEnd(w.dark),q=w.dark?box.left+box.width-end.x+box.top+box.height-end.y:end.x-box.left+end.y-box.top;if(centre>=q-band*.12){w.handoff=true;openDiscovery(end);}}
 }

 function frame(now){
  const dt=Math.min(50,now-lastFrame||16),ease=config.gravityEase?1-Math.exp(-dt/config.gravityEase):1;lastFrame=now;
  if(!document.hidden&&!motion.matches){

   waves=waves.filter(w=>now-w.start<w.sweep+w.life);
   const a=area.getBoundingClientRect(),glyphs=[day,night].map(el=>{const range=document.createRange();range.selectNodeContents(el);return range.getBoundingClientRect();}),textLeft=Math.min(...glyphs.map(r=>r.left)),textRight=Math.max(...glyphs.map(r=>r.right)),targetBox=button.hidden?{left:textLeft,right:textRight,top:a.top,bottom:a.bottom}:button.getBoundingClientRect(),top=Math.min(a.top,targetBox.top),left=Math.min(textLeft,targetBox.left),box={left,top,width:Math.max(textRight,targetBox.right)-left,height:Math.max(a.bottom,targetBox.bottom)-top},latest=waves.at(-1);if(latest&&area.hasAttribute('data-sheening'))paintWave(latest,now,box);
   if(state==='ready'&&visible()){
    const r=button.getBoundingClientRect(),hint=hovering||area.hasAttribute('data-keyboard-hint');
    for(const f of floats){if(f.el.hidden)continue;const t=now/1000,driftX=(Math.sin(t*.48+f.phase)*7+Math.sin(t*.21+f.phase*2)*4)*config.drift/100,driftY=Math.cos(t*.39+f.phase)*6*config.drift/100;let glow=0,lit=false;
     for(const w of waves){if(now-w.start>w.sweep)continue;const {centre,band}=waveGeometry(w,now,box),x=r.left-box.left+f.x*r.width+driftX+f.pullX,y=r.top-box.top+f.y*r.height+driftY+f.pullY,sample=waveSample(w.dark?box.width-x+box.height-y:x+y,centre,band);if(sample&&sample.alpha>.002){lit=true;f.chargedAt=now;f.colour=sample.colour;glow=Math.max(glow,sample.alpha);}}
     f.tail=config.particleDuration?Math.max(glow,f.tail*Math.exp(-dt/(config.particleDuration/6))):glow;if(f.tail<.005)f.tail=0;glow=f.tail;
     const attractor=pointer||(hint?{x:r.width/2,y:r.height/2}:null),dx=attractor?attractor.x-f.x*r.width-driftX:0,dy=attractor?attractor.y-f.y*r.height-driftY:0,local=attractor&&config.gravityRange?Math.exp(-(dx*dx+dy*dy)/(config.gravityRange**2)):0,influence=Math.min(1,local*config.gravity/100);
     const hoverColour=colourAt((f.x*.73+f.y*.27+t*.035)%1),sampleColour=f.colour||hoverColour,colour=sampleColour.map((n,i)=>Math.round(n+(hoverColour[i]-n)*(hint?Math.min(1,local*2):0)));f.el.style.setProperty('--particle-colour','rgb('+colour.map(n=>root.dataset.theme==='dark'?n:Math.round(n*.68)).join(' ')+')');
     const target=hint?Math.max(glow,.85)*local:glow;f.alpha=hint?f.alpha+(target-f.alpha)*ease:target;
     const distance=Math.hypot(dx,dy),ux=distance>.01?dx/distance:Math.cos(f.phase),uy=distance>.01?dy/distance:Math.sin(f.phase);
     f.pullX+=((dx-ux*config.ringRadius)*influence-f.pullX)*ease;f.pullY+=((dy-uy*config.ringRadius)*influence-f.pullY)*ease;
     // The travelling wave starts the flash; pointer gravity slows its local clock continuously.
     if(lit&&!f.lit&&!hint)f.clock=config.twinkleDuration*.16;f.lit=lit;
     f.clock+=dt/(1+influence*config.gravitySlowdown/100);
     const period=Math.max(config.twinkleDuration,config.twinklePeriod*(.8+(f.phase%1)*.4)),pulse=period?f.clock%period:0,u=config.twinkleDuration?pulse/config.twinkleDuration:2;
     const flash=u>=1?0:u<.16?Math.pow(u/.16,2):Math.pow((1-u)/.84,2);
     f.el.style.filter='brightness('+(1+flash*.25)+')';
     f.el.style.transform='translate('+(driftX+f.pullX)+'px,'+(driftY+f.pullY)+'px) scale('+(1+influence*.6+flash*.25)+')';const light=!config.twinkleDuration?0:hint?(.32+.68*flash):1;f.el.style.opacity=Math.min(1,f.alpha*light*config.particleBrightness/100*2);

    }
   }else{for(const f of floats){f.alpha=0;f.el.style.opacity=0;}}
  }
  requestAnimationFrame(frame);
 }
 requestAnimationFrame(frame);
 configure();
 function sentenceEnd(dark=root.dataset.theme==='dark'){const range=document.createRange();range.selectNodeContents(dark?day:night);const rects=[...range.getClientRects()],r=dark?rects[0]:rects.at(-1);return {x:dark?r.left:r.right,y:dark?r.top+r.height/2:r.bottom-r.height/2,dark};}
 function cancelOpening(){opening=false;cancelAnimationFrame(flightFrame);finishFlight=null;burst?.getAnimations().forEach(a=>a.cancel());burst?.remove();burst=null;}
 function openDiscovery(origin=sentenceEnd()){
  if(opening||dialog.open)return;opening=true;
  const show=()=>{cancelAnimationFrame(flightFrame);finishFlight=null;const glow=burst;opening=false;burst=null;dialog.showModal();if(glow&&motion.matches)glow.remove();else if(glow){const fade=glow.animate([{opacity:1},{opacity:0}],{duration:config.modalFade||1,fill:'forwards'});fade.onfinish=()=>glow.remove();}window.dispatchEvent(new CustomEvent('perspective-state',{detail:'success'}));window.workshopFocusPanel?.(dialog);if(!motion.matches&&config.modalFade)dialog.animate([{opacity:0},{opacity:1}],{duration:config.modalFade,easing:'ease-out'});};
  if(motion.matches||!config.burstDuration){show();return;}
  finishFlight=show;
  const measure=dialog.cloneNode(true);measure.setAttribute('open','');Object.assign(measure.style,{visibility:'hidden',position:'fixed',pointerEvents:'none'});document.body.append(measure);const bounds=measure.getBoundingClientRect();measure.remove();
  const cx=innerWidth/2,cy=innerHeight/2,w=bounds.width,h=bounds.height,left=cx-w/2,right=cx+w/2,top=cy-h/2,bottom=cy+h/2,radius=24,sign=origin.dark?-1:1;
  // One continuous path leaves the final glyph, curls outward/upward, then traces the actual halo perimeter.
  const endX=cx+sign*w/2,clampX=x=>Math.max(16,Math.min(innerWidth-16,x));
  const approach=document.createElementNS('http://www.w3.org/2000/svg','path');approach.setAttribute('d','M '+origin.x+' '+origin.y+' C '+clampX(origin.x+sign*90)+' '+(origin.y-35)+' '+clampX(endX+sign*40)+' '+(cy+80)+' '+endX+' '+cy);
  const loop=document.createElementNS('http://www.w3.org/2000/svg','path');loop.setAttribute('d','M '+right+' '+cy+' V '+(top+radius)+' Q '+right+' '+top+' '+(right-radius)+' '+top+' H '+(left+radius)+' Q '+left+' '+top+' '+left+' '+(top+radius)+' V '+(bottom-radius)+' Q '+left+' '+bottom+' '+(left+radius)+' '+bottom+' H '+(right-radius)+' Q '+right+' '+bottom+' '+right+' '+(bottom-radius)+' Z');
  const approachLength=approach.getTotalLength(),loopLength=loop.getTotalLength(),routeLength=approachLength+loopLength;
  burst=document.createElement('canvas');burst.className='perspective-burst';burst.setAttribute('aria-hidden','true');burst.dataset.originX=origin.x;burst.dataset.originY=origin.y;Object.assign(burst.style,{position:'fixed',pointerEvents:'none',zIndex:2147483646,inset:0,width:'100%',height:'100%'});burst.width=innerWidth;burst.height=innerHeight;document.body.append(burst);
  const ctx=burst.getContext('2d'),ink=document.createElement('canvas');ink.width=burst.width;ink.height=burst.height;const pen=ink.getContext('2d'),start=performance.now();
  const point=d=>{if(d<approachLength)return approach.getPointAtLength(d);const p=loop.getPointAtLength(Math.min(loopLength,d-approachLength));return {x:origin.dark?2*cx-p.x:p.x,y:p.y};};
  const haloColour=u=>{const v=u*palette.length,i=Math.floor(v)%palette.length,m=v-Math.floor(v);return palette[i].map((n,k)=>Math.round(n+(palette[(i+1)%palette.length][k]-n)*m));};
  function draw(now){if(!opening||!burst)return;const progress=Math.min(1,(now-start)/config.burstDuration),head=routeLength*progress,tail=head<approachLength?Math.max(0,head-180):Math.max(0,approachLength-180*(1-Math.min(1,(head-approachLength)/180)));pen.clearRect(0,0,ink.width,ink.height);pen.lineCap='round';pen.lineJoin='round';
   for(let d=tail;d<head;d+=5){const a=point(d),b=point(Math.min(head,d+6)),inLoop=d>=approachLength,u=inLoop?((Math.atan2(a.x-cx,cy-a.y)/(2*Math.PI)+1)%1):(1-(head-d)/180),rgb=inLoop?haloColour(u):colourAt(.62-Math.max(0,Math.min(1,(head-d)/180))*.4);pen.strokeStyle='rgba('+rgb.join(',')+','+(inLoop?1:Math.max(.05,1-(head-d)/200))+')';pen.lineWidth=inLoop?8:5;pen.beginPath();pen.moveTo(a.x,a.y);pen.lineTo(b.x,b.y);pen.stroke();}
   ctx.clearRect(0,0,burst.width,burst.height);ctx.globalAlpha=1;ctx.filter='blur('+Math.max(0,config.burstFeather*(1-progress)+config.haloBlur*progress)+'px)';ctx.drawImage(ink,0,0);ctx.filter='blur(5px)';ctx.globalAlpha=.8;ctx.drawImage(ink,0,0);ctx.filter='none';ctx.globalAlpha=.5;ctx.drawImage(ink,0,0);burst.dataset.progress=progress;
   if(progress<1)flightFrame=requestAnimationFrame(draw);else show();
  }
  // Paint the first short ribbon immediately while the sheen is still touching the final letters.
  draw(start+Math.min(24,config.burstDuration*.02));
 }
 function sheen(complete=false){
  const token=++sequence,sweep=complete?config.finalDuration:config.duration,reveal=sweep?Math.min(config.revealDuration,sweep):config.revealDuration;clearTimers();if(complete){waves=[];area.setAttribute('data-celebrating','');}area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');void area.offsetWidth;
  let wave;if(!motion.matches&&sweep){area.setAttribute('data-sheening','');wave={start:performance.now(),sweep,life:config.particleDuration,dark:root.dataset.theme==='dark',complete,handoff:false};waves=[wave];}
  if(complete){
   area.removeAttribute('data-hovering');area.removeAttribute('data-keyboard-hint');
   setState('revealing');sync();button.hidden=true;
   const other=root.dataset.theme==='dark'?day:night;
   if(!motion.matches&&config.revealDuration)other.animate([{opacity:0,clipPath:root.dataset.theme==='dark'?'inset(0 0 0 100%)':'inset(0 100% 0 0)'},{opacity:1,clipPath:'inset(0 0 0 0)'}],{duration:reveal,fill:'both',easing:'ease-out'});
   later(()=>{if(token!==sequence)return;setState('complete');sync();},motion.matches?0:reveal);
   later(()=>{area.removeAttribute('data-sheening');area.removeAttribute('data-celebrating');},sweep);
   later(()=>{if(token!==sequence||wave?.handoff)return;if(wave)wave.handoff=true;openDiscovery();},motion.matches?0:Math.max(sweep,reveal));
  } else {later(()=>{if(token===sequence)area.removeAttribute('data-sheening');},config.duration);}
 }
 button.addEventListener('pointerenter',event=>{const r=button.getBoundingClientRect();pointer={x:event.clientX-r.left,y:event.clientY-r.top};hovering=true;if(state==='ready')area.setAttribute('data-hovering','');});button.addEventListener('pointerleave',()=>{hovering=false;area.removeAttribute('data-hovering');});
 button.addEventListener('focus',()=>{if(state==='ready'&&root.dataset.focusInput==='keyboard')area.setAttribute('data-keyboard-hint','');});button.addEventListener('blur',()=>area.removeAttribute('data-keyboard-hint'));
 button.addEventListener('click',()=>{if(state==='ready')sheen(true);else if(state==='complete'){openDiscovery();}});
 dialog.addEventListener('close',()=>{window.dispatchEvent(new CustomEvent('perspective-state',{detail:state}));if(state!=='complete')return;button.hidden=false;button.focus({preventScroll:true});});
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
 function tick(){
  if(held&&state!=='ready')return;
  const now=performance.now(),theme=root.dataset.theme;
  if(state==='locked'){
   if(visible()&&stable()){
    if(candidate!==theme){candidate=theme;since=now;}
    if(now-since>=1000){seen.add(theme);if(seen.has('light')&&seen.has('dark')){setState('ready');button.hidden=false;cycle=now+100;}}
   }else{candidate=null;since=0;}
  }
  if(config.duration>0&&state==='ready'&&visible()&&stable()&&now>=cycle){sheen();cycle=now+config.duration+config.gap;}
  if(!visible()&&state==='ready'){clearTimers();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');}
  sync();
 }
 document.addEventListener('visibilitychange',()=>{candidate=null;since=0;if(document.hidden&&state==='ready'){clearTimers();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');}});
 setInterval(tick,100);tick();
 motion.addEventListener('change',()=>{if(motion.matches){if(opening)finishFlight?.();dialog.getAnimations().forEach(a=>{if(a.effect?.getTiming().iterations!==Infinity)a.finish();});area.getAnimations({subtree:true}).forEach(a=>{if(a.effect?.getTiming().iterations===Infinity)a.cancel();else a.finish();});area.removeAttribute('data-sheening');}});
 // Shared state renderer for isolated Playground fixtures; no parallel UI implementation.
 window.workshopPerspective={configure,get config(){return {...config};},get state(){return state;},get seen(){return [...seen];},preview(next){held=next!=='live';seen=new Set();candidate=null;clearTimers();cancelOpening();sequence++;area.removeAttribute('data-celebrating');waves=[];floats.forEach(f=>{f.chargedAt=-Infinity;f.tail=0;f.colour=null;f.el.style.removeProperty('--particle-colour');});dialog.close();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');setState(next==='success'?'complete':next==='reveal'?'ready':next==='live'?'locked':next);button.hidden=next==='locked'||next==='live';if(next==='ready'){seen=new Set(['light','dark']);cycle=performance.now()+500;}if(next==='success'){openDiscovery();}if(next==='reveal')sheen(true);sync();},sheen};
}
export function withPerspective(html){return html.replace('</head>',`<style>${eggCSS}</style></head>`).replace('    <footer>',eggMarkup+'\n    <footer>').replace('</body>',`<script nonce="__NONCE__">(${initPerspective.toString()})(${JSON.stringify(perspectiveDefaults)},${JSON.stringify(perspectiveControls)});</script></body>`);}

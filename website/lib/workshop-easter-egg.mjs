// Original implementation inspired by Magic UI Aurora Text/Shine Border and Aceternity Sparkles.
// Reference links and rationale are recorded in website/README.md; no third-party code copied.
export const perspectiveDefaults = Object.freeze({duration:4000,gap:2000,intensity:400,halo:100,gravity:160,particleDuration:2500,ringRadius:16,hoverHeight:60,haloSpeed:100,haloBlur:24,auroraIntensity:100});
const scatter = (i,seed) => ((Math.sin((i+1)*seed)*43758.5453)%1+1)%1*100;
const particles = Array.from({length:192},(_,i)=>`<span class="perspective-particle" style="--x:${scatter(i,12.9898)}%;--y:${scatter(i,78.233)}%;--size:${1+(i%5)*.35}px"></span>`).join('');
export const eggMarkup = `<section class="perspective" data-state="locked" aria-label="A Different Perspective">
<p class="perspective-fragment perspective-day">Look at things a little differently</p>
<span class="perspective-join"><span class="perspective-ellipsis">…</span><button class="perspective-discover" type="button" hidden aria-label="Discover Another Perspective"><span class="perspective-particles" aria-hidden="true">${particles}</span></button></span>
<p class="perspective-fragment perspective-night" aria-hidden="true">there’s more here than meets the eye.</p>
</section>
<dialog class="perspective-dialog" aria-labelledby="perspective-title"><div class="perspective-dialog-content"><h2 id="perspective-title" tabindex="-1">You Saw the Whole Picture</h2><p>A little curiosity. A different perspective. Something you might otherwise have missed.</p><p>Ask Adam what else is hiding.</p><form method="dialog"><button type="submit">Done</button></form></div></dialog>`;
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
.perspective-fragment::after,.perspective-ellipsis::after { content:attr(data-sheen-text); position:absolute; inset:0; pointer-events:none; user-select:none; visibility:visible; color:transparent; background-image:var(--wave-paint,none); background-size:var(--wave-width) var(--wave-height); background-position:var(--wave-offset-x) var(--wave-offset-y); background-repeat:no-repeat; background-clip:text; -webkit-background-clip:text; opacity:0; }
.perspective-ellipsis { position:relative; display:inline-block; }
.perspective[data-sheening] .perspective-ellipsis::after,:root[data-theme="light"] .perspective[data-sheening] .perspective-day::after,:root[data-theme="dark"] .perspective[data-sheening] .perspective-night::after { opacity:1; }
/* Independent twinkling points; the concealed glyphs never supply the cue. */
.perspective-particles { position:absolute; inset:0; pointer-events:none; opacity:0; overflow:visible; -webkit-mask-image:var(--particle-mask,none); mask-image:var(--particle-mask,none); mask-size:100% 100%; mask-repeat:no-repeat; }
.perspective-particle { position:absolute; left:var(--x); top:var(--y); width:var(--size); height:var(--size); border-radius:50%; background:radial-gradient(circle,#fff 0 18%,var(--particle-colour,var(--agent-accent)) 45% 65%,transparent 76%); box-shadow:0 0 2px var(--particle-colour,var(--agent-accent)),0 0 6px var(--particle-colour,var(--agent-accent)); opacity:0; transform:translate(var(--pull-x,0px),var(--pull-y,0px)) scale(var(--pull-scale,1)); will-change:transform,opacity; }
.perspective-particle[hidden] { display:none; }
.perspective[data-state="ready"] .perspective-particles { opacity:1; }
.perspective[data-state="complete"] .perspective-fragment::after { visibility:hidden; }
.perspective[data-celebrating][data-sheening] .perspective-fragment::after { visibility:visible; opacity:1; }
/* One rotating conic field supplies both the border and its blurred halo. */
.perspective-dialog { --halo-paint:conic-gradient(from var(--perspective-halo-angle),#ff58bc 0deg,#b439ff 48deg,#4355ff 100deg,#00dcff 150deg,#38ffab 220deg,#a5ff7a 265deg,#ffc96b 300deg,#ff58bc 360deg); box-sizing:border-box; width:min(440px,calc(100% - 48px)); max-width:440px; max-height:calc(100dvh - 48px); padding:0; border:2px solid transparent; border-radius:24px; background:var(--halo-paint) border-box; color:var(--text); overflow:visible; isolation:isolate; }
.perspective-dialog-content { position:relative; border-radius:22px; background:var(--surface); padding:28px; max-height:calc(100dvh - 52px); overflow:auto; box-sizing:border-box; }
.perspective-dialog::before { content:""; position:absolute; inset:-12px; z-index:-1; pointer-events:none; border-radius:inherit; background:var(--halo-paint); filter:blur(var(--halo-blur,24px)); opacity:calc(.85 * var(--perspective-halo,1)); }
@property --perspective-halo-angle { syntax:"<angle>"; initial-value:0deg; inherits:true; }
.perspective-dialog[open] { animation:perspective-halo-rotate var(--halo-period,14000ms) linear infinite; }
.perspective-dialog[open]::before { animation:perspective-aurora-drift var(--aurora-period,7000ms) ease-in-out infinite alternate; transform-origin:50% 50%; }
@keyframes perspective-aurora-drift { 0% { transform:translate(calc(-3px * var(--aurora-intensity,1)),calc(2px * var(--aurora-intensity,1))) scale(calc(1 + .02 * var(--aurora-intensity,1)),calc(1 - .02 * var(--aurora-intensity,1))) skew(calc(-2deg * var(--aurora-intensity,1))); filter:blur(calc(var(--halo-blur,24px) * (1 - .08 * var(--aurora-intensity,1)))); } 50% { transform:translate(calc(3px * var(--aurora-intensity,1)),calc(-3px * var(--aurora-intensity,1))) scale(calc(1 - .01 * var(--aurora-intensity,1)),calc(1 + .06 * var(--aurora-intensity,1))) skew(calc(1deg * var(--aurora-intensity,1))); filter:blur(calc(var(--halo-blur,24px) * (1 + .25 * var(--aurora-intensity,1)))); } 100% { transform:translate(calc(2px * var(--aurora-intensity,1)),calc(3px * var(--aurora-intensity,1))) scale(calc(1 + .05 * var(--aurora-intensity,1)),calc(1 + .01 * var(--aurora-intensity,1))) skew(calc(2deg * var(--aurora-intensity,1))); filter:blur(calc(var(--halo-blur,24px) * (1 + .04 * var(--aurora-intensity,1)))); } }
@keyframes perspective-halo-rotate { from { --perspective-halo-angle:0deg; } to { --perspective-halo-angle:360deg; } }
.perspective-dialog::backdrop { background:var(--gate-overlay); backdrop-filter:blur(4px); }
.perspective-dialog h2 { font-size:24px; line-height:1.2; margin:0 0 20px; }
.perspective-dialog p { font-size:16px; line-height:1.5; color:var(--muted-text); margin:0 0 20px; }
.perspective-dialog button { background:var(--surface); color:var(--text); border:1px solid var(--control-border); border-radius:8px; padding:10px 16px; }
.perspective-dialog button:hover { background:var(--hover); }
body:has(.perspective-dialog[open]) { overflow:hidden; }
@media(prefers-reduced-motion:reduce) { .perspective-fragment::after,.perspective-ellipsis::after,.perspective-dialog[open],.perspective-dialog[open]::before,.perspective-particle { animation:none!important; } .perspective[data-state="ready"] .perspective-particles { opacity:.6; } .perspective[data-state="ready"] .perspective-particle { opacity:.7!important; transform:none!important; filter:none!important; } .perspective-dialog { --perspective-halo-angle:0deg!important; } }

`;
export function initPerspective(defaults) {
 const root=document.documentElement, area=document.querySelector('.perspective');
 if(!area)return;
 const day=area.querySelector('.perspective-day'),night=area.querySelector('.perspective-night'),button=area.querySelector('button'),dialog=document.querySelector('.perspective-dialog');
 const config={...defaults},points=[...button.querySelectorAll('.perspective-particle')];
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 for(const fragment of [day,night,area.querySelector('.perspective-ellipsis')])fragment.dataset.sheenText=fragment.textContent;
 let seen=new Set(),candidate=null,since=0,state='locked',cycle=0,sequence=0,hovering=false,held=false;
 let waves=[],pointer=null,lastFrame=0,maskKey="";
 const floats=points.map((el,i)=>({el,x:parseFloat(el.style.getPropertyValue('--x'))/100,y:parseFloat(el.style.getPropertyValue('--y'))/100,phase:i*2.399,twinklePeriod:1.25+(i%11)*.13,twinkleDuration:.22+(i%5)*.025,pullX:0,pullY:0,alpha:0,chargedAt:-Infinity,colour:null}));
 let timers=[];
 const later=(fn,ms)=>{const id=setTimeout(fn,ms);timers.push(id);return id;};
 const clearTimers=()=>{timers.forEach(clearTimeout);timers=[];};
 const visible=()=>{const r=area.getBoundingClientRect();return !document.hidden&&r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth;};
 const stable=()=>!window.workshopThemeBusy?.();
 function setState(next){state=next;area.dataset.state=next;}
 // Union of soft capsules around actual wrapped line boxes, not their bounding rectangle.
 function shapeParticles(rects,left,top,width,height,padding){
  const lines=rects.filter(r=>r.width>0).map(r=>({x:r.left-left-padding,y:r.top-top+(r.height-24)/2-padding,w:r.width+padding*2,h:24+padding*2}));
  const key=JSON.stringify([width,height,lines]);if(key===maskKey)return;maskKey=key;
  const canvas=document.createElement('canvas');canvas.width=Math.ceil(width);canvas.height=Math.ceil(height);const ctx=canvas.getContext('2d'),pixels=ctx.createImageData(canvas.width,canvas.height);
  for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++){
   let alpha=0;for(const r of lines){const radius=Math.min(r.w,r.h)/2,qx=Math.abs(x+.5-r.x-r.w/2)-(r.w/2-radius),qy=Math.abs(y+.5-r.y-r.h/2)-(r.h/2-radius),distance=Math.hypot(Math.max(qx,0),Math.max(qy,0))+Math.min(Math.max(qx,qy),0)-radius,t=Math.max(0,Math.min(1,-distance/Math.min(48,r.h/2)));alpha=Math.max(alpha,t*t*(3-2*t));}
   pixels.data[(y*canvas.width+x)*4+3]=Math.round(alpha*255);
  }
  ctx.putImageData(pixels,0,0);button.querySelector('.perspective-particles').style.setProperty('--particle-mask','url("'+canvas.toDataURL()+'")');
 }
 function positionTarget(){if(state==='complete'){const a=area.getBoundingClientRect();Object.assign(button.style,{left:'0px',right:'auto',top:'-10px',width:a.width+'px',height:Math.max(44,a.height+20)+'px',transform:'none'});button.setAttribute('aria-label','Reopen Discovery Message');return;}button.setAttribute('aria-label','Discover Another Perspective');const fragment=root.dataset.theme==='dark'?day:night;const r=fragment.getBoundingClientRect(),a=area.getBoundingClientRect(),height=Math.max(config.hoverHeight,r.height),padding=(height-r.height)/2,range=document.createRange();range.selectNodeContents(fragment);const text=range.getBoundingClientRect();Object.assign(button.style,{left:(text.left-a.left-padding)+'px',right:'auto',top:(r.top-a.top-padding)+'px',width:(text.width+padding*2)+'px',height:height+'px',transform:'none'});shapeParticles([...range.getClientRects()],text.left-padding,r.top-padding,text.width+padding*2,height,padding);}
 function sync(){const all=state==='revealing'||state==='complete';day.setAttribute('aria-hidden',String(!all&&root.dataset.theme==='dark'));night.setAttribute('aria-hidden',String(!all&&root.dataset.theme!=='dark'));positionTarget();}
 function configure(next={}){const before=JSON.stringify(config);for(const [key,min,max] of [['duration',1500,24000],['gap',0,20000],['intensity',0,400],['halo',0,400],['haloSpeed',25,300],['haloBlur',0,80],['auroraIntensity',0,300],['gravity',0,400],['particleDuration',500,24000],['ringRadius',0,128],['hoverHeight',24,360]]){if(Number.isFinite(next[key]))config[key]=Math.min(max,Math.max(min,next[key]));}area.style.setProperty('--hover-height',config.hoverHeight+'px');area.style.setProperty('--particle-radius',config.ringRadius+'px');area.style.setProperty('--perspective-duration',config.duration+'ms');dialog.style.setProperty('--perspective-halo',config.halo/100);dialog.style.setProperty('--halo-blur',config.haloBlur+'px');dialog.style.setProperty('--aurora-intensity',config.auroraIntensity/100);dialog.style.setProperty('--halo-period',(1400000/config.haloSpeed)+'ms');dialog.style.setProperty('--aurora-period',(700000/config.haloSpeed)+'ms');points.forEach((point,i)=>point.hidden=i>=Math.round(config.intensity*.48));if(state==='ready'&&before!==JSON.stringify(config)){clearTimers();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');cycle=performance.now()+100;}return {...config};}
 button.addEventListener('pointermove',event=>{const r=button.getBoundingClientRect();pointer={x:event.clientX-r.left,y:event.clientY-r.top};});
 button.addEventListener('pointerleave',()=>pointer=null);
 // The palette, geometry and clock are shared by text, punctuation and particles.
 const palette=[[255,79,155],[255,182,66],[109,226,159],[75,199,255],[146,117,255],[239,114,221]];
 function waveSample(q,centre,band){const u=(q-centre)/band+.5;if(u<0||u>1)return null;const v=Math.max(0,Math.min(1,(u-.12)/.76))*(palette.length-1),i=Math.min(palette.length-2,Math.floor(v)),mix=v-i;return {u,colour:palette[i].map((n,k)=>Math.round(n+(palette[i+1][k]-n)*mix)),alpha:Math.sin(Math.PI*u)**2};}
 function waveGeometry(w,now,box){const band=Math.max(80,box.width*.55),extent=box.width+box.height,centre=-band/2+(now-w.start)/w.sweep*(extent+band);return {band,centre};}
 function paintWave(w,now,box){const {band,centre}=waveGeometry(w,now,box),stops=['transparent '+((centre-band/2)/Math.SQRT2)+'px',...palette.map((rgb,i)=>'rgb('+rgb.join(' ')+') '+((centre-band/2+band*(.12+i*.152))/Math.SQRT2)+'px'),'transparent '+((centre+band/2)/Math.SQRT2)+'px'];area.style.setProperty('--wave-paint','linear-gradient('+(w.dark?315:135)+'deg,'+stops.join(',')+')');area.style.setProperty('--wave-width',box.width+'px');area.style.setProperty('--wave-height',box.height+'px');for(const el of [day,night,area.querySelector('.perspective-ellipsis')]){const r=el.getBoundingClientRect();el.style.setProperty('--wave-offset-x',-(r.left-box.left)+'px');el.style.setProperty('--wave-offset-y',-(r.top-box.top)+'px');}}
 function frame(now){
  const dt=Math.min(50,now-lastFrame||16),ease=1-Math.exp(-dt/220);lastFrame=now;
  if(!document.hidden&&!motion.matches){

   waves=waves.filter(w=>now-w.start<w.sweep+w.life);
   const a=area.getBoundingClientRect(),targetBox=button.hidden?a:button.getBoundingClientRect(),top=Math.min(a.top,targetBox.top),left=Math.min(a.left,targetBox.left),box={left,top,width:Math.max(a.right,targetBox.right)-left,height:Math.max(a.bottom,targetBox.bottom)-top},latest=waves.at(-1);if(latest&&area.hasAttribute('data-sheening'))paintWave(latest,now,box);
   if(state==='ready'&&visible()){
    const r=button.getBoundingClientRect(),hint=hovering||area.hasAttribute('data-keyboard-hint');
    for(const f of floats){if(f.el.hidden)continue;const t=now/1000,driftX=Math.sin(t*.48+f.phase)*7+Math.sin(t*.21+f.phase*2)*4,driftY=Math.cos(t*.39+f.phase)*6;let glow=0;
     for(const w of waves){if(now-w.start>w.sweep)continue;const {centre,band}=waveGeometry(w,now,box),x=r.left-box.left+f.x*r.width+driftX+f.pullX,y=r.top-box.top+f.y*r.height+driftY+f.pullY,sample=waveSample(w.dark?box.width-x+box.height-y:x+y,centre,band);if(sample&&sample.alpha>.002){f.chargedAt=now;if(!f.colour||sample.u>.2+(f.phase%1)*.6)f.colour=sample.colour;glow=Math.max(glow,sample.alpha);}}
     const age=now-f.chargedAt;if(age<config.particleDuration)glow=Math.max(glow,.8*Math.pow(1-age/config.particleDuration,1.5));
     if(f.colour)f.el.style.setProperty('--particle-colour','rgb('+f.colour.join(' ')+')');
     const attractor=pointer||(hint?{x:r.width/2,y:r.height/2}:null),dx=attractor?attractor.x-f.x*r.width-driftX:0,dy=attractor?attractor.y-f.y*r.height-driftY:0,local=attractor?Math.exp(-(dx*dx+dy*dy)/(75*75)):0,influence=Math.min(1,local*config.gravity/100);
     const target=hint?Math.max(glow,.85)*local:glow;f.alpha=hint?f.alpha+(target-f.alpha)*ease:target;
     const distance=Math.hypot(dx,dy),ux=distance>.01?dx/distance:Math.cos(f.phase),uy=distance>.01?dy/distance:Math.sin(f.phase);
     f.pullX+=((dx-ux*config.ringRadius)*influence-f.pullX)*ease;f.pullY+=((dy-uy*config.ringRadius)*influence-f.pullY)*ease;
     // Short, staggered point flashes with true dark intervals; the sweep still gates their energy.
     const pulseTime=(t+f.phase)%f.twinklePeriod,u=pulseTime/f.twinkleDuration,flash=u>=1?0:u<.16?Math.pow(u/.16,2):Math.pow((1-u)/.84,2);
     f.el.style.filter='brightness('+(1+flash*.8)+')';
     f.el.style.transform='translate('+(driftX+f.pullX)+'px,'+(driftY+f.pullY)+'px) scale('+(1+influence*.6+flash*.25)+')';f.el.style.opacity=Math.min(1,f.alpha*flash*1.8);
    }
   }else{for(const f of floats){f.alpha=0;f.el.style.opacity=0;}}
  }
  requestAnimationFrame(frame);
 }
 requestAnimationFrame(frame);
 configure();
 function openDiscovery(){
  dialog.showModal();window.workshopFocusPanel?.(dialog);
  if(motion.matches)return;
  const from=area.getBoundingClientRect(),to=dialog.getBoundingClientRect(),dx=from.left+from.width/2-to.left-to.width/2,dy=from.top+from.height/2-to.top-to.height/2,sx=Math.min(.9,Math.max(.45,from.width*.7/to.width));
  // The panel and its rainbow halo expand together from the discovered sentence.
  const entrance=dialog.animate([{transform:'translate('+dx+'px,'+dy+'px) scale('+sx+',.055)',opacity:0,borderRadius:'80px',filter:'blur(5px)'},{transform:'translate('+(dx*.35)+'px,'+(dy*.35)+'px) scale(.96,.5)',opacity:.85,borderRadius:'40px',filter:'blur(1px)',offset:.55},{transform:'none',opacity:1,borderRadius:'24px',filter:'blur(0px)'}],{duration:850,easing:'cubic-bezier(.16,1,.3,1)'});
  dialog.addEventListener('close',()=>entrance.cancel(),{once:true});
 }
 function sheen(complete=false){
  const token=++sequence;clearTimers();if(complete){waves=[];area.setAttribute('data-celebrating','');}area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');void area.offsetWidth;
  if(!motion.matches){area.setAttribute('data-sheening','');waves.push({start:performance.now(),sweep:config.duration,life:config.particleDuration,dark:root.dataset.theme==='dark'});}
  if(complete){
   area.removeAttribute('data-hovering');area.removeAttribute('data-keyboard-hint');
   setState('revealing');sync();button.hidden=true;
   const other=root.dataset.theme==='dark'?day:night;
   if(!motion.matches)other.animate([{opacity:0,clipPath:root.dataset.theme==='dark'?'inset(0 0 0 100%)':'inset(0 100% 0 0)'},{opacity:1,clipPath:'inset(0 0 0 0)'}],{duration:800,fill:'both',easing:'ease-out'});
   later(()=>{if(token!==sequence)return;setState('complete');sync();},motion.matches?0:800);
   later(()=>{area.removeAttribute('data-sheening');area.removeAttribute('data-celebrating');},config.duration);
   later(()=>{if(token!==sequence)return;openDiscovery();},Math.max(4000,motion.matches?0:config.duration));
  } else {later(()=>{if(token===sequence)area.removeAttribute('data-sheening');},config.duration);}
 }
 button.addEventListener('pointerenter',event=>{const r=button.getBoundingClientRect();pointer={x:event.clientX-r.left,y:event.clientY-r.top};hovering=true;if(state==='ready')area.setAttribute('data-hovering','');});button.addEventListener('pointerleave',()=>{hovering=false;area.removeAttribute('data-hovering');});
 button.addEventListener('focus',()=>{if(state==='ready'&&root.dataset.focusInput==='keyboard')area.setAttribute('data-keyboard-hint','');});button.addEventListener('blur',()=>area.removeAttribute('data-keyboard-hint'));
 button.addEventListener('click',()=>{if(state==='ready')sheen(true);else if(state==='complete'){openDiscovery();}});
 dialog.addEventListener('close',()=>{if(state!=='complete')return;button.hidden=false;button.focus({preventScroll:true});});
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
  if(state==='ready'&&visible()&&stable()&&now>=cycle){sheen();cycle=now+config.duration+config.gap;}
  if(!visible()&&state==='ready'){clearTimers();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');}
  sync();
 }
 document.addEventListener('visibilitychange',()=>{candidate=null;since=0;if(document.hidden&&state==='ready'){clearTimers();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');}});
 setInterval(tick,100);tick();
 motion.addEventListener('change',()=>{if(motion.matches){area.getAnimations({subtree:true}).forEach(a=>{if(a.effect?.getTiming().iterations===Infinity)a.cancel();else a.finish();});area.removeAttribute('data-sheening');}});
 // Shared state renderer for isolated Playground fixtures; no parallel UI implementation.
 window.workshopPerspective={configure,get config(){return {...config};},get state(){return state;},get seen(){return [...seen];},preview(next){held=next!=='live';seen=new Set();candidate=null;clearTimers();sequence++;area.removeAttribute('data-celebrating');waves=[];floats.forEach(f=>{f.chargedAt=-Infinity;f.colour=null;f.el.style.removeProperty('--particle-colour');});dialog.close();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');setState(next==='success'?'complete':next==='live'?'locked':next);button.hidden=next==='locked'||next==='live';if(next==='ready'){seen=new Set(['light','dark']);cycle=performance.now()+500;}if(next==='success'){openDiscovery();}sync();},sheen};
}
export function withPerspective(html){return html.replace('</head>',`<style>${eggCSS}</style></head>`).replace('    <footer>',eggMarkup+'\n    <footer>').replace('</body>',`<script nonce="__NONCE__">(${initPerspective.toString()})(${JSON.stringify(perspectiveDefaults)});</script></body>`);}

// Original implementation inspired by Magic UI Aurora Text/Shine Border and Aceternity Sparkles.
// Reference links and rationale are recorded in website/README.md; no third-party code copied.
export const perspectiveDefaults = Object.freeze({duration:4500,gap:2000,intensity:100,halo:100});
const scatter = (i,seed) => ((Math.sin((i+1)*seed)*43758.5453)%1+1)%1*100;
const particles = Array.from({length:96},(_,i)=>`<span class="perspective-particle" style="--x:${scatter(i,12.9898)}%;--y:${scatter(i,78.233)}%;--size:${1+(i%5)*.35}px;--delay:${-(i%17)*.23}s;--twinkle:${1.6+(i%7)*.31}s"></span>`).join('');
export const eggMarkup = `<section class="perspective" data-state="locked" aria-label="A Different Perspective">
<p class="perspective-fragment perspective-day">Look at things a little differently</p>
<span class="perspective-join"><span class="perspective-ellipsis">…</span><button class="perspective-discover" type="button" hidden aria-label="Discover Another Perspective"><span class="perspective-particles" aria-hidden="true">${particles}</span></button></span>
<p class="perspective-fragment perspective-night" aria-hidden="true">there’s more here than meets the eye.</p>
</section>
<dialog class="perspective-dialog" aria-labelledby="perspective-title"><h2 id="perspective-title" tabindex="-1">You Saw the Whole Picture</h2><p>A little curiosity. A different perspective. Something you might otherwise have missed.</p><p>Ask Adam what else is hiding.</p><form method="dialog"><button type="submit">Done</button></form></dialog>`;
export const eggCSS = `
/* Preserve each fragment's intrinsic height even when its theme is hidden. */
.perspective { --egg-line: 24px; position:relative; display:grid; grid-template-columns:minmax(0,1fr) 1.2em minmax(0,1fr); grid-template-rows:auto auto; margin-top:40px; margin-bottom:44px; font-size:14px; line-height:var(--egg-line); color:var(--muted-text); }
.perspective + .perspective-dialog + footer { margin-top:0; }
.perspective-fragment,.perspective-ellipsis { font-size:14px; line-height:24px; color:var(--muted-text); }
.perspective-fragment { margin:0; min-width:0; overflow-wrap:anywhere; position:relative; }
.perspective-day { grid-column:1; grid-row:1; text-align:right; }
.perspective-night { grid-column:3; grid-row:2; margin-top:calc(-1 * var(--egg-line)); text-align:left; visibility:hidden; }
.perspective-join { grid-column:2; grid-row:1; align-self:end; height:var(--egg-line); text-align:center; position:static; }
:root[data-theme="dark"] .perspective-day { visibility:hidden; }
:root[data-theme="dark"] .perspective-night { visibility:visible; }
.perspective[data-state="revealing"] .perspective-fragment,.perspective[data-state="complete"] .perspective-fragment { visibility:visible; }
.perspective-discover { position:absolute; left:100%; top:50%; transform:translateY(-50%); width:44px; height:44px; padding:12px; border:0; border-radius:10px; background:transparent; color:var(--muted-text); z-index:2; }
:root[data-theme="dark"] .perspective-discover { left:auto; right:100%; }
.perspective[data-state="complete"] .perspective-join { position:static; }
.perspective[data-state="complete"] .perspective-discover { top:100%; left:50%; right:auto; transform:translateX(-50%); }
.perspective-discover[hidden] { display:none; }
/* Animate the actual text silhouette: a shared sweep for all wrapped lines. */
.perspective-fragment::after { content:attr(data-sheen-text); position:absolute; inset:0; pointer-events:none; user-select:none; visibility:visible; color:transparent; background:linear-gradient(135deg,transparent 25%,#ff4f9b 34%,#ffb642 41%,#6de29f 48%,#4bc7ff 55%,#9275ff 62%,#ef72dd 69%,transparent 78%); background-size:300% 100%; background-position:150% 0; background-clip:text; -webkit-background-clip:text; opacity:0; }
.perspective { --egg-sheen:color-mix(in srgb,var(--agent-accent) 60%,var(--text)); }
:root[data-theme="light"] .perspective[data-sheening] .perspective-day::after { animation:perspective-sheen var(--perspective-duration,4500ms) linear; }
:root[data-theme="dark"] .perspective[data-sheening] .perspective-night::after { animation:perspective-sheen var(--perspective-duration,4500ms) linear reverse; }
@keyframes perspective-sheen { 0% { background-position:150% 0; opacity:0; } 15%,85% { opacity:.85; } 100% { background-position:-50% 0; opacity:0; } }
/* Independent twinkling points; the concealed glyphs never supply the cue. */
.perspective-particles { position:absolute; inset:0; pointer-events:none; opacity:0; overflow:hidden; }
.perspective-particle { position:absolute; left:var(--x); top:var(--y); width:var(--size); height:var(--size); border-radius:50%; background:color-mix(in srgb,var(--agent-accent) 65%,var(--text)); box-shadow:0 0 4px color-mix(in srgb,var(--agent-accent) 65%,transparent); opacity:0; transform:translate(var(--pull-x,0px),var(--pull-y,0px)) scale(var(--pull-scale,1)); transition:transform 500ms cubic-bezier(.2,.65,.3,1); }
.perspective-particle[hidden] { display:none; }
.perspective[data-state="ready"]:is([data-sparkling],[data-hovering],[data-keyboard-hint]) .perspective-particles { opacity:1; }
.perspective[data-state="ready"]:is([data-sparkling],[data-hovering],[data-keyboard-hint]) .perspective-particle { animation:perspective-twinkle var(--twinkle) ease-in-out var(--delay) infinite; }
@keyframes perspective-twinkle { 0%,100% { opacity:.08; } 50% { opacity:.85; } }
.perspective[data-state="complete"] .perspective-fragment::after { visibility:hidden; }
.perspective-dialog { box-sizing:border-box; width:min(440px,calc(100% - 48px)); max-width:440px; max-height:calc(100dvh - 48px); padding:28px; border:2px solid transparent; border-radius:20px; background:linear-gradient(var(--surface),var(--surface)) padding-box,conic-gradient(from var(--perspective-halo-angle),#ff4f9b,#ffb642,#6de29f,#4bc7ff,#9275ff,#ff4f9b) border-box; color:var(--text); overflow:auto; box-shadow:-14px -10px 48px rgb(168 85 247 / calc(.6 * var(--perspective-halo,1))),16px -6px 46px rgb(22 191 255 / calc(.53 * var(--perspective-halo,1))),0 18px 52px rgb(255 79 155 / calc(.6 * var(--perspective-halo,1))); }
@property --perspective-halo-angle { syntax:"<angle>"; initial-value:0deg; inherits:false; }
.perspective-dialog[open] { animation:perspective-halo-turn 8s linear infinite,perspective-halo-breathe 4s ease-in-out infinite alternate; }
@keyframes perspective-halo-turn { to { --perspective-halo-angle:360deg; } }
@keyframes perspective-halo-breathe { from { box-shadow:-14px -10px 48px rgb(168 85 247 / calc(.6 * var(--perspective-halo,1))),16px -6px 46px rgb(22 191 255 / calc(.53 * var(--perspective-halo,1))),0 18px 52px rgb(255 79 155 / calc(.6 * var(--perspective-halo,1))); } to { box-shadow:12px -14px 58px rgb(255 79 155 / calc(.7 * var(--perspective-halo,1))),-18px 8px 56px rgb(22 191 255 / calc(.6 * var(--perspective-halo,1))),8px 18px 62px rgb(168 85 247 / calc(.67 * var(--perspective-halo,1))); } }
.perspective-dialog::backdrop { background:var(--gate-overlay); backdrop-filter:blur(4px); }
.perspective-dialog h2 { font-size:24px; line-height:1.2; margin:0 0 20px; }
.perspective-dialog p { font-size:16px; line-height:1.5; color:var(--muted-text); margin:0 0 20px; }
.perspective-dialog button { background:var(--surface); color:var(--text); border:1px solid var(--control-border); border-radius:8px; padding:10px 16px; }
.perspective-dialog button:hover { background:var(--hover); }
body:has(.perspective-dialog[open]) { overflow:hidden; }
/* Float the existing resource control; the header keeps its original height. */
body:has(.perspective) .page-toolbar { min-height:54px; padding-right:110px; }
body:has(.perspective) .page-toolbar > .theme-toggle { position:fixed; top:max(16px,env(safe-area-inset-top)); right:max(24px,calc((100vw - 960px)/2)); z-index:30; box-shadow:var(--floating-control-shadow); }
@media(prefers-reduced-motion:reduce) { .perspective-fragment::after,.perspective-dialog[open],.perspective-particle { animation:none!important; } .perspective[data-state="ready"] .perspective-particles { opacity:.6; } .perspective[data-state="ready"] .perspective-particle { opacity:.7; transform:none; } }

`;
export function initPerspective(defaults) {
 const root=document.documentElement, area=document.querySelector('.perspective');
 if(!area)return;
 const day=area.querySelector('.perspective-day'),night=area.querySelector('.perspective-night'),button=area.querySelector('button'),dialog=document.querySelector('.perspective-dialog');
 const config={...defaults},points=[...button.querySelectorAll('.perspective-particle')];
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 for(const fragment of [day,night])fragment.dataset.sheenText=fragment.textContent;
 let seen=new Set(),candidate=null,since=0,state='locked',cycle=0,sequence=0,hovering=false,held=false;
 let timers=[];
 const later=(fn,ms)=>{const id=setTimeout(fn,ms);timers.push(id);return id;};
 const clearTimers=()=>{timers.forEach(clearTimeout);timers=[];};
 const visible=()=>{const r=area.getBoundingClientRect();return !document.hidden&&r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth;};
 const stable=()=>!window.workshopThemeBusy?.();
 function setState(next){state=next;area.dataset.state=next;}
 function positionTarget(){if(state==='complete'){button.removeAttribute('style');return;}const fragment=root.dataset.theme==='dark'?day:night;const r=fragment.getBoundingClientRect(),a=area.getBoundingClientRect();Object.assign(button.style,{left:(r.left-a.left)+'px',right:'auto',top:(r.top-a.top-10)+'px',width:r.width+'px',height:Math.max(44,r.height+20)+'px',transform:'none'});}
 function sync(){const all=state==='revealing'||state==='complete';day.setAttribute('aria-hidden',String(!all&&root.dataset.theme==='dark'));night.setAttribute('aria-hidden',String(!all&&root.dataset.theme!=='dark'));positionTarget();}
 function configure(next={}){const before=JSON.stringify(config);for(const [key,min,max] of [['duration',1500,12000],['gap',0,10000],['intensity',0,200],['halo',0,200]]){if(Number.isFinite(next[key]))config[key]=Math.min(max,Math.max(min,next[key]));}area.style.setProperty('--perspective-duration',config.duration+'ms');dialog.style.setProperty('--perspective-halo',config.halo/100);points.forEach((point,i)=>point.hidden=i>=Math.round(config.intensity*.48));if(state==='ready'&&before!==JSON.stringify(config)){clearTimers();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');cycle=performance.now()+100;}return {...config};}
 function gravity(event){if(state!=='ready'||motion.matches)return;const r=button.getBoundingClientRect();points.forEach(point=>{const x=parseFloat(point.style.getPropertyValue('--x'))/100*r.width,y=parseFloat(point.style.getPropertyValue('--y'))/100*r.height,dx=event.clientX-r.left-x,dy=event.clientY-r.top-y,influence=Math.max(0,1-Math.hypot(dx,dy)/140);point.style.setProperty('--pull-x',dx*influence*.38+'px');point.style.setProperty('--pull-y',dy*influence*.38+'px');point.style.setProperty('--pull-scale',1+influence*.9);});}
 button.addEventListener('pointermove',gravity);
 button.addEventListener('pointerleave',()=>points.forEach(point=>{for(const key of ['--pull-x','--pull-y','--pull-scale'])point.style.removeProperty(key);}));
 configure();
 function sparkle(){area.setAttribute('data-sparkling','');later(()=>area.removeAttribute('data-sparkling'),3000);}
 function sheen(complete=false){
  const token=++sequence;clearTimers();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');void area.offsetWidth;
  if(!motion.matches)area.setAttribute('data-sheening','');
  if(complete){
   area.removeAttribute('data-hovering');area.removeAttribute('data-keyboard-hint');
   setState('revealing');sync();button.hidden=true;
   const other=root.dataset.theme==='dark'?day:night;
   if(!motion.matches){other.animate([{opacity:0,clipPath:root.dataset.theme==='dark'?'inset(0 0 0 100%)':'inset(0 100% 0 0)'},{opacity:1,clipPath:'inset(0 0 0 0)'}],{delay:config.duration,duration:1800,fill:'both',easing:'ease-in-out'});}
   later(()=>{if(token!==sequence)return;setState('complete');sync();area.removeAttribute('data-sheening');later(()=>{dialog.showModal();window.workshopFocusPanel?.(dialog);},2000);},motion.matches?0:config.duration+1800);
  } else {later(()=>{if(token===sequence)sparkle();},motion.matches?0:config.duration*.78);later(()=>{if(token===sequence)area.removeAttribute('data-sheening');},config.duration);}
 }
 button.addEventListener('pointerenter',()=>{hovering=true;if(state==='ready')area.setAttribute('data-hovering','');});button.addEventListener('pointerleave',()=>{hovering=false;area.removeAttribute('data-hovering');});
 button.addEventListener('focus',()=>{if(state==='ready'&&root.dataset.focusInput==='keyboard')area.setAttribute('data-keyboard-hint','');});button.addEventListener('blur',()=>area.removeAttribute('data-keyboard-hint'));
 button.addEventListener('click',()=>{if(state==='ready')sheen(true);else if(state==='complete'){dialog.showModal();window.workshopFocusPanel?.(dialog);}});
 dialog.addEventListener('close',()=>{if(state!=='complete')return;button.hidden=false;button.focus({preventScroll:true});});
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
 function tick(){
  if(held&&state!=='ready')return;
  const now=performance.now(),theme=root.dataset.theme;
  if(state==='locked'){
   if(visible()&&stable()){
    if(candidate!==theme){candidate=theme;since=now;}
    if(now-since>=1000){seen.add(theme);if(seen.has('light')&&seen.has('dark')){setState('ready');button.hidden=false;cycle=now+700;}}
   }else{candidate=null;since=0;}
  }
  if(state==='ready'&&visible()&&stable()&&now>=cycle&&!hovering){sheen();cycle=now+config.duration+config.gap;}
  if(!visible()&&state==='ready'){clearTimers();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');}
  sync();
 }
 document.addEventListener('visibilitychange',()=>{candidate=null;since=0;if(document.hidden&&state==='ready'){clearTimers();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');}});
 setInterval(tick,100);tick();
 motion.addEventListener('change',()=>{if(motion.matches){area.getAnimations({subtree:true}).forEach(a=>{if(a.effect?.getTiming().iterations===Infinity)a.cancel();else a.finish();});area.removeAttribute('data-sheening');}});
 // Shared state renderer for isolated Playground fixtures; no parallel UI implementation.
 window.workshopPerspective={configure,get config(){return {...config};},get state(){return state;},get seen(){return [...seen];},preview(next){held=next!=='live';seen=new Set();candidate=null;clearTimers();sequence++;dialog.close();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');setState(next==='success'?'complete':next==='live'?'locked':next);button.hidden=next==='locked'||next==='live';if(next==='ready'){seen=new Set(['light','dark']);cycle=performance.now()+500;}if(next==='success'){dialog.showModal();window.workshopFocusPanel?.(dialog);}sync();},sheen};
}
export function withPerspective(html){return html.replace('</head>',`<style>${eggCSS}</style></head>`).replace('    <footer>',eggMarkup+'\n    <footer>').replace('</body>',`<script nonce="__NONCE__">(${initPerspective.toString()})(${JSON.stringify(perspectiveDefaults)});</script></body>`);}

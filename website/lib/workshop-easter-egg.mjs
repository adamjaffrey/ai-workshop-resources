// Original implementation inspired by Magic UI Aurora Text/Shine Border and Aceternity Sparkles.
// Reference links and rationale are recorded in website/README.md; no third-party code copied.
const particles = Array.from({length:24},(_,i)=>{const angle=(i%8)*Math.PI/4,group=Math.floor(i/8);return `<span class="perspective-particle" style="--x:${22+group*28}%;--y:${[50,35,60][group]}%;--dx:${(Math.cos(angle)*(14+group*4)).toFixed(2)}px;--dy:${(Math.sin(angle)*14).toFixed(2)}px;--delay:${group*.35+(i%3)*.09}s;--hue:${i*47%360}"></span>`;}).join('');
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
:root[data-theme="light"] .perspective[data-sheening] .perspective-day::after { animation:perspective-sheen 4500ms linear; }
:root[data-theme="dark"] .perspective[data-sheening] .perspective-night::after { animation:perspective-sheen 4500ms linear reverse; }
@keyframes perspective-sheen { 0% { background-position:150% 0; opacity:0; } 15%,85% { opacity:.85; } 100% { background-position:-50% 0; opacity:0; } }
/* Abstract light bursts live on the target, never on the concealed glyphs. */
.perspective-particles { position:absolute; inset:0; pointer-events:none; opacity:0; overflow:hidden; }
.perspective-particle { position:absolute; left:var(--x); top:var(--y); width:3px; height:3px; border-radius:50%; background:hsl(var(--hue) 95% 65%); box-shadow:0 0 5px 1px hsl(var(--hue) 95% 65% / .7); opacity:0; }
.perspective[data-state="ready"]:is([data-sparkling],[data-hovering],[data-keyboard-hint]) .perspective-particles { opacity:1; }
.perspective[data-state="ready"]:is([data-sparkling],[data-hovering],[data-keyboard-hint]) .perspective-particle { animation:perspective-burst 2.4s ease-out var(--delay) infinite; }
@keyframes perspective-burst { 0% { opacity:0; transform:translate(0,0) scale(.2); } 15% { opacity:1; transform:translate(calc(var(--dx) * .15),calc(var(--dy) * .15)) scale(1.25); } 55% { opacity:.65; transform:translate(calc(var(--dx) * .65),calc(var(--dy) * .65)) scale(.85); } 100% { opacity:0; transform:translate(var(--dx),var(--dy)) scale(.1); } }
.perspective[data-state="complete"] .perspective-fragment::after { visibility:hidden; }
.perspective-dialog { box-sizing:border-box; width:min(440px,calc(100% - 48px)); max-width:440px; max-height:calc(100dvh - 48px); padding:28px; border:2px solid transparent; border-radius:20px; background:linear-gradient(var(--surface),var(--surface)) padding-box,conic-gradient(from var(--perspective-halo-angle),#ff4f9b,#ffb642,#6de29f,#4bc7ff,#9275ff,#ff4f9b) border-box; color:var(--text); overflow:auto; box-shadow:-14px -10px 48px #a855f799,16px -6px 46px #16bfff88,0 18px 52px #ff4f9b99; }
@property --perspective-halo-angle { syntax:"<angle>"; initial-value:0deg; inherits:false; }
.perspective-dialog[open] { animation:perspective-halo-turn 8s linear infinite,perspective-halo-breathe 4s ease-in-out infinite alternate; }
@keyframes perspective-halo-turn { to { --perspective-halo-angle:360deg; } }
@keyframes perspective-halo-breathe { from { box-shadow:-14px -10px 48px #a855f799,16px -6px 46px #16bfff88,0 18px 52px #ff4f9b99; } to { box-shadow:12px -14px 58px #ff4f9bb3,-18px 8px 56px #16bfff99,8px 18px 62px #a855f7aa; } }
.perspective-dialog::backdrop { background:var(--gate-overlay); backdrop-filter:blur(4px); }
.perspective-dialog h2 { font-size:24px; line-height:1.2; margin:0 0 20px; }
.perspective-dialog p { font-size:16px; line-height:1.5; color:var(--muted-text); margin:0 0 20px; }
.perspective-dialog button { background:var(--surface); color:var(--text); border:1px solid var(--control-border); border-radius:8px; padding:10px 16px; }
.perspective-dialog button:hover { background:var(--hover); }
body:has(.perspective-dialog[open]) { overflow:hidden; }
/* Float the existing resource control; the header keeps its original height. */
body:has(.perspective) .page-toolbar { min-height:54px; padding-right:110px; }
body:has(.perspective) .page-toolbar > .theme-toggle { position:fixed; top:max(16px,env(safe-area-inset-top)); right:max(24px,calc((100vw - 960px)/2)); z-index:30; box-shadow:var(--floating-control-shadow); }
@media(prefers-reduced-motion:reduce) { .perspective-fragment::after,.perspective-dialog[open],.perspective-particle { animation:none!important; } .perspective[data-state="ready"] .perspective-particles { opacity:.6; } .perspective[data-state="ready"] .perspective-particle { opacity:.7; transform:translate(var(--dx),var(--dy)); } }

`;
export function initPerspective() {
 const root=document.documentElement, area=document.querySelector('.perspective');
 if(!area)return;
 const day=area.querySelector('.perspective-day'),night=area.querySelector('.perspective-night'),button=area.querySelector('button'),dialog=document.querySelector('.perspective-dialog');
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
 function sparkle(){area.setAttribute('data-sparkling','');later(()=>area.removeAttribute('data-sparkling'),3000);}
 function sheen(complete=false){
  const token=++sequence;clearTimers();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');void area.offsetWidth;
  if(!motion.matches)area.setAttribute('data-sheening','');
  if(complete){
   area.removeAttribute('data-hovering');area.removeAttribute('data-keyboard-hint');
   setState('revealing');sync();button.hidden=true;
   const other=root.dataset.theme==='dark'?day:night;
   if(!motion.matches){other.animate([{opacity:0,clipPath:root.dataset.theme==='dark'?'inset(0 0 0 100%)':'inset(0 100% 0 0)'},{opacity:1,clipPath:'inset(0 0 0 0)'}],{delay:4500,duration:1800,fill:'both',easing:'ease-in-out'});}
   later(()=>{if(token!==sequence)return;setState('complete');sync();area.removeAttribute('data-sheening');later(()=>{dialog.showModal();window.workshopFocusPanel?.(dialog);},2000);},motion.matches?0:6300);
  } else {later(()=>{if(token===sequence)sparkle();},motion.matches?0:3500);later(()=>{if(token===sequence)area.removeAttribute('data-sheening');},4500);}
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
  if(state==='ready'&&visible()&&stable()&&now>=cycle&&!hovering){sheen();cycle=now+6500;}
  if(!visible()&&state==='ready'){clearTimers();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');}
  sync();
 }
 document.addEventListener('visibilitychange',()=>{candidate=null;since=0;if(document.hidden&&state==='ready'){clearTimers();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');}});
 setInterval(tick,100);tick();
 motion.addEventListener('change',()=>{if(motion.matches){area.getAnimations({subtree:true}).forEach(a=>{if(a.effect?.getTiming().iterations===Infinity)a.cancel();else a.finish();});area.removeAttribute('data-sheening');}});
 // Shared state renderer for isolated Playground fixtures; no parallel UI implementation.
 window.workshopPerspective={get state(){return state;},get seen(){return [...seen];},preview(next){held=next!=='live';seen=new Set();candidate=null;clearTimers();sequence++;dialog.close();area.removeAttribute('data-sheening');area.removeAttribute('data-sparkling');setState(next==='success'?'complete':next==='live'?'locked':next);button.hidden=next==='locked'||next==='live';if(next==='ready'){seen=new Set(['light','dark']);cycle=performance.now()+500;}if(next==='success'){dialog.showModal();window.workshopFocusPanel?.(dialog);}sync();},sheen};
}
export function withPerspective(html){return html.replace('</head>',`<style>${eggCSS}</style></head>`).replace('    <footer>',eggMarkup+'\n    <footer>').replace('</body>',`<script nonce="__NONCE__">(${initPerspective.toString()})();</script></body>`);}

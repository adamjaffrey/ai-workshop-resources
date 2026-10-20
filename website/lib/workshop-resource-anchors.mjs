import {headingMetrics} from './workshop-heading-metrics.mjs';
import {__iconNode as hash} from '../node_modules/lucide-react/dist/esm/icons/hash.mjs';
import {__iconNode as check} from '../node_modules/lucide-react/dist/esm/icons/circle-check.mjs';
import {__iconNode as cross} from '../node_modules/lucide-react/dist/esm/icons/circle-x.mjs';
import {anchorCopyTiming,copyFrames} from './workshop-copy-timing.mjs';
export const resourceAnchors = ['step-1-node-js-setup','step-2-system-blueprint-creator','step-3-system-build-assistant'];
const svg=(nodes,name,state)=>`<svg class="step-anchor-${state}" data-icon-provider="lucide" data-icon-name="${name}" data-icon-use="step-anchor-${state}" aria-hidden="true" viewBox="0 0 24 24" width="${state==='hash'?20:24}" height="${state==='hash'?20:24}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${nodes.map(([tag,attrs])=>`<${tag} ${Object.entries(attrs).filter(([key])=>key!=='key').map(([key,value])=>`${key}="${value}"`).join(' ')}></${tag}>`).join('')}</svg>`;
export const resourceAnchorCSS=`
.step-anchor{position:relative;display:inline-block;padding:0;border:0;border-radius:5px;background:transparent;color:inherit;font:inherit;letter-spacing:inherit;line-height:inherit;text-align:inherit;vertical-align:top;isolation:isolate;cursor:pointer}
.step-anchor,.step-anchor *{cursor:pointer!important;user-select:none}
.step-anchor::before{content:"";position:absolute;inset:0 -6px;border-radius:5px;z-index:-1;transition:background-color 160ms cubic-bezier(.2,0,.2,1)}
.step-anchor:is(:hover,[data-anchor-preview])::before{background:var(--link-hover-bg)}
.step-anchor:is(:hover,[data-anchor-preview]) .step-anchor-label{color:var(--agent-accent)}
.step-anchor-label{transition:color 160ms cubic-bezier(.2,0,.2,1)}
.step-anchor-icon{position:absolute;left:calc(100% + 6px);top:calc(var(--step-cap-centre,19px) - 12px);height:24px;width:24px;display:flex;align-items:center;justify-content:center;color:var(--agent-accent);opacity:0;transition:opacity 160ms cubic-bezier(.2,0,.2,1)}
.step-anchor-icon::before{content:"";position:absolute;inset:-2px -4px -2px 0;border-radius:0 5px 5px 0;background:transparent;z-index:-1;transition:background-color 160ms cubic-bezier(.2,0,.2,1)}
.step-anchor:is(:hover,[data-anchor-preview]) .step-anchor-icon::before{background:var(--link-hover-bg)}
.step-anchor:is(:hover,[data-result],[data-anchor-preview]) .step-anchor-icon,:root[data-focus-input="keyboard"] .step-anchor:focus .step-anchor-icon{opacity:1}
.step-anchor-icon svg{position:absolute;width:24px;height:24px;opacity:0;transition:none}
.step-anchor-icon .step-anchor-hash{width:20px;height:20px}
.step-anchor:not([data-result]) .step-anchor-hash{opacity:1}
.step-anchor[data-result="success"] .step-anchor-success{opacity:1;color:var(--success)}
.step-anchor[data-result="failure"] .step-anchor-failure{opacity:1;color:var(--error)}

#workshop-content{padding-bottom:calc(40px + var(--anchor-scroll-room,0px))}
.step-row{transition:opacity 600ms cubic-bezier(.2,0,.2,1)}
.step-row[data-anchor-hidden]{opacity:0;pointer-events:none}
html[data-resource-anchor-arriving] .step-row>.step-marker,html[data-resource-anchor-arriving] .step-row>article{opacity:1!important;transform:none!important;transition:none!important}
.step-anchor-announcement{position:fixed;top:0;left:0;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
html[data-resource-anchor-arriving] [data-sticky-control]::after{opacity:var(--anchor-arrival-progress,0)}
html[data-resource-anchor-arriving] .worm-halo>:is(.brand,.worm-halo-veil,.worm-halo-outline){opacity:var(--anchor-arrival-progress,0)!important}
html[data-resource-anchor-arriving] .step-row[data-anchor-leaving]{opacity:calc(1 - var(--anchor-arrival-progress,0));transition:none}

@media(prefers-reduced-motion:reduce){.step-anchor::before,.step-anchor-label,.step-anchor-icon,.step-anchor-icon::before,.step-anchor-icon svg,.step-row{transition:none!important}}
`;
export function initResourceAnchors(anchors,timing,measureHeading,frames){
 const root=document.documentElement, rows=[...document.querySelectorAll('.step-row')];
 const motion=matchMedia('(prefers-reduced-motion:reduce)');
 const canonical=fragment=>{let value;try{value=decodeURIComponent(fragment.replace(/^#/,''));}catch{return null;}return anchors.includes(value)?value:anchors[/^step-([1-3])$/.exec(value)?.[1]-1]||null;};
 const status=document.createElement('span');status.className='step-anchor-announcement';status.setAttribute('role','status');document.body.append(status);
 const feedback=new WeakMap();
 const align=()=>document.querySelectorAll('.step-anchor').forEach(button=>button.style.setProperty('--step-cap-centre',measureHeading(button).centre+'px'));
 document.fonts.ready.then(align);window.addEventListener('resize',align);align();
 for(const button of document.querySelectorAll('.step-anchor')){
  button.addEventListener('click',async()=>{
   const previous=feedback.get(button);if(previous){clearTimeout(previous.hold);clearTimeout(previous.fade);previous.animation?.cancel();}
   const state={};feedback.set(button,state);button.removeAttribute('data-cooling');
   let success=false;
   const url=new URL('/ai-workshop-resources',location.origin==='null'?'https://workshop.adamjaffrey.chatgpt.site':location.origin);
   url.search=location.search;url.searchParams.delete('show-login');url.hash=button.dataset.anchor;
   try{
    if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(url.href);
    else{const field=document.createElement('textarea');field.value=url.href;field.style.cssText='position:fixed;left:-10000px;top:0';document.body.append(field);try{field.select();if(!document.execCommand('copy'))throw Error('Copy unavailable');}finally{field.remove();button.focus({preventScroll:true});}}
    success=true;
   }catch{}
   if(feedback.get(button)!==state)return;
   const message=success?'Link Copied':'Copy Failed';button.dataset.result=success?'success':'failure';button.querySelector('.step-anchor-icon').title=message;status.textContent=message;
   const icon=button.querySelector(success?'.step-anchor-success':'.step-anchor-failure');
   if(!motion.matches)state.animation=icon.animate(frames(success),{duration:timing.fade,easing:'ease-out'});
   state.hold=setTimeout(()=>{button.setAttribute('data-cooling','');if(!motion.matches)state.animation=icon.animate(frames(success,true),{duration:timing.fade,easing:'ease-in-out',fill:'forwards'});state.fade=setTimeout(()=>{state.animation?.cancel();button.removeAttribute('data-result');button.removeAttribute('data-cooling');button.querySelector('.step-anchor-icon').title='Copy Link';status.textContent='';feedback.delete(button);},motion.matches?0:timing.fade);},success?timing.success:timing.failure);
  });
 }
 let generation=0,arriving=false,active=false,lastY=scrollY,focusRoute=null,trimRoom=false,writingURL=false;
 const restore=()=>{for(const row of rows){row.removeAttribute('data-anchor-hidden');row.removeAttribute('data-anchor-leaving');row.inert=false;}};
 function trim(){
  const room=parseFloat(root.style.getPropertyValue('--anchor-scroll-room'))||0;
  if(room){const naturalMax=root.scrollHeight-innerHeight-room;root.style.setProperty('--anchor-scroll-room',Math.max(0,Math.ceil(scrollY-naturalMax))+'px');}
 }
 function release(){active=false;focusRoute=null;restore();window.workshopStickyControls?.configure({pinned:false});window.workshopBrandHalo?.configure({hold:false});trimRoom=true;trim();}
 function cancel(){if(!arriving)return;generation++;arriving=false;delete root.dataset.resourceAnchorArriving;release();}
 window.addEventListener('wheel',cancel,{passive:true});window.addEventListener('touchstart',cancel,{passive:true});
 window.addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key)&&!event.target.matches('input,textarea,button'))cancel();});
 // Redirect only the arrival sequence, retaining native arrows within selectors
 // and native Tab order once the reader reaches the anchored content.
 document.addEventListener('keydown',event=>{
  if(event.key!=='Tab'||!focusRoute||event.altKey||event.ctrlKey||event.metaKey)return;
  const {agent,theme,next}=focusRoute,current=document.activeElement;
  let target;
  if(focusRoute.first&&!event.shiftKey)target=agent.querySelector('[aria-pressed="true"]')||agent.querySelector('button');
  else if(agent.contains(current)&&!event.shiftKey)target=theme.querySelector('[aria-pressed="true"]')||theme.querySelector('button');
  else if(theme.contains(current)&&!event.shiftKey){target=next;focusRoute=null;}
  else if(theme.contains(current)&&event.shiftKey)target=agent.querySelector('[aria-pressed="true"]')||agent.querySelector('button');
  else focusRoute=null;
  if(target){event.preventDefault();target.focus({preventScroll:true});if(focusRoute)focusRoute.first=false;}
 },true);
 document.addEventListener('pointerdown',()=>{focusRoute=null;},{passive:true});
 window.addEventListener('scroll',()=>{const y=scrollY;if(!arriving&&active&&y<lastY-.5)release();if(!arriving&&trimRoom)trim();lastY=y;},{passive:true});
 const frame=()=>new Promise(resolve=>requestAnimationFrame(resolve));
 function writeFragment(anchor){
  if(location.hash==='#'+anchor)return;
  writingURL=true;
  try{history.replaceState(history.state,'',location.pathname+location.search+'#'+anchor);}finally{writingURL=false;}
 }
 async function navigate(fragment,rewrite=true){
  const anchor=canonical(fragment);if(!anchor){cancel();release();return;}
  const token=++generation;arriving=true;active=false;trimRoom=false;focusRoute=null;restore();root.dataset.resourceAnchorArriving='';root.style.setProperty('--anchor-arrival-progress','0');
  rows.forEach(row=>row.classList.add('is-revealed'));
  await document.fonts.ready;await frame();await frame();if(token!==generation)return;
  window.workshopStickyControls?.configure({pinned:true});window.workshopBrandHalo?.configure({hold:true});
  await frame();if(token!==generation)return;
  const target=document.querySelector('.step-anchor[data-anchor="'+anchor+'"]');
  const textTop=target.getBoundingClientRect().top+measureHeading(target,target.querySelector('.step-anchor-label').textContent).top;
  const controls=[...document.querySelectorAll('[data-sticky-control]')];
  const bottom=Math.max(...controls.map(control=>control.getBoundingClientRect().bottom));
  const destination=Math.max(0,scrollY+textTop-bottom-(innerWidth<=660?30:60));
  const existingRoom=parseFloat(root.style.getPropertyValue('--anchor-scroll-room'))||0;
  const extra=existingRoom+Math.max(0,Math.ceil(destination-(root.scrollHeight-innerHeight)));
  root.style.setProperty('--anchor-scroll-room',extra+'px');
  const index=anchors.indexOf(anchor),leaving=rows.slice(0,index);
  leaving.forEach(row=>row.setAttribute('data-anchor-leaving',''));
  const start=scrollY,distance=Math.abs(destination-start),began=performance.now();
  // Cruise at no more than 900 CSS px/s, with 300ms acceleration/deceleration.
  const ramp=300,duration=motion.matches?0:Math.max(600,distance/.9+ramp),cruise=duration-ramp;
  root.dataset.anchorScrollDuration=String(duration);
  await new Promise(resolve=>{function tick(now){
   if(token!==generation){resolve();return;}
   const elapsed=Math.min(duration,now-began),t=duration?elapsed/duration:1;
   const travelled=elapsed<ramp?elapsed*elapsed/(2*ramp):elapsed>duration-ramp?cruise-(duration-elapsed)**2/(2*ramp):elapsed-ramp/2;
   const progress=duration?travelled/cruise:1;
   const fade=duration?Math.max(0,Math.min(1,(elapsed-(duration-600))/600)):1;
   root.style.setProperty('--anchor-arrival-progress',String(fade*fade*(3-2*fade)));
   scrollTo({top:start+(destination-start)*progress,behavior:'instant'});
   if(t<1)requestAnimationFrame(tick);else resolve();
  }requestAnimationFrame(tick);});
  if(token!==generation)return;
  if(rewrite)writeFragment(anchor);
  leaving.forEach(row=>{row.setAttribute('data-anchor-hidden','');row.removeAttribute('data-anchor-leaving');row.inert=true;});
  delete root.dataset.resourceAnchorArriving;arriving=false;active=true;lastY=scrollY;trim();
  const next=rows[index].querySelector('article a[href],article button:not(:disabled),article [tabindex="0"]');
  focusRoute={agent:document.querySelector('.controls .toggle'),theme:document.querySelector('.page-toolbar .theme-toggle'),next,first:true};
  document.activeElement?.blur();
 }
 // The Navigation API also observes re-entering an unchanged fragment in the
 // address bar, including replacement navigation. Suppress only our own URL
 // rewrite; ignoring every replace event also ignores address-bar re-entry.
 let intercepted=false;
 window.navigation?.addEventListener('navigate',event=>{
  const url=new URL(event.destination.url);
  if(event.canIntercept&&event.destination.sameDocument&&!writingURL&&url.pathname===location.pathname&&url.search===location.search&&canonical(url.hash)){
   intercepted=true;event.intercept({focusReset:'manual',scroll:'manual',handler:async()=>{
    const done=window.navigation.transition?.finished;
    await navigate(url.hash,false);
    const token=generation;
    // Rewriting history during an intercepted transition aborts that transition.
    // Canonicalise aliases only once the browser has completed it.
    const finish=()=>{if(token===generation&&location.hash===url.hash)writeFragment(canonical(url.hash));intercepted=false;};
    if(done)done.then(finish,()=>{intercepted=false;});else setTimeout(finish,0);
   }});
  }
 });
 window.addEventListener('hashchange',()=>{if(!intercepted)navigate(location.hash);});
 window.addEventListener('pageshow',event=>{if(event.persisted&&canonical(location.hash))navigate(location.hash);});
 const initial=window.workshopInitialAnchor||location.hash;
 if(canonical(initial)){const start=()=>navigate(initial);if(document.readyState==='complete')start();else window.addEventListener('load',start,{once:true});}
 window.workshopResourceAnchors={navigate,resetCopy(button){const state=feedback.get(button);if(state){clearTimeout(state.hold);clearTimeout(state.fade);state.animation?.cancel();}feedback.delete(button);button.removeAttribute('data-result');button.removeAttribute('data-cooling');button.querySelector('.step-anchor-icon').title='Copy Link';status.textContent='';}};
}
export function withResourceAnchors(html){
 for(const [index,anchor] of resourceAnchors.entries()){
  const text='Step '+(index+1);
  html=html.replace(`aria-labelledby="step-${index+1}"`,`aria-labelledby="resource-step-${index+1}"`);
  html=html.replace(`<h2 class="step-title" id="step-${index+1}">${text}</h2>`,`<h2 class="step-title" id="resource-step-${index+1}"><button type="button" class="step-anchor" data-anchor="${anchor}" aria-label="Copy Link to ${text}"><span class="step-anchor-label">${text}</span><span class="step-anchor-icon" title="Copy Link">${svg(hash,'hash','hash')}${svg(check,'circle-check','success')}${svg(cross,'circle-x','failure')}</span></button></h2>`);
 }
 const initial=`(()=>{const h=location.hash.slice(1);if(${JSON.stringify(resourceAnchors)}.includes(h)||/^step-[1-3]$/.test(h)){window.workshopInitialAnchor=location.hash;document.documentElement.dataset.resourceAnchorArriving='';history.replaceState(history.state,'',location.pathname+location.search);}})();`;
 return html.replace('</head>',`<style>${resourceAnchorCSS}</style><script nonce="__NONCE__">${initial}</script></head>`).replace('</body>',`<script nonce="__NONCE__">(${initResourceAnchors.toString()})(${JSON.stringify(resourceAnchors)},${JSON.stringify(anchorCopyTiming)},${headingMetrics.toString()},${copyFrames.toString()});</script></body>`);
}

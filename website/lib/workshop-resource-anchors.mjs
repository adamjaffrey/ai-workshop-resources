import {anchorJourney} from './workshop-anchor-motion.mjs';
import {textIcon,textIconGap} from './workshop-link-icons.mjs';
import {anchorCopyCSS,installAnchorCopy} from './workshop-anchor-copy.mjs';
import {headingMetrics} from './workshop-heading-metrics.mjs';
import {anchorCopyTiming,copyFrames} from './workshop-copy-timing.mjs';
export const resourceAnchorGap=width=>width<=660?30:60;
export const resourceAnchors = ['step-1-node-js-setup','step-2-system-blueprint-creator','step-3-system-build-assistant'];
export const resourceAnchorCSS=`
${anchorCopyCSS}
/* Keep the text on its right rail; the reserved feedback slot leads it. */
@media(min-width:661px){
 .step-row:nth-child(even) .step-anchor>.link-tail{display:inline-flex;flex-direction:row-reverse;align-items:baseline}
 .step-row:nth-child(even) .step-anchor-icon{margin-left:0;margin-right:${textIconGap}}
}

#workshop-content{padding-bottom:calc(40px + var(--anchor-scroll-room,0px))}
.step-row{transition:opacity 600ms cubic-bezier(.2,0,.2,1)}
.step-row[data-anchor-hidden]{opacity:0;pointer-events:none}
html[data-resource-anchor-arriving] .step-row>.step-marker,html[data-resource-anchor-arriving] .step-row>article{opacity:1!important;transform:none!important;transition:none!important}
html[data-resource-anchor-arriving] [data-sticky-control]::after{opacity:var(--anchor-arrival-progress,0)}
html[data-resource-anchor-arriving] .worm-halo>:is(.brand,.worm-halo-veil,.worm-halo-outline){opacity:var(--anchor-arrival-progress,0)!important}
html[data-resource-anchor-arriving] .step-row[data-anchor-leaving]{opacity:calc(1 - var(--anchor-arrival-progress,0));transition:none}

@media(prefers-reduced-motion:reduce){.step-anchor,.step-anchor::before,.step-anchor-label,.step-anchor-icon,.step-anchor-icon svg,.step-row{transition:none!important}}
`;
export function initResourceAnchors(anchors,timing,measureHeading,frames,anchorGap,installCopy,journeyFor){
 const root=document.documentElement, rows=[...document.querySelectorAll('.step-row')];
 const motion=matchMedia('(prefers-reduced-motion:reduce)');
 const canonical=fragment=>{let value;try{value=decodeURIComponent(fragment.replace(/^#/,''));}catch{return null;}return anchors.includes(value)?value:anchors[/^step-([1-3])$/.exec(value)?.[1]-1]||null;};
 const copy=installCopy(document.querySelectorAll('.step-anchor'),button=>{const url=new URL('/ai-workshop-resources',location.origin==='null'?'https://workshop.adamjaffrey.chatgpt.site':location.origin);url.search=location.search;url.searchParams.delete('login');url.hash=button.dataset.anchor;return url;},timing,frames);
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
  window.workshopStickyControls?.configure({pinned:false});window.workshopBrandHalo?.configure({hold:true});
  await frame();if(token!==generation)return;
  const target=document.querySelector('.step-anchor[data-anchor="'+anchor+'"]');
  const textTop=target.getBoundingClientRect().top+measureHeading(target,target.querySelector('.step-anchor-label').textContent).top;
  const controls=[...document.querySelectorAll('[data-sticky-control]')];
  const inset=Math.max(24,parseFloat(getComputedStyle(root).getPropertyValue('--sticky-safe-top'))||0);
  const bottom=inset+Math.max(...controls.map(control=>control.offsetHeight));
  const destination=Math.max(0,scrollY+textTop-bottom-anchorGap(innerWidth));
  const existingRoom=parseFloat(root.style.getPropertyValue('--anchor-scroll-room'))||0;
  const extra=existingRoom+Math.max(0,Math.ceil(destination-(root.scrollHeight-innerHeight)));
  root.style.setProperty('--anchor-scroll-room',extra+'px');
  const index=anchors.indexOf(anchor),leaving=rows.slice(0,index);
  leaving.forEach(row=>row.setAttribute('data-anchor-leaving',''));
  const start=scrollY,distance=Math.abs(destination-start),began=performance.now();
  // Cruise at no more than 1200 CSS px/s, with 300ms acceleration/deceleration.
  const journey=journeyFor(distance,motion.matches),duration=journey.duration;
  root.dataset.anchorScrollDuration=String(duration);
  await new Promise(resolve=>{function tick(now){
   if(token!==generation){resolve();return;}
   const elapsed=Math.min(duration,now-began),t=duration?elapsed/duration:1;
   const progress=journey.position(elapsed);
   root.style.setProperty('--anchor-arrival-progress',String(journey.fade(elapsed)));
   scrollTo({top:start+(destination-start)*progress,behavior:'instant'});
   if(t<1)requestAnimationFrame(tick);else resolve();
  }requestAnimationFrame(tick);});
  if(token!==generation)return;
  window.workshopStickyControls?.configure({pinned:true});
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
 window.workshopResourceAnchors={navigate,resetCopy:copy.resetCopy};
}
export function withResourceAnchors(html){
 for(const [index,anchor] of resourceAnchors.entries()){
  const text='Step '+(index+1);
  html=html.replace(`aria-labelledby="step-${index+1}"`,`aria-labelledby="resource-step-${index+1}"`);
  html=html.replace(`<h2 class="step-title" id="step-${index+1}">${text}</h2>`,`<h2 class="step-title" id="resource-step-${index+1}"><button type="button" class="step-anchor" data-anchor="${anchor}" aria-label="Copy Link to ${text}"><span class="link-tail"><span class="step-anchor-label">${text}</span><span class="step-anchor-icon text-link-slot" title="Copy Link">${textIcon('hash-modified','step-anchor-hash','step-anchor-hash')}${textIcon('check','step-anchor-success','step-anchor-success')}${textIcon('x','step-anchor-failure','step-anchor-failure')}</span></span></button></h2>`);
 }
 const initial=`(()=>{const h=location.hash.slice(1);if(${JSON.stringify(resourceAnchors)}.includes(h)||/^step-[1-3]$/.test(h)){window.workshopInitialAnchor=location.hash;document.documentElement.dataset.resourceAnchorArriving='';history.replaceState(history.state,'',location.pathname+location.search);}})();`;
 return html.replace('</head>',`<style>${resourceAnchorCSS}</style><script nonce="__NONCE__">${initial}</script></head>`).replace('</body>',`<script nonce="__NONCE__">(${initResourceAnchors.toString()})(${JSON.stringify(resourceAnchors)},${JSON.stringify(anchorCopyTiming)},${headingMetrics.toString()},${copyFrames.toString()},${resourceAnchorGap.toString()},${installAnchorCopy.toString()},${anchorJourney.toString()});</script></body>`);
}

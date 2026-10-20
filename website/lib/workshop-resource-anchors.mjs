import {headingMetrics} from './workshop-heading-metrics.mjs';
import {__iconNode as hash} from '../node_modules/lucide-react/dist/esm/icons/hash.mjs';
import {__iconNode as check} from '../node_modules/lucide-react/dist/esm/icons/check.mjs';
import {__iconNode as cross} from '../node_modules/lucide-react/dist/esm/icons/x.mjs';
import {copyTiming} from './workshop-copy-timing.mjs';
export const resourceAnchors = ['step-1-node-js-setup','step-2-system-blueprint-creator','step-3-system-build-assistant'];
const svg=(nodes,name,state)=>`<svg class="step-anchor-${state}" data-icon-provider="lucide" data-icon-name="${name}" data-icon-use="step-anchor-${state}" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${nodes.map(([tag,attrs])=>`<${tag} ${Object.entries(attrs).filter(([key])=>key!=='key').map(([key,value])=>`${key}="${value}"`).join(' ')}></${tag}>`).join('')}</svg>`;
export const resourceAnchorCSS=`
.step-anchor{position:relative;display:inline-block;padding:0;border:0;border-radius:5px;background:transparent;color:inherit;font:inherit;letter-spacing:inherit;line-height:inherit;text-align:inherit;vertical-align:top;isolation:isolate;cursor:pointer}
.step-anchor,.step-anchor *{cursor:pointer!important;user-select:none}
.step-anchor::before{content:"";position:absolute;inset:0 -3px;border-radius:5px;z-index:-1;transition:background-color 160ms cubic-bezier(.2,0,.2,1)}
.step-anchor:is(:hover,[data-anchor-preview])::before{background:var(--link-hover-bg)}
.step-anchor-icon{position:absolute;right:100%;top:calc(var(--step-cap-centre,19px) - 8px);height:16px;width:24px;display:flex;align-items:center;justify-content:flex-start;color:var(--agent-accent);opacity:0;transition:opacity 160ms cubic-bezier(.2,0,.2,1)}
.step-row:nth-child(even) .step-anchor-icon{left:100%;right:auto;justify-content:flex-end}
.step-anchor:is(:hover,[data-result],[data-anchor-preview]) .step-anchor-icon,:root[data-focus-input="keyboard"] .step-anchor:focus .step-anchor-icon{opacity:1}
.step-anchor-icon svg{position:absolute;width:16px;height:16px;opacity:0;transition:opacity 160ms cubic-bezier(.2,0,.2,1)}
.step-anchor:not([data-result]) .step-anchor-hash{opacity:1}
.step-anchor[data-result="success"] .step-anchor-success{opacity:1;color:var(--success)}
.step-anchor[data-result="failure"] .step-anchor-failure{opacity:1;color:var(--error)}
.step-anchor[data-cooling] .step-anchor-icon svg{opacity:0;transition-duration:${copyTiming.fade}ms;transition-timing-function:ease-in-out}
#workshop-content{padding-bottom:calc(40px + var(--anchor-scroll-room,0px))}
.step-row{transition:opacity 650ms cubic-bezier(.2,0,.2,1)}
.step-row[data-anchor-hidden]{opacity:0;pointer-events:none}
html[data-resource-anchor-arriving] .step-row>.step-marker,html[data-resource-anchor-arriving] .step-row>article{opacity:1!important;transform:none!important;transition:none!important}
.step-anchor-announcement{position:fixed;top:0;left:0;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:660px){.step-row:nth-child(even) .step-anchor-icon{left:auto;right:100%;justify-content:flex-start}}
@media(prefers-reduced-motion:reduce){.step-anchor::before,.step-anchor-icon,.step-anchor-icon svg,.step-row{transition:none!important}}
`;
export function initResourceAnchors(anchors,timing,measureHeading){
 const root=document.documentElement, rows=[...document.querySelectorAll('.step-row')];
 const motion=matchMedia('(prefers-reduced-motion:reduce)');
 const canonical=fragment=>{let value;try{value=decodeURIComponent(fragment.replace(/^#/,''));}catch{return null;}return anchors.includes(value)?value:anchors[/^step-([1-3])$/.exec(value)?.[1]-1]||null;};
 const status=document.createElement('span');status.className='step-anchor-announcement';status.setAttribute('role','status');document.body.append(status);
 const feedback=new WeakMap();
 const align=()=>document.querySelectorAll('.step-anchor').forEach(button=>button.style.setProperty('--step-cap-centre',measureHeading(button).centre+'px'));
 document.fonts.ready.then(align);window.addEventListener('resize',align);align();
 for(const button of document.querySelectorAll('.step-anchor')){
  button.addEventListener('click',async()=>{
   const previous=feedback.get(button);if(previous){clearTimeout(previous.hold);clearTimeout(previous.fade);}
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
   state.hold=setTimeout(()=>{button.setAttribute('data-cooling','');state.fade=setTimeout(()=>{button.removeAttribute('data-result');button.removeAttribute('data-cooling');button.querySelector('.step-anchor-icon').title='Copy Link';status.textContent='';feedback.delete(button);},motion.matches?0:timing.fade);},success?timing.success:timing.failure);
  });
 }
 let generation=0,arriving=false,active=false,lastY=scrollY;
 const restore=()=>{for(const row of rows){row.removeAttribute('data-anchor-hidden');row.inert=false;}};
 function release(){active=false;restore();window.workshopStickyControls?.configure({pinned:false});window.workshopBrandHalo?.configure({hold:false});}
 function cancel(){if(!arriving)return;generation++;arriving=false;delete root.dataset.resourceAnchorArriving;release();}
 window.addEventListener('wheel',cancel,{passive:true});window.addEventListener('touchstart',cancel,{passive:true});
 window.addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key)&&!event.target.matches('input,textarea,button'))cancel();});
 window.addEventListener('scroll',()=>{const y=scrollY;if(!arriving&&active&&y<lastY-.5)release();lastY=y;},{passive:true});
 const frame=()=>new Promise(resolve=>requestAnimationFrame(resolve));
 async function navigate(fragment){
  const anchor=canonical(fragment);if(!anchor){cancel();release();return;}
  const token=++generation;arriving=true;active=false;restore();root.dataset.resourceAnchorArriving='';
  rows.forEach(row=>row.classList.add('is-revealed'));
  await document.fonts.ready;await frame();await frame();if(token!==generation)return;
  window.workshopStickyControls?.configure({pinned:true});window.workshopBrandHalo?.configure({hold:true});
  await frame();if(token!==generation)return;
  const target=document.querySelector('.step-anchor[data-anchor="'+anchor+'"]');
  const textTop=target.getBoundingClientRect().top+measureHeading(target,target.querySelector('.step-anchor-label').textContent).top;
  const controls=[...document.querySelectorAll('[data-sticky-control]')];
  const bottom=Math.max(...controls.map(control=>control.getBoundingClientRect().bottom));
  const destination=Math.max(0,scrollY+textTop-bottom-60);
  const existingRoom=parseFloat(root.style.getPropertyValue('--anchor-scroll-room'))||0;
  const extra=existingRoom+Math.max(0,Math.ceil(destination-(document.documentElement.scrollHeight-innerHeight)));
  root.style.setProperty('--anchor-scroll-room',extra+'px');
  const start=scrollY,began=performance.now(),duration=motion.matches?0:800;
  await new Promise(resolve=>{function tick(now){if(token!==generation){resolve();return;}const t=duration?Math.min(1,(now-began)/duration):1;const ease=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;scrollTo({top:start+(destination-start)*ease,behavior:'instant'});if(t<1)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});
  if(token!==generation)return;
  history.replaceState(history.state,'',location.pathname+location.search+'#'+anchor);
  await frame();if(token!==generation)return;
  const index=anchors.indexOf(anchor);for(const row of rows.slice(0,index)){row.setAttribute('data-anchor-hidden','');row.inert=true;}
  delete root.dataset.resourceAnchorArriving;arriving=false;active=true;lastY=scrollY;
 }
 // Canonical targets are data attributes, so the browser cannot jump before our
 // measured scroll. Use separate internal heading IDs for accessibility, including short aliases.
 window.addEventListener('hashchange',()=>navigate(location.hash));
 const initial=window.workshopInitialAnchor;
 if(initial){const start=()=>navigate(initial);if(document.readyState==='complete')start();else window.addEventListener('load',start,{once:true});}
 window.workshopResourceAnchors={navigate,resetCopy(button){const state=feedback.get(button);if(state){clearTimeout(state.hold);clearTimeout(state.fade);}feedback.delete(button);button.removeAttribute('data-result');button.removeAttribute('data-cooling');button.querySelector('.step-anchor-icon').title='Copy Link';status.textContent='';}};
}
export function withResourceAnchors(html){
 for(const [index,anchor] of resourceAnchors.entries()){
  const text='Step '+(index+1);
  html=html.replace(`aria-labelledby="step-${index+1}"`,`aria-labelledby="resource-step-${index+1}"`);
  html=html.replace(`<h2 class="step-title" id="step-${index+1}">${text}</h2>`,`<h2 class="step-title" id="resource-step-${index+1}"><button type="button" class="step-anchor" data-anchor="${anchor}" aria-label="Copy Link to ${text}"><span class="step-anchor-label">${text}</span><span class="step-anchor-icon" title="Copy Link">${svg(hash,'hash','hash')}${svg(check,'check','success')}${svg(cross,'x','failure')}</span></button></h2>`);
 }
 const initial=`(()=>{const h=location.hash.slice(1);if(${JSON.stringify(resourceAnchors)}.includes(h)||/^step-[1-3]$/.test(h)){window.workshopInitialAnchor=location.hash;document.documentElement.dataset.resourceAnchorArriving='';history.replaceState(history.state,'',location.pathname+location.search);}})();`;
 return html.replace('</head>',`<style>${resourceAnchorCSS}</style><script nonce="__NONCE__">${initial}</script></head>`).replace('</body>',`<script nonce="__NONCE__">(${initResourceAnchors.toString()})(${JSON.stringify(resourceAnchors)},${JSON.stringify(copyTiming)},${headingMetrics.toString()});</script></body>`);
}

// The original controls remain the only interactive elements in every state.
export const stickyCSS = `
.sticky-control-slot { display:inline-flex; flex:none; vertical-align:middle; }
.page-toolbar { min-height:54px; }
[data-sticky-control] { --sticky-shadow:0; }
[data-sticky-control]::after { content:""; position:absolute; inset:0; border-radius:inherit; box-shadow:var(--floating-control-shadow); opacity:var(--sticky-shadow); pointer-events:none; z-index:-1; }
[data-sticky-control][data-locked] { position:fixed; z-index:30; }
.controls .toggle[data-measuring] button,.controls .toggle[data-measuring] button span { transition:none!important; }
.controls .toggle button span { display:inline-block; max-width:110px; overflow:hidden; white-space:nowrap; opacity:1; transition:max-width 340ms cubic-bezier(.22,1.35,.36,1),opacity 160ms; }
.controls .toggle button { transition:padding 340ms cubic-bezier(.22,1.35,.36,1),gap 340ms cubic-bezier(.22,1.35,.36,1); }
.controls .toggle[data-compact] button { padding:10px 12px; gap:0; }
.controls .toggle[data-compact] button span { max-width:0; opacity:0; }
/* Fast flings must finish the width collapse before sharing the theme row. */
.controls .toggle[data-collision] button,.controls .toggle[data-collision] button span { transition:none; }
@media(prefers-reduced-motion:reduce) { .controls .toggle button,.controls .toggle button span { transition:none; } }
`;
export function initStickyControls() {
 const theme=document.querySelector('.page-toolbar .theme-toggle');
 const agent=document.querySelector('.controls .toggle');
 if(!theme||!agent)return;
 const mobile=matchMedia('(max-width:660px)'),motion=matchMedia('(prefers-reduced-motion:reduce)');
 const items=[theme,agent].map(control=>{
  const slot=document.createElement('span');slot.className='sticky-control-slot';
  control.before(slot);slot.append(control);control.dataset.stickyControl='';
  return {control,slot,width:0,height:0};
 });
 for(const button of agent.querySelectorAll('button'))button.setAttribute('aria-label',button.querySelector('span').textContent.trim());
 let frame=0,compact=false,animation;
 function measure(){
  agent.setAttribute('data-measuring','');
  for(const item of items){const {control,slot}=item;control.removeAttribute('data-locked');control.removeAttribute('data-compact');control.style.removeProperty('top');control.style.removeProperty('left');slot.style.width='';slot.style.height='';const r=control.getBoundingClientRect();item.width=r.width;item.height=r.height;slot.style.height=r.height+'px';}
  agent.toggleAttribute('data-compact',compact);void agent.offsetWidth;agent.removeAttribute('data-measuring');update();
 }
 function update(){
  frame=0;
  const inset=Math.max(16,parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sticky-safe-top'))||0);
  const agentBox=items[1].slot.getBoundingClientRect();
  const shouldCompact=mobile.matches&&agentBox.top<inset+items[0].height+12;
  if(shouldCompact)items[1].slot.style.width=items[1].width+'px';
  agent.toggleAttribute('data-collision',mobile.matches&&agentBox.top<inset+items[0].height+4);
  if(shouldCompact!==compact){compact=shouldCompact;agent.toggleAttribute('data-compact',compact);animation?.cancel();if(!motion.matches)animation=agent.animate([{scale:'1 1'},{scale:'.96 1.06',offset:.45},{scale:'1.025 .98',offset:.75},{scale:'1 1'}],{duration:420,easing:'ease-out'});}
  items.forEach((item,index)=>{
   const {control,slot}=item,r=slot.getBoundingClientRect(),locked=r.top<=inset;
   slot.style.width=(locked||(index===1&&compact))?item.width+'px':'';
   control.toggleAttribute('data-locked',locked);
   // Compact before the controls share a row, keeping the same real buttons.
   if(index===1&&compact&&!locked){control.style.position='relative';control.style.left=(document.querySelector('.page-toolbar').getBoundingClientRect().left-r.left)+'px';}
   else {control.style.removeProperty('position');control.style.left=locked?((index===1&&mobile.matches?document.querySelector('.page-toolbar').getBoundingClientRect().left:r.left))+'px':'';}
   control.style.top=locked?inset+'px':'';
   control.style.setProperty('--sticky-shadow',String(Math.min(1,Math.max(0,(inset-r.top)/48))));
  });
 }
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
 window.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('resize',measure);
 window.addEventListener('pageshow',measure);
 motion.addEventListener('change',()=>{if(motion.matches)animation?.cancel();});
 document.fonts.ready.then(measure);measure();
}
export function withStickyControls(html){return html.replace('</head>',`<style>:root{--sticky-safe-top:env(safe-area-inset-top,0px)}${stickyCSS}</style></head>`).replace('</body>',`<script nonce="__NONCE__">(${initStickyControls.toString()})();</script></body>`);}

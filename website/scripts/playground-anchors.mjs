import {anchorCopyCSS,installAnchorCopy} from '../lib/workshop-anchor-copy.mjs';
import {anchorJourney} from '../lib/workshop-anchor-motion.mjs';
import {anchorCopyTiming,copyFrames} from '../lib/workshop-copy-timing.mjs';
import {textIcon,textIconGap} from '../lib/workshop-link-icons.mjs';
export const playgroundAnchorCSS=`
${anchorCopyCSS}
.section-heading .heading-anchor{display:inline;outline-offset:3px;white-space:normal;overflow-wrap:normal}
.section-heading .heading-anchor:focus{outline:none}
:root[data-focus-input=keyboard] .section-heading .heading-anchor:focus{outline:3px solid var(--icon-ink)}
.section-heading :is(h2,h3){cursor:pointer}
.heading-anchor[data-icon-leading]>.link-tail{display:inline-flex;flex-direction:row-reverse;align-items:baseline}
.heading-anchor[data-icon-leading] .step-anchor-icon{margin-left:0;margin-right:${textIconGap}}
[data-playground-anchor-leaving]{transition:opacity 600ms cubic-bezier(.2,0,.2,1)}
[data-playground-anchor-hidden]{opacity:0!important;pointer-events:none}
html[data-playground-anchor-arriving] [data-playground-anchor-leaving]{opacity:calc(1 - var(--playground-anchor-progress,0));transition:none}
html[data-playground-disclosure-settling]{overflow-anchor:none}
html[data-playground-anchor-arriving] .toolbar,html[data-playground-anchor-arriving] [data-panel]{overflow-anchor:none}
.playground-anchor-room{height:var(--playground-anchor-room,0px);pointer-events:none}
@media(prefers-reduced-motion:reduce){[data-playground-anchor-leaving]{transition:none}}
`;
const iconSlot='<span class="step-anchor-icon text-link-slot" title="Copy Link">'+textIcon('hash-modified','playground-anchor-copy','step-anchor-hash')+textIcon('check','playground-anchor-success','step-anchor-success')+textIcon('x','playground-anchor-failure','step-anchor-failure')+'</span>';
export function initPlaygroundAnchors({select,tabPaths,sticky,scheduleCaps,installCopy,timing,frames,journeyFor,slotHTML}){
 const root=document.documentElement,motion=matchMedia('(prefers-reduced-motion:reduce)'),entries=[],byURL=new Map();
 const slug=text=>text.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 for(const panel of document.querySelectorAll('[data-panel]>.panel,.url-subsection')){
  const row=panel.querySelector(':scope>.section-heading'),title=row?.querySelector('h2,h3');if(!title)continue;
  const label=title.querySelector(':scope>span');if(!label)continue;
  const text=label.textContent.trim(),tab=panel.closest('[data-panel]').dataset.panel,path='/component-playground/'+(tabPaths[tab]||tab),id=slug(text);
  if(byURL.has(path+'#'+id))throw Error('Duplicate Playground anchor: '+path+'#'+id);
  const copy=document.createElement('span');copy.className='step-anchor heading-anchor';copy.role='button';copy.tabIndex=0;copy.dataset.anchor=id;copy.setAttribute('aria-label','Copy Link to '+text);
  // No native fragment ID: custom navigation owns the exact card landing, not
  // the browser's earlier text-box jump while frames are still loading.
  const words=text.match(/^(.*\s)?(\S+)$/),first=text.match(/^(\S+)([\s\S]*)$/),tail=document.createElement('span');tail.className='link-tail';
  const last=document.createElement('span');last.className='step-anchor-label';tail.append(last);tail.insertAdjacentHTML('beforeend',slotHTML);copy.append(tail);label.replaceChildren(copy);
  const alignSide=()=>{
   const leading=getComputedStyle(title).textAlign==='right';
   if(copy.dataset.iconSide===(leading?'left':'right'))return;
   copy.dataset.iconSide=leading?'left':'right';copy.toggleAttribute('data-icon-leading',leading);
   last.textContent=leading?first[1]:words[2];copy.replaceChildren(...(leading?[tail,document.createTextNode(first[2])]:words[1]?[document.createTextNode(words[1]),tail]:[tail]));
  };
  alignSide();window.addEventListener('resize',alignSide);
  title.style.flex='0 1 auto';title.style.width='max-content';title.style.maxWidth='100%';
  title.addEventListener('pointerenter',()=>copy.setAttribute('data-anchor-preview',''));
  title.addEventListener('pointerleave',()=>copy.removeAttribute('data-anchor-preview'));
  title.addEventListener('click',event=>{if(!copy.contains(event.target)){copy.focus({preventScroll:true});copy.click();}});
  const toggle=row.querySelector('.section-collapse');
  const side=event=>{const edge=title.getBoundingClientRect().right;return event.clientX<=edge?'copy':event.clientX<edge+20?'gap':'toggle';};
  const clearHover=()=>{copy.removeAttribute('data-anchor-preview');toggle?.removeAttribute('data-region-hover');row.removeAttribute('data-collapse-hover');row.style.cursor='';};
  row.addEventListener('pointermove',event=>{if(panel.classList.contains('is-expanded')||event.target.closest('button,input,label,select,a,summary')){clearHover();return;}const region=side(event);copy.toggleAttribute('data-anchor-preview',region==='copy');toggle?.toggleAttribute('data-region-hover',region==='toggle');row.toggleAttribute('data-collapse-hover',region==='toggle');row.style.cursor=region==='gap'?'default':'pointer';});
  row.addEventListener('pointerleave',clearHover);
  row.addEventListener('click',event=>{if(panel.classList.contains('is-expanded')||title.contains(event.target)||event.target.closest('button,input,label,select,a,summary'))return;if(side(event)==='copy'){copy.focus({preventScroll:true});copy.click();}else if(side(event)==='toggle')toggle?.click();});
  copy.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();copy.click();}});
  const entry={panel,row,title,text,tab,path,id,copy,target:title.tagName==='H3'?row:panel};entries.push(entry);byURL.set(path+'#'+id,entry);
 }
 const urlFor=entry=>{const url=new URL(entry.path,location.origin);url.search=location.search;url.searchParams.delete('login');url.hash=entry.id;return url;};
 const feedback=installCopy(entries.map(e=>e.copy),button=>urlFor(entries.find(e=>e.copy===button)),timing,frames);
 const room=document.createElement('div');room.className='playground-anchor-room';room.setAttribute('aria-hidden','true');document.body.append(room);
 const resolve=url=>{let hash;try{hash=decodeURIComponent(url.hash.slice(1));}catch{return null;}return byURL.get(url.pathname.replace(/\/$/,'')+'#'+hash)||null;};
 let generation=0,arriving=false,active=null,hidden=[],lastY=scrollY,focusRoute=null,writing=false,intercepted=false,correcting=false,trimRoom=false,followLayout=false;
 const frame=()=>new Promise(r=>requestAnimationFrame(r));
 function restore(){for(const el of hidden){el.removeAttribute('data-playground-anchor-hidden');el.inert=false;setTimeout(()=>{if(!hidden.includes(el))el.removeAttribute('data-playground-anchor-leaving');},motion.matches?0:600);}hidden=[];}
 function trim(){const amount=parseFloat(root.style.getPropertyValue('--playground-anchor-room'))||0;if(amount){const naturalMax=root.scrollHeight-innerHeight-amount;root.style.setProperty('--playground-anchor-room',Math.max(0,Math.ceil(scrollY-naturalMax))+'px');}}
 function leave(){root.removeAttribute('data-playground-disclosure-settling');generation++;arriving=false;active=null;followLayout=false;focusRoute=null;delete root.dataset.playgroundAnchorArriving;restore();trimRoom=true;trim();}
 function prepareDisclosure(panel){
  const y=scrollY,amount=parseFloat(root.style.getPropertyValue('--playground-anchor-room'))||0;
  // Reserve space before any layout contraction, then retain only the amount
  // needed to keep the reader's viewport stable. Trim on subsequent scrolling.
  if(amount)root.style.setProperty('--playground-anchor-room',(amount+panel.getBoundingClientRect().height)+'px');
  leave();trimRoom=false;root.setAttribute('data-playground-disclosure-settling','');
  if(amount)root.style.setProperty('--playground-anchor-room',(amount+panel.getBoundingClientRect().height)+'px');
  return ()=>{if(amount){correcting=true;const roomSize=parseFloat(root.style.getPropertyValue('--playground-anchor-room'))||0,naturalMax=root.scrollHeight-innerHeight-roomSize;root.style.setProperty('--playground-anchor-room',Math.max(0,Math.ceil(y-naturalMax))+'px');scrollTo({top:y,behavior:'instant'});sticky.update();lastY=scrollY;correcting=false;}const token=generation;setTimeout(()=>{if(token===generation){trimRoom=true;root.removeAttribute('data-playground-disclosure-settling');}},200);};
 }
 function beforeTarget(entry){
  const result=[],parent=entry.panel.closest('[data-panel]'),card=entry.panel.closest('[data-panel]>.panel');
  for(const el of parent.children){if(el===card)break;if(el.matches('.panel'))result.push(el);}
  if(entry.panel!==card){for(const el of card.children){if(el===entry.panel)break;if(!el.classList.contains('section-heading'))result.push(el);}}
  return result;
 }
 function tabButton(entry){return document.querySelector('[data-tab="'+entry.tab+'"]');}
 function stickyBottom(){sticky.update();return document.querySelector('.tab-scroll-shell').getBoundingClientRect().bottom;}
 function destination(entry){
  // Measure the actual settled pinned configuration without painting an
  // intermediate scroll position. This reuses all responsive sticky rules.
  const start=scrollY,probe=entry.target.getBoundingClientRect().top+start;
  correcting=true;scrollTo({top:probe,behavior:'instant'});sticky.update();
  const y=scrollY+entry.target.getBoundingClientRect().top-stickyBottom()-16;
  scrollTo({top:start,behavior:'instant'});sticky.update();correcting=false;return Math.ceil(y);
 }
 async function settle(entry,token){
  await document.fonts.ready;
  let signature='',stableSince=performance.now(),start=performance.now();
  while(token===generation){
   scheduleCaps();await frame();
   const busy=[...document.querySelectorAll('[data-panel="'+entry.tab+'"] iframe')].some(f=>f.getAttribute('aria-busy')==='true');
   const next=entries.filter(e=>e.tab===entry.tab).map(e=>Math.round(e.target.getBoundingClientRect().top+scrollY)).join(',')+':'+Math.ceil(document.querySelector('.tab-scroll-shell').getBoundingClientRect().height);
   if(next!==signature||busy){signature=next;stableSince=performance.now();}
   if(performance.now()-stableSince>180)return;
   // A failed specimen must not make navigation impossible; later resizes are
   // corrected while the anchored reader has not started scrolling.
   if(performance.now()-start>12000)return;
  }
 }
 function writeURL(url){if(location.href===url.href)return;writing=true;try{history.replaceState(history.state,'',url);}finally{writing=false;}}
 async function navigate(input=location.href,{rewrite=true}={}){
  const url=new URL(input,location.href),entry=resolve(url);if(!entry){leave();return false;}
  const keepHeader=entry.tab!==document.querySelector('[data-tab][aria-selected=true]')?.dataset.tab&&!document.querySelector('.tab-scroll-shell').classList.contains('is-pinned'),savedY=scrollY;
  leave();document.querySelectorAll('[data-playground-anchor-leaving]').forEach(el=>el.removeAttribute('data-playground-anchor-leaving'));const token=++generation;arriving=true;trimRoom=false;root.dataset.playgroundAnchorArriving='';root.style.setProperty('--playground-anchor-progress','0');
  // Exit an expanded specimen before addressing its normal page section.
  for(const dialog of document.querySelectorAll('.preview-dialog.is-expanded'))dialog.querySelector('.preview-expand')?.click();
  select(tabButton(entry),false);
  entry.panel.closest('[data-panel]>.panel')?.workshopSetCollapsed?.(false);entry.panel.workshopSetCollapsed?.(false);
  await settle(entry,token);if(token!==generation)return false;
  if(keepHeader){delete root.dataset.playgroundAnchorArriving;arriving=false;scrollTo({top:savedY,behavior:'instant'});sticky.update();if(rewrite)writeURL(urlFor(entry));return true;}
  hidden=beforeTarget(entry);for(const el of hidden){el.setAttribute('data-playground-anchor-leaving','');el.inert=false;}
  const start=scrollY;
  // Ensure the probe and final destination are reachable near the footer.
  root.style.setProperty('--playground-anchor-room',innerHeight+'px');
  let end=destination(entry);end=Math.max(0,end);
  const amount=parseFloat(root.style.getPropertyValue('--playground-anchor-room'))||0,naturalMax=root.scrollHeight-innerHeight-amount;
  root.style.setProperty('--playground-anchor-room',Math.max(0,Math.ceil(end-naturalMax))+'px');
  const journey=journeyFor(end-start,motion.matches),began=performance.now();root.dataset.playgroundAnchorDuration=String(journey.duration);
  await new Promise(done=>{function tick(now){if(token!==generation){done();return;}const elapsed=Math.min(journey.duration,now-began);root.style.setProperty('--playground-anchor-progress',String(journey.fade(elapsed)));scrollTo({top:start+(end-start)*journey.position(elapsed),behavior:'instant'});sticky.update();if(elapsed<journey.duration)requestAnimationFrame(tick);else done();}requestAnimationFrame(tick);});
  if(token!==generation)return false;
  // Final whole-pixel correction uses the now-pinned header, not stale sizes.
  correcting=true;scrollTo({top:Math.ceil(scrollY+entry.target.getBoundingClientRect().top-stickyBottom()-16),behavior:'instant'});sticky.update();correcting=false;
  hidden.forEach(el=>{el.setAttribute('data-playground-anchor-hidden','');el.inert=true;});
  delete root.dataset.playgroundAnchorArriving;arriving=false;active=entry;followLayout=true;lastY=scrollY;root.dataset.playgroundAnchorLanded=entry.id;
  if(rewrite)writeURL(urlFor(entry));
  const agent=document.querySelector('#agent input:checked'),theme=document.querySelector('#theme input:checked');
  focusRoute=innerWidth>660?[agent,theme,entry.copy]:[document.getElementById('style-options'),tabButton(entry),entry.copy];
  focusRoute=focusRoute.filter(Boolean);entry.title.setAttribute('tabindex','-1');entry.title.focus({preventScroll:true});return true;
 }
 window.addEventListener('wheel',()=>{followLayout=false;if(arriving)leave();},{passive:true});window.addEventListener('touchstart',()=>{followLayout=false;if(arriving)leave();},{passive:true});
 window.addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key)&&!event.target.closest('input,button,[role=button]')){followLayout=false;if(arriving)leave();}});
 window.addEventListener('scroll',()=>{if(correcting)return;if(!arriving&&active&&scrollY<lastY-.5)leave();if(!arriving&&trimRoom)trim();lastY=scrollY;},{passive:true});
 document.addEventListener('keydown',event=>{if(event.key!=='Tab'||!focusRoute)return;if(event.shiftKey){focusRoute=null;return;}const next=focusRoute.shift();if(next){event.preventDefault();next.focus({preventScroll:true});}if(!focusRoute.length)focusRoute=null;},true);
 document.addEventListener('pointerdown',()=>{focusRoute=null;},{passive:true});
 window.navigation?.addEventListener('navigate',event=>{const url=new URL(event.destination.url);if(writing||!event.canIntercept||!event.destination.sameDocument||!resolve(url))return;if(url.pathname===location.pathname&&url.hash===location.hash&&url.search!==location.search)return;intercepted=true;event.intercept({focusReset:'manual',scroll:'manual',handler:async()=>{try{await navigate(url.href,{rewrite:false});}finally{intercepted=false;}}});});
 let pending=0;const historyArrival=()=>{if(intercepted||writing)return;cancelAnimationFrame(pending);pending=requestAnimationFrame(()=>navigate(location.href));};
 window.addEventListener('hashchange',historyArrival);window.addEventListener('popstate',historyArrival);window.addEventListener('pageshow',e=>{if(e.persisted)historyArrival();});
 let resizeFrame=0;const observe=new ResizeObserver(()=>{if(!active||!followLayout||arriving||resizeFrame)return;resizeFrame=requestAnimationFrame(()=>{resizeFrame=0;if(!active||!followLayout)return;correcting=true;const delta=active.target.getBoundingClientRect().top-stickyBottom()-16;if(Math.abs(delta)>1){const extra=Math.max(0,scrollY+delta-(root.scrollHeight-innerHeight));if(extra)root.style.setProperty('--playground-anchor-room',(parseFloat(root.style.getPropertyValue('--playground-anchor-room'))||0)+extra+'px');scrollTo({top:Math.ceil(scrollY+delta),behavior:'instant'});sticky.update();lastY=scrollY;}correcting=false;});});
 for(const panel of document.querySelectorAll('[data-panel]>.panel'))observe.observe(panel);
 window.workshopPlaygroundAnchors={navigate,leave,prepareDisclosure,entries,resetCopy:feedback.resetCopy};
 const initial=window.workshopInitialPlaygroundURL||location.href;
 if(resolve(new URL(initial))){const start=()=>navigate(initial);if(document.readyState==='complete')start();else addEventListener('load',start,{once:true});}
 else if(window.workshopInitialPlaygroundURL)writeURL(new URL(initial));
}
export const playgroundAnchorScript=`(${initPlaygroundAnchors.toString()})({select:selectTab,tabPaths,sticky:{update:updateStickyControls},scheduleCaps:scheduleHeadingCaps,installCopy:${installAnchorCopy.toString()},timing:${JSON.stringify(anchorCopyTiming)},frames:${copyFrames.toString()},journeyFor:${anchorJourney.toString()},slotHTML:${JSON.stringify(iconSlot)}});`;
export const playgroundAnchorInitialScript=`if(location.hash){window.workshopInitialPlaygroundURL=location.href;history.replaceState(history.state,'',location.pathname+location.search);}`;

// Embedded in the authenticated Playground only; no app/session behaviour changes.
export function createPlaygroundScheduler({settings, specimenManifest, swatches}) {
 const frames=new Map([...document.querySelectorAll('iframe[data-srcdoc]')].map(frame=>[frame.id,{frame,ready:false,sent:'',applied:'',delivery:''}]));
 const panels=[...document.querySelectorAll('[data-panel]')];
 const catalogTabs=new Set(['typography','icons','errors','focus']);
 const catalogCache=new Map(), specimenCache=new Map(), visibleTabs=new Set();
 let active='components',revision=0,renderId=0,requestId=0,captureKey='',capturePending=false,specimenKey='',specimenPending=false;
 let idleTimer=0,idleHandle=0,hoverTimer=0,lastInput=performance.now(),pointerHeld=false,priorityTab=null;
 const quietMs=500,heldFrames=new Set();
 const $=id=>document.getElementById(id);
 const post=(id,data)=>{const entry=frames.get(id);if(entry?.ready)entry.frame.contentWindow.postMessage(data,'*');};
 const paletteKey=()=>JSON.stringify([settings().theme,settings().agent,settings().hover]);
 const typeKey=()=>JSON.stringify([paletteKey(),$('width').value,settings().state,settings().loginDestination]);
 const wanted=()=>JSON.stringify({...settings(),width:$('width').value});
 const contentKey=id=>['type-frame','focus-frame','icons-frame','errors-frame'].includes(id)?paletteKey()+(id==='type-frame'?typeKey():''):'';
 const tabFrames=tab=>[...$('panel-'+tab).querySelectorAll('iframe[data-srcdoc]')].map(f=>f.id);
 function dependencies(tab){return [...tabFrames(tab),...(catalogTabs.has(tab)?['icon-login-source','icon-resources-source']:[]),...(tab==='typography'?['login-frame','resources-frame']:[])];}
 function entrySettings(entry){
  const value=settings();
  // Background simulations stay stopped even when their settings are warmed.
  value.eggActive=active==='discovery';
  const extra={
   'login-frame':['state','loginDestination'], 'resources-frame':['copy'],
   'branding-frame':['copy'], 'discovery-frame':['egg','eggActive','perspective'],
   'blocks-frame':['blockDestination','review','strength','blur','dim'],
   'icons-frame':['iconFilter','sources']
  }[entry.frame.id]||[];
  return {guide:'settings',...Object.fromEntries(['theme','agent','hover',...extra].map(key=>[key,value[key]]))};
 }
 function ensure(id){
  const entry=frames.get(id);if(!entry)return false;
  const wrapper=entry.frame.closest('.frame-wrap');if(wrapper){wrapper.dataset.width=$('width').value;wrapper.style.setProperty('--frame-width',$('width').value+'px');}
  const content=contentKey(id);if(content&&entry.contentApplied!==content){entry.frame.style.visibility='hidden';entry.frame.setAttribute('aria-busy','true');}
  if(!entry.frame.hasAttribute('srcdoc')){
   entry.frame.style.visibility='hidden';entry.frame.setAttribute('aria-busy','true');
   entry.frame.srcdoc=entry.frame.dataset.srcdoc;
   return false;
  }
  if(!entry.ready)return false;
  const data=entrySettings(entry),signature=JSON.stringify(data);
  if(entry.sent!==signature){
   entry.sent=signature;entry.frame.style.visibility='hidden';entry.frame.setAttribute('aria-busy','true');
   entry.frame.contentWindow.postMessage({...data,revision:++revision},'*');
   entry.revision=revision;
  }
  return entry.applied===signature;
 }
 function deliver(tab){
  const key=paletteKey(),catalog=catalogCache.get(key),specimens=specimenCache.get(typeKey());
  for(const id of tabFrames(tab)){
   const entry=frames.get(id);if(!entry.ready||entry.applied!==entry.sent)continue;
   if(id==='type-frame'&&specimens&&entry.specimens!==specimens){for(const data of Object.values(specimens))post(id,data);entry.specimens=specimens;}
   if(!catalog)continue;
   if(entry.delivery!==catalog){
   if(id==='focus-frame'){const requestId=++renderId;for(const data of Object.values(catalog))post(id,{guide:'focus-catalog-data',requestId,page:data.page,focusItems:data.focusItems});}
   if(['icons-frame','errors-frame'].includes(id))for(const data of Object.values(catalog))post(id,data);
   if(id==='type-frame')for(const data of Object.values(catalog)){
    post(id,{guide:'typography-notice',item:data.noticeTypography});
    if(data.page==='resources')post(id,{guide:'typography-feedback',items:data.typographyFeedback,agents:data.agentTypography,buttons:data.buttonVariants});
    else {const wrong=data.errors.find(x=>x.state==='wrong');if(wrong)post(id,{guide:'typography-error',html:wrong.statusHtml});}
   }
   entry.delivery=catalog;
   }
   const content=contentKey(id);
   if(content&&(id!=='type-frame'||specimens)&&entry.contentSent!==content){entry.contentSent=content;post(id,{guide:'content-commit',key:content});}
  }
 }
 function requestData(tab){
  if(!catalogTabs.has(tab))return;
  const key=paletteKey();
  if(!catalogCache.has(key)&&(!capturePending||captureKey!==key)&&['icon-login-source','icon-resources-source'].every(id=>ensure(id))){
   captureKey=key;capturePending=true;const id=++requestId;
   for(const page of ['resources','login'])post('icon-'+page+'-source',{guide:'icon-catalog',page,requestId:id,settings:settings()});
  }
  const signature=typeKey();
  if(tab==='typography'&&!specimenCache.has(signature)&&(!specimenPending||specimenKey!==signature)&&['resources-frame','login-frame'].every(id=>ensure(id))){
   specimenKey=signature;specimenPending=true;
   for(const page of ['resources','login'])post(page+'-frame',{guide:'specimens',page,key:signature,selectors:specimenManifest.filter(x=>x[0]===page).map(x=>x[1])});
  }
  deliver(tab);
 }
 function prepare(tab,immediate=false){
  // One new document per idle slice; selected/intentional destinations take priority.
  for(const id of dependencies(tab)){
   const unloaded=!frames.get(id).frame.hasAttribute('srcdoc');ensure(id);
   if(unloaded&&!immediate)return false;
  }
  if(tab==='colours')swatches();
  requestData(tab);
  const done=dependencies(tab).every(id=>{const entry=frames.get(id);return entry.ready&&entry.sent===JSON.stringify(entrySettings(entry))&&entry.applied===entry.sent;})&&(!catalogTabs.has(tab)||catalogCache.has(paletteKey()))&&(tab!=='typography'||specimenCache.has(typeKey()));
  if(done)$('panel-'+tab).dataset.prepared=wanted();
  return done;
 }
 function pauseCaptures(paused){const value=paused&&!catalogTabs.has(active);for(const id of ['icon-login-source','icon-resources-source']){const entry=frames.get(id);if(entry.ready&&entry.pauseState!==value){entry.pauseState=value;post(id,{guide:'capture-pause',paused:value});}}}
 function cancelIdle(){clearTimeout(idleTimer);if(idleHandle){if(window.cancelIdleCallback)cancelIdleCallback(idleHandle);else clearTimeout(idleHandle);}idleHandle=0;}
 function idle(){
  idleHandle=0;
  if(document.hidden||pointerHeld||heldFrames.size||performance.now()-lastInput<quietMs){schedule();return;}
  pauseCaptures(false);
  const candidates=[priorityTab,...visibleTabs,...panels.map(p=>p.dataset.panel)].filter(Boolean);
  const next=candidates.find(tab=>tab!==active&&$('panel-'+tab).dataset.prepared!==wanted());
  if(next){prepare(next);schedule(80);}
 }
 function schedule(delay=quietMs){
  cancelIdle();if(document.hidden)return;
  idleTimer=setTimeout(()=>{
   if(pointerHeld||heldFrames.size||performance.now()-lastInput<quietMs){schedule();return;}
   idleHandle=window.requestIdleCallback?requestIdleCallback(deadline=>{if(deadline.timeRemaining()>8)idle();else schedule(80);}):setTimeout(idle,32);
  },delay);
 }
 function activity(){lastInput=performance.now();pauseCaptures(true);schedule();}
 function activate(tab){
  active=tab;priorityTab=null;activity();
  // Mask stale embedded colours before the caller unhides the destination panel.
  prepare(tab,true);
  post('discovery-frame',{guide:'egg-active',active:tab==='discovery'});
  for(const id of tabFrames(tab))post(id,{guide:'measure-reference'});
  schedule();
 }
 function sync(){
  const s=settings();document.documentElement.dataset.theme=s.theme;document.documentElement.dataset.selectedAgent=s.agent;
  $('discovery-frame').style.height=s.egg==='success'?'520px':'420px';
  activity();prepare(active,true);schedule();
 }
 const incomingCatalog={},incomingSpecimens={};
 function message(event){
  const entry=[...frames.values()].find(e=>e.frame.contentWindow===event.source);if(!entry)return false;
  const data=event.data;
  if(data?.guide==='interaction'){if(entry.frame.closest('.catalog-sources'))return true;if(data.released){pointerHeld=false;heldFrames.clear();}else if(data.held)heldFrames.add(entry.frame.id);else heldFrames.delete(entry.frame.id);activity();return true;}
  if(data?.guide==='ready'){
   entry.ready=true;entry.pauseState=undefined;entry.sent='';entry.applied='';entry.delivery='';entry.specimens=null;entry.contentSent='';entry.contentApplied='';
   ensure(entry.frame.id);post(entry.frame.id,{guide:'inspection',frozen:$('freeze-inspector').getAttribute('aria-pressed')==='true'});
   pauseCaptures(performance.now()-lastInput<quietMs);return true;
  }
  if(data?.guide==='settings-applied'){
   if(data.revision!==entry.revision)return true;
   entry.applied=entry.sent;if(!contentKey(entry.frame.id)||entry.contentApplied===contentKey(entry.frame.id)){entry.frame.style.visibility='';entry.frame.removeAttribute('aria-busy');}
   if(dependencies(active).includes(entry.frame.id))prepare(active,true);else schedule(80);
   return true;
  }
  if(data?.guide==='content-applied'){if(data.key===contentKey(entry.frame.id)&&data.key===entry.contentSent){entry.contentApplied=data.key;entry.frame.style.visibility='';entry.frame.removeAttribute('aria-busy');}return true;}
  if(data?.guide==='source-changed'){
   if(['login-frame','resources-frame'].includes(entry.frame.id)){specimenCache.clear();specimenPending=false;delete $('panel-typography').dataset.prepared;if(active==='typography')requestData(active);schedule();}
   return true;
  }
  if(data?.guide==='icon-catalog-data'){
   if(data.requestId!==requestId)return true;
   incomingCatalog[data.page]=data;
   if(['resources','login'].every(page=>incomingCatalog[page]?.requestId===requestId)){
    catalogCache.set(captureKey,{...incomingCatalog});capturePending=false;
    if(captureKey===paletteKey())requestData(active);
    schedule(80);
   }
   return true;
  }
  if(data?.guide==='focus-catalog-data')return true; // Commit a complete matching pair with the catalog.
  if(data?.guide==='specimen-data'){
   if(data.key!==specimenKey)return true;
   incomingSpecimens[data.page]=data;
   if(['resources','login'].every(page=>incomingSpecimens[page]?.key===specimenKey)){
    specimenCache.set(specimenKey,{...incomingSpecimens});specimenPending=false;deliver(active);schedule(80);
   }
   return true;
  }
  return false;
 }
 for(const type of ['pointermove','wheel','scroll','keydown','input'])document.addEventListener(type,activity,{capture:true,passive:true});
 document.addEventListener('pointerdown',()=>{pointerHeld=true;activity();},{capture:true,passive:true});
 for(const type of ['pointerup','pointercancel'])document.addEventListener(type,()=>{pointerHeld=false;heldFrames.clear();activity();},{capture:true,passive:true});
 window.addEventListener('blur',()=>{pointerHeld=false;heldFrames.clear();activity();});
 document.addEventListener('visibilitychange',()=>{cancelIdle();if(!document.hidden)schedule();});
 for(const button of document.querySelectorAll('[data-tab]')){
  const warm=()=>{priorityTab=button.dataset.tab;prepare(priorityTab,true);schedule();};
  button.addEventListener('pointerenter',event=>{if(event.pointerType==='touch')return;clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>{if(!pointerHeld&&!heldFrames.size)warm();},160);});
  button.addEventListener('pointerleave',()=>clearTimeout(hoverTimer));
  button.addEventListener('focus',warm);
 }
 if(window.IntersectionObserver){const observer=new IntersectionObserver(entries=>{for(const {target,isIntersecting} of entries){if(isIntersecting)visibleTabs.add(target.dataset.tab);else visibleTabs.delete(target.dataset.tab);}schedule();},{root:document.querySelector('[role=tablist]'),threshold:.75});document.querySelectorAll('[data-tab]').forEach(b=>observer.observe(b));}
 return {activate,sync,message,refreshSpecimens(){specimenCache.clear();specimenPending=false;if(active==='typography')requestData(active);schedule();},refreshIcons(){if(catalogTabs.has(active))requestData(active);},reset(){for(const entry of frames.values()){entry.ready=false;entry.sent='';entry.applied='';entry.delivery='';entry.frame.removeAttribute('srcdoc');}catalogCache.clear();specimenCache.clear();capturePending=false;specimenPending=false;requestId++;sync();}};
}

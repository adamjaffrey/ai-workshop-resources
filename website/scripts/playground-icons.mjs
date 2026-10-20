// Capture app specimens from isolated running frames, including their real state renderers.
export const iconCaptureScript = String.raw`
const unicodeNames={"©": "Copyright Sign", "⌘": "Place of Interest Sign", "✅": "White Heavy Check Mark", "✋": "Raised Hand", "❌": "Cross Mark", "➡": "Black Rightwards Arrow"};
function unicodeLabel(character){return (unicodeNames[character.replace('\uFE0F','')]||"Unicode Character")+" · U+"+character.codePointAt(0).toString(16).toUpperCase().padStart(4,"0");}
function sourceSelector(node){
 if(node.id)return '#'+CSS.escape(node.id);
 const parts=[];for(let el=node;el&&el!==document.body;el=el.parentElement){let part=el.tagName.toLowerCase();if(el.id){parts.unshift('#'+CSS.escape(el.id));break;}const siblings=[...el.parentElement.children].filter(n=>n.tagName===el.tagName);if(siblings.length>1)part+=':nth-of-type('+(siblings.indexOf(el)+1)+')';parts.unshift(part);}return parts.join(' > ');
}
function iconSnapshot(node,page,state,standalone=false){
 const container=standalone?node:node.closest('.toggle,.theme-toggle')||node.closest('button,.symbol,.password-field,.gate-error,.javascript-notice,.brand-mark')||node;
 const clone=container.cloneNode(true), originals=[container,...container.querySelectorAll('*')], copies=[clone,...clone.querySelectorAll('*')];
 originals.forEach((original,i)=>{const computed=getComputedStyle(original);for(const property of ['display','position','inset','z-index','box-sizing','width','height','min-width','max-width','min-height','max-height','margin','padding','border','border-radius','outline','outline-offset','background','color','font','letter-spacing','text-align','text-transform','text-decoration','white-space','overflow-wrap','word-break','vertical-align','flex','flex-direction','flex-wrap','align-items','justify-content','gap','grid-template-columns','grid-template-rows','place-items','opacity','visibility','overflow','box-shadow','filter','transform','transform-origin','fill','fill-rule','stroke','stroke-width','stroke-linecap','stroke-linejoin','animation-name','animation-duration','animation-timing-function','animation-iteration-count','--password-text'])copies[i].style.setProperty(property,computed.getPropertyValue(property));copies[i].removeAttribute('id');copies[i].removeAttribute('autofocus');if(original instanceof HTMLInputElement)copies[i].setAttribute('value',original.value);});
 copies[originals.indexOf(node)]?.setAttribute('data-icon-target','');clone.style.margin='0';clone.style.flexShrink='0';
 const c=getComputedStyle(node),r=node.getBoundingClientRect();
 return {usage:node.dataset.iconUse,officialName:node.dataset.iconName,provider:node.dataset.iconProvider,order:[...document.querySelectorAll('*')].indexOf(node),html:clone.outerHTML,svg:node.tagName.toLowerCase()==='svg'?node.outerHTML:null,label:node.querySelector('title')?.textContent||node.getAttribute('alt')||(node.closest('.brand-mark')?'Wavelength · Brand Image':''),page,state,selector:sourceSelector(node),width:parseFloat(c.width)||r.width,height:parseFloat(c.height)||r.height,colour:c.color,src:node.dataset.sourceAsset?decodeURIComponent(node.dataset.sourceAsset):node.getAttribute('src')};
}
// Simulated capture actions must not move the user's visible focus.
HTMLElement.prototype.focus=function(){};HTMLTextAreaElement.prototype.select=function(){};HTMLInputElement.prototype.select=function(){};
// Copy-failure selection is simulated too; native ranges can focus an iframe.
window.getSelection=()=>({removeAllRanges(){},addRange(){}});
function finishCaptureMotion(){document.body.offsetHeight;document.getAnimations().forEach(a=>{if(a.effect?.getTiming().iterations!==Infinity)try{a.finish();}catch{}});}
// MessageChannel yields are not subject to background iframe timer throttling.
const captureChannel=new MessageChannel(),captureTasks=[];
captureChannel.port1.onmessage=()=>captureTasks.shift()?.();
const yieldCapture=()=>new Promise(resolve=>{captureTasks.push(resolve);captureChannel.port2.postMessage(null);});
let capturingIcons=false,pendingIcons;
window.addEventListener('message',async event=>{
 if(event.source!==parent||event.data?.guide!=='icon-catalog')return;
 if(capturingIcons){pendingIcons=event.data;return;}capturingIcons=true;
 try{
 const requested=event.data.settings;if(requested){window.dispatchEvent(new StorageEvent('storage',{key:'workshop-colour-theme',newValue:requested.theme}));window.workshopAgent?.select(requested.agent);await yieldCapture();finishCaptureMotion();}
 const page=event.data.page,items=[],errors=[],typographyFeedback=[],agentTypography=[],buttonVariants=[],focusItems=[];
 const captureButton=(node,kind,state)=>{const c=getComputedStyle(node.querySelector('.copy-label')||node);buttonVariants.push({kind,state,html:iconSnapshot(node,page,state,true).html,typography:[c.fontFamily,c.fontSize,c.fontWeight,c.lineHeight,c.color]});};
 const captureFocus=(node,label,ring=true)=>{
  const root=node.closest('.password-field')||node.closest('.qr-card')||node.closest('.code-wrap')||node.closest('.segmented-toggle')||node.closest('.perspective')||node.closest('footer form[action="/auth/logout"]')||node;
  const clone=root.cloneNode(true),originals=[root,...root.querySelectorAll('*')],copies=[clone,...clone.querySelectorAll('*')];
  copies[originals.indexOf(node)].setAttribute('data-focus-target','');
  originals.forEach((n,i)=>{if(n instanceof HTMLInputElement)copies[i].setAttribute('value',n.value);});
  clone.style.maxWidth='100%';clone.style.width=root.getBoundingClientRect().width+'px';
  if(node.matches('.copy'))clone.style.position='relative';
  let html=clone.outerHTML;if(node.matches('footer form[action="/auth/logout"] button'))html='<footer class="focus-footer">'+html+'</footer>';if(page==='login')html='<div class="gate-panel '+document.getElementById('access-form').className+' focus-context">'+html+'</div>';
  const selection=getComputedStyle(node,'::selection');focusItems.push({page,label,ring,html,selector:sourceSelector(node),selection:[selection.backgroundColor,selection.color],selectable:node.matches('input,pre,.intro'),selectionText:node.matches('input')?'••••••••':node.textContent.trim().slice(0,90)});
 };
 const add=(node,state)=>{if(!node)throw Error('Missing icon source: '+page+' '+state);items.push(iconSnapshot(node,page,state));};
 const addError=(node,state)=>{if(!node)throw Error('Missing error source: '+page+' '+state);const item=iconSnapshot(node,page,state,true),template=document.createElement('template');template.innerHTML=node.matches('.gate-panel,.code-wrap,.perspective-dialog')?node.outerHTML:item.html;const root=template.content.firstElementChild;if(node.matches('.gate-panel')){root.querySelector('input').setAttribute('value',node.querySelector('input').value);}if(node.matches('.gate-panel'))root.classList.add('full-login-context');Object.assign(root.style,{position:node.matches('.qr-copy,.code-wrap')?'relative':'static',maxWidth:'100%',height:'auto',maxHeight:'none',margin:'0'});if(node.matches('.code-wrap'))root.style.width=item.width+'px';errors.push({...item,html:root.outerHTML,text:node.textContent.trim()});};
 if(page==='login'){
  for(const state of ['neutral','loading','success','wrong']){window.demoLogin(state);finishCaptureMotion();captureFocus(document.querySelector('#workshop-password'),'Password · '+({neutral:'Neutral',loading:'Checking',success:'Success',wrong:'Incorrect Password'}[state]));if(state==='neutral')captureFocus(document.querySelector('.gate-submit'),'Unlock Resources · Keyboard Focus');document.querySelectorAll('[data-input-icon],[data-status-icon]').forEach(node=>{if(!node.hasAttribute('hidden'))add(node,state);});}
  parent.postMessage({guide:'focus-catalog-data',requestId:event.data.requestId,page,focusItems},'*');
  for(const state of ['loading','success','empty','wrong','network','service','generic','limited','limitedLater','retryReady']){window.demoLogin(state);finishCaptureMotion();const status=document.getElementById('gate-error');addError(document.getElementById('access-form'),state);errors.at(-1).statusHtml=status.outerHTML;errors.at(-1).colour=getComputedStyle(status).color;}
  window.demoLogin('neutral');finishCaptureMotion();
 }else{
  for(const [selector,label,ring] of [['.intro','Body Text Selection',false],['pre','Prompt Text · Keyboard Focus',true],['.copy','Copy Prompt · Keyboard Focus',true],['.qr-copy','QR Link · Keyboard Focus',true],['footer form[action="/auth/logout"] button','Log Out · Keyboard Focus',true],['.theme-toggle [aria-pressed=true]','Colour Theme · Keyboard Focus',true],['.controls [aria-pressed=true]','Coding Agent · Keyboard Focus',true]])captureFocus(document.querySelector(selector),label,ring);
  parent.postMessage({guide:'focus-catalog-data',requestId:event.data.requestId,page,focusItems},'*');
  const savedTheme=document.documentElement.dataset.theme,savedAgent=window.workshopAgent.current;
  const theme=async value=>{window.dispatchEvent(new StorageEvent('storage',{key:'workshop-colour-theme',newValue:value}));await yieldCapture();finishCaptureMotion();};
  const agent=async value=>{window.workshopAgent.select(value);await yieldCapture();finishCaptureMotion();};
  const copy=async(button,success)=>{copyFailure=!success;button.click();await yieldCapture();finishCaptureMotion();};
  for(const button of document.querySelectorAll('.copy,.qr-copy'))setStatus(button,'');
  add(document.querySelector('.brand-mark img'),'Default');
  await theme('light');add(document.querySelector('[data-theme-choice=light] svg'),'Selected · Light Mode');
  await theme('dark');add(document.querySelector('[data-theme-choice=dark] svg'),'Selected · Dark Mode');await theme(savedTheme);
  const qr=document.querySelector('.qr-copy');
  add(qr?.querySelector('img'),'QR Code');
  if(qr){qr.setAttribute('data-feedback','');finishCaptureMotion();add(qr.querySelector('.copy-icon'),'QR · Copy Link');captureButton(qr,'qr','neutral');await copy(qr,true);add(qr.querySelector('.success-icon'),'QR · Link Copied');captureButton(qr,'qr','success');addError(qr,'QR Link Copy Success');await copy(qr,false);add(qr.querySelector('.error-icon'),'QR · Copy Failed');captureButton(qr,'qr','error');addError(qr,'QR Link Copy Failure');errors.at(-1).colour=getComputedStyle(qr.querySelector('.copy-content')).color;setStatus(qr,'');}
  await agent('codex');agentTypography.push({agent:'codex',html:iconSnapshot(document.querySelector('.controls .toggle'),page,'Codex Selected',true).html});add(document.querySelector('[data-agent=codex] svg'),'Selected · Codex');
  await agent('claude-code');agentTypography.push({agent:'claude-code',html:iconSnapshot(document.querySelector('.controls .toggle'),page,'Claude Code Selected',true).html});add(document.querySelector('[data-agent="claude-code"] svg'),'Selected · Claude Code');await agent(savedAgent);
  document.querySelectorAll('.symbol svg').forEach(node=>add(node,'Step Icon'));
  const prompt=document.querySelector('.copy');
  const captureFeedback=state=>{const status=prompt.closest('article').querySelector('.status'),c=getComputedStyle(status);typographyFeedback.push({state,width:prompt.closest('.code-wrap').getBoundingClientRect().width,html:prompt.closest('.code-wrap').outerHTML,typography:[c.fontFamily,c.fontSize,c.fontWeight,c.lineHeight,c.color],text:status.textContent});};
  if(prompt){setStatus(prompt,'');add(prompt.querySelector('.copy-icon'),'Prompt · Copy');captureButton(prompt,'prompt','neutral');await copy(prompt,true);captureFeedback('success');captureButton(prompt,'prompt','success');addError(prompt.closest('.code-wrap'),'Prompt Copy Success');add(prompt.querySelector('.success-icon'),'Prompt · Copied');await copy(prompt,false);captureFeedback('error');captureButton(prompt,'prompt','error');add(prompt.querySelector('.error-icon'),'Prompt · Copy Failed');addError(prompt.closest('.code-wrap'),'Prompt Copy Failure');setStatus(prompt,'');}
  add(document.querySelector('footer form[action="/auth/logout"] button svg'),'Log Out');copyFailure=false;
 }
 // Render the app's native noscript children in their original parent context.
 const fallback=document.querySelector(page==='login'?'#access-form noscript':'#workshop-content noscript');
 if(!fallback)throw Error('Missing JavaScript fallback: '+page);
 const fallbackSource=sourceSelector(fallback),temporary=document.createElement('div');temporary.innerHTML=fallback.textContent;temporary.className='javascript-notice-context';temporary.style.display='contents';fallback.after(temporary);
 const fallbackNode=temporary.firstElementChild;if(!fallbackNode)throw Error('Missing fallback content: '+page);
 if(page==='login'){const noticeIcon=iconSnapshot(fallbackNode.querySelector('svg'),page,'JavaScript Unavailable · Shared Notice');noticeIcon.selector=fallbackSource;items.push(noticeIcon);}
 const noticeStyle=getComputedStyle(fallbackNode),noticeTypography={page,width:fallbackNode.getBoundingClientRect().width,selector:fallbackSource,html:fallbackNode.outerHTML,typography:[noticeStyle.fontFamily,noticeStyle.fontSize,noticeStyle.fontWeight,noticeStyle.lineHeight,noticeStyle.color]};
 const context=(page==='login'?document.getElementById('access-form'):document.getElementById('workshop-content')).cloneNode(true);
 context.querySelectorAll('noscript,script').forEach(n=>n.remove());context.querySelectorAll('.theme-toggle').forEach(n=>n.hidden=true);
 if(page==='resources'){for(const child of [...context.children])if(child.matches('footer'))child.remove();context.querySelectorAll('.step-row').forEach((row,i)=>{if(i)row.remove();else row.classList.add('is-revealed');});}
 else {context.querySelector('input').setAttribute('value','');context.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));}
 context.classList.add('fallback-context');if(page==='login'){context.classList.add('full-login-context');Object.assign(context.style,{position:'static',margin:'0',height:'auto',maxHeight:'none',maxWidth:'100%'});}
 errors.push({page,state:'JavaScript Unavailable',selector:fallbackSource,colour:getComputedStyle(fallbackNode).color,html:context.outerHTML,text:fallbackNode.textContent});temporary.remove();
 const seen=new Set(),walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 while(walker.nextNode()){const node=walker.currentNode,el=node.parentElement;if(el.closest('script,style,svg,.page-placeholder')||!el.checkVisibility({checkVisibilityCSS:true}))continue;for(const match of node.textContent.matchAll(/[\p{S}\p{Extended_Pictographic}]/gu)){const character=match[0]+(node.textContent[match.index+match[0].length]==='\uFE0F'?'\uFE0F':'');if(character.codePointAt(0)<128||seen.has(character))continue;seen.add(character);const snapshot=iconSnapshot(el,page,'Text'),excerpt=document.createElement('template');excerpt.innerHTML=snapshot.html;const sample=excerpt.content.firstElementChild;sample.textContent=node.textContent.split('\n').find(line=>line.includes(character));Object.assign(sample.style,{maxWidth:'100%',height:'auto',maxHeight:'none'});items.push({order:snapshot.order,symbol:character,label:unicodeLabel(character),page,state:'Source Text Excerpt',selector:sourceSelector(el),colour:getComputedStyle(el).color,html:sample.outerHTML});}}
 document.querySelectorAll('.footer-copyright:not(.page-placeholder *)').forEach(el=>{const c=getComputedStyle(el,'::before');if(c.content&&c.content!=='none'&&c.content!=='normal')items.push({order:[...document.querySelectorAll('*')].indexOf(el),symbol:c.content.replaceAll('"',''),label:'Bullet · U+2022',page,state:'Unwrapped Footer',selector:'.footer-copyright::before',colour:c.color,html:iconSnapshot(el.closest('.footer-meta'),page,'Footer').html});});
 const rank=item=>{
 if(page==='login'){if(item.svg?.includes('data-input-icon="lock"'))return item.state==='neutral'?0:1;return {loading:2,success:3,wrong:4}[item.state]??5;}
 if(item.symbol)return item.symbol==='©'?80:item.symbol==='•'?81:70;
 if(item.state==='Default')return 0;
 if(item.state.includes('Mode'))return item.state.includes('Light')?10:11;
 if(item.state==='QR Code')return 20;
 if(item.state.startsWith('QR ·'))return 30;
 if(item.state==='Selected · Codex')return 40;
 if(item.state==='Selected · Claude Code')return 41;
 if(item.state==='Step Icon')return 50;
 if(item.state.startsWith('Prompt ·'))return 60;
 if(item.state==='Log Out')return 90;
 return 75;
 };items.sort((a,b)=>rank(a)-rank(b));parent.postMessage({guide:'icon-catalog-data',requestId:event.data.requestId,page,items,errors,typographyFeedback,agentTypography,buttonVariants,noticeTypography,focusItems},'*');
 }finally{capturingIcons=false;if(pendingIcons){const data=pendingIcons;pendingIcons=null;window.dispatchEvent(new MessageEvent('message',{source:parent,data}));}}
});`;

export const iconGalleryScript = String.raw`
let showIconSources=false,iconFilter="all",lastIconHeight=0;
const iconCatalog=document.getElementById('icon-catalog');
new ResizeObserver(()=>{if(!iconCatalog.getBoundingClientRect().width)return;const height=Math.ceil(iconCatalog.getBoundingClientRect().height+40);if(height!==lastIconHeight){lastIconHeight=height;parent.postMessage({guide:'icon-height',height},'*');}}).observe(iconCatalog);
function filterIcons(){document.querySelectorAll(".icon-row").forEach(row=>row.hidden=iconFilter!=="all"&&row.dataset.category!==iconFilter);document.querySelectorAll(".icon-row").forEach(row=>row.removeAttribute("data-first-visible"));document.querySelector(".icon-row:not([hidden])")?.setAttribute("data-first-visible", "");}
function signature(svg){return [...svg.children].filter(n=>n.tagName.toLowerCase()!=='title').map(n=>n.tagName.toLowerCase()+JSON.stringify([...n.attributes].filter(a=>a.name!=='key'&&!(a.name==='ry'&&a.value===n.getAttribute('rx'))).map(a=>[a.name,a.value]).sort())).sort().join('|');}
window.addEventListener('message',event=>{if(event.source!==parent)return;if(event.data?.guide==='icon-filter'){iconFilter=event.data.filter;filterIcons();return;}if(['icon-sources','settings'].includes(event.data?.guide)){if(event.data.iconFilter){iconFilter=event.data.iconFilter;filterIcons();}showIconSources=Boolean(event.data.sources);document.querySelectorAll('[data-icon-source]').forEach(a=>a.hidden=!showIconSources);return;}if(event.data?.guide!=='icon-catalog-data')return;
 const section=document.getElementById('icons-'+event.data.page);section.replaceChildren();
 for(const item of event.data.items){const row=document.createElement('section');row.className='icon-row';row.dataset.sourcePage=item.page;row.dataset.sourceSelector=item.selector;row.dataset.state=item.state;row.dataset.sourceWidth=item.width||'';row.dataset.sourceHeight=item.height||'';
 let name=item.state==='QR Code'?'QR Code':item.label||'Image Asset',url;
 if(item.svg){const svg=new DOMParser().parseFromString(item.svg,'image/svg+xml').documentElement,matched=iconNames[signature(svg)];if(matched&&item.officialName!==matched.replace('Lucide · ',''))throw Error('Icon name does not match Lucide source: '+item.usage);name=matched||(['OpenAI','Claude'].includes(item.label)?'Lobe Icons · '+item.label:'App SVG · '+(item.label||item.selector));if(matched)url='https://lucide.dev/icons/'+matched.replace('Lucide · ','');else if(['OpenAI','Claude'].includes(item.label))url='https://github.com/lobehub/lobe-icons/blob/master/packages/static-svg/icons/'+item.label.toLowerCase()+'.svg';}
 row.dataset.category=item.symbol?'unicode':name.startsWith('Lucide ·')?'lucide':name.startsWith('Lobe Icons ·')?'lobe':'other';row.hidden=iconFilter!=='all'&&row.dataset.category!==iconFilter;
 const title=document.createElement('h3');title.textContent=(item.symbol?(item.symbol==='➡'?'➡️':item.symbol)+' · ':'')+name;
 const sample=document.createElement('div');sample.className='icon-sample';sample.innerHTML=item.html;sample.querySelectorAll('input').forEach(e=>e.readOnly=true);
 const detail=document.createElement('p');detail.className='icon-meta';detail.textContent=(item.usage?'Use: '+item.usage+' · ':'')+item.page+' → '+item.selector+' · '+item.state+(item.width?' · '+Math.round(item.width)+' × '+Math.round(item.height)+'px':'')+' · '+item.colour+(item.src?' · '+(item.src.startsWith('data:')?'Embedded app image':item.src):'');row.append(title,sample,detail);
 if(url){const source=document.createElement('a');source.href=url;source.target='_blank';source.rel='noopener noreferrer';source.dataset.iconSource='';source.hidden=!showIconSources;source.textContent='View Source · '+name;row.append(source);}section.append(row);}
 filterIcons();
});`;

export const errorGalleryScript = String.raw`
function sizeContext(target){const context=target.querySelector('.fallback-context,.full-login-context');if(!context)return;const width=target.clientWidth-parseFloat(getComputedStyle(target).paddingLeft)-parseFloat(getComputedStyle(target).paddingRight);if(width<=0)return;if(width<320){context.style.width='320px';context.style.maxWidth='none';context.style.zoom=width/320;}else{context.style.removeProperty('width');context.style.maxWidth='100%';context.style.zoom=1;}context.querySelectorAll('.theme-toggle:not([hidden])').forEach(toggle=>window.layoutWorkshopToggle(toggle));}
const contextSizing=new ResizeObserver(entries=>entries.forEach(({target})=>sizeContext(target)));
window.addEventListener('message',event=>{if(event.source===parent&&['settings','measure-reference'].includes(event.data?.guide))document.querySelectorAll('.error-sample').forEach(sizeContext);});
const errorLabels={loading:'Checking Password',success:'Password Accepted',retryReady:'Ready to Retry',empty:'Empty Password',wrong:'Incorrect Password',network:'Connection Failure',service:'Sign-In Unavailable',generic:'Unexpected Sign-In Failure',limited:'Rate Limited · Example Countdown',limitedLater:'Rate Limited · No Countdown'};
window.addEventListener('message',event=>{if(event.source!==parent||event.data?.guide!=='icon-catalog-data')return;const section=document.getElementById('errors-'+event.data.page);section.querySelectorAll('.error-sample').forEach(sample=>contextSizing.unobserve(sample));section.replaceChildren();for(const item of event.data.errors){const row=document.createElement('section');row.className='icon-row';row.dataset.state=item.state;row.dataset.sourcePage=item.page;row.dataset.sourceSelector=item.selector;const title=document.createElement('h3');title.textContent=errorLabels[item.state]||item.state;const sample=document.createElement('div');sample.className='icon-sample error-sample';sample.innerHTML=item.html;const detail=document.createElement('p');detail.className='icon-meta';detail.textContent=(item.usage?'Use: '+item.usage+' · ':'')+item.page+' → '+item.selector+' · '+item.colour;if(item.state==='JavaScript Unavailable'||item.page==='login'){detail.textContent+=' · Full app context (scaled to fit narrow specimens)';contextSizing.observe(sample);}row.append(title,sample,detail);section.append(row);sizeContext(sample);}});
`;

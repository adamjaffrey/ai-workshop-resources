// Capture app specimens from isolated running frames, including their real state renderers.
export const iconCaptureScript = String.raw`
const unicodeNames={"©": "Copyright Sign", "⌘": "Place of Interest Sign", "✅": "White Heavy Check Mark", "✋": "Raised Hand", "❌": "Cross Mark", "➡": "Black Rightwards Arrow"};
function unicodeLabel(character){return (unicodeNames[character.replace('\uFE0F','')]||"Unicode Character")+" · U+"+character.codePointAt(0).toString(16).toUpperCase().padStart(4,"0");}
function sourceSelector(node){
 if(node.id)return '#'+CSS.escape(node.id);
 const parts=[];for(let el=node;el&&el!==document.body;el=el.parentElement){let part=el.tagName.toLowerCase();if(el.id){parts.unshift('#'+CSS.escape(el.id));break;}const siblings=[...el.parentElement.children].filter(n=>n.tagName===el.tagName);if(siblings.length>1)part+=':nth-of-type('+(siblings.indexOf(el)+1)+')';parts.unshift(part);}return parts.join(' > ');
}
function iconSnapshot(node,page,state,standalone=false){
 const container=standalone?node:node.closest('.toggle,.theme-toggle')||node.closest('button,.symbol,.password-field,.gate-error,.brand-mark')||node;
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
let capturingIcons=false,pendingIcons;
window.addEventListener('message',async event=>{
 if(event.source!==parent||event.data?.guide!=='icon-catalog')return;
 if(capturingIcons){pendingIcons=event.data;return;}capturingIcons=true;
 try{
 const page=event.data.page,items=[],errors=[],typographyFeedback=[];
 const add=(node,state)=>{if(!node)throw Error('Missing icon source: '+page+' '+state);items.push(iconSnapshot(node,page,state));};
 const addError=(node,state)=>{if(!node)throw Error('Missing error source: '+page+' '+state);const item=iconSnapshot(node,page,state,true),template=document.createElement('template');template.innerHTML=item.html;const root=template.content.firstElementChild;if(node.matches('.gate-panel'))for(const child of [...root.children])if(!child.matches('label,.password-field,.gate-error,.gate-submit'))child.remove();Object.assign(root.style,{position:node.matches('.qr-copy')?'relative':'static',maxWidth:'100%',height:'auto',maxHeight:'none',margin:'0'});errors.push({...item,html:root.outerHTML,text:node.textContent.trim()});};
 if(page==='login'){
  for(const state of ['neutral','loading','success','wrong']){window.demoLogin(state);finishCaptureMotion();document.querySelectorAll('[data-input-icon],[data-status-icon]').forEach(node=>{if(!node.hasAttribute('hidden'))add(node,state);});}
  for(const state of ['empty','wrong','network','service','generic','limited','limitedLater']){window.demoLogin(state);finishCaptureMotion();const status=document.getElementById('gate-error');addError(document.getElementById('access-form'),state);errors.at(-1).statusHtml=status.outerHTML;errors.at(-1).colour=getComputedStyle(status).color;}
  window.demoLogin('neutral');finishCaptureMotion();
 }else{
  const savedTheme=document.documentElement.dataset.theme,savedAgent=window.workshopAgent.current;
  const theme=async value=>{window.dispatchEvent(new StorageEvent('storage',{key:'workshop-colour-theme',newValue:value}));await new Promise(r=>setTimeout(r,0));finishCaptureMotion();};
  const agent=async value=>{window.workshopAgent.select(value);await new Promise(r=>setTimeout(r,0));finishCaptureMotion();};
  const copy=async(button,success)=>{copyFailure=!success;button.click();await new Promise(r=>setTimeout(r,0));finishCaptureMotion();};
  for(const button of document.querySelectorAll('.copy,.qr-copy'))setStatus(button,'');
  add(document.querySelector('.brand-mark img'),'Default');
  await theme('light');add(document.querySelector('[data-theme-choice=light] svg'),'Selected · Light Mode');
  await theme('dark');add(document.querySelector('[data-theme-choice=dark] svg'),'Selected · Dark Mode');await theme(savedTheme);
  const qr=document.querySelector('.qr-copy');
  add(qr?.querySelector('img'),'QR Code');
  if(qr){qr.setAttribute('data-feedback','');finishCaptureMotion();add(qr.querySelector('.copy-icon'),'QR · Copy Link');await copy(qr,true);add(qr.querySelector('.success-icon'),'QR · Link Copied');await copy(qr,false);add(qr.querySelector('.error-icon'),'QR · Copy Failed');addError(qr,'QR Link Copy Failure');errors.at(-1).colour=getComputedStyle(qr.querySelector('.copy-content')).color;setStatus(qr,'');}
  await agent('codex');add(document.querySelector('[data-agent=codex] svg'),'Selected · Codex');
  await agent('claude-code');add(document.querySelector('[data-agent="claude-code"] svg'),'Selected · Claude Code');await agent(savedAgent);
  document.querySelectorAll('.symbol svg').forEach(node=>add(node,'Step Icon'));
  const prompt=document.querySelector('.copy');
  const captureFeedback=state=>{const status=prompt.closest('article').querySelector('.status'),c=getComputedStyle(status);typographyFeedback.push({state,html:prompt.closest('.code-wrap').outerHTML,typography:[c.fontFamily,c.fontSize,c.fontWeight,c.lineHeight,c.color],text:status.textContent});};
  if(prompt){setStatus(prompt,'');add(prompt.querySelector('.copy-icon'),'Prompt · Copy');await copy(prompt,true);captureFeedback('success');add(prompt.querySelector('.success-icon'),'Prompt · Copied');await copy(prompt,false);captureFeedback('error');add(prompt.querySelector('.error-icon'),'Prompt · Copy Failed');addError(prompt,'Prompt Copy Failure');const status=prompt.closest('article').querySelector('.status');errors.at(-1).html+=iconSnapshot(status,page,'Prompt Copy Failure',true).html;setStatus(prompt,'');}
  add(document.querySelector('footer button svg'),'Log Out');copyFailure=false;
 }
 // Render the app's native noscript children in their original parent context.
 const fallback=document.querySelector(page==='login'?'#access-form noscript':'#workshop-content noscript');
 if(!fallback)throw Error('Missing JavaScript fallback: '+page);
 const fallbackSource=sourceSelector(fallback),temporary=document.createElement('div');temporary.innerHTML=fallback.textContent;fallback.after(temporary);
 const fallbackNode=temporary.firstElementChild;if(!fallbackNode)throw Error('Missing fallback content: '+page);
 addError(fallbackNode,'JavaScript Unavailable');errors.at(-1).selector=fallbackSource;errors.at(-1).colour=getComputedStyle(fallbackNode).color;temporary.remove();
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
 };items.sort((a,b)=>rank(a)-rank(b));parent.postMessage({guide:'icon-catalog-data',page,items,errors,typographyFeedback},'*');
 }finally{capturingIcons=false;if(pendingIcons){const data=pendingIcons;pendingIcons=null;window.dispatchEvent(new MessageEvent('message',{source:parent,data}));}}
});`;

export const iconGalleryScript = String.raw`
let showIconSources=false,iconFilter="all",lastIconHeight=0;
const iconCatalog=document.getElementById('icon-catalog');
new ResizeObserver(()=>{if(!iconCatalog.getBoundingClientRect().width)return;const height=Math.ceil(iconCatalog.getBoundingClientRect().height+32);if(height!==lastIconHeight){lastIconHeight=height;parent.postMessage({guide:'icon-height',height},'*');}}).observe(iconCatalog);
function filterIcons(){document.querySelectorAll(".icon-row").forEach(row=>row.hidden=iconFilter!=="all"&&row.dataset.category!==iconFilter);}
function signature(svg){return [...svg.children].filter(n=>n.tagName.toLowerCase()!=='title').map(n=>n.tagName.toLowerCase()+JSON.stringify([...n.attributes].filter(a=>a.name!=='key'&&!(a.name==='ry'&&a.value===n.getAttribute('rx'))).map(a=>[a.name,a.value]).sort())).sort().join('|');}
window.addEventListener('message',event=>{if(event.source!==parent)return;if(event.data?.guide==='icon-filter'){iconFilter=event.data.filter;filterIcons();return;}if(['icon-sources','settings'].includes(event.data?.guide)){if(event.data.iconFilter){iconFilter=event.data.iconFilter;filterIcons();}showIconSources=Boolean(event.data.sources);document.querySelectorAll('[data-icon-source]').forEach(a=>a.hidden=!showIconSources);return;}if(event.data?.guide!=='icon-catalog-data')return;
 const section=document.getElementById('icons-'+event.data.page);section.replaceChildren();
 for(const item of event.data.items){const row=document.createElement('section');row.className='icon-row';row.dataset.sourcePage=item.page;row.dataset.sourceSelector=item.selector;row.dataset.state=item.state;row.dataset.sourceWidth=item.width||'';row.dataset.sourceHeight=item.height||'';
 let name=item.label||'Image Asset',url;
 if(item.svg){const svg=new DOMParser().parseFromString(item.svg,'image/svg+xml').documentElement,matched=iconNames[signature(svg)];if(matched&&item.officialName!==matched.replace('Lucide · ',''))throw Error('Icon name does not match Lucide source: '+item.usage);name=matched||(['OpenAI','Claude'].includes(item.label)?'Lobe Icons · '+item.label:'App SVG · '+(item.label||item.selector));if(matched)url='https://lucide.dev/icons/'+matched.replace('Lucide · ','');else if(['OpenAI','Claude'].includes(item.label))url='https://github.com/lobehub/lobe-icons/blob/master/packages/static-svg/icons/'+item.label.toLowerCase()+'.svg';}
 row.dataset.category=item.symbol?'unicode':name.startsWith('Lucide ·')?'lucide':name.startsWith('Lobe Icons ·')?'lobe':'other';row.hidden=iconFilter!=='all'&&row.dataset.category!==iconFilter;
 const title=document.createElement('h3');title.textContent=(item.symbol?(item.symbol==='➡'?'➡️':item.symbol)+' · ':'')+name;
 const sample=document.createElement('div');sample.className='icon-sample';sample.innerHTML=item.html;sample.querySelectorAll('input').forEach(e=>e.readOnly=true);
 const detail=document.createElement('p');detail.className='icon-meta';detail.textContent=(item.usage?'Use: '+item.usage+' · ':'')+item.page+' → '+item.selector+' · '+item.state+(item.width?' · '+Math.round(item.width)+' × '+Math.round(item.height)+'px':'')+' · '+item.colour+(item.src?' · '+(item.src.startsWith('data:')?'Embedded app image':item.src):'');row.append(title,sample,detail);
 if(url){const source=document.createElement('a');source.href=url;source.target='_blank';source.rel='noopener noreferrer';source.dataset.iconSource='';source.hidden=!showIconSources;source.textContent='View '+name+' Source';row.append(source);}section.append(row);}
});`;

export const errorGalleryScript = String.raw`
const errorLabels={empty:'Empty Password',wrong:'Incorrect Password',network:'Connection Failure',service:'Sign-In Unavailable',generic:'Unexpected Sign-In Failure',limited:'Rate Limited · Example Countdown',limitedLater:'Rate Limited · No Countdown'};
window.addEventListener('message',event=>{if(event.source!==parent||event.data?.guide!=='icon-catalog-data')return;const section=document.getElementById('errors-'+event.data.page);section.replaceChildren();for(const item of event.data.errors){const row=document.createElement('section');row.className='icon-row';row.dataset.state=item.state;row.dataset.sourcePage=item.page;row.dataset.sourceSelector=item.selector;const title=document.createElement('h3');title.textContent=errorLabels[item.state]||item.state;const sample=document.createElement('div');sample.className='icon-sample error-sample';sample.innerHTML=item.html;const detail=document.createElement('p');detail.className='icon-meta';detail.textContent=(item.usage?'Use: '+item.usage+' · ':'')+item.page+' → '+item.selector+' · '+item.colour;row.append(title,sample,detail);section.append(row);}});
`;

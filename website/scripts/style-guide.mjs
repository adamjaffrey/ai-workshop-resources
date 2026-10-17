// Local preview only. This module is deliberately absent from production imports.
import {readFile} from 'node:fs/promises';
import {loginPage, resourcePage} from '../lib/workshop-pages.mjs';
import {handleRequest} from '../lib/workshop-handler.mjs';
import {withTheme} from '../lib/workshop-theme.mjs';
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const styles=html=>[...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n');
const resourceCSS=styles(resourcePage);
const tokenNames=[...new Set([...resourceCSS.matchAll(/(--[a-z-]+):\s*(?:#[\da-f]+|rgb\(|color-mix\(|var\()/gi)].map(m=>m[1]))].filter(x=>!x.startsWith('--qr-')&&x!=='--theme-radius');
const radios=(id,label,options)=>`<fieldset class="choices" id="${id}"><legend>${label}</legend><div class="choice-options">${options.map(([value,text],i)=>`<label class="choice"><input type="radio" name="${id}" value="${value}" ${i?'':'checked'}><span>${text}</span></label>`).join('')}</div></fieldset>`;
const bridge=`
let copyFailure=false;
Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{if(copyFailure)throw Error('Simulated copy failure');}}});
document.execCommand=()=>false;
window.open=()=>null;
let inspectTimer,inspectTarget,lastReport='',inspectorFrozen=false;
function targetFor(e){if(e.closest('.type-row'))return e.closest('.type-row').firstElementChild;return e.closest('button,a,input,textarea,label,h1,h2,h3,h4,h5,h6,p,pre,.ph-word,.ph-icon,.ph-qr-block,article')||null;}
function inspect(e){if(inspectorFrozen||!e?.isConnected)return;const c=getComputedStyle(e),r=e.getBoundingClientRect();const details={Element:e.tagName.toLowerCase()+(e.id?'#'+e.id:''),Size:Math.round(r.width)+' × '+Math.round(r.height)+'px','Text Colour':c.color,Background:c.backgroundColor,Border:c.borderColor,'Focus Ring':c.outlineWidth+' '+c.outlineColor,Font:c.fontSize+' / '+c.lineHeight+' · '+c.fontWeight,Spacing:'Padding '+c.padding+' · gap '+c.gap};const report=JSON.stringify(details);if(report===lastReport)return;lastReport=report;parent.postMessage({guide:'inspect',details},'*');}
function queueInspect(e,immediate=false){const target=targetFor(e);if(!target)return;if(target===inspectTarget&&!immediate)return;inspectTarget=target;clearTimeout(inspectTimer);inspectTimer=setTimeout(()=>inspect(target),immediate?0:200);}
document.addEventListener('pointerover',e=>queueInspect(e.target));document.addEventListener('pointerout',e=>{if(!e.relatedTarget){clearTimeout(inspectTimer);inspectTarget=null;}});document.addEventListener('focusin',e=>queueInspect(e.target,true));document.addEventListener('click',e=>queueInspect(e.target,true));
window.addEventListener('message',e=>{if(e.source===parent&&e.data?.guide==='inspection'){inspectorFrozen=e.data.frozen;clearTimeout(inspectTimer);if(!inspectorFrozen){lastReport='';inspect(inspectTarget);}}});

document.addEventListener('click',e=>{const a=e.target.closest('a');if(a){e.preventDefault();e.stopImmediatePropagation();parent.postMessage({guide:'notice',text:'Link selected. Navigation is disabled in this playground.'},'*');}},true);
document.addEventListener('submit',e=>{e.preventDefault();if(!e.target.matches('#access-form'))parent.postMessage({guide:'notice',text:'Action simulated. You remain in the playground.'},'*');},true);
window.addEventListener('message',e=>{if(e.source!==parent||e.data?.guide!=='settings')return;const {theme,agent,hover,copy}=e.data;
 if(document.documentElement.dataset.theme!==theme)window.dispatchEvent(new StorageEvent('storage',{key:'workshop-colour-theme',newValue:theme}));
 window.workshopAgent?.select(agent);
 // Offscreen frames can pause colour animations; palette commands settle immediately.
 document.getAnimations().forEach(a=>{if(a.effect?.getTiming().iterations!==Infinity)try{a.finish();}catch{}});
 document.documentElement.toggleAttribute('data-demo-hover',hover);copyFailure=copy==='error';
 if(window.demoLogin)window.demoLogin(e.data.state);if(window.demoBlocks)window.demoBlocks(e.data);
});
window.addEventListener('DOMContentLoaded',()=>{parent.postMessage({guide:'ready'},'*');});
`;
function sandboxDoc(html,extra='') {
 // No network requests, popups, forms or top navigation from the isolated frames.
 const guard='<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\'; style-src \'unsafe-inline\'; img-src data: http: https:; font-src data: http: https:; connect-src \'none\'; form-action \'none\'; base-uri \'none\'">';
 const hover=[...styles(html).matchAll(/([^{}]*:hover[^{}]*)\{([^{}]*)\}/g)].map(m=>':root[data-demo-hover] :is('+m[1].trim().replaceAll(':hover','[data-demo-hover-item]')+') {'+m[2]+'}').join('\n');
 const setup=`<script>${bridge}</script>`;
 html=html.replace('<head>','<head>'+guard+setup);
 html=html.replace('</head>',`<style>${hover}</style></head>`);
 return html.replace('</body>',`<script>document.querySelectorAll('button,a,pre,.qr-card').forEach(e=>e.setAttribute('data-demo-hover-item',''));${extra}</script></body>`);
}
const typeBody=`<main class="specimens">
<p class="eyebrow">Type Specimens</p><p>Computed values below come from the current stylesheet and viewport. H4–H6 are browser defaults: the site currently defines H1, H2 step headings and H3 card headings.</p>
${[1,2,3,4,5,6].map(n=>`<section class="type-row ${n===3?'card-heading':''}"><h${n} ${n===2?'class="step-title"':''}>Heading ${n}: Build Something Useful</h${n}><output></output></section>`).join('')}
${[['eyebrow','Pre-Heading'],['intro','Introductory text for the workshop.'],['description','Body copy and card descriptions.'],['step-purpose','Step Subtitle'],['controls-label','Control Label'],['code-label','Prompt Header Label']].map(([c,t])=>`<section class="type-row"><p class="${c}">${t}</p><output></output></section>`).join('')}
<section class="type-row"><pre tabindex="0"><code>npx example-command --demo</code></pre><output></output></section>
<section class="type-row"><footer>Version · © 2026 Wavelength Creative</footer><output></output></section>
<section class="type-row"><p><a href="#">An Interactive Text Link</a> — select this text to inspect the selection colour.</p><output></output></section>
</main>`;
const typeScript=`function measure(){document.querySelectorAll('.type-row').forEach(row=>{const e=row.firstElementChild,c=getComputedStyle(e);row.querySelector('output').textContent=e.tagName+' · '+c.fontSize+' / '+c.lineHeight+' · weight '+c.fontWeight+' · '+c.letterSpacing+' tracking · '+c.color+' · '+c.fontFamily;});}new ResizeObserver(measure).observe(document.body);new MutationObserver(measure).observe(document.documentElement,{attributes:true});measure();`;
export async function styleGuidePage(){
 const response=await handleRequest(new Request('http://local/login.js'),{});
 let loginJS=await response.text();const submitBoundary=loginJS.indexOf("form.addEventListener('submit'");if(submitBoundary<0)throw Error('Login submission boundary missing');loginJS=loginJS.slice(0,submitBoundary);
 loginJS=loginJS.replace("window.workshopFocusPanel(document.getElementById('access-gate'));",'');
 const loginExtra=loginJS+`
 const cases={empty:'Enter your workshop password.',wrong:'Incorrect password. Please try again.',network:'Unable to connect. Check your connection and retry.',service:'Sign-in is unavailable. Please try again later.',generic:'Unable to sign in. Please try again.',limited:'Too many attempts. Try again in less than a minute.'};
 window.demoLogin=state=>{busy=false;retryUntil=0;clearInterval(retryTimer);password.readOnly=false;release();resetPasswordError();password.type=state==='text'?'text':'password';password.value=state==='empty'?'':'Example password';
 button.textContent='Unlock Resources';
 if(cases[state]){setStatus('error',cases[state]);if(state==='wrong'||state==='empty')password.setAttribute('aria-invalid','true');if(state==='wrong')form.classList.add('is-password-error');button.disabled=state==='limited';}
 else if(state==='loading'||state==='success'){setStatus(state,state==='loading'?'Checking password…':'Access granted.');button.disabled=true;password.readOnly=true;button.textContent=state==='loading'?'Checking…':'Opening Resources…';}
 else{setStatus('info','');button.disabled=state==='disabled';password.disabled=state==='disabled';}
 if(state!=='disabled')password.disabled=false;
 };
 form.addEventListener('submit',e=>{e.preventDefault();window.demoLogin(password.value?'wrong':'empty');parent.postMessage({guide:'notice',text:'Simulated incorrect password. Edit the field to reset the error.'},'*');});
 `;
 let login=loginPage.replace(/<script[^>]*src="\/login.js"[^>]*><\/script>/,'');
 login=sandboxDoc(login,loginExtra);
 let resources=resourcePage;
 const start=resources.indexOf('    async function checkSession()'),end=resources.indexOf('  </script>',start);
 if(start<0||end<0)throw Error('Resource session boundary missing');
 resources=resources.slice(0,start)+resources.slice(end);
 resources=sandboxDoc(resources);
 let blocks=loginPage.replace(/<script[^>]*src="\/login.js"[^>]*><\/script>/,'');
 blocks=blocks.replace('</head>',`<style>
 html.is-locked,body.is-locked{position:static;height:auto;overflow:auto;overscroll-behavior:auto}body[data-review=clear] .page-placeholder{filter:none}body:not([data-review=panel]) .access-gate{display:none}.page-placeholder{pointer-events:auto}.page-placeholder [inert]{pointer-events:auto}.page-placeholder :is(.ph-word,.ph-icon,.ph-qr-block){cursor:pointer}
 #block-highlight{position:fixed;pointer-events:none;z-index:150;border:2px solid var(--error);border-radius:2px;background:transparent;display:none}
 </style></head>`).replace('</body>','<div id="block-highlight" aria-hidden="true"></div></body>');
 blocks=sandboxDoc(blocks,`
 document.querySelectorAll('.page-placeholder [inert],.page-placeholder[inert]').forEach(e=>e.removeAttribute('inert'));
 document.querySelectorAll('.page-placeholder button').forEach(e=>{e.type='button';e.tabIndex=-1;});
 const highlight=document.getElementById('block-highlight');let chosenBlock;
 function clearHighlight(){highlight.style.display='none';chosenBlock=null;}
 window.demoBlocks=s=>{document.body.dataset.review=s.review;const ph=document.querySelector('.page-placeholder');ph.style.setProperty('--ph-strength',s.strength+'%');ph.style.setProperty('--ph-blur',s.blur+'px');if(s.review==='panel')clearHighlight();};
 document.addEventListener('click',e=>{const block=e.target.closest('.ph-word,.ph-icon,.ph-qr-block');if(!block)return;chosenBlock=block;const r=block.getBoundingClientRect();Object.assign(highlight.style,{display:'block',left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});const c=getComputedStyle(block);parent.postMessage({guide:'block',text:'Selected '+(block.classList.contains('ph-word')?'word':block.classList.contains('ph-icon')?'icon':'QR')+' block · x '+Math.round(r.left)+' · y '+Math.round(r.top+scrollY)+' · '+Math.round(r.width)+' × '+Math.round(r.height)+'px · cap height '+c.getPropertyValue('--ph-cap')+' · baseline offset '+c.getPropertyValue('--ph-bottom')},'*');});
 window.addEventListener('scroll',clearHighlight,true);window.addEventListener('resize',clearHighlight);
 `);
 const typography=sandboxDoc(withTheme(`<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>${resourceCSS}\n.specimens{padding:24px}.specimens>*{width:100%;margin-left:0}.type-row{border-bottom:1px solid var(--border);padding:24px 0}.type-row>*{margin:0 0 12px}.type-row output{display:block;font:12px/1.6 monospace;color:var(--muted-text);overflow-wrap:anywhere}.type-row footer{padding:0}.type-row a{color:var(--link)}</style></head><body>${typeBody}</body></html>`),typeScript);
 let shell=`<!doctype html><html lang="en-AU"><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Workshop Component Playground</title><style>
 *{box-sizing:border-box}body{margin:0;font:16px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--page);color:var(--text)}.wrap{max-width:1280px;margin:auto;padding:24px}h1{font-size:clamp(28px,5vw,44px);line-height:1.15;letter-spacing:-.035em;margin:8px 0 16px}h2{font-size:24px;margin:0 0 12px}p{max-width:78ch}.kicker{color:var(--icon-ink);text-transform:uppercase;font-size:12px;font-weight:700;letter-spacing:.14em}.muted{color:var(--muted-text)}.toolbar{position:sticky;top:0;z-index:10;background:var(--surface);border-bottom:1px solid var(--border)}.toolbar .wrap{display:flex;gap:12px;flex-wrap:wrap;padding-top:14px;padding-bottom:14px}.field{display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:600}select,button{font:inherit;font-size:14px;font-weight:600;color:var(--text);background:var(--surface);border:1px solid var(--control-border);border-radius:8px;padding:10px}select:focus-visible,button:focus-visible,a:focus-visible{outline:3px solid var(--icon-ink);outline-offset:3px}button:hover,select:hover{background:var(--hover)}nav{display:flex;gap:8px;flex-wrap:wrap;margin:24px 0}nav button[aria-pressed=true]{background:var(--agent-accent);color:var(--agent-ink)}.panel{border:1px solid var(--border);border-radius:16px;background:var(--surface);padding:20px;margin:20px 0}.samples{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}.swatch{border:1px solid var(--border);border-radius:12px;overflow:hidden}.chip{height:72px;background:var(--swatch)}.swatch code,.swatch small{display:block;padding:8px 12px;overflow-wrap:anywhere}.swatch small{padding-top:0;color:var(--muted-text)}.frame-wrap{overflow:auto;max-width:100%;border:1px solid var(--border);border-radius:12px;background:var(--page)}iframe{display:block;border:0;width:100%;height:760px}#resources-frame{height:1000px}#type-frame{height:1100px}.frame-wrap[data-width]:not([data-width=fluid]) iframe{width:var(--frame-width);max-width:none}.state-tools{display:flex;align-items:end;gap:12px;flex-wrap:wrap;margin:16px 0}.notice{font-size:14px;min-height:21px;color:var(--muted-text)}[hidden]{display:none!important}.status-example{padding:16px;border-radius:10px;border:1px solid currentColor}.status-example button{background:var(--role);color:var(--ink);border-color:var(--role)}.status-example p{margin:0 0 12px}.status-example{color:var(--role)}@media(max-width:600px){.wrap{padding:16px}.panel{padding:12px}.toolbar .field{flex:1 1 120px}.toolbar select{width:100%}}

 .choices{border:0;padding:0;margin:0;min-width:0}.choices legend{font-size:12px;font-weight:600;margin-bottom:6px}.choice-options{display:flex;gap:6px;flex-wrap:wrap}.choice{position:relative;display:flex;cursor:pointer}.choice input{position:absolute;opacity:0;width:1px;height:1px}.choice span{display:block;padding:9px 12px;border:1px solid var(--control-border);border-radius:8px;font-size:14px;font-weight:600;background:var(--surface);cursor:pointer;user-select:none}.choice input:checked+span{background:var(--agent-accent);color:var(--agent-ink);border-color:var(--agent-accent)}.choice:hover span{box-shadow:inset 0 0 0 1px var(--icon-ink)}.choice input:focus-visible+span{outline:3px solid var(--icon-ink);outline-offset:3px}.state-tools .choices{flex:1 1 100%}.inspector-dock{position:fixed;bottom:0;left:0;right:0;z-index:30;background:var(--surface);border-top:1px solid var(--control-border);padding:10px max(16px,calc((100vw - 1232px)/2));box-shadow:0 -4px 20px #0001}.inspector-bar{display:flex;align-items:center;gap:8px}.inspector-bar strong{margin-right:auto}.inspector-bar button{padding:6px 10px;font-size:12px}.inspector-bar [aria-pressed=true]{background:var(--agent-accent);color:var(--agent-ink)}.inspector-hint{font-size:12px;line-height:18px;color:var(--muted-text);max-width:none;margin:6px 0}.inspector-dock #inspection-summary{height:21px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px}.inspector-dock dl{height:144px;overflow:auto;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:12px 0 0;font-size:12px;align-content:start}.inspector-dock dt{font-weight:600;color:var(--muted-text)}.inspector-dock dd{margin:3px 0 0;overflow-wrap:anywhere}main.wrap{padding-bottom:calc(var(--inspector-height,140px) + 32px)}iframe{scroll-margin-top:var(--toolbar-height,160px)}.frame-wrap{scroll-margin-top:var(--toolbar-height,160px)}input[type=range]{accent-color:var(--agent-accent);width:180px;max-width:100%}#blocks-frame{height:900px}#block-report{min-height:42px}html{scroll-padding-top:var(--toolbar-height,160px);scroll-padding-bottom:var(--inspector-height,140px)}@media(max-width:600px){.inspector-dock dl{grid-template-columns:repeat(2,minmax(0,1fr));height:132px}.inspector-hint{font-size:11px;line-height:15px}.inspector-bar strong{font-size:14px}.toolbar .wrap{gap:10px}.choice span{padding:8px 10px}.toolbar{position:relative}}
 </style></head><body>
 <header class="wrap"><div class="kicker">Local Design Tools</div><h1>Component Playground</h1><p class="muted">One place to inspect the workshop’s live styles. Switch themes and agents, hold a login state, hover, press, select text and Tab through controls. All actions are simulated; links stay here.</p></header>
 <div class="toolbar"><div class="wrap">
 ${radios('theme','Colour Theme',[['light','Light'],['dark','Dark']])}
 ${radios('agent','Coding Agent',[['codex','Codex'],['claude-code','Claude Code']])}
 ${radios('width','Sample Width',[['fluid','Fit'],['320','320px'],['390','390px'],['768','768px'],['1440','1440px']])}
 ${radios('hover','Hover Preview',[['off','Natural'],['on','Hold Hover']])}
 </div></div>
 <main class="wrap"><nav aria-label="Playground Sections">${['Components','Typography','Colours','Blocks'].map((s,i)=>`<button type="button" data-tab="${s.toLowerCase()}" aria-pressed="${!i}">${s}</button>`).join('')}</nav>
 <p class="notice" id="notice" role="status">Use Tab to inspect real keyboard focus. Fixed-width samples scroll horizontally on smaller screens.</p>

 <div data-panel="components"><section class="panel"><h2>Login and Fields</h2><p class="muted">Actual login markup and CSS with persistent, simulated states. Text Field uses the password field styling as a specimen, not a separate production component. Click the input to inspect its focus ring; typing clears an incorrect-password error.</p><div class="state-tools">${radios('state','Held Login State',[['neutral','Neutral'],['loading','Checking'],['success','Success'],['wrong','Incorrect Password'],['empty','Empty Field'],['network','Network Error'],['service','Service Error'],['generic','Unexpected Error'],['limited','Rate Limited'],['disabled','Disabled Specimen'],['text','Text Field Specimen']])}<button type="button" id="reset">Reset Specimens</button></div><div class="frame-wrap"><iframe id="login-frame" title="Interactive Login Specimen" sandbox="allow-scripts" srcdoc="${esc(login)}"></iframe></div></section>
 <section class="panel"><h2>Resource Page and Controls</h2><p class="muted">Actual cards, icons, prompt panels, selectors, QR control and footer. Copy clicks show the real feedback without writing to your clipboard. Log Out stays here.</p>${radios('copy','Copy Result',[['success','Success'],['error','Failure']])}<div class="frame-wrap"><iframe id="resources-frame" title="Interactive Resource Page Specimen" sandbox="allow-scripts" srcdoc="${esc(resources)}"></iframe></div></section></div>
 <div data-panel="typography" hidden><section class="panel"><h2>Typography and Text Styles</h2><div class="frame-wrap"><iframe id="type-frame" title="Typography Specimens and Computed Styles" sandbox="allow-scripts" srcdoc="${esc(typography)}"></iframe></div></section></div>
 <div data-panel="colours" hidden><section class="panel"><h2>Shared Colour Tokens</h2><p class="muted">Values are read from the live stylesheet. Derived colours update with theme and agent selection; translucent samples retain their alpha.</p><div class="samples" id="swatches">${tokenNames.map(t=>`<div class="swatch" data-token="${t}"><div class="chip" style="--swatch:var(${t})"></div><code>${t}</code><small></small></div>`).join('')}</div></section><section class="panel"><h2>Status Roles</h2><p class="muted">Warning examples are proposed usage of reserved tokens. They are not currently shown on the website. Error meaning also has text and an X icon in the login specimen.</p><div class="samples">${['success','error','warning','info'].map(role=>`<div class="status-example" style="--role:var(--${role});--ink:var(--${role==='warning'?'warning':'success'}-ink)"><p>${{success:'Success: action completed.',error:'Error: please try again.',warning:'Warning: review before continuing.',info:'Information: checking your request.'}[role]}</p>${['success','warning'].includes(role)?'<button type="button" data-demo-action>Example Filled Button</button>':''}</div>`).join('')}</div></section></div>
 <div data-panel="blocks" hidden><section class="panel"><h2>Blocks and Blur</h2><p class="muted">The original local blur controls, using the saved placeholder geometry. Choose No Blur, then click a word, icon or QR block to inspect its bounds. Changes here are temporary; they do not change the website or remeasure anything.</p>
 <div class="state-tools">${radios('review','Preview Layer',[['clear','No Blur'],['blurred','Blur Only'],['panel','Password Panel']])}
 <label class="field" for="strength">Block Strength <output id="strength-value">40%</output><input id="strength" type="range" min="0" max="100" value="40"></label>
 <label class="field" for="blur">Background Blur <output id="blur-value">4px</output><input id="blur" type="range" min="0" max="20" step="0.5" value="4"></label><button type="button" id="reset-blocks">Reset Blur Settings</button></div>
 <p id="block-report" class="notice" role="status">Click a block in No Blur view to outline it and read its dimensions. Password Panel adds a second 7px blur pass to the background.</p><div class="frame-wrap"><iframe id="blocks-frame" title="Block Geometry and Blur Specimen" sandbox="allow-scripts" srcdoc="${esc(blocks)}"></iframe></div></section></div>
 </main>
 <aside class="inspector-dock" aria-label="Style Inspector"><div class="inspector-bar"><strong>Style Inspector</strong><button id="freeze-inspector" type="button" aria-pressed="false">Freeze</button><button id="inspector-details" type="button" aria-expanded="false" aria-controls="inspection">Show Details</button></div><p class="inspector-hint">Shows an item’s colours, type and spacing. Pause over it, click it or use Tab. Freeze keeps the reading.</p><div id="inspection-summary">No item selected yet.</div><dl id="inspection" hidden>${['Element','Size','Text Colour','Background','Border','Focus Ring','Font','Spacing'].map(label=>`<div><dt>${label}</dt><dd data-inspect="${label}">—</dd></div>`).join('')}</dl></aside>
 <script>
 const $=id=>document.getElementById(id);const fields=['theme','agent','width','hover','state','copy','review'];
 fields.forEach(id=>Object.defineProperty($(id),'value',{get(){return this.querySelector('input:checked').value;},set(value){const input=[...this.querySelectorAll('input')].find(e=>e.value===value);if(input)input.checked=true;}}));
 let inspectorFrozen=false;
 new ResizeObserver(()=>document.documentElement.style.setProperty('--inspector-height',document.querySelector('.inspector-dock').offsetHeight+'px')).observe(document.querySelector('.inspector-dock'));
 new ResizeObserver(()=>document.documentElement.style.setProperty('--toolbar-height',document.querySelector('.toolbar').offsetHeight+'px')).observe(document.querySelector('.toolbar'));
 $('freeze-inspector').onclick=()=>{inspectorFrozen=!inspectorFrozen;$('freeze-inspector').setAttribute('aria-pressed',inspectorFrozen);$('freeze-inspector').textContent=inspectorFrozen?'Resume':'Freeze';document.querySelectorAll('iframe').forEach(f=>f.contentWindow.postMessage({guide:'inspection',frozen:inspectorFrozen},'*'));};
 $('inspector-details').onclick=()=>{const show=$('inspection').hidden;$('inspection').hidden=!show;$('inspector-details').setAttribute('aria-expanded',show);$('inspector-details').textContent=show?'Hide Details':'Show Details';};
 ['strength','blur'].forEach(id=>$(id).addEventListener('input',()=>{$(id+'-value').value=$(id).value+(id==='strength'?'%':'px');sync();}));
 $('reset-blocks').onclick=()=>{$('strength').value=40;$('blur').value=4;$('strength-value').value='40%';$('blur-value').value='4px';$('review').value='clear';sync();};
 function settings(){return {guide:'settings',theme:$('theme').value,agent:$('agent').value,hover:$('hover').value==='on',state:$('state').value,copy:$('copy').value,review:$('review').value,strength:$('strength').value,blur:$('blur').value};}
 function sync(){const s=settings();document.documentElement.dataset.theme=s.theme;document.documentElement.dataset.selectedAgent=s.agent;document.querySelectorAll('iframe').forEach(f=>f.contentWindow.postMessage(s,'*'));document.querySelectorAll('.frame-wrap').forEach(w=>{w.dataset.width=$('width').value;w.style.setProperty('--frame-width',$('width').value+'px');});setTimeout(swatches,180);}
 function swatches(){const ctx=document.createElement('canvas').getContext('2d');document.querySelectorAll('[data-token]').forEach(e=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=getComputedStyle(e.querySelector('.chip')).backgroundColor;ctx.fillRect(0,0,1,1);const rgba=[...ctx.getImageData(0,0,1,1).data];e.querySelector('small').textContent='#'+rgba.slice(0,rgba[3]===255?3:4).map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase();});}
 fields.forEach(id=>$(id).addEventListener('change',sync));
 $('reset').onclick=()=>{$('state').value='neutral';$('hover').value='off';$('copy').value='success';document.querySelectorAll('iframe').forEach(f=>{f.srcdoc=f.srcdoc;});sync();};
 document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-tab]').forEach(x=>x.setAttribute('aria-pressed',x===b));document.querySelectorAll('[data-panel]').forEach(x=>x.hidden=x.dataset.panel!==b.dataset.tab);swatches();});
 document.querySelectorAll('[data-demo-action]').forEach(b=>b.onclick=()=>{$('notice').textContent='Example action completed. No data was sent.';});
 window.addEventListener('message',e=>{if(![...document.querySelectorAll('iframe')].some(f=>f.contentWindow===e.source))return;if(e.data?.guide==='ready'){e.source.postMessage(settings(),'*');e.source.postMessage({guide:'inspection',frozen:inspectorFrozen},'*');}if(e.data?.guide==='notice')$('notice').textContent=e.data.text;if(e.data?.guide==='block')$('block-report').textContent=e.data.text;if(e.data?.guide==='inspect'&&!inspectorFrozen){const d=e.data.details;$('inspection-summary').textContent=d.Element+' · '+d.Size+' · font '+d.Font;document.querySelectorAll('[data-inspect]').forEach(node=>{const value=d[node.dataset.inspect]||'—';if(node.textContent!==value)node.textContent=value;});}});
 window.addEventListener('DOMContentLoaded',()=>{sync();swatches();});
 </script></body></html>`;
 for(const [path,mime] of [['/assets/MarkPro-Bold.ttf','font/ttf'],['/assets/wavelength-worm.png','image/png'],['/assets/workshop-resources-qr.png','image/png'],['/favicon.png','image/png']]){
  const bytes=await readFile(new URL('../public'+path,import.meta.url));shell=shell.replaceAll(path,'data:'+mime+';base64,'+bytes.toString('base64'));
 }
 return withTheme(shell);
}

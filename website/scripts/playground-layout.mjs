// Outer Playground tooling only; app specimens keep their canonical controls.
export const playgroundLayoutCSS=String.raw`
:root{--playground-inset-gap:24px;--control-related-gap:8px;--control-label-gap:16px;--control-column-gap:24px;--control-row-gap:32px}
.egg-help{margin-top:12px}.egg-help summary{font-weight:600}.egg-help p{font-size:14px;color:var(--muted-text)}
#playground-title{align-items:flex-start}#playground-title>svg{margin-top:.075em}
.section-heading h2{align-items:flex-start}.section-heading h2>svg{align-self:flex-start;margin-top:calc((1.5em - 24px)/2)}
.playground-icon-entry h3{align-items:flex-start}.playground-icon-entry h3>svg{margin-top:1.5px}
#playground-icon-filter .choice-options{flex-wrap:nowrap;overflow-x:auto}#playground-icon-filter .choice{flex:none;white-space:nowrap}
nav[role=tablist] button{display:inline-flex;align-items:center;gap:8px}nav[role=tablist] button svg{width:20px;height:20px;flex:none}
nav[role=tablist]{border-bottom:0;padding-bottom:2px;background:none}
.panel-actions,.panel-options{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:var(--control-related-gap);margin-top:24px}
.control-footer{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:var(--control-row-gap) var(--control-column-gap);margin-top:32px}.control-footer>.panel-actions,.control-footer>.panel-options{margin:0}.control-footer>.choices{flex:1;min-width:180px}.control-footer>.checkbox-controls{flex:1}.control-footer .panel-actions{margin-left:auto}
.icon-button,.preview-expand{display:inline-flex;flex-direction:row;align-items:center;justify-content:center;gap:8px;width:max-content;max-width:100%;min-height:44px;white-space:nowrap}
.icon-button svg,.preview-expand svg{width:18px;height:18px;flex:none}.icon-button .action-label{display:inline}
#perspective-replay{width:max-content;justify-self:start;grid-column:1/-1;align-self:end;margin:0;font-size:14px;font-weight:600;gap:8px}
.preview-dialog:not(.is-expanded)>.frame-wrap{position:relative;isolation:isolate}
.preview-dialog:not(.is-expanded)>.frame-wrap>.preview-expand{position:absolute;bottom:12px;right:12px;z-index:2;box-shadow:var(--floating-control-shadow);height:44px}
.preview-dialog:not(.is-expanded)>.frame-wrap>.preview-expand .action-label{display:inline}
.panel:not(.is-expanded){padding:24px}
.preview-dialog.is-expanded>details:not(.preview-settings):not(.preview-state-settings){display:none}

/* Every inset surface has the same breathing room after its preceding controls. */
.panel>.frame-wrap,.panel>#playground-icon-catalog,.panel>.samples{margin-top:var(--playground-inset-gap)}
.panel>.state-tools,.panel>#copy,.panel>#icon-filter,.panel>.panel-options,.panel>.panel-actions{margin-bottom:0}
.panel>.muted{margin-bottom:0}.panel>.state-tools{margin-top:32px}
#login-preview .state-tools{display:flex!important;flex-flow:row nowrap;align-items:flex-start;gap:32px 24px}
#login-preview #login-destination{flex:0 0 auto}#login-preview #state{flex:1;min-width:0}
/* Expanded actions share one fixed-height row; only the title scrolls. */
.preview-dialog.is-expanded>.section-heading{display:flex;flex-wrap:nowrap;align-items:center;gap:8px;min-height:44px;flex:none}
.preview-dialog.is-expanded>.section-heading h2{display:flex;align-items:center;flex:1 1 0;flex-basis:0;min-width:0;white-space:nowrap;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;padding:0;line-height:44px;height:44px}
.preview-dialog.is-expanded>.section-heading h2>span{flex:none;min-width:max-content}.preview-dialog.is-expanded>.section-heading h2>svg{align-self:center;margin:0}
.heading-actions{display:flex;align-items:center;gap:8px;flex:none;position:relative;z-index:2}
.heading-actions:empty{display:none}.heading-actions button{width:44px;height:44px;padding:10px;box-shadow:none}
.heading-actions button .action-label{display:none!important}
.preview-dialog.is-expanded>.panel-actions{display:none}.preview-dialog.is-expanded>.frame-wrap{margin-top:16px}
.preview-dialog.is-expanded .expanded-state-controls{padding-bottom:12px}

/* Match the main app's pre-heading position and vertical type rhythm. */
.wrap{padding-inline:24px}
header.wrap{padding-top:40px;padding-bottom:0;width:calc(100% - 48px);max-width:1120px;padding-inline:0}
header.wrap .kicker{font-size:14px;line-height:21px;margin:0 0 24px}
header.wrap #playground-title{font-size:48px;line-height:1.2;letter-spacing:-.045em;margin:0 0 24px}
header.wrap p{font-size:16px;line-height:24px;margin:0;max-width:none}
.playground-heading~.toolbar .wrap{padding-top:32px;padding-bottom:40px;width:calc(100% - 48px);max-width:1120px;padding-inline:0}
.choices legend{font-size:14px;line-height:21px;margin-bottom:16px}
.choices .choice-options.segmented-toggle{display:inline-flex!important;flex-flow:row nowrap!important;align-items:center;position:relative;gap:4px!important;padding:4px!important;border:1px solid var(--control-border);border-radius:12px;background:var(--control-bg);max-width:100%;overflow-x:auto;scrollbar-width:thin;vertical-align:top}
.choice-options.segmented-toggle .choice{flex:none;white-space:nowrap}
.choice-options.segmented-toggle .choice span{height:40px;display:flex;align-items:center;padding:0 12px;border:0;border-radius:8px;background:transparent;color:var(--control-text)}
.choice-options.segmented-toggle .choice input:checked+span{background:transparent;color:var(--agent-ink)}
.choice-options.segmented-toggle .choice:hover span{box-shadow:none;background:color-mix(in srgb,var(--icon-ink) 8%,transparent)}
:root[data-focus-input="keyboard"] .choice-options.segmented-toggle .choice input:focus+span{outline-offset:-3px}
#login-preview #login-destination{flex:0 1 auto;min-width:0;max-width:45%}
@media(max-width:660px){header.wrap #playground-title{font-size:40px}header.wrap{padding-bottom:32px}header.wrap p{margin-bottom:0}#mobile-style-controls .primary-style-choices{display:flex;flex-wrap:wrap}.primary-style-choices>.choices{min-width:0;max-width:100%}}

.playground-brand-row{display:flex;align-items:center;min-height:54px;margin-bottom:40px}.playground-brand-row .brand{margin:0}
@media(max-width:380px){.playground-brand-row .brand{gap:6px}.playground-brand-row .brand-name{font-size:13px}.playground-brand-row .brand-mark img{width:36px}}
.choice-shell{display:inline-flex;max-width:100%;min-width:0;border:1px solid var(--control-border);border-radius:12px;background:var(--control-bg);vertical-align:top;overflow:hidden}
.choices .choice-shell .choice-options.segmented-toggle{min-width:0;border:0;background:transparent;border-radius:11px}
.choice-shell .choice-options{--overflow-left:0px;--overflow-right:0px;mask-image:linear-gradient(to right,transparent,#000 var(--overflow-left),#000 calc(100% - var(--overflow-right)),transparent);-webkit-mask-image:linear-gradient(to right,transparent,#000 var(--overflow-left),#000 calc(100% - var(--overflow-right)),transparent)}

.choice-shell .choice-options[data-overflow-left],.choice-shell .choice-options[data-overflow-right],[data-overflow-left],[data-overflow-right]{mask-composite:intersect;-webkit-mask-composite:source-in;mask-image:linear-gradient(to right,rgba(0,0,0,var(--overflow-left-alpha,1)),#000 36px,#000 calc(100% - 36px),rgba(0,0,0,var(--overflow-right-alpha,1))),linear-gradient(to bottom,#000 calc(100% - var(--overflow-bottom,0px)),transparent);-webkit-mask-image:linear-gradient(to right,rgba(0,0,0,var(--overflow-left-alpha,1)),#000 36px,#000 calc(100% - 36px),rgba(0,0,0,var(--overflow-right-alpha,1))),linear-gradient(to bottom,#000 calc(100% - var(--overflow-bottom,0px)),transparent)}
.tab-scroll-shell{position:relative;margin:4px 0 12px}.tab-scroll-shell::after{content:'';position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--border);pointer-events:none}
.tab-scroll-shell nav[role=tablist]{margin:0!important;background:none}
.control-footer>.panel-options{min-height:50px;align-items:center}
/* Shared label rhythm: 32px before a group, 16px from label to rail. */
.wrap{max-width:1168px}p{max-width:none}
.panel>.choices,.panel>.control-footer{margin-top:32px}
.state-tools,.toolbar #global-style-controls,.expanded-global-controls>#global-style-controls{row-gap:32px}
#mobile-style-controls .primary-style-choices{row-gap:32px}
#mobile-style-controls .choices{margin-top:32px}
#mobile-style-controls .primary-style-choices .choices{margin-top:0}
#mobile-style-controls .primary-style-choices{margin-top:32px}
.expanded-state-controls>.choices,.expanded-state-controls>.state-tools,.expanded-global-controls>#global-style-controls{margin-top:32px}
summary{list-style:none;cursor:pointer}summary::-webkit-details-marker{display:none}summary::marker{content:''}
summary>.disclosure-chevron{width:18px;height:18px;vertical-align:-3px;margin-right:8px;transition:transform 160ms;flex:none}
details[open]>summary>.disclosure-chevron{transform:rotate(90deg)}
#back-to-top,body>#style-options{right:max(24px,calc((100vw - 1120px)/2));top:var(--floating-tools-top,43px)}
@media(max-width:660px){#back-to-top{top:calc(var(--floating-tools-top,43px) + 56px)}}
#style-dialog{inset:var(--style-dialog-top,24px) 24px auto;margin:0;width:calc(100% - 48px);max-width:none;max-height:calc(100dvh - var(--style-dialog-top,24px) - 24px)}
#style-options{width:48px;height:48px;padding:11px}
#style-options svg{display:block;width:24px;height:24px}
#style-dialog #style-options{border:1px solid transparent;padding:11px}

/* Outer controls only: keep these tokens out of source specimen documents. */
.state-tools,.toolbar #global-style-controls,.expanded-global-controls>#global-style-controls,#mobile-style-controls .primary-style-choices{gap:var(--control-row-gap) var(--control-column-gap)}
.state-tools .field,.expanded-state-controls .field{margin-top:0;gap:16px}
.checkbox-controls{gap:32px 24px}.source-choice{gap:8px}
.panel-actions{gap:8px}.panel-options{gap:32px 24px}
.control-footer{column-gap:24px;row-gap:32px}
/* Optical alignment belongs to external tooling labels, never specimens or control contents. */
.choices legend{margin-bottom:var(--control-label-gap)}
.choice-options,nav[role=tablist]{overflow-y:hidden!important;overscroll-behavior-y:none}
summary{display:flex;align-items:center;gap:8px}summary>.disclosure-chevron{margin:0;vertical-align:initial}
#hover legend{width:100%}.hover-label-row{display:flex;align-items:center;flex-wrap:wrap;gap:8px 24px}
.hover-explainer{display:inline-flex;align-items:center;gap:4px;border:0;padding:0;background:transparent;font-size:14px;line-height:21px;font-weight:400;color:var(--muted-text)}
.hover-explainer svg{width:18px;height:18px;flex:none}.hover-explainer[aria-expanded=true] svg{transform:rotate(90deg)}
#inspector-toggle,.inspector-actions button{gap:8px}
#style-dialog-title{margin-bottom:32px}
#mobile-style-controls #global-style-controls{display:flex;flex-direction:column;gap:32px;min-width:0}
#mobile-style-controls #global-style-controls>*{min-width:0;max-width:100%}
#mobile-style-controls .primary-style-choices,#mobile-style-controls .choices{margin:0}
#hover legend{max-width:100%}
#hover .hover-explanation{font-size:14px;line-height:21px;font-weight:400;margin:0 0 16px;color:var(--muted-text)}
.toolbar #global-style-controls>div:not(.primary-style-choices){max-width:none}

/* Labels scroll normally; only the desktop control rails persist. */
.toolbar{position:relative;top:auto}
.toolbar.controls-pinned{height:var(--toolbar-flow-height)}
.toolbar.controls-pinned::before{content:'';position:fixed;inset:0 0 auto;height:var(--toolbar-pinned-height);background:var(--surface);border-bottom:1px solid var(--border)}
.playground-heading~.toolbar.controls-pinned #global-style-controls{position:fixed;top:0;left:50%;transform:translateX(-50%);padding-top:24px;padding-bottom:40px;align-items:flex-start}
.toolbar.controls-pinned legend{position:absolute;width:1px!important;height:1px;padding:0!important;margin:-1px!important;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.toolbar.controls-pinned .hover-explanation{display:none}
.toolbar.controls-pinned .hover-explainer{visibility:hidden}
main.wrap{padding-top:24px}
.tab-scroll-shell{height:var(--tab-row-height);margin:0 0 16px}
.tab-scroll-shell nav[role=tablist]{padding-top:0}
[data-panel]>.panel:first-child{margin-top:0}



.panel>p+details:has(>.rule-list),.panel>.feather-notice>p+details,.panel>p+.egg-help{margin-top:16px}
/* White-card explanation only: never descend into specimen surfaces or frames. */
.source-choice{font-family:inherit;font-size:14px;font-weight:600;line-height:1.5}
/* Align disclosure bodies with the summary text after its 18px chevron + 8px gap.
   Expanded preview settings and the separately rendered hover explainer retain their layout. */
.panel>details:not(.preview-settings):not(.preview-state-settings):not(.hover-help)>:not(summary),.panel>.feather-notice>details>:not(summary){margin-inline-start:26px}

@media(max-width:660px){#login-preview .state-tools{flex-direction:column;gap:var(--control-row-gap)}#login-preview .state-tools>.choices{width:100%;flex:auto}#login-preview #login-destination{max-width:100%;width:100%}#login-destination .choice-options{flex-direction:row}}
`;

export const playgroundLayoutScript=String.raw`
const tabRail=document.querySelector('nav[role=tablist]'),tabShell=document.createElement('div');tabShell.className='tab-scroll-shell';tabRail.before(tabShell);tabShell.append(tabRail);
// Keep the native scrollbar in the lower gap, outside the tab row's layout height.
const measureTabRow=()=>tabShell.style.setProperty('--tab-row-height',tabRail.querySelector('button').getBoundingClientRect().height+'px');
new ResizeObserver(measureTabRow).observe(tabRail);document.fonts.ready.then(measureTabRow);measureTabRow();
const updateFloatingTools=()=>{const brand=document.querySelector('.playground-brand-row').getBoundingClientRect();document.documentElement.style.setProperty('--floating-tools-top',Math.max(24,brand.top+(brand.height-48)/2)+'px');};
addEventListener('scroll',updateFloatingTools,{passive:true});addEventListener('resize',updateFloatingTools);updateFloatingTools();
const previewActionHomes=new WeakMap();
function placePreviewActions(dialog,expanded){
 const footer=dialog.querySelector('.control-footer');if(footer){if(expanded){footer.before(Object.assign(document.createElement('span'),{id:'branding-footer-home',hidden:true}));dialog.querySelector('.expanded-state-controls').append(footer);}else document.getElementById('branding-footer-home')?.replaceWith(footer);}
 const heading=dialog.querySelector('.section-heading'),actions=heading.querySelector('.heading-actions');
 for(const {button,home} of previewActionHomes.get(dialog)||[]){if(expanded)actions.append(button);else home.before(button);}
}
for(const dialog of document.querySelectorAll('.preview-dialog')){
 const heading=dialog.querySelector('.section-heading'),frame=dialog.querySelector('.frame-wrap');
 const row=document.createElement('div');row.className='panel-actions';
 const headingActions=document.createElement('div');headingActions.className='heading-actions';heading.append(headingActions);
 const homes=[];
 for(const button of [...heading.querySelectorAll('button')]){
  const expand=button.classList.contains('preview-expand'),copy=button.id==='copy-worm'||button.id==='perspective-copy';
  const text=expand?'Expand View':copy?'Copy Values':'Reset Defaults';
  button.setAttribute('aria-label',text);button.title=text;
  let label=button.querySelector('span:not(.expand-icon):not(.contract-icon)');
  if(!label){label=document.createElement('span');button.append(label);}label.classList.add('action-label');label.textContent=text;
  (expand?frame:row).append(button);
  const home=document.createComment('preview-action-home');button.after(home);homes.push({button,home});
 }
 if(row.children.length)frame.before(row);
 previewActionHomes.set(dialog,homes);
}
// Checkboxes belong with their controls, never in the module heading.
for(const choice of document.querySelectorAll('.section-heading .source-choice')){
 const panel=choice.closest('.panel'),row=document.createElement('div');row.className='panel-options';row.append(choice);panel.querySelector('.frame-wrap').before(row);
}
// Share the last control row where space allows; retain natural wrapping on phones.
const branding=document.getElementById('branding-preview'),checks=branding.querySelector('.checkbox-controls'),brandActions=branding.querySelector('.panel-actions');
const brandFooter=document.createElement('div');brandFooter.className='control-footer';brandActions.before(brandFooter);brandFooter.append(checks,brandActions);
for(const [filterId,sourceId] of [['icon-filter','show-sources'],['playground-icon-filter','show-playground-sources']]){const filter=document.getElementById(filterId),sourceOptions=document.getElementById(sourceId).closest('.panel-options'),iconFooter=document.createElement('div');iconFooter.className='control-footer';filter.before(iconFooter);iconFooter.append(filter,sourceOptions);}
// Derive tab icons from each section's first actual panel heading.
for(const tab of document.querySelectorAll('[data-tab]')){
 const source=document.querySelector('[data-panel="'+tab.dataset.tab+'"] .section-heading h2 svg');
 if(!source)throw Error('Missing first panel icon for '+tab.dataset.tab);
 const icon=source.cloneNode(true);icon.dataset.iconUse='playground-tab-'+tab.dataset.tab;tab.prepend(icon);
}
function centerPlaygroundTab(tab){
 if(!tab)return;
 const nav=tab.parentElement;
 if(!matchMedia('(max-width:660px)').matches){const r=tab.getBoundingClientRect(),n=nav.getBoundingClientRect();if(r.left<n.left)nav.scrollLeft+=r.left-n.left;else if(r.right>n.right)nav.scrollLeft+=r.right-n.right;return;}
 const r=tab.getBoundingClientRect(),n=nav.getBoundingClientRect();
 nav.scrollTo({left:nav.scrollLeft+r.left+r.width/2-n.left-nav.clientWidth/2,behavior:'instant'});
}
`;

// The original toolbar footprint prevents layout jumps when its controls pin.
export const playgroundStickyControlsScript=String.raw`
const stickyToolbar=document.querySelector('.toolbar'),stickyControls=document.getElementById('global-style-controls');
let stickyThreshold=Infinity,stickyWidth=0;
function setStickyMetrics(){
 const height=stickyControls.getBoundingClientRect().height;
 stickyToolbar.style.setProperty('--toolbar-pinned-height',height+'px');
 document.documentElement.style.setProperty('--toolbar-height',(stickyToolbar.classList.contains('controls-pinned')?height:stickyToolbar.offsetHeight)+'px');
}
function updateStickyControls(){
 const eligible=innerWidth>660&&stickyControls.parentElement===stickyToolbar;
 stickyToolbar.classList.toggle('controls-pinned',eligible&&scrollY>=stickyThreshold);
 setStickyMetrics();
}
function measureStickyControls(){
 stickyToolbar.classList.remove('controls-pinned');
 const shell=stickyControls.querySelector('.choice-shell');
 if(innerWidth>660&&stickyControls.parentElement===stickyToolbar&&shell){
  stickyToolbar.style.setProperty('--toolbar-flow-height',stickyToolbar.getBoundingClientRect().height+'px');
  stickyThreshold=shell.getBoundingClientRect().top+scrollY-24;
 }else stickyThreshold=Infinity;
 stickyWidth=innerWidth;updateStickyControls();
}
addEventListener('scroll',updateStickyControls,{passive:true});
addEventListener('resize',measureStickyControls);
new ResizeObserver(()=>{if(!stickyToolbar.classList.contains('controls-pinned')||stickyWidth!==innerWidth)measureStickyControls();else setStickyMetrics();}).observe(stickyControls);
new MutationObserver(measureStickyControls).observe(stickyToolbar,{childList:true});
document.fonts.ready.then(measureStickyControls);measureStickyControls();
`;

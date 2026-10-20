import {overflowFadeCSS} from '../lib/workshop-overflow.mjs';
// Outer Playground tooling only; app specimens keep their canonical controls.
export const playgroundLayoutCSS=String.raw`
:root{--playground-inset-gap:32px;--control-related-gap:8px;--control-label-gap:16px;--control-column-gap:36px;--control-row-gap:32px}
.egg-help{margin-top:12px}.egg-help summary{font-weight:600}.egg-help p{font-size:14px;color:var(--muted-text)}
#playground-title{align-items:flex-start}#playground-title>svg{margin-top:.075em}
.section-heading h2{align-items:flex-start}.section-heading h2>svg{align-self:flex-start;margin-top:calc((1.5em - 24px)/2)}
.playground-icon-entry h3{align-items:flex-start}.playground-icon-entry h3>svg{margin-top:1.5px}
#playground-icon-filter .choice-options{flex-wrap:nowrap;overflow-x:auto}#playground-icon-filter .choice{flex:none;white-space:nowrap}
nav[role=tablist] button{display:inline-flex;align-items:center;gap:8px}nav[role=tablist] button svg{width:20px;height:20px;flex:none}
nav[role=tablist]{border-bottom:0;padding-bottom:0;gap:0!important;background:none}
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
#login-preview .state-tools{display:flex!important;flex-flow:row nowrap;align-items:flex-start;gap:32px}
#login-preview #login-destination{flex:0 0 auto}#login-preview #state{flex:1;min-width:0}
/* Expanded actions share one fixed-height row; only the title scrolls. */
.preview-dialog.is-expanded>.section-heading{display:flex;flex-wrap:nowrap;align-items:center;gap:8px;min-height:44px;flex:none}
.preview-dialog.is-expanded>.section-heading h2{display:flex;align-items:center;flex:1 1 0;flex-basis:0;min-width:0;white-space:nowrap;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;padding:0;line-height:44px;height:44px}
.preview-dialog.is-expanded>.section-heading h2>span{flex:none;min-width:max-content}.preview-dialog.is-expanded>.section-heading h2>svg{align-self:center;margin:0}
.heading-actions{display:flex;align-items:center;gap:8px;flex:none;position:relative;z-index:2}
.heading-actions:empty{display:none}.heading-actions button{width:44px;height:44px;padding:10px;box-shadow:none}
.heading-actions button .action-label{display:none!important}
.preview-dialog.is-expanded>.panel-actions{display:none}
.expanded-state-controls>:is(.selector-row,.choices,.state-tools,.panel-actions,.panel-options,.control-footer,.checkbox-controls){margin-block:32px}.expanded-state-controls>.panel-actions{display:flex;justify-content:flex-start}.preview-dialog.is-expanded>.frame-wrap{margin-top:16px}
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
.choice-options.segmented-toggle .choice:hover span{box-shadow:none;background:transparent}
.choice-options.segmented-toggle .choice:hover input:not(:checked)+span{color:var(--text)}
:root[data-focus-input="keyboard"] .choice-options.segmented-toggle .choice input:focus+span{outline-offset:-3px}
#login-preview #login-destination{flex:0 1 auto;min-width:0;max-width:45%}
@media(max-width:660px){header.wrap #playground-title{font-size:40px}header.wrap{padding-bottom:32px}header.wrap p{margin-bottom:0}#mobile-style-controls .primary-style-choices{display:flex;flex-wrap:wrap}.primary-style-choices>.choices{min-width:0;max-width:100%}}

.playground-brand-row{display:flex;align-items:center;min-height:54px;margin-bottom:40px}.playground-brand-row .brand{margin:0}
@media(max-width:380px){.playground-brand-row .brand{gap:6px}.playground-brand-row .brand-name{font-size:13px}.playground-brand-row .brand-worm{--brand-mark-width:36px}.playground-brand-row .brand-mark img{width:36px}}
.choice-shell{display:inline-flex;max-width:100%;min-width:0;border:1px solid var(--control-border);border-radius:12px;background:var(--control-bg);vertical-align:top;overflow:hidden}
.choices .choice-shell .choice-options.segmented-toggle{min-width:0;border:0;background:transparent;border-radius:11px}
.choice-shell .choice-options{--overflow-left:0px;--overflow-right:0px;mask-image:linear-gradient(to right,transparent,#000 var(--overflow-left),#000 calc(100% - var(--overflow-right)),transparent);-webkit-mask-image:linear-gradient(to right,transparent,#000 var(--overflow-left),#000 calc(100% - var(--overflow-right)),transparent)}

${overflowFadeCSS}
.tab-scroll-shell{position:relative;margin:4px 0 12px}.tab-scroll-shell::after{content:'';position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--border);pointer-events:none}
.tab-scroll-shell nav[role=tablist]{margin:0!important;padding-inline:0;background:none}
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
.state-tools:has(>.field){margin-inline:-4px;width:calc(100% + 8px);grid-template-columns:repeat(auto-fit,minmax(min(100%,max(280px,calc((100% - 64px)/3))),1fr));column-gap:32px;row-gap:32px}
.state-tools:has(>.field)>*{padding-inline:4px}
.state-tools .field,.expanded-state-controls .field{margin-top:0;gap:4px}
.slider-label,.slider-label output{font:600 14px/21px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.checkbox-controls{gap:32px}.source-choice{gap:8px}
.panel-actions{gap:32px 8px}.panel-options{gap:32px}
.control-footer{column-gap:32px;row-gap:32px}
/* Optical alignment belongs to external tooling labels, never specimens or control contents. */
.choices legend{margin-bottom:var(--control-label-gap)}
.choice-options,nav[role=tablist]{overflow-y:hidden!important;overscroll-behavior-y:auto}
summary{display:flex;align-items:center;gap:8px;position:relative;border-radius:6px}
summary::after,.hover-explainer::after{content:'';position:absolute;inset:-4px;border-radius:6px;cursor:pointer}
summary:hover,.hover-explainer:hover{background:var(--hover);box-shadow:0 0 0 4px var(--hover)}
summary,summary *,.hover-explainer,.hover-explainer *{cursor:pointer!important}
.hover-explainer{position:relative}
.icon-usages summary{font-size:14px;line-height:1.5;font-weight:600;padding:8px 0;border-bottom:0;background:color-mix(in srgb,var(--agent-accent) 5%,var(--surface))}
.icon-usages summary>svg{color:var(--icon-ink)}
.panel>:is(.selector-row,.state-tools,.choices,.control-footer,.panel-actions,.panel-options,.checkbox-controls){margin-block:32px}
.panel>:is(.selector-row,.state-tools,.choices,.control-footer,.panel-actions,.panel-options,.checkbox-controls)+*{margin-top:32px}summary>.disclosure-chevron{margin:0;vertical-align:initial}
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
.toolbar{position:relative;top:auto;overflow-anchor:none}
.tab-scroll-anchor,.tab-scroll-shell{overflow-anchor:none}
.toolbar.controls-pinned{height:var(--toolbar-flow-height)}
.toolbar.controls-pinned::before{content:'';position:fixed;inset:0 0 auto;height:var(--toolbar-pinned-height);background:var(--surface);border-bottom:1px solid var(--border)}
.playground-heading~.toolbar.controls-pinned #global-style-controls{position:fixed;top:0;left:50%;transform:translateX(-50%);padding-top:24px;padding-bottom:40px;align-items:flex-start}
.toolbar legend{opacity:var(--toolbar-label-opacity,1)}
.toolbar.controls-pinned legend{opacity:0!important;position:absolute;width:1px!important;height:1px;padding:0!important;margin:-1px!important;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.toolbar.controls-pinned .hover-explanation{display:none}
.toolbar.controls-pinned .hover-explainer{visibility:hidden}
main.wrap{padding-top:24px}
.tab-scroll-shell{height:var(--tab-row-height);margin:0 0 16px;position:sticky;top:var(--sticky-tab-top,0px);z-index:11;background:var(--page);box-shadow:none}
.choice-options,nav[role=tablist]{--overflow-feather:108px;--overflow-shoulder:36px}
@media(max-width:660px){.choice-options,nav[role=tablist]{--overflow-feather:54px;--overflow-shoulder:18px}}
.tab-scroll-shell nav[role=tablist]{padding-top:0}
.tab-scroll-shell nav[role=tablist] button[aria-selected=true]{background:color-mix(in srgb,var(--agent-accent) 8%,var(--page))}
.tab-scroll-shell::before{content:'';position:absolute;inset:-24px 0 100%;background:var(--page);pointer-events:none}
@media(max-width:660px){
 /* WebKit samples the hit-tested fixed/sticky ancestor, not a backdrop sibling. */
 .tab-scroll-shell.mobile-edge-header{top:0;margin-bottom:16px;width:100vw;margin-inline:calc((100% - 100vw)/2);padding-inline:24px;box-sizing:border-box}
 .tab-scroll-shell::after{left:24px;right:24px}
 .tab-scroll-shell::before{top:-100vh;left:calc((100% - 100vw)/2);right:calc((100% - 100vw)/2);opacity:var(--mobile-header-fill,0)}
 .tab-scroll-shell.is-pinned::before{top:-100vh;left:calc((100% - 100vw)/2);right:calc((100% - 100vw)/2)}
 body>#style-options{top:var(--floating-tools-top,24px);right:24px}
 #back-to-top{top:calc(var(--floating-tools-top,24px) + 56px);right:24px}
}
[data-panel]>.panel:first-child{margin-top:0}



.panel>p+details:has(>.rule-list),.panel>.feather-notice>p+details,.panel>p+.egg-help{margin-top:16px}
/* White-card explanation only: never descend into specimen surfaces or frames. */
.source-choice{font-family:inherit;font-size:14px;font-weight:600;line-height:1.5}
/* Align disclosure bodies with the summary text after its 18px chevron + 8px gap.
   Expanded preview settings and the separately rendered hover explainer retain their layout. */
.panel>details:not(.preview-settings):not(.preview-state-settings):not(.hover-help)>:not(summary),.panel>.feather-notice>details>:not(summary){margin-inline-start:26px}

@media(max-width:660px){#login-preview .state-tools{flex-direction:column;gap:var(--control-row-gap)}#login-preview .state-tools>.choices{width:100%;flex:auto}#login-preview #login-destination{max-width:100%;width:100%}#login-destination .choice-options{flex-direction:row}}

/* One disclosure treatment for explanatory controls; body-sized where in prose. */
.disclosure-accent>summary,.hover-explainer{color:var(--text);background:color-mix(in srgb,var(--agent-accent) 5%,var(--surface));font-weight:600}
.disclosure-accent>summary{font-size:16px;line-height:24px;padding-block:8px}
.disclosure-accent>summary>.disclosure-chevron,.hover-explainer svg{color:var(--icon-ink)}
.source-rules>.disclosure-body{margin-top:16px;margin-inline-start:calc(26px - var(--disclosure-ink-inset) - 4px)!important;padding:16px 24px;border:1px solid var(--border);border-radius:12px;background:var(--page)}
.source-rules .rule-list>div:first-child{padding-top:0}.source-rules .rule-list>div:last-child{border-bottom:0;padding-bottom:0}
.reference-intro-copy{margin-inline-start:calc(26px - var(--disclosure-ink-inset));margin-top:16px}
.reference-intro-copy>:last-child{margin-bottom:0}
/* Inline grey viewports grow vertically; only horizontal inspection scrolls. */
.preview-dialog:not(.is-expanded)>.frame-wrap{max-height:none;overflow-x:auto;overflow-y:hidden}
.preview-dialog:not(.is-expanded) iframe{height:var(--natural-frame-height,760px)!important;max-height:none}
.panel>.frame-wrap:has(>#type-frame,>#icons-frame,>#errors-frame,>#focus-frame,>#link-type-frame){max-height:none;overflow-x:auto;overflow-y:hidden}
`;

export const playgroundLayoutScript=String.raw`
const tabRail=document.querySelector('nav[role=tablist]'),tabShell=document.createElement('div');tabShell.className='tab-scroll-shell mobile-edge-header';const tabAnchor=document.createElement('div');tabAnchor.className='tab-scroll-anchor';tabRail.before(tabAnchor,tabShell);tabShell.append(tabRail);
// Keep the native scrollbar in the lower gap, outside the tab row's layout height.
const measureTabRow=()=>{const height=tabRail.querySelector('button').getBoundingClientRect().height+'px';tabShell.style.setProperty('--tab-row-height',height);};
new ResizeObserver(measureTabRow).observe(tabRail);document.fonts.ready.then(measureTabRow);measureTabRow();
const updateFloatingTools=()=>{const brand=document.querySelector('.playground-brand-row').getBoundingClientRect();document.documentElement.style.setProperty('--floating-tools-top',(innerWidth<=660?Math.max(24,brand.top+(brand.height-48)/2,tabShell.getBoundingClientRect().height+12-Math.max(0,tabShell.getBoundingClientRect().top)):Math.max(24,brand.top+(brand.height-48)/2))+'px');};
addEventListener('scroll',updateFloatingTools,{passive:true});addEventListener('resize',updateFloatingTools);updateFloatingTools();
const previewActionHomes=new WeakMap();
function placePreviewActions(dialog,expanded){
 const footer=dialog.querySelector('.control-footer');if(footer){if(expanded){footer.before(Object.assign(document.createElement('span'),{id:'branding-footer-home',hidden:true}));dialog.querySelector('.expanded-state-controls').append(footer);}else document.getElementById('branding-footer-home')?.replaceWith(footer);}
 const heading=dialog.querySelector('.section-heading'),actions=heading.querySelector('.heading-actions');
 for(const {button,home} of previewActionHomes.get(dialog)||[]){if(expanded){if(button.classList.contains("preview-expand"))actions.append(button);}else home.before(button);}
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
 const replay=dialog.querySelector('#perspective-replay');if(replay)row.prepend(replay);if(row.children.length)frame.before(row);
 previewActionHomes.set(dialog,homes);
}
// Checkboxes belong with their controls, never in the module heading.
for(const choice of document.querySelectorAll('.section-heading .source-choice')){
 const panel=choice.closest('.panel'),row=document.createElement('div');row.className='panel-options';row.append(choice);panel.querySelector('.frame-wrap').before(row);
}
// Share the last control row where space allows; retain natural wrapping on phones.
const branding=document.getElementById('branding-preview'),checks=branding.querySelector('.checkbox-controls'),brandActions=branding.querySelector('.panel-actions');
const brandFooter=document.createElement('div');brandFooter.className='control-footer';brandActions.before(brandFooter);brandFooter.append(checks,brandActions);
for(const [filterId,sourceId] of [['icon-filter','show-sources'],['playground-icon-filter','show-playground-sources']]){if(filterId==='playground-icon-filter')continue;const filter=document.getElementById(filterId),sourceOptions=document.getElementById(sourceId).closest('.panel-options'),iconFooter=document.createElement('div');iconFooter.className='control-footer';filter.before(iconFooter);iconFooter.append(filter,sourceOptions);}
// Derive tab icons from each section's first actual panel heading.
for(const tab of document.querySelectorAll('[data-tab]')){
 const source=document.querySelector('[data-panel="'+tab.dataset.tab+'"] .section-heading h2 svg');
 if(!source)throw Error('Missing first panel icon for '+tab.dataset.tab);
 const icon=source.cloneNode(true);icon.dataset.iconUse='playground-tab-'+tab.dataset.tab;tab.prepend(icon);
}
// Keep selected items clear of the same fade that the track renders.
function revealPlaygroundOption(track,item){
 if(!item||!track.clientWidth)return;
 const items=[...track.children].filter(e=>e.matches('.choice,[role=tab]'));
 const max=Math.max(0,track.scrollWidth-track.clientWidth);
 const r=item.getBoundingClientRect(),t=track.getBoundingClientRect();
 let left=track.scrollLeft;
 if(item===items[0])left=0;
 else if(item===items.at(-1))left=max;
 else if(matchMedia('(max-width:660px)').matches)left+=r.left+r.width/2-t.left-track.clientWidth/2;
 else{
  const fade=parseFloat(getComputedStyle(track).getPropertyValue('--overflow-feather'))||108;
  const clearance=Math.min(fade,Math.max(0,(track.clientWidth-r.width)/2));
  if(r.left<t.left+clearance)left+=r.left-t.left-clearance;
  else if(r.right>t.right-clearance)left+=r.right-t.right+clearance;
 }
 track.scrollTo({left:Math.max(0,Math.min(max,left)),behavior:'instant'});
}
function centerPlaygroundTab(tab){if(tab)revealPlaygroundOption(tab.parentElement,tab);}

`;

// The original toolbar footprint prevents layout jumps when its controls pin.
export const playgroundStickyControlsScript=String.raw`
const stickyToolbar=document.querySelector('.toolbar'),stickyControls=document.getElementById('global-style-controls');
let stickyThreshold=Infinity,stickyWidth=0;
function setStickyMetrics(){
 const height=Math.ceil(stickyControls.getBoundingClientRect().height);
 stickyToolbar.style.setProperty('--toolbar-pinned-height',height+'px');
 document.documentElement.style.setProperty('--sticky-tab-top',(innerWidth<=660?0:stickyToolbar.classList.contains('controls-pinned')?height+25:24)+'px');
 document.documentElement.style.setProperty('--toolbar-height',(stickyToolbar.classList.contains('controls-pinned')?height:stickyToolbar.offsetHeight)+'px');
}
function updateStickyControls(){
 const eligible=innerWidth>660&&stickyControls.parentElement===stickyToolbar;
 stickyToolbar.style.setProperty('--toolbar-label-opacity',String(eligible?Math.max(0,Math.min(1,(stickyThreshold-scrollY)/64)):1));stickyToolbar.classList.toggle('controls-pinned',eligible&&scrollY>=stickyThreshold);
 setStickyMetrics();
 const tabs=document.querySelector('.tab-scroll-shell'),top=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sticky-tab-top'));const distance=tabs.getBoundingClientRect().top-top;tabs.classList.toggle('is-pinned',distance<=.5);const fill=String(Math.max(0,Math.min(1,1-distance/64)));tabs.style.setProperty('--mobile-header-fill',fill);updateFloatingTools();
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
function scrollToPlaygroundTab(){
 const anchor=document.querySelector('.tab-scroll-anchor'),y=anchor.getBoundingClientRect().top+scrollY;
 window.scrollTo({top:y,behavior:'instant'});updateStickyControls();
 const top=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sticky-tab-top'))||0;
 window.scrollTo({top:Math.ceil(y-top),behavior:'instant'});updateStickyControls();
}
addEventListener('scroll',updateStickyControls,{passive:true});
addEventListener('resize',measureStickyControls);
new ResizeObserver(()=>{if(!stickyToolbar.classList.contains('controls-pinned')||stickyWidth!==innerWidth)measureStickyControls();else setStickyMetrics();}).observe(stickyControls);
new MutationObserver(measureStickyControls).observe(stickyToolbar,{childList:true});
document.fonts.ready.then(measureStickyControls);measureStickyControls();
`;

export const selectorRowCSS=`
/* Keep the tab landing reachable while lazy specimen frames are still empty. */
[data-panel]{min-height:calc(100dvh - var(--sticky-tab-top,24px))}
[data-panel]>.panel{margin-block:16px}
#panel-url-reference .url-reference-intro{margin-bottom:16px}
#perspective-replay{padding:10px;gap:8px}.panel-actions>button{margin-inline:0}
.preview-dialog.is-expanded .expanded-state-controls>:is(.selector-row,.state-tools,.choices,.panel-actions,.panel-options,.control-footer,.checkbox-controls){margin-block:32px}
.preview-dialog.is-expanded .expanded-state-controls .field{margin-top:0;gap:4px}
.preview-dialog.is-expanded .panel-actions{justify-content:flex-end}
.panel:has(#link-type-frame)>.frame-wrap{max-height:none;overflow:visible}
#link-type-frame{max-height:none}

.selector-row{display:flex;flex-wrap:wrap;align-items:flex-start;gap:32px 36px;min-width:0;max-width:100%;grid-column:1/-1}
.selector-row>.choices,#login-preview .selector-row>.choices{flex:0 0 auto;width:max-content;max-width:100%;min-width:0;margin:0}
.selector-row .choice-shell{max-width:100%}
`;

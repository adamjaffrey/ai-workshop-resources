// Outer Playground tooling only; app specimens keep their canonical controls.
export const playgroundLayoutCSS=String.raw`
:root{--playground-inset-gap:24px}
#playground-title{align-items:flex-start}#playground-title>svg{margin-top:.075em}
.section-heading h2{align-items:flex-start}.section-heading h2>svg{align-self:flex-start;margin-top:calc((1.5em - 24px)/2)}
.playground-icon-entry h3{align-items:flex-start}.playground-icon-entry h3>svg{margin-top:1.5px}
#playground-icon-filter .choice-options{flex-wrap:nowrap;overflow-x:auto}#playground-icon-filter .choice{flex:none;white-space:nowrap}
nav[role=tablist] button{display:inline-flex;align-items:center;gap:8px}nav[role=tablist] button svg{width:20px;height:20px;flex:none}
nav[role=tablist]{border-bottom:0;padding-bottom:14px;background:linear-gradient(var(--border),var(--border)) left calc(100% - 14px)/100% 1px no-repeat}
.panel-actions,.panel-options{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:12px;margin-top:16px}
.control-footer{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:12px;margin-top:16px}.control-footer>.panel-actions,.control-footer>.panel-options{margin:0}.control-footer>.choices{flex:1;min-width:180px}.control-footer>.checkbox-controls{flex:1}.control-footer .panel-actions{margin-left:auto}
.icon-button,.preview-expand{display:inline-flex;flex-direction:row;align-items:center;justify-content:center;gap:6px;width:max-content;max-width:100%;min-height:44px;white-space:nowrap}
.icon-button svg,.preview-expand svg{width:18px;height:18px;flex:none}.icon-button .action-label{display:inline}
#perspective-replay{width:max-content;justify-self:start;grid-column:1/-1;align-self:end;margin:0;font-size:14px;font-weight:600;gap:6px}
.preview-dialog:not(.is-expanded)>.frame-wrap{position:relative;isolation:isolate}
.preview-dialog:not(.is-expanded)>.frame-wrap>.preview-expand{position:absolute;bottom:12px;right:12px;z-index:2;box-shadow:var(--floating-control-shadow);height:44px}
.preview-dialog:not(.is-expanded)>.frame-wrap>.preview-expand .action-label{display:inline}
/* Every inset surface has the same breathing room after its preceding controls. */
.panel>.frame-wrap,.panel>#playground-icon-catalog,.panel>.samples{margin-top:var(--playground-inset-gap)}
.panel>.state-tools,.panel>#copy,.panel>#icon-filter,.panel>.panel-options,.panel>.panel-actions{margin-bottom:0}
.panel>.muted{margin-bottom:0}.panel>.state-tools{margin-top:16px}
#login-preview .state-tools{display:flex!important;flex-flow:row nowrap;align-items:flex-start;gap:12px}
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
`;

export const playgroundLayoutScript=String.raw`
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

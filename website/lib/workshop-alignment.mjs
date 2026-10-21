import ink from './workshop-icon-ink.generated.json' with {type:'json'};
// Two rails per layout scope: text/square objects, and rounded surfaces 4px outward.
// Explicit component boundaries prevent nested controls from accumulating offsets.
const headingInkCSS=Object.entries(ink.icons).map(([name,{left}])=>`
:is(#playground-title,.panel>.section-heading h2,.playground-icon-entry h3,.url-reference-subheading):has(>svg[data-icon-name="${name}"]){--icon-ink-fraction:${left/ink.viewBox};margin-inline-start:calc(-1 * var(--icon-ink-fraction) * var(--heading-icon-size,24px))}
`).join('')+Object.entries(ink.variants).map(([key,m])=>{const [name,viewBox]=key.split(':');return `:is(#playground-title,.panel>.section-heading h2,.playground-icon-entry h3,.url-reference-subheading):has(>svg[data-icon-name="${name}"][viewBox="${viewBox}"]){--icon-ink-fraction:${m.left/m.viewBox}}`;}).join('');
export function assertMeasuredHeadingIcon(name){if(!ink.icons[name])throw Error('Measure heading icon '+name+' with scripts/measure-alignment-icons.mjs');}
export const alignmentCSS = String.raw`
:root{--specimen-error-nudge:calc(-18px * ${ink.icons.x.left}/24);--specimen-text-rail:28px;--optical-offset:4px;--external-text-inset:var(--optical-offset);--playground-external-text-inset:var(--optical-offset)}
#playground-title{--heading-icon-size:1em}
/* A 20px marker column shares the prose-list indent. Lucide's visible ink is
   centred in that column, with rotation around its own ink centre. */
:root{--disclosure-text-inset:var(--body-list-indent,20px);--disclosure-marker-centre:12px}
:is(summary:has(>.disclosure-chevron),.hover-explainer,#inspector-toggle,#inspector-details){display:grid;grid-template-columns:var(--disclosure-text-inset) minmax(0,1fr);align-items:center;column-gap:0;margin-inline-start:0;padding-inline-start:0;text-align:left}
:is(summary:has(>.disclosure-chevron),.hover-explainer,#inspector-toggle,#inspector-details)>svg{width:18px;height:18px;margin:0;margin-inline-start:calc(var(--disclosure-marker-centre) - ${((ink.icons['chevron-right'].left + 24 - ink.icons['chevron-right'].right)/2)/24*18}px);transform-box:fill-box;transform-origin:center}
#inspector-toggle{padding-inline:0!important}
/* Compact disclosures size their painted background around the complete label. */
:is(.hover-explainer,#inspector-details){inline-size:max-content;max-inline-size:100%;min-inline-size:0;padding-inline-end:10px}
:is(.hover-explainer,#inspector-details)>span{min-inline-size:0;overflow-wrap:anywhere}

/* Public utility contract for future components. A scope owns its text rail. */
.alignment-scope{padding-inline:calc(var(--surface-padding,24px) + var(--optical-offset))}
.alignment-surface{margin-inline:calc(-1 * var(--optical-offset));width:calc(100% + 2 * var(--optical-offset));max-width:none}
.alignment-square,.alignment-text{margin-inline:0}
/* Main page: preserve the 24px surface gutter and move the shared text rail to 28px. */
main:is(#workshop-content,.page-placeholder)>*{width:calc(100% - 56px);max-width:952px}
:is(#workshop-content,.page-placeholder) .step-copy,:is(#workshop-content,.page-placeholder) .controls-label,:is(#workshop-content,.page-placeholder) .description{padding-inline:0}
:is(#workshop-content,.page-placeholder) .step-row>article{margin-inline:calc(-1 * var(--optical-offset));padding-inline:calc(32px + var(--optical-offset))}
:is(#workshop-content,.page-placeholder) .step-row>article>.code-wrap{margin-inline:calc(-1 * var(--optical-offset))}
:is(#workshop-content,.page-placeholder) .card-heading{margin-inline-start:calc(-1 * var(--optical-offset))}
:is(#workshop-content,.page-placeholder) .controls>.toggle,:is(#workshop-content,.page-placeholder) .controls>.sticky-control-slot{margin-inline-start:calc(-1 * var(--optical-offset))}
:is(#workshop-content,.page-placeholder) .page-toolbar>.theme-toggle,:is(#workshop-content,.page-placeholder) .page-toolbar>.sticky-control-slot{margin-inline-end:calc(-1 * var(--optical-offset))}
:is(#workshop-content,.page-placeholder) .page-header>.qr-card{margin-inline:-4px}
:is(#workshop-content,.page-placeholder) .footer-content>:is(form,.ph-form){margin-inline-end:calc(-1 * var(--optical-offset))}
:is(#workshop-content,.page-placeholder) footer.is-stacked .footer-content>:is(form,.ph-form){margin-inline:0}
@media(max-width:660px){:is(#workshop-content,.page-placeholder) .step-row>article{padding-inline:calc(24px + var(--optical-offset))}}
/* A prompt panel owns a new rail. Its square text area stays on that rail. */
.code-header{padding-inline:20px}.code-header>.copy{margin-inline-end:calc(-1 * var(--optical-offset))}
.code-wrap>pre,.code-wrap>.status:not(:empty){padding-inline:20px}
@media(max-width:660px){.code-header,.code-wrap>pre,.code-wrap>.status:not(:empty){padding-inline:16px}}
.access-gate{padding:24px}
/* Login uses the same scope, including hosted Playground login and held states. */
.gate-panel:not(.specimen-context):not(.focus-context){padding-inline:calc(32px + var(--optical-offset))}
.gate-panel #gate-title,.gate-panel #gate-description,.gate-panel .eyebrow,.gate-panel label,.gate-panel .gate-error{padding-inline:0}
.gate-panel>.password-field,.gate-panel>.gate-submit,.gate-panel>noscript>.javascript-notice,.gate-panel>.javascript-notice,.gate-panel>.javascript-notice-context>.javascript-notice{margin-inline:calc(-1 * var(--optical-offset));width:calc(100% + 2 * var(--optical-offset))}
.gate-toolbar>.theme-toggle{margin-inline-end:calc(-1 * var(--optical-offset))}
@media(max-width:660px){.gate-panel:not(.specimen-context):not(.focus-context){padding-inline:calc(24px + var(--optical-offset))}}
/* Dialogs and error surfaces are scopes too; their button interiors remain native. */
.perspective-dialog .perspective-dialog-content{padding-inline:calc(28px + var(--optical-offset))}
.perspective-dialog-content>form{margin-inline-start:calc(-1 * var(--optical-offset))}
.javascript-notice{padding-inline:calc(16px + var(--optical-offset))}
:is(#workshop-content,.page-placeholder)>noscript>.javascript-notice{width:calc(100% - 48px);max-width:960px;margin-inline:auto}
/* Playground page and all its normal/expanded panels. */
body:has(#playground-title)>.playground-heading header.wrap,
body:has(#playground-title)>.toolbar .wrap{width:calc(100% - 56px);max-width:1192px;padding-inline:0}
body:has(#playground-title)>main.wrap{padding-inline:28px}
[data-panel]>.panel:not(.is-expanded){margin-inline:-4px;padding-inline:28px}
.panel>.section-heading h2,.panel>p,.panel>.feather-notice>p{padding-inline:0}
.panel>ul{margin-inline:0}
.panel>.frame-wrap,.panel>#playground-icon-catalog,.panel>.samples{margin-inline:-4px;width:calc(100% + 8px);max-width:none}
/* The preview viewport stays on its rails; only its iframe may exceed it. */
.panel>.frame-wrap,.preview-dialog.is-expanded>.frame-wrap{min-width:0;max-width:calc(100% + 8px);overflow:auto}
.choices legend{padding-inline:0;margin-inline-start:0}.field>.slider-label,#hover .hover-explanation{padding-inline:0}
.choices>.choice-shell,.choices>.choice-options:not(:has(.choice-shell)){margin-inline-start:-4px;max-width:calc(100% + 8px)}
.panel-actions,.panel-options,.heading-actions{margin-inline-end:-4px}
.control-footer>.panel-actions{margin-inline-end:-4px}
.panel-actions>button:first-child:last-child{margin-inline-start:0}
.tab-scroll-shell{margin-inline:calc(-1 * var(--optical-offset));width:calc(100% + 2 * var(--optical-offset))}
.field>input[type=range]{margin-inline:-4px;width:calc(100% + 8px)}
#style-dialog{padding-inline:24px}
#style-dialog #style-options{top:-1px;right:-1px}
.preview-dialog.is-expanded{padding-inline:28px}
.preview-dialog.is-expanded>.frame-wrap,.preview-dialog.is-expanded>.preview-settings,.preview-dialog.is-expanded>.preview-state-settings{margin-inline:-4px;width:calc(100% + 8px);max-width:none}
.preview-dialog.is-expanded>.frame-wrap{max-width:calc(100% + 8px)}
.preview-dialog.is-expanded>.preview-settings,.preview-dialog.is-expanded>.preview-state-settings{padding-inline:14px}
.preview-dialog.is-expanded>.section-heading h2{padding-inline:0}
.expanded-global-controls,.expanded-state-controls{padding-inline:4px;margin-inline-start:calc(var(--disclosure-text-inset) - var(--optical-offset))}
.expanded-global-controls>#global-style-controls{margin-inline:-4px;padding-inline:4px}
#perspective-replay{margin-inline-start:calc(-1 * var(--optical-offset))}
.panel>.feather-notice>details>.licence-text{margin-inline-start:calc(var(--disclosure-text-inset) - var(--optical-offset));padding-inline:20px}
/* Disclosure bodies share their summary text rail. */
.panel>details:not(.preview-settings):not(.preview-state-settings)>:not(summary),.panel>.feather-notice>details>:not(summary){margin-inline-start:var(--disclosure-text-inset)}
/* Nested grey specimen surfaces, swatches and catalogues own the same rails. */
.playground-icon-entry{padding-inline:28px}
.swatch strong,.swatch code,.swatch small{padding-inline:16px}.swatch p{margin-inline:16px}
/* Square textareas, tables and code listings deliberately stay on the text rail. */
#worm-copy-fallback,#perspective-copy-fallback{display:block}#worm-copy-fallback[hidden],#perspective-copy-fallback[hidden]{display:none}
.inspector-dock{padding-inline:max(28px,calc((100vw - 1192px)/2))}
.inspector-dock .inspector-bar,.inspector-dock .inspector-actions{margin-inline:0}
/* Sources already render their link interiors; align the whole link surface. */
.panel>a.workshop-link,.playground-icon-entry>a.workshop-link,.link-examples section>a.workshop-link{margin-inline-start:-4px}
.frame-wrap{padding:0;box-sizing:border-box}
.panel:not(.is-expanded)>.frame-wrap{overflow-x:auto;overflow-y:hidden}
#panel-url-reference h3{border-top:1px solid var(--border);padding-top:16px}
${headingInkCSS}
`;

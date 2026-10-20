import ink from './workshop-icon-ink.generated.json' with {type:'json'};
// Two rails per layout scope: text/square objects, and rounded surfaces 4px outward.
// Explicit component boundaries prevent nested controls from accumulating offsets.
const headingInkCSS=Object.entries(ink.icons).map(([name,{left}])=>`
:is(#playground-title,.panel>.section-heading h2,.playground-icon-entry h3,.url-reference-subheading):has(>svg[data-icon-name="${name}"]){--icon-ink-fraction:${left/ink.viewBox};margin-inline-start:calc(-1 * var(--icon-ink-fraction) * var(--heading-icon-size,24px))}
`).join('')+Object.entries(ink.variants).map(([key,m])=>{const [name,viewBox]=key.split(':');return `:is(#playground-title,.panel>.section-heading h2,.playground-icon-entry h3,.url-reference-subheading):has(>svg[data-icon-name="${name}"][viewBox="${viewBox}"]){--icon-ink-fraction:${m.left/m.viewBox}}`;}).join('');
export function assertMeasuredHeadingIcon(name){if(!ink.icons[name])throw Error('Measure heading icon '+name+' with scripts/measure-alignment-icons.mjs');}
export const alignmentCSS = String.raw`
:root{--specimen-inset:16px;--optical-offset:4px;--external-text-inset:var(--optical-offset);--playground-external-text-inset:var(--optical-offset)}
#playground-title{--heading-icon-size:1em}
:root{--disclosure-ink-inset:${ink.icons['chevron-right'].left/24*18}px}
summary:has(>.disclosure-chevron){margin-inline-start:calc(-1 * var(--disclosure-ink-inset))}
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
@media(max-width:700px){:is(#workshop-content,.page-placeholder) .step-row>article{padding-inline:calc(24px + var(--optical-offset))}}
/* A prompt panel owns a new rail. Its square text area stays on that rail. */
.code-header{padding-inline:20px}.code-header>.copy{margin-inline-end:calc(-1 * var(--optical-offset))}
.code-wrap>pre,.code-wrap>.status:not(:empty){padding-inline:20px}
@media(max-width:700px){.code-header,.code-wrap>pre,.code-wrap>.status:not(:empty){padding-inline:16px}}
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
body:has(#playground-title)>.toolbar .wrap{width:calc(100% - 56px);max-width:1112px;padding-inline:0}
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
.tab-scroll-shell{margin-inline:0;width:100%}
.field>input[type=range]{margin-inline:-4px;width:calc(100% + 8px)}
#style-dialog{padding-inline:24px}
#style-dialog #style-options{top:-1px;right:-1px}
.preview-dialog.is-expanded{padding-inline:28px}
.preview-dialog.is-expanded>.frame-wrap,.preview-dialog.is-expanded>.preview-settings,.preview-dialog.is-expanded>.preview-state-settings{margin-inline:-4px;width:calc(100% + 8px);max-width:none}
.preview-dialog.is-expanded>.frame-wrap{max-width:calc(100% + 8px)}
.preview-dialog.is-expanded>.preview-settings,.preview-dialog.is-expanded>.preview-state-settings{padding-inline:14px}
.preview-dialog.is-expanded>.section-heading h2{padding-inline:0}
.expanded-global-controls,.expanded-state-controls{padding-inline:4px;margin-inline-start:calc(22px - var(--disclosure-ink-inset))}
.expanded-global-controls>#global-style-controls{margin-inline:-4px;padding-inline:4px}
#perspective-replay{margin-inline-start:calc(-1 * var(--optical-offset))}
.panel>.feather-notice>details>.licence-text{margin-inline-start:calc(26px - var(--disclosure-ink-inset) - var(--optical-offset));padding-inline:20px}
/* Disclosure chevrons get their own measured ink correction; body text shares
   the summary's text position, not the enclosing panel's edge. */
.panel>details:not(.preview-settings):not(.preview-state-settings)>:not(summary),.panel>.feather-notice>details>:not(summary){margin-inline-start:calc(26px - var(--disclosure-ink-inset,5.25px))}
/* Nested grey specimen surfaces, swatches and catalogues own the same rails. */
.playground-icon-entry{padding-inline:28px}
.swatch strong,.swatch code,.swatch small{padding-inline:16px}.swatch p{margin-inline:16px}
body:has(>#icon-catalog),body:has(>#error-catalog),body:has(>#focus-catalog),body:has(>#link-type-specimens){padding-inline:28px}
#type-specimens{padding-inline:28px!important}
.icon-sample:not(.error-sample),.focus-preview,.agent-preview,.variant-preview,.feedback-preview{margin-inline:0;padding:var(--specimen-inset);max-width:100%;box-sizing:border-box}
.error-sample:not(:has(.fallback-context,.full-login-context)){margin-inline:0;padding:var(--specimen-inset)}
.error-sample:has(.full-login-context){margin-inline:0;padding-inline:var(--specimen-inset)}
#errors-resources .error-sample:has(.fallback-context){margin-inline:-4px;padding-inline:20px!important}
.focus-footer>form{margin-inline-start:-4px}
.selection-preview{margin-inline:var(--specimen-inset);max-width:calc(100% - 32px);padding-inline:0}
.selection-example{margin-inline:-4px;padding-inline:16px}
.icon-row>h3,.icon-row>.icon-meta,.focus-row>h3,.focus-row>.focus-meta{margin-inline:var(--specimen-inset)}
.type-row,.agent-row,.notice-type-row{padding-inline:var(--specimen-inset)!important}
/* Standalone rounded specimen roots use the specimen rail, while copied
   interiors retain canonical app geometry and typography. */
:is(.icon-sample,.focus-preview,.agent-preview,.variant-preview)>:is(button,.toggle,.theme-toggle,.symbol,.password-field,.qr-card,.code-wrap,.javascript-notice){margin-inline-start:-4px!important}
.type-row [data-in-situ]:is(.password-field,.code-wrap),.type-row [data-type-sample].gate-submit{margin-inline-start:-4px;max-width:calc(100% + 8px)}
.type-row footer:not(.is-stacked) button[data-type-sample]{margin-inline-start:calc(-1 * var(--optical-offset))}
.type-row [data-in-situ].code-wrap{width:calc(100% + 8px);max-width:calc(var(--source-width,100%) + 8px)}
.notice-type-row .javascript-notice{margin-inline:-4px;width:calc(100% + 8px);max-width:none}
.feedback-preview>.code-wrap{margin-inline-start:-4px;width:calc(100% + 8px)}
/* Square textareas, tables and code listings deliberately stay on the text rail. */
#worm-copy-fallback,#perspective-copy-fallback{display:block}#worm-copy-fallback[hidden],#perspective-copy-fallback[hidden]{display:none}
.inspector-dock{padding-inline:max(28px,calc((100vw - 1112px)/2))}
.inspector-dock .inspector-bar,.inspector-dock .inspector-actions{margin-inline:-4px}
/* Sources already render their link interiors; align the whole link surface. */
.panel>a.workshop-link,.playground-icon-entry>a.workshop-link,.link-examples section>a.workshop-link,.icon-row>a.workshop-link{margin-inline-start:-4px}
.icon-row>a.workshop-link{margin-inline:calc(var(--specimen-inset) - var(--optical-offset));margin-top:16px}
.frame-wrap{padding:var(--specimen-inset);box-sizing:border-box}
[data-gallery-last]{border-bottom:0!important}
#icon-catalog [data-gallery-last]{padding-bottom:0}
body:has(>#icon-catalog){padding-bottom:16px}
body:has(#playground-title) h3,body:has(>#icon-catalog) .icon-row>h3,body:has(>#focus-catalog) .focus-row>h3,#link-type-specimens h3{border-top:1px solid var(--border);padding-top:16px}
${headingInkCSS}
`;

import {overflowFadeCSS} from './workshop-overflow.mjs';
// Capture and display must agree before any computed font size is copied.
export const specimenTextSizingCSS = 'html{-webkit-text-size-adjust:none;text-size-adjust:none}';
// Gallery presentation only. Canonical component interiors remain app-owned.
export const specimenLayoutCSS = String.raw`
${overflowFadeCSS}
/* Fixed source-width examples must not trigger mobile text inflation.
   Page zoom remains available. */
${specimenTextSizingCSS}
/* One content inset. The surrounding iframe adds none. */
body{margin:0;padding-block:24px;padding-inline:0;background:var(--page);color:var(--text);overflow-y:hidden}
:is(#type-specimens,#icon-catalog,#error-catalog,#focus-catalog,#link-type-specimens){padding-inline:var(--specimen-text-rail)}
html[data-specimen-gallery=icons] body{padding-bottom:16px}
html:is([data-specimen-gallery=icons],[data-specimen-gallery=errors]) body{font:14px/1.5 system-ui}
:is(.type-row,.agent-row,.notice-type-row,.icon-row,.focus-row){padding-block:24px;padding-inline:0;border-bottom:1px solid var(--border)}
#type-specimens>.type-row:first-child,#icon-catalog .icon-row[data-first-visible],#errors-resources>.icon-row:first-child,#focus-resources>.focus-row:first-child{padding-top:0}
[data-gallery-last]{border-bottom:0;padding-bottom:0}
:is(.icon-row,.focus-row)>h3{font-size:16px;margin:0 0 16px}
:is(.icon-row,.focus-row)>:last-child{margin-bottom:0}
.icon-row:not(:has([data-icon-source]:not([hidden])))>.icon-meta{margin-bottom:0}
.icon-meta{font:12px/1.6 ui-monospace,monospace;overflow-wrap:anywhere;color:var(--muted-text)}
.focus-meta{font:12px/1.6 monospace;overflow-wrap:anywhere}
.sample-label{font:600 12px/1.5 system-ui;color:var(--muted-text);margin:0 0 16px}
.sample-label code{font-family:ui-monospace,monospace}
:is(.type-row,.agent-row,.notice-type-row) output{display:block;margin-top:16px;font:12px/1.6 monospace;color:var(--muted-text);overflow-wrap:anywhere}
#type-specimens>:last-child>:last-child{margin-bottom:0}

/* Scroll clearance, not a second content inset. The viewport reaches the grey
   boundary; its gutter restores the existing rail and protects focus paint. */
:is(.icon-sample,.focus-preview,.agent-preview,.prompt-specimen-viewport,.feedback-preview,.specimen-viewport,.variant-preview){margin-inline:calc(-1 * var(--specimen-text-rail));padding:16px 0 16px var(--specimen-text-rail);width:calc(100% + 2 * var(--specimen-text-rail));max-width:none;box-sizing:border-box;overflow-x:auto;overflow-y:hidden}
[data-specimen-scroll-end]::after{content:"";display:block;width:var(--specimen-scroll-end);height:0}
.prompt-specimen-viewport{padding-block:8px;margin-block:-8px}
.specimen-viewport{padding-block:8px;margin-block:-8px}
.error-sample{display:flow-root}
.error-sample:has(.full-login-context){padding-block:24px 64px}
@media(max-width:660px){.error-sample:has(.full-login-context){padding-block:20px 32px}}
#errors-resources .fallback-context{outline:1px solid var(--border);outline-offset:-1px;border-radius:12px}
.fallback-context{margin:0}
.fallback-context .step-row,.fallback-context .step-row>*{opacity:1;transform:none}
.error-sample pre,.icon-sample [data-unicode-target] pre{max-height:240px}

/* One rounded-boundary adjustment. !important only defeats captured inline
   margins or isolation resets; it does not compete with other gallery offsets. */
:is(.icon-sample,.focus-preview,.agent-preview,.variant-preview,.feedback-preview)>:is(button,.toggle,.theme-toggle,.symbol,.password-field,.qr-card,.code-wrap,.javascript-notice,.full-login-context,.fallback-context),
.type-row [data-in-situ],.type-row [data-type-sample].gate-submit,
.type-row footer button[data-type-sample],.notice-type-row .javascript-notice,
.focus-footer>form{margin-inline-start:calc(-1 * var(--optical-offset))!important}
.notice-type-row .javascript-notice{margin-block:0}
.selection-example{margin-inline:calc(-1 * var(--optical-offset));padding-inline:16px}
.icon-row>a.workshop-link{margin-inline:calc(-1 * var(--optical-offset));margin-top:16px}
/* A source boundary owns its measured width. The viewport scrolls instead of
   forcing this component through the gallery's narrower responsive layout. */
[data-specimen-width]{width:var(--specimen-width)!important;min-width:var(--specimen-width)!important;max-width:none!important;flex-shrink:0}
.error-sample>.code-wrap{position:relative}
.feedback-preview .code-wrap{height:auto;overflow:visible}
.feedback-preview .status{position:absolute}

/* Optical exceptions move the specimen only, without redefining its inset. */
.focus-preview{--specimen-optical-nudge:0px}
.focus-preview:has(>.segmented-toggle){--specimen-optical-nudge:1px}
.focus-preview[data-exterior-ring]{--specimen-optical-nudge:6px}
.focus-preview>*{translate:var(--specimen-optical-nudge) 0}
.focus-context{padding:0;border:0;box-shadow:none;background:transparent;width:max-content;max-width:none;margin:0}
.focus-preview .segmented-toggle{white-space:nowrap}
.focus-preview .segmented-toggle button{white-space:nowrap;flex-shrink:0}
.focus-preview .qr-card{display:block}
.focus-preview .qr-copy{position:relative}
.focus-preview .focus-footer{width:calc(100% - var(--specimen-optical-nudge));display:block;margin:0;padding:0;border:0}
.focus-preview .focus-footer button{width:auto!important}
.focus-preview pre{max-height:160px}
.selection-preview{width:fit-content;max-width:100%;margin-inline:0;padding:4px 0;overflow-wrap:anywhere}
.type-row [data-type-sample].gate-error,.icon-sample>.gate-error{translate:var(--specimen-error-nudge) 0}

/* Isolate a typography sample from its copied ancestors' page layout, while
   retaining the real sample's font and component interior. */
.type-row .specimen-context:not([data-in-situ]){position:static!important;display:flow-root!important;visibility:visible!important;opacity:1!important;transform:none!important;filter:none!important;backdrop-filter:none!important;animation:none!important;width:100%!important;max-width:none!important;min-height:0!important;height:auto!important;margin:0!important;padding:0!important;border:0!important;outline:0!important;background:transparent!important;overflow:visible!important;box-shadow:none!important}
.type-row [data-type-sample]{visibility:visible!important;opacity:1!important}
.type-row [data-type-sample]:not(pre):not(input):not(button){margin-block:0!important}
.type-row span[data-type-sample]{display:block}
.type-row .brand-name[data-type-sample]{width:max-content}
.type-row .specimen-context:has(>.controls-label){line-height:0}
.type-row .controls-label[data-type-sample]{line-height:21px}
.type-row .password-field[data-in-situ]{display:flex}
.type-row figcaption[data-type-sample]{text-align:left}
.type-row .qr-copy-overlay{opacity:1}
.type-row .copy-content{display:inline-flex}
.type-row pre{max-height:none}
.type-row .qr-card.specimen-context{width:max-content!important}
.type-row .footer-meta[data-type-sample]{display:flex;flex:none;width:100%;align-items:flex-start;justify-content:flex-start;text-align:left}
.type-row footer.specimen-context .footer-content{align-items:flex-start!important;justify-content:flex-start!important;text-align:left}
.type-row footer.specimen-context form{align-self:flex-start!important;justify-self:start!important;width:max-content!important}
/* Source samples stay available for parity measurements but only variants paint. */
.type-row.has-variants>.specimen-viewport,.has-variants>output{display:none!important}
.has-variants>.sample-label{margin-bottom:20px}
.button-variants{display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start}
.button-variant{flex:1 1 160px;min-width:0;max-width:260px}
.feedback-grid{display:block;border:0;padding:0}
.feedback-grid .feedback-row{width:100%}
`;

import iconInk from './workshop-icon-ink.generated.json' with {type:'json'};
import {footerLayoutScript} from './workshop-footer-layout.mjs';
import {placeholderLayoutRevision} from './workshop-layout.mjs';
import geometry from './workshop-placeholder.generated.json' with {type: 'json'};

// Only anonymous measured geometry is shipped to unauthenticated visitors.
export function placeholderFromPage(_page, layoutRevision = placeholderLayoutRevision) {
  // Internal builds intentionally reuse saved measurements; publication verifies freshness.
  void layoutRevision;
  return geometry.markup;
}
// Cached stroke-inclusive bounds: paint only the visible rectangle, retain layout.
const inkRule=(selector,b,units=iconInk.viewBox)=>`${selector}{clip-path:inset(${b.top/units*100}% ${b.right/units*100}% ${b.bottom/units*100}% ${b.left/units*100}%);}`;
export const backdropIconCSS=Object.entries(iconInk.icons).map(([name,b])=>inkRule(`.ph-icon[data-icon-provider="lucide"][data-icon-name="${name}"]`,b)).join('')
 +Object.entries(iconInk.variants).map(([key,b])=>{const [name,viewBox]=key.split(':');return inkRule(`.ph-icon[data-icon-provider="lucide"][data-icon-name="${name}"][viewBox="${viewBox}"]`,b,b.viewBox);}).join('')
 +Object.entries(iconInk.brands||{}).map(([name,b])=>inkRule(`.ph-icon[data-icon-provider="lobe"][data-icon-name="${name}"]`,b)).join('');
export const placeholderBaseStyles = `
${backdropIconCSS}
.page-placeholder { --ph-strength:40%; --ph-blur:4px; --ph-surface:var(--page); pointer-events:none; user-select:none; filter:blur(var(--ph-blur)); }
.page-placeholder,.page-placeholder *,.page-placeholder *::before,.page-placeholder *::after{cursor:default!important;user-select:none!important;animation:none!important;transition:none!important}
.page-placeholder:not(.playground-placeholder) *{pointer-events:none!important}
.page-placeholder pre{overflow:hidden!important}
.page-placeholder article { --ph-surface:var(--card-bg); }
.page-placeholder .code-wrap, .page-placeholder .qr-card { --ph-surface:var(--content-surface); }
.page-placeholder .copy, .page-placeholder .theme-toggle button { --ph-surface:var(--surface); }
.page-placeholder .toggle button:first-of-type { --ph-surface:var(--agent-accent); color:white; }
.page-placeholder .symbol { --ph-surface:var(--tile-bg); }
.page-placeholder .qr-card .ph-qr-block { background:color-mix(in srgb,#111 var(--ph-strength),white); }
.ph-icon[hidden]{display:none!important}
.ph-icon { display:inline-block; flex:none; vertical-align:middle; border-radius:2px; background:color-mix(in srgb,currentColor var(--ph-strength),var(--ph-surface)); }
.ph-word { position:relative; display:inline-block; padding:0; margin:0; }
.ph-code-word { display:inline; color:transparent; box-decoration-break:clone; -webkit-box-decoration-break:clone; background:linear-gradient(to bottom, transparent calc(100% - var(--ph-bottom) - var(--ph-cap)), color-mix(in srgb,var(--ph-ink,var(--text)) var(--ph-strength),var(--ph-surface)) calc(100% - var(--ph-bottom) - var(--ph-cap)) calc(100% - var(--ph-bottom)), transparent calc(100% - var(--ph-bottom))); }
.ph-code-word::before { display:none; }
.ph-word:not(.ph-code-word)::before { content:''; position:absolute; inset:auto 0 var(--ph-bottom); height:var(--ph-cap); border-radius:1px; background:color-mix(in srgb,currentColor var(--ph-strength),var(--ph-surface)); }
`;

export const placeholderStyles = placeholderBaseStyles + (geometry.metricCSS || '');

export function synchroniseLoginLayout(login, resources, {blankBackground=false}={}) {
  // Retain every source layout layer (including sticky controls and the footer).
  const resourceStyles = resources.match(/<style\b[^>]*>[\s\S]*?<\/style>/g)?.join('');
  if (!resourceStyles) throw new Error('Resource styles missing');
  const gateStyles = login.match(/<style>([\s\S]*?)<\/style>/)?.[1];
  if (!gateStyles) throw new Error('Login panel styles missing');
  return login.replace(/<style>[\s\S]*?<\/style>/, resourceStyles + `<style>${gateStyles}${placeholderStyles}</style>`)
    .replace('</body>', `<script nonce="__NONCE__">${footerLayoutScript}</script></body>`)
    .replace(/<main\b[^>]*>[\s\S]*?<\/main>/, blankBackground ? '<main class="page-placeholder" aria-hidden="true"></main>' : placeholderFromPage(resources));
}

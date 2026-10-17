import {placeholderLayoutRevision} from './workshop-layout.mjs';
import geometry from './workshop-placeholder.generated.json' with {type: 'json'};

// Only anonymous measured geometry is shipped to unauthenticated visitors.
export function placeholderFromPage(_page, layoutRevision = placeholderLayoutRevision) {
  if (layoutRevision !== geometry.layoutRevision) throw new Error('Blur geometry is stale: run node scripts/measure-placeholder.mjs from website');
  return geometry.markup;
}
export const placeholderStyles = `
.page-placeholder { --ph-strength:40%; --ph-blur:4px; --ph-surface:var(--page); pointer-events:none; user-select:none; filter:blur(var(--ph-blur)); }
/* Bake both blur passes into the background before View Transition capture.
   Local review modes retain their independent base-blur control. */
body.is-locked:not([data-review]):has(.access-gate:not([hidden])) .page-placeholder,
body[data-review="panel"] .page-placeholder { filter:blur(var(--ph-blur)) blur(7px); }
.page-placeholder article { --ph-surface:var(--card-bg); }
.page-placeholder .code-wrap, .page-placeholder .qr-card { --ph-surface:var(--content-surface); }
.page-placeholder .copy, .page-placeholder .theme-toggle button { --ph-surface:var(--surface); }
.page-placeholder .toggle button:first-of-type { --ph-surface:var(--agent-accent); color:white; }
.page-placeholder .symbol { --ph-surface:var(--tile-bg); }
.page-placeholder .qr-card .ph-qr-block { background:color-mix(in srgb,#111 var(--ph-strength),white); }
.ph-icon { display:inline-block; flex:none; vertical-align:middle; border-radius:2px; background:color-mix(in srgb,currentColor var(--ph-strength),var(--ph-surface)); }
.ph-word { position:relative; display:inline-block; padding:0; margin:0; }
.ph-code-word { display:inline; color:transparent; box-decoration-break:clone; -webkit-box-decoration-break:clone; background:linear-gradient(to bottom, transparent calc(100% - var(--ph-bottom) - var(--ph-cap)), color-mix(in srgb,var(--ph-ink,var(--text)) var(--ph-strength),var(--ph-surface)) calc(100% - var(--ph-bottom) - var(--ph-cap)) calc(100% - var(--ph-bottom)), transparent calc(100% - var(--ph-bottom))); }
.ph-code-word::before { display:none; }
.ph-word:not(.ph-code-word)::before { content:''; position:absolute; inset:auto 0 var(--ph-bottom); height:var(--ph-cap); border-radius:1px; background:color-mix(in srgb,currentColor var(--ph-strength),var(--ph-surface)); }
`;

export function synchroniseLoginLayout(login, resources) {
  const resourceStyles = resources.match(/<style>[\s\S]*?<\/style>/)?.[0];
  if (!resourceStyles) throw new Error('Resource styles missing');
  const gateStyles = login.match(/<style>([\s\S]*?)<\/style>/)?.[1];
  if (!gateStyles) throw new Error('Login panel styles missing');
  return login.replace(/<style>[\s\S]*?<\/style>/, resourceStyles + `<style>${gateStyles}${placeholderStyles}</style>`)
    .replace(/<main\b[^>]*>[\s\S]*?<\/main>/, placeholderFromPage(resources));
}

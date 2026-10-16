import {createHash} from 'node:crypto';
import geometry from './workshop-placeholder.generated.json' with {type: 'json'};

// Only anonymous measured geometry is shipped to unauthenticated visitors.
export function placeholderFromPage(page) {
  const fingerprint = createHash('sha256').update(page).digest('hex');
  if (fingerprint !== geometry.fingerprint) throw new Error('Blur geometry is stale: run node scripts/measure-placeholder.mjs from website');
  return geometry.markup;
}
export const placeholderStyles = `
.page-placeholder { --ph-strength:35%; --ph-surface:var(--page); pointer-events:none; user-select:none; filter:blur(5px); }
.page-placeholder article { --ph-surface:var(--card-bg); }
.page-placeholder .code-wrap, .page-placeholder .qr-card { --ph-surface:var(--content-surface); }
.page-placeholder .copy, .page-placeholder .theme-toggle button { --ph-surface:var(--surface); }
.page-placeholder .toggle button:first-of-type { --ph-surface:var(--agent-accent); color:white; }
.ph-word { position:relative; display:inline-block; padding:0; margin:0; }
.ph-code-word { display:inline; color:transparent; box-decoration-break:clone; -webkit-box-decoration-break:clone; background:linear-gradient(to bottom, transparent 18%, color-mix(in srgb,var(--ph-ink,var(--text)) var(--ph-strength),var(--ph-surface)) 18% 82%, transparent 82%); }
.ph-code-word::before { display:none; }
.ph-word:not(.ph-code-word)::before { content:''; position:absolute; inset:var(--ph-top) 0 var(--ph-bottom); border-radius:1px; background:color-mix(in srgb,currentColor var(--ph-strength),var(--ph-surface)); }
`;

export function synchroniseLoginLayout(login, resources) {
  const resourceStyles = resources.match(/<style>[\s\S]*?<\/style>/)?.[0];
  if (!resourceStyles) throw new Error('Resource styles missing');
  const gateStyles = login.match(/<style>([\s\S]*?)<\/style>/)?.[1];
  if (!gateStyles) throw new Error('Login panel styles missing');
  return login.replace(/<style>[\s\S]*?<\/style>/, resourceStyles + `<style>${gateStyles}${placeholderStyles}</style>`)
    .replace(/<main\b[^>]*>[\s\S]*?<\/main>/, placeholderFromPage(resources));
}

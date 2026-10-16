// Project the authored resource layout into inert, content-free geometry.
// This runs on the server: original text, links and scripts never reach login.
const tags = new Set('main div span header p h1 h2 h3 section article figure figcaption a button pre code footer img br'.split(' '));
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
export function placeholderFromPage(page) {
  const main = page.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0];
  if (!main) throw new Error('Resource main missing');
  const stripped = main.replace(/<!--[^]*?-->/g, '')
    .replace(/<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/g, '');
  const markup = stripped.replace(/<[^>]+>|[^<]+/g, token => {
    if (!token.startsWith('<')) {
      // Fixed anonymous word shapes; no source text or attribute data survives.
      return token.replace(/\S+/g, word => `<span class="ph-word" style="width:${Math.min(word.length, 24) * .48}em"></span>`);
    }
    const match = token.match(/^<(\/)?([a-z0-9-]+)\b/i);
    if (!match) throw new Error('Unsupported resource markup');
    const [, closing, tag] = match;
    if (tag === 'form') return closing ? '</div>' : '<div>';
    if (!tags.has(tag)) throw new Error(`Unsupported placeholder element: ${tag}`);
    if (closing) return `</${tag}>`;
    const className = token.match(/\bclass="([^"]*)"/)?.[1];
    let attributes = className ? ` class="${escape(className)}"` : '';
    if (tag === 'main') return '<main id="workshop-content" class="page-placeholder" aria-hidden="true" inert>';
    if (tag === 'button') attributes += ' type="button" tabindex="-1"';
    if (tag === 'img') {
      // Public decorative image only, selected by layout role, never source URL.
      const brand = token.includes('wavelength-worm.png');
      return `<img src="${brand ? '/assets/wavelength-worm.png' : 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22540%22 height=%22540%22%3E%3Cdefs%3E%3Cpattern id=%22p%22 width=%2260%22 height=%2260%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath fill=%22%23555%22 d=%22M0 0h30v30H0zM30 30h30v30H30z%22/%3E%3C/pattern%3E%3C/defs%3E%3Cpath fill=%22white%22 d=%22M0 0h540v540H0z%22/%3E%3Cpath fill=%22url(%23p)%22 d=%22M0 0h540v540H0z%22/%3E%3C/svg%3E'}" alt="">`;
    }
    return `<${tag}${attributes}>`;
  });
  // Prompt text is populated by the protected script; use fixed dummy lines.
  return markup.replace(/<code><\/code>/g, '<code>' + Array.from({length: 8}, (_, i) => `<span class="ph-code-line" style="width:${[93, 84, 67, 90][i % 4]}%"></span>`).join('') + '</code>');
}
export const placeholderStyles = `
.page-placeholder { pointer-events:none; user-select:none; filter:blur(5px); }
.ph-word { display:inline-block; height:.55em; max-width:100%; border-radius:2px; background:currentColor; vertical-align:baseline; }
.ph-code-line { display:block; height:7px; margin:7px 0 14px; background:var(--muted-text); border-radius:2px; }
.page-placeholder .theme-toggle { height:50px; }
.page-placeholder .toggle button:first-child { background:var(--agent-accent); color:white; }
`;

export function synchroniseLoginLayout(login, resources) {
  const resourceStyles = resources.match(/<style>[\s\S]*?<\/style>/)?.[0];
  if (!resourceStyles) throw new Error('Resource styles missing');
  // Only the access panel owns separate styles; the background uses resource CSS.
  const gateStyles = login.match(/<style>([\s\S]*?)<\/style>/)?.[1];
  if (!gateStyles) throw new Error('Login panel styles missing');
  return login.replace(/<style>[\s\S]*?<\/style>/, resourceStyles + `<style>${gateStyles}${placeholderStyles}</style>`)
    .replace(/<main\b[^>]*>[\s\S]*?<\/main>/, placeholderFromPage(resources));
}

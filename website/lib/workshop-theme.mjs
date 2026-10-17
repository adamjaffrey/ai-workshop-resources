import {toggleScript} from './workshop-toggle.mjs';
import {agentScript} from './workshop-agent.mjs';
// Shared theme for the server-rendered login and resource pages.
// Sun and Moon paths from the installed Lucide package (ISC; public/assets/lucide-LICENSE.txt).
const icon = paths => `<svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const sun = icon('<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>');
const moon = icon('<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>');
const control = `<div class="theme-toggle" role="group" aria-label="Colour Theme" hidden><button type="button" data-theme-choice="light" aria-label="Light Mode" title="Light Mode" aria-pressed="false">${sun}</button><button type="button" data-theme-choice="dark" aria-label="Dark Mode" title="Dark Mode" aria-pressed="false">${moon}</button></div>`;
const styles = `
:root {
  --agent-accent: #0285FF; --agent-ink: #fff; --page: #f3f3f3; --surface: #fff; --content-surface: #f8f9fa; --text: #1a1a1a;
  --muted-text: #5b6066; --border: #dedede; --panel-border: #d5d9dd;
  --control-border: #c7ccd1; --control-bg: #e9e9e9; --control-text: #454545;
  --hover: #e9edf0; --field-bg: #fafafa; --field-border: #bfc4c9;
  --success: #167342; --success-ink: #fff; --error: #a62323; --link: var(--icon-ink);
  --icon-ink: color-mix(in srgb, var(--agent-accent) 80%, black);
  --card-bg: color-mix(in srgb, var(--agent-accent) 4%, white);
  --tile-bg: color-mix(in srgb, var(--agent-accent) 16%, white);
  --connector: color-mix(in srgb, var(--agent-accent) 35%, white);
  --selection: color-mix(in srgb, var(--agent-accent) 30%, white);
  --selection-text: #1a1a1a; --gate-overlay: rgb(70 73 78 / 42%);
  color-scheme: light; color: var(--text); background: var(--page);
}
:root[data-theme="dark"] {
  --page: #101216; --surface: #191d23; --content-surface: var(--surface); --text: #f3f4f6; --muted-text: #b7bec8;
  --border: #363d48; --panel-border: #414b59; --control-border: #566171;
  --control-bg: #252b34; --control-text: #c4cbd5; --hover: #303946;
  --field-bg: #11151b; --field-border: #566171; --success: #75d6a3; --success-ink: #101216; --error: #ff9b9b;
  --link: var(--icon-ink); --icon-ink: color-mix(in srgb, var(--agent-accent) 55%, white);
  --card-bg: color-mix(in srgb, var(--agent-accent) 12%, #171b21);
  --tile-bg: color-mix(in srgb, var(--agent-accent) 24%, #171b21);
  --connector: color-mix(in srgb, var(--agent-accent) 45%, #171b21);
  --selection: color-mix(in srgb, var(--agent-accent) 40%, #171b21);
  --selection-text: #fff; --gate-overlay: rgb(0 0 0 / 55%); color-scheme: dark;
}
:root[data-selected-agent="claude-code"] { --agent-accent: #D97757; }
/* Contain viewport-wide motion at the root as well as the body (including Safari). */
html, body { overflow-x: hidden; }
@supports (overflow: clip) { html, body { overflow-x: clip; } }
@property --theme-radius { syntax: '<length>'; inherits: false; initial-value: 0px; }
/* Only explicit theme changes create a circular snapshot reveal. */
:root.theme-reveal::view-transition-old(root),
:root.theme-reveal::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
:root.theme-reveal::view-transition-old(root) { z-index: 1; }
:root.theme-reveal::view-transition-new(root) { z-index: 2;
  -webkit-mask-image: radial-gradient(circle at var(--reveal-x) var(--reveal-y), #000 max(0px, calc(var(--theme-radius) - 48px)), transparent var(--theme-radius));
  mask-image: radial-gradient(circle at var(--reveal-x) var(--reveal-y), #000 max(0px, calc(var(--theme-radius) - 48px)), transparent var(--theme-radius));
  animation: theme-circle 420ms cubic-bezier(.2,0,.2,1) both; }
:root.theme-reveal::view-transition { pointer-events: none; }
@keyframes theme-circle {
  from { --theme-radius: 0px; }
  to { --theme-radius: var(--reveal-radius); }
}
@media (prefers-reduced-motion: reduce) {
  :root.theme-reveal::view-transition-new(root) { animation: none; }
}
/* Button labels are controls; document and prompt text remain selectable. */
button, button * { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }
button:not(.segmented-toggle button) { transition: scale 120ms ease-out; }
button:enabled:is(:active, .is-held):not(.segmented-toggle button) { scale: .97; }
@media (prefers-reduced-motion: reduce) {
  button:not(.segmented-toggle button) { transition: none; }
  button:enabled:is(:active, .is-held):not(.segmented-toggle button) { scale: none; }
}
/* QR cards and prompt panels share one surface, independent of other controls. */
.qr-card, #workshop-content .code-wrap, #workshop-content .status { background: var(--content-surface); }
.segmented-toggle { cursor: pointer; position: relative; isolation: isolate; display: inline-flex; padding: 4px; gap: 4px; border-width: 1px; }
.segmented-toggle button { height: 40px; box-sizing: border-box; padding-top: 0; padding-bottom: 0; }
.segmented-toggle .toggle-indicator { position: absolute; z-index: -1; pointer-events: none; top: 4px; bottom: 4px; border-radius: 8px; background: var(--agent-accent); box-shadow: 0 2px 4px #0000001a; }
.theme-toggle.segmented-toggle .toggle-indicator { background: var(--surface); border: 1px solid var(--control-border); }
.page-placeholder { overflow-x: clip; }
:root[data-theme="dark"] .page-placeholder .code-wrap { background: var(--surface); }
:root[data-theme="dark"] .page-placeholder .symbol { background: var(--tile-bg); }
.page-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 40px; }
.page-toolbar .brand { margin: 0; }
.theme-toggle { display: inline-flex; flex-shrink: 0; gap: 4px; padding: 4px; border: 1px solid var(--control-border); border-radius: 12px; background: var(--control-bg); }
.theme-toggle[hidden] { display: none; }
.theme-toggle button { display: grid; place-items: center; width: 44px; padding: 0; border: 1px solid transparent; border-radius: 8px; background: transparent; color: var(--control-text); }
.theme-toggle button:hover { color: var(--text); }
.theme-toggle button[aria-pressed="true"] { background: transparent; color: var(--text); }
.theme-toggle button:focus-visible { outline: 3px solid var(--icon-ink); outline-offset: 3px; }
.theme-toggle .icon { width: 20px; height: 20px; }
.gate-toolbar { display: flex; justify-content: flex-end; margin-bottom: 20px; }
:root[data-theme="dark"] .brand-mark img { filter: brightness(0) invert(1); }
.qr-card img { background: white; border-radius: inherit; outline: 1px solid var(--border); }
:root[data-theme="dark"] .page-placeholder .ph-line, :root[data-theme="dark"] .ph-brand-mark { background: #707b8b; }
:root[data-theme="dark"] .ph-toggle span:last-child { background: var(--control-bg); }
@media (max-width: 380px) { .page-toolbar { gap: 8px; } .page-toolbar .brand { gap: 6px; } .page-toolbar .brand-name { font-size: 13px; } .page-toolbar .brand-mark img { width: 36px; } .theme-toggle button { width: 40px; } }
`;
// Runs in the head before paint; storage denial must never prevent using the page.
const script = `(() => {
  const key = 'workshop-colour-theme';
  const system = matchMedia('(prefers-color-scheme: dark)');
  let preference;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const themeAnimations = new Set();
  let reveal, revealRequest = 0;
  const colourProperties = ['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor', 'fill', 'stroke', 'filter'];
  const cancelThemeAnimations = () => { themeAnimations.forEach(animation => animation.cancel()); themeAnimations.clear(); };
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) { cancelThemeAnimations(); reveal?.skipTransition(); } });
  const colours = element => {
    const style = getComputedStyle(element);
    return Object.fromEntries(colourProperties.map(property => [property, style[property]]));
  };
  const indicators = [];
  const valid = value => value === 'light' || value === 'dark';
  try { const saved = localStorage.getItem(key); if (valid(saved)) preference = saved; } catch {}
  window.workshopColourTransition = (change, duration = 280) => {
    // Capture interrupted colours before cancelling, then batch reads before animation writes.
    const before = !reducedMotion.matches
      ? [...document.querySelectorAll('html, body, body *')].filter(element => element.getClientRects().length).map(element => [element, colours(element)])
      : [];
    cancelThemeAnimations();
    change();
    before.map(([element, previous]) => [element, previous, colours(element)]).forEach(([element, previous, next]) => {
      const changed = colourProperties.filter(property => previous[property] !== next[property]);
      if (!changed.length) return;
      const frame = values => Object.fromEntries(changed.map(property => [property, values[property]]));
      const animation = element.animate([frame(previous), frame(next)], {duration, easing: 'cubic-bezier(.2,0,.2,1)'});
      themeAnimations.add(animation);
      animation.onfinish = () => themeAnimations.delete(animation);
    });
  };
  function apply(animate = false, theme = preference || (system.matches ? 'dark' : 'light')) {
    const change = () => {
      document.documentElement.dataset.theme = theme;
      document.querySelectorAll('[data-theme-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme)));
      indicators.forEach(move => move());
    };
    if (animate && document.documentElement.dataset.theme !== theme) window.workshopColourTransition(change);
    else change();
  }
  async function revealTheme(button) {
    const request = ++revealRequest;
    const theme = preference;
    if (reveal) {
      reveal.skipTransition();
      await reveal.updateCallbackDone.catch(() => {});
    }
    if (request !== revealRequest) return;
    const root = document.documentElement;
    root.classList.remove('theme-reveal');
    if (reducedMotion.matches || !document.startViewTransition || !('registerProperty' in CSS)) {
      apply(!reducedMotion.matches, theme);
      return;
    }
    cancelThemeAnimations();
    const bounds = button.closest('.theme-toggle').getBoundingClientRect();
    const x = bounds.left + bounds.width / 2, y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty('--reveal-x', x + 'px');
    root.style.setProperty('--reveal-y', y + 'px');
    root.style.setProperty('--reveal-radius', (radius + 48) + 'px');
    root.classList.add('theme-reveal');
    reveal = document.startViewTransition(() => apply(false, theme));
    reveal.ready.catch(() => {}); // A skipped snapshot still commits the requested theme.
    await reveal.finished.catch(() => {});
    if (request === revealRequest) {
      root.classList.remove('theme-reveal');
      ['--reveal-x', '--reveal-y', '--reveal-radius'].forEach(property => root.style.removeProperty(property));
      reveal = undefined;
    }
  }
  apply();
  system.addEventListener('change', () => { if (!preference) apply(true); });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    preference = valid(event.newValue) ? event.newValue : undefined;
    apply(true);
  });
  document.addEventListener('DOMContentLoaded', () => {
    // Keep held feedback stable during long touches; native click still activates on release.
    document.querySelectorAll('button').forEach(button => {
      if (button.closest('.toggle, .theme-toggle')) return;
      let pointer;
      const release = () => { pointer = undefined; button.classList.remove('is-held'); };
      button.addEventListener('pointerdown', event => {
        if (!event.isPrimary || event.button !== 0 || button.disabled) return;
        pointer = event.pointerId;
        button.classList.add('is-held');
      });
      window.addEventListener('pointerup', event => { if (event.pointerId === pointer) release(); });
      window.addEventListener('pointercancel', event => { if (event.pointerId === pointer) release(); });
      button.addEventListener('pointerleave', release);
      button.addEventListener('blur', release);
      window.addEventListener('blur', release);
      document.addEventListener('visibilitychange', () => { if (document.hidden) release(); });
    });
    document.querySelectorAll('.theme-toggle:not(.ph-static)').forEach(control => { control.hidden = false; indicators.push(window.createWorkshopToggle(control)); });
    apply();
    document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => {
      preference = (preference || document.documentElement.dataset.theme) === 'light' ? 'dark' : 'light';
      try { localStorage.setItem(key, preference); } catch {}
      revealTheme(button);
    }));
  });
})();`;

export function withTheme(html, login = false) {
  html = html.replace('</head>', `<style>${styles}</style><script nonce="__NONCE__" data-workshop-theme>${agentScript}\n${toggleScript}\n${script}</script></head>`);
  if (login) return html.replace('</h2>', `</h2><div class="gate-toolbar"><p class="eyebrow">Workshop Access</p>${control}</div>`);
  return html.replace('<div class="brand" aria-label="Wavelength">', '<div class="page-toolbar"><div class="brand" aria-label="Wavelength">')
    .replace('    <header class="page-header">', `    ${control}</div>\n    <header class="page-header">`);
}

import {skipNavigationCSS,skipNavigationScript} from './workshop-skip-navigation.mjs';
import {keyboardNavigationScript} from './workshop-keyboard-navigation.mjs';
import {groupFocusCSS} from './workshop-group-focus.mjs';
import {bodyTypeCSS} from './workshop-body-type.mjs';
import {themeAliases} from './workshop-url-preferences.mjs';
import {playgroundFaviconScript} from './workshop-playground-brand.mjs';
import {alignmentCSS} from './workshop-alignment.mjs';
import {colourValueCSS,colourValueScript} from './workshop-colour-values.mjs';
import {linkCSS,linkScript} from './workshop-links.mjs';
import {revealRadiusRange} from './workshop-reveal.mjs';
import {toggleScript} from './workshop-toggle.mjs';
import {agentScript} from './workshop-agent.mjs';
// Shared theme for the server-rendered login and resource pages.
// Sun and Moon paths from the installed Lucide package (ISC; public/assets/lucide-license.txt).
const icon = (name,use,paths) => `<svg data-icon-provider="lucide" data-icon-name="${name}" data-icon-use="${use}" class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const sun = icon('sun','select-light-theme','<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>');
const moon = icon('moon','select-dark-theme','<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>');
const control = `<div class="theme-toggle" role="group" aria-label="Colour Theme" hidden><button type="button" data-theme-choice="light" aria-label="Light Mode" title="Light Mode" aria-pressed="false">${sun}</button><button type="button" data-theme-choice="dark" aria-label="Dark Mode" title="Dark Mode" aria-pressed="false">${moon}</button></div>`;
const styles = `
:root {
  --focus-sharp-radius:2px;
  --floating-shadow: 0 0 80px #00000024;
  --floating-control-shadow: 0 0 12px #00000026, 0 0 28px #00000026; --agent-accent: #0285FF; --agent-ink: #fff; --page: #f3f3f3; --surface: #fff; --content-surface: #f8f9fa; --text: #1a1a1a;
  --muted-text: #5b6066; --border: #dedede; --panel-border: #d5d9dd;
  --control-border: #c7ccd1; --control-bg: #e9e9e9; --control-text: #454545;
  --action-hover:color-mix(in srgb,var(--control-bg) 88%,black); --hover: #e9edf0; --field-bg: var(--content-surface); --field-border: #bfc4c9;
  --success: #146c3e; --success-ink: #fff; --error: #85009b; --warning: #755600; --warning-ink: #fff; --info: var(--muted-text); --link: var(--icon-ink); --link-hover: var(--link); --link-hover-bg: color-mix(in srgb, var(--agent-accent) 10%, var(--surface));
  --icon-ink: color-mix(in srgb, var(--agent-accent) 75%, black);
  --card-bg: color-mix(in srgb, var(--agent-accent) 4%, white);
  --tile-bg: color-mix(in srgb, var(--agent-accent) 16%, white);
  --connector: color-mix(in srgb, var(--agent-accent) 35%, white);
  --selection: var(--link-hover-bg);
  --selection-text: #1a1a1a; --gate-overlay: rgb(70 73 78 / 42%);
  color-scheme: light; color: var(--text); background: var(--page);
}
:root[data-theme="dark"] {
  --page: #101216; --surface: #191d23; --content-surface: var(--surface); --text: #f3f4f6; --muted-text: #b7bec8;
  --border: #363d48; --panel-border: #414b59; --control-border: #566171;
  --action-hover:color-mix(in srgb,var(--control-bg) 85%,white); --control-bg: #252b34; --control-text: #c4cbd5; --hover: #303946;
  --field-bg: #11151b; --field-border: var(--control-border); --success: #75d6a3; --success-ink: #101216; --error: #ff8dce; --warning: #e5c15c; --warning-ink: #101216;
  --link: var(--icon-ink); --link-hover: var(--link); --link-hover-bg: color-mix(in srgb, var(--agent-accent) 40%, var(--surface)); --icon-ink: color-mix(in srgb, var(--agent-accent) 55%, white);
  --card-bg: color-mix(in srgb, var(--agent-accent) 12%, #171b21);
  --tile-bg: color-mix(in srgb, var(--agent-accent) 24%, #171b21);
  --connector: color-mix(in srgb, var(--agent-accent) 45%, #171b21);
  --selection: var(--link-hover-bg);
  --selection-text: #fff; --gate-overlay: rgb(0 0 0 / 55%); color-scheme: dark;
}
:root[data-selected-agent="claude-code"] { --agent-accent: #D97757; }
/* Shared selection colours apply to app pages, tooling and nested specimens. */
::selection { background: var(--selection); color: var(--selection-text); }
/* Shared text-link treatment, including visited links. */
a[href], a[href]:visited { color: var(--link); text-decoration-line: underline; text-decoration-thickness: auto; text-decoration-skip-ink: auto; text-underline-offset: .1em; transition: color 0ms; }
a[href]:hover, a[href][data-link-preview="hover"] { background-color: var(--link-hover-bg); color: var(--link-hover); }
@media (prefers-reduced-motion: reduce) { a[href] { transition: none; } }
/* Contain viewport-wide motion at the root as well as the body (including Safari). */
html, body { overflow-x: hidden; }
@supports (overflow: clip) { html, body { overflow-x: clip; } }
@property --theme-radius { syntax: '<length>'; inherits: false; initial-value: 0px; }
:root { --theme-reveal-duration: 420ms; }
@media (max-width: 660px) { :root { --theme-reveal-duration: 300ms; } }
/* Only explicit theme changes create a circular snapshot reveal. */
:root.theme-reveal::view-transition-old(root),
:root.theme-reveal::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
:root.theme-reveal::view-transition-old(root),
:root.theme-reveal::view-transition-new(root) { z-index: 1; }
:root.theme-reveal[data-theme="light"]::view-transition-new(root),
:root.theme-reveal[data-theme="dark"]::view-transition-old(root) { z-index: 2;
  -webkit-mask-image: radial-gradient(circle at var(--reveal-x) var(--reveal-y), #000 max(0px, calc(var(--theme-radius) - 300px)), transparent var(--theme-radius));
  mask-image: radial-gradient(circle at var(--reveal-x) var(--reveal-y), #000 max(0px, calc(var(--theme-radius) - 300px)), transparent var(--theme-radius));
  animation: theme-circle var(--theme-reveal-duration) cubic-bezier(.25,.35,.75,.85) both; }
:root.theme-reveal[data-theme="dark"]::view-transition-old(root) { animation-direction: reverse; }
/* Keep the live control above the root's old-light snapshot in both directions. */
.theme-toggle:not(.ph-static) { view-transition-name: theme-control; }
:root.theme-reveal::view-transition-group(theme-control),
:root.theme-reveal::view-transition-new(theme-control) { animation: none; }
:root.theme-reveal::view-transition-old(theme-control) { display: none; }
:root.theme-reveal::view-transition-group(theme-control) { z-index: 3; }
:root.theme-reveal::view-transition { pointer-events: none; }
@keyframes theme-circle {
  from { --theme-radius: var(--reveal-start); }
  to { --theme-radius: var(--reveal-radius); }
}
@media (prefers-reduced-motion: reduce) {
  :root.theme-reveal[data-theme]::view-transition-new(root),
  :root.theme-reveal[data-theme]::view-transition-old(root) { animation: none; }
}
/* Small default corners keep native outlines from producing needle-sharp joins. */
:where(button,a[href],input,textarea,select,summary,[tabindex]){border-radius:var(--focus-sharp-radius)}
/* State ink and keyboard location are separate: success stays green, the ring stays accent. */
.password-field{--password-focus-text:var(--icon-ink)}
:is(.gate-panel.is-success .password-field,.password-field[data-password-state=success]){--password-focus-text:var(--success)}
:is(.gate-panel.is-password-error .password-field,.password-field[data-password-state=wrong]){--password-focus-text:var(--error)}
:root[data-focus-input=keyboard] .password-field:focus-within{border-color:var(--password-focus-text);outline-color:var(--icon-ink)}
:root[data-focus-input=keyboard] .password-field:focus-within input{color:var(--password-focus-text)!important}
:root[data-focus-input=keyboard] .password-field:focus-within input::selection{color:var(--password-focus-text);background:var(--selection)}
:root[data-focus-input=keyboard] :is(.gate-panel.is-success .password-field,.password-field[data-password-state=success]):focus-within input::selection{color:var(--success);background:color-mix(in srgb,var(--success) 20%,var(--field-bg))}
:root[data-focus-input=keyboard] :is(.gate-panel.is-password-error .password-field,.password-field[data-password-state=wrong]):focus-within{outline-color:var(--error)}
/* Pointer focus remains real, but navigation rings belong to keyboard Tab use. */
:root:not([data-focus-input="keyboard"]) :focus:not(input):not(textarea):not([contenteditable="true"]) { outline: none; }
:root:not([data-focus-input="keyboard"]) input:is([type="radio"],[type="checkbox"],[type="range"]):focus { outline: none; }
:root:not([data-focus-input="keyboard"]) .code-wrap:has(pre:focus)::after { outline: none; }
:root[data-focus-input="keyboard"] :is(button, a[href], [tabindex]):focus:not(pre):not([data-panel-heading]) { outline: 3px solid var(--icon-ink); outline-offset: 3px; }
[data-panel-heading]:focus { outline: none !important; box-shadow: none !important; }
/* Button labels are controls; document and prompt text remain selectable. */
button, button * { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }
/* QR cards and prompt panels share one surface, independent of other controls. */
.qr-card, #workshop-content .code-wrap, #workshop-content .status { background: var(--content-surface); }
.segmented-toggle { cursor: pointer; position: relative; isolation: isolate; display: inline-flex; padding: 4px; gap: 4px; border-width: 1px; }
.segmented-toggle,.segmented-toggle *{-webkit-user-select:none!important;user-select:none!important;-webkit-user-drag:none}
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
.javascript-notice { display:flex; align-items:flex-start; gap:7px; padding:16px; border:1px solid var(--border); border-radius:10px; background:var(--surface); color:var(--error); font-family:inherit; font-size:14px; font-weight:400; line-height:21px; }
.javascript-notice .icon { width:18px; height:18px; flex:none; margin-top:1.5px; }
#workshop-content .javascript-notice { width:calc(100% - 48px); max-width:960px; margin:-16px auto 32px; }
.gate-panel .javascript-notice { margin:24px 0 0; }
.theme-toggle button { display: grid; place-items: center; width: 44px; padding: 0; border: 1px solid transparent; border-radius: 8px; background: transparent; color: var(--control-text); }
.theme-toggle button:hover { color: var(--text); }
/* Hover is below the moving indicator; labels remain above both layers. */
.segmented-toggle button,.segmented-toggle .choice{position:relative}
.segmented-toggle button::before,.segmented-toggle .choice::before{content:'';position:absolute;inset:0;border-radius:8px;z-index:-2;pointer-events:none;background:transparent}
.segmented-toggle button[aria-pressed="false"]:hover::before,.segmented-toggle .choice:has(input:not(:checked)):hover::before{background:var(--action-hover)}
:is(.theme-toggle,.controls .toggle) button[aria-pressed="false"]:hover { background:transparent; color:var(--text); }
.copy:hover{background:var(--hover)}
.theme-toggle button[aria-pressed="true"] { background: transparent; color: var(--text); }
.theme-toggle button:focus-visible { outline: 3px solid var(--icon-ink); outline-offset: 3px; }
.theme-toggle .icon { width: 20px; height: 20px; }
.gate-toolbar { display: flex; justify-content: flex-end; margin-bottom: 20px; }
/* Retain saved anonymous backdrop image styling until its next capture. */
:root[data-theme="dark"] .brand-mark img { filter: brightness(0) invert(1); }
/* A selectable space supplies native highlight paint beneath the masked brand.
   Keep the shape outside image filters so neither its ink nor backing is tinted.
   Clip native selection paint: the stretched space can paint past its range bounds. */
.brand-worm { --brand-mark-width: 48px; display: inline-block; position: relative; width: var(--brand-mark-width); height: calc(var(--brand-mark-width) * 638 / 1590); font: calc(var(--brand-mark-width) * 638 / 1590)/1 monospace; letter-spacing: calc(var(--brand-mark-width) - 1ch); color: transparent; white-space: nowrap; overflow: clip; }
.brand-worm::selection { color: transparent; background: var(--selection); }
.brand-worm::after { content: ''; position: absolute; inset: 0; background: #000; mask: url('/assets/wavelength-worm.png') center/contain no-repeat; pointer-events: none; }
:root[data-theme="dark"] .brand-worm::after { background: #fff; }
.qr-card img { background: white; border-radius: inherit; }
/* Keep the neutral inner keyline above every QR overlay without changing layout. */
:root[data-focus-input="keyboard"] .qr-copy:focus .qr-copy-overlay { transition:none; }
.qr-copy::after { content: ''; position: absolute; inset: 0; z-index: 1; border: 1px solid var(--border); border-radius: inherit; pointer-events: none; }
:root[data-theme="dark"] .page-placeholder .ph-line, :root[data-theme="dark"] .ph-brand-mark { background: #707b8b; }
:root[data-theme="dark"] .ph-toggle span:last-child { background: var(--control-bg); }
@media (max-width: 380px) { .page-toolbar { gap: 8px; } .page-toolbar .brand { gap: 6px; } .page-toolbar .brand-name { font-size: 13px; } .page-toolbar .brand-worm { --brand-mark-width: 36px; } .page-toolbar .brand-mark img { width: 36px; } .theme-toggle button { width: 40px; } }
.gate-panel:has(.gate-error.is-error) .gate-submit:disabled{background:var(--control-bg);color:var(--muted-text);box-shadow:inset 0 0 0 1px var(--control-border);cursor:not-allowed}
/* Cursor semantics apply to both login and resources, including child hit targets. */
html, body { cursor: default; }
a.page-title-link{display:block;width:fit-content;max-width:100%;color:inherit;text-decoration:none;border-radius:8px;cursor:pointer}
a.page-title-link[href]:is(:link,:visited){color:var(--text)}
a.page-title-link h1,a.page-title-link h1 *{cursor:inherit}
a.page-title-link:focus{outline:none}
:root[data-focus-input="keyboard"] a.page-title-link:focus{outline:3px solid var(--icon-ink);outline-offset:3px}
:where(p, h1, h2, h3, h4, h5, h6, span, label, li, dt, dd, blockquote, figcaption, pre, code, strong, em, small, b, i, td, th) { cursor: text; }
:where(input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]):not([type="file"]):not([type="image"]), textarea, [contenteditable="true"]) { cursor: text; }
:where(button, a[href], summary, select, [role="button"], [role="switch"], [role="tab"], [role="checkbox"], [role="radio"], .segmented-toggle, input:is([type="button"], [type="submit"], [type="reset"], [type="checkbox"], [type="radio"], [type="range"], [type="color"], [type="file"], [type="image"])) { cursor: pointer; }
:where(button, a[href], summary, select, [role="button"], [role="switch"], [role="tab"], [role="checkbox"], [role="radio"], .segmented-toggle) * { cursor: inherit; }
:is(:disabled, [aria-disabled="true"]), :is(:disabled, [aria-disabled="true"]) * { cursor: not-allowed; }
`;
// Runs in the head before paint; storage denial must never prevent using the page.
const script = `(() => {
  const key = 'workshop-colour-theme';
  document.documentElement.dataset.focusInput = 'pointer';
  document.addEventListener('keydown', event => {if(event.key==='Tab')document.documentElement.dataset.focusInput='keyboard';},true);
  document.addEventListener('pointerdown', event => {
    document.documentElement.dataset.focusInput = 'pointer';
    if (!event.isPrimary || event.button !== 0) return;
    const target = event.target.closest('button, a[href], pre[tabindex]');
    if (target && !target.disabled) target.focus({preventScroll: true});
  }, true);
  const focusedPanels = new WeakSet();
  window.workshopFocusPanel = panel => {
    const labelled = document.getElementById((panel.getAttribute('aria-labelledby') || '').split(' ')[0]);
    const heading = labelled && panel.contains(labelled) ? labelled : panel.querySelector('h1,h2,h3,h4,h5,h6');
    if (!heading) return;
    heading.setAttribute('data-panel-heading', '');
    heading.tabIndex = -1;
    heading.focus({preventScroll: true});
    focusedPanels.add(panel);
  };
  document.addEventListener('toggle', event => {
    if (!event.target.matches('dialog, [popover]')) return;
    if (event.newState === 'open' && !focusedPanels.has(event.target)) window.workshopFocusPanel(event.target);
    if (event.newState === 'closed') focusedPanels.delete(event.target);
  }, true);
  const system = matchMedia('(prefers-color-scheme: dark)');
  let preference;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const themeAnimations = new Set();
  let reveal, revealRequest = 0;
  let restoreControlColours = () => {};
  window.workshopThemeBusy = () => Boolean(reveal) || themeAnimations.size > 0;
  const colourProperties = ['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor', 'fill', 'stroke', 'filter'];
  const cancelThemeAnimations = () => { themeAnimations.forEach(animation => animation.cancel()); themeAnimations.clear(); };
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) { cancelThemeAnimations(); restoreControlColours(); reveal?.skipTransition(); } });
  const colours = element => {
    const style = getComputedStyle(element);
    return Object.fromEntries(colourProperties.map(property => [property, style[property]]));
  };
  const indicators = [];
  const valid = value => value === 'light' || value === 'dark';
  try { const saved = localStorage.getItem(key); if (valid(saved)) preference = saved; } catch {}
  const requested=(${JSON.stringify(themeAliases)})[new URLSearchParams(location.search).get('theme')?.toLowerCase()];
  if(typeof requested==='string'){preference=requested;try{localStorage.setItem(key,preference);}catch{}}
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
  function selectThemeControls(theme) {
    document.querySelectorAll('[data-theme-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme)));
    indicators.forEach(move => move());
  }
  function apply(animate = false, theme = preference || (system.matches ? 'dark' : 'light'), selectControls = true) {
    const change = () => {
      document.documentElement.dataset.theme = theme;
      if (selectControls) selectThemeControls(theme);
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
    restoreControlColours();
    if (reducedMotion.matches || !document.startViewTransition || !('registerProperty' in CSS)) {
      apply(!reducedMotion.matches, theme);
      return;
    }
    cancelThemeAnimations();
    selectThemeControls(theme);
    const control = button.closest('.theme-toggle');
    const destination = control.querySelector('[data-theme-choice="' + theme + '"]');
    const bounds = destination.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2, y = bounds.top + bounds.height / 2;
    const range = (${revealRadiusRange.toString()})(innerWidth, innerHeight, x, y);
    root.style.setProperty('--reveal-x', x + 'px');
    root.style.setProperty('--reveal-y', y + 'px');
    root.style.setProperty('--reveal-start', range.start + 'px');
    root.style.setProperty('--reveal-radius', range.end + 'px');
    root.classList.add('theme-reveal');
    // Keep the independently moving toggle in the colours of its surrounding
    // feather. Sample the actual animated radius, so this shares the reveal's
    // clock and easing instead of starting a separate colour transition.
    const tokens = ['--surface', '--control-border', '--control-bg', '--control-text', '--text'];
    const before = getComputedStyle(control);
    const previous = tokens.map(token => before.getPropertyValue(token));
    const saved = tokens.map(token => control.style.getPropertyValue(token));
    const controlBounds = control.getBoundingClientRect();
    const distance = Math.hypot(controlBounds.left + controlBounds.width / 2 - x, controlBounds.top + controlBounds.height / 2 - y);
    let colourFrame;
    restoreControlColours = () => {
      cancelAnimationFrame(colourFrame);
      tokens.forEach((token, i) => saved[i] ? control.style.setProperty(token, saved[i]) : control.style.removeProperty(token));
      control.style.removeProperty('--theme-control-previous');
      restoreControlColours = () => {};
    };
    reveal = document.startViewTransition(() => {
      if (request !== revealRequest) return;
      apply(false, theme, false);
      const style = getComputedStyle(control);
      const next = tokens.map(token => style.getPropertyValue(token));
      control.style.setProperty('--theme-control-previous', '100%');
      tokens.forEach((token, i) => control.style.setProperty(token, 'color-mix(in srgb, ' + previous[i] + ' var(--theme-control-previous), ' + next[i] + ')'));
    });
    reveal.ready.then(() => {
      const pseudo = theme === 'dark' ? '::view-transition-old(root)' : '::view-transition-new(root)';
      function followFeather() {
        if (request !== revealRequest || reducedMotion.matches) return;
        const radius = parseFloat(getComputedStyle(root, pseudo).getPropertyValue('--theme-radius'));
        const light = Math.max(0, Math.min(1, (radius - distance) / Math.min(300, radius)));
        control.style.setProperty('--theme-control-previous', (100 * (theme === 'dark' ? light : 1 - light)) + '%');
        colourFrame = requestAnimationFrame(followFeather);
      }
      followFeather();
    }).catch(() => {}); // A skipped snapshot still commits the requested theme.
    await reveal.finished.catch(() => {});
    if (request === revealRequest) {
      restoreControlColours();
      root.classList.remove('theme-reveal');
      ['--reveal-x', '--reveal-y', '--reveal-start', '--reveal-radius'].forEach(property => root.style.removeProperty(property));
      reveal = undefined;
    }
  }
  apply();
  system.addEventListener('change', () => { if (!preference) apply(true); });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    // A newer preference from another tab supersedes an in-flight local reveal.
    ++revealRequest;reveal?.skipTransition();reveal=undefined;restoreControlColours();
    document.documentElement.classList.remove('theme-reveal');
    ['--reveal-x','--reveal-y','--reveal-start','--reveal-radius'].forEach(property=>document.documentElement.style.removeProperty(property));
    let value=event.newValue;
    if(event.storageArea){try{value=localStorage.getItem(key);}catch{}}
    preference = valid(value) ? value : undefined;
    apply(!window.workshopSyncPreferences);
    window.workshopSyncPreferences?.();
  });
  document.addEventListener('DOMContentLoaded', () => {
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
  html=html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/g,heading=>{
    const path=heading.includes('Component Playground')?'/component-playground':heading.includes('AI Workshop Resources')?'/ai-workshop-resources':null;
    return path?`<a class="page-title-link" tabindex="1" data-no-link-decoration href="${path}">${heading}</a>`:heading;
  });
  html = html.replace('</head>', `<style data-workshop-theme-styles>${styles}\n${groupFocusCSS}\n${linkCSS}\n${colourValueCSS}\n${alignmentCSS}\n${bodyTypeCSS}\n${skipNavigationCSS}</style><script nonce="__NONCE__" data-workshop-theme>${agentScript}\n${playgroundFaviconScript}\n${toggleScript}\n${script}\n${keyboardNavigationScript}\n${linkScript}\n${skipNavigationScript}\n${colourValueScript}</script></head>`);
  if (login) return html.replace('</h2>', `</h2><div class="gate-toolbar"><p class="eyebrow">Workshop Access</p>${control}</div>`);
  return html.replace('<div class="brand" aria-label="Wavelength">', '<div class="page-toolbar"><div class="brand" aria-label="Wavelength">')
    .replace('    <header class="page-header">', `    ${control}</div>\n    <header class="page-header">`);
}

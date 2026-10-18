// Lucide X, from the installed lucide-react icon definition (MIT).
// Static SVG keeps this fallback usable when JavaScript is disabled.
export function javascriptNotice(message) {
  return `<p class="javascript-notice"><svg data-icon-use="javascript-unavailable" data-icon-name="x" data-icon-provider="lucide" class="icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg><span>${message}</span></p>`;
}

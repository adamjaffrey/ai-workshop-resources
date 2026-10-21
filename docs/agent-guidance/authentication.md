---
name: authentication-and-routing
description: Preserve canonical routing, login states and the hidden navigation shortcut.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.8"
  update_summary: "Clarify login intent and document inverse selector aliases"
  updated_at: "Thu 22 Oct 2026 at 09:05:59 am AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Authentication and Routing Contract

This is a mandatory scoped contract incorporated by [AGENTS.md](../../AGENTS.md). Read it before changing the behaviours it covers. Paths and commands in code spans are relative to the repository root. Documentation-only work does not trigger the software checks listed here.

Read the [local and hosted URL behaviour](delivery.md#local-and-hosted-url-behaviour) alongside this contract when changing authentication.

## Routing and Public Parameters

Site-wide GET/HEAD requests remove a leading `www.` hostname and lowercase the path before resolving aliases in one 301 redirect; lowercase the names and values of known public query parameters (`agent`, `theme`, `show-login` and its legacy aliases) in that same redirect, preserving unrelated query components exactly and leaving POST paths unchanged. Accept `true`/`yes`/`1` and `false`/`no`/`0` for all login selectors. Canonicalise `show-login`, `logout`, `logged-out` and `loggedout` directly to `show-login=true` or `show-login=false`; invert the boolean for `hide-login`, `login`, `logged-in` and `loggedin`. Remove unsupported or empty login-selector values by redirect. Map parameter name `ai` to `agent` and `mode` to `theme`, accepting their complete shared value vocabularies and applying the same invalid-value removal. See [Public Query Parameters](../../website/URL-REFERENCE.md#public-query-parameters) for the boolean spellings and outcome-based tables. Preserve duplicate order, using the first valid resulting `show-login` value. Use 301 for every application canonical redirect, including slash-only corrections. Preserve descendants for every registered path alias with segment-boundary matching; `/` remains exact-only, and unknown descendants remain 404 until implemented. Support all ai/ais × workshop/workshops × resource/resources, style/styles × guide/guides, focus/focuses/foci × selection/selections, and easter/easters × egg/eggs variants. Canonicalise recognised agent/theme aliases to `codex`, `claude-code`, `light` and `dark` in that same hop. Remove unsupported or empty agent/theme values by 301; preserve unrelated query data. Include `/style`, `/styles`, `/guide` and `/guides` as Playground prefix aliases. Keep `website/URL-REFERENCE.md` and the Playground URL Reference tab aligned with routing and query parameter changes. Use AI Workshop Resources and Component Playground as the respective browser titles, including login pages. Maintain only lowercase redirect keys and public asset filenames. Hosting must accept the `www` hostname and supply its certificate before these redirects can run.

## Resources Step Fragments

Resources step anchors and short aliases are listed in [URL Reference](../../website/URL-REFERENCE.md#resources-aliases). Resolve recognised fragments in the client: fragments are not sent to the server, so their alias rewrites use `history.replaceState`, not HTTP redirects. Preserve the current path/query during alias rewrites, retain fragments through JavaScript login, and leave unknown fragments alone. Copied links use the canonical Resources path and descriptive fragment, retain the current query except `show-login`, and never initiate scrolling. Handle initial loads, reloads, history restoration and same-document re-entry of an unchanged recognised fragment; use the Navigation API where supported because unchanged fragments do not emit `hashchange`. Handle both push and replacement navigation; suppress only the controller’s own history rewrite and ignore query-only preference updates. Canonicalise short aliases after an intercepted transition finishes, because changing history during it aborts the transition. Follow [Resources Anchor Arrival](motion.md#resources-anchor-arrival) for positioning.

## Playground Heading Fragments

Use the canonical tab path plus the kebab-case outer H2/H3 title, as listed in [URL Reference](../../website/URL-REFERENCE.md#playground-sections). Fragments are handled entirely in the client and do not alter server authentication or create new server routes. Copy retains current query parameters except `show-login`. Preserve fragments through login and path canonicalisation; leave unknown fragments unchanged. Handle initial load, reload, back/forward and same-URL replacement using the Navigation API where available, with hash/history events as fallbacks. Ignore query-only preference updates. Tab selection clears the old tab's fragment. Do not let native fragment scrolling run before active specimens and the sticky layout are ready; the controller owns the landing described in [Playground Anchor Arrival](motion.md#playground-anchor-arrival).

## Website Login

- Keep every login error on its requested canonical page and preserve its section/query URL. Initial configuration/database failures use that destination's login template: Resources blocks for Resources, Colours blocks for every Playground section, with the same blur, dimming and theme/agent handling. Password, throttling, network and service errors during submission remain inline without navigation. Service failures still return HTTP 503 and fail closed. Run `website/tests/login-error-destination-browser-check.mjs` when changing this handling.

- Use measured anonymous blocks from the Colours tab, behind every Playground login route. Reuse that single Colours backdrop for `/component-playground` and all section paths; do not measure each tab. Main-app login retains its Resources backdrop. Share the login panel, one background blur and dimming, and keep both destinations inspectable from the Components login specimen. Both backdrops follow the selected theme/agent, defaulting to Codex blue. Serve only anonymous geometry in inert, script-disabled backdrop frames; never embed the authenticated Playground or original protected text.

- Sessions expire seven days after login, without extending on use. Keep this implementation detail in repository documentation, not the login page copy.
- On initial load, focus the login heading with no visible focus ring. Tab order is the day/night toggle as one stop, password field, then unlock button on desktop and mobile.
- Keep the password input visible above the mobile keyboard and allow the login panel to scroll when the visible viewport is short.

- Keep checking and success text visually hidden but announced to screen readers. Use neutral muted-text colour for the resting Lucide padlock and checking Loader Circle; swap to Check on success; use green success styling and honour reduced motion.
- Show only error messages below the input. Reserve one text line so ordinary status changes do not resize or recentre the panel; allow expansion for accessibility text scaling rather than clipping messages. Keep 12px between label and input, 12px between input and error row, and 16px before the submit button.
- After an incorrect password, colour the input border, focused outline, padlock and password bullets red until the user edits the field. Refocusing alone must preserve the error. Editing clears the error and restores the neutral padlock and selected blue/orange focused border and focus accent. On success, show green bullets during the brief transition, then clear the password before navigation.

- Keep JavaScript-disabled notices separate from password validation: use the shared error token and decorative Lucide X; place the login notice between introductory copy and Password, and the resources notice between the header and first step. Render them statically inside `noscript`.

## Hidden Playground Shortcut

- Three taps or primary-button clicks on the Wavelength header logo within three seconds open the other page in a new tab/window using `_blank` with `noopener,noreferrer`: Resources opens `/component-playground`, and Playground opens `/ai-workshop-resources`, leaving the original page open. Reuse the same gesture handler and timing on both pages. Only the header brand area activates it; other clicks, leaving the window or changing visibility reset the sequence. Keep the existing brand markup unchanged: no Tab stop, programmatic focusability, focus ring, button/link role, action-specific screen-reader label, tooltip, hover treatment or visible affordance. Screen readers should encounter only the existing brand content. On both locked pages, recognise the coordinates of the actual blurred backdrop logo through the scrim without adding a hotspot element; never intercept the login panel. The parent may read logo bounds from the anonymous Colours iframe using `allow-same-origin`; the iframe remains inert and script-disabled (no `allow-scripts`, with CSP `script-src 'none'`). Never embed protected content or make the backdrop itself interactive. This intentionally undisclosed shortcut is an exception to the normal pointer-cursor rule. It does not grant access or bypass authentication.
- Playground specimens exercise the same gesture handler but cancel navigation and report the simulated activation.

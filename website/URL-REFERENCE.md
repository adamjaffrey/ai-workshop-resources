---
name: website-url-reference
description: Define canonical website URLs, redirect aliases, query parameters and authentication behaviour.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.3"
  update_summary: "Add the Playground URL Reference tab and reciprocal logo navigation"
  updated_at: "Tue 20 Oct 2026 at 09:39:53 am AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Website URL Reference

This document describes the repository implementation. Application changes take effect on hosted Sites only after publication; a local build or Git commit does not deploy them. The site slug has already been changed to `workshop`. The Sources section identifies the implementation authorities.

## Canonical Addresses And Page Titles

All paths in this document are relative to `https://workshop.adamjaffrey.chatgpt.site`.

| Purpose | Canonical Address Or Path | Browser Title |
| --- | --- | --- |
| QR Code And Copy Link | `https://workshop.adamjaffrey.chatgpt.site` | Destination title |
| Resources | `/ai-workshop-resources` | AI Workshop Resources |
| Resources Login | `/ai-workshop-resources?show-login=true` | AI Workshop Resources |
| Playground | `/component-playground` | Component Playground |
| Playground Login | `/component-playground?show-login=true` | Component Playground |

Every supported Playground section uses the same browser title as the Playground root. Page titles do not select or rename URL paths.

## Hostname Redirects

| Source Hostname | Destination Hostname | Status And Owner |
| --- | --- | --- |
| `ai-implementation-workshop-resources.adamjaffrey.chatgpt.site` | `workshop.adamjaffrey.chatgpt.site` | 307 Temporary Redirect, controlled by Sites |
| `ai-workshop-resources.adamjaffrey.chatgpt.site` | `workshop.adamjaffrey.chatgpt.site` | 307 Temporary Redirect, controlled by Sites |
| Leading `www.` on a hostname accepted by hosting | Same hostname without `www.` | 301 Moved Permanently, application rule |

Both legacy Sites hostnames have been observed redirecting to the new hostname while preserving the path and query string. Sites does not expose a status-code option for these hostname redirects. A 307 is temporary and preserves the request method; a 301 signals a permanent move. The application cannot override a redirect issued before its code receives the request.

The `www` rule requires hosting to accept that hostname and supply its HTTPS certificate. It does not create DNS records or certificates. Sites rejected registration of `www.ai-workshop-resources.adamjaffrey.chatgpt.site` because it is a Sites-owned hostname; the application rule does not make that hostname available.

## Global Canonicalisation

- Apply application URL canonicalisation to GET and HEAD requests; leave POST paths unchanged.
- Lowercase paths and recognised public query parameter names/values. Resolve recognised value aliases to their canonical values.
- Remove trailing slashes, including on otherwise unknown lowercase paths. All application canonical redirects use 301.
- Combine hostname, path, alias and query corrections into one application redirect. A separate Sites hostname redirect can add a hop.
- Preserve unrelated query components exactly, including their case and encoding.
- Preserve descendants beneath every registered path alias, with complete path-segment matching. `/resources/example` matches; `/resources-example` does not.
- Treat `/` as an exact-only alias, never a catch-all for unknown paths.
- Leave already canonical URLs unchanged. Redirecting to a future descendant does not create a page: unimplemented destinations remain 404.

## Resources Aliases

Every alias below redirects with 301 to `/ai-workshop-resources`. Named aliases also preserve descendants. The canonical path itself does not redirect.

| Group | Alias Paths |
| --- | --- |
| Root And Home | `/`, `/home`, `/homes`, `/index.html` |
| Workshop | `/workshop`, `/workshops` |
| Resources | `/resource`, `/resources` |
| Workshop/Resource Combinations | `/workshop-resource`, `/workshop-resources`, `/workshops-resource`, `/workshops-resources` |
| AI | `/ai`, `/ais` |
| AI Combinations | `/ai-workshop-resource`, `/ai-workshops-resource`, `/ai-workshops-resources` |
| AIs Combinations | `/ais-workshop-resource`, `/ais-workshop-resources`, `/ais-workshops-resource`, `/ais-workshops-resources` |

Together with the canonical path, the table covers every ai/ais × workshop/workshops × resource/resources combination.

```text
/resources/day-1-resources
→ /ai-workshop-resources/day-1-resources

/AIS-WORKSHOPS-RESOURCE/Day-1-Resources/
→ /ai-workshop-resources/day-1-resources
```

The example descendant remains 404 until implemented.

## Playground Root Aliases

Every alias below redirects with 301 to `/component-playground`, preserving descendants.

| Group | Alias Paths |
| --- | --- |
| Component | `/component`, `/components` |
| Playground | `/playground`, `/playgrounds` |
| Combined | `/components-playground`, `/component-playgrounds`, `/components-playgrounds` |
| Style And Guide | `/style`, `/styles`, `/guide`, `/guides` |
| Style Guide Combinations | `/style-guide`, `/style-guides`, `/styles-guide`, `/styles-guides` |

## Playground Sections

Section aliases work under the canonical Playground root and every root alias above. They use 301 and preserve descendants. Canonical section paths do not redirect.

| Canonical Path | Alternative Section Slugs |
| --- | --- |
| `/component-playground/components` | `component` |
| `/component-playground/typography` | `typographies` |
| `/component-playground/colours` | `colour`, `color`, `colors` |
| `/component-playground/blocks-and-blur` | `block`, `blocks`, `blur`, `blurs`, `block-and-blur`, `block-and-blurs`, `blocks-and-blurs` |
| `/component-playground/icons` | `icon` |
| `/component-playground/status-states` | `error`, `errors`, `status`, `statuses`, `state`, `states`, `status-state`, `statuses-state`, `statuses-states` |
| `/component-playground/focus-and-selection` | `focus`, `focuses`, `foci`, `selection`, `selections`, `focus-and-selections`, `focuses-and-selection`, `focuses-and-selections`, `foci-and-selection`, `foci-and-selections` |
| `/component-playground/branding` | `brand`, `brands`, `brandings` |
| `/component-playground/url-reference` | `url-references` |
| `/component-playground/easter-egg` | `discovery`, `discoveries`, `easter`, `easters`, `egg`, `eggs`, `easter-eggs`, `easters-egg`, `easters-eggs` |

```text
/styles-guides/foci-and-selections/example
→ /component-playground/focus-and-selection/example

/guide/easters-eggs/example
→ /component-playground/easter-egg/example
```

Only the root and listed canonical section pages currently exist. Pluralisation uses explicit mappings; it does not rewrite arbitrary descendant words.

## Public Query Parameters

The portion after `?` is the query string. Each name/value pair is a query parameter. Parameter names and recognised values are case-insensitive through canonical redirects.

| Canonical Parameter | Effect |
| --- | --- |
| `agent=codex` | Select Codex and blue branding |
| `agent=claude-code` | Select Claude Code and orange branding |
| `theme=light` | Select light theme |
| `theme=dark` | Select dark theme |
| `show-login=true` | Revoke the current session, clear its cookie and show the requested login form |
| `show-login=false` | Reuse a valid session or show login; never authenticate automatically |

### Agent And Theme Aliases

All recognised aliases redirect with 301 to the corresponding canonical value.

| Alias | Canonical Parameter |
| --- | --- |
| `agent=chatgpt`, `agent=chatgpt-codex` | `agent=codex` |
| `agent=claude`, `agent=code` | `agent=claude-code` |
| `theme=day`, `theme=sun` | `theme=light` |
| `theme=night`, `theme=moon` | `theme=dark` |

Valid values override saved preferences before paint and become the saved preference. When no valid parameter remains, the saved preference is retained; without one, the agent defaults to Codex and the theme follows the system. Playground tab navigation preserves parameters. Changing a selector updates its corresponding parameter when present.

Unsupported or empty `agent` and `theme` values are removed by 301 redirect, including values such as `agent=unknown`, `theme=`, `agent=__proto__` or a bare `theme` parameter. This is URL cleanup, not an HTTP error. Unknown parameter names remain untouched. Duplicate valid parameters retain their order; after invalid entries are removed, the first remaining value wins.

The Playground favicon and its login-page favicon follow the selected agent and theme: light mode uses an agent-coloured tile with white strokes; dark mode uses a dark tile with agent-coloured strokes. Resources retains its static favicon.

### Login Aliases And Validation

These aliases are redirect inputs only. Authentication reads the resulting `show-login` parameter.

| Alias | Canonical Parameter |
| --- | --- |
| `login=1`, `logged-in=false`, `logged-out=true` | `show-login=true` |
| `login=0`, `logged-in=true`, `logged-out=false` | `show-login=false` |

Only true/false are accepted for `show-login`, `logged-in` and `logged-out`; only 1/0 are accepted for legacy `login`. Unsupported values such as `login=true`, `login=2` or `show-login=yes` are removed by 301 redirect. Valid duplicates retain their order, with the first resulting `show-login` value taking effect.

Successful login removes `show-login` before navigation, preventing a logout loop while preserving the requested section and unrelated query parameters. These actions affect the current session only; they do not authenticate users or revoke unrelated browser sessions.

### Local And Hosted Behaviour

| Request | Automatic Local Preview | Hosted Application |
| --- | --- | --- |
| Resources without `show-login` | Obtain a real local session automatically if needed | Require a valid session or password |
| Playground without `show-login` | Allow anonymous preview access | Require a valid session or password |
| Any supported page with `show-login=true` | Revoke the current session and show login | Same |
| Any supported page with `show-login=false` | Require a valid session or show login | Same |

The explicit boolean behaviour applies to Resources, the Playground root and every supported Playground section. Future or unknown paths remain 404. Low-level local tests may disable automatic sign-in and protect the Playground explicitly.

### Combined Example

```text
/STYLES/FOCI-AND-SELECTIONS/?Agent=Claude&Theme=MOON&LOGIN=1&Token=AbC
→ /component-playground/focus-and-selection?agent=claude-code&theme=dark&show-login=true&Token=AbC
```

This is one application 301. It selects Claude Code and dark theme, revokes the current session and shows the Playground login form. `Token=AbC` is preserved.

## Other Authentication Navigation And Internal Parameters

| Action | Result |
| --- | --- |
| Successful non-JavaScript login POST | 303 See Other to `/ai-workshop-resources` |
| Logout POST | 303 to `/ai-workshop-resources`; automatic local preview adds `?show-login=true` |
| Successful JavaScript login | Browser navigation to the requested destination, removing `show-login` |
| Local ChatGPT sign-in/out tooling | `return_to` selects a validated same-origin destination; GET uses 302 and sign-out POST uses 303 |

`return_to` is internal tooling, not a public display selector. Invalid or external destinations fall back to `/`. The decorative `/login-backdrop/components` endpoint uses canonical `theme` and `agent` values to render anonymous geometry; it cannot grant access. No query parameter carries a password or grants a hosted session.

## Playground Reference And Logo Navigation

The Playground’s URL Reference tab at `/component-playground/url-reference` renders this document, including URL mappings and query parameter strings. Examples are non-clickable text, so inspecting `show-login=true` cannot accidentally log you out. Future URL or query changes must update this document and its Playground representation together.

Three primary-button clicks or taps on the Wavelength header brand within three seconds open the other page in a new tab/window (`_blank`, `noopener,noreferrer`). Resources opens `/component-playground`; Playground opens `/ai-workshop-resources`. Both use canonical paths and the same gesture handler. The original page stays open. Other clicks, window blur or visibility changes reset the sequence.

The shortcut works while signed in and on both login screens, using the blurred logo’s actual bounds through the scrim. Clicks on the login panel never activate it. The Components backdrop stays anonymous, inert and script-disabled; the parent reads only its geometry. Navigation does not sign anyone in or bypass hosted authentication. Playground specimens simulate activation without opening a window.

## Sources

- [Canonical Redirects And Path Aliases](lib/workshop-playground-routes.mjs)
- [Shared Agent And Theme Alias Vocabulary](lib/workshop-url-preferences.mjs)
- [Authentication And Login Navigation](lib/workshop-handler.mjs)
- [Local Preview Behaviour](scripts/phone-preview.mjs)
- [Resources And Login Documents](lib/workshop-pages.mjs)
- [Playground Document](scripts/playground.mjs)
- [Playground Favicon](lib/workshop-playground-brand.mjs)
- [Internal Local Sign-In Tooling](build/sites-vite-plugin.ts)

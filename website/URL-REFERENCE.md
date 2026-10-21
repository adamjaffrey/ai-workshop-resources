---
name: website-url-reference
description: Define canonical website URLs, redirect aliases, query parameters and authentication behaviour.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.19"
  update_summary: "Simplify canonical login and Claude URL components"
  updated_at: "Thu 22 Oct 2026 at 09:24:01 am AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Website URL Reference

This document describes the repository implementation. Application changes take effect on hosted Sites only after publication; a local build or Git commit does not deploy them. The site slug has already been changed to `workshop`. The Sources section identifies the implementation authorities.

## Canonical Addresses and Page Titles

All paths in this document are relative to `https://workshop.adamjaffrey.chatgpt.site`.

| Purpose | Canonical Address or Path | Browser Title |
| --- | --- | --- |
| QR Code and Copy Link | `https://workshop.adamjaffrey.chatgpt.site` | Destination title |
| Resources | `/ai-workshop-resources` | AI Workshop Resources |
| Resources Login | `/ai-workshop-resources?login=false` | AI Workshop Resources |
| Playground | `/component-playground` | Component Playground |
| Playground Login | `/component-playground?login=false` | Component Playground |

Every supported Playground section uses the same browser title as the Playground root. Page titles do not select or rename URL paths.

## Hostname Redirects

| Source Hostname | Destination Hostname | Status and Owner |
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
| Root and Home | `/`, `/home`, `/homes`, `/index.html` |
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
| Style and Guide | `/style`, `/styles`, `/guide`, `/guides` |
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
| `/component-playground/url-reference` | `url`, `urls`, `reference`, `references`, `url-references`, `urls-reference`, `urls-references` |
| `/component-playground/easter-egg` | `discovery`, `discoveries`, `easter`, `easters`, `egg`, `eggs`, `easter-eggs`, `easters-egg`, `easters-eggs` |

```text
/styles-guides/foci-and-selections/example
→ /component-playground/focus-and-selection/example

/guide/easters-eggs/example
→ /component-playground/easter-egg/example
```

The top-level aliases `/url`, `/urls`, `/reference`, `/references`, `/url-reference`, `/url-references`, `/urls-reference` and `/urls-references` also redirect directly to `/component-playground/url-reference` with 301. They preserve descendants, so `/URLS-REFERENCES/Example` redirects to `/component-playground/url-reference/example`. These aliases also work as section slugs beneath every Playground root alias. Query strings follow the same global canonicalisation rules.

Only the root and listed canonical section pages currently exist. Pluralisation uses explicit mappings; it does not rewrite arbitrary descendant words.

## Anchor Links

**Resources Anchors**

Step links use the canonical Resources path with these fragments:

| Section | Heading | Canonical Anchor URL | Legacy Fragment Alias |
| --- | --- | --- | --- |
| Resources / Node.js Setup | Step 1 | `/ai-workshop-resources`**`#step-1-node-js-setup`** | `#step-1` |
| Resources / System Blueprint Creator | Step 2 | `/ai-workshop-resources`**`#step-2-system-blueprint-creator`** | `#step-2` |
| Resources / System Build Assistant | Step 3 | `/ai-workshop-resources`**`#step-3-system-build-assistant`** | `#step-3` |

Fragments stay in the browser and are not sent to the server. Opening a short alias scrolls to the same destination and rewrites the address bar to the descriptive fragment with `history.replaceState`, without an extra Back-button stop. JavaScript login retains the requested fragment. Unknown fragments remain unchanged.

Clicking Step N or its exterior Hash icon copies the full canonical step URL without scrolling or changing the address bar. Copying preserves the current query parameters except `login`. For example, `/ai-workshop-resources?agent=claude&theme=dark`**`#step-2-system-blueprint-creator`** retains those display preferences.

Opening, reloading or re-entering a recognised step URL (including same-URL replacement navigation) scrolls the text to 60px below the floating selectors, or 30px on mobile. Travel uses a baseline 1200 CSS px/s with eased 300ms acceleration/deceleration and increases speed to cap long journeys at three seconds; selectors become sticky naturally during travel. Earlier step/card pairs fade out over the final 600ms of scrolling while the selector shadows and floating Wavelength mark fade in; all finish together. Earlier pairs fade back in only when scrolling upwards, retaining their layout space. Near-footer anchors may require extra bottom scroll room. Reduced-motion preferences are respected. The first three Tab stops after arrival are the agent selector, theme selector and target-card content.

**Playground Anchors**

Every collapsible outer H2/H3 also has a copyable heading anchor. The inventory follows visible tab order, then heading order within each tab; H3 rows name their enclosing H2 section. The four indented query-parameter subsections are H3 targets; embedded specimens do not receive anchors.

| Section | Heading | Canonical Anchor URL | Legacy Fragment Alias |
| --- | --- | --- | --- |
| Components | Login and Password Field (H2) | `/component-playground/components`**`#login-and-password-field`** | — |
| Components | Resource Page and Controls (H2) | `/component-playground/components`**`#resource-page-and-controls`** | — |
| Typography | Typography and Text Styles (H2) | `/component-playground/typography`**`#typography-and-text-styles`** | — |
| Typography | Defined Styles Used in Playground (H2) | `/component-playground/typography`**`#defined-styles-used-in-playground`** | — |
| Typography | Text Styles Not Used in the App (H2) | `/component-playground/typography`**`#text-styles-not-used-in-the-app`** | — |
| Colours | Shared Colour Tokens (H2) | `/component-playground/colours`**`#shared-colour-tokens`** | — |
| Colours | All App Colour Rules (H2) | `/component-playground/colours`**`#all-app-colour-rules`** | — |
| Colours | Source Coverage (H2) | `/component-playground/colours`**`#source-coverage`** | — |
| Blocks and Blur | Blocks and Blur (H2) | `/component-playground/blocks-and-blur`**`#blocks-and-blur`** | — |
| Icons | App Icons and Symbols (H2) | `/component-playground/icons`**`#app-icons-and-symbols`** | — |
| Icons | Playground Icons (H2) | `/component-playground/icons`**`#playground-icons`** | — |
| Icons | Lucide Licence · ISC and MIT (H2) | `/component-playground/icons`**`#lucide-licence-isc-and-mit`** | — |
| Icons | Lobe Icons Licence · MIT (H2) | `/component-playground/icons`**`#lobe-icons-licence-mit`** | — |
| Status States | Status States and Fallbacks (H2) | `/component-playground/status-states`**`#status-states-and-fallbacks`** | — |
| Focus and Selection | Focus Rings and Text Selection (H2) | `/component-playground/focus-and-selection`**`#focus-rings-and-text-selection`** | — |
| Branding | Floating Brand Blur (H2) | `/component-playground/branding`**`#floating-brand-blur`** | — |
| URL Reference | Canonical Addresses and Page Titles (H2) | `/component-playground/url-reference`**`#canonical-addresses-and-page-titles`** | — |
| URL Reference | Hostname Redirects (H2) | `/component-playground/url-reference`**`#hostname-redirects`** | — |
| URL Reference | Global Canonicalisation (H2) | `/component-playground/url-reference`**`#global-canonicalisation`** | — |
| URL Reference | Resources Aliases (H2) | `/component-playground/url-reference`**`#resources-aliases`** | — |
| URL Reference | Playground Root Aliases (H2) | `/component-playground/url-reference`**`#playground-root-aliases`** | — |
| URL Reference | Playground Sections (H2) | `/component-playground/url-reference`**`#playground-sections`** | — |
| URL Reference | Anchor Links (H2) | `/component-playground/url-reference`**`#anchor-links`** | — |
| URL Reference | Public Query Parameters (H2) | `/component-playground/url-reference`**`#public-query-parameters`** | — |
| URL Reference / Public Query Parameters | Agent and Theme Aliases (H3) | `/component-playground/url-reference`**`#agent-and-theme-aliases`** | — |
| URL Reference / Public Query Parameters | Login Aliases and Validation (H3) | `/component-playground/url-reference`**`#login-aliases-and-validation`** | — |
| URL Reference / Public Query Parameters | Local and Hosted Behaviour (H3) | `/component-playground/url-reference`**`#local-and-hosted-behaviour`** | — |
| URL Reference / Public Query Parameters | Combined Example (H3) | `/component-playground/url-reference`**`#combined-example`** | — |
| URL Reference | Other Authentication Navigation and Internal Parameters (H2) | `/component-playground/url-reference`**`#other-authentication-navigation-and-internal-parameters`** | — |
| URL Reference | Playground Reference and Logo Navigation (H2) | `/component-playground/url-reference`**`#playground-reference-and-logo-navigation`** | — |
| URL Reference | Sources (H2) | `/component-playground/url-reference`**`#sources`** | — |
| Easter Egg | Easter Egg (H2) | `/component-playground/easter-egg`**`#easter-egg`** | — |

Clicking the heading or its assigned icon copies the canonical URL without moving the page. The separate chevron and the empty right-hand header region toggle the section; a 20px neutral gap separates that region from the heading copy area. Copied links retain the current query except `login`. Opening, reloading or re-entering an anchor selects its tab, opens the enclosing section and scrolls to 16px below the settled sticky tab bar. H2 targets use the card edge; H3 targets use the heading row. Earlier cards/content fade during the final 600ms of travel, retain layout space and return on upward scrolling. Fragments remain client-side and survive login. Unknown fragments remain unchanged. Selecting another tab clears the previous fragment. If the header above the tabs is still visible, ordinary and same-document cross-tab anchor changes preserve the current scroll depth rather than forcing the tab bar to pin.

## Public Query Parameters

The portion after `?` is the query string. Each name/value pair is a query parameter. Parameter names and recognised values are case-insensitive through canonical redirects.

| Canonical Parameter | Effect |
| --- | --- |
| `agent=codex` | Select Codex and blue branding |
| `agent=claude` | Select Claude Code and orange branding |
| `theme=light` | Select light theme |
| `theme=dark` | Select dark theme |
| `login=false` | Revoke the current session, clear its cookie and show the requested login form |
| `login=true` | Reuse a valid session or show login; never authenticate automatically |

### Agent and Theme Aliases

Use `agent` or its name alias `ai`, and `theme` or its name alias `mode`. Each alias accepts every value of its canonical parameter. All recognised aliases redirect with 301 to the canonical name and value.

| Parameter Names | Accepted Values | Canonical Parameter |
| --- | --- | --- |
| `agent`, `ai` | `codex`, `chatgpt`, `chatgpt-codex` | `agent=codex` |
| `agent`, `ai` | `claude`, `claude-code`, `code` | `agent=claude` |
| `theme`, `mode` | `light`, `day`, `sun` | `theme=light` |
| `theme`, `mode` | `dark`, `night`, `moon` | `theme=dark` |

Valid values override saved preferences before paint and become the saved preference. When no valid parameter remains, the saved preference is retained; without one, the agent defaults to Codex and the theme follows the system. Playground tab navigation preserves parameters. Changing a selector updates its corresponding parameter when present.

Unsupported or empty `agent`, `ai`, `theme` and `mode` values are removed by 301 redirect, including values such as `agent=unknown`, `theme=`, `agent=__proto__` or a bare `theme` parameter. This is URL cleanup, not an HTTP error. Unknown parameter names remain untouched. Duplicate valid parameters retain their order; after invalid entries are removed, the first remaining value wins.

The Playground favicon and its login-page favicon follow the selected agent and theme: light mode uses an agent-coloured tile with white strokes; dark mode uses a dark tile with agent-coloured strokes. Resources retains its static favicon.

### Login Aliases and Validation

Every login parameter accepts these equivalent values:

| Boolean Value | Accepted Spellings |
| --- | --- |
| `true` | `true`, `yes`, `1` |
| `false` | `false`, `no`, `0` |

Choose the outcome you want, then use the value shown with any parameter name in that row. The equivalent spellings above work everywhere in this table.

| Parameter Names | Show Login Form | Keep Existing Session |
| --- | --- | --- |
| `show-login`, `logout`, `logged-out`, `loggedout` | `true` | `false` |
| `hide-login`, `login`, `logged-in`, `loggedin` | `false` | `true` |

**Show Login Form** becomes `login=false`: log out the current session and display the password form. **Keep Existing Session** becomes `login=true`: open the page if the current session is valid, otherwise display the password form. It never signs you in automatically or hides a required password form.

For example, `login=1` and `hide-login=yes` become `login=true`; `logout=1` and `login=no` become `login=false`. `logout` is the inverse of `login`, and `hide-login` is the inverse of `show-login`.

`login=1` means you want to be logged in and redirects to `login=true`. Use `login=false` or its alias `logout=1` to log out. Older `show-login` links remain supported with inverse boolean logic.

All alternative parameter names and boolean spellings above are aliases for the final canonical components below. Redirects rewrite them to `login` with a literal `true` or `false`; authentication reads only that canonical component.

| Final Canonical Component | Result |
| --- | --- |
| `login=true` | Show the page if a valid session exists; otherwise show the password form. Never authenticate automatically. |
| `login=false` | Revoke the current session, clear its cookie and show the password form. |

Similarly, agent aliases end at `agent=codex` or `agent=claude`, and theme aliases end at `theme=light` or `theme=dark`.

Unsupported or empty values, such as `login=2` or `show-login=maybe`, are removed by 301 redirect. Valid duplicates retain their order across canonical names and aliases, with the first resulting `login` value taking effect. Boolean values apply only to login selectors; agent and theme selectors use the named values above.

Successful login removes `login` before navigation, preventing a logout loop while preserving the requested section and unrelated query parameters. These actions affect the current session only; they do not authenticate users or revoke unrelated browser sessions.

### Local and Hosted Behaviour

| Request | Automatic Local Preview | Hosted Application |
| --- | --- | --- |
| Resources without `login` | Obtain a real local session automatically if needed | Require a valid session or password |
| Playground without `login` | Allow anonymous preview access | Require a valid session or password |
| Any supported page with `login=false` | Revoke the current session and show login | Same |
| Any supported page with `login=true` | Require a valid session or show login | Same |

The explicit boolean behaviour applies to Resources, the Playground root and every supported Playground section. Future or unknown paths remain 404. Low-level local tests may disable automatic sign-in and protect the Playground explicitly.

### Combined Example

```text
/STYLES/FOCI-AND-SELECTIONS/?AI=Claude&Mode=MOON&LoggedIn=NO&Token=AbC
→ /component-playground/focus-and-selection?agent=claude&theme=dark&login=false&Token=AbC
```

This is one application 301. It selects Claude Code and dark theme, revokes the current session and shows the Playground login form. `Token=AbC` is preserved.

## Other Authentication Navigation and Internal Parameters

| Action | Result |
| --- | --- |
| Successful non-JavaScript login POST | 303 See Other to `/ai-workshop-resources` |
| Logout POST | 303 to `/ai-workshop-resources`; automatic local preview adds `?login=false` |
| Successful JavaScript login | Browser navigation to the requested destination, removing `login` |
| Local ChatGPT sign-in/out tooling | `return_to` selects a validated same-origin destination; GET uses 302 and sign-out POST uses 303 |

`return_to` is internal tooling, not a public display selector. Invalid or external destinations fall back to `/`. The decorative `/login-backdrop/components` endpoint retains its compatibility name and serves the selected anonymous Colours backdrop. It uses canonical `theme` and `agent` values to render anonymous geometry; it cannot grant access. No query parameter carries a password or grants a hosted session.

## Playground Reference and Logo Navigation

The Playground’s URL Reference tab at `/component-playground/url-reference` renders this document, including URL mappings and query parameter strings. Examples do not navigate, so inspecting `login=false` cannot accidentally log you out. Fenced code examples have a Copy Text button using the Resources copy-control styling, with brief Text Copied or Copy Failed feedback. Future URL or query changes must update this document and its Playground representation together.

Three primary-button clicks or taps on the Wavelength header brand within three seconds open the other page in a new tab/window (`_blank`, `noopener,noreferrer`). Resources opens `/component-playground`; Playground opens `/ai-workshop-resources`. Both use canonical paths and the same gesture handler. The original page stays open. Other clicks, window blur or visibility changes reset the sequence.

The shortcut works while signed in and on both login screens, using the blurred logo’s actual bounds through the scrim. Clicks on the login panel never activate it. The Components backdrop stays anonymous, inert and script-disabled; the parent reads only its geometry. Navigation does not sign anyone in or bypass hosted authentication. Playground specimens simulate activation without opening a window.

## Sources

- [Canonical Redirects and Path Aliases](lib/workshop-playground-routes.mjs)
- [Shared Agent and Theme Alias Vocabulary](lib/workshop-url-preferences.mjs)
- [Authentication and Login Navigation](lib/workshop-handler.mjs)
- [Local Preview Behaviour](scripts/phone-preview.mjs)
- [Resources and Login Documents](lib/workshop-pages.mjs)
- [Playground Document](scripts/playground.mjs)
- [Playground Favicon](lib/workshop-playground-brand.mjs)
- [Internal Local Sign-In Tooling](build/sites-vite-plugin.ts)

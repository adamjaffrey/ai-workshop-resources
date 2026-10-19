---
name: repository-instructions
description: Govern agent work and preview delivery in this repository.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.64"
  update_summary: "Document URL rules and remove invalid public preferences"
  updated_at: "Tue 20 Oct 2026 at 09:27:13 am AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Repository Instructions

## Project Versioning System

- Before updating governed project documentation, changing project versioning or build workflows, or producing a software artefact, read `/Users/adamjaffrey/projects/project-versioning-system/package/project-versioning-system/SKILL.md` completely and follow it.
- Treat that packaged skill as the sole Project Versioning System (PVS) authority for document revisions, artefact versions, changelogs, backlogs, and its required local-commit workflow.
- Never push, tag, release, deploy, publish, or add an AI co-author trailer unless the user explicitly requests it.

## Product Tracking

- Treat `website/`, `business-dna-extractor/`, `create-dna-folder/`, `create-projects-folder/`, `system-blueprint-creator/` and `system-build-assistant/` as independent product development roots in this shared Git repository.
- Every product owns `README.md`, `CHANGELOG.md` and `BACKLOG.md`, including every skill regardless of overlap with `SKILL.md`. The root documents cover only repository-wide concerns and index the products.
- Record website builds only in `website/CHANGELOG.md`, using `website/VERSION.txt`. Never advance a skill version for website work or use a shared repository version.
- Preserve existing skill source paths during documentation-only work. The skills’ legacy `VERSION` files are not verified PVS artefact authorities. Each skill backlog records the separate migration to the PVS `package/<skill-name>/VERSION.txt` structure; do not silently treat a document revision or legacy file as a successful build.
- Validate products separately. The packaged PVS validator assumes one product per invocation and does not support recursively validating this multi-product root as a single application or document-only project. For a documentation-only change, validate the affected documents and changelog/backlog structure without inventing an artefact authority. Report existing legacy schema or packaging failures separately.
- Maintain independent document revisions. Moving a governed document increments its document revision once; it does not renumber historical build entries or allocate an artefact version.

## Preview Delivery

- Select the Playground destination using the exact rules and title/slug mapping under Required Update Handoff: use the primary relevant section for a section-specific review, otherwise use `/component-playground`. Always use the verified active Wi-Fi address and port for local links.

- Start all user-facing local previews already signed in. Use `npm --prefix website run preview:phone` (automatic login enabled), or pass `{autoLogin:true}` to `createPhonePreview` for custom ports. Continue generating and displaying the process’s temporary test password. The local adapter must obtain a real session through the unchanged server-side login handler, using only its in-memory preview database and temporary credential; never add an authentication bypass to application handlers, production builds or hosted Sites. Keep low-level authentication tests explicit (`autoLogin:false`, the factory default). Provide `/ai-workshop-resources?show-login=true` for inspecting the real login form; local Log Out returns there. Verify a fresh browser opens Resources, the session endpoint recognises its cookie, logout invalidates it, and hosted access still requires authentication when changing this workflow.

- For every future preview handoff in this project, provide the active server’s reachable Wi-Fi/LAN IPv4 address and port, never `localhost`, `127.0.0.1` or another loopback address. Adam reviews on his phone. Bind the server to the network interface, verify both app and Playground URLs. Do not include routine “use the same Wi-Fi” reminders in messages or handoffs. Recheck the address and active process’s test password at each handoff. If LAN access is unavailable, explain the limitation rather than substituting a loopback link.

- **Do NOT automatically open Google Chrome for the user.** Do not launch, foreground or open a Chrome window/tab after builds, updates, server restarts or preview handoffs. This also applies to other browsers. Provide the preview link and current local test password in the reply instead; let the user open it themselves.
- Open a user-facing preview only when the user explicitly asks to open it. A request to build, update, test, start a preview server or provide a preview link is not permission to open Chrome. When explicitly asked to open a preview, use Google Chrome.
- Never open or present a preview in the Codex sidebar, embedded browser, or preview panel. Do not use `open_in_codex` to show previews.
- Headless browser validation is permitted and does not count as opening a user-facing preview.

- Every preview-link handoff must use the exact Local Preview and Local App Test Password sections defined below. Do not invent alternate labels or status wording. Never include production credentials or reuse a password from an earlier preview process.
- Use modest formatting, short sections and helpful icons in user-facing handoffs so links, credentials, results and limits are easy to identify.

### Local and Hosted URL Behaviour

The local column describes the user-facing preview started with automatic login enabled. Low-level tests using `autoLogin:false` require explicit login for app content. Hosted behaviour applies after the corresponding build is published to Sites; a local commit or GitHub push alone does not update the live site.

| URL | Local Preview | Hosted Sites |
|---|---|---|
| `/ai-workshop-resources` | Opens the app using a valid local session, obtaining one automatically through the real local login handler if needed. No password entry is required. | Opens the app when the server validates the existing session; otherwise shows the password form. |
| `/`, `/workshop`, `/resources`, `/ai`, `/workshop-resources` and documented singular/plural aliases | Permanently redirects (301) to `/ai-workshop-resources`, preserving query parameters. | Permanently redirects (301) to `/ai-workshop-resources`, preserving query parameters; authentication is unchanged. |
| `/home` or `/home/` | Permanently redirects (301) to `/ai-workshop-resources`, preserving query parameters; the destination follows local automatic-login rules. | Permanently redirects (301) to `/ai-workshop-resources`, preserving query parameters; the destination requires a valid hosted session or password login. |
| `/component-playground` or a supported section such as `/component-playground/branding` | Password-free by default; a section path selects that tab directly. | Requires the same server-validated session as the main app. Without one, shows the Playground login form; successful login retains the requested section. |
| `/ai-workshop-resources?show-login=false` | Reuses an existing valid session or shows the password form; never automatically signs in. | Reuses an existing valid session or shows the password form; never signs in. |
| `/ai-workshop-resources?show-login=true` | Revokes the current session, clears its cookie and shows the login form. | Revokes the current session, clears its cookie and shows the login form. |

On Resources and supported Playground routes, `show-login=true` revokes the current server session, clears its cookie and displays the destination login form on local previews and hosted Sites. `show-login=false` never authenticates: it reuses a valid session or shows the login form. Local automatic sign-in is suppressed whenever `show-login` is present. The local Playground remains anonymous only when `show-login` is absent. With either explicit boolean, every local Resources/Playground page follows real server-validated session handling: true revokes the session; false requires an existing session or shows login. Successful login removes `show-login` before navigation to prevent a logout loop, preserving the section and unrelated query parameters. Hosted app and Playground sessions share the existing seven-day expiry and logout rules. Never describe a hosted link as password-free merely because its local counterpart opens automatically.

### Required Update Handoff

This is an exact output contract for every completed update in this repository, including documentation-only updates. Use the literal labels, order, punctuation and status phrases below; substitute only verified values and the explicitly permitted alternatives. These rules supersede older handoff examples elsewhere in the repository or chat history.

1. Start with a concise change summary and verification result, normally one or two sentences.
2. Emit **📦 Build and Delivery** and its four bullets in the exact order shown below.
3. Emit **🔗 Local Preview** with exactly three link bullets: Main App, Playground and Login Form.
4. Immediately follow with **🔑 Local App Test Password** and one fenced `text` block containing only the active process’s test password.
5. Append **🌐 Live on Sites** only when publication succeeds for this update, or the user explicitly requests the existing live link. After every successful publication, include Main App and Playground links as two separate bullets.

Use bold section labels, not Markdown heading markers. Put a blank line after every section label and between sections. Keep version and commit values in inline backticks. Every app link must be its own bullet with `↗` inside the anchor text. Do not open any link automatically.

#### Exact Build and Delivery Wording

| Item | Condition | Required Content After the Bold Item Label |
|---|---|---|
| Build | A new artefact was successfully produced and finalised | `` `vVERSION` — new artefact produced. `` |
| Build | Documentation-only or another update with no new artefact | `` `vVERSION` — unchanged, no new artefact produced. `` |
| Commit | This update was committed locally | `` `HASH` — local commit performed. `` |
| Commit | This update’s commit was also pushed successfully | `` `HASH` — local commit performed; pushed to GitHub. `` |
| Push (GitHub) | No push occurred for this update | `Not performed.` |
| Push (GitHub) | Push succeeded for this update | `Performed successfully.` |
| Publish (Sites) | No publication occurred for this update | `Not performed.` |
| Publish (Sites) | Publication succeeded for this update | `Performed successfully.` |

Read the website artefact version from `website/VERSION.txt` and the short commit hash from Git. A documentation-only update retains the current website version and must not add a build changelog entry. Never use “changed, new artefact produced”, “local.” or another shortened/paraphrased status. Push and publication are independent actions; report only what happened for this update, not a previous update’s delivery status.

If a build, commit, push or publication failed or was blocked, replace that item’s success phrase with `Failed — REASON.` or `Blocked — REASON.` and report the actual current version/commit where applicable. If no commit occurred, use `Not performed.` for Commit; never present an older commit as this update’s commit. Do not use success wording for partial work.

#### Exact Local Link Selection and Wording

Define `LOCAL_ORIGIN` as the active preview’s verified `http://WIFI-IP:PORT`, without a trailing slash. Never hard-code an example IP address or port, assume the previous process still owns a port, substitute loopback, or show a production password.

- Main App: `[Main App ↗](LOCAL_ORIGIN/ai-workshop-resources) — automatically signed in`. Link to `/ai-workshop-resources`, not a redirect alias, and do not put paths in the anchor text.
- Playground, when exactly one section is the primary review destination: `[Playground > SECTION TITLE ↗](LOCAL_ORIGIN/component-playground/SECTION-SLUG) — automatically signed in`. Use the title/slug mapping below, not a raw slug or invented title.
- Playground, for cross-cutting changes, documentation-only updates or no specific section: `[Playground ↗](LOCAL_ORIGIN/component-playground) — automatically signed in`.
- Login Form: `[Login Form ↗](LOCAL_ORIGIN/ai-workshop-resources?show-login=true) — logged-out view`.

| Section Slug | Section Title |
|---|---|
| `components` | Components |
| `typography` | Typography |
| `colours` | Colours |
| `blocks-and-blur` | Blocks and Blur |
| `icons` | Icons |
| `status-states` | Status States |
| `focus-and-selection` | Focus and Selection |
| `branding` | Branding |
| `easter-egg` | Easter Egg |

Do not use “Preview link”, inline-code paths in labels, “password free”, “password-free”, “logged out state” or additional lock icons in these handoff bullets. The exact local phrase “automatically signed in” describes the no-password-entry review experience; it does not change the authentication implementation. The app obtains a real local session, while local Playground access remains password-free as documented above. Never apply this phrase to hosted access or imply that either local route bypasses hosted authentication. The login link revokes the current session before displaying the logged-out form.

Verify the active process, LAN origin and all three destinations before handing them over. Read the password from that process’s startup output. Retained startup output is usable only after confirming that the same process is still serving those URLs; never copy a credential merely from a previous final response. Reuse a verified active preview for documentation-only work; do not rebuild or restart it solely because a document changed. If the process or password cannot be verified, restart and verify when safe and within scope, or use the unavailable case below.

If local preview is unavailable, retain **🔗 Local Preview** with `Unavailable — REASON.` and **🔑 Local App Test Password** with `Unavailable — no verified active preview password.` instead of links or a password block. Do not invent credentials or provide unverified URLs. If a deliberately passwordless preview has no test credential, state `Not applicable — this preview has no test password.` instead of a code block; the normal app preview still requires its generated test credential for manual login inspection.

#### Exact Live Link Selection

Under **🌐 Live on Sites**, every successful publication must include two separate bullets: `[Main App ↗](VERIFIED-LIVE-ORIGIN/ai-workshop-resources)` and `[Playground ↗](VERIFIED-LIVE-ORIGIN/component-playground)`, without authentication suffixes. Use the verified hosted origin; the existing site is `https://workshop.adamjaffrey.chatgpt.site`. Link to the Playground root by default; use the documented section title/slug only when explicitly requested. When the user asks for an existing live link without publication, provide the requested destination(s). Never include the production password or describe hosted links as automatically signed in. If showing an existing live site without publishing this update, say `Existing live site; this update has not been published.` before the link. Keep the Publish status truthful.

### Handoff Format

Copy this structure literally for a successful new local build, replacing placeholders. For documentation-only work, replace only the Build phrase with `unchanged, no new artefact produced.`. For a section-specific review, replace only the Playground bullet with the section form defined above. Do not emit placeholder text.

````markdown
**📦 Build and Delivery**

- **Build:** `vVERSION` — new artefact produced.
- **Commit:** `HASH` — local commit performed.
- **Push (GitHub):** Not performed.
- **Publish (Sites):** Not performed.

**🔗 Local Preview**

- [Main App ↗](LOCAL_ORIGIN/ai-workshop-resources) — automatically signed in
- [Playground ↗](LOCAL_ORIGIN/component-playground) — automatically signed in
- [Login Form ↗](LOCAL_ORIGIN/ai-workshop-resources?show-login=true) — logged-out view

**🔑 Local App Test Password**

```text
CURRENT-PROCESS-PASSWORD
```
````

When the live-link inclusion condition is met, append:

```markdown
**🌐 Live on Sites**

- [Main App ↗](VERIFIED-LIVE-ORIGIN/ai-workshop-resources)
- [Playground ↗](VERIFIED-LIVE-ORIGIN/component-playground)
```

Before sending, check the exact four status labels and order, version/hash evidence, canonical Main App URL, Playground title/slug selection, literal authentication suffixes, active-process password, and whether a Live on Sites section is warranted. Do not substitute stylistic variants for this contract.

Site-wide GET/HEAD requests remove a leading `www.` hostname and lowercase the path before resolving aliases in one 301 redirect; lowercase the names and values of known public query parameters (`agent`, `theme`, `show-login` and its legacy aliases) in that same redirect, preserving unrelated query components exactly and leaving POST paths unchanged. Map `login=1`, `logged-in=false` and `logged-out=true` to `show-login=true`; map `login=0`, `logged-in=true` and `logged-out=false` to `show-login=false`. Accept only true/false for the named boolean selectors and only 1/0 for legacy `login`; remove unsupported login-selector values by redirect. Preserve duplicate order, using the first valid resulting `show-login` value. Use 301 for every application canonical redirect, including slash-only corrections. Preserve descendants for every registered path alias with segment-boundary matching; `/` remains exact-only, and unknown descendants remain 404 until implemented. Support all ai/ais × workshop/workshops × resource/resources, style/styles × guide/guides, focus/focuses/foci × selection/selections, and easter/easters × egg/eggs variants. Canonicalise recognised agent/theme aliases to `codex`, `claude-code`, `light` and `dark` in that same hop. Remove unsupported or empty agent/theme values by 301; preserve unrelated query data. Include `/style`, `/styles`, `/guide` and `/guides` as Playground prefix aliases. Keep `website/URL-REFERENCE.md` aligned with routing changes. Use AI Workshop Resources and Component Playground as the respective browser titles, including login pages. Maintain only lowercase redirect keys and public asset filenames. Hosting must accept the `www` hostname and supply its certificate before these redirects can run.

## Website Login

- Keep every login error on its requested canonical page and preserve its section/query URL. Initial configuration/database failures use that destination's login template: Resources blocks for Resources, Components blocks for every Playground section, with the same blur, dimming and theme/agent handling. Password, throttling, network and service errors during submission remain inline without navigation. Service failures still return HTTP 503 and fail closed. Run `website/tests/login-error-destination-browser-check.mjs` when changing this handling.

- Use measured anonymous blocks from the first Playground tab, Components, behind every Playground login route. Reuse that single Components backdrop for `/component-playground` and all section paths; do not measure each tab. Main-app login retains its Resources backdrop. Share the login panel, one background blur and dimming, and keep both destinations inspectable from the Components login specimen. Both backdrops follow the selected theme/agent, defaulting to Codex blue. Serve only anonymous geometry in inert, script-disabled backdrop frames; never embed the authenticated Playground or original protected text.

- Sessions expire seven days after login, without extending on use. Keep this implementation detail in repository documentation, not the login page copy.
- On initial load, focus the login heading with no visible focus ring. Tab order is the day/night toggle as one stop, password field, then unlock button on desktop and mobile.
- Keep the password input visible above the mobile keyboard and allow the login panel to scroll when the visible viewport is short.

- Keep checking and success text visually hidden but announced to screen readers. Use neutral muted-text colour for the resting Lucide padlock and checking Loader Circle; swap to Check on success; use green success styling and honour reduced motion.
- Show only error messages below the input. Reserve one text line so ordinary status changes do not resize or recentre the panel; allow expansion for accessibility text scaling rather than clipping messages. Keep 12px between label and input, 12px between input and error row, and 16px before the submit button.
- After an incorrect password, colour the input border, focused outline, padlock and password bullets red until the user edits the field. Refocusing alone must preserve the error. Editing clears the error and restores the neutral padlock and selected blue/orange focused border and focus accent. On success, show green bullets during the brief transition, then clear the password before navigation.

- Keep JavaScript-disabled notices separate from password validation: use the shared error token and decorative Lucide X; place the login notice between introductory copy and Password, and the resources notice between the header and first step. Render them statically inside `noscript`.

## Focus and Panel Opening

- Keep real focus on the appropriate control for every interaction type. Do not blur controls or remove keyboard access merely to hide a ring.
- Text-entry fields, including passwords, retain visible focused styling for pointer, touch and keyboard use.
- Buttons, toggles, links and other non-text-entry controls show a focus ring only during keyboard navigation initiated by Tab or Shift+Tab. Preserve that indicator through keyboard activation and focus transfer; click or tap switches back to ring-free pointer focus.
- After a segmented selector changes, focus the newly selected mode for mouse, touch and keyboard activation, including activation from track padding or gaps. Apply the same rule to agent and day/night selectors.
- On opening any modal, dialog or popover panel, focus its descriptive heading with `tabindex="-1"` and prevent scrolling. The heading must never display a focus ring, regardless of input method. Do not initially focus a text field or open the software keyboard.
- The Playground Style Options menu is visually a popover but uses native modal dialog containment. While open, block background interaction and scrolling. Close with X, Escape or an outside tap without activating the background, then restore the previous scroll position and invoking control focus.
- The first Tab after heading focus must reach the first visible, enabled interactive element in logical DOM order and display its keyboard focus ring. Preserve the login order: day/night selector as one stop, password, then unlock.
- Use the shared panel-heading focus helper for custom panels and the shared opening handling for native dialogs/popovers. Every such panel must have an accessible heading. Preserve native modal containment and focus restoration to the invoking control when a panel closes.
- Validate initial/opening focus, Tab/Shift+Tab navigation, keyboard activation, pointer/touch ring suppression, input focus and selector destination focus on desktop and mobile layouts when modifying these flows.

## Cursor Behaviour

Follow [Uxcel: Types of Cursors & When to Use Them](https://uxcel.com/lessons/basics-834) as the reference for future cursor decisions. Match the cursor to the action available at the hovered location.

- Use `cursor: pointer` (hand) for all enabled buttons, toggles, links and other clickable or activatable elements. Apply it across the complete hit target, including icons, labels, selector tracks, padding and gaps; the cursor must change immediately on hover.
- Use `cursor: not-allowed` for disabled, blocked or unavailable controls, including controls marked `aria-disabled="true"`. This state takes precedence over pointer or text cursors. Cursor styling does not disable an action: also enforce the blocked behaviour and appropriate disabled semantics.
- Use `cursor: text` (I-beam) for selectable text and text-entry/editing fields, including body copy, prompt/code text, password inputs and textareas. Text and icons inside clickable controls are part of the action, not independent text-selection targets. Over an enabled button or toggle, the icon, label text, background, padding and gaps must all show the same hand cursor; label text must never switch to an I-beam. If that control is disabled or blocked, every one of those areas must instead show the not-allowed cursor. Reserve the I-beam for independently selectable or editable text outside action controls.
- Use the default arrow for noninteractive, nonselectable surfaces. For specialised interactions such as dragging, resizing or precision selection, follow the reference's action-specific cursor guidance.
- Preserve these distinctions in normal, hover, focus and disabled states. Do not use `pointer-events: none` merely to style a disabled control if it prevents the intended not-allowed cursor from appearing.

## Website Appearance

- Default the selected coding agent to Codex. Persist an explicit Codex or Claude Code choice across login, logout and reload, and apply it before paint on both pages.
- Derive branded colours from the shared agent accent: Codex #0285FF or Claude Code #D97757. Keep neutral surfaces and semantic error/success colours distinct.
- Keep the footer action on the right, vertically centred when alongside the copyright and version text. Prefer a single row; next wrap version and copyright at their divider while retaining the right-aligned action. Only when the intact copyright and action cannot fit side-by-side, put the action below and centre-align the version, copyright and action. Omit the divider and adjacent spacing whenever the text wraps.
- Define success, error, warning and information roles centrally in `website/lib/workshop-theme.mjs`, shared by both agents and both pages. Use theme-specific success/error/warning colours and contrasting success/warning fill text. Keep information neutral through `--info`, aliased to `--muted-text`. Warning is reserved for future caution states; do not introduce warning UI without a product need. Check status foregrounds against page, card, field, tinted and hover surfaces when changing the palette. Pair status colours with text or icons.
- Source every error colour on both pages from `var(--error)` in `website/lib/workshop-theme.mjs`. Define it once per light/dark theme; Codex and Claude share those values. Error text, icons, borders, focus rings, password text/autofill and copy-failure controls must reference or inherit that token, with no per-agent overrides or hard-coded component colours.
- New interface icons MUST come from the installed Lucide Icons definitions. Only when Lucide has no suitable icon may an agent propose an alternative; obtain Adam’s explicit approval before adding or using it. Document the suitability gap and, after approval, retain the alternative’s official source, licence and Playground representation. The two existing Lobe Icons agent logos have standing approval and require neither renewed approval nor repeated reminders. The existing Wavelength brand asset remains approved. Do not interpret this standing approval as permission for additional Lobe icons.
- Give every SVG icon a descriptive, stable `data-icon-use` identifying its purpose, plus `data-icon-name` for its official library name and `data-icon-provider` for its origin. Repeated uses may share a purpose name where they perform the same function. Preserve official Lucide and Lobe names independently of usage names; show both in the Playground and retain the original source links. Apply this to app and Playground tooling icons. Do not add redundant screen-reader labels to decorative icons whose controls already have accessible names.

## Optical Alignment Contract

Use the shared two-rail layout in `website/lib/workshop-alignment.mjs` for every active surface: Resources, both login destinations, all Playground tabs, grey specimen interiors, menus, dialogs, overlays, inspectors and expanded previews. This supersedes the earlier rule that independently inset selected labels and excluded specimen interiors.

### Why

Rounded corners visually recede from their bounding edge, while SVG icons can contain invisible whitespace. We selected a 4px surface extension through visual comparison. This is a project design convention, not a universal design standard. Shared rails replace per-element judgement calls and preserve a minimum 24px mobile surface gutter.

### Deterministic Rules

- Each layout scope defines a text rail. Text, square-edged objects, tables, rules and square textareas start on this rail. Page headers, branding groups, dialog headings and introductory copy follow it too.
- Designated rounded boundary components extend 4px outward from that rail. Full-width surfaces extend on both sides; intrinsic-width controls extend from their aligned edge. On mobile page layouts, the surface rail is 24px from the screen and the text rail is 28px. Expanded views use the same rails. Centred elements remain centred.
- Use the single `--optical-offset` token. The component selectors in the shared module register existing scopes and surface boundaries. New scopes can use `.alignment-scope` with `--surface-padding`; full-width rounded children can use `.alignment-surface`. Square/text children stay on the scope's text rail. Do not automatically select all elements with a border radius.
- Apply the extension once per component boundary. A button inside a toggle does not acquire a second outward offset. Nested cards and prompt panels establish their own text rail using their normal interior surface spacing plus 4px; their designated rounded children may extend back to that interior surface rail.
- Retain native padding, icon gaps and centred alignment inside buttons, toggle options, password fields and badges. A rounded icon tile is itself the boundary; do not also compensate the icon inside that tile. Move icon-and-heading groups together so their internal gap remains unchanged.
- For an unboxed leading heading icon, align its visible stroke to the text rail by shifting the whole heading group by its measured leading whitespace at the rendered size. Never use a blanket 4px icon shift. The catalogue includes the cropped link-arrow variant separately. Disclosure bodies align beneath their summary text after the corrected chevron and gap. Button-contained icons keep their control padding.
- Run `node website/scripts/measure-alignment-icons.mjs` when adding/changing heading icons, changing their viewBox/stroke, or updating the icon library. Commit `website/lib/workshop-icon-ink.generated.json`; use `--check` to verify it. New heading icons must have measured entries before being introduced. Keep official paths and metadata intact.
- Do not remove or add corrections merely because a component expands, becomes sticky or changes viewport width. Preserve the same rail relationship across states. Specimens consume canonical app styling; their surrounding annotations follow their own scope.

### Required Checks

Run `node website/tests/playground-external-text-inset-browser-check.mjs` for measured text/surface and visible-icon relationships across seven widths, all tabs, themes/agents, dialogs and expanded views. Run `website/tests/playground-nested-alignment-browser-check.mjs` for standalone specimens, slider boundaries, square tabs, licence panels, expanded disclosure bodies and real JavaScript-disabled app/login notices. Test no-script pages with JavaScript actually disabled: a specimen cannot prove the original parent layout. Run `website/tests/playground-menu-containment-browser-check.mjs` for menu geometry at page top and after scrolling, matching ellipsis/X dimensions, reference-frame containment and stacked control spacing. Visually inspect populated mobile specimens and the open menu; coordinate checks alone do not establish visual correctness. Reference specimens remain inside inset rounded grey frames within white cards. Also run source parity, relevant sticky/expanded/focus checks and inspect mobile/desktop screenshots. Verify no page overflow and preserve scrollable control rails and keyboard focus. For Sites publication, apply the publication-only measurement rules below after comparing the latest successful published source commit with the candidate. Refresh only affected backdrop geometry after final layout edits, then run `website/tests/login-background-alignment-browser-check.mjs` for Resources and `website/tests/playground-placeholder-alignment-browser-check.mjs` plus `website/tests/playground-placeholder-browser-check.mjs` for Components across widths 320, 390, 660, 661, 700, 701, 768, 1023, 1024 and 1440px at heights 600 and 1000px. Internal builds reuse saved geometry and do not require remeasurement. Keep all canonical source layout styles and shared footer wrapping in the backdrop; anonymous prompt glyphs retain only slash/hyphen punctuation to preserve native line breaks.

- Keep tab baselines, scroll-region edges and endpoint indicators on the text rail; retain tab-label interior padding. Removing outer padding must preserve the existing directional edge-fade masks and overflow-state handling.
- Horizontal selection regions (tabs, toggle options and standalone selector specimen wrappers) use horizontal overflow only when needed and hide vertical overflow. Verify zero vertical scroll range/offset in inline, expanded and iframe contexts. Do not force horizontal scrollbars or remove `overflow-x: auto` merely because content fits at one width; preserve access at narrow widths and larger text sizes. Full prompt panels and tall dialogs retain their necessary vertical scrolling. Run `website/tests/playground-tab-edges-browser-check.mjs` and `website/tests/selection-scroll-axis-browser-check.mjs` after changes.

### Scrollable Control Style and Validation

- Treat tabs, horizontally overflowing menus, toggle selectors and other one-row selection regions as horizontal-only scrollers. Hide vertical overflow, keep the content tall enough for its controls and keyboard focus treatment, and verify that it cannot acquire a vertical offset. Do not disable page scrolling or trap vertical touch gestures merely to lock the control's own axis.
- Use `overflow-x: auto`, not forced scrollbars, where content can exceed its container. Preserve horizontal access at narrow widths, with longer labels and enlarged text. Fitting content must have no horizontal movement or unnecessary scrollbar. Do not use clipping or `overflow-x: hidden` as a substitute for making all options accessible.
- Use the shared 36px feathered edge mask and scroll-distance state handling. Each edge appears progressively over 36px of travel away from its boundary, rather than on a time-based animation. Preserve the strongest attained fade while returning towards that edge, then clear it immediately when the boundary is reached (the existing 2px tolerance handles rounding). An edge with remaining content on initial layout may already show its fade. Never fade the edge with no remaining content; clear stale fades when resizing makes all content fit.
- Keep the baseline outside the content mask. Changes to outer padding, text-rail alignment or container width must not change feather width, fade progression, endpoint clearing, label padding or hit targets. Reuse the shared overflow implementation for new selection regions, including controls inside frames; do not invent separate per-control timing or gradients.
- When adding or changing a control, check narrow phones, tablet/desktop widths and breakpoint boundaries; start, intermediate and final horizontal positions; reverse scrolling; resize from overflowing to fitting; longer labels and enlarged text; keyboard navigation/selection, pointer and touch input; focus-ring clearance; and inline, sticky, expanded and iframe states where applicable. Ensure the first and last choices remain reachable. Retain vertical scrolling in genuinely tall content panels and dialogs.
- Run the tab-edge, scroll-axis, overflow-hints and relevant expanded/focus checks, and visually inspect populated mobile and desktop states. DOM coordinates alone are insufficient: check clipping, white-card containment of grey specimens, menu anchoring at page top and after scrolling, and the visible fades. Record which surfaces and states were actually checked and distinguish browser automation from physical-device testing.

## Theme and Slider Animation

Preserve the approved behaviour in `website/lib/workshop-theme.mjs`, `website/lib/workshop-reveal.mjs` and `website/lib/workshop-toggle.mjs` unless the user explicitly requests a change. Mobile circle timing and card reveal rules were refined in website v26.0.97. The earlier established theme reference is website v26.0.94, local commit `0b21bf4` (radius motion established in v26.0.92, `0214582`).

### Circular Reveal

- Use **300ms at viewport widths up to and including 660px**, and **420ms above 660px**, with a **300px** feather and **`cubic-bezier(0.25, 0.35, 0.75, 0.85)`** easing. Animate the radius directly between two endpoints with one continuous interpolation. Do not remap intermediate radius values to viewport colour coverage or blend in an additional easing curve.
- Centre the reveal on the destination mode's icon button: the selected sun for light mode and selected moon for dark mode, not the centre of the whole toggle.
- Light mode expands the incoming light snapshot. Dark mode contracts the outgoing light snapshot using the same animation with `animation-direction: reverse`, reversing its timing and easing exactly. Different origins and viewport-dependent endpoints mean the two directions are not pixel-for-pixel reversals.
- Trim the endpoints to **0.01%** and **99.99%** average visible light-mask coverage. Sample the viewport only to calculate those endpoints; never use coverage to adjust the speed during the animation. Preserve the current 96×96 centre-sample grid and 24-step endpoint search. Reveal the exact final theme when the transition completes.
- Keep the radial mask opaque through `max(0px, radius - 300px)` and transparent at `radius`; this preserves the current feather behaviour when the radius is smaller than 300px.

### Slider Movement and Colours

- Both agent and day/night selectors share **160ms travel + 60ms rebound + 60ms return + 60ms settling = 340ms total**. Preserve their existing bounce distances, squash/stretch and phase easing in `workshop-toggle.mjs`; held feedback remains 160ms. Start selection movement immediately, independently of the circular reveal.
- Keep the day/night toggle in its own View Transition layer above the page reveal, with its old-control snapshot hidden. The page snapshot must not obscure or delay its movement.
- Its colours must follow the circular feather, not change immediately with selection or run on a separate timer. Each animation frame, read the actual animated mask radius `r` and use the distance `d` between the reveal origin and the toggle's centre. Compute the light amount as `clamp((r - d) / min(300, r), 0, 1)`.
- Blend the previous and next values of `--surface`, `--control-border`, `--control-bg`, `--control-text` and `--text` in sRGB. Previous-colour weight is the light amount when selecting moon and one minus the light amount when selecting sun. This is a shared control-centre sample, not a separate per-pixel mask over the slider.
- Consequently, selecting moon moves the slider immediately while retaining light colours until the contracting feather reaches the control; selecting sun blends towards light as the expanding feather reaches it. Both use the same feather calculation in opposite directions. Do not impose identical colour-change timestamps despite their different origins.
- Agent accent blending remains a separate **160ms** animation with `cubic-bezier(.2,0,.2,1)`, matched to slider arrival; do not apply the theme feather-following rule to agent selection.

### Initial Load, Fallbacks and Validation

- Apply saved theme and agent preferences before first paint with no decorative animation. Honour reduced motion by skipping/cancelling transitions. Retain the **280ms** soft-colour theme fallback when circular View Transitions are unavailable.
- Rapid toggling must resolve to the latest preference. Remove temporary control-colour overrides and stop their frame loop on completion, interruption or reduced-motion changes.
- When modifying these flows, run the radius-endpoint, theme-transition and theme-control-colour checks. Verify both pages, desktop/mobile widths, immediate slider movement, delayed moon recolouring, inverse direction/easing, rapid toggles, initial preferences, reduced motion and fallback behaviour.

## Card Reveal Behaviour

- Apply the same rules to every step/card pair, regardless of its index or the number of cards, on desktop and mobile.
- On initial page load, after fonts and prompt content establish layout, take a single viewport visibility snapshot. A pair qualifies if at least 10px vertically of its card or step text is visible inside the viewport. A tiny sliver under 10px does not qualify. Do not always reveal the first pair.
- Reveal qualifying initial pairs in DOM order with a 240ms lead-in before the first and 360ms between subsequent animation starts. Animate each initial step marker and linked card together with the same sideways offsets and 600ms opacity / 750ms transform treatment as later scroll-triggered entrances. Keep pre-reveal positioning transition-free; do not wait for the preceding animation to finish.
- Pairs outside the initial group wait until the point 40px below the top of their step text is inside the viewport. Observe `.step-copy` with a 40px bottom inset on both desktop and mobile, revealing the marker and card together. This intentionally reveals stacked cards before their own top edge arrives. Fall back to observing the card only if a future pair has no step-text element. Resizing or scrolling later must not reapply the initial step-text exception.
- Reveal each pair once. Honour reduced motion by showing content immediately and cancelling queued reveals; without IntersectionObserver, keep the content visible.
- Validate short/tall phone, tablet and desktop viewports, breakpoint boundaries, step-text-only initial visibility, tiny slivers, multiple initial cards, later step-text thresholds and additional-card fixtures.

## Title Case

Use **The Chicago Manual of Style, 18th edition (CMOS 18)** as the website's title-case standard, specifically paragraphs 8.160–8.162. Consult the [official title-case Q&A](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/CapitalizationTitles.html) and [18th-edition changes](https://www.chicagomanualofstyle.org/help-tools/what-s-new.html) when a grammatical role or compound is ambiguous.

### Categories

Apply this standard to:

- Browser/page titles and all visible page, dialog, section and card headings.
- Subheadings, step subtitles, pre-headings and heading-like captions.
- Button and action labels, including temporary states, icon-button tooltips and equivalent accessible names.
- Input-field labels, selector/toggle labels, control-group labels and prompt-panel header labels.
- Raw text for labels displayed in all caps by CSS, including textual wordmarks where official brand styling permits.

### Rules

- Capitalise the first and last words of each title or subtitle, and the first word after a colon introducing a subtitle.
- Capitalise nouns, pronouns, verbs, adjectives, adverbs and subordinate conjunctions. Determine a word's grammatical role rather than lowercasing every short word; adverbial particles in phrasal verbs remain capitalised.
- Within a title, lowercase articles (`a`, `an`, `the`) and the coordinating conjunctions `and`, `but`, `for`, `or` and `nor`.
- Lowercase prepositions of four letters or fewer; capitalise prepositions of five letters or more, as specified in CMOS 18. Lowercase `to` when it marks an infinitive, and lowercase `as` in any grammatical function, subject to the first/last-word rule.
- Apply CMOS 18's compound rules to hyphenated terms: capitalise the first element and subsequent principal elements, including those following a prefix, while retaining lowercase articles, short prepositions and coordinating conjunctions where required. Capitalise the second element of spelled-out hyphenated numbers and fractions. Preserve established proper-name styling.
- Preserve the official casing of brands, acronyms, technical identifiers and name particles; retain specialised conventional lowercase forms where CMOS requires them. Do not alter commands, code, filenames or skill slugs to satisfy title casing.
- Store correctly cased source text. Use CSS uppercase only as a visual treatment; do not use CSS capitalisation or a blanket short-word list as a substitute for a grammatical audit. Audit dynamic label states and both agent choices as well as initial text.
- Keep body paragraphs, explanatory copy, full-sentence accessibility descriptions, status/error messages and code content outside these title-case categories unless they independently serve as headings or control labels. Record categories and rules here, not an inventory of individual interface strings.

## Blur Placeholder Geometry

- Follow the block sizing, colour and preview rules in `website/README.md`, under “Block Geometry Rules”.
- Use invisible lowercase `x` characters only for eligible words inside prompt/code text (`pre`) and skill-slug labels (`.slug`). Do not apply this technique to every monospaced text area. A word is eligible only when every original character has the same rendered width as `x` in that text style, within the generator's tolerance of less than 0.01px per character.
- For each eligible word, retain `/` and `-` and replace every other character with `x`; preserve the original whitespace between words. Make these anonymous glyphs transparent and draw the visible cap-height blocks with CSS. The glyphs are layout scaffolding, not visible lettering or protected text hidden by blur.
- Preserve native browser wrapping with these glyphs: long prompt words, commands and skill slugs can split across lines as the viewport changes. One measured rectangle per word is unbreakable and cannot reproduce those internal line breaks. Retaining slash/hyphen punctuation preserves the corresponding native break opportunities; do not replace entire prompt lines with fixed bars.
- Use measured empty rectangles for all text outside `pre` and `.slug`, and for any word inside those areas that fails the equal-width check, including wider emoji. Measure each word in its actual font/style after fonts load; retain its measured width, spacing and line-box dimensions. Both approaches use the same cap-height and baseline rules. In Components explanatory prose, split measured filename/path rectangles at existing slash/hyphen break opportunities so those native breaks remain available; this does not extend dummy `x` glyphs beyond `pre` and `.slug`.
- Never include original protected words, commands or link destinations in the generated backdrop. Removing the blur or making the anonymous glyphs visible must reveal only measured shapes and dummy text. These eligibility and replacement rules are implemented in `website/scripts/measure-placeholder.mjs`, with block styling in `website/lib/workshop-placeholder.mjs`.
- Keep separate saved geometry for Resources (`website/lib/workshop-placeholder.generated.json`) and Components (`website/lib/workshop-playground-placeholder.generated.json`). A new backdrop needs an initial capture to create its geometry; this does not authorise routine remeasurement of existing backdrops during internal builds.
- Remeasure an existing backdrop only when preparing an explicitly authorised Sites publication AND layout changes since the latest successful Sites publication affect that backdrop. Internal builds and local previews reuse saved geometry even when a layout revision is pending; do not remeasure merely to make an internal build current. Do not run browser measurement automatically during development/build startup.
- Before publishing, query Sites for the latest successful deployment, resolve its saved version and exact source commit, and inspect that source checkout. Do not assume the latest saved version, local HEAD or latest GitHub push is live. Compare that committed website source with the candidate, including intervening internal builds and uncommitted changes. Review the actual diff for effects on visible Resources and Components geometry; document-only, colour, strength, blur, authentication and animation-timing changes alone do not require measurement.
- Relevant layout changes include structure, positions, dimensions, spacing, fonts, weight/size, letter spacing, line height, wrapping, breakpoints, word geometry, icon sizes and QR pattern bounds/padding. Text or asset edits count only when those measurements change. Footer-only edits below the visible backdrop and version-label edits with identical geometry do not require measurement. If the published source cannot be verified, resolve that uncertainty before publication rather than guessing a baseline.
- Mark affected layout changes with the corresponding `placeholderLayoutRevision` or `playgroundPlaceholderLayoutRevision` in `website/lib/workshop-layout.mjs`. These are independent geometry cache keys, not artefact versions. At publication preparation, after all layout edits, run `npm --prefix website run blocks:measure` for affected Resources geometry and `node website/scripts/measure-playground-placeholder.mjs` for affected Components geometry. Never measure other Playground tabs. No additional approval is required within an authorised publication.
- Run `node website/scripts/check-placeholder-publication.mjs --published-source PATH --published-commit SHA` using the verified source checkout and full Sites commit. Review its source-change list and require saved revisions to match before publishing. This check does not infer layout changes from filenames or source fingerprints: the reviewed diff determines whether a revision/refresh is needed. Validate and commit refreshed geometry with the publication candidate. A failed publication does not advance the published baseline; reuse already validated candidate measurements when their layout inputs remain unchanged.
- Preserve the main backdrop's glyph/rectangle rules above in the Components capture and its visible specimens. Capture the Style Inspector as a static final section at the bottom, with neutral content and its details expanded; remove its floating dock positioning, shadow and reserved viewport spacing. Retain the interactive dock in the authenticated Playground. Remove protected text, source actions and inactive tab bodies; retain responsive layout and measured word/icon shapes. Backdrop frames have no scripts or interactive access. Their saved geometry is generated locally, never measured in a visitor's browser.
- Run the archived `test:blur-preview` only when explicitly requested. Generating preview HTML is separate from measurement; source fingerprints record provenance and do not independently trigger refreshes.

### Static Capture Behaviour And Rationale

- Treat a login background as one fixed composition in document coordinates, not an interactive page. Here, “fixed asset” does not mean CSS `position: fixed`: scrolling the block inspection view must move captured controls with the page, without persistent hovering silhouettes that reveal the underlying page structure throughout the scroll.
- Before every future login-background geometry measurement or snapshot, normalise viewport-fixed positioning to document-anchored positioning and sticky positioning to normal document flow. Disable hover, active and focus-state styling, animations, transitions and scroll-driven state changes in the capture. Preserve initial responsive geometry and the existing cap-height, baseline and wrapping rules. Never change the real app or Playground's interactive behaviour to prepare a decorative capture.
- For Components, keep the top-right tools anchored to the captured document and place the Style Inspector last in normal flow. Capture its expanded neutral state; do not retain live inspection readings, floating shadows or bottom viewport reservations. Apply the same static preparation to embedded specimens. Use `website/scripts/prepare-backdrop-capture.mjs` for this preparation and verify that no captured element remains fixed/sticky or changes on hover.
- Captured documents remain anonymous and script-disabled. Blocks and Blur may expose native scrolling to inspect them, but must not restore original actions, hover states or sticky behaviour. Verify that tool silhouettes leave the viewport when scrolled and the inspector appears only at the bottom.
- Keep preview viewports constrained to their containing card's optical rails, including expanded views. A selected desktop Screen Width enlarges the iframe inside that viewport, not the surrounding viewport itself. In isolated specimens only, allow horizontal scroll chaining through the login overlay and root; retain production login containment and vertical behaviour. Preserve native horizontal and vertical scrolling; test touch gestures beginning inside the iframe, not only programmatic `scrollLeft` changes. Do not add gesture interception or disable vertical scrolling when a sizing correction resolves overflow. Test narrow phones, wide selected widths, Fit, and inline/expanded views; distinguish emulated touch from physical-device verification.
- The explicit request for this static Components capture authorises its one-off remeasurement during this update. Future internal builds still reuse saved geometry unless the user explicitly authorises another exception; otherwise apply the existing publication-only and layout-change conditions.

## Hidden Playground Shortcut

- Three taps or primary-button clicks on the Wavelength header logo within three seconds open `/component-playground` in a new tab/window using `_blank` with `noopener,noreferrer`, leaving Resources open. Only the header brand area activates it; other clicks, leaving the window or changing visibility reset the sequence. Keep the existing brand markup unchanged: no Tab stop, programmatic focusability, focus ring, button/link role, action-specific screen-reader label, tooltip, hover treatment or visible affordance. Screen readers should encounter only the existing brand content. On the locked main app, recognise the same coordinates from the actual blurred backdrop logo bounds through the scrim without adding a hotspot element; never intercept the login panel. The inert Components backdrop does not expose an additional interactive shortcut target. This intentionally undisclosed shortcut is an exception to the normal pointer-cursor rule. It does not grant access or bypass authentication.
- Playground specimens exercise the same gesture handler but cancel navigation and report the simulated activation.

## Playground Source Fidelity

- Keep local playground app specimens linked to real application markup, styles, icons, messages and state renderers. Do not maintain optical copies, independently authored specimen strings, separate typography scales or duplicated status colours.
- Read dynamic typography content from the rendered source examples, including agent-specific labels and prompts. Label each specimen’s source page and selector. Do not present absent elements or reserved tokens as established app components.
- Use `website/lib/workshop-login-messages.mjs` for login status messages and temporary button wording; both production and the playground consume it. Keep preview outcomes simulated and prevent navigation or real clipboard/authentication writes.
- Read blur, strength and scrim defaults from app CSS. Local sliders must never change production settings or trigger block remeasurement.
- Distinguish the playground’s own testing/navigation controls and explanatory annotations from app specimens. Keep source-parity checks for rendered text and computed typography across mobile/desktop, both agents and both themes when modifying the playground or specimen sources.

- Show full login panels for held login states in Status States. Show JavaScript-disabled notices in their real surrounding page or panel context. Scale complete context specimens only when necessary to fit narrow containers, and label that scaling explicitly. Use the shared centred floating-control shadow token for floating Playground panels, the inspector dock, the ellipsis and Back to Top buttons; keep dark shadows in dark mode with surface and border contrast, rather than white glows.

### Mandatory Change and Validation Contract

- Treat the main local app and `/component-playground` as two consumers of the same application sources. An app interface change is incomplete until its playground representation and relevant parity checks are updated and verified in the same coherent change. This covers markup, copy and messages, typography, spacing, colours and tokens, assets and icons, responsive rules, states, settings, focus, hover, touch and animations. This requirement does not authorise publication to Sites.
- Change the canonical app source first. Import or capture that source in the playground; never fix a mismatch by copying strings, CSS, SVGs or state logic into a second independently maintained implementation. If a source cannot be shared directly, extract a shared renderer or helper rather than creating an optical duplicate.
- For each new, changed or removed component, setting or state, audit the Components, Typography, Colours, Icons, Status States, Focus and Selection, and Blocks and Blur views as applicable. Update specimen manifests, capture selectors, held-state adapters and source labels; remove obsolete examples and fail explicitly when an expected source is missing.
- Held-state adapters may supply fixture data, simulated outcomes and time controls, but must use the app's renderers and messages. When app state transitions change, review every affected adapter in the same change. Keep intentional differences explicit: sample input, held transient states, isolated focus, and disabled real navigation, clipboard, session and authentication effects. Do not allow these exceptions to conceal visual or semantic drift.
- Validate affected specimens against independently rendered main-app pages, not only against other playground frames. Compare text, computed typography, colours, icon geometry, state attributes and relevant interaction behaviour at 320, 390, 768 and 1440px, in light/dark mode and for Codex/Claude. Include relevant neutral, loading, success, failure, disabled, hover and focused states, plus pointer, keyboard and touch paths when affected.
- Run the existing source-parity check (`node website/tests/playground-browser-check.mjs`) for app interface or specimen-source changes, plus focused checks for the changed behaviour. Add or extend regression coverage when fixing a parity defect. Resolve unexpected differences before declaring the work complete; report any unverified browser/device behaviour or intentional simulation difference honestly. Do not claim universal 100% parity based only on shared imports or a limited test pass.
- Keep `/component-playground` canonical; redirect `/component`, `/components`, `/playground` and `/style-guide`, including descendants, with 301 responses. On Sites, protect the entire playground with the same server-validated session as the main app, including expiry and logout; never publish specimen HTML as a public static asset. On the local preview server, keep `/component-playground` password-free only when `show-login` is absent; either explicit boolean uses real session handling on every supported page. Keep testing controls distinct from app specimens, keep simulated actions sandboxed and never expose local test credentials or authentication bypasses through a production handler.

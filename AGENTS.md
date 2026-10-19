---
name: repository-instructions
description: Govern agent work and preview delivery in this repository.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.48"
  update_summary: "Define exact update handoff wording and link selection"
  updated_at: "Mon 19 Oct 2026 at 05:00:17 pm AEDT (+11:00)"
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

- Select the Playground destination using the exact rules and title/slug mapping under Required Update Handoff: use the primary relevant section for a section-specific review, otherwise use `/playground`. Always use the verified active Wi-Fi address and port for local links.

- Start all user-facing local previews already signed in. Use `npm --prefix website run preview:phone` (automatic login enabled), or pass `{autoLogin:true}` to `createPhonePreview` for custom ports. Continue generating and displaying the process’s temporary test password. The local adapter must obtain a real session through the unchanged server-side login handler, using only its in-memory preview database and temporary credential; never add an authentication bypass to application handlers, production builds or hosted Sites. Keep low-level authentication tests explicit (`autoLogin:false`, the factory default). Provide `/?login=1` for inspecting the real login form; local Log Out returns there. Verify a fresh browser opens Resources, the session endpoint recognises its cookie, logout invalidates it, and hosted access still requires authentication when changing this workflow.

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
| `/` | Opens the app using a valid local session, obtaining one automatically through the real local login handler if needed. No password entry is required. | Opens the app when the server validates the existing session; otherwise shows the password form. |
| `/home` or `/home/` | Permanently redirects (301) to `/`, preserving query parameters; the destination follows local automatic-login rules. | Permanently redirects (301) to `/`, preserving query parameters; the destination requires a valid hosted session or password login. |
| `/playground` or a supported section such as `/playground/branding` | Password-free by default; a section path selects that tab directly. | Requires the same server-validated session as the main app. Without one, shows the Playground login form; successful login retains the requested section. |
| `/?login=0` | Behaves like `/`: reuses or automatically obtains a real local session. The value `0` is not an authentication token or a special login command. | Behaves like `/`. The query parameter is ignored for authentication and does not sign anyone in. |
| `/?login=1` | Shows the real login form by ignoring the session cookie for this page request and suppressing automatic sign-in. This inspection URL does not revoke an existing session; Local Log Out separately revokes it and returns here. | Behaves like `/`. It does not force the login form, log the user out or revoke a session. A valid session shows the app; otherwise the password form is shown. |

The `login` query handling is confined to the local preview adapter on `/`; it is not a hosted authentication feature or a Playground override. Neither query value bypasses hosted authentication. Hosted app and Playground sessions share the existing seven-day expiry and logout rules. Never describe a hosted link as password-free merely because its local counterpart opens automatically.

### Required Update Handoff

This is an exact output contract for every completed update in this repository, including documentation-only updates. Use the literal labels, order, punctuation and status phrases below; substitute only verified values and the explicitly permitted alternatives. These rules supersede older handoff examples elsewhere in the repository or chat history.

1. Start with a concise change summary and verification result, normally one or two sentences.
2. Emit **📦 Build and Delivery** and its four bullets in the exact order shown below.
3. Emit **🔗 Local Preview** with exactly three link bullets: Main App, Playground and Login Form.
4. Immediately follow with **🔑 Local App Test Password** and one fenced `text` block containing only the active process’s test password.
5. Append **🌐 Live on Sites** only when publication succeeds for this update, or the user explicitly requests the existing live link. Its default content is one Main App link. Do not automatically add a hosted Playground link.

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

- Main App: `[Main App ↗](LOCAL_ORIGIN) — automatically signed in`. Link to the root URL, not `/home`, and do not put paths in the anchor text.
- Playground, when exactly one section is the primary review destination: `[Playground > SECTION TITLE ↗](LOCAL_ORIGIN/playground/SECTION-SLUG) — automatically signed in`. Use the title/slug mapping below, not a raw slug or invented title.
- Playground, for cross-cutting changes, documentation-only updates or no specific section: `[Playground ↗](LOCAL_ORIGIN/playground) — automatically signed in`.
- Login Form: `[Login Form ↗](LOCAL_ORIGIN/?login=1) — logged-out view`.

| Section Slug | Section Title |
|---|---|
| `components` | Components |
| `typography` | Typography |
| `colours` | Colours |
| `blocks` | Blocks and Blur |
| `icons` | Icons |
| `statuses` | Status States |
| `focus` | Focus and Selection |
| `branding` | Branding |
| `easter-egg` | Easter Egg |

Do not use “Preview link”, inline-code paths in labels, “password free”, “password-free”, “logged out state” or additional lock icons in these handoff bullets. The exact local phrase “automatically signed in” describes the no-password-entry review experience; it does not change the authentication implementation. The app obtains a real local session, while local Playground access remains password-free as documented above. Never apply this phrase to hosted access or imply that either local route bypasses hosted authentication. The login inspection link displays the logged-out form without itself revoking a session.

Verify the active process, LAN origin and all three destinations before handing them over. Read the password from that process’s startup output. Retained startup output is usable only after confirming that the same process is still serving those URLs; never copy a credential merely from a previous final response. Reuse a verified active preview for documentation-only work; do not rebuild or restart it solely because a document changed. If the process or password cannot be verified, restart and verify when safe and within scope, or use the unavailable case below.

If local preview is unavailable, retain **🔗 Local Preview** with `Unavailable — REASON.` and **🔑 Local App Test Password** with `Unavailable — no verified active preview password.` instead of links or a password block. Do not invent credentials or provide unverified URLs. If a deliberately passwordless preview has no test credential, state `Not applicable — this preview has no test password.` instead of a code block; the normal app preview still requires its generated test credential for manual login inspection.

#### Exact Live Link Selection

Under **🌐 Live on Sites**, use `[Main App ↗](VERIFIED-LIVE-ORIGIN)` as a single bullet without an authentication suffix. Use the verified hosted origin; the existing site is `https://ai-workshop-resources.adamjaffrey.chatgpt.site`. Include an additional hosted Playground bullet only if the user explicitly asks for it, using the same Playground label/section mapping. Never include the production password or describe hosted links as automatically signed in. If showing an existing live site without publishing this update, say `Existing live site; this update has not been published.` before the link. Keep the Publish status truthful.

### Handoff Format

Copy this structure literally for a successful new local build, replacing placeholders. For documentation-only work, replace only the Build phrase with `unchanged, no new artefact produced.`. For a section-specific review, replace only the Playground bullet with the section form defined above. Do not emit placeholder text.

````markdown
**📦 Build and Delivery**

- **Build:** `vVERSION` — new artefact produced.
- **Commit:** `HASH` — local commit performed.
- **Push (GitHub):** Not performed.
- **Publish (Sites):** Not performed.

**🔗 Local Preview**

- [Main App ↗](LOCAL_ORIGIN) — automatically signed in
- [Playground ↗](LOCAL_ORIGIN/playground) — automatically signed in
- [Login Form ↗](LOCAL_ORIGIN/?login=1) — logged-out view

**🔑 Local App Test Password**

```text
CURRENT-PROCESS-PASSWORD
```
````

When the live-link inclusion condition is met, append:

```markdown
**🌐 Live on Sites**

- [Main App ↗](VERIFIED-LIVE-ORIGIN)
```

Before sending, check the exact four status labels and order, version/hash evidence, root Main App URL, Playground title/slug selection, literal authentication suffixes, active-process password, and whether a Live on Sites section is warranted. Do not substitute stylistic variants for this contract.

## Website Login

- Use the blank shared page canvas behind Playground login, retaining the shared login panel, blur styling and dimming. Only main-app login uses the measured blurred blocks. Keep both destinations inspectable from the Playground login specimen.

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
- Keep the footer action on the right, vertically centred when alongside the copyright and version text. Prefer a single row; next wrap version and copyright at their divider while retaining the right-aligned action. Only when the intact copyright and action cannot fit side-by-side, put the action below and left-align everything. Omit the divider and adjacent spacing whenever the text wraps.
- Define success, error, warning and information roles centrally in `website/lib/workshop-theme.mjs`, shared by both agents and both pages. Use theme-specific success/error/warning colours and contrasting success/warning fill text. Keep information neutral through `--info`, aliased to `--muted-text`. Warning is reserved for future caution states; do not introduce warning UI without a product need. Check status foregrounds against page, card, field, tinted and hover surfaces when changing the palette. Pair status colours with text or icons.
- Source every error colour on both pages from `var(--error)` in `website/lib/workshop-theme.mjs`. Define it once per light/dark theme; Codex and Claude share those values. Error text, icons, borders, focus rings, password text/autofill and copy-failure controls must reference or inherit that token, with no per-agent overrides or hard-coded component colours.
- New interface icons MUST come from the installed Lucide Icons definitions. Only when Lucide has no suitable icon may an agent propose an alternative; obtain Adam’s explicit approval before adding or using it. Document the suitability gap and, after approval, retain the alternative’s official source, licence and Playground representation. The two existing Lobe Icons agent logos have standing approval and require neither renewed approval nor repeated reminders. The existing Wavelength brand asset remains approved. Do not interpret this standing approval as permission for additional Lobe icons.
- Give every SVG icon a descriptive, stable `data-icon-use` identifying its purpose, plus `data-icon-name` for its official library name and `data-icon-provider` for its origin. Repeated uses may share a purpose name where they perform the same function. Preserve official Lucide and Lobe names independently of usage names; show both in the Playground and retain the original source links. Apply this to app and Playground tooling icons. Do not add redundant screen-reader labels to decorative icons whose controls already have accessible names.

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
- Website changes that preserve the existing layout do not require block remeasurement. Reuse `website/lib/workshop-placeholder.generated.json` for colour, blend strength, blur, interaction/animation timing, authentication, documentation and preview-control changes that do not alter resting geometry.
- Only layout changes that affect the visible blurred background require remeasurement: changes to structure, positions, dimensions, spacing, fonts, font weight/size, letter spacing, line height, wrapping, breakpoints, word geometry, icon-set dimensions or the QR pattern bounds/white padding. Treat text or asset changes as layout changes when they alter those measurements. A version-label change with identical geometry does not require remeasurement.
- Footer-only changes below the visible login background do not require remeasurement or a layout-revision increment.
- Refresh saved block positions with `npm --prefix website run blocks:measure` when an authorised layout change requires it; no separate user approval is needed. Do not measure for non-layout changes or automatically during development/build startup. Run the archived `test:blur-preview` only when explicitly requested.
- For a layout change affecting visible background blocks, increment `placeholderLayoutRevision` in `website/lib/workshop-layout.mjs` to mark saved geometry stale. The existing stale-layout guard reports that a manual refresh is required; it must not launch measurement automatically. Refresh and commit geometry with the corresponding layout change. This revision is a cache key, not an artefact version.
- Do not remeasure merely because source code changed or to refresh a source fingerprint. Development/build startup uses saved geometry and never launches Chrome measurement. The tester is archived under `website/_archive/` and runs only through its explicit manual command. Generating its HTML is separate from remeasurement.

## Hidden Playground Shortcut

- Three taps or primary-button clicks on the Wavelength header logo within three seconds open `/playground` in a new tab/window using `_blank` with `noopener,noreferrer`, leaving Resources open. Only the header brand area activates it; other clicks, leaving the window or changing visibility reset the sequence. Keep the existing brand markup unchanged: no Tab stop, programmatic focusability, focus ring, button/link role, action-specific screen-reader label, tooltip, hover treatment or visible affordance. Screen readers should encounter only the existing brand content. On the locked main app, recognise the same coordinates from the actual blurred backdrop logo bounds through the scrim without adding a hotspot element; never intercept the login panel. The blank Playground login backdrop has no shortcut target. This intentionally undisclosed shortcut is an exception to the normal pointer-cursor rule. It does not grant access or bypass authentication.
- Playground specimens exercise the same gesture handler but cancel navigation and report the simulated activation.

## Playground Source Fidelity

- Keep local playground app specimens linked to real application markup, styles, icons, messages and state renderers. Do not maintain optical copies, independently authored specimen strings, separate typography scales or duplicated status colours.
- Read dynamic typography content from the rendered source examples, including agent-specific labels and prompts. Label each specimen’s source page and selector. Do not present absent elements or reserved tokens as established app components.
- Use `website/lib/workshop-login-messages.mjs` for login status messages and temporary button wording; both production and the playground consume it. Keep preview outcomes simulated and prevent navigation or real clipboard/authentication writes.
- Read blur, strength and scrim defaults from app CSS. Local sliders must never change production settings or trigger block remeasurement.
- Distinguish the playground’s own testing/navigation controls and explanatory annotations from app specimens. Keep source-parity checks for rendered text and computed typography across mobile/desktop, both agents and both themes when modifying the playground or specimen sources.

- Show full login panels for held login states in Status States. Show JavaScript-disabled notices in their real surrounding page or panel context. Scale complete context specimens only when necessary to fit narrow containers, and label that scaling explicitly. Use the shared centred floating-control shadow token for floating Playground panels, the inspector dock, the ellipsis and Back to Top buttons; keep dark shadows in dark mode with surface and border contrast, rather than white glows.

### Mandatory Change and Validation Contract

- Treat the main local app and `/playground` as two consumers of the same application sources. An app interface change is incomplete until its playground representation and relevant parity checks are updated and verified in the same coherent change. This covers markup, copy and messages, typography, spacing, colours and tokens, assets and icons, responsive rules, states, settings, focus, hover, touch and animations. This requirement does not authorise publication to Sites.
- Change the canonical app source first. Import or capture that source in the playground; never fix a mismatch by copying strings, CSS, SVGs or state logic into a second independently maintained implementation. If a source cannot be shared directly, extract a shared renderer or helper rather than creating an optical duplicate.
- For each new, changed or removed component, setting or state, audit the Components, Typography, Colours, Icons, Status States, Focus and Selection, and Blocks and Blur views as applicable. Update specimen manifests, capture selectors, held-state adapters and source labels; remove obsolete examples and fail explicitly when an expected source is missing.
- Held-state adapters may supply fixture data, simulated outcomes and time controls, but must use the app's renderers and messages. When app state transitions change, review every affected adapter in the same change. Keep intentional differences explicit: sample input, held transient states, isolated focus, and disabled real navigation, clipboard, session and authentication effects. Do not allow these exceptions to conceal visual or semantic drift.
- Validate affected specimens against independently rendered main-app pages, not only against other playground frames. Compare text, computed typography, colours, icon geometry, state attributes and relevant interaction behaviour at 320, 390, 768 and 1440px, in light/dark mode and for Codex/Claude. Include relevant neutral, loading, success, failure, disabled, hover and focused states, plus pointer, keyboard and touch paths when affected.
- Run the existing source-parity check (`node website/tests/style-guide-browser-check.mjs`) for app interface or specimen-source changes, plus focused checks for the changed behaviour. Add or extend regression coverage when fixing a parity defect. Resolve unexpected differences before declaring the work complete; report any unverified browser/device behaviour or intentional simulation difference honestly. Do not claim universal 100% parity based only on shared imports or a limited test pass.
- Keep `/playground` canonical and preserve `/style-guide` as a redirect. On Sites, protect the entire playground with the same server-validated session as the main app, including expiry and logout; never publish specimen HTML as a public static asset. On the local preview server, keep `/playground` password-free. Keep testing controls distinct from app specimens, keep simulated actions sandboxed and never expose local test credentials or authentication bypasses through a production handler.

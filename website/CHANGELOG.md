---
name: changelog
description: Record finalised software artefacts for this project.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.143"
  update_summary: "Carry one rainbow wave into locally attracted sparkles"
  updated_at: "Mon 19 Oct 2026 at 02:09:33 am AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Changelog

## v26.0.141 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:09:33 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Carry one rainbow wave into locally attracted sparkles

### Changed

- Replace separate text and ellipsis animations with crops of one area-sized gradient driven by one clock across the complete inscription.
- Sample that shared palette at drifting particle positions and retain rainbow colours in their fading tails.
- Increase default gravity to 180% and restrict hover brightness to particles near the pointer, fading distant points.
- Forward Playground screen-pointer movement across the specimen iframe boundary so its halo follows the surrounding page as well.

### Validation

- Website build and generated version/shared-wave/pointer-code checks — passed.
- Shared gradient, rainbow particle colours, directional emergence, drift, overlapping tails, strong local attraction and distant-particle fade — passed.
- Dedicated Playground/app parity across four widths, both themes and agents, controls/reset and halo tracking outside the iframe — passed.
- Rendered sheen, discovery gating, focus, reduced motion, touch and theme-transition edge cases — passed.
- Required general Playground source-parity suite — passed. Physical-device Safari remains unverified.

## v26.0.140 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:02:07 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Unify the Easter Egg sweep, drifting particles and pointer halo

### Changed

- Set the rainbow sweep to four seconds, include the ellipsis and progressively illuminate drifting particles outwards into the concealed half in either theme.
- Keep particle lifetimes independent of sweep cadence so tails overlap, with smooth pointer attraction and no hover pause for sweeps.
- Add gravity strength and particle duration sliders to the shared specimen controls.
- Cycle the rainbow border and glow through richer colours and smoothly follow the screen pointer while keeping the dialog stationary.
- Rename the dedicated tab to Easter Egg and reduce its standard specimen height to 420px, with 520px for the held success dialog.
- Require bulleted app links with north-east arrows in future handoffs through the repository instructions.

### Validation

- Website build and built version/control checks — passed.
- Directional emergence, ellipsis sheen, free drift, overlapping tails and pointer halo browser checks — passed.
- Discovery gating, touch, hidden-tab, theme fallback, focus restoration and reduced-motion browser checks — passed.
- Dedicated specimen parity across four widths, both themes and both agents, six tuning controls and reset — passed.
- Required general Playground source-parity suite and visual halo review — passed. Physical-device Safari remains unverified.
- Refreshed LAN main app and Playground endpoints — HTTP 200.

## v26.0.139 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 01:43:50 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add discovery tuning controls and gravity sparkles

### Changed

- Keep the existing rainbow sheen and expose specimen-only duration, sweep gap, particle density and halo-strength sliders with canonical defaults and reset.
- Replace outward bursts with independently twinkling points that gather and grow near the pointer; keep concealed letters hidden until activation and preserve the complete target.
- Explain Locked in the dedicated Playground tab and document both visual references. Use shared original CSS/JavaScript without adding dependencies.

### Validation

- Verify dedicated Playground/app parity at 320, 390, 768 and 1440px for both themes and agents, tuning isolation, reset and pointer gravity.
- Check rendered sheen, sparkle field, halo, discovery gating, touch, focus restoration and reduced motion; run the required general Playground source-parity suite.
- `npm --prefix website run build` — passed with saved placeholder geometry. Physical-device Safari remains a manual preview check.

## v26.0.138 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 01:31:59 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add slower rainbow sweeps, particle bursts and a moving halo

### Changed

- Stretch the rainbow text sweep to 4.5 seconds and repeat it every 6.5 seconds, retaining shared wrapped-line movement towards the ellipsis.
- Replace concealed-letter glimmers with 24 coloured outward-moving light particles across the entire hidden-fragment target. Hidden letters stay hidden until activation, including under reduced motion.
- Intensify the dialog halo, animate its colour and extent continuously, rotate its rainbow border and change the dismissal label to Done.
- Keep the dedicated Discovery tab on the canonical renderer, update its preview labels and record visual inspiration links without copying third-party code.
- Await asynchronous copy-failure feedback in the existing Playground test before asserting its result.

### Validation

- `npm --prefix website run build` — passed; built app and Playground contain v26.0.138, particles, moving halo and Done, with the old dismissal label absent.
- `node website/tests/perspective-sheen-browser-check.mjs` — passed; rendered rainbow sweep, concealed glyphs remaining invisible, expanding particles, full-fragment hit area, moving halo, Done and reduced-motion halo.
- `node website/tests/perspective-browser-check.mjs` — passed across four widths and both agents, including qualification, reveal, hover, modal focus and reduced motion.
- `node website/tests/perspective-edge-browser-check.mjs` — passed; touch, hidden tab, rapid toggles, fallback dwell, reset and dedicated-tab source parity.
- `node website/tests/perspective-playground-browser-check.mjs` — passed across 16 viewport/theme/agent combinations and the success dialog.
- `node website/tests/style-guide-browser-check.mjs` — passed; source parity and existing Playground interaction coverage.
- Visual review of captured phone-sized rainbow/particle frames and the glowing dialog — passed. Main app and Playground LAN routes return HTTP 200. Physical-device Safari remains unverified.

## v26.0.137 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 01:21:18 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Replace the discovery icon with concealed-text shimmer

### Changed

- Replace the Sparkles icon with intermittent glimmers across the concealed sentence fragment, and make its whole area the eligible click/tap target in either theme.
- Increase sheen contrast, preserve a single sweep across wrapped lines and show a static concealed-text hint for reduced motion.
- Group discovery controls and their canonical app specimen in a dedicated Perspective Discovery Playground tab, including natural viewing, eligible animation and success-dialog states.
- Update source-derived catalogues, documentation and parity coverage; retain saved backdrop geometry because resting app layout is unchanged.

### Fixed

- Run the actual text sheen in the eligible Playground preview instead of holding the state before the sweep.

### Validation

- `npm --prefix website run build` — passed; built app and Playground contain v26.0.137, text glimmer and the dedicated tab.
- `node website/tests/perspective-browser-check.mjs` — passed across four widths and both agents, including hover, full reveal, modal focus and reduced motion.
- `node website/tests/perspective-edge-browser-check.mjs` — passed; touch, eligibility timing and dedicated-tab source parity.
- `node website/tests/perspective-sheen-browser-check.mjs` — passed; rendered pixels change during the sheen, concealed words glimmer, and the full hidden-fragment target has pointer behaviour at phone/desktop widths in both themes.
- `node website/tests/perspective-playground-browser-check.mjs` — passed; dedicated tab matches independent app typography, colours and target dimensions across 16 viewport/theme/agent combinations, plus success dialog.
- `node website/tests/style-guide-browser-check.mjs` — passed; existing Playground source parity and interaction coverage.
- Physical-device Safari remains unverified; mobile checks use Chrome touch emulation.

## v26.0.136 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 12:57:03 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add the two-theme perspective discovery

### Added

- Add complementary footer fragments wrapping outwards from a centred ellipsis, eligible only after a full settled-theme viewport viewing in both themes during the current visit.
- Add a directional sheen, intermittent Lucide Sparkles, immediate hover sparkle, persistent eligible hit target, complete-sentence reveal and a colourful success dialog inviting discovery with Adam.
- Represent live and held discovery states through canonical source renderers in Playground Components, Typography, Icons, Status States, Focus and Selection and colour rules; keep catalogue dialog captures nonmodal.
- Add desktop/mobile discovery and touch/eligibility regression coverage, with reduced-motion and independent Playground checks.

### Changed

- Keep the resources theme control visible while scrolling, preserving existing theme animation and login control behaviour.
- Refresh saved backdrop geometry for the changed control position and document the discovery flow and device-testing limits.

### Validation

- `npm --prefix website run build` — passed; built app and generated Playground contain v26.0.136 and the shared discovery module.
- `node website/tests/perspective-browser-check.mjs` — passed at four widths for both agents, including qualification, hover, geometry, dialog focus and reduced motion.
- `node website/tests/perspective-edge-browser-check.mjs` — passed; touch emulation, hidden tab, rapid toggles, fallback dwell, reset and independent Playground quote/icon parity.
- `node website/tests/style-guide-browser-check.mjs` — passed; required source parity and existing interaction coverage.
- `node website/tests/playground-focus-matrix-check.mjs` — passed across 16 viewport/theme/agent combinations.
- Theme-transition and theme-control-colour browser checks — passed on both pages at mobile/desktop widths.
- Auth, placeholder, reveal-radius and local phone-preview tests — passed (13 checks).
- `npm --prefix website run blocks:measure` — passed; saved layout revision 8.
- Local main app and password-free Playground HTTP checks — passed. Physical-device Safari remains unverified.

## v26.0.135 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 12:41:47 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Accelerate and audit focus previews

### Changed

- Deliver focus specimens before the heavier icon/status catalogue, coalesce refresh requests, and use MessageChannel yields instead of timer waits vulnerable to hidden-frame throttling.
- Ignore stale or identical focus results and preserve unchanged specimen DOM. Restore the resources content context so prompt surfaces use the canonical scoped background.
- Serve local Playground assets by URL with public-asset CORS support and gzip its HTML when accepted. Retain self-contained asset embedding by default for generated hosted HTML. Authentication remains unchanged.

### Validation

- `node website/tests/playground-focus-matrix-check.mjs` — passed; 16 combinations at 320, 390, 768 and 1440px, both agents/themes, independent app control/password/surface parity, horizontal overflow, late layout stability and rapid final-selection checks.
- `node website/tests/playground-focus-performance-check.mjs` — passed; gzip preserves exact HTML. Local HTML transfer decreased from approximately 4.45 MB uncompressed to 250 KB compressed, with fonts/images requested separately.
- Real LAN preview benchmark — cold Focus loads measured 912ms at 390px and 812ms at 1440px with fourfold CPU slowdown in headless Chrome. This does not reproduce or guarantee the user's Mac/Safari timing.
- Focus consistency, contextual typography, tool-focus and typography/modal checks — passed. A fixed-delay typography assertion was updated to await its source capture.
- `node website/tests/style-guide-browser-check.mjs` — passed; complete source-parity matrix.
- `npm --prefix website run build` — passed; generated server assets display v26.0.135. WebKit is not installed; physical Safari/iPhone behaviour remains unverified.

## v26.0.134 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 12:34:03 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Synchronise focus specimens and remember the selected tab

### Fixed

- Restore real QR-card and footer context in focus examples, preserving QR image/overlay sizing and Log Out icon alignment, spacing and rounded ring geometry. Independently rendered main-app controls already have the correct context.
- Render focus resources and login examples together and reject stale capture generations. Apply each capture's requested theme/agent settings and relayout selector indicators after insertion. Keep held focus independent of pointer modality.
- Show selection highlights only for selectable body text, prompt text and password contents, not button or selector labels. Remove trailing row padding beneath the final password specimen.
- Add space above Typography prompt-feedback headings and remove the extra boundary around the login JavaScript fallback while retaining the full-site fallback boundary.

### Added

- Remember the selected Playground tab across refreshes within the current browser tab, with a safe default when browser storage is unavailable or the stored tab no longer exists.

### Validation

- `node website/tests/playground-focus-consistency-check.mjs` — passed; independent QR/logout geometry, full overlay coverage, selectable-only highlights, repeated theme/agent changes, status boundaries and refresh persistence.
- `node website/tests/playground-context-focus-check.mjs`, `node website/tests/playground-status-layout-check.mjs`, `node website/tests/playground-typography-modal-check.mjs` and `node website/tests/playground-tool-focus-check.mjs` — passed.
- `node website/tests/style-guide-browser-check.mjs` — passed; complete source-parity matrix across responsive widths, agents and themes.
- `npm --prefix website run build` — passed; generated assets display v26.0.134. Browser checks used headless Chrome; physical Safari and 1Password testing were not performed.

## v26.0.133 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 12:17:51 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine specimen context and add focus and selection previews

### Changed

- Balance first/last Typography spacing, hide duplicate inert copy controls, preserve prompt and password containers with the padlock, and use source widths for unlock and JavaScript notices. Restore the divider after prompt feedback and use primary text for unused categories.
- Tighten QR and prompt status spacing, enclose the full-site JavaScript fallback, restore the divider before login states and place Ready to Retry immediately before the JavaScript fallback.
- Add Focus and Selection using canonical app markup, mechanically derived focus selectors and computed selection colours. Include password states, controls, selectors and body/prompt text, linked to theme and agent settings.
- Round Playground tooling focus treatments, provide clearance in overflow rows, disable edge fades during keyboard focus and show the checkbox ring around its rounded label.
- Include Focus and Selection in the repository's mandatory Playground parity contract.

### Validation

- `node website/tests/playground-context-focus-check.mjs` — passed at 320, 390, 768 and 1440px; password rings also match canonical tokens for both themes and agents.
- `node website/tests/playground-tool-focus-check.mjs` — passed; visible tooling controls have rounded rings and vertical overflow clearance across all tabs at mobile/desktop widths.
- `node website/tests/style-guide-browser-check.mjs` — passed; full source-parity matrix.
- `node website/tests/playground-typography-modal-check.mjs` and `node website/tests/playground-status-layout-check.mjs` — passed.
- `npm --prefix website run build` — passed; generated assets display v26.0.133. Headless Chrome screenshots inspected; physical Safari and 1Password extension behaviour not verified.

## v26.0.132 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 11:57:50 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Make the password input fill its visible field

### Fixed

- Extend the real password input to both inner borders, moving spacing inside it and positioning the shared status icon over its left padding. Clicking either edge now focuses the input, and password-manager controls can anchor to the full field width.
- Keep a rounded neutral inset surface throughout typing and submission, including password-manager background injection outside the native autofill state. Preserve status colours, text spacing and the shared main-app/Playground renderer.

### Validation

- `npm --prefix website run build` — passed; generated server assets display v26.0.132.
- Password-field geometry and edge-click checks passed at 320, 390, 768 and 1440px. A rendered-pixel check confirms simulated blue background injection stays neutral, allowing one colour-channel level for text antialiasing.
- Login-state checks passed in both themes at mobile and desktop widths. Actual 1Password extension behaviour requires user browser verification.
- `node website/tests/style-guide-browser-check.mjs` — passed; main-app/Playground parity across four widths, both themes and agents.
- Website PVS validation, `git diff --check`, local LAN endpoints and password unlock — passed.

## v26.0.131 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 11:50:11 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Clarify typography specimens and contain style options

### Changed

- Group resting, success and failure prompt/QR copy controls side by side using captures of their real app states. Label each button's actual text metrics separately from the prompt overlay message metrics and show both overlay outcomes together when space permits.
- Add both real JavaScript-disabled notices to Typography. Move unused H4, H5, H6, hyperlink/anchor and warning categories into a separate explanatory panel without invented specimens.
- Remove trailing divider padding, final-child margins and empty specimen containers. Put the Feather MIT notice in an indented, bordered, non-scrollable container.
- Bring the resources JavaScript notice closer to the coding-agent controls and add separation before Step 1. Move Ready to Retry after all login error/fallback states.
- Give the ellipsis and Back to Top buttons a stronger shared dark shadow while retaining the softer panel shadow.
- Use a native modal dialog for the visually anchored Style Options panel. Block background scrolling and interaction; dismiss through X, Escape or an outside tap and restore scroll position and opener focus.

### Fixed

- Bound Status States prompt success/failure panels by the measured app width.
- Position held login theme indicators with the same helper used by the app's real toggle, so their geometry stays correct after responsive scaling.

### Validation

- `npm --prefix website run build` — passed; built server assets display v26.0.131.
- `node website/tests/style-guide-browser-check.mjs` — passed at four widths, both themes and agents, including source typography, login/copy states and sandbox containment.
- `node website/tests/playground-typography-modal-check.mjs` — passed; all copy variants, exact metric labels, JavaScript notices, trailing spacing, licence layout, toggle alignment, modal focus, outside dismissal and scroll restoration.
- `node website/tests/playground-status-layout-check.mjs`, `node website/tests/playground-reconciliation-check.mjs` and `node website/tests/playground-grouping-browser-check.mjs` — passed.
- `node website/tests/javascript-notice-browser-check.mjs`, `node website/tests/playground-mobile-refinements-check.mjs` and `node website/tests/playground-controls-and-errors-check.mjs` — passed.
- `node --test website/tests/reveal-radius.test.mjs`, `node website/tests/theme-control-colour-browser-check.mjs` and `node website/tests/theme-transition-browser-check.mjs` — passed.
- Website PVS validation and `git diff --check` — passed. Browser checks used headless Chrome; physical iPhone/Safari testing was not performed.

## v26.0.130 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 11:28:53 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine contextual status previews and shared visual conventions

### Changed

- Show complete login panels for every held status and show JavaScript-disabled notices in their actual surrounding panel or page context. Scale context previews only when narrow containers require it.
- Rename Error States to Status States and include checking, success, retry and both copy-success outcomes alongside existing failures and JavaScript fallbacks.
- Use a shared static Lucide X notice renderer and error typography. Place the login fallback above Password and align the resources fallback with the main content. Catalogue the shared icon with its Lucide source.
- Share the login panel's soft dark shadow with floating Playground controls. Preserve surface and border contrast in dark mode.
- Restore sideways initial step/card entrances with a 240ms lead-in and 360ms stagger, respecting reduced motion.
- Separate the unused-heading note, remove final list dividers, improve tablet/desktop slider spacing, and move shortcut feedback into the inspector with automatic dismissal.
- Keep the Feather explanation with its disclosure and use the surrounding primary text colour.

### Fixed

- Constrain prompt typography and feedback specimens to measured app widths and preserve valid measurements when their source frame is hidden.
- Preserve sample password values when cloning inputs, retain prompt status messages inside their real positioning container, and provide room around status-panel shadows.
- Avoid replaying an unchanged agent selection when applying Playground settings.
- Centre cross-frame pointer targets clear of the fixed inspector during clipboard parity tests and wait for asynchronous copy completion.

### Validation

- `npm --prefix website run build` — passed; built server assets display v26.0.130.
- `node website/tests/style-guide-browser-check.mjs` — passed; source parity at 320, 390, 768 and 1440px, both themes and agents, held login states, copy feedback and sandbox containment.
- `node website/tests/javascript-notice-browser-check.mjs` — passed; actual JavaScript-disabled notices, placement, shared tokens, icons and typography across four widths, both themes and agents.
- `node website/tests/playground-status-layout-check.mjs` — passed; bounded prompts, populated password, full-panel states, context scaling, non-overlap and shared shadows.
- `node website/tests/playground-reconciliation-check.mjs`, `node website/tests/playground-grouping-browser-check.mjs` and `node website/tests/playground-layout-audit-check.mjs` — passed.
- `node website/tests/initial-reveal-browser-check.mjs` — passed; nine viewport sizes, initial stagger, later thresholds, extra-card fixtures and reduced motion.
- Headless Chrome visual review and local preview HTTP/authentication checks — passed. Physical iPhone/Safari validation was not performed.
- Website PVS validation and `git diff --check` — passed.

## v26.0.129 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 10:44:55 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Show complete agent typography states and clearer source links

### Changed

- Begin icon source links with View Source, followed by the official library and icon names.
- Replace isolated agent-label typography specimens with two complete selectors captured from the real app: Codex selected and Claude Code selected. Each agent appears selected and deselected with its actual background and theme colours.
- Retain computed typography readings and source references for both held selector states.

### Validation

- Production build with provisional v26.0.129 — passed.
- Four-width, both-theme and both-agent parity checks including held selector text styles, selected backgrounds and helper feedback — passed.
- Source reconciliation, exact source-link text and paired selector-state checks — passed.
- Mobile selector specimen visual inspection — passed.

## v26.0.128 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 10:28:58 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Move hidden Playground access to the header logo

### Changed

- Move the three-tap/click shortcut from the version number to the Wavelength header brand, keeping separate-tab navigation and ordinary brand semantics.
- Share the handler with locked main-app login and recognise the actual blurred logo coordinates through the scrim without adding a hotspot or intercepting the login panel.
- Preserve protected Playground login and its blank backdrop; local Playground remains password-free.
- Require Build, Commit, Push (GitHub) and Publish (Sites) in one handoff status list, including whether a new artefact was produced.

### Validation

- Production build with provisional v26.0.128 — passed.
- Four-width touch/mouse checks for locked and unlocked logo gestures, authentication, footer exclusion, expiry, no opener and sandbox containment — passed.
- App/Playground source-parity matrix across both themes and agents — passed.

## v26.0.127 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 10:23:32 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Open Playground separately and preserve the Resources tab

### Changed

- Open the hidden version-number shortcut with `_blank` and `noopener,noreferrer`, keeping the main Resources tab open.
- Record the new-tab behaviour in repository instructions and verify popup isolation alongside the existing gesture checks.

### Validation

- Production build with provisional v26.0.127 — passed.
- Four-width touch/mouse shortcut checks including separate-tab navigation, preserved Resources, no opener and sandbox containment — passed.
- App/Playground source-parity matrix across both themes and agents — passed.

## v26.0.126 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 10:21:30 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add the hidden version-number Playground shortcut

### Added

- Open Playground after three version-number taps or clicks within three seconds; exclude the copyright notice and reset incomplete or interrupted sequences.
- Keep the version ordinary, unfocusable text with no visible or screen-reader action affordance; preserve existing authentication.
- Exercise the shared shortcut in Playground specimens while cancelling navigation.

### Changed

- Require separate build and commit lines, an explicit new-artefact or no-new-artefact explanation, and independent GitHub push and Sites publication statuses in update handoffs.

### Validation

- Production build with provisional v26.0.126 — passed.
- Shortcut touch/mouse, expiry, copyright exclusion, non-focusability and sandbox containment checks at four widths — passed.
- App/Playground source-parity matrix at four widths, both themes and both agents — passed.

## v26.0.125 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 10:10:21 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Name icon purposes and preserve official library identities

### Changed

- Give every app and Playground tooling SVG explicit usage, official-name and provider metadata; identify the Wavelength brand image too.
- Show descriptive usage names alongside official Lucide and Lobe identities and original source links in the icon gallery.
- Check declared Lucide names against actual SVG definitions and test all SVG metadata, visible usage names and library links.
- Require Lucide-first sourcing in repository instructions, with documented exceptions when no suitable icon exists.

### Validation

- Production build with provisional v26.0.125 — passed.
- Playground source-parity matrix across four widths, both agents and both themes — passed.
- Source reconciliation and icon naming/provenance browser checks — passed.

## v26.0.124 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 10:01:12 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Reconcile Playground coverage and retain exact source origins

### Added

- Add source-linked typography specimens for both agent buttons, the login pre-heading and password input.
- Include both native JavaScript-unavailable notices in Error States and Fallbacks.
- Add reconciliation coverage for complete source trees and component children, every SVG, embedded asset bytes, gallery origins and actual no-JavaScript notices.

### Changed

- Identify icon, Unicode and error specimens with exact source selectors and retain original image asset paths when embedding previews.
- Fail explicitly when required icon or error sources disappear instead of silently omitting them.

### Validation

- Production build with provisional v26.0.124 — passed.
- Source-parity browser matrix at 320, 390, 768 and 1440px, both themes and both agents — passed.
- Logical grouping and QR outline-clearance browser checks — passed.
- Full source-tree, SVG, asset, error-group and no-JavaScript reconciliation — passed.

## v26.0.123 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 09:46:31 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Group related Playground specimens and expose helper feedback

### Changed

- Curate typography into brand, pre-heading, heading, body, prompt, QR, footer and login groups instead of strict DOM order.
- Keep card icons, copy variants, prompt symbols, footer symbols and login state icons in coherent consecutive groups.
- Add outline clearance around captured icon controls, including QR copy/check/failure examples.
- Capture actual prompt-copy success and failure panels for Typography, including button states and helper text overlaying the code block.
- Document curated grouping and shared-renderer feedback sources.

### Validation

- Group ordering and QR outline clearance on all four sides at four screen widths — passed.
- Independent app/Playground typography and prompt-helper feedback parity across four widths, both agents and themes — passed.
- Production build and saved-placeholder checks — passed.

## v26.0.122 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 09:13:36 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine Playground usability and responsive page behaviour

### Changed

- Keep the breadcrumb at 14px with a regular Resources link and semibold current page; retain the installed Lucide chevron.
- Align desktop style controls, rename Screen Width, disclose hover help compactly, preserve scroll during radio activation and place login control groups side-by-side.
- Order typography and icon specimens by source DOM order, show compact resting copy examples, provide a real rendered login error sample and use monospace selectors.
- Preserve emoji presentation, separate licence explanations and render errors alongside their source controls with responsive capture sizing.
- Size embedded previews once against initially available viewport space after the sticky toolbar and inspector; tighten tab spacing without resizing previews when controls open.
- Prefer wrapped footer metadata beside Log Out before stacking the action, preserving intact version/copyright strings and hiding wrapped separators.
- Give initially visible step/card pairs a short vertical fade instead of opposing sideways entrances, retaining stagger, later reveal thresholds and reduced motion.

### Validation

- Independent app/Playground typography parity and held states at 320, 390, 768 and 1440px, both themes and agents — passed.
- Toolbar alignment, pointer scroll stability, stable preview sizing, breadcrumb styling, emoji and in-context errors without overflow across all required combinations — passed.
- Initial reveal checks at nine sizes, vertical motion, five-card fixture and reduced motion — passed.
- Footer tiers, divider removal, intact text and alignment across five widths — passed.
- Expanded preview controls, focus restoration and reference gallery sizing — passed.
- Authentication, placeholder tests and production build — passed.

## v26.0.121 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 08:34:42 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine Playground navigation and login backgrounds

### Changed

- Put an accessible Resources / Playground breadcrumb above the pre-header, with the shared Lucide chevron and accent link styling.
- Use a blank canvas for Playground login while preserving shared panel styles, blur and dimming; retain measured blocks for main-app login.
- Add a login-destination specimen selector using the canonical app backgrounds.
- Require build version, commit, local links and current test password in update handoffs, plus both hosted links after publication.

### Validation

- Authentication and saved-placeholder tests — passed.
- App/playground source-parity browser checks — passed.
- Breadcrumb, focus and background parity at four widths, both themes and agents — passed.
- Production build — passed.

## v26.0.120 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 07:45:54 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Host the playground behind the shared app session

### Changed

- Serve `/playground` on Sites only after validating the same session used by the resource page; direct playground login returns to that page.
- Bundle generated specimen HTML server-side, with no protected content in public static assets; retain sandboxed, simulated specimen actions.
- Relock the hosted playground on session expiry or detected logout, and add a link back to resources.
- Keep the local preview playground password-free and document the hosted/local distinction.

### Validation

- Authentication, route and browser validation — passed.
- Ten authentication and route tests passed, including expiry, logout and anonymous-content protection.
- Shared-session browser checks passed, including direct login return and CSP-compatible specimen rendering.
- App/playground source parity checks passed for both agents and themes at mobile and desktop sizes.
- Production build, saved-placeholder checks and public-asset content isolation passed.

## v26.0.119 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 03:01:10 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Require app-playground parity and expose the playground route

### Changed

- Make `/playground` the canonical local testing route; redirect legacy `/style-guide` links and trailing-slash variants while preserving queries.
- Require app interface changes to update affected playground sources, state adapters and regression coverage in the same coherent change, with independent rendered-app comparisons.
- Update route documentation and browser checks while retaining production exclusion.

### Validation

- Canonical GET/HEAD route, legacy redirects and production exclusion tests — passed.
- Playground parity/browser checks for both themes and agents at mobile/desktop sizes — passed.
- Production build and saved-placeholder checks — passed.

## v26.0.118 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 01:27:12 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Neutralise login icons and handle QR touch activation directly

### Changed

- Use shared neutral muted text for resting password padlocks and checking spinners in both agent modes and themes; preserve semantic error/success overrides and accented input focus.
- Align repository instructions and login documentation with neutral icons.

### Fixed

- Activate no-hover QR previews from deliberate touch releases, suppress duplicate compatibility clicks, reject moved/cancelled touches and preserve preview state across touch-related blur.
- Retain immediate mouse/keyboard copy and the first-tap settling guard.

### Validation

- QR touch checks including Safari-style events, intervening blur and a 768px specimen on a narrow touch viewport — passed; physical iPhone verification remains with the user.
- Desktop QR copying, login states across mobile/desktop and neutral checking icons in both agents/themes — passed.
- Playground source-parity checks and production build — passed.

## v26.0.117 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 12:57:06 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Improve login error spacing and touch preview affordances

### Changed

- Increase the reserved error-to-button gap to 16px while retaining 12px above the error row and stable login-state geometry.
- Move the shared light-mode error token to cooler plum-magenta #85009B; preserve the dark-mode token.
- Add right/bottom overflow fades to playground controls only while further content remains, including expanded groups and section tabs.
- Update repository spacing guidance and touch-preview explanations.

### Fixed

- Track initiating pointer/touch input so Safari mouse-style click events retain the QR two-tap behaviour without delaying mouse or keyboard copying.

### Validation

- QR touch regression, including Safari-style events and a 768px specimen in a narrow touch host — passed; physical iPhone confirmation remains with the user.
- Login states, semantic colour contrast, desktop QR copying and playground controls/error checks — passed.
- Overflow fade, expanded-preview and source-parity browser checks — passed.
- Production build and saved-placeholder checks — passed; no background geometry change.

## v26.0.116 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 12:46:40 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine touch QR copying, focus rings and expanded preview controls

### Changed

- Reveal the QR copy overlay on first touch and copy on a second deliberate tap when hover is unavailable; preserve immediate mouse and keyboard copying.
- Show the green success outline only while the password input is focused, retaining the success border, check and button feedback.
- Match expand/contract icons to neighbouring 18px controls while preserving 44px tap targets.
- Enclose expanded Style Options and Preview Controls with theme-aware rounded borders.
- Document QR touch behaviour and focused success styling.

### Validation

- Touch QR, desktop copy, login states and playground controls/error browser checks — passed.
- Playground source-parity and expanded-preview browser checks across mobile/desktop — passed.
- Production build and saved-placeholder checks — passed; no layout remeasurement required.

## v26.0.115 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 12:39:58 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Expand interactive previews and simplify gallery scrolling

### Added

- Add Lucide expand/contract controls for login, resource and block previews, using native full-screen dialogs with shared state and style controls.
- Preserve iframe instances, selected outcomes, page position and keyboard focus through expansion and contraction; lock background scrolling while modal.

### Changed

- Cap inline interactive previews at 70dvh and size expanded previews to the available visual viewport.
- Let Typography, Icons, Error States and the colour-rule list grow with their content so their reference galleries use the playground page scroll.
- Document the modal controls and reference scrolling workflow.

### Validation

- Expanded-preview browser checks — passed on mobile and desktop, including inline caps, retained iframe state, controls, focus, Escape and scroll restoration.
- Existing playground controls and source-parity/browser matrix — passed; mobile screenshots visually inspected.
- Production build, geometry guard, syntax and whitespace checks — passed.

## v26.0.114 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 11:55:28 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Align heading actions and label reset controls

### Changed

- Align section reset buttons and the source checkbox with the first heading line, independently of heading wrapping.
- Add visible Reset labels beside proportional Lucide reset icons while preserving descriptive accessible names and touch targets.

### Validation

- Headless playground checks — passed, including first-line alignment and container bounds at 320/390/1440px.
- Production build, geometry guard, syntax and whitespace checks — passed.

## v26.0.113 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 11:53:37 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Compact login errors and distinguish their shared colours

### Changed

- Shorten connection and retry-countdown messages and reserve one 21px error line, allowing accessibility text to wrap without clipping.
- Move shared light/dark error colours further towards berry while preserving contrast across both agents and all tested surfaces.
- Clarify mobile hover previews and rename the normal-interaction option; preserve actual copy behaviour.
- Update repository and website instructions for the one-line reserve.

### Validation

- Authentication tests, login-state matrix at 320/390/768/1440px, shared status contrast and playground source-parity/control checks — passed.
- Default errors fit one line without panel jumps; semantic foreground contrast is at least 4.5:1 on tested surfaces.
- Production build, geometry guard, syntax and whitespace checks — passed.

## v26.0.112 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 01:22:34 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Fit filtered icons and restore playground bottom spacing

### Fixed

- Resize the icon frame to its visible content after filtering, source-link changes and wrapping, retaining a scrollable maximum for longer lists.
- Restore 24px of breathing room above the docked inspector at the bottom of every tab.

### Validation

- Headless playground checks — passed, including every filter’s measured content/frame height and bottom clearance.
- Production build, geometry guard, syntax and whitespace checks — passed.

## v26.0.111 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 01:18:21 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Keep agent choices together in the options popover

### Fixed

- Give the agent selector its intrinsic width and prevent Codex and Claude Code from wrapping onto separate rows.
- Retain the 20px column gap and compact selector padding/type below 360px to keep choices inside the panel.

### Validation

- Headless playground checks — passed, including same-row agent choices and selector bounds at 320px and 390px.
- Production build, geometry guard, syntax and whitespace checks — passed.

## v26.0.110 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 01:15:05 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Increase separation between popover selectors

### Changed

- Increase the Coding Agent/Colour Theme column gap from 12px to 20px while retaining flexible columns within the existing popover width.

### Validation

- Headless playground controls and alignment checks — passed.
- Production build, saved-geometry guard, syntax and whitespace checks — passed.

## v26.0.109 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 01:13:43 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Present playground sections as a scrolling tab row

### Changed

- Replace boxed section buttons with a single horizontally scrolling tab row and an accent underline for the active section.
- Add linked tab/panel semantics, a single keyboard tab stop and Arrow/Home/End navigation.

### Validation

- Headless playground checks — passed, including mobile horizontal overflow, active selection and keyboard navigation.
- Production build, geometry guard, syntax and whitespace checks — passed.

## v26.0.108 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 01:11:39 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Compact style options and add back-to-top navigation

### Changed

- Align the Style Options heading at the top and place Coding Agent left of Colour Theme in a shared two-column row.
- Add a floating Lucide Arrow Up to Line button below the mobile options control, with heading focus and reduced-motion-aware scrolling.

### Validation

- Headless playground and mobile checks — passed, including heading offset, column alignment, scroll-to-top and focus destination.
- Production build, geometry guard, syntax and whitespace checks — passed.

## v26.0.107 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 01:00:14 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Explain and separate the Feather licence notice

### Changed

- Add 24px of space after the Lucide licence link and explain why Feather’s original MIT notice accompanies the derived icons.
- Keep the full notice expandable below the explanation with a 12px gap.

### Validation

- Headless playground controls and licence disclosure checks — passed.
- Production build, saved-geometry guard, syntax and whitespace checks — passed.

## v26.0.106 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 12:56:29 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Use accurate component and Unicode specimen names

### Changed

- Label the footer character Bullet, name the displayed Unicode symbols and retain their code points.
- Identify prompt text and action specimens by their actual roles; restrict Lobe attribution to recognised brand icons.

### Validation

- Audit component, typography, colour, block, icon and error labels against their sources — completed.
- Real app clipboard-failure checks — passed for QR and prompt controls on desktop and prompt controls on mobile, including X icons and Copy Failed labels.
- Playground controls/errors checks, production build, geometry guard, syntax and whitespace checks — passed.

## v26.0.105 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 12:52:08 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Clarify copy failures and icon source controls

### Changed

- Show Lucide X beside Copy Failed for QR and prompt copy failures, using the shared error colour and existing feedback lifecycle.
- Replace Show Sources with a labelled native checkbox and include both copy-failure icons in the live gallery.
- Display the bundled Feather-derived MIT notice in an expandable section of the Lucide licence panel.

### Validation

- Headless playground controls/errors and desktop/mobile browser matrix — passed, including source visibility, both failure icons and exact MIT notice.
- Production build, saved-geometry checks, syntax and whitespace checks — passed.

## v26.0.104 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 12:44:48 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine playground controls, icon sources and error previews

### Added

- Add icon-family filters, optional source links, accurate Lucide/Lobe licence panels and a source-derived Error States gallery.

### Changed

- Animate the single ellipsis/X options control and inspector chevrons, place Freeze beside More Details, clarify hover controls and tighten mobile control spacing.
- Curate source-linked icon examples, show selected theme/agent states, identify Unicode glyphs and preserve room around success outlines.
- Document capture isolation, navigation boundaries and licence/source controls.

### Fixed

- Prevent hidden capture frames from stealing focus or extending the page, and restore visible QR copy examples.

### Validation

- Playground controls/errors, browser matrix and mobile refinements checks — passed in headless Chrome.
- Production build, saved-geometry checks, syntax and whitespace checks — passed.

## v26.0.103 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 12:20:57 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Separate colour samples from their swatch labels

### Changed

- Add a subtle 1px line below each colour sample using the same shared border token as its swatch card.

### Validation

- Browser inspection — divider matches the swatch outline in light and dark mode.
- Syntax, whitespace and production build checks — passed.

## v26.0.102 — 2026-10-18

**Built at:** Sun 18 Oct 2026 at 12:14:45 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine mobile playground and add source-derived icon specimens

### Changed

- Wrap mobile section tabs compactly, rename Blocks and Blur, and pack login states into two independent horizontal rows without a swipe explainer.
- Move reset actions to labelled Lucide icon buttons beside headings; enlarge slider targets and thumbs, separate their groups, and align values with labels.
- Anchor Style Options as a native popover below the ellipsis control, with heading-first focus, Escape and outside dismissal.
- Apply the local Codex default before paint without inheriting the live site’s saved Claude accent.
- Separate footer typography from Log Out, reuse the app’s footer wrap logic, and retain Copy and QR control icons and visible containers.
- Use compact two-column mobile colour swatches and monospaced hex values.
- Collapse Style Inspector to one line; provide separate animated chevrons for its controls and computed details, respecting reduced motion.
- Add Icons and Symbols using actual running-app markup and computed styles, including Lucide names, Lobe logos, image assets, login/copy states and Unicode source excerpts. Isolate capture activity from visible focus, inspection and real clipboard actions.
- Document the updated controls and icon-source mapping.

### Validation

- Full playground browser matrix — passed source typography parity and interactions across desktop/mobile, both themes and agents.
- Mobile refinement checks — passed popover focus/restoration, initial accent frames, packed controls, footer/Copy/QR specimens, swatches, sliders, inspector levels and icon size/colour parity in all theme-agent combinations.
- Local-preview isolation and placeholder unit tests — three passed.
- Sites production build — passed; saved placeholder geometry reused and local design tools remain outside production routes.

## v26.0.101 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 11:46:24 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Style accent links and shorten login errors

### Changed

- Give text links shared theme-aware accent colours, an underline and a subtle hover tint; honour reduced motion.
- Shorten shared login error and retry messages while retaining the reserved status space.
- Explain Natural and Hold Hover beside the playground control.

### Validation

- Login-state and playground browser matrices — passed.
- Shared link styles across both themes and agents, hover and reduced motion — passed.
- Auth and local-preview isolation tests — nine passed.
- Production build — passed; saved placeholder geometry reused.

## v26.0.100 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 11:40:43 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Link playground specimens to app sources and improve mobile use

### Changed

- Put mobile global controls behind a floating Lucide Ellipsis button and accessible native dialog with Lucide X; arrange long state lists in a two-row horizontal rail and separate copy controls from their preview.
- Replace invented typography with real rendered app nodes, including standard login and accent step H2 variants, and synchronise agent-dependent text and source-state changes.
- Share login messages, temporary button wording and failure rendering between production and the playground; remove unsupported text-field and heading specimens.
- Label colour roles and generate an inventory from real CSS and colour-bearing markup; distinguish playground controls from app specimens.
- Consolidate light input/content fills and alias identical dark field/control borders while preserving semantic roles.
- Read block defaults from app CSS and add independent local scrim opacity alongside the existing single blur. Rename the combined mode Blur and Darken.
- Document source fidelity and source-parity validation in repository instructions and the website README.
- Prevent a delayed native panel-opening event from resetting focus after the user has already pressed Tab.

### Validation

- Playground browser checks — passed rendered text/font/colour parity in eight viewport/theme/agent combinations, held messages, modal focus/restoration, rail layout, copy spacing, single blur, scrim control and source-change propagation.
- Production login-state browser checks — passed four widths and both themes.
- Production focus checks — passed heading-first opening, keyboard rings, selector focus and dialog/popover navigation.
- Status-colour contrast checks — passed both pages, themes and agents.
- Auth, preview isolation and placeholder unit checks — 11 passed.
- Sites production build — passed; saved placeholder geometry reused.

## v26.0.99 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 11:02:25 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Use one background blur pass on the login page

### Changed

- Remove the additional 7px login blur, retaining one 4px blur on the decorative background and no panel backdrop filter.
- Align local blur-tool descriptions and documentation with the single-pass treatment; retain saved geometry.

### Validation

- Ten authentication and placeholder tests — passed.
- Headless login transition continuity at desktop/mobile sizes in both directions — passed.
- Local style-guide browser checks — passed.
- Local production build — passed.

## v26.0.98 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 10:41:06 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Bake login blur into the background before theme transitions

### Changed

- Apply both existing login blur passes directly to the decorative background so theme snapshots do not depend on the access gate’s backdrop filter.
- Preserve overlay tint, saved block geometry, animation settings and independent local blur-tool modes.
- Update the local tool’s explanation of the additional blur pass.

### Validation

- Ten authentication and placeholder tests — passed.
- Headless Chrome before/during snapshot comparisons and filter-state checks in both theme directions at mobile/desktop sizes — passed.
- Local playground and theme-transition browser regressions — passed.
- Sites production build — passed. Original device-specific flicker was not reproduced in Chrome; native iPhone recheck remains necessary.

## v26.0.97 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 08:25:25 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Accelerate mobile themes and reveal pairs from their step text

### Changed

- Shorten mobile circular reveals to 300ms, retaining 420ms desktop timing, the feather, inverse motion and synchronised toggle colours.
- Trigger later paired reveals when the point 40px below the step text enters the viewport on every layout, allowing earlier stacked-card animation.
- Preserve the initial 10px visibility check and 120ms stagger; update repository rules.

### Validation

- Eleven radius, authentication and placeholder tests — passed.
- Headless Chrome initial/later reveal checks at nine sizes, five-card fixture and explicit stacked-card early-reveal assertion — passed.
- Footer checks at five widths and theme/toggle-colour checks across mobile/desktop breakpoints — passed.
- Sites production build — passed.

## v26.0.96 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 08:20:49 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Tune mobile theme timing and reveal visible card pairs in sequence

### Changed

- Shorten circular theme transitions to 360ms at widths up to 660px; retain 420ms desktop timing and feather-following slider colours.
- Reveal initial step/card pairs only when at least 10px of their step text or card is visible, with 120ms between starts.
- Apply a 40px card-only scroll trigger to all remaining pairs, including offscreen first cards, for any card count.
- Preserve reduced-motion handling and record the rules in repository instructions.

### Validation

- Eleven radius, authentication and placeholder tests — passed.
- Headless Chrome initial visibility/stagger checks at nine viewport sizes, step-only/sliver cases, 40px triggers, five-card fixture and reduced motion — passed.
- Footer checks at five widths, theme checks across the mobile breakpoint and feather-following colour checks — passed.
- Sites production build — passed.

## v26.0.95 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 06:48:33 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Improve playground controls and restore block review

### Changed

- Replace playground dropdowns with visible native radio groups for one-click selection, including frequently compared login states.
- Explain and dock the Style Inspector, reserve its readout dimensions, debounce hover updates, normalise nested typography targets and add Freeze/Resume.
- Document choice-control guidance and local inspection behaviour.

### Added

- Restore No Blur, Blur Only and Password Panel controls in a Blocks tab with independent strength/blur sliders, reset and clickable block bounds.
- Reuse saved placeholder geometry without measurement or production setting changes.

### Validation

- Playground browser checks — passed both agents/themes at mobile/desktop sizes, radio selection, inspector docking/freezing, block selection, blur settings and navigation containment.
- Preview isolation and saved-placeholder unit checks — 3 passed.
- Desktop/mobile screenshot review and Sites production build — passed.

## v26.0.94 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 06:39:35 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Synchronise toggle colours with the circular theme feather

### Fixed

- Keep the immediately moving moon slider light until the contracting feather reaches the control, then blend its surface, border and text with the reveal.
- Read the actual animated radius for colour progress and clear temporary token overrides after completion, interruption or reduced motion.
- Preserve existing radius easing, 420ms duration, 300px feather and slider movement.

### Validation

- Eleven radius-endpoint, authentication and placeholder tests — passed.
- Headless Chrome theme regression and paused-animation control-colour checks on both pages and mobile/desktop widths — passed.
- Sites production build — passed.

## v26.0.93 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 06:33:55 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add a local interactive component playground

### Added

- Add a local-only `/style-guide` route with shared theme/agent switches, viewport presets, held hover, persistent login states and simulated resource actions.
- Show live colour tokens, typography specimens and computed element colours, dimensions, font settings and spacing; distinguish browser-default headings and proposed components from production styles.
- Isolate samples in sandboxed frames, block navigation and submissions, and simulate clipboard/authentication operations.
- Document playground usage and add browser checks for interaction, mobile/desktop layouts and production exclusion.

### Validation

- Playground headless Chrome checks — passed both agents/themes, mobile/desktop, held states, copy feedback, width presets, hover styles and navigation containment.
- Auth, phone-preview and placeholder unit checks — 11 passed.
- Desktop/mobile screenshot review and Sites production build — passed.

## v26.0.92 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 06:27:31 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Restore gently eased radius motion for theme reveals

### Changed

- Replace intermediate viewport-coverage remapping with a continuous radius animation and gentle easing.
- Trim nearly invisible endpoint travel while retaining the 300px feather, inverse 420ms day/night reveals and selected-mode origins.
- Preserve the separate toggle animation, initial-load behaviour, rapid-toggle handling and reduced-motion fallback.

### Validation

- Eleven endpoint, authentication and placeholder tests — passed.
- Headless Chrome theme checks on login/main pages and mobile/desktop widths, two-keyframe interpolation, inverse direction, rapid toggles, initial preferences, reduced motion and fallback — passed.
- Sites production build — passed.

## v26.0.91 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 06:25:33 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Define contrasting semantic status palettes

### Changed

- Deepen light-mode success green and shift light-mode errors towards berry to separate them from Claude orange; share each role across both agents and pages.
- Define theme-specific mustard/gold warning tokens for future use and a neutral information alias.
- Document palette ownership and contrast checks; wait for actual success transitions in the login test rather than a fixed delay.

### Validation

- Status-colour headless Chrome checks — passed both pages, themes and agents, including surface and fill contrast.
- Login-state headless Chrome checks — passed four viewport widths and both themes.
- Auth and placeholder unit tests — 10 passed.
- Sites production build — passed.
- Resource layout checks — passed nine widths; the subsequent existing copy-width assertion failed before colour verification.

## v26.0.90 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 06:21:31 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Unify copy-failure feedback with the shared error colour

### Changed

- Apply the shared error token to failed prompt/QR copy labels, icons and applicable borders, then clear the failure state on reset or success.
- Document one error-colour authority per light/dark theme, shared by both agents and both pages.

### Validation

- Runtime source audit — only workshop-theme.mjs defines the error token and colour literals.
- Headless Chrome — passed login error colours, prompt/QR copy failures and reset in all light/dark and Codex/Claude combinations.
- Sites production build and placeholder checks — passed.

## v26.0.89 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 06:19:03 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Distinguish error colours and soften login state transitions

### Changed

- Use cooler crimson/rose semantic error colours to distinguish errors from Claude orange in both themes.
- Stop automatically selecting the password on failure; retain focus with an end caret and preserve deliberate text selection.
- Normalise browser autofill backgrounds and state-dependent text colours to prevent inset blue patches while preserving error/success bullets.
- Add 160ms recovery/success colour fades and spinner/check entrances, matching agent-accent timing. Keep incorrect-password feedback immediate and respect reduced motion.

### Validation

- Login-state Chrome checks — passed at four widths in both themes, including selection collapse, new error colours and success fade completion.
- Targeted Chrome checks — passed intermediate recovery colours, immediate error entry, reduced motion and forced autofill backgrounds/text colours for both themes and agents.
- Authentication and placeholder tests — 10 passed; agent-preference regression — passed.
- Headless visual review, Sites production build and PVS validation — passed.

## v26.0.88 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 06:11:20 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Match the password border and focus ring to the error state

### Changed

- Turn the password border and focused outline red after an incorrect password, preserving the error through refocus until editing.
- Restore the selected agent accent to the focused border and outline when the user edits the field; retain neutral borders when normally unfocused.
- Document error border and focus-ring behaviour alongside existing icon and password text rules.

### Validation

- Headless Chrome — passed red border/ring persistence and edit reset at 320, 390, 768 and 1440px for both themes and both agent accents.
- Sites production build and placeholder checks — passed.

## v26.0.87 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 06:09:48 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Apply consistent cursors across login and resource controls

### Fixed

- Use not-allowed for disabled controls, including login submission, and I-beam cursors for selectable text and text-entry fields.
- Keep enabled controls and their labels, icons, padding and tracks consistently on the hand cursor; prioritise disabled states over child styles.
- Clarify these complete-hit-target rules in repository instructions.

### Validation

- Ten authentication and placeholder tests — passed.
- Headless Chrome cursor audit on login/main pages at desktop/mobile sizes, native and ARIA-disabled states, child icons/labels, text and in-flight login — passed.
- Focus browser regression checks and Sites production build — passed.

## v26.0.86 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 06:05:22 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Compact login errors and retain password feedback until editing

### Changed

- Reduce the reserved error area to two lines with tighter margins, reducing the default field-to-button gap from 95px to 62px; shorten longer messages to fit supported narrow layouts.
- Preserve incorrect-password text, red padlock and red bullets until editing; focus alone no longer clears error styling.
- Restore the selected blue/orange accent for the normal padlock and input focus ring.
- Show green password bullets during successful opening and clear the input immediately before navigation.
- Update repository instructions and login feedback documentation.

### Validation

- Authentication and placeholder source tests — 10 passed.
- Login-state Chrome checks — passed at four widths in both themes, including stable panel height, edit-only reset and red/green password text.
- Login focus/scroll and agent-preference Chrome regressions — passed.
- Sites production build — passed.

## v26.0.85 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 06:02:32 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Synchronise QR reset feedback and clarify prompt copy labels

### Changed

- Show Prompt Copied on all three prompt-copy buttons.
- Fade QR success text and background together when no longer hovered; keep the obscured Copy Link state while hovered or keyboard-focused.
- Preserve existing theme motion pending review of a simpler radius-based approach.

### Validation

- Ten authentication and placeholder tests — passed.
- Chrome QR reset checks for hovered and non-hovered states, all three prompt labels and button interaction regressions — passed.
- Sites production build — passed.

## v26.0.84 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 05:58:34 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Move login progress into the input icon and reserve error space

### Changed

- Swap the input padlock for a rotating Lucide Loader Circle during checking and a green Check on success. Keep progress/success text in a visually hidden live region and preserve reduced-motion support.
- Show only errors beneath the field, reserve three lines to prevent panel resizing, and increase label/field and field/error spacing to 12px and 16px.
- Keep the padlock red after a wrong password until typing or refocusing/clicking/tapping the field restores the blue icon and input focus styling.
- Retain the green success outline and submit button; preserve initial focus and keyboard access.
- Stop automatically opening previews after builds; deliver the URL and local password for user review instead.

### Validation

- Authentication and placeholder tests — 10 passed.
- Login-state Chrome checks — passed at four mobile/tablet/desktop widths in both themes, including icon swaps, hidden announcements, stable panel height, error reset and reduced motion.
- Login keyboard/viewport checks, shared focus checks and agent-preference Chrome checks — passed.
- Headless mobile visual review and Sites production build — passed.

## v26.0.83 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 05:55:21 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine QR feedback and remove theme toggle motion delays

### Fixed

- Keep the QR overlay inside its image bounds and reuse prompt-copy success styling, Lucide Check and animation timings.
- Separate the moving theme toggle from the old page snapshot and start its selection immediately.
- Accelerate feathered coverage calculations and temper the easing endpoints with 20% linear progress; preserve inverse 420ms day/night motion.

### Validation

- Eleven coverage, authentication and placeholder tests — passed.
- Chrome theme-transition, QR bounds/copy/feedback and button-interaction checks — passed.
- Visual QR inspection and Sites production build — passed.

## v26.0.82 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 05:48:31 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Ease visible theme coverage and add QR link copying

### Changed

- Apply theme easing to visible feathered viewport coverage while preserving inverse night motion, selected-mode origins and reduced-motion handling.
- Show pointer cursors on all enabled buttons and selector tracks.
- Replace QR navigation with a Lucide Copy Link hover/focus action, clipboard fallback and success/failure feedback.
- Update and independently decode the QR for the verified Sites URL; refresh saved background geometry.

### Validation

- Coverage tests and ten authentication/placeholder tests — passed.
- Chrome theme-transition, QR-copy/cursor and desktop/mobile focus checks — passed.
- QR decoding and visual hover-state inspection — passed.
- Sites production build — passed.

## v26.0.81 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 05:32:24 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Standardise focus placement and keyboard-only control rings

### Changed

- Track Tab navigation separately from pointer input so controls retain real focus without click/tap rings; preserve visible text-input focus.
- Transfer both selectors’ focus to the selected mode without cancelling their movement.
- Share invisible heading focus across login and native dialog/popover openings, with a helper for future custom panels.
- Record all focus, first-Tab, input and panel-opening rules in repository instructions.

### Validation

- Focus Chrome checks — passed desktop/mobile keyboard, mouse, touch, selector gaps, input focus, login headings and native dialog/popover openings.
- Login, button-interaction, agent-preference and theme-transition browser regressions — passed.
- Sites production build and placeholder checks — passed.

## v26.0.80 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 05:26:30 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Use consistent regular weight for every login status

### Changed

- Remove the success-message semibold override so all login status text uses weight 400 at every viewport size; retain weight 600 for the submit button.
- Update the documented status typography and verify computed weights across all message states.

### Validation

- Login-state Chrome checks — passed at 320, 390, 768 and 1440px in both themes, including status weight 400 and button weight 600.
- Sites production build and placeholder checks — passed.

## v26.0.79 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:58:33 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Pair opposite theme easing with an immediate first-step entrance

### Changed

- Use a fast-start, slow-finish sun reveal and its exact time-reversed moon contraction, preserving 420ms duration, 300px feathering and destination origins.
- Animate Step 1 and its card together on initial load regardless of viewport position, retaining card-triggered reveals for subsequent steps and immediate visibility under reduced motion.

### Validation

- Theme-transition Chrome checks — passed asymmetric easing with reversed night playback, origins, mobile/desktop layouts, initial preferences and reduced motion.
- Footer/reveal Chrome checks — passed first-pair animation below the fold on a short mobile viewport, later scroll triggers and responsive layouts at five widths.
- Sites production build and placeholder checks — passed.

## v26.0.78 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:52:33 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Reverse the dark-mode reveal into the moon button

### Changed

- Make dark mode contract the outgoing light snapshot into the moon button, reversing the light-mode expansion from the sun.
- Preserve shared easing, 420ms duration, 300px feathering and reduced-motion behaviour.

### Validation

- Theme-transition Chrome checks — passed inverse direction, destination origin, desktop/mobile layouts, rapid changes, initial load and reduced motion.
- Reversed mobile reveal midpoint — visually reviewed.
- Sites production build and placeholder checks — passed.

## v26.0.77 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:47:09 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Ease the theme reveal from the destination mode icon

### Changed

- Use a more pronounced ease-in/ease-out curve for the circular reveal while retaining its 420ms duration and 300px feather.
- Centre the reveal on the destination sun/moon button, including activation through the opposite button or keyboard.

### Validation

- Theme-transition Chrome checks — passed destination-origin and easing assertions on both pages at mobile/desktop widths, rapid toggles, saved preferences, reduced motion and fallback.
- Sites production build and placeholder checks — passed.

## v26.0.76 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:43:16 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Widen the circular reveal feather to 300 pixels

### Changed

- Increase the circular theme-reveal feather from 140px to 300px and extend the final radius to fully cover viewport corners.
- Preserve reveal timing, slider phases, agent-colour easing and instant initial preferences.

### Validation

- Theme-transition Chrome checks — passed mobile/desktop reveals, horizontal containment, rapid toggles, saved preferences, reduced motion and fallback.
- Sites production build and placeholder checks — passed.

## v26.0.75 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:38:42 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Round shared slider rebound and settling phases to 60ms

### Changed

- Use 160ms travel followed by 60ms rebound, 60ms return and 60ms settling for both agent and day/night sliders: 340ms total.
- Preserve movement distances and easing, the 160ms accent blend and the 140px feathered theme reveal.

### Validation

- Theme-transition Chrome checks — passed, including exact slider phase timings, accent blending, saved preferences, reduced motion and fallback.
- Sites production build and placeholder checks — passed.

## v26.0.74 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:36:00 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Widen the circular reveal feather to 140 pixels

### Changed

- Broaden the circular theme reveal from a 48px to a 140px feathered edge and extend its final radius to ensure complete coverage.
- Preserve the existing reveal and slider timings.

### Validation

- Theme-transition Chrome checks — passed desktop/mobile reveals, agent blending, rapid toggles, saved preferences, reduced motion and fallback.
- Sites production build and placeholder checks — passed.

## v26.0.73 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:31:55 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Tune toggle travel and feather the theme reveal

### Changed

- Set shared agent/day-night slider travel and agent accent blending to exactly 160ms, preserving rebound distances, easing and phase durations.
- Replace the hard circular clipping boundary with a 48px feathered radial mask; retain the 420ms reveal, reduced-motion handling and soft fallback.
- Contain horizontal overflow at the root and body while preserving vertical scrolling. The reported iPhone-only scroll was not reproduced in Chrome; verify on device.

### Validation

- Theme-transition Chrome checks — passed feathered mask, 160ms travel/blend, unchanged rebound phase lengths, root horizontal containment, saved preferences and reduced motion.
- Login and footer/reveal Chrome regressions — passed across mobile and desktop widths.
- Mobile feathered-reveal screenshot — visually reviewed.
- Sites production build and placeholder checks — passed.

## v26.0.72 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:26:25 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Synchronise accent blending with the slider arrival

### Changed

- Shorten agent-accent blending from 280ms to 165.6ms, matching the slider’s arrival at 46% of its 360ms animation before rebound and settling.
- Derive both timings from shared constants to preserve synchronisation; retain theme reveal and fallback durations.

### Validation

- Theme/agent transition Chrome checks — passed, including derived accent timing, initial-load preferences, reduced motion and circular-reveal fallback.
- Sites production build and placeholder checks — passed.

## v26.0.71 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:19:07 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Pair circular theme reveals with soft agent accent transitions

### Changed

- Reveal light/dark themes through a 420ms circle expanding from the toggle, with a soft-colour fallback where View Transitions are unavailable.
- Blend agent-dependent accents over 280ms while preserving selector movement and unrelated animations.
- Apply saved colours immediately on initial load; honour reduced motion and resolve rapid toggles to the latest preference.
- Preserve the separately completed login success ring and semantic green submit state.

### Validation

- Theme-transition Chrome checks — passed both pages at mobile/desktop widths, circular duration, rapid toggles, soft agent colours, instant saved preferences, reduced motion and fallback.
- Agent-preference and login Chrome regressions — passed.
- Mobile circular-reveal screenshot — visually reviewed.
- Sites production build and placeholder checks — passed; no geometry refresh needed for motion-only changes.

## v26.0.70 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:14:10 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Preserve the login success ring and turn the submit button green

### Fixed

- Preserve the full green input outline after a successful mouse submission, even when focus has left the password field; retain green border and padlock.

### Changed

- Turn the successful submit button semantic green with theme-appropriate contrasting text during the opening transition.

### Validation

- Login-state Chrome checks — passed mouse and keyboard success-ring, padlock and button colour assertions on mobile and desktop in both themes.
- Sites production build and placeholder checks — passed.

## v26.0.69 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:12:49 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Soften theme transitions and remove the held-button border

### Changed

- Remove the inset accent border from held buttons while retaining keyboard focus indicators and existing press/toggle motion.
- Animate light/dark theme colours over 280ms on login and resource pages, including the theme-dependent brand filter, without altering layout or unrelated animations.
- Continue rapid reversals from their current colours, apply saved themes immediately on load, and skip/cancel theme animation for reduced motion.
- Preserve the separately completed login icon and status-spacing refinements.

### Validation

- Theme-transition Chrome checks — passed login/main interpolation, duration, rapid reversal, reload and reduced-motion scenarios.
- Button interaction Chrome checks — passed touch hold/release, keyboard focus and selectable content.
- Agent-preference and login Chrome regressions — passed.
- Sites production build and placeholder checks — passed; no block remeasurement required for colour/motion changes.

## v26.0.68 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:08:34 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Balance login status typography and align Lucide feedback icons

### Changed

- Replace the error Circle X with the installed Lucide X definition.
- Increase login status text to 14px with a 21px line height and a 12px gap below the input; preserve the system font, regular message weight and semibold success.
- Centre status icons against the first text line and preserve 16px spacing before the submit button.

### Validation

- Chrome icon alignment audit — passed at 320, 390, 768 and 1440px in both themes for password, status, agent-selector, copy, logout and card-heading icons.
- Mobile status screenshot review — passed; wrapped message aligns with the plain X.
- Login-state and focus/keyboard/scroll regression Chrome checks — passed.
- Sites production build and placeholder checks — passed.

## v26.0.67 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:05:15 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Clarify login states with Lucide icons and friendly errors

### Changed

- Show neutral checking feedback with a rotating Lucide Loader Circle, green success with a Check, and red errors with a Circle X; respect reduced-motion preferences.
- Validate empty passwords inline and reserve shaking for incorrect passwords. Keep network and service failures distinct from invalid field values.
- Replace technical exceptions with friendly messages and preserve the styled login page during service outages where possible.
- Return the actual remaining rate-limit window, update the retry message and re-enable submission when the wait ends.
- Document login feedback and icon conventions.

### Validation

- Authentication, placeholder and preview-isolation source tests — 11 passed.
- Login-state Chrome checks — passed loading colours, icons, reduced motion, empty/wrong passwords, network/service/malformed errors, retry countdown and success across mobile/desktop and both themes.
- Login focus/keyboard/scroll regression and agent-preference Chrome checks — passed.
- Sites production build and PVS validation — passed.

## v26.0.66 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:59:24 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Prevent button text selection and add held-press feedback

### Changed

- Disable button-label selection and iOS touch callouts on both pages without disabling selection of content or prompt code.
- Add a subtle held-press scale and accent inset to regular buttons, retaining native activation, keyboard focus and existing segmented-toggle motion.
- Clear held state on release and cancellation; respect reduced motion with static feedback.
- Document native iPhone highlight fallback and preserve the existing agent-derived selection colours.

### Validation

- Button interaction Chrome checks — passed touch hold/release, button descendant styling, selectable prompt/body text, keyboard activation and reduced motion.
- Agent-preference Chrome regression checks — passed.
- Authentication and placeholder source tests — 10 passed.
- Sites production build — passed. Native iPhone interaction awaits device confirmation.

## v26.0.65 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:50:17 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Match logout text to the semibold button style

### Changed

- Set Log Out to font weight 600, matching Copy Prompt and agent-selector buttons, while preserving its 14px text and 18px icon.

### Validation

- Footer/reveal Chrome checks — passed at five widths, including wrapping and alignment.
- Sites production build and placeholder checks — passed.

## v26.0.64 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:46:31 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Widen mobile step accent lines to 120 pixels

### Changed

- Widen mobile step accent lines from 112px to 120px, preserving desktop connectors, and refresh saved background geometry.

### Validation

- Footer/reveal Chrome checks — passed at five widths, including 120px mobile lines.
- Computed typography and icon audit — verified at 320, 390 and 1440px; Log Out retains an 18px icon beside 14px text, compared with Copy Prompt at 18px/12px and agent selectors at 20px/14px.
- Sites production build and placeholder checks — passed.

## v26.0.63 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:43:09 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Left-align the footer action when it wraps below the text

### Fixed

- Left-align Log Out with the footer text when its form wraps onto a separate row, preserving right alignment when both fit alongside each other.
- Document the responsive alignment rule and check both arrangements in browser validation.

### Validation

- Footer/reveal Chrome checks — passed at five desktop/mobile widths.
- Agent-preference Chrome checks — passed, including responsive footer alignment and authentication flows.
- Sites production build and placeholder checks — passed.

## v26.0.62 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:40:44 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine footer wrapping and card-driven step reveals

### Changed

- Keep each footer text group intact and hide the separator on wrapping; allow the right-aligned logout action onto a separate row when needed.
- Add the installed Lucide Log Out doorway-and-arrow icon to the footer action and preserve it in standalone previews.
- Trigger paired step/card reveals from card visibility at a 48px viewport inset, preserving reduced-motion behaviour.
- Widen mobile step lines to 112px and refresh saved placeholder geometry.

### Validation

- Authentication and placeholder source tests — 10 passed.
- Footer/reveal Chrome checks — passed at 320, 390, 660, 768 and 1440px, including wrap separators, overflow, card trigger and reduced motion.
- Agent-preference Chrome checks — passed, including login/logout and responsive footer alignment.
- Sites production build — passed; generated server bundle displays v26.0.62.

## v26.0.61 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:36:05 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Adopt CMOS 18 title case and centre the footer action

### Changed

- Audit headings, raw uppercase labels, subtitles, control labels, button text and dynamic states against CMOS 18; lowercase the four-letter preposition in all prompt-panel headers for both agent choices.
- Record only title-case categories and grammatical rules in repository instructions, with official CMOS references and preservation rules for brands and technical identifiers.
- Vertically centre the right-aligned footer action against the copyright/version block, including wrapped text on mobile.
- Refresh visible block geometry for the prompt-header text change.

### Validation

- Authentication and placeholder source tests — 10 passed.
- Agent-preference browser checks — passed both themes, login/logout/reload, agent-dependent labels and footer right-edge/vertical-centre alignment at 320, 390, 768 and 1440px.
- Interface source audit — completed using CMOS 18 official guidance; unchanged short pronouns, verbs and adverbial particles retain capitals.
- Sites production build — passed.

## v26.0.60 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:27:54 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Complete the interface title-case audit

### Changed

- Title-case the three step subtitles, agent-selector label, prompt-panel labels and accessible copy-button names.
- Store the QR caption and Wavelength wordmark in title case and retain their uppercase appearance through CSS.
- Expand repository instructions to cover headings, subtitles, button states and accessible names, input/control labels and raw uppercase labels.
- Refresh visible block geometry for the changed text widths.

### Validation

- DOM audit of both pages — passed raw heading, subtitle, uppercase label, button-name and field-label checks; dynamic button states inspected in source.
- Authentication and placeholder source tests — 10 passed.
- Agent-preference browser checks — passed both themes, four widths, preference persistence, login/logout and footer alignment.
- Sites production build — passed.

## v26.0.59 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:14:58 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Persist agent accents and refine the footer and preview handoff

### Changed

- Persist the Codex or Claude Code choice across login, logout and reload, apply it before paint on both pages, and synchronise changes between tabs. Default to Codex.
- Centralise branded accents and derived colour tokens for text, links, focus rings, button fills, card tints and icon ink; preserve neutral surfaces and semantic feedback colours.
- Move the title-cased Log Out button to the footer's bottom right, retaining version/copyright at the left.
- Require clearly formatted preview links with the active local password in a copyable code block in project instructions.
- Limit block refreshes to changes affecting the visible blurred background, permit necessary refreshes without separate approval and retain the previous saved geometry for this below-background footer change.
- Preserve footer geometry in the standalone resources fixture with a disabled Log Out button.

### Validation

- Authentication and placeholder source tests — 10 passed.
- Login browser checks — passed focus, keyboard viewport, scroll containment and fallback checks at four widths in both themes.
- Agent-preference browser checks — passed real login/logout/reload persistence, both themes, prompt selection, cross-tab sync, invalid/denied storage and footer alignment at four widths.
- Login Sun, Moon, Lock and Check geometry — matched the installed Lucide icon definitions.
- Sites production build — passed with the original saved background geometry.

## v26.0.58 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:02:10 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add isolated local phone-preview authentication

### Added

- Add `preview:phone` to exercise the real sign-in, authenticated page and logout flows over local Wi-Fi.
- Generate a fresh preview password and in-memory SQLite session store for every server process without reading production credentials.
- Adapt cookies only at the local HTTP boundary, using an independent preview cookie name; leave production Secure cookies and authentication unchanged.
- Document local startup, credential rotation and test isolation in the website README.

### Validation

- Authentication and placeholder source tests — 10 passed.
- Local-preview integration test — passed login, logout, session isolation and production-handler rejection of the local credential.
- Chrome LAN preview — passed sign-in, success transition, unlocked scrolling, reload persistence and logout.
- Sites production build — passed; generated JavaScript, HTML and JSON contain neither preview authentication code nor the generated test password.

## v26.0.57 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 12:57:06 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Extend locked-page scroll containment across browser fallbacks

### Fixed

- Apply a server-rendered root scroll-lock class without depending on CSS `:has()`, and explicitly size the fixed body to the viewport.
- Prevent panel-edge overscroll and provide a legacy viewport-height fallback while preserving panel scrolling and normal scrolling after unlock.

### Validation

- Authentication and placeholder source tests — 10 passed.
- Chrome login checks — passed at four widths in both themes, including desktop wheel, Page Down, End, programmatic background-scroll attempts, keyboard-sized viewport scrolling, absence of VisualViewport and unlocked-document scrolling.
- Sites production build — passed; Safari and Firefox engines are unavailable locally and remain unverified.

## v26.0.56 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 12:50:17 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Lock background scrolling and refine login and pre-header copy

### Fixed

- Fix the locked body in place and disable root overscroll while preserving scrolling inside the password panel.

### Changed

- Use “Workshop Resources”, “Unlock Resources” and “Opening Resources…” on the login panel.
- Title-case raw pre-heading text and theme-button labels while retaining uppercase pre-heading display.
- Refresh the website footer version display without changing background geometry.

### Validation

- Authentication and placeholder source tests — 10 passed.
- Chrome login checks — passed at four widths in both themes; focused-field scrolling moved the panel while the background stayed stationary in a simulated keyboard-sized viewport.
- Sites production build — passed; physical-device scroll verification remains with the refreshed phone preview.

## v26.0.55 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 12:39:59 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Align login typography and spacing with the resource page

### Changed

- Place “Workshop access” beside the day/night toggle, vertically centred, and remove Wavelength from the pre-header.
- Title-case “Your Workshop Resources” and reuse the resource page's H2 style: 32px on desktop and 28px on mobile, with shared weight, tracking and line height.
- Reuse shared pre-header and body classes; align button and feedback typography with existing control and status styles.
- Use a 24px toolbar gap, 12px heading-to-copy gap, 24px copy-to-label gap, 8px label-to-field gap and the main page's responsive 32px/24px card padding. Reserve feedback space below the password field.

### Validation

- Authentication and placeholder source tests — 10 passed; background geometry unchanged.
- Chrome login regression checks — passed at four widths in both themes, including heading focus, Tab order, keyboard simulation and error recovery.
- Live phone-preview measurements — passed vertical centring and spacing checks at 320, 390, 768 and 1440px; desktop/mobile screenshots visually inspected.
- Sites production build — passed.

## v26.0.54 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 12:29:43 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Align login styling and fix keyboard focus and mobile visibility

### Changed

- Align the login panel with shared site accent colours, heading typography, body copy and card corners.
- Remove the session-expiry sentence from login copy and record the fixed seven-day expiry in repository instructions.

### Fixed

- Focus the heading invisibly on initial load, followed by one theme-toggle Tab stop, the password field and the unlock button on desktop and mobile.
- Fit the scrollable login overlay to the visual viewport and keep the password field visible when the mobile keyboard reduces available space.
- Disable the actual submit button during authentication instead of the first theme button.

### Validation

- Authentication and placeholder source tests — 10 passed; saved background geometry unchanged.
- Chrome login regression checks — passed at 320, 390, 768 and 1440 pixels in both themes, including focus order, keyboard theme switching, simulated visual-viewport shrink/pan, failed-login recovery and overflow.
- Rendered desktop/mobile screenshots — visually inspected; physical mobile keyboards remain unverified.
- Sites production build — passed; generated server bundle contains the updated login behaviour.

## v26.0.53 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 12:21:50 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Archive blur testing and make block refreshes manual-only

### Changed

- Move the blur/strength preview generator and local generated artefacts into `website/_archive/` and remove automatic tester generation from development/build startup.
- Add explicit `blocks:measure` and `test:blur-preview` commands; normal builds never launch geometry measurement or the archived tester.
- Preserve saved geometry and production 40% strength/4px blur defaults; retain stale-layout checks that request a manual refresh.
- Update repository instructions and the website README with the manual-only workflow and keep archived HTML/screenshots out of Git.

### Validation

- Archived generator syntax and recovery checks — passed; no live tester remains at its former script/output paths.
- Manual blur-preview command — passed word geometry, cap-height, icon, QR-padding, slider, theme and responsive-layout checks.
- Sites production build and placeholder source checks — passed without running measurement or the archived tester.

## v26.0.52 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:20:05 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Make QR corners concentric with the outer card

### Fixed

- Derive the QR link radius from the outer card radius minus its padding and border: 16px minus 14px minus 1px gives a 1px inner radius.
- Inherit that radius on the QR image so its outline and the offset keyboard focus ring follow the same corner geometry.

### Validation

- Authentication and placeholder source tests — 10 passed.
- Chrome focus checks — passed for QR image/link radii, Tab order and code-region focus spacing; QR focus screenshot visually inspected.
- Production build — passed, retaining existing dimensions and placeholder geometry.

## v26.0.51 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:17:57 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Correct QR corners and add external code focus spacing

### Fixed

- Give the QR image outline a 16px radius matching its link and outer card, so the focus ring follows the image corners.
- Offset code-region focus rings by 4px, matching buttons, with sharp upper corners and rounded lower corners. Allow the external rings to remain visible while retaining rounded content corners.

### Validation

- Authentication and placeholder source tests — 10 passed.
- Chrome checks — passed for QR image and link radii, 4px code focus offsets, keyboard order, themes, copy controls and four responsive widths.
- Screenshots — inspected for QR and scrolled code-region focus rings.
- Production build — passed, reusing existing placeholder geometry.

## v26.0.50 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:14:37 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Match focus rings and reorder keyboard navigation

### Fixed

- Match the QR link focus radius to the outer card's 16px radius.
- Trace each complete scroll viewport with sharp top corners and rounded bottom corners, keeping its focus ring visible while scrolling.
- Place the QR link between the theme and agent controls in native Tab order, preserving the visible layout and refreshing placeholder geometry for the structural change.

### Validation

- Authentication and placeholder source tests — 10 passed.
- Chrome keyboard and focus checks — passed for forward/reverse navigation, mobile QR skipping, and all three scrolled prompt regions.
- Chrome word geometry and theme checks — passed at four viewport widths.
- Production build — passed with the v26.0.50 display.

## v26.0.49 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:09:30 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Set the blur default to 4px with 40% block strength

### Changed

- Reduce the background blur default from 5px to 4px in the login renderer and preview slider, retaining 40% block strength.
- Update the documented default and browser-check expectations without remeasuring geometry.

### Validation

- Renderer and generated preview default assertions — passed for 40% strength and 4px blur.
- Sites production build and placeholder checks — passed; existing geometry reused without remeasurement.

## v26.0.48 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 02:04:20 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add blur tuning and reuse measurements for unchanged layouts

### Changed

- Set the opaque block colour-blend default to 40% and add an independent 0–20px background-blur preview slider, initially 5px.
- Reuse existing geometry when the layout revision matches, instead of remeasuring on every build or invalidating it for unrelated source edits.
- Document word, cap-height, baseline, icon-set, QR-padding and colour rules in the website README; require layout-only remeasurement in repository instructions.

### Validation

- Authentication and placeholder source tests — 10 passed, including layout-revision mismatch rejection and reuse after non-layout edits.
- Chrome checks — passed for both sliders, unchanged word geometry, cap heights, icon sets, QR padding, themes and responsive layout at four widths.
- Existing measured markup, word count and icon dimensions — byte-for-byte/value comparison passed; no remeasurement performed.
- Sites production build — passed and explicitly reused the existing layout geometry without launching Chrome measurement.

## v26.0.47 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:56:57 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Match icon blocks by set and preserve the QR white border

### Changed

- Replace background SVG icons with measured blocks, matching dimensions within the step, agent-logo, theme and copy-control sets.
- Replace the QR pattern with a block while retaining its measured 48px white quiet zone inside the 540px source image, including in dark mode.
- Apply the existing 35% colour blend and preview slider to the new blocks without changing the card surfaces or word geometry.

### Validation

- Chrome checks — passed for matched icon sizes, QR white-border pixels, unchanged text geometry and blend controls at four viewport widths.
- Authentication and placeholder source tests — 10 passed.
- Sites production build — passed with automatic geometry generation and stale-source checks.

## v26.0.46 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:51:16 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Align word blocks to a consistent cap height and baseline

### Changed

- Paint each placeholder using its text style's measured capital-H height and common alphabetic baseline instead of each word's individual glyph bounds.
- Apply the same height rule to monospaced prompt words and emoji placeholders while preserving measured widths, line boxes, wrapping and the 35% colour blend.

### Validation

- Chrome geometry checks — passed for cap height, baseline, blend slider and unchanged word positions and widths at 1440, 768, 390 and 320px.
- Authentication and placeholder source tests — 10 passed.
- Sites production build — passed with regenerated geometry and source fingerprint checks.

## v26.0.45 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:47:30 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Quicken toggle release and limit held stretch by pixel width

### Changed

- Shorten the shared release animation from 400ms to 360ms while preserving the sharp first rebound and smooth final settle.
- Cap held stretching at 6px of added width, with a 14% maximum, so the wide app picker feels consistent with the compact theme toggle.
- Reduce held translation to 4px and vertical compression to 6%, and refresh the measured backdrop.

### Validation

- Chrome theme and interaction checks — passed, including measured held stretch on both controls, 360ms release timing, constant-speed travel, immediate rebound, whole-track activation and keyboard holds.
- Sites production build and measured-placeholder checks — passed.

## v26.0.44 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:41:27 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Speed up toggle motion and soften only the final settling

### Changed

- Shorten both toggles' shared release animation from 520ms to 400ms, preserving constant-speed travel and a sharp first rebound.
- Ease only the small final return and settling motion, retaining held stretching, full-track activation and reduced-motion support.
- Refresh the measured login backdrop for the current resource-page fingerprint.

### Validation

- Chrome theme and interaction checks — passed, including measured constant-speed initial motion, immediate first reversal, 400ms release timing, gap activation, holds and shared motion.
- Sites production build and measured-placeholder checks — passed.

## v26.0.43 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:38:42 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Measure every word and soften blocks with opaque colour blends

### Changed

- Replace estimated word widths and dummy prompt lines with Chrome-measured word geometry, retaining icons, button sizes and responsive wrapping.
- Use opaque 35% foreground colour blends against each containing surface; preserve card and button backgrounds and add a local Block strength slider.
- Generate geometry automatically during development/build startup and reject stale source fingerprints.
- Separate the resource template from the login renderer and add Playwright as a build-time development dependency.

### Validation

- Authentication and placeholder source tests — 10 passed.
- Chrome word comparison — all 1,205 desktop words and 1,202 mobile words match source positions and widths within 1px at 1440, 768, 390 and 320px.
- Chrome blend-slider checks — passed in both themes; card backgrounds remain unchanged and block opacity remains 1.
- Existing Chrome placeholder, theme and interaction checks — passed.
- Sites production build — passed, including automatic geometry generation and stale-source checks.

## v26.0.42 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:28:36 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Make toggles rebound sharply and activate across their entire track

### Changed

- Move both toggle indicators at constant speed to the overshoot and reverse immediately, removing pre-impact braking and eased rebound turns.
- Activate the toggle from its centre gap and outer padding, including held stretching and release, through the shared controller.
- Preserve the 520ms release timing, keyboard behaviour and reduced-motion support.

### Validation

- Chrome interaction checks — passed, including measured equal-distance travel and immediate reversal, gap and padding activation at desktop and mobile widths, held states, cancellation, keyboard access and shared motion.
- Sites production build and its placeholder checks — passed.

## v26.0.41 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:24:59 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Keep the blur background aligned with the resources layout

### Changed

- Generate the inert login background from the current resources structure and CSS, replacing the outdated two-card layout with the three alternating steps.
- Remove source text, links, scripts and non-layout attributes before delivering decorative placeholders.
- Refresh standalone previews on development and build startup, open the login preview in blur mode, and embed its branding assets.
- Run layout synchronisation and content-removal regression checks during builds; document the automatic update path.

### Validation

- Authentication and placeholder source tests — 10 passed.
- Chrome theme and interaction suite — passed.
- Chrome blur checks — passed at 1440, 768, 390 and 320px in both themes, including matching column geometry, empty text, overflow and password panel checks.
- Sites production build — passed.

## v26.0.40 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:19:43 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Carry toggle momentum through the destination before rebounding

### Changed

- Cross the destination at full travel speed before braking at the 6px overshoot and rebounding, instead of easing towards the destination.
- Match the initial overshoot velocity to each toggle's travel distance through the shared controller, preserving the 520ms release and held stretch.

### Validation

- Chrome theme and interaction checks — passed for both shared controls, mouse and keyboard holds, cancellation, reduced motion, contrast and matching heights.
- Sites production build — passed.

## v26.0.39 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:17:06 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Use familiar app logos with coding-tool labels

### Changed

- Replace the specialised Codex icon with the ChatGPT knot and the Claude Code icon with the Claude starburst in the workshop agent selector.
- Retain the Codex and Claude Code labels, existing accent colours and theme-aware icon styling; document the logo sources.

### Validation

- Authentication tests — passed (8/8).
- Chrome theme and interaction checks — passed for both agents and themes at four viewport widths.
- Sites production build — passed.

## v26.0.38 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:15:16 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Restore snappy toggle timing with a restrained stronger bounce

### Changed

- Restore the shared release duration to 520ms, reduce the exaggerated landing squash and use 6px, 3px and 1px diminishing rebounds.
- Preserve held stretching, release activation, shared easing, equal heights and reduced-motion support.

### Validation

- Chrome theme and interaction checks — passed, including shared animation frames, duration, mouse and keyboard holds, cancellation, both themes, matching heights and contrast.
- Sites production build — passed.

## v26.0.37 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:13:01 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Outline the QR image with the shared card border colour

### Changed

- Add a 1px keyline around the white QR image using the same theme-aware border variable as the outer card, preserving image dimensions and spacing.

### Validation

- Chrome computed-style and visual checks — passed in both themes; keyline matches the card border, image remains white and 150px wide, and card padding remains 14px.
- Sites production build — passed.

## v26.0.36 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 01:10:51 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add held toggle stretches and stronger release bounces

### Changed

- Stretch either toggle while held without changing state, then slide and bounce on release through one shared controller.
- Add an eased launch, stronger landing squash and progressively smaller rebounds, retaining reduced-motion support and equal control heights.
- Support held Space and Enter activation and restore the indicator when a press is cancelled.
- Lighten the shared QR-card and code-panel surface to #F8F9FA while preserving white QR pixels and the dark palette.

### Validation

- Authentication source tests — 8 passed.
- Chrome theme checks — passed, including held mouse and keyboard states, release activation, outside-release cancellation, shared motion, equal heights, both themes and agents, persistence and contrast.
- Sites production build — passed.

## v26.0.35 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 12:57:12 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Unify toggle motion and light-mode content surfaces

### Changed

- Link the QR card and code panel backgrounds through one light-grey content-surface variable, retaining the white QR image, spacing and dark palette.
- Share the same sliding-indicator controller, stretch, overshoot, easing and reduced-motion handling between the theme and agent toggles.
- Make clicking either half reverse the current state, including clicks on the selected half, and give both toggles one shared height rule.

### Validation

- Authentication source tests — 8 passed.
- Chrome theme checks — passed, including equal 50px heights at desktop and mobile widths, either-half reversal, matching animation timings and transforms, both themes and agents, copying, persistence and reduced motion.
- Sites production build — passed.

## v26.0.34 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 12:46:51 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add a persistent light and dark theme toggle

### Added

- Add a sun-left, moon-right Lucide theme selector beside the branding and inside the password panel, with an explicit active state and keyboard support.
- Follow the device theme initially, remember explicit choices and synchronise open tabs without flashing the default theme.
- Add dark surfaces, reversed text, accent-tinted cards, readable feedback and white monochrome branding while keeping QR codes scannable.

### Changed

- Share theme tokens across the current resource layout and password screen, preserving installation prompts, agent selection, copy feedback and scroll reveals.
- Retain working theme controls in the standalone password preview and contain narrow-screen placeholder overflow.

### Validation

- Authentication source tests — 8 passed.
- Chrome theme checks — passed for both agents and themes at 1440, 768, 390 and 320 pixels, keyboard operation, copying, text contrast, saved preferences, cross-page and cross-tab updates, storage denial, nonce policy and reduced motion.
- Sites production build and source, preview and bundle version displays — passed.

## v26.0.33 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 12:37:23 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Remove language labels from installation command fences

### Changed

- Keep plain triple-backtick fences around the installer commands without a language label in displayed and copied prompts.

### Validation

- Chrome command-fence, motion and reduced-motion checks — passed.
- Sites production build and source, preview and bundle version displays — passed.

## v26.0.32 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 12:33:33 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Reverse step reveal directions and clarify command formatting

### Changed

- Reveal the Step 1 and Step 3 pairs from the left and the Step 2 pair from the right.
- Label installer command fences as shell rather than bash to avoid implying that participants need Bash.

### Validation

- Chrome reveal directions, toggle animation, shell command fences and reduced-motion checks — passed.
- Sites production build and source, preview and bundle version displays — passed.

## v26.0.31 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 12:31:52 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Reveal each step heading and card together from the same side

### Changed

- Bring the heading and card into view together from the right for Steps 1 and 3 and from the left for Step 2.

### Validation

- Chrome paired reveal directions, toggle animation, command fences and reduced-motion checks — passed.
- Sites production build and source, preview and bundle version displays — passed.

## v26.0.30 — 2026-10-17

**Built at:** Sat 17 Oct 2026 at 12:29:15 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine heading hierarchy, scrolling and interactive motion

### Changed

- Reduce step headings to 32 pixels on desktop and 28 pixels on mobile for clearer hierarchy beneath the page title.
- Put skill installation commands inside Markdown bash fences in the displayed and copied prompts.

### Added

- Add a sliding agent-toggle indicator with a restrained stretch and bounce.
- Reveal each step heading and card from opposite sides as its row enters the viewport, alternating by layout position and respecting reduced-motion preferences.

### Fixed

- Restore native wheel, touch and keyboard scrolling inside code blocks by removing the page-level gesture overrides.

### Validation

- Chrome responsive checks at nine widths, copy actions in both themes, fixed feedback dimensions, code-block scrolling and page scrolling — passed.
- Chrome toggle motion, indicator alignment, scroll reveals, fenced commands and reduced-motion checks — passed.
- Authentication tests — 8 passed.
- Sites production build and source, preview and bundle version displays — passed.

## v26.0.29 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 09:18:56 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Give the introduction more space beside the QR code

### Changed

- Increase the gap between the introductory content and QR card from 24 to 40 pixels, reusing the page’s existing larger spacing.
- Add an exact 40-pixel gap assertion to the responsive browser checks.

### Validation

- Chrome at 320, 390, 660, 661, 700, 800, 1008, 1024 and 1440 pixels — passed QR gap, responsive visibility, heading hierarchy and overflow checks.
- Copy controls in both agent states, fixed feedback dimensions and vertical scrolling — passed.
- Sites production build — passed.

## v26.0.28 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 09:16:19 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Strengthen the page title hierarchy above step headings

### Changed

- Increase the page H1 to 48 pixels above the 40-pixel step H2 headings.
- At 660 pixels and below, use a 40-pixel H1 above 32-pixel H2 headings so both levels retain their hierarchy.
- Add responsive checks for exact heading sizes.

### Validation

- Chrome at 320, 390, 660, 661, 700, 800, 1008, 1024 and 1440 pixels — passed heading hierarchy, layout and overflow checks.
- Copy controls in both agent states, fixed feedback dimensions and vertical scrolling — passed.
- Sites production build — passed.

## v26.0.27 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 09:15:12 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Overlay copy feedback and hide the QR code on small screens

### Changed

- Position feedback over the bottom of the existing prompt body, preserving panel and card dimensions throughout success, failure and dismissal.
- Keep the white feedback surface, divider and paired button/message animations, removing the height-collapse animation.
- Hide the QR card at 660 pixels and below, matching the step stacking breakpoint, and retain it beside the header above that width.
- Extend browser checks for fixed panel and card heights and responsive QR visibility.

### Validation

- Chrome at 320, 390, 660, 661, 700, 800, 1008, 1024 and 1440 pixels — passed layout, QR visibility and overflow checks.
- All copy controls in both agent states — passed fixed dimensions, stable prompt position, feedback and button alignment.
- Success fade-out, reset and failure checks — passed unchanged panel dimensions and prompt position.
- Desktop overlay visual inspection — passed.
- Sites production build — passed.

## v26.0.26 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 09:11:47 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Keep prompts stationary while showing copy feedback below them

### Changed

- Move success and failure messages beneath the prompt inside its panel, expanding downward without shifting the prompt position.
- Remove copy-button minimum widths so each state fits its content while preserving the right edge and consistent inner padding.
- Add a green success outline matching the existing success text and Lucide Check icon.
- Lower the stacking breakpoint to 660 pixels.
- Extend browser checks for stationary prompts, shrinking right-aligned buttons, green outlines and the verified Lucide SVG path.

### Validation

- Chrome at 320, 390, 660, 661, 700, 800, 1008, 1024 and 1440 pixels — passed responsive layout and spacing checks.
- Success, fade completion, reset and failure — passed fixed prompt position and downward-only panel expansion.
- All copy actions in both agent states — passed payloads, feedback, button sizing and right-edge alignment.
- Rendered icon inspection — copy and check both use 18-pixel dimensions, a 24-unit viewBox, 2-unit strokes and round caps and joins; Check matches the installed Lucide SVG path.
- Authentication source tests — all eight passed.
- Sites production build — passed.

## v26.0.25 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 09:05:45 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Set the workshop content width and stacking breakpoint

### Changed

- Increase the content width from 800 to 960 pixels and move the stacking breakpoint from 680 to 760 pixels.
- Update responsive regression checks for the new width and breakpoint.

### Validation

- Chrome at 320, 390, 760, 761, 800, 1008, 1024 and 1440 pixels — passed width, alignment, accent clearance and absence of horizontal overflow.
- All copy controls in both agent states and vertical page scrolling — passed.
- Sites production build — passed.

## v26.0.24 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 09:03:46 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Narrow the page and top-align detached step accents

### Changed

- Cap all main content at 800 pixels and give the resource card more width than its step label in each alternating row.
- Lower the stacked-layout breakpoint to 680 pixels.
- Align step labels 12 pixels beneath the top of their cards to account for rounded corners.
- Place accent lines 24 pixels below the step text and stop them 24 pixels short of the adjacent card; remove the connecting dots.
- Use short accent underlines when the steps stack on narrow screens.

### Validation

- Chrome at 320, 390, 680, 681, 720, 848, 1024 and 1440 pixels — passed content width, alternating and stacked layouts, 12-pixel top offsets and 24-pixel accent clearance.
- All three copy actions in both agent states and vertical page scrolling — passed.
- Desktop visual inspection and horizontal overflow checks — passed.
- Authentication source tests — all eight passed.
- Sites production build — passed.

## v26.0.23 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 08:59:38 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Arrange workshop steps in alternating connected rows

### Changed

- Replace the horizontal card row with three centred alternating rows: cards right, left, then right.
- Add prominent Step 1, Step 2 and Step 3 H2 headings opposite their cards, with purpose lines and agent-coloured connectors ending at the cards.
- Remove duplicate in-card step badges and use H3 headings for the resources beneath each step.
- Stack each step heading above its card at widths of 800 pixels and below, preserving logical reading order and generous row spacing.
- Remove horizontal scrolling behaviour while preserving vertical page scrolling and paired copy feedback.
- Update the browser regression checks for alternating alignment, mobile stacking and both agents’ copy controls.

### Validation

- Chrome at 320, 390, 800, 801, 1024, 1440 and 1920 pixels — passed alternating or stacked alignment, equal prompt heights and absence of horizontal scrolling.
- All three copy actions in both agent states — passed full prompt payloads and success feedback.
- Desktop and mobile visual inspection — passed.
- Vertical page scrolling and browser error checks — passed.
- Authentication source tests — all eight passed.
- Sites production build — passed.

## v26.0.22 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 08:55:31 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Increase vertical breathing room across the workshop page

### Changed

- Increase top and bottom page padding, the space after the brand, and the gaps before the cards and footer to 40 pixels.
- Increase spacing above the selector, between main card sections, and below the footer divider to 32 pixels.
- Increase prompt bodies to 192 pixels while preserving equal panel heights, the horizontal card row and compact feedback spacing.

### Validation

- Chrome at 320, 390, 1024 and 1440 pixels — passed measured spacing, equal prompt heights and no page-wide horizontal overflow.
- Desktop visual inspection — passed.
- Authentication source tests — all eight passed.
- Sites production build — passed.

## v26.0.21 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 08:54:10 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Pair copy feedback animations and rebalance card spacing

### Changed

- Animate button feedback and its card message with identical entrance and exit keyframes, durations and shared start times, retaining the common reset lifecycle.
- Match install labels, copy labels and feedback to 12-pixel text; reduce the feedback gap beneath body copy to 8 pixels.
- Give desktop cards 32-pixel padding, retain 24-pixel padding on small screens, and provide more room inside prompt headers and prompt bodies.
- Keep 24-pixel spacing between major sections and use 16-pixel gaps for related controls and card heading icons.
- Share one pure-white surface colour between prompt panels and the QR card.

### Validation

- Chrome paired-animation checks — passed matching entrance and exit keyframes, start times, durations, cancellation, reset and reduced motion.
- Typography and spacing checks at 320, 390, 1024 and 1440 pixels in both agent states — passed matching text sizes, shared white surfaces, feedback gap and header fit.
- Existing Chrome scroll regression checks — passed.
- Authentication source tests — all eight passed.
- Sites production build — passed.

## v26.0.20 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 08:50:59 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Synchronise copy feedback and route vertical scrolling to the page

### Changed

- Use one feedback lifecycle for the button label and card message, resetting both after the success or failure message finishes fading out.
- Show “Copy Failed” on failure and clear stale success state when a retry fails.
- Remove the horizontal-gesture vertical lock; route vertical wheel, touch and keyboard input within cards to the page, preserving the horizontal row position and prompt scroll position.
- Keep horizontal input independently responsible for moving the card row, without translating vertical deltas into horizontal movement.
- Update the browser regression checks for the revised scrolling behaviour.

### Validation

- Chrome scroll regression checks — passed responsive alignment and independent wheel, touch and keyboard destinations, including vertical input immediately after horizontal input.
- Copy timing checks — passed success and failure lifetimes through fade completion, failed retries and agent-change reset.
- Authentication source tests — all eight passed.
- Sites production build — passed.

## v26.0.19 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 08:47:18 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Restore centred content with an independently scrolling card row

### Changed

- Restore the previous centred width for the logo, header, toggle and footer while allowing the card row to extend to both window edges.
- Align Step 1 with the main content on initial load and preserve matching space after the final card.
- Lock wheel gestures to their starting axis, never converting vertical input into horizontal scrolling; block vertical page, prompt and keyboard movement during horizontal gestures, including at row boundaries.
- Support horizontal touch gestures with vertical movement locked, while retaining ordinary vertical touch scrolling and pinch zoom.

### Added

- Add a repeatable Chrome regression check for layout alignment, responsive overflow, wheel and touch direction, boundary locking, prompt scrolling and keyboard blocking.

### Validation

- Chrome regression check at 320, 390, 1024, 1440 and 1920 pixels — passed content widths, initial alignment and no page-wide horizontal overflow.
- Wheel, touch, prompt and keyboard scroll checks — passed.
- Authentication source tests — all eight passed.
- Sites production build — passed.

## v26.0.18 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 08:41:48 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine horizontal workshop cards and animated copy feedback

### Changed

- Arrange all three steps in a horizontal row of 500-pixel cards, with horizontal scrolling and narrower cards on small screens.
- Use pure-white prompt panels, 48-pixel headers with 12-pixel labels, and 160-pixel prompt bodies.
- Match feedback typography to card body copy; animate its entrance over 180 milliseconds and its disappearance over 650 milliseconds, after five seconds for success or twelve seconds for failure instructions.
- Respect reduced-motion preferences and reset feedback safely after repeated copies or agent changes.
- Move the toggle directly beneath the introduction and standardise primary layout spacing to 24 pixels.
- Match the toolkit label to icon strokes and apply a shared selection tint derived from the selected agent colour.

### Validation

- Chrome at 320, 390, 768, 1024, 1440, 1596 and 1920 pixels, in both agent states — passed horizontal row layout, equal prompt heights, white backgrounds and primary spacing checks.
- Copy feedback — passed typography matching, success and failure lifetimes, repeated-click cancellation, agent-change reset and reduced motion.
- Authentication source tests — all eight passed.
- Sites production build — passed.

## v26.0.17 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 08:30:10 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Simplify workshop page typography and copy feedback

### Changed

- Shorten the title, widen the introduction, and consolidate typography to four sizes per viewport, three font families and two line-height ratios.
- Use equally sized light-grey prompt panels with 180-pixel scrollable bodies and monospace prompts and skill labels.
- Use “SCAN TO OPEN”, “Copy Prompt” and green “Copied” labels, with success and failure feedback beneath each card’s description.
- Replace the GitHub footer link with the artefact version and Wavelength Creative copyright, separated by a Unicode bullet (U+2022).
- Move useful instructions into the introduction and cards; remove the redundant text beneath the cards.

### Validation

- Chrome audit at 320, 390, 768, 1024, 1280 and 1440 pixels — passed matching panel heights, font limits and no horizontal page overflow.
- Desktop heading and introduction — passed one-line heading and two-line introduction at 1024 pixels and wider.
- Both agent selections and all three copy actions — passed exact prompt payloads, green success feedback, failure feedback and manual selection.
- Authentication source tests — all eight passed.
- Sites production build — passed.

## v26.0.16 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 08:21:31 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Strengthen icon tile backgrounds to a sixteen percent tint

### Changed

- Increase icon tile backgrounds from 12% to 16% selected-agent colour mixed with white, giving more separation from the 4% card tint.
- Update the documented icon background mix.

### Validation

- Chrome preview — all three icon backgrounds matched the 16% mix in both states; line colours, card tints, controls and mobile layout passed.
- Sites production build — passed.
- PVS changed-document and version checks — passed.

## v26.0.15 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 08:20:18 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Match card icon colours to the selected agent

### Changed

- Use 12% selected-agent colour mixed with white for all three icon tile backgrounds, and 80% selected-agent colour mixed with black for the icon lines.
- Document the card and icon colour mixes in the website README.

### Validation

- Chrome preview — exact background and line colour mixes passed for all three icons in both agent states; card tints, white toggle and badge labels, assets and mobile layout passed.
- Authentication source tests — all eight passed.
- Sites production build — passed.
- PVS changed-document and version checks — passed.

## v26.0.14 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 08:16:05 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Tint step cards to match the selected agent

### Changed

- Tint all three step cards with 4% of the selected agent’s accent mixed with 96% white; switch automatically between Codex blue and Claude Code orange.

### Validation

- Chrome preview — all three card backgrounds matched the exact 4% blend in both states; existing white logos, labels, badges, image loading and mobile fit passed.
- Authentication source tests — all eight passed.
- Sites production build — passed.
- PVS changed-document and version checks — passed.

## v26.0.13 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 08:13:12 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Document verified accent sources and use white agent labels

### Changed

- Keep the approved Codex blue (#0285FF) and Claude Code orange (#D97757), and use white logos and text in the selected toggle and white text on all step badges.
- Document ChatGPT Learn’s blue CSS token and Lobe Icons’ Claude Code primary colour in the website README; replace the earlier provisional description with the subsequently verified source.

### Validation

- Authentication source tests — all eight passed.
- Chrome preview — both backgrounds, white selected logos and labels, all three white badge labels, embedded assets and mobile fit passed; no script errors.
- Sites production build — passed.
- PVS changed-document checks and artefact version validation — passed; the existing mixed-root layout remains outside the whole-project validator’s supported layouts.

## v26.0.12 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 07:58:30 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refresh workshop icons and selected-agent colours

### Changed

- Replace the favicon with the supplied Wavelength PNG on login and resources pages, and embed it in the portable preview.
- Replace the Claude mark with Lobe Icons' Claude Code SVG.
- Switch all step badges and the selected agent toggle between blue (#0285FF, ChatGPT Learn blue; source verified subsequently) and Lobe's Claude Code orange (#D97757), with readable dark labels.

### Removed

- Remove the old favicon and unused window, file and globe scaffold icons.

### Validation

- Authentication source tests — all eight passed.
- Sites production build — passed.
- Chrome preview — both colour states, three badges, toggle, Claude Code artwork, favicon, images and mobile fit passed; no script errors.
- PVS changed-document and version checks — passed. The whole-project validator cannot represent the existing repository layout with its website-level version authority and root governance documents.

## v26.0.11 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 07:52:34 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Improve workshop step layout and repair standalone preview assets

### Changed

- Place Node.js setup across the full width above the two skill cards.
- Put explicit STEP labels on the left and move each icon beside its name and kebab-case title.
- Use the Lucide MonitorDown icon for Node.js setup.

### Fixed

- Use root-relative hosted asset paths and embed both images and the font in the standalone HTML preview.

### Added

- Add `website/scripts/preview-resources.mjs` to regenerate the portable HTML preview without session redirects.

### Validation

- Chrome standalone-file checks — both images decoded, requested card geometry and icons present, both agent selectors and copy controls passed, mobile fit passed and no script errors.
- `node --test website/tests/auth.test.mjs` — all eight tests passed.
- Sites `build-site.mjs` — local production build passed.

## v26.0.10 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 07:42:35 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add guided Node.js setup and concise installation status messages

### Added

- Add a copyable Node.js setup prompt as Step 1 before the two skill installation steps.

### Changed

- Check and resolve missing prerequisites in both skill prompts, including when setup is skipped.
- Request short emoji status messages with uppercase bold labels and colons, verified completion checks and one next action.
- Keep technical verification internal and suppress lengthy installation summaries.
- Fit three cards on desktop and stack them on smaller screens, with scrollable prompt text and complete clipboard copies.

### Validation

- `node --test website/tests/auth.test.mjs` — all eight access-control tests passed.
- Sites `build-site.mjs` — local production build passed.
- Chrome source-page preview — all three ordered steps, both agent choices, six clipboard copies, fallback/status text, mobile fit and no script errors passed.
- Actual Node.js installation on a clean participant computer and agent adherence to response wording were not tested.

## v26.0.9 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 07:15:09 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add a local design preview and align the placeholder layout

### Changed

- Match the real page's header, QR-card position, selector, resource cards and footer using empty decorative shapes and shared layout classes.
- Extract the placeholder markup and styles into an editable module.

### Added

- Generate a standalone HTML review file with No blur, Blur only and Password panel views; no preview server or credentials required.

### Validation

- `node --test website/tests/auth.test.mjs` — all eight access-control tests passed.
- Sites `build-site.mjs` — local production build passed.
- `node website/scripts/preview-login.mjs` and Chrome file preview — all three views, empty decorative content and mobile fit passed; desktop and mobile screenshots reviewed.

## v26.0.8 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 07:06:25 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Restore the blurred-page look with empty placeholders

### Changed

- Show decorative header and card shapes behind the login panel, with no workshop text, links, images or controls.
- Hide the decorative layout from assistive technology and prevent interaction.

### Validation

- `node --test website/tests/auth.test.mjs` — all eight access-control tests passed.
- Sites `build-site.mjs` — production build passed.
- Desktop and mobile Chrome inspection — empty placeholder content, non-interactive markup and mobile overflow checks passed; screenshots reviewed.

## v26.0.7 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 04:39:05 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Secure workshop access with persistent seven-day sessions

### Security

- Replace the browser-side password gate with server-side scrypt verification and authenticated content responses.
- Store only hashed session tokens in D1 and use persistent Secure, HttpOnly cookies with a fixed seven-day expiry.
- Add logout revocation, password-rotation invalidation, persisted attempt limits, origin checks and fail-closed responses.
- Exclude local credentials from Git and document the public GitHub access boundary.

### Validation

- `node --test tests/auth.test.mjs` — all eight security and session tests passed.
- Sites `build-site.mjs` — production Worker build passed.
- `node tests/browser-check.mjs` against the local built Worker — login, cookie flags, new tabs, browser restart, logout, agent selection and mobile overflow checks passed with no page errors.

## v26.0.6 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 10:44:01 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add animated password feedback and access confirmation

### Added

- Gently shake the password panel on incorrect attempts, respecting reduced-motion preferences.
- Show a green Lucide checkmark and Access granted confirmation for 900 milliseconds before unlocking.
- Block repeated submissions during the success confirmation.

### Validation

- Chrome — repeatable shake, reduced-motion opt-out, visible green success checkmark, delayed opening and disabled repeat submission passed.
- Existing password gate, session handling, mobile layout, all four prompts and automatic/manual clipboard checks — passed.
- Success-state screenshot review — passed; no browser errors.

## v26.0.5 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 10:41:38 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add a workshop password gate and reduce header branding

### Added

- Add a browser-side password gate with a Lucide lock icon, masked password field and grey blurred backdrop.
- Keep background controls inactive until unlocked, contain keyboard focus, report incorrect passwords and remember access for the current tab session.
- Allow unlocking when browser session storage is unavailable. This presentation gate is not server-side access control.

### Changed

- Remove the logo's blue tile, show a smaller black worm and reduce the Mark Pro WAVELENGTH wordmark to 16 pixels.

### Validation

- Chrome — incorrect and correct passwords, Enter submission, focus containment, session persistence, new-session gating and unavailable storage passed.
- All four installation prompts, real clipboard copies and manual copying after simulated clipboard denial — passed.
- Desktop and mobile gate screenshots, unlocked-page review and mobile overflow checks — passed; no browser errors.

## v26.0.4 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 10:39:42 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add Wavelength branding and contain the website artefact

### Added

- Add the existing Wavelength worm logo and WAVELENGTH wordmark using bundled Mark Pro Bold from Client Onboarder.

### Changed

- Use white text and icons on the selected agent toggle and blue numbered badges.
- Keep the standalone page, assets and version authority together in `website/`; move the website version authority from the repository root to `website/VERSION.txt`.
- Retain shared project governance at the repository root.

### Validation

- Chrome — logo loading, Mark Pro font loading and white foregrounds on both selected-agent states and numbered badges passed.
- All four prompt variants, clipboard copying, forced-copy-failure selection and manual keyboard copying — passed.
- Desktop visual review and mobile overflow check — passed with no browser errors.

## v26.0.3 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 10:36:16 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Apply Wavelength colours and improve icons and copy feedback

### Changed

- Match Client Onboarder's approved blue, ink and pale-grey palette, with darker blue for readable text.
- Use Lucide clipboard-list, code-xml, copy and check icons, and Codex and Claude brand marks from Lobe Icons with bundled licences.
- Emphasise skill order with prominent numbered badges.

### Fixed

- Replace the malformed assistant slash with the standard Lucide code-xml path.
- Keep prompts manually selectable and select the complete prompt with keyboard-copy guidance when automatic clipboard methods fail.

### Validation

- Chrome — all four individual prompts and real clipboard copies passed; no browser errors.
- Forced native and legacy clipboard failures — exact prompt selection and manual keyboard copy passed.
- Direct mouse selection and visible success icons — passed.
- Desktop and mobile visual review and mobile overflow checks — passed.

## v26.0.2 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 10:31:48 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add a QR code linking to the planned workshop resources address

### Added

- Add a clickable QR code at the top of the page pointing to `https://ai-implementation-workshop-resources.adamjaffrey.chatgpt.site`.
- Bundle the QR image locally and adapt its placement for mobile screens.

### Validation

- Independent ZXing decoding of the source image and rendered 190-pixel QR — passed with the exact requested HTTPS address.
- Chrome image loading, destination link, four installation prompts and clipboard copies — passed.
- Mobile overflow check and desktop screenshot review — passed; no browser errors.

## v26.0.1 — 2026-10-16

**Built at:** Fri 16 Oct 2026 at 10:28:09 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add a workshop resources page with individual skill installation prompts

### Added

- Add a standalone webpage at `website/index.html` with two skill cards, descriptions and symbols.
- Add a Codex and Claude Code toggle and individual installation prompts with clipboard buttons.
- Support mobile screens, keyboard navigation and clipboard failure feedback.

### Validation

- Chrome browser checks — passed for all four installation prompts and actual clipboard copies.
- Mobile layout at 390 pixels — passed with stacked cards and no horizontal overflow.
- Desktop and mobile screenshot review — passed.
- Browser runtime errors — none observed.

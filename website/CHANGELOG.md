---
name: changelog
description: Record finalised software artefacts for this project.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.281"
  update_summary: "Use visible SVG bounds for blocks and rename backdrop choices"
  updated_at: "Wed 21 Oct 2026 at 06:01:00 pm AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Changelog

## v26.0.279 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 06:01:00 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Use visible SVG bounds for blocks and rename backdrop choices

### Changed

- Paint anonymous SVG blocks within cached visible artwork bounds, preserving layout boxes and excluding transparent padding. Cover all 52 shared Lucide icons, cropped variants and both agent logos without additional routine geometry measurements.
- Preserve viewBox metadata during capture and apply paint corrections to saved backdrops without recapture.
- Rename Background Preview options to AI Workshop Resources and Component Playground > Colours.

### Fixed

- Prevent full-box chevron paint from overlapping adjacent disclosure labels.

### Validation

- Both active backdrops at all five capture widths: every SVG uses cached bounds; chevron clearance, anonymous content and inert feedback checks passed.
- Cropped-viewBox, hidden password state and disclosure grouping regressions passed.
- Both preview labels and choices, icon-cache verification and production build — passed.

## v26.0.278 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 05:49:26 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Keep current backdrop choices and fix disclosure block flow

### Changed

- Show only Resources and Colours in Background Preview, both using the current five-width captures; stop embedding historical alternatives in the Playground.

### Fixed

- Keep disclosure words together as one anonymous grid text item beside the chevron. Repair the saved Colours structure without remeasuring word geometry, reducing the closed disclosure from 86px to its source height of 40px.
- Preserve flex/grid text grouping in future captures while allowing the label to wrap naturally.

### Validation

- Five-width backdrop checks, hidden icon and grid disclosure regressions — passed.
- Current Background Preview selection browser check — passed for both choices.
- Build-time placeholder unit tests and `npm --prefix website run build` — passed; generated version is v26.0.278.

## v26.0.277 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 05:40:48 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Simplify backdrop capture and select Colours

### Changed

- Select Colours for every Playground login, preserving the existing anonymous endpoint and logo shortcut.
- Replace active every-pixel iframe sweeps with five widths (380, 660, 940, 1008, 1248px), one responsive DOM and compact word-metric overrides. Both active backdrops have no nested frames; the final capture took about six seconds in local Chrome.
- Share anonymous word/icon conversion between Resources and Playground, retain prompt wrapping and freeze inactive icon layers instead of exposing their blocks.
- Keep the +1px/1440px reference comparison opt-in and separate from routine capture/builds; retain historical alternative previews.

### Validation

- Independent responsive boundary, external text alignment and Playground spacing browser checks — passed against the layout handoff.
- Five-width backdrop browser checks and hidden password-icon regression — passed.
- Five-width hosted Colours login checks across themes/agents — passed.
- Authentication and placeholder unit tests — passed.
- Backdrop interaction and three-click/tap logo shortcut browser checks — passed.
- One-off comparison — identical sampled container bounds between direct and reflowed anonymous captures for both backdrops at all five pairs. Source differences were at most 0.11px for Resources and approximately 46px for Colours; not pixel-perfect parity.
- `npm --prefix website run build` and generated v26.0.277 display checks — passed. No physical-device coverage claimed.

## v26.0.276 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 05:27:56 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Consolidate responsive tiers and widen the Playground

### Changed

- Consolidate authored layout boundaries at inclusive 380px, 660px and 940px; preserve 24px vertical/28px horizontal mobile login padding and remove superseded padding overrides.
- Limit Resources agent-selector contraction to 940px while preserving scroll thresholds, reversal buffers, focus and reduced-motion behaviour.
- Increase Playground visible content to 1200px with a 1248px wrapper and 1192px text rail across headers, panels, Inspector and floating controls; retain Resources’ 960px cap and existing Screen Width presets.
- Update owning interface rules, design rationale and README; refresh cap assertions and the stale underline assertion to match the existing auto-thickness contract.

### Validation

- Responsive browser check — passed at 320, 380/381, 660/661, 940/941, 1008, 1248 and 1440px, including both login destinations, card/prompt padding, compact selector labels, overflow and actual content caps.
- Nested alignment, menu containment, connected controls and source-parity browser checks — passed, including expanded views, keyboard controls, both themes/agents and held login states; mobile/desktop screenshots inspected.
- Sticky controls — passed 24 width/theme/agent combinations including 940/941; stability, reversal buffers, speed-aware contraction and viewport-height changes passed.
- Tab edges and selection scroll axes — passed; 180 selection regions had no vertical movement or forced horizontal scrolling.
- Authentication and saved-placeholder unit checks — 13 passed. Local site build and generated version/cap assertions — passed; all saved anonymous geometry remained byte-for-byte unchanged.
- Physical devices and Safari were not tested. Backdrop capture/comparison is intentionally deferred to the originating task.

## v26.0.275 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 03:51:31 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Match visible anchor icons to cap height with one hover fill

### Changed

- Crop installed Lucide Hash, Check and X viewBoxes to their verified stroke-inclusive bounds, matching visible height to 1cap while preserving aspect ratios.
- Keep an 8px visible gap after the text, accounting for letter spacing, and reserve a fixed slot sized to the widest icon so state changes cannot shift the text or background.
- Replace the shorter icon extension with one continuous rounded hover fill behind text, gap and slot; retain synchronised hover timing and existing copy-feedback behaviour.
- Update the interface contract, design rationale and README.

### Validation

- Installed Lucide ink measurements — verified against the checked-in bounds.
- Chrome/WebKit mobile and desktop geometry checks — visible height, 8px gap, stable slot/background across all three states, continuous fill and synchronised hover passed; result screenshots reviewed.
- Copy lifecycle and Resources/Playground parity across four widths and both agent/theme combinations — passed.
- Anchor scroll/focus/re-entry regression — passed in isolation after an initial concurrent-run speed-sampling failure, including actual LAN replacement navigation.
- Local site build and generated version/geometry checks — passed using saved backdrop geometry. Installed Safari and physical devices were not tested.

## v26.0.274 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 03:43:32 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Inset disclosure chevrons and cover compact labels completely

### Changed

- Move every left disclosure chevron's visible centre from 10px to 12px while retaining the 20px label inset, including source rules, explanatory summaries, icon locations, expanded settings, hover help and inspector controls.
- Size compact Hover Preview Explainer and More Details backgrounds to their full labels with 10px right padding; retain wrapping within available space, including enlarged text. Record the refined convention in the interface contract and design decision log.

### Validation

- Disclosure marker alignment browser check — Chrome/WebKit passed at 320, 390, 768 and 1440px, both themes/agents, open/closed states, all five expanded panels, keyboard activation, visible compact-label coverage and doubled hover-label text size. Mobile/desktop compact-control screenshots reviewed; physical devices not tested.
- External text inset, nested alignment, menu containment and tool focus browser checks — passed.
- Authentication tests — all 11 passed.
- Local website build — passed using saved backdrop geometry; server artefact contains v26.0.274 and the updated geometry/background rules.
- LAN Main App and Playground links — HTTP 200 with the updated version and chevron geometry.

## v26.0.273 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 03:39:57 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Synchronise link hover effects and size anchor icons to cap height

### Changed

- Size Hash, Check and X SVG boxes to 1cap, retaining the 8px gap and cap-centred alignment.
- Share the 160ms hover curve across anchor text, underline, backgrounds and Hash opacity. Animate underline colour instead of switching decoration visibility; keep the icon container opaque to prevent compounded background fading.
- Apply the same transition to hyperlink text, underline and arrow colour alongside its existing background transition. Preserve shared fill, radius, relative text-area clearance, automatic underline thickness and reduced-motion behaviour.
- Update interface instructions, README and design rationale in the same change.

### Validation

- Chrome/WebKit hover regression at 390px and 1440px — cap sizing, five coordinated anchor transitions, matched intermediate background colours, hyperlink colour/background timing and reduced motion passed; screenshots reviewed.
- Copy-feedback lifecycle, hyperlink hit/hover/focus and responsive anchor regressions — passed. All copy outcome holds and animation durations retained.
- Resources/Playground parity at 320px, 390px, 768px and 1440px across Chrome/WebKit and agent/theme combinations — passed.
- Local site build and version/style checks — passed with saved backdrop geometry. Installed Safari and physical devices were not tested.

## v26.0.272 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 03:31:28 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Align every left disclosure chevron and label to shared columns

### Changed

- Centre visible left-chevron ink at 10px and start labels at 20px from each local content rail, with the same centre in open and closed states and hanging wrapped labels.
- Apply shared geometry to Inspect Source Declarations, the four Easter Egg explanations, About This Reference, the Feather-derived licence notice, icon Locations disclosures, Hover Preview Explainer, Style Inspector, More Details, and Style Options/Preview Controls in all five expanded component panels.
- Retain disclosure body alignment and rounded-body surface padding; document the approved inset convention in the interface contract and design decision log.

### Validation

- `node website/tests/disclosure-marker-alignment-browser-check.mjs` — passed in Chrome and WebKit at 320, 390, 768 and 1440px, both themes/agents, open/closed states, five expanded panels, mobile hover help and keyboard activation. Mobile and desktop screenshots reviewed; physical devices not tested.
- External text inset, nested alignment, menu containment, specimen fidelity, expanded preview and tool focus browser checks — passed.
- `node --test website/tests/auth.test.mjs` — all 11 tests passed.
- `npm --prefix website run build` — passed using saved backdrop geometry; built server version and shared geometry verified as v26.0.272.
- Automatically signed-in LAN Resources and Playground destinations — HTTP 200 with the updated version and geometry.

## v26.0.271 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 03:21:16 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Restore shared clipping for the Typography link specimen

### Fixed

- Keep the link specimen's grey background inside its rounded frame by removing the conflicting overflow override and redundant height exception. Use the same clipping and content-height rules as neighbouring specimen galleries.

### Validation

- Chrome and WebKit at 320, 390, 768 and 1440px, both themes and agents — shared clipping and full content height passed; mobile and desktop screenshots reviewed. Chrome corner hit-testing passed; WebKit uses rectangular hit-testing despite visually rounded clipping. Physical devices were not tested.
- Playground menu containment, specimen fidelity, external text inset and nested alignment browser checks — passed.
- Authentication tests, local website build and generated active styles/version checks — passed with saved backdrop geometry and v26.0.271.

## v26.0.270 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 03:13:48 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Use automatic hyperlink and anchor underline thickness

### Changed

- Use auto for both hyperlink and Step anchor underline thickness, following the comparison review. Retain underline offset, hover background geometry and visibility rules.
- Update the owning interface contract, README and design decision log.

### Validation

- Chrome/WebKit at mobile and desktop widths, light and dark themes — both link types use auto; offset and visibility checks passed, with heading screenshots reviewed. Installed Safari was not tested.
- Hyperlink interaction regression — hit bounds, hover, focus and mouse/touch/keyboard activation passed.
- Local website build and output checks — passed with saved backdrop geometry and v26.0.270.

## v26.0.269 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 02:12:33 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Use font-defined hyperlink and anchor underlines

### Changed

- Share font-defined underline thickness across hyperlinks and Step anchors, with an explicit auto compatibility fallback. Remove the fixed 1px hyperlink hover override; retain the existing offset and visibility rules.
- Update interface guidance and the design decision log to explain font-driven thickness and renderer differences.

### Validation

- Headless Chrome and WebKit at 390px and 1440px in light/dark themes — both link types resolve to from-font; resting/hovered visibility and offset checks passed. Screenshots reviewed; WebKit renders the heading underline slightly heavier than Chrome. Installed Safari and physical devices were not tested.
- Hyperlink interaction regression — hover, focus, pointer/touch/keyboard activation, hit bounds and theme/agent colours passed.
- Local website build and generated version/underline checks — passed, reusing saved backdrop geometry.

## v26.0.268 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 11:25:37 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add five anonymous Playground backdrop comparisons

### Added

- Capture Typography, Colours, Status States, Focus and Selection, and Branding as separate anonymous comparison documents, with populated nested specimens and responsive frame-height rules.
- Offer all five through Background Preview in Blocks and Blur, using the existing screen width, theme, agent, layer, strength, blur and dimming controls. Label Components as current and retain it as the actual login backdrop.
- Add explicit comparison capture tooling and browser regression coverage. Document the user-authorised comparison exception without permitting routine recapture.

### Changed

- Generalise capture preparation to a selected tab and preserve the structural attributes required by specimen galleries. Measure a script-free copy from the page top to exclude live scheduler mutations and pinned header state.

### Validation

- Five comparison captures — completed with 2,813 Typography, 7,005 Colours, 1,940 Status States, 1,224 Focus and Selection, and 1,522 Branding anonymous word blocks.
- Comparison browser checks — passed in Chrome and WebKit at 320, 390, 768 and 1440px, including selector switching, anonymous nested content, inert/default-cursor treatment, themes and locked password-panel mode.
- Existing Playground source-parity regression — passed across its mobile/desktop, theme/agent and interaction matrix.
- Anonymous backdrop unit checks — 4 passed; active Resources and Components geometry files remain byte-for-byte unchanged.
- Mobile and desktop screenshots — reviewed; no physical-device validation claimed.
- Local website build and generated v26.0.268 displays — passed.

## v26.0.267 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 11:00:20 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine proportional anchor icons and full feedback holds

### Changed

- Use regular Hash, Check and X at 0.625em (20px desktop, 17.5px mobile) with an 8px gap. Share hyperlink hover paint, accent text and underline styling while preserving the heading rail.
- Scroll at up to 1200 CSS px/s with eased 300ms velocity ramps. Keep the original selector visible in flow until it reaches its sticky boundary, retaining synchronised arrival fades and same-URL navigation.
- Start copy holds after entry completes. Anchor and QR success/failure hold for 3/6 seconds; prompt feedback retains 6/12 seconds. Use 600ms success entry/exits, 300ms opacity-only failure entry, ease-out entrances and ease-in exits.

### Validation

- Chrome/WebKit anchor arrival, aliases, replacement navigation, focus, responsive placement and interruption checks — passed; desktop/mobile screenshots inspected.
- Full-hold lifecycle checks passed for every copy action and result; QR, prompt, hyperlink bounds/colours, sticky controls and URL Reference checks passed.
- Resources/Playground source parity passed across Chrome/WebKit, four widths and both agent/theme combinations. Local site build passed using saved backdrop geometry; no physical-device testing or publication performed.

## v26.0.266 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 10:32:13 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Make anonymous backdrops consistently non-interactive

### Fixed

- Keep nested anonymous frames inert and locked while allowing outer inspection scrolling. Remove captured hand/text cursors, hover/focus feedback and Resources block-click selection; retain the actual login controls and parent logo shortcut.
- Cover the full captured login document with dimming and lock the background in Password Panel mode. Preserve responsive wrapping and saved frame height rules.
- Apply static presentation rules to saved Components geometry and future capture generation without remeasuring existing geometry. Document the interaction boundary and update the Playground inspection guidance.

### Validation

- Anonymous content and saved-geometry unit tests — 4 passed.
- Targeted backdrop interaction browser regression — passed in Chrome and WebKit at 390px and 1440px, including wheel input, nested hit-target/cursor suppression, full-document dimming and panel-mode locking.
- Components backdrop matrix — passed at ten widths and two heights across themes and agents; outer alignment and embedded frame bounds passed at twelve widths and two heights within 1px.
- Resources alignment — all non-footer words passed within 1px at ten widths and two heights across themes and agents. The unmodified full-page check reports the retained saved footer-version block differing from v26.0.266; no geometry remeasurement was performed for this internal build.
- Playground source parity and logo shortcut regressions — passed. Mobile/desktop screenshots reviewed; no physical-device validation claimed.
- Local website build and generated version checks — passed. LAN Main App and Playground endpoints returned HTTP 200.

## v26.0.265 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 10:21:32 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Enlarge anchor icons and handle replacement navigation

### Changed

- Enlarge Hash to 20px and Circle Check/Circle X to 24px, retaining one shared centre. Place Hash 8px after Step N and adapt the connected hover surface to the larger feedback icons.
- Update interface, routing, URL Reference and design guidance; retain existing scroll speed and copy feedback timings.

### Fixed

- Handle same-URL replacement navigation rather than ignoring all replace events. Suppress the controller’s own history rewrite, ignore query-only preference updates and defer alias canonicalisation until intercepted navigation completes to avoid aborting it.

### Validation

- Anchor refinement browser regression — passed in Chrome/WebKit at 390px and 1440px, including same-URL replacement navigation; the replacement case also passed over the actual LAN origin.
- Rendered geometry and screenshots — verified 20/24px icon sizes, exact 8px Hash gap and unchanged icon centre on desktop/mobile.
- Playground source parity, specimen fidelity and mobile Chrome/WebKit parity — passed across themes, agents and relevant widths.
- Local Sites build and generated version checks — passed; app, Playground and server output display v26.0.265. Saved backdrop geometry reused; no physical-device validation claimed.

## v26.0.264 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 09:53:59 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine anchor travel, focus and copy feedback

### Changed

- Cap anchor scrolling at 900 CSS px/s with smooth acceleration/deceleration; synchronise earlier-card fading, selector shadows and Wavelength visibility over the final 600ms. Land 60px below selectors on desktop/tablet and 30px on mobile.
- Put every Hash indicator to the right of Step N, connect its shorter hover surface to the wider text decoration, and lift hovered text to the existing accent colour. Use installed Lucide Circle Check and Circle X for contained feedback.
- Share 600ms copy-motion keyframes: success enters upwards by 2px, failure enters without movement, and both exit upwards by 2px. Anchor results use a 3-second cooldown; prompt/QR success uses 6 seconds and failure 12 seconds.
- Keep shared Playground specimens, icon metadata, URL Reference and owning contracts aligned with these behaviours.

### Fixed

- Re-entering the same anchor URL and reloading now replay arrival; the first three Tab stops route through agent, theme and the target card without jumping to the page top.
- Apply both floating shadows at Step 1. Retain only necessary near-footer landing space and trim it safely on later landings or upward restoration.

### Validation

- Resources anchor and refinement browser checks — passed across mobile/desktop Chrome and WebKit, including bounded speed, synchronised effects, repeated navigation, reload, focus, cancellation, footer-space cleanup, feedback geometry and motion.
- QR copy browser check — passed, including shared entry/exit animation, success cooldown, 12-second failure cooldown, fallback, focus and error feedback.
- Playground source parity, specimen fidelity, mobile Chrome/WebKit parity and URL Reference checks — passed.
- Sticky control and stability checks — passed across width/theme/agent combinations, normal scrolling and reduced motion.
- Authentication and saved-backdrop source tests — 13 passed; existing backdrop geometry reused.
- Local Sites build and generated version checks — passed; Resources, Playground and server output display v26.0.264. Headless mobile emulation and visual screenshots were reviewed; no physical-device validation is claimed.

## v26.0.263 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 01:52:32 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add Resources step anchor copying and guided arrival

### Added

- Copy descriptive step URLs from Step N headings or exterior Lucide Hash indicators, with agent-coloured hover decoration, theme-aware Check/X feedback, icon-only tooltips and accessible announcements.
- Resolve short step fragments as client-side aliases, retain the destination through login, and ease-scroll to 60px below the floating selectors measured against the visible heading text.
- Hold the floating Wavelength mark visible, fade preceding step/card pairs out only after arrival, and restore them with an eased fade only on upward scrolling; retain layout space and honour reduced motion.

### Changed

- Share prompt/QR/heading copy cooldowns and heading cap-height metrics. Reuse canonical Resources controls in the Playground icon and status specimens; keep Playground heading-link changes deferred.
- Document fragment mappings, interaction rules and the authorised exterior-gutter exception. Update regression expectations for text-aligned heading controls and the established toggle behaviour.

### Validation

- Resources anchor browser suite — passed 320, 390, 768 and 1440px Chrome layouts, both themes/agents, success/failure cooldowns, real login, directional restoration and reduced-motion WebKit mobile/desktop landings.
- Playground source parity, specimen fidelity and mobile Chrome/WebKit parity — passed; feedback capture, typography, source dimensions and wheel chaining verified.
- Seven-width external text/icon alignment matrix and Resources motion regression — passed.
- URL Reference browser check and 13 authentication/placeholder unit tests — passed; saved anonymous geometry reused.
- Sites build helper and compiled version checks — passed; Resources and generated Playground consistently display v26.0.263. Mobile emulation does not establish physical-device coverage.

## v26.0.262 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 01:32:47 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refresh and verify responsive anonymous backdrop geometry

### Changed

- Recapture Resources and Components geometry against the verified Sites v14 source baseline, advancing their independent layout revisions to 14 and 21.
- Preserve tight source line boxes when replacing glyphs with anonymous blocks, preventing the QR caption from shifting down. Keep the approved QR dimensions and visible spacing unchanged.
- Save embedded preview height transitions after child-frame resize callbacks settle; remove stale desktop inline heights and discarded sticky offsets from static captures.
- Strengthen geometry checks with word heights, iframe heights, login-panel bounds and QR-card/caption bounds. Update the capture contract and decision record; correct stale test assumptions about canonical agent URLs and encoded nonbreaking spaces.

### Validation

- Resources alignment matrix — passed 20 viewport combinations across 320–1440px, both themes and agents; all 1222 word rectangles match within 1px.
- Components alignment matrix — passed 24 viewport combinations, including embedded frame heights and login/QR bounds within 1px.
- Anonymous backdrop browser checks — passed 20 viewport combinations, both themes and agents, with script-disabled anonymous content and containment.
- QR caption browser checks — passed Chrome/WebKit; approved visible spacing and QR/card widths retained.
- Placeholder unit tests and published-source revision preflight — passed.
- Sites build helper — passed; compiled Resources and Playground display v26.0.262.

## v26.0.261 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 01:04:39 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Fit QR caption leading to its capital-letter height

### Changed

- Restore 12px card padding and the 12px QR-to-caption gap. Use `line-height:1cap` for the 14px uppercase caption so internal font leading no longer adds excess visible spacing.
- Preserve the 150px QR image, 12px side padding and 176px outer card width. Apply the canonical change to Resources and its derived Playground specimens.
- Add visible caption-ink clearance checks and update the shared spacing contract and existing QR expectations.

### Validation

- `node website/tests/qr-caption-browser-check.mjs` — passed Chrome/WebKit at 390px and 1440px in both themes. Resources visible gaps are 12px; fractional iframe screenshot coordinates introduce at most 1px rasterisation rounding. QR and card widths remain unchanged.
- `node website/tests/playground-browser-check.mjs` — passed app/specimen source parity and interaction checks across widths, agents and themes.
- `npm --prefix website run build` — passed; generated v26.0.261 displays verified. Saved backdrop geometry reused without remeasurement.

## v26.0.260 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 12:48:35 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Fade the Resources label before its selector pins

### Changed

- Fade “I’m Using” over the final 64px of the agent selector’s approach to its sticky position, matching Playground legends. Restore it on reverse scroll while retaining layout space and selector behaviour.
- Share the fade with Resources previews and document it in the interface contract and design decisions.
- Give the existing Playground sticky test a bounded iframe height so its full-height preview can actually scroll.

### Validation

- `node website/tests/sticky-controls-browser-check.mjs` — passed 16 width/theme/agent combinations, forward/reverse opacity, pinned state, keyboard activation, reduced motion and the scrollable Playground preview.
- `node website/tests/sticky-controls-stability-check.mjs` — passed contraction, reversal, collision and viewport-height stability checks.
- `node website/tests/playground-browser-check.mjs` — passed source parity and interaction checks.
- Focused WebKit checks at 390px and 1440px — passed forward/reverse fade; desktop/mobile screenshots inspected. Physical devices were not tested.
- `npm --prefix website run build` — passed; v26.0.260 displays verified in Resources, generated Playground and standalone preview. Saved backdrop geometry was reused.

## v26.0.259 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 12:17:06 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Match held selections to native painted height

### Fixed

- Replace glyph-height Highlight API painting with per-line selection backgrounds using captured source line height and colours. Retain zero added padding and avoid highlighting unused trailing space on the last line.
- Replace the insufficient glyph-range regression assertion with a visible native-selection pixel comparison for all six desktop examples. Correct the governing explanation: the original oversize came from added padding; glyph bounds then made the replacement too small.

### Validation

- Actual Resources desktop Chrome body-text selection — measured 24px painted height versus an 18px glyph range.
- `node website/tests/specimen-selection-qr-browser-check.mjs` — passed Chrome/WebKit at 390, 768 and 1440px in light/dark themes. Desktop Chrome native/held painted heights match exactly: body 24px, prompt 21px and four password examples 24px. WebKit checks cover rendering and source line heights, not native-selection pixel parity.
- Live QR app and Focus specimen — confirmed 9px caption gaps, 12px top/side padding and a 203px card height; no further QR changes made.
- `node website/tests/playground-browser-check.mjs` — passed source parity and interaction checks.
- `node website/tests/playground-scroll-clearance-browser-check.mjs` — passed again, confirming the tablet tab-position correction remains in place.
- `npm --prefix website run build` — passed; generated v26.0.259 displays verified. Saved backdrop geometry was not remeasured.

## v26.0.258 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 12:09:01 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Tighten QR caption spacing for optical balance

### Changed

- Use 9px above and below the QR caption line box, targeting approximately 12px of visible clearance after font leading. Keep QR top and side padding at 12px in the shared app source and derived specimens.
- Update the owning guidance and existing regression expectations to match the requested spacing.

### Validation

- Source syntax and diff checks — passed.
- `npm --prefix website run build` — passed; generated v26.0.258 displays verified, saved backdrop geometry reused.
- Geometry remeasurement and browser geometry checks — deferred at the user’s request pending visual build approval.

## v26.0.257 — 2026-10-21

**Built at:** Wed 21 Oct 2026 at 12:02:57 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Compact QR spacing and text-range selection previews

### Fixed

- Size the canonical QR card to its content, removing the extra width introduced by its optical margins. Use 12px top/side padding, 12px above and below the caption line box, and an inward image outline; retain the complete focus specimen.
- Paint all six held selection examples with text-range highlights instead of paragraph backgrounds and extra padding. Retain captured source typography and colours, with an inline fallback for browsers without the Highlight API.
- Keep a minimum viewport footprint while lazy Playground panels load so tab landing is not clamped to a temporarily short document, resolving the tablet first-scroll movement.

### Validation

- Passed Chrome/WebKit checks for all six selection ranges, exact QR spacing, source font parity, 24px right clearance, responsive fades and theme controls across mobile, tablet and desktop widths.
- Passed optical rail, nested alignment, tab landing/edge and horizontal scroll-axis regression checks. Inspected mobile selection and QR screenshots; physical-device font correction was confirmed by the user.
- `npm --prefix website run build` — passed; generated v26.0.257 displays verified using saved backdrop geometry. Local preview refreshed; no publication performed.

## v26.0.256 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 11:46:37 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Guard source captures against device text inflation

### Fixed

- Apply one explicit text-autosizing opt-out to both dedicated capture frames and displayed galleries, closing the gap where an enlarged source font could be copied into normal and highlighted specimens. Preserve the source font sizes and page zoom.
- Remove the superseded specimen fade implementation so Icons and agent previews use the shared responsive masks without a competing override.

### Changed

- Check guard installation before source capture and display, accounting for Chrome computed-value normalisation and desktop WebKit lacking the iOS text-sizing property. Document the physical-device verification limit for the reported phone-only enlargement.

### Validation

- `node website/tests/specimen-mobile-parity-browser-check.mjs` — passed all 16 Chrome/WebKit cases, including guard presence in both source frames and all four galleries, Resources typography and body-selection glyph parity. Physical iPhone confirmation remains pending.
- `node website/tests/specimen-end-clearance-browser-check.mjs` — passed all 16 cases, including exact 24px endpoints and the actual responsive mask widths.
- `node website/tests/playground-browser-check.mjs` — passed source parity.
- `npm --prefix website run build` — passed; generated v26.0.256 displays verified, saved backdrop geometry reused.

## v26.0.255 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 11:00:21 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Restore specimen context and consistent overflow clearance

### Fixed

- Give all four specimen galleries a reachable 24px right-end gutter, including exterior focus paint, without retaining empty source-column width or counting padding twice.
- Restore the complete QR focus card and caption, preserving the actual QR button dimensions and focus boundary. Preserve captured theme-button widths so narrow gallery media queries cannot shift Moon inside a wider track.
- Centre Cross Mark where scroll limits permit; initially scroll Raised Hand and Black Rightwards Arrow to the right endpoint and White Heavy Check Mark to the left endpoint.

### Changed

- Share directional fade CSS and endpoint handling between Playground controls and every overflowing specimen viewport. Halve horizontal fade widths on mobile; clear fades at reached endpoints and when content fits.
- Strengthen body-selection typography checks against independently rendered Resources text, including glyph height, and document the shared overflow and in-situ specimen rules.

### Validation

- `node website/tests/specimen-end-clearance-browser-check.mjs` — passed all 16 Chrome/WebKit viewport and theme/agent cases across four galleries, including exact right-end clearance, fade clearing, QR context and theme-button geometry.
- `node website/tests/specimen-mobile-parity-browser-check.mjs` — passed all 16 cases, including Resources/body-selection font and glyph-height parity.
- `node website/tests/specimen-optical-feedback-browser-check.mjs` — passed all eight agent/theme and mobile/desktop cases, including Unicode positioning and footer behaviour.
- Source parity, seven-width external alignment, nested alignment, specimen fidelity, tab edges, scroll-axis ownership and overflow-hint checks — passed.
- Mobile dark-mode body selection, full QR card, theme control and fades visually inspected. `npm --prefix website run build` — passed; generated v26.0.255 displays verified and saved backdrop geometry reused.

## v26.0.254 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 10:24:12 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Align specimen paint and preserve meaningful overflow

### Fixed

- Align the isolated QR caption at 28px and place the full Resources fallback boundary at 24px, retaining its native page context.
- Remove unused source-column width from transparent text specimens and unnecessary trailing scroll padding, while preserving boxed component widths, focus clearance and login shadows. Keep the compact Typography footer free of empty scrolling and the Icons bullet footer on its original overflowing single line.
- Align the isolated QR button focus ring and demonstrate first-option keyboard focus independently of selected theme or agent. Preserve the canonical QR focus overlay.
- Derive selection-example typography from the demonstrated source through a shared helper, including monospace prompt selections.
- Show prompt Unicode characters in full source prompt containers, initially scrolled to the named character.

### Changed

- Document source-derived text typography, meaningful scroll extents, focus specimen boundaries and the distinct footer examples in the interface contract and design decision log.

### Validation

- `node website/tests/specimen-optical-feedback-browser-check.mjs` — passed at mobile and desktop widths for all four agent/theme combinations, including caption/fallback rails, QR focus overlay, selection fonts, Unicode visibility and both footer behaviours.
- `node website/tests/specimen-mobile-parity-browser-check.mjs` — passed all 16 Chrome/WebKit viewport and theme/agent cases.
- Specimen fidelity, seven-width specimen rails, external text alignment and Playground source-parity checks — passed; alignment checks reset intentionally pre-scrolled Unicode specimens before measuring their origin.
- Populated mobile dark-mode specimens visually inspected; `npm --prefix website run build` passed with generated v26.0.254 displays and saved backdrop geometry reused.

## v26.0.253 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 09:24:58 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Remove redundant specimen sizing overrides

### Removed

- Remove the fallback context maximum-width clamp, isolated QR ancestor maximum-width clamp and duplicate QR copy width. Preserve existing specimen layout and the shared captured-width authority.

### Validation

- Before-and-after geometry comparison across Typography, Icons, Status States and Focus and Selection at 320, 390, 768 and 1440px — unchanged positions, dimensions and scroll widths.
- `node website/tests/playground-specimen-fidelity-browser-check.mjs` — passed, including source widths, focus corrections, spinner motion and scroll ownership.
- `npm --prefix website run build` — passed; generated version displays match v26.0.253 and saved backdrop geometry was reused.

## v26.0.252 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 07:12:28 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Measure offscreen galleries before they become visible

### Fixed

- Commit gallery height and final-row spacing in a shared microtask, avoiding animation-frame suspension in offscreen mobile iframes. Remove the separate focus-gallery workaround.
- Extend mobile parity checks to reject incomplete iframe heights and internal vertical overflow before scrolling specimens into view.

### Validation

- Full Chrome/WebKit matrix at 320, 390, 768 and 1440px with both configured theme/agent pairs: source widths, rendered feedback parity, horizontal access, app isolation and full gallery height — passed.
- Existing specimen fidelity and scroll checks, plus populated mobile icon-gallery visual inspection — passed.
- Local Sites build and generated version/maintenance checks; saved backdrop geometry reused — passed.

## v26.0.251 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 07:08:08 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Preserve mobile specimen widths and inherited typography

### Changed

- Retain measured source boundaries across Typography, Icons, Status States, and Focus and Selection. Let every specimen viewport scroll horizontally instead of squeezing controls or full login contexts; keep annotations responsive.
- Capture typography widths from measurable source frames, preserve inherited root fonts, and prevent automatic mobile text inflation in gallery documents. Keep Resources responsive width rules unchanged.
- Add Chrome and WebKit coverage for source widths, horizontal access, app isolation, and copy-success/failure text compared with actual Resources, including rendered glyph height.
- Update the interface contract and decision log with the shared sizing and mobile parity requirements.

### Validation

- Chrome and WebKit at 320, 390, 768 and 1440px, light/Codex and dark/Claude: source dimensions and actual copy-feedback typography — passed.
- Additional 390px Chrome/WebKit checks: horizontal access and absence of gallery sizing in Resources — passed.
- Existing source parity, specimen fidelity, seven-width rails, external alignment and nested alignment checks — passed.
- Local Sites build, generated version/sizing checks, and LAN automatic sign-in; saved backdrop geometry reused — passed.

## v26.0.250 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 06:46:00 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Consolidate specimen rails and remove layered overrides

### Changed

- Give gallery layout one stylesheet, with a single 28px content inset and shared 4px rounded-boundary outdent. Remove superseded padding and width rules from the generator and app alignment sheet.
- Separate scroll clearance from optical nudges. Remove captured page translation before applying the focus correction, preserving selector tracks at 25px and visible focus edges at 24px.
- Apply the standalone X ink correction and bring the JavaScript fallback onto the common inset. Preserve source prompt widths and prevent delayed final-row padding in offscreen focus galleries.
- Document ownership and add explicit checks for the single stylesheet and visible focus edge.

### Validation

- Source parity, seven-width rail and external alignment checks, nested alignment, and specimen clearance — passed.
- Source widths, typography spacing, focus edges, icon motion, vertical scroll ownership and page-wheel chaining — passed.
- Mobile focus final-row check and local LAN automatic sign-in — passed.
- Local Sites build and generated bundle version/layout checks; saved anonymous backdrop geometry reused — passed.

## v26.0.249 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 06:35:16 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Move focus selector specimens one pixel right

### Changed

- Move only the Colour Theme and Coding Agent keyboard-focus specimen tracks 1px right, to 25px inside the grey frame. Keep headings and technical text on the 28px rail.
- Record the optical exception in the interface contract and design log, and update the existing alignment assertions.

### Validation

- Headless Chrome at 390px and 1440px: both tracks at 25px and both headings at 28px — passed.
- Shared alignment regression across seven widths, all tabs, both themes/agents and five expanded views — passed.
- Local Sites build passed; generated bundles contain v26.0.249 and the one-pixel rule. Saved anonymous backdrop geometry reused.

## v26.0.248 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 06:32:12 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Fix remaining typography gaps and focus specimen alignment

### Changed

- Remove the final Typography row's duplicated bottom padding, retaining the single 24px grey-container gutter.
- Stop isolated typography layout rules from exposing the hidden base Copy Prompt and Copy Link samples above their three labelled states.
- Restore theme and agent focus selector tracks to the 24px surface rail. Retain actual captured widths for both Focus prompt panels instead of leaving a compressed 32px right gutter.
- Use primary-text disclosure labels with accent chevrons; add 24px horizontal padding inside the expanded colour-source grey box.
- Ensure captured login-context inline margins cannot override the shared Status States surface rail. Update the interface contract and design decisions with the refinements.

### Validation

- Source typography/state parity across themes, agents and mobile/desktop — passed.
- Seven-width shared alignment and specimen rail/paint-clearance checks — passed.
- Fidelity checks cover the single bottom gutter, hidden duplicate buttons, real Focus prompt widths, selector alignment, disclosure inset, source dimensions, motion and page scrolling — passed.
- All eight disclosure labels and chevrons checked in light/dark themes. Mobile screenshots reviewed after layout settled, including copy states and the final Typography row.
- Local Sites build passed; final bundles contain v26.0.248 and the fixes. Saved anonymous backdrop geometry reused; no publication performed.

## v26.0.247 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 06:06:32 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine specimen fidelity, optical alignment and scroll ownership

### Changed

- Normalise isolated typography annotation gaps to 16px; remove inherited toolbar/paragraph spacing and align isolated footer examples.
- Preserve actual captured Resources prompt widths; stack copy success/failure rows and allow horizontal inspection of wider specimens without scaling complete contexts.
- Apply requested 6px focused-control corrections without shifting annotations; correct standalone X groups by measured whitespace and remove the colour table first-cell padding.
- Restore Loader Circle motion with reduced-motion support; order Playground icons by identity, headings, UI and other uses, with a documented maintenance contract.
- Unify explanatory disclosure styling, align colour-rule content within a grey surface and collapse the URL Reference introduction.
- Grow inline grey previews to their natural height and preserve page wheel scrolling and expanded-view scroll restoration. Remove the final Status States row's duplicated 24px bottom space.

### Validation

- Source typography/state parity across themes, agents and mobile/desktop; seven-width external/nested alignment; four-width shadow clearance; 180 selection regions; expanded modal restoration — passed.
- Fidelity checks compare real Resources prompt dimensions, annotation gaps, focus exceptions, footer alignment, disclosure text rails, icon order and spinning/reduced-motion states. All inline preview surfaces have no nested vertical scroll range; wheel events scroll the page.
- Connection Failure, Sign-In Unavailable and Ready to Retry had equal spacing; no distinct one-pixel defect was reproduced. The final JavaScript row now has a 24px lower gutter.
- Resources no-JavaScript notice verified at 342px wide on a 390px phone and 960px on a 1440px desktop, with natural wrapping. Mobile/desktop screenshots reviewed; physical-device review remains manual.
- Local Sites build passed; final bundles contain v26.0.247 and the updated features. Components layout revision marked pending; saved anonymous backdrop geometry reused without remeasurement.

## v26.0.246 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 05:16:13 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Unify specimen rails and remove duplicated horizontal padding

### Changed

- Align gallery text 28px inside grey frames and designated rounded specimens at 24px; remove accumulated iframe, row and preview padding.
- Extend scroll viewports into existing grey gutters for outdents and focus rings. Preserve visible overflow around complete login contexts and keep paint within the outer specimen frame.
- Retain native full-page preview gutters and document the single-owner specimen spacing contract.
- Replace padding-specific clearance assertions with rail and paint-clearance checks; wait for visible iframe control layout and measure settled geometry.

### Validation

- Seven-width specimen rail and containment checks, external/nested alignment, menu containment, expanded previews, sticky controls, tool focus, overflow and tab-edge checks — passed.
- Source parity at mobile/desktop widths for both themes and agents, four-width specimen clearance, 180 horizontal-only selection regions and authentication tests — passed.
- Populated mobile/desktop screenshots reviewed for controls, focus rings and held login shadows; physical-device testing remains manual.
- Sites local build helper — passed; generated server bundles contain v26.0.246 and the new specimen rail token. Saved anonymous backdrop geometry reused.

## v26.0.245 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 04:05:18 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Synchronise agent and theme across Resources and Playground

### Changed

- Update open Resources and Playground tabs from shared browser preferences, including selector state and active specimens. Preserve inactive-tab idle warming and avoid whole-document Playground colour animations.
- Keep Playground controllers and existing preference query parameters current without writing received changes back to storage.
- Read the latest saved preferences when processing queued storage events and cancel obsolete local theme reveals when a newer remote choice arrives.
- Add real two-tab browser coverage and document the synchronisation lifecycle.

### Validation

- Cross-tab browser check — passed both directions, controls/specimens, rapid changes, interrupted theme reveals, URL/reload persistence and absence of Playground bulk transitions.
- Theme transition and control-colour browser checks — passed.
- Auth, reveal-radius and Playground structure tests — passed all 13 checks.
- Playground browser check — passed source parity and responsive coverage for both agents/themes at 320, 390, 768 and 1440px.
- Playground scheduling browser check — passed cold loading, latest-state delivery, warming, interaction pauses, cached palettes, reduced motion and idle fallback. With all tabs loaded and 4× CPU throttling, maximum frame gaps were 50ms for Agent/Theme and 17ms for Width/Hover, compared with the original 183–217ms baseline.
- Production build and generated-artefact checks — passed with v26.0.245 and 12 deferred frames; saved backdrop geometry reused. LAN Main App and Playground returned HTTP 200, and a fresh automatic session was recognised. Physical-device behaviour remains unverified.

## v26.0.244 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 03:53:21 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Keep Playground controls responsive with deferred tab updates

### Changed

- Apply current settings immediately to the active tab and create inactive specimen documents on demand, retaining the latest state through rapid changes.
- Warm inactive tabs in small idle batches after interaction stops; pause for scrolling, pointer movement, typing and held pointers, including interaction inside sandboxed specimens. Prioritise visible tab buttons, deliberate hover and keyboard focus; selecting a tab forces preparation.
- Conceal stale specimen palettes until matching settings and captured gallery content are applied. Cache palette-specific captures, send only relevant settings and interrupt obsolete background captures between simulated states.
- Batch swatch style reads, use one pixel read and cache results by theme/agent. Defer hidden swatches and retain the hyperlink reference table instead of rebuilding it for every control change.
- Document the loading lifecycle and add focused browser coverage while retaining shared app sources, authentication and approved selector timing.

### Validation

- `node --test website/tests/auth.test.mjs website/tests/playground-structure.test.mjs` — passed all 12 checks.
- `node website/tests/playground-browser-check.mjs` — passed source parity, both agents/themes at 320, 390, 768 and 1440px, held states, inspection and navigation containment.
- `node website/tests/playground-connected-controls-browser-check.mjs` — passed responsive controls, keyboard selection and hyperlink styling.
- `node website/tests/playground-scheduling-browser-check.mjs` — passed cold loading, latest-state delivery, hover warming, held-pointer pauses, idle catch-up, cached focus palettes, reduced motion and idle fallback at 390 and 1440px. With all tabs loaded and 4× CPU throttling, each tested control's largest frame gap was 17ms, compared with 183–217ms in the original baseline; an earlier new-code run measured 17–50ms.
- Local production build and generated-artefact checks — passed; server-only Playground retains 12 deferred frames and displays v26.0.244. Saved backdrop geometry reused.
- Website PVS validation and final metadata/diff checks — passed. LAN Main App and Playground returned HTTP 200 with a fresh automatic session; desktop/mobile screenshots inspected. Physical-device behaviour remains unverified.

## v26.0.243 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 03:32:12 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Widen hostname status and query effect columns

### Changed

- Keep the Hostname Redirects Status and Owner column on one line.
- Give the Public Query Parameters Effect column a 36ch minimum and 44ch preferred maximum to avoid a third line containing an orphaned word.
- Retain other columns' existing content-aware wrapping rules.

### Validation

- Mobile-emulated table checks — passed one-line hostname statuses and query effects of at most two lines at phone, tablet and desktop sizes, consistent typography and contained overflow.
- Structure tests and local production build — passed. Mobile hostname status screenshot inspected.

## v26.0.242 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 03:26:59 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Size reference columns according to their content

### Changed

- Classify URL Reference columns by their semantic headings: compact addresses, titles and identifiers stay on one line; explanatory columns retain a 28ch minimum and 40ch preferred maximum; alias lists keep their existing wrapping.
- Allow horizontal table scrolling instead of compressing status and explanatory text into narrow columns. Preserve consistent typography and mobile text-autosizing protection.

### Validation

- Mobile-emulated table checks — passed compact-cell no-wrap rules, readable prose widths, hostname status rows of at most two lines, intrinsic sizing and contained overflow across phone, tablet and desktop widths.
- URL Reference regression across four widths and both themes/agents, structure tests and local production build — passed.
- Mobile Resources Aliases and horizontally scrolled Hostname Redirects screenshots inspected; alias-list wrapping retained.

## v26.0.241 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 03:21:26 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Keep URL tables compact with consistent mobile typography

### Changed

- Disable automatic text inflation inside URL Reference table wrappers and explicitly size cells at 14px and inline code at 12.6px. Preserve browser zoom and typography outside the tables.
- Remove the forced 600px minimum and full-panel width. Let tables size to content and available space, wrapping between aliases while keeping individual paths and parameters intact.
- Preserve horizontal scrolling, keyboard access and contained overflow for tables whose content cannot fit the viewport.

### Validation

- Mobile-emulated table sizing checks — passed consistent cell/code sizes, text-size adjustment, intrinsic desktop widths and no page overflow at phone, tablet and desktop sizes.
- URL Reference regression across four widths and both agents/themes, all-tab scroll checks and structure tests — passed.
- Local production build — passed. Mobile and desktop Resources Aliases screenshots inspected; iOS font-inflation correction awaits physical-device confirmation.

## v26.0.240 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 03:12:29 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Make the mobile sticky header eligible for browser edge tinting

### Changed

- Make the actual mobile sticky tab container viewport-wide while preserving its 24px inner tab inset and inset divider. Apply the layout to all mobile browsers without user-agent detection; retain desktop and tablet geometry.
- Remove the separate fixed background sibling. WebKit's edge heuristic examines the hit-tested element and its ancestors, requiring approximately viewport-wide containers; the narrower tab ancestor could hide that sibling from detection.
- Retain the existing above-header background, scroll landing, floating tools and 16px panel gap. Document the ancestor requirement in repository instructions.

### Validation

- Focused mobile ancestor, tab-edge, sticky, all-tab scroll and seven-width external/nested alignment checks — passed; confirmed the top-edge hit target belongs to the viewport-wide sticky container and tab content remains inset.
- Structure tests, full Playground regression, local production build and LAN app/Playground/login verification — passed.
- Mobile screenshot inspected. WebKit source review identified a concrete mismatch with its sampling heuristic; the actual ChatGPT iOS embedded toolbar still requires physical-device confirmation.

## v26.0.239 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 03:05:58 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Balance URL headings and refine selector and mobile backgrounds

### Changed

- Give collapsed URL subheadings 20px visible clearance from their hover boundary to the dividers above and below, retaining expanded heading-to-content spacing.
- Match Playground unselected option hover text to Resources: darker in light mode and lighter in dark mode, retaining selected text colours.
- Prevent native text/image dragging and selection within segmented controls while preserving cancelled presses, focus and keyboard activation.
- Add a full-width fixed page-colour background at the mobile viewport edge, with the existing approach fade and tab-height coverage. This replaces reliance on an off-screen pseudo-element alone for embedded iOS browser colour extension, without changing the mobile panel gap.

### Validation

- Focused hover/drag, scroll-clearance and held-toggle browser checks — passed hover text parity, cancelled drags, unchanged selection, all-tab initial scroll stability, H3 spacing and fixed background geometry.
- Full Playground regression, seven-width external/nested alignment and focus checks — passed.
- Structure tests, local production build and LAN app/Playground/login verification — passed. Mobile screenshot inspected. ChatGPT's embedded iOS browser chrome cannot be reproduced in headless Chrome; physical-device confirmation remains necessary.

## v26.0.238 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 02:47:58 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Align selections clear of fades and stabilise sticky navigation

### Changed

- Share the 108px overflow fade and 36px shoulder between tabs and selector rails. Align first/last options to their scroll boundaries, centre middle options on mobile, and move tablet/desktop selections only when obscured by the fade.
- Round sticky landing coordinates upward and exclude sticky controls from browser scroll anchoring. Retain the established tab-click landing position.
- Restore the 16px mobile panel gap and fade in background coverage above the tab bar as it approaches the viewport top, preserving stacked floating tools.
- Restore expanded URL H3 spacing and reduce the gap after collapsed H3 sections by 4px.
- Document the shared selection visibility rules and mobile spacing.

### Validation

- Focused browser checks — passed first-scroll stability after every tab at phone, tablet and desktop widths, selection clearance, edge alignment, mobile spacing and collapsed H3 spacing.
- Selector colour comparison — passed identical Resources agent/theme track backgrounds and matching Resources/Playground hover fills in both themes; no palette change needed.
- Full Playground regression, seven-width external/nested alignment, tab edges, overflow hints, 180 scroll regions, sticky and expanded-view checks — passed.
- Structure tests and local production build — passed. Mobile and desktop screenshots inspected. The reported flicker was not reproduced before the stabilisation change; physical-device translucent browser chrome remains unverified.

## v26.0.237 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 02:25:27 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine pinned labels, overflow fades and selector hover layers

### Changed

- Fade toolbar labels over the final 64px before pinning and hide them completely when pinned, preserving the existing tab navigation landing position.
- Extend tab overflow fades to 108px with a 36px shoulder and cover the area above pinned mobile tabs with the page background.
- Set the URL Reference introduction-to-section gap to 16px and reduce spacing below its H3 heading rows by 4px.
- Place Replay Animation before Copy Values with an 8px visible gap in inline and expanded views.
- Paint unselected selector hover fills behind the moving selection indicator. Darken them in light mode and lighten them in dark mode; keep selected fills unchanged on hover.
- Restore the previous prompt copy hover colour and document the shared hover and fade rules.

### Validation

- Focused browser checks — passed pinned label visibility, URL spacing, inline/expanded action order and gaps, mobile background coverage and selector layer ordering.
- Regression checks — passed control spacing, seven-width tab edges, sticky navigation, held selectors, theme colours and transitions, and the full Playground source-parity and interaction suite.
- Structure tests and local production build — passed. Held light/dark selector screenshots inspected; physical mobile browser chrome remains untested.

## v26.0.236 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 02:01:12 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine sticky navigation and shared control presentation

### Changed

- Pin mobile tabs at the top and move Style Options and Back to Top with scroll position into a vertical stack beneath them. Retain desktop control placement and expose its 1px divider. Selecting another tab lands at the start of the pinned region.
- Align tab boundaries with panel surfaces, remove the extra background overhang and separate white panels by 16px.
- Apply a 36px selector layout gap to deliver 32px between optically outdented visible surfaces. Document the compensation in repository instructions.
- Strengthen overflow hints with 54px horizontal fades and an 18px low-opacity shoulder, retaining endpoint clearing; increase vertical fade width to 30px and the colour-table fade to 42px.
- Balance URL H3 hover boundaries. Add the colour-table top divider and monospaced parameter values; remove the list examples' bottom divider and excess spacing, and let the reference frame grow without nested vertical scrolling.
- Group Replay Animation with Copy Values and Reset Defaults, matching button padding in inline and expanded views. Share control spacing across both views.
- Use a shared darkening hover fill for unselected agent/theme options across Resources, login and Playground, including compact controls and prompt copy buttons.

### Validation

- Focused browser checks — passed mobile/desktop sticky geometry, tab landing, divider clearance, actual selector surface gaps, H3 balance, Typography sizing and expanded replay parity.
- Regression checks — passed sticky controls, copy states, mobile menu containment, control rhythm, expanded preview restoration, fade endpoints and 180 selection regions without vertical scroll traps.
- Full source-parity and interaction suite, seven-width external/nested alignment and LAN session/login verification — passed.
- Local production build — passed. Mobile and desktop screenshots inspected; no physical-device testing, push or publication performed.

## v26.0.235 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 01:10:38 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine selector spacing, disclosure lists and colour specimens

### Changed

- Move Typography list examples beneath the colour table and use canonical agent parameter values in its rows. Give equal-size colour chips an external outline so white fills remain visible.
- Group consecutive selectors into naturally sized wrapping rows with 32px horizontal gaps. Increase slider-grid horizontal gaps to 32px while retaining 32px vertical separation and three-column limits.
- Remove icon-location disclosure underlines and align list containers beneath summary text before applying shared bullet indentation.
- Add hover fills to unselected Resources agent and theme options.
- Restrict native login specimen width overrides to login controls, preserving prompt optical extension. Compare Typography parity against its own viewport, accounting for the edge-to-edge login preview.
- Update repository spacing guidance and the Playground layout cache key.

### Validation

- Focused browser checks — passed Typography order, canonical agent labels, equal chip dimensions, wrapping selectors, disclosure indentation and Resources hover feedback.
- Layout regression checks — passed control rhythm, expanded controls, external and nested alignment across seven widths, and mobile menu containment.
- Source parity and interaction regression — passed both agents/themes, held login states, copy feedback and hosted fail-closed behavior.
- Local production build and LAN preview verification — passed. No push or publication performed.

## v26.0.234 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 12:50:32 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine Playground navigation, specimen widths and URL disclosures

### Changed

- Reset scroll to the page top when selecting another Playground tab.
- Let the full login viewport reach its rounded frame boundary, retaining safety padding for isolated specimens.
- Preserve measured native widths for login controls and JavaScript notices in Typography; refresh source measurements when opening the tab. Match the colour comparison caption to the link example headings.
- Contain the URL Reference introduction in an aligned surface and give each H3 subsection its own accessible full-row collapse control, independent of its parent section.
- Advance the Playground anonymous layout cache key; internal builds reuse saved geometry.

### Validation

- Focused browser checks — passed tab scroll reset, independent nested disclosures, login frame padding, measured control/notice widths and caption typography.
- Section collapse, URL Reference and specimen-clearance browser suites passed responsive checks; Playground structure test passed.
- Sites local production build passed. No push or publication performed.

## v26.0.233 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 12:36:48 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Unify Playground control rhythm and responsive navigation

### Changed

- Apply 32px vertical separation to Playground control groups, including actions, checkboxes and sliders, retaining the Resources 40px selector-to-content gap. Match slider labels/values to 14px semibold selector headings and reduce label-to-hit-target spacing to 4px while preserving 44px hit targets.
- Give slider groups the Icons grid's container width, 280px minimum columns and 24px horizontal gap, capped at three columns. Keep 32px row gaps and preserve label rails in inline and expanded views.
- Reserve a side-by-side mobile floating-tool row above sticky tabs with a 24px gap; retain desktop whitespace above pinned tabs. Tint the selected tab and extend only its grey backdrop 4px sideways. Allow vertical wheel scrolling to chain through horizontal selector/tab strips.
- Share compact 20px hanging list indentation and monospace element references with Resources through the theme module. Add short, wrapped and nested list specimens to Typography; format source filenames and usage identifiers as code.
- Give icon-location disclosures an accented chevron, subtle fill and boundary. Keep all applicable actions and checkboxes in expanded Preview Controls and restore their original placement on close.
- Update repository guidance and the Playground layout cache key. Internal builds continue to reuse saved anonymous geometry.

### Validation

- Focused browser checks — passed slider columns and label clearance, mobile floating-tool hit targets, background overhang, real wheel scrolling, complete expanded controls and shared list specimens at phone/tablet/desktop widths.
- Regression checks — passed source parity, expanded-preview state/focus restoration, optical and nested alignment at seven widths, menu containment, tab edges and 180 vertically locked selection regions.
- Build and preview checks — passed source structure and production build. Populated mobile/desktop list screenshots reviewed; physical-device testing was not performed.

## v26.0.232 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 11:46:38 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Contain worm selection paint within its own bounds

### Fixed

- Clip the worm's native selection backing to its own box so selecting the whole Resources or Playground page cannot cover the start of WAVELENGTH. Preserve the existing black/white worm, themed highlight colours and geometry through the shared renderer.

### Changed

- Extend the brand regression to compare opaque wordmark letter pixels before and after full-page selection, catching overlap that the earlier backing-colour checks missed.

### Validation

- `node website/tests/brand-selection-browser-check.mjs` — passed both pages at four widths, in both themes and for both agents (32 combinations), including wordmark ink, backing colours and floating geometry. A browser-only negative control with clipping disabled failed with 69 obscured letter pixels in the first case.
- Safari 27.0.1 on macOS — full-page selection screenshots visually confirmed the complete wordmark on Resources and Playground in both themes. Physical iPhone Safari was not tested.
- `node website/tests/playground-browser-check.mjs` — passed the complete Playground regression and source-parity suite.
- `node --test website/tests/playground-structure.test.mjs website/tests/placeholder.test.mjs` — passed all three tests.
- `npm --prefix website run build` — passed; generated Resources and authenticated Playground display v26.0.232.

## v26.0.231 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 11:42:59 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Scope press motion and refine sticky Playground navigation

### Changed

- Remove generic ordinary-button press scaling and hold listeners. Retain the shared animated controller only for agent, theme and Playground segmented selectors; record this boundary in repository instructions.
- Widen section-header hover targets another 4px per side without moving their icon pivot. Pin the adjacent, gap-free tab bar below desktop selectors and at the viewport top on mobile.
- Remove global H3 borders that duplicated gallery row separators; retain H3 dividers only in URL Reference. Give disclosure summaries a shared hover target over the icon and text, with 14px semibold icon-usage labels matching their list typography.
- Use the Resources copy-control markup and styles for URL examples, including mutually exclusive Copy, Check and X icons. Label the control Copy Text, with Text Copied and Copy Failed feedback.
- Use 24px below Playground selector groups while preserving the 16px label gap. Refresh the URL reference wording and advance the Playground layout cache key, retaining saved anonymous geometry for this internal build.

### Validation

- Interaction checks — passed real Resources touch holds and keyboard activation without scale, retained segmented-selector hold behaviour, rapid header clicks, sticky tabs at phone/tablet/desktop widths and Copy Text typography/state parity.
- Browser regressions — passed source parity, adjacent tab edges, existing pinned selectors, modal containment and single gallery dividers. Desktop and mobile screenshots reviewed; physical-device testing was not performed.
- Build checks — passed source structure and production build. LAN app, Playground and real logged-out form verified using the new preview process.

## v26.0.230 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 11:29:13 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Preserve worm colours with matching selection highlights

### Fixed

- Draw the Wavelength worm from the existing asset as a separate mask above native selection paint, keeping it black in light mode and white in dark mode while its backing matches selected text.
- Share the renderer across Resources, the Playground header, captured Icons specimens and floating branding. Retain existing dimensions, decorative accessibility semantics and saved login-backdrop image styling.

### Changed

- Add pixel-based selection checks for both pages at four widths, both themes and both agents, including floating-logo geometry. Refresh affected branding selectors and restore the Blocks test viewport before clicking its specimen.

### Validation

- `node website/tests/brand-selection-browser-check.mjs` — passed backing-colour pixels, worm ink, dimensions and floating alignment across both pages and all 32 combinations.
- `node website/tests/playground-browser-check.mjs` — passed source parity and the complete Playground regression suite.
- Safari 27.0.1 on macOS — passed integrated Resources and Playground header checks in light/dark mode; screenshots visually reviewed. Physical iPhone Safari was not tested.
- `node website/tests/worm-halo-browser-check.mjs` — passed branding specimen geometry, theme/agent variants, settings and visibility after refreshing legacy route and grid expectations.
- Icons gallery and saved dark login backdrop — passed targeted rendering checks.
- `npm --prefix website run build` — passed; generated Resources and authenticated Playground display v26.0.230. Structure and placeholder tests passed; saved backdrop geometry was not remeasured.

## v26.0.229 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 11:20:33 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Polish section interactions, icon galleries and URL examples

### Changed

- Extend section-header hover targets another 4px on each side, keep fixed button margins and reserve the page scrollbar gutter to avoid horizontal reflow during collapse. Collapsed chevrons now point left around their existing fixed pivot.
- Collapse icon usage lists exceeding five locations into native disclosures, leaving source links independently visible. Reduce final App Icons row padding and size its iframe to the live contents, including optional sources.
- Add presentation-only dividers above Playground H3 headings, without inserting redundant Markdown rules. Add working Copy buttons to URL code examples with brief Copied/Failed states and no explanatory messages.
- Use Globe for URL Reference and Canonical Addresses and Page Titles, and the previously unused Split icon for Hostname Redirects. Place Easter Egg last in the tabs and canonical-path reference table.
- Refresh measured icon bounds and advance the Playground layout cache key. This internal build retains saved anonymous backdrop geometry.

### Validation

- Interaction checks — passed rapid-click geometry at phone/desktop widths, left-facing chevrons, full-row hover extents, usage disclosure/source separation and clipboard success/failure.
- Regression checks — passed all-section collapse and keyboard checks at four widths, URL Reference across themes/agents, source parity, gallery refinements and nested alignment at seven widths.
- Build checks — passed source structure and production build; mobile code-panel screenshot visually reviewed. Physical-device testing was not performed.

## v26.0.228 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 11:01:43 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine Playground section controls, specimen rails and icon references

### Changed

- Make entire section heading rows accessible collapse buttons with full-row hover and hand cursors. Centre heading icon ink and disclosure chevrons against font cap height; rotate collapse chevrons anticlockwise around a fixed pivot.
- Restore segmented-selector legends to their normal rail and align disclosure body copy with summary text. Reserve 16px on both sides of iframe viewports and highlighted specimens, and retain gallery dividers across source-group boundaries.
- Respect hidden source links and align visible source labels with consistent spacing. Add empty Lobe, Unicode and Other family filters; catalogue actual cropped-arrow link usages, including both Typography examples and iframe source links.
- Give URL Reference sections globally distinct heading icons, reorder canonical paths to match tabs, and match fenced code panels to Resources prompt surfaces and fonts.
- Update repository alignment guidance and measured icon bounds. Advance the Playground layout cache key; reuse saved anonymous geometry for this internal build.

### Validation

- Browser checks — passed full-row collapse, keyboard focus, reflow and reload defaults at four widths; source parity, responsive optical alignment, disclosure bodies, source visibility, gallery dividers, icon families, cap-height alignment and URL Reference checks.
- Scrolling checks — passed responsive tab edges and 180 selection regions without vertical movement or forced horizontal scrolling.
- Build checks — passed source structure and production build; mobile screenshot reviewed. Physical-device testing was not performed.

## v26.0.227 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 10:39:33 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add collapsible Playground sections with aligned chevrons

### Added

- Add a Lucide chevron-down disclosure control to every Playground section header, matching the heading icon size and first-line alignment. Compensate measured SVG whitespace and button padding to keep its visible stroke 28px from the container’s right edge in both orientations.
- Rotate the chevron 90 degrees anticlockwise when collapsed, leaving only the heading icon, title and toggle visible. Restore original content layout on expansion and let following sections reflow naturally.
- Expose expanded state and controlled content to assistive technology; retain keyboard focus and respect reduced motion. Keep collapse state in the current document only, so reload expands all sections on all tabs.
- Include the new icon in the Playground catalogue and refresh iframe measurements after expansion. Retain existing controls in full-screen preview mode.

### Validation

- Section browser checks — passed for every section at 320, 390, 768 and 1440px, including optical alignment, reflow, pointer/keyboard activation, Tab/Shift-Tab focus, reload reset and full-screen compatibility.
- Existing alignment and modal checks — passed across seven widths, all tabs, both agents/themes and expanded previews. Mobile/desktop screenshots visually reviewed.
- Final LAN preview — passed for main app, Playground touch collapse/expand, 160ms anticlockwise animation and the real logged-out form.
- Structure checks, production build and generated-artifact assertions — passed. Internal build reused saved backdrop geometry and advanced the Playground layout cache key for future authorised publication preparation.

## v26.0.226 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 10:33:47 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Expand URL Reference aliases and standardise heading case

### Changed

- Order Playground Icon Use as All, Playground, Section Headings, UI Elements and Other. Keep cropped navigation arrows and disclosure chevrons in UI Elements; reserve Other for uncategorised uses.
- Add 301 aliases for url/urls, reference/references and every url/urls × reference/references combination, both at the site root and beneath Playground root aliases. Preserve descendants and combine case/query canonicalisation in one hop. Update the shared URL reference document and rendered tab together.
- Audit rendered Resources, login and Playground headings, table headings and control-group headings against CMOS 18. Correct URL Reference conjunctions and the QR specimen heading while preserving official technical identifiers and sentence-style image alt text. Record the title-case convention in repository instructions.

### Validation

- Route tests — 14 passed, including GET/HEAD alias variants, descendants, query preservation, segment boundaries, canonical destinations and unchanged POST handling.
- Headless browser checks — passed for heading corrections, icon order/filtering at mobile and desktop widths, and URL Reference content/navigation across four widths, both agents and themes.
- Production build and built Worker redirects — passed, including all new root and section shortcut combinations.

## v26.0.225 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 10:28:26 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Fix Playground specimen layout and improve URL reference display

### Changed

- Reserve a shared 16px inset around gallery specimens while retaining the 4px rounded-surface outdent. Align toggle legends with the first option text and record these rules in repository instructions.
- Add the Playground Icon Family selector, use shared cropped-arrow geometry with Typography link-example usage labels, and give every URL Reference section a distinct measured Lucide icon.
- Render fenced Markdown examples in bordered, keyboard-accessible code panels using Resources surface tokens.

### Fixed

- Remeasure sticky selectors when revealing the Resources iframe so controls initialised in a hidden tab do not overlap at zero coordinates.
- Preserve the login JavaScript notice’s 4px outdent in captured specimens and remove overflow fade masks that clipped login-panel shadows.

### Validation

- Production build, generated-artifact assertions and structural tests — passed.
- Headless browser checks — passed for source parity, URL Reference, nested and page alignment, specimen clearance, and sticky-control stability across mobile and desktop layouts.
- Final LAN preview — passed for Resources, Playground, toggle text alignment, automatic real session creation and session revocation.
- Reused saved anonymous backdrop geometry for the internal build; marked Playground geometry stale for the next authorised publication preparation.

## v26.0.224 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 10:04:55 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add the URL Reference tab and reciprocal logo shortcuts

### Added

- Add `/component-playground/url-reference`, rendering the repository URL reference with path mappings, redirects, query parameters, aliases and authentication behaviour. Keep examples non-interactive to prevent accidental logout, and support `/url-references` as a section alias.
- Give the tab, section headings and subheadings relevant measured Lucide icons; include their usages and official source links in the Playground Icons catalogue.
- Reuse the Resources three-click/tap gesture for reverse navigation from Playground to canonical Resources in a separate tab/window. Support both authenticated pages and both login screens using actual anonymous backdrop logo bounds, without granting access or intercepting the login panel.

### Changed

- Require future URL/query changes to update both `URL-REFERENCE.md` and its Playground representation. Keep documentation-only updates free of website/browser tests, preview restarts, password changes and preview-verification handoffs.
- Keep URL tables readable on narrow screens with keyboard-accessible horizontal scrolling inside their cards.
- Preserve script-disabled anonymous Components backdrops while allowing the parent page to read their logo geometry.

### Fixed

- Supply the required heading icon so URL Reference no longer interrupts Playground tab initialisation; add a source-level regression check for all tab panels and icon sources.
- Catalogue full-size navigation arrows separately from the cropped link-arrow variant.

### Validation

- Routing, authentication, local-preview and Playground structure checks — 29 passed; placeholder source tests also passed during the build.
- URL Reference browser checks — passed at 320, 390, 768 and 1440px in both themes and both agents, including path/query content, heading/tab icon catalogue entries, keyboard-accessible tables and overflow.
- Reciprocal logo shortcut browser checks — passed at four widths with mouse/touch, both login states, canonical destinations, no opener, timeout/reset behaviour and specimen navigation containment.
- Playground source parity, seven-width optical alignment, tab edges, selection scroll axes and canonical section navigation — passed. Anonymous Components backdrop checks passed 20 viewport combinations with both themes/agents and no protected content or scripting.
- Installed Lucide ink measurement verification — passed. Mobile/desktop URL Reference screenshots visually inspected.
- Sites production build and generated version display — passed with v26.0.224. Built Worker checks passed 144 baseline redirects plus case, descendant, plural, query-value and invalid-value cases.
- Final LAN preview — verified Resources, Playground, login form, automatic real session creation and session revocation. Earlier permission-review timeouts no longer prevented test execution.
- No push or publication performed.

## v26.0.223 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 09:28:56 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Document URL rules and complete Playground canonicalisation

### Changed

- Set the Playground and its login browser titles to Component Playground.
- Add `/style`, `/styles`, `/guide` and `/guides` as 301 Playground prefix aliases with descendant preservation.
- Remove unsupported or empty agent/theme values by 301, preserving unrelated query bytes and using the first remaining valid value.
- Add `URL-REFERENCE.md` with the complete canonical path, hostname redirect, query parameter, authentication and page-title reference; link it from README and align governing instructions.
- Confirm the older ai-implementation-workshop-resources hostname still returns a Sites-controlled 307 to workshop.adamjaffrey.chatgpt.site with path/query preservation. No hosting settings changed.

### Validation

- Route, authentication and local-preview regression checks — 28 passed, including protected-content assertions independent of public page titles.
- URL preference browser checks — passed at mobile/desktop widths, including saved preferences after invalid-value removal.
- Browser title checks — passed for both pages and their login forms on the active LAN preview.
- Sites local build and generated version verification — passed with v26.0.223. Built Worker redirect checks passed 134 baseline cases plus descendant, plural, canonical value, short alias and invalid-value cases.
- No push or publication performed.

## v26.0.222 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 09:15:28 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Use AI Workshop Resources as the Resources page title

### Changed

- Set the Resources login browser title and framework metadata to AI Workshop Resources, matching the existing signed-in title and visible heading.

### Validation

- Rendered login and signed-in document titles — passed.
- Headless browser verification on the active LAN preview — both Resources states show the requested title; Playground retains its existing title.
- Sites local build and generated version verification — passed with v26.0.222; no layout changes or geometry remeasurement. No push or publication performed.

## v26.0.221 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 09:05:49 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Complete descendant redirects and canonical URL preferences

### Changed

- Use HTTP 301 for all application canonical redirects, including trailing-slash-only corrections on otherwise unknown lowercase paths.
- Preserve descendants beneath every registered Resources and Playground alias, including section aliases. Match path boundaries, keep the root alias exact-only, and retain 404 responses for unimplemented destinations.
- Complete ai/ais × workshop/workshops × resource/resources, style/styles × guide/guides, focus/focuses/foci × selection/selections, and easter/easters × egg/eggs alias families.
- Redirect agent/theme aliases to `codex`, `claude-code`, `light` and `dark`, sharing one vocabulary with the pre-paint scripts and combining corrections into one hop while preserving unrelated query data.
- Make either explicit show-login boolean use real session handling on every local page, including all Playground sections. False requires a valid session; true revokes it. Preserve anonymous Playground access only when the parameter is absent.

### Validation

- Route, authentication and preview tests — 27 passed, including descendant/plural matrices, unknown destinations and both login booleans across all supported pages.
- URL preference and login-error browser checks — passed at mobile/desktop widths, including canonical values, Playground login continuity and real session revocation.
- Required Playground source-parity suite — passed across four widths, both themes/agents and held states.
- Sites production build — passed with v26.0.221. Built Worker checks passed 134 baseline redirect cases plus descendant/plural and canonical-parameter cases with no extra application hop.
- Active LAN preview — app, Playground, login form, canonical descendants and session handling verified. No push or publication performed.

## v26.0.220 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 08:38:39 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Point the QR code and Copy Link to the site root

### Changed

- Encode exactly `https://workshop.adamjaffrey.chatgpt.site` in the Resources QR code, preserving its dimensions and quiet zone.
- Align the QR Copy Link action, alternative text and documentation with that root-only address.

### Validation

- Independent macOS Vision QR decoding — passed with the exact requested URL.
- QR Copy Link browser check — passed, including clipboard fallback, feedback and focus.
- Required Playground source-parity browser suite — passed across mobile/desktop, both agents/themes and held states.
- Local Sites build and generated version checks — passed with v26.0.220. Active LAN app, Playground and login form verified; no push or publication performed.

## v26.0.219 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 07:46:06 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Rename Resources URLs and make login controls explicit

### Changed

- Make `/ai-workshop-resources` canonical, retaining `/workshop-resources` and all existing Resources alternatives as 301 redirects. Update login, logout, expiry and preview destinations.
- Replace the ambiguous login selector with `show-login=true` or `show-login=false`. Redirect legacy `login=1/0` and boolean `logged-in`/`logged-out` aliases to their corresponding canonical value. Remove unsupported login-selector values; retain unrelated query data and first-valid-value ordering.
- Make `show-login=true` revoke the current session and display the requested login form on hosted and local routes. Remove the parameter after successful login to avoid a logout loop. `show-login=false` never authenticates or triggers local automatic sign-in.
- Change the existing Sites slug to `workshop` as explicitly requested. Sites confirmed the change; the previous hostname returns 307 to the new hostname, preserving paths and queries. This hosting change does not publish this application build.
- Update Copy Link and the QR code to `https://workshop.adamjaffrey.chatgpt.site/ai-workshop-resources`, and document the canonical URLs and login semantics.

### Validation

- Route, authentication and local-preview regression tests — 24 passed, including real session revocation and no authentication from false selectors.
- Mobile/desktop URL preference and login-error browser checks — passed, including successful login without a logout loop and retained section/query context.
- Playground source-parity suite — passed across four widths, both agents/themes and held login states; mobile screenshot inspected.
- Copy Link and clipboard fallback browser check — passed. Regenerated QR independently decoded by macOS Vision to the exact canonical destination.
- Sites production build — passed with v26.0.219. Built Worker redirect checks — passed (134 existing/alias cases plus canonical path and query checks).
- LAN app, Playground, login form, session revocation and no-auto-login checks — passed. No GitHub push or application publication performed.

## v26.0.218 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 07:30:43 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Normalise public query parameter names and values

### Changed

- Lowercase known public query parameter names and values (`agent`, `theme`, `login`) in the shared GET/HEAD canonical redirect, combining hostname, path and selector corrections into one 301.
- Preserve unrelated query components byte-for-byte, duplicate ordering, authentication boundaries and exact POST routing. Keep lowercase aliases rather than rewriting their meaning.
- Document the normalisation scope and correct an outdated login-script assertion in the route tests.

### Validation

- Route, authentication and phone-preview regression tests — 21 passed.
- URL preference browser check — passed at mobile and desktop widths, including mixed-case names through protected login, persistence and favicon selection.
- Sites production build and built Worker redirect checks — passed, including 128 existing cases and new GET/HEAD query canonicalisation with no second hop.
- Active LAN preview — Resources, Playground and uppercase login inspection verified; no push or publication performed.

## v26.0.217 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 07:23:39 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Preserve login destinations during service failures

### Changed

- Select one destination-specific login template for normal unauthenticated requests and configuration/database failure pages. Every Playground section retains the Components blocks, blur and dimming; Resources retains its own backdrop.
- Preserve the requested canonical section and query URL, HTTP 503 error semantics and closed authentication boundary. Submission errors continue to render inline without navigation.
- Record this error-handling contract in repository instructions and add route-wide regression coverage.

### Validation

- Authentication and anonymous-backdrop tests — passed (12 tests), including missing configuration, invalid verifier and database errors across all 11 login destinations.
- Headless browser checks at 390px and 1440px: initial errors on all destinations plus incorrect password, throttling, service and network submission errors preserve URL, backdrop and blur. Mobile screenshot inspected.
- Production build succeeded with v26.0.217. Saved geometry hashes remained unchanged; no remeasurement, push or publication performed.

## v26.0.216 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 07:09:40 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Freeze decorative captures and restore mobile preview panning

### Changed

- Convert fixed/sticky positioning and interaction styles during capture only; top-right tools move with the captured document. Include the neutral expanded Style Inspector as the final static section without its dock shadow or reserved viewport space.
- Refresh Components geometry at layout revision 2, retaining measured cap heights, baselines, anonymous wrapping and responsive inspector font metrics. Main Resources geometry remains unchanged.
- Constrain iframe preview wrappers to the containing optical rails, while retaining the selected iframe width. Permit horizontal gesture chaining through isolated login specimens and native two-axis scrolling in nested anonymous inspection frames.
- Document the capture rules and their rationale: hovering silhouettes reveal background structure throughout scrolling. Preserve normal interactive Playground behaviour and the existing publication-only measurement policy beyond this explicitly requested capture.

### Validation

- Authentication and anonymous backdrop unit checks — 11 passed.
- Components geometry compared across 12 widths and two heights, including the inspector font breakpoint; static positioning, anonymous content, themes and agents checked across 20 viewport combinations.
- Emulated touch swipes passed for Login and Resources at 320px/390px, inline and expanded; Fit removes horizontal overflow. Native wheel scrolling passed for outer and nested anonymous previews at mobile/desktop widths.
- Optical rail, nested alignment, menu containment, tab-edge and selection-axis browser checks passed. Mobile/desktop static inspector screenshots inspected; no physical-phone verification performed.
- Playground source fidelity/interaction suite and main-app background geometry checks passed.
- Production build succeeded with v26.0.216; the build reused saved geometry unchanged. Verified LAN destinations and real automatic session. No push or Sites publication performed.

## v26.0.215 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 06:46:58 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Canonicalise website URLs and support linked display preferences

### Changed

- Move Resources to `/workshop-resources` and Component Playground to `/component-playground`; redirect previous URLs and singular/plural section aliases with 301 responses, preserving queries and Playground descendants.
- Apply lowercase paths and remove a leading `www.` through shared GET/HEAD routing before alias lookup, producing one redirect without maintaining capitalisation variants. Preserve exact POST paths; hostname acceptance and TLS remain hosting prerequisites.
- Apply case-insensitive agent/theme query aliases before paint, persist valid preferences, preserve Playground navigation settings and update its favicon for both agents and themes.
- Update login, logout, local automatic sessions, hidden shortcuts and handoff documentation to canonical paths; remove the local login-inspection flag after successful sign-in.
- Lowercase public asset names and generated chunk/CSS URLs; correct existing browser assertions for the established menu position and footer optical alignment.

### Validation

- Authentication, phone-preview and routing tests — 19 passed, including combined hostname/case/alias handling and Resources variants.
- URL preference browser check — passed at 390px and 1440px, including login continuity, invalid values, persistence, live favicon changes and manual login inspection.
- Playground source parity, section navigation, hidden shortcut, agent preference, theme transition, theme control colour and radius checks — passed.
- Sites local production build and generated v26.0.215 displays — passed; saved backdrop geometry reused without measurement.
- Built Worker redirect check — 128 existing cases plus Resources/case/font checks passed; combined www/case/alias Host-header check passed.
- LAN preview — all three handoff destinations, real automatic sessions, manual sign-in and logout invalidation passed. Headless mobile/desktop screenshots inspected; no physical-device test or publication performed.

## v26.0.214 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 06:29:55 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Preview both backgrounds with shared Blocks and Blur controls

### Added

- Add Resources and Playground choices to Background Destination in Blocks and Blur. No Blur shows either saved background without blur, darkening or the login panel.
- Share layer, strength, blur, darkening, theme, agent and width controls across destinations. Reset retains the chosen background.

### Fixed

- Embed anonymous, script-disabled geometry inside isolated Playground specimens so their sandbox can display the Components backdrop without relaxing production framing or authentication rules.

### Changed

- Document both preview destinations and retain individual block picking for Resources.

### Validation

- Both destinations, all three layers, both themes and agents, sliders, reset and expanded views at 320, 390, 768 and 1440px — passed; mobile and desktop screenshots reviewed.
- Thirteen authentication and saved-geometry tests; shared login specimen, tab edges, 176 selection-region axis checks and menu containment — passed.
- Local build and generated v26.0.214 display — passed; both saved geometry hashes unchanged.

## v26.0.213 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 06:14:54 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add measured Components login backdrops

### Added

- Show one anonymous Components backdrop behind all Playground login routes, using the shared cap-height and wrapping rules across phone, tablet and desktop layouts.
- Serve script-disabled decorative geometry separately from protected content; follow the selected theme and agent, defaulting to Codex blue.
- Add a publication preflight that compares the verified published source and checks saved geometry revisions.

### Changed

- Exclude the Style Inspector and its reserved spacing from the capture, retaining it in the authenticated Playground.
- Reuse saved geometry for internal builds. Require remeasurement only for affected layouts during Sites publication preparation after comparing the last successful published source.
- Document glyph eligibility, measured rectangle fallbacks and separate live Main App/Playground links after publication.

### Validation

- Thirteen authentication, anonymous-content and geometry-reuse tests — passed.
- Components geometry at 20 viewport sizes and theme/agent/containment checks — passed; measured word positions within 1px.
- Main login geometry across ten widths and two heights, desktop/mobile login focus and four-width shortcut checks — passed.
- Mobile and desktop Codex-blue screenshots — visually reviewed.
- Local website build, generated v26.0.213 display and unchanged saved-geometry hashes — passed.

## v26.0.212 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 12:37:07 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Align tab endpoints and lock selector scrolling to one axis

### Fixed

- Remove outer tab-list padding so baseline, scroll edges and endpoint indicators meet the text rail, retaining tab-label padding and directional 36px fades.
- Hide vertical overflow in standalone selector wrappers inside Typography, Icons and Focus specimens. Preserve horizontal overflow when required and vertical scrolling for prompt content and tall panels.

### Added

- Document the scrolling contract and add tab-edge, scroll-axis and expanded-selector regression checks.

### Validation

- Seven-width tab-edge/fade checks and 172 selection-region checks across app, login and all Playground tabs/frames — passed.
- Overflow hints, expanded previews, menu containment, nested and external alignment, login and sticky-control browser checks — passed.
- Footer/reveal check rerun alone after a timing failure during concurrent tests — passed.
- Mobile app, login and first/last tab screenshots visually reviewed; final ten-width/two-height login backdrop comparison — passed within 1px.
- Local website build and generated v26.0.212 display verification — passed.

## v26.0.211 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 12:24:34 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Restore Playground menu anchoring and specimen containment

### Fixed

- Anchor Style Options to the ellipsis's measured top edge at both page top and scrolled positions. Keep the 48px close control in the trigger's position with an explicit 24px Lucide X, and reset internal scroll on reopening.
- Restore inset, bordered, rounded grey specimen frames within white cards for Typography, hyperlink styles, Icons, Status States, and Focus and Selection.
- Restore the shared 32px gap between stacked Login Destination and Held Login State groups on mobile.
- Require visual containment and top/scrolled menu checks alongside optical alignment tests in repository instructions.

### Validation

- `playground-menu-containment-browser-check.mjs` — passed at 320, 390 and 660px, with three scroll positions and five reference frames.
- Existing seven-width alignment, nested-surface, expanded-preview, sticky-toolbar and focus-clearance checks — passed.
- Reviewed populated mobile Typography and open-menu screenshots.
- Final background remeasurement and ten-width/two-height comparison — passed within 1px.
- `npm --prefix website run build` — passed; generated artefact contains v26.0.211.

## v26.0.210 — 2026-10-20

**Built at:** Tue 20 Oct 2026 at 12:13:29 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Close secondary-surface optical alignment gaps

### Fixed

- Restore the real JavaScript-disabled Resources notice to the 24px surface gutter instead of extending it across the viewport.
- Align expanded disclosure content beneath its summary text, retaining scroll clearance for outset toggle groups.
- Apply the surface outset to licence panels, replay controls, rounded sliders, standalone Log Out and JavaScript-notice specimens; extend isolated prompt panels on both edges within their source-width limit.
- Return the square tab strip to the text rail. Keep centred mobile Log Out specimens centred and retain control interiors.
- Add secondary-surface and real no-script regression checks to repository instructions.

### Validation

- `playground-nested-alignment-browser-check.mjs` — passed at seven widths and all five expanded views, with real no-script app/login checks at four widths.
- Existing all-tab alignment, expanded-preview, sticky-toolbar and focus-clearance checks — passed.
- Final background remeasurement and ten-width/two-height geometry comparison — passed within 1px in both theme/agent variants.
- `npm --prefix website run build` — passed; generated artefact contains v26.0.210.

## v26.0.209 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 11:49:52 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Unify optical alignment across the app and Playground

### Changed

- Establish shared text and rounded-surface rails: text and square elements align together; designated rounded boundaries extend 4px outward, retaining 24px mobile surface gutters and native control interiors.
- Apply the convention to Resources, login, all Playground tabs, grey specimen interiors, sticky controls, dialogs, inspectors and expanded previews.
- Measure leading heading-icon ink, including the cropped link-arrow variant, and align disclosure bodies with their heading text.
- Document the deterministic rules and future validation workflow in repository instructions and the website README.

### Fixed

- Preserve outset clearance in scrollable specimens and centred alignment for stacked footer actions.
- Remeasure the login background after layout completion. Retain every shared layout style, responsive footer wrapping, native anonymous prompt line breaks and separate footer icon geometry.

### Validation

- Responsive alignment checks passed at seven widths across all nine Playground tabs, both themes/agents, five expanded views and sampled grey specimen roots.
- Background word geometry matched Resources within 1px at ten widths (320–1440px), two heights and both theme/agent variants.
- Authentication, login focus/keyboard, source parity, footer/reveal, sticky controls, specimen spacing, expanded-view and Playground focus checks passed.
- Installed Lucide ink measurement verification passed.
- `npm --prefix website run build` — passed; generated server assets contain v26.0.209. Physical-device Safari review remains manual.

## v26.0.208 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 11:12:03 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Centre mobile branding between the floating controls

### Fixed

- Centre the mobile Wavelength mark in the actual gap between the agent and theme controls, correcting the 4px left offset at 320px.
- Retain desktop viewport centring and hide the floating brand below 320px.
- Update branding assertions to measure the control-gap midpoint rather than the viewport midpoint on mobile.

### Validation

- Headless Chrome geometry checks — passed at 300, 320, 360, 390, 660, 768 and 1440px.
- `npm --prefix website run build` — passed; generated server assets contain v26.0.208.

## v26.0.207 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 11:10:15 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Restore mobile Playground introductory spacing

### Fixed

- Restore 32px below the introductory body copy before the mobile header meets the grey content section; preserve desktop layout.

### Validation

- Headless Chrome geometry check — passed at 320, 390, 660, 768 and 1440px.
- `npm --prefix website run build` — passed; generated server assets contain v26.0.207.

## v26.0.206 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 10:59:21 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine responsive Playground specimens and controls

### Changed

- Stack mobile login controls and let typography specimens fill available width up to their application limits.
- Preserve one 24px specimen inset, restore focus-group divider clearance and keep agent selectors on one overflowing row.
- Distinguish original and cropped Arrow Up Right icons and match JavaScript-disabled login preview spacing to other login states.
- Centre the narrow floating brand, hide it below 320px and centre the fully stacked footer.
- Limit expanded preview disclosures to Style Options and Preview Controls.

### Validation

- Responsive refinement checks passed at 300, 320, 390, 768 and 1440px in headless Chrome.
- Playground source parity, specimen spacing and footer/reveal browser checks passed.
- Existing worm-halo suite stops at an unrelated desktop grid-column expectation (expects three, receives two); dedicated brand-centering and visibility checks pass.
- `npm --prefix website run build` — passed; generated server assets contain v26.0.206.

## v26.0.205 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 10:32:39 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Unify Playground specimen and container spacing

### Changed

- Standardise specimen rows and container edges at 24px while preserving colour palette card and compact reference spacing.
- Give the first login focus specimen clearance below its divider and preserve edge spacing when filtering icons.
- Include the full container padding when sizing embedded specimen documents.

### Validation

- `node website/tests/playground-specimen-spacing-browser-check.mjs` — passed at 320, 390, 768 and 1440px.
- `node website/tests/playground-spacing-browser-check.mjs` — passed.
- `node website/tests/playground-browser-check.mjs` — passed.
- `npm --prefix website run build` — passed; built app and Playground display v26.0.205.
- Wi-Fi main app, Playground and login inspection routes — HTTP 200.

## v26.0.204 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 10:26:23 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Rename Playground sources and archive unused starter files

### Changed

- Rename the Playground renderer, supporting modules and source-parity check; update imports and documentation while preserving the legacy `/style-guide` redirect.
- Move 60 unused starter UI components, their mobile hook and the D1 example into `_archive/starter/`, retaining the active connector button and all required infrastructure.
- Resolve archived imports and exclude retired files from TypeScript, ESLint and Tailwind processing.
- Add a website folder map without moving existing documentation or breaking its anchors.

### Validation

- TypeScript `tsc --noEmit --incremental false` and active/archived import resolution audit — passed.
- Authentication, phone-preview and Playground route checks — 16 passed.
- Playground browser source-parity check at 320, 390, 768 and 1440px, both themes and agents — passed.
- Placeholder source checks and Sites production build with generated v26.0.204 displays — passed.

## v26.0.203 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 08:20:05 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Space the first Easter Egg disclosure from its introduction

### Changed

- Use the same 16px explanation-to-disclosure gap above Viewing Modes as the colour-rule and Feather licence disclosures.

### Validation

- Headless checks of all three disclosures at 320, 390, 768 and 1440px — passed for 16px gaps, opening behaviour and no horizontal overflow.
- Sites local production build, placeholder checks and generated v26.0.203 displays — passed.
- Main app, Easter Egg Playground and login-form LAN endpoints — HTTP 200.

## v26.0.202 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 08:18:57 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Space colour-rule and Feather licence disclosures

### Changed

- Add 16px between explanatory copy and the All App Colour Rules and Feather-Derived Icons disclosure toggles.

### Validation

- Headless browser checks of both disclosures at 320, 390, 768 and 1440px — passed for exact 16px gaps, opening behaviour and no horizontal overflow.
- Sites local production build, placeholder checks and generated v26.0.202 displays — passed.
- Main app, Playground and login-form LAN endpoints — HTTP 200.

## v26.0.201 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 08:15:27 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Align Playground card copy and disclosure text

### Changed

- Inset white-card headings and explanatory paragraphs by 4px without changing embedded specimens or text padding inside grey panels.
- Match checkbox-label font family, size, weight and line height to toggle selections.
- Align white-card disclosure content with the summary text after its chevron; preserve the distinct Hover Preview Explainer and expanded control layouts.

### Validation

- `node website/tests/playground-external-text-inset-browser-check.mjs` — passed at seven widths in both themes and for both agents, including checkbox typography, disclosure margins and preserved grey-panel padding.
- Control-rhythm and expanded-preview browser checks — passed.
- `node website/tests/style-guide-browser-check.mjs` — passed for shared-source specimens and interactions.
- Phone and desktop disclosure screenshots — inspected.
- Sites local production build, placeholder checks and generated v26.0.201 displays — passed.

## v26.0.200 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 08:11:05 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Raise the shared link surface top edge by one pixel

### Changed

- Raise the common hover, focus-ring and hit-target top edge by 1px, preserving the bottom and horizontal bounds, text and arrow placement.
- Update Typography metrics and make regression checks use visible radio labels and atomically read live specimen styles.

### Validation

- Link geometry, mouse/touch/keyboard activation and typography checks — passed.
- Full app/specimen regression check — passed after correcting stale-node sampling in the test.
- Sites local production build, generated v26.0.200 displays and LAN preview routes — passed.

## v26.0.199 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 08:01:45 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Inset external Playground control labels by 4px

### Changed

- Inset outer toggle-group legends, slider labels and values, and hover-preview helper copy by 4px across all screen sizes, including mobile and expanded control destinations.
- Preserve text inside controls, component specimen sections and embedded previews, together with existing 40px selector spacing and sticky behaviour.

### Validation

- `node website/tests/playground-external-text-inset-browser-check.mjs` — passed at seven widths, both themes and both agents, including control interiors and specimen headings.
- `node website/tests/playground-control-rhythm-browser-check.mjs` — passed across all nine tabs at four widths; desktop screenshot inspected.
- `node website/tests/playground-sticky-toolbar-browser-check.mjs` — passed.
- `node website/tests/playground-expanded-preview-check.mjs` — passed.
- `node website/tests/style-guide-browser-check.mjs` — passed, including source parity, held states, copy feedback and hosted authentication protection.
- Sites local production build, placeholder checks and generated v26.0.199 displays — passed.

## v26.0.198 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 07:57:57 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Align link hit areas with hover bounds and widen selector spacing

### Changed

- Move link hover and pointer/touch bounds down 3px at the top and out 1px at the right, preserving left/bottom edges and text/arrow placement.
- Align keyboard focus rings with the new bounds and update held-hover specimens and colour readouts.
- Increase the lower spacing beneath normal and pinned Playground global selectors to 40px.

### Validation

- Link hit-boundary, mouse/touch/keyboard, focus, theme and reduced-motion checks — passed.
- Sticky-toolbar spacing, connected controls and selection/typography checks — passed.
- Full app/specimen browser regression check — passed. Rendered focus/hover sample inspected; physical-device Safari not tested.
- Sites local production build and generated v26.0.198 displays — passed. Main-app placeholder geometry unchanged.

## v26.0.197 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 07:53:00 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Place discovery in the footer and reduce particle layout work

### Changed

- Move the Easter Egg inscription below the footer divider, retaining 40px vertical spacing and the existing responsive copyright/version/logout row in the app and Playground.
- Cache relative particle/text geometry, reuse supported typed transforms and omit identity brightness filters without changing the approved particle styling or settings.
- Scope Log Out specimens to their form and refresh stale test expectations for existing Playground controls and neutral lock icons.

### Validation

- Footer placement, geometry cache, fallback transforms, discovery flow, replay, defaults/cleanup, responsive source parity and footer reveal browser checks — passed.
- Deterministic visible particle/text style comparison across mobile/desktop, both themes and sweep/hover states — passed.
- Desktop, phone emulation and 4× CPU-throttled active animation samples completed. Mobile hover frame counts improved modestly; particle p95 remains approximately 33ms and sweep frame counts did not consistently improve. Physical-device performance remains unverified.
- Playground session, source parity, focus consistency and button interaction checks — passed.
- Isolated local production build and generated v26.0.197 app/Playground displays — passed. Saved login background geometry retained; footer-only changes need no remeasurement.

## v26.0.196 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 07:25:40 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Crop link arrow whitespace while preserving its visible size

### Changed

- Crop shared Lucide link arrows to their stroke bounds and reduce their boxes proportionally, preserving visible size and vertical alignment.
- Bring the arrow 4px closer to its preceding non-breaking space without changing link padding, colours or focus behaviour.
- Refresh outdated parity-test expectations for the previously approved brand-aligned floating controls.

### Validation

- Typography and selection checks across 16 combinations — passed, including comparison with the original arrow scale and alignment.
- Full app/specimen parity browser check — passed.
- Sites local production build and generated v26.0.196 displays — passed. Main-app content contains no affected links; saved background geometry retained.

## v26.0.195 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 07:20:28 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Inset external app and login text beside rounded surfaces

### Changed

- Apply a shared 4px inline inset to step copy, the coding-agent label, descriptions above prompt panels, and the login password label and error row across all screen sizes.
- Preserve panel positions and internal button, input and prompt padding; refresh the measured login-background geometry for the changed text layout.
- Retain shared-source specimens; defer Playground-specific controls and layout to the next update.

### Validation

- `node website/tests/external-text-inset-browser-check.mjs` — passed at seven widths, both themes and both agents, including unchanged internal padding and no horizontal overflow.
- Authentication, phone-preview and placeholder unit checks — passed (13 checks).
- Local LAN app/session/login-error rendering and inherited specimen inset checks — passed; phone screenshots inspected.
- Sites local production build and generated v26.0.195 displays — passed.
- Existing `login-browser-check.mjs` error-message timeout and `style-guide-browser-check.mjs` toolbar-position assertion reproduce on unchanged HEAD; their full suites remain incomplete.
- Optional archived word-geometry fixture is stale; direct live word comparison also finds a 2px initial word-baseline offset on both unchanged HEAD and this update. Full 1px word-geometry parity is not claimed.

## v26.0.194 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 07:14:51 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Bring Playground tabs closer to their component panels

### Changed

- Retain 24px above tab button hover areas and use 16px between the baseline and the first component panel.
- Position the native scroll indicator 2px below the baseline, excluding its gutter from layout spacing.

### Validation

- Tab geometry and sticky-toolbar checks at four widths — passed, including 24px/16px gaps and the 2px indicator offset.
- Sites local production build and generated v26.0.194 displays — passed.

## v26.0.193 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 07:07:56 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Keep only Playground toggles pinned and equalise tab spacing

### Changed

- Keep only desktop global toggle rails persistent, with 24px above and below; let their labels scroll away and preserve the original document footprint.
- Set tab-container spacing to 24px above and below at desktop and mobile widths.
- Reduce the Hover Preview Explainer chevron/text gap to 4px.

### Validation

- Sticky-toolbar checks at four widths — passed for tab gaps, pinning, restoration, control interaction and mobile popover behaviour.
- Expanded-preview regression checks — passed.
- Desktop screenshot — inspected; physical-device Safari not tested.
- Sites local production build and generated v26.0.193 displays — passed. Component specimens unchanged.

## v26.0.192 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 07:01:47 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Expand Playground content width to 1120px

### Changed

- Widen the Playground header, controls and body to 1120px of content, retaining 24px side spacing on small displays.
- Align floating controls and the inspector with the new content edges; retain specimen styling and vertical spacing.

### Validation

- Responsive spacing and floating-control checks at four widths — passed.
- Sites local production build and generated v26.0.192 displays — passed.

## v26.0.191 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 06:54:12 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Unify Playground control spacing and distance-based overflow fades

### Changed

- Standardise outer control spacing across tabs and expanded/mobile views without changing component specimens.
- Lock selector rails and tabs to horizontal scrolling; strengthen edge fades and drive their appearance by scroll distance with immediate endpoint removal.
- Preserve tab fades after selection and remove unintended vertical masking.
- Place the Hover Preview Explainer alongside its label where space permits, enlarge its text and align disclosure chevrons.

### Validation

- All nine tabs at 320, 390, 768 and 1440px — passed for control spacing, scroll-axis locking, distance-based masks and explainer behaviour.
- Spacing, expanded-preview, held-toggle/focus and icon-catalogue checks — passed.
- Mobile and desktop screenshots — inspected. Physical-device Safari not tested.
- Sites local production build v26.0.191 and generated version displays — passed. Specimen sources and main-app geometry unchanged.

## v26.0.190 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 06:34:34 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Standardise Playground spacing and align floating controls with content

### Changed

- Set Playground content to 1080px plus 24px side padding and remove the body-copy width cap.
- Apply 16px label-to-selector and 32px group spacing; align floating controls with content and the brand row before sticking 24px from the top.
- Inset the mobile popover 24px from the top and sides and replace native disclosure triangles with official Lucide chevrons.

### Validation

- Responsive spacing, floating controls, popover focus and bounds at four widths — passed.
- Overflow and expanded-preview regression suites — passed.
- Sites production build with v26.0.190 — passed. Physical-device Safari not tested; main-app geometry unchanged.

## v26.0.189 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 06:21:37 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine Playground overflow cues, branding and specimen spacing

### Changed

- Keep selector borders and the tab baseline outside two-sided overflow fades; centre selected radio options within natural scroll limits.
- Add missing directional fades to outer scroll areas, typography colour tables and icon/agent reference sample containers.
- Centre neighbouring checkboxes against selector rails and rename Show Hover States to Force Hover States with revised help.
- Add the app’s Wavelength brand markup and typography to the Playground header with the same vertical rhythm.
- Shorten the Easter Egg specimen’s top whitespace so Step 3 starts 24px below the pinned selector.

### Validation

- Overflow and layout audit at 320, 390, 768 and 1440px — passed for internal masks, persistent borders, first/middle/last selection clamping, checkbox centres and header/Step 3 spacing.
- Connected-control, repeated-hold, expanded-preview, icon catalogue and selection/typography suites — passed. All seven Easter Egg entry states at four widths passed.
- Sites local production build — passed with v26.0.189. Mobile screenshots inspected; physical iPhone/Safari not tested. Main-app layout unchanged; no geometry remeasurement.

## v26.0.188 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 06:03:52 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Align Playground sections to a 1280px content width

### Changed

- Increase Playground content width to 1280px plus 24px on each side, giving a 1328px maximum outer wrapper.
- Align the heading, introduction, style controls and inspector with the body; retain vertical spacing and the main-app layout.

### Validation

- Headless layout checks at 320, 390, 768, 1328, 1440 and 1920px — passed; matching content edges, 40px top inset and no horizontal page overflow.
- Existing connected-control/header/typography browser checks — passed.
- Sites local production build — passed with v26.0.188. Desktop screenshot inspected; main-app geometry unchanged, no remeasurement required.

## v26.0.187 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 05:58:40 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Use 301 for style-guide and verify direct hosted redirects

### Changed

- Redirect style-guide and its slash variants directly to Playground with 301.
- Resolve shared aliases at the production Worker entry point before framework slash normalisation, preventing redirect chains on deployment.

### Validation

- Route, authentication and phone-preview suites — 16 passed.
- Fresh local production Worker — 128 GET/HEAD alias and slash cases passed, with exact queries and no second redirect.
- Sites production build, saved geometry checks and generated v26.0.187 displays — passed. Live deployment not performed.

## v26.0.186 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 05:50:51 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Fix selector holds and keep Easter Egg controls pinned

### Changed

- Keep both Easter Egg selectors 24px from the iframe viewport top throughout scrolling, aligned with the responsive floating brand; preserve ordinary app sticky behaviour.
- Move Design Tools to the 40px page inset without reserving space for floating utility buttons.
- Restrict radio/checkbox focus rings to keyboard navigation while retaining real pointer focus.
- Focus the actual radio input before beginning a hold, recognise its focus transfer and cancel abandoned holds without pulling focus back. Preserve native radio Space handling.

### Validation

- Repeated/rapid hold, mouse/touch and keyboard focus, and top/bottom iframe scrolling checks — passed at mobile/desktop widths.
- Header/connected-control, all seven Easter Egg entry states at four widths, and expanded-preview checks — passed.
- Theme-transition and feather/control-colour suites — passed; radius, authentication and saved geometry tests: 12 passed.
- Sites local production build — passed with v26.0.186. No main-app resting geometry changes or remeasurement. Physical iPhone/Safari not tested.

## v26.0.185 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 05:46:25 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Canonicalise Playground URLs with direct query-preserving aliases

### Changed

- Match every section URL to its tab title in kebab case and retain browser-history navigation.
- Resolve all 14 aliases and shared trailing-slash normalisation directly to the final destination for GET/HEAD requests, preserving query strings locally and in the hosted handler.
- Preserve existing alias entry points and authentication; add first/last-word shortcuts and update the documented handoff paths.

### Validation

- Route, authentication and phone-preview tests — 16 passed, including all alias/slash variants, exact query preservation and no redirect chains.
- Headless Chrome navigation — all nine tabs, clicks, reloads, alias arrival and Back/Forward passed at 390px and 1440px.
- Sites local production build and saved geometry checks — passed; generated app and Playground display v26.0.185. Physical iPhone/Safari not tested.

## v26.0.184 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 05:36:43 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine Playground hierarchy, selectors, links and Easter Egg entry

### Changed

- Remove breadcrumbs and match the app’s header spacing and typography; connect all single-choice controls with the shared animated pill and exact-option selection.
- Keep link underlines at 1px, reduce hover padding, join final words and northeast arrows without wrapping, and brighten dark hover text over the shared selection background.
- Render hex values in monospace and add cap-height colour chips throughout the defined typography specimen.
- Remove the empty Other icon category and preserve four-column card widths when filtering.
- Replace long Easter Egg copy with a short introduction and collapsed help. Start every view at the bottom with the real floating controls and responsive branding already positioned.

### Validation

- Connected-control/header/link/chip checks at 320, 390, 768 and 1440px — passed; selection/typography checks passed across 16 viewport/theme/agent combinations.
- All seven Easter Egg views passed at four widths, including bottom position, sticky selector, visible branding and stable icon-card widths.
- Source parity, icon catalogue, expanded-preview, link/tab and native selector comparisons passed. Theme transition, feather/control-colour and radius checks passed; authentication and saved geometry tests: 11 passed.
- Legacy theme-browser-check exposed stale copy-label and preview-theme assumptions; retained unchanged. The dedicated transition/control-colour suites cover shared selector regressions.
- Sites local production build passed with v26.0.184. Desktop and mobile screenshots inspected; physical iPhone/Safari not tested. Main-app resting geometry is unchanged; no remeasurement.

## v26.0.183 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 05:24:47 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Unify text selections and add hyperlink typography and icon categories

### Changed

- Apply shared agent/theme selection colours throughout the Playground and its specimens.
- Add real resting and held-hover link specimens, northeast arrows, computed typography details and all four theme/agent colour combinations in a new Defined Styles Used in Playground panel.
- Order Playground icons by page identity, UI controls and tab/panel headings; add All, Playground, UI Elements, Section Headings and Other category filters alongside Show Sources.

### Validation

- Authentication and saved geometry tests — 11 passed; no geometry remeasurement required.
- Selection/typography checks — all 16 viewport/theme/agent combinations passed, including comparison with the actual app, live link styles, icon order and filters.
- Heading/icon catalogue checks — 17 panel headings, complete source catalogue, responsive layouts and expanded focus passed.
- Full app/Playground source-parity browser suite and Sites local production build passed. Screenshot inspected; physical iPhone/Safari not tested.

## v26.0.182 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 05:14:43 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine tab edges, restore native selector and unify links

### Changed

- Limit tab centring to widths up to 660px, clamp scrolling to natural ends without spacer gaps and reveal offscreen tablet/desktop selections with minimum scrolling. Reserve space below the selection baseline for the horizontal scrollbar.
- Remove fixed-position and horizontal-margin overrides from the Easter Egg selector specimen, restoring the real app’s sticky alignment and responsive contraction/expansion.
- Combine Branding checkboxes with actions and the app icon filter with Show Sources where space permits, retaining natural wrapping on narrow screens.
- Match Playground source labels to the app catalogue’s View Source · provider · icon-name format.
- Decorate navigation and source links with an un-underlined Lucide Arrow Up Right and padded hover targets, preserving shared agent/theme link colours and 10% accent hover tint.

### Validation

- Authentication and saved geometry tests — 11 passed; no main-app resting geometry changes or remeasurement.
- Layout refinement checks — all tabs at 320/390/768/1440px passed, including gaps, placement, expanded focus and source visibility.
- Dedicated links/tabs checks — source labels, link/underline/arrow colours, hover padding, natural edge clamping, tablet/desktop noncentring and native selector alignment/width/compact-state comparison against an independent app page passed.
- Icon catalogue and full app/Playground source-parity suites — passed across themes, agents and responsive layouts.
- Expanded-preview checks — state preservation, modal controls and focus/scroll restoration passed.
- Sites local production build and final LAN app/Playground/login links — passed with v26.0.182. Screenshots inspected; physical iPhone/Safari not tested.

## v26.0.181 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 04:51:33 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine Playground navigation and preview controls

### Changed

- Align heading icons with the first text line, add each first-panel icon to its tab and centre the selected tab on selection and initial load while preserving subsequent manual scrolling.
- Use Search for Focus and Selection and Rotate Clockwise for the content-width Replay Animation button.
- Move Copy Values and Reset Defaults after preview controls, float Expand View at the lower-right of each interactive inset with the shared shadow, and keep global floating controls above it.
- Use one scrollable, faded expanded heading row with icon-only actions on the right. Preserve iframe state, accessible button names and focus restoration.
- Restore side-by-side mobile login controls, place source checkboxes after controls and use a consistent 24px gap before inset frames and reference containers.
- Add independent, initially hidden Playground source links controlled by Show Sources and expose the original agent selector in the Easter Egg specimen at every width.

### Validation

- Authentication and saved placeholder geometry tests — 11 passed; app resting geometry is unchanged and no remeasurement was required.
- Layout refinement browser check — all nine tabs at 320/390/768/1440px passed icon alignment, centring, spacing, control placement, expanded title scrolling/fades, keyboard focus, source toggling and live agent selection.
- Icon catalogue browser check — metadata, unique coverage, both themes and agents across four widths passed.
- Expanded-preview browser check — iframe-state preservation, shared controls, modal containment, Escape and focus/scroll restoration passed.
- Full app/Playground source-parity suite and Sites local production build — passed.
- Final LAN checks — v26.0.181, real automatic session, app/Playground/login links, touch source toggling and preserved manual tab scrolling passed. Mobile and expanded screenshots inspected; physical iPhone/Safari not tested.

## v26.0.180 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 04:27:10 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add Playground heading icons and a live tooling catalogue

### Added

- Add the reviewed Lucide icons to all 16 Playground panel headings, including Layout Template for Blocks and Blur, Blocks for Playground Icons and File Badge for both licences.
- Catalogue 25 unique Playground icons from actual outer-page markup, including hidden mobile and expanded controls, with previews, usage locations and official source links.

### Changed

- Rename the app catalogue to App Icons and Symbols and replace the standalone heading-icon panel with Playground Icons in the existing Icons tab.
- Keep Style Options and Preview Controls text-only, preserve the page-heading Toy Brick and leave app specimen markup unchanged.
- Ensure mobile panel headings occupy a complete row above actions; preserve expanded heading focus and decorative icon semantics.
- Document the catalogue and its focused browser validation.

### Validation

- Authentication and saved placeholder geometry tests — 11 passed; no block remeasurement required.
- Headless heading/catalogue checks — complete metadata and unique-icon coverage, 320/390/768/1440px, both themes and agents, and expanded heading/Tab focus passed.
- Full app/Playground source-parity browser suite — passed, including held states, typography, controls, containment and hosted access rejection.
- Sites local production build — passed; server artefact contains the new catalogue and v26.0.180 displays.
- LAN preview — automatic real session, home redirect, catalogue, login inspection and logout invalidation passed. Desktop/mobile screenshots inspected; physical iPhone/Safari not tested.

## v26.0.179 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 04:20:59 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Reduce active particle cost and remove rainbow startup stall

### Changed

- Scope animated sheen properties to the three text elements, batch geometry reads and skip visual writes for fully transparent particles while preserving their simulation.
- Use the native particle colour property for its existing gradients and shadows instead of repeatedly resolving an animated custom property. Retain compositor hints for smooth motion. Preserve the particle renderer, colours, density, shadows, gravity, twinkle calculations and approved settings.
- Calculate the original cubic approach and quadratic halo outline directly using adaptive arc-length geometry instead of thousands of synchronous SVG queries. Start the trail clock after setup.

### Validation

- Original SVG route comparison across 24 desktop/mobile geometries and both directions — maximum deviation 0.112 CSS pixels, below the 0.2px tolerance.
- Deterministic pre/post comparison — identical visible particle styles and text gradients across phone/desktop, both themes and sweep/hover states.
- Final sweep/hover main-thread occupancy: desktop/phone about 11%/16% (previously 26%/28%); 4× throttled phone 39%/72% (previously 79%/97%). All effects had 16.7ms median cadence; particle p95 remained 33.4ms. Throttled phone trail startup fell from roughly 385–418ms to 14–23ms.
- Active desktop, DPR-3 mobile and 4× CPU-throttled mobile benchmarks cover sweep, hover, trail startup/movement and halo. These use the host GPU, not physical iPhone/Safari hardware.
- Approved defaults, idle work, 24-cycle cleanup, reveal/replay sequencing, 16 responsive app/Playground comparisons and the full source-parity suite — passed.
- Hidden-tab test now waits for the actual locked state instead of an arbitrary 200ms delay.
- Production build and saved placeholder geometry checks — passed; no geometry remeasurement needed.

## v26.0.178 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:51:21 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Apply floating branding and unify Playground presentation

### Added

- Mount shared floating branding in Resources at every browser width: worm on mobile, full wordmark above 660px, using the approved 8px padding, 36px blur, 48px feather, 100px radius and 48% tint.
- Add Lucide Toy Brick beside the Playground heading and as a white-on-Codex-blue favicon for Playground routes and their hosted login page.

### Changed

- Group Branding checkboxes in a wrapping row after the final slider.
- Unify section-heading typography and container-top spacing across all Playground tabs; preserve compact expanded-preview headings.
- Keep Playground branding controls connected to the same renderer mounted by the main app.

### Validation

- Main-app branding at 320–1440px across both agents/themes, collision clearance, responsive checkboxes, heading measurements and favicon checks — passed.
- Branding persistence, route/authentication, saved placeholder geometry, circular theme transitions and feather-following control colours — passed.
- App/Playground source-parity browser suite, production build and verified LAN automatic-session handoff — passed.

## v26.0.177 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:44:49 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Reduce idle effect work and audit deployment defaults

### Changed

- Sleep the particle frame loop when idle, skip unchanged configuration writes and cache target geometry until state/theme/size changes.
- Remove completed timeout IDs, calculate wave geometry once per frame, sample the ribbon route once and crop its canvas to the path plus glow margin. Preserve approved visual settings.
- Cancel hidden Easter Egg tab fixtures and restart the selected preview when returning; avoid zero-size geometry work while hidden.

### Validation

- Local headless Chrome eligible-idle sample — about 315ms to 14ms task time over 1.5 seconds; inscription mutations dropped from 22,103 to zero. Results are scenario-specific.
- Memory/cleanup regression — no remaining ribbon/fade nodes or element growth after 24 cycles; about 192KB retained heap delta after garbage collection in the first measured run. Long-session/device-specific leaks are not ruled out.
- Approved settings audit — exact object matches main-app and Playground controllers; generated app artefact embeds the approved defaults and current version.
- Production build, animation flow, loops, responsive feather, Easter Egg parity and full Playground source-parity checks — passed. Existing placeholder geometry reused.
- Physical-device Safari — remains a manual preview check.

## v26.0.176 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:36:35 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Sequence reveal and sheen with reliable replay

### Changed

- Apply the supplied preset, including independent two-second text reveal and final sheen. Add Pause After Text Reveal (0–10 seconds, default zero) before the final sheen.
- Add a Lucide Redo Replay Animation button after the relevant sliders. Keep preview loops running when the inscription leaves the iframe viewport, with document-visibility and reduced-motion safeguards.
- Add an After Closing Dialog Playground view for the persistent complete sentence and repeating sheen.
- Resume full-sentence sheens after the real success dialog closes, without repeating the reveal or reopening the dialog. Preserve click-to-reopen.
- Confirm the rainbow canvas and screen fade share a stacking context with the rainbow above the fade.

### Validation

- Production build and focused replay regression — passed: sequential reveal/pause/sheen, offscreen repeats, manual replay, post-dialog sheens and actual layer ordering.
- Desktop/mobile controls regression and full Playground source-parity checks — passed, including the new After Closing Dialog state and stable view sets.
- LAN home, Easter Egg and logged-out preview — HTTP 200. Physical-device Safari remains a manual check.

## v26.0.175 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:29:37 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Stabilise Easter Egg controls when switching views

### Fixed

- Select named Easter Egg preview controls immediately from the chosen view, independently of transient animation and dialog-close events.
- Tag iframe state messages with their preview view and ignore messages for a different selection. Only Natural Discovery follows live state changes.

### Validation

- Production build — passed; reused saved placeholder geometry.
- New desktop/mobile control regression — passed for immediate sets, rapid switches, stale events, dialog closing and Natural Discovery. Existing animation-loop and full Playground source-parity checks also passed.
- LAN home, direct Easter Egg section and logged-out preview — HTTP 200. Physical-device Safari remains a manual check.

## v26.0.174 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:22:11 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Isolate halo formation and tune fade defaults

### Changed

- Start the looping Discovery Reveal preview directly at the sentence endpoint, with both halves visible and no full-line sheen. Preserve Full Sentence and the main app's complete discovery sequence.
- Default Rainbow Trail Feather to 80px and Modal Fade Duration to 0.6 seconds.
- Place Modal Fade Duration with Success Dialog controls; hide text-sheen controls in Discovery Reveal.

### Validation

- Production build and focused loop/settings checks — passed, including no Discovery Reveal text sheen, moved control visibility and unchanged real app modal flow.
- Easter Egg source parity — passed across 16 width/theme/agent combinations; full Playground source-parity checks also passed.
- Local home, Easter Egg section and logged-out form — HTTP 200; signed-in home and login-form markup verified. Physical-device Safari remains a manual check.

## v26.0.173 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:17:38 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add home redirect and direct preview handoff format

### Changed

- Permanently redirect GET/HEAD `/home` and `/home/` to `/`, preserving query strings in local and hosted handlers.
- Retain hosted authentication and local automatic sign-in after redirect.
- Record the requested preview handoff format and canonical component-section links in repository instructions.

### Validation

- All 13 route and authentication tests — passed.
- Production build and whitespace checks — passed; no layout remeasurement required.

## v26.0.172 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:16:09 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Clear floating branding and standardise Playground controls

### Changed

- Start tablet selector contraction 32px before locking, retaining an 8px expansion buffer; gate experimental branding by actual control clearance.
- Apply the preferred 8px padding, 36px blur, 48px outward feather, 100px corner radius and 48% tint defaults.
- Use consistent responsive three-column slider grids and Lucide Copy/Reset controls.
- Rename section routes to statuses and easter-egg, with query-preserving 301 redirects from errors, discovery and colors.

### Validation

- Sticky stability, branding geometry, animated clearance, slider columns and source-parity browser checks; route and authentication tests — passed.
- Production build passed using saved placeholder geometry; LAN preview and automatic local session verified.

## v26.0.171 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:01:58 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Soften rainbow trails and unify slider columns

### Changed

- Extend Rainbow Trail Feather to 600px. Apply it throughout formation, broaden diffuse colour and reduce the sharp core instead of leaving fixed sharp overlays or converging on Halo Blur.
- Fade the screen during the rainbow path, with a shared Screen Fade Duration control (0–6 seconds; default 1.2 seconds). Preserve the fade through modal opening and clean up on close, cancellation or preview changes.
- Use responsive slider grids capped at four equal columns, preserving orphan widths and reducing naturally to one column on phones.

### Validation

- Production build, PVS validation and whitespace checks — passed; reused existing main-app placeholder geometry.
- Headless source-parity, Easter Egg settings/loops/particle-flow and new feather checks — passed.
- Responsive four/two/one-column widths, concurrent screen fade, modal handoff and cancellation — passed. Inspected the 600px diffuse rainbow screenshot.
- Physical-device Safari — remains a manual LAN-preview check.

## v26.0.170 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:57:53 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add Playground section links and refine tablet locking

### Changed

- Contract the tablet agent selector exactly at its sticky position, with regular 340ms width timing and an 8px expansion buffer. Preserve speed-aware mobile behaviour.
- Add direct Playground section paths, URL updates and browser history navigation. Preserve the requested section through hosted login and expiry while retaining server-side authentication.
- Unify the Playground header and selector toolbar surfaces. Require direct section links in future repository handoffs.
- Add a Corner Radius slider and load the preferred 12px padding, 36px blur, 36px feather and 50% tint defaults. Retain the capsule shape by default and keep brand tuning Playground-only.

### Validation

- Authentication and Playground route tests — all 11 passed, including protected deep links and unknown-section rejection.
- Branding browser checks — passed, including direct URL selection, browser Back, header surface parity, radius, export and fade restoration.
- Sticky-control stability checks — passed on mobile and tablet, including sticky entry and 8px expansion hysteresis.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- `npm --prefix website run build` — passed; generated v26.0.170 verified. Header and blur screenshots inspected; Wi-Fi automatic sign-in and direct Branding URL verified.

## v26.0.169 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:43:26 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Animate preview widths and preserve hovered rainbow sweeps

### Changed

- Smooth canvas and iframe resizing over 360ms, including Fit, with immediate reduced-motion sizing.
- Let travelling rainbow colour and brightness take priority over idle hover lighting while preserving pointer gravity and slower twinkles.
- Retain canonical third-card and footer context in the Easter Egg specimen. Full Sentence repeats the app reveal and final sheen; Discovery Reveal starts fully visible and repeats sheen plus halo formation without a modal.
- Set Halo Formation Duration to 1.2 seconds and document Rainbow Trail Feather.

### Validation

- Production build — passed; existing saved placeholder geometry reused.
- Headless source-parity, width, loop, Easter Egg parity and particle-flow checks — passed, including actual reveal animation in Full Sentence and no text reveal in Discovery Reveal.
- Context and smooth interpolation checks — passed; inspected screenshot with lower card and footer visible.
- LAN app and Playground — HTTP 200. Physical-device Safari remains a manual check.

## v26.0.168 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:37:04 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Adapt brand blur sizing and restore its scroll fade

### Changed

- Replace fixed pill dimensions with horizontal and vertical padding around the rendered brand. Increase blur adjustment to 100px and default Hold Visible to off.
- Add Auto, Worm Only and Worm + Wordmark appearance choices. Auto uses the full brand above 660px and the worm on mobile; retain outward feathering and settings export.
- Contract agent controls at tablet widths of 661–1023px, measuring thresholds from the theme control top rather than bottom so contraction happens one measured control height later. Preserve mobile timing and desktop labels.

### Fixed

- Fade the veil and mark separately instead of their shared ancestor, avoiding an unintended backdrop root. Refresh the mask on visibility re-entry using retained settings, without requiring a bounds toggle.

### Validation

- `node website/tests/worm-halo-browser-check.mjs` — passed, including repeated fade-out/return cycles, retained settings, appearance overrides, adaptive padding and 80px blur.
- `node website/tests/sticky-controls-stability-check.mjs` — passed at 320, 390, 660, 768 and 1023px with zero layout drift and verified slow/fast thresholds.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- `npm --prefix website run build` — passed; generated v26.0.168 verified.
- Tablet screenshot and control-clearance check — passed; Wi-Fi app automatic sign-in and Playground verified. Physical Safari blur rendering remains for phone review.

## v26.0.167 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:31:05 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Tune Easter Egg previews and resize Playground canvases

### Changed

- Apply the supplied 27-value Easter Egg preset through the shared settings schema.
- Repeat the final sheen in Full Sentence and loop Discovery Reveal without opening the modal; keep tuning controls available and restart loops when settings change. Preserve the real app's success dialog flow.
- Align Screen Width buttons with other style controls. Centre fixed-width preview canvases at the chosen viewport size in embedded and expanded views; retain scrolling for oversized viewports and full-width Fit.

### Validation

- `npm --prefix website run build` — passed; reused existing placeholder geometry because app resting layout is unchanged.
- Headless Chrome source-parity, viewport sizing, Easter Egg loop, settings and final-flow regression checks passed.
- LAN app and password-free Playground returned HTTP 200. Physical-device Safari remains a manual preview check.

## v26.0.166 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:14:45 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine brand blur feathering and export tuning settings

### Changed

- Add Copy Settings to the Playground Branding tester, sharing the Easter Egg clipboard and selectable-text fallback. Export units, values, feather direction and preview context.
- Keep the pill fully applied inside its bounds and feather only outward, using a capsule distance mask. Explain real backdrop blur separately from optional page-canvas tint.
- Show the original worm and wordmark at preview widths of 1024px and above; show the worm alone on narrower previews, retaining tablet agent labels.
- Start with the supplied 100px width, 50px height, 32px blur, 20px feather and 50% tint settings; allow widths up to 400px for the desktop wordmark. Keep the experiment Playground-only.

### Validation

- `node website/tests/worm-halo-browser-check.mjs` — passed across four viewport sizes and both themes/agents, including outward mask alpha samples, settings export/fallback and unchanged Easter Egg export.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- `npm --prefix website run build` — passed; generated v26.0.166 verified.
- Desktop and mobile screenshots inspected; Wi-Fi automatic sign-in and Playground verified. Physical Safari blur rendering remains for phone review.

## v26.0.165 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:09:45 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Flow the final sheen into the halo and sustain rainbow hover

### Changed

- Use a single smooth rainbow opacity crest for text and ambient particles. Decay particle tails from actual energy without recharging them to a fixed brightness or triggering a second ambient flash.
- Keep pointer-attracted particles glowing between slow twinkles, with gently varied rainbow hues independent of passing sheens; avoid retaining the final pink/plum sample.
- Add a separate Final Sheen Duration control, defaulting to 2.2 seconds while the regular sweep remains four seconds.
- Trigger a continuous ribbon while the sheen crosses the final letters. Curve it sideways and upward, trace the measured rounded modal outline, then fade in the stationary modal and backdrop. Match the traced halo and final halo palette.
- Rename the existing formation controls and preserve their exported keys. Playground source and 27 state-specific settings remain shared with the app.
- Apply the requested Congratulations heading, four paragraphs, bold quoted question and Done button exactly.
- Cover pointer failure and keyboard success in the general simulated-copy test after an intermittent cross-frame click timeout.

### Validation

- Flow check — passed: single rising/falling crest, travelling particle onset, persistent varied hover with no sheen, slower gravity twinkles, zero values, exact modal copy and overlapping sheen/ribbon handoff.
- Playground, edge, sheen and timing browser checks — passed across desktop/mobile, themes and agents, including touch, focus, reopening and shared-source parity.
- `node website/tests/style-guide-browser-check.mjs` — passed after the copy success case was changed to keyboard activation.
- Phone layout and mid-flight reduced-motion cancellation — passed; screenshots of the forming halo and desktop/mobile modal inspected.
- `npm --prefix website run build` — passed; built v26.0.165, new copy and final-duration control verified.
- Physical iPhone Safari remains unverified.

## v26.0.164 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 01:58:50 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add a brand blur tuner and automatic local preview sign-in

### Added

- Add a Playground-only Branding experiment over the canonical Resources page, cloning the original worm at its responsive rendered size and centring it with the floating controls.
- Add pill width, height, backdrop blur, feather and canvas tint sliders, a dotted pill-bounds checkbox, Hold Visible and Reset. Natural visibility follows the agent selector shadow opacity. Keep the main app overlay unmounted pending tuning.

### Changed

- Open user-facing local previews already signed in through the unchanged authentication handler, using a temporary local password and in-memory session database. Keep explicit login review at `/?login=1` and preserve logout revocation.
- Document automatic preview sign-in as the required future handoff workflow in repository instructions. Retain explicit-auth test defaults and unchanged hosted protection.

### Validation

- `node --test website/tests/phone-preview.test.mjs website/tests/auth.test.mjs` — all 11 tests passed, including automatic local sessions and protected hosted access.
- `node website/tests/worm-halo-browser-check.mjs` — passed at 320, 390, 768 and 1440px, both themes/agents, with sizing, alignment, sliders, bounds, reset and scroll-fade checks. Mobile screenshots inspected.
- `node website/tests/style-guide-browser-check.mjs` — passed; intermittent existing copy-feedback timeouts occurred on intermediate runs, with no product change made for them.
- `npm --prefix website run build` — passed; generated v26.0.164 verified and local automatic-login code absent from production bundle.
- Wi-Fi app automatic sign-in, session endpoint, Playground and explicit login view — verified. Physical Safari/iPhone blur rendering remains for user review.

## v26.0.163 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 01:37:11 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Integrate travelling sparkles and the rainbow discovery burst

### Changed

- Apply the supplied preset: four-second sweep, zero gap, 400% particles, 500ms tail, 160% gravity, 16px ring, 60px hover height, 300% halo, 250% halo speed, 36px blur and 60% aurora intensity.
- Bound the sheen to actual text and particle margins instead of blank footer columns. A narrower band starts each particle flash on arrival and fades its tail quickly, preserving one travelling movement.
- Deepen light-theme particle colours and increase their size and brightness. Slow local twinkle clocks significantly near pointer gravity.
- Replace the compressed dialog entrance with a heavily feathered rainbow burst from the final text endpoint, growing to measured modal/halo size before the stationary modal fades in.
- Share a schema for 26 zero-based, bounded controls, including particle/twinkle/gravity tuning and reveal/burst/fade timing. Show only controls relevant to the current state; include every value in Copy and Reset.
- Add Discovery Reveal to replay the full final sequence. Preserve theme-wave continuity, reduced motion, native modal focus and reopening.
- Document settings, zero semantics and the updated shared animation.

### Validation

- Particle-flow browser check — passed in both themes, including progressive onset, no more than 33 simultaneous visible points in the final desktop sample, complete tail settling, day contrast, slower pointer twinkles, zero values and burst/fade order.
- Playground browser check — passed across 16 width/theme/agent combinations, including control visibility, zero minima, Copy/Reset and modal parity.
- Sheen, edge, timing and base discovery browser checks — passed, covering responsive masks, touch, keyboard focus, theme continuity and reduced motion.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- `npm --prefix website run build` — passed; built v26.0.163 and shared controls verified.
- Headless Chrome burst and halo screenshots — inspected. Physical iPhone Safari remains unverified.

## v26.0.162 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 01:18:38 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Anticipate fast scrolling when contracting the selector

### Changed

- Use smoothed approach speed to start mobile selector contraction between 16px and 80px from the theme control, shortening fast width transitions to 100–340ms.
- Remember each contraction boundary and expand only on reverse scrolling beyond the larger of that boundary or 24px. Pausing or decelerating does not expand the control.
- Preserve shared app and Playground behaviour, stable layout, reduced motion and the collision guard. Leave branding unchanged.
- Synchronise parity reference viewport widths after specimen layout settles to avoid resize timing mismatches.

### Validation

- `node website/tests/sticky-controls-stability-check.mjs` — passed at 320, 390 and 660px, including fast entry, pause latching, reversal boundaries and zero layout drift.
- `node website/tests/style-guide-browser-check.mjs` — passed after correcting comparison viewport timing.
- `npm --prefix website run build` — passed; generated v26.0.162 verified.
- Wi-Fi app and Playground previews — HTTP 200. Physical iPhone feel remains for user review.

## v26.0.161 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 01:12:37 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine Easter Egg twinkles, aurora controls and modal emergence

### Changed

- Give drifting particles pinpoint flashes with true dark intervals and shorten their default settling tail from four to 2.5 seconds, independently of the four-second sweep and two-second gap.
- Preserve the current sweep direction, progress and timer across theme changes; subsequent sweeps follow the selected theme.
- Animate the success panel and rainbow halo out from the discovered sentence, honouring reduced motion.
- Add a faster rotating aurora halo and Playground controls for halo speed, blur and aurora intensity, included in Copy and Reset.
- Allow a zero-pixel particle ring and hover heights down to 24px while retaining the full wrapped text height.
- Synchronise browser tests with rendered viewport dimensions, simulated clipboard settings and completed block resets instead of racing asynchronous updates.
- Document the shared behaviour and controls.

### Validation

- Easter Egg flow, edge, Playground and timing browser checks — passed; desktop/mobile, both themes and agents, modal focus/reopening, pinpoint dark intervals, timer continuity and reduced motion covered.
- Sheen pixel and geometry browser check — passed during animation refinement.
- `node website/tests/style-guide-browser-check.mjs` — passed after correcting asynchronous test races.
- Zero aurora intensity and zero blur — computed identity transform and zero blur verified in headless Chrome.
- `npm --prefix website run build` — passed; built app and Playground contain v26.0.161 and shared controls.
- Local LAN app and Playground routes — HTTP 200. Physical iPhone Safari remains unverified.

## v26.0.160 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 12:05:31 pm AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Align Playground floating controls with the app

### Changed

- Position the Playground ellipsis, Style Options panel and desktop Back to Top control 24px from the top, respecting larger safe-area insets.
- Keep the mobile Back to Top button 56px below the ellipsis top, preserving the 8px gap between buttons.
- Retain the shared centred floating-control shadow and verify its computed parity with the main app.

### Validation

- `node website/tests/style-guide-browser-check.mjs` — passed, including new position and shadow assertions at 320, 390, 768 and 1440px across both themes and agents. Earlier runs encountered intermittent typography and simulated clipboard timing failures; the full rerun passed.
- `npm --prefix website run build` — passed; generated v26.0.160 verified.
- Wi-Fi app and Playground previews — HTTP 200.

## v26.0.159 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 11:57:39 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Adjust selector contraction and expansion gaps

### Changed

- Contract the mobile agent selector at a 16px gap and expand at 24px, preserving the 8px reversal buffer and existing animation.
- Apply the same thresholds to the shared Playground Resources specimen and update the documented gaps and stability regression.

### Validation

- `node website/tests/sticky-controls-stability-check.mjs` — passed at 320, 390 and 660px with zero layout drift.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- `npm --prefix website run build` — passed; generated v26.0.159 verified.
- Wi-Fi app and Playground previews — HTTP 200.

## v26.0.158 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 11:51:31 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Restore the previous selector contraction

### Changed

- Revert the liquid-style animation trial to the exact v26.0.156 sticky-control implementation and its 420ms contraction.
- Retain the 24px lock inset, 12px/20px trigger gaps, centred shadows and stable layout slot in the app and Playground. Reuse unchanged resting backdrop geometry.

### Validation

- Animation source matches commit e34949c byte for byte.
- Mobile stability regression — passed with zero layout drift at 320, 390 and 660px.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- `npm --prefix website run build` — passed; generated version verified as v26.0.158. Wi-Fi app and Playground URLs return HTTP 200.

## v26.0.157 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 11:42:32 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Give the mobile selector a liquid-style contraction

### Changed

- Morph the agent selector through an asymmetrically rounded squeeze and elastic rebound over 480ms, with a small opposing icon lag and no blur.
- Resume interrupted shell animations from their visible shape; cancel shell and icon motion for reduced motion and remeasurement. Preserve the stable layout slot, 24px lock inset and 12px/20px trigger gaps.
- Share the same live morph with the Playground Resources specimen; reuse unchanged resting backdrop geometry.

### Validation

- Sticky-control matrix — passed across four widths, both agents and themes, with keyboard selection, restoration and Playground scrolling.
- Mobile stability regression — passed with zero layout drift at 320, 390 and 660px.
- Focused animation review — rounded mid-animation shape inspected; crisp rendering, interrupted expansion and reduced-motion cancellation passed.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- `npm --prefix website run build` — passed; generated version verified as v26.0.157. Wi-Fi app and Playground URLs return HTTP 200.

## v26.0.156 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 11:32:56 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Centre floating shadows and tighten sticky-control spacing

### Changed

- Lock both persistent controls 24px from the top, respecting larger safe-area insets. Collapse the mobile agent selector at a 12px gap and expand at 20px, retaining stable layout slots and the fast-scroll safeguard.
- Centre both shared floating-shadow tokens without changing blur or opacity. Use the centred control token for Playground floating controls, the Style Options panel and inspector dock; preserve the larger login-panel blur.
- Update repository guidance to retain matching centred shadows for Playground floating elements. Preserve resting layout and saved backdrop geometry.

### Validation

- Sticky-control browser matrix — passed across four widths, both agents and themes, including 24px locking and source-linked Playground scrolling.
- Mobile stability regression — passed at 320, 390 and 660px, with 12px/20px triggers and zero slot/label drift.
- Rendered shadow comparison — app selectors, Playground Style Options panel, Back to Top and inspector share zero-offset shadows.
- `node website/tests/style-guide-browser-check.mjs` — passed on final source.
- Radius-endpoint, theme-transition and theme-control-colour checks — passed.
- `npm --prefix website run build` — passed; generated version verified as v26.0.156. Wi-Fi app and Playground URLs return HTTP 200.

## v26.0.155 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 11:27:01 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Start the animated discovery reveal without a delay

### Changed

- Restore the smooth 800ms text reveal with no start delay, clarifying the requested immediate response while preserving the normal-duration final sheen.
- Retain text-shaped feathered particle capsules and the shared rotating rainbow border and halo from v26.0.154, which was not published to Sites.

### Validation

- Perspective edge browser checks — passed immediate animation start, 800ms duration, four-second sheen, delayed popup, reopening and touch paths.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- Sites build helper and generated artefact inspection — passed with v26.0.155.

## v26.0.154 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 11:23:48 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Contour particles around text and rotate the complete rainbow halo

### Changed

- Shape particle visibility around each measured wrapped text line with padded capsule corners and smooth feathering, leaving unused space beside short lines empty.
- Reveal the sentence immediately and use the normal configured duration for the final sheen. Open the popup after at least four seconds, waiting for longer sweeps to finish.
- Replace stationary colour-changing shadows with one rotating conic field shared by the rainbow border and blurred halo, keeping the inner content upright and scrollable.

### Validation

- Perspective edge, sheen, flow and Playground browser checks — passed, including decoded mask contours, transparent corners, immediate reveal, full-duration sheen and 16 width/theme/agent parity combinations.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- Sites build helper and generated artefact inspection — passed with v26.0.154.
- Halo screenshot reviewed; physical mobile Safari remains unverified.

## v26.0.153 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:26:42 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Extend the reading pause and soften particle fades

### Changed

- Wait four seconds after discovery activation before opening the success dialog, retaining the immediate 800ms reveal and 1800ms sheen.
- Double particle-edge feathering to 36px, capped at half the field dimension for narrow mobile regions; apply the same shared rendering in the Playground.

### Validation

- Perspective edge and sheen browser checks — passed; popup remains closed after three seconds, then opens, and particle masks render at mobile/desktop widths in both themes.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- `node --test website/tests/auth.test.mjs` — nine checks passed, including protected hosted Playground access.
- Sites build helper — passed; generated v26.0.153 display, four-second timer and wider mask verified in the artefact.
- Both-theme screenshots reviewed; physical iPhone Safari remains unverified.

## v26.0.152 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:21:08 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Use symmetric margins for the mobile selector trigger

### Changed

- Collapse 4px inside one measured control height and expand 4px outside it: 46px and 54px gaps with the current 50px controls.
- Preserve the stable layout footprint and shared Playground implementation.

### Validation

- `node website/tests/sticky-controls-stability-check.mjs` — passed at 320, 390 and 660px, including symmetric thresholds, reversal stability and zero layout drift.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- `node --test website/tests/auth.test.mjs` — 9 passed.
- `npm --prefix website run build` — passed; generated version verified as v26.0.152 and no local Worker secret files in dist.
- Wi-Fi main app and Playground URLs — HTTP 200.

## v26.0.151 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:18:03 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Soften particle boundaries and slow the discovery reveal

### Changed

- Feather particle edges and corners with intersecting alpha masks, measuring the actual concealed text width and applying equal horizontal and vertical padding.
- Remove native appearance, tap highlights and press scaling from the transparent target to address mobile corner artefacts.
- Direct the dark-mode sheen towards the top left and match particle colour sampling to that direction.
- Start discovery immediately with an 800ms reveal and 1800ms sheen, preserving the two-second popup delay and reopening from the revealed sentence.

### Validation

- Perspective sheen, flow, edge and Playground browser checks — passed, including actual text bounds, shared colour field, touch reveal timing, modal reopening and 16 width/theme/agent parity combinations.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- `npm --prefix website run build` — passed; generated version and changed animation/mask source verified in the artefact.
- Screenshots reviewed in both themes; physical iPhone Safari corner rendering remains unverified.

## v26.0.150 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:07:24 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Trigger the mobile selector morph one control height away

### Changed

- Derive the collapse gap from the measured agent-control height instead of 96px. Expand 4px beyond that gap to prevent threshold flicker, replacing the previous 48px reversal buffer.
- Preserve the stable layout slot, reduced-motion behaviour and mobile viewport-height handling; reuse unchanged resting backdrop geometry.

### Validation

- `node website/tests/sticky-controls-stability-check.mjs` — passed at 320, 390 and 660px; waits until one control height, holds through small reversals, expands beyond the 4px buffer, and retains zero slot/label drift.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- `npm --prefix website run build` — passed, including saved placeholder checks; generated version verified as v26.0.150.
- Wi-Fi main app and Playground URLs — HTTP 200.

## v26.0.149 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:04:52 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Extend the reading pause and reopen discovery from the text

### Changed

- Keep the immediate 180ms reveal and short sheen, but wait two seconds after activation before opening the success dialog.
- Clip the particle field to 24px rounded corners.
- Cover the revealed sentence with the return target after dismissal so either half can be clicked or tapped to reopen the dialog, retaining keyboard access and focus restoration.

### Validation

- Website build and generated version/reopening-target checks — passed.
- Touch reading pause, rounded clipping, text-based reopening and heading focus — passed.
- Dedicated Playground/app parity across four widths, both themes and both agents — passed.
- General Playground source-parity suite and Wi-Fi preview endpoints — passed. Physical-device Safari remains unverified.

## v26.0.148 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 03:01:57 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Stabilise sticky selectors and align the agent label above

### Fixed

- Reserve the full agent-selector layout slot throughout collapse and expansion, preventing the selector and “I’m Using” label from reflowing during the animation.
- Collapse 96px below the theme control and expand 144px below it, avoiding repeated state changes during small scroll reversals. Ignore height-only viewport changes when measuring, and measure untransformed dimensions.

### Changed

- Place “I’m Using” above the left-aligned agent selector on desktop as well as mobile; refresh anonymous login backdrop geometry.
- Require verified Wi-Fi/LAN addresses for all future project preview handoffs in AGENTS.md.

### Validation

- Previous implementation reproduced 37px of selector-slot movement and 14.5px of label movement at 390px near its original threshold.
- `node website/tests/sticky-controls-stability-check.mjs` — passed; zero slot and label layout drift at 320, 390 and 660px through collapse, expansion and scroll reversals; height-only resize retains sticky state.
- `node website/tests/sticky-controls-browser-check.mjs` — passed; 16 width/theme/agent combinations, above-selector labels, left alignment, shadow interpolation, focus, restoration and Playground scrolling.
- `node website/tests/style-guide-browser-check.mjs` — passed on final source. An earlier concurrent run timed out on copy feedback; isolated rerun passed.
- Theme transition, theme control-colour and focus browser checks — passed.
- `npm --prefix website run blocks:measure` and `npm --prefix website run build` — passed; generated server displays v26.0.148.
- Final app and Playground Wi-Fi URLs — HTTP 200. Physical-phone validation remains with the user.

## v26.0.147 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:55:42 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Reveal the discovered sentence immediately with sheen only

### Changed

- Begin the concealed-fragment reveal immediately on activation, completing in 180ms without waiting for the ambient sweep.
- Run a fresh 900ms sheen across the full sentence and ellipsis with particles hidden, using sentence bounds after the target disappears.
- Open the success dialog 1.25 seconds after activation, with immediate non-animated text reveal under reduced motion.

### Validation

- Website build and generated version/celebration checks — passed.
- Timed touch reveal, hidden particles, both-fragment sheen, sentence bounds and popup reading pause — passed.
- Responsive qualification, reveal, modal focus and reduced motion across eight width/agent combinations — passed.
- Dedicated Playground/app parity across four widths, both themes and agents, and general source-parity suite — passed.
- Local preview endpoints — HTTP 200. Physical-device Safari remains unverified.

## v26.0.146 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:49:41 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Apply the approved Easter Egg preset

### Changed

- Set canonical particle intensity to 400%, gravity to 160% and hover height to 60px after the explicit go message.
- Preserve the supplied four-second sweep, two-second gap, four-second particle lifetime, 16px radius and 100% halo strength.
- Keep the app, Playground initial settings, Reset and Copy on the same defaults; preserve the latest sticky-control work.

### Validation

- Website build and generated version/default-value checks — passed.
- Dedicated Playground/app parity across four widths, both themes and agents, including Reset and Copy — passed.
- Particle wave, ring interaction and halo behaviour — passed.
- General Playground source-parity suite and local preview HTTP checks — passed. Physical-device Safari remains unverified.

## v26.0.145 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:47:20 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add persistent selectors with a mobile icon collapse

### Changed

- Restore the theme selector beside the wordmark; lock both selectors at a 16px top inset and fade their shared shadows over 48px of further scrolling.
- Collapse the mobile agent selector to accessible icons with a squash-and-stretch animation, preserving layout space, focus and reduced-motion support; prevent collisions during fast scrolling.
- Share the implementation with the Playground Resources specimen and document its scrolling states. Refresh anonymous login backdrop geometry for the restored header layout.

### Validation

- `node website/tests/sticky-controls-browser-check.mjs` — passed across 320, 390, 768 and 1440px, both themes and agents; shadow interpolation, restoration, keyboard selection, reduced motion and the Playground scroll specimen.
- `node website/tests/style-guide-browser-check.mjs` — passed.
- Theme transition, theme control-colour and focus browser checks — passed.
- Authentication and reveal-radius source tests — 10 passed; saved placeholder validation — 2 passed.
- `npm --prefix website run build` — passed; built server displays v26.0.145.
- Headless mobile screenshots inspected; final local app and Playground URLs return HTTP 200. Physical-device behaviour has not been checked.

## v26.0.144 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:34:03 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add settings export, wider tuning ranges and a rotating halo

### Added

- Add header Copy Settings to export every current effect value with explicit units, including local HTTP clipboard and selectable-text fallbacks.
- Add independent Hover Area Height tuning from 48–360px, with a shorter 112px default.

### Changed

- Set defaults to 16px ring radius, 200% gravity and 200% particle intensity.
- Increase percentage limits to 400%, ring radius to 128px, sweep and particle duration to 24 seconds, and sweep gap to 20 seconds; support up to 192 particles.
- Order controls by timing, particle appearance, particle interaction and halo strength; retain header reset and mobile wrapping.
- Remove pointer-based halo behaviour and its control. Rotate the centred rainbow halo slowly on a 24-second cycle, respecting reduced motion.

### Validation

- Website build and generated version/control checks — passed.
- Clipboard payload, denial fallback, maximum particle count, default reset, control order and mobile header fit — passed.
- Dedicated Playground/app parity across four widths, both themes and both agents — passed.
- Continuous sheen, revised ring, rotating halo, reduced motion, touch and theme edge cases — passed.
- General Playground source-parity suite and preview HTTP endpoints — passed. Physical-device Safari remains unverified.

## v26.0.143 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:26:04 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Refine particle coverage, controls and immediate halo response

### Changed

- Increase the concealed-half target to at least 140px tall, scaling its height and footer spacing with the selected particle radius.
- Add an 8–64px Particle Ring Radius slider, preserving the 28px default.
- Move Reset into the panel header using the shared icon-button treatment, and move preview-only guidance above the controls.
- Remove halo smoothing and competing iframe-local coordinates; use one pointer source without boundary resets or a settling tail.
- Broaden the shared colour field over the full particle region and remove particle opacity lag so the colour band overlaps the text, ellipsis and first sparkles.

### Validation

- Website build and generated version/control checks — passed.
- Shared wave, directional particle emergence, ring attraction, local visibility and halo response checks — passed.
- Dedicated Playground/app parity across four widths, both themes and agents; radius sizing, reset placement and immediate halo stability — passed.
- Rendered sheen, touch discovery, hidden-tab, fallback theme transitions and reduced motion — passed.
- General Playground source-parity suite — passed. Physical-device Safari remains unverified.

## v26.0.142 — 2026-10-19

**Built at:** Mon 19 Oct 2026 at 02:17:46 am AEDT (+11:00)

**Built by:** Adam Jaffrey

**Build assisted by agent:** ChatGPT Codex

### Summary

Add radial particle attraction and pointer-only halo tuning

### Changed

- Gather nearby particles onto a 28px ring around the pointer instead of collapsing them onto its centre, preserving local visibility and rainbow drift.
- Add a specimen-only Halo Follow Strength slider from 0–200%, with a 100% default and shared reset.
- Remove autonomous halo colour and border animation. Smoothly derive colour, angle and displacement from the pointer and hold them still after settling.
- Preserve a static centred halo at 0% follow strength and under reduced motion.

### Validation

- Website build, version and absence of autonomous halo animation — passed.
- Ring convergence, local particle visibility, continuous wave and pointer-only colour/position settling — passed.
- Playground/app parity across four widths, both themes and agents; slider, reset and pointer outside the iframe — passed.
- Rendered sheen, touch, hidden-tab, theme fallback and reduced motion — passed.
- General Playground source-parity suite — passed. Physical-device Safari remains unverified.

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

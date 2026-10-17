---
name: changelog
description: Record finalised software artefacts for this project.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.56"
  update_summary: "Align login typography and spacing with the resource page"
  updated_at: "Sat 17 Oct 2026 at 12:39:59 pm AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Changelog

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

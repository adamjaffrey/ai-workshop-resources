---
name: motion-contract
description: Preserve theme transitions, selector movement and card reveal timing.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.3"
  update_summary: "Synchronise anchor arrival at a bounded scroll speed"
  updated_at: "Wed 21 Oct 2026 at 09:48:45 am AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Motion Contract

This is a mandatory scoped contract incorporated by [AGENTS.md](../../AGENTS.md). Read it before changing the behaviours it covers. Paths and commands in code spans are relative to the repository root. Documentation-only work does not trigger the software checks listed here.

## Theme and Slider Animation

Preserve the approved behaviour in `website/lib/workshop-theme.mjs`, `website/lib/workshop-reveal.mjs` and `website/lib/workshop-toggle.mjs` unless the user explicitly requests a change. Mobile circle timing and card reveal rules were refined in website v26.0.97. The earlier established theme reference is website v26.0.94, local commit `0b21bf4` (radius motion established in v26.0.92, `0214582`).

### Circular Reveal

- Use **300ms at viewport widths up to and including 660px**, and **420ms above 660px**, with a **300px** feather and **`cubic-bezier(0.25, 0.35, 0.75, 0.85)`** easing. Animate the radius directly between two endpoints with one continuous interpolation. Do not remap intermediate radius values to viewport colour coverage or blend in an additional easing curve.
- Centre the reveal on the destination mode's icon button: the selected sun for light mode and selected moon for dark mode, not the centre of the whole toggle.
- Light mode expands the incoming light snapshot. Dark mode contracts the outgoing light snapshot using the same animation with `animation-direction: reverse`, reversing its timing and easing exactly. Different origins and viewport-dependent endpoints mean the two directions are not pixel-for-pixel reversals.
- Trim the endpoints to **0.01%** and **99.99%** average visible light-mask coverage. Sample the viewport only to calculate those endpoints; never use coverage to adjust the speed during the animation. Preserve the current 96×96 centre-sample grid and 24-step endpoint search. Reveal the exact final theme when the transition completes.
- Keep the radial mask opaque through `max(0px, radius - 300px)` and transparent at `radius`; this preserves the current feather behaviour when the radius is smaller than 300px.

### Slider Movement and Colours

- Restrict press/hold scale and stretch animations to agent selectors, theme selectors and Playground segmented selectors. Ordinary buttons, section headers, disclosure summaries and copy actions must not scale on press or hold.
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

## Resources Anchor Arrival

- On opening or re-entering a recognised Resources step URL, wait for page load and stable font layout. Scroll at a maximum cruise speed of 900 CSS px/s with 300ms acceleration/deceleration, extending the journey for longer distances rather than increasing speed. Allow at least 600ms for a short journey; reduced motion lands immediately. Place the visible top of Step N 60px below the floating selectors' bottom edge on desktop/tablet, or 30px at widths up to 660px.
- Pin the existing selectors and hold the existing Wavelength halo, including Step 1. Over the final 600ms of travel, use one eased progress value for fading preceding step/card pairs out, bringing both selector shadows to full opacity, and revealing the Wavelength mark and veil. All complete with the scroll. Keep preceding pairs visible before this final interval, retain their layout space, and make them inert at arrival. The normal initial card entrance sequence must not obscure an anchor journey.
- Downward scrolling leaves preceding pairs hidden; upward scrolling restores them over 600ms with `cubic-bezier(.2,0,.2,1)` and releases forced sticky/brand state. Add only the bottom scroll room needed to reach the anchor; trim it at subsequent landings and progressively after upward restoration when removal cannot clamp the scroll position. A near-footer landing can require visible space below the footer.
- Respect reduced motion for scrolling and fades. User wheel/touch/navigation-key input can interrupt arrival and restore earlier content. Clicking a step copy control never initiates this journey. Follow the Interface contract for the temporary agent → theme → target-card keyboard route.

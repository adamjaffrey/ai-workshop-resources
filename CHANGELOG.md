---
name: changelog
description: Record finalised software artefacts for this project.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.19"
  update_summary: "Refine horizontal workshop cards and animated copy feedback"
  updated_at: "Fri 16 Oct 2026 at 08:41:48 pm AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Changelog

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

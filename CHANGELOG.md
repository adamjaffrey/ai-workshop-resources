---
name: changelog
description: Record finalised software artefacts for this project.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.10"
  update_summary: "Add a local design preview and align the placeholder layout"
  updated_at: "Fri 16 Oct 2026 at 07:15:09 pm AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Changelog

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

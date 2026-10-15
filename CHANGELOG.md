---
name: changelog
description: Record finalised software artefacts for this project.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.3"
  update_summary: "Add the future workshop destination QR code"
  updated_at: "Fri 16 Oct 2026 at 10:31:48 am AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Changelog

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

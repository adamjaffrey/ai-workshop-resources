---
name: website-backlog
description: Record unfinished proposed work for the workshop website.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.3"
  update_summary: "Defer rendering final page structure before JavaScript setup"
  updated_at: "Thu 22 Oct 2026 at 12:56:30 pm AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Website Backlog

## Render Final Page Structure Before JavaScript Setup

**Added at:** Thu 22 Oct 2026 at 12:56:30 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Render Resources and Component Playground controls, icons and layout correctly in the initial HTML and CSS, reducing runtime DOM rearrangement and eventually removing the need to hide the whole page during initial preparation.

### Acceptance Criteria

- Assess the cost and dependencies before implementation, and split any approved work into small, independently reversible changes.
- Generate static control structure, tab icons, disclosures, action placement and layout wrappers directly where practical, preserving shared app/specimen implementations and the established final appearance.
- Retain JavaScript for interactions and genuinely necessary browser measurements; address font and image loading separately with stable geometry.
- Verify first-visible-frame stability on initial loads and scrolled refreshes across relevant widths, themes, agents and browsers, including delayed or failed assets, keyboard operation and reduced motion.
- Retain the current first-paint safeguard until regression checks demonstrate it can safely be removed; preserve sticky behaviour, alignment, card entrances and Playground specimen parity.

### Notes

Low-priority nice-to-have, explicitly deferred by Adam. This is expected to be expensive and time consuming, with a high risk of regressions across interconnected layout and interaction code. The existing flicker fix can remain in place; this item is not authorisation to begin the refactor. Reconsider only when its benefit justifies the effort and risk.

## Review All Expand View Sections

**Added at:** Tue 20 Oct 2026 at 05:13:26 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Review and improve formatting, styling and spacing inside all Expand View sections, which have received limited review so far.

### Acceptance Criteria

- Review every Expand View section for formatting, typography, styling, alignment and spacing.
- Correct inconsistencies using the shared interface contracts and components.
- Verify the resulting layouts across relevant viewport widths and themes.

## Review Style Inspector Presentation

**Added at:** Tue 20 Oct 2026 at 05:13:26 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Review and improve formatting, styling and spacing inside the Style Inspector, which has seen limited use so far.

### Acceptance Criteria

- Review the Style Inspector's content and controls for formatting, typography, styling, alignment and spacing.
- Correct inconsistencies using the shared interface contracts and components.
- Verify the resulting layouts across relevant viewport widths and themes.

## Add a Button Hover and Animation Showcase

**Added at:** Tue 20 Oct 2026 at 05:13:26 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Add a Component Playground section that samples all website and app button hover states and animations in one place.

### Acceptance Criteria

- Inventory all button hover states and animations used across the website and app.
- Provide interactive samples of every distinct state and animation together in one Component Playground section.
- Use shared button components and interaction helpers so samples stay in parity with the app.
- Verify the samples across relevant themes and input methods, including reduced-motion behaviour.

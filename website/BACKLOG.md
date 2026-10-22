---
name: website-backlog
description: Record unfinished proposed work for the workshop website.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.8"
  update_summary: "Add status-matched focus ring behaviour to the backlog"
  updated_at: "Thu 22 Oct 2026 at 08:25:47 pm AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Website Backlog

## Match Focus Ring Colours to Success and Failure Status

**Added at:** Thu 22 Oct 2026 at 08:25:47 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Match the focus ring colour to the current success or failure status of copy fields and other controls with success/failure feedback, showing the ring only while the relevant control is focused.

### Acceptance Criteria

- Use the corresponding success or failure colour for the focus ring while a focused control displays that status.
- Apply the behaviour consistently to copy fields and other controls with success/failure conditions through the shared implementation and matching Playground specimens.
- Do not display a focus ring or move focus merely because a success/failure status occurs; remove the ring when focus leaves the control.
- Restore the normal focus ring colour when the status clears while the control remains focused.
- Verify focus and status transitions across agents and themes, preserving accessible keyboard focus visibility.

## Add a System Theme Option

**Added at:** Thu 22 Oct 2026 at 08:09:16 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Let users select System to follow their device’s light or dark appearance automatically.

### Acceptance Criteria

- Add a System option to the shared theme selector.
- When System is selected, follow the device’s current light/dark preference and respond to preference changes.
- Preserve the System choice across visits and keep the app and Playground specimens consistent.

## Add an Other Agent Option

**Added at:** Thu 22 Oct 2026 at 08:09:16 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Provide an agent-agnostic Other option alongside the existing named agents.

### Acceptance Criteria

- Add an Other option to the shared agent selector.
- Use neutral presentation and agent-agnostic wording and resources where agent-specific alternatives currently appear.
- Preserve the Other choice across visits and keep the app and Playground specimens consistent across themes.

## Simplify the Colour Palette

**Added at:** Thu 22 Oct 2026 at 08:08:50 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Consolidate the website colour palette into a simpler, more consistent set of colours.

### Acceptance Criteria

- Review the existing palette and consolidate redundant or unnecessarily similar colours.
- Apply the simplified palette consistently across the website and shared Playground specimens, preserving clear roles across agents and themes.

## Improve Light-Mode Selection and Link Hover Colours

**Added at:** Thu 22 Oct 2026 at 08:08:50 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Make text-selection highlights and link/anchor hover colours more visible for both Codex and Claude in light mode.

### Acceptance Criteria

- Adjust the text-selection highlight and link/anchor hover colours for both Codex and Claude light themes.
- Verify clear visibility and readable text in the app and matching Playground specimens.

## Document Palette Colour Blend Origins

**Added at:** Thu 22 Oct 2026 at 08:08:50 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Document the blend origins of every palette colour in Playground > Colours and the repository instructions.

### Acceptance Criteria

- Identify the source colours and blend proportions or derivation used for each palette colour.
- Show those origins alongside the palette in Playground > Colours and record them in the owning repository instruction contract.
- Keep both descriptions consistent with the implemented palette; identify any colour that is not derived from a blend.

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

---
name: repository-instructions
description: Govern agent work and preview delivery in this repository.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.11"
  update_summary: "Move login progress into the input icon and reserve error space"
  updated_at: "Sat 17 Oct 2026 at 05:58:34 pm AEDT (+11:00)"
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

- Do not automatically open a browser, tab or preview after a build. Provide the preview link and current local test password so the user can check it themselves.
- Open a preview only when the user explicitly requests it; use Google Chrome for that request.
- Never open or present a preview in the Codex sidebar, embedded browser, or preview panel. Do not use `open_in_codex` to show previews.
- Headless browser validation is permitted and does not count as opening a user-facing preview.

- Every preview-link handoff must put the clickable URL beside a clearly labelled, copyable fenced code block containing the current local test password. Use concise visual labels such as “🔗 Preview” and “🔑 Test Password” to distinguish them. Read the active server's password; never reuse a password from an earlier preview process. Never put production credentials in a handoff. If a preview has no password, explicitly say so.
- Use modest formatting, short sections and helpful icons in user-facing handoffs so links, credentials, results and limits are easy to identify.

## Website Login

- Sessions expire seven days after login, without extending on use. Keep this implementation detail in repository documentation, not the login page copy.
- On initial load, focus the login heading with no visible focus ring. Tab order is the day/night toggle as one stop, password field, then unlock button on desktop and mobile.
- Keep the password input visible above the mobile keyboard and allow the login panel to scroll when the visible viewport is short.

- Keep checking and success text visually hidden but announced to screen readers. Swap the password-slot Lucide padlock for Loader Circle during checking and Check on success; use green success styling and honour reduced motion.
- Show only error messages below the input. Reserve three text lines so ordinary status changes do not resize or recentre the panel; allow expansion for accessibility text scaling rather than clipping messages. Keep 12px between label and input, and 16px between input and error row.
- After an incorrect password, colour the padlock red until the user types or refocuses/clicks/taps the input. Restore the blue icon and blue input focus ring; this input treatment is independent of the selected agent accent.

## Focus and Panel Opening

- Keep real focus on the appropriate control for every interaction type. Do not blur controls or remove keyboard access merely to hide a ring.
- Text-entry fields, including passwords, retain visible focused styling for pointer, touch and keyboard use.
- Buttons, toggles, links and other non-text-entry controls show a focus ring only during keyboard navigation initiated by Tab or Shift+Tab. Preserve that indicator through keyboard activation and focus transfer; click or tap switches back to ring-free pointer focus.
- After a segmented selector changes, focus the newly selected mode for mouse, touch and keyboard activation, including activation from track padding or gaps. Apply the same rule to agent and day/night selectors.
- On opening any modal, dialog or popover panel, focus its descriptive heading with `tabindex="-1"` and prevent scrolling. The heading must never display a focus ring, regardless of input method. Do not initially focus a text field or open the software keyboard.
- The first Tab after heading focus must reach the first visible, enabled interactive element in logical DOM order and display its keyboard focus ring. Preserve the login order: day/night selector as one stop, password, then unlock.
- Use the shared panel-heading focus helper for custom panels and the shared opening handling for native dialogs/popovers. Every such panel must have an accessible heading. Preserve native modal containment and focus restoration to the invoking control when a panel closes.
- Validate initial/opening focus, Tab/Shift+Tab navigation, keyboard activation, pointer/touch ring suppression, input focus and selector destination focus on desktop and mobile layouts when modifying these flows.

## Website Appearance

- Default the selected coding agent to Codex. Persist an explicit Codex or Claude Code choice across login, logout and reload, and apply it before paint on both pages.
- Derive branded colours from the shared agent accent: Codex #0285FF or Claude Code #D97757. Keep neutral surfaces and semantic error/success colours distinct.
- Keep the footer action on the right, vertically centred when alongside the copyright and version text. When the action wraps onto its own row, left-align it with the footer text.
- Use the installed Lucide icon definitions for functional interface icons. Agent brand logos remain their existing separate assets.

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

---
name: repository-instructions
description: Govern agent work and preview delivery in this repository.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.7"
  update_summary: "Require title case across interface headings and labels"
  updated_at: "Sat 17 Oct 2026 at 01:27:54 pm AEDT (+11:00)"
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

- Always open user-facing website and HTML previews in Google Chrome.
- Never open or present a preview in the Codex sidebar, embedded browser, or preview panel. Do not use `open_in_codex` to show previews.
- On macOS, use `open -a "Google Chrome"` with the preview's absolute file path or local server URL.
- If opening Chrome is unavailable, provide the preview path or URL with instructions to open it in Chrome; do not substitute a sidebar preview.

- Every preview-link handoff must put the clickable URL beside a clearly labelled, copyable fenced code block containing the current local test password. Use concise visual labels such as “🔗 Preview” and “🔑 Test Password” to distinguish them. Read the active server's password; never reuse a password from an earlier preview process. Never put production credentials in a handoff. If a preview has no password, explicitly say so.
- Use modest formatting, short sections and helpful icons in user-facing handoffs so links, credentials, results and limits are easy to identify.

## Website Login

- Sessions expire seven days after login, without extending on use. Keep this implementation detail in repository documentation, not the login page copy.
- On initial load, focus the login heading with no visible focus ring. Tab order is the day/night toggle as one stop, password field, then unlock button on desktop and mobile.
- Keep the password input visible above the mobile keyboard and allow the login panel to scroll when the visible viewport is short.

## Website Appearance

- Default the selected coding agent to Codex. Persist an explicit Codex or Claude Code choice across login, logout and reload, and apply it before paint on both pages.
- Derive branded colours from the shared agent accent: Codex #0285FF or Claude Code #D97757. Keep neutral surfaces and semantic error/success colours distinct.
- Use title case for all headings, step subtitles, button labels (including state text and accessible names), input/control labels and raw all-caps labels. CSS may display those labels in uppercase. Preserve normal sentence case for body copy and status messages, and exact casing for brands and code identifiers. Keep Log Out at the bottom right of the resources footer.
- Use the installed Lucide icon definitions for functional interface icons. Agent brand logos remain their existing separate assets.

## Blur Placeholder Geometry

- Follow the block sizing, colour and preview rules in `website/README.md`, under “Block Geometry Rules”.
- Website changes that preserve the existing layout do not require block remeasurement. Reuse `website/lib/workshop-placeholder.generated.json` for colour, blend strength, blur, interaction/animation timing, authentication, documentation and preview-control changes that do not alter resting geometry.
- Only layout changes that affect the visible blurred background require remeasurement: changes to structure, positions, dimensions, spacing, fonts, font weight/size, letter spacing, line height, wrapping, breakpoints, word geometry, icon-set dimensions or the QR pattern bounds/white padding. Treat text or asset changes as layout changes when they alter those measurements. A version-label change with identical geometry does not require remeasurement.
- Footer-only changes below the visible login background do not require remeasurement or a layout-revision increment.
- Refresh saved block positions with `npm --prefix website run blocks:measure` when an authorised layout change requires it; no separate user approval is needed. Do not measure for non-layout changes or automatically during development/build startup. Run the archived `test:blur-preview` only when explicitly requested.
- For a layout change affecting visible background blocks, increment `placeholderLayoutRevision` in `website/lib/workshop-layout.mjs` to mark saved geometry stale. The existing stale-layout guard reports that a manual refresh is required; it must not launch measurement automatically. Refresh and commit geometry with the corresponding layout change. This revision is a cache key, not an artefact version.
- Do not remeasure merely because source code changed or to refresh a source fingerprint. Development/build startup uses saved geometry and never launches Chrome measurement. The tester is archived under `website/_archive/` and runs only through its explicit manual command. Generating its HTML is separate from remeasurement.

---
name: repository-instructions
description: Govern agent work and preview delivery in this repository.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.2"
  update_summary: "Require block remeasurement only when layout geometry changes"
  updated_at: "Sat 17 Oct 2026 at 02:03:31 am AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Repository Instructions

## Project Versioning System

- Before updating governed project documentation, changing project versioning or build workflows, or producing a software artefact, read `/Users/adamjaffrey/projects/project-versioning-system/package/project-versioning-system/SKILL.md` completely and follow it.
- Treat that packaged skill as the sole Project Versioning System (PVS) authority for document revisions, artefact versions, changelogs, backlogs, and its required local-commit workflow.
- Never push, tag, release, deploy, publish, or add an AI co-author trailer unless the user explicitly requests it.

## Preview Delivery

- Always open user-facing website and HTML previews in Google Chrome.
- Never open or present a preview in the Codex sidebar, embedded browser, or preview panel. Do not use `open_in_codex` to show previews.
- On macOS, use `open -a "Google Chrome"` with the preview's absolute file path or local server URL.
- If opening Chrome is unavailable, provide the preview path or URL with instructions to open it in Chrome; do not substitute a sidebar preview.

## Blur Placeholder Geometry

- Follow the block sizing, colour and preview rules in `website/README.md`, under “Block Geometry Rules”.
- Website changes that preserve the existing layout do not require block remeasurement. Reuse `website/lib/workshop-placeholder.generated.json` for colour, blend strength, blur, interaction/animation timing, authentication, documentation and preview-control changes that do not alter resting geometry.
- Only layout changes require remeasurement: changes to structure, positions, dimensions, spacing, fonts, font weight/size, letter spacing, line height, wrapping, breakpoints, word geometry, icon-set dimensions or the QR pattern bounds/white padding. Treat text or asset changes as layout changes when they alter those measurements. A version-label change with identical geometry does not require remeasurement.
- For a layout change, increment `placeholderLayoutRevision` in `website/lib/workshop-layout.mjs`, then run the normal development/build command or `node website/scripts/measure-placeholder.mjs --if-needed` from the repository root. Commit the refreshed geometry with the layout change. This revision is a cache key, not an artefact version.
- Do not remeasure merely because source code changed or to refresh a source fingerprint. Development/build startup checks the layout revision and skips Chrome measurement when the current geometry is reusable. Regenerating the standalone preview HTML is separate and does not require remeasurement.

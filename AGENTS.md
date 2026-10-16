---
name: repository-instructions
description: Govern agent work and preview delivery in this repository.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.1"
  update_summary: "Require Chrome for all user-facing previews"
  updated_at: "Fri 16 Oct 2026 at 08:14:28 pm AEDT (+11:00)"
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

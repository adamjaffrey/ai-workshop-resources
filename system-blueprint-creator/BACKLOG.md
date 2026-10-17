---
name: system-blueprint-creator-backlog
description: Record unfinished proposed work for System Blueprint Creator.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.1"
  update_summary: "Record the pending skill packaging migration"
  updated_at: "Sat 17 Oct 2026 at 12:44:42 pm AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# System Blueprint Creator Backlog

## Establish The PVS Package And Version Authority

**Added at:** Sat 17 Oct 2026 at 12:44:42 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Separate the installable skill package from its development tracking and establish a verified artefact-version authority.

### Acceptance Criteria

- Reconcile legacy `VERSION` information against available build and distribution evidence without inventing release history or reducing an assigned version.
- Place runtime files in `package/system-blueprint-creator/` and maintain exactly one authoritative `VERSION.txt` there.
- Verify supporting references, installer discovery and any direct-path consumers before changing published installation paths.
- Validate and finalise the skill artefact under PVS, recording its actual build provenance in this project’s changelog.
- Keep the project README, changelog and backlog outside the installable package.

### Notes

This is separate from the documentation-only tracking split. Existing skill source and legacy version files are preserved.

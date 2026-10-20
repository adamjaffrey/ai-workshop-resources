---
name: ai-workshop-resources
description: Index independently maintained workshop products and their tracking.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.2"
  update_summary: "Index the consolidated website design decisions"
  updated_at: "Tue 20 Oct 2026 at 05:16:08 pm AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# AI Workshop Resources

This repository contains six independently maintained products: the workshop website and five skill development projects. Each owns its README, changelog and backlog, regardless of the content of its skill instructions.

## Products

| Product | Changelog | Backlog |
|---|---|---|
| [Workshop Website](website/README.md) | [website/CHANGELOG.md](website/CHANGELOG.md) | [website/BACKLOG.md](website/BACKLOG.md) |
| [Business DNA Extractor](business-dna-extractor/README.md) | [business-dna-extractor/CHANGELOG.md](business-dna-extractor/CHANGELOG.md) | [business-dna-extractor/BACKLOG.md](business-dna-extractor/BACKLOG.md) |
| [Create DNA Folder](create-dna-folder/README.md) | [create-dna-folder/CHANGELOG.md](create-dna-folder/CHANGELOG.md) | [create-dna-folder/BACKLOG.md](create-dna-folder/BACKLOG.md) |
| [Create Projects Folder](create-projects-folder/README.md) | [create-projects-folder/CHANGELOG.md](create-projects-folder/CHANGELOG.md) | [create-projects-folder/BACKLOG.md](create-projects-folder/BACKLOG.md) |
| [System Blueprint Creator](system-blueprint-creator/README.md) | [system-blueprint-creator/CHANGELOG.md](system-blueprint-creator/CHANGELOG.md) | [system-blueprint-creator/BACKLOG.md](system-blueprint-creator/BACKLOG.md) |
| [System Build Assistant](system-build-assistant/README.md) | [system-build-assistant/CHANGELOG.md](system-build-assistant/CHANGELOG.md) | [system-build-assistant/BACKLOG.md](system-build-assistant/BACKLOG.md) |

## Website Design Decisions

The [Website Design Decision Log](website/DESIGN-DECISIONS.md) indexes visual and interaction decisions, their known rationale and owning rules. It draws primarily on the website README and includes the earlier website history migrated from the root changelog. Current requirements remain in [AGENTS.md](AGENTS.md) and its scoped contracts.

## Tracking Boundaries

The root [CHANGELOG.md](CHANGELOG.md) and [BACKLOG.md](BACKLOG.md) cover only repository-wide work. There is no combined repository artefact version. [AGENTS.md](AGENTS.md) contains shared instructions.

The website retains its existing `website/VERSION.txt` and complete build history. Each skill has independent development tracking; its README describes legacy version evidence and the remaining PVS packaging migration. This documentation-only split preserves source and installation paths and does not create a software build.

Every governed document has its own `metadata.doc_revision`. Never synchronise document revisions with product artefact versions, or increment one product because another changed. Cross-product changes update only the affected products and may share one coherent local Git commit.

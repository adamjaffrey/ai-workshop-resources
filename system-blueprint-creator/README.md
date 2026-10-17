---
name: system-blueprint-creator-project
description: Describe development and tracking for System Blueprint Creator.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.1"
  update_summary: "Establish independent skill project tracking"
  updated_at: "Sat 17 Oct 2026 at 12:44:42 pm AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# System Blueprint Creator

This folder is the development project for the `system-blueprint-creator` skill. It has independent tracking even though [SKILL.md](SKILL.md) also describes the skill.

## Project Files

- [SKILL.md](SKILL.md): skill source and operating instructions.
- [CHANGELOG.md](CHANGELOG.md): finalised artefact history for this skill only.
- [BACKLOG.md](BACKLOG.md): unfinished proposed work for this skill only.

## Version Ownership

Document revisions are independent of software artefact versions. The existing `VERSION` file contains `26.0.3` and was already untracked when this housekeeping change began. It is retained as legacy information, not adopted as a verified PVS build authority. No release entries or build timestamps have been reconstructed from that value.

At the next packaging migration, follow PVS: keep development tracking here and place the installable package under `package/system-blueprint-creator/`, with exactly one authoritative `VERSION.txt` inside that package. Reconcile the legacy version and build evidence before finalising an artefact; never reduce or reuse an assigned version. The pending migration is recorded in [BACKLOG.md](BACKLOG.md).

## Development Boundary

This housekeeping change retains existing source paths, supporting files and installation references. It does not install, run, package or publish the skill. Future changes belong to this product’s tracking documents and must not advance the website or another skill’s version. See [repository instructions](../AGENTS.md) for shared governance.

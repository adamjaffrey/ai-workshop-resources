---
name: mobile-playground-layout-decision
description: Record the rationale behind recent mobile and interaction refinements.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.1"
  update_summary: "Extract scoped guidance and record established decisions"
  updated_at: "Tue 20 Oct 2026 at 04:58:39 pm AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# ADR 001: Mobile Playground Layout and Interaction

## Status and Authority

Accepted. This record explains existing decisions; it does not introduce executable changes or grant deployment/capture permission. [AGENTS.md](../../AGENTS.md) and its [Interface contract](../agent-guidance/interface.md) govern future implementation. The observations below are from the completed refinement work, not new device tests performed for this documentation update.

## Context and Decisions

| Observation | Decision and Rationale |
|---|---|
| Content remained visible through translucent iOS browser chrome despite a full-width background sibling. | Make the actual mobile sticky ancestor opaque and viewport-wide, with an inset inner rail. WebKit's edge sampling considers the hit-tested element and ancestors, so a background sibling does not provide the same coverage. The user confirmed the ancestor-based fix on their device. Apply it across mobile browsers; preserve desktop geometry. |
| A small jump/flicker appeared on the first scroll after selecting a tab. | Round sticky height and landing coordinates to whole CSS pixels and exclude the sticky region from scroll anchoring. Preserve the approved inset destination rather than jumping to the page top. The user confirmed the flicker was resolved. |
| Some URL table columns appeared larger on mobile; uniform narrow sizing then created excessive wrapping and orphaned words. | Scope autosizing control and explicit typography to these tables. Use intrinsic sizing, compact non-wrapping columns and bounded prose measures with horizontal scrolling. Retain narrower alias wrapping, keep ownership labels on one line and give Effect more space. This balances readable rows against table width without fixed row heights. |
| Dragging away from a held selector dragged its label text. | Treat descendants as action targets: suppress text selection/native dragging and cancel dragstart in the shared controller. Retain normal focus and keyboard access. |
| A spacing adjustment intended for collapsed H3s also affected expanded content. | Specify visual clearance by state: 20px around the collapsed hover area, with the expanded content gap preserved. Account for the hover outdent when measuring, and keep H3 dividers scoped to URL Reference. |

## Consequences

Some tables intentionally exceed the mobile viewport and scroll within their wrapper. Future copy or accessibility text scaling may require more lines; current-copy line counts must not become clipping limits. The viewport-wide mobile header background does not widen its tab content. Changes to geometry, selector interaction or table copy should use the focused checks named in the Interface contract, distinguishing automation from native-device verification.

## Documentation Structure

Keep repository-wide permissions, workflow and task routing in AGENTS.md. Detailed active requirements belong in mandatory scoped contracts; ADRs preserve reasoning. This avoids loading every animation constant, capture recipe and handoff example for unrelated work while retaining the original requirements. The expired one-off static-capture permission was removed rather than carried forward as standing authority.

---
name: build-assistant-validation
description: Record validation of the renamed workshop build assistant and its scenario walkthroughs.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.3"
  update_summary: "Record the joint workshop skill compatibility review"
  updated_at: "Fri 16 Oct 2026 at 10:19:00 am AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# System Build Assistant Validation

## Scope and Method

This is a source-only skill update, not a participant system build, installed package or distributed artefact. No artefact version was allocated. The previous untracked skill directory was renamed; Git will record the new files as additions because the originals were not tracked. The entrypoint's legacy document version 26.0.2 was migrated and incremented to doc_revision 26.0.3; the previously ungoverned build reference was adopted at 26.0.1.

The checks below are manual scenario walkthroughs of the final instructions, plus executed structural validators. They are not independent agent executions or live participant acceptance tests. No example system, external integration, purchase or external write was performed.

## Scenario Walkthroughs

### Clear Simple Build

Fixture: a participant opens a new chat with a reviewed Blueprint for one purple step: turn a supplied enquiry and Business DNA into a draft response. Human approval is mandatory before sending. Done means the draft answers the enquiry, follows the supplied business rules and remains unsent. Both input files are available. The wider old process includes CRM entry, but that is background context, not an approved AI responsibility.

Trace: the entrypoint selects the uploaded reviewed file, reads it and the build reference, and stays in the new chat. Sections 1–3 require input inspection and current documentation/tool investigation of the drafting route before recommending it. One credible manual-input route suffices; the instructions do not require invented integrations. Sections 6–7 progress from one draft to representative refinement, retaining review. Section 10 requires observed output against the three criteria before completion. CRM entry and sending remain outside scope.

Outcome: the instructions support a short evidence-backed recommendation without forcing a technology question, exhaustive survey or automatic task creation. Repeating the fixture in the original Blueprint chat is explicitly permitted. This walkthrough does not establish actual draft quality.

### Integration With Unverified Capability and Access

Fixture: the Blueprint requires a draft based on a full enquiry and an attached price sheet. A connection is listed, but its account access and ability to retrieve attachments have not been tested. The participant is in Plan mode.

Trace: sections 2–3 require checking exact read operations and current authoritative documentation, separating documented support from available tools and tested access. Section 4 requires a quick feasibility check plan: use one approved enquiry with an attachment; pass only if both the full text and required attachment information match the original; fail if either is absent or inaccessible. Stop after the representative check and at most one targeted correction/retest. In Plan mode no check implementation occurs. Once implementation is permitted, a read-only test can establish that limited capability. Access failure is reported as untested or blocked, not proof that the product is unsupported. A supplied-copy route is recommended only if it satisfies the approved requirements; otherwise it is explicitly partial.

Outcome: no claim of feasibility follows merely from a tool listing or documentation. No permission for purchases, writes or sending is inferred from the proposed test. The recommendation changes with observed evidence. No live integration was tested in this validation.

### Native Question UI Unavailable

Fixture: inspection cannot determine whether manual input is acceptable; the Blueprint leaves this business constraint open. No permitted native question tool is exposed.

Trace: section 5 permits a short inline question: “Would you be comfortable copying one enquiry into the first version? A — Yes, copy it in (recommended: quicker to try). B — It must arrive automatically (we need to check the connection first). You can also reply in your own words.” It asks one business question, explains the trade-off and allows a free-text answer. Dependent work waits for the answer; independent research can continue. No request to switch modes is required to finish planning.

Outcome: the fallback is usable without fabricating a tool call. With a permitted asynchronous tool, the same question can use native UI; with a Plan-only tool in Default mode, that tool is not called. Preselection and silence do not authorise dependent work. UI rendering and participant interaction were not exercised.

## Executed Checks and Evidence

- Skill Creator quick_validate.py: passed using PyYAML 6.0.3 installed only under a temporary validation directory. Both inspected Python runtimes initially lacked PyYAML; no project dependency was added.
- Parsed interface metadata, checked the invocation against the folder and skill name, checked short-description length and resolved local Markdown reference links: passed.
- PVS validate_frontmatter for both changed skill Markdown files: passed. These checks include metadata format and soft wrapping.
- Repository-wide PVS validation: stops at the unrelated root SYSTEM-BLUEPRINT.md because it lacks frontmatter. That file was preserved rather than edited to pass validation.
- Checksums of the unrelated root SYSTEM-BLUEPRINT.md and system-blueprint-creator/VERSION: unchanged.
- Live source references: the Blueprint Creator already invokes system-build-assistant; no creator edits were required. The old skill name is absent from live workshop instructions.
- Official documentation was searched and the [Codex planning guidance](https://learn.chatgpt.com/guides/best-practices#plan-first-for-difficult-tasks) opened on 16 October 2026. It documents user Plan-mode toggles. The documentation fetch tool returned 404 for its Markdown endpoint, so the page was read through the web tool.
- The supplied runtime contracts expose a Plan-only request_user_input tool and a Default-permitted request_user_input_async tool, but no mode-switching tool. This is session-specific evidence, not a universal Codex capability claim. Neither question tool was invoked merely to test its UI.

## Limits

Manual walkthroughs check the written decision paths; they do not prove future agent adherence, account access, product capability or build quality. Each participant build must perform the required current research and representative tests for its own inputs and environment.

## Build-Start Confirmation Follow-Up

Manual walkthrough of the added checkpoint: after selecting the manual enquiry-drafting path, the assistant explains the first draft, supplied inputs, project files, representative test and human review, then asks whether to begin. Selecting the path alone cannot start implementation. An explicit yes permits the described work when the runtime allows implementation; “adjust”, “not yet” or no answer does not. In Plan mode, yes does not switch modes. Approval for a bounded feasibility check stops at that check; commencing the subsequent build requires its own concrete explanation and confirmation. An already-given explicit start instruction after the explanation is honoured without a duplicate question. These are instruction walkthroughs, not live participant interaction tests.

## Joint Workshop Readiness Review

Reviewed both complete skill entrypoints, their UI metadata and both instruction references together. Corrected the creator's closing guidance to explain research, recommendation and confirmation before building, and limited its no-build/no-invocation rule to the interview so a later explicit same-chat build request is permitted. Allowed project-required metadata before the Blueprint body. The builder now checks all ten expected sections, the selected-step count and observable completion criteria, while accepting appropriate “none” answers and handling material TBDs without restarting the interview. The ten scripted questions and all text-fenced script blocks were preserved exactly.

Executed checks passed for both skills: Skill Creator quick validation, PVS frontmatter validation for all four skill Markdown files, UI names and invocation prompts, short-description lengths, local reference links, ten-question order, unchanged scripted text blocks and matching all ten output sections to the builder's input contract. No obsolete build-skill spelling or automatic handoff instruction was found in either skill. The unrelated root Blueprint and creator VERSION checksums remained unchanged.

Manual journey walkthroughs covered these outcomes:

| Scenario | Reviewed Outcome |
|---|---|
| Simple enquiry draft | Ten confirmed answers produce the Blueprint; new-chat build researches a suitable path and waits for start confirmation before creating the first draft |
| One purple replaces a process | Conditional context captures old work separately from approved AI responsibilities; builder preserves that boundary and human review |
| Participant invokes the builder in the original chat | Creator's interview restrictions end; builder uses the reviewed file without moving chats or restarting questions |
| Required input is missing or TBD | Builder inspects first, asks only for a material missing item and does not invent it or reject an otherwise usable Blueprint |
| Connection capability is uncertain | Bounded check has pass/fail conditions and its own confirmation; a check result does not silently start the full build |
| No permitted native question UI | Short inline choices work; no compulsory Plan-mode switch or fabricated tool call |
| Participant chooses a path but has not said to start | Builder explains concrete work and waits; silence and “not yet” do not start implementation |

Assessment: the source instructions are consistent and ready for a facilitated workshop trial. This review did not exercise installed-skill discovery, actual question UI, a full interactive interview or a participant's live integration. Repository-wide PVS remains blocked by the unrelated root Blueprint's missing frontmatter; the skill files pass their direct checks.

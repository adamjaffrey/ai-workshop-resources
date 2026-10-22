---
name: repository-instructions
description: Govern agent work and preview delivery in this repository.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.83"
  update_summary: "Require unique icons for distinct Playground section headings"
  updated_at: "Thu 22 Oct 2026 at 08:48:48 pm AEDT (+11:00)"
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

## Documentation-Only Updates

- Keep documentation-only changes light: review the text and diff, validate affected document metadata, and create the required local commit. Do not run website or browser tests, build the website, start or restart a preview server, change its password, or perform preview/LAN checks solely for a documentation change.
- For documentation-only handoffs, provide the concise change summary, relevant document links and Build and Delivery status. Omit Local Preview and Local App Test Password unless the user explicitly requests a preview handoff. These exceptions override the general preview and handoff requirements below. A change that modifies executable website behaviour still requires the relevant software validation.
- URL-reference prose is rendered in the Playground from `website/URL-REFERENCE.md`; wording-only corrections remain documentation-only and do not require rebuilding the hosted site unless publication is explicitly requested.

## Proportionate Testing

- Use focused tests by default. Choose the smallest set that verifies the changed behaviour, its affected consumers and credible regression risks. Reuse existing coverage; do not stack overlapping suites or add tests that merely mirror implementation details.
- Scope browser, viewport, theme, agent, state and input-method coverage to what the change can affect. Shared implementation changes require coverage of affected consumers, but do not automatically require every suite or every combination. Named checks and matrices in scoped contracts apply to their relevant behaviour, not to every edit in that area.
- Run a broader suite only for a clear reason: a change with widespread effects, an integration risk the focused checks cannot cover, a failure suggesting wider regression, or an explicit user request. State the reason before running it. A routine local build alone is not a reason.
- Once the relevant checks pass, proceed to delivery. Repeat or broaden testing only after a relevant code change, new failure or unresolved risk; do not rerun unchanged passing checks for reassurance. Avoid concurrent heavy browser suites that can create resource contention and misleading timeouts.
- Investigate a failed check enough to assess its relevance. Fix failures caused by the change; report unrelated or pre-existing failures and any coverage limits without silently expanding the task or claiming a full-suite pass.
- Keep routine build commands free of newly added broad test gates unless explicitly requested. Documentation-only changes follow the lightweight workflow above.

## URL Reference Maintenance

- Any future URL, hostname, redirect, query parameter, alias or canonical destination change must update both `website/URL-REFERENCE.md` and the Component Playground’s URL Reference tab in the same coherent change. The tab renders the Markdown document directly; keep that shared renderer and its route current, and verify both URL mappings and query parameter strings are represented when changing behaviour.

## Scoped Instructions

This file owns repository-wide rules and routes detailed work to the contracts below. Those contracts are mandatory project instructions for their stated scope, not optional background reading. Read the relevant contract before editing that area; read Delivery before every completed-update handoff. Current user instructions take precedence. The indexed design decision log explains decisions and is non-normative; it does not supersede these contracts or grant permissions.

| Work Area | Required Contract |
|---|---|
| Preview operation and every update handoff | [Preview and Delivery](docs/agent-guidance/delivery.md) |
| URLs, public parameters, authentication, login UI or logo shortcut | [Authentication and Routing](docs/agent-guidance/authentication.md), plus [URL Reference](website/URL-REFERENCE.md) for the public mapping |
| Appearance, typography, icons, layout, focus, controls or Playground specimens | [Interface](docs/agent-guidance/interface.md) |
| Theme transitions, selector movement or Resources card entrances | [Motion](docs/agent-guidance/motion.md), plus Interface for interaction/layout |
| Anonymous login backdrops, geometry capture or Sites publication preparation | [Anonymous Backdrops](docs/agent-guidance/backdrops.md) |

Keep cross-cutting policy here. Put precise implementation constraints and test matrices in the appropriate contract, and decision rationale in the single [Design Decision Log](website/DESIGN-DECISIONS.md). Read its relevant entry before changing an established design choice; record substantive new or revised decisions there in the same change as their owning rules, distinguishing known rationale from undocumented reasons. Use descriptive entry anchors; separate numbered ADR files are not required. Update the owning document instead of copying its rules into multiple places. Do not move active requirements into the decision log without retaining a mandatory contract and a discoverable link.

## Following Established Conventions

- Follow the existing design and development rules, shared implementations and documented decisions wherever they apply. Read the relevant scoped contracts and design-log entries before proposing a new pattern; prefer reuse over introducing a parallel convention.
- If the existing rules cannot reasonably meet the task, prepare a concrete suggestion based on the closest comparable previous decisions. Explain which rule would change, why it does not fit and the practical trade-offs, then ask the user to confirm before implementing that departure. Do not silently override an established rule or treat missing guidance as approval for an unrelated redesign.
- An explicit user instruction already authorising that departure is sufficient; do not ask again. Routine work that follows the established rules needs no extra confirmation. After an approved change, update the owning rules and decision log together so future agents inherit the new decision.

## Preview and Handoff Essentials

- Adam gives standing explicit approval to generate LAN previews whenever needed to create and verify preview links. This includes starting or restarting the local preview server, binding it to a LAN-accessible interface (including `0.0.0.0`), and using the established automatic local sign-in so devices on the LAN can review the content. Do not ask for fresh approval for these preview operations. Follow the Delivery contract for credentials and verification; this does not require a preview solely for documentation-only work.
- Pushing to GitHub and publishing to Sites always require explicit user approval for those external actions. Standing LAN preview approval grants neither permission and does not authorise automatically opening a browser.

- Never automatically open a user-facing browser or the Codex preview panel. Open a requested preview only on explicit instruction, using Chrome; headless validation is permitted for software work.
- User-facing local previews use real automatic local sign-in (`preview:phone` or `createPhonePreview({autoLogin:true})`), never a production authentication bypass. Hosted Resources and Playground remain session-protected.
- Verify the active process, reachable Wi-Fi/LAN IPv4 origin, linked destinations and process-generated test password before a preview handoff. Never substitute loopback, production credentials or a stale password. Follow the Delivery contract's unavailable wording when verification is impossible.
- Routine previews contain only Main App and Playground links. Include a Login Form link only when explicitly requested. Link a Playground section only when it was specifically worked on or discussed in the current chat work and is the sole primary review destination; otherwise link `/component-playground`.
- Use the exact Build and Delivery wording in the Delivery contract. Documentation-only updates omit preview/password sections unless explicitly requested and retain the current website artefact version. A local commit or push does not publish to Sites.

## Website Guardrails

- Canonical destinations are `/ai-workshop-resources` and `/component-playground`; browser titles are AI Workshop Resources and Component Playground, including login pages. Keep application canonical redirects at 301 and preserve the routing/query rules in the Authentication contract and shared URL Reference.
- Preserve server-validated sessions, fail-closed errors and destination-specific login handling. Login backdrops must contain only anonymous geometry in inert, script-disabled frames, never protected text or authenticated pages.
- Change shared app sources first and keep Playground specimens in parity in the same change. Do not make independent optical copies. Validate affected app/specimen behaviours across relevant widths, agents, themes and input methods; follow the scoped test requirements without claiming physical-device coverage from emulation.
- Use shared theme, alignment, typography, icon and interaction helpers. Preserve the 4px optical extension, 28px specimen text rail and 24px rounded-surface rail, 32px visible control-group gaps (36px layout gap where a 4px selector outdent applies), 40px Resources selector gap and 16px white-panel separation. Expanded views follow the same contracts.
- New interface icons come from installed Lucide definitions. Obtain explicit approval for alternatives only when Lucide has no suitable icon; the existing two Lobe agent logos and Wavelength brand asset remain approved. Preserve official icon names, sources, licences and usage metadata.
- Give distinct Playground sections unique heading icons; follow the Interface contract for the shared catalogue and usage metadata.
- Use CMOS 18 title case for headings and control labels, with the categories and grammatical rules in Interface. Preserve literal identifiers, code and official names.
- Only agent/theme selectors and Playground segmented selectors may stretch on press/hold. Ordinary buttons and disclosures must not inherit that animation. Preserve accessible focus, keyboard access and theme-aware hover states.
- Internal builds reuse saved backdrop geometry. Remeasure existing backdrops only for explicitly authorised publication when relevant layout has changed, or an explicit user exception. Follow the Backdrops contract to identify the actual published baseline; never treat old one-off authorisation as ongoing permission.

## Recent Interface Learnings

These constraints are detailed in the [Interface contract](docs/agent-guidance/interface.md); their rationale is recorded in [Design Decision Log](website/DESIGN-DECISIONS.md).

- Mobile URL tables need consistent cell/code typography and scoped text-autosizing control. Use intrinsic table sizing and content-aware columns, not a universal narrow width: keep hostname Status and Owner unwrapped and give Effect a 36–44ch measure; retain useful alias wrapping and horizontal access.
- Keep sticky heights and tab landing coordinates on whole CSS pixels and exclude the sticky region from scroll anchoring to prevent the first-scroll flicker.
- Disable selector-label selection/native dragging and cancel `dragstart` through the shared controller so dragging outside a held control cancels without dragging its text.
- Keep collapsed URL H3 hover areas visually 20px from surrounding boundaries on both sides; retain the expanded content gap separately. Scope their dividers to URL Reference.
- On mobile, the actual sticky tab ancestor must be opaque and viewport-wide; a wide background sibling behind an inset ancestor did not solve iOS translucent chrome. Keep the inner rail inset, the normal 16px panel gap and desktop geometry unchanged.

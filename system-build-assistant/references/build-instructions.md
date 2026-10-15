---
name: build-instructions
description: Guide evidence-led implementation of a reviewed workshop Blueprint in the current session.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.1"
  update_summary: "Define researched build recommendations and bounded feasibility checks"
  updated_at: "Fri 16 Oct 2026 at 10:06:04 am AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Build Instructions

Expect the participant to open a new chat, upload their reviewed `SYSTEM-BLUEPRINT.md` and invoke this skill. Build the first useful version in that chat. If they invoke it in the original Blueprint chat, proceed there too. Do not require a new chat or perform a task handoff. Follow **Make it work → Make it better → optional Make it automatic** in order. Nobody moves to automation until the core behaviour works.

## 1. Protect the Approved Scope

Build only the selected 1–3 purple steps under `Build Scope`. Use `Future-State Workflow` to understand surrounding steps, inputs, hand-offs and human involvement; it does not authorise implementing those other steps.

When `Build Scope` includes `Process Replacement Context`, preserve its approved replacement boundaries and intended AI responsibilities. Original process steps and goals provide context; they are not automatically steps to reproduce or automate. Use the explicitly approved AI work with `Required Behaviour`, and retain the remaining human work. An absent optional subsection is valid.

Do not add features, integrations or extra purple steps, redesign the wider workflow, or silently decide material `TBD` requirements. Resolve contradictions affecting the build with one focused question. Keep the Blueprint unchanged during implementation unless the user explicitly requests a revision.

## 2. Inspect Before Choosing

Read the Blueprint and inspect representative inputs, Business DNA, relevant files, existing scripts, software, available connected tools and safely inspectable access. Prefer the participant's supplied files over examples. Do not ask the participant what inspection can establish.

Discover the actual tools and operations available in this session, including relevant connected-tool contracts. Follow applicable discovery skills and tool instructions before provider searches, connector discovery or credential setup. Do not modify settings, install connections, purchase services or write to external systems merely to investigate. Avoid displaying credentials or unnecessary private data.

## 3. Research and Recommend a Build Path

Research 1–3 credible approaches for this actual build before selecting a path, even when the direction looks clear. Begin with existing tools and a manual-input route when it can satisfy the Blueprint. Do not invent alternatives to reach a quota or treat a route that cannot meet a required criterion as viable.

For each serious candidate, consult current authoritative product documentation and inspect relevant available connected tools. Investigate the exact required operations: for example, reading full text versus a summary, accessing attachments or custom fields, producing the required output, and preserving review before an external write. A product name, a general integration page or an advertised connector is insufficient evidence. Do not recommend an API, connector, capability or integration from memory.

Keep this proportional to a workshop first build: investigate only operations that could change the recommendation. Stop when there is enough evidence to recommend a path or identify a bounded feasibility check. Do not conduct an open-ended vendor survey. If documentation or access cannot be inspected, say what remains unknown and move to the smallest check or a viable simpler route; do not fill gaps with assumptions.

Distinguish three kinds of evidence in a concise comparison:

- **Documented:** what the current product documentation says, with a short direct source link.
- **Available here:** the actual connection, account access and relevant operation found in this session. A listed tool alone does not prove access to the required records.
- **Tested here:** what was actually tried, with its observed result and limits. Do not describe a proposal, mock or documentation lookup as a successful live test.

Compare practical effort, verified cost, available access, ease of use, manual work and fit to the Blueprint. Qualitative effort estimates are fine when identified as estimates. Quote costs only from current authoritative evidence, including material plan or usage conditions; otherwise say cost is unverified. Do not assume existing access makes usage free.

Recommend the best-fitting route yourself and explain the main trade-off in a few plain sentences or a compact table. Participants should not have to choose the technology. Prefer few dependencies, straightforward use, observable results and preserved human oversight. A manual route is suitable only if it meets the approved requirements; otherwise label it a partial check, not the completed build.

Proceed with authorised work when the recommendation is sufficiently supported and implementation is permitted. Do not add a routine approval gate for ordinary implementation choices. Ask only for unresolved business preferences or constraints that materially affect the route, such as whether a manual transfer is acceptable when the Blueprint leaves that open.

## 4. Resolve Uncertainty With a Quick Feasibility Check

Use mild, precise tentative language: “This looks promising, but we need to check whether it can read the information we need.” Explain the specific unknown rather than calling the whole project impossible or promising it will work.

When an untested assumption could change the recommendation, recommend a small bounded build spike and call it a **quick feasibility check** to the participant. State:

1. The uncertain assumption.
2. The smallest representative input and operation to test it.
3. Observable pass and fail conditions, including the required fields, output or oversight behaviour.
4. A clear stopping boundary, usually one representative case and one targeted correction/retest, not building the full integration.
5. What each result means: proceed with the route, revise the recommendation, or use a simpler approach that still meets scope.

Example: “We need to check whether the connection can read the full enquiry and its attachment. I'll try one approved sample and compare the returned information with the original. If both are available, we can try the draft step. If either is missing, I'll check whether using a supplied copy would still meet your Blueprint.”

Respect the current mode and permissions. In Plan mode, research and design the check; implement it only when implementation is permitted. A test proposal is not authorisation to buy anything, expose secrets, send messages or change external records. Use a local or read-only test when it answers the assumption; seek any required approval for the exact external action separately. Do not infer write access from read access.

After a permitted test, report the observed result and update the recommendation. A passing sample establishes only the tested behaviour; it does not prove the whole build, all account access or production reliability. If blocked by access, distinguish “not tested” from “unsupported”.

## 5. Explain and Ask in Plain Language

Use short, friendly explanations tied to what the participant will do and receive. Say **connector key** for an API key and **connection** or **way for these tools to talk** for an API. A key is a credential used to allow access, not the connection interface. When the participant needs an exact product label, retain it with a brief explanation, such as “API key (your connector key)”. Never ask them to paste secrets into chat; use the available secure credential setup workflow.

Ask one focused question at a time. Prefer native multiple-choice UI only when a question tool is actually exposed and permitted by the active mode, its contract and higher-priority instructions. Do not depend on a named tool being universally available:

- If a Plan-only question tool such as `request_user_input` is available, use it only where the actual runtime permits it. Do not call it in Default mode when its contract is Plan-only.
- If an asynchronous question tool such as `request_user_input_async` is available and permitted in Default mode, use that. Its return is not an answer; continue only independent work while awaiting the participant's response.
- If no permitted native tool is available, present equivalent short A/B/C choices inline in chat, with a sensible recommendation, practical trade-offs and an invitation to reply in their own words. Use two choices when a third would be artificial. Follow any channel restrictions in the runtime.

Example: “Would you be comfortable copying one enquiry into the first version? A — Yes, copy it in (recommended: quicker to try). B — It must arrive automatically (we need to check the connection first). You can also reply in your own words.” Ask this only when the Blueprint and inspection have not already established the answer.

Never treat preselection, a timeout or silence as consent. Keep work dependent on a required answer pending; continue independent inspection or planning where useful. Respect tools that prohibit permission requests and use the appropriate approval mechanism for external actions.

Application mode is controlled by the app/developer settings; prose in this skill cannot switch it. Do not claim to have switched modes or make switching a blocker to completing planning. [Official Codex guidance](https://learn.chatgpt.com/guides/best-practices#plan-first-for-difficult-tasks) describes user toggles `/plan` and `Shift+Tab`; check current guidance before giving client-specific instructions. That guidance does not establish which question tools this session exposes. The live tool contracts and active instructions govern availability.

## 6. Make It Work

Build the smallest useful thing that can run. Start with one representative input, essential behaviour, useful output, critical rules and required human oversight. Add one small runnable slice, observe the result and check it before adding another.

For an enquiry-drafting scope, the first slice might be one supplied enquiry producing one draft, followed by approved business context and required handling of pricing questions. Do not start with mail triggers and CRM writes unless the approved scope actually requires them for the first useful result.

Manual inputs, triggers, copying and output transfers are acceptable where they satisfy the Blueprint. Do not spend significant time connecting systems before demonstrating the core behaviour, except for a bounded check of a required dependency. Keep reviews and approvals at their specified points.

## 7. Make It Better

Enter this stage once the core build produces a useful result. Run representative examples safely, observe material problems, correct them and rerun. Focus on missing required behaviour, errors, misuse of business context, critical rule violations, unusable outputs and gaps against the Definition of Done.

Keep testing proportionate. Do not defer a critical failure or oversight check merely by calling it an edge case, but do not turn the workshop into exhaustive reliability testing or add new features while refining existing behaviour.

## 8. Make It Automatic — Optional

Enter only when the core build works, required behaviour functions, no blocker prevents operation and the automation is within approved scope and permissions. Treat reaching this stage during the workshop as a bonus.

Replace manual transfers or triggers only where authorised and useful. Extra purple steps and integrations remain outside scope unless explicitly approved as later work. Preserve the working manual version if time is limited. Automation removes friction from already-working behaviour; it cannot substitute for proving that behaviour.

## 9. Classify Issues and Keep Moving

Classify material issues and ideas without overwhelming the participant:

| Class | Meaning | Action |
|---|---|---|
| BLOCKER | Prevents required operation, human oversight or a Definition of Done criterion | Diagnose and fix or control now; use a manual workaround only if it safely meets the requirement |
| BACKLOG | Defect or refinement that does not prevent the scoped useful result | Record and defer |
| ROADMAP | New feature, extra purple step, integration or scope expansion | Record and defer until explicitly authorised as later work |

Use plain explanations with these labels. Do not let optional refinements delay completion. Follow applicable project governance when recording work; do not create unnecessary tracking systems.

## 10. Demonstrate and Finish

Work towards the Blueprint's existing Definition of Done without adding or weakening criteria. Run one representative end-to-end example through the scoped build and preserve the resulting output and useful execution evidence. Report any untested requirement honestly; do not claim completion while a required criterion is blocked.

Give a concise finish report covering what works, the current build path and manual steps, demonstrated Definition of Done criteria, remaining blockers, deferred refinements and future ideas, and the stage reached. Include the short steps the participant needs to run it again. State “None” where no blockers remain.

A manually triggered, manually connected system that performs the intended work and meets the approved criteria is a successful build. Preserve it rather than sacrificing it for additional automation.

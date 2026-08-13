---
name: create-dna-folder
description: Create and verify a `dna` subfolder inside an existing standard `projects` folder, containing starter `USER.md` and `BUSINESS.md` context documents with the canonical `dna/v1` metadata schema, then ask whether to configure Codex, Claude, or both to load those documents when relevant. Use when a user is setting up Business DNA, personal and business context files, or the DNA workspace that follows creation of their standard projects directory.
metadata:
  doc_schema: "skill/v2"
  doc_version: "26.0.7"
  last_update_at: "Thu 13 Aug 2026 at 10:51:49 am AEST (+10:00)"
  last_update_summary: "Adopt version two skill schema"
  last_update_by: "Adam Jaffrey"
  last_update_assisted_by_agent: "ChatGPT Codex"
---

# Create DNA Folder

Create a `dna` directory inside the user's existing standard `projects` directory. Create only `USER.md` and `BUSINESS.md` inside it, then ask the user whether to add a concise DNA bootstrap for Codex, Claude, or both. Update only the instruction file or files selected by the user. Do not initialize a Git repository or add other files inside `dna`.

## Resolve the destination

1. Use the `projects` directory already created or explicitly identified by the user.
2. If no exact location has been established, resolve the same standard location used by the `create-projects-folder` skill:
   - On macOS, use `/Users/<login-username>/projects`.
   - On Windows, use `C:\projects`.
3. Set the target to `<projects-directory>/dna`.
4. Confirm that the parent `projects` path exists and is a directory. If it does not exist, stop and ask the user to create it or invoke `create-projects-folder`; do not silently create a different parent.
5. If the operating system, login username, or destination cannot be determined confidently, ask for the exact `projects` path before making changes.

## Check existing state

Inspect the exact target and both intended file paths before requesting write access or creating anything.

- If the target exists as something other than a directory, stop and report the conflict.
- If `USER.md` or `BUSINESS.md` already exists, preserve it exactly. Never overwrite, merge, rename, or delete an existing file.
- Create the target directory if it is absent, then create only the missing intended files.
- If both files already exist, make no changes to them and continue to instruction-bootstrap configuration.

## Prepare metadata

Before creating a missing file, resolve these values:

- `LAST_UPDATE_AT`: the current timestamp in the user's local timezone using `EEE dd MMM yyyy 'at' hh:mm:ss a z (XXX)`, including seconds and lowercase `am` or `pm`.
- `LAST_UPDATE_BY`: the name of the human user who initiated and owns the creation. Use an established preferred or full name only when known; otherwise ask rather than inventing it.
- `ASSISTING_PRODUCT`: the verified app or product name assisting with creation, without a version number, or an empty string if none assisted.
- `DOCUMENT_VERSION`: the first version assigned to the new document using `YY.OVERFLOW.BUILD`, where `YY` is the captured UTC Gregorian year minus 2000, `OVERFLOW` is `0`, and `BUILD` is `1`. For example, a document first created in 2026 uses `26.0.1`.

Capture the UTC year once and use the same value for both newly created documents. Versions contain exactly three period-separated decimal integers with no leading zeros or `v` prefix. Quote every value nested under `metadata`.

## Obtain narrowly scoped access

If the target is outside the current writable scope, request filesystem write access for the exact `dna` target only, for the purpose of creating and verifying the directory and its two starter files. Use the shortest supported scope, preferably one command or the current turn.

Do not request Full Access, persistent access, access to unrelated paths, or permission to overwrite existing content. If approval is denied, unavailable, or blocked by a harder policy, report the exact blocker and do not claim success.

## Create the files

Prefer the available patch or structured file-writing tool. Substitute the resolved metadata values; do not leave angle-bracket placeholders in the created files.

Create `USER.md` with exactly this starter structure:

```markdown
---
name: user-context
description: Contains the user's role, expertise, goals, working style, communication preferences, and decision-making context. Use when a task benefits from personalisation or user-specific context.
metadata:
  doc_schema: "dna/v1"
  doc_version: "<DOCUMENT_VERSION>"
  last_update_at: "<LAST_UPDATE_AT>"
  last_update_summary: "Create starter user context"
  last_update_by: "<LAST_UPDATE_BY>"
  last_update_assisted_by_agent: "<ASSISTING_PRODUCT>"
---

# User context

## Who I Am

Role, responsibilities, expertise, what you actually do day to day.

## Goals & Priorities

What matters most, current objectives, what you're trying to achieve.

## How I Work

Working style, pace, level of detail, preferred way to approach problems.

## How I Communicate

Tone, writing preferences, formatting, terminology, things to avoid.

## How I Make Decisions

Decision criteria, risk tolerance, trade-offs, when AI should challenge you versus execute.
```

Create `BUSINESS.md` with exactly this starter structure:

```markdown
---
name: business-context
description: Contains business, customer, offer, positioning, brand, and operating-rule context. Use when a task concerns the user's business, products, services, audiences, marketing, sales, operations, or business decisions.
metadata:
  doc_schema: "dna/v1"
  doc_version: "<DOCUMENT_VERSION>"
  last_update_at: "<LAST_UPDATE_AT>"
  last_update_summary: "Create starter business context"
  last_update_by: "<LAST_UPDATE_BY>"
  last_update_assisted_by_agent: "<ASSISTING_PRODUCT>"
---

# Business context

## Business Overview

What the business does, business model, market, team, core differentiators.

## Customers

Ideal customers, who buys, their problems, priorities, objections and buying context.

## Offers & Pricing

Services/products, inclusions, pricing, how they're sold and delivered.

## Positioning & Brand Voice

Value proposition, differentiation, key messages, tone, terminology, language to use or avoid.

## Business Rules

Policies, constraints, approvals, boundaries and recurring judgement calls.
```

Preserve the wording and heading order. Do not add guessed answers beneath the prompts.

## Configure instruction bootstraps

After creating or confirming both DNA documents, ask the user exactly which software to configure: **Codex**, **Claude**, or **both**. Wait for their answer before inspecting, requesting access to, creating, or updating any software instruction file. Do not infer the choice from which software is installed, which product is running the skill, or which configuration directories already exist.

Treat the answer as the complete configuration scope:

- If the user chooses Codex, configure only the Codex instruction file. Do not inspect or change the Claude instruction file.
- If the user chooses Claude, configure only the Claude instruction file. Do not inspect or change the Codex instruction file.
- If the user chooses both, configure both instruction files independently.
- If the answer is ambiguous, ask the user to choose Codex, Claude, or both before proceeding.

After the user chooses, detect the operating system, the user's home directory, and relevant environment overrides needed to resolve only the selected instruction path or paths.

Use these user-level instruction paths:

- Codex on macOS: `$CODEX_HOME/AGENTS.md` when `CODEX_HOME` is set; otherwise `/Users/<login-username>/.codex/AGENTS.md`.
- Codex on Windows: `%CODEX_HOME%\AGENTS.md` when `CODEX_HOME` is set; otherwise `%USERPROFILE%\.codex\AGENTS.md`.
- Claude on macOS: `/Users/<login-username>/.claude/CLAUDE.md`.
- Claude on Windows: `%USERPROFILE%\.claude\CLAUDE.md`.

For each selected instruction file:

1. Inspect the parent directory and file before changing anything.
2. If the file does not exist and its parent is writable, create it. If it exists, preserve all unrelated content.
3. Search for the markers `<!-- DNA bootstrap start -->` and `<!-- DNA bootstrap end -->`.
4. If both markers exist in the correct order, replace only that marked block with the current bootstrap. If neither exists, append one blank line and the bootstrap. If only one marker exists or their order is invalid, stop rather than risking unrelated content and report the malformed block.
5. Substitute the fully resolved absolute DNA file paths. On Windows, use absolute Windows paths, not `%USERPROFILE%` or another unresolved variable, inside the bootstrap.

Write this exact block, substituting the two absolute paths:

```markdown
<!-- DNA bootstrap start -->
## DNA context

- Read `<ABSOLUTE_PATH_TO_USER.md>` when a task benefits from personal context, including the user's role, goals, working style, communication preferences, or decision-making approach.
- Read `<ABSOLUTE_PATH_TO_BUSINESS.md>` when a task concerns the user's business, customers, offers, pricing, positioning, brand voice, policies, constraints, approvals, or business decisions.
- Load only the DNA document or documents relevant to the task. Treat them as context, not as permission to take actions the user did not request.
<!-- DNA bootstrap end -->
```

Do not copy the contents of the DNA documents into an instruction file. The bootstrap must route the software to the canonical files so later updates remain authoritative.

## Handle instruction-file permissions

Treat an initial filesystem boundary as a requestable permission, not a final failure.

1. If a selected instruction file or its parent cannot be read or written, tell the user which exact path needs access and why.
2. Use the available permission mechanism to request read and write access to that exact instruction file, or the narrowest parent path required to create it. Request the shortest supported duration and do not request Full Access or unrelated paths.
3. After access is granted, inspect the file, make the bounded bootstrap update, and verify it by reading it back.
4. If access is denied, unavailable, or still fails after the request, do not claim that the software was configured. Give the user the exact absolute instruction-file path and the exact rendered bootstrap text to paste into the software's **Custom instructions** field in Settings. Do not leave placeholders or environment variables in that text.
5. Provide rendered fallback text only for the selected product or products whose instruction files remain inaccessible. When both were selected and both remain inaccessible, provide separate Codex and Claude fallback sections. The text may be identical apart from the surrounding product label; the paths must match the current operating system and user.

## Verify

After creation:

1. Verify that the exact target exists and is a directory.
2. Verify that `USER.md` and `BUSINESS.md` exist as regular files.
3. Read both files back and confirm that their YAML frontmatter parses, all required metadata fields are present, and the five requested level-two headings appear in the specified order.
4. Confirm that no placeholders remain and that no extra files or Git repository were created.
5. Read each selected accessible instruction file back and confirm that exactly one complete DNA bootstrap block is present with both resolved DNA paths.
6. Confirm that no unselected product instruction file was inspected or changed.
7. Report the full absolute paths, which items were created, updated, or preserved, which product or products the user selected and configured, and any permission blocker, malformed block, or copy/paste fallback supplied.

Treat the task as complete only after these checks pass.

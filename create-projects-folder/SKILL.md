---
name: create-projects-folder
description: Create and verify a safe parent folder for code repositories on macOS or Windows. Use when a user is setting up a computer for development, wants a `projects` directory, needs a repository workspace folder, or asks Codex to prepare the standard location in which future repositories will be stored.
metadata:
  doc_schema: "skill/v1"
  doc_version: "26.0.6"
  last_update_at: "Thu 13 Aug 2026 at 12:13:01 am AEST (+10:00)"
  last_update_summary: "Adopt build versioning system metadata"
  last_update_by: "Adam Jaffrey"
  last_update_assisted_by_agent: "ChatGPT Codex"
---

# Create Projects Folder

Create exactly one parent directory for future code repositories. Do not initialize a Git repository or create files inside it.

## Resolve the destination

1. Ask whether to use the default name `projects` or a different folder name, unless the user already chose one.
2. Detect the operating system and resolve an absolute target:
   - On macOS, use `/Users/<login-username>/<folder-name>`.
   - On Windows, use `C:\<folder-name>`.
3. If the operating system, login username, or destination cannot be determined confidently, ask the user for the exact location before making changes.
4. Do not substitute another base directory silently.

## Check existing state

Inspect the exact target before requesting write access or creating anything.

- If it is already a directory, make no changes and report that it is ready.
- If another filesystem object exists there, do not overwrite, rename, or delete it. Report the conflict.
- If it does not exist, continue with creation.

## Obtain narrowly scoped access

If the exact target is outside the current writable scope, do not treat the initial boundary as a final denial and do not silently stop.

Use the available permission or approval mechanism to request:

- Permission: filesystem write access
- Exact path: the resolved target only
- Purpose: create and verify only this directory
- Scope: the shortest supported period, preferably one command or the current turn
- Expiry: when that command or turn finishes

Do not request Full Access, persistent access, a persistent command rule, access to the parent directory, or access to unrelated paths. If a dedicated filesystem-permission request is unavailable, request approval for the exact directory-creation command instead.

If approval is denied, unavailable, or blocked by a harder system policy, report the exact blocker and the next action the user must take. Do not claim that creation succeeded.

## Create and verify

After any required approval:

1. Create only the resolved directory using a platform-appropriate command.
2. Verify independently that the exact path exists and is a directory.
3. Report the full absolute path and whether it was created or already existed.
4. State that no Git repository or files were created inside it.

Treat the task as complete only after verification. If any command fails, preserve the error, report it clearly, and do not silently retry with broader permissions or a different location.

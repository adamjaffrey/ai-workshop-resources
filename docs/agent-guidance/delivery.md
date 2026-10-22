---
name: preview-and-delivery
description: Specify preview operation, authentication expectations and exact handoff wording.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.4"
  update_summary: "Keep canonical preview links and add nested component anchors"
  updated_at: "Thu 22 Oct 2026 at 10:35:44 pm AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Preview and Delivery Contract

This is a mandatory scoped contract incorporated by [AGENTS.md](../../AGENTS.md). Read it before changing the behaviours it covers. Paths and commands in code spans are relative to the repository root. Documentation-only work does not trigger the software checks listed here.

## Preview Operation

- Apply the standing LAN preview authorisation in [Repository Instructions](../../AGENTS.md#preview-and-handoff-essentials) when generating preview links; no fresh approval is needed to start or restart the automatically signed-in LAN server. GitHub pushes and Sites publication remain separate actions requiring explicit user approval.

- Every preview handoff includes canonical Main App and Playground links. Add an indented list beneath Playground for the specific pages or anchored sections worked on in the current chat turn, following Required Update Handoff. Include multiple destinations when relevant; do not choose unrelated subpages or carry forward old review links merely because they appeared earlier in the conversation. Always use the verified active Wi-Fi address and port for local links.

- Start all user-facing local previews already signed in. Use `npm --prefix website run preview:phone` (automatic login enabled), or pass `{autoLogin:true}` to `createPhonePreview` for custom ports. Continue generating and displaying the process’s temporary test password. The local adapter must obtain a real session through the unchanged server-side login handler, using only its in-memory preview database and temporary credential; never add an authentication bypass to application handlers, production builds or hosted Sites. Keep low-level authentication tests explicit (`autoLogin:false`, the factory default). Keep `/ai-workshop-resources?login=false` available for inspecting the real login form, but provide its link only when the user explicitly requests it; local Log Out returns there. Verify a fresh browser opens Resources, the session endpoint recognises its cookie, logout invalidates it, and hosted access still requires authentication when changing this workflow.

- For every future preview handoff in this project, provide the active server’s reachable Wi-Fi/LAN IPv4 address and port, never `localhost`, `127.0.0.1` or another loopback address. Adam reviews on his phone. Bind the server to the network interface, verify both app and Playground URLs. Do not include routine “use the same Wi-Fi” reminders in messages or handoffs. Recheck the address and active process’s test password at each handoff. If LAN access is unavailable, explain the limitation rather than substituting a loopback link.

- **Do NOT automatically open Google Chrome for the user.** Do not launch, foreground or open a Chrome window/tab after builds, updates, server restarts or preview handoffs. This also applies to other browsers. Provide the preview link and current local test password in the reply instead; let the user open it themselves.
- Open a user-facing preview only when the user explicitly asks to open it. A request to build, update, test, start a preview server or provide a preview link is not permission to open Chrome. When explicitly asked to open a preview, use Google Chrome.
- Never open or present a preview in the Codex sidebar, embedded browser, or preview panel. Do not use `open_in_codex` to show previews.
- Headless browser validation is permitted and does not count as opening a user-facing preview.

- Every preview-link handoff must use the exact Local Preview and Local App Test Password sections defined below. Do not invent alternate labels or status wording. Never include production credentials or reuse a password from an earlier preview process.
- Use modest formatting, short sections and helpful icons in user-facing handoffs so links, credentials, results and limits are easy to identify.

### Local and Hosted URL Behaviour

The local column describes the user-facing preview started with automatic login enabled. Low-level tests using `autoLogin:false` require explicit login for app content. Hosted behaviour applies after the corresponding build is published to Sites; a local commit or GitHub push alone does not update the live site.

| URL | Local Preview | Hosted Sites |
|---|---|---|
| `/ai-workshop-resources` | Opens the app using a valid local session, obtaining one automatically through the real local login handler if needed. No password entry is required. | Opens the app when the server validates the existing session; otherwise shows the password form. |
| `/`, `/workshop`, `/resources`, `/ai`, `/workshop-resources` and documented singular/plural aliases | Permanently redirects (301) to `/ai-workshop-resources`, preserving query parameters. | Permanently redirects (301) to `/ai-workshop-resources`, preserving query parameters; authentication is unchanged. |
| `/home` or `/home/` | Permanently redirects (301) to `/ai-workshop-resources`, preserving query parameters; the destination follows local automatic-login rules. | Permanently redirects (301) to `/ai-workshop-resources`, preserving query parameters; the destination requires a valid hosted session or password login. |
| `/component-playground` or a supported section such as `/component-playground/branding` | Password-free by default; a section path selects that tab directly. | Requires the same server-validated session as the main app. Without one, shows the Playground login form; successful login retains the requested section. |
| `/ai-workshop-resources?login=true` | Reuses an existing valid session or shows the password form; never automatically signs in. | Reuses an existing valid session or shows the password form; never signs in. |
| `/ai-workshop-resources?login=false` | Revokes the current session, clears its cookie and shows the login form. | Revokes the current session, clears its cookie and shows the login form. |

On Resources and supported Playground routes, `login=false` revokes the current server session, clears its cookie and displays the destination login form on local previews and hosted Sites. `login=true` never authenticates: it reuses a valid session or shows the login form. Local automatic sign-in is suppressed whenever `login` is present. The local Playground remains anonymous only when `login` is absent. With either explicit boolean, every local Resources/Playground page follows real server-validated session handling: false revokes the session; true requires an existing session or shows login. Successful login removes `login` before navigation to prevent a logout loop, preserving the section and unrelated query parameters. Hosted app and Playground sessions share the existing seven-day expiry and logout rules. Never describe a hosted link as password-free merely because its local counterpart opens automatically.

### Required Update Handoff

This is an exact output contract for every completed update in this repository, with the documentation-only exceptions above. Use the literal labels, order, punctuation and status phrases below; substitute only verified values and the explicitly permitted alternatives. These rules supersede older handoff examples elsewhere in the repository or chat history.

1. Start with a concise change summary and verification result, normally one or two sentences.
2. Emit **📦 Build and Delivery** and its four bullets in the exact order shown below.
3. Emit **🔗 Local Preview** with exactly two top-level link bullets: canonical Main App and canonical Playground. Beneath Playground, include an indented list of relevant page/anchor links for the current turn when applicable. Do not include a Login Form link in routine preview handoffs.
4. Immediately follow with **🔑 Local App Test Password** and one fenced `text` block containing only the active process’s test password.
5. Append **🌐 Live on Sites** only when publication succeeds for this update, or the user explicitly requests the existing live link. After every successful publication, include Main App and Playground links as two separate bullets.

Use bold section labels, not Markdown heading markers. Put a blank line after every section label and between sections. Keep version and commit values in inline backticks. Every app link must be its own bullet with `↗` inside the anchor text. Do not open any link automatically.

#### Exact Build and Delivery Wording

| Item | Condition | Required Content After the Bold Item Label |
|---|---|---|
| Build | A new artefact was successfully produced and finalised | `` `vVERSION` — new artefact produced. `` |
| Build | Documentation-only or another update with no new artefact | `` `vVERSION` — unchanged, no new artefact produced. `` |
| Commit | This update was committed locally | `` `HASH` — local commit performed. `` |
| Commit | This update’s commit was also pushed successfully | `` `HASH` — local commit performed; pushed to GitHub. `` |
| Push (GitHub) | No push occurred for this update | `Not performed.` |
| Push (GitHub) | Push succeeded for this update | `Performed successfully.` |
| Publish (Sites) | No publication occurred for this update | `Not performed.` |
| Publish (Sites) | Publication succeeded for this update | `Performed successfully.` |

Read the website artefact version from `website/VERSION.txt` and the short commit hash from Git. A documentation-only update retains the current website version and must not add a build changelog entry. Never use “changed, new artefact produced”, “local.” or another shortened/paraphrased status. Push and publication are independent actions; report only what happened for this update, not a previous update’s delivery status.

If a build, commit, push or publication failed or was blocked, replace that item’s success phrase with `Failed — REASON.` or `Blocked — REASON.` and report the actual current version/commit where applicable. If no commit occurred, use `Not performed.` for Commit; never present an older commit as this update’s commit. Do not use success wording for partial work.

#### Exact Local Link Selection and Wording

Define `LOCAL_ORIGIN` as the active preview’s verified `http://WIFI-IP:PORT`, without a trailing slash. Never hard-code an example IP address or port, assume the previous process still owns a port, substitute loopback, or show a production password.

- Main App: `[Main App ↗](LOCAL_ORIGIN/ai-workshop-resources) — automatically signed in`. Link to `/ai-workshop-resources`, not a redirect alias, and do not put paths in the anchor text.
- Playground, always: `[Playground ↗](LOCAL_ORIGIN/component-playground) — automatically signed in`. Never replace this canonical root link with a page or anchor link.
- Direct review destinations: indent additional bullets beneath Playground, using `[TAB TITLE > HEADING TITLE ↗](LOCAL_ORIGIN/component-playground/SECTION-SLUG#CANONICAL-FRAGMENT) — automatically signed in` for an anchored section, or `[TAB TITLE ↗](LOCAL_ORIGIN/component-playground/SECTION-SLUG) — automatically signed in` for a whole tab. Include one to as many distinct destinations as needed to cover the components worked on in the current chat turn; omit this nested list when there are none. Prefer the most specific existing anchor, avoid redundant parent-tab links when an anchor suffices, and preserve page order.
- Verify page slugs and heading fragments against the shared URL Reference or generated anchor inventory; do not invent fragments from component names. For a specimen without its own anchor, link its nearest existing containing section, or its tab when no section anchor exists. Use actual tab and heading titles as labels. Verify every supplied destination on the active preview during software handoff; a successful page response alone does not verify a fragment. The documentation-only preview exception remains unchanged.

| Section Slug | Section Title |
|---|---|
| `components` | Components |
| `typography` | Typography |
| `colours` | Colours |
| `blocks-and-blur` | Blocks and Blur |
| `icons` | Icons |
| `status-states` | Status States |
| `focus-and-selection` | Focus and Selection |
| `branding` | Branding |
| `easter-egg` | Easter Egg |
| `url-reference` | URL Reference |

Do not use “Preview link”, inline-code paths in labels, “password free”, “password-free”, “logged out state” or additional lock icons in these handoff bullets. The exact local phrase “automatically signed in” describes the no-password-entry review experience; it does not change the authentication implementation. The app obtains a real local session, while local Playground access remains password-free as documented above. Never apply this phrase to hosted access or imply that either local route bypasses hosted authentication. If the user explicitly requests a login-form link, provide it separately from the canonical link pair and nested review destinations; it revokes the current session before displaying the logged-out form.

Verify the active process, LAN origin and both linked destinations before handing them over. Verify a login-form URL separately only when explicitly requested or required by the authentication changes being tested. Read the password from that process’s startup output. Retained startup output is usable only after confirming that the same process is still serving those URLs; never copy a credential merely from a previous final response. If the process or password cannot be verified, restart and verify when safe and within scope, or use the unavailable case below.

If local preview is unavailable, retain **🔗 Local Preview** with `Unavailable — REASON.` and **🔑 Local App Test Password** with `Unavailable — no verified active preview password.` instead of links or a password block. Do not invent credentials or provide unverified URLs. If a deliberately passwordless preview has no test credential, state `Not applicable — this preview has no test password.` instead of a code block; the normal app preview still requires its generated test credential for manual login inspection.

#### Exact Live Link Selection

Under **🌐 Live on Sites**, every successful publication must include two separate bullets: `[Main App ↗](VERIFIED-LIVE-ORIGIN/ai-workshop-resources)` and `[Playground ↗](VERIFIED-LIVE-ORIGIN/component-playground)`, without authentication suffixes. Use the verified hosted origin; the existing site is `https://workshop.adamjaffrey.chatgpt.site`. Always retain both canonical top-level links. Add relevant current-turn page/anchor links beneath Playground using the same nested structure as Local Preview, verified against the published version and without automatic-sign-in suffixes. When the user asks for an existing live link without publication, provide the requested destination(s). Never include the production password or describe hosted links as automatically signed in. If showing an existing live site without publishing this update, say `Existing live site; this update has not been published.` before the link. Keep the Publish status truthful.

### Handoff Format

Copy this structure literally for a successful new local build, replacing placeholders. For documentation-only work, use `unchanged, no new artefact produced.` and omit the preview and password sections as specified above. When specific components were worked on in the current turn, append their page/anchor links as indented bullets beneath the canonical Playground bullet, using the forms above. Do not emit placeholder text.

````markdown
**📦 Build and Delivery**

- **Build:** `vVERSION` — new artefact produced.
- **Commit:** `HASH` — local commit performed.
- **Push (GitHub):** Not performed.
- **Publish (Sites):** Not performed.

**🔗 Local Preview**

- [Main App ↗](LOCAL_ORIGIN/ai-workshop-resources) — automatically signed in
- [Playground ↗](LOCAL_ORIGIN/component-playground) — automatically signed in

**🔑 Local App Test Password**

```text
CURRENT-PROCESS-PASSWORD
```
````

When the live-link inclusion condition is met, append:

```markdown
**🌐 Live on Sites**

- [Main App ↗](VERIFIED-LIVE-ORIGIN/ai-workshop-resources)
- [Playground ↗](VERIFIED-LIVE-ORIGIN/component-playground)
```

Before sending, check the exact four status labels and order, version/hash evidence, both canonical root URLs, current-turn nested review destinations and their verified titles/slugs/fragments, literal authentication suffixes, active-process password, and whether a Live on Sites section is warranted. Do not substitute stylistic variants for this contract.

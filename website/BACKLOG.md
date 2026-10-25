---
name: website-backlog
description: Record unfinished proposed work for the workshop website.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.10.9"
  update_summary: "Record phased private skill distribution and email authentication"
  updated_at: "Sun 25 Oct 2026 at 12:05:04 pm AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Website Backlog

## Host Skills Privately and Introduce Participant Email Authentication

**Added at:** Sun 25 Oct 2026 at 12:05:04 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Distribute the workshop skills from the existing ChatGPT Sites infrastructure so the development repository can become private. Preserve a single pasted installation prompt or command: participants must not manually download or extract an archive, run a command against a downloaded folder or obtain GitHub access. Progress from the existing shared-password login and a shared download token to email one-time-code authentication and download tokens tied to individual login sessions.

### Acceptance Criteria

- Deliver the work in the three phases below, with phase one useful independently. Design the initial download endpoint to accommodate both shared and session-linked credentials without replacing the distribution mechanism later.
- Phase one: retain the existing shared-password website login; host complete skill archives on Sites behind one revocable, rotatable shared download token that may be forwarded to any user. Generate the packages during publication, update installation prompts and verify that one pasted command automatically downloads, extracts and installs every required skill file.
- Phase two: let participants enter the email used to register for the workshop, receive a one-time code and enter it to authenticate. Retain a controlled shared-password fallback and the same shared download token. Support later visits and re-authentication, including resend and recovery flows.
- Phase three: display a download-only token in each authenticated installation prompt, associated server-side with that login session. Use a proposed absolute 72-hour session lifetime from successful login, without extension on use; expire or revoke the download token on session expiry, logout or revocation. Returning participants can re-authenticate and copy a fresh prompt.
- Integrate all eight considerations below into the relevant phase and its acceptance checks. Resolve the identified policy choices before implementing dependent behaviour.
- Verify fresh installation, supporting-file completeness, repeat installation and updates for both supported agents, plus missing, invalid, rotated, expired and revoked credentials. Include a participant rehearsal and recovery scenarios before workshop use; define supported prerequisites and useful failure messages rather than promising error-free execution in every environment.
- Verify all installation prompts and supporting-file references use the new distribution route before requesting a separate repository-visibility change. Making the repository private does not withdraw previously downloaded or cloned copies. Push, publication and visibility changes require separate explicit authorisation.
- When implementing, update the owning authentication, routing, URL Reference, interface and delivery contracts and relevant design decisions coherently; preserve current behaviour until each authorised phase is validated.

### Notes

Deferred proposed work at Adam's request following concern about development cost. Logging this plan does not authorise implementation, a compatibility experiment, service provisioning, email sending, repository-visibility changes or publication. Reassess scope and estimates before starting an approved phase.

#### Eight Implementation Considerations

1. **Separate email ownership from workshop eligibility.** Select the authoritative registration source and define access for new registrations, changed email addresses, cancellations and past participants. Verify eligibility as well as code possession. Consider a locally synchronised eligibility list so registration-system downtime does not interrupt every login; define synchronisation and access-removal behaviour before choosing this approach.
2. **Control the shared-password fallback.** Treat it as a facilitator-controlled recovery route that can be rotated or disabled. It bypasses email verification, so record password-authenticated sessions distinctly and never attribute them to an unverified email. In phase three, give fallback sessions their own expiring download tokens. Decide the fallback's availability and permissions explicitly.
3. **Separate browser sessions and download credentials.** Keep the browser cookie as a secure session identifier; never copy it into an installation prompt. Issue a separate credential restricted to skill downloads, associate it with the server-side session and enforce the proposed 72-hour absolute expiry, logout and revocation on the server. The authenticated page supplies the command; the terminal does not inherit browser cookies. Preserve secure cookie handling and fail-closed authorisation.
4. **Recognise forwarding limits.** Anyone holding a download token can use it during its validity period; session association supports expiry and revocation but does not prove the downloader's identity. Avoid IP binding that would fail when participants switch between workshop Wi-Fi, home and mobile networks. Expiry prevents future downloads, not use or redistribution of installed files.
5. **Define the update experience.** Installed skills continue working after token expiry. Future downloads require current authorisation; the supported recovery flow is to revisit the site, authenticate and copy a fresh installation prompt. Test whether the chosen installer retains source URLs and how its update command behaves with expired credentials before promising standalone automatic updates.
6. **Make email delivery and recovery reliable.** Establish the sending service and domain configuration, code lifetime, single-use verification, resend behaviour, attempt limits and send-rate limits. Avoid responses that reveal whether an email is registered. Test delays, undelivered codes and service failures, and provide a clear recovery route for legitimate participants. Email delivery is the principal new operational dependency in phase two.
7. **Protect tokens from phase one.** Limit tokens to downloads, provide rotation/revocation and exclude credentials from application logs and analytics. Inspect terminal history, AI conversations, installer metadata and retained URLs as possible disclosure locations. Verify current installer telemetry behaviour and disable it in the installation prompts; do not assume a non-GitHub source URL is omitted. Review what third-party infrastructure records and document unavoidable retention limits.
8. **Package once and publish deliberately.** Generate archives from the maintained skill sources rather than manually maintaining a second copy. Include all runtime files, retain identifiable package versions and rollback capability, and resolve a stable latest destination to the latest published package. Source edits alone must not alter hosted downloads. Serve archives only through the authorisation endpoint, with no public-static-file bypass or cache behaviour that exposes protected downloads across users. Preserve each skill's independent packaging/version authority and account for its recorded PVS packaging migration.

#### Indicative Development Estimate

| Work | Working Days | Scope |
|---|---:|---|
| Phase 1: website-hosted skills | 1–2 | Packaging, protected endpoint, shared token and rotation, prompts, installation/update checks and publication |
| Phase 2: email-code login | 3–5 | Eligibility integration, sending, code and resend flows, abuse controls, password fallback, sessions, interface and delivery checks |
| Phase 3: session-linked tokens | 1–2 | Session association, 72-hour expiry, logout/revocation, dynamic prompts and expired-token/update checks |
| Final integration and workshop rehearsal | 0.5–1 | Fresh participant setup, both supported agents, recovery scenarios and deployment verification |

The initial conversational estimate was approximately 6–10 working days overall; the individual ranges above sum to 5.5–10 days. These are unvalidated planning allowances, not a fixed quote, measured implementation effort or approved budget. They include implementation, focused testing and publication work, but do not grant publication permission. No hourly rate or monetary estimate has been established.

Assumptions: existing Sites infrastructure can serve protected packages; one accessible registration source supplies participant emails; an email-sending service and domain are available or straightforward to configure; and the implementation retains `npx skills` rather than introducing a custom installer. Registration reconciliation or email-domain troubleshooting could add 1–3 working days, plus external verification delays. Ongoing email/hosting costs remain to be assessed.

If phase one is later authorised, begin with a 2–4-hour compatibility check included in its estimate: prove that the intended installer version can fetch a token-protected archive from Sites, install supporting files and handle a subsequent update. Check URL/token retention and failure handling as part of that experiment, then revise the remaining estimate before implementing the full distribution flow.

#### Research References

These references informed the discussion and must be rechecked against the selected installer version and hosting capabilities before implementation; they are not evidence of a completed integration test.

- [Skills installation and archive-source reference](https://github.com/vercel-labs/skills/blob/main/docs/commands.md)
- [Skills telemetry and configuration](https://github.com/vercel-labs/skills/blob/main/docs/troubleshooting.md)
- [OWASP authentication guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP session-management guidance](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)

## Match Focus Ring Colours to Success and Failure Status

**Added at:** Thu 22 Oct 2026 at 08:25:47 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Match the focus ring colour to the current success or failure status of copy fields and other controls with success/failure feedback, showing the ring only while the relevant control is focused.

### Acceptance Criteria

- Use the corresponding success or failure colour for the focus ring while a focused control displays that status.
- Apply the behaviour consistently to copy fields and other controls with success/failure conditions through the shared implementation and matching Playground specimens.
- Do not display a focus ring or move focus merely because a success/failure status occurs; remove the ring when focus leaves the control.
- Restore the normal focus ring colour when the status clears while the control remains focused.
- Verify focus and status transitions across agents and themes, preserving accessible keyboard focus visibility.

## Add a System Theme Option

**Added at:** Thu 22 Oct 2026 at 08:09:16 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Let users select System to follow their device’s light or dark appearance automatically.

### Acceptance Criteria

- Add a System option to the shared theme selector.
- When System is selected, follow the device’s current light/dark preference and respond to preference changes.
- Preserve the System choice across visits and keep the app and Playground specimens consistent.

## Add an Other Agent Option

**Added at:** Thu 22 Oct 2026 at 08:09:16 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Provide an agent-agnostic Other option alongside the existing named agents.

### Acceptance Criteria

- Add an Other option to the shared agent selector.
- Use neutral presentation and agent-agnostic wording and resources where agent-specific alternatives currently appear.
- Preserve the Other choice across visits and keep the app and Playground specimens consistent across themes.

## Simplify the Colour Palette

**Added at:** Thu 22 Oct 2026 at 08:08:50 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Consolidate the website colour palette into a simpler, more consistent set of colours.

### Acceptance Criteria

- Review the existing palette and consolidate redundant or unnecessarily similar colours.
- Apply the simplified palette consistently across the website and shared Playground specimens, preserving clear roles across agents and themes.

## Improve Light-Mode Selection and Link Hover Colours

**Added at:** Thu 22 Oct 2026 at 08:08:50 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Make text-selection highlights and link/anchor hover colours more visible for both Codex and Claude in light mode.

### Acceptance Criteria

- Adjust the text-selection highlight and link/anchor hover colours for both Codex and Claude light themes.
- Verify clear visibility and readable text in the app and matching Playground specimens.

## Document Palette Colour Blend Origins

**Added at:** Thu 22 Oct 2026 at 08:08:50 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Document the blend origins of every palette colour in Playground > Colours and the repository instructions.

### Acceptance Criteria

- Identify the source colours and blend proportions or derivation used for each palette colour.
- Show those origins alongside the palette in Playground > Colours and record them in the owning repository instruction contract.
- Keep both descriptions consistent with the implemented palette; identify any colour that is not derived from a blend.

## Render Final Page Structure Before JavaScript Setup

**Added at:** Thu 22 Oct 2026 at 12:56:30 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Render Resources and Component Playground controls, icons and layout correctly in the initial HTML and CSS, reducing runtime DOM rearrangement and eventually removing the need to hide the whole page during initial preparation.

### Acceptance Criteria

- Assess the cost and dependencies before implementation, and split any approved work into small, independently reversible changes.
- Generate static control structure, tab icons, disclosures, action placement and layout wrappers directly where practical, preserving shared app/specimen implementations and the established final appearance.
- Retain JavaScript for interactions and genuinely necessary browser measurements; address font and image loading separately with stable geometry.
- Verify first-visible-frame stability on initial loads and scrolled refreshes across relevant widths, themes, agents and browsers, including delayed or failed assets, keyboard operation and reduced motion.
- Retain the current first-paint safeguard until regression checks demonstrate it can safely be removed; preserve sticky behaviour, alignment, card entrances and Playground specimen parity.

### Notes

Low-priority nice-to-have, explicitly deferred by Adam. This is expected to be expensive and time consuming, with a high risk of regressions across interconnected layout and interaction code. The existing flicker fix can remain in place; this item is not authorisation to begin the refactor. Reconsider only when its benefit justifies the effort and risk.

## Review All Expand View Sections

**Added at:** Tue 20 Oct 2026 at 05:13:26 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Review and improve formatting, styling and spacing inside all Expand View sections, which have received limited review so far.

### Acceptance Criteria

- Review every Expand View section for formatting, typography, styling, alignment and spacing.
- Correct inconsistencies using the shared interface contracts and components.
- Verify the resulting layouts across relevant viewport widths and themes.

## Review Style Inspector Presentation

**Added at:** Tue 20 Oct 2026 at 05:13:26 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Review and improve formatting, styling and spacing inside the Style Inspector, which has seen limited use so far.

### Acceptance Criteria

- Review the Style Inspector's content and controls for formatting, typography, styling, alignment and spacing.
- Correct inconsistencies using the shared interface contracts and components.
- Verify the resulting layouts across relevant viewport widths and themes.

## Add a Button Hover and Animation Showcase

**Added at:** Tue 20 Oct 2026 at 05:13:26 pm AEDT (+11:00)

**Added by:** Adam Jaffrey

**Addition assisted by agent:** ChatGPT Codex

### Outcome

Add a Component Playground section that samples all website and app button hover states and animations in one place.

### Acceptance Criteria

- Inventory all button hover states and animations used across the website and app.
- Provide interactive samples of every distinct state and animation together in one Component Playground section.
- Use shared button components and interaction helpers so samples stay in parity with the app.
- Verify the samples across relevant themes and input methods, including reduced-motion behaviour.

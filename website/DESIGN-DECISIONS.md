---
name: website-design-decisions
description: Index website design decisions, their known rationale and owning rules.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.23"
  update_summary: "Record proportional icons and full feedback hold durations"
  updated_at: "Wed 21 Oct 2026 at 10:58:12 am AEDT (+11:00)"
  updated_by: "Adam Jaffrey"
  update_assisted_by_agent: "ChatGPT Codex"
---

# Website Design Decision Log

## Scope and Authority

This is the single indexed record of the website's design decisions and known rationale. It consolidates the design topics in [README.md](README.md), with the pre-split root changelog and current [repository instructions](../AGENTS.md), their scoped contracts and the former mobile-layout ADR used to resolve or flag later refinements. It is a retrospective documentation consolidation, not a new design approval or a fresh runtime/device audit. Original decision dates are not inferred from this document's update date.

This log is non-normative. Follow the linked contract for current rules; where a detail has no dedicated contract, its linked README specification and canonical source own the implementation detail. Do not use an older README value here to override a newer mandatory contract. Source summaries are included for discoverability; exact tokens, algorithms, defaults and test recipes remain at their owning source. README-only details have not been individually revalidated in a browser during this documentation-only update.

Separate numerically named ADR files are not required. Each descriptive heading below is a stable linkable decision record. This document expands and relocates `docs/decisions/001-mobile-playground-layout.md`, continuing that document's revision lineage; its five decisions are retained under the relevant headings. Git preserves the original file and historical versions. Document revision numbers remain required by PVS, independently of whether decisions have numeric IDs.

## Source Coverage

The current root [README.md](../README.md) was introduced at the independent-product tracking split (`24bb2aa`); there was no root README in its parent commit. It indexes the products rather than recording website visual choices. The older website decisions were in the root `CHANGELOG.md`. All 55 pre-split build entries were verified to be retained verbatim in [website/CHANGELOG.md](CHANGELOG.md), so the migrated history remains the source instead of being copied here again. The website README remains the primary narrative source; the historical entries below fill gaps and identify superseded iterations. This check covers the README and migrated build history, not every past chat or every CSS declaration.

## Maintenance

- Read the relevant entry before changing an established design choice, then read its linked authoritative contract/source.
- Record a substantive new or changed decision here in the same coherent update as its owning rules. Retain a short superseded note when replacing a meaningful choice; link the replacement instead of silently presenting contradictory values as current.
- Record rationale only when supported by the README, current contract or an explicit user decision. Mark absent rationale as not recorded; label proposed explanations as inference rather than historical fact. Do not invent approval dates or new device-test evidence.
- Use descriptive headings and keep the index current. Preserve existing anchors when practical. Keep implementation checklists in the contracts and build history in [CHANGELOG.md](CHANGELOG.md).
- Small implementation fixes that do not change a design decision need not create a new entry. This log is not a backlog, changelog or exhaustive list of CSS declarations.

## Decision Index

| Decision | Primary Subject |
|---|---|
| [Optical Rails and Specimen Clearance](#optical-rails-and-specimen-clearance) | Rails, outdents and clipping |
| [Spacing and Responsive Control Grids](#spacing-and-responsive-control-grids) | Vertical rhythm, slider targets and grid gaps |
| [Typography, Title Case and Literal Values](#typography-title-case-and-literal-values) | Editorial casing, type specimens and monospace |
| [Lists and Disclosure Alignment](#lists-and-disclosure-alignment) | Bullets and chevron body alignment |
| [Agent Branding and Semantic Colours](#agent-branding-and-semantic-colours) | Accent palette, status colours and provenance |
| [Theme and Preference Persistence](#theme-and-preference-persistence) | OS defaults, persistence, URLs and cross-tab state |
| [Shared Surfaces and Shadows](#shared-surfaces-and-shadows) | Neutral surfaces, QR exception and shadow tokens |
| [Icons and Source Catalogues](#icons-and-source-catalogues) | Library policy, metadata and catalogue provenance |
| [Navigation Links and Copy Feedback](#navigation-links-and-copy-feedback) | Link arrows, hover targets and clipboard feedback |
| [QR Touch Interaction](#qr-touch-interaction) | Touch reveal versus direct activation |
| [Focus, Cursors and Cancellation](#focus-cursors-and-cancellation) | Input modality, panel opening and cancelled drags |
| [Selectors, Hover Layers and Press Motion](#selectors-hover-layers-and-press-motion) | Shared selection states and animation limits |
| [Circular Theme Reveal and Reduced Motion](#circular-theme-reveal-and-reduced-motion) | Reveal geometry, colour timing and motion preferences |
| [Card Entrances and Footer Wrapping](#card-entrances-and-footer-wrapping) | Viewport qualification and narrow footer layout |
| [Sticky Controls and Mobile Browser Chrome](#sticky-controls-and-mobile-browser-chrome) | Responsive contraction and iOS translucency |
| [Tab Landing and Overflow Selection](#tab-landing-and-overflow-selection) | Sticky landing and selected-option visibility |
| [Overflow Fades and Page Scrolling](#overflow-fades-and-page-scrolling) | Masks, endpoint state and vertical scroll chaining |
| [URL Tables, Subsections and Code Presentation](#url-tables-subsections-and-code-presentation) | Mobile table measures and collapsed heading spacing |
| [Playground Fidelity and Expanded Views](#playground-fidelity-and-expanded-views) | Source parity, sandboxing and expanded controls |
| [Playground Scheduling and Inspection](#playground-scheduling-and-inspection) | Idle warming, cache lifecycles and inspector behaviour |
| [Login Feedback and Access Boundaries](#login-feedback-and-access-boundaries) | Failure states, spacing and shared-password limits |
| [Anonymous Backdrops and Single Blur](#anonymous-backdrops-and-single-blur) | Anonymous text geometry and theme-safe blur |
| [Static Capture and Publication Boundaries](#static-capture-and-publication-boundaries) | Capture normalisation and refresh authorisation |
| [Floating Brand Treatment](#floating-brand-treatment) | Brand pill geometry and preview-only tuning |
| [Easter Egg Discovery and Preview Controls](#easter-egg-discovery-and-preview-controls) | Discovery qualification, effects and shared settings |
| [Animation Performance and Evidence Limits](#animation-performance-and-evidence-limits) | Optimisation constraints and benchmark limitations |
| [Canonical URLs, Preferences and Favicons](#canonical-urls-preferences-and-favicons) | Redirects, query state and adaptive favicon |
| [Resources Composition and Prompt Presentation](#resources-composition-and-prompt-presentation) | Pre-split layout, hierarchy and stable feedback |
| [Installation Command Formatting](#installation-command-formatting) | Plain code fences and shell-neutral instructions |
| [QR Corner Geometry](#qr-corner-geometry) | Concentric nested corners and focus outlines |
| [Hidden Shortcut and Preview Delivery](#hidden-shortcut-and-preview-delivery) | Logo gesture and local review destinations |

## Optical Rails and Specimen Clearance

**Decision:** Text and square objects follow a text rail; designated rounded boundaries extend outward by 4px. Mobile text/surface gutters are 28px/24px. Apply an offset once per boundary, preserve native control interiors and centre centred content. Gallery documents own their inset in `lib/workshop-specimen-layout.mjs`; wrappers must not add another one. Gallery layout lives in one final sheet, separate from canonical component styles and held-focus simulation. Optical nudges move specimen roots without changing viewport padding; captured page positioning is removed first. Preserve paint clearance inside the grey frame for focus rings, outdents and login shadows; full-page previews retain native gutters. The requested focused-control examples move inward 6px without moving annotations, while the full QR card retains its own button inset and caption; theme and agent selector tracks use a 1px inward adjustment from the 24px surface rail after visual review. Their first option demonstrates focus independently of selection. Specimen scroll endpoints retain 24px of right clearance using a shared measured scroll-end extent; plain right padding was insufficient for overflowing nested blocks. Preserve captured theme-button widths so iframe mobile breakpoints do not move Moon left inside a desktop-sized track. The full Resources fallback boundary belongs to the specimen at 24px rather than the scroll viewport. The isolated QR caption aligns to the text rail; real QR cards remain centred. Standalone login-error groups compensate for measured X whitespace; table text aligns by removing first-cell padding.

**Rationale:** Documented: rounded corners visually recede while SVG bounds can include invisible whitespace. The 4px correction was chosen through visual comparison, not as a universal standard. Repeated inset layers narrow specimens unnecessarily; clearance must protect paint without adding another content indent.

**Owning Rules and Sources:** [Optical Alignment Contract](../docs/agent-guidance/interface.md#optical-alignment-contract). Primary README source: [Shared Optical Alignment](README.md#shared-optical-alignment).

## Spacing and Responsive Control Grids

**Decision:** Use 32px visible separation around Playground control groups and between slider rows/columns; adjacent groups share one gap. A 36px horizontal layout gap compensates for a selector’s 4px outdent. Retain 40px after the Resources agent selector and 16px between white Playground panels. Labels normally have 16px to controls; sliders use a 4px CSS gap with a 44px target to achieve about 16px to the visible thumb. Slider labels/values use 14px/21px semibold styling. Grids use up to three columns with the documented 280px minimum and collapse naturally; selectors wrap at natural widths.

**Rationale:** Documented in the refinement requests and contract: consistent visible gaps should remain after optical outdents, and sliders should align with selector labels. The user retained the more spacious Resources rhythm. Exact values are project conventions, not universal usability thresholds.

**Owning Rules and Sources:** [Deterministic Rules](../docs/agent-guidance/interface.md#deterministic-rules). Primary README source: [Overflow Cues and Selection Position](README.md#overflow-cues-and-selection-position).

## Typography, Title Case and Literal Values

**Decision:** Derive specimens from actual brand, heading, body, prompt, QR, footer and login styles. Do not invent absent heading/input components. Use CMOS 18 title case for the specified headings and control-label categories, retaining sentence case for body/status copy. Render element names, selectors, filenames, query values and hexadecimal colours in monospace. Keep colour chips consistently sized at 1cap and decorative.

**Capture Normalisation:** Apply the same explicit text-autosizing opt-out before reading source styles and when rendering galleries. A phone screenshot showed enlarged normal and selected body text despite passing desktop Chrome/WebKit comparisons. The previous guard covered only gallery display; automatic source-frame inflation is the suspected mechanism, and physical-phone confirmation remains necessary. The available desktop WebKit build does not support the text-sizing property, so its glyph-parity result cannot verify iOS autosizing. Do not replace the real font size with a smaller guessed value.

**Rationale:** Documented: source-derived specimens prevent a second typography system; literals must remain exact and distinguishable from prose. CMOS is the chosen editorial convention. A separate rationale for each type size is not recorded.

**Owning Rules and Sources:** [Title Case](../docs/agent-guidance/interface.md#title-case); [Source Fidelity](../docs/agent-guidance/interface.md#playground-source-fidelity). Primary README source: [Header, Connected Choices and Colour Values](README.md#header-connected-choices-and-colour-values).

## Lists and Disclosure Alignment

**Decision:** Use shared compact list styling with 20px hanging indentation and one extra indent per nesting level. Align disclosure body copy beneath its summary text after the chevron/gap, then apply list indentation from that rail. Keep paragraph width available within the owning panel. Explanatory disclosures use primary-text labels, accent chevrons and a tinted background, with body-sized labels in prose. The expanded colour-rule grey box has 24px horizontal content padding. These refinements supersede the earlier accent-coloured labels and flush-aligned colour-rule content.

**Rationale:** Documented in the refinement requests: bullets were visually too far from the left edge, and disclosure copy should line up with its heading. The precise indentation is an agreed visual convention.

**Owning Rules and Sources:** [Alignment Rules](../docs/agent-guidance/interface.md#deterministic-rules). Primary README source: [Shared Selection and Playground Typography](README.md#shared-selection-and-playground-typography).

## Agent Branding and Semantic Colours

**Decision:** Default to Codex, with user-approved #0285FF blue; Claude Code uses #D97757. Derive branded roles from shared accent tokens, while neutral chrome, white QR backgrounds and semantic status roles remain independent. Selected agent text/logos remain white. Error colours are shared by agent and vary by theme; warnings are reserved rather than fabricated as UI.

**Rationale:** Documented: the README records where the two accent values were verified, without claiming an official Codex brand standard. Berry/rose errors distinguish failures from Claude orange. Text and icons accompany semantic colour so colour is not the sole signal. Other palette mixes are recorded choices without a separate rationale.

**Owning Rules and Sources:** [Website Appearance](../docs/agent-guidance/interface.md#website-appearance); [Shared Tokens](lib/workshop-theme.mjs). Primary README source: [Agent Logos And Colours](README.md#agent-logos-and-colours).

## Theme and Preference Persistence

**Decision:** Apply saved preferences before paint. Theme follows the OS until explicitly chosen; explicit theme/agent choices persist and synchronise across same-origin tabs. Storage denial leaves current-page switching usable. Valid URL preferences take precedence and persist. Playground incoming changes use its scheduler, update existing preference query fields and do not write received changes back; obsolete events/reveals cannot restore stale state.

**Rationale:** Documented: pre-paint application avoids an incorrect initial palette; latest-state handling prevents queued events from reverting a newer choice. Active specimens update promptly while inactive specimens retain deferred work. Older README wording about a separate fixed Codex/light Playground start is superseded.

**Owning Rules and Sources:** [Website Appearance](../docs/agent-guidance/interface.md#website-appearance); [Preference Lifecycle](README.md#responsive-updates-and-deferred-specimens); [Public Parameters](URL-REFERENCE.md). Primary README source: [Responsive Updates and Deferred Specimens](README.md#responsive-updates-and-deferred-specimens).

## Shared Surfaces and Shadows

**Decision:** Use shared neutral surface tokens rather than near-duplicate fills. QR cards, prompts and feedback use the content surface; QR pixels/quiet zone stay white in both themes. Shared floating controls use centred black shadows, and the login panel retains its larger centred shadow. Do not replace dark-mode shadows with white glows.

**Rationale:** Documented: the neutral-token audit merged nearly identical light field/content fills and identical dark field/control borders while preserving genuinely different roles. Keeping QR white is an explicit exception. Exact blur strengths and surface values are recorded visual choices; a separate selection rationale is not recorded.

**Owning Rules and Sources:** [Appearance](../docs/agent-guidance/interface.md#website-appearance); [Persistent Page Controls](README.md#persistent-page-controls); [Theme Tokens](lib/workshop-theme.mjs). Primary README source: [Colour Themes](README.md#colour-themes).

## Icons and Source Catalogues

**Decision:** Use installed Lucide definitions for new interface icons, with explicit approval required for a suitable-library gap. The existing two Lobe agent logos and Wavelength asset remain approved. Preserve provider, official name and stable usage metadata, source links and licences. Catalogue real app icons separately from Playground tooling, deriving usage from actual rendered elements rather than hand-maintained examples.

**Rationale:** Documented: source capture avoids drift and includes hidden/mobile/state variants. Metadata distinguishes purpose from library identity, and source links retain provenance. The pre-split [logo change](CHANGELOG.md#v26039--2026-10-17) chose the familiar ChatGPT knot and Claude starburst while retaining the coding-tool labels. The choice of each decorative heading icon is not individually justified in the README.

**Owning Rules and Sources:** [Icon Rules](../docs/agent-guidance/interface.md#website-appearance); [Catalogue Sources](README.md#mobile-controls-and-source-coverage). Primary README source: [Playground Heading and Favicon](README.md#playground-heading-and-favicon).

## Navigation Links and Copy Feedback

**Decision:** Use the shared cropped Lucide Arrow Up Right, with an underlined text span and non-wrapping final-word/arrow tail. Preserve shared colour, hover and focus tokens, and the measured hit surface. Prompt and QR copy actions share success/failure feedback; keep code selectable and clipboard fallbacks available. Use the shared renderer rather than copies of its styles.

**Rationale:** Documented: the non-wrapping tail prevents an orphaned arrow; the cropped viewBox removes empty SVG space without changing visible stroke scale. Hover/feedback lifecycles avoid a second background fade and retain keyboard visibility. Specific feedback durations are documented in the README, without a separate rationale for each value.

**Owning Rules and Sources:** [Link Renderer](lib/workshop-links.mjs); [Copy and QR Feedback](README.md#theme-reveal-and-qr-sharing); [Focus Rules](../docs/agent-guidance/interface.md#focus-and-panel-opening). Primary README source: [Shared Navigation Links](README.md#shared-navigation-links).

## QR Touch Interaction

**Decision:** On a primary touch device without hover, first tap reveals Copy Link and a second deliberate tap copies; ignore repeat taps within 300ms of revealing. Reject drag/cancel gestures and suppress compatibility clicks. Mouse and keyboard activate immediately. Other controls retain single-tap activation.

**Rationale:** Documented: the QR hover overlay conceals an action, and Safari hover synthesis can omit or mislabel clicks. The two-step touch interaction exposes that action while avoiding accidental duplicate copying.

**Owning Rules and Sources:** [QR Interaction Specification](README.md#qr-touch-preview); [Sharing Behaviour](README.md#theme-reveal-and-qr-sharing). Primary README source: [QR Touch Preview](README.md#qr-touch-preview).

## Focus, Cursors and Cancellation

**Decision:** Paint held text selections per source line box, with source typography and selection colours and no extra vertical padding. Use text ranges only to locate line widths. Direct desktop Chrome screenshots measured 24px native body-selection paint versus an 18px glyph range; CSS Highlight ranges made the simulation too small. The original oversized example came from added paragraph padding, not the source line height. Compare native and simulated painted pixels for every selection example rather than accepting glyph-height assertions. Preserve real focus. Text fields show focused styling for every input method; other controls show rings for keyboard navigation. On panel opening focus its descriptive heading without a ring or software keyboard, then allow normal Tab navigation and restore invoking focus on close. Enabled controls show a hand throughout the target; disabled controls use not-allowed with enforced semantics. Disable selector-label selection/native drag and cancel dragstart; dragging outside a held selector must not drag its text or select a new value.

**Rationale:** Documented: hiding focus must not remove keyboard access; opening panels should not unexpectedly summon the mobile keyboard. The drag suppression fixes observed label dragging during cancelled holds. The old ADR recorded this cancellation defect; the current contract retains the rule.

**Owning Rules and Sources:** [Focus](../docs/agent-guidance/interface.md#focus-and-panel-opening); [Cursors](../docs/agent-guidance/interface.md#cursor-behaviour); [Selector Cancellation](../docs/agent-guidance/interface.md#sticky-positioning-and-selector-interaction). Primary README source: [Focus Policy](README.md#focus-policy).

## Selectors, Hover Layers and Press Motion

**Decision:** Use shared segmented controls and the existing 340ms selector movement. Resources two-option tracks retain their toggle behaviour; Playground radio groups select the directly activated value. Only agent/theme selectors and Playground segmented selectors may stretch on hold. Hover fills sit behind the moving selection indicator, with labels above; unselected fills/text darken in light mode and lighten in dark mode. Selected choices retain their established styling.

**Rationale:** Documented in refinement requests: generic hold scaling caused disclosure/chevron drift; hover overlays obscured the expanding indicator. Theme-aware contrast makes the hovered choice visible without altering active-selection styling. Visible radio groups support frequent state comparisons rather than hiding them in a select menu.

**Owning Rules and Sources:** [Interaction Layers](../docs/agent-guidance/interface.md#sticky-positioning-and-selector-interaction); [Selector Motion](../docs/agent-guidance/motion.md#slider-movement-and-colours); [Control Choice Rationale](README.md#playground-controls-and-inspection). Primary README source: [Header, Connected Choices and Colour Values](README.md#header-connected-choices-and-colour-values).

## Circular Theme Reveal and Reduced Motion

**Decision:** Preserve the circular light-mask reveal/reversal, originating at the destination sun/moon control. Use the Motion contract’s 300ms mobile/420ms larger-screen timing, 300px feather and radius easing. Keep the toggle in its own layer and derive its colours from the actual feather. Apply initial preferences without animation, cancel obsolete transitions and honour reduced motion and the soft fallback.

**Rationale:** Documented: direct radius interpolation avoids an uneven or lingering wave; viewport sampling is only for trimming endpoints. A separate toggle layer prevents the page snapshot from concealing movement. Sampling the feather keeps control colours consistent with the passing reveal.

**Owning Rules and Sources:** [Circular Reveal](../docs/agent-guidance/motion.md#circular-reveal); [Control Colours](../docs/agent-guidance/motion.md#slider-movement-and-colours). Primary README source: [Theme Reveal and QR Sharing](README.md#theme-reveal-and-qr-sharing).

## Card Entrances and Footer Wrapping

**Decision:** Reveal qualifying initial step/card pairs once after layout; later pairs use the step-text viewport threshold. Follow the Motion contract for current timing and offsets. Keep footer version/copyright groups intact, remove their divider when wrapped, and retain the action alongside when it fits; use the Interface contract’s centred narrow fallback.

**Rationale:** Documented: observing step text reveals stacked cards before their card edge arrives. Small visible slivers should not trigger the initial exception, and resizing must not replay entrances. Wrapping at semantic groups avoids broken version/copyright fragments. Older README entrance timing and left-aligned narrow footer wording conflict with the current contracts.

**Owning Rules and Sources:** [Card Reveal](../docs/agent-guidance/motion.md#card-reveal-behaviour); [Footer Rule](../docs/agent-guidance/interface.md#website-appearance). Primary README source: [Footer and Step Motion](README.md#footer-and-step-motion).

## Sticky Controls and Mobile Browser Chrome

**Decision:** Resources controls preserve their layout slots and responsive contraction/expansion buffers. Playground mobile tabs pin at the top, with Style Options and Back to Top stacked below. Make the actual mobile sticky ancestor opaque and viewport-wide, retain the inset inner rail and normal 16px gap, and keep desktop geometry unchanged. Fade approaching labels/background over the documented interval. Resources “I’m Using” reuses the same 64px approach fade, remaining transparent while its selector is pinned and restoring on reverse scroll without changing layout.

**Rationale:** Documented: the Resources label should disappear as the selector settles, using the established legend fade rather than a separate timed animation. Reserved slots prevent layout jumps; reversal buffers prevent contraction flicker. The former ADR records that a full-width sibling behind an inset sticky ancestor did not cover translucent iOS chrome. The ancestor-based fix was user-confirmed; WebKit edge sampling considers the hit-tested element and its ancestors. It is applied by mobile layout rather than browser-name detection.

**Owning Rules and Sources:** [Sticky Geometry](../docs/agent-guidance/interface.md#deterministic-rules); [Resources Contraction](README.md#persistent-page-controls). Primary README source: [Persistent Page Controls](README.md#persistent-page-controls).

## Tab Landing and Overflow Selection

**Decision:** Tab changes land at the start of the pinned region with header content scrolled away. Use whole CSS pixels for sticky heights/landing coordinates and exclude the region from scroll anchoring. Give tab panels a minimum viewport footprint while lazy frames populate; otherwise a temporarily short document clamps the landing before the tab can pin. Mobile middle options centre; tablet/desktop leave unobscured options still and reveal obscured options beyond the fade. First/last options align to actual boundaries without artificial end spacers. Apply the same policy to selector rails.

**Rationale:** Documented: fractional positioning caused first-scroll jump/flicker, confirmed resolved after the fix. Preserving the inset destination avoids both stale scroll positions and unnecessary jumps to the page top. Fade clearance keeps an automatically revealed choice readable. Native horizontal scroll limits keep edge items reachable.

**Owning Rules and Sources:** [Landing Coordinates](../docs/agent-guidance/interface.md#sticky-positioning-and-selector-interaction); [Reveal Rules](../docs/agent-guidance/interface.md#scrollable-control-style-and-validation). Primary README source: [Playground Layout and Navigation](README.md#playground-layout-and-navigation).

## Overflow Fades and Page Scrolling

**Decision:** Use horizontal-only selection rails with native overflow access and vertical page-scroll chaining. Tab/selector fades use 108px feathers and 36px shoulders; other shared regions use 54px/18px. Mobile widths up to 660px halve these values to 54px/18px and 27px/9px respectively. All specimen overflow viewports now share the directional fade implementation with Playground controls; fitting specimens and reached endpoints have no fade. Preserve distance-driven strength, endpoint clearing and the baseline outside the mask. Expanded controls and iframe specimens follow the same contract.

**Rationale:** Documented: earlier fades were too subtle for widely spaced labels. Fades indicate remaining content, so stale fades must clear when an edge is reached or content fits. Axis locking must not trap vertical gestures intended for the page. Older README 36px masks are superseded. The user requested halved mobile fades because wide desktop feathers obscure too much of a narrow rail.

**Owning Rules and Sources:** [Scrollable Control Contract](../docs/agent-guidance/interface.md#scrollable-control-style-and-validation). Primary README source: [Overflow Cues and Selection Position](README.md#overflow-cues-and-selection-position).

## URL Tables, Subsections and Code Presentation

**Decision:** Use scoped mobile text-autosizing control and consistent table typography. Tables size intrinsically within horizontal scrollers; compact columns stay unwrapped, prose gets readable measures, Effect gets 36–44ch and hostname Status and Owner remains unwrapped. Retain useful alias wrapping. Collapsed URL H3 hover areas have 20px visual clearance above/below; expanded content retains its own gap. Keep H3 dividers local to URL Reference. The tab renders URL-REFERENCE.md rather than a separate mapping.

**Rationale:** Documented in the former ADR and user feedback: uneven mobile font inflation, crushed columns and orphaned words made rows hard to read. Wider semantic columns are a deliberate trade-off against horizontal scrolling, not a fixed-height limit. State-specific spacing prevents a collapsed-only adjustment altering expanded content; local dividers avoid duplicate specimen separators. Precise code/copy styling is owned by the shared renderer, not duplicated here.

**Owning Rules and Sources:** [Tables and Subsections](../docs/agent-guidance/interface.md#url-reference-tables-and-subsections); [Markdown Renderer](scripts/playground-url-reference.mjs); [URL Reference](URL-REFERENCE.md). Primary README source: [Playground Section Links](README.md#playground-section-links).

## Playground Fidelity and Expanded Views

**Decision:** Use actual app markup, messages, tokens and renderers for specimens; distinguish tooling annotations and simulated effects. Sandbox authentication/navigation/clipboard behaviour. Expanded views retain the same iframe/state and applicable controls, use native modal containment and restore focus/scroll on close. Keep gallery paint inside its grey frame. Isolated prompt specimens retain the real 1440px capture-page prompt width and show success/failure on separate rows. Every narrow gallery retains measured boxed-component widths and permits horizontal inspection instead of scaling contexts. The compact Typography footer has no empty scroll range; the Icons bullet example retains its unwrapped line and necessary horizontal access so its defining bullet remains visible. Transparent text discards unused source-column width while retaining room for its source lines; empty trailing scroll space is not part of a specimen. Keep paint clearance for rings and shadows. Source widths come from the dedicated capture frames; hidden inline frames can report zero widths. Keep annotations responsive while specimen content overflows within the grey frame. Preserve inherited root and derived-text typography through the shared capture helper, including selection examples, and prevent mobile gallery text inflation; compare rendered glyph height as well as computed font values with the real app. Prompt Unicode examples retain full source containers and initially scroll to the named character. Inline previews grow to content height so vertical scrolling belongs to the Playground page; expanded modal views retain scrolling. This supersedes the earlier inline 70% viewport cap. Isolated typography annotations have a consistent 16px gap, independent of inherited toolbar heights or paragraph margins. Playground icons follow identity, page-ordered headings, UI controls and other uses; animated specimens retain motion unless reduced motion is requested.

**Rationale:** Documented: independent optical copies drift from production, while reloading an iframe loses the state being inspected. Full-context errors and login panels show meaningful surrounding layout. Shared source imports still require rendered parity checks; they do not prove every browser matches.

Adam requested these gallery refinements to compare real component dimensions, remove misleading inherited whitespace and avoid nested page scrolling. The exceptions are gallery presentation rules, not changes to production control geometry.

**Owning Rules and Sources:** [Source Fidelity](../docs/agent-guidance/interface.md#playground-source-fidelity); [Expanded Preview Specification](README.md#mobile-controls-and-source-coverage). Primary README source: [Local Component Playground](README.md#local-component-playground).

## Playground Scheduling and Inspection

**Decision:** Prepare the active tab promptly and defer inactive specimens until idle, pausing background work during interaction or hidden-page states. Warm likely tabs on deliberate hover/focus; discard obsolete captures and cache by relevant settings. Keep the inspector read-only with delayed hover updates, immediate click/focus updates and Freeze/Resume. Expose visible radios for frequent comparisons rather than applying a universal option-count cutoff.

**Rationale:** Documented: scheduling reduces main-thread contention without changing approved selector motion or specimen fidelity. Cached results avoid repeated palette/capture work, and stale-frame concealment avoids showing the wrong settings. Inspector deduplication and hover delay reduce churn; frequent one-click comparisons justify visible choices.

**Owning Rules and Sources:** [Scheduling Specification](README.md#responsive-updates-and-deferred-specimens); [Inspection Specification](README.md#playground-controls-and-inspection); [Parity Contract](../docs/agent-guidance/interface.md#mandatory-change-and-validation-contract). Primary README source: [Responsive Updates and Deferred Specimens](README.md#responsive-updates-and-deferred-specimens).

## Login Feedback and Access Boundaries

**Decision:** Keep authentication server-validated and failures closed. Login stays at its requested canonical destination, with matching anonymous backdrop. Reserve one error line that may grow for accessible text sizes; show checking/success through a live region and only errors visually. Keep 12px label/input and input/error gaps and 16px before submit. Wrong-password styling persists until editing; service failures must not imply a bad password.

**Rationale:** Documented: reserving space avoids panel recentering during ordinary status changes, while allowing growth prevents clipping. Distinguishing service failures from password errors avoids blaming valid input. Shared-password access protects server-delivered content, not already public repository material or individual identity.

**Owning Rules and Sources:** [Login Contract](../docs/agent-guidance/authentication.md#website-login); [Access Boundary](README.md#access-boundary); [Login Messages](lib/workshop-login-messages.mjs). Primary README source: [Login Feedback](README.md#login-feedback).

## Anonymous Backdrops and Single Blur

**Decision:** Build anonymous geometry from measured words/icons and cap-height/baseline rules. Only eligible equal-width prompt/slug words use transparent dummy glyphs with slash/hyphen wrapping preserved. Keep Resources and Components geometry separate; all Playground login routes share Components. Empty glyph rectangles must preserve short source line boxes, including the QR caption’s `1cap` leading, rather than expanding them. Apply one 4px background blur and independent strength/scrim settings; local tuning never changes production defaults.

**Rationale:** Documented: measured geometry preserves layout without exposing protected text; generic lines and unbreakable rectangles cannot reproduce native wrapping. A second backdrop-filter pass made theme snapshots dependent on backdrop compositing; the single background blur resolved the observed iPhone flicker. Strength/blur are rendering settings and do not require new geometry.

**Owning Rules and Sources:** [Backdrop Contract](../docs/agent-guidance/backdrops.md#blur-placeholder-geometry); [Single-Blur Rationale](README.md#login-blur-during-theme-changes). Primary README source: [Block Geometry Rules](README.md#block-geometry-rules).

## Static Capture and Publication Boundaries

**Decision:** Normalise sticky/fixed elements to document-anchored geometry during capture, disabling transient interaction styling and clearing discarded sticky inset offsets. Save responsive natural iframe heights as measured static media rules, using the live preview measurement function; a desktop inline height cannot represent a narrow preview. Keep the captured inspector last in normal flow, frames anonymous and script-disabled. Reuse saved geometry internally; refresh existing geometry only for authorised publication when relevant layout changed against the actual published source, or an explicit exception.

**Rationale:** Documented: a decorative composition must scroll away instead of leaving live-looking silhouettes. Refreshing only affected geometry separates layout changes from colour/blur/timing edits. A local commit or saved Sites version is not proof of what is deployed. The publication geometry check found that empty glyph blocks enlarged the tight QR caption line, and saved desktop iframe heights displaced later Components sections on mobile. These are capture/rendering corrections; the approved interactive app layout remains the source of truth. The expired one-off capture approval was removed during the instructions cleanup and is not standing permission.

**Owning Rules and Sources:** [Static Capture](../docs/agent-guidance/backdrops.md#static-capture-behaviour-and-rationale); [Publication Rules](../docs/agent-guidance/backdrops.md#blur-placeholder-geometry). Primary README source: [Static Backdrop Capture](README.md#static-backdrop-capture).

## Floating Brand Treatment

**Decision:** Reuse the actual Wavelength brand and shared halo renderer. Auto selects mark-only on mobile and full branding above the documented breakpoint. Mask blur/tint outside the measured pill, leave the brand crisp, and gate visibility by sticky state and control clearance. Playground overrides and exported settings remain session-only.

**Rationale:** Documented: deriving padding from rendered bounds accommodates both brand variants, while the distance mask feathers outside the pill rather than reducing its interior opacity. Clearance gating avoids crowding controls. Exact approved blur, feather and tint defaults are recorded in the README/source; their separate aesthetic rationale is not recorded.

**Owning Rules and Sources:** [Brand Specification](README.md#floating-brand-blur); [Shared Renderer](lib/workshop-worm-halo.mjs). Primary README source: [Floating Brand Blur](README.md#floating-brand-blur).

## Easter Egg Discovery and Preview Controls

**Decision:** Keep discovery optional and separate from essential workshop content. Qualification requires the whole inscription visible for a continuous second in each settled theme; reload resets progress. Reuse the canonical renderer/settings schema for previews, isolate preview loops and control defaults, and retain native modal focus/containment plus reduced-motion completion. Export settings with units and retain copy fallbacks.

**Rationale:** Documented: measuring actual text and wave bounds avoids timing diluted by blank space; reading the shared theme busy state avoids guessed timing. Named preview states isolate parts of the real effect for tuning without accidentally opening/focusing a modal. Exact particle, halo and sweep defaults are recorded preset choices, not explained individually. External visual references informed an original implementation rather than copied dependencies.

**Owning Rules and Sources:** [Easter Egg Specification](README.md#easter-egg); [Canonical Settings and Renderer](lib/workshop-easter-egg.mjs); [Entry States](README.md#easter-egg-entry-state). Primary README source: [Easter Egg](README.md#easter-egg).

## Animation Performance and Evidence Limits

**Decision:** Suspend inactive effects, avoid writes for invisible/idle particles, cache geometry and separate layout reads from writes. Preserve approved appearance/defaults while optimising. Run timing benchmarks without concurrent browser-heavy work; report bounded measurements and fallback coverage rather than universal device/frame-rate claims.

**Rationale:** Documented: unnecessary idle writes and synchronous geometry work were measurable costs. The README records reduced work from caching and direct curve calculation, but residual frame drops remained; paint-containment variants did not consistently help and were not adopted. Emulation still uses the host GPU.

**Owning Rules and Sources:** [Performance Evidence](README.md#animation-performance-and-settings-audit); [Validation Boundaries](../docs/agent-guidance/interface.md#mandatory-change-and-validation-contract). Primary README source: [Animation Performance and Settings Audit](README.md#animation-performance-and-settings-audit).

## Canonical URLs, Preferences and Favicons

**Decision:** Use canonical Resources/Playground paths and shared alias parsing with application 301 redirects, descendant preservation and known-query normalisation. Preserve unrelated query data and never treat an alias as a new page. Explicit show-login=true revokes only the current session; false never authenticates. The Playground Toy Brick favicon follows agent and theme, including login. Keep the public mapping in one Markdown source rendered by Playground.

**Rationale:** Documented: lowercase keys avoid maintaining case permutations, aliases retain existing links, and descendant redirects permit later page additions without inventing content. Explicit booleans clarify the old login=1 ambiguity without granting access. A WWW redirect still requires hosting/DNS/TLS support; application code cannot provision it. The prior fixed-blue favicon description is superseded.

**Owning Rules and Sources:** [Routing Contract](../docs/agent-guidance/authentication.md#routing-and-public-parameters); [Public URL Authority](URL-REFERENCE.md); [Favicon Specification](README.md#url-preferences-and-playground-favicon). Primary README source: [URL Preferences and Playground Favicon](README.md#url-preferences-and-playground-favicon).

## Resources Composition and Prompt Presentation

**Decision:** The pre-split design evolved from a horizontally scrolling card row to alternating step-and-card rows with mobile stacking. Step headings and resource headings use distinct levels; duplicate in-card step badges were removed. Copy feedback moved into an overlay so success/failure did not change prompt/card dimensions. QR visibility and page width breakpoints were adjusted over several builds; use the current shared renderer for exact geometry rather than a historical breakpoint.

**Rationale:** Documented in the migrated history: clearer page-versus-step heading hierarchy, logical mobile reading order and stable dimensions during copy feedback. The 40px introduction-to-QR gap reused an existing larger spacing value. The aesthetic reason for alternating left/right rows is not separately recorded. Earlier width, heading-size and breakpoint experiments remain historical, not additional current constraints.

**Owning Rules and Sources:** [Source Fidelity](../docs/agent-guidance/interface.md#playground-source-fidelity), [shared Resources renderer](lib/workshop-resource-page.mjs) and [README typography coverage](README.md#local-component-playground). Historical evidence: [alternating rows](CHANGELOG.md#v26023--2026-10-16), [stable copy overlay and responsive QR](CHANGELOG.md#v26027--2026-10-16), [introductory spacing](CHANGELOG.md#v26029--2026-10-16) and [heading hierarchy](CHANGELOG.md#v26030--2026-10-17).

## Installation Command Formatting

**Decision:** Keep installer commands within plain triple-backtick fences in displayed and copied prompts. The historical Bash language label was first changed to shell and then removed. Prompt examples retain monospace presentation and native text selection/scrolling.

**Rationale:** Documented: the shell wording avoided implying that workshop participants require Bash. The subsequent removal of the language label is recorded, but its separate rationale is not. Do not infer a specific shell requirement from a presentation label.

**Owning Rules and Sources:** [Resources prompt source](lib/workshop-resource-page.mjs) and [source-fidelity contract](../docs/agent-guidance/interface.md#playground-source-fidelity). Historical evidence: [shell-neutral wording](CHANGELOG.md#v26032--2026-10-17) and [plain fences](CHANGELOG.md#v26033--2026-10-17). This detail came from the former root changelog rather than a dedicated current README section.

## QR Corner Geometry

**Decision:** Size the shared card to its content, with 12px at the QR top/sides, 12px between QR and caption line box, and 12px below the caption. Use `line-height:1cap` to fit the uppercase caption to its capital-letter height without reducing its 14px font size. The earlier 9px gaps still left roughly 15px of visible clearance because the 21px line box contained about 10px of visible letters. Chrome/WebKit pixel checks now confirm 12px visible clearance in Resources, with at most 1px rasterisation rounding at fractional Playground iframe coordinates, while preserving the 150px QR size and 176px outer card width. Paint the QR image outline inward. This replaces the stretched grid width that added 8px of unused space on the right; the optical outdent must move the card without widening it. The later pre-split correction derives the inner QR link radius from the outer card radius minus padding and border, with the image inheriting the result. It superseded an earlier attempt to give all nested edges the same radius. The recorded example was 16px − 14px − 1px = 1px; it is historical geometry, not a universal radius to copy into another component.

**Rationale:** Documented: nested corners should be concentric and the keyboard focus outline should follow the same geometry. Subtracting inset distances preserves that relationship instead of matching unrelated bounding radii.

**Owning Rules and Sources:** [Shared optical boundaries](../docs/agent-guidance/interface.md#optical-alignment-contract), [Resources renderer](lib/workshop-resource-page.mjs), [QR sharing specification](README.md#theme-reveal-and-qr-sharing) and the [concentric-corner correction](CHANGELOG.md#v26052--2026-10-17).

## Hidden Shortcut and Preview Delivery

**Decision:** Three primary clicks/taps within three seconds on the header logo open the other canonical page in a new tab, in both login states, without adding a discoverable interactive control. Keep locked backdrop recognition outside the form and never bypass authentication. Routine local handoffs provide only verified Main App/Playground links; a login link is opt-in, and section links require a specifically discussed/worked-on primary destination.

**Rationale:** Documented: this is an intentionally undisclosed navigation shortcut, an explicit exception to ordinary pointer affordances. The preview policy supports phone review and removes unnecessary login-form links. Adam explicitly authorised LAN preview generation, including server restarts, LAN binding and automatic local sign-in, on a standing basis to avoid repeated approval interruptions when creating preview links. GitHub pushes and Sites publication still require explicit approval for those actions; the repository instructions own this permission boundary. Its exact interaction and delivery wording remain in their contracts; this log grants no publishing or browser-opening permission.

**Owning Rules and Sources:** [Hidden Shortcut](../docs/agent-guidance/authentication.md#hidden-playground-shortcut); [Delivery Contract](../docs/agent-guidance/delivery.md). Primary README source: [Phone Preview Sign-In](README.md#phone-preview-sign-in).

## Superseded and Conflicting README Wording

The following table preserves superseded README descriptions as history. The README now replaces those conflicting prescriptions with links to the authoritative contracts; these older values must not be restored as current requirements. This documentation cleanup changes no executable behaviour.

| Older Description | Current Authority or Treatment |
|---|---|
| 24px between neighbouring Playground groups/previews and older 20px copy-control spacing | Use the [Interface spacing contract](../docs/agent-guidance/interface.md#deterministic-rules) for affected control-group spacing; preserve explicitly scoped exceptions. |
| 36px rail fades and centring every selected option | Use the [shared overflow contract](../docs/agent-guidance/interface.md#scrollable-control-style-and-validation): wider tab/selector fades and viewport-dependent reveal behaviour. |
| Initial cards stagger by 120ms and rise vertically; narrow footer action is left-aligned | Follow [Motion's current card entrances](../docs/agent-guidance/motion.md#card-reveal-behaviour) and [Interface's footer fallback](../docs/agent-guidance/interface.md#website-appearance). |
| Generic held-button press scaling | [Motion](../docs/agent-guidance/motion.md#slider-movement-and-colours) limits stretch to agent/theme and Playground segmented selectors; ordinary buttons/disclosures do not scale. |
| Playground starts in isolated Codex/light without reading the shared preference | The later [responsive lifecycle specification](README.md#responsive-updates-and-deferred-specimens) records shared same-origin preferences and latest-state synchronisation. |
| The Playground favicon is always a white Toy Brick on Codex blue | The later [URL preferences and favicon specification](README.md#url-preferences-and-playground-favicon) defines agent/theme-dependent variants. |
| Separate wrapper/row safety padding around already-inset gallery content | Follow the [single-owner gallery rail contract](../docs/agent-guidance/interface.md#deterministic-rules); protect paint within the existing grey gutter without multiplying content insets. |
| Different historical Playground icon category orders, panel counts or expanded action placements | Historical snapshots of counts, ordering and action placement have been replaced in the README by contract/source links, not promoted into a new catalogue authority. Use the [source-fidelity contract](../docs/agent-guidance/interface.md#playground-source-fidelity) and actual shared renderer for a future change; this consolidation does not certify every historical count/order. |

## Consolidation Notes

The prior mobile-layout ADR's observations about native iOS chrome, first-scroll flicker, table wrapping, selector-label dragging and state-specific H3 spacing are retained above. User confirmation of the iOS and flicker fixes is historical evidence, not a claim of new testing. Tables may intentionally scroll horizontally and grow vertically for enlarged text or future copy; the documented line-count expectations are not clipping limits. The mobile full-width background does not widen its tab content.

Repository-wide permissions and task routing stay in [AGENTS.md](../AGENTS.md). Detailed active requirements stay in the scoped contracts. The earlier one-off capture permission remains expired. This log does not authorise publication, geometry capture, builds or preview restarts.

## Resources Step Anchor Copying and Arrival

**Decision:** Make the Step N text and exterior Hash region copy its descriptive anchor URL, leaving page position unchanged. Keep every indicator after the text on the right without moving the text rail, with connected text/icon hover surfaces and accent hover text. Use regular Hash, Check and X at `0.625em` with one shared centre and an 8px gap. This is 20px beside the desktop 32px heading, approximately 89% of its measured capital H, and scales with text. The connected hover surface provides visual grouping, so feedback circles are no longer needed. Share hyperlink paint and add accent hover text to both treatments; underline anchor text only on hover. Handle same-URL replacement navigation as well as push navigation, and delay alias rewrites until an intercepted transition finishes. Use 600ms success entry and all exits, 300ms opacity-only failure entry, ease-out entrances and ease-in exits. Fully visible holds begin after entry: 3/6 seconds for anchor and QR success/failure, 6/12 seconds for prompt feedback. Keep existing short fragments as client-side aliases. On anchor opening or same-URL re-entry, cap scroll speed at 1200 CSS px/s with eased 300ms velocity ramps, let the selector become sticky naturally, and land 60px below pinned selectors (30px on mobile). Synchronise previous-pair fade-out, selector shadows and the Wavelength reveal over the final 600ms of the journey. Route the first three Tab stops through agent, theme and target-card content. Restore them with an eased fade on upward scrolling only.

**Rationale:** Adam explicitly selected a consistent heading-copy convention and an exterior icon, with tooltip-only visible feedback. He requested a visible scroll journey, a clear selected step and a fully visible brand even at Step 1. The initial post-arrival fade was too conspicuous and fixed-duration scrolling made longer journeys frantic. Fading only during the final approach preserves visible context while completing the effects together. Retaining layout space prevents jumps when earlier content returns; only unavoidable landing space remains below the footer. The shorter icon cooldown reflects less feedback to read, and connected hover surfaces now group the regular feedback marks. The gutter indicator is a deliberate exception to the existing paint boundary. Playground heading anchors and changes to its collapse controls remain deferred.

**Owning Rules and Sources:** [Resources Controls](../docs/agent-guidance/interface.md#resources-step-anchor-controls), [Anchor Arrival](../docs/agent-guidance/motion.md#resources-anchor-arrival), [Fragment Routing](../docs/agent-guidance/authentication.md#resources-step-fragments), [URL Reference](URL-REFERENCE.md#resources-aliases), and `lib/workshop-resource-anchors.mjs`.

## Anonymous Capture Interaction Boundaries

**Decision:** Keep anonymous content inert at every nesting level. Permit outer inspection scrolling only, with a default arrow cursor and no block-click selection. Lock the background when Password Panel is shown, and cover the entire captured login document with dimming. Apply the static policy to saved captures at delivery as well as future capture generation; retain the parent logo shortcut.

**Rationale:** Recursively enabling iframe pointer access and scrolling exposed hand cursors and allowed a captured login background to scroll past its viewport-sized dimming. Outer scrolling is sufficient to inspect the composition. Locking existing overflow containers preserves responsive layout and text wrapping without making captured controls interactive.

**Owning Rules and Sources:** [Backdrop Interaction and Scrolling Policy](../docs/agent-guidance/backdrops.md#interaction-and-scrolling-policy).

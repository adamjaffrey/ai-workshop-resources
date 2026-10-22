---
name: website-design-decisions
description: Index website design decisions, their known rationale and owning rules.
metadata:
  doc_schema: "doc/v3"
  doc_revision: "26.0.100"
  update_summary: "Require unique heading icons and matching first-heading tab icons"
  updated_at: "Thu 22 Oct 2026 at 10:18:24 pm AEDT (+11:00)"
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
| [Native Anchor Scrolling and Arrival Fades](#native-anchor-scrolling-and-arrival-fades) | Browser-native motion and final-30% arrival effects |
| [Optical Rails and Specimen Clearance](#optical-rails-and-specimen-clearance) | Rails, outdents and clipping |
| [Spacing and Responsive Control Grids](#spacing-and-responsive-control-grids) | Vertical rhythm, slider targets and grid gaps |
| [Typography, Title Case and Literal Values](#typography-title-case-and-literal-values) | Editorial casing, type specimens and monospace |
| [Lists and Disclosure Alignment](#lists-and-disclosure-alignment) | Bullets and chevron body alignment |
| [Agent Branding and Semantic Colours](#agent-branding-and-semantic-colours) | Accent palette, status colours and provenance |
| [Theme and Preference Persistence](#theme-and-preference-persistence) | OS defaults, persistence, URLs and cross-tab state |
| [Shared Surfaces and Shadows](#shared-surfaces-and-shadows) | Neutral surfaces, QR exception and shadow tokens |
| [Icons and Source Catalogues](#icons-and-source-catalogues) | Library policy, metadata and catalogue provenance |
| [Playground Heading Anchors](#playground-heading-anchors) | Heading copy, isolated chevrons and sticky landings |
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

**Responsive Consolidation:** Adam approved inclusive 380px, 660px and 940px authored layout tiers to replace the scattered 360/480/600/700/1023px thresholds. Keep the established 660px structural layout and final phone spacing, including 24px vertical/28px horizontal login panel padding. Resources contraction ends at 940px without changing its scroll thresholds or buffers. Resources retains its 960px visible cap; Playground grows to 1200px with a 1248px wrapper and 1192px alignment rail. This gives wider review space while preserving 24px gutters, 4px outdents and the existing screen-width presets. The [responsive tier contract](../docs/agent-guidance/interface.md#responsive-layout-tiers) owns these requirements. Saved anonymous geometry is deliberately unchanged in this layout update; the separately authorised capture review follows it.

**Decision:** Use 32px visible separation around Playground control groups and between slider rows/columns; adjacent groups share one gap. A 36px horizontal layout gap compensates for a selector’s 4px outdent. Retain 40px after the Resources agent selector and 16px between white Playground panels. Labels normally have 16px to controls; sliders use a 4px CSS gap with a 44px target to achieve about 16px to the visible thumb. Slider labels/values use 14px/21px semibold styling. Grids use up to three columns with the documented 280px minimum and collapse naturally; selectors wrap at natural widths.

**Rationale:** Documented in the refinement requests and contract: consistent visible gaps should remain after optical outdents, and sliders should align with selector labels. The user retained the more spacious Resources rhythm. Exact values are project conventions, not universal usability thresholds.

**Owning Rules and Sources:** [Deterministic Rules](../docs/agent-guidance/interface.md#deterministic-rules). Primary README source: [Overflow Cues and Selection Position](README.md#overflow-cues-and-selection-position).

## Typography, Title Case and Literal Values

**Decision:** Derive specimens from actual brand, heading, body, prompt, QR, footer and login styles. Do not invent absent heading/input components. Use CMOS 18 title case for the specified headings and control-label categories, retaining sentence case for body/status copy. Render element names, selectors, filenames, query values and hexadecimal colours in monospace. Keep colour chips consistently sized at 1cap and decorative.

**Capture Normalisation:** Apply the same explicit text-autosizing opt-out before reading source styles and when rendering galleries. A phone screenshot showed enlarged normal and selected body text despite passing desktop Chrome/WebKit comparisons. The previous guard covered only gallery display; automatic source-frame inflation is the suspected mechanism, and physical-phone confirmation remains necessary. The available desktop WebKit build does not support the text-sizing property, so its glyph-parity result cannot verify iOS autosizing. Do not replace the real font size with a smaller guessed value.

**Rationale:** Documented: source-derived specimens prevent a second typography system; literals must remain exact and distinguishable from prose. CMOS is the chosen editorial convention. A separate rationale for each type size is not recorded.

**Owning Rules and Sources:** [Title Case](../docs/agent-guidance/interface.md#title-case); [Source Fidelity](../docs/agent-guidance/interface.md#playground-source-fidelity). Primary README source: [Header, Connected Choices and Colour Values](README.md#header-connected-choices-and-colour-values).

## Lists and Disclosure Alignment

**Decision:** Use shared compact list styling with 20px hanging indentation and one extra indent per nesting level. Centre the visible ink of every left disclosure chevron at a 12px inset from its local content rail, with label text at 20px to match prose lists. Use the same columns for summaries and button disclosures, including expanded settings, icon usage lists, hover help and the Style Inspector. Keep rotation centred on the visible ink, wrapped labels aligned and disclosure body copy beneath its label; nested lists retain their own indentation. Compact button disclosures size their backgrounds to the complete label with 10px right padding and wrap within the available width. Right-hand section chevrons retain their existing placement. Keep paragraph width available within the owning panel. Explanatory disclosures use primary-text labels, accent chevrons and a tinted background, with body-sized labels in prose. The expanded colour-rule grey box has 24px horizontal content padding. These refinements supersede the earlier accent-coloured labels and flush-aligned colour-rule content.

**Rationale:** Documented in the refinement requests: bullets were visually too far from the left edge, and disclosure copy should line up with its heading. The precise indentation is an agreed visual convention. Adam subsequently requested a fixed 10px visible-chevron centre and 20px label inset across all left-chevron expandable sections so stacked labels align with bullet text and the chevron sits closer to its label. He then requested moving every chevron another 2px right, establishing the current 12px centre, and ensuring compact backgrounds cover their full label length.

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

**Decision:** Use native inline backgrounds with `box-decoration-break:clone`, using zero layout padding and zero-blur shadows to paint 0/.125/.05/.075em top/right/bottom/left extensions around the .2em-radius background across text sizes. Every wrapped line receives its own complete decoration without reserving highlight space in text layout. Hyperlinks show the approved Modified Arrow Up Right and a resting underline; hover hides the underline. Anchor-copy text has no underline and reveals modified Hash on hover. Globally, right-aligned anchor text places Hash on the left; all other alignments place it on the right. Follow actual responsive alignment rather than a specific page, heading or breakpoint. Check and X share that side and slot; navigation arrows remain trailing. Keep the final word and reserved icon slot together using a non-wrapping tail and .2em gap for navigation links and step anchors on either side. Shared icon scaling follows the approved comparison lab; feedback Check/X occupy the same slot. Solid hover fills switch immediately to prevent overlapping alpha accumulation; text and icon effects also switch immediately. Underline thickness and ink skipping are automatic at .1em offset. Use shared theme-adjusted ink for rest and hover rather than raw brand accent, using the same 75% accent/25% black light ink and 55% accent/45% white dark ink for both agents. Selection and hover share the 10% light / 40% dark accent-to-surface fill; selection retains dark light-mode foreground and white dark-mode foreground. Broader card/connector palette consolidation remains outside this change. This supersedes the cropped-arrow, .18em offset, anchor-hover underline and 160ms hover treatments.

**Approved Icon Modifications:** Adam supplied and compared modified Hash and Arrow Up Right variants in the icon palette, then selected `hash-modified` and `arrow-up-right-modified` for their visual balance with the text at body and heading sizes. Exact production-path reference exports are [Modified Hash](../docs/assets/link-icons/hash-modified.svg) and [Modified Arrow Up Right](../docs/assets/link-icons/arrow-up-right-modified.svg). The originals remain [Lucide Hash](https://lucide.dev/icons/hash) and [Lucide Arrow Up Right](https://lucide.dev/icons/arrow-up-right).

**Internal Skip Link Exception:** Adam supplied [Modified Arrow Right](../docs/assets/link-icons/arrow-right-modified.svg), derived from Lucide Arrow Right, for only the Resources and Playground Skip to Main Content links. Its 18-unit horizontal shaft and approximately 10-unit diagonal edges distinguish this internal navigation from the up-right external-link affordance. Keep every other link unchanged. Both skip links reuse the shared renderer, non-wrapping final-word/icon tail, .2em gap, cap-height sizing, hover paint, hit targets and keyboard focus contours; explicit `.workshop-link--internal` and `.workshop-link--external` modifier classes select icon geometry while inheriting one shared CSS treatment. Only the skip links opt into the internal modifier; unmarked links retain the external modifier for backwards compatibility. No extra literal space is needed. This supersedes the earlier uniform-arrow rule only for these two links.

**Collapsible Link Reference:** Adam requested dedicated H3 sections for External Links, Internal Links and Link Colours, plus a separate Lists and Inline Code section. Reuse shared collapse, heading alignment and anchor behaviour; retain the hyperlink alias. Arrow headings reuse canonical link geometry and also appear in Playground Icons as heading usages, while Link Icons retains its three navigation/copy variants.

**Shared Link Gallery:** Adam requested separate Internal Links and External Links examples in Hyperlink Styles and a Link Icons section before Playground Icons. The latter owns the three modified link glyphs in right-arrow, up-right-arrow, Hash order. Derive their SVGs from the shared renderer, retain source and usage listings, and keep their source visibility independent from Playground tooling filters. Move standalone modified Hash out of App Icons and Symbols while preserving the full contextual heading and copy-feedback demonstrations.

**Geometry and Reason:** Compared with the installed Hash, the modified Hash moves the horizontal bars from y=9/15 to y=8/16 and moves the slanted stems outward by 0.5 viewBox units, giving the centre more space while preserving its overall height. The modified arrow expands the diagonal from the original 7–17 extent to 4–20 and uses 10.5-unit arrowhead arms, giving it a larger visible footprint in the common canvas. These are observable geometric changes supporting the optical balance chosen in the palette; the conversation does not establish a separate mathematical optimisation rationale for each coordinate. The common cap-height scale and weight-dependent stroke then keep the selected shapes consistent across text sizes. Plain Lucide Check and X were retained for feedback after the circled alternatives made the inner marks feel too small. Do not reintroduce the earlier cropped arrow, first modified arrow or Unicode arrow for these roles.

**Hit Targets and Focus:** The shared link-surface helper gives every wrapped fragment a transparent native child target matching its painted extension. This preserves the approved zero-padding layout while making the whole decoration clickable, including native link context menus and modified clicks. The global keyboard outline sits beyond the largest extension with at least 3px clearance, rounded up to a whole pixel; the native continuous outline avoids overlapping per-line rings. CSS still paints highlights without JavaScript measurement. Status States captures the real right-aligned Step 2 with Hash/Check/X, making the existing alignment-driven rule explicit. Icon Locations disclosures own one constant source-link gap in both states, without a second expanded-list margin.

**Rationale for the Revised Highlight:** Adam selected native CSS and then rejected layout padding because it indented wrapped links. Native cloned backgrounds with zero-blur shadows retain the painted extensions without runtime background measurement or changing paragraph spacing. Opaque fills prevent multiline overlap from becoming darker. Sharing the highlight fill between hover and text selection removes inconsistent reuse between light and dark themes. Instant hover effects keep text, underline and icon feedback simultaneous. Remove standalone link margin compensation now that the highlight no longer occupies layout space. The modified icon geometry and common reserved slot follow his lab selection. Leading icons on right-aligned anchor text preserve the text’s right edge instead of leaving an invisible icon-width indent. The same .2em gap applies on either side and to hyperlinks. The raw accent hover text had insufficient contrast for body links; reusing the existing ink role reduces colour variants while preserving agent identity.

**Rationale:** Documented: the non-wrapping tail prevents an orphaned arrow; the earlier cropped viewBox approach has been superseded by the approved modified paths and common cap-height slot. Hover/feedback lifecycles avoid a second background fade and retain keyboard visibility. Adam explicitly confirmed the success/failure distinction: failure indicates a problem, so it appears sooner with a shorter, opacity-only entrance and no decorative upward entrance movement. It stays visible twice as long as success so the user can read and respond. Success uses a gentler upward entrance to acknowledge completion. Fully visible holds begin after entry finishes, preserving the intended reading time. The prompt explainer needs longer holds than the shorter QR and anchor feedback. Future transient feedback should reuse these shared rules rather than introduce an independent timing pattern.

**Owning Rules and Sources:** [Global Text Links, Anchor Links and Hover States](../docs/agent-guidance/interface.md#text-links-anchor-links-and-hover-states); [Shared Success and Failure Feedback](../docs/agent-guidance/interface.md#shared-success-and-failure-feedback); [Link Renderer](lib/workshop-links.mjs); [Copy and QR Feedback](README.md#theme-reveal-and-qr-sharing); [Focus Rules](../docs/agent-guidance/interface.md#focus-and-panel-opening). Primary README source: [Shared Navigation Links](README.md#shared-navigation-links).

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

**Decision:** Use actual app markup, messages, tokens and renderers for specimens; distinguish tooling annotations and simulated effects. Sandbox authentication/navigation/clipboard behaviour. Expanded views retain the same iframe/state and applicable controls, use native modal containment and restore focus/scroll on close. Keep gallery paint inside its grey frame. Isolated prompt specimens retain the real 1440px capture-page prompt width and show success/failure on separate rows. Every narrow gallery retains measured boxed-component widths and permits horizontal inspection instead of scaling contexts. The compact Typography footer has no empty scroll range; the Icons bullet example retains its unwrapped line and necessary horizontal access so its defining bullet remains visible. Transparent text discards unused source-column width while retaining room for its source lines; empty trailing scroll space is not part of a specimen. Keep paint clearance for rings and shadows. Source widths come from the dedicated capture frames; hidden inline frames can report zero widths. Keep annotations responsive while specimen content overflows within the grey frame. Preserve inherited root and derived-text typography through the shared capture helper, including selection examples, and prevent mobile gallery text inflation; compare rendered glyph height as well as computed font values with the real app. Prompt Unicode examples retain full source containers and initially scroll to the named character. Use the [palette/page-embed distinction](#specimen-palettes-and-page-embeds) for preview sizing, scrolling and Expand View. Isolated typography annotations have a consistent 16px gap, independent of inherited toolbar heights or paragraph margins. Playground icons follow identity, page-ordered headings, UI controls and other uses; animated specimens retain motion unless reduced motion is requested.

**Rationale:** Documented: independent optical copies drift from production, while reloading an iframe loses the state being inspected. Full-context errors and login panels show meaningful surrounding layout. Shared source imports still require rendered parity checks; they do not prove every browser matches.

Adam requested these gallery refinements to compare real component dimensions, remove misleading inherited whitespace and avoid nested page scrolling. The exceptions are gallery presentation rules, not changes to production control geometry.

**Owning Rules and Sources:** [Source Fidelity](../docs/agent-guidance/interface.md#playground-source-fidelity); [Expanded Preview Specification](README.md#mobile-controls-and-source-coverage). Primary README source: [Local Component Playground](README.md#local-component-playground).

## Specimen Palettes and Page Embeds

**Decision:** A specimen palette groups multiple distinct examples for comparison. It grows to full content height, uses the outer Playground page for vertical scrolling, and has no Expand View button. A page embed presents a web page or part of one; its inline grey viewport is capped at 60% of the current browser visual viewport height and has native internal scrolling. Only page embeds offer Expand View, which uses the available modal window height. “Inline” and “expanded” describe presentation states, not different content categories. An iframe can implement either category.

**Rationale:** Palettes are meant to be read and compared as part of the surrounding Playground page; a nested vertical scroll region interrupts that continuous browsing. Page embeds can contain long page layouts, so a bounded viewport prevents one preview from dominating the Playground while allowing inspection of its full content through internal scrolling. Expand View supplies more room when needed. The 60% maximum is Adam's chosen sizing preference; it replaces 70% and is not a measured universal usability threshold. Responsive content and text wrapping remain intact in both categories.

**Persistent Expand Action:** The inline Expand View button belongs to the outer grey viewport, 12px inside its bottom-right border. An inner scrolling layer owns the wide iframe while the action remains its sibling. Adam reported actions moving with embedded content; separating these layers prevents either scrolling axis from carrying the control away. The existing expanded header action and iframe state remain unchanged.

**Superseded Rules:** This distinction replaces the original blanket 70% cap and the subsequent blanket content-height rule. The final clarification retains Expand View for page embeds only; the earlier request to remove it from page embeds was a typo. Do not infer scroll ownership or Expand View eligibility from the presence of an iframe.

**Easter Egg Top Boundary:** The isolated Step 3 preview uses the Resources anchor's visible-text clearance at its natural scroll-top boundary: 60px below the pinned selectors, or 30px at embedded widths up to 660px. Matching the existing anchor metric gives consistent context while using layout padding preserves native scrolling and avoids an unwanted anchor journey or scroll clamp. The card edge is not the reference, and the initial bottom-focused Easter Egg presentation remains unchanged.

**Owning Rules:** [Specimen Palettes and Page Embeds](../docs/agent-guidance/interface.md#specimen-palettes-and-page-embeds), incorporated by the repository's mandatory Interface contract.

## Playground Scheduling and Inspection

**Decision:** Prepare the active tab promptly and defer inactive specimens until idle, pausing background work during interaction or hidden-page states. Warm likely tabs on deliberate hover/focus; discard obsolete captures and cache by relevant settings. Keep the inspector read-only with delayed hover updates, immediate click/focus updates and Freeze/Resume. Expose visible radios for frequent comparisons rather than applying a universal option-count cutoff.

**Rationale:** Documented: scheduling reduces main-thread contention without changing approved selector motion or specimen fidelity. Cached results avoid repeated palette/capture work, and stale-frame concealment avoids showing the wrong settings. Inspector deduplication and hover delay reduce churn; frequent one-click comparisons justify visible choices.

**Owning Rules and Sources:** [Scheduling Specification](README.md#responsive-updates-and-deferred-specimens); [Inspection Specification](README.md#playground-controls-and-inspection); [Parity Contract](../docs/agent-guidance/interface.md#mandatory-change-and-validation-contract). Primary README source: [Responsive Updates and Deferred Specimens](README.md#responsive-updates-and-deferred-specimens).

## Login Feedback and Access Boundaries

**Decision:** Keep authentication server-validated and failures closed. Login stays at its requested canonical destination, with matching anonymous backdrop. Reserve one error line that may grow for accessible text sizes; show checking/success through a live region and only errors visually. Keep 12px label/input and input/error gaps and 16px before submit. Wrong-password styling persists until editing; service failures must not imply a bad password.

**Rationale:** Documented: reserving space avoids panel recentering during ordinary status changes, while allowing growth prevents clipping. Distinguishing service failures from password errors avoids blaming valid input. Shared-password access protects server-delivered content, not already public repository material or individual identity.

**Owning Rules and Sources:** [Login Contract](../docs/agent-guidance/authentication.md#website-login); [Access Boundary](README.md#access-boundary); [Login Messages](lib/workshop-login-messages.mjs). Primary README source: [Login Feedback](README.md#login-feedback).

## Anonymous Backdrops and Single Blur

**Decision:** Build anonymous geometry from measured words/icons and cap-height/baseline rules. Only eligible equal-width prompt/slug words use transparent dummy glyphs with slash/hyphen wrapping preserved. Keep Resources and Colours geometry separate; all Playground login routes share Colours. Empty glyph rectangles must preserve short source line boxes, including the QR caption’s `1cap` leading, rather than expanding them. Apply one 4px background blur and independent strength/scrim settings; local tuning never changes production defaults.

**Rationale:** Documented: measured geometry preserves layout without exposing protected text; generic lines and unbreakable rectangles cannot reproduce native wrapping. A second backdrop-filter pass made theme snapshots dependent on backdrop compositing; the single background blur resolved the observed iPhone flicker. Strength/blur are rendering settings and do not require new geometry.

**Owning Rules and Sources:** [Backdrop Contract](../docs/agent-guidance/backdrops.md#blur-placeholder-geometry); [Single-Blur Rationale](README.md#login-blur-during-theme-changes). Primary README source: [Block Geometry Rules](README.md#block-geometry-rules).

## Static Capture and Publication Boundaries

**Decision:** Normalise sticky/fixed elements to document-anchored geometry during capture, disabling transient interaction styling and clearing discarded sticky inset offsets. Use Colours without nested specimen frames and normal responsive container growth. Capture five widths (380, 660, 940, 1008, 1248px) with one shared anonymous DOM and word-metric overrides; retire the every-pixel iframe-height sweep for active backdrops. Keep the captured inspector last in normal flow, frames anonymous and script-disabled. Reuse saved geometry internally; refresh existing geometry only for authorised publication when relevant layout changed against the actual published source, or an explicit exception.

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

**Decision:** Use canonical Resources/Playground paths and shared alias parsing with application 301 redirects, descendant preservation and known-query normalisation. Preserve unrelated query data and never treat an alias as a new page. Explicit login=false revokes only the current session; true never authenticates. The Playground Toy Brick favicon follows agent and theme, including login. Keep the public mapping in one Markdown source rendered by Playground. Accept shared true/yes/1 and false/no/0 login value groups, canonicalising to login and inverting show-login/logout/logged-out/loggedout; parameter-name aliases ai and mode reuse the complete agent/theme vocabulary. Canonical URL values are agent=claude and login=true/false; internal Claude Code identifiers and stored preferences stay unchanged. Adam requested single-word canonical components for simpler URLs. Use Lucide Anchor for the Anchor Links heading and retain Hash for its hover copy action. Its Resource Anchors and Playground Anchors subsections use collapsible H3s with unique List Ordered and Signpost icons and copyable fragments. Login mapping columns name their resulting canonical URL components directly, in the same true-then-false order as the effects table, because outcome-only column labels left their relationship unclear. Canonical names lead alias lists; remaining aliases are alphabetical except Adam’s explicit agent-value and login-name ordering. The query overview is a collapsible Summary H3 with Lucide Table Properties and its own copyable anchor. Login names use login, loggedin, logged-in, hide-login; logout names use logout, loggedout, logged-out, show-login. Document equivalent boolean spellings in one table and parameter families by desired outcome in another. Adam found the true-group/false-group headings confusing and requested that login=true express logged-in intent, with logout and hide-login as inverse aliases. Existing login=1 links now preserve a valid session rather than revoke it; authentication is still required.

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

**Decision:** Size the shared card to its content, with 12px at the QR top/sides, 12px between QR and caption line box, and 12px below the caption. Use `line-height:1cap` to fit the uppercase caption to its capital-letter height without reducing its 14px font size. The earlier 9px gaps still left roughly 15px of visible clearance because the 21px line box contained about 10px of visible letters. Chrome/WebKit pixel checks now confirm 12px visible clearance in Resources, with at most 1px rasterisation rounding at fractional Playground iframe coordinates, while preserving the 150px QR size and 176px outer card width. Paint the neutral QR keyline inward on a pointer-transparent layer above the image and overlays, so hover, press, focus, touch preview and success/failure feedback cannot conceal or recolour it. The former image outline sat underneath the opaque feedback surface. The Resources header uses a content-sized QR column and explicit end alignment, with the shared 4px optical extension only on its right edge. This removes the stale 180px track and leftward margin that left the card 12px inside its intended right surface rail. This replaces the stretched grid width that added 8px of unused space on the right; the optical outdent must move the card without widening it. The later pre-split correction derives the inner QR link radius from the outer card radius minus padding and border, with the image inheriting the result. It superseded an earlier attempt to give all nested edges the same radius. The recorded example was 16px − 14px − 1px = 1px; it is historical geometry, not a universal radius to copy into another component.

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

**Decision:** Make Step N and its reserved icon region copy the descriptive anchor URL in place. Use the native multiline highlight, modified Hash, common proportional icon slot and instant hover treatment described in [Navigation Links and Copy Feedback](#navigation-links-and-copy-feedback). Check and X use the same slot and .2em gap. Follow the global alignment rule: put this slot left of right-aligned anchor text and right of all other anchor text. Resources Step 2 is the current responsive example, not the scope of the rule. No underline appears on anchor-copy headings. Handle same-URL replacement navigation as well as push navigation, and delay alias rewrites until an intercepted transition finishes. Use 600ms success entry and all exits, 300ms opacity-only failure entry, ease-out entrances and ease-in exits. Fully visible holds begin after entry: 3/6 seconds for anchor and QR success/failure, 6/12 seconds for prompt feedback. Keep existing short fragments as client-side aliases. On anchor opening or same-URL re-entry, use browser-native smooth scrolling matching Jump to Top, let the selector become sticky naturally, and land 60px below pinned selectors (30px on mobile). Synchronise previous-pair fade-out, selector shadows and the Wavelength reveal over the final 30% of travel. Route the first three Tab stops through agent, theme and target-card content. Restore them with an eased fade on upward scrolling only.

**Rationale:** Adam explicitly selected a consistent heading-copy convention and an exterior icon, with tooltip-only visible feedback. He requested a visible scroll journey, a clear selected step and a fully visible brand even at Step 1. The initial post-arrival fade was too conspicuous and fixed-duration scrolling made longer journeys frantic. Fading only during the final approach preserves visible context while completing the effects together. Retaining layout space prevents jumps when earlier content returns; only unavoidable landing space remains below the footer. The shorter icon cooldown reflects less feedback to read, and connected hover surfaces now group the regular feedback marks. The current reserved inline slot and paint-only background supersede the earlier gutter indicator. Playground heading anchors were initially deferred and are now covered by the following decision.

**Owning Rules and Sources:** [Resources Controls](../docs/agent-guidance/interface.md#resources-step-anchor-controls), [Anchor Arrival](../docs/agent-guidance/motion.md#resources-anchor-arrival), [Fragment Routing](../docs/agent-guidance/authentication.md#resources-step-fragments), [URL Reference](URL-REFERENCE.md#resources-aliases), and `lib/workshop-resource-anchors.mjs`.

## Anonymous Capture Interaction Boundaries

**Decision:** Keep anonymous content inert at every nesting level. Permit outer inspection scrolling only, with a default arrow cursor and no block-click selection. Lock the background when Password Panel is shown, and cover the entire captured login document with dimming. Apply the static policy to saved captures at delivery as well as future capture generation; retain the parent logo shortcut.

**Rationale:** Recursively enabling iframe pointer access and scrolling exposed hand cursors and allowed a captured login background to scroll past its viewport-sized dimming. Outer scrolling is sufficient to inspect the composition. Locking existing overflow containers preserves responsive layout and text wrapping without making captured controls interactive.

**Owning Rules and Sources:** [Backdrop Interaction and Scrolling Policy](../docs/agent-guidance/backdrops.md#interaction-and-scrolling-policy).

## Alternative Backdrop Comparison Previews

**Decision:** Provide five explicitly requested tab captures through the existing Blocks and Blur preview controls, alongside Resources and Components. Keep the saved comparisons separate from the active Components geometry and make no production backdrop selection change.

**Rationale:** A shared viewport and identical rendering controls make the alternatives comparable without changing the live login experience or adding competing preview controls. Capturing populated specimen frames retains the visual character of each tab while removing protected text and interactivity.

**Owning Rules and Sources:** [Alternative Backdrop Comparisons](../docs/agent-guidance/backdrops.md#alternative-backdrop-comparisons).

## Lightweight Backdrop Capture

**Decision:** Adam selected Colours and authorised a five-width capture after layout consolidation. Freeze visible control state without restoring hidden loading/success icons, preserve responsive CSS and prompt glyph reflow, and accept small decorative geometry differences. Validate five routine widths; keep the +1px comparison and its 1440px reference as an explicit one-off diagnostic.

**Rationale:** These are blurred decorative backgrounds, not replicas requiring pixel-level parity. Removing nested specimen frames eliminates their fixed-height clipping risk. The five-width process is faster and smaller than exhaustive width sweeps; normal builds reuse saved assets.

**Owning Rules:** [Anonymous Backdrops](../docs/agent-guidance/backdrops.md#static-capture-behaviour-and-rationale).

Capture preserves each text node as a single anonymous layout item inside flex/grid containers. Splitting a disclosure label into independent grid cells created extra rows (86px instead of 40px); grouping its word blocks fixes the layout while retaining native text wrapping and existing measurements. Blocks and Blur now exposes only the two active captures; retired alternatives are no longer embedded.

SVG placeholder paint uses the cached stroke-inclusive icon-ink bounds while retaining its layout box. Full-box paint overlapped disclosure labels because their alignment is based on visible chevron strokes, not SVG edges; clipping the decorative paint fixes that mismatch without changing real controls or remeasuring geometry.

All Lucide icons and the two Lobe agent logos use cached visible bounds, including cropped-viewBox variants. Measure this small shared cache only when icon assets change; routine five-width captures reuse it without raster scans or extra viewport passes. Preserve SVG viewBox metadata when replacing paths with anonymous blocks. The block fills the visible artwork’s bounding rectangle, not its precise silhouette; transparent outer padding is excluded while internal holes remain filled.

## Playground Heading Anchors

**Decision:** Apply the Resources anchor-copy styling and feedback to every collapsible outer Playground H2/H3, retaining the decorative heading icons and limiting collapse/expand to a 44px square chevron target with a centred 24px SVG and a neutral 1px border. Use 24px top, bottom and right clearance around the normal heading button area, allowing wrapped headings to grow. Keep the decorative section icons neutral so the accent hash remains the copy affordance. Generate descriptive kebab-case fragments under each canonical tab path. Expand the target and its parent before travel. Reuse the Resources motion profile, with a Playground landing at the H2 card or H3 heading row 16px below the settled sticky tabs. Fade preceding cards/content during the final 30% of travel and restore on upward scroll. Embedded specimens are excluded.

**Rationale:** Adam requested the same heading-copy convention across Resources and Playground. Separating the chevron action removes ambiguity about whether a heading click copies or collapses. The 16px landing preserves the normal gap between sticky tabs and the incoming section. Sharing copy and motion helpers prevents timing and icon-state drift, while a Playground controller accounts for lazy specimen heights, nested H3s and its different sticky layout.

**Owning Rules and Sources:** [Heading Controls](../docs/agent-guidance/interface.md#playground-heading-anchor-controls), [Arrival Motion](../docs/agent-guidance/motion.md#playground-anchor-arrival), [Fragments](../docs/agent-guidance/authentication.md#playground-heading-fragments), [URL Inventory](URL-REFERENCE.md#playground-sections), `scripts/playground-anchors.mjs`, `lib/workshop-anchor-copy.mjs` and `lib/workshop-anchor-motion.mjs`.

## Split Heading Actions and Bounded Travel

**Decision:** The heading and area to its left copy its anchor; empty space to its right toggles collapse, alongside the existing bordered chevron. No full-width toggle overlay is used. Collapsed buttons use the neutral control fill; section height, tint and chevron rotation animate together over 160ms with `ease`. Reduced motion is immediate.

**Rationale:** The split provides a larger mobile toggle region without changing the copy convention. The original three-second cap, custom 300ms velocity ramps and fixed 600ms arrival fades have been superseded by shared native anchor motion below. Tab changes retain the current header scroll depth while the bar is not pinned, including cross-tab anchor changes, so changing content does not unnecessarily hide the header.

**Owning Rules:** [Heading Controls](../docs/agent-guidance/interface.md#playground-heading-anchor-controls) and [Anchor Arrival](../docs/agent-guidance/motion.md#playground-anchor-arrival).

## Heading Hit-Region Separation and Optical Chevron Balance

**Decision:** Keep 44px square chevron buttons consistent with existing icon controls. Add an 8px inactive interval after the heading copy region. The right region and chevron hover tint the whole header row using a non-interactive background layer. Translate the collapsed left-pointing chevron 1px toward its tip, animating translation and rotation together over 160ms.

**Rationale:** A neutral split reduces ambiguous activation, and the row tint communicates the scope of collapse. A small interpolated optical correction balances the directional shape without snapping or disturbing its rotation. The anchor inventory follows visible tab and heading order, includes enclosing sections and full canonical URLs, and is rendered directly in the Playground from the same Markdown source.

**Owning Rules:** [Heading Controls](../docs/agent-guidance/interface.md#playground-heading-anchor-controls) and [URL Reference](URL-REFERENCE.md).

## Consolidated Anchor Reference and Wider Inactive Split

**Decision:** Use a 16px inactive interval between header copy and collapse regions. Extend the row tint another 4px left without moving content. Consolidate Resources and Playground anchors in one Anchor Links section, retaining separate four-column tables and bold fragment slugs.

**Rationale:** The wider neutral region clarifies the action boundary. One shared Markdown inventory keeps the document and Playground aligned. The 44px standalone chevron remains consistent with icon buttons; selector groups are taller because their 40px controls sit inside padding and a border.

**Owning Rules:** [Interface](../docs/agent-guidance/interface.md#playground-heading-anchor-controls) and [Anchor Links](URL-REFERENCE.md#anchor-links).

## Fifty-Pixel Playground Actions

**Decision:** Standardise outer Playground icon action buttons at 50px square to match the selector groups’ outer height. Keep SVG sizes and the collapsed chevron optical correction. Move the chevron 4px right from its former rail, preserve 24px vertical padding, extend row tint rightward and use a 20px inactive split. Share anchor table widths with 46% reserved for canonical URLs and explicit bold fragment code.

**Rationale:** Adam requested consistent outer control dimensions and greater URL readability. This changes standalone Playground actions without changing selector segments or embedded source specimens.

**Owning Rules:** [Interface](../docs/agent-guidance/interface.md#playground-heading-anchor-controls).

## Action Radius and Visibility Corrections

**Decision:** Use 12px outer-action button radii, including section chevrons, matching the floating controls. Keep header hover paint at 50px high. Separate action sizing from display so the ellipsis remains mobile-only and conditional replay buttons remain hidden when unavailable.

**Rationale:** The shared size rule accidentally overrode desktop visibility. A sizing convention must not change when a control appears.

**Owning Rules:** [Interface](../docs/agent-guidance/interface.md#playground-heading-anchor-controls).

## Section Text and Chevron Vertical Alignment

**Decision:** Align the first line’s measured cap-height centre to the centre of its 50px chevron button. Adjust heading top padding using the shared font metrics; keep the button in place, the SVG centred in it and the collapsed optical correction unchanged.

**Rationale:** Increasing the button height left its centred icon below the existing text. Moving only the icon would compromise centring inside the button; aligning the title preserves both relationships and the requested button insets.

**Owning Rules:** [Interface](../docs/agent-guidance/interface.md#playground-heading-anchor-controls).

## Unclipped Heading Paint and Immediate Hover

**Decision:** Clip section-height transitions vertically only, preserving outdented H3 decoration. Reduce header top/bottom spacing from 24px to 20px. Switch hover paint instantly while keeping the collapsed-state tint on its own animated layer. Apply the full anchor hover decoration to keyboard focus.

**Rationale:** Clipping both axes cut off the subsection edges during animation. Separate hover and state paint allows immediate pointer feedback without losing collapse timing. Keyboard users receive the same action indication.

**Owning Rules:** [Interface](../docs/agent-guidance/interface.md#playground-heading-anchor-controls).

## Restore Descriptive Action Labels

**Decision:** Restore visible text on Expand View, Contract View, Copy Values, Reset Defaults and Replay Animation at a consistent 50px height with intrinsic width. Retain square icon-only treatment for ellipsis/close, Back to Top and section chevrons. Place Contract View on the right surface rail. Give collapsed H3 bottom clearance one spacing owner, avoiding stacked subsection margins and card padding.

**Rationale:** Forcing labelled actions into squares unintentionally removed their labels. The user wants their readable labels retained. The reported 44px H3 gap combined 20px padding and a 24px following margin.

**Owning Rules:** [Interface](../docs/agent-guidance/interface.md#playground-heading-anchor-controls).

## Action Icons and Manual Keyboard Navigation

**Decision:** The listed outer Playground action icons use one 22px size and Lucide stroke width 2, with an 8px label gap. Sun/moon remain 20px inside their selector. This supersedes the earlier instruction to preserve individual action SVG sizes; alignment and outer control geometry stay unchanged.

**Reason:** Adam requested matching visible action-icon weights and sizes, with the nested theme icons excluded.

**Decision:** Each selector or tab bar is one Tab stop. Arrow keys browse focus with the grey hover treatment, and Enter/Space commits. Sections are not Tab stops. QR keyboard focus reveals Copy Link immediately. Scrolling selector focus rings sit outside the option and its mask; link focus rings follow the union of the actual asymmetric hover shapes with a 3px gap.

**Reason:** Browsing should not unexpectedly change previews or navigate tabs. Earlier inset selector rings were clipped, and a symmetric native link-outline offset did not match asymmetric hover paint. Shared geometry and input handling replace per-control corrections.

**Owner:** [Interface contract](../docs/agent-guidance/interface.md#focus-and-panel-opening), `workshop-group-focus.mjs`, `workshop-link-surfaces.mjs` and `playground-layout.mjs`.

## Wrapped Section Heading Rhythm

**Decision:** Actual outer section H2/H3 headings use 1.25 leading on mobile or when wrapped at any width. First-line cap alignment and exterior leading are compensated so existing card and subsection spacing is retained. Non-section headings and fullscreen specimen titles keep their existing treatment. The neutral collapse tint covers the entire row, replacing the earlier fixed 50px height. Expanded chevrons move 1px down; collapsed chevrons retain their 1px left shift, with both offsets interpolating with rotation over 160ms.

**Reason:** Adam requested tighter multiline section headings, complete grey decoration on wrapped headings and an optical chevron adjustment without reopening established spacing decisions.

**Owner:** [Playground Heading Anchor Controls](../docs/agent-guidance/interface.md#playground-heading-anchor-controls), `playground-heading-alignment.mjs` and `playground-section-collapse.mjs`.

## Visible Keyboard Focus in Nested Playground Views

**Decision:** Use a shared keyboard adapter for the Playground and sandbox documents. Give scrollable regions their own visible pan stop; keep control navigation separate. Restore group handlers to captured controls and preserve their source disabled states. Pass keyboard modality across iframe boundaries and reveal only the active target. Draw clipped control rings in an exterior overlay, with thumb-height slider rings and full-disclosure summary rings.

**Reason:** Captured HTML retained Tab attributes without event handlers, and iframe entry could retain pointer modality or a stale focused control. Nested masks and scrollports clipped otherwise valid rings. The user requested predictable entry, visible focus and independent arrow-key panning. Preview-state changes must not trigger the real dialog-close focus restoration.

**Decision:** Tabs use the same selected and hover palette as selectors, with a straight-bottom focus contour. Collapsed heading tint has equal text clearance; expanded titles share space with an intrinsic-width Contract View group. Right-aligned anchor examples fit their text and start at their right endpoint. Locations disclosures outdent 4px on each side.

**Owner:** [Interface contract](../docs/agent-guidance/interface.md#playground-keyboard-and-nested-scrolling), `playground-keyboard.mjs`, `playground-layout.mjs` and `workshop-specimen-layout.mjs`.

## Navigable Page Titles and Discovery Geometry

**Decision:** Make the two page titles ordinary canonical-root navigation links, scale H3 icons with their text, and retain one rounded inscription focus boundary across discovery states. Keep the Style Options focus boundary unchanged when its ellipsis becomes an X.

**Reason:** Adam requested keyboard-accessible title navigation without section-anchor behaviour and consistent focus geometry. A general main-child width rule stretched the real discovery dialog to the page rail while its detached animation measurement remained 440px; excluding dialogs restores the original bounded modal and matching rainbow path.

**Owner:** [Page Titles and Discovery Focus](../docs/agent-guidance/interface.md#page-titles-and-discovery-focus).

## Page-Title Anchor Decoration

**Decision:** Reuse the shared anchor paint and link-surface focus contour for ordinary H1 navigation, measuring each text line and the existing leading heading icon without changing heading layout. Keep hash/copy affordances absent. Show the clickable-title treatment and left-aligned Step 2 copy style in Status States.

**Reason:** Adam requested identical hover decoration and exterior focus clearance, including wrapped titles. Shared paint tokens and one union mask keep hover, click coverage and focus boundaries consistent.

**Owner:** [Page Titles and Discovery Focus](../docs/agent-guidance/interface.md#page-titles-and-discovery-focus).

## Stable First Paint

**Decision:** Share a bounded preparation phase between Resources and the outer Playground while retaining measurable layout. Wait for DOM setup, fonts, the Wavelength mask and visible images, then queued layout frames. Show the completed page without an added transition; leave lazy specimen loading independent and retain no-JavaScript and stalled-loading fallbacks. Measure Resources sticky controls only once the theme toggle is visible, and render the current hover explainer directly.

**Rationale:** Refreshes exposed intermediate DOM states: independent buttons before selector assembly, missing tab icons, actions before relocation and obsolete hover help before replacement. Hidden theme measurements could also reserve an incorrect sticky footprint, while font/image arrival changed branding and QR presentation. Preparing before presentation addresses these related symptoms without changing the established final layout. A four-second release avoids an indefinitely blank page if an asset stalls.

**Owning Rules and Sources:** [Initial Page Presentation](../docs/agent-guidance/interface.md#initial-page-presentation), `lib/workshop-first-paint.mjs`, `lib/workshop-sticky-controls.mjs` and `scripts/playground.mjs`.

## Specimen Focus Boundaries and Menu Transitions

**Decision:** Keep interactive keyboard behaviour in ordinary specimens, but make Focus and Selection a static, sequential row-level demonstration. Use one exterior ring per target, following the real container corners, and suppress the original prompt pseudo-ring when the shared overlay paints focus. Hide the Style Options ring during both animations and retain silent heading focus on opening, route the next Tab to X, and restore the ellipsis button only after closing completes.

**Reason:** Adam identified competing specimen rings, clipping during menu closure and preloaded focus examples being disturbed by live interaction. The explicit row-only exception preserves those examples without removing useful interaction from other panels.

**Additional Refinements:** Prioritise the real H1 before theme/QR controls while leaving specimen tab order local; preserve normal visited-title ink. Fit the secret inscription ring to both text halves as a rectangle. Use a full accent tab underline with 4px content insets and no second selection marker, make rate-limit CTAs visibly inactive, and balance collapsed headings using actual first/last-line ink rather than cap height alone.

**Owner:** [Interface](../docs/agent-guidance/interface.md#playground-keyboard-and-nested-scrolling).

**Focus Follow-up:** Explicitly clear the UA popover background so top-layer rings never obscure their targets. Full-height gallery roots do not scroll internally during row navigation. Round the text-sized secret ring, restart title navigation after blank top-area clicks, remove the tab marker’s reserved height and use a 2px accent rail. Let measured collapsed heights override the URL H3 minimum, and keep iframe bottom clearance at 24px independently of collapsed spacing. These corrections respond to visual and keyboard review of the previous implementation.

**Specimen Fidelity Follow-up:** Isolate the QR caption from the source header’s grid positioning; keep standalone prompt upper corners square while softly rounding focus paint. Retain captured theme hover tokens and password state ink so isolated specimens remain legible and accurate. Give login contexts an enclosing stop and route the Resources fallback through H1 before its controls. Widen static row rings to clear the demonstrated rings, apply balanced hover height to expanded URL H3s, and lower tab contents by 1px. These changes follow direct visual and keyboard review.


**Navigation and Focus Follow-up:** Use a shared 2px radius for otherwise sharp focus corners, including the tab baseline and prompt upper corners. Apply focus revelation through nested scrollers with 16px clearance and use pointer geometry to continue Tab locally after blank-content clicks. Add a keyboard-visible skip link before Playground tooling. Automatic success-preview rendering must not capture outer-page focus; the live app keeps normal modal focus. Pair resting/hover link and anchor specimens to make their differences directly comparable, and remove the duplicate Typography selection example.

## Local Preview Cookies Across Ports

**Decision:** Give each local preview listening port its own cookie name while retaining separate in-memory session databases and the unchanged production handler. Derive the name from the actual socket port. Ignore the old shared cookie; ordinary local automatic sign-in obtains the new session.

**Rationale:** Browsers share cookies across ports on a hostname. Two previews using the same cookie name replaced one another’s session token; returning to either tab then failed its visibility-triggered session check and caused repeated reloads. Distinct cookie names stop this cycle and isolate logout without weakening authentication.

**Owning Rules and Sources:** [Local Preview Session Isolation](../docs/agent-guidance/authentication.md#local-preview-session-isolation), `scripts/phone-preview.mjs` and `tests/preview-port-session-browser-check.mjs`.

## Skip Navigation and Specimen Focus Boundaries

**Decision:** Share the keyboard-visible skip link between Resources and Playground, with standard inline-link paint above the logo. Keep password state ink separate from its keyboard-location ring. Bound static row rings by their dividers and the gallery edges; remove inherited app footer spacing between specimen groups. Reserve the measured expanded URL H3 hover height in layout.

**Reason:** Adam requested equivalent mobile and desktop keyboard navigation, tighter skip-link focus geometry, green accepted fields with blue rings, and explicit row clearance. Expanded H3 paint previously exceeded its reserved row height and consumed part of the existing content gap.

**Owner:** [Interface contract](../docs/agent-guidance/interface.md#playground-navigation-and-paired-specimens).

**Keyboard Highlight Follow-up:** Skip links use the same decoration on keyboard focus as on hover. Accepted-password native text selections retain green ink and a green tint with a blue exterior ring. The passive success dialog must paint above the animation scrim; the earlier lower stacking position hid its completed appearance until iframe focus promoted it to the modal layer. Paired anchors reserve full text-rail clearance, and right-aligned examples align their Hover/Resting captions too. Rename the hyperlink group to Hyperlink Styles.

**Replay and Alias Follow-up:** A queued close event from the previous passive dialog must not remove the next replay’s dimmer or restore focus. Hyperlink Styles uses `#hyperlink-styles` and retains `#defined-styles-used-in-playground` as a legacy fragment. The recent anchor-heading audit found no other renamed outer section since heading anchors were introduced; the other recent label changes were embedded specimens. Adam corrected the accepted-password requirement: its exterior focus ring is green, matching the field and selection. This supersedes the earlier blue-ring decision.

**Skip Position and Replay Availability Follow-up:** Both skip links measure the actual logo container. Measuring the taller Playground row previously placed its link 7.5px higher at ordinary widths, despite identical logo positions. Automatically looping Easter Egg modes disable Replay Animation with native disabled semantics and shared grey styling; Success Dialog remains manually replayable. Expanded accepted-password fields already inherit the green native ring, now covered explicitly by mobile/desktop native-Tab regression checks.

**Heading Geometry and Alias Weight Follow-up:** Single-line section highlights use a fixed 50px height; the earlier content-ink calculation added descender depth to words containing letters such as g, p and y, producing inconsistent 52–54px rows. Expanded and collapsed rows now share their measured height, while wrapped headings keep the existing coverage and cap alignment. URL Reference applies bold code weight beyond the canonical URL column so legacy fragments visibly retain their Markdown emphasis. Expanded automatic-replay controls have explicit mobile/desktop disabled-state coverage.

**Shared Code Emphasis Follow-up:** Replace the URL Reference-only bold-code override with semantic rules in shared body typography. Strong/b code inherits the emphasis despite component font shorthands and captured inline font declarations; strong/b text inside code remains emphasized too, while unmarked code stays normal. The wrapped-heading audit measured first/last ink clearance in both disclosure states, across responsive widths and forced desktop wrapping, and confirmed balance within one CSS pixel without another layout change.

## Native Anchor Scrolling and Arrival Fades

**Decision:** Both pages delegate anchor scrolling to the browser, matching Jump to Top. Arrival effects use monotonic, smoothstep-eased progress over the final 30% of actual travel. Preserve page-specific landing offsets, focus sequences, reduced-motion behaviour and the separate upward-restoration fade.

**Rationale:** Adam requested consistent scroll feel with Jump to Top and selected 30% to keep earlier content visible until near arrival. Distance-based fades adapt to each browser's duration and deceleration without guessing its timing. The previous custom speed, duration limits and fixed arrival fade window are superseded.

**Owner:** [Shared Native Anchor Motion](../docs/agent-guidance/motion.md#shared-native-anchor-motion).

## Prompt Focus Corner Comparison

**Decision:** For Adam’s requested visual comparison, give the prompt ring a 1px top-left base radius using `--focus-comparison-radius` and the shared 2px sharp token at top-right. Share `--focus-ring-offset: 3px` between the native default and prompt ring. Retain the lower radii.

**Reason:** The prompt previously used a separate 4px outline offset. Comparing both upper corners at a consistent gap makes the sharp token’s effect reviewable. Keep the Playground’s clipping-safe overlay, but derive its prompt outline properties from the app’s pseudo-element rather than calculating a different border radius. The asymmetric corners are pending user review.

**Owner:** [Focus and Panel Opening](../docs/agent-guidance/interface.md#focus-and-panel-opening).

## Shared Sharp Focus Corners

**Decision:** Adopt Adam’s preferred 1px prompt corner as the shared sharp-focus base radius. End the asymmetric comparison and remove its temporary token. Apply the shared base token to native sharp focus corners; derive the border overlay’s outer radius from that base plus the 3px gap and 3px ring thickness. Preserve rounded controls, custom link masks and decorative corners.

**Reason:** The earlier overlay treated a base token as an outer radius, so nominally identical token values produced different curves. Prompt overlays already copy the canonical outline. URL Reference code blocks and static row/scroll-region overlays now use the same sharp-corner convention.

**Deferred:** Adam requested retaining the tab overlay’s existing 11px rounded top corners and logging their inconsistent calculation for discussion. Existing unrelated offset overrides remain unchanged; their removal is not needed for the clear sharp-corner rollout.

**Owner:** [Focus and Panel Opening](../docs/agent-guidance/interface.md#focus-and-panel-opening) and [Website Backlog](BACKLOG.md#review-rounded-tab-focus-geometry).

## Page Focus Order and Spatial Continuation

**Decision:** Follow the explicit Resources and Playground sequences in the [Interface contract](../docs/agent-guidance/interface.md#page-titles-and-discovery-focus), including reverse traversal and the mobile Style Options selector sequence. Keep grouped selectors as one stop, use their visible group bounds for nearby blank-space clicks, and choose the nearest eligible target in the requested direction. Keep specimen navigation and modal containment local.

**Reason:** Adam requested toolbar controls before H1, Hover Preview before its explainer, and predictable Tab continuation after clicks above or left of controls. The previous positive H1 priority and first matching DOM candidate could skip a nearby toolbar control or jump to a distant column. This supersedes the earlier H1-second page sequence while retaining existing responsive visibility and heading hit areas.

## Tab Focus Ring Ownership

**Decision:** Remove the unused tab-specific 11px overlay branch. Preserve the normal sibling group-focus ring with 8px upper and 1px lower base radii, a 3px outline and 3px offset.

**Evidence:** The only tab controls are in the outer tab bar, outside specimen galleries and expanded dialogs, and are never marked as scroll-focus targets. They do not meet the keyboard overlay eligibility condition. The tab group controller owns their ring; native button outlines are suppressed. The apparent extra lower-corner rounding comes from the offset native outline, not overlapping rings. Browser coverage checks all tabs, themes, agents, four viewport widths and return from expanded views.

**Rationale:** Adam authorised removal if redundant and requested preserving the normal appearance. No alternative rounded-tab geometry needs adoption. This resolves the earlier deferred backlog discussion.

**Owner:** [Focus and Panel Opening](../docs/agent-guidance/interface.md#focus-and-panel-opening), `scripts/playground-keyboard.mjs`, `lib/workshop-group-focus.mjs`.

## Embedded Page Navigation and Expanded Style Options

**Decision:** Opt the Resource Page and Controls and Branding documents into shared page navigation, and install a context-scoped skip link for the Resources JavaScript Unavailable specimen. Reuse the Resources focus sequence and local first-H2 skip target, preserving iframe sandboxing and all other specimens’ navigation. Expanded Style Options uses the shared controls with Hover Preview before its explainer, while retaining modal boundaries and scroll-region stops.

**Reason:** Adam requested the updated page navigation in these embedded contexts and their existing expanded views. Previously all frames suppressed skip links, the fallback had an H1-first special case, and expanded controls inherited the explainer’s earlier DOM position. Local skip activation is now allowed by the specimen bridge; ordinary navigation remains blocked. This supersedes the blanket exclusion of skip links from embedded specimens only for the named full-page contexts.

**Owner:** [Playground Navigation and Paired Specimens](../docs/agent-guidance/interface.md#playground-navigation-and-paired-specimens).

## Expanded View Defaults, Viewport Bounds and Clipboard

**Decision:** Reset Style Options closed and Preview Controls open on every expansion. Apply normal 16px inter-panel margins only to inline panels. Place fallback anchor-copy fields within the invoking modal and verify focus and full selection before issuing the copy command. Preserve ordinary Clipboard API behaviour, native focus containment and existing feedback timing.

**Reason:** Adam requested consistent reopening defaults and reported a grey top strip and false copy success in expanded views. Resources is the second Components panel, so it inherited a 16px top margin while first-panel rules concealed the issue elsewhere. The body-level fallback textarea was inert outside the modal: the platform copy command could return success while leaving the clipboard unchanged. Actual clipboard reads reproduced that failure and verified the corrected URL after moving the field inside the dialog.

**Owner:** [Interface](../docs/agent-guidance/interface.md#playground-heading-anchor-controls) and its preview-layout rules.

## Plain Expanded Headings and Anchor Focus Priority

**Decision:** Expand View panel titles are ordinary H2 headings. Remove their copy control and restore it when the panel contracts. Keep the existing reset defaults and viewport bounds. Run the temporary anchor-arrival Tab route before general page navigation, preserving the landing position and hidden preceding sections throughout that route.

**Reason:** Adam reconsidered anchor copying inside a full-page modal and requested its removal. This supersedes the expanded-heading copying behaviour above; the modal-safe shared clipboard fallback remains available to other callers. The anchor-arrival regression came from two Tab handlers moving focus in one event: general navigation revealed an unintended target before the arrival route corrected focus.

**Backdrop and Icon Follow-up:** Colours inspection had an explicit decorative-iframe Tab stop; remove it and give only the capture root scrolling overflow. Native wheel scrolling was not reproducibly broken in the checked baseline, so validation covers inline/expanded No Blur and Blur and Darken, Chrome/WebKit desktop/mobile widths and Chrome emulated touch. Captured content remains inert and script-disabled. Link Icons uses actual modified SVG filenames and captures the Resources skip-link usage from its source document.

**Owners:** [Interface](../docs/agent-guidance/interface.md), [Anonymous Backdrops](../docs/agent-guidance/backdrops.md), `scripts/playground-anchors.mjs` and `lib/workshop-playground-placeholder.mjs`.

## Tab Outer Bottom-Corner Comparison

**Decision:** Following Adam’s request and the other chat’s go message, trial a 1px visible outer radius at the tab ring’s bottom corners while preserving its native upper-corner paint, 3px ring thickness and 3px gap.

**Implementation:** Retain the existing sibling group-ring positioning. The original ring element retains and clips its native upper outline; a sibling layer positioned by the same controller paints a 3px border at the same outer extent with 1px bottom radii. The clipped halves overlap by 1px along their straight sides to avoid fractional-pixel seams. No separate keyboard overlay is added. The lower inner corners are square because the outer radius is smaller than the stroke thickness.

**Outcome:** Adam rejected this comparison. The restoration below supersedes it; this entry records the experiment only.

**Owner:** [Focus and Panel Opening](../docs/agent-guidance/interface.md#focus-and-panel-opening), `scripts/playground-layout.mjs`.

## Keyboard Scrolling of the Colours Background

**Decision:** Use a direct, same-origin, script-disabled iframe for Colours No Blur and Blur and Darken inspection. The existing preview scroll stop owns keyboard focus and controls the capture root for vertical arrows, Page Up/Down and Home/End; horizontal arrows also pan the selected screen width. Keep the capture at `tabindex="-1"`, its contents inert and its sandbox without script permission. Retain the existing isolated interactive specimen for Resources and Password Panel modes. Reuse saved anonymous geometry without recapture.

**Reason:** The previous Colours capture was nested under an opaque sandbox. Keyboard-pan messages stopped at the outer login specimen and could not reach the actual scrollable capture. Direct parent access resolves that boundary while preserving script-disabled content and the removed extra Tab stop. Wheel and touch retain native scrolling; theme, agent, strength, blur and dimming remain connected to the same preview controls.

**Icon Follow-up:** Adam requested suffix-free modified icon basenames and Resources-first uses for `arrow-right-modified`, superseding the earlier `.svg` label convention.

**Owners:** [Anonymous Backdrops](../docs/agent-guidance/backdrops.md#interaction-and-scrolling-policy), [Interface](../docs/agent-guidance/interface.md), `scripts/playground-colours-inspection.mjs` and `scripts/playground-keyboard.mjs`.

## One Shared Background Inspection Renderer

**Decision:** Resources and Colours No Blur and Blur and Darken views now use one direct, script-disabled inspection iframe, renderer, settings controller and keyboard-scroll implementation. Destination selection changes only the saved anonymous source document. Both use the same enclosing Tab stop, root scrolling, horizontal panning, mode reset, blur and dimming. Keep the existing interactive specimen solely for locked Password Panel mode and remove its former inspection-scroll branch. Reuse the canonical footer wrapping helper from the parent for anonymous Resources content.

**Reason:** The initial keyboard fix gave Colours a direct inspection frame while Resources retained its earlier path. Adam requested one shared implementation to prevent recurrence and drift. A parameterised regression exercises both backgrounds through identical keyboard, wheel, touch, theme, width and expanded-view cases. Captures remain inert and script-disabled; saved geometry is reused.

**Owners:** [Anonymous Backdrops](../docs/agent-guidance/backdrops.md#interaction-and-scrolling-policy), `scripts/playground-backdrop-inspection.mjs`, `scripts/playground-keyboard.mjs` and `tests/backdrop-scroll-browser-check.mjs`.

## Focused Testing by Default

**Decision:** Select focused checks for changed behaviour and affected consumers. Broader suites require an explicit reason based on widespread effects, uncovered integration risk, failure evidence or a user request. Scope matrices to affected dimensions, avoid overlapping runs and stop after sufficient checks pass. Replace the blanket broad Playground source-parity requirement with this risk-based selection.

**Reason:** Adam reported excessive build turnaround after overlapping scrolling, backdrop and broad Playground checks. The shared scrolling regression provides relevant coverage of both backgrounds; unrelated broad checks should not become a routine cost for narrow changes.

**Owners:** [Proportionate Testing](../AGENTS.md#proportionate-testing), [Interface](../docs/agent-guidance/interface.md#mandatory-change-and-validation-contract).


## Consolidated Focus and Mobile Review Corrections

**Decision:** Restore the tab bar’s single native group outline with 8px upper and 1px lower base radii, 3px gap and 3px thickness. Remove the split lower layer, option and clipping. Keep intentionally rounded controls, prompt lower corners, custom link masks, URL code guards and the accent baseline.

**Reason:** Adam preferred the prompt’s 1px base-radius treatment. A 1px visible outer radius has a different meaning and introduced unnecessary split-paint complexity. This supersedes Tab Outer Bottom-Corner Comparison.

**Navigation:** Skip to Main Content remains first for normal page entry, as Adam clarified; anchor-link arrivals retain their separate temporary route. Give Resources arrival routing priority over general page traversal. Desktop Playground arrivals visit Agent, Theme, Width, Hover, Jump to Top, Tab Bar and target content. Adam explicitly rejected automatically opening mobile modals; mobile arrivals instead visit Style Options, Jump to Top, Tab Bar and target content. The modal retains its selector sequence when explicitly opened. Preserve landing position and ordinary navigation afterwards.

**Specimens and Presentation:** Remove captured positive tab priorities, retain sequential text-region inspection and refresh colour annotations after transitions settle. Enter URL Reference through About This Reference during normal tabbing. Show hyperlink hover decoration during keyboard focus, align disclosure chevrons with the first line, and place mobile Hover Preview help below its selector. Reuse shared surface rails for Hyperlink Styles frames and scope its H3 dividers locally. Allow Done to close sandbox specimen dialogs locally.

**Icons:** Give distinct headings unique installed Lucide icons: List for Lists and Inline Code, Paintbrush for Link Colours and File Check for the Lobe licence section. Keep modified arrows in both Link Icons and Playground Icons when actual heading usage warrants it; usage metadata and ordering remain DOM-derived.

**Owners:** [Interface](../docs/agent-guidance/interface.md), [Motion](../docs/agent-guidance/motion.md) and [Repository Instructions](../AGENTS.md).

## Unique Heading Icons and Matching Tab Icons

**Decision:** Assign each Playground section/subsection heading a globally unique icon. Permit only one section-heading use and one matching tab-bar use of that icon. Each tab’s first heading must use its tab icon, and tab icons must be unique across the bar. Catalogue samples and embedded specimens document icons rather than create additional section identities.

**Reason:** Adam explicitly limited icon reuse to the heading/tab pair and required the first heading to match its tab, tightening the earlier general navigation-reuse allowance. This makes each section recognisable without assigning the same icon to unrelated headings. The current rendered inventory contains 40 unique section/subsection icons and 10 unique tab icons; all 10 first headings match their tabs.

**Owners:** [Repository Instructions](../AGENTS.md#website-guardrails) and [Interface](../docs/agent-guidance/interface.md#website-appearance).

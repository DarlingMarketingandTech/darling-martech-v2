# Homepage Overhaul Design (Lean Conversion Spine)

Date: 2026-04-24  
Owner: Darling MarTech  
Scope: `src/app/page.tsx` homepage section architecture and content intent only (no visual asset production in this phase)

## 1) Context And Problem

The current homepage has strong pieces but too many sections performing overlapping strategic jobs. This creates:

- repeated trust messaging (proof + evaluation + ICP + process variants)
- CTA competition in the same scroll journey
- lower first-screen to mid-page clarity for first-time visitors
- section fatigue (many blocks with similar narrative purpose)

This design aligns to:

- `AGENT_SYSTEM.md` (problem-first, proof-backed, systems-oriented, solo-operator)
- `docs/agent/site-architecture.md` (diagnose -> validate -> understand -> act)
- `agent-system/context/page_blueprints.md` (fewer, stronger sections)
- `agent-system/context/page-purpose-boundaries.md` (no “everything page” drift)
- `agent-system/context/trust_ladder_ctas.md` + `relationship_display_limits.md` (one primary CTA pattern)

## 2) Primary Object, Question, CTA

- Page type: Homepage
- Primary object: Problem-to-action routing for first-time buyers
- Primary question this page must answer: “Am I in the right place, and what should I do first?”
- Primary CTA (recommended): `Find your bottleneck ->` to `/tools/growth-bottleneck-quiz`
- Secondary CTA (allowed): `See the proof ->` to `/proof`

Rationale: Trust-ladder guidance says homepage should usually be browse/diagnose-first, not conversation-first.

## 3) Recommended IA (7 Sections Max)

Exclude global header/footer from this count.

1. Hero (problem pressure + positioning + action)
2. Qualification (fit / not-fit / trigger moments)
3. Core Problems (diagnostic paths)
4. Proof (outcomes with context)
5. How I Work (process and accountability)
6. Services (implementation lanes)
7. Final CTA (single conversion block)

This is the selected path from options analysis because it best reduces overlap while preserving the brand’s diagnostic architecture.

## 4) Section Specs (Content Requirements Only)

## Section 1 — Hero

Must include:

- one problem-first headline (clear system failure framing)
- one outcomes-oriented subhead (business impact, not generic promise)
- solo-operator trust line (“Work directly with Jacob” pattern)
- primary CTA to quiz + secondary CTA to proof

Must avoid:

- capability list language
- multiple equal-weight CTAs

## Section 2 — Qualification

Must include:

- “Who this is for” bullets (broken-system + missing-system both represented)
- “Not a fit if” bullets (mindset-based anti-persona, not size-based exclusion)
- trigger moments buyers recognize (“if this is happening, start here”)

Must avoid:

- long bio narrative
- repeating service details

## Section 3 — Core Problems

Must include:

- 3-4 problem cards (not more)
- per card: symptom, root cause framing, direction-of-fix
- each card routes into canonical problem detail

Must avoid:

- duplicate explanatory sections that restate the same four problems
- deep service content inside cards

## Section 4 — Proof

Must include:

- concise outcomes with context (“what changed” + “for whom”)
- direct route to proof hub
- proof adjacent to claims (no detached trust block)

Must avoid:

- logo-wall-only proof
- vanity metrics without operating context

## Section 5 — How I Work

Must include:

- 3-4 step operating model (diagnose -> build -> run/measure)
- explicit ownership boundaries (“I own X, client owns Y”)
- practical cadence language (not abstract methodology)

Must avoid:

- duplicate “why me” section separate from process
- overlong narrative prose

## Section 6 — Services

Must include:

- clear lanes mapped to system state/maturity
- expected outcomes and deliverable shape per lane
- one “start here” path for uncertain visitors

Must avoid:

- full capability inventory
- generic task-menu framing

## Section 7 — Final CTA

Must include:

- one decisive action aligned to homepage primary intent
- friction-lowering expectation text (what happens next)
- optional single supporting link (proof/tools) only

Must avoid:

- three-way CTA split
- reintroducing multiple conversion intents at end-of-page

## 5) Merge/Remove Plan From Current Homepage

Current page currently contains these overlapping groups:

- buyer path section
- system logic section
- problem section
- diagnostic band
- process section
- capability module
- evaluation trio
- proof bridge
- ICP block
- newsletter band
- closing CTA

Planned consolidation:

- Merge buyer-path + ICP + evaluation-trio into a single Qualification section.
- Merge system-logic + process-timeline into one How I Work section.
- Merge proof-bridge with existing proof rail into one stronger Proof section.
- Keep one diagnostic path (hero + one reinforcing band or inline module, not both redundant).
- Move newsletter nurture off homepage primary conversion path (keep lightweight footer/global signup).
- Reduce repeated support bands that compete with primary narrative progression.

## 6) CTA Hierarchy Design

Global homepage CTA discipline:

- Primary (repeat across page): `/tools/growth-bottleneck-quiz`
- Secondary (support only): `/proof`
- Conversation CTA should appear in final block as tertiary/support or on higher-trust pages (`/process`, `/services`, `/contact`)

Rule enforced from trust ladder:

- low-trust pages should not force high-trust action as only route

## 7) Content Quality Rules For Rewrite

- Use solo-operator language (`I`, `Jacob`) where delivery/accountability is described.
- Keep section headlines short and diagnostic.
- Every major claim needs nearby proof cue.
- One section = one narrative job.
- Prefer specific system nouns (intake, routing, CRM, follow-up, attribution) over vague “marketing growth” language.

## 8) Validation Criteria (Before Build Completion)

Strategic acceptance checks:

- First-screen clarity: visitor can answer what this is and next action in <= 5 seconds
- No section with duplicated purpose
- CTA hierarchy follows one-primary rule
- Broken-system and missing-system signals both present in qualification/problem framing
- Proof appears before deep service detail

Operational checks:

- `pnpm typecheck`
- `pnpm build` (homepage behavior/output changed)
- visual QA desktop + mobile for section pacing and CTA dominance

## 9) Out Of Scope (This Phase)

- new visual asset generation / art direction
- motion redesign beyond existing reusable patterns
- data model refactors outside homepage content and composition

These can be handled after IA/content structure is locked.

## 10) Risks And Mitigations

- Risk: removing too much process/proof nuance reduces trust.
  - Mitigation: keep one strong proof section and one clear process section with direct routes to deeper pages.
- Risk: CTA simplification lowers call bookings short-term.
  - Mitigation: preserve conversation CTA in final block and high-trust pages; optimize diagnose-first path.
- Risk: copy gets generic during compression.
  - Mitigation: enforce systems-first, proof-backed phrasing and operator-accountability language.

## 11) Recommended Execution Sequence

1. Rewrite homepage section map and content intent in `src/data/homepage.ts`.
2. Refactor `src/app/page.tsx` to 7-section spine.
3. Remove merged/redundant sections/components from homepage composition only (do not delete shared components yet).
4. Validate type/build and run focused UX pass on CTA hierarchy and scroll fatigue.
5. Decide if newsletter module remains inline or footer-only based on conversion telemetry.


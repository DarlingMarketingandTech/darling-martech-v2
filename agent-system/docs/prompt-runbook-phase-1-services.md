# Prompt Runbook — Phase 1 (Service Interiors First)

This runbook sequences prompts so outputs do not overlap, overwrite, or drift into homepage/IA work.

Scope for this phase:
- Interior service pages (`/services/*`) and the components they directly use.
- CTA strategy scoped to service pages (and service-adjacent layout only when necessary for experience quality).
- Media planning and wiring for those service pages.
- UX baseline + MCP QA after visible changes.

Explicitly out of scope:
- Homepage rebuild or new homepage wayfinding structure
- Resources/blog
- New taxonomy systems (including “report interior slugs”)

## Active Task Profile
Use `implementation` for phase 1 (bounded files, explicit in/out of scope, and required validation).

## Target Buyer Path Support
This phase supports **both** buyer entry states:
- `broken-system`
- `missing-system`

## Prompt Order (Smallest Safe Sequence)

### 0) Intake (only if inputs are unclear)
Prompt: `agent-system/prompts/intake-prompt.md`
Goal: confirm target service slugs, what feels wrong, and constraints (no IA changes, service interiors first).

### 1) Problem-Plug Path + Cross-Link Plan (architecture without rewrites)
Prompt: `agent-system/prompts/problem-path-planning-prompt.md`
Goal: map each target service to:
- the correct problem cluster(s)
- curated problem links (max 2)
- proof reinforcement path (featured + optional links within caps)
- tool bridge (optional, only if it supports trust stage)
Opportunity focus: remove generic “capability page” feel by making the service clearly a response to a named problem state.

### 2) CTA Sequencing (trust-stage discipline)
Prompt: `agent-system/prompts/cta-strategy-prompt.md`
Goal: enforce:
- one primary CTA per service page (evaluate-stage)
- at most one secondary CTA (proof/learn)
- “both buyer states” coverage without CTA overload
Opportunity focus: make the next step obvious without pushing high-trust CTAs too early.

### 3) Service Interior Narrative Upgrade (page-level, slug-scoped)
Prompt: `agent-system/prompts/service-interior-improvement-prompt.md`
Goal: standardize a service page narrative that is:
- system-first (what changes)
- commercially legible (what it fixes in revenue/ops)
- buyer-state clear (broken vs missing vs both)
- proof-connected (without enumerating everything)
Opportunity focus: tighten the “what changes” and “how it works” sections so services feel like productized system upgrades.

### 4) Media Plan + Wiring (after narrative/CTA are stable)
Prompt: `agent-system/prompts/service-media-prompt.md`
Goal: add or refine hero/supporting visuals that support the narrative without adding noise.
Opportunity focus: make service pages feel top-tier and “built” while staying restrained and readable.

### 5) Component UX Baseline (durability gate)
Prompt: `agent-system/prompts/implementer-prompt.md` (for changes) + `agent-system/prompts/reviewer-prompt.md` (for review)
Goal: ensure improvements are durable:
- components reused vs page-specific hacks
- focus states, tap targets, spacing, rhythm, and CTA affordances
Opportunity focus: reduce one-off styling and keep service interiors consistent.

### 6) MCP QA + Evidence Gate
Prompt: `agent-system/prompts/mcp-ux-qa-prompt.md`
Goal: verify the touched routes at mobile + desktop with screenshots/diffs (where available), and stop on critical UX/a11y issues.

### 7) PR Packaging
Prompt: `agent-system/prompts/pr-writer-prompt.md`
Goal: concise PR summary + validation evidence + explicit out-of-scope statement.

## Anti-Persona Correctness Check
Block changes if they:
- imply “small business = not a fit”
- disqualify by budget/size instead of system state + mindset
- remove the missing-system path or make it feel second-class

## Service-Cluster Coherence Plan
For each service interior:
- confirm its primary cluster/pillar is consistent with `agent-system/context/service_clusters.md`
- ensure cross-links do not blur unrelated clusters just to “show everything”

## Proof/Tool/Problem/Service Cross-Link Plan
Use strict curation:
- problems: max 2
- proof: max 1 featured + optional links within caps (do not create “proof walls”)
- tools: optional (only if it matches the reader’s trust stage)

## Trust-Stage CTA Sequencing Plan
Service pages are evaluate-stage by default:
- primary CTA: evaluate/ready bridge (diagnostic call / roadmap conversation)
- secondary CTA: proof/learn reinforcement
Avoid: multiple primaries, footer-level competing CTAs, or “book now” pressure for missing-system buyers.


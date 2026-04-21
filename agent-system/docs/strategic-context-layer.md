# Strategic Context Layer

## What changed

Agent-system now includes an explicit strategy layer alongside safety/design checks.
This layer is driven by source-of-truth context files in `agent-system/context`:

- `strategic_standards.md`
- `positioning_rules.md`
- `buyer_psychology.md`
- `system_foundation_path.md`
- `strategic_scorecard.md`
- `service_clusters.md`
- `problem_service_mapping.md`
- `trust_ladder_ctas.md`
- `page-purpose-boundaries.md`
- `relationship_display_limits.md`
- `proof_storytelling_rules.md`
- `page_generation_rules.md`

This context pack is now actively routed by mode and prompt intent via `collect-context.mjs`:
- Mode bundles select mandatory files for strategic/page-related modes.
- Task profile `requiredStrategicContext` keys force inclusion.
- Prompt keyword routing adds context for page generation, service architecture, CTA planning, and positioning refinement.
- Runtime emits `strategicContextMeta` (`loadedKeys`, `priorityKeys`, `profileRequiredKeys`) for deterministic traceability.

## Drift hardening (page purpose + limits)

The strategy layer now includes explicit controls to prevent pages from drifting into:
- company-promotion-first proof pages
- overlong service pages
- “relationship map” pages that surface everything connected in the data model
- too many competing CTAs

Use these context files as hard constraints:
- `page-purpose-boundaries.md`
- `relationship_display_limits.md`
- `proof_storytelling_rules.md`

## Buyer states (required model)

Qualification is based on system state and mindset, not company size.

- **Broken-system buyer:** has systems, but fragmented/underperforming.
- **Missing-system buyer:** lacks coherent foundational systems.

Both paths are valid and should be supported where relevant.

## Strategic scoring

Strategic audits score pages across:
- systems thinking
- revenue clarity
- proof integration
- differentiation vs generic agency framing
- broken-system fit
- missing-system fit
- trust-stage CTA alignment
- service-cluster coherence
- proof-path coherence (problem -> tool -> proof -> service progression)
- operator/accountability clarity
- commercial usefulness

Thresholds:
- `>= 8.0` -> `proceed`
- `>= 7.0 and < 8.0` -> `proceed_with_caution`
- `< 7.0` -> `block_and_rework`

## Validation behavior

`run-validation.mjs` now exposes strategic fields:
- `strategicScore`
- `positioningAlignment`
- `buyerPathCoverage`
- `antiPersonaCheck`
- `trustStageAlignment`
- `clusterCoherence`
- `proofPathCoherence`
- `strategicGate`
- `strategicBlockReason`
- `strategicRequiredImprovements`

Validation can block on:
- size-based anti-persona drift
- weak strategic score
- insufficient buyer-path support (mode dependent)
- both weak cluster coherence and weak proof-path coherence

## Strategic modes

Task/validation profiles now include dedicated strategic modes:
- `strategic_audit`
- `page_generation`
- `service_architecture`
- `problem_path_planning`
- `cta_strategy`
- `positioning_refinement`

These modes enforce strategic context requirements and strategic validation dimensions before completion.

## Commands

- `pnpm strategy:audit`
- `pnpm strategy:audit:json`

Use these to evaluate strategic quality before page-generation or IA-heavy work.

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
- `page_generation_rules.md`

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
- `strategicGate`
- `strategicBlockReason`
- `strategicRequiredImprovements`

Validation can block on:
- size-based anti-persona drift
- weak strategic score
- insufficient buyer-path support (mode dependent)

## Commands

- `pnpm strategy:audit`
- `pnpm strategy:audit:json`

Use these to evaluate strategic quality before page-generation or IA-heavy work.

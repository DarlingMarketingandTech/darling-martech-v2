# Design Critic + Validation Gates

This system now uses a stronger design critic and mode-aware gate checks before completion.

## Sharper Design Critic

The three design audits now score practical design-quality heuristics (not only structural lint signals):

- `audit-component-quality.mjs`
  - Single-purpose clarity
  - Hierarchy legibility
  - Spacing rhythm
  - Content density
  - CTA clarity
  - Reuse quality
  - Visual confidence vs generic template feel
  - Accessibility risk indicators
  - Persuasion utility (does it help decisions or just occupy space)

- `audit-page-experience.mjs`
  - First-screen clarity in first 3 seconds
  - Audience/offer clarity
  - CTA hierarchy and dominance
  - Section sequencing and narrative flow
  - Visual rhythm and pacing
  - Density vs restraint
  - Proof credibility and integration
  - Differentiation vs generic SaaS/agency template feel
  - Mobile readability assumptions
  - Friction/confusion risk

- `audit-design-consistency.mjs`
  - Heading scale consistency
  - Spacing/token rhythm
  - CTA pattern consistency
  - Card shell consistency
  - Section shell consistency
  - Visual hierarchy consistency
  - Repeated weak patterns
  - Generic grid/card overuse
  - Premium brand structure alignment

Each audit returns structured output with:
- `overallScore`
- `categoryScores`
- `topWeaknesses`
- `topStrengths`
- `topUpgrades`
- `confidenceLevel` (heuristic confidence)
- `recommendedAction` (`proceed`, `proceed_with_caution`, `block_and_rework`)

## Validation Gate Thresholds

Design-mode validation enforces these thresholds:

- score `>= 8.0` -> `proceed`
- score `>= 7.0` and `< 8.0` -> `proceed_with_caution`
- score `< 7.0` -> `block_and_rework`

Scores are heuristic and interpreted as directional quality confidence, not deterministic truth.

## Modes That Are Gated

`run-validation.mjs` applies design gating to:

- `component_upgrade` -> component audit only
- `page_experience_upgrade` -> page audit only
- `asset_system` -> consistency audit only (no full page gate for asset brief/spec work)
- `design_system_enforcement` -> consistency + component audits

## Validation Output Fields

Validation output now includes:

- `designGate`
- `scoreThreshold`
- `scoreResult`
- `requiredImprovements`
- `blockReason` (when blocked)

Interpretation:

- `proceed`: design quality is above threshold for current mode.
- `proceed_with_caution`: implementation can continue but must carry required improvements.
- `block_and_rework`: redesign/rework plan is required before implementation.

## Design Memory

`agent-system/memory/design_decisions.json` tracks durable design direction:

- `approvedPatterns`
- `rejectedPatterns`
- `preferredLayouts`
- `antiPatterns`
- `notes`
- `lastUpdatedAt`

When repeated weaknesses appear in gated modes, validation can append concise notes to prevent drift.

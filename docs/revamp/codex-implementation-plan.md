# Codex Implementation Plan

## Purpose

Guide implementation agents through the revamp in the right order without skipping the data contract layer.

## Phase order

1. Define or update content structure in `src/types`
2. Implement or revise canonical content in `src/data`
3. Reuse existing components where possible
4. Update route composition and JSX
5. Run verification

## Rules

- Do not hardcode approved content directly in JSX.
- Do not start with visual reshuffling when the taxonomy or CTA model has changed.
- Do not redesign unrelated pages during a cleanup or structure pass.
- Prefer small, reviewable batches over broad speculative rewrites.

## Revamp priorities

1. Proof taxonomy
2. Growth System Audit consolidation
3. Buyer-facing service and project path framing
4. CTA simplification

## CTA ladder

- Low trust: Growth System Audit
- Mid trust: similar proof
- High trust: diagnostic call

## Definition of done for implementation work

- typed contract updated if structure changed
- `src/data` updated before JSX
- existing components reused where appropriate
- no approved copy hardcoded directly in JSX
- `pnpm verify` passed

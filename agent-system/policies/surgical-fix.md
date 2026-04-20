# Surgical Fix Policy

## Intent
Deliver tightly bounded corrections with minimal files and deterministic diffs.

## Allowed
- Redirect and route consistency fixes.
- Internal link and metadata mismatch correction.
- Config-level string and slug correction.

## Disallowed
- Broad component rewrites.
- Scope creep into unrelated content-heavy pages.
- Opportunistic refactoring.

## Required Guardrails
- Stop if unexpected files are modified.
- Stop if comments are removed without explicit reason.
- Stop if placeholder content appears.
- Require lint + typecheck + targeted route/link consistency checks.

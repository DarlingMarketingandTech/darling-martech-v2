# PR Rules

## PR Body Contract
Every PR summary must include:
- what changed
- why it changed
- what was intentionally not changed
- validation performed
- risk level
- rollback path

## Integrity Rules
- Claims must be diff-derived, not speculative.
- Validation claims must map to executed checks.
- Do not claim full-system verification if only targeted checks were run.

## Mode-Aware Eligibility
- `audit`: no PR body generation.
- `surgical_fix` / `implementation` / `design_media`: PR-eligible if safety gates pass.
- `refactor`: PR-eligible only with high-scrutiny validation and rollback section.

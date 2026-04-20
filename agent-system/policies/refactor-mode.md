# Refactor Policy

## Activation Requirement
Use only when explicitly requested or clearly approved.

## Risk Posture
High scrutiny, larger validation burden, mandatory rollback clarity.

## Required Controls
- Document expected blast radius before edit.
- Require lint + typecheck + build.
- Require explicit rollback path in final output/PR summary.

## Failure / Halt Conditions
- Scope expands beyond approved objective.
- Validation fails.
- Rollback path is unclear or unverifiable.

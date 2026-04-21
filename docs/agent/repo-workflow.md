# Repo Workflow — Darling MarTech

## Core principle

Make bounded, verifiable improvements.

Do not attempt wide refactors without explicit approval.

---

## Standard workflow

1. Understand scope
2. Identify exact files
3. Implement smallest correct change
4. Validate
5. Report clearly

---

## Validation requirements

Before marking work complete:

- run `pnpm typecheck`
- run `pnpm build` when affecting pages, routes, or runtime behavior
- verify no unrelated files are modified

---

## Diff discipline

Changes should:
- be tightly scoped
- avoid unrelated edits
- preserve existing working behavior

If diff grows unexpectedly:
- stop
- re-evaluate
- split work if necessary

---

## What to avoid

- editing large content-heavy pages without reason
- introducing placeholder text
- making assumptions about data that is defined in repo
- broad styling rewrites without clear gain

---

## Reporting expectations

Every implementation summary should include:

- files changed
- what changed
- why it matters
- validation results
- remaining gaps

---

## Safe iteration model

Prefer:
- iterative upgrades
- visible improvements
- testable changes

Avoid:
- speculative large-scale rewrites

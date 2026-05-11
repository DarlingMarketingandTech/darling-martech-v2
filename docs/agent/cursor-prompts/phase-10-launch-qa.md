# Phase 10 Cursor Prompt: Launch QA

Goal:
Run the final QA pass before shipping.

Checklist:
1. **`pnpm verify`** (runs lint, typecheck, homepage-proof validation, and build — preferred single gate).
2. If `audit:frontend` / motion audits exist in `package.json`, run them as additional checks; otherwise skip.
3. Browser validate `/`, `/problems`, `/proof`, `/tools`, `/process`, `/about`, `/contact`
4. Test mobile viewport, desktop viewport, reduced motion, keyboard navigation, and form/tool flows
5. Confirm analytics events still fire
6. Document final results in `docs/improvement-buildout/launch-qa.md` (create path if adopting this checklist formally)

Acceptance criteria:
- No silent failures.
- Any unrelated failure is documented explicitly.
- Final build notes include what changed, what was deferred, and what should be monitored post-launch.

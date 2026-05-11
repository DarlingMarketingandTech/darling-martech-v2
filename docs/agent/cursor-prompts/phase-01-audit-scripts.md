# Phase 01 Cursor Prompt: Add Front-End Audit Scripts

Goal:
Add local scripts that catch regressions before we add premium motion and 3D layers.

Implement:
- `scripts/audit-alt-text.ts`
- `scripts/audit-motion-boundaries.ts`
- `scripts/audit-hardcoded-copy.ts`
- `scripts/audit-contrast-tokens.ts`

Then add package scripts:
- `"audit:alt": "tsx scripts/audit-alt-text.ts"`
- `"audit:motion": "tsx scripts/audit-motion-boundaries.ts"`
- `"audit:copy": "tsx scripts/audit-hardcoded-copy.ts"`
- `"audit:contrast": "tsx scripts/audit-contrast-tokens.ts"`
- `"audit:frontend": "pnpm audit:alt && pnpm audit:motion && pnpm audit:contrast"`

Do not add new dependencies unless absolutely required.

Acceptance criteria:

- If scripts are added, wire **`pnpm audit:frontend`** (and siblings) in root **`package.json`**. Until then, **`pnpm verify`** is the enforced gate (`lint` + `typecheck` + `validate:homepage-proof` + `build`).
- Audit failures are either fixed or documented (for example under `docs/`).

**Note (May 2026):** These audit scripts are **not** present in `package.json` yet; treat this prompt as a backlog item unless you implement the scripts in the same PR.

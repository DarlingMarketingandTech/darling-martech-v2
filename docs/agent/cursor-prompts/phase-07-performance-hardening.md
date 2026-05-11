# Phase 07 Cursor Prompt: Performance Hardening

Goal:
Measure the cost of the new premium front-end work.

Tasks:
1. Add optional bundle analyzer configuration behind `ANALYZE=true` without changing default builds.
2. Confirm heavy visual components are dynamically imported.
3. Confirm Cloudinary images have `sizes`, `width`, `height`, and alt text.
4. Audit routes for unnecessary `use client`.
5. Document findings in `docs/improvement-buildout/performance.md`.

Suggested command:
`ANALYZE=true pnpm build`

Acceptance criteria:
- No large visual library is pulled into routes that do not use it.
- No below-fold visual blocks block LCP.
- `pnpm build` passes with and without `ANALYZE=true`.

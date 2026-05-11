# Phase 09 Cursor Prompt: Route-by-Route Rollout

Goal:
Apply the improved section, motion, CTA, and visual system route by route.

Order:
1. `/`
2. `/proof`
3. `/process`
4. `/tools`
5. `/problems`
6. `/about`
7. `/contact`

For each route:
- Check semantics.
- Check CTA hierarchy.
- Check images.
- Check motion boundaries.
- Run targeted browser smoke test.
- Commit separately.

Acceptance criteria:
- Every route returns 200.
- No console errors.
- Keyboard navigation reaches all CTAs.
- Reduced motion works.
- `pnpm verify` passes.

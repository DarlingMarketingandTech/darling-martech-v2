# Phase 06 Cursor Prompt: Proof and process storytelling

Goal:
Improve `/proof` and `/process` motion and section rhythm **without** changing proof taxonomy strategy.

Tasks:

1. Use **semantic sections** and **`SectionReveal`** / **`AnimateOnScroll`** (or scoped Framer Motion) for intros and step bands — match patterns already used on `src/app/problems/[slug]/page.tsx`.
2. For multi-card grids, prefer **Framer Motion stagger** or light **`AnimateOnScroll`** delays. Only reach for **GSAP + ScrollTrigger** if you need scrubbed timelines; keep it **client-only** and consistent with [`DiagnosticHudCard`](../../../src/components/animations/DiagnosticHudCard.tsx) / [`lenis.ts`](../../../src/lib/lenis.ts). There is **no** `ScrollStagger` helper in-tree.
3. Keep proof organized by **decision usefulness**, not client hierarchy.
4. Keep client names **optional context**, not the primary taxonomy.
5. Link **Growth System Audit** for low-trust visitors and **proof** for evaluation-stage visitors (see `docs/revamp/growth-system-audit-strategy.md`).

Acceptance criteria:

- No proof taxonomy regressions.
- Components remain data-driven (`src/data`, `src/types`).
- **`pnpm verify`** passes.

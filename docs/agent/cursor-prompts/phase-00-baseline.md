# Phase 00 Cursor Prompt: Baseline and Guardrails

You are working in `DarlingMarketingandTech/darling-martech-v2`.

Read `AGENTS.md`, `README.md`, `docs/revamp/*`, `src/types/index.ts`, `src/data/homepage.ts`, `src/components/home-v3/*`, `src/components/providers/app-providers.tsx`, and `next.config.ts`.

Goal:
Create a baseline before changing design or motion. Do not redesign yet.

Tasks:
1. Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`.
2. Create a short `docs/improvement-buildout/baseline.md` with current results, current route list, current client boundaries, and known failures.
3. Inspect which components import `framer-motion`, `gsap`, `@react-three/fiber`, or `lenis`.
4. Do not change approved copy unless the change is in `src/data` and type-aligned with `src/types`.

Acceptance criteria:
- No functional changes.
- Baseline doc exists.
- Any failing verification step is documented with exact command output.
- Do not claim complete if verification fails.

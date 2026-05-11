# Phase 02 Cursor Prompt: Motion foundation (current repo reality)

**Status:** Baseline motion is **already implemented**. Do not recreate deleted experiments (`Reveal.tsx`, `ScrollStagger.tsx`, `src/lib/motion/gsap.ts`, `useMotionPreferences`) unless you deliberately rebuild them with tracked files and tests.

## What exists today

- **Smooth scroll:** [`src/components/providers/SmoothScrollProvider.tsx`](../../../src/components/providers/SmoothScrollProvider.tsx) wraps **`/studio`** in [`src/app/studio/layout.tsx`](../../../src/app/studio/layout.tsx).
- **Lenis + GSAP ScrollTrigger sync:** [`src/lib/lenis.ts`](../../../src/lib/lenis.ts) — registers ScrollTrigger, wires Lenis RAF to `ScrollTrigger.update`, exposes `useSmoothScroll()` for opt-in layouts.
- **GSAP scroll-linked UI:** [`src/components/animations/DiagnosticHudCard.tsx`](../../../src/components/animations/DiagnosticHudCard.tsx) uses GSAP + ScrollTrigger (keep GSAP imports **client-only**).
- **Routine UI motion:** **Framer Motion** in homepage sections (e.g. [`HeroV3`](../../../src/components/home-v3/HeroV3.tsx)).
- **Section reveals on marketing pages:** [`SectionReveal`](../../../src/components/ui/section-reveal.tsx) / [`AnimateOnScroll`](../../../src/components/ui/AnimateOnScroll.tsx) — use these instead of a bespoke `Reveal` primitive unless you have a strong reason.

## Reduced motion / network

- Prefer **`useNetworkAware`** ([`src/hooks/useNetworkAware.ts`](../../../src/hooks/useNetworkAware.ts)) where the homepage already gates animation intensity — there is no separate `useMotionPreferences` hook in-tree today.

## Rules

- **Framer Motion:** entrances, hovers, light transitions in client components.
- **GSAP:** scroll-scrubbed or timeline-heavy moments only (see DiagnosticHudCard / Lenis pairing); **no GSAP in server components**.
- **Do not** add a site-wide R3F canvas to `SiteShell` — decorative 3D stays route-local (e.g. [`StudioHeroScene`](../../../src/components/animations/StudioHeroScene.tsx)).

## If you extend this phase

- Add **small**, typed helpers next to the component that needs them (or under `src/lib/` with a clear name).
- Run **`pnpm verify`** (lint + typecheck + homepage validation + build).
- Optional scripts referenced in older prompts (`pnpm audit:motion`, `pnpm audit:frontend`) are **not** in [`package.json`](../../../package.json); use `pnpm verify` unless those scripts are added back.

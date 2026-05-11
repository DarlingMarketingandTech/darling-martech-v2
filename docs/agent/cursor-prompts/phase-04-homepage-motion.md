# Phase 04 Cursor Prompt: Homepage motion upgrade

Goal:
Refine homepage motion using **existing** primitives — no new global motion layer.

Scope:

- `HeroV3`
- `BottleneckGridV3`
- `CapabilityProofGridV3`
- one below-fold section (`SelectedOutcomesV3`, `ToolsPreviewV3`, or `ClosingCtaV3`)

Tasks:

1. Prefer **Framer Motion** patterns already used in `HeroV3` (stagger children with `motion` + variants, or small wrapper components colocated in `home-v3/`).
2. For grid staggering, use **Motion stagger props / variants** or **`AnimateOnScroll`** / **`SectionReveal`** — there is **no** `ScrollStagger` component in this repo.
3. Keep hero **LCP-safe**. Do not lazy-load the primary hero image.
4. Preserve existing **`captureClientEvent`** / PostHog usage; extend [`src/lib/analytics.ts`](../../../src/lib/analytics.ts) if adding new typed events.
5. Respect reduced motion via **`useNetworkAware`** (`shouldReduceMotion`) where those sections already run as client components — align with existing `HeroV3` behavior.

Acceptance criteria:

- No copy changes outside `src/data` unless explicitly approved.
- Reduced-motion and low-power paths still show content without harmful delays.
- **`pnpm verify`** passes.

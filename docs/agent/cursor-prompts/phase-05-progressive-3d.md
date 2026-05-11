# Phase 05 Cursor Prompt: Progressive 3D brand layer

**Status:** The earlier **`SystemCanvas` / `SystemCanvasLoader`** experiment was **removed** during runtime slimming (see `docs/revamp/runtime-slimming-plan.md`, `_archive_legacy/runtime-slimming-2026-05/`). Do not revive it by copy-paste without a performance and a11y review.

## Current pattern (prefer this)

- **Route-local R3F:** [`StudioHeroScene`](../../../src/components/animations/StudioHeroScene.tsx) used from studio animations — keeps 3D off the global shell.
- **No global canvas** in [`SiteShell`](../../../src/components/layout/site-shell.tsx).

## If you add a new decorative 3D surface

- Mount only where needed (single route or section), **`aria-hidden`** on the canvas wrapper, DOM text and CTAs remain real HTML above/beside the canvas.
- Use **`frameloop="demand"`**, capped **`dpr`**, and respect **`prefers-reduced-motion`** (omit or simplify the canvas).
- Do not block **LCP** with heavy GL assets or blocking scripts.

## Acceptance criteria

- Content remains usable if WebGL fails or is skipped (reduced motion).
- **`pnpm verify`** passes.
- Manually test **mobile and desktop** on the affected route only.

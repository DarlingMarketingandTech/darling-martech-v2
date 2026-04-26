# Home V3 Swap Notes

## What was built

- New route: `src/app/home-v3/page.tsx`
- New page composer: `src/components/home-v3/HomeV3.tsx`
- New sections:
  - `HeroV3`
  - `ProofTickerV3`
  - `ProblemGridV3`
  - `DiagnosticBandV3`
  - `ProcessColumnsV3`
  - `ProofStripV3`
  - `OwnerStatementV3`
  - `ToolsPreviewV3`
  - `ClosingCtaV3`
- New primitives:
  - Motion: `src/components/motion/*`
  - Layout: `src/components/layout-v3/BleedSection.tsx`, `src/components/layout-v3/GlassPanel.tsx`

## Verification run

- `pnpm lint` completed with 3 pre-existing warnings in `agent-system/scripts/*` (no new lint errors).
- `pnpm typecheck` passed.
- `pnpm build` passed.
- Browser QA (`/home-v3`) checked at:
  - desktop `1440x900`
  - tablet `834x1112`
  - mobile `390x844`
  - no blocking layout issues after hero visibility fix.
- Lighthouse JSON saved at:
  - `/.firecrawl/refs/lighthouse-home-v3-prod.json`

## Swap procedure

When approved, update `src/app/page.tsx` to render `<HomeV3 />` instead of the current homepage composition.

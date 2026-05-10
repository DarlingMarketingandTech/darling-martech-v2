# Home V3 notes

## Current behavior

- **Production homepage** is `src/app/page.tsx`, which renders `<HomeV3 />` from `src/components/home-v3/HomeV3.tsx`.
- **`/home-v3`** (`src/app/home-v3/page.tsx`) **redirects to `/`** so bookmarks and old links do not 404.

## What lives under `home-v3`

- Page composer: `src/components/home-v3/HomeV3.tsx`
- Sections: `HeroV3`, `ToolsPreviewV3`, `ClosingCtaV3`, and other composed bands
- Motion: `src/components/motion/*`
- Layout helpers: `src/components/layout-v3/BleedSection.tsx`, `GlassPanel.tsx`

## Deprecated modules (do not re-import into `HomeV3`)

- `ProofTickerV3`, `ProblemGridV3`, `DiagnosticBandV3`, `ProcessColumnsV3`, `ProofStripV3`, `OwnerStatementV3`, `FeaturedTransformationV3`, `WhatThisCanIncludeV3`, `ProjectTypeProofV3`

## Verification

After homepage changes, run `pnpm verify` and spot-check `/` in the browser per `docs/verification-runbook.md`.

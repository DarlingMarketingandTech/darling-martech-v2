# Runtime slimming archive (May 2026)

Components and experiments moved here from `src/` are **not** part of the Next.js build. TypeScript excludes `_archive_legacy/` (see root `tsconfig.json`).

Restore by copying paths back into `src/components/` only if you intentionally revive a feature — update imports and run `pnpm verify`.

Contents:

- `components/report/` — system teardown report dashboard (was not routed in app).
- `components/3d-scenes-home/` — unused home R3F scenes.
- `components/BentoDiagnosisGrid.tsx` — unused interactive grid.
- `components/SiteShell-3d.tsx` — alternate 3D shell (not `layout/site-shell.tsx`).

# Darling MarTech v2 — Runtime slimming plan

**Where this lives:** `docs/revamp/runtime-slimming-plan.md` (tracked in git, next to strategy and [codex-implementation-plan.md](codex-implementation-plan.md)).

**Why not `.cursor/plans/`:** Cursor plan files are IDE-local or tooling-generated; this repo uses `docs/revamp/*` for durable implementation guidance that every contributor and CI can reference.

**Execution:** Phases A–D were executed in-repo (May 2026): orphans removed, clusters moved to [`_archive_legacy/runtime-slimming-2026-05/`](../../_archive_legacy/runtime-slimming-2026-05/) (see [`README.md`](../../_archive_legacy/runtime-slimming-2026-05/README.md) for what was moved and how to restore), global `ViewCanvasHost` removed from `SiteShell`, `motion` dependency dropped. Re-run the **Test plan** before closing further cleanup PRs. Use [Git hygiene](#git-hygiene-and-scope-control) so unrelated work stays out of slimming commits.

**Relationship to AGENTS.md:** Follow [AGENTS.md](../../AGENTS.md) for stack rules and verification. Do not change product strategy, taxonomy, or approved copy in this pass unless an orphan removal forces an unavoidable edit.

---

## Summary

Runtime-first, archive-first cleanup: remove true orphans and relocate risky clusters before permanent deletes. Preserve public routes, API handlers, and the live homepage composition unless there is an explicit deprecation.

---

## Git hygiene and scope control

Slimming touches many files; keep the diff reviewable and reversible.

- Use a **dedicated branch** for runtime slimming (or `git add -p` if you must share a branch) so unrelated edits do not land in the same commit.
- Do **not** mix product copy, taxonomy, or unrelated refactors with orphan removal in one PR unless unavoidable—split follow-ups.
- When restoring from archive, copy from [`_archive_legacy/runtime-slimming-2026-05/`](../../_archive_legacy/runtime-slimming-2026-05/) and re-verify imports; do not assume deleted paths still exist on `main`.

---

## Keep list (do not delete without explicit deprecation)

Establish this inventory **before** any deletes:

- [`src/app/page.tsx`](../../src/app/page.tsx) + [`src/components/home-v3/*`](../../src/components/home-v3/) (production homepage uses `HomeV3`).
- All nav-backed pages, dynamic `[slug]` routes, and [`src/app/home-v3/page.tsx`](../../src/app/home-v3/page.tsx) (**bookmark compatibility redirect** to `/` — keep unless intentionally dropping old URLs).
- [`src/app/studio/*`](../../src/app/studio/) and all [`src/app/api/*`](../../src/app/api/) route handlers.

**Internal import count alone is not enough** to delete a route entrypoint.

**Before removing any `src/app/api/**` handler:** repo-wide grep for the path (and client `fetch` / form `action` strings), confirm **product deprecation** (not merely “no TypeScript import”). APIs can be called from external systems or future pages tree-shaken today.

---

## Preconditions (blocking corrections)

These items contradict a naive “delete file” pass:

1. **Homepage proof governance data** — [`scripts/validate-homepage-proof.ts`](../../scripts/validate-homepage-proof.ts) imports [`src/data/homepage-proof-patterns.ts`](../../src/data/homepage-proof-patterns.ts) and [`src/data/homepage-proof-visuals.ts`](../../src/data/homepage-proof-visuals.ts). Do **not** remove those modules unless you also update or remove the validator and [`pnpm verify`](../../package.json) (via `validate:homepage-proof`).

2. **Tools meta barrel** — [`src/app/tools/page.tsx`](../../src/app/tools/page.tsx) imports `TOOL_META` from `@/data/tools`, which resolves to [`src/data/tools/index.ts`](../../src/data/tools/index.ts). Do **not** delete that index without moving `TOOL_META` to a new module (for example `src/data/tools/meta.ts`) and updating all `@/data/tools` imports that rely on it. [`src/lib/tools/tool-recommendations.ts`](../../src/lib/tools/tool-recommendations.ts) imports the same barrel but appears **unused** today (`getToolsForProof` has no callers); safe to delete **that lib file** only after confirming grep stays clean — **not** the barrel unless relocated.

---

## Implementation phases

### Phase A — Hard-delete obvious runtime orphans (after grep)

Candidates **only after** confirming zero imports and no verifier/script coupling:

- [`src/lib/pexels.ts`](../../src/lib/pexels.ts), [`src/lib/unsplash.ts`](../../src/lib/unsplash.ts) — trim [.env.example](../../.env.example) comments if the libs go away.
- [`src/lib/tools/tool-recommendations.ts`](../../src/lib/tools/tool-recommendations.ts) — verify callers first (currently unused).
- [`src/data/index.ts`](../../src/data/index.ts), [`src/hooks/index.ts`](../../src/hooks/index.ts) — unused barrels only if repo-wide grep confirms no `@/data` / `@/hooks` barrel imports.
- Unused UI sections/components **after** TSX grep, for example:
  - [`src/components/proof/ProofOutcomeFilters.tsx`](../../src/components/proof/ProofOutcomeFilters.tsx)
  - [`src/components/services/ServiceDetailContextStrip.tsx`](../../src/components/services/ServiceDetailContextStrip.tsx)
  - ~~`ToolsPreviewBand.tsx`~~ removed — superseded by `ToolsPreviewV3` in `home-v3/`.
  - [`src/components/tools/shared/ToolHero.tsx`](../../src/components/tools/shared/ToolHero.tsx), [`ToolSelectInput.tsx`](../../src/components/tools/shared/ToolSelectInput.tsx)
- Unused primitives under [`src/components/ui/`](../../src/components/ui/) (accordion, dialog, hover-card, morph-surface, scroll-area, separator, tooltip) **only if** no imports remain — dependency prune (`motion`, etc.) comes **after** confirming morph-surface and dependents.

**shadcn / UI primitives:** If you **re-add** a removed primitive via the CLI, use `pnpm dlx shadcn@latest add <name> --dry-run`, then `pnpm dlx shadcn@latest add <name> --diff <file>` per generated file. Do **not** use `--overwrite` without explicit maintainer approval. Pick an **explicit registry** when adding community blocks—do not guess. See [Appendix: shadcn (UI recovery)](#shadcn-ui-recovery-after-deletes).

Update stale **[docs/darlingmartech-component-inventory.md](../darlingmartech-component-inventory.md)** / **[docs/homepage-section-audit.md](../homepage-section-audit.md)** if removed components are still named there.

### Phase B — Remove typecheck blockers (completed May 2026)

Removed unused / broken experiments: former `Reveal.tsx`, `ScrollStagger.tsx`, `SemanticSection.tsx`, `src/components/visual/*`, and the unused `src/components/motion/*` barrel (homepage uses Framer Motion + `SectionReveal` / `AnimateOnScroll`). Phase prompts under [`docs/agent/cursor-prompts/`](../agent/cursor-prompts/) were aligned with this stack (no `Reveal` / `ScrollStagger`, verification via `pnpm verify`); refresh those files when shell or motion assumptions change again.

### Phase C — Archive larger dead clusters (**completed** — May 2026)

These clusters were **moved** (not silently deleted) to [`_archive_legacy/runtime-slimming-2026-05/`](../../_archive_legacy/runtime-slimming-2026-05/) with path mirroring and notes in [`README.md`](../../_archive_legacy/runtime-slimming-2026-05/README.md). Restore from that folder if something was archived too aggressively.

Original scope (now in the archive):

- [`src/components/report/*`](../../src/components/report/) (as archived copies)
- [`src/components/3d/scenes/home/*`](../../src/components/3d/scenes/home/)
- [`src/components/interactive/BentoDiagnosisGrid.tsx`](../../src/components/interactive/BentoDiagnosisGrid.tsx)
- [`src/components/3d/core/SiteShell.tsx`](../../src/components/3d/core/SiteShell.tsx) — distinguish from live [`SiteShell`](../../src/components/layout/site-shell.tsx) in layout.

### Phase D — Collapse global 3D canvas shell (after Phase C proof)

- Remove **`ViewCanvasHost`** from [`src/components/layout/site-shell.tsx`](../../src/components/layout/site-shell.tsx).
- If no live **View** producers remain, delete [`ViewCanvasHost.tsx`](../../src/components/3d/core/ViewCanvasHost.tsx) and [`ViewCanvas.tsx`](../../src/components/3d/core/ViewCanvas.tsx).

Verify **`/studio`** (and any R3F surfaces) still work — they may keep **`three`** / **`@react-three/*`** even if the global host goes away.

### Phase E — Dependency prune (completed audit May 2026)

**Removed (unused in `src/`):**

- **`motion`** — only used by deleted `morph-surface.tsx`.
- **`@gsap/react`** — no `useGSAP` / imports in `src/`.
- **`ogl`** — no imports in active app code (legacy JSX under `_archive_legacy/` only).

**Kept (still required):**

- **`three`**, **`@react-three/fiber`**, **`@react-three/drei`** — [`StudioHeroScene.tsx`](../../src/components/animations/StudioHeroScene.tsx) / studio stack.
- **`gsap`** — [`src/lib/lenis.ts`](../../src/lib/lenis.ts) (ScrollTrigger sync), [`DiagnosticHudCard.tsx`](../../src/components/animations/DiagnosticHudCard.tsx).
- **`lenis`** — smooth scroll via [`SmoothScrollProvider`](../../src/components/providers/SmoothScrollProvider.tsx) on `/studio`.
- **`framer-motion`** — homepage and many client sections.

Re-run this audit when adding new animation dependencies.

---

## Explicit non-targets (follow-up review only)

- **Newsletter** shapes: `NewsletterSignup` vs `NewsletterEmailForm` plus `/api/newsletter`.
- **Growth System Audit** and broader **tools taxonomy** — product decisions, not orphan cleanup.

**Docs / audits / scripts:** Out of scope for this slimming pass unless they block compilation or verification — except **`validate-homepage-proof`** coupling noted above.

---

## Test plan

1. **`rg`** (or IDE global search) for each removed/archived symbol — no stale imports or string references that must remain live.
2. **`pnpm lint`**, **`pnpm typecheck`**, **`pnpm build`**, **`pnpm verify`**.
3. **Browser smoke** (manual or MCP automation: navigate → snapshot → scroll key sections → screenshot as needed):
   - `/` (homepage)
   - [`/proof`](../../src/app/proof/) (hub) and **at least one** [`/proof/[slug]`](../../src/app/proof/) detail page
   - `/tools`, `/services`, one `/services/[slug]`, `/contact`, `/studio`
   - Optional if time allows: `/problems` and an extra proof slug
   - Spot-check **narrow viewport** (mobile width) on home and proof hub for layout regressions
4. After canvas removal: no blank fixed overlay, no console errors, no regressions on `SiteShell` routes.

For agent-driven browser passes after slimming, see [Appendix: Browser automation](#browser-automation-post-slimming-qa).

---

## Assumptions

- Scope limited to runtime code and direct supporters; **archive-first** for large/experimental clusters; **tiny** proven orphans may hard-delete.
- Public routes, redirects ([`next.config.ts`](../../next.config.ts)), and APIs preserved unless explicitly deprecated.
- Unrelated worktree changes stay untouched during cleanup commits.

---

## Appendix: platform and QA capabilities

Short decision rules for agents extending this repo (routing, browser QA, shadcn, Cloudinary). **Expected result** for each: predictable routing in git, safe UI recovery, and proof media that stays decision-useful.

### Routing (Vercel vs Next)

- **This repo today:** Stable SEO and legacy URL moves live in [`next.config.ts`](../../next.config.ts) `redirects()` (for example `/work` → `/proof`, `/lab` → `/tools`). Prefer that for path renames and canonical URL changes so behavior is **reviewable in git**.
- **When not to add root `middleware.ts`:** Avoid middleware for simple redirects already expressed in `next.config.ts`. For very large static redirect maps, prefer **Vercel Bulk Redirects** (or keep paths in config) instead of bespoke edge logic.
- **When edge / platform routing matters:** Geo- or header-based rewrites, A/B rewrites, or operational headers/CORS without a full redeploy (Vercel **project-level routes** or `vercel.ts` / `@vercel/config` if the project adopts them). Do not confuse **Vercel Routing Middleware** with **Next.js 16+ `proxy.ts`** (network boundary; not a substitute for real auth on protected data).
- **Result:** Default path and SEO changes stay in `next.config.ts` unless product explicitly needs request-time interception.

### Browser automation (post-slimming QA)

- After **`pnpm verify`**, optionally run a **browser pass** (local dev or preview URL): hit the routes in the [Test plan](#test-plan); use snapshot + scroll + screenshot to confirm shell, proof cards, and tools surfaces.
- **Result:** Layout and client-boundary regressions surface before merge; reserve console/network inspection for targeted debugging.

### shadcn (UI recovery after deletes)

- Prefer **existing** [`src/components/ui/`](../../src/components/ui/) sources before re-adding from a registry. Use `pnpm dlx shadcn@latest info` and `add … --dry-run` / `--diff <file>`; never `--overwrite` without explicit approval. Follow [AGENTS.md](../../AGENTS.md) (Tailwind v4, data-first content).
- **Result:** Restored primitives match the project’s `components.json` and local conventions; no silent clobber of customized UI files.

### Cloudinary (proof and stack media)

- **Repo-first:** Grep and read [`src/data/work/`](../../src/data/work/), [`src/data/proof.ts`](../../src/data/proof.ts), and related modules for `publicId` / `cloudinary` before broad media-library search. Never invent public IDs.
- Use stack logos to **support the implementation story** (grouped by contribution), not as a vendor wall. Match proof hero/detail imagery to the **buyer scenario** and project type; **Clinical Compass** stays on decision-tree / protocol-support imagery—not generic intake or CRM visuals.
- Prefer minimal transforms (`f_auto`, `q_auto`, responsive width); add crop/fill only when the component contract requires it.
- **Result:** Assets stay traceable to typed data, accessible (alt text + visible labels for logos), and aligned with proof taxonomy strategy.

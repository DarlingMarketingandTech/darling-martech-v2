# Darling MarTech v2 Notes

Primary implementation rules live in **`AGENTS.md`**. Revamp sequencing and runtime cleanup: **`docs/revamp/codex-implementation-plan.md`**, **`docs/revamp/runtime-slimming-plan.md`**.

## Analytics (typed client events)

- Events are typed in **`src/lib/analytics.ts`**; add new names to `CLIENT_ANALYTICS_EVENTS` before using them from product code with `captureClientEvent`.
- Current allowlist includes: `hero_cta_clicked`, `capability_card_clicked`, `proof_card_clicked`, `contact_form_submitted`, `tool_quiz_started`, `tool_completed`, `quiz_completed`, `geo_audit_completed`, `geo_audit_report_requested`, `closing_cta_clicked`.
- Do not introduce ad hoc string event names outside that union for paths that should stay typed.
- Some tool flows may still use PostHog directly (`capture`, tool-specific names); prefer converging on `analytics.ts` when touching those surfaces.

## Homepage (live code)

- **`src/app/page.tsx`** renders **`<HomeV3 />`** (`src/components/home-v3/*`). Canonical homepage copy/tokens: **`homepageV4Data`** in `src/data/homepage.ts`.
- Strategy docs: `docs/revamp/homepage-strategy.md`, ADR `docs/revamp/adrs/002-homepage-bottleneck-taxonomy.md`.

## Verification

Use **`pnpm verify`** (lint + typecheck + homepage-proof validation + build). See `AGENTS.md` for the full gate.

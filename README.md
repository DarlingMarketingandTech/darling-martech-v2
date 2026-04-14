# Darling MarTech v2

Ground-up rebuild of `darlingmartech.com` as a typed, data-driven Next.js App Router site.

## Stack

- `Next.js 15`
- `TypeScript` in strict mode
- `Tailwind CSS v4`
- `pnpm`
- Typed content modules under `src/data`

## Project Rules

- Read `CLAUDE.md` before making architecture or implementation decisions.
- Treat `src/types/index.ts` and `src/data/*` as the content contract layer.
- Do not hardcode approved site copy directly in JSX.
- Keep server components as the default unless interactivity requires a client boundary.

## Local Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm verify
```

## Build Workflow

1. Read the relevant copy docs in `docs/`.
2. Create or update the matching typed data file in `src/data/`.
3. Build the page or component against those typed exports.
4. Run `pnpm verify` before closing the batch.

## Environment

Use `.env.example` as the source of truth for required local variables.

### Vercel env contract

- `ENABLE_LIVE_INTEGRATIONS=false` keeps preview and local testing side-effect safe by short-circuiting external sends.
- Set `ENABLE_LIVE_INTEGRATIONS=true` only when Resend, Loops, n8n, PostHog, and Supabase are ready for real traffic.
- `NEXT_PUBLIC_*` variables are the canonical public/runtime keys for this repo and should be mirrored into Vercel Preview and Production.
- `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `LOOPS_API_KEY`, `N8N_WEBHOOK_URL_CONTACT`, and `N8N_WEBHOOK_URL_TOOL` stay server-only.

## Verification Standard

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- Browser validation of nav, CTA paths, and console health
- Preview deployment validation once Vercel is wired

## Local And Preview Gates

1. Run `pnpm verify` before shipping any batch.
2. Start the app with `pnpm dev` for route and API smoke checks.
3. Confirm the main pages return `200`: `/`, `/problems`, `/proof`, `/tools`, `/process`, `/about`, `/contact`.
4. Exercise `/api/contact`, `/api/subscribe`, and `/api/tool-complete` in mock mode first.
5. Keep `ENABLE_LIVE_INTEGRATIONS=false` in local and Preview until external services and tables are confirmed.
6. After Vercel is linked, mirror the env contract into Preview and rerun the same smoke checks against the preview URL.
7. Only enable live integrations after Preview proves the routes, env vars, and provider credentials are correct.

## Deployment Notes

- Preview and deployment checks should use the Vercel integration once the project is linked.
- Sitemap generation runs automatically after `pnpm build`.

## Current Focus

The current implementation priority is the data-model and copy-ingestion foundation that supports all page builds with fewer prompts and less rework.

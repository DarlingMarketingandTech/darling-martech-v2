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

## Verification Standard
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- Browser validation of nav, CTA paths, and console health
- Preview deployment validation once Vercel is wired

## Deployment Notes
- Preview and deployment checks should use the Vercel integration once the project is linked.
- Sitemap generation runs automatically after `pnpm build`.

## Current Focus
The current implementation priority is the data-model and copy-ingestion foundation that supports all page builds with fewer prompts and less rework.

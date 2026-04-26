# Darling MarTech v2 Agent Guide

This file is the primary source of truth for implementation rules in this repo.

## Stack and framework

- Next.js 15 App Router
- React 19
- strict TypeScript
- Tailwind CSS v4
- `pnpm`

Do not assume older Next.js patterns are valid here. Before changing framework-level behavior, verify against the installed repo reality first:

- current app structure under `src/app`
- installed `next` package files
- existing local patterns already working in this repo

## Source-of-truth order

When instructions conflict, use this order:

1. current repo reality
2. `AGENTS.md`
3. `docs/revamp/*`
4. current product and implementation docs in `docs/*`

## Core implementation rules

- `src/types` and `src/data` are the content contract layer.
- Do not hardcode approved content directly in JSX.
- Update `src/types` and `src/data` before JSX when content structure changes.
- Reuse existing components before creating new ones.
- Keep server components as the default unless a client boundary is required.
- Make small, reviewable changes. Do not redesign unrelated surfaces during scoped work.

## Content architecture

This repo is data-first.

- Typed shape belongs in `src/types/index.ts` and related type files.
- Approved content belongs in `src/data/*`.
- Pages and sections should compose typed data, not become the source of truth themselves.

When adding or changing content structure:

1. confirm the contract in `src/types`
2. update the matching module in `src/data`
3. adapt components/routes to consume the typed exports

## Proof taxonomy strategy

Upcoming revamp work should organize proof by decision usefulness, not by client hierarchy.

Prioritize:

- project type
- buyer scenario
- complexity
- scope shape
- decision usefulness

Avoid making proof primarily about:

- company-first organization
- parent-company hierarchy
- client-family nesting
- industry-first grouping

Important strategic constraints:

- Do not preserve or reintroduce a Pike Medical parent proof concept.
- Do not promote the Pike Medical parent brand.
- Important sub-projects should be discoverable without deep nesting.
- Client names are optional context, not the primary taxonomy.

See `docs/revamp/proof-taxonomy-strategy.md`.

## Growth System Audit strategy

The low-trust entry path should consolidate around the Growth System Audit.

- Low trust: run the Growth System Audit
- Mid trust: see similar proof
- High trust: book a diagnostic call

When tools overlap, prefer consolidating them into the Growth System Audit strategy instead of expanding one-off tool experiences.

See `docs/revamp/growth-system-audit-strategy.md`.

## Services and CTA strategy

- Services should be framed as buyer-facing project paths, not task menus.
- Avoid CTA overload on a single page or section.
- Match CTA intensity to buyer trust stage.
- Do not add multiple competing primary CTAs to the same surface without a clear reason.

## Verification

Run `pnpm verify` before completing implementation work.

Standard quality gate:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm verify
```

If visible UI changed, also validate the affected route behavior in-browser.

Do not claim work is complete if verification fails. If a failure is unrelated to your changes, say so explicitly.

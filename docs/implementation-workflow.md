# Darling MarTech Implementation Workflow

## Purpose
Reduce prompt churn by making each implementation batch follow the same packet, build order, and verification standard.

## Standard Build Order
1. Read `CLAUDE.md` and the relevant copy docs in `docs/`.
2. Update `src/types/index.ts` only if the data contract is missing something.
3. Create or update matching `src/data/*` modules first.
4. Build the route or component against typed data exports.
5. Run `pnpm verify`.
6. Validate the route in browser automation if a visible surface changed.

## Prompt Packet Template
Use this exact structure when kicking off a batch:

```md
Phase:
Target routes:
Relevant copy docs:
Data files to create or update first:
Components to implement:
Verification required:
```

## Definition Of Done
- No template defaults remain in touched files.
- No approved site copy is hardcoded in JSX.
- Metadata exists for every touched route.
- CTA destinations align with the intended trust ladder stage.
- `pnpm lint` passes.
- `pnpm typecheck` passes.
- `pnpm build` passes.

## Parallel Agent Pattern
- Agent 1: data modeling and content mapping.
- Agent 2: route or component implementation.
- Agent 3: verification, browser checks, and regression review.

## MCP Usage
- `cursor-ide-browser`: local and preview route validation.
- `plugin-vercel-vercel`: deployment and build log inspection.
- `user-github`: PR review and status once collaboration begins.
- `plugin-cloudinary-cloudinary-analysis`: authenticate before media-heavy work.

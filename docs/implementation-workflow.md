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

## Phase 4 — Operator checklist (n8n · Twenty · Loops)

Repo API routes already emit webhooks and emails when `ENABLE_LIVE_INTEGRATIONS=true`. Remaining work is **outside this codebase**:

1. **n8n** — Deploy (e.g. Railway), create workflows that accept `/api/contact` and `/api/tool-complete` payloads, transform fields, and call Twenty or Loops as needed. Paste webhook URLs into `N8N_WEBHOOK_URL_CONTACT` and `N8N_WEBHOOK_URL_TOOL`.
2. **Twenty CRM** — Deploy, obtain API or workflow ingestion path from n8n, import historical contacts when ready.
3. **Loops** — Create the **5-email welcome** sequence for tool leads; connect triggers from n8n or Loops automations when contacts are tagged with `toolSlug`.
4. **Newsletter broadcast** — Configure a Loops **broadcast** or campaign for footer `/api/newsletter` subscribers (separate from transactional Resend).

Smoke-test order matches comments at the bottom of `.env.example`.

## Editorial — blog and Loops

- **Blog:** Replace or extend entries in `src/data/blog.ts` from the content calendar; keep `featured` flags aligned with the Resources hub.
- **Loops broadcast:** Not implemented in code — schedule in Loops after domain and audience are verified (see Phase 4 above).

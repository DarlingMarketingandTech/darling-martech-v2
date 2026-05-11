# Phase 08 Cursor Prompt: Metadata, Headers, and Trust Layer

Goal:
Improve technical trust without disrupting UX.

Tasks:
1. Add `src/lib/security/headers.ts`.
2. Wire headers into `next.config.ts`.
3. Review all page metadata and canonical URLs.
4. Keep existing redirects.
5. Ensure `/tools/growth-system-audit` remains the canonical low-trust entry path.

Acceptance criteria:
- Existing redirects still work.
- Headers do not break Cloudinary, Plausible, PostHog, Vercel Analytics, or Cal links.
- `pnpm build` passes.

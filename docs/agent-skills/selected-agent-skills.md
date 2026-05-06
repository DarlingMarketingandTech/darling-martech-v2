# Selected Agent Skills — Darling MarTech v2

Audit date: 2026-05-06
Scope: skills installed under `.claude/skills/` and `.agents/skills/`.

All eleven skills installed successfully and ship a readable `SKILL.md` with valid frontmatter. None of them currently conflict with `AGENTS.md`, `CLAUDE.md`, `docs/revamp/*`, the 3-bottleneck homepage taxonomy, the Growth System Audit CTA strategy, or the restrained-motion / reduced-motion rules. A few skills are off-charter for this product and should be treated as out-of-scope unless explicitly invoked.

## Repo-aligned skills (`.agents/skills/`)

### accessibility
- **Installed:** yes — [.agents/skills/accessibility/SKILL.md](../../.agents/skills/accessibility/SKILL.md)
- **Use for:** WCAG 2.2 audits, screen-reader and keyboard-nav reviews, remediating focus / contrast / ARIA issues across the site and homepage sections.
- **Aligns with:** AGENTS.md "Verification" gate, CLAUDE.md quality bar (#5 accessibility, #7 motion-is-useful), reduced-motion rules.
- **When not to use:** copy/positioning work, motion choreography, or content-strategy questions — those are decided by `docs/revamp/*`, not a generic a11y skill.

### analytics-tracking
- **Installed:** yes — [.agents/skills/analytics-tracking/SKILL.md](../../.agents/skills/analytics-tracking/SKILL.md)
- **Use for:** auditing or extending the typed PostHog / Vercel Analytics events listed in CLAUDE.md (`hero_cta_clicked`, `audit_started`, `capability_card_clicked`, etc.) and ensuring the Growth System Audit funnel is fully instrumented.
- **Warning:** the skill leans toward GA4 / GTM / Segment / Mixpanel patterns. Darling MarTech v2 is PostHog-first with Vercel Analytics. Do **not** let it introduce GTM, GA4, or Segment unless a deliberate stack change is requested.
- **When not to use:** ad-hoc one-off `console.log`-style telemetry, or anything that would create scattered inline tracking calls (CLAUDE.md mandates typed analytics helpers).

### gh-fix-ci
- **Installed:** yes — [.agents/skills/gh-fix-ci/SKILL.md](../../.agents/skills/gh-fix-ci/SKILL.md)
- **Use for:** triaging failing GitHub Actions checks on a PR, summarizing the failing log, and proposing a fix plan before edits.
- **Aligns with:** "Make small, reviewable changes" and the explicit-approval-before-implement posture in AGENTS.md.
- **When not to use:** Buildkite or other non-GitHub providers (skill explicitly scopes them out), or local `pnpm verify` failures — diagnose those directly instead of through the CI plumbing.

### next-best-practices
- **Installed:** yes — [.agents/skills/next-best-practices/SKILL.md](../../.agents/skills/next-best-practices/SKILL.md)
- **Use for:** App Router / RSC boundary questions, async API and metadata patterns, route handler hygiene, image/font optimization on Next 15 + React 19.
- **Aligns with:** AGENTS.md stack rules ("server components as default unless a client boundary is required").
- **Warning:** the skill is `user-invocable: false` — pull rules from it as a reference, do not surface it as a slash command.
- **When not to use:** content-architecture decisions (those flow from `src/types` → `src/data` per AGENTS.md), or any homepage taxonomy debate.

### supabase
- **Installed:** yes — [.agents/skills/supabase/SKILL.md](../../.agents/skills/supabase/SKILL.md)
- **Use for:** Supabase-touching work only — auth/session, RLS, migrations, Edge Functions, `@supabase/ssr` integration with Next 15.
- **Warning:** skill mandates fetching `supabase.com/changelog.md` before implementing; respect that, since training-data Supabase APIs drift quickly.
- **When not to use:** marketing copy, homepage sections, or anything that does not touch the Supabase client/server surface. Most homepage work does not need this skill.

### web-quality-audit
- **Installed:** yes — [.agents/skills/web-quality-audit/SKILL.md](../../.agents/skills/web-quality-audit/SKILL.md)
- **Use for:** Lighthouse-style sweeps across performance, a11y, SEO, and best practices — particularly useful before declaring a homepage revamp shippable.
- **Aligns with:** CLAUDE.md "calm, sharp, measurable systems" prime directive and the pre-finish quality bar.
- **When not to use:** when only a single dimension is in scope (use `accessibility` or a targeted perf pass instead) or when the user wants positioning/messaging review — that lives in `docs/revamp/*`.

## Generic Anthropic skills (`.claude/skills/`)

These shipped with the Claude Code install and are general-purpose. They do not conflict with the product, but most are off-charter for the marketing site and should be treated as opt-in tools, not defaults.

### artifacts-builder
- **Installed:** yes — [.claude/skills/artifacts-builder/SKILL.md](../../.claude/skills/artifacts-builder/SKILL.md)
- **Use for:** building standalone claude.ai HTML artifacts (React 18 + Vite + shadcn) for prototypes, internal demos, or one-off deliverables produced *outside* this repo.
- **Warning:** stack is React 18 + Vite, not the Next 15 / React 19 / Tailwind 4 product stack. Never let it write into `src/` or otherwise alter the live product.
- **When not to use:** any change to the Darling MarTech v2 application code — this is the wrong stack and would violate AGENTS.md "current repo reality" precedence.

### canvas-design
- **Installed:** yes — [.claude/skills/canvas-design/SKILL.md](../../.claude/skills/canvas-design/SKILL.md)
- **Use for:** poster, PDF, or PNG static-art deliverables outside the app (pitch artifacts, internal collateral).
- **When not to use:** anything web-rendered. The product's visual language is governed by `docs/revamp/*` and CLAUDE.md ("Dark Current"), not an open-ended design philosophy generator. Do **not** use it to invent homepage visuals or backgrounds.

### dev-browser
- **Installed:** yes — [.claude/skills/dev-browser/SKILL.md](../../.claude/skills/dev-browser/SKILL.md)
- **Use for:** in-browser verification of routes after UI changes (CLAUDE.md quality bar #4, AGENTS.md "validate the affected route behavior in-browser"), screenshotting components for review, light scraping during research.
- **Warning:** must respect "no secrets" boundary in CLAUDE.md — never log into authenticated production surfaces using stored credentials.
- **When not to use:** crawling third-party sites at scale, or any task `firecrawl` covers more cleanly.

### image-enhancer
- **Installed:** yes — [.claude/skills/image-enhancer/SKILL.md](../../.claude/skills/image-enhancer/SKILL.md)
- **Use for:** sharpening screenshots for documentation, PR descriptions, or proof tiles that need crisper source assets.
- **When not to use:** generating new imagery from scratch, or as a substitute for proper export from a design source. Do not enhance proof or client imagery in ways that misrepresent the original work.

### theme-factory
- **Installed:** yes — [.claude/skills/theme-factory/SKILL.md](../../.claude/skills/theme-factory/SKILL.md)
- **Use for:** styling *standalone artifacts* (slide decks, throwaway HTML reports) with one of its preset themes.
- **Warning:** the product has its own design tokens, semantic color tokens, and "Dark Current" visual identity. Do **not** apply theme-factory presets to the Darling MarTech v2 app — that would override the design system.
- **When not to use:** any work inside this repo's `src/` tree.

## Conflict check — none found

| Authority | Status | Notes |
|---|---|---|
| AGENTS.md | clean | No skill mandates older Next patterns, hardcoded JSX content, or bypassing `pnpm verify`. |
| CLAUDE.md | clean | Analytics events, motion restraint, three-bottleneck taxonomy, and Growth System Audit CTA are not contradicted by any skill. |
| `docs/revamp/homepage-strategy.md` + ADR 002 | clean | No skill imposes a 4-bucket homepage taxonomy or alternate hero structure. |
| `docs/revamp/growth-system-audit-strategy.md` | clean | `analytics-tracking` reinforces audit funnel measurement; no skill competes with the audit as the low-trust CTA. |
| `docs/revamp/proof-taxonomy-strategy.md` | clean | No skill reintroduces company-first or Pike Medical proof grouping. |
| Reduced-motion / restrained animation rules | clean | No skill pushes particle fields, scroll-jacking, or always-on 3D. `canvas-design` and `theme-factory` are static-output / out-of-app and do not affect motion. |

## Cross-cutting warnings

- **Stack drift risk.** `artifacts-builder` and `theme-factory` carry their own stacks/themes. Keep them sandboxed to deliverables outside `src/`.
- **Analytics drift risk.** `analytics-tracking` may suggest GA4 / GTM. PostHog + Vercel Analytics is the contract — reject divergent suggestions unless a stack change is explicitly requested.
- **Visual identity drift risk.** `canvas-design` invents new philosophies on demand. The product already has "Dark Current"; do not let canvas-design override it.
- **External-fetch hygiene.** `supabase` and `dev-browser` both reach out to external resources. Respect CLAUDE.md security boundaries — no credentials, tokens, or session files into the repo.

## Source-of-truth order (skill precedence)

When a skill suggestion conflicts with any of the following, the skill loses:

1. Current repo reality (`src/`, `package.json`, existing data contracts in `src/types` + `src/data`).
2. `AGENTS.md` (primary implementation source of truth).
3. `docs/revamp/*` (homepage strategy, ADRs, proof taxonomy, audit strategy).
4. `docs/*` (broader product/operations docs).
5. External skills (everything in `.agents/skills/*` and `.claude/skills/*`).

No skill — repo-aligned or generic — may override AGENTS.md, CLAUDE.md, `docs/revamp/*`, or the 3-bottleneck homepage taxonomy.

## Mirroring policy

Skills are **not** mirrored between `.agents/skills/` and `.claude/skills/`, and they should not be. The two folders serve different roles:

- `.agents/skills/` — repo-aligned, day-to-day toolkit invoked during product work.
- `.claude/skills/` — generic Anthropic skills, situational, mostly for out-of-app deliverables.

No skill currently needs to live in both folders. If a `.claude/skills/*` skill ever becomes part of the day-to-day product workflow, fork it into `.agents/skills/` rather than mirror — repo-aligned skills should be tightened with stack-specific guardrails before promotion.

## Coolify / Supabase readiness notes

- **`supabase` skill** is the only one that should be invoked for Supabase work (auth, RLS, migrations, `@supabase/ssr` in Next 15). Honor its mandate to fetch `supabase.com/changelog.md` before implementing — training-data Supabase APIs drift quickly.
- No installed skill is Coolify-specific. Coolify deploys, Docker config, and self-hosted infra should be handled directly against `AGENTS.md` and the deployment docs, not through a generic skill. `next-best-practices/self-hosting.md` is the closest reference and is safe to consult for self-host considerations.
- `gh-fix-ci` is safe for CI plumbing related to Coolify webhooks/triggers as long as the failure is in GitHub Actions.
- Never let `supabase`, `dev-browser`, or any other skill read `.env*` files or print credentials. Coolify env-var management lives outside the repo.

## Homepage strategy protection notes

The 3-bottleneck homepage contract (CLAUDE.md + `docs/revamp/homepage-strategy.md` + ADR 002) is non-negotiable. Skill-specific guardrails:

- **`canvas-design` and `theme-factory`** — never apply to homepage visuals. The homepage uses "Dark Current" and the repo's semantic tokens.
- **`artifacts-builder`** — never writes into `src/`. Homepage components are Next 15 + React 19, not React 18 + Vite.
- **`analytics-tracking`** — must reinforce, not replace, the events listed in CLAUDE.md (`hero_cta_clicked`, `audit_started`, `capability_card_clicked`, etc.). Reject GA4/GTM/Segment suggestions.
- **`next-best-practices`** — safe as a reference for RSC boundaries on homepage sections, but content/taxonomy decisions flow from `docs/revamp/*`, not the skill.
- **`web-quality-audit` and `accessibility`** — safe and encouraged before declaring a homepage revamp shippable.
- No skill may propose a 4-bucket (Foundation / Conversion / Systems / Intelligence) homepage. That taxonomy belongs to `/services` and `/capabilities`, per ADR 002.

## Quarantine candidates

None. All eleven skills are either actively useful (`.agents/skills/*`) or safely sandboxed for out-of-app work (`.claude/skills/*`). Re-evaluate if:

- `analytics-tracking` ever introduces GA4/GTM/Segment into the codebase against the PostHog + Vercel Analytics contract.
- `canvas-design` or `theme-factory` is invoked against `src/`.
- `artifacts-builder` is invoked against the live product.

Any of those should immediately move the offending skill to a quarantine list and trigger a follow-up audit.

## Recommendations

- Treat the six `.agents/skills/*` as the day-to-day toolkit for this repo.
- Treat the five `.claude/skills/*` as situational, mostly for artifacts and assets *outside* the application.
- Re-run this audit when new skills are added, or when `docs/revamp/*` materially changes.
- See [`skill-audit-report.md`](skill-audit-report.md) for the dated audit findings.

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

## Homepage and shell (current runtime)

- Production homepage: `src/app/page.tsx` renders `<HomeV3 />` from `src/components/home-v3/*`. Primary homepage data: `homepageV4Data` in `src/data/homepage.ts`. Strategy contract: `docs/revamp/homepage-strategy.md` and `docs/revamp/adrs/002-homepage-bottleneck-taxonomy.md`.
- Bookmark compatibility: `src/app/home-v3/page.tsx` redirects to `/`.
- Global layout: `SiteShell` (`src/components/layout/site-shell.tsx`) wraps most pages. There is **no site-wide R3F canvas** in the shell; use targeted 3D only where a route or component opts in (for example `/studio`).

## Runtime slimming and archives

- Phased orphan cleanup checklist: `docs/revamp/runtime-slimming-plan.md`.
- Experimental bundles moved out of `src/` live under `_archive_legacy/` at the repo root (excluded from TypeScript — not part of the app build graph).
- Homepage proof visuals governance: `.cursor/rules/homepage-proof-rebuild.mdc` and `scripts/validate-homepage-proof.ts`.

## Verification

Run `pnpm verify` before completing implementation work.

Standard quality gate:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm verify
```

Prefer ESLint through those scripts (`pnpm lint`, or `pnpm exec eslint .` if invoking ESLint directly) so the version matches devDependencies. A globally installed `eslint` CLI (for example via `npm install -g eslint`) can diverge from the repo pin.

If visible UI changed, also validate the affected route behavior in-browser.

Do not claim work is complete if verification fails. If a failure is unrelated to your changes, say so explicitly.


<claude-mem-context>
# Memory Context

# [darling-martech-v2] recent context, 2026-05-10 7:57pm EDT

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 50 obs (23,343t read) | 2,742,404t work | 99% savings

### May 6, 2026
S26 Resolve the 3-buckets vs 4-buckets homepage strategy conflict between CLAUDE.md and live homepage data (May 6, 8:07 AM)
S25 Resolve homepage 3-buckets vs 4-buckets strategy conflict — determine which taxonomy should drive the homepage structure and messaging alignment (May 6, 11:11 AM)
S27 Resolve the 3-buckets vs 4-buckets homepage strategy conflict between CLAUDE.md and live homepageV4Data (May 6, 11:12 AM)
S28 Resolve the 3-buckets vs 4-buckets homepage strategy conflict — CLAUDE.md updated with 3-bottleneck contract (May 6, 11:19 AM)
S29 Resolve the 3-buckets vs 4-buckets homepage strategy conflict — fully resolved with CLAUDE.md, strategy doc, and ADR (May 6, 11:19 AM)
S30 Resolve the 3-buckets vs 4-buckets homepage strategy conflict — fully resolved, all artifacts verified clean (May 6, 11:22 AM)
S31 Agent Skills Audit for Darling MarTech v2 — review all installed skills, check SKILL.md readability, flag conflicts, and update docs/agent-skills/selected-agent-skills.md (May 6, 12:11 PM)
S32 Agent Skills Audit — documentation and safety review of all installed skills under .claude/skills and .agents/skills for Darling MarTech v2 (May 6, 1:25 PM)
S33 Phase 0 Audit of Darling MarTech v2 homepage revamp — identify files to edit, current GlassPanel usage, raw color token usage, CTA overload points, and backend/analytics opportunities before implementing calm-down and conversion flow improvements. (May 6, 1:30 PM)
S34 Darling MarTech v2 homepage and systems improvements — Phase 0 audit + Phase 1 design token migration complete, verification run with known pre-existing build failure. (May 6, 4:59 PM)
### May 10, 2026
194 10:08a 🔵 layout/ vs layout-v3/: Two Distinct Component Directories with Different Abstraction Levels
195 " 🔵 trackToolEvent Is a Parallel Untyped Analytics System Alongside captureClientEvent
196 " 🔵 Lenis + GSAP ScrollTrigger Coupling in lib/lenis.ts — Flagged in Code as High-Risk Mount
185 " 🔵 All Verification Commands Blocked by Windows EPERM Sandbox Error
186 " 🔵 Analytics Event Registry Drifts from CLAUDE.md Spec
187 " 🔵 HomeV3 Root Component Marked "use client" — Forces Full Homepage into Client Bundle
188 " 🔵 BottleneckGridV3 Renders ctaSupporting Text But Drops the CTA Button
189 " 🔵 Contact and Newsletter API Routes Lack Rate Limiting and Spam Protection
190 " 🔵 API Route Architecture: tool-complete Uses Three-Sink Fan-Out with Idempotency
191 " 🔵 CTA System Centralized in src/lib/cta.ts with Pathname-Aware Header Swap
192 " 🔵 GrowthBottleneckQuizClient: Five-Question Vote-Based Diagnostic with Trust-Ladder Result Routing
193 " 🔵 Homepage Strategy Codified in docs/revamp/homepage-strategy.md with Hard Taxonomy Rules
198 10:09a 🔵 Full App Route Tree and File Inventory Mapped
199 " 🔵 Package.json Dependency Audit: Multiple Animation Libraries and Potential Bundle Risk
200 " 🔵 AGENTS.md Canonical Rules Confirmed: Data-First, Server-First, Proof-Taxonomy Priority
201 " 🔵 Analytics Event Coverage Gap: Tool Events Use Window.posthog Fallback, Not Typed Client
202 " 🔵 API Route Inventory: No Rate Limiting, No CSRF, Newsletter Route Missing appEnv Pattern
203 " 🔵 Supabase Schema: 5 Tables Confirmed with Typed Operations
204 " 🔵 SEO Infrastructure: Redirects, Metadata Builder, and Sitemap Config Confirmed
205 " 🔵 pnpm lint Fails in Sandbox (EPERM), Passes Outside Sandbox (Clean)
206 " 🔵 src/types/index.ts: Comprehensive Domain Type System Confirmed
207 " 🔵 New Motion Primitives (Reveal, ScrollStagger) Depend on Untracked Hooks and Lib Files
208 " 🔵 trackToolEvent Reads window.posthog Directly — Race Condition Risk vs. analytics.ts Init Path
209 " 🔵 Spam Protection Gap: Only Geo-Audit Email Form Has Honeypot — All Other Lead Forms Unprotected
210 " 🔵 HomeV3 Uses Suspense + Lazy Loading for Below-Fold Sections with Skeleton Fallbacks
211 " 🔵 SystemCanvas: Well-Optimized R3F 3D Decorative Element with frameloop="demand" and dpr Cap
212 10:11a 🔴 TypeCheck Fails: 4 TypeScript Errors from Missing Modules in New Motion Primitives
213 " 🔵 BottleneckGridV3 Is a Pure Server Component — Only Homepage Section Without `use client`
214 " 🔵 homepage.ts Contains Legacy homepageData Alongside Current homepageV4Data — Data Contract Drift
215 " 🔵 prefers-reduced-motion Is Inconsistently Handled Across Three Different Implementation Paths
216 " 🔵 Sitemap and Robots Are Static Files in public/ — Generated by next-sitemap at Build Time, Not Dynamic
217 " 🔵 Escalated pnpm Build Times Out at 124s — No Source Errors Captured
218 " 🔵 pnpm typecheck Fails: .next/types/validator.ts Missing (Build Required First)
219 10:12a 🔵 problems/page.tsx Uses Hardcoded Hex Colors and Legacy Layout Components — Design System Inconsistency
220 " 🔵 No Error Monitoring Service Configured — Production Errors Log to Console Only
221 " 🔵 Cloudinary Config Has Hardcoded Default Cloud Name — Works Without Env Var
222 " 🔵 Subagent Frontend Audit Spawned — 28 Tool Uses, 53k Tokens, Returned Partial Output
223 10:13a 🔵 NewsletterSignup Component Is a UI-Only Stub — No API Call Wired
224 " 🔵 Two Parallel Growth System Audit Implementations Exist with Different Question Sets
225 " 🔵 Six Required Analytics Events Missing from src/ Entirely — Confirmed by ripgrep
226 " 🔵 SiteShell Loads ViewCanvasHost (3D Canvas) on Every Non-Homepage Page
227 " 🔵 Footer Navigation Has Duplicate Links: "Proof Hub" and "Case Studies" Both Point to /proof
228 " 🔵 subscribe API Route Uses Loops + Resend for Email-Gated Tool Result Delivery
229 " 🔵 pnpm build Timed Out in Sandbox; Prior Build Artifacts Present; Two Node Processes Still Running
230 " 🔵 Root Layout: JSON-LD Schema Present, Three Google Fonts, Plausible and Vercel Analytics Dual-Tracked
231 " 🔵 Metadata Coverage: All Dynamic Routes Use generateMetadata; Canonical URLs Are Hardcoded Strings
232 " 🔵 Analytics Funnel Gap: insertSiteEvent Called Only from tool-complete Route, Not from Contact or Proof Views
233 " 🔵 labs.ts: 11 Live Tools Confirmed with Runtime Slug Integrity Checks; Several Tools Have Empty questions/results
234 " 🔵 No Security HTTP Headers Configured Anywhere in next.config.ts or Middleware
235 " 🔵 Data Contract Integrity: Runtime Validation in labs.ts and proof-angles.ts Prevents Slug Drift at Build Time

Access 2742k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>
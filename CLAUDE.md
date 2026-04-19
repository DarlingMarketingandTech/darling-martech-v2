# CLAUDE.md
# Darling MarTech — AI Agent Context File
# Version: 1.1 | Last updated: April 2026
# v1.1: Copy + Blueprint rebuild pass — homepage structure, problems/proof/services depth,
#       outcome filters, quiz (8Q), newsletter API, redirects, expanded about/process/contact.
# This file is the single source of truth for all AI agents working on this codebase.
# Read this entire file before writing any code, creating any files, or making any decisions.
# Do not deviate from the conventions defined here without explicit instruction from Jacob Darling.

---

## QUICK COMMANDS
```bash
npm run dev       # Start dev server (localhost:3000) — primary script in package.json
npm run build     # Production build (+ next-sitemap postbuild)
npm run lint      # ESLint
npm run typecheck # tsc --noEmit
pnpm verify       # lint + typecheck + build (if using pnpm)
pnpm dlx shadcn@latest add [component]   # Add Shadcn component (when used)
```

---

## 0. WHO THIS IS FOR

This file instructs AI coding agents — Claude Code, Cursor, Codex, Gemini — on exactly
how to build the Darling MarTech website. Every architectural, brand, copy, and
workflow decision has already been made. Your job is to implement those decisions
correctly, not to invent new ones.

When in doubt: ask Jacob. Do not guess.

---

## 1. PROJECT OVERVIEW

**Company:** Darling MarTech
**Founder:** Jacob Darling
**Location:** Indianapolis, IN (serves clients nationally)
**Email (public / site-config):** jacob@darlingmt.com
**Domain:** darlingmartech.com
**GitHub Org:** DarlingMarketingandTech

**What this is:** A full ground-up rebuild of darlingmartech.com. Not a revamp of
the existing repo. A new repository, new data architecture, new site structure,
new copy, new conversion philosophy.

**The core mission of this site:**
Transform darlingmartech.com from a portfolio that proves capability into a
diagnostic engine that identifies problems, delivers value before asking for
commitment, and converts at every trust level.

**One-sentence positioning (use this everywhere):**
Darling MarTech is the only martech owner-operator company that builds, integrates,
and runs the full marketing stack for growth-stage businesses — from strategy to
system to execution — with a single accountable lead.

**This is a solo operator business. Jacob Darling is the product.**
All copy, all positioning, all systems reflect a single expert — not a team.
Never write "we" when referring to service delivery. Use "I" or "Jacob."
The solo operator framing is a feature, not a limitation.

---

## 2. BUILD DECISION — READ THIS FIRST

**Decision: Full rebuild from scratch in a new repository.**

The existing `darling-martech` repo (Next.js 16 App Router, TypeScript, CSS Modules,
Framer Motion) has a solid technical foundation but the wrong data architecture,
navigation logic, page structure, and conversion philosophy.

**Do not:**
- Reference, import, or copy patterns from the old `darling-martech` repo
- Revamp or migrate files from the old repo
- Use CSS Modules (use Tailwind instead)

**Do:**
- Build clean from a fresh Next.js 15 + TypeScript + Tailwind + Shadcn/UI init
- Wire new data models correctly from day one
- Keep the old repo live until the new one is fully staged and tested

**Repo created:** `darling-martech-v2` (this repo).

---

## 3. TECH STACK (LOCKED — DO NOT SUBSTITUTE)

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (no CSS Modules, no styled-components)
- **Components:** Shadcn/UI (for interactive primitives: Dialog, Select, Toast, etc.)
- **Animation:** Framer Motion (for scroll animations, page transitions, micro-interactions)
- **Fonts:** Google Fonts via `next/font` — Syne (display), Inter (body), JetBrains Mono (data)

### Backend / Infrastructure
- **Hosting:** Vercel (frontend)
- **Database:** Supabase (PostgreSQL — for form submissions, tool responses, CRM sync)
- **CRM:** Twenty CRM (self-hosted on Railway)
- **Automation:** n8n (self-hosted on Railway)
- **Email (transactional):** Resend + React Email
- **Email (marketing/nurturing):** Loops.so
- **Forms:** Formbricks (open source, self-hostable)
- **Analytics:** Plausible Analytics + Vercel Analytics + PostHog
- **Scheduling:** Cal.com (embed or link)
- **CDN/DNS:** Cloudflare
- **Media/Images:** Cloudinary (all images served from Cloudinary CDN)
- **Package manager:** pnpm (not npm, not yarn)

### AI Dev Stack
- **Primary build agent:** Claude Code (in terminal, full repo access)
- **Daily IDE:** Cursor (with `.cursorrules` configured)
- **Research/architecture:** Gemini 1.5 Pro / 2.0 Flash in Google AI Studio
- **Additional:** Codex for targeted code generation tasks

### Key Package Versions (target)
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "framer-motion": "^11.0.0",
  "@supabase/supabase-js": "^2.0.0",
  "resend": "^3.0.0",
  "posthog-js": "^1.0.0"
}
```

---

## 4. REPOSITORY STRUCTURE (CURRENT)

High-level layout — verify with `src/` when adding files.

```
/
├── CLAUDE.md, .cursorrules, AGENTS.md
├── next.config.ts                     ← includes /work→/proof, /lab→/tools redirects
├── package.json
├── src/
│   ├── app/
│   │   ├── layout.tsx, page.tsx       ← SiteShell; homepage follows copy-doc section order
│   │   ├── problems/                  ← hub + [slug] (6 problem clusters)
│   │   ├── proof/                     ← hub (?outcome=) + [slug] case studies
│   │   ├── services/                  ← capabilities index + [slug] (from data/services.ts)
│   │   ├── tools/                     ← hub, [slug] (QuizEngine), growth-bottleneck-quiz/page.tsx
│   │   ├── process/, about/, contact/, studio/, privacy-policy/
│   │   ├── resources/                 ← hub, blog/[slug], frameworks
│   │   └── api/
│   │       ├── contact/               ← Resend + n8n when live integrations on
│   │       ├── newsletter/            ← Resend audience (optional; see env)
│   │       ├── subscribe/, tool-complete/
│   │
│   ├── components/
│   │   ├── home/                      ← ProofTicker, DiagnosticOrangeBand (homepage bands)
│   │   ├── layout/                    ← SiteHeader, SiteFooter (+ NewsletterSignup client)
│   │   ├── hero/                      ← HomepageHero (structured headline + accent), PageHero
│   │   ├── proof/                     ← ProofCard, ProofGrid, ProofOutcomeFilters, AntiClaimRow
│   │   ├── problems/                  ← ProblemCard, ProblemHubGrid, ProblemNav, ProblemClosingSection
│   │   ├── tools/                     ← QuizEngine, GrowthBottleneckQuizClient, ToolsPreviewBand, …
│   │   ├── process/                   ← ProcessTimeline, PrinciplesGrid, EngagementFormatCards
│   │   ├── about/                     ← FounderHero, CredentialsBar
│   │   ├── contact/                   ← ContactExperience, ContactForm, IntentSelector,
│   │   │                              ContactAlternativePaths, WhatHappensNext, DirectContactBlock
│   │   └── ui/                        ← Button, Eyebrow, SectionHeader, AnimateOnScroll, …
│   │
│   ├── data/
│   │   ├── homepage.ts              ← Hero, proofBar (5 metrics), diagnosticBand, sections copy
│   │   ├── taxonomy.ts              ← PROBLEM_CLUSTERS, OUTCOME_SLUG_LABELS / OUTCOME_SLUG_ORDER, …
│   │   ├── problems.ts              ← Full ProblemPage records (long-form + hub chips)
│   │   ├── labs.ts                  ← All interactive tools + questions + ToolResult rows
│   │   ├── services.ts, process.ts, navigation.ts, routes.ts, contact.ts, about.ts, proof.ts
│   │   └── work/
│   │       ├── work-index.ts
│   │       ├── graston-qualified-leads.ts   ← +212% lead narrative (distinct slug)
│   │       ├── graston-growth-engine.ts     ← automation / overhead emphasis
│   │       ├── pike-medical.ts, russell-painting.ts
│   │
│   ├── lib/
│   │   ├── tool-result-resolvers.ts ← Weighted Growth Bottleneck Quiz scoring → problem cluster
│   │   ├── resend.ts, posthog.ts, analytics.ts, metadata.ts, …
│   │
│   ├── types/index.ts               ← CaseStudy (+ primaryOutcomeSlug, outcomeHeadline), ProblemPage, …
│   └── app/globals.css
```

**Homepage flow (copy doc):** `HomepageHero` → `ProofTicker` → problem grid (2×2, first four clusters) →
`DiagnosticOrangeBand` → “How this works” → proof strip → owner block → tools preview → closing CTA.

**Canonical site copy / blueprint:** `docs/# DARLING MARTECH — COMPLETE SITE COPY.docx.md` and
`docs/DARLING MARTECH — COMPLETE SITE REBUILD BLUEPRINT.docx.md` — treat Copy doc as the source for
wording and section order where they differ.

---

## 5. BRAND SYSTEM (LOCKED — DO NOT CHANGE)

### Color Tokens
Always use these exact hex values. Never approximate.
```css
/* In globals.css as CSS custom properties */
--color-bg:        #0C0C0E;   /* Primary background — Near-Black */
--color-surface:   #13131A;   /* Card/band surface — slightly lighter than bg */
--color-orange:    #F05A28;   /* Operator Orange — primary accent, CTAs, eyebrows */
--color-offwhite:  #F5F4F0;   /* Signal White — body text, off-white elements */
--color-teal:      #0FD9C8;   /* Circuit Teal — secondary accent, tool tags, data viz */
--color-green:     #22C55E;   /* Proof Green — metrics, proof numbers ONLY */
--color-muted:     rgba(245, 244, 240, 0.5); /* Muted text — labels, meta, secondary */
```

In Tailwind classes, always use inline hex:
```
bg-[#0C0C0E]   text-[#F05A28]   text-[#22C55E]   bg-[#13131A]
text-[#F5F4F0]   text-[#0FD9C8]
```

**Color usage rules:**
- `#22C55E` (Proof Green) = metrics and proof numbers ONLY. Nothing decorative.
- `#F05A28` (Orange) = CTAs, eyebrows, active states, accent borders
- `#0FD9C8` (Teal) = tool category tags, data visualization, callout tags
- Never use pure `#000000` black — always use `#0C0C0E`
- Never use pure `#FFFFFF` white — always use `#F5F4F0`

### Typography System
Load via `next/font/google`. All font loading in `src/app/layout.tsx`.
```typescript
import { Syne, Inter, JetBrains_Mono } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
})
```

**Type scale:**
| Use | Font | Size | Weight |
|---|---|---|---|
| Hero headline | Syne | 72–96px | Bold (700) |
| H1 | Syne | 48–56px | Bold (700) |
| H2 | Syne | 32–40px | SemiBold (600) |
| H3 | Inter | 24px | SemiBold (600) |
| Body (large) | Inter | 18px | Regular (400) |
| Body (standard) | Inter | 16px | Regular (400) |
| Small/Meta | Inter | 13–14px | Regular (400) |
| Eyebrow | Inter | 12px | Regular, ALL CAPS, tracking-widest |
| Metrics/Data | JetBrains Mono | 48–64px | Bold (700) |
| Code/Stack | JetBrains Mono | 14px | Regular (400) |

### Brand Voice
**Tone:** Direct · Precise · Confident · Plain · Occasionally dry

**Rules:**
- Never use agency jargon: "leverage," "synergistic," "holistic," "ecosystem"
- Never use filler words: "really," "very," "quite," "simply"
- Never use passive voice when active is possible
- Short sentences. One idea per sentence when possible.
- "I" not "we" for Jacob's voice
- Proof over promises — every claim should have a number or a name behind it
- Dry humor is allowed. Forced humor is not.

**Voice in practice:**
- ✅ "Most companies have a lead problem. Some have a conversion problem. A few have both. Let's figure out which one you have first."
- ❌ "We leverage our synergistic marketing ecosystem to optimize your conversion funnel."
- ✅ "You work with one person. That person is me."
- ❌ "Our team of experts delivers best-in-class solutions."

---

## 6. SITE ARCHITECTURE & NAVIGATION

### Primary Navigation (top)
```
Logo (left)    |    Problems · Proof · Tools · Process · About    |    Let's Talk → (CTA, right)
```

### Full URL Structure
```
/ (homepage)
/problems (hub — 6 cards)
  /problems/no-strategy-owner … /problems/pipeline-not-predictable
/proof (hub — ?outcome=<OutcomeSlug> filters case list)
  /proof/graston-qualified-leads
  /proof/graston-growth-engine
  /proof/pike-medical
  /proof/russell-painting
/services (capabilities menu)
  /services/[slug]  ← fractional-cmo, martech-stack-build, crm-architecture, …
/tools (hub)
  /tools/growth-bottleneck-quiz   ← also dedicated route under tools/ (custom client UI)
  /tools/cmo-simulator
  /tools/martech-stack-grader
  /tools/geo-readiness-auditor
  /tools/attribution-snapshot
  /tools/cmo-roadmap-generator
/process
/about
/contact
/studio
/privacy-policy
/resources
  /resources/blog/[slug]
  /resources/frameworks
```

### Legacy redirects (`next.config.ts`)
- `/work` → `/proof`, `/work/:slug` → `/proof/:slug`
- `/lab` → `/tools`, `/lab/:slug` → `/tools/:slug`

### Footer Navigation (see `src/data/navigation.ts`)
Tagline + newsletter signup in `SiteFooter` (client `NewsletterSignup` → `POST /api/newsletter`).
Columns include Work, **Capabilities** (`/services`), Problems hub, Tools, Company (About, Contact, Resources), Contact (email, location, Cal.com).
Footer also links **Privacy Policy** (`/privacy-policy`).

---

## 7. DATA MODELS

All interfaces are defined in `darlingmartech-data-model-spec.md` and live in
`src/data/` as TypeScript `.ts` files. Below are the critical conventions.

### Taxonomy Constants (src/data/taxonomy.ts)
```typescript
PROBLEM_CLUSTERS = [
  'no-strategy-owner',
  'site-not-converting',
  'disconnected-systems',
  'not-visible-enough',
  'brand-system-broken',
  'pipeline-not-predictable',
]

TRUST_LADDER_STAGES = ['browse', 'evaluate', 'qualify', 'commit', 'return']

OUTCOME_TAGS = [
  'Pipeline Growth', 'Systems Built', 'MarTech Integration',
  'Attribution & Analytics', 'Automation', 'CRM Architecture',
]

// Proof hub filters — see OutcomeSlug in src/types/index.ts
OUTCOME_SLUG_LABELS / OUTCOME_SLUG_ORDER   // e.g. lead-gen, conversion-lift, time-saved, …
```

### Proof Metrics (VERIFIED — use exactly as written)
These numbers are locked. Never alter, round, or approximate.

| Metric | Value | Context |
|---|---|---|
| Graston qualified leads | +212% | 18-month fractional engagement |
| Pike Medical patient pipeline | +45% | 90-day CRM + automation build |
| Graston overhead reduction | 95% | Full MarTech system replacement |
| Russell Painting satisfaction | 4.9★ | Full-stack marketing + attribution |
| Graston provider directory | 81 providers | Real-time spatial search |

### Case Study Slugs (src/data/work/)
Four published studies (two Graston narratives: lead-gen vs automation stack):
```
graston-qualified-leads      ← +212% qualified leads / strategy ownership story
graston-growth-engine       ← 95% overhead / Growth Engine automation emphasis
pike-medical
russell-painting
```

Each `CaseStudy` includes **`primaryOutcomeSlug`** (`OutcomeSlug`) and **`outcomeHeadline`** for metric-first
proof cards and `/proof?outcome=` filtering.

### Problem Cluster Slugs (src/data/problems.ts)
```
no-strategy-owner
site-not-converting
disconnected-systems
not-visible-enough
brand-system-broken
pipeline-not-predictable
```

`ProblemPage` (see `src/types/index.ts`) includes long-form fields used on `/problems/[slug]`:
`pageEyebrow`, `introParagraphs`, `whyItHappens`, `stakes`, `whatTheFixLooksLike`, `relevantTools`,
`relatedProof` (case slugs), `relatedService` (links to `/services/[slug]`), `closingBlock`, plus
hub fields (`hubCategory`, `proofChip`, `hubCtaLabel`).

### Tool Slugs (src/data/labs.ts)
```
growth-bottleneck-quiz    ← 8 questions; weighted resolver → six problem clusters
cmo-simulator
martech-stack-grader
geo-readiness-auditor
attribution-snapshot
cmo-roadmap-generator
```
Resolver logic: `src/lib/tool-result-resolvers.ts` (per-tool switch on `tool.slug`).

---

## 8. CONVERSION ARCHITECTURE — THE TRUST LADDER

Every page on the site serves one of five trust-ladder stages. Every CTA maps to a
stage. No page asks for more trust than it has earned.

| Stage | Visitor State | Primary Offer | CTA |
|---|---|---|---|
| 1 — Browse | Just landed | Free tool or resource | "Try the Stack Grader" / "Take the quiz" |
| 2 — Evaluate | Considering | Proof, case study, process | "See how I've done this" |
| 3 — Qualify | Ready to talk | Diagnostic call | "Book a 30-min diagnostic call" |
| 4 — Commit | Ready to engage | Contact / scope | "Let's talk" |
| 5 — Return | Existing client | Nurture / update | Newsletter, new proof |

**Implementation rule:** Every page component should know its trust ladder stage.
Tag data objects with `trustLadderStage` so the right CTAs render in the right context.

---

## 9. COPY SOURCES — WHERE EACH PAGE'S COPY LIVES

Approved narrative lives in **`docs/`** (Markdown exports of the site copy + blueprint):

- **`docs/# DARLING MARTECH — COMPLETE SITE COPY.docx.md`** — canonical section order and wording (homepage, problems, about, process, contact).
- **`docs/DARLING MARTECH — COMPLETE SITE REBUILD BLUEPRINT.docx.md`** — IA, proof taxonomy, tools funnel, redirects, growth mechanics.

Google Doc IDs in older briefs still apply for **reference** when cross-checking Drive.

**Copy implementation rule:** Prefer **`src/data/*.ts`** (`homepage.ts`, `problems.ts`, `contact.ts`, `about.ts`, `process.ts`, `proof.ts`, `labs.ts`, etc.) so copy updates are data edits. Section titles and layout-specific strings may live next to their components when it keeps the page readable—still avoid marketing copy sprawl in JSX.

---

## 10. COMPONENT CONVENTIONS

Prefer existing components under `src/components/` before adding new ones. Legacy “component inventory”
docs may exist in Drive; the **repo** is authoritative.

### Rules for every component:
1. **Single responsibility.** One component = one job. No multi-responsibility blobs.
2. **No cross-folder imports.** `/proof/` components don't import from `/tools/`.
   All shared UI imports from `/ui/` only.
3. **No inline styles.** All styling via Tailwind utility classes only.
4. **No raw hex in className.** Use `bg-[#0C0C0E]` pattern — never `style={{ color: '#F05A28' }}`.
5. **All images via `CloudinaryImage`.** No native `<img>` tags. No direct `<Image>` from next/image.
6. **All animations via `AnimateOnScroll`.** Don't write ad-hoc Framer Motion in page files.
7. **TypeScript strict.** No `any` types. No `// @ts-ignore`. Type everything properly.
8. **Shadcn/UI for primitives.** Dialog, Select, Toast, Popover — use Shadcn.
   Install: `npx shadcn@latest add [component]`
9. **Server components by default.** Only add `"use client"` when strictly necessary
   (interactivity, hooks, browser APIs).
10. **Props naming:** camelCase. Boolean props as `isX` or `hasX`. Event handlers as `onX`.

### Key Tailwind class conventions:
```
Page background:     bg-[#0C0C0E]
Card/band surface:   bg-[#13131A]
Orange accent:       text-[#F05A28]  bg-[#F05A28]
Proof green:         text-[#22C55E]
Off-white body:      text-[#F5F4F0]
Muted text:          text-[#F5F4F0]/50
Teal accent:         text-[#0FD9C8]
Orange left border:  border-l-4 border-[#F05A28]
Section padding:     py-20 md:py-28
Container:           max-w-7xl mx-auto px-6 md:px-12
Eyebrow:             text-[#F05A28] text-xs font-normal uppercase tracking-widest
```

---

## 11. API ROUTES & INTEGRATIONS

### /api/contact (POST)
Triggered by `ContactForm` submission (intent + message; optional budget range appended to message body when scope intent selected).
Flow (when `ENABLE_LIVE_INTEGRATIONS` / `appEnv.enableLiveIntegrations`): Resend notification to Jacob → optional n8n → CRM paths per `.env.example`.
Formbricks is **not** wired in front of the API — JSON posts directly to `/api/contact`.

Required env vars:
```
RESEND_API_KEY
N8N_WEBHOOK_URL_CONTACT
LOOPS_API_KEY
```

### /api/newsletter (POST)
Triggered by footer `NewsletterSignup` (`{ "email": string }`).
When `RESEND_API_KEY` and `RESEND_NEWSLETTER_AUDIENCE_ID` are set, creates/updates a Resend audience contact; otherwise returns a success payload indicating configuration is pending (safe for local dev).

### /api/subscribe (POST)
Triggered by EmailGate component on tool pages.
Flow: Email submit → `/api/subscribe` → Loops (add subscriber + tag with tool name)
      → Resend (deliver tool result email)

Required env vars:
```
LOOPS_API_KEY
RESEND_API_KEY
```

### /api/tool-complete (POST)
Triggered by QuizEngine on tool completion.
Flow: Tool completion → `/api/tool-complete` → PostHog (track event with tool name + result)
      → Supabase (log anonymous response)

Required env vars:
```
NEXT_PUBLIC_POSTHOG_KEY
NEXT_PUBLIC_POSTHOG_HOST
SUPABASE_URL
SUPABASE_ANON_KEY
```

---

## 12. SEO & METADATA

Every page must have a metadata export. Use Next.js 15 Metadata API.
```typescript
// Pattern for every page:
export const metadata: Metadata = {
  title: 'Page Title | Darling MarTech',
  description: 'Page description under 160 characters.',
  openGraph: {
    title: 'Page Title | Darling MarTech',
    description: 'Page description.',
    url: 'https://darlingmartech.com/page-path',
    siteName: 'Darling MarTech',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
}
```

### Schema markup (built into layout.tsx)
```typescript
// Person schema for Jacob
// LocalBusiness schema for Darling MarTech
// FAQPage schema on /problems/[slug] pages
// HowTo schema on /process page
```

### Technical SEO requirements (built from day one):
- `next-sitemap` package for auto-generated sitemap
- Semantic HTML heading hierarchy on every page (one H1, logical H2/H3)
- Internal linking: `/problems/[slug]` → relevant `/tools/*`, `/services/[slug]`, and `/proof/*` as appropriate; proof detail ↔ problems where it helps the reader

---

## 13. ENVIRONMENT VARIABLES
```bash
# .env.example — commit this file, not .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend (transactional email)
RESEND_API_KEY=
RESEND_FROM_EMAIL=jacob@darlingmt.com
# Optional — footer newsletter → Resend Audiences API
RESEND_NEWSLETTER_AUDIENCE_ID=

# Loops (marketing email)
LOOPS_API_KEY=

# PostHog (product analytics)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# n8n (automation)
N8N_WEBHOOK_URL_CONTACT=
N8N_WEBHOOK_URL_TOOL=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=c-5c7019a74c9c24ab5eda7e213055bd
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Cal.com
NEXT_PUBLIC_CAL_LINK=jacob-darling/30min

# Plausible (privacy-first analytics)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=darlingmartech.com
```

---

## 14. PHASED BUILD SEQUENCE

Build in this exact order. Do not jump phases.

### Current Build State (darling-martech-v2 — synced April 2026, post copy/blueprint implementation)
- ✅ Next.js 15 + TypeScript (strict) + Tailwind v4
- ✅ `src/types/index.ts` — includes `OutcomeSlug`, extended `CaseStudy`, long-form `ProblemPage`
- ✅ Fonts: `src/app/layout.tsx` uses **Syne / Inter / JetBrains Mono** via `next/font`
- ✅ Brand tokens: `src/app/globals.css` (CSS variables + `@theme inline`)
- ✅ Core deps: Framer Motion, Supabase client, Resend, `posthog-js`, Vercel Analytics
- ✅ Homepage: copy-doc order — `ProofTicker`, `DiagnosticOrangeBand`, structured hero accent (`homepage.ts` + `HomepageHero`)
- ✅ Problems: hub + **6** long-form `/problems/[slug]` pages; `ProblemClosingSection`; service deep-link to `/services/[slug]`
- ✅ Proof: **4** case files; `/proof?outcome=` filters; metric-first `ProofCard` + `ProofOutcomeFilters`
- ✅ Services: `/services`, `/services/[slug]` from `data/services.ts`
- ✅ Tools: all slugs in `labs.ts`; Growth Bottleneck Quiz **8 questions** + weighted resolver; dedicated `/tools/growth-bottleneck-quiz` page
- ✅ Process: engagement format cards, “honest about fit,” scenario grid, tools reminder + closing (see `process.ts`)
- ✅ About: timeline, differentiators, industries, closing CTAs (`about.ts` + `about/page.tsx`)
- ✅ Contact: intent cards, conditional budget field, alternatives strip, reassurance line; email **`jacob@darlingmt.com`** in `site-config`
- ✅ Footer: tagline, `NewsletterSignup`, privacy link; `/privacy-policy` route
- ✅ `next.config.ts` redirects: `/work`→`/proof`, `/lab`→`/tools`
- ✅ `/api/newsletter` for footer signup (Resend audiences when configured)
- ✅ `/resources` hub, blog, frameworks, `/studio`
- ✅ Plausible (when env set) + PostHog + `.env.example` staging notes
- **Track:** Phase 4 (n8n, Twenty, Loops) — operator-hosted; enable with `ENABLE_LIVE_INTEGRATIONS=true` per `.env.example`
- ⚠️ Shadcn: partial (Radix slot + custom `Button`; add full Shadcn inventory only if needed)
- ⚠️ Formbricks: not wired — contact posts JSON to `/api/contact`

### Phase 0 — Foundation (Day 1)
- [x] Init new Next.js 15 repo with TypeScript + Tailwind + Shadcn/UI (Shadcn partial — add primitives as needed)
- [ ] Configure Vercel deployment + custom domain staging URL (per environment)
- [x] Create `CLAUDE.md` and `.cursorrules` at root
- [x] Set up `src/data/taxonomy.ts` with all constants
- [x] Set up `src/data/site-config.ts` with SiteConfig
- [x] Set up global CSS custom properties + Tailwind base (`src/app/globals.css` — not `src/styles/`)
- [x] Configure `next/font` with Syne, Inter, JetBrains Mono
- [x] Build `SiteHeader`, `SiteFooter`, `PageWrapper`, `SectionWrapper`
- [x] Build shared UI primitives: `Button`, `Eyebrow`, `SectionHeader`, `AnimateOnScroll`
- [x] Set up Supabase project + connect client (code paths in `src/lib/supabase.ts`)
- [ ] Set up Resend account + React Email templates (Resend wired in API routes; templates evolve with product)

### Phase 1 — Core Pages (Week 1-2)
- [x] Homepage (/) — core sections live; optional: full **11 sections** from copy doc
- [x] Problems hub (/problems) — hub + all 6 slug pages
- [x] Proof hub (/proof) — hub + all 3 case study pages
- [ ] Wire Cal.com into **all** CTA buttons (footer + contact; audit hero/section CTAs)

### Phase 2 — Conversion Engine (Week 2-3)
- [x] Build `QuizEngine` + sub-components (`QuizQuestion`, `QuizProgress`, `ResultCard`, `EmailGate`)
- [x] Build Growth Bottleneck Quiz (`/tools/growth-bottleneck-quiz`)
- [x] Build `EmailGate` → connect to Loops API route (`/api/subscribe`)
- [x] Add MarTech Stack Grader (`/tools/martech-stack-grader`)
- [ ] Wire Formbricks to contact form
- [x] PostHog client events on tools + contact; server capture on `/api/tool-complete`
- [x] Plausible on all pages (script in root layout when env set)

### Phase 3 — Secondary Pages (Week 3-4)
- [x] Process page (/process)
- [x] About page (/about) — with Cloudinary portrait
- [x] Contact page (/contact)
- [x] Tools hub page (/tools)
- [x] Deploy all tools to new slug structure (interactive flows for all six slugs in `labs.ts`)

### Phase 4 — Automation Backend (Week 4-5)
- [ ] Stand up n8n on Railway (or chosen host)
- [ ] Build contact form → CRM workflow (n8n receives `/api/contact` payload; Twenty inside workflow)
- [ ] Build tool completion → email sequence workflow (n8n receives `/api/tool-complete` payload)
- [ ] Stand up Twenty CRM on Railway
- [ ] Import existing contacts into Twenty CRM
- [ ] Set up Loops welcome sequence (5 emails)
- [x] App surfaces: `/api/contact`, `/api/subscribe`, `/api/tool-complete` call Resend, Loops, n8n, PostHog, Supabase when `ENABLE_LIVE_INTEGRATIONS=true` — **staging smoke steps** in [`.env.example`](.env.example)

### Phase 5 — Authority Layer (Month 2)
- [x] Resources hub (/resources) + blog routes
- [x] Starter blog posts (3) in `src/data/blog.ts` — replace with content calendar when ready
- [ ] Set up Loops newsletter broadcast
- [x] Studio page (/studio) — Cloudinary-powered gallery
- [x] Downloadable frameworks (email-gated listings + request CTA on `/resources/frameworks`)

---

## 15. CLOUDINARY ASSET REFERENCE

**Cloud name:** `c-5c7019a74c9c24ab5eda7e213055bd`
**Studio folder:** `ce5a6853810907f3008cae3ee146ffed31`

All images are served from Cloudinary. Use the `CloudinaryImage` component which
wraps `next/image` with the Cloudinary loader:
```typescript
// src/lib/cloudinary.ts
const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${src}`
}
```

Usage:
```tsx

```

---

## 16. AI AGENT WORKFLOW RULES

These rules apply to all AI agents (Claude Code, Cursor, Codex, Gemini).

### Before writing any code:
1. Read this entire `CLAUDE.md`
2. Identify which phase of the build you're in (Section 14)
3. Identify which component you're building (Section 10, Component Inventory doc)
4. Check the copy doc for the page you're building (Section 9)
5. Confirm you have the right data model interface (Section 7, Data Model Spec doc)

### While writing code:
- Follow folder structure exactly as specified in Section 4
- Use Tailwind classes from Section 5 for all colors and typography
- Import from `@/components/ui/` for all shared primitives
- Import from `@/data/` for all content — never hardcode strings in JSX
- TypeScript strict mode: type everything
- Server components by default: only `"use client"` when required

### Never do these things:
- ❌ Write new copy — all copy is pre-written in the copy docs
- ❌ Change brand colors or fonts
- ❌ Add new dependencies without noting them for Jacob's approval
- ❌ Use `any` TypeScript type
- ❌ Use inline styles (`style={{ }}`)
- ❌ Hardcode content strings in JSX — use data files
- ❌ Create a new component when an existing component from the inventory covers the job
- ❌ Use CSS Modules — Tailwind only
- ❌ Import from the old `darling-martech` repo

### Claude Code specific:
- Use slash commands for repetitive tasks: creating pages, updating data models,
  generating Tailwind component variants, writing n8n workflow JSON
- Always create or update the relevant data file before building the UI component
- Run `npm run dev` (or `pnpm dev`) and `npm run typecheck` before declaring a task complete

### Cursor specific:
- `.cursorrules` at repo root mirrors this file in Cursor's instruction format
- Use `@codebase` context for questions about your own repo
- Use `@docs` for pulling in Shadcn, Next.js, Tailwind, and n8n documentation

---

## 17. FOUNDER INFO (USE IN COPY AND DATA)
```typescript
// src/data/site-config.ts — verify live file for Cal.com URL and metadata
export const siteConfig: SiteConfig = {
  name: 'Darling MarTech',
  url: 'https://darlingmartech.com',
  founder: {
    name: 'Jacob Darling',
    email: 'jacob@darlingmt.com',
    location: 'Indianapolis, IN',
    title: 'Founder, Darling MarTech',
  },
  calComLink: 'https://cal.com/jacob-darling/30min',
  defaultMeta: {
    title: 'Darling MarTech — MarTech Strategy, Systems & Execution',
    description:
      'The only martech owner-operator company that builds, integrates, and runs the full marketing stack for growth-stage businesses. One person. Complete accountability.',
    ogImage: '/og-default.png',
  },
}
```

**Career context (for About page data):**
- 15 years marketing experience
- B.S. Business Management, Indiana University, 2008
- Industries: Healthcare · Legal · Finance · SaaS · Retail · Nonprofit · Local Service
- Founded Darling MarTech in 2026

---

## 18. QUICK REFERENCE — MOST USED PATTERNS

### Page shell
```tsx
import { SiteShell } from "@/components/layout/site-shell";

export default function Page() {
  return (
    <SiteShell>
      {/* sections */}
    </SiteShell>
  );
}
```

### CTA (`Button` from `@/components/ui/button`)
```tsx
<Button href="/contact" size="lg">Let&apos;s talk →</Button>
<Button href="/proof" variant="ghost">See the proof</Button>
```

### Proof metric (inline or `MonoMetric`)
```tsx
<MonoMetric value="+212%" label="qualified leads — Graston Technique®" />
```

### Scroll animation
```tsx
<AnimateOnScroll delay={0.08}>
  <ProofCard caseStudy={caseStudy} />
</AnimateOnScroll>
```

### Case study data (abbreviated — see `src/data/work/*.ts` for full shape)
```typescript
import type { CaseStudy } from "@/types";

export const exampleStudy: CaseStudy = {
  slug: "graston-qualified-leads",
  // …title, clientName, clientContext, timeline, engagementFormat,
  // outcomeTags, problemClusters, trustLadderStage, metrics,
  primaryMetric: { value: "+212%", label: "Qualified leads generated", isHighlighted: true },
  primaryOutcomeSlug: "lead-gen",
  outcomeHeadline: "+212% qualified leads",
  resultSummary: "…",
  systemsBuilt: ["…"],
  featured: true,
  publishedAt: "2024-01-01",
};
```

---

## 19. THINGS TO NEVER DO (ABSOLUTE RULES)

These are non-negotiable.

- Never change the brand color palette (see Section 5).
- Never use “we” for service delivery — solo operator; use “I” / “Jacob.”
- Never alter verified proof metrics without Jacob’s sign-off (+212%, +45%, 95%, 4.9★, etc.).
- Prefer `src/data/` for copy; avoid long marketing strings scattered in JSX.
- No CSS Modules — Tailwind only.
- No `any` — use or extend types in `src/types/index.ts`.
- Do not import from the old `darling-martech` repo.
- Flag new dependencies to Jacob before adding.
- Build or extend the data model before large UI work.
- No production deploy without Jacob’s explicit approval.

---

## 20. SUPPORT DOCS REFERENCE

| Source | Purpose |
|--------|---------|
| **`docs/# DARLING MARTECH — COMPLETE SITE COPY.docx.md`** | Canonical page copy and section order |
| **`docs/DARLING MARTECH — COMPLETE SITE REBUILD BLUEPRINT.docx.md`** | IA, taxonomy, proof engine, growth mechanics |
| Google Drive / legacy `.md` briefs | Strategy, brand, component inventory — supplementary |
| **`CLAUDE.md` (this file)** | Repo conventions for agents |

---

## 21. FINAL NOTE TO ALL AI AGENTS

This site is a **precision diagnostic** for the right clients — not a generic portfolio template. Every component and CTA should support: name the bottleneck, deliver value before the ask, earn the conversation.

---

*CLAUDE.md — Darling MarTech v1.1 · Repository root: `/CLAUDE.md`*

**Do not edit this file without Jacob Darling’s explicit approval.**
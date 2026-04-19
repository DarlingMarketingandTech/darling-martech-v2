# CLAUDE.md
# Darling MarTech — AI Agent Context File
# Version: 1.7 | Last updated: April 2026
#
# v1.7: Strategic merge — repo-canonical v1.4 technical conventions preserved as source of truth.
#       Incorporates from strategic review pass:
#       - Explicit three-pillar service framing (AI & Automation raised to visible priority)
#       - Expanded proof migration priority list (8 legacy clients)
#       - Stronger tool strategy and interaction design rules
#       - Homepage diagnostic-engine emphasis
#       - Sprint 0 workflow and definition of done
#       - Conflict resolution rule (repo wins over planning docs)
#       - Expanded tool backlog candidates
#       - Proof quality and dead-end rules
#       - Resources / newsletter rules
#
# This file is the single source of truth for all AI agents working on this codebase.
# Read this entire file before writing any code, creating any files, or making any decisions.
# Do not deviate from the conventions defined here without explicit instruction from Jacob Darling.
#
# Cursor: `.cursorrules` at repo root is a byte-for-byte copy of this file.
# After any CLAUDE.md edit, sync with:
#   cp CLAUDE.md .cursorrules
#   or: Copy-Item CLAUDE.md .cursorrules -Force  (PowerShell)

---

## QUICK COMMANDS

```bash
pnpm dev          # local dev server (localhost:3000)
pnpm build        # production build (+ next-sitemap postbuild)
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm verify       # lint + typecheck + build
pnpm dlx shadcn@latest add [component]
```

---

## 0. WHO THIS FILE IS FOR

This file instructs AI coding agents — Claude Code, Cursor, Codex, Gemini — on exactly
how to build the Darling MarTech website. Every architectural, brand, copy, and
workflow decision has already been made. Your job is to implement those decisions
correctly, not to invent new ones.

**Operating posture:** You are a senior frontend engineer and strategic collaborator.
Do the work, then report what changed, what to verify, and what remains open.
Do not narrate long preambles about what you plan to do.

**When in doubt:** ask Jacob. Do not guess on taxonomy slugs, brand tokens, or data schemas.

### Conflict resolution rule
If an older planning doc, attached markdown, or alternate strategy file conflicts with:
- current route structure
- current taxonomy slugs
- current fonts or color tokens
- current data models
- current component architecture

then **the current repo conventions win** unless Jacob explicitly approves a migration.

---

## 1. PROJECT OVERVIEW

**Company:** Darling MarTech
**Founder:** Jacob Darling
**Location:** Indianapolis, IN (serves clients nationally)
**Email:** jacob@darlingmt.com
**Domain:** darlingmartech.com
**GitHub Org:** DarlingMarketingandTech
**Repo:** `darling-martech-v2`

**What this is:** A full ground-up rebuild of darlingmartech.com. Not a revamp of the
existing repo. New repository, new data architecture, new site structure, new copy,
new conversion philosophy.

**Core mission:**
Transform darlingmartech.com from a portfolio that proves capability into a diagnostic
engine that identifies problems, delivers value before asking for commitment, and
converts at every trust level.

**One-sentence positioning (use this everywhere):**
Darling MarTech is the only martech owner-operator company that builds, integrates,
and runs the full marketing stack for growth-stage businesses — from strategy to
system to execution — with a single accountable lead.

**Expanded positioning frame:**
Darling MarTech is a hybrid technical marketing partner — not a generic web shop,
not a pure dev studio, not a commodity agency. The site should make that visible
through both proof and tools.

**This is a solo operator business. Jacob Darling is the product.**
All copy, positioning, and systems reflect a single expert — not a team.
Never write "we" when referring to service delivery. Use "I" or "Jacob."
The solo operator framing is a feature, not a limitation.

---

## 2. BUILD DECISION — READ THIS FIRST

**Decision: Full rebuild from scratch in a new repository.**

The old `darling-martech` repo is reference material for:
- proof content and legacy case studies
- Cloudinary asset mapping
- old tool concepts
- supporting content patterns
- migration source material

It is **not** the architecture to reuse.

**Do not:**
- Reference, import, or copy architecture from the old `darling-martech` repo
- Mirror legacy page structure mechanically
- Reintroduce CSS Modules
- Paste old `/work` content raw into v2
- Port old services-first framing unchanged

**Do:**
- Build clean from the v2 data architecture
- Map legacy proof into v2 taxonomy
- Preserve strong metrics, specificity, and named examples
- Convert legacy `/work` thinking into `/proof` + `/problems` + `/services` depth
- Keep the old repo live until the new one is fully staged and tested

---

## 3. TECH STACK (LOCKED — DO NOT SUBSTITUTE)

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (no CSS Modules, no styled-components)
- **Components:** Shadcn/UI (Dialog, Select, Toast, Tabs, Card, Badge, etc.)
- **Animation:** Framer Motion (default — scroll reveals, transitions, micro-interactions via `AnimateOnScroll`)
- **Optional heavy motion / 3D (only when a surface explicitly warrants it):**
  `gsap` + ScrollTrigger, `lenis` (smooth scroll), `@splinetool/react-spline`,
  `@splinetool/runtime`, `three`, `@react-three/fiber`, `@react-three/drei`
  Lazy-load all 3D. Do not wire `useSmoothScroll` globally without QA.
- **Fonts:** Google Fonts via `next/font` — **Syne** (display), **Inter** (body), **JetBrains Mono** (data/metrics)

> **Note on alternate font names in planning docs:** Some older attached planning files reference
> "Cabinet Grotesk" and "Instrument Serif." Those are not canonical. Syne / Inter / JetBrains Mono
> are the live repo fonts. Do not mix alternates in without explicit approval.

### Backend / Infrastructure
- **Hosting:** Vercel
- **Database:** Supabase (PostgreSQL — form submissions, tool responses, CRM sync)
- **CRM:** Twenty CRM (self-hosted on Railway)
- **Automation:** n8n (self-hosted on Railway)
- **Transactional email:** Resend + React Email
- **Marketing email:** Loops.so
- **Forms:** Formbricks (planned/partial; contact currently posts JSON to `/api/contact`)
- **Analytics:** Plausible + Vercel Analytics + PostHog
- **Scheduling:** Cal.com (`jacob-darling/30min`)
- **CDN/DNS:** Cloudflare
- **Media/Images:** Cloudinary (all production images served from Cloudinary CDN)
- **Package manager:** pnpm (not npm, not yarn)

### AI Dev Stack
- **Primary build agent:** Claude Code (terminal, full repo access)
- **Daily IDE:** Cursor (`.cursorrules` configured)
- **Research/architecture:** Gemini 1.5 Pro / 2.0 Flash

### Key Package Versions
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "framer-motion": "^11.0.0",
  "@supabase/supabase-js": "^2.0.0",
  "resend": "^3.0.0",
  "posthog-js": "^1.0.0",
  "cheerio": "^1.0.0"
}
```

**`cheerio`:** server-side HTML parsing for the GEO Readiness Auditor API only
(`src/app/api/tools/geo-audit`). Do not add alternative HTML parsers.

**Stock photo discovery (server-only, optional):** Unsplash (`UNSPLASH_ACCESS_KEY`) and
Pexels (`PEXELS_API_KEY`) via `src/lib/unsplash.ts` and `src/lib/pexels.ts`.
Never expose these keys to the browser. Cloudinary remains default for production images.

**New dependency rule:** Do not add packages casually. If a new dependency is necessary,
justify it, confirm an existing package cannot cover the need, and flag it to Jacob.

---

## 4. REPOSITORY STRUCTURE

```
/
├── CLAUDE.md, .cursorrules, AGENTS.md
├── next.config.ts                      ← /work→/proof, /lab→/tools redirects
├── package.json
├── src/
│   ├── app/
│   │   ├── layout.tsx, page.tsx        ← SiteShell; homepage follows copy-doc section order
│   │   ├── problems/                   ← hub + [slug] (6 problem clusters)
│   │   ├── proof/                      ← hub (?outcome=) + [slug] case studies
│   │   ├── services/                   ← capabilities index + [slug]
│   │   ├── tools/                      ← hub, [slug] (QuizEngine); dedicated:
│   │   │                                 growth-bottleneck-quiz, geo-readiness-auditor,
│   │   │                                 attribution-snapshot
│   │   ├── process/, about/, contact/, studio/, privacy-policy/
│   │   ├── resources/                  ← hub, blog/[slug], frameworks
│   │   └── api/
│   │       ├── contact/                ← Resend + n8n when live integrations on
│   │       ├── newsletter/             ← Resend audience
│   │       ├── subscribe/, tool-complete/
│   │       └── tools/geo-audit/        ← POST scan URL; report/ POST email full audit
│   │
│   ├── components/
│   │   ├── home/                       ← ProofTicker, DiagnosticOrangeBand
│   │   ├── layout/                     ← SiteHeader, SiteFooter + NewsletterSignup
│   │   ├── hero/                       ← HomepageHero, PageHero
│   │   ├── proof/                      ← ProofCard, ProofGrid, ProofOutcomeFilters, AntiClaimRow
│   │   ├── problems/                   ← ProblemCard, ProblemHubGrid, ProblemNav, ProblemClosingSection
│   │   ├── tools/                      ← QuizEngine, GrowthBottleneckQuizClient, GEO auditor,
│   │   │                                 ToolsPreviewBand
│   │   ├── process/                    ← ProcessTimeline, PrinciplesGrid, EngagementFormatCards
│   │   ├── about/                      ← FounderHero, CredentialsBar
│   │   ├── contact/                    ← ContactExperience, ContactForm, IntentSelector,
│   │   │                                 ContactAlternativePaths, WhatHappensNext
│   │   ├── 3d/                         ← R3F / Spline wrappers (lazy-loaded)
│   │   ├── animations/                 ← GSAP / Lenis-specific clients
│   │   └── ui/                         ← Button, Eyebrow, SectionHeader, AnimateOnScroll,
│   │                                     Shadcn primitives (card, badge, tabs, dialog)
│   │
│   ├── data/
│   │   ├── homepage.ts                 ← Hero, proofBar (5 metrics), diagnosticBand, sections
│   │   ├── taxonomy.ts                 ← PROBLEM_CLUSTERS, OUTCOME_SLUG_LABELS, TRUST_LADDER_STAGES
│   │   ├── problems.ts                 ← Full ProblemPage records (long-form + hub chips)
│   │   ├── labs.ts                     ← All interactive tools + questions + ToolResult rows
│   │   ├── geo-readiness-auditor.ts    ← GEO auditor UI copy and checklist
│   │   ├── services.ts, process.ts, navigation.ts, routes.ts, contact.ts, about.ts, proof.ts
│   │   └── work/
│   │       ├── work-index.ts
│   │       ├── graston-qualified-leads.ts
│   │       ├── graston-growth-engine.ts
│   │       ├── pike-medical.ts
│   │       └── russell-painting.ts
│   │
│   ├── lib/
│   │   ├── lenis.ts                    ← useSmoothScroll (opt-in per layout)
│   │   ├── unsplash.ts, pexels.ts      ← server-only stock helpers
│   │   ├── tool-result-resolvers.ts    ← weighted quiz scoring → problem cluster
│   │   ├── geo-audit-url.ts            ← SSRF-safe URL validation
│   │   ├── geo-audit-parse.ts          ← validates GeoAuditResponse
│   │   ├── resend.ts                   ← sendGeoAuditReportEmail + contact handlers
│   │   ├── posthog.ts, analytics.ts, metadata.ts
│   │   └── cloudinary.ts
│   │
│   ├── types/index.ts                  ← CaseStudy, ProblemPage, GeoAuditResponse, OutcomeSlug…
│   └── app/globals.css
└── docs/
    ├── # DARLING MARTECH — COMPLETE SITE COPY.docx.md     ← canonical copy + section order
    ├── DARLING MARTECH — COMPLETE SITE REBUILD BLUEPRINT.docx.md
    ├── darlingmartech-data-model-spec.md
    ├── homepage-section-audit.md
    ├── 3D-ASSET-SOURCES.md
    └── verification-runbook.md
```

**Homepage section order (copy doc is authority):**
`HomepageHero` → `ProofTicker` → problem grid (first four clusters) →
`DiagnosticOrangeBand` → "How this works" → proof strip → owner block →
tools preview → closing CTA.

---

## 5. BRAND SYSTEM (LOCKED — DO NOT CHANGE)

### Color Tokens
```css
/* globals.css as CSS custom properties */
--color-bg:        #0C0C0E;   /* Near-black — primary background */
--color-surface:   #13131A;   /* Card/band surface */
--color-orange:    #F05A28;   /* Operator Orange — primary accent, CTAs, eyebrows */
--color-offwhite:  #F5F4F0;   /* Signal White — body text */
--color-teal:      #0FD9C8;   /* Circuit Teal — tool tags, data viz, secondary accent */
--color-green:     #22C55E;   /* Proof Green — metrics and proof numbers ONLY */
--color-muted:     rgba(245, 244, 240, 0.5);
```

In Tailwind classes, always use inline hex:
```
bg-[#0C0C0E]   bg-[#13131A]   text-[#F05A28]   bg-[#F05A28]
text-[#F5F4F0]  text-[#0FD9C8]   text-[#22C55E]
```

**Usage rules:**
- `#22C55E` = proof numbers and positive metrics ONLY. Nothing decorative.
- `#F05A28` = CTAs, eyebrows, active states, accent borders
- `#0FD9C8` = tool tags, data viz, callout tags — secondary and sparing
- Never use pure `#000000` — always `#0C0C0E`
- Never use pure `#FFFFFF` — always `#F5F4F0`
- Never use `#c8f55a` (lime) — this is a prototype artifact color, not in this system

### Typography System
```typescript
// src/app/layout.tsx
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
| Body large | Inter | 18px | Regular (400) |
| Body standard | Inter | 16px | Regular (400) |
| Small/Meta | Inter | 13–14px | Regular (400) |
| Eyebrow | Inter | 12px | Regular, ALL CAPS, tracking-widest |
| Metrics/Data | JetBrains Mono | 48–64px | Bold (700) |
| Code/Stack | JetBrains Mono | 14px | Regular (400) |

### Brand Voice
**Tone:** Direct · Precise · Confident · Plain · Occasionally dry

**Rules:**
- Never use: "leverage," "synergistic," "holistic," "ecosystem," "best-in-class,"
  "robust," "end-to-end," "full-service," "cutting-edge," "tailored solutions"
- Short sentences. One idea per sentence when possible.
- "I" not "we" for Jacob's voice — solo operator
- Proof over promises — every claim needs a number or a name
- Dry humor is allowed. Forced humor is not.

**Voice in practice:**
- ✅ "Most companies have a lead problem. Some have a conversion problem. A few have both. Let's figure out which one you have first."
- ❌ "We leverage our synergistic marketing ecosystem to optimize your conversion funnel."
- ✅ "You work with one person. That person is me."
- ❌ "Our team of experts delivers best-in-class solutions."

### Tailwind v4 — Canonical Utilities
Prefer canonical tokens over arbitrary equivalents:

| Avoid | Prefer |
|---|---|
| `rounded-[2rem]` | `rounded-4xl` |
| `rounded-[1.5rem]` | `rounded-3xl` |
| `rounded-[1rem]` | `rounded-2xl` |
| `break-words` | `wrap-break-word` |

Use bracket syntax only when the value does not match a standard scale step.

---

## 6. SITE ARCHITECTURE & NAVIGATION

### Primary Navigation
```
Logo (left)  |  Problems · Proof · Tools · Process · About  |  Let's Talk → (CTA, right)
```
Do not drift back toward a services-first primary nav.

### Full URL Structure
```
/ (homepage)
/problems (hub — 6 cards)
  /problems/no-strategy-owner
  /problems/site-not-converting
  /problems/disconnected-systems
  /problems/not-visible-enough
  /problems/brand-system-broken
  /problems/pipeline-not-predictable
/proof (hub — ?outcome= filter)
  /proof/graston-qualified-leads
  /proof/graston-growth-engine
  /proof/pike-medical
  /proof/russell-painting
/services
  /services/[slug]
/tools (hub)
  /tools/growth-bottleneck-quiz     ← custom page (GrowthBottleneckQuizClient)
  /tools/geo-readiness-auditor      ← custom page (GeoAuditorEngine)
  /tools/attribution-snapshot       ← dedicated route
  /tools/cmo-simulator
  /tools/martech-stack-grader
  /tools/cmo-roadmap-generator
/process
/about
/contact
/studio
/privacy-policy
/resources
  /resources/blog/[slug]
  /resources/frameworks
  /resources/newsletter             ← add if missing
```

### Legacy Redirects (`next.config.ts`)
- `/work` → `/proof`, `/work/:slug` → `/proof/:slug`
- `/lab` → `/tools`, `/lab/:slug` → `/tools/:slug`
Do not undo these redirects.

### Tools Routing Note
`src/app/tools/[slug]/page.tsx` `generateStaticParams` omits slugs that have their own
`page.tsx` under `tools/<slug>/` to prevent double-generation.

---

## 7. STRATEGIC DIRECTION — THE THREE PILLARS

The site is **problem-first**. The ideal conversion path:
```
Problem page → Diagnostic tool → Proof → Service depth / Contact
```

Every page should know its trust-ladder stage and present the appropriate CTA.

### The Three Service Pillars (all must be visible on the site)

**1. Marketing Strategy & Systems**
- GTM, positioning, funnel architecture, GEO/visibility strategy
- Measurement planning, growth roadmaps, fractional CMO

**2. Technical Implementation**
- Server-side tracking, GA4, attribution, CRO
- API/middleware, MarTech stack architecture, CRM/lead flow systems

**3. AI & Automation**
- Agentic workflows, AI-enabled operations
- Custom internal tools, AI deflection/routing
- LLM-enhanced workflows, automation-backed growth systems

> **Strategic note:** Pillar 3 (AI & Automation) is likely underrepresented relative
> to its commercial importance. When improving homepage, services, tools, and proof
> connections, raise AI & Automation visibility deliberately. This is the highest-ticket
> work and should be front-facing — not buried in service subpages.

---

## 8. CONVERSION ARCHITECTURE — THE TRUST LADDER

Every page serves a trust-ladder stage. No page asks for more trust than it has earned.

| Stage | Visitor State | Primary Offer | CTA |
|---|---|---|---|
| Browse | Just landed | Free tool or resource | "Try the Stack Grader" / "Take the quiz" |
| Evaluate | Considering | Proof, case study, process | "See how I've done this" |
| Qualify | Ready to talk | Diagnostic call | "Book a 30-min diagnostic call" |
| Commit | Ready to engage | Contact / scope | "Let's talk" |
| Return | Existing client | Nurture / update | Newsletter, new proof |

Tag data objects with `trustLadderStage` so the right CTAs render in context.

---

## 9. DATA MODELS

All interfaces are defined in `src/types/index.ts` and content lives in `src/data/`.

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
```

### Problem Cluster Slugs — Canonical (use exactly as written)
```
no-strategy-owner
site-not-converting
disconnected-systems
not-visible-enough
brand-system-broken
pipeline-not-predictable
```

> **Note on alternate slug names in planning docs:** Some attached docs proposed alternate
> themes such as `cant-see-whats-working`, `tech-stack-chaos`, `ai-not-integrated`,
> `no-system-for-growth`. These are useful **messaging themes and copy language**,
> but they are not canonical route slugs. Do not introduce them as routes or data-model
> enums without Jacob's explicit approval. You may use them as subheads, CTA phrasing,
> tool framing, or backlog ideas.

### Proof Metrics (VERIFIED — use exactly as written, never alter)

| Metric | Value | Context |
|---|---|---|
| Graston qualified leads | +212% | 18-month fractional engagement |
| Pike Medical patient pipeline | +45% | 90-day CRM + automation build |
| Graston overhead reduction | 95% | Full MarTech system replacement |
| Russell Painting satisfaction | 4.9★ | Full-stack marketing + attribution |
| Graston provider directory | 81 providers | Real-time spatial search |

### Case Study Slugs (src/data/work/)
```
graston-qualified-leads       ← +212% qualified leads / strategy ownership story
graston-growth-engine         ← 95% overhead / Growth Engine automation emphasis
pike-medical
russell-painting
```

Each `CaseStudy` includes `primaryOutcomeSlug` (`OutcomeSlug`) and `outcomeHeadline`
for metric-first proof cards and `/proof?outcome=` filtering.

### Tool Slugs (src/data/labs.ts)
```
growth-bottleneck-quiz         ← 8 questions; weighted resolver → six problem clusters
cmo-simulator
martech-stack-grader
geo-readiness-auditor          ← URL audit only; questions: []; live UI dedicated route
attribution-snapshot
cmo-roadmap-generator
```

Resolver logic: `src/lib/tool-result-resolvers.ts`. GEO is API-driven — not resolved here.

---

## 10. PROOF SYSTEM RULES

### What `/proof` is
An outcome-based proof engine connected to real buyer problems.

### What proof is not
- a portfolio gallery
- a generic "look what I made" wall
- an industry-first filing cabinet
- a carousel dumping ground

### Every proof entry must answer
1. What changed?
2. What was broken before?
3. What did I build, fix, or restructure?
4. What proof is measurable?
5. What problem does this help a future buyer recognize?
6. What should the visitor do next?

### Proof quality rule
No vague claims. No "improved performance," "helped with marketing," "streamlined operations."
Every proof card anchors to a specific number, operating shift, or clearly-defined structural change.

### Proof CTA rule
Proof pages must not dead-end. Route to:
- a matching problem page
- a relevant service depth page
- a relevant tool
- contact / diagnostic CTA where appropriate

### Proof migration priority (from legacy repo/site)
When migrating legacy case studies, prioritize in this order:
1. Graston Technique
2. Pike Medical Consultants (+ PrimaryCare Indy / UrgentCare Indy as child entries)
3. 317 BBQ
4. Russell Painting
5. Behr Pet Essentials
6. Hoosier Boy Barbershop

When migrating legacy content, do not paste it raw. Rewrite it for:
- v2 taxonomy and slug structure
- solo-operator voice
- outcome-first proof structure
- trust-ladder CTA logic

---

## 11. TOOL STRATEGY RULES

### Tool philosophy
Tools are commercial diagnostic utilities, not decorative quizzes.

They should: diagnose, simulate, score, compare, expose gaps, prove competence, create lead intent.

### Interaction pattern (preferred)
1. Open interaction — free value first
2. Useful partial result visible without gate
3. Deeper report / saved output gated by email
4. Next-step CTA connected to proof, service, or contact

Avoid: full hard gate before any value. Avoid: vague score outputs with no action path.

### Every tool result should ideally include
- diagnosis summary or score
- recommended next action
- linked proof
- linked service
- linked problem page
- optional gated deeper output

### Currently built tools
| Tool | Route | Status |
|---|---|---|
| Growth Bottleneck Quiz | `/tools/growth-bottleneck-quiz` | ✅ Built |
| GEO Readiness Auditor | `/tools/geo-readiness-auditor` | ✅ Built |
| Attribution Snapshot | `/tools/attribution-snapshot` | ✅ Built |
| CMO Simulator | `/tools/cmo-simulator` | ✅ Built |
| MarTech Stack Grader | `/tools/martech-stack-grader` | ✅ Built |
| CMO Roadmap Generator | `/tools/cmo-roadmap-generator` | ✅ Built |

### Approved backlog tool candidates
```
Build vs Buy Calculator
Automation Savings Calculator
Revenue Physics Simulator
Tech Stack Scanner / X-Ray
Ad Waste Detector
AI Deflection ROI Simulator
Compliance Risk Scanner
Lead Scorer
```

### Priority tool build order (when prioritizing next tool)
1. MarTech Stack Grader improvements
2. Build vs Buy Calculator
3. Automation Savings Calculator
4. CMO Simulator improvements
5. Attribution Snapshot upgrades
6. CMO Roadmap Generator upgrade
7. Tech Stack Scanner / AI Deflection ROI / advanced scanners

---

## 12. SERVICES DEPTH RULES

`/services` exists but is not the primary path. It is the depth and evaluation layer.

### Service pages connect back to
- relevant problem cluster(s)
- relevant proof
- relevant diagnostic tool(s)

### High-priority service depth pages
```
fractional-cmo
website-rebuilds
crm-architecture
workflow-automation
local-seo
geo-readiness
positioning-strategy
marketing-audit
agentic-marketing-systems    ← highest priority new page (AI & Automation pillar)
ai-content-ops
ai-deflection-automation
```

Service pages must not read like generic agency capability blurbs.

---

## 13. COMPONENT CONVENTIONS

Prefer existing components before adding new ones. The repo is authoritative.

### Rules for every component
1. **Single responsibility.** One component = one job.
2. **No cross-folder imports.** `/proof/` does not import from `/tools/`. All shared UI from `/ui/` only.
3. **No inline styles.** All styling via Tailwind utility classes.
4. **No raw hex in `style={{ }}`** — use `bg-[#0C0C0E]` pattern in className instead.
5. **All images via `CloudinaryImage`.** No native `<img>`. No direct `<Image>` from next/image.
6. **Default motion:** Framer Motion via `AnimateOnScroll`. GSAP/Lenis/R3F/Spline for intentional heavy-motion or 3D surfaces only. Lazy-load 3D. Do not mount `useSmoothScroll` in root layout without scroll/anchor/accessibility QA.
7. **TypeScript strict.** No `any`. No `// @ts-ignore`. Type everything.
8. **Shadcn/UI for primitives.** Dialog, Select, Toast, Popover, Tabs, Card, Badge — use Shadcn. Install: `pnpm dlx shadcn@latest add [component]`. Do not overwrite the bespoke Darling `Button` with the CLI template.
9. **Server components by default.** Only add `"use client"` when strictly necessary.
10. **Props naming:** camelCase. Booleans as `isX` / `hasX`. Handlers as `onX`.

### Key Tailwind class patterns
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

## 14. API ROUTES & INTEGRATIONS

### `/api/contact` (POST)
ContactForm submission → Resend notification to Jacob → optional n8n → CRM.
When `ENABLE_LIVE_INTEGRATIONS=true`: Resend + n8n + CRM paths per `.env.example`.

### `/api/newsletter` (POST)
Footer `NewsletterSignup` → Resend audience contact (`{ "email": string }`).
Safe mock response when env not configured.

### `/api/subscribe` (POST)
EmailGate on tool pages → Loops (add subscriber + tag with tool name) → Resend (deliver result email).

### `/api/tools/geo-audit` (POST)
Body: `{ "url": "<https? public URL>" }`. Server fetches HTML (SSRF checks via
`src/lib/geo-audit-url.ts`), parses with Cheerio, returns `GeoAuditResponse`:
readiness score, per-signal checks, `rawXray` (canonical, robots, OG, JSON-LD, headings, links).

### `/api/tools/geo-audit/report` (POST)
Triggered by `GeoAuditEmailForm` after audit. Body: name, email, optional company,
`targetUrl`, full `audit` object. Honeypot field `website` — non-empty returns success without side effects.
Flow: Loops → Resend `sendGeoAuditReportEmail`.

### `/api/tool-complete` (POST)
QuizEngine on completion → PostHog (track event) → Supabase (log anonymous response).

### Integration env flags
Live integrations toggled with `ENABLE_LIVE_INTEGRATIONS=true` in `.env.example`.
All routes degrade gracefully in local/staging when env is not set.

---

## 15. SEO & METADATA

Every page must export metadata. Use Next.js 15 Metadata API.

```typescript
export const metadata: Metadata = {
  title: 'Page Title | Darling MarTech',
  description: 'Under 160 characters.',
  openGraph: {
    title: 'Page Title | Darling MarTech',
    description: '...',
    url: 'https://darlingmartech.com/page-path',
    siteName: 'Darling MarTech',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
}
```

### Internal linking rule
Use internal linking intentionally:
- problem → proof, problem → tool
- proof → problem, proof → service
- tool → proof, tool → service
- resource → tool / proof / problem / newsletter

### Schema markup (in layout.tsx)
- Person schema for Jacob
- LocalBusiness schema for Darling MarTech
- FAQPage schema on `/problems/[slug]` pages
- HowTo schema on `/process` page

---

## 16. ENVIRONMENT VARIABLES

```bash
# .env.example — commit this, not .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=jacob@darlingmt.com
RESEND_NEWSLETTER_AUDIENCE_ID=

# Loops
LOOPS_API_KEY=

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# n8n
N8N_WEBHOOK_URL_CONTACT=
N8N_WEBHOOK_URL_TOOL=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=c-5c7019a74c9c24ab5eda7e213055bd
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Cal.com
NEXT_PUBLIC_CAL_LINK=jacob-darling/30min

# Plausible
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=darlingmartech.com

# Stock discovery (server-only — never NEXT_PUBLIC_)
UNSPLASH_ACCESS_KEY=
PEXELS_API_KEY=
```

---

## 17. CLOUDINARY ASSET REFERENCE

**Cloud name:** `c-5c7019a74c9c24ab5eda7e213055bd`
**Studio folder:** `ce5a6853810907f3008cae3ee146ffed31`

```typescript
// src/lib/cloudinary.ts
const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${src}`
}
```

All production images use `CloudinaryImage`. No native `<img>`. No direct next/image `<Image>`.

---

## 18. CURRENT BUILD STATE (April 2026)

### Built
- ✅ Next.js 15 + TypeScript strict + Tailwind v4
- ✅ Fonts: Syne / Inter / JetBrains Mono via `next/font`
- ✅ Brand tokens: `globals.css` CSS variables + `@theme inline`
- ✅ Core deps: Framer Motion, Supabase, Resend, PostHog, Vercel Analytics
- ✅ Optional motion/3D: gsap, lenis, spline, three, R3F, Drei
- ✅ Homepage: copy-doc order, ProofTicker, DiagnosticOrangeBand, HomepageHero
- ✅ Problems: hub + 6 long-form `/problems/[slug]` pages
- ✅ Proof: 4 case files, `/proof?outcome=` filters, metric-first ProofCard
- ✅ Services: `/services`, `/services/[slug]`
- ✅ Tools: all slugs in labs.ts, Growth Bottleneck Quiz (8Q), GEO Readiness Auditor
- ✅ Process, About, Contact, Footer, Privacy Policy
- ✅ Resources hub, blog, frameworks, studio
- ✅ Legacy redirects `/work`→`/proof`, `/lab`→`/tools`
- ✅ Shadcn: card, badge, tabs, dialog + bespoke Darling Button
- ✅ PostHog + Plausible + analytics hooks

### Still-active build priorities
1. **AI & Automation pillar visibility** — homepage section + `/services/agentic-marketing-systems`
2. **Proof migration** — 317 BBQ, Behr, Hoosier Boy; strengthen Pike/Graston entries
3. **MarTech Stack Grader** — fuller utility, better result design
4. **Tool result gating** — partial-reveal + email-gate pattern on more tools
5. **Service depth pages** — fractional-cmo, ai-deflection-automation, geo-readiness
6. **Newsletter landing** — `/resources/newsletter`
7. **CTA trust-ladder consistency** — audit every page's closing CTA stage mapping
8. **n8n / Twenty CRM / Loops** — Phase 4 automation backend
9. **Cal.com wiring** — all CTA buttons in footer + contact + hero

---

## 19. SPRINT WORKFLOW

### Every session starts with Sprint 0
```bash
pnpm typecheck
```
Report pre-existing type errors before touching any files.
Do not fix errors in unrelated files without approval.

### Standard sprint flow
1. Read this file
2. Run `pnpm typecheck` — note pre-existing errors
3. Implement the sprint
4. Run `pnpm typecheck && pnpm build`
5. Fix all errors in modified files
6. Report: what changed · what to verify · what remains open · any decisions needed

### Definition of done
- `pnpm typecheck` passes with zero new errors
- `pnpm build` completes without error
- No hardcoded colors, slugs, or long-form copy that should live in data files
- All new components match the design system tokens
- No broken internal links introduced

**Never report a sprint complete if typecheck or build fails.**

---

## 20. ABSOLUTE DO-NOT-DO RULES

- ❌ Change the core brand palette
- ❌ Change the canonical fonts (Syne / Inter / JetBrains Mono)
- ❌ Use "we" for service delivery — solo operator; always "I" or "Jacob"
- ❌ Alter the verified proof metrics without Jacob's sign-off
- ❌ Use `any` TypeScript type
- ❌ Use inline styles `style={{ }}` — Tailwind only
- ❌ Hardcode long marketing copy in JSX — use data files
- ❌ Add new dependencies without flagging to Jacob
- ❌ Import architecture from the old `darling-martech` repo
- ❌ Reintroduce CSS Modules
- ❌ Invent new canonical problem slugs without approval
- ❌ Use `#c8f55a` lime anywhere in the codebase
- ❌ Create a README or documentation file unless explicitly asked
- ❌ Delete files without presenting a plan and getting confirmation
- ❌ Run `git push --force` without explicit approval
- ❌ Deploy to production without Jacob's explicit approval
- ❌ Weaken the problems-first architecture
- ❌ Reposition the site as a generic full-service agency

---

## 21. COPY SOURCES

**Canonical sources:**
- `docs/# DARLING MARTECH — COMPLETE SITE COPY.docx.md` — section order and wording
- `docs/DARLING MARTECH — COMPLETE SITE REBUILD BLUEPRINT.docx.md` — IA, taxonomy, tools funnel

**Implementation rule:** Prefer `src/data/*.ts` so copy updates are data edits.
Section titles and layout-specific strings may live near their components when it keeps
the page readable — avoid marketing copy sprawl in JSX.

**When rewriting legacy content:** do not paste raw. Rewrite to fit v2 taxonomy,
solo-operator voice, outcome-first proof structure, and trust-ladder CTA logic.

---

## 22. QUICK REFERENCE — MOST USED PATTERNS

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

### CTA Button
```tsx
<Button href="/contact" size="lg">Let&apos;s talk →</Button>
<Button href="/proof" variant="ghost">See the proof</Button>
```

### Proof metric
```tsx
<MonoMetric value="+212%" label="qualified leads — Graston Technique®" />
```

### Scroll animation
```tsx
<AnimateOnScroll delay={0.08}>
  <ProofCard caseStudy={caseStudy} />
</AnimateOnScroll>
```

### Case study data shape (abbreviated)
```typescript
import type { CaseStudy } from "@/types";

export const exampleStudy: CaseStudy = {
  slug: "graston-qualified-leads",
  primaryMetric: { value: "+212%", label: "Qualified leads generated", isHighlighted: true },
  primaryOutcomeSlug: "lead-gen",
  outcomeHeadline: "+212% qualified leads",
  trustLadderStage: "evaluate",
  featured: true,
  publishedAt: "2024-01-01",
};
```

---

## 23. FOUNDER INFO
```typescript
// src/data/site-config.ts
export const siteConfig = {
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
    description: 'The only martech owner-operator company that builds, integrates, and runs the full marketing stack for growth-stage businesses. One person. Complete accountability.',
    ogImage: '/og-default.png',
  },
}
```

**Career context (for About page):**
- 15 years marketing experience
- B.S. Business Management, Indiana University, 2008
- Industries: Healthcare · Legal · Finance · SaaS · Retail · Nonprofit · Local Service
- Founded Darling MarTech in 2026

---

## 24. FINAL OPERATING PRINCIPLE

This site is not a generic marketing agency website.

It is a precision diagnostic engine for the right buyers.

Every page, proof entry, tool, and CTA should help the visitor:
1. identify the real bottleneck
2. understand the consequence
3. see proof that it can be fixed
4. take the next right step at the right trust level

If a change does not strengthen that system, question it before implementing it.

---

*CLAUDE.md — Darling MarTech v1.7 · Repository root: `/CLAUDE.md`*
*Cursor: keep `.cursorrules` as a byte-for-byte copy of this file.*
*Do not edit this file without Jacob Darling's explicit approval.*
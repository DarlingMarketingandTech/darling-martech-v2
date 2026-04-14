# CLAUDE.md
# Darling MarTech — AI Agent Context File
# Version: 1.0 | Last updated: April 2026
# This file is the single source of truth for all AI agents working on this codebase.
# Read this entire file before writing any code, creating any files, or making any decisions.
# Do not deviate from the conventions defined here without explicit instruction from Jacob Darling.

---

## QUICK COMMANDS
```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm dlx shadcn@latest add [component]   # Add Shadcn component
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
**Email:** jacob@darlingmartech.com
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

## 4. REPOSITORY STRUCTURE
```
/
├── CLAUDE.md                          ← This file (root level, always)
├── .cursorrules                       ← Cursor-specific version of this context
├── .env.local                         ← Local secrets (never commit)
├── .env.example                       ← Committed env variable template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
│
├── public/
│   ├── favicon.ico
│   └── og-default.png
│
├── src/
│   ├── app/                           ← Next.js App Router pages
│   │   ├── layout.tsx                 ← Root layout (SiteHeader + SiteFooter)
│   │   ├── page.tsx                   ← Homepage (/)
│   │   ├── problems/
│   │   │   ├── page.tsx               ← Problems hub (/problems)
│   │   │   └── [slug]/
│   │   │       └── page.tsx           ← Individual problem pages (/problems/[slug])
│   │   ├── proof/
│   │   │   ├── page.tsx               ← Proof hub (/proof)
│   │   │   └── [slug]/
│   │   │       └── page.tsx           ← Individual case studies (/proof/[slug])
│   │   ├── tools/
│   │   │   ├── page.tsx               ← Tools hub (/tools)
│   │   │   └── [slug]/
│   │   │       └── page.tsx           ← Individual tool pages (/tools/[slug])
│   │   ├── process/
│   │   │   └── page.tsx               ← Process page (/process)
│   │   ├── about/
│   │   │   └── page.tsx               ← About page (/about)
│   │   ├── contact/
│   │   │   └── page.tsx               ← Contact page (/contact)
│   │   ├── studio/
│   │   │   └── page.tsx               ← Studio/visual archive (/studio)
│   │   ├── resources/
│   │   │   ├── page.tsx               ← Resources hub (/resources)
│   │   │   └── blog/
│   │   │       └── [slug]/
│   │   │           └── page.tsx       ← Blog posts (/resources/blog/[slug])
│   │   └── api/
│   │       ├── contact/
│   │       │   └── route.ts           ← Contact form submission → Resend + n8n
│   │       ├── subscribe/
│   │       │   └── route.ts           ← Email gate → Loops
│   │       └── tool-complete/
│   │           └── route.ts           ← Tool completion → PostHog + Loops
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── PageWrapper.tsx
│   │   │   ├── SectionWrapper.tsx
│   │   │   └── BandSection.tsx
│   │   ├── hero/
│   │   │   ├── PageHero.tsx
│   │   │   └── HomepageHero.tsx
│   │   ├── proof/
│   │   │   ├── ProofBar.tsx
│   │   │   ├── ProofCard.tsx
│   │   │   ├── ProofGrid.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── MetricDisplay.tsx
│   │   │   ├── ProofStrip.tsx
│   │   │   └── AntiClaimRow.tsx
│   │   ├── problems/
│   │   │   ├── ProblemCard.tsx
│   │   │   ├── ProblemHubGrid.tsx
│   │   │   ├── SymptomList.tsx
│   │   │   ├── DiagnosticCTA.tsx
│   │   │   └── ProblemNav.tsx
│   │   ├── tools/
│   │   │   ├── ToolCard.tsx
│   │   │   ├── ToolGrid.tsx
│   │   │   ├── ToolsPreviewBand.tsx
│   │   │   ├── QuizEngine.tsx
│   │   │   ├── QuizProgress.tsx
│   │   │   ├── QuizQuestion.tsx
│   │   │   ├── ResultCard.tsx
│   │   │   └── EmailGate.tsx
│   │   ├── process/
│   │   │   ├── ProcessStep.tsx
│   │   │   ├── ProcessTimeline.tsx
│   │   │   ├── PrincipleCard.tsx
│   │   │   ├── PrinciplesGrid.tsx
│   │   │   ├── EngagementFormatCard.tsx
│   │   │   ├── EngagementFormatsRow.tsx
│   │   │   ├── WhatIDontDoList.tsx
│   │   │   └── WhatGoodLooksLike.tsx
│   │   ├── about/
│   │   │   ├── FounderHero.tsx
│   │   │   ├── CredentialsBar.tsx
│   │   │   ├── CareerTimeline.tsx
│   │   │   ├── TimelineEntry.tsx
│   │   │   ├── DifferentiatorGrid.tsx
│   │   │   └── IndustriesBar.tsx
│   │   ├── contact/
│   │   │   ├── IntentSelector.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── WhatHappensNext.tsx
│   │   │   ├── AlternativePaths.tsx
│   │   │   └── DirectContactBlock.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Eyebrow.tsx
│   │       ├── Divider.tsx
│   │       ├── SectionHeader.tsx
│   │       ├── MonoMetric.tsx
│   │       ├── NavLink.tsx
│   │       ├── AnimateOnScroll.tsx
│   │       ├── CalEmbed.tsx
│   │       ├── CloudinaryImage.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── Toast.tsx
│   │       └── SkipToContent.tsx
│   │
│   ├── data/                          ← All site content as typed TS data files
│   │   ├── taxonomy.ts                ← PROBLEM_CLUSTERS, TRUST_LADDER_STAGES, OUTCOME_TAGS
│   │   ├── services.ts                ← Service cluster definitions
│   │   ├── process.ts                 ← Process steps, principles, engagement formats
│   │   ├── testimonials.ts            ← Testimonials
│   │   ├── navigation.ts              ← Primary nav + footer nav
│   │   ├── site-config.ts             ← SiteConfig, founder info, global settings
│   │   ├── problems.ts                ← ProblemPage data for all 6 clusters
│   │   ├── labs.ts                    ← Tool definitions (all 5 tools)
│   │   └── work/
│   │       ├── work-index.ts          ← All CaseStudy objects indexed
│   │       ├── graston-growth-engine.ts
│   │       ├── pike-medical.ts
│   │       └── russell-painting.ts
│   │
│   ├── lib/                           ← Utility functions and API clients
│   │   ├── supabase.ts                ← Supabase client
│   │   ├── cloudinary.ts              ← Cloudinary loader for next/image
│   │   ├── loops.ts                   ← Loops.so API helper
│   │   ├── resend.ts                  ← Resend client + email templates
│   │   ├── posthog.ts                 ← PostHog client
│   │   └── utils.ts                   ← cn(), formatDate(), etc.
│   │
│   ├── types/                         ← Global TypeScript type definitions
│   │   └── index.ts                   ← Re-exports all interfaces from data-model-spec
│   │
│   └── styles/
│       └── globals.css                ← Tailwind base + custom CSS custom properties
```

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
/problems (hub)
  /problems/no-strategy-owner
  /problems/site-not-converting
  /problems/disconnected-systems
  /problems/not-visible-enough
  /problems/brand-system-broken
  /problems/pipeline-not-predictable
/proof (hub)
  /proof/graston-growth-engine
  /proof/pike-medical
  /proof/russell-painting
/tools (hub)
  /tools/growth-bottleneck-quiz
  /tools/cmo-simulator
  /tools/martech-stack-grader
  /tools/geo-readiness-auditor
  /tools/attribution-snapshot
  /tools/cmo-roadmap-generator
/process
/about
/contact
/studio
/resources
  /resources/blog/[slug]
  /resources/frameworks
```

### Footer Navigation (full depth)
```
Column 1 — Work:          Proof Hub, Case Studies, Studio
Column 2 — Services:      Problems Hub, How I Work (Process), Tools
Column 3 — Company:       About, Contact, Resources
Column 4 — Contact:       jacob@darlingmartech.com, Indianapolis IN, Cal.com link
```

---

## 7. DATA MODELS

All interfaces are defined in `darlingmartech-data-model-spec.md` and live in
`src/data/` as TypeScript `.ts` files. Below are the critical conventions.

### Taxonomy Constants (src/data/taxonomy.ts)
```typescript
PROBLEM_CLUSTERS = [
  'pipeline-not-converting',
  'attribution-is-broken',
  'systems-disconnected',
  'no-marketing-infrastructure',
  'cant-scale-without-hiring',
  'strategy-without-execution',
]

TRUST_LADDER_STAGES = ['browse', 'evaluate', 'qualify', 'commit', 'return']

OUTCOME_TAGS = [
  'Pipeline Growth', 'Systems Built', 'MarTech Integration',
  'Attribution & Analytics', 'Automation', 'CRM Architecture',
]
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
```
graston-growth-engine
pike-medical
russell-painting
```

### Problem Cluster Slugs (src/data/problems.ts)
```
no-strategy-owner
site-not-converting
disconnected-systems
not-visible-enough
brand-system-broken
pipeline-not-predictable
```

### Tool Slugs (src/data/labs.ts)
```
growth-bottleneck-quiz    ← PRIMARY LEAD GEN TOOL — highest priority to build
cmo-simulator             ← Existing (live)
martech-stack-grader      ← New
geo-readiness-auditor     ← Existing (live)
attribution-snapshot      ← Existing (live)
cmo-roadmap-generator     ← Existing (live)
```

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

All page copy has been written and approved. Do not write new copy from scratch.
Pull copy directly from these source docs:

| Page | Copy Doc | Doc ID |
|---|---|---|
| Homepage (/) | darlingmartech-homepage-copy.md | 1NwX-l2TUxfKc7zLvHMXiJCix3R3uKh3FoIs2AYv9HcI |
| Problems Hub + 6 slugs | darlingmartech-problems-hub-copy.md | 1ACSy6VcB5J9y02ote-PZE9kv9LEyqe19tOHmU5sJqdI |
| Proof Hub | darlingmartech-proof-copy.md | 1x_H1ZbYshNU7utkc5pXKbQQdNabGF3UoMMsIhyV8cek |
| Tools Hub | darlingmartech-tools-copy.md | 1ZNauuJOy4eiE3BNVpHxBqVUgFfhP8hOsb5Vc_Xuos78 |
| Process | darlingmartech-process-copy.md | 19zfPT1OE9-SGxU59mRDAn4sRO1iF9rLQzqGEiwtfK4o |
| About | darlingmartech-about-copy.md | 10BnF2JTfbxkbMwoPcn6qKB-DIoOzWlDnIePGylbCCa8 |
| Contact | darlingmartech-contact-copy.md | 1S9V1FOJeSa0hewYa37hj-n3CYh5hp05Tm3SC8QOSWgY |

**Copy implementation rule:** All static copy lives in the data files (`src/data/`),
not hardcoded inside component JSX. Components receive copy as props or read from
data objects. This makes copy updates a data change, not a code change.

---

## 10. COMPONENT CONVENTIONS

Full component inventory (60 components, 9 categories) is documented in
`darlingmartech-component-inventory.md`.

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
Triggered by ContactForm submission.
Flow: Formbricks webhook → `/api/contact` → Resend (confirmation email to Jacob)
      → n8n webhook → Twenty CRM (create contact) → Loops (start nurture sequence)

Required env vars:
```
RESEND_API_KEY
N8N_WEBHOOK_URL_CONTACT
LOOPS_API_KEY
```

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
- Internal linking: every `/proof/[slug]` page links to its relevant `/problems/[slug]`
- Every `/problems/[slug]` page links to its relevant tool

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
RESEND_FROM_EMAIL=jacob@darlingmartech.com

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

### Current Build State (as of April 2026)
- ✅ Next.js 15 + TypeScript (strict) + Tailwind v4 initialized
- ✅ `src/types/index.ts` — all interfaces defined
- ❌ Fonts: `layout.tsx` uses Geist — **must replace with Syne/Inter/JetBrains Mono**
- ❌ `globals.css`: has default Next.js vars — **must replace with brand color tokens**
- ❌ Shadcn/UI, Framer Motion, Supabase, Resend, PostHog — not yet installed
- ❌ `src/data/`, `src/components/`, `src/lib/` — not yet created
- ❌ `src/app/page.tsx` — still default Next.js template (replace before Phase 1)

### Phase 0 — Foundation (Day 1)
- [ ] Init new Next.js 15 repo with TypeScript + Tailwind + Shadcn/UI
- [ ] Configure Vercel deployment + custom domain staging URL
- [ ] Create `CLAUDE.md` and `.cursorrules` at root
- [ ] Set up `src/data/taxonomy.ts` with all constants
- [ ] Set up `src/data/site-config.ts` with SiteConfig
- [ ] Set up `src/styles/globals.css` with CSS custom properties + Tailwind base
- [ ] Configure `next/font` with Syne, Inter, JetBrains Mono
- [ ] Build `SiteHeader`, `SiteFooter`, `PageWrapper`, `SectionWrapper`
- [ ] Build shared UI primitives: `Button`, `Eyebrow`, `SectionHeader`, `AnimateOnScroll`
- [ ] Set up Supabase project + connect client
- [ ] Set up Resend account + React Email templates

### Phase 1 — Core Pages (Week 1-2)
- [ ] Homepage (/) — all 11 sections from copy doc
- [ ] Problems hub (/problems) — hub + all 6 slug pages
- [ ] Proof hub (/proof) — hub + all 3 case study pages
- [ ] Wire Cal.com into all CTA buttons

### Phase 2 — Conversion Engine (Week 2-3)
- [ ] Build `QuizEngine` + all sub-components
- [ ] Build Growth Bottleneck Quiz (`/tools/growth-bottleneck-quiz`) — HIGHEST PRIORITY
- [ ] Build `EmailGate` → connect to Loops API route
- [ ] Add MarTech Stack Grader (`/tools/martech-stack-grader`)
- [ ] Wire Formbricks to contact form
- [ ] Set up PostHog funnel tracking on all tool pages
- [ ] Set up Plausible on all pages

### Phase 3 — Secondary Pages (Week 3-4)
- [ ] Process page (/process)
- [ ] About page (/about) — with Cloudinary portrait
- [ ] Contact page (/contact)
- [ ] Tools hub page (/tools)
- [ ] Deploy remaining existing tools to new slug structure

### Phase 4 — Automation Backend (Week 4-5)
- [ ] Stand up n8n on Railway
- [ ] Build contact form → CRM workflow
- [ ] Build tool completion → email sequence workflow
- [ ] Stand up Twenty CRM on Railway
- [ ] Import existing contacts into Twenty CRM
- [ ] Set up Loops welcome sequence (5 emails)

### Phase 5 — Authority Layer (Month 2)
- [ ] Resources hub (/resources) + blog
- [ ] Write first 3 blog posts (from content calendar)
- [ ] Set up Loops newsletter broadcast
- [ ] Studio page (/studio) — Cloudinary-powered visual archive
- [ ] Downloadable frameworks (email-gated)

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
- Run `pnpm dev` and check for TypeScript errors before declaring a task complete

### Cursor specific:
- `.cursorrules` at repo root mirrors this file in Cursor's instruction format
- Use `@codebase` context for questions about your own repo
- Use `@docs` for pulling in Shadcn, Next.js, Tailwind, and n8n documentation

---

## 17. FOUNDER INFO (USE IN COPY AND DATA)
```typescript
// src/data/site-config.ts
export const siteConfig: SiteConfig = {
  name: 'Darling MarTech',
  url: 'https://darlingmartech.com',
  founder: {
    name: 'Jacob Darling',
    email: 'jacob@darlingmartech.com',
    location: 'Indianapolis, IN',
    title: 'Founder, Darling MarTech',
  },
  calComLink: 'https://cal.com/jacob-darling',
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

### Standard page section pattern:
```tsx


  {/* Section content */}

```

### Standard CTA button pattern:
```tsx


```

### Standard proof metric pattern:
```tsx
<MonoMetric value=
"+212%" label="Qualified leads · Graston Technique®" size="lg" />
Standard AnimateOnScroll pattern:
tsx<AnimateOnScroll direction="up" delay={0.1}>
  <ProofCard caseStudy={caseStudy} />
</AnimateOnScroll>
Standard CloudinaryImage pattern:
tsx<CloudinaryImage
  publicId="studio/jacob-portrait"
  alt="Jacob Darling, Founder of Darling MarTech"
  width={600}
  height={800}
  priority={true}
/>
Standard data file export pattern:
typescript// src/data/work/graston-growth-engine.ts
import type { CaseStudy } from '@/types'

export const grastonGrowthEngine: CaseStudy = {
  slug: 'graston-growth-engine',
  title: 'Full MarTech Ecosystem Build',
  clientName: 'Graston Technique®',
  clientContext: 'National healthcare provider training organization',
  location: 'Indianapolis, IN',
  timeline: '18-month fractional engagement',
  engagementFormat: 'fractional',
  outcomeTags: ['Pipeline Growth', 'MarTech Integration'],
  problemClusters: ['systems-disconnected', 'pipeline-not-converting'],
  trustLadderStage: 'evaluate',
  metrics: [
    { value: '+212%', label: 'Qualified leads generated', isHighlighted: true },
    { value: '95%', label: 'Overhead reduction' },
    { value: '81', label: 'Providers in live spatial directory' },
  ],
  primaryMetric: { value: '+212%', label: 'Qualified leads generated', isHighlighted: true },
  resultSummary: 'Replaced disconnected point tools with an integrated MarTech ecosystem. Pipeline went from untracked to fully attributed in 90 days.',
  systemsBuilt: ['HubSpot', 'Cloudflare Workers', 'Leaflet / Spatial Search', 'Attribution Layer'],
  liveUrl: 'https://graston-growth-engine.jacob-ba2.workers.dev',
  featured: true,
  publishedAt: '2024-01-01',
}

19. THINGS TO NEVER DO (ABSOLUTE RULES)
These are non-negotiable. Not preferences. Rules.

Never change the brand color palette. Not even slightly. #F05A28 is orange. It stays #F05A28.
Never use "we" to describe service delivery. Jacob is one person. "I" only.
Never alter the verified proof metrics. +212%, +45%, 95%, 4.9★ are exact and verified.
Never hardcode copy in JSX. All copy comes from src/data/ files or props.
Never use CSS Modules. Tailwind only.
Never use any TypeScript type. Find the right type or create one.
Never import from the old darling-martech repo.
Never add a new dependency without flagging it to Jacob first.
Never skip the data model step. Build the data file before the UI component.
Never deploy to production without Jacob's explicit sign-off.


20. SUPPORT DOCS REFERENCE
All source documents are in Google Drive / Google Docs. Reference these for detail:
DocumentPurposeDARLING MARTECH — MASTER GROWTH STRATEGY v2.0Full strategic positioning, site architecture, tech stack, phased build roadmapDARLING MARTECH — PRE-BUILD MASTER STRATEGYBrand identity, visual system, GTM strategy, ICP definitions, creative strategyDARLING MARTECH — COMPLETE SITE REBUILD BLUEPRINTTaxonomy system, data model implementation, navigation structure, proof reorganizationDarling MarTech Project Analysis & Strategic Fit AssessmentCase study analysis, proof point documentation, project-to-strategy mappingdarlingmartech-homepage-copy.mdHomepage copy — all 11 sectionsdarlingmartech-problems-hub-copy.mdProblems hub + all 6 slug page copydarlingmartech-proof-copy.mdProof hub page copydarlingmartech-tools-copy.mdTools hub page copydarlingmartech-process-copy.mdProcess page copydarlingmartech-about-copy.mdAbout page copydarlingmartech-contact-copy.mdContact page copydarlingmartech-data-model-spec.mdFull TypeScript interfaces for all data typesdarlingmartech-component-inventory.md60 components across 9 categories with props and page usage

21. FINAL NOTE TO ALL AI AGENTS
This site is not a template. It is not a portfolio. It is a precision diagnostic tool
built to do one thing: identify the right clients, qualify them automatically, and
make the decision to hire Jacob Darling feel obvious before the first conversation.
Every component you build, every line of copy you render, every CTA you place should
serve that mission. If you're about to build something that doesn't serve it —
stop and ask Jacob before proceeding.
The quality bar for this site is: it should look like it was built by a senior
martech engineer who has been doing this for 15 years and charges accordingly.
Because it was.

CLAUDE.md — Darling MarTech v1.0
Do not edit this file without Jacob Darling's explicit approval.
Place this file at the root of the repository: /CLAUDE.md
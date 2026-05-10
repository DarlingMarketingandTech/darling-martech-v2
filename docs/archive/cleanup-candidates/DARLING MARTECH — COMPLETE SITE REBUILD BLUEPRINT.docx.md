# **DARLING MARTECH — COMPLETE SITE REBUILD BLUEPRINT**

Based on deep analysis of your repo (Next.js 16 App Router, TypeScript, CSS Modules, Framer Motion), your live site (all 8+ pages), your existing data models (taxonomy.ts, services.ts, work-data.ts, work-index.ts, labs.ts, process.ts, testimonials.ts), and patterns from 12+ competitor sites.

---

## **SECTION 1: FULL WEBSITE STRUCTURE MAP**

### **Current Structure (What You Have)**

`darlingmartech.com/`  
├── / (home)           ← Hero → Services → Tools → Case Studies → Testimonials → CTA  
├── /work              ← Case study index (filter: All | Client Work | Systems | Brand)  
│   └── /work/\[slug\]   ← Individual case study detail pages  
├── /services          ← Four bottleneck clusters → links to service detail pages  
│   └── /services/\[slug\] ← e.g., fractional-cmo, martech-audit, etc.  
├── /tools             ← Four diagnostic utilities index  
│   ├── /tools/cmo-simulator  
│   ├── /tools/geo-readiness-auditor  
│   ├── /tools/cmo-roadmap-generator  
│   └── /tools/attribution-snapshot  
├── /process           ← "How I Work" — problems, engagement shapes, cadence  
├── /studio            ← Cloudinary-powered visual archive  
├── /about             ← Bio, credentials, career timeline  
├── /contact           ← Intent-based form (4 starting points)  
├── /privacy-policy  
├── /lab               ← Legacy (redirects to /tools)  
│   └── /lab/\[slug\]  
└── /api/  
    ├── contact  
    ├── studio/images  
    └── cmo-simulator-access

### **Recommended New Structure**

`darlingmartech.com/`  
│  
├── / (home)                      ← REDESIGNED (see Section 3\)  
│  
├── /problems                     ← NEW: Replaces /services as primary nav item  
│   ├── /problems/no-one-steering          ← "No one owns the marketing system"  
│   ├── /problems/site-underperforms       ← "The site looks fine but underperforms"  
│   ├── /problems/systems-disconnected     ← "CRM, leads, and follow-up don't connect"  
│   └── /problems/invisible-to-buyers      ← "Visibility doesn't match capability"  
│  
├── /services                     ← KEPT: but repositioned as depth layer  
│   ├── /services/fractional-cmo  
│   ├── /services/positioning-strategy  
│   ├── /services/marketing-audit  
│   ├── /services/website-rebuilds  
│   ├── /services/conversion-ux  
│   ├── /services/brand-identity  
│   ├── /services/crm-architecture  
│   ├── /services/workflow-automation  
│   ├── /services/ai-integrations  
│   ├── /services/local-seo  
│   ├── /services/geo-readiness  
│   └── /services/content-systems  
│  
├── /proof                        ← RENAMED from /work, REORGANIZED by outcome  
│   ├── /proof?outcome=lead-gen           ← Filter: Lead Generation  
│   ├── /proof?outcome=conversion-lift    ← Filter: Conversion Lift  
│   ├── /proof?outcome=time-saved         ← Filter: Time Saved / Overhead Reduction  
│   ├── /proof?outcome=traffic-growth     ← Filter: Traffic & Visibility Growth  
│   ├── /proof?outcome=brand-awareness    ← Filter: Brand Awareness  
│   └── /proof/\[slug\]                     ← Individual case study detail (same as current)  
│  
├── /tools                        ← ELEVATED: now primary nav item  
│   ├── /tools/cmo-simulator  
│   ├── /tools/geo-readiness-auditor  
│   ├── /tools/cmo-roadmap-generator  
│   ├── /tools/attribution-snapshot  
│   ├── /tools/martech-stack-grader       ← NEW: lightweight self-assess  
│   └── /tools/growth-bottleneck-quiz     ← NEW: routes visitor to right problem page  
│  
├── /resources                    ← NEW: educational authority layer  
│   ├── /resources/blog                   ← Articles, playbooks, frameworks  
│   │   └── /resources/blog/\[slug\]  
│   ├── /resources/frameworks             ← Downloadable strategy frameworks  
│   └── /resources/newsletter             ← Newsletter signup landing page  
│  
├── /process                      ← KEPT: "How I Work"  
├── /studio                       ← KEPT: visual archive  
├── /about                        ← KEPT: bio \+ timeline  
├── /contact                      ← ENHANCED: intent-based \+ booking  
└── /privacy-policy

### **New Primary Navigation**

`[ Problems We Solve ]  [ Proof ]  [ Tools ]  [ Resources ]  [ About ]  [ Start Here → ]`

**Why this order:** The visitor journey is: "Do you understand my problem?" → "Can you prove you've solved it?" → "Can I test your thinking for free?" → "Can I learn from you?" → "Who are you?" → "I'm ready."

### **New Footer Navigation (Full Depth)**

`PROBLEMS                  SERVICES                 PROOF              TOOLS              RESOURCES`  
`No one steering           Fractional CMO           By outcome         CMO Simulator      Blog`  
`Site underperforms        Positioning Strategy     By industry        GEO Auditor        Frameworks`  
`Systems disconnected      Marketing Audit          By service type    Roadmap Generator  Newsletter`  
`Invisible to buyers       Website Rebuilds                            Attribution Snap`  
                          `CRM Architecture                            Stack Grader`  
                          `Workflow Automation                          Bottleneck Quiz`  
                          `+ more`

`HOW I WORK    ABOUT    STUDIO    CONTACT    PRIVACY`  
---

## **SECTION 2: NEW TAXONOMY SYSTEM**

### **Changes to `data/taxonomy.ts`**

Your existing taxonomy already has `SERVICE_TAGS`, `INDUSTRY_TAGS`, and `OUTCOME_TAGS`. Here's what needs to be added/modified:

**Add: PROBLEM\_CLUSTERS** (new primary taxonomy)

`export const PROBLEM_CLUSTERS = {`  
  `'no-one-steering':       'No one owns the marketing system',`  
  `'site-underperforms':    'The site looks fine but underperforms',`  
  `'systems-disconnected':  'CRM, leads, and follow-up don't connect',`  
  `'invisible-to-buyers':   'Visibility doesn't match your capability',`  
`} as const`

**Add: ENGAGEMENT\_SHAPES** (already on /process, formalize in taxonomy)

`export const ENGAGEMENT_SHAPES = {`  
  `'audit-advisory':     'Audit / Advisory',`  
  `'project-build':      'Project Build',`  
  `'embedded-fractional': 'Embedded / Fractional',`  
`} as const`

**Add: TRUST\_LADDER\_STAGES** (new — drives CTA logic)

`export const TRUST_LADDER_STAGES = {`  
  `'browse':        'Just browsing',`  
  `'diagnose':      'Self-diagnosing with tools',`  
  `'learn':         'Learning through resources',`  
  `'evaluate':      'Evaluating proof and services',`  
  `'ready':         'Ready to talk',`  
`} as const`

**Modify: OUTCOME\_TAGS** (add missing outcomes your case studies actually demonstrate)

`export const OUTCOME_TAGS = {`  
  `'lead-gen':              'Lead Generation',`  
  `'conversion-lift':       'Conversion Lift',`  
  `'time-saved':            'Overhead Reduction',`  
  `'revenue-attribution':   'Revenue Attribution',`  
  `'retention':             'Retention',`  
  `'brand-awareness':       'Brand Awareness',`  
  `'cost-reduction':        'Cost Reduction',`  
  `'traffic-growth':        'Traffic Growth',`  
  `'booking-growth':        'Booking Growth',`  
  `'pipeline-automation':   'Pipeline Automation',      // NEW`  
  `'system-consolidation':  'System Consolidation',     // NEW`  
  `'compliance-trust':      'Compliance & Trust',       // NEW`  
`} as const`  
---

## **SECTION 3: CATEGORIZED PROOF (Outcome-Based Case Study Reorganization)**

### **Current Case Studies Mapped to New Outcome Categories**

Here's every case study on your site, reassigned from industry categories to outcome-first taxonomy:

**LEAD GENERATION**

| Case Study | Outcome Headline | Supporting Metric |
| ----- | ----- | ----- |
| Graston Technique | Marketing automation replaced 8 manual processes | \+212% qualified leads |
| Investment ROI Planner | Interactive tool converted complex value prop | \+212% qualified leads |
| Smart Sales & Pricing Tool | Self-serve pricing removed sales friction | \+38% lead-to-demo conversion |

**CONVERSION LIFT**

| Case Study | Outcome Headline | Supporting Metric |
| ----- | ----- | ----- |
| Pike Medical Consultants | Multi-division digital strategy unified under one lead | 45% patient growth over 3 years |
| PrimaryCare Indy | Booking UX redesign for primary care division | 75% more online bookings |
| UrgentCare Indy | Conversion-focused urgent care experience | \+35% patient bookings |
| Russell Painting | Local trust signals turned search into appointments | 4.9-star local trust conversion |

**OVERHEAD REDUCTION / TIME SAVED**

| Case Study | Outcome Headline | Supporting Metric |
| ----- | ----- | ----- |
| The Launchpad | Training pipeline automation replaced manual enrollment | 95% overhead reduction |
| The Closer | Automated invoicing eliminated manual billing | 0 manual invoices post-deployment |
| The Compass | Platform monitoring achieved near-perfect uptime | 99.98% uptime SLA |
| The Fortress | Security automation blocked threats at scale | 85K+ threats blocked/month |

**SYSTEM CONSOLIDATION / PIPELINE AUTOMATION**

| Case Study | Outcome Headline | Supporting Metric |
| ----- | ----- | ----- |
| Graston Growth Engine | Real-time spatial search connected practitioners to events | Viewport spatial search |
| Clinical Compass | Digital wayfinding reached certified practitioner network | 400+ practitioners reached |
| License Requirements Navigator | State licensing complexity indexed into self-serve tool | 50 states indexed |
| Barbershop Command Center | Custom booking \+ admin system replaced disconnected tools | Public booking \+ command center |

**BRAND AWARENESS / IDENTITY**

| Case Study | Outcome Headline | Supporting Metric |
| ----- | ----- | ----- |
| 317 BBQ | Menu-first UX with Indiana identity for restaurant launch | Menu-first UX, catering pathway |
| Black Letter | Brand identity system | Brand identity |
| Clean Aesthetic | Brand identity system | Brand identity |
| Perpetual Movement Fitness | Brand identity system | Brand identity |

**TRAFFIC GROWTH**

| Case Study | Outcome Headline | Supporting Metric |
| ----- | ----- | ----- |
| Behr Pet Essentials | E-commerce brand \+ product strategy | E-commerce conversion |
| Circle City Kicks | Local e-commerce brand building | E-commerce |

### **How Proof Cards Should Render**

Each card on /proof should follow this hierarchy:

┌─────────────────────────────────────────┐  
│ \[OUTCOME TAG\]  Lead Generation          │  ← Primary: outcome badge  
│                                         │  
│ \+212% qualified leads                   │  ← Hero: the metric  
│                                         │  
│ Automated 8 manual processes into a     │  ← What changed: one-sentence  
│ unified marketing pipeline              │     problem→solution summary  
│                                         │  
│ Graston Technique · Healthcare · SaaS   │  ← Tertiary: client, industry  
│                                         │  
│ \[Read full proof →\]                     │  ← CTA  
└─────────────────────────────────────────┘

### **Implementation in `data/work/work-index.ts`**

Each work entry needs a new `primaryOutcome` field and an `outcomeHeadline` field:

typescript  
`{`  
  `slug: 'graston-technique',`  
  `title: 'Graston Technique',`  
  `primaryOutcome: 'lead-gen',          // NEW: from OUTCOME_TAGS`  
  `outcomeHeadline: '+212% qualified leads',  // NEW: scannable metric`  
  `problemCluster: 'systems-disconnected',     // NEW: links to /problems`  
  `// ... existing fields`  
`}`  
```` ``` ````

`---`

`## SECTION 4: PROBLEMS WE SOLVE (Service Reframe)`

``### New `/problems` Pages — Structure for Each``

`Each problem page replaces what was a services category with a complete problem-to-solution narrative:`

``**`/problems/no-one-steering`** — "No one owns the marketing system"``  
```` ``` ````  
`SECTION 1: Problem Recognition`  
  `"Your marketing has activity — social posts go out, ads run, the site exists —`  
   `but no one is actually steering the strategy underneath it all.`  
   `Priorities drift. Vendors contradict each other. Reporting doesn't connect`  
   `to decisions. Growth gets harder to trust."`

`SECTION 2: What's Usually Broken (diagnostic checklist)`  
  □ Marketing priorities change quarterly with no strategic anchor  
  □ Multiple vendors/freelancers but no one connecting their work  
  □ Leadership can't answer "what's working?" with confidence  
  □ Channel spend decisions are based on gut, not measurement  
  □ No 90-day roadmap exists — just a task list

`SECTION 3: How I Fix This (service mapping)`  
  `→ Fractional CMO / Strategic Leadership`  
  `→ Marketing Audit & Growth Roadmap`  
  `→ Positioning & Messaging Strategy`  
  `[Each links to its /services/[slug] detail page]`

`SECTION 4: Proof That This Gets Fixed`  
  `→ Pike Medical Consultants (45% patient growth, multi-division strategy)`  
  `→ Graston Technique (+212% qualified leads, full system rebuild)`  
  `[Outcome-card format, not portfolio thumbnails]`

`SECTION 5: Diagnose Before You Engage (Tool CTA)`  
  `"Run a CMO-level decision session and expose priority gaps."`  
  `→ [Launch CMO Simulator]`

`SECTION 6: Ready to Talk?`  
  `→ [Start a Conversation] (primary)`  
  `→ [Get a MarTech Audit] (secondary)`  
```` ``` ````

``**`/problems/site-underperforms`** — "The site looks fine but underperforms"``

`Same structure, but:`  
`- Diagnostic checklist: bounce rate high, trust signals weak, no conversion path, mobile broken, etc.`  
`- Services: Website Strategy & Rebuilds, Conversion UX & Lead Flow, Brand Identity Systems`  
`- Proof: 317 BBQ, Pike Medical, Hoosier Boy Barbershop`  
`- Tool CTA: CMO Roadmap Generator`

``**`/problems/systems-disconnected`** — "CRM, leads, and follow-up don't connect"``

`Same structure, but:`  
`- Diagnostic checklist: manual follow-up, data in spreadsheets, no automation, reporting in silos`  
`- Services: CRM Architecture, Workflow Automation, Custom Tools, MarTech Audit`  
`- Proof: The Launchpad, The Closer, Graston Growth Engine, Barbershop Command Center`  
`- Tool CTA: Attribution Snapshot`

``**`/problems/invisible-to-buyers`** — "Visibility doesn't match your capability"``

`Same structure, but:`  
`- Diagnostic checklist: ranking on page 2+, AI search doesn't mention you, content exists but doesn't rank`  
`- Services: Local SEO, GEO/AI Search Readiness, Content Systems, Conversion Optimization`  
`- Proof: Russell Painting, PrimaryCare Indy`  
`- Tool CTA: GEO Readiness Auditor`

`` ### How These Connect Back to `/services` ``

``The `/services` page still exists but becomes the "full capabilities menu" — positioned more like a reference than a primary pathway. Visitors land on `/problems` first, then drill into `/services/[slug]` for specifics. The relationship is:``  
```` ``` ````  
`/problems/no-one-steering`  
  `→ links to /services/fractional-cmo`  
  `→ links to /services/marketing-audit`  
  `→ links to /services/positioning-strategy`

`/services/fractional-cmo`  
  `→ back-link to /problems/no-one-steering`  
  `→ links to relevant /proof/[slug]`  
  `→ CTA: relevant tool + contact`  
```` ``` ````

`---`

`## SECTION 5: CTA ESCALATION STRATEGY & TRUST LADDER`

`### The Five-Level Trust Ladder`  
```` ``` ````  
`LEVEL 1: ZERO COMMITMENT — "Let me see if this is relevant"`  
├── Entry: Lands on /problems page, reads diagnostic checklist  
├── Action: Self-identifies with a problem  
├── CTA: "Run a free diagnostic" → /tools/\[relevant-tool\]  
├── Data captured: None  
└── Next level trigger: Uses a tool, sees output

`LEVEL 2: LOW COMMITMENT — "I'll trade my email for ongoing value"`  
├── Entry: Tool output page, blog post, homepage  
├── Action: Subscribes to newsletter or downloads framework  
├── CTA: "Get a weekly martech insight for operators"  
├── Data captured: Email address  
├── Placement: Every tool output page, blog sidebar, homepage section  
└── Next level trigger: Opens emails, returns to site

`LEVEL 3: MEDIUM COMMITMENT — "I want a specific answer"`  
├── Entry: /problems page, /services page, tool output  
├── Action: Requests a MarTech Audit or Paid Diagnostic  
├── CTA: "Get a MarTech Audit" ($500-1,500 positioning)  
├── Data captured: Email, company, problem description  
├── Placement: Bottom of every /problems page, /services detail pages  
└── Next level trigger: Audit completed, recommendations delivered

`LEVEL 4: HIGH COMMITMENT — "Let's scope real work"`  
├── Entry: /contact, direct referral, audit follow-up  
├── Action: Starts a project conversation  
├── CTA: "Start a conversation" / "Scope a project"  
├── Data captured: Full intake (existing contact form)  
└── Next level trigger: Proposal sent

`LEVEL 5: ENGAGED — "We're working together"`  
├── Entry: Signed engagement  
├── Action: Retainer, project, or embedded work  
└── Expansion: Referrals, expanded scope, case study permission  
```` ``` ````

`### CTA Placement Matrix (Which CTAs Go Where)`

`| Page | Level 1 CTA | Level 2 CTA | Level 3 CTA | Level 4 CTA |`  
`|---|---|---|---|---|`  
`| **Homepage** | "Find your problem" → /problems | Newsletter signup | — | "Start here →" → /contact |`  
`| **Problem pages** | Diagnostic tool link | Newsletter signup | "Get a MarTech Audit" | "Start a conversation" |`  
`| **Proof index** | — | Newsletter signup | "Get a MarTech Audit" | "Start a conversation" |`  
`| **Proof detail** | Related tool link | Newsletter signup | — | "Discuss a similar project" |`  
`| **Tools index** | Run a tool | — | — | "Talk through your output" |`  
`| **Tool output** | — | "Get weekly insights" | "Turn output into a workplan" | — |`  
`| **Resources/Blog** | — | Newsletter signup | Relevant tool link | "Start a conversation" |`  
`| **Process** | Guided tool path | — | "Request a MarTech Audit" | "Start a project" |`  
`| **Services detail** | Related tool CTA | Newsletter signup | "Get a MarTech Audit" | "Start a project" |`  
`| **About** | — | — | — | "Get in touch" |`

`---`

`## SECTION 6: LEAD GENERATION VALUE-FIRST TOOLS — Mapped to Every Area`

`### Existing Tools (Keep & Enhance)`

`` **CMO Simulator** — Maps to: `/problems/no-one-steering` ``  
`- Current: Runs a CMO-level decision session`  
`- Enhancement: Add email gate on the OUTPUT (not the input). Let them run the session free, then ask for email to save/export the result.`  
`- Placement: /problems/no-one-steering, /services/fractional-cmo, homepage tools section, /process`

`` **GEO Readiness Auditor** — Maps to: `/problems/invisible-to-buyers` ``  
`- Current: Checks if AI search can find your business`  
`- Enhancement: Add a "Get your full report emailed" option after the score is generated`  
`- Placement: /problems/invisible-to-buyers, /services/local-seo, /services/geo-readiness, homepage`

`` **CMO Roadmap Generator** — Maps to: `/problems/site-underperforms` AND `/problems/no-one-steering` ``  
`- Current: Turns constraints and goals into a 90-day plan`  
`- Enhancement: "Want me to review your roadmap?" → links to MarTech Audit`  
`- Placement: /problems/site-underperforms, /process, /services/marketing-audit`

`` **Attribution Snapshot** — Maps to: `/problems/systems-disconnected` ``  
`- Current: Compares four attribution models on uploaded data`  
`- Enhancement: "Need help fixing what this reveals?" → links to /contact`  
`- Placement: /problems/systems-disconnected, /services/crm-architecture`

`### NEW Tools to Build`

`**Growth Bottleneck Quiz** — Maps to: ALL problem pages (top-of-funnel router)`  
`- Purpose: 5-7 questions that identify which of the four problem clusters the visitor falls into`  
`- Output: "Your biggest bottleneck is [X]. Here's what to look at first." → routes to the right /problems page`  
`- Lead capture: Optional email to save result`  
`- Placement: **Homepage hero section** (primary Level 1 CTA), /tools index`  
`- Inspiration: Jessica Osborn's "Which Business Phase Are You In?" assessment`

`` **MarTech Stack Grader** — Maps to: `/problems/systems-disconnected` ``  
`- Purpose: Visitor lists their current tools (CRM, email, analytics, CMS) and gets a connectivity/health score`  
`- Output: Score + gaps identified + "here's what a connected stack looks like"`  
`- Lead capture: Email gate on detailed recommendations`  
`- Placement: /problems/systems-disconnected, /services/martech-audit, /tools index`  
`- Inspiration: Rubicon Agency's "4Ms of Content" assessment`

`### Tool-to-Conversion Flow (The Engine)`  
```` ``` ````  
`VISITOR ARRIVES`  
    `↓`  
`[Homepage] "Which sounds most like your situation?" → Growth Bottleneck Quiz`  
    `↓`  
`[Quiz Result] "Your biggest constraint is: systems are disconnected"`  
    `↓                                              ↓`  
`[/problems/systems-disconnected]             [Email: "Save your result"]`  
    `↓                                              ↓`  
`[Run Attribution Snapshot]                   [Newsletter drip begins]`  
    `↓                                              ↓`  
`[Tool Output]                                [Week 2: Relevant blog post]`  
    `↓                                              ↓`  
`"Turn this into a workplan" → MarTech Audit  [Week 4: "Ready to talk?" email]`  
    `↓`  
`[Audit Delivered] → Project scoped → Engagement begins`  
```` ``` ````

`---`

`## SECTION 7: HOMEPAGE REDESIGN BLUEPRINT`

`### New Homepage Section Flow`  
```` ``` ````  
`SECTION 1: HERO`  
  `Headline: "Strategy, systems, websites, and growth —`   
             `in one accountable lead."  [KEEP — it's strong]`  
  `Sub: Rewrite to name the pain more specifically:`  
       `"When your CRM doesn't talk to your site, your analytics`   
        `can't tell you what's working, and no one is steering the`   
        `strategy underneath it all — everything gets harder than it`   
        `should be."`  
  `Primary CTA: "Find your bottleneck" → Growth Bottleneck Quiz`  
  `Secondary CTA: "Not sure yet? Start a conversation" → /contact`  
  `Stats bar: [KEEP] 15+ years | 200+ automations | 50K+ users | Avg conversion lift`

`SECTION 2: PROBLEM PATHWAYS (replaces current service cards)`  
  `Header: "Which sounds most like your situation?"`  
  `Four cards — each is a diagnostic question, not a service name:`

  `Card 1: "No one is steering the whole system"`  
    `→ Strategy is scattered, priorities drift, growth is hard to trust`  
    `→ [Explore this problem →]`

  `Card 2: "The site looks fine but underperforms"`  
    `→ Trust is weak, pages are unclear, conversion is low`  
    `→ [Explore this problem →]`

  `Card 3: "Leads, follow-up, and reporting are disconnected"`  
    `→ Tools don't talk, automation is manual, data lives in silos`  
    `→ [Explore this problem →]`

  `Card 4: "Visibility doesn't match your capability"`  
    `→ Search is weak, AI can't find you, content doesn't convert`  
    `→ [Explore this problem →]`

`SECTION 3: HOW IT WORKS (3-step process — borrowed from Demand Curve pattern)`  
  `"What working with me looks like"`  
  `Step 1: DIAGNOSE — "We map what's actually happening before anyone commits to scope."`  
  `Step 2: BUILD — "I execute the critical path directly — no hand-offs, no junior bench."`  
  `Step 3: COMPOUND — "Measure, iterate, and expand what's working."`

  `CTA: "See how the process works in detail" → /process`

`SECTION 4: ONE FEATURED PROOF POINT (not a carousel)`  
  `Single high-signal case study displayed as an outcome narrative:`

  `"+212% qualified leads after automating 8 manual processes"`  
  `"Graston Technique needed their marketing pipeline to stop leaking.`  
   `I rebuilt the full system — CRM, automation, analytics, and lead flow —`  
   `and measured everything."`  
  `[Read the full case study →] | [See all proof →]`

`SECTION 5: TOOLS — VALUE-FIRST CTA`  
  `"Not ready to talk? Diagnose first."`  
  `"Run a free diagnostic tool to identify the real constraint,`  
   `prioritize the next move, and walk into any conversation sharper."`  
  `[Four tool cards — same as current, but framed as diagnostic actions]`

`SECTION 6: NEWSLETTER / EMAIL CAPTURE (NEW — critical missing piece)`  
  `"One martech insight per week. No filler."`  
  `"Strategy, systems, and measurement thinking for operators who do`  
   `real marketing work."`  
  `[Email input] [Subscribe →]`  
  `"Join 0 operators" (update count as it grows)`

`SECTION 7: SOFT CLOSE CTA`  
  `"Every serious build started as a conversation."`  
  `[Start one →]`  
```` ``` ````

`### What Gets REMOVED from Homepage`  
`- The 5-card case study carousel (replaced by single featured proof)`  
`- The 10-testimonial rotator block (move to /about and /proof)`  
`- The "Proof you can scan fast" section heading (the proof is now outcome-led)`

`### What Gets ADDED`  
`- Problem pathway cards (Section 2)`  
`- 3-step process summary (Section 3)`  
`- Email capture (Section 6)`  
`- Growth Bottleneck Quiz as hero CTA (Section 1)`

`---`

`## SECTION 8: NEW DATA FILES NEEDED`

`Based on your existing repo architecture, here's what needs to be created/modified:`

`**New files:**`  
```` ``` ````  
`data/problems.ts          ← Problem cluster definitions, diagnostic checklists,`  
                            `service mappings, proof mappings, tool mappings`  
`data/newsletter.ts         ← Newsletter config (provider, copy, social proof)`  
`data/resources.ts          ← Blog posts, frameworks, newsletter landing page content`  
`data/trust-ladder.ts       ← CTA definitions per trust level per page context`  
```` ``` ````

`**Modified files:**`  
```` ``` ````  
`data/taxonomy.ts           ← Add PROBLEM_CLUSTERS, ENGAGEMENT_SHAPES, TRUST_LADDER_STAGES`  
`data/work/work-index.ts    ← Add primaryOutcome, outcomeHeadline, problemCluster fields`  
`data/services.ts           ← Add problemCluster backlink field to each service`  
`data/labs.ts               ← Add problemCluster mapping (which tool serves which problem)`  
```` ``` ````

`**New app routes:**`  
```` ``` ````  
`app/problems/page.tsx              ← Problem index (optional — could redirect to home)`  
`app/problems/[slug]/page.tsx       ← Individual problem pages`  
`app/proof/page.tsx                 ← Renamed from /work, new filter UI`  
`app/proof/[slug]/page.tsx          ← Redirect from /work/[slug] → /proof/[slug]`  
`app/resources/page.tsx             ← Resources hub`  
`app/resources/blog/page.tsx        ← Blog index`  
`app/resources/blog/[slug]/page.tsx ← Blog post detail`  
`app/resources/newsletter/page.tsx  ← Newsletter landing page`  
`app/api/newsletter/route.ts       ← Newsletter signup API (Resend or ConvertKit)`

**Redirects needed in `next.config.js`:**

javascript  
`{`  
  `redirects: [`  
    `{ source: '/work', destination: '/proof', permanent: true },`  
    `{ source: '/work/:slug', destination: '/proof/:slug', permanent: true },`  
    `{ source: '/lab', destination: '/tools', permanent: true },`  
    `{ source: '/lab/:slug', destination: '/tools/:slug', permanent: true },`  
  `]`  
`}`  
---

## **SECTION 9: IMPLEMENTATION PRIORITY ORDER**

**Sprint 1 (This Week): Foundation**

1. Add `PROBLEM_CLUSTERS` to `data/taxonomy.ts`  
2. Create `data/problems.ts` with problem definitions  
3. Update `data/work/work-index.ts` — add `primaryOutcome` and `outcomeHeadline` to every entry  
4. Build `app/problems/[slug]/page.tsx` for all four problem pages

**Sprint 2 (Next Week): Homepage \+ Proof** 5\. Redesign homepage to new section flow (remove carousel/testimonial block, add problem pathways, process summary, email capture) 6\. Create `/proof` route with outcome-based filtering 7\. Set up `/work` → `/proof` redirects 8\. Build email capture component (even a simple Resend-powered signup)

**Sprint 3 (Week 3): Tools Enhancement \+ Resources** 9\. Build Growth Bottleneck Quiz tool 10\. Add email gates to tool outputs (save/export results) 11\. Create `/resources` hub page 12\. Write first 3-5 blog posts / frameworks

**Sprint 4 (Week 4): Polish \+ CTA Integration** 13\. Implement CTA trust ladder logic across all pages 14\. Add newsletter signup component to every page (sidebar or footer section) 15\. Update nav to new structure 16\. Build MarTech Stack Grader tool 17\. Test full visitor journey end-to-end

---

This blueprint is designed to be directly implementable against your existing Next.js App Router \+ TypeScript \+ CSS Modules stack. Every recommendation maps to a specific file, route, or data model change in your repo. The goal is to transform your site from a portfolio that proves capability into a diagnostic engine that identifies problems, delivers value before asking for commitment, and converts at every trust level.


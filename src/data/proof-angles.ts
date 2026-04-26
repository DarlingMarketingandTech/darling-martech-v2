import { tools } from "@/data/labs";
import { services, SERVICE_DISPLAY_CLUSTERS, type ServiceDisplayClusterId } from "@/data/services";
import { caseStudies } from "@/data/work/work-index";
import type { ProblemCluster, ProofAngle, ServiceCluster } from "@/types";

const CASE_SLUGS = new Set(caseStudies.map((c) => c.slug));
const SERVICE_SLUGS = new Set<ServiceCluster>(services.map((s) => s.slug));
const TOOL_SLUGS = new Set(tools.map((t) => t.slug));

function assertDatasetIntegrity(rows: readonly ProofAngle[]) {
  for (const row of rows) {
    if (!CASE_SLUGS.has(row.anchorProjectSlug)) {
      throw new Error(`ProofAngle ${row.id}: unknown anchorProjectSlug "${row.anchorProjectSlug}"`);
    }
    if (!SERVICE_SLUGS.has(row.primaryServiceSlug)) {
      throw new Error(`ProofAngle ${row.id}: unknown primaryServiceSlug "${row.primaryServiceSlug}"`);
    }
    for (const s of row.secondaryServiceSlugs ?? []) {
      if (!SERVICE_SLUGS.has(s)) {
        throw new Error(`ProofAngle ${row.id}: unknown secondaryServiceSlug "${s}"`);
      }
    }
    if (row.toolSlug && !TOOL_SLUGS.has(row.toolSlug)) {
      throw new Error(`ProofAngle ${row.id}: unknown toolSlug "${row.toolSlug}"`);
    }
  }
}

export const PROOF_ANGLES: ProofAngle[] = [
  // graston-technique
  {
    id: "graston-technique-attribution-reporting",
    anchorProjectSlug: "graston-technique",
    title: "Attribution and Reporting Layer",
    problemKey: "pipeline-not-predictable",
    primaryServiceSlug: "attribution-analytics",
    secondaryServiceSlugs: ["fractional-cmo", "martech-stack-build"],
    toolSlug: "attribution-snapshot",
    summary:
      "UTM architecture tied paid, organic, event, and referral sources to CRM stage progression so leadership could read pipeline-stage counts instead of activity metrics.",
    metrics: [
      { value: "+212%", label: "Qualified leads generated", isHighlighted: true },
      { value: "8", label: "Manual workflows replaced with automation" },
    ],
  },
  {
    id: "graston-technique-crm-unification",
    anchorProjectSlug: "graston-technique",
    title: "CRM Architecture and Lead Unification",
    problemKey: "disconnected-systems",
    primaryServiceSlug: "crm-architecture",
    secondaryServiceSlugs: ["martech-stack-build", "fractional-cmo"],
    summary:
      "HubSpot implemented from zero with web, event, referral, and outreach sources unified into one pipeline with consistent source tracking.",
    metrics: [
      { value: "+212%", label: "Qualified leads generated", isHighlighted: true },
      { value: "8", label: "Manual workflows replaced with automation" },
    ],
  },
  {
    id: "graston-technique-provider-directory",
    anchorProjectSlug: "graston-technique",
    title: "Provider Directory and Membership Funnel",
    problemKey: "disconnected-systems",
    primaryServiceSlug: "custom-infrastructure",
    secondaryServiceSlugs: ["martech-stack-build", "crm-architecture"],
    summary:
      "Static provider PDF replaced with a real-time map backed by Cloudflare Workers, fed from CRM so directory data stays current as clinicians certify.",
    metrics: [
      { value: "81", label: "Active providers in live spatial directory" },
      { value: "+212%", label: "Qualified leads generated", isHighlighted: true },
    ],
  },
  {
    id: "graston-technique-paid-channel-attribution",
    anchorProjectSlug: "graston-technique",
    title: "Analytics and Attribution Overhaul",
    problemKey: "pipeline-not-predictable",
    primaryServiceSlug: "paid-media-management",
    secondaryServiceSlugs: ["attribution-analytics"],
    toolSlug: "attribution-snapshot",
    summary:
      "Paid programs were folded into the same UTM and CRM stage model as organic, event, and referral so spend could be read against pipeline outcomes.",
    metrics: [
      { value: "+212%", label: "Qualified leads generated", isHighlighted: true },
      { value: "8", label: "Manual workflows replaced with automation" },
    ],
  },

  // graston-qualified-leads
  {
    id: "graston-qualified-leads-pipeline",
    anchorProjectSlug: "graston-qualified-leads",
    title: "Qualified Lead Engine",
    problemKey: "pipeline-not-predictable",
    primaryServiceSlug: "fractional-cmo",
    secondaryServiceSlugs: ["martech-stack-build", "automation-systems"],
    summary:
      "Fractional ownership tied positioning, lead capture, and measurement so qualified demand could compound instead of leaking through manual handoffs.",
    metrics: [
      { value: "+212%", label: "Qualified leads generated", isHighlighted: true },
      { value: "8", label: "Manual processes replaced with automation" },
    ],
  },
  {
    id: "graston-qualified-leads-automation",
    anchorProjectSlug: "graston-qualified-leads",
    title: "Manual Process Replacement",
    problemKey: "disconnected-systems",
    primaryServiceSlug: "automation-systems",
    secondaryServiceSlugs: ["martech-stack-build", "crm-architecture"],
    summary:
      "Eight manual processes automated so outreach, events, and follow-up could scale without adding operational headcount.",
    metrics: [
      { value: "8", label: "Manual processes replaced with automation" },
      { value: "+212%", label: "Qualified leads generated", isHighlighted: true },
    ],
  },
  {
    id: "graston-qualified-leads-strategy-ownership",
    anchorProjectSlug: "graston-qualified-leads",
    title: "Single-Owner Marketing System",
    problemKey: "no-strategy-owner",
    primaryServiceSlug: "digital-marketing-strategy",
    secondaryServiceSlugs: ["fractional-cmo"],
    summary:
      "One senior owner across the full marketing system so priorities, lead capture, and measurement stayed aligned instead of splitting across vendors.",
    metrics: [{ value: "+212%", label: "Qualified leads generated", isHighlighted: true }],
  },

  // graston-growth-engine
  {
    id: "graston-growth-engine-overhead",
    anchorProjectSlug: "graston-growth-engine",
    title: "Manual Overhead Reduction",
    problemKey: "disconnected-systems",
    primaryServiceSlug: "automation-systems",
    secondaryServiceSlugs: ["martech-stack-build", "crm-architecture"],
    summary:
      "A custom automation layer replaced eight brittle manual workflows with durable triggers, visibility, and less day-to-day coordination.",
    metrics: [
      { value: "95%", label: "Manual overhead reduced", isHighlighted: true },
      { value: "81", label: "Providers in live spatial directory" },
    ],
  },
  {
    id: "graston-growth-engine-workflow-platform",
    anchorProjectSlug: "graston-growth-engine",
    title: "Training Lifecycle Automation",
    problemKey: "disconnected-systems",
    primaryServiceSlug: "ai-automation",
    secondaryServiceSlugs: ["automation-systems", "martech-stack-build"],
    summary:
      "High-volume marketing operations moved off tribal knowledge into automated sequences with CRM-backed state and pipeline visibility.",
    metrics: [
      { value: "95%", label: "Manual overhead reduced", isHighlighted: true },
      { value: "+212%", label: "Qualified leads generated" },
    ],
  },
  {
    id: "graston-growth-engine-spatial-directory",
    anchorProjectSlug: "graston-growth-engine",
    title: "Provider Directory Operations Layer",
    problemKey: "disconnected-systems",
    primaryServiceSlug: "custom-infrastructure",
    secondaryServiceSlugs: ["martech-stack-build"],
    summary:
      "Spatial search and live directory data connected to the CRM so provider locations stayed accurate as certifications completed.",
    metrics: [
      { value: "81", label: "Providers in live spatial directory" },
      { value: "95%", label: "Manual overhead reduced", isHighlighted: true },
    ],
  },
  {
    id: "graston-growth-engine-connected-stack",
    anchorProjectSlug: "graston-growth-engine",
    title: "AI and Smart Support Tools Layer",
    problemKey: "disconnected-systems",
    primaryServiceSlug: "martech-stack-build",
    secondaryServiceSlugs: ["crm-architecture", "automation-systems"],
    summary:
      "CRM, automation triggers, and the live directory wired together so operators could see pipeline and directory health without reconciling spreadsheets.",
    metrics: [
      { value: "95%", label: "Manual overhead reduced", isHighlighted: true },
      { value: "+212%", label: "Qualified leads generated" },
    ],
  },

  // clinical-compass
  {
    id: "clinical-compass-crm-intake",
    anchorProjectSlug: "clinical-compass",
    title: "CRM and Intake Unification",
    problemKey: "disconnected-systems",
    primaryServiceSlug: "crm-architecture",
    secondaryServiceSlugs: ["automation-systems", "martech-stack-build"],
    summary:
      "Practice management data connected to a CRM pipeline so phone, web, booking, and referral leads landed in one place with source tags and intake status.",
    metrics: [
      { value: "+45%", label: "Patient pipeline growth over engagement period", isHighlighted: true },
      { value: "60 days", label: "Time to live pipeline visibility" },
    ],
  },
  {
    id: "clinical-compass-follow-up-automation",
    anchorProjectSlug: "clinical-compass",
    title: "Automated Inquiry and Appointment Sequences",
    problemKey: "disconnected-systems",
    primaryServiceSlug: "automation-systems",
    secondaryServiceSlugs: ["crm-architecture"],
    summary:
      "Same-day and 48-hour inquiry follow-up, confirmations, and no-show reactivation sequences triggered from CRM status instead of staff memory.",
    metrics: [
      { value: "40%", label: "Reduction in front-desk intake time" },
      { value: "+45%", label: "Patient pipeline growth over engagement period", isHighlighted: true },
    ],
  },
  {
    id: "clinical-compass-referral-tracking",
    anchorProjectSlug: "clinical-compass",
    title: "Referral Source Tracking System",
    problemKey: "pipeline-not-predictable",
    primaryServiceSlug: "attribution-analytics",
    secondaryServiceSlugs: ["crm-architecture"],
    summary:
      "Referral sources captured at intake and surfaced in reporting so the practice could see which partners produced volume, conversion, and patient value.",
    metrics: [
      { value: "+45%", label: "Patient pipeline growth over engagement period", isHighlighted: true },
      { value: "60 days", label: "Time to live pipeline visibility" },
    ],
  },
  {
    id: "clinical-compass-web-intake",
    anchorProjectSlug: "clinical-compass",
    title: "Conversion-Focused Web Intake",
    problemKey: "site-not-converting",
    primaryServiceSlug: "website-design",
    secondaryServiceSlugs: ["conversion-optimization", "crm-architecture"],
    toolSlug: "growth-system-audit",
    summary:
      "Online intake simplified for mobile, with completions entering the CRM immediately so same-day lead lag from manual entry dropped.",
    metrics: [
      { value: "40%", label: "Reduction in front-desk intake time" },
      { value: "+45%", label: "Patient pipeline growth over engagement period", isHighlighted: true },
    ],
  },
  // russell-painting
  {
    id: "russell-painting-attribution",
    anchorProjectSlug: "russell-painting",
    title: "Attribution Layer to Booked Jobs",
    problemKey: "pipeline-not-predictable",
    primaryServiceSlug: "attribution-analytics",
    secondaryServiceSlugs: ["paid-media-management"],
    toolSlug: "attribution-snapshot",
    summary:
      "Ad spend, form fills, calls, and booked jobs connected into one reporting view so spend decisions could reference outcomes instead of proxies.",
    metrics: [
      { value: "4.9★", label: "Client satisfaction score", isHighlighted: true },
      { value: "First-page", label: "Visibility in target service areas" },
    ],
  },
  {
    id: "russell-painting-local-visibility",
    anchorProjectSlug: "russell-painting",
    title: "Local Demand Visibility",
    problemKey: "not-visible-enough",
    primaryServiceSlug: "content-seo-systems",
    secondaryServiceSlugs: ["paid-media-management"],
    summary:
      "Structured local visibility work so Russell showed first-page in target service areas alongside the attribution instrumentation.",
    metrics: [
      { value: "First-page", label: "Visibility in target service areas" },
      { value: "4.9★", label: "Client satisfaction score", isHighlighted: true },
    ],
  },
  {
    id: "russell-painting-paid-local",
    anchorProjectSlug: "russell-painting",
    title: "Paid Media and Local Lead Optimization",
    problemKey: "not-visible-enough",
    primaryServiceSlug: "paid-media-management",
    secondaryServiceSlugs: ["attribution-analytics", "content-seo-systems"],
    summary:
      "Demand capture tuned with call tracking, lead source reporting, and ad optimization against the same booked-job view as organic and local inquiries.",
    metrics: [
      { value: "4.9★", label: "Client satisfaction score", isHighlighted: true },
      { value: "First-page", label: "Visibility in target service areas" },
    ],
  },

  // barbershop-command-center
  {
    id: "barbershop-crm-booking",
    anchorProjectSlug: "barbershop-command-center",
    title: "Booking CRM System",
    problemKey: "disconnected-systems",
    primaryServiceSlug: "crm-architecture",
    secondaryServiceSlugs: ["automation-systems"],
    summary:
      "Public booking flow and client lifecycle records were unified so owner/admin operations could segment new, returning, and at-risk clients from one command surface.",
    metrics: [
      { value: "4.9★", label: "Average Google rating maintained", isHighlighted: true },
      { value: "3×", label: "Increase in repeat booking rate" },
    ],
  },
  {
    id: "barbershop-review-pipeline",
    anchorProjectSlug: "barbershop-command-center",
    title: "Review Pipeline and Local Conversion Support",
    problemKey: "not-visible-enough",
    primaryServiceSlug: "social-media-marketing",
    secondaryServiceSlugs: ["automation-systems", "crm-architecture"],
    toolSlug: "geo-readiness-auditor",
    summary:
      "Post-visit SMS sequence timed review asks so strong visits converted into Google reviews without staff chasing each client manually.",
    metrics: [
      { value: "4.9★", label: "Average Google rating maintained", isHighlighted: true },
      { value: "3×", label: "Increase in repeat booking rate" },
    ],
  },
  {
    id: "barbershop-retention",
    anchorProjectSlug: "barbershop-command-center",
    title: "Lifecycle Retention Automation",
    problemKey: "site-not-converting",
    primaryServiceSlug: "ai-automation",
    secondaryServiceSlugs: ["automation-systems", "crm-architecture"],
    summary:
      "Lifecycle triggers for reminder, retention, and reactivation were automated from booking behavior so rebooking tripled and no-show reduction became repeatable.",
    metrics: [
      { value: "3×", label: "Increase in repeat booking rate" },
      { value: "60%", label: "Reduction in no-shows via automated reminders" },
    ],
  },
  {
    id: "barbershop-local-seo",
    anchorProjectSlug: "barbershop-command-center",
    title: "Owner-Admin Command Center Workflow",
    problemKey: "not-visible-enough",
    primaryServiceSlug: "custom-infrastructure",
    secondaryServiceSlugs: ["crm-architecture", "automation-systems"],
    toolSlug: "geo-readiness-auditor",
    summary:
      "Owner/admin workflow moved to a centralized operating view for lifecycle segments, outreach queues, and booking-state visibility instead of disconnected tools and memory-driven follow-up.",
    metrics: [
      { value: "3×", label: "Increase in repeat booking rate" },
      { value: "4.9★", label: "Average Google rating maintained", isHighlighted: true },
    ],
  },

  // primarycare-indy
  {
    id: "primarycare-indy-booking-conversion",
    anchorProjectSlug: "primarycare-indy",
    title: "Patient Booking Conversion System",
    problemKey: "site-not-converting",
    primaryServiceSlug: "conversion-optimization",
    secondaryServiceSlugs: ["website-design", "content-seo-systems"],
    summary:
      "Primary care booking flow was rebuilt around patient-intent pathways so online scheduling increased by removing mobile friction and decision ambiguity.",
    metrics: [{ value: "75%", label: "Increase in online bookings", isHighlighted: true }],
  },
  {
    id: "primarycare-indy-local-visibility",
    anchorProjectSlug: "primarycare-indy",
    title: "Local Search Visibility Alignment",
    problemKey: "not-visible-enough",
    primaryServiceSlug: "content-seo-systems",
    secondaryServiceSlugs: ["website-design"],
    toolSlug: "geo-readiness-auditor",
    summary:
      "Local-intent entry pages and booking actions were aligned so search visibility and conversion flow reinforced each other instead of operating as separate efforts.",
    metrics: [{ value: "75%", label: "Increase in online bookings", isHighlighted: true }],
  },
  {
    id: "primarycare-indy-service-architecture",
    anchorProjectSlug: "primarycare-indy",
    title: "Patient-Centered Service Architecture",
    problemKey: "site-not-converting",
    primaryServiceSlug: "website-design",
    secondaryServiceSlugs: ["conversion-optimization", "brand-identity"],
    summary:
      "Service information architecture was rebuilt around patient decisions so users could identify the right care path quickly and move to scheduling with confidence.",
    metrics: [{ value: "75%", label: "Increase in online bookings", isHighlighted: true }],
  },
  {
    id: "primarycare-indy-trust-system",
    anchorProjectSlug: "primarycare-indy",
    title: "Healthcare Trust System",
    problemKey: "brand-system-broken",
    primaryServiceSlug: "brand-identity",
    secondaryServiceSlugs: ["website-design"],
    summary:
      "Trust-signaling layers were integrated into conversion-critical surfaces so provider confidence and booking action happened in one continuous flow.",
    metrics: [{ value: "75%", label: "Increase in online bookings", isHighlighted: true }],
  },

  // urgentcare-indy
  {
    id: "urgentcare-indy-checkin-flow",
    anchorProjectSlug: "urgentcare-indy",
    title: "Online Check-In Flow",
    problemKey: "site-not-converting",
    primaryServiceSlug: "website-design",
    secondaryServiceSlugs: ["conversion-optimization"],
    summary:
      "Urgent-intent pathways were simplified so patients could move from need to check-in quickly with fewer decision bottlenecks.",
    metrics: [{ value: "+35%", label: "Patient bookings from urgent-intent flow", isHighlighted: true }],
  },
  {
    id: "urgentcare-indy-booking-conversion",
    anchorProjectSlug: "urgentcare-indy",
    title: "Urgent Care Booking Conversion",
    problemKey: "site-not-converting",
    primaryServiceSlug: "conversion-optimization",
    secondaryServiceSlugs: ["website-design", "content-seo-systems"],
    summary:
      "Urgent booking architecture was rebuilt for speed and clarity so high-intent patients completed scheduling instead of abandoning at decision points.",
    metrics: [{ value: "+35%", label: "Patient bookings from urgent-intent flow", isHighlighted: true }],
  },
  {
    id: "urgentcare-indy-local-visibility",
    anchorProjectSlug: "urgentcare-indy",
    title: "Urgent-Intent Local Visibility",
    problemKey: "not-visible-enough",
    primaryServiceSlug: "content-seo-systems",
    secondaryServiceSlugs: ["website-design"],
    toolSlug: "geo-readiness-auditor",
    summary:
      "Local discovery surfaces were aligned with urgent-care conversion blocks so search intent landed on fast, trust-ready booking paths.",
    metrics: [{ value: "+35%", label: "Patient bookings from urgent-intent flow", isHighlighted: true }],
  },
  {
    id: "urgentcare-indy-trust-ux",
    anchorProjectSlug: "urgentcare-indy",
    title: "Urgency-Meets-Trust UX System",
    problemKey: "site-not-converting",
    primaryServiceSlug: "website-design",
    secondaryServiceSlugs: ["brand-identity", "conversion-optimization"],
    summary:
      "Urgency and trust signals were paired inside the same decision path so patients could act quickly without uncertainty about care quality or process.",
    metrics: [{ value: "+35%", label: "Patient bookings from urgent-intent flow", isHighlighted: true }],
  },

  // the-compass
  {
    id: "the-compass-diagnostic-product",
    anchorProjectSlug: "the-compass",
    title: "Interactive Diagnostic Product",
    problemKey: "no-strategy-owner",
    primaryServiceSlug: "digital-marketing-strategy",
    secondaryServiceSlugs: ["fractional-cmo"],
    toolSlug: "growth-system-audit",
    summary:
      "Eight-question diagnostic mapped to the six failure modes so buyers could name a problem cluster before booking, improving qualification depth.",
    metrics: [
      { value: "68%", label: "Completion rate through full diagnostic", isHighlighted: true },
      { value: "8 min", label: "Average time-on-tool per session" },
    ],
  },
  {
    id: "the-compass-crm-routing",
    anchorProjectSlug: "the-compass",
    title: "CRM-Tagged Result Routing",
    problemKey: "pipeline-not-predictable",
    primaryServiceSlug: "crm-architecture",
    secondaryServiceSlugs: ["automation-systems"],
    summary:
      "Completed diagnostics posted to the CRM with cluster tags so follow-up sequences and booking prompts could branch by diagnosis outcome.",
    metrics: [
      { value: "68%", label: "Completion rate through full diagnostic", isHighlighted: true },
      { value: "3.2×", label: "Higher booking rate vs. cold outreach" },
    ],
  },
  {
    id: "the-compass-segmented-automation",
    anchorProjectSlug: "the-compass",
    title: "Outcome-Branching Lifecycle Automation",
    problemKey: "pipeline-not-predictable",
    primaryServiceSlug: "ai-automation",
    secondaryServiceSlugs: ["automation-systems", "crm-architecture"],
    summary:
      "Follow-up sequences branch by diagnostic cluster so each buyer receives a different nurture path after completing the tool.",
    metrics: [
      { value: "68%", label: "Completion rate through full diagnostic", isHighlighted: true },
      { value: "3.2×", label: "Higher booking rate vs. cold outreach" },
    ],
  },
  {
    id: "the-compass-booking-lift",
    anchorProjectSlug: "the-compass",
    title: "High-Intent Booking Lift",
    problemKey: "pipeline-not-predictable",
    primaryServiceSlug: "fractional-cmo",
    secondaryServiceSlugs: ["digital-marketing-strategy", "automation-systems"],
    summary:
      "Buyers who finished the diagnostic booked at 3.2× the rate of cold outreach because the problem was already framed before the first conversation.",
    metrics: [
      { value: "3.2×", label: "Higher booking rate vs. cold outreach" },
      { value: "68%", label: "Completion rate through full diagnostic", isHighlighted: true },
    ],
  },

  // license-requirements-navigator
  {
    id: "license-navigator-ce-database",
    anchorProjectSlug: "license-requirements-navigator",
    title: "Structured CE Requirements Database",
    problemKey: "site-not-converting",
    primaryServiceSlug: "custom-infrastructure",
    secondaryServiceSlugs: ["content-seo-systems", "content-creation"],
    summary:
      "50+ state CE datasets modeled for lookup, quarterly refresh, and applicability checks against Graston coursework categories.",
    metrics: [
      { value: "50+", label: "State CE requirement datasets structured", isHighlighted: true },
      { value: "34%", label: "Tool-to-registration conversion rate", isHighlighted: false },
    ],
  },
  {
    id: "license-navigator-tool-conversion",
    anchorProjectSlug: "license-requirements-navigator",
    title: "Tool-to-Registration Conversion Path",
    problemKey: "site-not-converting",
    primaryServiceSlug: "conversion-optimization",
    secondaryServiceSlugs: ["custom-infrastructure", "crm-architecture"],
    summary:
      "Registration links, pre-filled tracking, and CRM source tags so CE-motivated clinicians could move from lookup to enrollment inside the same flow.",
    metrics: [
      { value: "34%", label: "Tool-to-registration conversion rate", isHighlighted: true },
      { value: "4.2 min", label: "Average session length on tool", isHighlighted: false },
    ],
  },
  {
    id: "license-navigator-ce-content-acquisition",
    anchorProjectSlug: "license-requirements-navigator",
    title: "Compliance Content and Organic Acquisition",
    problemKey: "not-visible-enough",
    primaryServiceSlug: "content-creation",
    secondaryServiceSlugs: ["content-seo-systems", "conversion-optimization", "custom-infrastructure"],
    toolSlug: "geo-readiness-auditor",
    summary:
      "Structured state datasets, research-backed narratives, and indexable state pages with structured data captured clinicians actively planning CE, feeding sustained organic demand into the tool.",
    metrics: [
      { value: "50+", label: "State CE requirement datasets structured", isHighlighted: true },
      { value: "34%", label: "Tool-to-registration conversion rate", isHighlighted: false },
    ],
  },

  // 317-bbq
  {
    id: "317-bbq-brand-system",
    anchorProjectSlug: "317-bbq",
    title: "Brand Identity System",
    problemKey: "brand-system-broken",
    primaryServiceSlug: "brand-identity",
    secondaryServiceSlugs: ["social-media-marketing", "content-creation"],
    summary:
      "Logo, palette, typography, and voice rebuilt around Indianapolis craft BBQ, then applied across signage, packaging, social, and digital touchpoints.",
    metrics: [
      { value: "Top 3", label: "Local pack ranking for 'BBQ Indianapolis'", isHighlighted: true },
      { value: "4.8★", label: "Google rating — 200+ reviews" },
    ],
  },
  {
    id: "317-bbq-local-pack",
    anchorProjectSlug: "317-bbq",
    title: "Local Pack Ranking System",
    problemKey: "not-visible-enough",
    primaryServiceSlug: "content-seo-systems",
    secondaryServiceSlugs: ["brand-identity"],
    toolSlug: "geo-readiness-auditor",
    summary:
      "Google Business Profile, categories, cadence, and media structured so the restaurant reached top-three local pack placement for core BBQ terms in six months.",
    metrics: [
      { value: "Top 3", label: "Local pack ranking for 'BBQ Indianapolis'", isHighlighted: true },
      { value: "+180%", label: "Organic search traffic in 6 months" },
    ],
  },
  {
    id: "317-bbq-citations-schema",
    anchorProjectSlug: "317-bbq",
    title: "Citation and Schema Layer",
    problemKey: "not-visible-enough",
    primaryServiceSlug: "website-design",
    secondaryServiceSlugs: ["content-seo-systems", "brand-identity"],
    summary:
      "NAP corrected across 40+ directories, duplicates merged, and LocalBusiness schema added so the site, GBP, and listings agreed on facts.",
    metrics: [
      { value: "+180%", label: "Organic search traffic in 6 months" },
      { value: "4.8★", label: "Google rating — 200+ reviews" },
    ],
  },
  {
    id: "317-bbq-review-velocity",
    anchorProjectSlug: "317-bbq",
    title: "Review Velocity and Reputation System",
    problemKey: "not-visible-enough",
    primaryServiceSlug: "social-media-marketing",
    secondaryServiceSlugs: ["brand-identity", "content-seo-systems"],
    summary:
      "Receipt and packaging QR prompts, staff timing guidance, and response protocol took reviews from a few per month to 15–20 per month inside 90 days.",
    metrics: [
      { value: "4.8★", label: "Google rating — 200+ reviews" },
      { value: "Top 3", label: "Local pack ranking for 'BBQ Indianapolis'", isHighlighted: true },
    ],
  },
  // black-letter
  {
    id: "black-letter-brand-identity-system",
    anchorProjectSlug: "black-letter",
    title: "Brand Identity System Build",
    problemKey: "brand-system-broken",
    primaryServiceSlug: "brand-identity",
    summary:
      "Black Letter brand work focused on identity architecture, visual standards, and implementation guidance so core touchpoints followed one coherent system.",
    metrics: [{ value: "Identity system", label: "Brand architecture defined and documented", isHighlighted: true }],
  },
];

assertDatasetIntegrity(PROOF_ANGLES);

const byProject = new Map<string, ProofAngle[]>();
const byService = new Map<ServiceCluster, ProofAngle[]>();
const byTool = new Map<string, ProofAngle[]>();
const byProblem = new Map<ProblemCluster, ProofAngle[]>();

for (const angle of PROOF_ANGLES) {
  const projectList = byProject.get(angle.anchorProjectSlug) ?? [];
  projectList.push(angle);
  byProject.set(angle.anchorProjectSlug, projectList);

  const primaryList = byService.get(angle.primaryServiceSlug) ?? [];
  primaryList.push(angle);
  byService.set(angle.primaryServiceSlug, primaryList);

  const problemList = byProblem.get(angle.problemKey) ?? [];
  problemList.push(angle);
  byProblem.set(angle.problemKey, problemList);

  if (angle.toolSlug) {
    const tList = byTool.get(angle.toolSlug) ?? [];
    tList.push(angle);
    byTool.set(angle.toolSlug, tList);
  }
}

export function getProofAnglesForProject(anchorProjectSlug: string): ProofAngle[] {
  return byProject.get(anchorProjectSlug) ?? [];
}

export type GetProofAnglesForProblemOptions = {
  /** Max angles to return (default 4). */
  limit?: number;
  /**
   * Case study slugs shown in the page’s main proof grid (`relatedProof`).
   * Angles from **other** parents rank first so the block extends evidence without
   * repeating the same headline cases; among grid parents, earlier slug ranks higher.
   */
  preferredParentSlugs?: readonly string[];
};

/**
 * Proof angles whose `problemKey` matches the canonical problem slug.
 * Surfaces angles from parents **not** in `preferredParentSlugs` first (extra specificity
 * vs. the proof cards), then parents that appear in the grid, in listed order.
 * Spreads across parent proofs before taking a second angle from the same case.
 */
export function getProofAnglesForProblem(
  problemSlug: ProblemCluster,
  options?: GetProofAnglesForProblemOptions,
): ProofAngle[] {
  const limit = options?.limit ?? 4;
  const preferred = options?.preferredParentSlugs ?? [];
  const preferredSet = new Set(preferred);
  const prefIndex = (parentSlug: string) => {
    const i = preferred.indexOf(parentSlug);
    return i === -1 ? preferred.length + 1 : i;
  };

  const matches = byProblem.get(problemSlug) ?? [];
  if (!matches.length) return [];

  const sorted = [...matches].sort((a, b) => {
    const aIn = preferredSet.has(a.anchorProjectSlug) ? 1 : 0;
    const bIn = preferredSet.has(b.anchorProjectSlug) ? 1 : 0;
    if (aIn !== bIn) return aIn - bIn;

    if (aIn === 1) {
      const pa = prefIndex(a.anchorProjectSlug);
      const pb = prefIndex(b.anchorProjectSlug);
      if (pa !== pb) return pa - pb;
    } else {
      const pc = a.anchorProjectSlug.localeCompare(b.anchorProjectSlug);
      if (pc !== 0) return pc;
    }

    const ta = a.toolSlug ? 0 : 1;
    const tb = b.toolSlug ? 0 : 1;
    if (ta !== tb) return ta - tb;
    return a.id.localeCompare(b.id);
  });

  const out: ProofAngle[] = [];
  const seenParents = new Set<string>();

  for (const angle of sorted) {
    if (seenParents.has(angle.anchorProjectSlug)) continue;
    out.push(angle);
    seenParents.add(angle.anchorProjectSlug);
    if (out.length >= limit) return out;
  }

  for (const angle of sorted) {
    if (out.length >= limit) break;
    if (out.some((o) => o.id === angle.id)) continue;
    out.push(angle);
  }

  return out.slice(0, limit);
}

/** All proof angles grouped by canonical `problemKey`. */
export function groupProofAnglesByProblem(): ReadonlyMap<ProblemCluster, ProofAngle[]> {
  return byProblem;
}

/** Proof angles where this service is the primary capability (used on `/services` hub). */
export function getPrimaryProofAnglesForService(serviceSlug: ServiceCluster, limit = 3): ProofAngle[] {
  const list = byService.get(serviceSlug) ?? [];
  return list.slice(0, limit);
}

const serviceSlugInCluster = (clusterId: ServiceDisplayClusterId, slug: ServiceCluster) =>
  SERVICE_DISPLAY_CLUSTERS[clusterId].serviceSlugs.includes(slug);

/**
 * Proof angles tied to any service in a hub display cluster — prefers spreading across parent cases
 * before taking multiple angles from the same engagement.
 */
export function getProofAnglesForDisplayCluster(clusterId: ServiceDisplayClusterId, limit = 4): ProofAngle[] {
  const matched = PROOF_ANGLES.filter(
    (a) =>
      serviceSlugInCluster(clusterId, a.primaryServiceSlug) ||
      (a.secondaryServiceSlugs?.some((s) => serviceSlugInCluster(clusterId, s)) ?? false),
  );

  const byParent = new Map<string, ProofAngle[]>();
  for (const a of matched) {
    const list = byParent.get(a.anchorProjectSlug) ?? [];
    list.push(a);
    byParent.set(a.anchorProjectSlug, list);
  }
  const parents = [...byParent.keys()].sort();
  const out: ProofAngle[] = [];
  let round = 0;
  while (out.length < limit && parents.length > 0) {
    let added = false;
    for (const p of parents) {
      const list = byParent.get(p);
      const a = list?.[round];
      if (a && !out.some((o) => o.id === a.id)) {
        out.push(a);
        added = true;
        if (out.length >= limit) break;
      }
    }
    if (!added) break;
    round += 1;
    if (round > 25) break;
  }
  return out.slice(0, limit);
}

export function getProofAnglesForTool(toolSlug: string, limit = 4): ProofAngle[] {
  const list = byTool.get(toolSlug) ?? [];
  return list.slice(0, limit);
}

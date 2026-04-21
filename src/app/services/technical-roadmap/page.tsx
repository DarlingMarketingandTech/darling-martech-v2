import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PageHero } from "@/components/hero/PageHero";
import { ServiceHeroVisual } from "@/components/services/ServiceHeroVisual";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SERVICE_VISUAL_BY_SLUG } from "@/data/service-visuals";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site-config";
import { FoundationPathwayMini } from "@/components/shared/FoundationPathwayMini";

export const metadata = buildMetadata({
  title: "Technical Roadmap",
  description:
    "A paid diagnostic engagement that maps your revenue system, names the real friction points, and delivers a prioritized build plan — before any ongoing commitment.",
  canonicalUrl: "https://darlingmartech.com/services/technical-roadmap",
});

const ROADMAP_SKUS = [
  {
    id: "revenue-architecture",
    label: "Revenue Architecture Blueprint",
    bestFor: "B2B SaaS · Healthcare · Manufacturing · Real Estate",
    description:
      "A complete map of your revenue system — from the first ad click or form fill to a closed invoice. Every handoff, every tool, every gap made visible in one artifact.",
    deliverables: [
      "Attribution map: every touchpoint from first touch to closed revenue",
      "Speed-to-lead stress test — where your funnel breaks under time pressure",
      "Funnel drop-off diagnosis with prioritized fix list",
      "Integration gap analysis across your CRM, ad platform, and email stack",
      "Prioritized implementation roadmap ranked by revenue impact",
    ],
  },
  {
    id: "infrastructure-security",
    label: "Infrastructure & Security Deep-Dive",
    bestFor: "FinTech · Healthcare · Compliance-sensitive teams",
    description:
      "A technical red-flag audit of your tracking, data handling, and system architecture. Built for teams where a bad implementation is a legal and brand risk, not just a performance issue.",
    deliverables: [
      "Tracking and privacy risk audit (pixel leakage, PII exposure, GDPR/HIPAA flags)",
      "Server-side tracking feasibility assessment",
      "Brittle integration map — what breaks first when volume increases",
      "Data handling documentation and governance gap list",
      "Scalability and maintainability risk assessment with remediation paths",
    ],
  },
  {
    id: "ai-automation-feasibility",
    label: "AI & Automation Feasibility Study",
    bestFor: "High-volume operations · Service teams · E-commerce",
    description:
      "An inventory of where AI and automation would create the most leverage in your business — scored by cost to build vs. time saved vs. revenue impact. Includes a working proof-of-concept for one workflow.",
    deliverables: [
      "Workflow inventory: 15–20 processes scored by automation leverage",
      "AI vs. rules-based decision matrix per workflow",
      "Tool rationalization — what to replace, what to extend, what to build",
      "One working proof-of-concept for the highest-value automation",
      "Phased build sequence with realistic effort estimates",
    ],
  },
];

export default function TechnicalRoadmapPage() {
  const visual = SERVICE_VISUAL_BY_SLUG["technical-roadmap"];

  return (
    <SiteShell hideNewsletterSignup>
      <PageHero
        eyebrow="ENTRY OFFER · DIAGNOSIS BEFORE PRESCRIPTION"
        headline="Technical Roadmap"
        body="A paid diagnostic engagement before any retainer commitment. You get a named, prioritized plan for exactly what to build — and the fee credits toward implementation if you proceed."
        ctas={[
          { label: "Book a roadmap scoping call →", href: siteConfig.calComLink, variant: "primary" },
          { label: "Not ready? Run the free diagnostic →", href: "/tools/growth-bottleneck-quiz", variant: "secondary" },
        ]}
        splitAside={
          <ServiceHeroVisual publicId={visual.visualPublicId} alt={visual.visualAlt} />
        }
      />

      {/* How it works */}
      <BandSection className="mt-14">
        <Eyebrow>How it works</Eyebrow>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Choose the right format",
              body: "Three roadmap types depending on what's most urgent — revenue architecture, infrastructure and security, or AI and automation feasibility.",
            },
            {
              step: "02",
              title: "I do the diagnostic work",
              body: "Access to your accounts, tools, and systems. I map what exists, stress-test it, and name the real problems — not the symptoms you described.",
            },
            {
              step: "03",
              title: "You receive a prioritized plan",
              body: "A concrete, ordered roadmap you own. Take it to any implementation partner — or credit the full roadmap fee toward your first month with Darling MarTech.",
            },
          ].map((step) => (
            <div key={step.step} className="rounded-2xl border border-[#F5F4F0]/8 px-5 py-6">
              <span className="font-mono text-xs text-[#0FD9C8]">{step.step}</span>
              <h3 className="font-display mt-3 text-base font-semibold text-[#F5F4F0]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/55">{step.body}</p>
            </div>
          ))}
        </div>
      </BandSection>

      <SectionWrapper className="mt-12">
        <FoundationPathwayMini
          primaryHref="/tools/growth-bottleneck-quiz"
          primaryLabel="Run free diagnostic first →"
          secondaryHref="/problems"
          secondaryLabel="Then map your problem path →"
        />
      </SectionWrapper>

      {/* SKUs */}
      <SectionWrapper className="mt-14">
        <Eyebrow>Roadmap formats</Eyebrow>
        <p className="mt-3 max-w-xl text-sm text-[#F5F4F0]/55">
          Each format is a fixed-scope engagement. Typical investment range: $5,000–$10,000 depending on system complexity. Scoped in the first conversation.
        </p>
        <div className="mt-8 flex flex-col gap-6">
          {ROADMAP_SKUS.map((sku) => (
            <div
              key={sku.id}
              className="surface-card rounded-3xl p-7"
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                <h2 className="font-display text-xl font-semibold text-[#F5F4F0]">
                  {sku.label}
                </h2>
                <span className="rounded-full border border-[#0FD9C8]/30 px-3 py-1 text-xs text-[#0FD9C8] md:shrink-0">
                  {sku.bestFor}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#F5F4F0]/72">{sku.description}</p>
              <ul className="mt-5 space-y-2">
                {sku.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-[#F5F4F0]/55">
                    <span className="mt-0.5 text-[#F05A28]">→</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Credit-back close */}
      <BandSection className="mt-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="max-w-xl">
            <Eyebrow>The credit-forward structure</Eyebrow>
            <p className="mt-4 text-lg text-[#F5F4F0]/80">
              The roadmap you receive is yours to keep. Take it to any development shop or implementation partner — or apply the full roadmap fee as a credit toward your first month of implementation with Darling MarTech.
            </p>
            <p className="mt-4 text-sm text-[#F5F4F0]/50">
              This is not a sales pitch disguised as an audit. It is real diagnostic work. The credit structure means proceeding into implementation is not an additional expense — it is recouping what you already spent to get clarity.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:shrink-0">
            <Button href={siteConfig.calComLink} size="lg">
              Book a scoping call →
            </Button>
          </div>
        </div>
      </BandSection>

      {/* Free diagnostic alternative */}
      <SectionWrapper className="mt-12 pb-6">
        <section className="rounded-[2rem] border border-[#F5F4F0]/10 bg-[#0C0C0E]/35 px-6 py-10 text-center md:px-10">
          <p className="meta-label text-[#F5F4F0]/55">Not ready for a paid roadmap?</p>
          <h2 className="font-display mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-3xl">
            Start with a free diagnostic.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/60 md:text-base">
            Get a problem-class diagnosis first, then decide whether you need a written implementation sequence.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/tools/growth-bottleneck-quiz" variant="secondary" size="lg">
              Growth Bottleneck Quiz →
            </Button>
            <Button href="/problems" variant="ghost" size="lg">
              Browse the problem map →
            </Button>
          </div>
        </section>
      </SectionWrapper>
    </SiteShell>
  );
}

import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { HomepageHero } from "@/components/hero/HomepageHero";
import { HomepageProofRail } from "@/components/home/HomepageProofRail";
import { DiagnosticOrangeBand } from "@/components/home/DiagnosticOrangeBand";
import { InsightsNewsletterBand } from "@/components/home/InsightsNewsletterBand";
import { IcpBlock } from "@/components/home/IcpBlock";
import { EvaluationTrio } from "@/components/home/EvaluationTrio";
import { ProblemHubGrid } from "@/components/problems/ProblemHubGrid";
import { Button } from "@/components/ui/button";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/section-reveal";
import { HomepageCapabilityModule } from "@/components/capabilities/CapabilityPanels";
import { homepageData, homepageMeta } from "@/data/homepage";
import { problemPages } from "@/data/problems";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(homepageMeta);

export default function HomePage() {
  const featuredProblems = problemPages.slice(0, 4);
  const newsletterSubscriberLine = process.env.NEXT_PUBLIC_NEWSLETTER_SUBSCRIBERS?.trim()
    ? `Join ${process.env.NEXT_PUBLIC_NEWSLETTER_SUBSCRIBERS.trim()} readers on the list`
    : homepageData.newsletterBand.subscriberLineFallback;

  return (
    <SiteShell>
      <HomepageHero />

      <HomepageProofRail />

      <SectionWrapper className="mt-14">
        <SectionReveal>
          <SectionHeader
            eyebrow={homepageData.buyerPathSection.eyebrow}
            title={homepageData.buyerPathSection.headline}
            body={homepageData.buyerPathSection.body}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {homepageData.buyerPathSection.paths.map((path) => (
              <article key={path.title} className="panel-obsidian rounded-4xl p-6 md:p-8">
                <p className="meta-label text-[#0FD9C8]">{path.stateLabel}</p>
                <h3 className="font-display mt-4 text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0]">
                  {path.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#F5F4F0]/70">{path.body}</p>
                <ul className="mt-5 space-y-2">
                  {path.signals.map((signal) => (
                    <li key={signal} className="text-sm leading-relaxed text-[#F5F4F0]/58">
                      - {signal}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Button href={path.primaryCta.href} size="md">
                    {path.primaryCta.label}
                  </Button>
                  <Button href={path.secondaryCta.href} variant="ghost" size="md">
                    {path.secondaryCta.label}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </SectionReveal>
      </SectionWrapper>

      <BandSection className="mt-14">
        <SectionReveal delay={0.03}>
          <SectionHeader
            eyebrow={homepageData.systemLogicSection.eyebrow}
            title={homepageData.systemLogicSection.headline}
            body={homepageData.systemLogicSection.body}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {homepageData.systemLogicSection.steps.map((step) => (
              <article key={step.title} className="rounded-3xl border border-[#F5F4F0]/10 bg-[#0F0F13] p-5 md:p-6">
                <p className="meta-label text-[#F05A28]/90">{step.label}</p>
                <h3 className="mt-3 text-lg font-semibold text-[#F5F4F0]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/62">{step.body}</p>
              </article>
            ))}
          </div>
        </SectionReveal>
      </BandSection>

      <SectionWrapper className="mt-14">
        <SectionReveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeader eyebrow={homepageData.problemSection.eyebrow} title={homepageData.problemSection.headline} />
            <Button href={homepageData.problemSection.diagnosticCta.href} variant="ghost">
              {homepageData.problemSection.diagnosticCta.label}
            </Button>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#F5F4F0]/58">{homepageData.problemSection.body}</p>
          <div className="mt-10">
            <ProblemHubGrid problems={featuredProblems} layout="quad" />
          </div>
        </SectionReveal>
      </SectionWrapper>

      <div className="mt-14">
        <DiagnosticOrangeBand
          headline={homepageData.diagnosticBand.headline}
          body={homepageData.diagnosticBand.body}
          cta={homepageData.diagnosticBand.cta}
        />
      </div>

      <BandSection className="mt-16 py-12 md:mt-20 md:py-16">
        <SectionReveal delay={0.04}>
          <SectionHeader
            eyebrow={homepageData.processSection.eyebrow}
            title={homepageData.processSection.headline}
            body={homepageData.processSection.body}
            bodyClassName="mt-5 max-w-2xl text-sm leading-snug text-[#F5F4F0]/70 md:text-[0.9375rem] md:leading-snug"
          />
          <div className="mt-10 md:mt-12">
            <ProcessTimeline
              layout="featured"
              steps={homepageData.processSection.columns.map((column) => ({
                number: column.number,
                title: column.title,
                description: column.body,
              }))}
            />
          </div>
        </SectionReveal>
      </BandSection>

      <HomepageCapabilityModule />

      <SectionWrapper className="mt-14">
        <EvaluationTrio
          eyebrow={homepageData.evaluationTrio.eyebrow}
          headline={homepageData.evaluationTrio.headline}
          items={homepageData.evaluationTrio.items}
        />
      </SectionWrapper>

      <SectionWrapper className="mt-14">
        <SectionReveal>
          <SectionHeader
            eyebrow={homepageData.proofBridgeSection.eyebrow}
            title={homepageData.proofBridgeSection.headline}
            body={homepageData.proofBridgeSection.body}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {homepageData.proofBridgeSection.frames.map((frame) => (
              <article key={frame.metric} className="panel-obsidian rounded-3xl p-5 md:p-6">
                <p className="font-mono text-2xl font-semibold text-[#22C55E]">{frame.metric}</p>
                <p className="mt-2 text-sm font-semibold text-[#F5F4F0]">{frame.context}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/58">{frame.whyItMatters}</p>
              </article>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={homepageData.proofBridgeSection.primaryCta.href} variant="secondary">
              {homepageData.proofBridgeSection.primaryCta.label}
            </Button>
            <Button href={homepageData.proofBridgeSection.secondaryCta.href} variant="ghost">
              {homepageData.proofBridgeSection.secondaryCta.label}
            </Button>
          </div>
        </SectionReveal>
      </SectionWrapper>

      <SectionWrapper className="mt-14">
        <IcpBlock
          eyebrow={homepageData.icpSection.eyebrow}
          headline={homepageData.icpSection.headline}
          body={homepageData.icpSection.body}
          items={homepageData.icpSection.items}
          notAFit={homepageData.icpSection.notAFit}
          cta={homepageData.icpSection.cta}
        />
      </SectionWrapper>

      <InsightsNewsletterBand
        eyebrow={homepageData.newsletterBand.eyebrow}
        headline={homepageData.newsletterBand.headline}
        body={homepageData.newsletterBand.body}
        subscriberLine={newsletterSubscriberLine}
        microcopy={homepageData.newsletterBand.microcopy}
      />

      <SectionWrapper className="mt-14 text-center">
        <SectionReveal delay={0.06}>
          <SectionHeader title={homepageData.closingCta.headline} body={homepageData.closingCta.body} align="center" />
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={homepageData.closingCta.primaryCta.href} size="lg">
              {homepageData.closingCta.primaryCta.label}
            </Button>
            <Button href={homepageData.closingCta.secondaryCta.href} variant="ghost" size="lg">
              {homepageData.closingCta.secondaryCta.label}
            </Button>
          </div>
          <div className="mt-5">
            <Link
              href={homepageData.closingCta.readyLink.href}
              className="text-sm font-medium text-[#F05A28] transition-colors hover:text-[#ff6d40]"
            >
              {homepageData.closingCta.readyLink.label}
            </Link>
          </div>
        </SectionReveal>
      </SectionWrapper>
    </SiteShell>
  );
}

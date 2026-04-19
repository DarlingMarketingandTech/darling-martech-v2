import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { HomepageHero } from "@/components/hero/HomepageHero";
import { ProofTicker } from "@/components/home/ProofTicker";
import { DiagnosticOrangeBand } from "@/components/home/DiagnosticOrangeBand";
import { InsightsNewsletterBand } from "@/components/home/InsightsNewsletterBand";
import { IcpBlock } from "@/components/home/IcpBlock";
import { EvaluationTrio } from "@/components/home/EvaluationTrio";
import { ProblemHubGrid } from "@/components/problems/ProblemHubGrid";
import { Button } from "@/components/ui/button";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
      <HomepageHero
        eyebrow={homepageData.hero.eyebrow}
        headline={homepageData.hero.headline}
        subhead={homepageData.hero.subhead}
        primaryCta={homepageData.hero.primaryCta}
        secondaryCta={homepageData.hero.secondaryCta}
      />

      <div className="mt-6">
        <ProofTicker metrics={homepageData.proofBar} />
      </div>

      <SectionWrapper className="mt-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow={homepageData.problemSection.eyebrow} title={homepageData.problemSection.headline} />
          <Button href={homepageData.problemSection.diagnosticCta.href} variant="ghost">
            {homepageData.problemSection.diagnosticCta.label}
          </Button>
        </div>
        <p className="mt-4 text-sm text-[#F5F4F0]/55">{homepageData.problemSection.body}</p>
        <div className="mt-10">
          <ProblemHubGrid problems={featuredProblems} layout="quad" />
        </div>
      </SectionWrapper>

      <div className="mt-14">
        <DiagnosticOrangeBand
          headline={homepageData.diagnosticBand.headline}
          body={homepageData.diagnosticBand.body}
          cta={homepageData.diagnosticBand.cta}
        />
      </div>

      <BandSection className="mt-14">
        <SectionHeader
          eyebrow={homepageData.processSection.eyebrow}
          title={homepageData.processSection.headline}
          body={homepageData.processSection.body}
        />
        <div className="mt-8">
          <ProcessTimeline
            steps={homepageData.processSection.columns.map((column) => ({
              number: column.number,
              title: column.title,
              description: column.body,
            }))}
          />
        </div>
      </BandSection>

      <SectionWrapper className="mt-14">
        <EvaluationTrio
          eyebrow={homepageData.evaluationTrio.eyebrow}
          headline={homepageData.evaluationTrio.headline}
          items={homepageData.evaluationTrio.items}
        />
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
        <SectionHeader title={homepageData.closingCta.headline} body={homepageData.closingCta.body} align="center" />
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={homepageData.closingCta.primaryCta.href} size="lg">
            {homepageData.closingCta.primaryCta.label}
          </Button>
          <Button href={homepageData.closingCta.secondaryCta.href} variant="ghost" size="lg">
            {homepageData.closingCta.secondaryCta.label}
          </Button>
        </div>
      </SectionWrapper>
    </SiteShell>
  );
}

import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { HomepageHero } from "@/components/hero/HomepageHero";
import { ProofTicker } from "@/components/home/ProofTicker";
import { ProblemPathwayStrip } from "@/components/home/ProblemPathwayStrip";
import { DiagnosticOrangeBand } from "@/components/home/DiagnosticOrangeBand";
import { InsightsNewsletterBand } from "@/components/home/InsightsNewsletterBand";
import { ProblemHubGrid } from "@/components/problems/ProblemHubGrid";
import { ProofCard } from "@/components/proof/ProofCard";
import { ToolsPreviewBand } from "@/components/tools/ToolsPreviewBand";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { caseStudies } from "@/data/work/work-index";
import { homepageData, homepageMeta } from "@/data/homepage";
import { problemPages } from "@/data/problems";
import { tools } from "@/data/labs";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(homepageMeta);

export default function HomePage() {
  const featuredProblems = problemPages.slice(0, 4);
  const featuredTools = tools.slice(0, 4);
  const featuredCaseStudy =
    caseStudies.find((c) => c.slug === homepageData.featuredCaseStudySlug) ?? caseStudies[0];
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

      <ProblemPathwayStrip
        eyebrow={homepageData.pathwayStrip.eyebrow}
        headline={homepageData.pathwayStrip.headline}
        problems={featuredProblems}
      />

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
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {homepageData.processSection.columns.map((column) => (
            <article key={column.number} className="rounded-4xl border border-[#F5F4F0]/10 p-6">
              <p className="font-mono text-xl text-[#F05A28]">{column.number}</p>
              <h3 className="font-display mt-3 text-xl font-semibold md:text-2xl">{column.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#F5F4F0]/72 md:text-base">{column.body}</p>
            </article>
          ))}
        </div>
      </BandSection>

      <SectionWrapper className="mt-14">
        <SectionHeader eyebrow={homepageData.proofStrip.eyebrow} title={homepageData.proofStrip.headline} />
        <div className="mx-auto mt-10 max-w-2xl">
          <AnimateOnScroll>
            <ProofCard caseStudy={featuredCaseStudy} />
          </AnimateOnScroll>
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/proof" variant="ghost">
            See all proof →
          </Button>
        </div>
      </SectionWrapper>

      <InsightsNewsletterBand
        eyebrow={homepageData.newsletterBand.eyebrow}
        headline={homepageData.newsletterBand.headline}
        body={homepageData.newsletterBand.body}
        subscriberLine={newsletterSubscriberLine}
        microcopy={homepageData.newsletterBand.microcopy}
      />

      <BandSection className="mt-14 text-center">
        <SectionHeader
          eyebrow={homepageData.ownerOperator.eyebrow}
          title={homepageData.ownerOperator.headline}
          body={
            <div className="mx-auto max-w-xl space-y-4 text-[#F5F4F0]/74">
              {homepageData.ownerOperator.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          }
          align="center"
        />
        <div className="mt-8">
          <Button href={homepageData.ownerOperator.cta.href} variant="ghost">
            {homepageData.ownerOperator.cta.label}
          </Button>
        </div>
      </BandSection>

      <SectionWrapper className="mt-14">
        <ToolsPreviewBand
          eyebrow={homepageData.toolsPreview.eyebrow}
          headline={homepageData.toolsPreview.headline}
          body={homepageData.toolsPreview.body}
          tools={featuredTools}
          cta={homepageData.toolsPreview.cta}
        />
      </SectionWrapper>

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

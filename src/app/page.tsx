import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { HomepageHero } from "@/components/hero/HomepageHero";
import { ProblemHubGrid } from "@/components/problems/ProblemHubGrid";
import { ProofGrid } from "@/components/proof/ProofGrid";
import { ToolsPreviewBand } from "@/components/tools/ToolsPreviewBand";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseStudies } from "@/data/work/work-index";
import { homepageData, homepageMeta } from "@/data/homepage";
import { problemPages } from "@/data/problems";
import { tools } from "@/data/labs";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(homepageMeta);

export default function HomePage() {
  const featuredProblems = problemPages.slice(0, 4);
  const featuredTools = tools.slice(0, 4);
  const featuredProof = caseStudies.slice(0, 3);

  return (
    <SiteShell>
      <HomepageHero
        eyebrow={homepageData.hero.eyebrow}
        headline={homepageData.hero.headline}
        subhead={homepageData.hero.subhead}
        primaryCta={homepageData.hero.primaryCta}
        secondaryCta={homepageData.hero.secondaryCta}
        metrics={homepageData.proofBar}
      />

      <SectionWrapper>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow={homepageData.problemSection.eyebrow} title={homepageData.problemSection.headline} />
          <Button href={homepageData.problemSection.diagnosticCta.href} variant="ghost">
            {homepageData.problemSection.diagnosticCta.label}
          </Button>
        </div>
        <div className="mt-10">
          <ProblemHubGrid problems={featuredProblems} />
        </div>
      </SectionWrapper>

      <BandSection>
        <SectionHeader
          eyebrow={homepageData.processSection.eyebrow}
          title={homepageData.processSection.headline}
          body={homepageData.processSection.body}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {homepageData.processSection.columns.map((column) => (
            <article key={column.number} className="rounded-[1.75rem] border border-[#F5F4F0]/10 p-6">
              <p className="font-mono text-xl text-[#F05A28]">{column.number}</p>
              <h3 className="font-display mt-3 text-2xl font-semibold">{column.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#F5F4F0]/72">{column.body}</p>
            </article>
          ))}
        </div>
      </BandSection>

      <SectionWrapper>
        <ToolsPreviewBand
          eyebrow={homepageData.toolsPreview.eyebrow}
          headline={homepageData.toolsPreview.headline}
          body={homepageData.toolsPreview.body}
          tools={featuredTools}
          cta={homepageData.toolsPreview.cta}
        />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeader eyebrow="Selected proof" title="Documented outcomes tied to specific systems." />
        <div className="mt-10">
          <ProofGrid caseStudies={featuredProof} />
        </div>
      </SectionWrapper>

      <BandSection className="text-center">
        <SectionHeader
          eyebrow={homepageData.ownerOperator.eyebrow}
          title={homepageData.ownerOperator.headline}
          body={
            <div className="mx-auto max-w-3xl space-y-4">
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

      <SectionWrapper className="text-center">
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

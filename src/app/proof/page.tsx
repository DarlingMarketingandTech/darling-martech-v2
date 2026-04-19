import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { PageHero } from "@/components/hero/PageHero";
import { AntiClaimRow } from "@/components/proof/AntiClaimRow";
import { ProofFilterClient } from "@/components/proof/ProofFilterClient";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { MonoMetric } from "@/components/ui/MonoMetric";
import { homepageData } from "@/data/homepage";
import { proofPageData } from "@/data/proof";
import { routeMetadata } from "@/data/routes";
import { caseStudies } from "@/data/work/work-index";
import { buildMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata(routeMetadata["/proof"]);

const METRICS_STRIP = homepageData.proofBar.slice(0, 4);

export default function ProofPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow={proofPageData.hero.eyebrow}
        headline={proofPageData.hero.headline}
        body={proofPageData.hero.body}
      />

      <section
        aria-label="Key proof metrics"
        className="surface-band -mx-6 mt-10 px-6 py-10 md:-mx-12 md:px-12 md:py-12"
      >
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
          {METRICS_STRIP.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                "md:px-2",
                index < 3 && "md:border-r md:border-[#F5F4F0]/8",
                index % 2 === 0 && index < 3 && "max-md:border-r max-md:border-[#F5F4F0]/8 max-md:pr-4",
                index % 2 === 1 && "max-md:pl-4"
              )}
            >
              <MonoMetric value={metric.value} label={metric.label} size="sm" />
            </div>
          ))}
        </div>
      </section>

      <ProofFilterClient caseStudies={caseStudies} />

      <BandSection className="mt-16 md:mt-20">
        <SectionHeader
          eyebrow={proofPageData.explanation.eyebrow}
          title={proofPageData.explanation.headline}
          body={
            <div className="space-y-4">
              {proofPageData.explanation.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          }
        />
        <div className="mt-8">
          <AntiClaimRow antiClaims={proofPageData.antiClaims} />
        </div>
      </BandSection>

      <section className="mt-16 text-center md:mt-20">
        <h2 className="font-display mx-auto max-w-2xl text-balance text-2xl font-semibold text-[#F5F4F0] md:text-3xl">
          If the proof is convincing, the conversation is easy.
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" size="lg">
            Start a conversation
          </Button>
          <Button href="/process" variant="secondary" size="lg">
            See how I work
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}

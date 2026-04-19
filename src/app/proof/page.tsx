import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { PageHero } from "@/components/hero/PageHero";
import { AntiClaimRow } from "@/components/proof/AntiClaimRow";
import { ProofGrid } from "@/components/proof/ProofGrid";
import { ProofOutcomeFilters } from "@/components/proof/ProofOutcomeFilters";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { proofPageData } from "@/data/proof";
import { routeMetadata } from "@/data/routes";
import { caseStudies } from "@/data/work/work-index";
import { OUTCOME_SLUG_ORDER } from "@/data/taxonomy";
import { buildMetadata } from "@/lib/metadata";
import type { OutcomeSlug } from "@/types";

export const metadata = buildMetadata(routeMetadata["/proof"]);

type ProofPageProps = {
  searchParams: Promise<{ outcome?: string }>;
};

export default async function ProofPage({ searchParams }: ProofPageProps) {
  const params = await searchParams;
  const raw = params.outcome;
  const activeSlug =
    raw && OUTCOME_SLUG_ORDER.includes(raw as OutcomeSlug) ? (raw as OutcomeSlug) : null;

  const filtered =
    activeSlug === null ? caseStudies : caseStudies.filter((c) => c.primaryOutcomeSlug === activeSlug);

  return (
    <SiteShell>
      <PageHero
        eyebrow={proofPageData.hero.eyebrow}
        headline={proofPageData.hero.headline}
        body={proofPageData.hero.body}
      />

      <div className="mt-10">
        <ProofOutcomeFilters activeSlug={activeSlug} />
      </div>

      <div className="mt-10">
        <ProofGrid caseStudies={filtered} />
      </div>

      <BandSection className="mt-14">
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
    </SiteShell>
  );
}

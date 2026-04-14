import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { PageHero } from "@/components/hero/PageHero";
import { AntiClaimRow } from "@/components/proof/AntiClaimRow";
import { ProofGrid } from "@/components/proof/ProofGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { proofPageData } from "@/data/proof";
import { routeMetadata } from "@/data/routes";
import { caseStudies } from "@/data/work/work-index";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(routeMetadata["/proof"]);

export default function ProofPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow={proofPageData.hero.eyebrow}
        headline={proofPageData.hero.headline}
        body={proofPageData.hero.body}
      />
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
      <div className="mt-14">
        <ProofGrid caseStudies={caseStudies} />
      </div>
    </SiteShell>
  );
}

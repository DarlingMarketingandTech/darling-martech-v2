import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PageHero } from "@/components/hero/PageHero";
import { ServiceEcosystemSupportBlock } from "@/components/capabilities/CapabilityPanels";
import { ServiceHeroVisual } from "@/components/services/ServiceHeroVisual";
import { ServiceDetailContextStrip } from "@/components/services/ServiceDetailContextStrip";
import { ServiceOutcomesGrid } from "@/components/services/ServiceOutcomesGrid";
import { ServiceRelatedProblemsBlock } from "@/components/services/ServiceRelatedProblemsBlock";
import { ServiceProofConnection } from "@/components/services/ServiceProofConnection";
import { ServiceDetailCtas } from "@/components/services/ServiceDetailCtas";
import { services } from "@/data/services";
import { problemPages } from "@/data/problems";
import { caseStudies } from "@/data/work/work-index";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site-config";

type ServiceSlugPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Exclude service slugs that have dedicated static pages under `src/app/services/<slug>/`
 * to prevent double-generation (same pattern as `src/app/tools/[slug]/page.tsx`).
 */
const DEDICATED_SERVICE_PAGES: string[] = ["technical-roadmap"];

export async function generateStaticParams() {
  return services
    .filter((s) => !DEDICATED_SERVICE_PAGES.includes(s.slug))
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServiceSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return buildMetadata({ title: "Service not found", description: "", noIndex: true });
  }
  return buildMetadata({
    title: service.title,
    description: service.headline,
    canonicalUrl: `https://darlingmartech.com/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServiceSlugPageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedProblems = problemPages.filter((p) => service.problemClusters.includes(p.slug));
  const proof = caseStudies.filter((c) => service.proofReferences.includes(c.slug));

  return (
    <SiteShell>
      <PageHero
        eyebrow="SERVICE"
        headline={service.title}
        body={[service.headline, service.description]}
        splitAside={
          service.visualPublicId ? (
            <ServiceHeroVisual
              publicId={service.visualPublicId}
              alt={service.visualAlt ?? service.title}
            />
          ) : undefined
        }
        ctas={[
          { label: "Book a 30-minute call →", href: siteConfig.calComLink, variant: "primary" },
          { label: "Run the diagnostic →", href: "/tools/growth-bottleneck-quiz", variant: "secondary" },
        ]}
      />

      <SectionWrapper className="py-12 md:py-16">
        <ServiceDetailContextStrip service={service} />
      </SectionWrapper>

      <BandSection className="py-12 md:py-16">
        <ServiceOutcomesGrid outcomes={service.outcomes} serviceTitle={service.title} />
      </BandSection>

      <ServiceEcosystemSupportBlock serviceSlug={service.slug} />

      {relatedProblems.length ? (
        <SectionWrapper className="py-12 md:py-16">
          <ServiceRelatedProblemsBlock problems={relatedProblems} />
        </SectionWrapper>
      ) : null}

      {proof.length ? (
        <SectionWrapper className="py-12 md:py-16">
          <ServiceProofConnection serviceTitle={service.title} caseStudies={proof} />
        </SectionWrapper>
      ) : null}

      <SectionWrapper className="pb-20 pt-4 md:pb-24">
        <ServiceDetailCtas service={service} />
      </SectionWrapper>
    </SiteShell>
  );
}

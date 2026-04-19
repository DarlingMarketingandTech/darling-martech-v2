import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { PageHero } from "@/components/hero/PageHero";
import { ProofGrid } from "@/components/proof/ProofGrid";
import { Button } from "@/components/ui/button";
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
      <PageHero eyebrow="SERVICE" headline={service.title} body={service.description} />

      <BandSection className="mt-14">
        <p className="text-sm uppercase tracking-[0.24em] text-[#0FD9C8]">Outcomes</p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-lg text-[#F5F4F0]/75">
          {service.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </BandSection>

      {relatedProblems.length ? (
        <BandSection className="mt-10">
          <p className="text-sm uppercase tracking-[0.24em] text-[#F05A28]">Related problems</p>
          <ul className="mt-4 flex flex-col gap-3">
            {relatedProblems.map((p) => (
              <li key={p.slug}>
                <Link href={`/problems/${p.slug}`} className="text-[#F05A28] hover:underline">
                  {p.title} →
                </Link>
              </li>
            ))}
          </ul>
        </BandSection>
      ) : null}

      {proof.length ? (
        <div className="mt-14">
          <p className="text-sm uppercase tracking-[0.24em] text-[#F05A28]">Proof</p>
          <div className="mt-8">
            <ProofGrid caseStudies={proof} />
          </div>
        </div>
      ) : null}

      <div className="mt-14 flex flex-col gap-4 sm:flex-row">
        <Button href={siteConfig.calComLink} size="lg">
          Start a conversation →
        </Button>
        <Button href="/tools/growth-bottleneck-quiz" variant="secondary" size="lg">
          Run the diagnostic first →
        </Button>
      </div>
    </SiteShell>
  );
}

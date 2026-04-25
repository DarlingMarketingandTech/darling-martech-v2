import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PageHero } from "@/components/hero/PageHero";
import { ServiceHeroVisual } from "@/components/services/ServiceHeroVisual";
import { ServiceOutcomesGrid } from "@/components/services/ServiceOutcomesGrid";
import { ServiceProofConnection } from "@/components/services/ServiceProofConnection";
import { ServiceDetailCtas } from "@/components/services/ServiceDetailCtas";
import { ServiceRelatedProblemsBlock } from "@/components/services/ServiceRelatedProblemsBlock";
import Link from "next/link";
import { services } from "@/data/services";
import { problemPages } from "@/data/problems";
import { getNewsroomArticlesByServiceSlug } from "@/data/newsroom";
import { NewsroomRelatedStrip } from "@/components/newsroom/NewsroomRelatedStrip";
import { caseStudies } from "@/data/work/work-index";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site-config";
import { getProblemBuyerState } from "@/lib/buyer-state";

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
  const curatedProblems = relatedProblems.slice(0, 2);
  const proof = caseStudies.filter((c) => service.proofReferences.includes(c.slug));
  const featuredProof = proof[0];
  const newsroomForService = getNewsroomArticlesByServiceSlug(service.slug);
  const primaryProblem = relatedProblems[0];
  const states = new Set(service.problemClusters.map((slug) => getProblemBuyerState(slug)));
  const buyerStateLabel =
    states.size > 1 || states.has("both")
      ? "Works for broken and missing system states"
      : states.has("broken")
        ? "Best fit for broken-system buyers"
        : "Best fit for missing-system buyers";
  const heroCtas = [
    { label: "Book a diagnostic call →", href: siteConfig.calComLink, variant: "primary" as const },
    featuredProof
      ? { label: "See related proof →", href: `/proof/${featuredProof.slug}`, variant: "secondary" as const }
      : { label: "Browse proof →", href: "/proof", variant: "secondary" as const },
  ];
  const processSteps = [
    "Clarify constraints, decision criteria, and what success looks like in this context.",
    "Implement the highest-leverage work first and cut low-impact complexity.",
    "Instrument outcomes so every adjustment ties back to revenue signal and operating clarity.",
  ];

  return (
    <SiteShell hideNewsletterSignup>
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
        ctas={heroCtas}
      />

      <SectionWrapper className="py-12 md:py-16">
        <section className="max-w-4xl" aria-labelledby="service-change-heading">
          <p className="mb-3 inline-flex rounded-full border border-[#F5F4F0]/18 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-[#F5F4F0]/76">
            {buyerStateLabel}
          </p>
          <p className="meta-label text-[#0FD9C8]/90">What this service changes</p>
          <h2
            id="service-change-heading"
            className="font-display mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-3xl"
          >
            From fragmented execution to one clear operating system
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#F5F4F0]/72 md:text-lg">
            {service.description}
          </p>
          {primaryProblem ? (
            <p className="mt-6 text-sm leading-relaxed text-[#F5F4F0]/58">
              Common friction behind this service:{" "}
              <Link
                href={`/problems/${primaryProblem.slug}`}
                className="text-[#F05A28] underline decoration-[#F05A28]/35 underline-offset-4 transition-colors hover:text-[#ff6d40]"
              >
                {primaryProblem.title}
              </Link>
              .
            </p>
          ) : null}
        </section>
      </SectionWrapper>

      <BandSection className="py-12 md:py-16">
        <ServiceOutcomesGrid outcomes={service.outcomes} serviceTitle={service.title} />
      </BandSection>

      {featuredProof ? (
        <SectionWrapper className="py-12 md:py-16">
          <ServiceProofConnection serviceTitle={service.title} caseStudy={featuredProof} />
        </SectionWrapper>
      ) : null}

      {curatedProblems.length ? (
        <SectionWrapper className="py-12 md:py-16">
          <ServiceRelatedProblemsBlock problems={curatedProblems} />
        </SectionWrapper>
      ) : null}

      <SectionWrapper className="py-12 md:py-16">
        <section
          className="rounded-[2rem] border border-[#F5F4F0]/8 bg-[#0D0D12]/45 px-6 py-10 md:px-9 md:py-12"
          aria-labelledby="service-delivery-heading"
        >
          <p className="meta-label text-[#0FD9C8]/90">Process</p>
          <h2
            id="service-delivery-heading"
            className="font-display mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-3xl"
          >
            How delivery stays focused and measurable
          </h2>
          <ul className="mt-8 space-y-4">
            {processSteps.map((step, index) => (
              <li key={step} className="border-b border-[#F5F4F0]/8 pb-4 last:border-b-0 last:pb-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5F4F0]/42">
                  Step 0{index + 1}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/72 md:text-base">{step}</p>
              </li>
            ))}
          </ul>
        </section>
        </SectionWrapper>

      {newsroomForService.length > 0 ? (
        <SectionWrapper className="max-w-3xl pb-4 pt-2 md:pb-6">
          <NewsroomRelatedStrip articles={newsroomForService} eyebrow="From the newsroom" />
        </SectionWrapper>
      ) : null}

      <SectionWrapper className="pb-20 pt-4 md:pb-24">
        <ServiceDetailCtas service={service} />
      </SectionWrapper>
    </SiteShell>
  );
}

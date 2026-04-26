import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PageHero } from "@/components/hero/PageHero";
import { ServiceHeroVisual } from "@/components/services/ServiceHeroVisual";
import { Button } from "@/components/ui/button";
import { ProofImplementationStackBlock } from "@/components/capabilities/CapabilityPanels";
import { ProofAnglesDemonstration } from "@/components/proof/ProofAnglesDemonstration";
import { ProofDetailAmbient } from "@/components/proof/ProofDetailAmbient";
import { ProofMetricTile } from "@/components/proof/ProofMetricTile";
import { getProofAnglesForProject } from "@/data/proof-angles";
import { caseStudies } from "@/data/work/work-index";
import { problemPages } from "@/data/problems";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { getSimilarProof } from "@/lib/proof-similar";
import { getProofDetailHeroPublicId } from "@/data/proof-visuals";
import { PROJECT_TYPE_LABELS } from "@/data/taxonomy";
import { getNewsroomArticlesByProofSlug } from "@/data/newsroom";
import { NewsroomRelatedStrip } from "@/components/newsroom/NewsroomRelatedStrip";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
const layerChipClass =
  "rounded-md border border-[#F5F4F0]/12 bg-[#0C0C0E]/35 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#F5F4F0]/58";

type ProofSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: ProofSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((entry) => entry.slug === slug);

  if (!study) {
    return buildMetadata({ title: "Proof not found", description: "The requested proof page does not exist.", noIndex: true });
  }

  return buildMetadata({
    title: `${PROJECT_TYPE_LABELS[study.projectType]} — ${study.outcomeHeadline}`,
    description: study.resultSummary,
    canonicalUrl: `https://darlingmartech.com/proof/${study.slug}`,
  });
}

export default async function ProofSlugPage({ params }: ProofSlugPageProps) {
  const { slug } = await params;
  const study = caseStudies.find((entry) => entry.slug === slug);

  if (!study) {
    notFound();
  }

  const relatedProblems = problemPages.filter((problem) =>
    (study.relatedProblemSlugs ?? study.problemClusters).includes(problem.slug)
  );

  const relatedServices = services.filter((s) =>
    study.relatedServiceSlugs?.includes(s.slug)
  );

  const similarProjects = getSimilarProof(study, caseStudies);

  const proofAngles = getProofAnglesForProject(study.slug).slice(0, 3);
  const newsroomForProof = getNewsroomArticlesByProofSlug(study.slug);
  const heroImagePublicId = getProofDetailHeroPublicId(study);
  const heroImageAlt = `${study.clientName} — engagement visual`;
  const metricGridClass =
    study.metrics.length >= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : study.metrics.length === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <SiteShell>
      <div className="relative isolate">
        <ProofDetailAmbient imagePublicId={heroImagePublicId} />
        <div className="relative z-10">
      <PageHero
        eyebrow={PROJECT_TYPE_LABELS[study.projectType]}
        headline={study.title}
        body={[
          `${study.clientName} · ${study.clientContext}`,
          study.heroSubhead ?? study.resultSummary,
        ]}
        splitAside={<ServiceHeroVisual publicId={heroImagePublicId} alt={heroImageAlt} />}
      />

      {/* Metrics strip */}
      <BandSection className="mt-10">
        <div className="tech-divider mb-6 max-w-md" />
        <div className={cn("grid grid-cols-1 gap-4", metricGridClass)}>
          {study.metrics.map((metric) => (
            <ProofMetricTile key={`${metric.value}-${metric.label}`} metric={metric} />
          ))}
        </div>
      </BandSection>

      {/* Why this mattered + what was broken */}
      {(study.whyThisMattered || study.whatWasBroken?.length) && (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {study.whyThisMattered && (
            <div className="panel-obsidian grain-mask rounded-3xl p-7 md:p-8">
              <p className="meta-label text-[#F05A28]/90">Why it mattered</p>
              <div className="tech-divider my-4 max-w-sm" />
              <p className="leading-7 text-[#F5F4F0]/72">{study.whyThisMattered}</p>
            </div>
          )}
          {study.whatWasBroken?.length && (
            <div className="panel-titanium grain-mask rounded-3xl p-7 md:p-8">
              <p className="meta-label text-[#F05A28]/90">What was broken</p>
              <div className="tech-divider my-4 max-w-sm" />
              <ul className="space-y-2">
                {study.whatWasBroken.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#F5F4F0]/65">
                    <span className="mt-0.5 text-[#F05A28]">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Build sections */}
      {study.buildSections?.length && (
        <SectionWrapper className="mt-14">
          <p className="meta-label-accent">What was built</p>
          <div className="tech-divider my-5 max-w-md" />
          <div className="flex flex-col">
            {study.buildSections.map((section, i) => (
              <div key={section.title}>
                {i > 0 ? <div className="tech-divider my-6 max-w-2xl" /> : null}
                <div className="flex gap-5">
                  <span className="font-mono mt-0.5 shrink-0 text-[11px] font-semibold tabular-nums tracking-wider text-[#0FD9C8]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                      {section.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/62">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Operating impact + implementation layers */}
      {(study.operatingImpact || study.implementationLayers?.length) && (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {study.operatingImpact && (
            <div className="panel-obsidian grain-mask rounded-3xl p-7 md:p-8">
              <p className="meta-label-accent">Operating impact</p>
              <div className="tech-divider my-4 max-w-sm" />
              <p className="text-sm leading-relaxed text-[#F5F4F0]/72">{study.operatingImpact}</p>
            </div>
          )}
          {study.implementationLayers?.length && (
            <div className="panel-titanium grain-mask rounded-3xl p-7 md:p-8">
              <p className="meta-label-accent">Implementation layers</p>
              <div className="tech-divider my-4 max-w-sm" />
              <ul className="flex flex-wrap gap-2">
                {study.implementationLayers.map((layer) => (
                  <li key={layer}>
                    <span className={layerChipClass}>{layer}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <ProofImplementationStackBlock
        implementationStackCategories={study.implementationStackCategories}
        implementationPlatformSlugs={study.implementationPlatformSlugs}
        implementationLayers={study.implementationLayers}
      />

      <SectionWrapper>
        <ProofAnglesDemonstration angles={proofAngles} />
      </SectionWrapper>

      {/* Fallback full story for older proofs without new fields */}
      {!study.buildSections?.length && study.fullStory && (
        <div className="panel-obsidian grain-mask mt-14 rounded-3xl p-8 md:p-9">
          <p className="meta-label-accent">Full story</p>
          <div className="tech-divider my-5 max-w-md" />
          <p className="text-lg leading-8 text-[#F5F4F0]/72">{study.fullStory}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {study.systemsBuilt.map((system) => (
              <span key={system} className={layerChipClass}>
                {system}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related problems */}
      {relatedProblems.length > 0 && (
        <BandSection className="mt-14">
          <p className="meta-label text-[#F05A28]/90">This work solved</p>
          <div className="tech-divider my-4 max-w-sm" />
          <div className="mt-2 flex flex-wrap gap-3">
            {relatedProblems.map((problem) => (
              <Link
                key={problem.slug}
                href={`/problems/${problem.slug}`}
                className="rounded-full border border-[#F5F4F0]/10 px-4 py-2 text-sm text-[#F5F4F0]/68 transition-colors hover:border-[#F05A28]/40 hover:text-[#F05A28]"
              >
                {problem.title}
              </Link>
            ))}
          </div>
        </BandSection>
      )}

      {/* Related services */}
      {relatedServices.length > 0 && (
        <SectionWrapper className="mt-10">
          <p className="meta-label text-[#F05A28]/90">Capabilities demonstrated</p>
          <div className="tech-divider my-4 max-w-sm" />
          <div className="mt-2 flex flex-wrap gap-3">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-full border border-[#F5F4F0]/10 px-4 py-2 text-sm text-[#F5F4F0]/68 transition-colors hover:border-[#F05A28]/40 hover:text-[#F05A28]"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </SectionWrapper>
      )}

      {similarProjects.length > 0 && (
        <SectionWrapper className="mt-10">
          <p className="meta-label text-[#0FD9C8]/90">Similar projects</p>
          <div className="tech-divider my-4 max-w-sm" />
          <p className="mb-4 max-w-2xl text-sm text-[#F5F4F0]/52">
            Same project shape and scope — useful when you are comparing delivery risk, not company names.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            {similarProjects.map((c) => (
              <Link
                key={c.slug}
                href={`/proof/${c.slug}`}
                className="rounded-full border border-[#F5F4F0]/10 px-4 py-2 text-sm text-[#F5F4F0]/68 transition-colors hover:border-[#0FD9C8]/40 hover:text-[#0FD9C8]"
              >
                {PROJECT_TYPE_LABELS[c.projectType]} — {c.outcomeHeadline} →
              </Link>
            ))}
          </div>
        </SectionWrapper>
      )}

      {newsroomForProof.length > 0 ? (
        <SectionWrapper className="mt-14 max-w-3xl">
          <NewsroomRelatedStrip articles={newsroomForProof} eyebrow="From the newsroom" />
        </SectionWrapper>
      ) : null}

      <SectionWrapper className="mt-14 text-center">
        <h2 className="font-display text-balance text-2xl font-semibold text-[#F5F4F0] md:text-3xl">
          High trust, clear problem, ready to move?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-[#F5F4F0]/55">
          Mid trust: keep browsing similar proof. High trust: book a short diagnostic call.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={siteConfig.calComLink} size="lg">
            Book a diagnostic call
          </Button>
          <Button href="/proof" variant="secondary" size="lg">
            See more proof
          </Button>
        </div>
      </SectionWrapper>
        </div>
      </div>
    </SiteShell>
  );
}

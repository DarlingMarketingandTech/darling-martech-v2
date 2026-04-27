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
import { ProofSystemSnapshot } from "@/components/proof/ProofSystemSnapshot";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { getProofAnglesForProject } from "@/data/proof-angles";
import { caseStudies } from "@/data/work/work-index";
import { problemPages } from "@/data/problems";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { getSimilarProof } from "@/lib/proof-similar";
import {
  getProofDetailHeroAlt,
  getProofDetailHeroPublicId,
  getProofDetailSupportVisuals,
} from "@/data/proof-visuals";
import { PROJECT_TYPE_LABELS, PROJECT_TYPE_RELATED_BUILD_LABELS } from "@/data/taxonomy";
import { getNewsroomArticlesByProofSlug } from "@/data/newsroom";
import { NewsroomRelatedStrip } from "@/components/newsroom/NewsroomRelatedStrip";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
const layerChipClass =
  "rounded-md border border-[#F5F4F0]/12 bg-[#0C0C0E]/35 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#F5F4F0]/58";

function getProjectFirstTitle(title: string) {
  const [clientLead, projectLead] = title.split(" — ");
  return projectLead?.trim() ? projectLead.trim() : clientLead.trim();
}

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

  const similarProjects = getSimilarProof(study, caseStudies, { limit: 3 });

  const proofAngles = getProofAnglesForProject(study.slug).slice(0, 3);
  const newsroomForProof = getNewsroomArticlesByProofSlug(study.slug);
  const heroImagePublicId = getProofDetailHeroPublicId(study);
  const supportVisuals = getProofDetailSupportVisuals(study).slice(0, 1);
  const heroTitle = getProjectFirstTitle(study.title);
  const heroImageAlt = getProofDetailHeroAlt(study);
  const contextLine =
    study.showClientName === false
      ? (study.clientContextLabel ?? study.clientContext)
      : `${study.clientName} · ${study.clientContext}`;
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
        headline={heroTitle}
        body={[
          study.heroSubhead ?? study.resultSummary,
          contextLine,
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

      <ProofSystemSnapshot caseStudy={study} />

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

      {supportVisuals.length > 0 ? (
        <SectionWrapper className="mt-14">
          <p className="meta-label-accent">Supporting visual</p>
          <div className="tech-divider my-5 max-w-md" />
          <div className="overflow-hidden rounded-3xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/28">
            {supportVisuals.map((visual) => (
              <div key={visual.publicId}>
                <CloudinaryImage
                  publicId={visual.publicId}
                  alt={visual.alt}
                  width={1600}
                  height={960}
                  sizes="(max-width: 1024px) 100vw, 72vw"
                  postTransforms="e_sharpen"
                  cloudinaryQuality="auto"
                  className="h-auto w-full object-cover"
                />
                <div className="border-t border-[#F5F4F0]/10 px-5 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0FD9C8]/82">
                    {visual.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      ) : null}

      {study.operatingImpact && (
        <div className="mt-14">
          <div className="panel-obsidian grain-mask rounded-3xl p-7 md:p-8">
            <p className="meta-label-accent">Operating impact</p>
            <div className="tech-divider my-4 max-w-sm" />
            <p className="text-sm leading-relaxed text-[#F5F4F0]/72">{study.operatingImpact}</p>
          </div>
        </div>
      )}
      <ProofImplementationStackBlock
        implementationStackCategories={study.implementationStackCategories}
        implementationPlatformSlugs={study.implementationPlatformSlugs}
        implementationLayers={study.implementationLayers}
        implementationGroupSummary={study.implementationGroupSummary}
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

      {(relatedProblems.length > 0 || relatedServices.length > 0) && (
        <BandSection className="mt-14">
          <div className="grid gap-8 md:grid-cols-2">
            {relatedProblems.length > 0 ? (
              <div>
                <p className="meta-label text-[#F05A28]/90">Problems addressed</p>
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
              </div>
            ) : null}

            {relatedServices.length > 0 ? (
              <div>
                <p className="meta-label text-[#F05A28]/90">Build capabilities involved</p>
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
              </div>
            ) : null}
          </div>
        </BandSection>
      )}

      {similarProjects.length > 0 && (
        <SectionWrapper className="mt-10">
          <p className="meta-label text-[#0FD9C8]/90">Related build types</p>
          <div className="tech-divider my-4 max-w-sm" />
          <p className="mb-4 max-w-2xl text-sm text-[#F5F4F0]/52">
            Similar project shapes and delivery patterns — useful when you are comparing system fit, not client names.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            {similarProjects.map((c) => (
              <Link
                key={c.slug}
                href={`/proof/${c.slug}`}
                className="rounded-full border border-[#F5F4F0]/10 px-4 py-2 text-sm text-[#F5F4F0]/68 transition-colors hover:border-[#0FD9C8]/40 hover:text-[#0FD9C8]"
              >
                {c.relatedBuildTypeLabel ?? PROJECT_TYPE_RELATED_BUILD_LABELS[c.projectType]} →
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
          Still deciding how similar this is to your situation?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-[#F5F4F0]/55">
          Low trust: run the Growth System Audit. High trust: book a short diagnostic call once the shape is clear.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/tools/growth-system-audit" size="lg">
            Run the Growth System Audit →
          </Button>
          <Button href={siteConfig.calComLink} variant="secondary" size="lg">
            Book a diagnostic call
          </Button>
        </div>
      </SectionWrapper>
        </div>
      </div>
    </SiteShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PageHero } from "@/components/hero/PageHero";
import { MonoMetric } from "@/components/ui/MonoMetric";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/work/work-index";
import { problemPages } from "@/data/problems";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site-config";

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
    title: `${study.clientName} — ${study.outcomeHeadline}`,
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

  const relatedProofs = caseStudies.filter(
    (c) => study.relatedProofSlugs?.includes(c.slug)
  );

  return (
    <SiteShell>
      <PageHero
        eyebrow={study.clientName}
        headline={study.title}
        body={study.heroSubhead ?? study.resultSummary}
      />

      {/* Metrics strip */}
      <BandSection className="mt-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {study.metrics.map((metric) => (
            <MonoMetric key={metric.label} value={metric.value} label={metric.label} />
          ))}
        </div>
      </BandSection>

      {/* Why this mattered + what was broken */}
      {(study.whyThisMattered || study.whatWasBroken?.length) && (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {study.whyThisMattered && (
            <div className="surface-card rounded-3xl p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">Why it mattered</p>
              <p className="mt-4 leading-7 text-[#F5F4F0]/72">{study.whyThisMattered}</p>
            </div>
          )}
          {study.whatWasBroken?.length && (
            <div className="surface-card rounded-3xl p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">What was broken</p>
              <ul className="mt-4 space-y-2">
                {study.whatWasBroken.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#F5F4F0]/60">
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
          <p className="text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">What was built</p>
          <div className="mt-6 flex flex-col gap-5">
            {study.buildSections.map((section, i) => (
              <div key={section.title} className="flex gap-5">
                <span className="font-mono mt-1 text-xs text-[#0FD9C8] shrink-0">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-base font-semibold text-[#F5F4F0]">
                    {section.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/60">
                    {section.description}
                  </p>
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
            <div className="surface-card rounded-3xl p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">Operating impact</p>
              <p className="mt-4 text-sm leading-relaxed text-[#F5F4F0]/72">{study.operatingImpact}</p>
            </div>
          )}
          {study.implementationLayers?.length && (
            <div className="surface-card rounded-3xl p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">Implementation layers</p>
              <ul className="mt-4 space-y-2">
                {study.implementationLayers.map((layer) => (
                  <li
                    key={layer}
                    className="rounded-full border border-[#F5F4F0]/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#F5F4F0]/56 inline-block mr-2 mb-2"
                  >
                    {layer}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Fallback full story for older proofs without new fields */}
      {!study.buildSections?.length && study.fullStory && (
        <div className="surface-card mt-14 rounded-3xl p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">Full story</p>
          <p className="mt-4 text-lg leading-8 text-[#F5F4F0]/72">{study.fullStory}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {study.systemsBuilt.map((system) => (
              <span
                key={system}
                className="rounded-full border border-[#F5F4F0]/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#F5F4F0]/56"
              >
                {system}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related problems */}
      {relatedProblems.length > 0 && (
        <BandSection className="mt-14">
          <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">This work solved</p>
          <div className="mt-5 flex flex-wrap gap-3">
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
          <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">Capabilities demonstrated</p>
          <div className="mt-4 flex flex-wrap gap-3">
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

      {/* Related proofs */}
      {relatedProofs.length > 0 && (
        <SectionWrapper className="mt-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#F5F4F0]/40">Related proof</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedProofs.map((c) => (
              <Link
                key={c.slug}
                href={`/proof/${c.slug}`}
                className="rounded-full border border-[#F5F4F0]/10 px-4 py-2 text-sm text-[#F5F4F0]/56 transition-colors hover:border-[#F5F4F0]/25"
              >
                {c.outcomeHeadline} →
              </Link>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* CTA */}
      <SectionWrapper className="mt-14 text-center">
        <h2 className="font-display text-balance text-2xl font-semibold text-[#F5F4F0] md:text-3xl">
          If the proof is convincing, the conversation is easy.
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={siteConfig.calComLink} size="lg">
            Start a conversation
          </Button>
          <Button href="/proof" variant="secondary" size="lg">
            Back to all proof
          </Button>
        </div>
      </SectionWrapper>
    </SiteShell>
  );
}

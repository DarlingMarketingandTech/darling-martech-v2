import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { PageHero } from "@/components/hero/PageHero";
import { MonoMetric } from "@/components/ui/MonoMetric";
import { caseStudies } from "@/data/work/work-index";
import { problemPages } from "@/data/problems";
import { buildMetadata } from "@/lib/metadata";

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
    title: `${study.clientName} case study`,
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

  const relatedProblems = problemPages.filter((problem) => study.problemClusters.includes(problem.slug));

  return (
    <SiteShell>
      <PageHero eyebrow={study.clientName} headline={study.title} body={study.resultSummary} />

      <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <BandSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {study.metrics.map((metric) => (
              <MonoMetric key={metric.label} value={metric.value} label={metric.label} />
            ))}
          </div>
        </BandSection>
        <div className="surface-card rounded-4xl p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-[#0FD9C8]">Full story</p>
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
      </div>

      {relatedProblems.length ? (
        <div className="mt-14 surface-card rounded-4xl p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-[#F05A28]">This work solved</p>
          <div className="mt-6 flex flex-wrap gap-3">
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
    </SiteShell>
  );
}

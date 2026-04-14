import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { DiagnosticCTA } from "@/components/problems/DiagnosticCTA";
import { ProblemNav } from "@/components/problems/ProblemNav";
import { SymptomList } from "@/components/problems/SymptomList";
import { ProofGrid } from "@/components/proof/ProofGrid";
import { PageHero } from "@/components/hero/PageHero";
import { problemPages } from "@/data/problems";
import { caseStudies } from "@/data/work/work-index";
import { buildMetadata } from "@/lib/metadata";

type ProblemSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return problemPages.map((problem) => ({ slug: problem.slug }));
}

export async function generateMetadata({ params }: ProblemSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const problem = problemPages.find((entry) => entry.slug === slug);

  if (!problem) {
    return buildMetadata({ title: "Problem not found", description: "The requested problem page does not exist.", noIndex: true });
  }

  return buildMetadata({
    title: problem.title,
    description: problem.heroSubhead,
    canonicalUrl: `https://darlingmartech.com/problems/${problem.slug}`,
  });
}

export default async function ProblemSlugPage({ params }: ProblemSlugPageProps) {
  const { slug } = await params;
  const problem = problemPages.find((entry) => entry.slug === slug);

  if (!problem) {
    notFound();
  }

  const relatedProof = caseStudies.filter((study) => problem.relatedProof.includes(study.slug));

  return (
    <SiteShell>
      <ProblemNav problems={problemPages} activeProblem={problem.slug} />
      <div className="mt-10">
        <PageHero
          eyebrow={problem.slug.replaceAll("-", " ")}
          headline={problem.heroHeadline}
          body={problem.heroSubhead}
          ctas={[
            { label: problem.cta.primary.label, href: problem.cta.primary.href },
            { label: problem.cta.secondary.label, href: problem.cta.secondary.href, variant: "secondary" },
          ]}
        />
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <SymptomList symptoms={problem.symptoms} />
        <BandSection>
          <div className="grid gap-7">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#0FD9C8]">What is actually causing it</p>
              <p className="mt-4 text-lg leading-8 text-[#F5F4F0]/72">{problem.cause}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#F05A28]">What I build instead</p>
              <p className="mt-4 text-lg leading-8 text-[#F5F4F0]/72">{problem.solution}</p>
            </div>
          </div>
        </BandSection>
      </div>

      {relatedProof.length ? (
        <div className="mt-14">
          <p className="text-sm uppercase tracking-[0.24em] text-[#F05A28]">Related proof</p>
          <div className="mt-8">
            <ProofGrid caseStudies={relatedProof} />
          </div>
        </div>
      ) : null}

      <div className="mt-14">
        <DiagnosticCTA problem={problem} />
      </div>
    </SiteShell>
  );
}

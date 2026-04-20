import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { SiteShell } from "@/components/layout/site-shell";
import { BandSection } from "@/components/layout/BandSection";
import { ProblemClosingSection } from "@/components/problems/ProblemClosingSection";
import { ProblemNav } from "@/components/problems/ProblemNav";
import { ProblemProofAngles } from "@/components/problems/ProblemProofAngles";
import { SymptomList } from "@/components/problems/SymptomList";
import { ProofGrid } from "@/components/proof/ProofGrid";
import { PageHero } from "@/components/hero/PageHero";
import { problemPages } from "@/data/problems";
import { getProofAnglesForProblem } from "@/data/proof-angles";
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
  const primaryService = services.find((s) => s.slug === problem.relatedService);
  const proofAnglesForProblem = getProofAnglesForProblem(problem.slug, {
    limit: 4,
    preferredParentSlugs: problem.relatedProof,
  });
  const parentProofTitles = new Map(caseStudies.map((study) => [study.slug, study.title]));

  return (
    <SiteShell>
      <div className="mt-10">
        <PageHero
          eyebrow={problem.pageEyebrow}
          headline={problem.heroHeadline}
          body={problem.introParagraphs}
        />
      </div>

      <div className="mt-14">
        <SymptomList symptoms={problem.symptoms} />
      </div>

      <div className="mt-14 space-y-14">
        <BandSection>
          <p className="meta-label-accent">Why it happens</p>
          <div className="tech-divider my-4 max-w-md" />
          <p className="max-w-3xl text-lg leading-8 text-[#F5F4F0]/72">{problem.whyItHappens}</p>
        </BandSection>

        <BandSection>
          <p className="meta-label text-[#F05A28]/90">What it costs</p>
          <div className="tech-divider my-4 max-w-md" />
          <p className="max-w-3xl text-lg leading-8 text-[#F5F4F0]/72">{problem.stakes}</p>
        </BandSection>

        <BandSection>
          <p className="meta-label text-[#F05A28]/90">What the fix looks like</p>
          <div className="tech-divider my-4 max-w-md" />
          <p className="max-w-3xl text-lg leading-8 text-[#F5F4F0]/72">{problem.whatTheFixLooksLike}</p>
          {primaryService ? (
            <p className="mt-6">
              <Link
                href={`/services/${primaryService.slug}`}
                className="text-[#F05A28] underline-offset-4 hover:underline"
              >
                See the {primaryService.title} service overview →
              </Link>
            </p>
          ) : null}
        </BandSection>
      </div>

      {proofAnglesForProblem.length || relatedProof.length ? (
        <div className="mt-14 space-y-10">
          <ProblemProofAngles angles={proofAnglesForProblem} parentTitles={parentProofTitles} />
          {relatedProof.length ? (
            <div>
              <p className="meta-label text-[#F05A28]/90">Relevant proof</p>
              <div className="tech-divider my-4 max-w-md" />
              <div className="mt-4">
                <ProofGrid caseStudies={relatedProof} />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-14">
        <p className="meta-label-accent">Relevant tools</p>
        <div className="tech-divider my-4 max-w-md" />
        <ul className="mt-2 flex flex-col gap-3">
          {problem.relevantTools.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="text-lg text-[#F05A28] underline-offset-4 transition-colors hover:text-[#ff6d40] hover:underline"
              >
                {tool.label} →
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-14">
        <p className="meta-label text-[#F05A28]/90">Problems I solve</p>
        <div className="tech-divider my-4 max-w-md" />
        <div className="mt-2">
          <ProblemNav problems={problemPages} activeProblem={problem.slug} />
        </div>
      </div>

      <div className="mt-14">
        <ProblemClosingSection closingBlock={problem.closingBlock} />
      </div>
    </SiteShell>
  );
}

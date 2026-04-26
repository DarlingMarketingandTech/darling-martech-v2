import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { SiteShell } from "@/components/layout/site-shell";
import { ProblemClosingSection } from "@/components/problems/ProblemClosingSection";
import { ProblemCostDimensionsPanel } from "@/components/problems/ProblemCostDimensionsPanel";
import { ProblemJumpNav } from "@/components/problems/ProblemJumpNav";
import { ProblemPageAmbient } from "@/components/problems/ProblemPageAmbient";
import { ProblemNav } from "@/components/problems/ProblemNav";
import { ProblemProofAngles } from "@/components/problems/ProblemProofAngles";
import { NextBestStepModule } from "@/components/problems/NextBestStepModule";
import { SymptomList } from "@/components/problems/SymptomList";
import { ProofGrid } from "@/components/proof/ProofGrid";
import { PageHero } from "@/components/hero/PageHero";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { SectionReveal } from "@/components/ui/section-reveal";
import { problemPages } from "@/data/problems";
import { PROBLEM_SYSTEM_MAPS } from "@/data/system-maps";
import { SystemMap } from "@/components/shared/SystemMap";
import { getProofAnglesForProblem } from "@/data/proof-angles";
import { getNewsroomArticlesByProblemSlug } from "@/data/newsroom";
import { NewsroomRelatedStrip } from "@/components/newsroom/NewsroomRelatedStrip";
import { caseStudies } from "@/data/work/work-index";
import { getProblemBuyerState } from "@/lib/buyer-state";
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
    type: "article",
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

  const firstTool = problem.relevantTools[0];
  const firstProof = relatedProof[0];
  const buyerState = getProblemBuyerState(problem.slug);
  const heroCtas = [
    ...(firstTool
      ? [{ label: `Diagnose this problem: ${firstTool.label} →`, href: firstTool.href, variant: "primary" as const }]
      : [{ label: "Diagnose this problem: browse diagnostics →", href: "/tools", variant: "primary" as const }]),
    ...(firstProof
      ? [{ label: "See related proof →", href: `/proof/${firstProof.slug}`, variant: "secondary" as const }]
      : primaryService
        ? [{ label: "See service direction →", href: `/services/${primaryService.slug}`, variant: "secondary" as const }]
        : []),
  ];

  const hasProofBlock = proofAnglesForProblem.length > 0 || relatedProof.length > 0;

  const proofConnectLead = `These outcomes map to the same operating break as "${problem.title}" — read them as validation that this class of fix holds in production, not as unrelated portfolio filler.`;

  const newsroomForProblem = getNewsroomArticlesByProblemSlug(problem.slug);
  const systemMap = PROBLEM_SYSTEM_MAPS[problem.slug];

  return (
    <SiteShell>
      <div className="relative isolate">
        <ProblemPageAmbient imagePublicId={problem.imagePublicId} />
        <div className="relative z-10">
          <div className="mt-6 sm:mt-8">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5F4F0]/42">On this page</p>
            <ProblemJumpNav />
          </div>

          <SectionReveal delay={0.04} motion="fade">
            <div className="mt-8 sm:mt-10">
              <PageHero
                readableMeasure
                eyebrow={problem.pageEyebrow}
                headline={problem.heroHeadline}
                body={problem.introParagraphs}
                ctas={heroCtas}
                splitAside={
                  problem.imagePublicId ? (
                    <div className="relative overflow-hidden rounded-2xl border border-[#F5F4F0]/10 bg-[#13131A]/45 shadow-[0_28px_90px_rgba(0,0,0,0.38)] sm:rounded-3xl">
                      <CloudinaryImage
                        publicId={problem.imagePublicId}
                        alt={problem.imageAlt ?? problem.title}
                        width={1024}
                        height={1024}
                        priority
                        postTransforms="e_sharpen"
                        cloudinaryQuality="auto"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 480px"
                        className="aspect-4/3 w-full object-cover sm:aspect-auto sm:min-h-[280px] sm:max-h-[min(52vh,420px)] lg:min-h-[340px]"
                      />
                    </div>
                  ) : undefined
                }
              />
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08} motion="fade">
            <div className="mt-12 sm:mt-14">
              <SymptomList id="symptoms" symptoms={problem.symptoms} />
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1} motion="fade">
            <section id="cost" className="mt-12 scroll-mt-28 sm:mt-14">
              <ProblemCostDimensionsPanel stakes={problem.stakes} dimensions={problem.costDimensions} />
            </section>
          </SectionReveal>

          <SectionReveal delay={0.12} motion="fade">
            <section id="system-breakdown" className="mt-12 scroll-mt-28 sm:mt-14">
              <div className="surface-band grain-mask rounded-3xl border border-[#F5F4F0]/8 p-6 sm:rounded-4xl sm:p-8">
                <p className="meta-label text-[#F05A28]/92">System breakdown</p>
                <h2 className="font-display mt-2 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-3xl">
                  What is actually breaking — not the surface symptoms.
                </h2>
                <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-[#F5F4F0]/88 sm:text-lg sm:leading-9">
                  {problem.systemFailureCore}
                </p>
                <div className="mt-8 border-t border-[#F5F4F0]/10 pt-8">
                  <p className="meta-label text-[#F5F4F0]/45">Why it persists</p>
                  <p className="mt-3 max-w-3xl text-[0.9375rem] leading-7 text-[#F5F4F0]/72 sm:text-base sm:leading-8">
                    {problem.whyItHappens}
                  </p>
                </div>
              </div>
            </section>
          </SectionReveal>

          <SectionReveal delay={0.14} motion="fade">
            <section id="system-fix" className="mt-12 scroll-mt-28 sm:mt-14">
              <div className="rounded-3xl border border-[#0FD9C8]/20 bg-[#13131A]/45 p-6 sm:rounded-4xl sm:p-8">
                <p className="meta-label text-[#0FD9C8]">What changes when it is fixed</p>
                <h2 className="font-display mt-2 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-3xl">
                  One connected operating layer replaces isolated heroics.
                </h2>
                <p className="mt-4 max-w-3xl text-[0.9375rem] leading-7 text-[#F5F4F0]/74 sm:text-base sm:leading-8">
                  {problem.whatTheFixLooksLike}
                </p>
                {primaryService ? (
                  <p className="mt-5">
                    <Link
                      href={`/services/${primaryService.slug}`}
                      className="text-sm font-medium text-[#F05A28] underline-offset-4 hover:underline"
                    >
                      See how {primaryService.title} is structured →
                    </Link>
                  </p>
                ) : null}
              </div>
            </section>
          </SectionReveal>

          {systemMap ? (
            <SectionReveal delay={0.15} motion="fade" className="mt-12 scroll-mt-28 sm:mt-14">
              <SystemMap id="system-map" {...systemMap} />
            </SectionReveal>
          ) : null}

          {hasProofBlock ? (
            <SectionReveal delay={0.16} motion="fade">
              <section id="proof" className="mt-14 scroll-mt-28 space-y-10 sm:mt-16">
                <ProblemProofAngles
                  angles={proofAnglesForProblem}
                  parentTitles={parentProofTitles}
                  connectLead={proofConnectLead}
                />
                {relatedProof.length ? (
                  <div>
                    <p className="meta-label text-[#F05A28]/90">Proof that validates the fix</p>
                    <div className="tech-divider my-4 max-w-md" />
                    <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/68">
                      Same operating pattern, documented outcomes — use these cases to pressure-test whether the system-level approach matches what you need before committing to a build.
                    </p>
                    <ProofGrid caseStudies={relatedProof} />
                  </div>
                ) : null}
              </section>
            </SectionReveal>
          ) : null}

          <SectionReveal delay={0.18} motion="fade">
            <section id="tools" className="mt-14 scroll-mt-28 sm:mt-16">
              <p className="meta-label text-[#F05A28]/90">Diagnostics</p>
              <div className="tech-divider my-4 max-w-md" />
              <p className="max-w-prose text-sm leading-relaxed text-[#F5F4F0]/62">
                Practical checks tied to this problem. Each opens a focused tool — not a sales narrative.
              </p>
              <ul className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {problem.relevantTools.map((tool) => (
                  <li key={tool.href} className="sm:min-w-0">
                    <Link
                      href={tool.href}
                      className="flex min-h-11 items-center justify-center rounded-full border border-[#F5F4F0]/12 bg-[#13131A]/35 px-5 py-3 text-center text-sm font-medium text-[#F5F4F0]/82 transition-colors hover:border-[#F05A28]/45 hover:text-[#F05A28] sm:inline-flex sm:justify-start"
                    >
                      {tool.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </SectionReveal>

          {primaryService ? (
            <SectionReveal delay={0.2} motion="fade">
              <div className="mt-14 sm:mt-16">
                <NextBestStepModule
                  buyerState={buyerState}
                  tool={firstTool ?? { href: "/tools", label: "Browse diagnostics" }}
                  proof={{
                    href: firstProof ? `/proof/${firstProof.slug}` : "/proof",
                    label: firstProof ? firstProof.title : "Browse proof index",
                  }}
                  service={{ href: `/services/${primaryService.slug}`, label: primaryService.title }}
                />
              </div>
            </SectionReveal>
          ) : null}

          <SectionReveal delay={0.22} motion="fade">
            <section id="explore" className="mt-14 scroll-mt-28 sm:mt-16">
              <p className="meta-label text-[#F05A28]/90">Explore other problems</p>
              <div className="tech-divider my-4 max-w-md" />
              <p className="mb-4 max-w-prose text-sm text-[#F5F4F0]/55">
                Most teams hit more than one of these at once — jump to another constraint when you are ready.
              </p>
              <ProblemNav problems={problemPages} activeProblem={problem.slug} />
            </section>
          </SectionReveal>

          {newsroomForProblem.length > 0 ? (
            <SectionReveal delay={0.23} motion="fade">
              <div className="mt-14 max-w-3xl sm:mt-16">
                <NewsroomRelatedStrip articles={newsroomForProblem} eyebrow="From the newsroom" />
              </div>
            </SectionReveal>
          ) : null}

          <SectionReveal delay={0.24} motion="fade">
            <div className="mt-14 sm:mt-16">
              <ProblemClosingSection closingBlock={problem.closingBlock} />
            </div>
          </SectionReveal>
        </div>
      </div>
    </SiteShell>
  );
}

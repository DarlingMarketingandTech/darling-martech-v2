import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { SiteShell } from "@/components/layout/site-shell";
import { ProblemClosingSection } from "@/components/problems/ProblemClosingSection";
import { ProblemJumpNav } from "@/components/problems/ProblemJumpNav";
import { ProblemPageAmbient } from "@/components/problems/ProblemPageAmbient";
import { ProblemNav } from "@/components/problems/ProblemNav";
import { ProblemProofAngles } from "@/components/problems/ProblemProofAngles";
import { SymptomList } from "@/components/problems/SymptomList";
import { ProofGrid } from "@/components/proof/ProofGrid";
import { PageHero } from "@/components/hero/PageHero";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
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

  const firstTool = problem.relevantTools[0];
  const heroCtas = [
    ...(primaryService
      ? [
          {
            label: `How we address this →`,
            href: `/services/${primaryService.slug}`,
            variant: "primary" as const,
          },
        ]
      : []),
    ...(firstTool
      ? [{ label: `${firstTool.label} →`, href: firstTool.href, variant: "secondary" as const }]
      : [{ label: "Browse diagnostics →", href: "/tools", variant: "secondary" as const }]),
  ];

  const hasProofBlock = proofAnglesForProblem.length > 0 || relatedProof.length > 0;

  return (
    <SiteShell>
      <div className="relative isolate">
        <ProblemPageAmbient imagePublicId={problem.imagePublicId} />
        <div className="relative z-10">
          <div className="mt-6 sm:mt-8">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5F4F0]/42">On this page</p>
            <ProblemJumpNav />
          </div>

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
                      className="aspect-[4/3] w-full object-cover sm:aspect-auto sm:min-h-[280px] sm:max-h-[min(52vh,420px)] lg:min-h-[340px]"
                    />
                  </div>
                ) : undefined
              }
            />
          </div>

          <div className="mt-12 sm:mt-14">
            <SymptomList id="symptoms" symptoms={problem.symptoms} />
          </div>

          <section id="understanding" className="mt-12 scroll-mt-28 sm:mt-14">
            <details className="group surface-band grain-mask rounded-3xl border border-[#F5F4F0]/8 open:shadow-[0_20px_70px_rgba(0,0,0,0.25)] sm:rounded-4xl">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-3xl p-6 pr-5 transition-colors hover:bg-[#F5F4F0]/[0.03] sm:rounded-4xl sm:p-8 sm:pr-7 [&::-webkit-details-marker]:hidden">
                <div>
                  <p className="meta-label-accent">Go deeper</p>
                  <h2 className="font-display mt-2 max-w-xl text-balance text-lg font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-xl">
                    Why this happens, what it costs, and what “fixed” looks like
                  </h2>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-[#F5F4F0]/52">
                    Optional read — open when you want the full diagnosis, not just the headline.
                  </p>
                </div>
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#F5F4F0]/12 text-[#F05A28] transition-transform duration-300 group-open:rotate-180"
                  aria-hidden
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-current" aria-hidden>
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-[#F5F4F0]/8 px-6 pb-8 pt-2 sm:px-8 sm:pb-10">
                <div className="space-y-10 pt-6">
                  <div>
                    <h3 className="meta-label-accent">Why it happens</h3>
                    <p className="mt-4 max-w-prose text-[0.9375rem] leading-7 text-[#F5F4F0]/74 sm:text-base sm:leading-8">
                      {problem.whyItHappens}
                    </p>
                  </div>
                  <div>
                    <p className="meta-label text-[#F05A28]/90">What it costs</p>
                    <p className="mt-4 max-w-prose text-[0.9375rem] leading-7 text-[#F5F4F0]/74 sm:text-base sm:leading-8">
                      {problem.stakes}
                    </p>
                  </div>
                  <div>
                    <p className="meta-label text-[#F05A28]/90">What the fix looks like</p>
                    <p className="mt-4 max-w-prose text-[0.9375rem] leading-7 text-[#F5F4F0]/74 sm:text-base sm:leading-8">
                      {problem.whatTheFixLooksLike}
                    </p>
                    {primaryService ? (
                      <p className="mt-5">
                        <Link
                          href={`/services/${primaryService.slug}`}
                          className="text-sm font-medium text-[#F05A28] underline-offset-4 hover:underline"
                        >
                          {primaryService.title} — service overview →
                        </Link>
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </details>
          </section>

          {hasProofBlock ? (
            <section id="proof" className="mt-14 scroll-mt-28 space-y-10 sm:mt-16">
              <ProblemProofAngles angles={proofAnglesForProblem} parentTitles={parentProofTitles} />
              {relatedProof.length ? (
                <div>
                  <p className="meta-label text-[#F05A28]/90">Relevant proof</p>
                  <div className="tech-divider my-4 max-w-md" />
                  <p className="mb-4 max-w-prose text-sm text-[#F5F4F0]/55">
                    Case studies where this constraint showed up in the work — metrics and implementation detail on each page.
                  </p>
                  <ProofGrid caseStudies={relatedProof} />
                </div>
              ) : null}
            </section>
          ) : null}

          <section id="tools" className="mt-14 scroll-mt-28 sm:mt-16">
            <p className="meta-label text-[#F05A28]/90">Diagnostics</p>
            <div className="tech-divider my-4 max-w-md" />
            <p className="max-w-prose text-sm leading-relaxed text-[#F5F4F0]/58">
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

          <section id="explore" className="mt-14 scroll-mt-28 sm:mt-16">
            <p className="meta-label text-[#F05A28]/90">Explore other problems</p>
            <div className="tech-divider my-4 max-w-md" />
            <p className="mb-4 max-w-prose text-sm text-[#F5F4F0]/55">
              Most teams hit more than one of these at once — jump to another constraint when you are ready.
            </p>
            <ProblemNav problems={problemPages} activeProblem={problem.slug} />
          </section>

          <div className="mt-14 sm:mt-16">
            <ProblemClosingSection closingBlock={problem.closingBlock} />
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

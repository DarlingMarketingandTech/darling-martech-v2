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
import { NextBestStepModule } from "@/components/problems/NextBestStepModule";
import { SymptomList } from "@/components/problems/SymptomList";
import { ProofGrid } from "@/components/proof/ProofGrid";
import { PageHero } from "@/components/hero/PageHero";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { problemPages } from "@/data/problems";
import { getProofAnglesForProblem } from "@/data/proof-angles";
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
                      className="aspect-4/3 w-full object-cover sm:aspect-auto sm:min-h-[280px] sm:max-h-[min(52vh,420px)] lg:min-h-[340px]"
                    />
                  </div>
                ) : undefined
              }
            />
          </div>

          <div className="mt-12 sm:mt-14">
            <SymptomList id="symptoms" symptoms={problem.symptoms} />
          </div>

          <section id="cost" className="mt-12 scroll-mt-28 sm:mt-14">
            <div className="rounded-3xl border border-[#F05A28]/26 bg-gradient-to-b from-[#F05A28]/8 to-[#13131A]/65 p-6 sm:rounded-4xl sm:p-8">
              <p className="meta-label text-[#F05A28]">What this actually costs</p>
              <h2 className="font-display mt-3 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-3xl">
                Quiet system leaks become expensive fast.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#F5F4F0]/78 sm:text-[0.9375rem]">
                {problem.stakes}
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-[#F5F4F0]/84 sm:grid-cols-2">
                <li className="rounded-2xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/35 px-4 py-3">Lost leads that never enter follow-up.</li>
                <li className="rounded-2xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/35 px-4 py-3">Wasted spend in channels you cannot validate.</li>
                <li className="rounded-2xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/35 px-4 py-3">Missed opportunities while competitors look clearer.</li>
                <li className="rounded-2xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/35 px-4 py-3">Operational drag from manual work and guesswork.</li>
              </ul>
            </div>
          </section>

          <section id="system-breakdown" className="mt-12 scroll-mt-28 sm:mt-14">
            <div className="surface-band grain-mask rounded-3xl border border-[#F5F4F0]/8 p-6 sm:rounded-4xl sm:p-8">
              <p className="meta-label text-[#F05A28]/92">System breakdown</p>
              <h2 className="font-display mt-2 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-3xl">
                Surface fixes feel productive, but the system remains broken.
              </h2>
              <p className="mt-4 max-w-3xl text-[0.9375rem] leading-7 text-[#F5F4F0]/74 sm:text-base sm:leading-8">
                {problem.whyItHappens}
              </p>
            </div>
          </section>

          <section id="system-fix" className="mt-12 scroll-mt-28 sm:mt-14">
            <div className="rounded-3xl border border-[#0FD9C8]/20 bg-[#13131A]/45 p-6 sm:rounded-4xl sm:p-8">
              <p className="meta-label text-[#0FD9C8]">System fix</p>
              <h2 className="font-display mt-2 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-3xl">
                Replace isolated fixes with one connected operating layer.
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

          {hasProofBlock ? (
            <section id="proof" className="mt-14 scroll-mt-28 space-y-10 sm:mt-16">
              <ProblemProofAngles angles={proofAnglesForProblem} parentTitles={parentProofTitles} />
              {relatedProof.length ? (
                <div>
                  <p className="meta-label text-[#F05A28]/90">Proof bridge</p>
                  <div className="tech-divider my-4 max-w-md" />
                  <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/60">
                    This worked for teams with this same pattern. Use the proof below to validate that the system-level fix can work in a real operating environment like yours.
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

          {primaryService ? (
            <div className="mt-14 sm:mt-16">
              <NextBestStepModule
                buyerState={buyerState}
                tool={firstTool ?? { href: "/tools", label: "Browse diagnostics" }}
                proof={{
                  href: firstProof ? `/proof/${firstProof.slug}` : "/proof",
                  label: firstProof ? firstProof.title : "See related proof",
                }}
                service={{ href: `/services/${primaryService.slug}`, label: primaryService.title }}
              />
            </div>
          ) : null}

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

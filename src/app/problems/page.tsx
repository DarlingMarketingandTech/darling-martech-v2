import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/hero/PageHero";
import { DiagnosticOrangeBand } from "@/components/home/DiagnosticOrangeBand";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { problemPages } from "@/data/problems";
import { caseStudies } from "@/data/work/work-index";
import { routeMetadata } from "@/data/routes";
import { problemHubMetaLabel } from "@/lib/problem-hub-label";
import { buildMetadata } from "@/lib/metadata";
import type { ProblemPage } from "@/types";

export const metadata = buildMetadata(routeMetadata["/problems"]);

const QUIZ_HREF = "/tools/growth-bottleneck-quiz";

function getCaseStudyForProblem(problem: ProblemPage) {
  const firstSlug = problem.relatedProof[0];
  if (!firstSlug) return undefined;
  return caseStudies.find((study) => study.slug === firstSlug);
}

function getRecommendedTool(problem: ProblemPage) {
  const pick =
    problem.relevantTools.find((t) => !t.href.includes(QUIZ_HREF)) ?? problem.relevantTools[0];
  return pick ?? { label: "Growth Bottleneck Quiz", href: QUIZ_HREF };
}

function ProblemsHubCard({ problem }: { problem: ProblemPage }) {
  const study = getCaseStudyForProblem(problem);
  const tool = getRecommendedTool(problem);

  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="panel-obsidian panel-interactive grain-mask group flex h-full flex-col rounded-4xl border-l-4 border-l-transparent p-6 transition-colors hover:border-l-[#F05A28] md:p-7"
    >
      <p className="meta-label text-[#F05A28]/90">{problemHubMetaLabel(problem.slug)}</p>
      <h2 className="font-display mt-5 text-balance text-xl font-semibold leading-snug tracking-[-0.02em] text-[#F5F4F0] md:text-2xl">
        {problem.heroHeadline}
      </h2>
      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-[#F5F4F0]/65 md:text-base">
        {problem.heroSubhead}
      </p>

      {study ? (
        <div className="card-elevated-dark mt-6 rounded-2xl border border-[#0FD9C8]/28 px-4 py-4">
          <p className="font-mono text-2xl font-bold tabular-nums tracking-tight text-[#0FD9C8] md:text-[1.65rem]">
            {study.primaryMetric.value}
          </p>
          <p className="meta-label mt-2 max-w-none text-[#F5F4F0]/50">{study.primaryMetric.label}</p>
        </div>
      ) : (
        <div className="card-elevated-dark mt-6 rounded-2xl border border-[#0FD9C8]/22 px-4 py-4">
          <p className="text-sm leading-relaxed text-[#F5F4F0]/62">{problem.proofChip}</p>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-3 border-t border-[#F5F4F0]/10 pt-6">
        <div>
          <p className="meta-label">Recommended tool</p>
          <p className="mt-2 text-sm font-medium text-[#F5F4F0]">{tool.label}</p>
        </div>
        <span className="text-sm font-medium text-[#F05A28]">See this problem →</span>
      </div>
    </Link>
  );
}

export default function ProblemsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Find your problem first"
        headline="Most growth problems are fixable. The ones that aren't named aren't."
        body="This page exists for one reason: to help you name the specific thing holding your growth back — before you decide what to do about it."
        ctas={[
          {
            label: "Not sure which one is yours? Take the 3-minute diagnostic →",
            href: QUIZ_HREF,
            variant: "primary",
          },
        ]}
      />

      <p className="mt-10 max-w-3xl text-center text-sm leading-relaxed text-[#F5F4F0]/55 md:mx-auto">
        These are the six most common patterns I find when I start working with a new client. One of them is
        probably yours.
      </p>

      <div className="mt-10 rounded-3xl border border-[#F5F4F0]/[0.07] bg-[#13131A]/30 p-4 md:p-5">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {problemPages.map((problem, index) => (
            <AnimateOnScroll key={problem.slug} delay={index * 0.05} variant="fade">
              <ProblemsHubCard problem={problem} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <DiagnosticOrangeBand
          headline="Still not sure which one is your bottleneck?"
          body="Five questions. About three minutes. A specific answer — not a generic recommendation. No email required to see results."
          cta={{ label: "Take the Growth Bottleneck Quiz →", href: QUIZ_HREF }}
        />
      </div>

      <section className="mt-16 text-center md:mt-20">
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#F5F4F0]/55">
          If you already know the problem and you&apos;re ready to talk about fixing it, skip the diagnostic.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href="/contact" variant="ghost" size="lg">
            Start a conversation →
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}

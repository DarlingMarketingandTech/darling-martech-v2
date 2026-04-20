import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/hero/PageHero";
import { DiagnosticOrangeBand } from "@/components/home/DiagnosticOrangeBand";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { problemPages } from "@/data/problems";
import { caseStudies } from "@/data/work/work-index";
import { services } from "@/data/services";
import { routeMetadata } from "@/data/routes";
import { problemHubMetaLabel } from "@/lib/problem-hub-label";
import { buildMetadata } from "@/lib/metadata";
import type { ProblemPage } from "@/types";

export const metadata = buildMetadata(routeMetadata["/problems"]);

const QUIZ_HREF = "/tools/growth-bottleneck-quiz";
const FOUNDATION_HREF = "/services/technical-roadmap";

const PROBLEM_BUYER_FIT: Record<ProblemPage["slug"], "broken" | "missing" | "both"> = {
  "no-strategy-owner": "broken",
  "site-not-converting": "both",
  "disconnected-systems": "both",
  "not-visible-enough": "both",
  "brand-system-broken": "both",
  "pipeline-not-predictable": "broken",
};

const FIT_LABEL: Record<(typeof PROBLEM_BUYER_FIT)[ProblemPage["slug"]], string> = {
  broken: "Best fit: broken systems",
  missing: "Best fit: missing systems",
  both: "Best fit: both states",
};

function getCaseStudyForProblem(problem: ProblemPage) {
  const firstSlug = problem.relatedProof[0];
  if (!firstSlug) return undefined;
  return caseStudies.find((study) => study.slug === firstSlug);
}

function getServiceForProblem(problem: ProblemPage) {
  return services.find((service) => service.slug === problem.relatedService);
}

function getRecommendedTool(problem: ProblemPage) {
  const pick =
    problem.relevantTools.find((t) => !t.href.includes(QUIZ_HREF)) ?? problem.relevantTools[0];
  return pick ?? { label: "Growth Bottleneck Quiz", href: QUIZ_HREF };
}

function ProblemsHubCard({ problem }: { problem: ProblemPage }) {
  const study = getCaseStudyForProblem(problem);
  const service = getServiceForProblem(problem);
  const tool = getRecommendedTool(problem);
  const fit = PROBLEM_BUYER_FIT[problem.slug];

  return (
    <article className="panel-obsidian panel-interactive grain-mask group flex h-full flex-col rounded-4xl border-l-4 border-l-transparent p-6 transition-colors hover:border-l-[#F05A28] md:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <p className="meta-label text-[#F05A28]/90">{problemHubMetaLabel(problem.slug)}</p>
        <span className="rounded-full border border-[#F5F4F0]/18 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-[#F5F4F0]/74">
          {FIT_LABEL[fit]}
        </span>
      </div>
      <h2 className="font-display mt-5 text-balance text-xl font-semibold leading-snug tracking-[-0.02em] text-[#F5F4F0] md:text-2xl">
        {problem.title}
      </h2>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#F5F4F0]/65 md:text-base">
        {problem.heroSubhead}
      </p>

      <div className="mt-4 rounded-2xl border border-[#F5F4F0]/10 bg-[#13131A]/32 px-4 py-3">
        <p className="meta-label">Common signal</p>
        <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/76">{problem.symptoms[0]}</p>
      </div>

      {study ? (
        <div className="card-elevated-dark mt-4 rounded-2xl border border-[#0FD9C8]/28 px-4 py-4">
          <p className="font-mono text-2xl font-bold tabular-nums tracking-tight text-[#0FD9C8] md:text-[1.65rem]">
            {study.primaryMetric.value}
          </p>
          <p className="meta-label mt-2 max-w-none text-[#F5F4F0]/50">{study.primaryMetric.label}</p>
        </div>
      ) : (
        <div className="card-elevated-dark mt-4 rounded-2xl border border-[#0FD9C8]/22 px-4 py-4">
          <p className="text-sm leading-relaxed text-[#F5F4F0]/62">{problem.proofChip}</p>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-4 border-t border-[#F5F4F0]/10 pt-6">
        <div>
          <p className="meta-label">Diagnose</p>
          <Link href={tool.href} className="mt-2 inline-flex text-sm font-medium text-[#F5F4F0] hover:text-[#F05A28]">
            {tool.label} →
          </Link>
        </div>

        {study ? (
          <div>
            <p className="meta-label">Learn</p>
            <Link href={`/proof/${study.slug}`} className="mt-2 inline-flex text-sm font-medium text-[#F5F4F0] hover:text-[#F05A28]">
              See related proof →
            </Link>
          </div>
        ) : null}

        {service ? (
          <div>
            <p className="meta-label">Evaluate</p>
            <Link
              href={`/services/${service.slug}`}
              className="mt-2 inline-flex text-sm font-medium text-[#F5F4F0] hover:text-[#F05A28]"
            >
              {service.title} →
            </Link>
          </div>
        ) : null}

        <Link href={`/problems/${problem.slug}`} className="text-sm font-medium text-[#F05A28]">
          Open full diagnosis →
        </Link>
      </div>
    </article>
  );
}

export default function ProblemsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Find your problem first"
        headline="This page is a diagnosis map, not a service menu."
        body="Use this to identify what kind of system problem you have, then move into the right next path: tool, proof, service direction, or conversation."
        ctas={[
          {
            label: "Not sure which one is yours? Take the 3-minute diagnostic →",
            href: QUIZ_HREF,
            variant: "primary",
          },
          {
            label: "Know your issue already? See service directions →",
            href: "/services",
            variant: "secondary",
          },
        ]}
      />

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl border border-[#F05A28]/30 bg-[#13131A]/45 p-5 md:p-6">
          <p className="meta-label text-[#F05A28]">Path A — broken-system buyer</p>
          <h2 className="font-display mt-3 text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0]">
            You have tools and process, but they are fragmented.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#F5F4F0]/66">
            Start by diagnosing where handoffs, reporting trust, or conversion performance break down.
          </p>
          <Link href={QUIZ_HREF} className="mt-4 inline-flex text-sm font-medium text-[#F05A28]">
            Diagnose what is broken →
          </Link>
        </article>

        <article className="rounded-3xl border border-[#F5F4F0]/14 bg-[#13131A]/35 p-5 md:p-6">
          <p className="meta-label text-[#0FD9C8]">Path B — missing-system buyer</p>
          <h2 className="font-display mt-3 text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0]">
            You do not have a real operating system yet.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#F5F4F0]/66">
            Start by mapping what is missing across capture, follow-up, conversion, and visibility.
          </p>
          <Link href={FOUNDATION_HREF} className="mt-4 inline-flex text-sm font-medium text-[#0FD9C8]">
            See foundation path options →
          </Link>
        </article>
      </section>

      <p className="mt-8 max-w-3xl text-center text-sm leading-relaxed text-[#F5F4F0]/55 md:mx-auto">
        These are the six patterns most often holding growth back. Pick the one that sounds closest, then follow
        Diagnose → Learn → Evaluate inside that card.
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
          If you already know the constraint and want to pressure-test the fix path, skip the quiz and start a direct
          conversation.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href="/contact" variant="ghost" size="lg">
            Start the diagnostic conversation →
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}

import Link from "next/link";
import type { CaseStudy, ProblemCluster, ProblemCostDimensions } from "@/types";
import type { ProblemReportStackTool } from "@/data/taxonomy-db";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site-config";
import { firstTwoSentences, resolvePostFixAssertion } from "@/lib/report-copy";
import { ReportExecutionPathGated } from "@/components/report/ReportExecutionPathGated";
import { ReportSavePanel } from "@/components/report/ReportSavePanel";
import { ReportTopologyFocus } from "@/components/report/ReportTopologyFocus";
import type { ReportExecutionLinks, ReportServiceBrief } from "@/components/report/report-types";

export type { ReportExecutionLinks, ReportServiceBrief } from "@/components/report/report-types";

const ACCENT_BY_CLUSTER: Record<ProblemCluster, string> = {
  "no-strategy-owner": "#F05A28",
  "site-not-converting": "#F05A28",
  "disconnected-systems": "#0FD9C8",
  "not-visible-enough": "#0FD9C8",
  "brand-system-broken": "#F05A28",
  "pipeline-not-predictable": "#0FD9C8",
};

export type SystemTeardownReportDashboardProps = {
  reportId: string;
  problemSlug: string;
  problemCluster: ProblemCluster;
  problemTitle: string;
  problemEyebrow: string;
  problemHeadline: string;
  problemSubhead: string;
  systemFailureCore: string;
  whatTheFixLooksLike: string;
  whyItHappens: string;
  stakes: string;
  costDimensions: ProblemCostDimensions;
  symptoms: string[];
  submittedAt: string;
  caseStudies: CaseStudy[];
  stackTools: ProblemReportStackTool[];
  evidenceSource: "taxonomy" | "fallback";
  servicesForSystem: ReportServiceBrief[];
  primaryServiceSlug: string;
  executionLinks: ReportExecutionLinks;
};

function formatReportDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const COST_ROWS: Array<{ key: keyof ProblemCostDimensions; label: string }> = [
  { key: "lostRevenue", label: "Revenue" },
  { key: "missedLeads", label: "Pipeline" },
  { key: "operationalDrag", label: "Operations" },
  { key: "strategicConfusion", label: "Strategy" },
];

export function SystemTeardownReportDashboard({
  reportId,
  problemSlug,
  problemCluster,
  problemTitle,
  problemEyebrow,
  problemHeadline,
  problemSubhead,
  systemFailureCore,
  whatTheFixLooksLike,
  whyItHappens,
  stakes,
  costDimensions,
  symptoms,
  submittedAt,
  caseStudies,
  stackTools,
  evidenceSource,
  servicesForSystem,
  primaryServiceSlug,
  executionLinks,
}: SystemTeardownReportDashboardProps) {
  const accent = ACCENT_BY_CLUSTER[problemCluster] ?? "#F05A28";
  const persistenceShort = firstTwoSentences(whyItHappens);

  const proofIntro =
    caseStudies.length > 0
      ? "Each case below is tied to this problem class in the taxonomy. It exists to show the same break resolved in production — not unrelated portfolio wins."
      : "When proof is linked to this problem in Supabase, it will appear here as direct validation of the break below.";

  return (
    <div className="w-full space-y-16 sm:space-y-20 md:space-y-24">
      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <header className="relative">
        <div
          className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full opacity-[0.1]"
          style={{ background: `radial-gradient(circle, ${accent}, transparent 72%)` }}
          aria-hidden
        />
        <div className="relative">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-[#0FD9C8]">
              System teardown
            </p>
            <div className="rounded-full border border-[#F5F4F0]/10 bg-[#13131A]/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#F5F4F0]/45">
              {evidenceSource === "taxonomy" ? "Live taxonomy" : "Index fallback"} · {formatReportDate(submittedAt)}
            </div>
          </div>

          <h1 className="font-display mt-5 text-balance text-4xl font-semibold tracking-[-0.035em] text-[#F5F4F0] sm:text-5xl sm:leading-[1.06]">
            {problemHeadline}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F5F4F0]/56 sm:text-[1.0625rem]">{problemSubhead}</p>

          <p className="mt-5 max-w-2xl border-l-2 border-[#F05A28]/45 pl-4 text-sm leading-relaxed text-[#F5F4F0]/62 sm:pl-5 sm:text-base">
            <span className="font-medium text-[#F5F4F0]/90">Not a template.</span> Your completion mapped to one
            taxonomy problem, then hydrated with the same junction edges we use internally (
            <span className="font-mono text-[#F5F4F0]/70">problem_tools</span>,{" "}
            <span className="font-mono text-[#F5F4F0]/70">proof_problems</span>).
          </p>
        </div>

        <div className="relative mt-14 grid gap-10 border-t border-[#F5F4F0]/7 pt-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F05A28]/85">Defined break</p>
            <p className="font-display mt-3 text-balance text-2xl font-medium leading-snug text-[#F5F4F0] sm:text-3xl sm:leading-tight">
              {systemFailureCore}
            </p>
          </div>
          <aside className="rounded-2xl border border-[#F5F4F0]/8 bg-[#13131A]/30 p-6 sm:p-7 lg:col-span-5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F5F4F0]/38">Signals</p>
            <ul className="mt-3 space-y-2.5">
              {symptoms.slice(0, 4).map((line) => (
                <li key={line} className="flex gap-2.5 text-sm leading-snug text-[#F5F4F0]/68">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#0FD9C8]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-[#F5F4F0]/8 pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5F4F0]/36">Why it persists</p>
              <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/55">{persistenceShort}</p>
              <p className="mt-3">
                <Link href={`/problems/${problemSlug}`} className="text-xs font-medium text-[#0FD9C8] underline-offset-4 hover:underline">
                  Full problem narrative →
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </header>

      {/* ─── Topology ───────────────────────────────────────────────────── */}
      <section aria-labelledby="topology-heading" className="border-t border-[#F5F4F0]/6 pt-16 sm:pt-20">
        <div className="mb-9 max-w-2xl">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F5F4F0]/38">01 · Topology</p>
          <h2 id="topology-heading" className="font-display mt-2 text-3xl font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-[2rem]">
            How this system connects
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[#F5F4F0]/50 sm:text-base">
            One constraint at the center. Capabilities, diagnostics, and proof attach through explicit edges.
          </p>
        </div>

        <ReportTopologyFocus
          accent={accent}
          problemSlug={problemSlug}
          problemEyebrow={problemEyebrow}
          problemTitle={problemTitle}
          primaryServiceSlug={primaryServiceSlug}
          servicesForSystem={servicesForSystem}
          stackTools={stackTools}
          caseStudies={caseStudies}
        />
      </section>

      {/* ─── Proof validation ─────────────────────────────────────────────── */}
      <section aria-labelledby="proof-heading" className="border-t border-[#F5F4F0]/6 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4 lg:pt-1">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F5F4F0]/36">02 · Proof</p>
            <h2 id="proof-heading" className="font-display mt-2.5 text-balance text-3xl font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-[2rem]">
              Validation, not portfolio
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#F5F4F0]/52">{proofIntro}</p>
            <div className="mt-6 rounded-xl border border-[#F5F4F0]/8 bg-[#0C0C0E]/35 p-4">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F05A28]/75">Same break as your diagnostic</p>
              <p className="mt-2 text-sm leading-snug text-[#F5F4F0]/72">{systemFailureCore}</p>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[#F5F4F0]/45">
              If the headline outcome could have happened without fixing this break, it does not belong in this list.
            </p>
          </div>
          <div className="lg:col-span-8">
            {caseStudies.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#F5F4F0]/10 bg-[#13131A]/20 px-6 py-12 text-center">
                <p className="text-sm text-[#F5F4F0]/48">Junction pending — use the problem hub for narrative.</p>
                <Button href={`/problems/${problemSlug}`} className="mt-5" size="lg" variant="secondary">
                  Open problem hub →
                </Button>
              </div>
            ) : (
              <ul className="space-y-8">
                {caseStudies.map((study) => {
                  const postFix = resolvePostFixAssertion({
                    study,
                    whatTheFixLooksLike,
                    problemTitle,
                    systemFailureCore,
                  });
                  return (
                    <li key={study.slug}>
                      <article className="overflow-hidden rounded-2xl border border-[#F5F4F0]/8 bg-[#13131A]/28">
                        <div className="flex flex-col gap-4 border-b border-[#F5F4F0]/6 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-7">
                          <div>
                            <h3 className="font-display text-xl font-semibold text-[#F5F4F0] sm:text-2xl">{study.outcomeHeadline}</h3>
                            <p className="mt-1 text-sm text-[#F5F4F0]/46">{study.clientName}</p>
                          </div>
                          <Button href={`/proof/${study.slug}`} variant="secondary" size="md">
                            Read case →
                          </Button>
                        </div>
                        <div className="grid gap-0 sm:grid-cols-2">
                          <div className="border-b border-[#F5F4F0]/6 p-6 sm:border-b-0 sm:border-r sm:p-7">
                            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F05A28]/80">Validates this break</p>
                            <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/68">{systemFailureCore}</p>
                          </div>
                          <div className="p-6 sm:p-7">
                            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#0FD9C8]/80">What changes when fixed</p>
                            <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/68">{postFix}</p>
                          </div>
                        </div>
                        <div className="border-t border-[#F5F4F0]/6 px-6 py-5 sm:px-7">
                          <p className="text-sm leading-relaxed text-[#F5F4F0]/54">{study.resultSummary}</p>
                          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#F5F4F0]/38">
                            Routed via <span className="text-[#F5F4F0]/55">proof_problems</span> · {evidenceSource === "taxonomy" ? "live graph" : "static index"} · same problem class as your diagnostic
                          </p>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* ─── System cost ──────────────────────────────────────────────────── */}
      <section
        aria-labelledby="urgency-heading"
        className="rounded-3xl border border-[#F05A28]/12 bg-linear-to-b from-[#18120f]/95 to-[#0C0C0E] px-6 py-10 sm:px-9 sm:py-12"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F05A28]/70">03 · Cost</p>
        <h2 id="urgency-heading" className="font-display mt-2 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-[2rem]">
          If this fault stays in the system
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F5F4F0]/58">{stakes}</p>
        <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[#F5F4F0]/42">
          Operating drag — not slogans. Four dimensions below.
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {COST_ROWS.map(({ key, label }) => (
            <div key={key} className="flex flex-col rounded-2xl border border-[#F5F4F0]/6 bg-[#0C0C0E]/25 px-5 py-5 sm:px-6 sm:py-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F5F4F0]/48">{label}</p>
              <p className="mt-3 text-sm font-normal leading-[1.65] text-[#F5F4F0]/65">{costDimensions[key]}</p>
            </div>
          ))}
        </div>
      </section>

      <ReportExecutionPathGated reportId={reportId} accent={accent} executionLinks={executionLinks} />

      <div className="pt-4 sm:pt-6">
        <ReportSavePanel reportId={reportId} accent={accent} />
      </div>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#F5F4F0]/8 pt-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-md text-xs leading-relaxed text-[#F5F4F0]/42">
            Completion <span className="font-mono text-[#F5F4F0]/55">{submittedAt}</span>.{" "}
            <Link href="/systems" className="text-[#0FD9C8] underline-offset-4 hover:underline">
              Full taxonomy map
            </Link>
            .
          </p>
          <Button href={siteConfig.calComLink} variant="secondary" size="md">
            Book a call →
          </Button>
        </div>
      </footer>
    </div>
  );
}

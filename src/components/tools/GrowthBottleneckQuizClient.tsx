"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { captureClientEvent } from "@/lib/analytics";
import { tools } from "@/data/labs";
import { problemPages } from "@/data/problems";
import { cn } from "@/lib/utils";
import type { ProblemCluster, Tool } from "@/types";

const TOOL_SLUG = "growth-bottleneck-quiz" as const;

function getGrowthBottleneckQuizTool(): Tool {
  const entry = tools.find((t) => t.slug === TOOL_SLUG);
  if (!entry) {
    throw new Error("labs.ts must define the growth-bottleneck-quiz tool.");
  }
  return entry;
}

const growthBottleneckTool = getGrowthBottleneckQuizTool();

/** Clusters surfaced by the five-question vote (each answer maps to one of these). */
type VoteCluster = Extract<
  ProblemCluster,
  "no-strategy-owner" | "site-not-converting" | "disconnected-systems" | "not-visible-enough"
>;

const VOTE_PRIORITY: readonly VoteCluster[] = [
  "no-strategy-owner",
  "site-not-converting",
  "disconnected-systems",
  "not-visible-enough",
] as const;

const QUESTIONS: Array<{
  id: string;
  question: string;
  options: Array<{ label: string; cluster: VoteCluster }>;
}> = [
  {
    id: "q1",
    question: "When leadership asks what marketing must move this quarter, what is closest to the truth?",
    options: [
      {
        label: "We debate priorities every week — there is no single owner for the whole system.",
        cluster: "no-strategy-owner",
      },
      {
        label: "Traffic and activity look fine — the site just does not turn interest into next steps.",
        cluster: "site-not-converting",
      },
      {
        label: "Leads exist, but handoffs, CRM fields, and follow-up still depend on memory and heroics.",
        cluster: "disconnected-systems",
      },
      {
        label: "The offer is strong — qualified buyers simply are not finding us where they search.",
        cluster: "not-visible-enough",
      },
    ],
  },
  {
    id: "q2",
    question: "If you had to fix one layer first, which failure mode sounds most familiar?",
    options: [
      {
        label: "No one can say no — so the roadmap is everything at once and nothing compounds.",
        cluster: "no-strategy-owner",
      },
      {
        label: "The homepage and key pages still read like an internal org chart, not a buyer path.",
        cluster: "site-not-converting",
      },
      {
        label: "Reporting in the room disagrees with reporting in the tools — nobody trusts the pipeline view.",
        cluster: "disconnected-systems",
      },
      {
        label: "Search, maps, and AI-style answers do not reflect how good the business actually is.",
        cluster: "not-visible-enough",
      },
    ],
  },
  {
    id: "q3",
    question: "Where do you lose the most revenue before a conversation even starts?",
    options: [
      {
        label: "Budget and narrative shift with whoever spoke last — spend chases politics, not outcomes.",
        cluster: "no-strategy-owner",
      },
      {
        label: "Warm referrals convert; cold visitors bounce because trust and clarity arrive too late.",
        cluster: "site-not-converting",
      },
      {
        label: "Deals stall in the gap between marketing-qualified and sales-owned — definitions change by channel.",
        cluster: "disconnected-systems",
      },
      {
        label: "Competitors with weaker offers win the click because they show up first and cleaner.",
        cluster: "not-visible-enough",
      },
    ],
  },
  {
    id: "q4",
    question: "Which statement best describes how decisions get made about growth bets?",
    options: [
      {
        label: "We ship tactics without a written strategy — success is defined after the fact.",
        cluster: "no-strategy-owner",
      },
      {
        label: "We debate landing pages and forms while the core story and proof still do not match the buyer.",
        cluster: "site-not-converting",
      },
      {
        label: "Automation exists, but exceptions, spreadsheets, and side channels eat most of the week.",
        cluster: "disconnected-systems",
      },
      {
        label: "We buy demand because organic and local presence never became a durable system.",
        cluster: "not-visible-enough",
      },
    ],
  },
  {
    id: "q5",
    question: "If you paused paid media tomorrow, what would break first?",
    options: [
      {
        label: "Alignment — nobody could defend what to keep because outcomes are not owned end-to-end.",
        cluster: "no-strategy-owner",
      },
      {
        label: "Conversion — inbound would still land on pages that do not earn the click.",
        cluster: "site-not-converting",
      },
      {
        label: "Operations — nurture, SLAs, and CRM hygiene would collapse without manual babysitting.",
        cluster: "disconnected-systems",
      },
      {
        label: "Discovery — there is not enough organic demand to absorb the shock.",
        cluster: "not-visible-enough",
      },
    ],
  },
];

/** Four symptoms per cluster — diagnostic framing aligned with each problem hub. */
const SYMPTOMS_BY_CLUSTER: Record<ProblemCluster, [string, string, string, string]> = {
  "no-strategy-owner": [
    "Priorities reshuffle when leadership rotates attention.",
    "Reporting shows activity before it shows impact.",
    "Channel owners optimize local metrics, not revenue.",
    "Nobody can name the single outcome marketing must move this quarter.",
  ],
  "site-not-converting": [
    "Visitors leave before they understand who the offer is for.",
    "Proof and differentiation sit below the fold or scattered across pages.",
    "Forms and CTAs ask for trust before the story earns it.",
    "The site wins easy leads but loses the high-intent buyer who is still comparing.",
  ],
  "disconnected-systems": [
    "Lead sources write to different fields — attribution is reconstructed by hand.",
    "Follow-up depends on who remembered the Slack thread.",
    "CRM stages do not match how marketing actually qualifies demand.",
    "Tool stacks overlap — nobody owns the integration map.",
  ],
  "not-visible-enough": [
    "Branded and high-intent queries surface competitors first.",
    "Local or vertical presence is inconsistent by market or location.",
    "Structured data, entities, and trust signals lag the quality of the work.",
    "AI-style answers and summaries do not reflect the real positioning.",
  ],
  "brand-system-broken": [
    "Messaging shifts depending on who wrote the last deck or page.",
    "Visual identity and proof points feel assembled across eras.",
    "Sales narrative and marketing narrative diverge under light questioning.",
    "Premium buyers bounce because the first impression undersells the delivery.",
  ],
  "pipeline-not-predictable": [
    "Channel dashboards disagree with pipeline reality.",
    "UTMs and source fields are incomplete or inconsistently enforced.",
    "Forecasting leans on gut — not reconciled journeys.",
    "Budget cuts hit working channels because ROI cannot be defended with data.",
  ],
};

const ACCENT_HEX_BY_CLUSTER: Record<ProblemCluster, string> = {
  "no-strategy-owner": "#F05A28",
  "site-not-converting": "#F05A28",
  "disconnected-systems": "#0FD9C8",
  "not-visible-enough": "#0FD9C8",
  "brand-system-broken": "#F05A28",
  "pipeline-not-predictable": "#0FD9C8",
};

function getProblemCopy(cluster: ProblemCluster) {
  const page = problemPages.find((p) => p.slug === cluster);
  if (!page) {
    throw new Error(`Missing problem page for cluster: ${cluster}`);
  }
  return page;
}

function getPrimaryToolCta(cluster: ProblemCluster) {
  const page = getProblemCopy(cluster);
  const preferred =
    page.relevantTools.find((t) => !t.href.includes(TOOL_SLUG)) ?? page.relevantTools[0];
  if (!preferred) {
    return { label: "CMO Simulator", href: "/tools/cmo-simulator" };
  }
  return preferred;
}

function tallyVotes(selected: Record<string, VoteCluster | undefined>): Record<VoteCluster, number> {
  const counts: Record<VoteCluster, number> = {
    "no-strategy-owner": 0,
    "site-not-converting": 0,
    "disconnected-systems": 0,
    "not-visible-enough": 0,
  };
  for (const q of QUESTIONS) {
    const v = selected[q.id];
    if (v) counts[v] += 1;
  }
  return counts;
}

function winnerFromCounts(counts: Record<VoteCluster, number>): VoteCluster {
  let best: VoteCluster = VOTE_PRIORITY[0];
  let bestCount = -1;
  for (const c of VOTE_PRIORITY) {
    const n = counts[c];
    if (n > bestCount) {
      best = c;
      bestCount = n;
    }
  }
  return best;
}

type Phase = "intro" | "questions" | "result";

export function GrowthBottleneckQuizClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<Partial<Record<string, VoteCluster>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [resultCluster, setResultCluster] = useState<VoteCluster | null>(null);

  const currentQuestion = QUESTIONS[stepIndex];
  const selectedCluster = currentQuestion ? selections[currentQuestion.id] : undefined;
  const isAnswered = Boolean(selectedCluster);
  const isLastQuestion = stepIndex + 1 === QUESTIONS.length;

  function handleStart() {
    setPhase("questions");
    setStepIndex(0);
    setSelections({});
    setResultCluster(null);
  }

  function selectOption(cluster: VoteCluster) {
    if (!currentQuestion) return;
    setSelections((prev) => ({ ...prev, [currentQuestion.id]: cluster }));
  }

  async function goNext() {
    if (!currentQuestion || !selectedCluster) return;

    if (!isLastQuestion) {
      setStepIndex((i) => i + 1);
      return;
    }

    const fullSelections = { ...selections, [currentQuestion.id]: selectedCluster };
    const counts = tallyVotes(fullSelections);
    const winner = winnerFromCounts(counts);
    const resolvedResult = growthBottleneckTool.results.find((r) => r.problemCluster === winner);

    setSubmitting(true);
    try {
      const answersPayload: Record<string, string> = {};
      for (const q of QUESTIONS) {
        const v = fullSelections[q.id];
        if (v) answersPayload[q.id] = v;
      }

      captureClientEvent("quiz_completed", {
        toolSlug: TOOL_SLUG,
        resultCluster: winner,
      });

      await fetch("/api/tool-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolSlug: TOOL_SLUG,
          resultId: resolvedResult?.id,
          resultLabel: resolvedResult?.label,
          answers: answersPayload,
        }),
      });
    } catch {
      // Non-blocking — user still sees the result
    } finally {
      setResultCluster(winner);
      setSubmitting(false);
      setPhase("result");
    }
  }

  function handleStartOver() {
    setPhase("intro");
    setStepIndex(0);
    setSelections({});
    setResultCluster(null);
  }

  // ─── Intro ────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-xs font-normal uppercase tracking-widest text-[#F05A28]">
            Growth Diagnostic · {growthBottleneckTool.estimatedTime}
          </p>
          <h1 className="font-display mt-5 text-balance text-5xl font-bold leading-tight text-[#F5F4F0] md:text-6xl lg:text-[5.5rem]">
            {growthBottleneckTool.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#F5F4F0]/70">
            {growthBottleneckTool.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#F5F4F0]/50">
            <li>5 questions</li>
            <li>No email required</li>
            <li>Result delivered immediately</li>
          </ul>
          <div className="mt-10">
            <Button type="button" size="lg" onClick={handleStart}>
              Start the diagnostic
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // ─── Result ─────────────────────────────────────────────────────────────
  if (phase === "result" && resultCluster) {
    const cluster: ProblemCluster = resultCluster;
    const page = getProblemCopy(cluster);
    const primaryTool = getPrimaryToolCta(cluster);
    const accent = ACCENT_HEX_BY_CLUSTER[cluster];
    const symptoms = SYMPTOMS_BY_CLUSTER[cluster];

    return (
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="rounded-4xl bg-[#13131A] p-8 md:p-12">
            <span
              className="inline-flex rounded-full border bg-transparent px-4 py-2 text-xs uppercase tracking-[0.24em]"
              style={{ borderColor: `${accent}66`, color: accent }}
            >
              {page.pageEyebrow}
            </span>
            <h2 className="font-display mt-6 text-balance text-4xl font-semibold text-[#F5F4F0] md:text-5xl">
              {page.heroHeadline}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#F5F4F0]/70">{page.heroSubhead}</p>

            <div className="mt-10">
              <p className="text-xs font-normal uppercase tracking-widest text-[#F5F4F0]/50">
                Common signals
              </p>
              <ul className="mt-4 space-y-3 text-base leading-7 text-[#F5F4F0]/80">
                {symptoms.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F05A28]" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={primaryTool.href} size="lg">
                {primaryTool.label} →
              </Button>
              <Button href={`/problems/${cluster}`} variant="secondary" size="lg">
                Read the full problem breakdown
              </Button>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button href="/contact" variant="ghost" size="lg">
                Start a conversation
              </Button>
              <button
                type="button"
                onClick={handleStartOver}
                className="text-left text-sm text-[#F5F4F0]/50 underline-offset-4 hover:text-[#F5F4F0] hover:underline"
              >
                Start over
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── Questions ───────────────────────────────────────────────────────────
  if (!currentQuestion) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="sticky top-24 z-10 mb-8 rounded-3xl border border-[#F5F4F0]/8 bg-[#0C0C0E]/80 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-sm text-[#F5F4F0]/64">
            <span>
              Question {stepIndex + 1} of {QUESTIONS.length}
            </span>
            <span>{Math.round(((stepIndex + (isAnswered ? 1 : 0)) / QUESTIONS.length) * 100)}%</span>
          </div>
          <div
            className="mt-3 flex gap-2"
            role="progressbar"
            aria-valuenow={stepIndex + (isAnswered ? 1 : 0)}
            aria-valuemin={0}
            aria-valuemax={QUESTIONS.length}
            aria-label={`Quiz progress, question ${stepIndex + 1} of ${QUESTIONS.length}`}
          >
            {QUESTIONS.map((q, i) => {
              const filled = i < stepIndex || (i === stepIndex && isAnswered);
              return (
                <span
                  key={q.id}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors duration-300",
                    filled ? "bg-[#F05A28]" : "bg-[#F5F4F0]/10"
                  )}
                />
              );
            })}
          </div>
        </div>

        <div className="rounded-4xl bg-[#13131A] p-7 md:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">Diagnostic prompt</p>
          <h2 className="font-display mt-5 text-balance text-3xl font-semibold text-[#F5F4F0] md:text-4xl">
            {currentQuestion.question}
          </h2>

          <div className="mt-8 flex flex-col gap-3" role="radiogroup" aria-labelledby={`question-${currentQuestion.id}`}>
            {currentQuestion.options.map((option) => {
              const isSelected = selectedCluster === option.cluster;
              return (
                <button
                  key={option.label}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => selectOption(option.cluster)}
                  className={cn(
                    "w-full rounded-3xl border px-5 py-4 text-left text-base transition-colors",
                    isSelected
                      ? "border-[#F05A28] bg-[#F05A28]/8 text-[#F5F4F0]"
                      : "border-[#F5F4F0]/10 text-[#F5F4F0]/70 hover:border-[#F05A28]/40 hover:bg-[#F5F4F0]/3"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            <Button type="button" size="lg" onClick={goNext} disabled={!isAnswered || submitting}>
              {submitting ? "Analyzing…" : isLastQuestion ? "See my result" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

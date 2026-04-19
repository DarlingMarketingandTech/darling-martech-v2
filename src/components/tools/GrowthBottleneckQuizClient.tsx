"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { captureClientEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { resolveToolResult, type ToolAnswers } from "@/lib/tool-result-resolvers";
import { tools } from "@/data/labs";
import type { ToolResult } from "@/types";

const QUIZ = tools.find((t) => t.slug === "growth-bottleneck-quiz")!;

// Dynamic accent per result — style prop required because color values are data-driven
const RESULT_ACCENT: Record<string, string> = {
  "strategy-gap": "#F05A28",
  "conversion-gap": "#F05A28",
  "systems-gap": "#0FD9C8",
  "visibility-gap": "#0FD9C8",
  "attribution-gap": "#0FD9C8",
  "brand-cohesion-gap": "#F05A28",
};

type Phase = "intro" | "questions" | "result";

export function GrowthBottleneckQuizClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<ToolAnswers>({});
  const [submitting, setSubmitting] = useState(false);
  const [finalResult, setFinalResult] = useState<ToolResult | undefined>();

  const totalQuestions = QUIZ.questions.length;
  const currentQuestion = QUIZ.questions[stepIndex] ?? null;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isAnswered = currentAnswer !== undefined && currentAnswer !== "";
  const isLastQuestion = stepIndex + 1 === totalQuestions;

  function handleStart() {
    captureClientEvent("tool_quiz_started", {
      toolSlug: QUIZ.slug,
      toolTitle: QUIZ.title,
    });
    setPhase("questions");
  }

  function handleAnswer(value: string | number) {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  }

  async function handleNext() {
    if (!currentQuestion || !isAnswered) return;

    const nextIndex = stepIndex + 1;

    if (nextIndex < totalQuestions) {
      setStepIndex(nextIndex);
      return;
    }

    setSubmitting(true);
    const resolved = resolveToolResult(QUIZ, answers);

    try {
      await fetch("/api/tool-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolSlug: QUIZ.slug,
          resultId: resolved?.id,
          resultLabel: resolved?.label,
          answers,
        }),
      });

      captureClientEvent("tool_completed", {
        toolSlug: QUIZ.slug,
        resultId: resolved?.id,
        resultLabel: resolved?.label,
      });
    } catch {
      // Fire-and-forget — don't block the user from seeing results
    } finally {
      setFinalResult(resolved);
      setSubmitting(false);
      setPhase("result");
    }
  }

  function handleRestart() {
    setAnswers({});
    setStepIndex(0);
    setFinalResult(undefined);
    setPhase("intro");
  }

  // ─── Intro ───────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-xs font-normal uppercase tracking-widest text-[#F05A28]">
            Growth Diagnostic · {QUIZ.estimatedTime}
          </p>
          <h1 className="font-display mt-5 text-balance text-5xl font-bold leading-tight text-[#F5F4F0] md:text-6xl lg:text-[5.5rem]">
            {QUIZ.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#F5F4F0]/70">
            {QUIZ.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#F5F4F0]/50">
            <li>{totalQuestions} questions · about 3 minutes</li>
            <li>No email required</li>
            <li>Result delivered immediately</li>
          </ul>
          <div className="mt-10">
            <Button size="lg" onClick={handleStart}>
              Start the diagnostic
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // ─── Result ──────────────────────────────────────────────────────────────
  if (phase === "result" && finalResult) {
    const accentColor = RESULT_ACCENT[finalResult.id] ?? "#F05A28";

    return (
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="rounded-[2.25rem] bg-[#13131A] p-8 md:p-12">
            <span
              className="inline-flex rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em]"
              style={{ borderColor: `${accentColor}40`, color: accentColor }}
            >
              {finalResult.label}
            </span>
            <h2 className="font-display mt-6 text-balance text-4xl font-semibold text-[#F5F4F0] md:text-5xl">
              {finalResult.headline}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#F5F4F0]/70">
              {finalResult.description}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href={finalResult.ctaHref} size="lg">
                {finalResult.ctaLabel}
              </Button>
              <Button type="button" variant="secondary" size="lg" onClick={handleRestart}>
                Take it again
              </Button>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-[#F5F4F0]/8 p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[#F5F4F0]/40">
              What to do with this
            </p>
            <p className="mt-3 text-base leading-7 text-[#F5F4F0]/70">
              This result points to one constraint. Most teams fix the wrong layer — channel
              tactics when the real problem is structural, or tools when the problem is strategy.
              The page linked above explains what this bottleneck looks like at scale and how it
              gets resolved.
            </p>
            <p className="mt-3 text-base leading-7 text-[#F5F4F0]/70">
              If the result resonates,{" "}
              <a
                href="/contact"
                className="text-[#F05A28] underline underline-offset-4 hover:no-underline"
              >
                book a 30-minute diagnostic call
              </a>{" "}
              — no pitch, just a clear conversation about which layer to fix first.
            </p>
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
        {/* Progress */}
        <div className="sticky top-24 z-10 mb-8 rounded-3xl border border-[#F5F4F0]/8 bg-[#0C0C0E]/80 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-sm text-[#F5F4F0]/64">
            <span>
              Question {stepIndex + 1} of {totalQuestions}
            </span>
            <span>{Math.round(((stepIndex + 1) / totalQuestions) * 100)}%</span>
          </div>
          <div className="mt-3 flex gap-2">
            {QUIZ.questions.map((q, i) => (
              <span
                key={q.id}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-300",
                  i <= stepIndex ? "bg-[#F05A28]" : "bg-[#F5F4F0]/10"
                )}
              />
            ))}
          </div>
        </div>

        {/* Question card */}
        <div className="rounded-[2.25rem] bg-[#13131A] p-7 md:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#0FD9C8]">
            Diagnostic prompt
          </p>
          <h2 className="font-display mt-5 text-balance text-3xl font-semibold text-[#F5F4F0] md:text-4xl">
            {currentQuestion.question}
          </h2>

          {/* Scale */}
          {currentQuestion.type === "scale" &&
            currentQuestion.scaleMin !== undefined &&
            currentQuestion.scaleMax !== undefined && (
              <div className="mt-8">
                <div className="mb-4 flex justify-between text-sm text-[#F5F4F0]/56">
                  <span>{currentQuestion.scaleLabels?.min}</span>
                  <span>{currentQuestion.scaleLabels?.max}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {Array.from(
                    { length: currentQuestion.scaleMax - currentQuestion.scaleMin + 1 },
                    (_, i) => currentQuestion.scaleMin! + i
                  ).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleAnswer(value)}
                      className={cn(
                        "font-mono h-14 w-14 rounded-2xl border text-lg transition-colors",
                        currentAnswer === value
                          ? "border-[#F05A28] bg-[#F05A28]/10 text-[#F05A28]"
                          : "border-[#F5F4F0]/10 text-[#F5F4F0]/68 hover:border-[#F05A28]/40 hover:text-[#F05A28]"
                      )}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Single choice */}
          {currentQuestion.type === "single" && currentQuestion.options && (
            <div className="mt-8 grid gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleAnswer(option.value)}
                  className={cn(
                    "rounded-3xl border px-5 py-4 text-left text-base transition-colors",
                    currentAnswer === option.value
                      ? "border-[#F05A28] bg-[#F05A28]/8 text-[#F5F4F0]"
                      : "border-[#F5F4F0]/10 text-[#F5F4F0]/70 hover:border-[#F05A28]/40 hover:bg-[#F5F4F0]/3"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          <div className="mt-8">
            <Button
              type="button"
              size="lg"
              onClick={handleNext}
              disabled={!isAnswered || submitting}
            >
              {submitting ? "Analyzing…" : isLastQuestion ? "See my result" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

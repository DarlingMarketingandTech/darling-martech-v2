"use client";

import { useEffect, useMemo, useState } from "react";
import type { Tool } from "@/types";
import { captureClientEvent } from "@/lib/analytics";
import { resolveToolResult } from "@/lib/tool-result-resolvers";
import { EmailGate } from "@/components/tools/EmailGate";
import { QuizProgress } from "@/components/tools/QuizProgress";
import { QuizQuestion } from "@/components/tools/QuizQuestion";
import { ResultCard } from "@/components/tools/ResultCard";

type QuizEngineProps = {
  tool: Tool;
};

type Answers = Record<string, string | number>;

export function QuizEngine({ tool }: QuizEngineProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [resultEmailCaptured, setResultEmailCaptured] = useState(false);

  useEffect(() => {
    captureClientEvent("tool_quiz_started", { toolSlug: tool.slug, toolTitle: tool.title });
  }, [tool.slug, tool.title]);

  const currentQuestion = tool.questions[stepIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const result = useMemo(() => resolveToolResult(tool, answers), [tool, answers]);
  const isComplete = stepIndex >= tool.questions.length;
  const shouldGateBeforeResults = tool.emailGated && tool.emailGatePosition === "before_results" && !resultEmailCaptured;
  const shouldGateAfterResults = tool.emailGated && tool.emailGatePosition === "after_results" && resultEmailCaptured === false;

  async function submitEmailGate(payload: { firstName: string; email: string }) {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: payload.firstName,
        email: payload.email,
        toolSlug: tool.slug,
        resultLabel: result?.label,
        resultSummary: result?.description,
        ctaHref: result?.ctaHref,
      }),
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      throw new Error(data.error ?? "Unable to submit email.");
    }

    setResultEmailCaptured(true);
  }

  async function recordCompletion() {
    const response = await fetch("/api/tool-complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toolSlug: tool.slug,
        resultId: result?.id,
        resultLabel: result?.label,
        answers,
      }),
    });

    if (response.ok) {
      captureClientEvent("tool_completed", {
        toolSlug: tool.slug,
        resultId: result?.id,
        resultLabel: result?.label,
      });
    }
  }

  async function handleNext() {
    if (stepIndex + 1 < tool.questions.length) {
      setStepIndex((current) => current + 1);
      return;
    }

    setStepIndex(tool.questions.length);
    await recordCompletion();
  }

  function handleRestart() {
    setAnswers({});
    setStepIndex(0);
    setResultEmailCaptured(false);
  }

  if (!tool.questions.length || !currentQuestion && !isComplete) {
    return null;
  }

  if (isComplete && result) {
    if (shouldGateBeforeResults || shouldGateAfterResults) {
      return <EmailGate toolName={tool.title} onSubmit={submitEmailGate} />;
    }

    return <ResultCard tool={tool} result={result} onRestart={handleRestart} />;
  }

  return (
    <div className="grid gap-6">
      <QuizProgress current={stepIndex + 1} total={tool.questions.length} />
      <QuizQuestion
        question={currentQuestion}
        currentAnswer={currentAnswer}
        onAnswer={(value) =>
          setAnswers((current) => ({
            ...current,
            [currentQuestion.id]: value,
          }))
        }
        onNext={handleNext}
      />
    </div>
  );
}

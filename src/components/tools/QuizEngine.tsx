"use client";

import { useEffect, useMemo, useState } from "react";
import type { Tool, ToolResult } from "@/types";
import { captureClientEvent } from "@/lib/analytics";
import { EmailGate } from "@/components/tools/EmailGate";
import { QuizProgress } from "@/components/tools/QuizProgress";
import { QuizQuestion } from "@/components/tools/QuizQuestion";
import { ResultCard } from "@/components/tools/ResultCard";

type QuizEngineProps = {
  tool: Tool;
};

type Answers = Record<string, string | number>;

function scoreFromKeys(answers: Answers, keys: string[]): number {
  return keys.reduce((total, key) => {
    const raw = answers[key];
    const value = typeof raw === "string" ? Number.parseInt(raw, 10) : Number(raw);
    return total + (Number.isFinite(value) ? value : 0);
  }, 0);
}

function resolveMartechStackResult(tool: Tool, answers: Answers): ToolResult | undefined {
  const total = scoreFromKeys(answers, ["crmMaturity", "automationMaturity", "attributionMaturity", "integrationMaturity"]);

  if (total <= 4) return tool.results.find((result) => result.id === "martech-fragile");
  if (total <= 8) return tool.results.find((result) => result.id === "martech-emerging");
  return tool.results.find((result) => result.id === "martech-integrated");
}

function resolveGrowthBottleneckResult(tool: Tool, answers: Answers): ToolResult | undefined {
  const leak = answers.leak;
  const brandConsistency = answers.brandConsistency;

  if (leak === "brand") {
    return tool.results.find((result) => result.id === "brand-cohesion-gap");
  }

  if (
    brandConsistency === "weak" &&
    leak !== "strategy" &&
    leak !== "attribution" &&
    typeof leak === "string"
  ) {
    return tool.results.find((result) => result.id === "brand-cohesion-gap");
  }

  if (leak === "strategy") return tool.results.find((result) => result.id === "strategy-gap");
  if (leak === "website") return tool.results.find((result) => result.id === "conversion-gap");
  if (leak === "systems") return tool.results.find((result) => result.id === "systems-gap");
  if (leak === "visibility") return tool.results.find((result) => result.id === "visibility-gap");
  if (leak === "attribution") return tool.results.find((result) => result.id === "attribution-gap");

  return tool.results[0];
}

function resolveResult(tool: Tool, answers: Answers): ToolResult | undefined {
  if (!tool.results.length) {
    return undefined;
  }

  if (tool.slug === "growth-bottleneck-quiz") {
    return resolveGrowthBottleneckResult(tool, answers);
  }

  if (tool.slug === "martech-stack-grader") {
    return resolveMartechStackResult(tool, answers);
  }

  return tool.results[0];
}

export function QuizEngine({ tool }: QuizEngineProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [resultEmailCaptured, setResultEmailCaptured] = useState(false);

  useEffect(() => {
    captureClientEvent("tool_quiz_started", { toolSlug: tool.slug, toolTitle: tool.title });
  }, [tool.slug, tool.title]);

  const currentQuestion = tool.questions[stepIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const result = useMemo(() => resolveResult(tool, answers), [tool, answers]);
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

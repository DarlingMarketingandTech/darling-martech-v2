"use client";

import type { ToolQuestion } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuizQuestionProps = {
  question: ToolQuestion;
  currentAnswer?: string | number;
  onAnswer: (value: string | number) => void;
  onNext: () => void;
};

export function QuizQuestion({ question, currentAnswer, onAnswer, onNext }: QuizQuestionProps) {
  const isAnswered = currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== "";

  return (
    <div className="surface-card rounded-[2rem] p-7 md:p-8">
      <p className="text-sm uppercase tracking-[0.24em] text-[#0FD9C8]">Diagnostic prompt</p>
      <h2 className="font-display text-balance mt-4 text-3xl font-semibold md:text-4xl">
        {question.question}
      </h2>

      {question.type === "single" && question.options ? (
        <div className="mt-8 grid gap-3">
          {question.options.map((option) => {
            const isSelected = currentAnswer === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onAnswer(option.value)}
                className={cn(
                  "rounded-[1.5rem] border px-5 py-4 text-left transition-colors",
                  isSelected
                    ? "border-[#F05A28] bg-[#F05A28]/8 text-[#F5F4F0]"
                    : "border-[#F5F4F0]/10 text-[#F5F4F0]/72 hover:border-[#F05A28]/40 hover:bg-[#F5F4F0]/3"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {question.type === "scale" && question.scaleMin !== undefined && question.scaleMax !== undefined ? (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between text-sm text-[#F5F4F0]/56">
            <span>{question.scaleLabels?.min}</span>
            <span>{question.scaleLabels?.max}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {Array.from(
              { length: question.scaleMax - question.scaleMin + 1 },
              (_, index) => question.scaleMin! + index
            ).map((value) => {
              const isSelected = currentAnswer === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onAnswer(value)}
                  className={cn(
                    "font-mono rounded-[1.25rem] border px-4 py-4 text-lg transition-colors",
                    isSelected
                      ? "border-[#F05A28] bg-[#F05A28]/10 text-[#F05A28]"
                      : "border-[#F5F4F0]/10 text-[#F5F4F0]/68 hover:border-[#F05A28]/40 hover:text-[#F05A28]"
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="mt-8">
        <Button type="button" size="lg" onClick={onNext} disabled={!isAnswered}>
          Continue
        </Button>
      </div>
    </div>
  );
}

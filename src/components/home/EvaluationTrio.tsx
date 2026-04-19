"use client";

import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

interface EvaluationItem {
  number: string;
  title: string;
  body: string;
}

interface EvaluationTrioProps {
  eyebrow: string;
  headline: string;
  items: EvaluationItem[];
}

export function EvaluationTrio({ eyebrow, headline, items }: EvaluationTrioProps) {
  return (
    <AnimateOnScroll>
      <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">{eyebrow}</p>
      <h2 className="font-display mt-4 max-w-2xl text-balance text-2xl font-semibold text-[#F5F4F0] md:text-3xl">
        {headline}
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.number}
            className="rounded-2xl border border-[#F5F4F0]/8 px-5 py-6"
          >
            <span className="font-mono text-xs text-[#0FD9C8]">{item.number}</span>
            <h3 className="font-display mt-3 text-lg font-semibold text-[#F5F4F0]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/55">{item.body}</p>
          </div>
        ))}
      </div>
    </AnimateOnScroll>
  );
}

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
    <AnimateOnScroll variant="fade">
      <p className="meta-label text-[#F05A28]/90">{eyebrow}</p>
      <h2 className="font-display mt-5 max-w-2xl text-balance text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#F5F4F0] md:text-3xl">
        {headline}
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.number} className="panel-obsidian rounded-3xl px-5 py-6 md:px-6 md:py-7">
            <span className="meta-label-accent">{item.number}</span>
            <h3 className="font-display mt-4 text-lg font-semibold leading-snug text-[#F5F4F0]">
              {item.title}
            </h3>
            <div className="tech-divider my-4" />
            <p className="text-sm leading-relaxed text-[#F5F4F0]/58">{item.body}</p>
          </div>
        ))}
      </div>
    </AnimateOnScroll>
  );
}

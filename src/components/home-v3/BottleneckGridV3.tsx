import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homepageV4Data } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { SectionSurface } from "@/components/layout-v3/SectionSurface";

export function BottleneckGridV3() {
  const { bottlenecks } = homepageV4Data;

  return (
    <BleedSection className="py-16 md:py-20 lg:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-signal">
          {bottlenecks.eyebrow}
        </p>
        <h2 className="mt-3 font-syne text-3xl leading-[1.04] tracking-[-0.02em] text-foreground md:text-5xl">
          {bottlenecks.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-body-muted md:text-lg">
          {bottlenecks.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {bottlenecks.cards.map((card) => (
          <SectionSurface key={card.title} className="p-6">
            <h3 className="max-w-[18ch] font-syne text-2xl leading-tight text-foreground">
              {card.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-body-muted md:text-[0.95rem]">
              {card.body}
            </p>

            <ul className="mt-6 space-y-3 border-t border-border-subtle pt-5 text-sm text-body-muted">
              {card.symptoms.map((symptom) => (
                <li key={symptom} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </SectionSurface>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        {bottlenecks.ctaSupporting ? (
          <p className="text-sm leading-relaxed text-body-muted md:text-base">
            {bottlenecks.ctaSupporting}
          </p>
        ) : null}
        <Link
          href={bottlenecks.cta.href}
          className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal transition-colors hover:text-signal/80"
        >
          {bottlenecks.cta.label}
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </BleedSection>
  );
}

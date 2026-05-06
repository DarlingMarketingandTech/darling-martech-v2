import { homepageV4Data } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { SectionSurface } from "@/components/layout-v3/SectionSurface";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {bottlenecks.cards.map((card) => (
          <SectionSurface key={card.title} className="p-6">
            <h3 className="max-w-[18ch] font-syne text-2xl leading-tight text-foreground">
              {card.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-body-muted md:text-[0.95rem]">
              {card.body}
            </p>

            <ul className="mt-6 space-y-3 border-t border-foreground/10 pt-5 text-sm text-body-muted">
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

      <div className="mt-10 flex flex-col items-start gap-4">
        {bottlenecks.ctaSupporting ? (
          <p className="max-w-xl text-sm leading-relaxed text-body-muted md:text-base">{bottlenecks.ctaSupporting}</p>
        ) : null}
        <Button href={bottlenecks.cta.href} size="lg" className="gap-2">
          {bottlenecks.cta.label}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </BleedSection>
  );
}

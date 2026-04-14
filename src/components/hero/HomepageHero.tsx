import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MonoMetric } from "@/components/ui/MonoMetric";
import type { ProofMetric } from "@/types";

type HomepageHeroProps = {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  metrics: ProofMetric[];
};

export function HomepageHero({
  eyebrow,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  metrics,
}: HomepageHeroProps) {
  return (
    <section className="hero-mesh grain-mask relative overflow-hidden rounded-[2.5rem] border border-[#F5F4F0]/8 px-6 py-10 md:px-10 md:py-14">
      <div className="absolute inset-y-6 right-6 hidden w-[32%] rounded-[2rem] border border-[#F5F4F0]/8 bg-[linear-gradient(180deg,rgba(15,217,200,0.12),rgba(15,217,200,0.02))] lg:block" />
      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <AnimateOnScroll>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="font-display text-balance mt-6 max-w-4xl text-5xl font-bold leading-[0.96] tracking-[-0.05em] md:text-7xl xl:text-[5.5rem]">
              {headline}
            </h1>
            <p className="text-pretty mt-6 max-w-2xl text-lg leading-8 text-[#F5F4F0]/74 md:text-xl">
              {subhead}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
              </Button>
              <Button href={secondaryCta.href} variant="secondary" size="lg">
                {secondaryCta.label}
              </Button>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.08}>
          <div className="surface-card rounded-[2rem] p-6 md:p-7">
            <Eyebrow accent="teal">Proof bar</Eyebrow>
            <div className="mt-6 grid gap-5">
              {metrics.map((metric) => (
                <MonoMetric key={metric.label} value={metric.value} label={metric.label} />
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

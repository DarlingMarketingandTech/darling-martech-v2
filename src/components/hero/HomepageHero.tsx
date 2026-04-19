import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Eyebrow } from "@/components/ui/Eyebrow";

type HomepageHeroProps = {
  eyebrow: string;
  headline: {
    beforeAccent: string;
    accent: string;
    afterAccent: string;
  };
  subhead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export function HomepageHero({
  eyebrow,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
}: HomepageHeroProps) {
  return (
    <section className="hero-mesh grain-mask relative overflow-hidden rounded-[2.5rem] border border-[#F5F4F0]/8 px-6 py-12 md:px-10 md:py-16">
      <AnimateOnScroll>
        <div className="max-w-4xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-display text-balance mt-6 text-5xl font-bold leading-[0.96] tracking-[-0.05em] text-white md:text-7xl xl:text-[5.5rem]">
            {headline.beforeAccent}
            <span className="text-[#F05A28] italic">{headline.accent}</span>
            {headline.afterAccent}
          </h1>
          <p className="text-pretty mt-6 max-w-md text-lg leading-8 text-[#F5F4F0]/74 md:text-xl">
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
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HomepageHeroPrimaryCta } from "@/components/hero/HomepageHeroPrimaryCta";
import { HomepageHeroVisual } from "@/components/hero/HomepageHeroVisual";

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
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 xl:gap-16">
        <div className="relative z-10 max-w-4xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-display mt-6 max-w-5xl text-balance text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-white md:text-6xl xl:text-[4.75rem]">
            {headline.beforeAccent}
            <span className="text-[#F05A28] italic">{headline.accent}</span>
            {headline.afterAccent}
          </h1>
          <p className="text-pretty mt-6 max-w-md text-base leading-7 text-[#F5F4F0]/74 md:text-lg md:leading-8">
            {subhead}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <HomepageHeroPrimaryCta href={primaryCta.href}>{primaryCta.label}</HomepageHeroPrimaryCta>
            <Button href={secondaryCta.href} variant="secondary" size="lg">
              {secondaryCta.label}
            </Button>
          </div>
        </div>
        <div className="relative z-0 h-[240px] w-full shrink-0 sm:h-[280px] lg:h-[min(400px,42vw)] lg:max-h-[440px] lg:min-h-[320px] lg:w-[calc(100%+1.75rem)] lg:max-w-none lg:justify-self-end lg:-mr-6 xl:-mr-10 xl:w-[calc(100%+2.5rem)]">
          <HomepageHeroVisual />
        </div>
      </div>
    </section>
  );
}

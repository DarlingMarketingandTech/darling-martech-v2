import { Button } from "@/components/ui/button";
import { HomepageHeroPrimaryCta } from "@/components/hero/HomepageHeroPrimaryCta";
import { HomepageHeroVisual } from "@/components/hero/HomepageHeroVisual";
import styles from "@/components/hero/homepage-hero-v2.module.css";
import { cn } from "@/lib/utils";

const PRIMARY_HREF = "/process";
const SECONDARY_HREF = "/proof";

const STAGGER_MS = 75;

export function HomepageHero() {
  return (
    <section className="hero-mesh grain-mask relative overflow-hidden rounded-[2.5rem] border border-[#F5F4F0]/8 px-6 py-20 md:px-10 md:py-24 lg:py-28">
      <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 xl:gap-16">
        <div className="relative z-10 max-w-[680px] text-left">
          <h1 className="font-display text-balance text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl md:text-[3.25rem] md:leading-[1.06] lg:text-6xl lg:leading-[1.05]">
            <span className={cn(styles.reveal, "block")} style={{ animationDelay: `${STAGGER_MS * 0}ms` }}>
              Your marketing, website, and systems should work together.
            </span>
            <span className={cn(styles.reveal, "mt-2 block text-[#F05A28]")} style={{ animationDelay: `${STAGGER_MS * 1}ms` }}>
              Most don&apos;t.
            </span>
          </h1>
          <p
            className={cn(
              styles.reveal,
              "text-pretty mt-8 max-w-[680px] text-base leading-8 text-[#F5F4F0]/74 md:text-lg md:leading-9"
            )}
            style={{ animationDelay: `${STAGGER_MS * 2}ms` }}
          >
            I design and build connected growth systems — aligning brand, website, and marketing infrastructure so they
            actually drive pipeline.
          </p>
          <div
            className={cn(styles.reveal, "mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap")}
            style={{ animationDelay: `${STAGGER_MS * 3}ms` }}
          >
            <HomepageHeroPrimaryCta href={PRIMARY_HREF}>See how it works</HomepageHeroPrimaryCta>
            <Button href={SECONDARY_HREF} variant="secondary" size="lg">
              View proof
            </Button>
          </div>
        </div>
        <div
          className={cn(
            styles.reveal,
            "relative z-0 h-[240px] w-full shrink-0 sm:h-[280px] lg:h-[min(400px,42vw)] lg:max-h-[440px] lg:min-h-[320px] lg:w-[calc(100%+1.75rem)] lg:max-w-none lg:justify-self-end lg:-mr-6 xl:-mr-10 xl:w-[calc(100%+2.5rem)]"
          )}
          style={{ animationDelay: `${STAGGER_MS * 4}ms` }}
        >
          <HomepageHeroVisual />
        </div>
      </div>
    </section>
  );
}

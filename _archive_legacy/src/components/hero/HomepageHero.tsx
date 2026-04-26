import { Button } from "@/components/ui/button";
import { HomeHeroSignalStrip } from "@/components/hero/HomeHeroSignalStrip";
import { HomepageHeroPrimaryCta } from "@/components/hero/HomepageHeroPrimaryCta";
import { HomepageHeroVisual } from "@/components/hero/HomepageHeroVisual";
import { HomepageHeroTerminalLayer } from "@/components/hero/HomepageHeroTerminalLayer";
import { homepageData } from "@/data/homepage";
import { CTA_LABELS, CTA_LINKS } from "@/lib/cta";
import styles from "@/components/hero/homepage-hero-v2.module.css";
import { cn } from "@/lib/utils";

const PRIMARY_HREF = CTA_LINKS.startHere;
const SECONDARY_HREF = CTA_LINKS.proof;

const HERO_SIGNAL_METRICS = homepageData.proofBar.slice(0, 3);

export function HomepageHero() {
  return (
    <section className="hero-mesh grain-mask relative overflow-hidden rounded-[2.5rem] border border-[#F5F4F0]/8">
      <HomepageHeroTerminalLayer />
      <div className="relative z-10 flex flex-col">
        <div className="grid grid-cols-1 gap-12 px-6 py-20 md:px-10 md:py-24 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-center lg:gap-10 lg:py-24 xl:gap-14 xl:px-12 xl:py-28">
          <div className="relative max-w-[700px] text-left lg:max-w-none lg:pr-4">
            <p
              className={cn(
                styles.reveal,
                styles.revealDelay0,
                "mb-6 font-mono text-[0.6875rem] font-medium uppercase leading-relaxed tracking-[0.16em] text-[#F05A28]/90"
              )}
            >
              {homepageData.hero.eyebrow}
            </p>
            <h1 className="font-display text-balance text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[#F5F4F0] sm:text-5xl md:text-[3.25rem] md:leading-[1.06] lg:text-6xl lg:leading-[1.05]">
              <span className={cn(styles.reveal, styles.revealDelay1, "block")}>
                Your marketing, website, and systems should work as one.
              </span>
              <span
                className={cn(styles.reveal, styles.revealDelay2, "mt-2 block text-[#F05A28]")}
              >
                Most don&apos;t.
              </span>
            </h1>
            <p
              className={cn(
                styles.reveal,
                styles.revealDelay3,
                "text-pretty mt-8 max-w-[640px] text-base leading-8 text-[#F5F4F0]/74 md:text-lg md:leading-9"
              )}
            >
              I build connected growth systems that align your brand, website, and marketing stack to drive pipeline.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              <li className="rounded-full border border-[#F5F4F0]/14 bg-[#13131A]/60 px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-[#0FD9C8]">
                +212% qualified lead lift
              </li>
              <li className="rounded-full border border-[#F5F4F0]/14 bg-[#13131A]/60 px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-[#F5F4F0]/72">
                3-minute diagnostic
              </li>
            </ul>
            <div
              className={cn(
                styles.reveal,
                styles.revealDelay4,
                "mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              )}
            >
              <HomepageHeroPrimaryCta href={PRIMARY_HREF}>{CTA_LABELS.startHere}</HomepageHeroPrimaryCta>
              <Button href={SECONDARY_HREF} variant="secondary" size="lg">
                {CTA_LABELS.proof}
              </Button>
            </div>
          </div>

          <div
            className={cn(
              styles.reveal,
              styles.revealDelay3,
              "relative isolate w-full shrink-0 justify-self-end lg:max-w-none lg:justify-self-end"
            )}
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-[1.85rem] bg-[linear-gradient(135deg,rgba(240,90,40,0.22)_0%,rgba(245,244,240,0.06)_42%,rgba(15,217,200,0.12)_100%)] opacity-90 sm:rounded-[2.05rem] lg:rounded-l-[2.05rem] lg:rounded-r-none"
              aria-hidden
            />
            <div
              className={cn(
                "relative h-[240px] w-full overflow-hidden rounded-[1.75rem] ring-1 ring-[#F5F4F0]/10 ring-offset-0 sm:h-[280px] sm:rounded-[2rem] lg:h-[min(400px,42vw)] lg:max-h-[440px] lg:min-h-[320px] lg:rounded-l-[2rem] lg:rounded-r-none lg:shadow-[0_32px_90px_rgba(0,0,0,0.48)]",
                "sm:ring-[#F5F4F0]/12"
              )}
            >
              <span
                className="pointer-events-none absolute left-3 top-3 z-20 hidden h-6 w-px bg-linear-to-b from-[#F05A28]/70 to-transparent lg:block"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute left-3 top-3 z-20 hidden h-px w-6 bg-linear-to-r from-[#F05A28]/70 to-transparent lg:block"
                aria-hidden
              />
              <HomepageHeroVisual />
            </div>
          </div>
        </div>

        <HomeHeroSignalStrip
          items={HERO_SIGNAL_METRICS}
          className={cn(styles.reveal, styles.revealDelay5, "border-b-0")}
        />
      </div>
    </section>
  );
}

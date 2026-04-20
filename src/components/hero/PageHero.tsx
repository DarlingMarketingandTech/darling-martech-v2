import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  headline: string;
  body: string | string[];
  ctas?: { label: string; href: string; variant?: "primary" | "secondary" | "ghost" }[];
  splitAside?: React.ReactNode;
  /**
   * Use a narrower typographic measure for long-form pages (e.g. problem deep-dives)
   * so lines do not span the full desktop width.
   */
  readableMeasure?: boolean;
  className?: string;
};

export function PageHero({
  eyebrow,
  headline,
  body,
  ctas,
  splitAside,
  readableMeasure = false,
  className,
}: PageHeroProps) {
  const paragraphs = Array.isArray(body) ? body : [body];

  return (
    <section
      className={cn(
        "grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12",
        className
      )}
    >
      <AnimateOnScroll variant="fade">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            className={cn(
              "font-display mt-4 max-w-5xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:mt-5 md:text-5xl lg:text-6xl",
              readableMeasure && "max-w-[min(100%,42rem)]"
            )}
          >
            {headline}
          </h1>
          <div
            className={cn(
              "mt-5 max-w-3xl space-y-4 text-base leading-7 text-[#F5F4F0]/72 sm:mt-6 md:text-lg md:leading-8",
              readableMeasure && "max-w-prose"
            )}
          >
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {ctas?.length ? (
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              {ctas.map((cta) => (
                <Button key={`${cta.href}-${cta.label}`} href={cta.href} variant={cta.variant ?? "primary"} size="lg">
                  {cta.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </AnimateOnScroll>
      {splitAside ? (
        <AnimateOnScroll delay={0.08} variant="fade">
          <div className="min-w-0 lg:pb-1">{splitAside}</div>
        </AnimateOnScroll>
      ) : null}
    </section>
  );
}

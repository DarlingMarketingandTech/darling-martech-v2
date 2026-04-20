import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PageHeroProps = {
  eyebrow: string;
  headline: string;
  body: string | string[];
  ctas?: { label: string; href: string; variant?: "primary" | "secondary" | "ghost" }[];
  splitAside?: React.ReactNode;
};

export function PageHero({ eyebrow, headline, body, ctas, splitAside }: PageHeroProps) {
  const paragraphs = Array.isArray(body) ? body : [body];

  return (
    <section className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
      <AnimateOnScroll variant="fade">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-display mt-5 max-w-5xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] md:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-7 text-[#F5F4F0]/72 md:text-lg md:leading-8">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {ctas?.length ? (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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
          {splitAside}
        </AnimateOnScroll>
      ) : null}
    </section>
  );
}

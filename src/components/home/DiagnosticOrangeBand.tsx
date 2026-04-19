import { Button } from "@/components/ui/button";

type DiagnosticOrangeBandProps = {
  headline: string;
  body: string;
  cta: { label: string; href: string };
};

export function DiagnosticOrangeBand({ headline, body, cta }: DiagnosticOrangeBandProps) {
  return (
    <section className="band-orange rounded-[2rem] px-6 py-10 md:px-10 md:py-12">
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-balance text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
            {headline}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90">{body}</p>
        </div>
        <div className="shrink-0">
          <Button
            href={cta.href}
            variant="secondary"
            size="lg"
            className="border-0 bg-white text-[#F05A28] hover:bg-white/95 hover:text-[#F05A28]"
          >
            {cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

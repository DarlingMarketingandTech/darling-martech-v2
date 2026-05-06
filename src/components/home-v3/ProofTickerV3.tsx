import { homepageData } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { SlowMarquee } from "@/components/motion";

export function ProofTickerV3() {
  const metrics = homepageData.proofBar;

  return (
    <BleedSection
      className="relative overflow-hidden border-y border-foreground/10 bg-surface-strong/72 py-5 md:py-6"
      innerClassName="max-w-none px-0"
    >
      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-[linear-gradient(90deg,var(--surface-strong-base)_0%,transparent_100%)] md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-32 bg-[linear-gradient(270deg,var(--surface-strong-base)_0%,transparent_100%)] md:block"
      />
      {/* Top + bottom hairlines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/35 to-transparent" />

      <SlowMarquee className="hidden md:block px-6 md:px-10">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex shrink-0 items-baseline gap-3 whitespace-nowrap"
          >
            <span className="font-mono text-base font-medium text-signal">
              {metric.value}
            </span>
            <span className="text-sm uppercase tracking-[0.14em] text-body-muted">
              {metric.label}
            </span>
            <span aria-hidden className="ml-2 size-1.5 shrink-0 rounded-full bg-foreground/35" />
          </div>
        ))}
      </SlowMarquee>

      <div className="grid gap-3 px-6 md:hidden">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between gap-3">
            <span className="font-mono text-sm text-signal">{metric.value}</span>
            <span className="text-right text-xs text-body-muted">{metric.label}</span>
          </div>
        ))}
      </div>
    </BleedSection>
  );
}

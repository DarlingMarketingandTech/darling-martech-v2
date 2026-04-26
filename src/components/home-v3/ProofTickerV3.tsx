import { homepageData } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { SlowMarquee } from "@/components/motion";

export function ProofTickerV3() {
  const metrics = homepageData.proofBar;

  return (
    <BleedSection className="relative overflow-hidden border-y border-[#F5F4F0]/10 bg-[#0F1012]/72 py-5 md:py-6">
      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-[linear-gradient(90deg,#0F1012_0%,rgba(15,16,18,0)_100%)] md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-32 bg-[linear-gradient(270deg,#0F1012_0%,rgba(15,16,18,0)_100%)] md:block"
      />
      {/* Top + bottom hairlines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(15,217,200,0.4)_50%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(240,90,40,0.35)_50%,transparent_100%)]" />

      <SlowMarquee className="hidden md:block">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-baseline gap-3 whitespace-nowrap"
          >
            <span className="font-mono text-base font-medium text-[#0FD9C8]">
              {metric.value}
            </span>
            <span className="text-sm uppercase tracking-[0.14em] text-[#F5F4F0]/64">
              {metric.label}
            </span>
            <span aria-hidden className="ml-3 size-1 rounded-full bg-[#F5F4F0]/24" />
          </div>
        ))}
      </SlowMarquee>

      <div className="grid gap-3 md:hidden">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between gap-3">
            <span className="font-mono text-sm text-[#0FD9C8]">{metric.value}</span>
            <span className="text-right text-xs text-[#F5F4F0]/64">{metric.label}</span>
          </div>
        ))}
      </div>
    </BleedSection>
  );
}

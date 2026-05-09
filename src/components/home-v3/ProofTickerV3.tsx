import { homepageV4Data } from "@/data/homepage";

/**
 * Proof bar rendered directly below the hero.
 * Uses the `@keyframes marquee` animation defined in globals.css for a
 * continuous horizontal scroll on smaller viewports where all items don't fit.
 * On large screens items are spread across the full width with no scroll.
 */
export function ProofTickerV3() {
  const { proofBar } = homepageV4Data;

  // Duplicate items so the marquee loop is seamless
  const doubled = [...proofBar, ...proofBar];

  return (
    <div
      className="w-full border-y border-border-subtle bg-surface"
      aria-label="Proof metrics"
    >
      {/* Mobile / tablet: scrolling marquee */}
      <div className="relative overflow-hidden py-4 lg:hidden" aria-hidden="true">
        <ul
          className="flex w-max gap-10"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {doubled.map((metric, i) => (
            <li
              key={`${metric.value}-${i}`}
              className="flex shrink-0 items-center gap-2 font-mono text-[0.68rem] tracking-tight"
            >
              <span className="font-bold tabular-nums text-signal">{metric.value}</span>
              <span className="text-body-muted/70">— {metric.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: static spread layout */}
      <ul className="mx-auto hidden w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-10 lg:flex">
        {proofBar.map((metric) => (
          <li
            key={`${metric.value}-${metric.label}`}
            className="flex items-center gap-2 font-mono text-[0.7rem] tracking-tight"
          >
            <span className="font-bold tabular-nums text-signal">{metric.value}</span>
            <span className="text-body-muted/70">— {metric.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

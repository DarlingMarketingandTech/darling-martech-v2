import Link from "next/link";
import { OUTCOME_SLUG_LABELS, PROJECT_TYPE_LABELS } from "@/data/taxonomy";
import type { CaseStudy } from "@/types";
import { cn } from "@/lib/utils";

export type ProofCardSize = "sm" | "md" | "lg";

type ProofCardProps = {
  caseStudy: CaseStudy;
  showSystems?: boolean;
  /**
   * Size variant for the weighted Proof grid.
   * - `sm`: compact tile for narrative or supporting outcomes.
   * - `md`: default proof card.
   * - `lg`: hero outcome — wider container, larger typography.
   */
  size?: ProofCardSize;
};

const sizeStyles: Record<
  ProofCardSize,
  {
    container: string;
    headline: string;
    summary: string;
    showSystemsByDefault: boolean;
  }
> = {
  sm: {
    container: "p-5 md:p-6",
    headline: "mt-4 text-2xl md:text-[1.6rem] md:leading-tight",
    summary: "text-sm leading-6",
    showSystemsByDefault: false,
  },
  md: {
    container: "p-7 md:p-8",
    headline: "mt-5 text-3xl md:text-[2.125rem] md:leading-tight",
    summary: "text-base leading-7",
    showSystemsByDefault: true,
  },
  lg: {
    container: "p-8 md:p-10",
    headline: "mt-6 text-[2.4rem] md:text-[3rem] md:leading-[1.05]",
    summary: "text-base leading-7 md:text-lg md:leading-8",
    showSystemsByDefault: true,
  },
};

export function ProofCard({ caseStudy, showSystems, size = "md" }: ProofCardProps) {
  const outcomeLabel = OUTCOME_SLUG_LABELS[caseStudy.primaryOutcomeSlug];
  const variant = sizeStyles[size];
  const renderSystems = showSystems ?? variant.showSystemsByDefault;
  const contextLine =
    caseStudy.showClientName === false
      ? (caseStudy.clientContextLabel ?? caseStudy.clientContext)
      : `${caseStudy.clientName} · ${caseStudy.clientContext}`;
  const buildContextLine = `${caseStudy.timeline} · ${caseStudy.engagementFormat}`;

  return (
    <Link
      href={`/proof/${caseStudy.slug}`}
      className={cn(
        "ui-card-motion group block h-full rounded-4xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0e]"
      )}
    >
      <article
        className={cn(
          "panel-obsidian panel-interactive grain-mask relative flex h-full flex-col overflow-hidden rounded-4xl",
          variant.container,
          "shadow-[0_18px_48px_rgba(0,0,0,0.36)] transition-shadow duration-300",
          "group-hover:shadow-[0_24px_56px_rgba(0,0,0,0.45),0_0_40px_-12px_rgba(240,90,40,0.12)] group-focus-within:shadow-[0_24px_56px_rgba(0,0,0,0.45),0_0_40px_-12px_rgba(240,90,40,0.12)]",
          size === "lg" && "border border-[#F05A28]/12"
        )}
      >
        <span
          className={cn(
            "absolute left-6 top-0 z-1 block h-0.5 w-10 rounded-full bg-linear-to-r from-[#F05A28]/85 to-[#F05A28]/10 transition-[width,opacity] duration-300 ease-out group-hover:w-20 group-hover:opacity-100 group-focus-within:w-20 group-focus-within:opacity-100 md:left-8",
            size === "lg" && "w-14 group-hover:w-28 group-focus-within:w-28"
          )}
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_0%_0%,rgba(240,90,40,0.06),transparent_50%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100",
            size === "lg" && "bg-[radial-gradient(70%_50%_at_0%_0%,rgba(240,90,40,0.1),transparent_55%)]"
          )}
          aria-hidden
        />

        <div className="relative z-2 flex flex-wrap items-center gap-2">
          <p className="meta-label-accent">{PROJECT_TYPE_LABELS[caseStudy.projectType]}</p>
          <span
            className="rounded-full border border-[#F5F4F0]/14 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#F5F4F0]/55"
            title="Outcome lens"
          >
            {outcomeLabel}
          </span>
          {size === "lg" ? (
            <span className="rounded-full border border-[#0FD9C8]/35 bg-[#0FD9C8]/10 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#0FD9C8]">
              Featured outcome
            </span>
          ) : null}
        </div>
        <span className="sr-only">Reference {caseStudy.slug}</span>

        <div className="relative z-2 tech-divider mt-5" />

        <p
          className={cn(
            "relative z-2 font-display font-semibold tracking-[-0.02em] text-[#0FD9C8]",
            variant.headline
          )}
        >
          {caseStudy.outcomeHeadline}
        </p>

        {caseStudy.primarySimilaritySummary ? (
          <p
            className={cn("relative z-2 mt-3 text-[#F5F4F0]/60", size === "lg" ? "text-base" : "text-sm")}
          >
            {caseStudy.primarySimilaritySummary}
          </p>
        ) : null}

        <div className="relative z-2 tech-divider my-5 max-w-md" />

        <p className={cn("relative z-2 flex-1 text-[#F5F4F0]/74", variant.summary)}>
          {caseStudy.resultSummary}
        </p>

        <p className="relative z-2 mt-6 text-xs text-[#F5F4F0]/52">{buildContextLine}</p>
        <p className="relative z-2 mt-2 text-xs text-[#F5F4F0]/36">Client context: {contextLine}</p>

        {renderSystems ? (
          <div className="relative z-2 mt-4 flex flex-wrap gap-2">
            {caseStudy.systemsBuilt.map((system) => (
              <span
                key={system}
                className="rounded-md border border-[#F5F4F0]/12 bg-[#0C0C0E]/35 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#F5F4F0]/58 motion-safe:transition-colors motion-safe:duration-200 group-hover:border-[#0FD9C8]/22 group-hover:text-[#F5F4F0]/72 group-focus-within:border-[#0FD9C8]/22 group-focus-within:text-[#F5F4F0]/72"
              >
                {system}
              </span>
            ))}
          </div>
        ) : null}

        <span className="ui-link-motion relative z-2 mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#F05A28] duration-200 group-hover:gap-2 group-hover:text-[#ff6d40] group-focus-within:gap-2 group-focus-within:text-[#ff6d40]">
          Read full proof
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5 group-focus-within:translate-x-0.5">
            →
          </span>
        </span>
      </article>
    </Link>
  );
}

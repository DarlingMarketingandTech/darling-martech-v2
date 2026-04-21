import Link from "next/link";
import { caseStudies } from "@/data/work/work-index";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/types";

/** Homepage rail order — anchor case first for hierarchy. */
const RAIL_SLUGS = [
  "graston-technique",
  "primarycare-indy",
  "urgentcare-indy",
  "barbershop-command-center",
  "russell-painting",
] as const;

function getRailCaseStudies(): CaseStudy[] {
  const out: CaseStudy[] = [];
  for (const slug of RAIL_SLUGS) {
    const c = caseStudies.find((s) => s.slug === slug);
    if (c) out.push(c);
  }
  return out;
}

type HomepageProofRailProps = {
  className?: string;
};

export function HomepageProofRail({ className }: HomepageProofRailProps) {
  const studies = getRailCaseStudies();

  return (
    <section
      className={cn(
        "border-y border-[#F5F4F0]/10 bg-[#0e0e12] px-4 py-16 md:px-8 md:py-20",
        "mt-6 md:mt-8",
        className
      )}
      aria-label="Selected client work"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="meta-label text-[#F05A28]/90">Proof in practice</p>
            <h2 className="font-display mt-2 max-w-xl text-balance text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-2xl">
              Representative engagements — not a link farm.
            </h2>
          </div>
          <Link
            href="/proof"
            className="shrink-0 text-sm font-medium text-[#F5F4F0]/55 underline decoration-[#F5F4F0]/18 underline-offset-4 transition-colors hover:text-[#0FD9C8] hover:decoration-[#0FD9C8]/35"
          >
            Full proof index →
          </Link>
        </div>

        <ul
          className={cn(
            "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-pl-4 scroll-pr-4 pb-3 [-ms-overflow-style:none] [scrollbar-width:none]",
            "md:grid md:grid-cols-6 md:gap-4 md:overflow-visible md:scroll-pl-0 md:scroll-pr-0 md:pb-0",
            "[&::-webkit-scrollbar]:hidden"
          )}
        >
          {studies.map((study, index) => (
            <li
              key={study.slug}
              className={cn(
                "min-w-[min(88vw,300px)] shrink-0 snap-center sm:min-w-[min(72vw,280px)] md:min-w-0",
                index === 0 && "md:col-span-2"
              )}
            >
              <RailCard study={study} featured={index === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RailCard({ study, featured }: { study: CaseStudy; featured: boolean }) {
  return (
    <Link
      href={`/proof/${study.slug}`}
      className={cn(
        "group relative isolate block h-full overflow-hidden rounded-2xl border border-[#F5F4F0]/09 bg-[#12121a] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.38)] transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(90%_70%_at_0%_0%,rgba(240,90,40,0.09),transparent_55%)] before:opacity-90 before:transition-opacity before:duration-300 group-hover:before:opacity-100",
        "motion-safe:hover:scale-[1.02] motion-safe:hover:border-[#F5F4F0]/14 motion-safe:hover:shadow-[0_22px_56px_rgba(0,0,0,0.48),0_0_0_1px_rgba(240,90,40,0.06)]",
        featured && "md:rounded-3xl md:p-7 md:before:rounded-3xl md:shadow-[0_20px_56px_rgba(0,0,0,0.42)]"
      )}
    >
      {/* Accent line — width grows on hover */}
      <span
        className="block h-0.5 w-8 rounded-full bg-gradient-to-r from-[#F05A28]/80 to-[#F05A28]/15 transition-[width,opacity] duration-300 ease-out group-hover:w-14 group-hover:opacity-100 md:group-hover:w-20"
        aria-hidden
      />
      <span
        className={cn(
          "mt-4 block font-display font-semibold tracking-[-0.02em] text-[#F5F4F0] transition-colors duration-200 group-hover:text-[#F5F4F0]",
          featured ? "text-lg leading-snug md:text-xl" : "text-base leading-snug"
        )}
      >
        {study.clientName}
      </span>
      <span
        className={cn(
          "mt-2 block text-pretty font-medium leading-snug text-[#F5F4F0]/52 transition-colors duration-200 group-hover:text-[#F5F4F0]/68 line-clamp-2",
          featured ? "text-sm md:text-[0.9375rem]" : "text-xs md:text-sm"
        )}
      >
        {study.heroSubhead}
      </span>
      <span
        className={cn(
          "mt-4 block border-t border-[#F5F4F0]/08 pt-3 font-mono text-[0.7rem] font-semibold leading-snug tracking-wide text-[#0FD9C8]/88 md:text-xs",
          featured && "md:pt-4 md:text-[0.8125rem]"
        )}
      >
        {study.outcomeHeadline}
      </span>
      <span className="mt-3 flex items-center gap-1 text-xs font-medium text-[#F05A28]/90 transition-[gap,color] duration-200 group-hover:gap-1.5 group-hover:text-[#ff6d40]">
        Read proof
        <span aria-hidden className="translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}

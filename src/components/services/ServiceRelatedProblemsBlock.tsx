import Link from "next/link";
import { ArrowUpRight, Orbit } from "lucide-react";
import type { ProblemPage } from "@/types";

type ServiceRelatedProblemsBlockProps = {
  problems: ProblemPage[];
};

export function ServiceRelatedProblemsBlock({ problems }: ServiceRelatedProblemsBlockProps) {
  if (!problems.length) return null;

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-[#F5F4F0]/08 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="meta-label text-[#F05A28]/90">Symptom map</p>
          <h2 className="font-display mt-3 max-w-xl text-balance text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-2xl">
            Buyer problems this service addresses
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-[#F5F4F0]/52">
          Each link opens the full problem hub — same taxonomy used in diagnostics and proof routing.
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {problems.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/problems/${p.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/40 p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#F05A28]/28 hover:shadow-[0_14px_40px_rgba(0,0,0,0.3)] md:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#F5F4F0]/10 bg-[#13131A]/55 text-[#0FD9C8]/85">
                  <Orbit className="h-4 w-4" strokeWidth={1.65} aria-hidden />
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-[#F5F4F0]/25 transition-colors group-hover:text-[#F05A28]/80"
                  aria-hidden
                />
              </div>
              <p className="font-display mt-4 text-lg font-semibold leading-snug tracking-[-0.02em] text-[#F5F4F0] group-hover:text-[#F5F4F0]">
                {p.title}
              </p>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#F5F4F0]/55">{p.heroSubhead}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#F05A28] transition-[gap] duration-200 group-hover:gap-1.5">
                Open problem hub
                <span aria-hidden>→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

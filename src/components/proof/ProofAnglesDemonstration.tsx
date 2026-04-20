import Link from "next/link";
import type { ProofAngle } from "@/types";

type ProofAnglesDemonstrationProps = {
  angles: ProofAngle[];
};

export function ProofAnglesDemonstration({ angles }: ProofAnglesDemonstrationProps) {
  if (!angles.length) return null;

  return (
    <section className="mt-14 border-t border-[#F5F4F0]/8 pt-10" aria-labelledby="proof-angles-heading">
      <p className="meta-label text-[#F05A28]/90">Case study angles</p>
      <h2
        id="proof-angles-heading"
        className="font-display mt-3 max-w-2xl text-balance text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-2xl"
      >
        What this project demonstrates
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/52">
        Each block names the capability first. Figures below are supporting context from the same engagement — not the headline.
      </p>
      <ul className="mt-8 flex flex-col gap-6">
        {angles.map((angle) => (
          <li
            key={angle.id}
            className="rounded-2xl border border-[#F5F4F0]/10 bg-[#13131A]/35 px-5 py-6 md:px-6 md:py-7"
          >
            <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-[#F5F4F0] md:text-xl">
              {angle.title}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#F5F4F0]/64 md:text-[0.9375rem] md:leading-7">
              {angle.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/problems/${angle.problemKey}`}
                className="rounded-full border border-[#F5F4F0]/12 bg-[#0C0C0E]/25 px-3 py-1.5 text-xs font-medium text-[#F5F4F0]/70 transition-colors hover:border-[#0FD9C8]/40 hover:text-[#0FD9C8]"
              >
                Related problem →
              </Link>
              <Link
                href={`/services/${angle.primaryServiceSlug}`}
                className="rounded-full border border-[#F5F4F0]/12 bg-[#0C0C0E]/25 px-3 py-1.5 text-xs font-medium text-[#F5F4F0]/70 transition-colors hover:border-[#F05A28]/40 hover:text-[#F05A28]"
              >
                Related capability →
              </Link>
            </div>

            {angle.metrics.length ? (
              <div className="mt-6 border-t border-[#F5F4F0]/8 pt-5">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#F5F4F0]/38">
                  Referenced outcomes (same engagement)
                </p>
                <dl className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
                  {angle.metrics.slice(0, 2).map((m) => (
                    <div key={`${angle.id}-${m.label}`} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="m-0 text-sm text-[#F5F4F0]/80">
                        <span className="font-semibold tabular-nums tracking-tight text-[#F5F4F0]/90">
                          {m.value}
                        </span>
                        <span className="text-[#F5F4F0]/45"> — {m.label}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

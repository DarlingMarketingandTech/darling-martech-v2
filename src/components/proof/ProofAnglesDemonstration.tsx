import Link from "next/link";
import { MonoMetric } from "@/components/ui/MonoMetric";
import type { ProofAngle } from "@/types";

type ProofAnglesDemonstrationProps = {
  angles: ProofAngle[];
};

export function ProofAnglesDemonstration({ angles }: ProofAnglesDemonstrationProps) {
  if (!angles.length) return null;

  return (
    <section className="mt-14 border-t border-[#F5F4F0]/8 pt-10">
      <p className="meta-label text-[#F05A28]/90">What this project demonstrates</p>
      <div className="tech-divider my-4 max-w-sm" />
      <ul className="mt-6 flex flex-col gap-4">
        {angles.map((angle) => (
          <li
            key={angle.id}
            className="rounded-2xl border border-[#F5F4F0]/10 bg-[#13131A]/40 px-4 py-4 md:px-5 md:py-5"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-base font-semibold text-[#F5F4F0]">{angle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F5F4F0]/62">{angle.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#F5F4F0]/45">
                  <Link
                    href={`/problems/${angle.problemKey}`}
                    className="rounded-full border border-[#F5F4F0]/10 px-2.5 py-1 transition-colors hover:border-[#0FD9C8]/35 hover:text-[#0FD9C8]"
                  >
                    Problem →
                  </Link>
                  <Link
                    href={`/services/${angle.primaryServiceSlug}`}
                    className="rounded-full border border-[#F5F4F0]/10 px-2.5 py-1 transition-colors hover:border-[#F05A28]/35 hover:text-[#F05A28]"
                  >
                    Service →
                  </Link>
                  {angle.toolSlug ? (
                    <Link
                      href={`/tools/${angle.toolSlug}`}
                      className="rounded-full border border-[#F5F4F0]/10 px-2.5 py-1 transition-colors hover:border-[#0FD9C8]/35 hover:text-[#0FD9C8]"
                    >
                      Tool →
                    </Link>
                  ) : null}
                </div>
              </div>
              {angle.metrics.length ? (
                <div className="flex shrink-0 flex-wrap gap-3 md:justify-end">
                  {angle.metrics.slice(0, 2).map((m) => (
                    <div key={`${angle.id}-${m.label}`} className="min-w-[7.5rem]">
                      <MonoMetric value={m.value} label={m.label} animateValue={false} />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

import Link from "next/link";
import type { ProofAngle } from "@/types";

type ProblemProofAnglesProps = {
  angles: ProofAngle[];
  /** Parent case study titles keyed by `CaseStudy.slug` */
  parentTitles: ReadonlyMap<string, string>;
  /** Ties proof list to the active problem narrative (conversion framing). */
  connectLead?: string;
};

export function ProblemProofAngles({ angles, parentTitles, connectLead }: ProblemProofAnglesProps) {
  if (!angles.length) return null;

  return (
    <section aria-label="Proof angles for this problem">
      <p className="meta-label text-[#F05A28]/90">Where this shows up in real systems</p>
      <div className="tech-divider my-4 max-w-md" />
      {connectLead ? (
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/72">{connectLead}</p>
      ) : null}
      <ul className="mt-4 divide-y divide-[#F5F4F0]/8 overflow-hidden rounded-2xl border border-[#F5F4F0]/10 bg-[#13131A]/35">
        {angles.map((angle) => {
          const parentTitle = parentTitles.get(angle.parentProjectSlug) ?? "Case study";
          return (
            <li key={angle.id}>
              <Link
                href={`/proof/${angle.parentProjectSlug}`}
                className="group block px-4 py-3.5 transition-colors hover:bg-[#13131A]/80 md:px-5 md:py-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5F4F0]/42">
                  Proof · {parentTitle}
                </p>
                <p className="mt-1.5 font-display text-sm font-semibold leading-snug text-[#F5F4F0] transition-colors group-hover:text-[#0FD9C8]">
                  {angle.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#F5F4F0]/55 line-clamp-2">{angle.summary}</p>
                <p className="mt-2.5 text-xs font-medium text-[#F05A28] underline-offset-4 group-hover:underline">
                  Open proof →
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

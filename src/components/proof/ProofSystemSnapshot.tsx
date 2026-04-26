import type { CaseStudy } from "@/types";

type ProofSystemSnapshotProps = {
  caseStudy: CaseStudy;
};

export function ProofSystemSnapshot({ caseStudy }: ProofSystemSnapshotProps) {
  const beforeItems = caseStudy.whatWasBroken?.slice(0, 2) ?? [];
  const buildItems = caseStudy.buildSections?.slice(0, 2) ?? [];
  const constraintItems = caseStudy.decisionTags?.slice(0, 3) ?? [];

  const hasContent =
    beforeItems.length > 0 ||
    buildItems.length > 0 ||
    Boolean(caseStudy.operatingImpact ?? caseStudy.outcomeHeadline) ||
    constraintItems.length > 0;

  if (!hasContent) return null;

  return (
    <section className="mt-14" aria-labelledby="proof-system-snapshot-heading">
      <p className="meta-label text-[#F05A28]/90">Project snapshot</p>
      <h2
        id="proof-system-snapshot-heading"
        className="font-display mt-3 max-w-2xl text-balance text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-2xl"
      >
        Before, build, and operating change
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/54">
        A lightweight view of the problem, the intervention, and what changed after the system shipped.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {beforeItems.length > 0 ? (
          <div className="rounded-2xl border border-[#F5F4F0]/10 bg-[#13131A]/35 px-5 py-5">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#F05A28]/92">
              Before / Problem
            </p>
            <ul className="mt-4 space-y-2">
              {beforeItems.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-[#F5F4F0]/68">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {buildItems.length > 0 ? (
          <div className="rounded-2xl border border-[#F5F4F0]/10 bg-[#13131A]/35 px-5 py-5">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#0FD9C8]/92">
              Build / Fix
            </p>
            <ul className="mt-4 space-y-3">
              {buildItems.map((item) => (
                <li key={item.title}>
                  <p className="text-sm font-semibold text-[#F5F4F0]">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#F5F4F0]/62">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="rounded-2xl border border-[#F5F4F0]/10 bg-[#13131A]/35 px-5 py-5">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#F5F4F0]/58">
            After / Outcome
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#F5F4F0]/68">
            {caseStudy.operatingImpact ?? caseStudy.outcomeHeadline}
          </p>

          {constraintItems.length > 0 ? (
            <>
              <div className="tech-divider my-4 max-w-sm" />
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#F5F4F0]/42">
                Constraints handled
              </p>
              <ul className="mt-3 space-y-2">
                {constraintItems.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-[#F5F4F0]/62">
                    {item}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

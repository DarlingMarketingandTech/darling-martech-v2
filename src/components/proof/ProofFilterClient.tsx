"use client";

import { useMemo, useState } from "react";
import { ProofGrid } from "@/components/proof/ProofGrid";
import { OUTCOME_SLUG_LABELS, OUTCOME_SLUG_ORDER } from "@/data/taxonomy";
import { cn } from "@/lib/utils";
import type { CaseStudy, OutcomeSlug } from "@/types";

type ActiveFilter = "all" | OutcomeSlug;

type ProofFilterClientProps = {
  caseStudies: CaseStudy[];
};

function countBySlug(studies: CaseStudy[], slug: OutcomeSlug): number {
  return studies.filter((c) => c.primaryOutcomeSlug === slug).length;
}

export function ProofFilterClient({ caseStudies }: ProofFilterClientProps) {
  const [active, setActive] = useState<ActiveFilter>("all");

  const filtered = useMemo(() => {
    if (active === "all") return caseStudies;
    return caseStudies.filter((c) => c.primaryOutcomeSlug === active);
  }, [active, caseStudies]);

  const slugCounts = useMemo(() => {
    const record = {} as Record<OutcomeSlug, number>;
    for (const slug of OUTCOME_SLUG_ORDER) {
      record[slug] = countBySlug(caseStudies, slug);
    }
    return record;
  }, [caseStudies]);

  return (
    <>
      <div className="sticky top-[64px] z-40 -mx-6 border-b border-[#F5F4F0]/8 bg-[#0C0C0E]/95 px-6 py-3 backdrop-blur-sm md:-mx-12 md:px-12">
        <div className="flex gap-6 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <FilterPill
            label="All outcomes"
            count={caseStudies.length}
            isActive={active === "all"}
            onSelect={() => setActive("all")}
          />
          {OUTCOME_SLUG_ORDER.map((slug) => (
            <FilterPill
              key={slug}
              label={OUTCOME_SLUG_LABELS[slug]}
              count={slugCounts[slug]}
              isActive={active === slug}
              onSelect={() => setActive(slug)}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <ProofGrid caseStudies={filtered} />
      </div>
    </>
  );
}

function FilterPill({
  label,
  count,
  isActive,
  onSelect,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex shrink-0 items-center gap-2 border-b-2 pb-2 text-left text-sm transition-colors",
        isActive
          ? "border-[#F05A28] font-bold text-[#F5F4F0]"
          : "border-transparent font-normal text-[#F5F4F0]/50 hover:text-[#F5F4F0]/70"
      )}
    >
      <span className="whitespace-nowrap">{label}</span>
      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-xs tabular-nums",
          isActive ? "bg-[#F05A28]/20 text-[#F5F4F0]" : "bg-[#F5F4F0]/10 text-[#F5F4F0]/55"
        )}
      >
        {count}
      </span>
    </button>
  );
}

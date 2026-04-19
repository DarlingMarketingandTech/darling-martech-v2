import Link from "next/link";
import { OUTCOME_SLUG_LABELS, OUTCOME_SLUG_ORDER } from "@/data/taxonomy";
import type { OutcomeSlug } from "@/types";

type ProofOutcomeFiltersProps = {
  activeSlug: OutcomeSlug | null;
};

export function ProofOutcomeFilters({ activeSlug }: ProofOutcomeFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <FilterChip href="/proof" label="All outcomes" isActive={activeSlug === null} />
      {OUTCOME_SLUG_ORDER.map((slug) => (
        <FilterChip
          key={slug}
          href={`/proof?outcome=${slug}`}
          label={OUTCOME_SLUG_LABELS[slug]}
          isActive={activeSlug === slug}
        />
      ))}
    </div>
  );
}

function FilterChip({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
        isActive
          ? "border-[#F05A28] bg-[#F05A28]/15 text-[#F5F4F0]"
          : "border-[#F5F4F0]/12 text-[#F5F4F0]/65 hover:border-[#F5F4F0]/25 hover:text-[#F5F4F0]"
      }`}
    >
      {label}
    </Link>
  );
}

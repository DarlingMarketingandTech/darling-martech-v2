"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Search, X } from "lucide-react";
import { ProofGrid } from "@/components/proof/ProofGrid";
import {
  BUYER_SCENARIO_LABELS,
  BUYER_SCENARIO_ORDER,
  OUTCOME_SLUG_LABELS,
  OUTCOME_SLUG_ORDER,
  OUTCOME_TAGS,
  PROJECT_COMPLEXITY_LABELS,
  PROJECT_COMPLEXITY_ORDER,
  PROJECT_TYPE_LABELS,
  PROJECT_TYPE_ORDER,
  SCOPE_SHAPE_LABELS,
  SCOPE_SHAPE_ORDER,
} from "@/data/taxonomy";
import {
  applyFacets,
  buildProofSearchIndex,
  PROOF_SORT_OPTIONS,
  searchProofIndex,
  sortCaseStudies,
  type ProofSearchIndex,
  type ProofSortMode,
} from "@/lib/proof-search";
import { cn } from "@/lib/utils";
import type {
  BuyerScenarioId,
  CaseStudy,
  OutcomeSlug,
  OutcomeTag,
  ProjectComplexity,
  ProjectTypeId,
  ScopeShape,
} from "@/types";

type ProofFilterClientProps = {
  caseStudies: CaseStudy[];
};

function countByOutcome(studies: CaseStudy[], slug: OutcomeSlug): number {
  return studies.filter((c) => c.primaryOutcomeSlug === slug).length;
}

function countByOutcomeTag(studies: CaseStudy[], tag: OutcomeTag): number {
  return studies.filter((c) => c.outcomeTags.includes(tag)).length;
}

function countByProjectType(studies: CaseStudy[], id: ProjectTypeId): number {
  return studies.filter((c) => c.projectType === id).length;
}

function countByBuyerScenario(studies: CaseStudy[], id: BuyerScenarioId): number {
  return studies.filter((c) => c.buyerScenario === id).length;
}

function countByComplexity(studies: CaseStudy[], id: ProjectComplexity): number {
  return studies.filter((c) => c.projectComplexity === id).length;
}

function countByScope(studies: CaseStudy[], id: ScopeShape): number {
  return studies.filter((c) => c.scopeShape === id).length;
}

export function ProofFilterClient({ caseStudies }: ProofFilterClientProps) {
  const [query, setQuery] = useState("");
  const [outcomes, setOutcomes] = useState<Set<OutcomeSlug>>(new Set());
  const [tags, setTags] = useState<Set<OutcomeTag>>(new Set());
  const [projectTypes, setProjectTypes] = useState<Set<ProjectTypeId>>(new Set());
  const [buyerScenarios, setBuyerScenarios] = useState<Set<BuyerScenarioId>>(new Set());
  const [complexity, setComplexity] = useState<Set<ProjectComplexity>>(new Set());
  const [scopeShapes, setScopeShapes] = useState<Set<ScopeShape>>(new Set());
  const [sortMode, setSortMode] = useState<ProofSortMode>("default");
  const [searchIndex, setSearchIndex] = useState<ProofSearchIndex | null>(null);
  const [searchSlugs, setSearchSlugs] = useState<Set<string> | null>(null);

  const defaultRanks = useMemo(() => {
    const map = new Map<string, number>();
    caseStudies.forEach((study, index) => map.set(study.slug, index));
    return map;
  }, [caseStudies]);

  useEffect(() => {
    let cancelled = false;
    void buildProofSearchIndex(caseStudies).then((index) => {
      if (!cancelled) setSearchIndex(index);
    });
    return () => {
      cancelled = true;
    };
  }, [caseStudies]);

  useEffect(() => {
    if (!searchIndex) return;
    let cancelled = false;
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSearchSlugs(null);
      return;
    }
    const handle = window.setTimeout(() => {
      void searchProofIndex(searchIndex, trimmed).then((slugs) => {
        if (!cancelled) setSearchSlugs(slugs);
      });
    }, 90);
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [query, searchIndex]);

  const filtered = useMemo(() => {
    let next = caseStudies;
    if (searchSlugs) {
      next = next.filter((study) => searchSlugs.has(study.slug));
    }
    next = applyFacets(next, {
      outcomes,
      outcomeTags: tags,
      projectTypes,
      buyerScenarios,
      complexity,
      scopeShapes,
    });
    return sortCaseStudies(next, sortMode, defaultRanks);
  }, [
    caseStudies,
    defaultRanks,
    outcomes,
    searchSlugs,
    sortMode,
    tags,
    projectTypes,
    buyerScenarios,
    complexity,
    scopeShapes,
  ]);

  const outcomeCounts = useMemo(() => {
    const record = {} as Record<OutcomeSlug, number>;
    for (const slug of OUTCOME_SLUG_ORDER) {
      record[slug] = countByOutcome(caseStudies, slug);
    }
    return record;
  }, [caseStudies]);

  const tagCounts = useMemo(() => {
    const record = {} as Record<OutcomeTag, number>;
    for (const tag of OUTCOME_TAGS) {
      record[tag] = countByOutcomeTag(caseStudies, tag);
    }
    return record;
  }, [caseStudies]);

  const projectTypeCounts = useMemo(() => {
    const record = {} as Record<ProjectTypeId, number>;
    for (const id of PROJECT_TYPE_ORDER) {
      record[id] = countByProjectType(caseStudies, id);
    }
    return record;
  }, [caseStudies]);

  const buyerScenarioCounts = useMemo(() => {
    const record = {} as Record<BuyerScenarioId, number>;
    for (const id of BUYER_SCENARIO_ORDER) {
      record[id] = countByBuyerScenario(caseStudies, id);
    }
    return record;
  }, [caseStudies]);

  const complexityCounts = useMemo(() => {
    const record = {} as Record<ProjectComplexity, number>;
    for (const id of PROJECT_COMPLEXITY_ORDER) {
      record[id] = countByComplexity(caseStudies, id);
    }
    return record;
  }, [caseStudies]);

  const scopeCounts = useMemo(() => {
    const record = {} as Record<ScopeShape, number>;
    for (const id of SCOPE_SHAPE_ORDER) {
      record[id] = countByScope(caseStudies, id);
    }
    return record;
  }, [caseStudies]);

  const hasActiveFilter =
    outcomes.size > 0 ||
    tags.size > 0 ||
    projectTypes.size > 0 ||
    buyerScenarios.size > 0 ||
    complexity.size > 0 ||
    scopeShapes.size > 0 ||
    query.trim().length >= 2 ||
    sortMode !== "default";

  function toggleOutcome(slug: OutcomeSlug) {
    setOutcomes((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  function toggleTag(tag: OutcomeTag) {
    setTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

  function resetAll() {
    setQuery("");
    setOutcomes(new Set());
    setTags(new Set());
    setProjectTypes(new Set());
    setBuyerScenarios(new Set());
    setComplexity(new Set());
    setScopeShapes(new Set());
    setSortMode("default");
  }

  function toggleProjectType(id: ProjectTypeId) {
    setProjectTypes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleBuyerScenario(id: BuyerScenarioId) {
    setBuyerScenarios((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleComplexity(id: ProjectComplexity) {
    setComplexity((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleScope(id: ScopeShape) {
    setScopeShapes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      <div className="sticky top-[64px] z-40 -mx-6 border-b border-[#F5F4F0]/10 bg-[#0C0C0E] px-6 py-4 shadow-[inset_0_1px_0_0_rgba(245,244,240,0.06)] md:-mx-12 md:px-12">
        <SearchInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery("")}
          totalCount={caseStudies.length}
          visibleCount={filtered.length}
          isReady={searchIndex !== null}
        />

        <div
          role="group"
          aria-label="Filter by project type"
          className="mt-4 flex gap-6 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <FilterPill
            label="All project types"
            count={caseStudies.length}
            isActive={projectTypes.size === 0}
            onSelect={() => setProjectTypes(new Set())}
          />
          {PROJECT_TYPE_ORDER.map((id) => (
            <FilterPill
              key={id}
              label={PROJECT_TYPE_LABELS[id]}
              count={projectTypeCounts[id]}
              isActive={projectTypes.has(id)}
              onSelect={() => toggleProjectType(id)}
            />
          ))}
        </div>

        <div
          role="group"
          aria-label="Filter by outcome lens"
          className="mt-4 flex gap-6 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <FilterPill
            label="All outcomes"
            count={caseStudies.length}
            isActive={outcomes.size === 0}
            onSelect={() => setOutcomes(new Set())}
          />
          {OUTCOME_SLUG_ORDER.map((slug) => (
            <FilterPill
              key={slug}
              label={OUTCOME_SLUG_LABELS[slug]}
              count={outcomeCounts[slug]}
              isActive={outcomes.has(slug)}
              onSelect={() => toggleOutcome(slug)}
            />
          ))}
        </div>

        <details className="mt-3 group/situation">
          <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5F4F0]/45 transition-colors hover:text-[#F5F4F0]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0E] [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-3">
              Buyer situation, complexity &amp; scope
              {buyerScenarios.size + complexity.size + scopeShapes.size > 0 ? (
                <span className="rounded-full bg-[#0FD9C8]/12 px-2 py-0.5 font-mono text-[10px] tabular-nums text-[#F5F4F0]">
                  {buyerScenarios.size + complexity.size + scopeShapes.size}
                </span>
              ) : null}
            </span>
            <span aria-hidden className="transition-transform duration-200 group-open/situation:rotate-90">
              ▸
            </span>
          </summary>
          <div className="mt-3 space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#F5F4F0]/38">Buyer situation</p>
            <div className="flex flex-wrap gap-2">
              {BUYER_SCENARIO_ORDER.map((id) => (
                <TagChip
                  key={id}
                  label={BUYER_SCENARIO_LABELS[id]}
                  count={buyerScenarioCounts[id]}
                  isActive={buyerScenarios.has(id)}
                  onSelect={() => toggleBuyerScenario(id)}
                />
              ))}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#F5F4F0]/38">Complexity</p>
            <div className="flex flex-wrap gap-2">
              {PROJECT_COMPLEXITY_ORDER.map((id) => (
                <TagChip
                  key={id}
                  label={PROJECT_COMPLEXITY_LABELS[id]}
                  count={complexityCounts[id]}
                  isActive={complexity.has(id)}
                  onSelect={() => toggleComplexity(id)}
                />
              ))}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#F5F4F0]/38">Scope shape</p>
            <div className="flex flex-wrap gap-2">
              {SCOPE_SHAPE_ORDER.map((id) => (
                <TagChip
                  key={id}
                  label={SCOPE_SHAPE_LABELS[id]}
                  count={scopeCounts[id]}
                  isActive={scopeShapes.has(id)}
                  onSelect={() => toggleScope(id)}
                />
              ))}
            </div>
          </div>
        </details>

        <details className="mt-3 group/facets">
          <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5F4F0]/45 transition-colors hover:text-[#F5F4F0]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0E] [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-3">
              System tags
              {tags.size > 0 ? (
                <span className="rounded-full bg-[#F05A28]/18 px-2 py-0.5 font-mono text-[10px] tabular-nums text-[#F5F4F0]">
                  {tags.size}
                </span>
              ) : null}
            </span>
            <span aria-hidden className="transition-transform duration-200 group-open/facets:rotate-90">
              ▸
            </span>
          </summary>
          <div className="mt-3 flex flex-wrap gap-2">
            {OUTCOME_TAGS.map((tag) => (
              <TagChip
                key={tag}
                label={tag}
                count={tagCounts[tag]}
                isActive={tags.has(tag)}
                onSelect={() => toggleTag(tag)}
              />
            ))}
          </div>
        </details>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#F5F4F0]/8 pt-3">
          <SortControl value={sortMode} onChange={setSortMode} />
          <div className="flex items-center gap-3">
            <p
              aria-live="polite"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5F4F0]/45"
            >
              <span className="tabular-nums text-[#F5F4F0]/82">{filtered.length}</span>{" "}
              of {caseStudies.length} proofs
            </p>
            {hasActiveFilter ? (
              <button
                type="button"
                onClick={resetAll}
                className="rounded-full border border-[#F5F4F0]/12 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#F5F4F0]/68 transition-colors hover:border-[#F05A28]/45 hover:text-[#F05A28] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0E]"
              >
                Reset
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-10">
        {filtered.length > 0 ? (
          <ProofGrid caseStudies={filtered} weighted />
        ) : (
          <EmptyState onReset={resetAll} />
        )}
      </div>
    </>
  );
}

type SearchInputProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  totalCount: number;
  visibleCount: number;
  isReady: boolean;
};

function SearchInput({ value, onChange, onClear, totalCount, visibleCount, isReady }: SearchInputProps) {
  return (
    <div className="relative flex items-center gap-3 rounded-2xl border border-[#F5F4F0]/12 bg-[#13131A]/55 px-4 py-3 transition-colors focus-within:border-[#F05A28]/45">
      <Search className="h-4 w-4 shrink-0 text-[#F5F4F0]/45" aria-hidden strokeWidth={2} />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={
          isReady
            ? "Search by project type, system build, outcome…"
            : "Loading proof index…"
        }
        aria-label="Search proof"
        spellCheck={false}
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent text-sm text-[#F5F4F0] placeholder:text-[#F5F4F0]/38 focus:outline-none"
      />
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-[#F5F4F0]/38 sm:inline-block">
        <span className="tabular-nums text-[#F5F4F0]/72">{visibleCount}</span>
        <span className="px-1 text-[#F5F4F0]/30">/</span>
        <span className="tabular-nums">{totalCount}</span>
      </span>
      {value.length > 0 ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#F5F4F0]/15 text-[#F5F4F0]/65 transition-colors hover:border-[#F05A28]/45 hover:text-[#F05A28] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0E]"
        >
          <X className="h-3.5 w-3.5" aria-hidden strokeWidth={2.2} />
        </button>
      ) : null}
    </div>
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
      aria-pressed={isActive}
      className={cn(
        "flex shrink-0 items-center gap-2 border-b-2 pb-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0E]",
        isActive
          ? "border-[#F05A28] font-semibold text-[#F5F4F0]"
          : "border-transparent font-normal text-[#F5F4F0]/50 hover:text-[#F5F4F0]/72"
      )}
    >
      <span className="whitespace-nowrap">{label}</span>
      <span
        className={cn(
          "rounded-full px-2 py-0.5 font-mono text-[11px] font-medium tabular-nums tracking-tight",
          isActive ? "bg-[#F05A28]/18 text-[#F5F4F0]" : "bg-[#F5F4F0]/08 text-[#F5F4F0]/52"
        )}
      >
        {count}
      </span>
    </button>
  );
}

function TagChip({
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
      aria-pressed={isActive}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0E]",
        isActive
          ? "border-[#0FD9C8]/55 bg-[#0FD9C8]/10 text-[#F5F4F0]"
          : "border-[#F5F4F0]/12 bg-[#0C0C0E]/35 text-[#F5F4F0]/62 hover:border-[#F5F4F0]/24 hover:text-[#F5F4F0]/85"
      )}
    >
      <span>{label}</span>
      <span className="tabular-nums text-[#F5F4F0]/55">{count}</span>
    </button>
  );
}

function SortControl({
  value,
  onChange,
}: {
  value: ProofSortMode;
  onChange: (mode: ProofSortMode) => void;
}) {
  return (
    <label className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5F4F0]/45">
      <span>Sort</span>
      <span className="relative inline-flex items-center">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as ProofSortMode)}
          className="appearance-none rounded-full border border-[#F5F4F0]/12 bg-[#13131A]/55 py-1.5 pl-3 pr-7 font-mono text-[10px] uppercase tracking-[0.14em] text-[#F5F4F0]/82 transition-colors hover:border-[#F5F4F0]/24 focus-visible:border-[#F05A28]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0E]"
        >
          {PROOF_SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#13131A] text-[#F5F4F0]">
              {option.label}
            </option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute right-2 text-[10px] text-[#F5F4F0]/55">
          ▾
        </span>
      </span>
    </label>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#F5F4F0]/15 bg-[#13131A]/35 px-6 py-12 text-center">
      <p className="meta-label text-[#F05A28]/90">No proof matches</p>
      <p className="font-display mx-auto mt-3 max-w-md text-balance text-lg font-semibold text-[#F5F4F0] md:text-xl">
        Try a broader query or clear a few filters to widen the lens.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#F05A28] px-5 py-2 text-sm font-semibold text-[#0C0C0E] transition-colors hover:bg-[#ff6d40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0E]"
      >
        Reset filters
      </button>
    </div>
  );
}

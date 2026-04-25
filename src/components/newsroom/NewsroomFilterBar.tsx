"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import { cn } from "@/lib/utils";

export type NewsroomFilterState = {
  category?: string;
  tag?: string;
  proof?: string;
  problem?: string;
  service?: string;
  process?: "1";
};

type SlugOption = { slug: string; label: string };

type NewsroomFilterBarProps = {
  categories: string[];
  tags: string[];
  proofOptions: SlugOption[];
  problemOptions: SlugOption[];
  serviceOptions: SlugOption[];
  initial: NewsroomFilterState;
};

function buildHref(next: NewsroomFilterState): string {
  const params = new URLSearchParams();
  if (next.category) params.set("category", next.category);
  if (next.tag) params.set("tag", next.tag);
  if (next.proof) params.set("proof", next.proof);
  if (next.problem) params.set("problem", next.problem);
  if (next.service) params.set("service", next.service);
  if (next.process === "1") params.set("process", "1");
  const q = params.toString();
  return q ? `/newsroom?${q}` : "/newsroom";
}

const selectShell =
  "w-full appearance-none rounded-2xl border border-[#F5F4F0]/12 bg-[#0C0C0E]/80 px-4 py-3 pr-11 text-sm text-[#F5F4F0]/88 shadow-[inset_0_1px_0_rgba(245,244,240,0.04)] outline-none transition-[border-color,box-shadow] " +
  "hover:border-[#F5F4F0]/18 focus:border-[#F05A28]/45 focus:ring-2 focus:ring-[#F05A28]/20";

const labelClass =
  "mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F5F4F0]/42";

type FieldKey = keyof NewsroomFilterState;

export function NewsroomFilterBar({
  categories,
  tags,
  proofOptions,
  problemOptions,
  serviceOptions,
  initial,
}: NewsroomFilterBarProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const patch = useCallback(
    (key: FieldKey, value: string) => {
      const next: NewsroomFilterState = { ...initial };
      if (key === "process") {
        next.process = value === "1" ? "1" : undefined;
      } else if (key === "category") {
        next.category = value || undefined;
      } else if (key === "tag") {
        next.tag = value || undefined;
      } else if (key === "proof") {
        next.proof = value || undefined;
      } else if (key === "problem") {
        next.problem = value || undefined;
      } else if (key === "service") {
        next.service = value || undefined;
      }
      startTransition(() => {
        router.push(buildHref(next));
      });
    },
    [initial, router]
  );

  const hasAny = useMemo(
    () =>
      Boolean(
        initial.category ||
          initial.tag ||
          initial.proof ||
          initial.problem ||
          initial.service ||
          initial.process
      ),
    [initial]
  );

  return (
    <div
      className={cn(
        "surface-card grain-mask rounded-[2rem] border border-[#F5F4F0]/8 p-6 md:p-8",
        pending && "pointer-events-none opacity-[0.88]"
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold tracking-[-0.03em] text-[#F5F4F0]">Refine</p>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#F5F4F0]/48">
            Narrow the list. Each control updates the URL so views stay shareable.
          </p>
        </div>
        {hasAny ? (
          <button
            type="button"
            onClick={() => startTransition(() => router.push("/newsroom"))}
            className="shrink-0 self-start rounded-full border border-[#F5F4F0]/14 px-4 py-2 text-xs font-medium text-[#F05A28] transition-colors hover:border-[#F05A28]/35 hover:text-[#ff6d40] sm:self-auto"
          >
            Reset
          </button>
        ) : null}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="nr-topic" className={labelClass}>
            Topic
          </label>
          <div className="relative mt-2">
            <select
              id="nr-topic"
              className={selectShell}
              value={initial.category ?? ""}
              onChange={(e) => patch("category", e.target.value)}
            >
              <option value="">Any</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r border-[#F5F4F0]/45"
              aria-hidden
            />
          </div>
        </div>

        <div>
          <label htmlFor="nr-tag" className={labelClass}>
            Tag
          </label>
          <div className="relative mt-2">
            <select
              id="nr-tag"
              className={selectShell}
              value={initial.tag ?? ""}
              onChange={(e) => patch("tag", e.target.value)}
            >
              <option value="">Any</option>
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r border-[#F5F4F0]/45"
              aria-hidden
            />
          </div>
        </div>

        <div>
          <label htmlFor="nr-proof" className={labelClass}>
            Proof
          </label>
          <div className="relative mt-2">
            <select
              id="nr-proof"
              className={selectShell}
              value={initial.proof ?? ""}
              onChange={(e) => patch("proof", e.target.value)}
            >
              <option value="">Any</option>
              {proofOptions.map((o) => (
                <option key={o.slug} value={o.slug}>
                  {o.label}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r border-[#F5F4F0]/45"
              aria-hidden
            />
          </div>
        </div>

        <div>
          <label htmlFor="nr-problem" className={labelClass}>
            Problem
          </label>
          <div className="relative mt-2">
            <select
              id="nr-problem"
              className={selectShell}
              value={initial.problem ?? ""}
              onChange={(e) => patch("problem", e.target.value)}
            >
              <option value="">Any</option>
              {problemOptions.map((o) => (
                <option key={o.slug} value={o.slug}>
                  {o.label}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r border-[#F5F4F0]/45"
              aria-hidden
            />
          </div>
        </div>

        <div>
          <label htmlFor="nr-service" className={labelClass}>
            Service
          </label>
          <div className="relative mt-2">
            <select
              id="nr-service"
              className={selectShell}
              value={initial.service ?? ""}
              onChange={(e) => patch("service", e.target.value)}
            >
              <option value="">Any</option>
              {serviceOptions.map((o) => (
                <option key={o.slug} value={o.slug}>
                  {o.label}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r border-[#F5F4F0]/45"
              aria-hidden
            />
          </div>
        </div>

        <div>
          <label htmlFor="nr-process" className={labelClass}>
            Process
          </label>
          <div className="relative mt-2">
            <select
              id="nr-process"
              className={selectShell}
              value={initial.process === "1" ? "1" : ""}
              onChange={(e) => patch("process", e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">Linked</option>
            </select>
            <span
              className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-r border-[#F5F4F0]/45"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}

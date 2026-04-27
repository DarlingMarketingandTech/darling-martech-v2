import type {
  PlatformCapabilityCategory,
  PlatformSlug,
  ProofStackGroupId,
  ServiceCluster,
} from "@/types";
import { Boxes } from "lucide-react";
import {
  HOMEPAGE_CAPABILITY_SHORTLIST,
  PLATFORM_ASSET_MAP,
  PLATFORM_CAPABILITY_CATEGORY_ORDER,
  PLATFORM_CAPABILITY_CATEGORIES,
  PLATFORM_SLUGS_BY_CATEGORY,
  PROOF_STACK_GROUP_ORDER,
  PROOF_STACK_GROUPS,
  SERVICE_ECOSYSTEM_BY_SERVICE,
} from "@/data/platform-capabilities";
import { BandSection } from "@/components/layout/BandSection";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

const chipClassName =
  "group inline-flex items-center gap-1.5 rounded-md border border-[#F5F4F0]/[0.07] bg-[#F5F4F0]/[0.02] px-2 py-1 text-[10px] text-[#F5F4F0]/72";

const categoryPanelClassName =
  "rounded-xl border border-[#F5F4F0]/[0.08] bg-[#0A0A0D]/42 p-3 md:p-3.5";

const categoryHeaderClassName =
  "meta-label text-[10px] tracking-[0.12em] text-[#F5F4F0]/68";

const proofStackLayerChipClassName =
  "inline-flex items-center rounded-md border border-[#F5F4F0]/[0.07] bg-[#F5F4F0]/[0.02] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#F5F4F0]/58";

function getPlatform(slug: PlatformSlug) {
  return PLATFORM_ASSET_MAP[slug as keyof typeof PLATFORM_ASSET_MAP];
}

function getCuratedPlatforms(slugs: PlatformSlug[]) {
  const seen = new Set<PlatformSlug>();
  const curated = [];

  for (const slug of slugs) {
    if (seen.has(slug)) {
      continue;
    }
    seen.add(slug);
    const platform = getPlatform(slug);
    if (platform) {
      curated.push(platform);
    }
  }

  return curated;
}

function PlatformChip({ slug }: { slug: PlatformSlug }) {
  const platform = getPlatform(slug);
  if (!platform) {
    return null;
  }

  return (
    <li aria-label={platform.label}>
      <span className={chipClassName}>
        <span className="relative h-3.5 w-3.5 shrink-0 overflow-hidden rounded-[2px] bg-transparent">
          <CloudinaryImage
            publicId={platform.cloudinaryPublicId}
            alt={`${platform.label} logo`}
            width={20}
            height={20}
            className="h-full w-full object-contain grayscale opacity-70 transition duration-200 group-hover:grayscale-0 group-hover:opacity-100"
          />
        </span>
        <span className="leading-none">{platform.label}</span>
      </span>
    </li>
  );
}

export function HomepageCapabilityModule() {
  return (
    <BandSection className="mt-14">
      <p className="meta-label text-[#F05A28]/88">Systems I Build Across</p>
      <h2 className="font-display mt-3 text-2xl font-semibold tracking-[-0.01em] text-[#F5F4F0] md:text-[2rem]">
        Platforms, infrastructure, and tools I work in.
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#F5F4F0]/62 md:text-[15px]">
        Production shortlist grouped by capability function. This is an implementation reference, not a
        sponsorship or endorsement list.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {PLATFORM_CAPABILITY_CATEGORY_ORDER.map((category) => {
          const shortlisted = PLATFORM_SLUGS_BY_CATEGORY[category].filter((slug) =>
            HOMEPAGE_CAPABILITY_SHORTLIST.includes(slug)
          );
          if (!shortlisted.length) {
            return null;
          }

          return (
            <section key={category} className={categoryPanelClassName}>
              <p className={categoryHeaderClassName}>{PLATFORM_CAPABILITY_CATEGORIES[category].label}</p>
              <div className="mt-2 h-px w-full bg-[#F5F4F0]/[0.05]" />
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {shortlisted.map((slug) => (
                  <PlatformChip key={slug} slug={slug} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </BandSection>
  );
}

type ProofStackBlockProps = {
  implementationStackCategories?: PlatformCapabilityCategory[];
  implementationPlatformSlugs?: PlatformSlug[];
  implementationLayers?: string[];
  implementationGroupSummary?: Partial<Record<ProofStackGroupId, string>>;
  grouped?: boolean;
};

const LEGACY_CATEGORY_TO_PROOF_GROUP: Record<
  PlatformCapabilityCategory,
  ProofStackGroupId
> = {
  "revenue-crm": "crm-automation",
  "analytics-growth": "analytics-data",
  "infrastructure-platform": "infrastructure-platform",
  "build-workflow-ai": "build-workflow",
};

export function ProofImplementationStackBlock({
  implementationStackCategories,
  implementationPlatformSlugs,
  implementationLayers,
  implementationGroupSummary,
  grouped = true,
}: ProofStackBlockProps) {
  const slugs = implementationPlatformSlugs ?? [];
  const curatedPlatforms = getCuratedPlatforms(slugs);
  const inferredGroups = new Set(curatedPlatforms.map((platform) => platform.proofStackGroup));
  const categoryFallbackGroups = new Set(
    (implementationStackCategories ?? []).map((category) => LEGACY_CATEGORY_TO_PROOF_GROUP[category])
  );
  const summaryGroups = new Set(
    Object.keys(implementationGroupSummary ?? {}) as ProofStackGroupId[]
  );
  const availableGroups = PROOF_STACK_GROUP_ORDER.filter((group) => {
    return (
      inferredGroups.has(group) ||
      categoryFallbackGroups.has(group) ||
      summaryGroups.has(group)
    );
  });

  if (!availableGroups.length && !curatedPlatforms.length && !implementationLayers?.length) {
    return null;
  }

  return (
    <BandSection className="mt-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5F4F0]/42">
        SYSTEMS INVOLVED IN THE BUILD
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#F5F4F0]/62">
        The tools and system layers that made this project work — grouped by what they contributed.
      </p>

      {availableGroups.length && grouped ? (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {availableGroups.map((group) => {
            const scopedSlugs = curatedPlatforms
              .filter((platform) => platform.proofStackGroup === group)
              .map((platform) => platform.slug);
            const summary =
              implementationGroupSummary?.[group] ?? PROOF_STACK_GROUPS[group].description;

            return (
              <section key={group} className={categoryPanelClassName}>
                <p className={categoryHeaderClassName}>{PROOF_STACK_GROUPS[group].label}</p>
                <div className="mt-2 h-px w-full bg-[#F5F4F0]/[0.05]" />
                <p className="mt-2.5 text-xs leading-relaxed text-[#F5F4F0]/56">{summary}</p>
                {scopedSlugs.length ? (
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {scopedSlugs.map((slug) => (
                      <PlatformChip key={slug} slug={slug} />
                    ))}
                  </ul>
                ) : null}
              </section>
            );
          })}
        </div>
      ) : null}

      {grouped && implementationLayers?.length ? (
        <div className="mt-5 rounded-xl border border-[#F5F4F0]/[0.08] bg-[#0A0A0D]/30 p-3">
          <p className={categoryHeaderClassName}>Documented implementation layers</p>
          <div className="mt-2 h-px w-full bg-[#F5F4F0]/[0.05]" />
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {implementationLayers.map((layer) => (
              <li key={layer}>
                <span className={proofStackLayerChipClassName}>{layer}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {!grouped && curatedPlatforms.length ? (
        <div className={categoryPanelClassName}>
          <p className={categoryHeaderClassName}>Platform & Tooling</p>
          <div className="mt-2 h-px w-full bg-[#F5F4F0]/[0.05]" />
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {curatedPlatforms.map((platform) => (
              <PlatformChip key={platform.slug} slug={platform.slug} />
            ))}
          </ul>
        </div>
      ) : null}

      {!grouped && implementationLayers?.length ? (
        <div className="mt-5 rounded-xl border border-[#F5F4F0]/[0.08] bg-[#0A0A0D]/30 p-3">
          <p className={categoryHeaderClassName}>System layers documented in this case</p>
          <div className="mt-2 h-px w-full bg-[#F5F4F0]/[0.05]" />
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {implementationLayers.map((layer) => (
              <li key={layer}>
                <span className={proofStackLayerChipClassName}>{layer}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </BandSection>
  );
}

export function ServiceEcosystemSupportBlock({ serviceSlug }: { serviceSlug: ServiceCluster }) {
  const categories = SERVICE_ECOSYSTEM_BY_SERVICE[serviceSlug] ?? [];

  if (!categories.length) {
    return null;
  }

  const scopedSlugs = categories.flatMap((category) => PLATFORM_SLUGS_BY_CATEGORY[category].slice(0, 3));
  const uniqueScopedSlugs = Array.from(new Set(scopedSlugs));

  return (
    <BandSection className="relative mt-10 overflow-hidden">
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#0FD9C8]/25 to-transparent"
        aria-hidden
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="meta-label text-[#F05A28]/88">Systems commonly involved</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/62">
            Ecosystem categories and representative platforms for this service. Final stack is always scoped to your
            constraints — this is the reference shape, not a fixed shopping list.
          </p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#F5F4F0]/10 bg-[#12121a]/55 text-[#0FD9C8]/80">
          <Boxes className="h-5 w-5" strokeWidth={1.6} aria-hidden />
        </span>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className={categoryPanelClassName}>
          <p className={categoryHeaderClassName}>Capability categories</p>
          <div className="mt-2 h-px w-full bg-[#F5F4F0]/[0.05]" />
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <li key={category}>
                <span className="inline-flex items-center rounded-md border border-[#F5F4F0]/[0.07] bg-[#F5F4F0]/[0.02] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#F5F4F0]/58">
                  {PLATFORM_CAPABILITY_CATEGORIES[category].label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className={categoryPanelClassName}>
          <p className={categoryHeaderClassName}>Representative platforms</p>
          <div className="mt-2 h-px w-full bg-[#F5F4F0]/[0.05]" />
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {uniqueScopedSlugs.map((slug) => (
              <PlatformChip key={slug} slug={slug} />
            ))}
          </ul>
        </section>
      </div>
    </BandSection>
  );
}

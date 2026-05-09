import { BleedSection } from "@/components/layout-v3/BleedSection";
import { SectionSurface } from "@/components/layout-v3/SectionSurface";

function SkeletonLine({ className }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded ${className}`} />;
}

function FeaturedOutcomeSkeleton() {
  return (
    <SectionSurface className="overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.1fr)]">
        {/* Image area */}
        <div className="relative min-h-[260px] overflow-hidden border-b border-border-subtle lg:border-b-0 lg:border-r">
          <div className="skeleton-shimmer absolute inset-0" />
        </div>

        {/* Content area */}
        <div className="p-6 md:p-7">
          <SkeletonLine className="h-3 w-24" />
          <SkeletonLine className="mt-3 h-9 w-3/4" />
          <div className="mt-4 space-y-2">
            <SkeletonLine className="h-4 w-full" />
            <SkeletonLine className="h-4 w-5/6" />
          </div>

          {/* Metric boxes */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border-subtle bg-surface-muted p-4">
              <SkeletonLine className="h-3 w-20" />
              <SkeletonLine className="mt-2 h-9 w-16" />
              <SkeletonLine className="mt-2 h-4 w-full" />
            </div>
            <div className="rounded-2xl border border-border-subtle bg-surface-muted p-4">
              <SkeletonLine className="h-3 w-24" />
              <div className="mt-2 space-y-1">
                <SkeletonLine className="h-4 w-full" />
                <SkeletonLine className="h-4 w-3/4" />
              </div>
            </div>
          </div>

          <SkeletonLine className="mt-6 h-4 w-28" />
        </div>
      </div>
    </SectionSurface>
  );
}

function HighlightCardSkeleton() {
  return (
    <SectionSurface className="h-full p-5">
      <SkeletonLine className="h-3 w-20" />
      <SkeletonLine className="mt-3 h-9 w-16" />
      <SkeletonLine className="mt-1 h-4 w-24" />
      <div className="mt-4 space-y-1">
        <SkeletonLine className="h-4 w-full" />
        <SkeletonLine className="h-4 w-4/5" />
      </div>
      <SkeletonLine className="mt-5 h-4 w-20" />
    </SectionSurface>
  );
}

export function SelectedOutcomesSkeleton() {
  return (
    <BleedSection className="py-16 md:py-20 lg:py-24">
      {/* Header */}
      <div className="max-w-3xl">
        <SkeletonLine className="h-3 w-28" />
        <SkeletonLine className="mt-3 h-12 w-2/3" />
        <SkeletonLine className="mt-4 h-5 w-full max-w-2xl" />
      </div>

      {/* Cards grid */}
      <div className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <FeaturedOutcomeSkeleton />
        
        <div className="grid gap-5">
          <HighlightCardSkeleton />
          <HighlightCardSkeleton />
        </div>
      </div>
    </BleedSection>
  );
}

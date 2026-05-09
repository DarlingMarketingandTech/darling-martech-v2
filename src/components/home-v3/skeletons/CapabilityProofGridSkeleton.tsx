import { BleedSection } from "@/components/layout-v3/BleedSection";
import { SectionSurface } from "@/components/layout-v3/SectionSurface";

function SkeletonLine({ className }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded ${className}`} />;
}

function CapabilityCardSkeleton() {
  return (
    <SectionSurface className="h-full overflow-hidden">
      {/* Image placeholder */}
      <div className="relative h-48 overflow-hidden border-b border-border-subtle">
        <div className="skeleton-shimmer absolute inset-0" />
      </div>

      <div className="flex h-[calc(100%-12rem)] flex-col p-6">
        {/* Title */}
        <SkeletonLine className="h-8 w-3/4" />
        
        {/* Body text */}
        <div className="mt-3 space-y-2">
          <SkeletonLine className="h-4 w-full" />
          <SkeletonLine className="h-4 w-5/6" />
          <SkeletonLine className="h-4 w-4/6" />
        </div>

        {/* Proof box */}
        <div className="mt-5 rounded-2xl border border-border-subtle bg-surface-muted p-4">
          <SkeletonLine className="h-3 w-20" />
          <SkeletonLine className="mt-2 h-6 w-24" />
          <SkeletonLine className="mt-2 h-4 w-full" />
          <SkeletonLine className="mt-4 h-4 w-28" />
        </div>

        {/* Bottom link */}
        <div className="mt-auto pt-5">
          <SkeletonLine className="h-4 w-36" />
        </div>
      </div>
    </SectionSurface>
  );
}

export function CapabilityProofGridSkeleton() {
  return (
    <BleedSection className="py-16 md:py-20 lg:py-24">
      {/* Header */}
      <div className="max-w-3xl">
        <SkeletonLine className="h-3 w-24" />
        <SkeletonLine className="mt-3 h-12 w-2/3" />
        <SkeletonLine className="mt-4 h-5 w-full max-w-2xl" />
      </div>

      {/* Cards grid */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <CapabilityCardSkeleton />
        <CapabilityCardSkeleton />
        <CapabilityCardSkeleton />
      </div>
    </BleedSection>
  );
}

import { BleedSection } from "@/components/layout-v3/BleedSection";
import { SectionSurface } from "@/components/layout-v3/SectionSurface";

function SkeletonLine({ className }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded ${className}`} />;
}

function FeaturedToolSkeleton() {
  return (
    <SectionSurface className="h-full overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[minmax(240px,0.85fr)_minmax(0,1.15fr)]">
        {/* Image area */}
        <div className="relative min-h-[260px] overflow-hidden border-b border-border-subtle lg:border-b-0 lg:border-r">
          <div className="skeleton-shimmer absolute inset-0" />
        </div>
        
        {/* Content area */}
        <div className="p-6 md:p-7">
          <SkeletonLine className="h-3 w-16" />
          <SkeletonLine className="mt-3 h-9 w-3/4" />
          <div className="mt-4 space-y-2">
            <SkeletonLine className="h-4 w-full" />
            <SkeletonLine className="h-4 w-5/6" />
          </div>
          <SkeletonLine className="mt-4 h-4 w-20" />
          <SkeletonLine className="mt-6 h-4 w-24" />
        </div>
      </div>
    </SectionSurface>
  );
}

function SupportingToolSkeleton() {
  return (
    <SectionSurface className="h-full p-5">
      <SkeletonLine className="h-3 w-16" />
      <SkeletonLine className="mt-3 h-7 w-3/4" />
      <div className="mt-3 space-y-2">
        <SkeletonLine className="h-4 w-full" />
        <SkeletonLine className="h-4 w-4/5" />
      </div>
      <SkeletonLine className="mt-5 h-4 w-20" />
    </SectionSurface>
  );
}

export function ToolsPreviewSkeleton() {
  return (
    <BleedSection className="py-16 md:py-20 lg:py-24">
      {/* Header */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="max-w-3xl">
          <SkeletonLine className="h-3 w-20" />
          <SkeletonLine className="mt-3 h-12 w-2/3" />
          <SkeletonLine className="mt-4 h-5 w-full max-w-2xl" />
        </div>

        {/* CTA buttons placeholder */}
        <div className="flex flex-wrap gap-3">
          <SkeletonLine className="h-11 w-32 rounded-lg" />
          <SkeletonLine className="h-11 w-28 rounded-lg" />
        </div>
      </div>

      {/* Cards grid */}
      <div className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <FeaturedToolSkeleton />
        
        <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-1">
          <SupportingToolSkeleton />
          <SupportingToolSkeleton />
          <SupportingToolSkeleton />
        </div>
      </div>
    </BleedSection>
  );
}

import { BleedSection } from "@/components/layout-v3/BleedSection";
import { GlassPanel } from "@/components/layout-v3/GlassPanel";

function SkeletonLine({ className }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded ${className}`} />;
}

export function ClosingCtaSkeleton() {
  return (
    <BleedSection className="py-16 md:py-20 lg:py-24">
      <GlassPanel className="border-foreground/10 bg-[linear-gradient(180deg,rgba(245,244,240,0.035),rgba(240,90,40,0.04))] p-6 md:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            <SkeletonLine className="h-3 w-20" />
            <SkeletonLine className="mt-3 h-12 w-2/3" />
            <SkeletonLine className="mt-4 h-5 w-full max-w-2xl" />
          </div>

          {/* CTA buttons placeholder */}
          <div className="flex flex-wrap gap-3">
            <SkeletonLine className="h-11 w-36 rounded-lg" />
            <SkeletonLine className="h-11 w-28 rounded-lg" />
          </div>
        </div>

        <div className="mt-6 border-t border-foreground/10 pt-5">
          <SkeletonLine className="h-4 w-40" />
        </div>
      </GlassPanel>
    </BleedSection>
  );
}

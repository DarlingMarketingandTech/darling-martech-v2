"use client";

import type { ProofMetric } from "@/types";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { MonoMetric } from "@/components/ui/MonoMetric";
import { isQuantitativeProofMetric } from "@/lib/proof-metric";
import { cn } from "@/lib/utils";

type ProofMetricTileProps = {
  metric: ProofMetric;
};

/**
 * Numeric proof → {@link MonoMetric}. Narrative outcomes → editorial tile with optional
 * blurred Cloudinary wash (does not compete with hero typography).
 */
export function ProofMetricTile({ metric }: ProofMetricTileProps) {
  if (isQuantitativeProofMetric(metric)) {
    return (
      <div className="card-elevated-dark rounded-2xl px-4 py-4 md:px-5 md:py-5">
        <MonoMetric value={metric.value} label={metric.label} animateValue={false} />
      </div>
    );
  }

  const accent = metric.accentImagePublicId;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border px-5 py-5 md:px-6 md:py-6",
        metric.isHighlighted
          ? "border-[#0FD9C8]/22 shadow-[inset_0_1px_0_0_rgba(15,217,200,0.12),0_24px_56px_rgba(0,0,0,0.35)]"
          : "border-[#F5F4F0]/10"
      )}
    >
      {accent ? (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <CloudinaryImage
            publicId={accent}
            alt=""
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 50vw"
            transforms="e_blur:650,e_grayscale"
            cloudinaryQuality="auto"
            className="h-full w-full scale-105 object-cover opacity-45"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#0C0C0E]/94 via-[#0C0C0E]/88 to-[#0C0C0E]/93"
            aria-hidden
          />
        </div>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[#13131A]/55"
          aria-hidden
        />
      )}

      <div className="relative z-10">
        <p className="font-display text-balance text-lg font-semibold leading-snug tracking-[-0.02em] text-[#F5F4F0] md:text-xl">
          {metric.value}
        </p>
        {metric.label ? <p className="meta-label mt-4 max-w-[22rem] leading-relaxed">{metric.label}</p> : null}
      </div>
    </div>
  );
}

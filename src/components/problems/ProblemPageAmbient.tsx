"use client";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

/** Neutral wash when a problem has no hero asset (matches proof index fallback tone). */
const FALLBACK_PUBLIC_ID = "curated/regenerated/storytelling-2026-04/network-dataflow-02";

type ProblemPageAmbientProps = {
  imagePublicId?: string;
};

/**
 * Proof-index-style ultra-soft blurred wash for problem detail routes only.
 * Decorative — empty alt, `aria-hidden`. No WebGL.
 */
export function ProblemPageAmbient({ imagePublicId }: ProblemPageAmbientProps) {
  const publicId = imagePublicId ?? FALLBACK_PUBLIC_ID;

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[-2.5rem] z-0 h-[min(52vw,400px)] w-[min(138vw,920px)] max-w-none -translate-x-1/2 opacity-[0.04] sm:top-[-4rem] sm:opacity-[0.052] md:top-[-5rem] md:opacity-[0.058]"
      aria-hidden
    >
      <CloudinaryImage
        publicId={publicId}
        alt=""
        width={1024}
        height={1024}
        sizes="100vw"
        transforms="e_blur:2200"
        cloudinaryQuality="auto"
        className="ambient-visual-drift h-full w-full object-cover object-[48%_42%]"
      />
    </div>
  );
}

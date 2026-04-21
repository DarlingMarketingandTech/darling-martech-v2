"use client";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

/**
 * Ultra-low-opacity stitched system art behind the services index hero only.
 * Decorative — empty alt, `aria-hidden` on wrapper.
 */
export function ServicesIndexAmbient() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[-3.5rem] z-0 h-[min(58vw,440px)] w-[min(145vw,980px)] max-w-none -translate-x-1/2 opacity-[0.055] sm:top-[-5rem] sm:opacity-[0.075] md:top-[-6rem]"
      aria-hidden
    >
      <CloudinaryImage
        publicId="curated/regenerated/storytelling-2026-04/team-strategy-02"
        alt=""
        width={1376}
        height={768}
        sizes="100vw"
        transforms="e_blur:2200"
        cloudinaryQuality="auto"
        className="ambient-visual-drift h-full w-full object-cover object-[54%_40%]"
      />
    </div>
  );
}

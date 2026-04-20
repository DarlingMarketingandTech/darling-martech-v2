"use client";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

type ProofDetailAmbientProps = {
  imagePublicId: string;
};

/**
 * Soft wash behind proof detail content (same family as proof index / problem ambients).
 */
export function ProofDetailAmbient({ imagePublicId }: ProofDetailAmbientProps) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[-3rem] z-0 h-[min(56vw,420px)] w-[min(142vw,960px)] max-w-none -translate-x-1/2 opacity-[0.045] sm:top-[-4.5rem] sm:opacity-[0.055] md:top-[-5.5rem] md:opacity-[0.065]"
      aria-hidden
    >
      <CloudinaryImage
        publicId={imagePublicId}
        alt=""
        width={1024}
        height={1024}
        sizes="100vw"
        transforms="e_blur:2000"
        cloudinaryQuality="auto"
        className="h-full w-full object-cover object-[48%_40%]"
      />
    </div>
  );
}

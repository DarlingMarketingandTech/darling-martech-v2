"use client";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { cn } from "@/lib/utils";

type ServiceHeroVisualProps = {
  publicId: string;
  alt: string;
  className?: string;
};

/** Split-hero visual: slow CSS drift only; disabled when user prefers reduced motion. */
export function ServiceHeroVisual({ publicId, alt, className }: ServiceHeroVisualProps) {
  return (
    <CloudinaryImage
      publicId={publicId}
      alt={alt}
      width={1024}
      height={1024}
      priority
      postTransforms="e_sharpen"
      cloudinaryQuality="auto"
      sizes="(max-width: 1024px) 100vw, 38vw"
      className={cn(
        "service-hero-visual-drift h-full min-h-[300px] w-full rounded-3xl object-cover object-[52%_48%] sm:min-h-[340px]",
        className
      )}
    />
  );
}

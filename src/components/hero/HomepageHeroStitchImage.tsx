"use client";

import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

type HomepageHeroStitchImageProps = {
  publicId: string;
  className?: string;
};

/** Client-only so `next/image` + Cloudinary `loader` stay off the RSC serialization boundary. */
export function HomepageHeroStitchImage({ publicId, className }: HomepageHeroStitchImageProps) {
  return (
    <CloudinaryImage
      publicId={publicId}
      alt=""
      width={1024}
      height={1024}
      priority
      postTransforms="e_sharpen"
      cloudinaryQuality="auto"
      sizes="(min-width: 1024px) min(42vw, 520px), 100vw"
      className={className}
    />
  );
}

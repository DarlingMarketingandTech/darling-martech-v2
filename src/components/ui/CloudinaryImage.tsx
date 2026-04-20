"use client";

import { useCallback } from "react";
import Image from "next/image";
import type { ImageLoaderProps } from "next/image";
import { buildCloudinaryImageUrl } from "@/lib/cloudinary";

type CloudinaryImageProps = {
  publicId: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  /** Responsive widths hint for `next/image` when the image spans fluid layouts. */
  sizes?: string;
  /**
   * Extra Cloudinary components before `c_scale` (slash-separated).
   * Example: `e_blur:2000` for decorative low-contrast backgrounds.
   */
  transforms?: string;
  /**
   * Components after `c_scale`, before `f_auto` / quality.
   * Example: `e_sharpen` after downscaling.
   */
  postTransforms?: string;
  /**
   * When set, overrides the numeric `quality` passed by Next/Image for this asset.
   * Default follows the loader: Next `quality` or `q_auto` if undefined.
   */
  cloudinaryQuality?: number | "auto";
};

export function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  transforms,
  postTransforms,
  cloudinaryQuality,
}: CloudinaryImageProps) {
  const loader = useCallback(
    ({ src, width: w, quality }: ImageLoaderProps) =>
      buildCloudinaryImageUrl(src, w, {
        transforms,
        postTransforms,
        quality:
          cloudinaryQuality !== undefined
            ? cloudinaryQuality
            : quality === undefined
              ? "auto"
              : quality,
      }),
    [transforms, postTransforms, cloudinaryQuality]
  );

  return (
    <Image
      loader={loader}
      src={publicId}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}

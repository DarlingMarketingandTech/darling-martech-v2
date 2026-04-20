"use client";

import Image from "next/image";
import { cloudinaryLoader } from "@/lib/cloudinary";

type CloudinaryImageProps = {
  publicId: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  /** Responsive widths hint for `next/image` when the image spans fluid layouts. */
  sizes?: string;
};

export function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
}: CloudinaryImageProps) {
  return (
    <Image
      loader={cloudinaryLoader}
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

import type { ImageLoaderProps } from "next/image";

export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ??
    "c-5c7019a74c9c24ab5eda7e213055bd";
  const normalizedSrc = src.startsWith("/") ? src.slice(1) : src;
  const normalizedQuality = quality ?? 80;

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_${normalizedQuality},w_${width}/${normalizedSrc}`;
}

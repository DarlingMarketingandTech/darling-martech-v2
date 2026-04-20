import type { ImageLoaderProps } from "next/image";

const DEFAULT_CLOUD_NAME = "c-5c7019a74c9c24ab5eda7e213055bd";

export type CloudinaryImageDeliveryOptions = {
  /**
   * Transformation components applied before `c_scale,w_*` (slash-separated).
   * Example: `e_blur:2000` for soft ambient backgrounds.
   */
  transforms?: string;
  /**
   * Transformation components after resize, before `f_auto` / quality.
   * Example: `e_sharpen` (recommended after downscale).
   */
  postTransforms?: string;
  /** `auto` uses Cloudinary `q_auto`; otherwise `q_1`–`q_100`. */
  quality?: number | "auto";
};

function normalizePublicId(publicId: string) {
  return publicId.startsWith("/") ? publicId.slice(1) : publicId;
}

/** Trim slashes; empty → undefined */
function normalizeChain(chain: string | undefined) {
  const t = chain?.trim();
  if (!t) return undefined;
  return t.replace(/^\/+/, "").replace(/\/+$/, "");
}

/**
 * Builds a delivery URL aligned with Cloudinary best practices:
 * optional effects → `c_scale,w_*` → optional post-resize effects → `f_auto` → `q_auto` or `q_N`.
 *
 * @see https://cloudinary.com/documentation/transformation_reference
 */
export function buildCloudinaryImageUrl(
  publicId: string,
  width: number,
  options?: CloudinaryImageDeliveryOptions
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? DEFAULT_CLOUD_NAME;
  const id = normalizePublicId(publicId);
  const pre = normalizeChain(options?.transforms);
  const post = normalizeChain(options?.postTransforms);
  const q =
    options?.quality === undefined || options?.quality === "auto" ? "q_auto" : `q_${options.quality}`;

  const segments: string[] = [];
  if (pre) segments.push(pre);
  segments.push(`c_scale,w_${width}`);
  if (post) segments.push(post);
  segments.push("f_auto", q);

  const path = segments.join("/");
  return `https://res.cloudinary.com/${cloudName}/image/upload/${path}/${id}`;
}

/** Default Next/Image loader — forwards requested width and quality to Cloudinary. */
export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  return buildCloudinaryImageUrl(src, width, {
    quality: quality === undefined ? "auto" : quality,
  });
}

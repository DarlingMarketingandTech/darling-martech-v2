/**
 * Hero ambient WebM sources — one stable rule:
 * If `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set (already required for Cloudinary images),
 * derive delivery URLs from fixed `public_id`s. Otherwise use `/public/video` fallbacks.
 *
 * No extra hero-specific env vars on Vercel.
 */
const PUBLIC_ID_A = "curated/homepage/texture-lab-hero-a";
const PUBLIC_ID_B = "curated/homepage/texture-lab-hero-b";

const FALLBACK_A = "/video/texture-lab-hero.webm";
const FALLBACK_B = "/video/texture-lab-hero-b.webm";

export type HeroTextureLayer = "a" | "b";

export function getHeroTextureVideoSrc(layer: HeroTextureLayer): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
  if (!cloud) {
    return layer === "a" ? FALLBACK_A : FALLBACK_B;
  }
  const publicId = layer === "a" ? PUBLIC_ID_A : PUBLIC_ID_B;
  return `https://res.cloudinary.com/${cloud}/video/upload/${publicId}.webm`;
}

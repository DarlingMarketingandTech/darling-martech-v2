import { HomepageHeroStitchImage } from "@/components/hero/HomepageHeroStitchImage";

/**
 * Cloudinary public_id for the homepage hero Stitch asset (1024×1024).
 * Verified asset: `curated/homepage/hero-positional-drift` — positional drift / modular plates.
 */
export const HOMEPAGE_HERO_STITCH_PUBLIC_ID = "curated/homepage/hero-positional-drift";

/**
 * Homepage hero visual: Stitch raster base + atmospheric gradients + localized
 * orange signal glow. CSS-only motion (no R3F). Decorative — `aria-hidden` on root.
 * Server Component so hero markup matches hydration; drift uses `.hero-signal-drift`
 * with reduced motion handled only in CSS (`globals.css`).
 */
export function HomepageHeroVisual() {
  return (
    <div
      className="relative h-full min-h-0 w-full overflow-hidden rounded-[1.75rem] bg-[#0C0C0E] sm:rounded-[2rem] lg:rounded-l-[2rem] lg:rounded-r-none"
      aria-hidden
    >
      <HomepageHeroStitchImage
        publicId={HOMEPAGE_HERO_STITCH_PUBLIC_ID}
        className="absolute inset-0 h-full w-full origin-[58%_48%] scale-[1.06] object-cover object-[56%_46%] mask-[radial-gradient(ellipse_104%_104%_at_50%_49%,#000_36%,transparent_78%)] sm:origin-[56%_46%] sm:scale-[1.065] sm:object-[54%_44%] lg:origin-[52%_50%] lg:scale-[1.09] lg:object-[50%_48%]"
      />

      {/* Depth: vignette — softer center, slower falloff toward edges */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_98%_88%_at_68%_48%,transparent_0%,rgba(12,12,14,0.2)_58%,rgba(12,12,14,0.74)_100%)]"
        aria-hidden
      />

      {/* Blend under stacked copy/CTA on small screens */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0C0C0E_0%,rgba(12,12,14,0.36)_22%,transparent_50%,transparent_100%)] lg:hidden"
        aria-hidden
      />

      {/* Desktop: longer, softer fade toward headline — less “poster edge” */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,#0C0C0E_0%,rgba(12,12,14,0.32)_14%,rgba(12,12,14,0.1)_30%,rgba(12,12,14,0.035)_46%,transparent_64%,transparent_100%)] lg:block"
        aria-hidden
      />

      {/* Feather left seam into hero slab (desktop) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[min(32%,8rem)] bg-[linear-gradient(90deg,#0C0C0E_0%,transparent_100%)] opacity-95 lg:block"
        aria-hidden
      />

      {/* Localized orange signal energy (not global haze) */}
      <div
        className="hero-signal-drift pointer-events-none absolute inset-0 mix-blend-screen"
        aria-hidden
      >
        <div
          className="absolute right-[6%] top-[34%] h-[min(22%,140px)] w-[min(28%,180px)] rounded-full bg-[#F05A28]/20 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute bottom-[26%] right-[20%] h-[min(16%,100px)] w-[min(20%,120px)] rounded-full bg-[#F05A28]/12 blur-2xl"
          aria-hidden
        />
      </div>

      {/* Razor signal traces — engineered accent, low amplitude */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.2]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="dm-hero-sig" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="rgba(240,90,40,0)" />
            <stop offset="42%" stopColor="rgba(240,90,40,0.32)" />
            <stop offset="100%" stopColor="rgba(240,90,40,0.06)" />
          </linearGradient>
        </defs>
        <path
          d="M 18 58 Q 38 42 52 48 T 88 36"
          fill="none"
          stroke="url(#dm-hero-sig)"
          strokeWidth="0.35"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 24 72 L 48 62 L 72 68 L 86 52"
          fill="none"
          stroke="rgba(240,90,40,0.18)"
          strokeWidth="0.28"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

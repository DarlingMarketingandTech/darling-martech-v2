/**
 * Static infrastructure diagram for the homepage hero when WebGL is skipped
 * (`prefers-reduced-motion`) or while the R3F chunk loads. Pure SVG — no
 * runtime deps, LCP-friendly companion to the live scene.
 */
export function HomepageHeroInfraPoster() {
  return (
    <div className="absolute inset-0 bg-[#0C0C0E]" aria-hidden>
      <svg className="h-full w-full opacity-[0.92]" viewBox="0 0 440 360" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="dm-hero-infra-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(245,244,240,0)" />
            <stop offset="35%" stopColor="rgba(245,244,240,0.14)" />
            <stop offset="100%" stopColor="rgba(15,217,200,0.35)" />
          </linearGradient>
          <linearGradient id="dm-hero-infra-line-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(240,90,40,0)" />
            <stop offset="50%" stopColor="rgba(240,90,40,0.22)" />
            <stop offset="100%" stopColor="rgba(245,244,240,0.08)" />
          </linearGradient>
        </defs>
        <g strokeLinecap="round" fill="none">
          <path d="M48 220 L140 120 L248 168 L360 96" stroke="url(#dm-hero-infra-line)" strokeWidth="1.1" />
          <path d="M140 120 L132 260 L280 268 L360 96" stroke="rgba(245,244,240,0.08)" strokeWidth="1" />
          <path d="M48 220 L132 260" stroke="url(#dm-hero-infra-line-2)" strokeWidth="1" />
          <path d="M248 168 L360 240" stroke="rgba(245,244,240,0.07)" strokeWidth="1" />
        </g>
        <g fill="rgba(19,19,26,0.95)" stroke="rgba(245,244,240,0.12)" strokeWidth="1">
          <rect x="118" y="98" width="44" height="32" rx="4" />
          <rect x="226" y="146" width="44" height="32" rx="4" />
          <rect x="24" y="204" width="44" height="32" rx="4" />
          <rect x="108" y="244" width="44" height="32" rx="4" />
          <rect x="336" y="76" width="44" height="32" rx="4" />
          <rect x="328" y="220" width="44" height="32" rx="4" />
        </g>
        <g>
          <rect x="232" y="154" width="10" height="10" rx="2" fill="rgba(15,217,200,0.55)" />
          <rect x="128" y="108" width="8" height="8" rx="2" fill="rgba(240,90,40,0.45)" />
        </g>
      </svg>
    </div>
  );
}

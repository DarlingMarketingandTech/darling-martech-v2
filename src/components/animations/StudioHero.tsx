"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

/**
 * Flagship 3D surface for the Studio page. The R3F scene is code-split via
 * `next/dynamic` with `ssr: false`, so the three/drei bundle never lands on
 * other routes. When the user prefers reduced motion we never import the
 * scene at all and show the CSS poster instead.
 */
const StudioHeroScene = dynamic(() => import("./StudioHeroScene"), {
  ssr: false,
  loading: () => null,
});

function StudioHeroPoster() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 32% 34%, rgba(240,90,40,0.38), transparent 55%), radial-gradient(circle at 72% 70%, rgba(15,217,200,0.22), transparent 52%), linear-gradient(135deg, #13131A 0%, #0c0c0e 100%)",
      }}
    />
  );
}

export function StudioHero() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative aspect-5/4 w-full overflow-hidden rounded-[1.75rem] border border-[#F5F4F0]/10 bg-[#0c0c0e]">
      <StudioHeroPoster />
      {reduceMotion ? null : (
        <div className="pointer-events-none absolute inset-0">
          <StudioHeroScene />
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#0c0c0e] to-transparent" />
      <span className="absolute bottom-4 left-4 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-[#F5F4F0]/55">
        [studio · live render]
      </span>
    </div>
  );
}

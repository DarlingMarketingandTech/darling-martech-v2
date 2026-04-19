"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Dev-only sanity check for motion stack (Framer Motion + GSAP).
 * Not routed by default — import on a throwaway page when verifying installs.
 */
export default function InstallTest() {
  const probeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = probeRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0.4, x: -6 },
      { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0C0E] p-8">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mb-4 text-4xl font-bold text-[#F5F4F0]"
      >
        Installation check
      </motion.h1>

      <p ref={probeRef} className="mb-6 max-w-2xl text-sm text-[#F5F4F0]/70">
        Framer Motion drives this headline entrance; GSAP animates this line. Spline and
        R3F are installed — embed scenes only in lazy-loaded client surfaces.
      </p>

      <ul className="space-y-2 text-[#F05A28]">
        <li>GSAP + ScrollTrigger</li>
        <li>Lenis (`lenis` package — see `src/lib/lenis.ts`)</li>
        <li>Framer Motion</li>
        <li>@splinetool/react-spline + runtime</li>
        <li>three + @react-three/fiber + @react-three/drei</li>
        <li>Shadcn UI (New York / Slate)</li>
      </ul>
    </div>
  );
}

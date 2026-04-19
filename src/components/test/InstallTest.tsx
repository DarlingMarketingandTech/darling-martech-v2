"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Dev-only sanity check for motion stack dependencies.
 * Not routed — import temporarily in a page if you need to verify locally.
 */
export function InstallTest() {
  return (
    <div className="min-h-screen bg-[#0C0C0E] p-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl font-semibold text-[#F5F4F0]"
      >
        Motion stack check
      </motion.h1>
      <ul className="mt-6 space-y-2 text-sm text-[#F5F4F0]/72">
        <li>Framer Motion — animated heading above</li>
        <li>GSAP + ScrollTrigger — registered (no scrub test in this stub)</li>
        <li>Lenis, Spline, R3F — installed; wire in real features as needed</li>
      </ul>
    </div>
  );
}

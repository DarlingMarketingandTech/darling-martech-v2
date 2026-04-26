"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type GradientMeshProps = {
  className?: string;
};

export function GradientMesh({ className }: GradientMeshProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      initial={{ opacity: 0.45 }}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              backgroundPosition: [
                "0% 0%, 100% 0%, 100% 100%",
                "14% 22%, 86% 18%, 80% 82%",
                "0% 0%, 100% 0%, 100% 100%",
              ],
            }
      }
      transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      style={{
        backgroundImage:
          "radial-gradient(48% 52% at 14% 12%, rgba(240,90,40,0.16) 0%, rgba(240,90,40,0) 100%), radial-gradient(42% 46% at 84% 20%, rgba(15,217,200,0.12) 0%, rgba(15,217,200,0) 100%), radial-gradient(36% 40% at 78% 82%, rgba(245,244,240,0.08) 0%, rgba(245,244,240,0) 100%)",
        backgroundSize: "140% 140%, 125% 125%, 120% 120%",
        mixBlendMode: "screen",
      }}
    />
  );
}

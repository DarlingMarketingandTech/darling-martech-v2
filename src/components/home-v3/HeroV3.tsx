"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { homepageV4Data } from "@/data/homepage";
import { captureClientEvent } from "@/lib/posthog";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { GlassPanel } from "@/components/layout-v3/GlassPanel";
import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import { useNetworkAware } from "@/hooks/useNetworkAware";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const eyebrowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const glassVariants = {
  hidden: { opacity: 0, scale: 0.92, rotateY: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.7,
      ease: [0.23, 1, 0.32, 1],
      delay: 0.15,
    },
  },
};

export function HeroV3() {
  const { hero } = homepageV4Data;
  const { shouldReduceMotion } = useNetworkAware();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoveredPrimary, setIsHoveredPrimary] = useState(false);
  const [isHoveredSecondary, setIsHoveredSecondary] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  });

  // Parallax effect for background gradient
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Parallax effect for left content
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Parallax effect for right panel
  const rightY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Hover states for buttons with magnetic effect
  const primaryHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(240, 90, 40, 0.25)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const secondaryHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(15, 217, 200, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const showAnimations = !shouldReduceMotion && !prefersReducedMotion;

  return (
    <BleedSection 
      className="relative overflow-hidden pt-16 sm:pt-18 md:pt-24" 
      innerClassName="pb-12 sm:pb-14 md:pb-20 lg:pb-24"
      ref={containerRef}
    >
      {/* Animated background gradient */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(45% 30% at 100% 0%, rgba(15,217,200,0.08) 0%, rgba(15,217,200,0)_70%), radial-gradient(40% 35% at 0% 100%, rgba(240,90,40,0.08) 0%, rgba(240,90,40,0)_72%)",
          opacity: showAnimations ? bgOpacity : 0.6,
          y: showAnimations ? bgY : 0,
        }}
      />

      {/* Enhanced animated overlay */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(240,90,40,0.04)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(15,217,200,0.04)_0%,transparent_60%)]"
        initial={{ opacity: 0 }}
        animate={showAnimations ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <motion.div 
        className="relative grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center"
        variants={showAnimations ? containerVariants : undefined}
        initial={showAnimations ? "hidden" : undefined}
        animate={showAnimations ? "visible" : undefined}
      >
        {/* Left Content Column */}
        <motion.div
          style={showAnimations ? { y: leftY, opacity: leftOpacity } : undefined}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.p 
            className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-signal"
            variants={showAnimations ? eyebrowVariants : undefined}
            initial={showAnimations ? "hidden" : undefined}
            animate={showAnimations ? "visible" : undefined}
          >
            {hero.eyebrow}
          </motion.p>

          {/* Main Title */}
          <motion.h1 
            className="mt-4 max-w-[14ch] font-syne text-[clamp(2.2rem,10vw,6.2rem)] leading-[0.94] tracking-[-0.025em] text-foreground"
            variants={showAnimations ? itemVariants : undefined}
            initial={showAnimations ? "hidden" : undefined}
            animate={showAnimations ? "visible" : undefined}
          >
            {hero.title}
          </motion.h1>

          {/* Body Paragraphs */}
          <motion.div 
            className="mt-5 max-w-2xl space-y-3 text-[0.98rem] leading-6 text-body-muted sm:space-y-4 md:mt-6 md:text-lg md:leading-7"
            variants={showAnimations ? containerVariants : undefined}
            initial={showAnimations ? "hidden" : undefined}
            animate={showAnimations ? "visible" : undefined}
          >
            {hero.body.map((paragraph, idx) => (
              <motion.p 
                key={paragraph}
                variants={showAnimations ? itemVariants : undefined}
                initial={showAnimations ? "hidden" : undefined}
                animate={showAnimations ? "visible" : undefined}
                custom={idx}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="mt-7 grid w-full grid-cols-1 gap-2.5 sm:mt-8 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-3"
            variants={showAnimations ? itemVariants : undefined}
            initial={showAnimations ? "hidden" : undefined}
            animate={showAnimations ? "visible" : undefined}
          >
            <motion.div
              onHoverStart={() => setIsHoveredPrimary(true)}
              onHoverEnd={() => setIsHoveredPrimary(false)}
              variants={showAnimations ? primaryHoverVariants : undefined}
              whileHover={showAnimations ? "hover" : undefined}
            >
              <Button
                href={hero.primaryCta.href}
                size="lg"
                className="w-full justify-center gap-2 sm:w-auto"
                onClick={() => captureClientEvent("hero_cta_clicked", { cta: "primary", href: hero.primaryCta.href })}
              >
                {hero.primaryCta.label}
                <motion.div
                  animate={isHoveredPrimary && showAnimations ? { x: 4 } : { x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="size-4" />
                </motion.div>
              </Button>
            </motion.div>

            <motion.div
              onHoverStart={() => setIsHoveredSecondary(true)}
              onHoverEnd={() => setIsHoveredSecondary(false)}
              variants={showAnimations ? secondaryHoverVariants : undefined}
              whileHover={showAnimations ? "hover" : undefined}
            >
              <Button
                href={hero.secondaryCta.href}
                variant="secondary"
                size="lg"
                className="w-full justify-center sm:w-auto"
                onClick={() => captureClientEvent("hero_cta_clicked", { cta: "secondary", href: hero.secondaryCta.href })}
              >
                {hero.secondaryCta.label}
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Items */}
          <motion.div 
            className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foreground/50 sm:mt-6 sm:gap-x-5 sm:text-[0.68rem] sm:tracking-[0.16em]"
            variants={showAnimations ? containerVariants : undefined}
            initial={showAnimations ? "hidden" : undefined}
            animate={showAnimations ? "visible" : undefined}
          >
            {hero.trustItems.map((item) => (
              <motion.span 
                key={item}
                variants={showAnimations ? itemVariants : undefined}
                initial={showAnimations ? "hidden" : undefined}
                animate={showAnimations ? "visible" : undefined}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Glass Panel */}
        <motion.div
          style={showAnimations ? { y: rightY, opacity: rightOpacity } : undefined}
          variants={showAnimations ? glassVariants : undefined}
          initial={showAnimations ? "hidden" : undefined}
          animate={showAnimations ? "visible" : undefined}
          whileHover={showAnimations ? { 
            y: showAnimations ? useTransform(scrollYProgress, [0, 1], [-60, -75]) : 0,
            scale: 1.02,
            transition: { duration: 0.3 }
          } : undefined}
        >
          <GlassPanel className="overflow-hidden border-foreground/12 bg-[linear-gradient(180deg,rgba(245,244,240,0.03),rgba(15,217,200,0.015))] shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="relative aspect-5/6 min-h-[300px] sm:aspect-4/5 sm:min-h-[360px]">
              <CloudinaryImage
                publicId={hero.visual.publicId}
                alt={hero.visual.alt}
                width={1200}
                height={1500}
                priority
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="absolute inset-0 size-full object-cover object-center opacity-45 mix-blend-screen"
                postTransforms="e_sharpen"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,14,0.28)_0%,rgba(12,12,14,0.78)_58%,rgba(12,12,14,0.96)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(58%_52%_at_72%_18%,rgba(15,217,200,0.14)_0%,rgba(15,217,200,0)_72%)] sm:bg-[radial-gradient(55%_45%_at_75%_20%,rgba(15,217,200,0.14)_0%,rgba(15,217,200,0)_70%)]" />

              <motion.div 
                className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-7"
                initial={showAnimations ? { opacity: 0, y: 12 } : undefined}
                animate={showAnimations ? { opacity: 1, y: 0 } : undefined}
                transition={showAnimations ? { duration: 0.6, delay: 0.25 } : undefined}
              >
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-signal">
                  {hero.visual.eyebrow}
                </p>
                <h2 className="mt-3 max-w-[16ch] font-syne text-2xl leading-tight text-foreground md:text-[2rem]">
                  {hero.visual.title}
                </h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-body-muted">
                  {hero.visual.points.map((point, idx) => (
                    <motion.li 
                      key={point} 
                      className="flex gap-3"
                      initial={showAnimations ? { opacity: 0, x: -8 } : undefined}
                      animate={showAnimations ? { opacity: 1, x: 0 } : undefined}
                      transition={showAnimations ? { duration: 0.4, delay: 0.3 + idx * 0.08 } : undefined}
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </GlassPanel>
        </motion.div>
      </motion.div>
    </BleedSection>
  );
}

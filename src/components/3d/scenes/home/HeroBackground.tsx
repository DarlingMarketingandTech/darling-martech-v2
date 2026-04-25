"use client";

import { useRef, type RefObject } from "react";
import {
  ContactShadows,
  Environment,
  Float,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Group, Mesh } from "three";
import { cn } from "@/lib/utils";

type HeroBackgroundProps = {
  className?: string;
};

type GlassTorusKnotProps = {
  trackRef: RefObject<HTMLElement>;
};

gsap.registerPlugin(ScrollTrigger, useGSAP);

function GlassTorusKnot({ trackRef }: GlassTorusKnotProps) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const reduceMotion = useReducedMotion();

  useFrame((_, delta) => {
    if (!groupRef.current || reduceMotion) return;

    groupRef.current.rotation.x += delta * 0.1;
    groupRef.current.rotation.y += delta * 0.14;
  });

  useGSAP(
    () => {
      if (reduceMotion || !trackRef.current || !groupRef.current || !meshRef.current) {
        return;
      }

      const ctx = gsap.context(() => {
        gsap.to(groupRef.current!.rotation, {
          y: Math.PI * 2.1,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });

        gsap.to(groupRef.current!.scale, {
          x: 1.14,
          y: 1.14,
          z: 1.14,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 78%",
            end: "bottom top",
            scrub: 0.9,
          },
        });

        gsap.to(meshRef.current!.rotation, {
          z: 0.32,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      }, trackRef);

      return () => ctx.revert();
    },
    { scope: trackRef, dependencies: [reduceMotion], revertOnUpdate: true }
  );

  return (
    <group ref={groupRef}>
      <Float
        speed={1.08}
        rotationIntensity={0.18}
        floatIntensity={0.55}
        floatingRange={[-0.12, 0.16]}
      >
        <mesh ref={meshRef} castShadow receiveShadow position={[0.18, -0.08, 0]}>
          <torusKnotGeometry args={[1.02, 0.26, 200, 20]} />
          <MeshTransmissionMaterial
            samples={8}
            resolution={1024}
            transmission={1}
            roughness={0.02}
            thickness={1.55}
            chromaticAberration={0.14}
            anisotropy={0.22}
            distortion={0.08}
            distortionScale={0.26}
            temporalDistortion={0.08}
            backside
            backsideThickness={0.6}
            backsideEnvMapIntensity={1.15}
            transparent
            opacity={1}
            color="#F5F4F0"
          />
        </mesh>
      </Float>
      <ContactShadows opacity={0.48} scale={14} blur={2.8} far={5.2} color="#0C0C0E" frames={1} />
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight castShadow position={[3.5, 3.2, 4.5]} intensity={2.25} color="#F05A28" />
      <pointLight position={[-3.4, -1.6, 2.8]} intensity={1.8} color="#0FD9C8" />
    </group>
  );
}

export function HeroBackground({ className }: HeroBackgroundProps) {
  const heroRef = useRef<HTMLElement>(null);
  const heroTrackRef = heroRef as unknown as RefObject<HTMLElement>;
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end start"],
  });
  const titleScaleX = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1.02, 1.06]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative isolate min-h-screen overflow-hidden bg-[#0C0C0E] text-[#F5F4F0]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_36%,rgba(240,90,40,0.18),transparent_34%),radial-gradient(circle_at_72%_70%,rgba(15,217,200,0.09),transparent_28%),linear-gradient(180deg,rgba(12,12,14,0.1)_0%,rgba(12,12,14,0.82)_88%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(245,244,240,0.06)_0%,transparent_18%,transparent_82%,rgba(15,217,200,0.06)_100%)] opacity-70" />

      <View
        track={heroTrackRef}
        className="pointer-events-none absolute inset-0 h-full min-h-[360px] w-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5.25]} fov={38} />
        <fog attach="fog" args={["#0C0C0E", 5.5, 11]} />
        <GlassTorusKnot trackRef={heroTrackRef} />
      </View>

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 md:px-10 md:py-10 xl:px-14 xl:py-12">
        <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#F5F4F0]/48">
          <span>Home v2</span>
          <span>Scroll diagnosis</span>
        </div>

        <div className="max-w-[1100px] pb-12 pt-12 md:pb-16 lg:pt-20">
          <motion.h1
            className="max-w-[12ch] text-balance font-syne text-[clamp(3.5rem,10vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.06em]"
            style={{ scaleX: titleScaleX, y: reduceMotion ? 0 : titleY }}
          >
            This page is a diagnosis map.
          </motion.h1>
          <p className="mt-5 max-w-[52rem] text-pretty text-base leading-8 text-[#F5F4F0]/68 md:text-lg md:leading-9">
            A cinematic homepage scaffold for the 2026 rebuild: one persistent WebGL surface, one scroll-linked story, and one clear path into the rest of the system.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#F5F4F0]/10 pt-5 text-xs uppercase tracking-[0.2em] text-[#F5F4F0]/46">
          <span>Liquid glass hero</span>
          <span>R3F + Framer Motion + GSAP</span>
          <span>ScrollTrigger narrative</span>
        </div>
      </div>
    </section>
  );
}

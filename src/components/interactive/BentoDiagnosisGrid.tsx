"use client";

import { useEffect, useId, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactShadows, Environment, Float, MeshTransmissionMaterial, PerspectiveCamera, View } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type BentoCellProps = {
  className?: string;
  children: ReactNode;
  accent?: string;
  withTexture?: boolean;
  withDoodle?: boolean;
  trackRef?: RefObject<HTMLElement>;
};

type CellState = "done" | "active" | "queued";

const auditorPhases = [
  "Reviewing positioning, proof depth, and conversion pressure.",
  "Checking whether the story matches the current buyer state.",
  "Flagging sections that read like generic marketing instead of evidence.",
  "Recommending the next move and the highest-leverage fix.",
] as const;

function DoodleStroke({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full opacity-55", className)}
      viewBox="0 0 320 220"
      fill="none"
      aria-hidden
    >
      <path
        d="M34 156c28-34 68-56 110-56 23 0 44 6 67 18 22 11 39 16 70 13"
        stroke="rgba(245,244,240,0.28)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="6 11"
      />
      <path
        d="M45 72c24 8 41 10 61 8 22-2 42-12 69-11 28 1 49 14 79 35"
        stroke="rgba(15,217,200,0.22)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M204 42c8 5 17 12 25 21"
        stroke="rgba(240,90,40,0.35)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="258" cy="40" r="7" stroke="rgba(240,90,40,0.24)" strokeWidth="1.6" />
    </svg>
  );
}

function NoiseTexture({ className }: { className?: string }) {
  const id = useId();

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full opacity-35", className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="1.05" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="100" height="100" filter={`url(#${id})`} opacity="0.55" />
    </svg>
  );
}

function LiveTypingDots() {
  return (
    <span className="inline-flex items-center gap-1.5">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="h-1.5 w-1.5 rounded-full bg-[#0FD9C8]"
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            delay: index * 0.16,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

function MagneticBentoCell({
  className,
  children,
  accent,
  withTexture = false,
  withDoodle = false,
}: BentoCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  const spring = { stiffness: 220, damping: 24, mass: 0.7 };
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);
  const springRotateX = useSpring(rotateX, spring);
  const springRotateY = useSpring(rotateY, spring);
  const springScale = useSpring(scale, spring);

  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;

    const bounds = ref.current.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;

    x.set(px * 18);
    y.set(py * 18);
    rotateX.set(py * -7);
    rotateY.set(px * 7);
    scale.set(1.02);
  };

  const onLeave = () => {
    if (reduceMotion) return;

    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.article
      ref={ref}
      data-bento-cell
      className={cn(
        "group relative overflow-hidden rounded-[1.55rem] border border-[#F5F4F0]/10 bg-[#111116] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.28)]",
        "backdrop-blur-[2px]",
        className
      )}
      style={{
        x: reduceMotion ? 0 : springX,
        y: reduceMotion ? 0 : springY,
        rotateX: reduceMotion ? 0 : springRotateX,
        rotateY: reduceMotion ? 0 : springRotateY,
        scale: reduceMotion ? 1 : springScale,
        transformStyle: "preserve-3d",
      }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={reduceMotion ? undefined : { boxShadow: "0 22px 90px rgba(0,0,0,0.38)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,244,240,0.08)_0%,transparent_26%,transparent_72%,rgba(240,90,40,0.1)_100%)]" />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-95",
          accent
        )}
        aria-hidden
      />
      {withTexture ? <NoiseTexture /> : null}
      {withDoodle ? <DoodleStroke /> : null}
      <div className="relative z-10 h-full">{children}</div>
    </motion.article>
  );
}

function AuditorState() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % auditorPhases.length);
    }, 2600);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const steps = useMemo(() => {
    return auditorPhases.map((phase, phaseIndex) => {
      const state: CellState =
        phaseIndex < index ? "done" : phaseIndex === index ? "active" : "queued";
      return { phase, state, index: phaseIndex + 1 };
    });
  }, [index]);

  return (
    <div className="flex h-full min-h-[360px] flex-col">
      <div className="flex items-center justify-between border-b border-[#F5F4F0]/10 pb-4">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[#0FD9C8]">
            Agentic assistant
          </p>
          <h3 className="mt-2 font-syne text-[1.55rem] font-semibold tracking-[-0.04em] text-[#F5F4F0]">
            Live Strategy Auditor
          </h3>
        </div>
        <div className="rounded-full border border-[#F5F4F0]/10 bg-[#0C0C0E]/70 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#F5F4F0]/55">
          Thinking <LiveTypingDots />
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="rounded-[1.15rem] border border-[#F5F4F0]/10 bg-[#0C0C0E]/80 p-4">
          <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.2em] text-[#F5F4F0]/45">
            <span>Task runner</span>
            <span>Step {index + 1} of {auditorPhases.length}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(8px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-3 text-pretty text-sm leading-7 text-[#F5F4F0]/72"
            >
              {auditorPhases[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="grid gap-2">
          {steps.map((step) => (
            <div
              key={step.index}
              className={cn(
                "flex items-center justify-between rounded-[1rem] border px-3 py-2.5 text-sm transition-colors",
                step.state === "done"
                  ? "border-[#0FD9C8]/25 bg-[#0FD9C8]/8 text-[#F5F4F0]/78"
                  : step.state === "active"
                    ? "border-[#F05A28]/35 bg-[#F05A28]/10 text-[#F5F4F0]"
                    : "border-[#F5F4F0]/10 bg-[#13131A] text-[#F5F4F0]/50"
              )}
            >
              <span className="max-w-[24ch] text-pretty leading-6">{step.phase}</span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em]">
                {step.state === "done" ? "done" : step.state === "active" ? "running" : "queued"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-5">
        <div className="rounded-[1.15rem] border border-[#F5F4F0]/10 bg-[#13131A] p-4">
          <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.2em] text-[#F5F4F0]/42">
            <span>Recommendation</span>
            <span>Draft</span>
          </div>
          <p className="mt-3 text-sm leading-7 text-[#F5F4F0]/72">
            Reframe the homepage above-the-fold as a diagnosis system, then let the next section prove the claim with live operational evidence.
          </p>
        </div>
      </div>
    </div>
  );
}

function OrbScene() {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.08;
    }

    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.22;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.55}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <icosahedronGeometry args={[1.05, 0]} />
          <MeshTransmissionMaterial
            samples={6}
            transmission={1}
            thickness={1.1}
            roughness={0.04}
            chromaticAberration={0.08}
            anisotropy={0.12}
            distortion={0.04}
            temporalDistortion={0.06}
            backside
            backsideThickness={0.45}
            color="#F5F4F0"
          />
        </mesh>
      </Float>
      <ambientLight intensity={0.35} />
      <pointLight position={[2.8, 2.4, 3.5]} intensity={1.4} color="#F05A28" />
      <pointLight position={[-2.8, -1.8, 2.5]} intensity={1.1} color="#0FD9C8" />
    </group>
  );
}

function ViewTrackedOrb({ trackRef }: { trackRef: RefObject<HTMLElement> }) {
  return (
    <div
      ref={trackRef as unknown as RefObject<HTMLDivElement>}
      className="relative h-full min-h-[210px] overflow-hidden rounded-[1.2rem] border border-[#F5F4F0]/10 bg-[#0C0C0E]/80"
    >
      <View track={trackRef} className="absolute inset-0 h-full w-full">
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={36} />
        <Environment preset="city" />
        <ContactShadows opacity={0.38} scale={8} blur={2.2} far={4} color="#0C0C0E" frames={1} />
        <OrbScene />
      </View>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,rgba(15,217,200,0.12),transparent_42%),linear-gradient(180deg,transparent_0%,rgba(12,12,14,0.5)_100%)]" />
      <div className="relative z-10 flex h-full items-end justify-between p-4">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#0FD9C8]">
            Tracked view
          </p>
          <p className="mt-2 max-w-[18ch] text-sm leading-6 text-[#F5F4F0]/72">
            Persistent canvas element inside a Bento cell.
          </p>
        </div>
        <span className="rounded-full border border-[#F5F4F0]/10 bg-[#13131A]/80 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#F5F4F0]/55">
          View
        </span>
      </div>
    </div>
  );
}

export function BentoDiagnosisGrid() {
  const rootRef = useRef<HTMLElement>(null);
  const orbTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current) return;

      const ctx = gsap.context(() => {
        const cells = gsap.utils.toArray<HTMLElement>("[data-bento-cell]", rootRef.current);

        gsap.fromTo(
          cells,
          { opacity: 0, y: 36, scale: 0.98, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 76%",
              once: true,
            },
          }
        );
      }, rootRef);

      return () => ctx.revert();
    },
    { scope: rootRef, revertOnUpdate: true }
  );

  return (
    <section ref={rootRef} className="px-6 py-6 md:px-10 md:py-10 xl:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#F05A28]/90">
              Tactile maximalism
            </p>
            <h2 className="mt-3 max-w-[14ch] font-syne text-3xl font-semibold tracking-[-0.04em] text-[#F5F4F0] md:text-5xl">
              A bento grid that feels like an operating surface.
            </h2>
          </div>
          <p className="max-w-2xl text-pretty text-sm leading-7 text-[#F5F4F0]/62 md:text-base">
            This section mixes structured evidence, small imperfection layers, and a live strategy runner so the page reads like a system being inspected in real time.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12 lg:auto-rows-[minmax(160px,auto)]">
          <MagneticBentoCell
            className="min-h-[420px] lg:col-span-7 lg:row-span-2"
            accent="bg-[radial-gradient(circle_at_18%_20%,rgba(240,90,40,0.16),transparent_28%),radial-gradient(circle_at_74%_28%,rgba(15,217,200,0.12),transparent_22%)]"
            withTexture
            withDoodle
          >
            <AuditorState />
          </MagneticBentoCell>

          <MagneticBentoCell
            className="min-h-[220px] lg:col-span-5"
            accent="bg-[radial-gradient(circle_at_70%_22%,rgba(15,217,200,0.18),transparent_32%),linear-gradient(135deg,rgba(245,244,240,0.03)_0%,transparent_100%)]"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#0FD9C8]">
                  Signal compression
                </p>
                <h3 className="mt-3 max-w-[11ch] font-syne text-[1.65rem] font-semibold tracking-[-0.04em] text-[#F5F4F0]">
                  What the buyer sees first.
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                {["Problem clarity", "Proof density", "Action path"].map((label, index) => (
                  <div key={label} className="rounded-[1rem] border border-[#F5F4F0]/10 bg-[#0C0C0E]/70 p-3">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#F5F4F0]/42">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 leading-6 text-[#F5F4F0]/72">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </MagneticBentoCell>

          <MagneticBentoCell
            className="min-h-[220px] lg:col-span-4"
            accent="bg-[radial-gradient(circle_at_20%_20%,rgba(240,90,40,0.14),transparent_30%),linear-gradient(180deg,rgba(245,244,240,0.04)_0%,transparent_100%)]"
            withDoodle
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#F05A28]">
                  Friction
                </p>
                <h3 className="mt-3 font-syne text-[1.55rem] font-semibold tracking-[-0.04em] text-[#F5F4F0]">
                  Where the page starts losing force.
                </h3>
              </div>
              <div className="flex items-end gap-3">
                {[34, 56, 28, 71, 45, 62].map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center gap-2">
                    <div className="w-full rounded-full bg-[#F5F4F0]/10" style={{ height: 86 }}>
                      <div
                        className="mt-auto rounded-full bg-linear-to-t from-[#F05A28] via-[#0FD9C8] to-[#F5F4F0]"
                        style={{ height: `${value}%`, width: "100%" }}
                      />
                    </div>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#F5F4F0]/40">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </MagneticBentoCell>

          <MagneticBentoCell
            className="min-h-[240px] lg:col-span-3"
            accent="bg-[radial-gradient(circle_at_70%_30%,rgba(245,244,240,0.08),transparent_35%),linear-gradient(135deg,rgba(15,217,200,0.08)_0%,transparent_100%)]"
            withTexture
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#0FD9C8]">
                  Surface tone
                </p>
                <h3 className="mt-3 font-syne text-[1.5rem] font-semibold tracking-[-0.04em] text-[#F5F4F0]">
                  Slightly imperfect by design.
                </h3>
              </div>
              <div className="grid gap-2 text-sm text-[#F5F4F0]/70">
                <div className="flex items-center justify-between rounded-[0.95rem] border border-[#F5F4F0]/10 bg-[#0C0C0E]/70 px-3 py-2">
                  <span>Hand-drawn edges</span>
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#F5F4F0]/45">on</span>
                </div>
                <div className="flex items-center justify-between rounded-[0.95rem] border border-[#F5F4F0]/10 bg-[#0C0C0E]/70 px-3 py-2">
                  <span>Smudged texture</span>
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#F5F4F0]/45">on</span>
                </div>
              </div>
            </div>
          </MagneticBentoCell>

          <MagneticBentoCell
            className="min-h-[240px] lg:col-span-5"
            accent="bg-[radial-gradient(circle_at_26%_30%,rgba(15,217,200,0.14),transparent_32%),radial-gradient(circle_at_78%_72%,rgba(240,90,40,0.1),transparent_24%)]"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#0FD9C8]">
                  Strategy lock
                </p>
                <h3 className="mt-3 max-w-[12ch] font-syne text-[1.6rem] font-semibold tracking-[-0.04em] text-[#F5F4F0]">
                  What happens next after the audit.
                </h3>
              </div>
              <div className="grid gap-2 text-sm">
                {[
                  "Tighten the diagnosis layer.",
                  "Expose proof where intent is highest.",
                  "Move one step closer to the call to action.",
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-[1rem] border border-[#F5F4F0]/10 bg-[#0C0C0E]/70 px-3 py-2.5 text-[#F5F4F0]/72">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#F5F4F0]/10 bg-[#13131A] font-mono text-[0.66rem] text-[#F05A28]">
                      0{index + 1}
                    </span>
                    <span className="leading-6">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </MagneticBentoCell>

          <MagneticBentoCell
            className="min-h-[240px] lg:col-span-4"
            accent="bg-[radial-gradient(circle_at_50%_40%,rgba(240,90,40,0.12),transparent_32%),linear-gradient(180deg,rgba(245,244,240,0.03)_0%,transparent_100%)]"
          >
            <ViewTrackedOrb trackRef={orbTrackRef as unknown as RefObject<HTMLElement>} />
          </MagneticBentoCell>
        </div>
      </div>
    </section>
  );
}

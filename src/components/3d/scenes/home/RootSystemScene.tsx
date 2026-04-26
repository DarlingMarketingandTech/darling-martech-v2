"use client";

import { Html, MeshTransmissionMaterial, PerspectiveCamera, View } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AdditiveBlending,
  DynamicDrawUsage,
  Euler,
  InstancedMesh,
  MathUtils,
  Mesh,
  Object3D,
  PerspectiveCamera as ThreePerspectiveCamera,
  type Group,
} from "three";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type RootSystemStep = {
  number: string;
  title: string;
  description: string;
  callout: string;
};

type RootSystemSceneProps = {
  trackRef: RefObject<HTMLElement>;
  steps: RootSystemStep[];
  onStepChange?: (index: number) => void;
};

const PARTICLE_COUNT = 42;
const PACKET_COUNT = 8;
const PARTICLE_CONVERGENCE_EPSILON = 0.001;
const PACKET_LANE_Y = [-0.92, -0.42, 0.42, 0.92] as const;
const tempObject = new Object3D();

const nodePositions = [
  [-1.12, 0.98, 0.2],
  [1.12, 0.98, -0.16],
  [-1.12, -1.04, 0.12],
  [1.12, -1.04, 0.16],
] as const;

const calloutPositions = [
  [-1.5, 0.18, 0.44],
  [1.52, 0.18, 0.22],
  [-1.5, -0.28, 0.34],
  [1.52, -0.28, 0.28],
] as const;

function easeInOut(value: number) {
  return value * value * (3 - 2 * value);
}

function remap(value: number, inputMin: number, inputMax: number) {
  return MathUtils.clamp((value - inputMin) / (inputMax - inputMin), 0, 1);
}

function makeParticle(index: number) {
  const angle = index * 2.399963 + (index % 3) * 0.2;
  const radius = 3.4 + (index % 7) * 0.22;
  const y = ((index % 9) - 4) * 0.34;

  return {
    origin: [Math.cos(angle) * radius, y, Math.sin(angle) * 0.74] as const,
    target: [Math.cos(angle) * 0.46, y * 0.16, Math.sin(angle) * 0.22] as const,
    scale: 0.045 + (index % 5) * 0.012,
    phase: index * 0.37,
  };
}

function EngineRoomScene({ trackRef, steps, onStepChange }: RootSystemSceneProps) {
  const reduceMotion = useReducedMotion();
  const progressRef = useRef(0);
  const reactorRef = useRef<Mesh>(null);
  const reactorShellRef = useRef<Mesh>(null);
  const particleRef = useRef<InstancedMesh>(null);
  const packetRefs = useRef<Array<Mesh | null>>([]);
  const gridRef = useRef<Group>(null);
  const healthRef = useRef<Group>(null);
  const cameraRef = useRef<ThreePerspectiveCamera>(null);
  const isVisibleRef = useRef(false);
  const lastParticleConvergenceRef = useRef(-1);
  const [activeStep, setActiveStep] = useState(0);
  const { invalidate } = useThree();

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, index) => makeParticle(index));
  }, []);

  const gridLines = useMemo(() => {
    const lines: Array<{ position: [number, number, number]; scale: [number, number, number]; rotation?: Euler }> = [];
    for (let index = -2; index <= 2; index += 1) {
      lines.push({ position: [index * 0.72, 0, -0.08], scale: [0.014, 1.55, 0.014] });
      lines.push({
        position: [0, index * 0.48, -0.08],
        scale: [2.2, 0.014, 0.014],
      });
    }
    lines.push({
      position: [0, 0, -0.09],
      scale: [2.62, 0.012, 0.012],
      rotation: new Euler(0, 0, Math.PI / 4),
    });
    lines.push({
      position: [0, 0, -0.09],
      scale: [2.62, 0.012, 0.012],
      rotation: new Euler(0, 0, -Math.PI / 4),
    });
    return lines;
  }, []);

  useEffect(() => {
    if (particleRef.current) {
      particleRef.current.instanceMatrix.setUsage(DynamicDrawUsage);
    }
  }, []);

  useEffect(() => {
    const target = trackRef.current;

    if (!target || typeof IntersectionObserver === "undefined") {
      isVisibleRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry?.isIntersecting ?? false;
        if (isVisibleRef.current) invalidate();
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [trackRef, invalidate]);

  useGSAP(
    () => {
      if (!trackRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top 82%",
        end: "bottom 28%",
        scrub: 0.9,
        onUpdate: (self) => {
          progressRef.current = reduceMotion ? 1 : self.progress;
          const nextStep = Math.min(3, Math.floor(progressRef.current * 4));
          setActiveStep((current) => {
            if (current === nextStep) return current;
            onStepChange?.(nextStep);
            return nextStep;
          });
          invalidate();
        },
      });

      progressRef.current = reduceMotion ? 1 : progressRef.current;
      if (reduceMotion) {
        setActiveStep(3);
        onStepChange?.(3);
      }

      return () => trigger.kill();
    },
    { scope: trackRef, dependencies: [reduceMotion, invalidate, onStepChange], revertOnUpdate: true }
  );

  useFrame((state, delta) => {
    if (!isVisibleRef.current) return;

    const progress = reduceMotion ? 1 : progressRef.current;
    const convergence = easeInOut(remap(progress, 0, 0.28));
    const gridBuild = easeInOut(remap(progress, 0.24, 0.52));
    const automation = remap(progress, 0.48, 0.78);
    const health = easeInOut(remap(progress, 0.74, 1));
    const elapsed = state.clock.elapsedTime;

    if (cameraRef.current) {
      cameraRef.current.position.z = MathUtils.lerp(cameraRef.current.position.z, 4.7 + health * 1.05, 0.045);
      cameraRef.current.position.y = MathUtils.lerp(cameraRef.current.position.y, 0.08 - health * 0.12, 0.045);
      cameraRef.current.lookAt(0, 0, 0);
    }

    if (reactorRef.current) {
      reactorRef.current.rotation.x += reduceMotion ? 0 : delta * (0.16 + health * 0.08);
      reactorRef.current.rotation.y += reduceMotion ? 0 : delta * (0.2 + gridBuild * 0.08);
      const pulse = Math.sin(elapsed * 2.4) * 0.025 * health;
      reactorRef.current.scale.setScalar(1 + convergence * 0.08 + health * 0.22 + pulse);
    }

    if (reactorShellRef.current) {
      reactorShellRef.current.rotation.z -= reduceMotion ? 0 : delta * 0.1;
      reactorShellRef.current.scale.setScalar(1.42 + health * 0.54);
    }

    if (gridRef.current) {
      gridRef.current.scale.set(gridBuild * (1 + health * 0.32), gridBuild * (1 + health * 0.32), gridBuild);
      gridRef.current.position.z = -0.22 + gridBuild * 0.12;
      gridRef.current.visible = gridBuild > 0.02;
    }

    if (healthRef.current) {
      healthRef.current.scale.setScalar(1.15 + health * 1.2 + Math.sin(elapsed * 3.2) * 0.035 * health);
      healthRef.current.visible = health > 0.02;
    }

    if (particleRef.current) {
      const particleMotionActive = !reduceMotion && convergence < 0.98;
      const convergenceChanged =
        Math.abs(convergence - lastParticleConvergenceRef.current) > PARTICLE_CONVERGENCE_EPSILON;

      if (particleMotionActive || convergenceChanged) {
        for (let index = 0; index < particles.length; index += 1) {
          const particle = particles[index]!;
          const [originX, originY, originZ] = particle.origin;
          const [targetX, targetY, targetZ] = particle.target;
          const x = MathUtils.lerp(originX, targetX, convergence);
          const y = MathUtils.lerp(originY, targetY, convergence);
          const z = MathUtils.lerp(originZ, targetZ, convergence);
          const jitterX = particleMotionActive ? Math.sin(elapsed * 0.8 + particle.phase) * 0.045 : 0;
          const jitterY = particleMotionActive ? Math.cos(elapsed * 0.7 + particle.phase) * 0.035 : 0;
          const rotationTime = particleMotionActive ? elapsed : 0;
          const scalar = particle.scale * (1 + convergence * 0.55);
          tempObject.position.set(x + jitterX, y + jitterY, z);
          tempObject.rotation.set(rotationTime * 0.2 + particle.phase, rotationTime * 0.12, particle.phase);
          tempObject.scale.setScalar(scalar);
          tempObject.updateMatrix();
          particleRef.current.setMatrixAt(index, tempObject.matrix);
        }
        particleRef.current.instanceMatrix.needsUpdate = true;
        lastParticleConvergenceRef.current = convergence;
      }
    }

    packetRefs.current.forEach((packet, index) => {
      if (!packet) return;
      const lane = index % 4;
      const direction = index % 2 === 0 ? 1 : -1;
      const offset = (elapsed * (0.18 + lane * 0.025) + index * 0.17) % 1;
      const x = MathUtils.lerp(-1.58, 1.58, direction > 0 ? offset : 1 - offset);
      const y = PACKET_LANE_Y[lane];
      packet.position.set(x, y, 0.08 + lane * 0.015);
      packet.scale.setScalar((0.05 + lane * 0.006) * automation);
      packet.visible = automation > 0.04;
    });
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0.08, 5.1]} fov={36} />
      <fog attach="fog" args={["#0C0C0E", 4.2, 9.5]} />
      <ambientLight intensity={0.42} />
      <directionalLight position={[3.5, 3.4, 3.2]} intensity={1.8} color="#F5F4F0" />
      <pointLight position={[-3.2, 1.2, 2.4]} intensity={2.2} color="#F05A28" />
      <pointLight position={[2.8, -1.6, 2.2]} intensity={2.4} color="#0FD9C8" />

      <group position={[0, -0.18, 0]} rotation={[0.08, -0.18, 0]}>
        <instancedMesh ref={particleRef} args={[undefined, undefined, PARTICLE_COUNT]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#F05A28"
            emissive="#F05A28"
            emissiveIntensity={1.8}
            transparent
            opacity={0.78}
            toneMapped={false}
          />
        </instancedMesh>

        <group ref={gridRef} visible={false}>
          {gridLines.map((line, index) => (
            <mesh key={`grid-line-${index}`} position={line.position} scale={line.scale} rotation={line.rotation}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color="#0FD9C8"
                emissive="#0FD9C8"
                emissiveIntensity={1.6}
                transparent
                opacity={0.52}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>

        <mesh ref={reactorShellRef} rotation={[0.6, 0.15, 0.2]}>
          <octahedronGeometry args={[1.08, 0]} />
          <meshBasicMaterial color="#0FD9C8" wireframe transparent opacity={0.12} blending={AdditiveBlending} />
        </mesh>

        <mesh ref={reactorRef}>
          <icosahedronGeometry args={[0.72, 1]} />
          <MeshTransmissionMaterial
            samples={2}
            resolution={256}
            transmission={1}
            thickness={0.82}
            roughness={0.05}
            chromaticAberration={0.08}
            anisotropy={0.08}
            distortion={0.05}
            distortionScale={0.14}
            temporalDistortion={0.04}
            backside
            backsideThickness={0.24}
            color="#F5F4F0"
          />
        </mesh>

        {Array.from({ length: PACKET_COUNT }, (_, index) => (
          <mesh
            key={`packet-${index}`}
            ref={(node) => {
              packetRefs.current[index] = node;
            }}
            visible={false}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#0FD9C8" : "#F05A28"}
              emissive={index % 2 === 0 ? "#0FD9C8" : "#F05A28"}
              emissiveIntensity={2.6}
              toneMapped={false}
            />
          </mesh>
        ))}

        <group ref={healthRef} visible={false}>
          <mesh>
            <torusGeometry args={[1.75, 0.008, 8, 72]} />
            <meshBasicMaterial color="#0FD9C8" transparent opacity={0.72} blending={AdditiveBlending} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.64, 0.007, 8, 72]} />
            <meshBasicMaterial color="#0FD9C8" transparent opacity={0.42} blending={AdditiveBlending} />
          </mesh>
        </group>

        {steps.map((step, index) => {
          const active = index <= activeStep;
          const [x, y, z] = nodePositions[index];
          const [cx, cy, cz] = calloutPositions[index];
          return (
            <group key={step.number}>
              <mesh position={[x * 0.58, y * 0.56, z]}>
                <sphereGeometry args={[0.035 + (active ? 0.018 : 0), 12, 12]} />
                <meshBasicMaterial color={active ? "#0FD9C8" : "#F5F4F0"} transparent opacity={active ? 0.95 : 0.32} />
              </mesh>
              <Html
                position={[x, y, z + 0.12]}
                center
                distanceFactor={6.2}
                scale={0.56}
                transform
                occlude="blending"
                // Clamp three.js depth-derived z-index to [10,0] so this element
                // never escapes the Canvas compositor layer and beats page content.
                zIndexRange={[5, 0]}
                className="pointer-events-none select-none"
              >
                <div
                  className={cn(
                    "pointer-events-none w-41 rounded-2xl border bg-[#0C0C0E]/78 px-3 py-2.5 text-left shadow-[0_18px_45px_rgba(0,0,0,0.42)] backdrop-blur-md transition-all duration-300",
                    active
                      ? "border-[#0FD9C8]/35 text-[#F5F4F0] opacity-100"
                      : "border-[#F5F4F0]/10 text-[#F5F4F0]/45 opacity-55"
                  )}
                >
                  <div className="flex items-center justify-between gap-3 font-mono text-[0.58rem] uppercase tracking-[0.18em]">
                    <span className={active ? "text-[#0FD9C8]" : "text-[#F5F4F0]/38"}>{step.number}</span>
                    <span className={active ? "text-[#F05A28]" : "text-[#F5F4F0]/34"}>{step.callout}</span>
                  </div>
                  <p className="mt-2 text-[0.68rem] font-semibold leading-snug tracking-normal">{step.title}</p>
                  <p className="mt-1.5 text-[0.58rem] leading-relaxed text-[#F5F4F0]/62">{step.description}</p>
                </div>
              </Html>
              <Html
                position={[cx, cy, cz]}
                center
                distanceFactor={7.4}
                scale={0.54}
                transform
                occlude="blending"
                zIndexRange={[5, 0]}
                className="pointer-events-none select-none"
              >
                <span
                  className={cn(
                    "pointer-events-none font-mono text-[0.55rem] uppercase tracking-[0.18em] transition-opacity duration-200",
                    active ? "animate-pulse text-[#0FD9C8]/80 opacity-100" : "text-[#F5F4F0]/25 opacity-30"
                  )}
                >
                  {active ? ["SYNC_ACTIVE", "GRID_LOCKED", "FLOW_RATE: 100%", "HEALTH: STABLE"][index] : "WAITING"}
                </span>
              </Html>
            </group>
          );
        })}
      </group>
    </>
  );
}

export function RootSystemScene({ trackRef, steps, onStepChange }: RootSystemSceneProps) {
  return (
    // isolation: isolate  → strict local stacking context; no child z-index escapes
    // transform-style: flat → collapses the CSS 3D depth axis so Html matrix3d
    //   transforms cannot visually intersect elements outside this layer
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 isolate transform-flat"
    >
      <View track={trackRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full">
        <EngineRoomScene trackRef={trackRef} steps={steps} onStepChange={onStepChange} />
      </View>
    </div>
  );
}

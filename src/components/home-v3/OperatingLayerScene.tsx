"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles, Text } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const TEAL = "#0FD9C8";
const TEAL_DEEP = "#0BBFB0";
const BACKGROUND = "#0C0C0E";

/* -------------------------------------------------------------------------- */
/* Chip stack                                                                  */
/* -------------------------------------------------------------------------- */

function ChipStack({ reduce }: { reduce: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reduce) return;
    if (groupRef.current) {
      // Subtle hover + slow rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.18;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.7) * 0.04;
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.32 + Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Bottom glow disc beneath chip */}
      <mesh ref={glowRef} position={[0, -0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 64]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.32} />
      </mesh>

      {/* Stacked layers - bottom widest, top narrowest */}
      {[0, 1, 2].map((i) => {
        const scale = 1 - i * 0.08;
        const y = -0.18 + i * 0.14;
        const opacity = 0.62 + i * 0.12;
        return (
          <RoundedBox
            key={i}
            args={[1.7 * scale, 0.1, 1.7 * scale]}
            radius={0.08}
            smoothness={4}
            position={[0, y, 0]}
          >
            <meshStandardMaterial
              color="#0E1A1F"
              emissive={TEAL}
              emissiveIntensity={0.35}
              metalness={0.6}
              roughness={0.25}
              transparent
              opacity={opacity}
            />
          </RoundedBox>
        );
      })}

      {/* Top face glow plate */}
      <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 1.4]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.18} />
      </mesh>

      {/* "A" mark */}
      <Text
        position={[0, 0.08, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.7}
        color={TEAL}
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.95}
        outlineWidth={0}
        fontWeight="bold"
      >
        A
      </Text>

      {/* Subheading text */}
      <Text
        position={[0, 0.08, 0.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.085}
        color="#F5F4F0"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.3}
        fillOpacity={0.72}
      >
        OPERATING LAYER
      </Text>

      <Text
        position={[0, 0.08, 0.62]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.05}
        color={TEAL}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.4}
        fillOpacity={0.65}
      >
        CLARITY · CONNECTION · BETTER DECISIONS
      </Text>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Concentric rings on ground                                                  */
/* -------------------------------------------------------------------------- */

function ConcentricRings({ reduce }: { reduce: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reduce) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  const rings = useMemo(() => {
    return [1.4, 1.85, 2.3, 2.85, 3.45, 4.1, 4.85].map((radius, i) => ({
      radius,
      opacity: 0.55 - i * 0.06,
      key: i,
    }));
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {rings.map(({ radius, opacity, key }) => (
        <mesh key={key}>
          <ringGeometry args={[radius - 0.005, radius + 0.005, 96]} />
          <meshBasicMaterial color={TEAL} transparent opacity={opacity} />
        </mesh>
      ))}

      {/* A few brighter dots along the rings */}
      {[0, 1, 2, 3].map((i) => {
        const radius = 1.85 + i * 0.5;
        const angle = i * 0.78 + 0.4;
        return (
          <mesh
            key={`dot-${i}`}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0.001]}
          >
            <circleGeometry args={[0.04, 16]} />
            <meshBasicMaterial color={TEAL} transparent opacity={0.95} />
          </mesh>
        );
      })}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Camera rig - parallax on mouse                                              */
/* -------------------------------------------------------------------------- */

function CameraRig({ reduce }: { reduce: boolean }) {
  const { camera, mouse } = useThree();
  const target = useRef(new THREE.Vector3(0, 0.4, 5.4));

  useFrame(() => {
    if (reduce) {
      camera.position.set(0, 1.4, 5.4);
      camera.lookAt(0, 0, 0);
      return;
    }
    const x = mouse.x * 0.55;
    const y = 1.4 + mouse.y * 0.25;
    target.current.set(x, y, 5.4);
    camera.position.lerp(target.current, 0.05);
    camera.lookAt(0, 0.05, 0);
  });

  return null;
}

/* -------------------------------------------------------------------------- */
/* Public scene                                                                */
/* -------------------------------------------------------------------------- */

export function OperatingLayerScene() {
  const reduce = useReducedMotion() === true;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Defer canvas mount one frame so the surrounding layout settles first.
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Canvas
      className="!absolute inset-0 size-full"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.4, 5.4], fov: 38 }}
      style={{ background: "transparent" }}
    >
      <CameraRig reduce={reduce} />

      {/* Lights */}
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 3, 2]} intensity={2.4} color={TEAL} distance={8} />
      <pointLight position={[-3, 2, 3]} intensity={1.1} color={TEAL_DEEP} distance={10} />
      <pointLight position={[3, -1, 2]} intensity={0.6} color="#F05A28" distance={8} />
      <fog attach="fog" args={[BACKGROUND, 6, 13]} />

      <Float
        enabled={!reduce}
        speed={1.2}
        rotationIntensity={0.06}
        floatIntensity={0.5}
        floatingRange={[-0.04, 0.06]}
      >
        <ChipStack reduce={reduce} />
      </Float>

      <ConcentricRings reduce={reduce} />

      {/* Ambient particle dust */}
      <Sparkles
        count={42}
        scale={[6, 3, 6]}
        position={[0, 0.6, 0]}
        size={1.6}
        speed={reduce ? 0 : 0.3}
        opacity={0.55}
        color={TEAL}
      />
      <Sparkles
        count={18}
        scale={[8, 4, 4]}
        position={[0, 0.4, 0]}
        size={2.4}
        speed={reduce ? 0 : 0.2}
        opacity={0.32}
        color="#F5F4F0"
      />
    </Canvas>
  );
}

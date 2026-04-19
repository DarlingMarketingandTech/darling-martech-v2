"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import type { Group } from "three";

/**
 * Flagship studio surface: low-poly icosahedron with a translucent orange
 * shell and teal sparkles. Kept intentionally lightweight — no HDRI, no
 * post-processing. The wrapper in `StudioHero.tsx` handles lazy loading and
 * `prefers-reduced-motion` short-circuiting so this module never executes
 * when the user opts out of motion.
 */
function Shape() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.14;
    groupRef.current.rotation.x += delta * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshStandardMaterial
            color="#0c0c0e"
            emissive="#f05a28"
            emissiveIntensity={0.45}
            metalness={0.9}
            roughness={0.22}
            wireframe
          />
        </mesh>
      </Float>
      <Float speed={1.7} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh scale={0.94}>
          <icosahedronGeometry args={[1.25, 0]} />
          <meshStandardMaterial
            color="#f05a28"
            transparent
            opacity={0.26}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      </Float>
      <Sparkles count={40} scale={4} size={2} color="#0fd9c8" speed={0.3} opacity={0.7} />
    </group>
  );
}

export default function StudioHeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 2, 4]} intensity={1.8} color="#f05a28" />
      <pointLight position={[-4, -2, -2]} intensity={0.9} color="#0fd9c8" />
      <Shape />
    </Canvas>
  );
}

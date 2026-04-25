"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type RefObject } from "react";

type Point = { x: number; y: number };

type AnimatedBeamProps = {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  duration?: number;
  className?: string;
};

function centerPoint(
  containerRect: DOMRect,
  elementRect: DOMRect
): Point {
  return {
    x: elementRect.left - containerRect.left + elementRect.width / 2,
    y: elementRect.top - containerRect.top + elementRect.height / 2,
  };
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 36,
  duration = 2.4,
  className,
}: AnimatedBeamProps) {
  const [path, setPath] = useState("");
  const [viewBox, setViewBox] = useState("0 0 0 0");

  useEffect(() => {
    const updatePath = () => {
      const container = containerRef.current;
      const from = fromRef.current;
      const to = toRef.current;

      if (!container || !from || !to) return;

      const containerRect = container.getBoundingClientRect();
      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();

      const start = centerPoint(containerRect, fromRect);
      const end = centerPoint(containerRect, toRect);
      const dx = end.x - start.x;
      const c1x = start.x + dx * 0.35;
      const c2x = start.x + dx * 0.7;
      const c1y = start.y - curvature;
      const c2y = end.y + curvature;

      setViewBox(`0 0 ${containerRect.width} ${containerRect.height}`);
      setPath(`M ${start.x} ${start.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${end.x} ${end.y}`);
    };

    updatePath();

    const resizeObserver = new ResizeObserver(updatePath);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (fromRef.current) resizeObserver.observe(fromRef.current);
    if (toRef.current) resizeObserver.observe(toRef.current);

    window.addEventListener("resize", updatePath);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [containerRef, curvature, fromRef, toRef]);

  return (
    <svg
      className={className}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d={path}
        fill="none"
        stroke="rgba(245, 244, 240, 0.22)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <motion.path
        d={path}
        fill="none"
        stroke="#0FD9C8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="12 10"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -44 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

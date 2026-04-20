"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type MonoMetricProps = {
  value: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** When false, shows final value immediately (no count-up). Still respects `prefers-reduced-motion`. */
  animateValue?: boolean;
};

function parseMetric(value: string) {
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  const [, prefix, numericPart, suffix] = match;
  const decimals = numericPart.includes(".") ? numericPart.split(".")[1]?.length ?? 0 : 0;

  return {
    prefix,
    value: Number(numericPart),
    suffix,
    decimals,
  };
}

export function MonoMetric({
  value,
  label,
  size = "md",
  className,
  animateValue = true,
}: MonoMetricProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const parsed = useMemo(() => parseMetric(value), [value]);
  const [displayValue, setDisplayValue] = useState(value);

  const shouldAnimate = animateValue && !reduceMotion && Boolean(parsed);

  useEffect(() => {
    if (!shouldAnimate || !isInView || !parsed) {
      setDisplayValue(value);
      return;
    }

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.value * eased;
      const formatted = current.toFixed(parsed.decimals).replace(/\.0+$/, "");
      setDisplayValue(`${parsed.prefix}${formatted}${parsed.suffix}`);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldAnimate, isInView, parsed, value]);

  const sizeClassName =
    size === "lg"
      ? "text-4xl md:text-5xl lg:text-6xl"
      : size === "sm"
        ? "text-[1.65rem] md:text-3xl"
        : "text-3xl md:text-4xl lg:text-5xl";

  return (
    <div ref={ref} className={className}>
      <p
        className={cn(
          "font-mono font-bold tabular-nums tracking-[-0.03em] text-[#0FD9C8]",
          sizeClassName
        )}
      >
        {displayValue}
      </p>
      {label ? <p className="meta-label mt-3 max-w-[20rem] leading-snug">{label}</p> : null}
    </div>
  );
}

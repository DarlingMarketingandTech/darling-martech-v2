"use client";

import { cn } from "@/lib/utils";

interface ToolRangeInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  id?: string;
  className?: string;
  ariaLabel?: string;
}

export function ToolRangeInput({
  value,
  onChange,
  min,
  max,
  step,
  id,
  className,
  ariaLabel,
}: ToolRangeInputProps) {
  return (
    <input
      id={id}
      type="range"
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      min={min}
      max={max}
      step={step}
      aria-label={ariaLabel}
      className={cn("w-full accent-[#F05A28]", className)}
    />
  );
}

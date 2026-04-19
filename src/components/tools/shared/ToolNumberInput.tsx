"use client";

import { cn } from "@/lib/utils";

interface ToolNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  id?: string;
  className?: string;
  ariaLabel?: string;
}

export function ToolNumberInput({
  value,
  onChange,
  min,
  max,
  step,
  placeholder,
  id,
  className,
  ariaLabel,
}: ToolNumberInputProps) {
  return (
    <input
      id={id}
      type="number"
      value={Number.isFinite(value) ? value : 0}
      onChange={(event) => {
        const next = Number(event.target.value);
        onChange(Number.isFinite(next) ? next : 0);
      }}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-[#101014] px-4 py-3 font-mono text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]",
        className
      )}
    />
  );
}

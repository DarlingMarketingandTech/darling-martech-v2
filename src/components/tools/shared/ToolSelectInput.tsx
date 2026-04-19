"use client";

import { cn } from "@/lib/utils";

interface ToolSelectOption {
  value: string;
  label: string;
}

interface ToolSelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: ToolSelectOption[];
  id?: string;
  className?: string;
  ariaLabel?: string;
  placeholder?: string;
}

export function ToolSelectInput({
  value,
  onChange,
  options,
  id,
  className,
  ariaLabel,
  placeholder,
}: ToolSelectInputProps) {
  return (
    <select
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={ariaLabel}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-[#101014] px-4 py-3 text-[#F5F4F0] outline-none transition-colors focus:border-[#F05A28]",
        className
      )}
    >
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

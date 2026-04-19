import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ToolInputRowProps {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

export function ToolInputRow({ label, hint, htmlFor, children, className }: ToolInputRowProps) {
  return (
    <label htmlFor={htmlFor} className={cn("block space-y-2", className)}>
      <span className="text-sm font-medium text-[#F5F4F0]">{label}</span>
      {children}
      {hint ? <span className="block text-xs leading-5 text-[#F5F4F0]/48">{hint}</span> : null}
    </label>
  );
}

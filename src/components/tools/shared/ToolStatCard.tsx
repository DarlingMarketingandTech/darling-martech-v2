import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ToolStatCardProps {
  label: string;
  value: string;
  helper?: string;
  tone?: "default" | "positive" | "warning" | "teal";
  children?: ReactNode;
}

const TONE_CLASSNAMES: Record<NonNullable<ToolStatCardProps["tone"]>, string> = {
  default: "text-[#F5F4F0]",
  positive: "text-[#22C55E]",
  warning: "text-[#F05A28]",
  teal: "text-[#0FD9C8]",
};

export function ToolStatCard({ label, value, helper, tone = "default", children }: ToolStatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#101014] p-5">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#F5F4F0]/45">{label}</p>
      <p className={cn("mt-2 font-mono text-3xl font-bold leading-tight", TONE_CLASSNAMES[tone])}>{value}</p>
      {helper ? <p className="mt-2 text-sm leading-6 text-[#F5F4F0]/55">{helper}</p> : null}
      {children}
    </div>
  );
}

"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SlowMarqueeProps = {
  children: ReactNode;
  className?: string;
  durationSeconds?: number;
};

export function SlowMarquee({ children, className, durationSeconds = 60 }: SlowMarqueeProps) {
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div
        className="flex min-w-max animate-[marquee_var(--marquee-duration)_linear_infinite] gap-10 group-hover:paused motion-reduce:animate-none"
        style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

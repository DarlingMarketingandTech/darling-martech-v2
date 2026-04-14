import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  accent?: "orange" | "teal";
};

export function Eyebrow({ children, className, accent = "orange" }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs uppercase tracking-[0.28em]",
        accent === "orange" ? "text-[#F05A28]" : "text-[#0FD9C8]",
        className
      )}
    >
      {children}
    </p>
  );
}

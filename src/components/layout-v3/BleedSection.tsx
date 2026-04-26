import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BleedSectionProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: "dark" | "orange" | "metal";
  as?: "section" | "div";
  id?: string;
};

export function BleedSection({
  children,
  className,
  innerClassName,
  tone = "dark",
  as = "section",
  id,
}: BleedSectionProps) {
  const Comp = as;

  return (
    <Comp
      id={id}
      className={cn(
        "w-full",
        tone === "dark" && "bg-[#0C0C0E]",
        tone === "orange" && "bg-[#F05A28]",
        tone === "metal" &&
          "bg-[linear-gradient(180deg,rgba(20,21,24,1)_0%,rgba(15,16,19,1)_58%,rgba(12,12,14,1)_100%)]",
        className
      )}
    >
      <div className={cn("mx-auto w-full max-w-7xl px-6 md:px-10", innerClassName)}>{children}</div>
    </Comp>
  );
}

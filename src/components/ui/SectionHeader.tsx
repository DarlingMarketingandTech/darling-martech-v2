import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" ? "mx-auto text-center" : "", className)}>
      {eyebrow ? <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "font-display text-balance mt-4 text-3xl font-semibold leading-tight md:text-5xl",
          titleClassName
        )}
      >
        {title}
      </h2>
      {body ? (
        <div className="text-pretty mt-4 max-w-3xl text-lg leading-8 text-[#F5F4F0]/72">{body}</div>
      ) : null}
    </div>
  );
}

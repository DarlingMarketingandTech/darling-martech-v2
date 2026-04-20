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
  bodyClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
  className,
  titleClassName,
  bodyClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" ? "mx-auto text-center" : "", className)}>
      {eyebrow ? <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "font-display mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.02em] md:text-4xl lg:text-[2.5rem]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {body ? (
        <div
          className={cn(
            "text-pretty mt-4 max-w-3xl text-base leading-7 text-[#F5F4F0]/72 md:text-lg md:leading-8",
            bodyClassName
          )}
        >
          {body}
        </div>
      ) : null}
    </div>
  );
}

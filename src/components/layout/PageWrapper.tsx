import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main
      id="main-content"
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-20 pt-10 md:px-12 md:pb-28 md:pt-16",
        className
      )}
    >
      {children}
    </main>
  );
}

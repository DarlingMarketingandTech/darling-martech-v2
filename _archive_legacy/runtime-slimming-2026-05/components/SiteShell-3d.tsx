"use client";

import { useState, type ReactNode } from "react";
import { ViewCanvas } from "@/components/3d/core/ViewCanvas";
import { cn } from "@/lib/utils";

type ThreeSiteShellProps = {
  children: ReactNode;
  className?: string;
  canvasClassName?: string;
};

export function SiteShell({
  children,
  className,
  canvasClassName,
}: ThreeSiteShellProps) {
  const [eventSource, setEventSource] = useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setEventSource}
      className={cn("relative isolate min-h-screen overflow-x-clip", className)}
    >
      <ViewCanvas eventSource={eventSource ?? undefined} className={canvasClassName} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

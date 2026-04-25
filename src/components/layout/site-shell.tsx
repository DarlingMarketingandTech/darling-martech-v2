import type { ReactNode } from "react";
import { ViewCanvasHost } from "@/components/3d/core/ViewCanvasHost";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { MobileStickyCtaBar } from "@/components/layout/MobileStickyCtaBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type SiteShellProps = {
  children: ReactNode;
  hideNewsletterSignup?: boolean;
};

export function SiteShell({ children, hideNewsletterSignup = false }: SiteShellProps) {
  return (
    <div className="page-atmosphere relative isolate min-h-screen bg-[#0C0C0E] text-[#F5F4F0]">
      <ViewCanvasHost />
      <SiteHeader />
      <PageWrapper className="relative z-10">{children}</PageWrapper>
      <SiteFooter showNewsletterSignup={!hideNewsletterSignup} />
      <MobileStickyCtaBar />
    </div>
  );
}

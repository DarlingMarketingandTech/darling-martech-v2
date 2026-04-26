import type { ReactNode } from "react";
import { MobileStickyCtaBar } from "@/components/layout/MobileStickyCtaBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type HomeShellProps = {
  children: ReactNode;
  hideNewsletterSignup?: boolean;
};

/**
 * Edge-to-edge home shell. Unlike `SiteShell`, this skips the centered
 * `PageWrapper` so `BleedSection` content can run full-bleed across the
 * viewport, and skips the 3D canvas host entirely so the home page is a
 * lighter, faster, image-first experience.
 */
export function HomeShell({ children, hideNewsletterSignup = false }: HomeShellProps) {
  return (
    <div className="page-atmosphere relative isolate min-h-screen bg-[#0C0C0E] text-[#F5F4F0]">
      <SiteHeader />
      <main id="main-content" className="relative z-10 flex flex-1 flex-col">
        {children}
      </main>
      <SiteFooter showNewsletterSignup={!hideNewsletterSignup} />
      <MobileStickyCtaBar />
    </div>
  );
}

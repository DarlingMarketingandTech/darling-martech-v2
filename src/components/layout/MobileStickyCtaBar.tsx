"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CTA_LABELS, CTA_LINKS } from "@/lib/cta";

const HIDDEN_PREFIXES = ["/tools/growth-bottleneck-quiz"];

function shouldHide(pathname: string | null): boolean {
  if (!pathname) return false;
  return HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function MobileStickyCtaBar() {
  const pathname = usePathname();

  if (shouldHide(pathname)) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#F5F4F0]/10 bg-[#0C0C0E]/92 px-3 pb-[calc(env(safe-area-inset-bottom)+0.55rem)] pt-2.5 backdrop-blur-md md:hidden">
      <div className="mx-auto flex w-full max-w-7xl gap-2">
        <Button href={CTA_LINKS.startHere} size="sm" className="flex-1">
          {CTA_LABELS.startHere}
        </Button>
        <Button href={CTA_LINKS.bookCall} size="sm" variant="secondary" className="flex-1">
          {CTA_LABELS.bookCall}
        </Button>
      </div>
    </div>
  );
}

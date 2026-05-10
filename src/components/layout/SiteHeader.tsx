"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteNavigation } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";
import { CTA_LABELS, CTA_LINKS } from "@/lib/cta";
import { cn } from "@/lib/utils";

function isPrimaryNavActive(href: string, pathname: string | null): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isHome = pathname === "/";
  const headerCta = isHome
    ? { href: CTA_LINKS.startHere, label: CTA_LABELS.startHere }
    : { href: siteNavigation.cta.href, label: CTA_LABELS.bookCall };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 isolate px-3 pt-3 md:px-6 md:pt-4">
        {/*
         * Dynamic Island wrapper — width and padding shrink on scroll into a
         * smaller pill, matching modern 2026 nav patterns. Transition uses a
         * single GPU-friendly cubic-bezier so the morph feels physical.
         */}
        <div
          className={cn(
            "mx-auto rounded-full border transition-[max-width,padding,border-color,box-shadow,background-color] ease-out",
            "duration-[420ms]",
            "border-[#F5F4F0]/6 bg-[#0C0C0E]/55 shadow-[inset_0_1px_0_rgba(245,244,240,0.04)] backdrop-blur-md",
            // Default (top of page) — full width pill
            !isScrolled && "max-w-7xl rounded-3xl",
            // Scrolled — narrower, pill-shaped, more elevated
            isScrolled &&
              "header-sheen max-w-5xl rounded-full border-[#2A2A2E] shadow-[0_18px_50px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(245,244,240,0.05)] backdrop-blur-xl [-webkit-backdrop-filter:blur(16px)] [backdrop-filter:blur(16px)]"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-5 px-4 transition-[padding,gap] duration-[420ms] ease-out md:gap-8 md:px-6",
              isScrolled ? "py-2 md:py-2.5" : "py-3.5 md:py-4"
            )}
          >
            <Link href="/" className="group flex min-w-0 items-center gap-3 md:gap-3.5">
              <span
                className={cn(
                  "relative inline-flex shrink-0 items-center justify-center rounded-2xl border border-[#F05A28]/28",
                  "bg-[linear-gradient(145deg,rgba(240,90,40,0.14),rgba(12,12,14,0.85))] font-bold text-[#F05A28]",
                  "shadow-[0_0_0_1px_rgba(12,12,14,0.9)_inset]",
                  "transition-[width,height,border-color,background-color,box-shadow] duration-[420ms] ease-out",
                  "group-hover:border-[#F05A28]/40 group-hover:shadow-[0_0_24px_rgba(240,90,40,0.12)]",
                  isScrolled ? "h-9 w-9 text-base" : "h-11 w-11 text-lg"
                )}
              >
                <span className="font-display">D.</span>
                <span
                  className={cn(
                    "absolute right-1 top-1 rounded-full bg-[#0FD9C8]/90 ring-2 ring-[#0C0C0E] transition-[width,height] duration-[420ms]",
                    isScrolled ? "h-1 w-1" : "h-1.5 w-1.5"
                  )}
                  aria-hidden
                />
              </span>
              <span
                className={cn(
                  "min-w-0 leading-none transition-[opacity,max-width] duration-[420ms] ease-out",
                  // On scroll, hide the secondary "MarTech" line on small screens to compact the island
                  isScrolled && "md:opacity-100"
                )}
              >
                <span
                  className={cn(
                    "font-display block truncate font-semibold tracking-[-0.04em] text-[#F5F4F0]",
                    "transition-[font-size] duration-[420ms] ease-out",
                    isScrolled ? "text-base md:text-lg" : "text-lg md:text-xl"
                  )}
                >
                  Darling
                </span>
                <span
                  className={cn(
                    "font-mono block uppercase tracking-[0.28em] text-[#A1A1AA]",
                    "transition-[font-size,opacity,height,margin] duration-[420ms] ease-out",
                    isScrolled
                      ? "h-0 overflow-hidden text-[0px] opacity-0"
                      : "text-[10px] opacity-100 md:text-[11px] md:tracking-[0.32em]"
                  )}
                >
                  MarTech
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex lg:gap-2">
              {siteNavigation.primary.map((item) => {
                const active = isPrimaryNavActive(item.href, pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full text-[#F5F4F0] transition-[padding,background-color,color] duration-200 hover:bg-[#F5F4F0]/5 hover:text-[#F5F4F0]",
                      isScrolled ? "px-2.5 py-1.5 text-[0.82rem]" : "px-3 py-2 text-sm",
                      active &&
                        "bg-[#ff6d40]/14 font-medium text-[#ff7b50] hover:bg-[#ff6d40]/18 hover:text-[#ff8a5f]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2.5 md:gap-3">
              <Button
                href={headerCta.href}
                size={isScrolled ? "sm" : "sm"}
                className={cn(
                  "hidden md:inline-flex transition-[padding,height] duration-[420ms]",
                  isScrolled && "h-9 px-3 text-[0.82rem]"
                )}
              >
                {headerCta.label}
              </Button>
              <button
                type="button"
                aria-label="Open navigation"
                className={cn(
                  "inline-flex items-center justify-center rounded-2xl border border-[#F5F4F0]/12 bg-[#13131A]/60 text-[#F5F4F0] shadow-[inset_0_1px_0_rgba(245,244,240,0.05)] transition-[width,height,border-color,background-color] duration-[420ms] ease-out hover:border-[#F5F4F0]/18 hover:bg-[#13131A]/90 md:hidden",
                  isScrolled ? "h-9 w-9" : "h-11 w-11"
                )}
                onClick={() => setIsOpen(true)}
              >
                <span className="flex flex-col gap-1.5">
                  <span className="h-px w-[18px] rounded-full bg-current opacity-90" />
                  <span className="h-px w-[18px] rounded-full bg-current opacity-75" />
                  <span className="h-px w-[18px] rounded-full bg-current opacity-55" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileNav
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        nav={siteNavigation.primary}
        cta={siteNavigation.cta}
      />
    </>
  );
}

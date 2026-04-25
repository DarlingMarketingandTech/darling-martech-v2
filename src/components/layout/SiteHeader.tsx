"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteNavigation } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";
import { CTA_LABELS } from "@/lib/cta";
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

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 px-3 pt-3 md:px-6 md:pt-4">
        <div
          className={cn(
            "mx-auto max-w-7xl rounded-3xl border transition-[border-color,box-shadow,background-color] duration-300 ease-out",
            "border-[#F5F4F0]/6 bg-[#0C0C0E]/55 shadow-[inset_0_1px_0_rgba(245,244,240,0.04)] backdrop-blur-md",
            isScrolled &&
              "header-sheen border-[#2A2A2E] shadow-[0_20px_80px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(245,244,240,0.05)] backdrop-blur-xl"
          )}
        >
          <div className="mx-auto flex items-center justify-between gap-5 px-4 py-3.5 md:gap-8 md:px-6 md:py-4">
            <Link href="/" className="group flex min-w-0 items-center gap-3 md:gap-3.5">
              <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#F05A28]/28 bg-[linear-gradient(145deg,rgba(240,90,40,0.14),rgba(12,12,14,0.85))] text-lg font-bold text-[#F05A28] shadow-[0_0_0_1px_rgba(12,12,14,0.9)_inset] transition-[border-color,background-color,box-shadow] duration-200 group-hover:border-[#F05A28]/40 group-hover:shadow-[0_0_24px_rgba(240,90,40,0.12)]">
                <span className="font-display">D.</span>
                <span
                  className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#0FD9C8]/90 ring-2 ring-[#0C0C0E]"
                  aria-hidden
                />
              </span>
              <span className="min-w-0 leading-none">
                <span className="font-display block truncate text-lg font-semibold tracking-[-0.04em] text-[#F5F4F0] md:text-xl">
                  Darling
                </span>
                <span className="font-mono block text-[10px] uppercase tracking-[0.28em] text-[#F5F4F0]/48 md:text-[11px] md:tracking-[0.32em]">
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
                      "rounded-full px-3 py-2 text-sm text-[#F5F4F0] transition-colors duration-200 hover:bg-[#F5F4F0]/5 hover:text-[#F5F4F0]",
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
              <Button href={siteNavigation.cta.href} size="sm" className="hidden md:inline-flex">
                {CTA_LABELS.bookCall}
              </Button>
              <button
                type="button"
                aria-label="Open navigation"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#F5F4F0]/12 bg-[#13131A]/60 text-[#F5F4F0] shadow-[inset_0_1px_0_rgba(245,244,240,0.05)] transition-[border-color,background-color] duration-200 hover:border-[#F5F4F0]/18 hover:bg-[#13131A]/90 md:hidden"
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

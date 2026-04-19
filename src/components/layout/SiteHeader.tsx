"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteNavigation } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";
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
      <header className="sticky top-0 z-30 px-3 pt-3 md:px-6">
        <div
          className={cn(
            "mx-auto max-w-7xl rounded-[1.75rem] border border-transparent transition-all duration-300",
            isScrolled ? "header-sheen border-[#2A2A2E] shadow-[0_20px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl" : ""
          )}
        >
          <div className="mx-auto flex items-center justify-between gap-6 px-4 py-4 md:px-6">
            <Link href="/" className="group flex items-center gap-3">
              <span className="font-display inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F05A28]/25 bg-[#F05A28]/8 text-lg font-bold text-[#F05A28] transition-colors group-hover:bg-[#F05A28]/14">
                D.
              </span>
              <span className="leading-none">
                <span className="font-display block text-lg font-semibold tracking-[-0.04em] text-[#F5F4F0] md:text-xl">
                  Darling
                </span>
                <span className="font-mono block text-[11px] uppercase tracking-[0.3em] text-[#F5F4F0]/52 md:text-xs">
                  MarTech
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-7 md:flex">
              {siteNavigation.primary.map((item) => {
                const active = isPrimaryNavActive(item.href, pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm text-[#F5F4F0]/78 transition-colors hover:text-[#F05A28]",
                      active && "font-medium text-[#F05A28]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <Button href={siteNavigation.cta.href} size="sm" className="hidden md:inline-flex">
                {siteNavigation.cta.label}
              </Button>
              <button
                type="button"
                aria-label="Open navigation"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F5F4F0]/12 text-[#F5F4F0] md:hidden"
                onClick={() => setIsOpen(true)}
              >
                <span className="flex flex-col gap-1.5">
                  <span className="h-px w-4 bg-current" />
                  <span className="h-px w-4 bg-current" />
                  <span className="h-px w-4 bg-current" />
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { SiteNavigation } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
  nav: SiteNavigation["primary"];
  cta: SiteNavigation["cta"];
};

function isPrimaryNavActive(href: string, pathname: string | null): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNav({ isOpen, onClose, nav, cta }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-[#0C0C0E]/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-[min(26rem,88vw)] flex-col justify-between border-l border-[#2A2A2E] bg-[#101014] px-6 py-6"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#F05A28]/28 bg-[linear-gradient(145deg,rgba(240,90,40,0.14),rgba(12,12,14,0.9))] text-base font-bold text-[#F05A28]">
                    <span className="font-display">D.</span>
                    <span
                      className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-[#0FD9C8]/90 ring-2 ring-[#101014]"
                      aria-hidden
                    />
                  </span>
                  <div className="min-w-0 leading-tight">
                    <p className="font-display truncate text-lg font-semibold tracking-[-0.03em] text-[#F5F4F0]">
                      Darling
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#F5F4F0]/45">
                      MarTech
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#F5F4F0]/12 px-4 text-sm text-[#F5F4F0]/76"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
              <nav className="mt-10 grid gap-3">
                {nav.map((item, index) => {
                  const active = isPrimaryNavActive(item.href, pathname);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                      transition={{ delay: 0.04 * index, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "surface-card font-display flex items-center justify-between rounded-3xl px-5 py-4 text-xl font-semibold",
                          active && "text-[#F05A28]"
                        )}
                      >
                        <span>{item.label}</span>
                        <span className="text-[#F05A28]">/</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
            <div className="space-y-4">
              <p className="text-sm leading-6 text-[#F5F4F0]/62">
                Strategy. Systems. Execution. One accountable operator.
              </p>
              <Button href={cta.href} size="lg" className="w-full" onClick={onClose}>
                {cta.label}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

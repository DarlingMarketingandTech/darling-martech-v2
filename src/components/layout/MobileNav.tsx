"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { SiteNavigation } from "@/types";
import { Button } from "@/components/ui/button";

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
  nav: SiteNavigation["primary"];
  cta: SiteNavigation["cta"];
};

export function MobileNav({ isOpen, onClose, nav, cta }: MobileNavProps) {
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
              <div className="flex items-center justify-between">
                <p className="font-display text-xl font-semibold">D.</p>
                <button
                  type="button"
                  className="rounded-full border border-[#F5F4F0]/12 px-3 py-2 text-sm text-[#F5F4F0]/76"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
              <nav className="mt-10 grid gap-3">
                {nav.map((item, index) => (
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
                      className="surface-card font-display flex items-center justify-between rounded-3xl px-5 py-4 text-xl font-semibold"
                    >
                      <span>{item.label}</span>
                      <span className="text-[#F05A28]">/</span>
                    </Link>
                  </motion.div>
                ))}
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

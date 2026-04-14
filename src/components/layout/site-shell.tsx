import Link from "next/link";
import type { ReactNode } from "react";
import { siteNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";
import { Button } from "@/components/ui/button";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#F5F4F0]">
      <header className="border-b border-[#F5F4F0]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 md:px-12">
          <Link href="/" className="text-lg font-semibold tracking-wide text-[#F5F4F0]">
            Darling MarTech
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {siteNavigation.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#F5F4F0]/80 transition-colors hover:text-[#F05A28]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href={siteNavigation.cta.href} size="sm">
            {siteNavigation.cta.label}
          </Button>
        </div>
      </header>
      <main id="main-content" className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-16 md:px-12 md:py-24">
        {children}
      </main>
      <footer className="border-t border-[#F5F4F0]/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-5 md:px-12">
          <div className="md:col-span-2">
            <p className="text-lg font-semibold text-[#F5F4F0]">Darling MarTech</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#F5F4F0]/70">
              Strategy. Systems. Execution. One accountable operator.
            </p>
            <p className="mt-3 text-sm text-[#F5F4F0]/50">{siteConfig.founder.location}</p>
          </div>
          {siteNavigation.footer.columns.map((column) => (
            <div key={column.heading}>
              <p className="text-xs uppercase tracking-[0.24em] text-[#F05A28]">
                {column.heading}
              </p>
              <div className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <Link
                    key={`${column.heading}-${link.href}-${link.label}`}
                    href={link.href}
                    className="block text-sm text-[#F5F4F0]/70 transition-colors hover:text-[#F05A28]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

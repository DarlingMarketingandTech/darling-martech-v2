import Link from "next/link";
import { siteNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

type SiteFooterProps = {
  showNewsletterSignup?: boolean;
};

export function SiteFooter({ showNewsletterSignup = true }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const horizontalLinks = siteNavigation.footer.columns.flatMap((column) => column.links);
  const uniqueHorizontalLinks = horizontalLinks.filter(
    (link, index, arr) => arr.findIndex((item) => item.href === link.href && item.label === link.label) === index
  );

  return (
    <footer className="mt-10 border-t border-[#F5F4F0]/8 px-6 pb-8 pt-12 md:px-12 md:pt-14">
      <div className="mx-auto max-w-7xl">
        {showNewsletterSignup ? (
          <div className="mb-10 md:mb-12">
            <NewsletterSignup headline="One martech insight per week." compact />
          </div>
        ) : null}

        <div className="grid gap-8 rounded-[2rem] border border-[#F5F4F0]/8 bg-[#111117]/65 p-5 md:gap-10 md:p-7">
          <div className="surface-card grain-mask rounded-[1.5rem] p-5 md:p-6">
            <div className="flex items-center gap-3">
              <span className="font-display inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F05A28]/25 bg-[#F05A28]/8 text-lg font-bold text-[#F05A28]">
                D.
              </span>
              <div>
                <p className="font-display text-xl font-semibold tracking-[-0.04em]">Darling MarTech</p>
                <p className="mt-1 text-sm text-[#F5F4F0]/54">{siteConfig.founder.location}</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-base leading-7 text-[#F5F4F0]/68">
              Strategy. Systems. Execution. One accountable operator.
            </p>
          </div>

          <nav aria-label="Footer links">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F5F4F0]/40">
              Explore
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {uniqueHorizontalLinks.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-full border border-[#F5F4F0]/12 bg-[#F5F4F0]/4 px-4 py-2 text-sm text-[#F5F4F0]/72 transition-colors hover:border-[#F05A28]/40 hover:text-[#F5F4F0]"
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noreferrer" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-[#F5F4F0]/8 pt-6 text-xs text-[#F5F4F0]/45 md:justify-between">
          <p>© {year} Darling MarTech LLC</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/privacy-policy" className="text-[#F5F4F0]/55 transition-colors hover:text-[#F05A28]">
              Privacy Policy
            </Link>
            <Link href="/newsroom" className="text-[#F5F4F0]/45 transition-colors hover:text-[#0FD9C8]">
              Newsroom
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

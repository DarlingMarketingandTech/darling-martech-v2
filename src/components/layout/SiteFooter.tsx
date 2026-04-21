import Link from "next/link";
import { siteNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

type SiteFooterProps = {
  showNewsletterSignup?: boolean;
};

export function SiteFooter({ showNewsletterSignup = true }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-[#F5F4F0]/8 px-6 pb-10 pt-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        {showNewsletterSignup ? (
          <div className="mb-12">
            <NewsletterSignup headline="One martech insight per week." compact />
          </div>
        ) : null}

        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
          <div className="surface-card grain-mask rounded-[2rem] p-7">
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

          {siteNavigation.footer.columns.map((column) => (
            <div key={column.heading}>
              <Eyebrow>{column.heading}</Eyebrow>
              <div className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <Link
                    key={`${column.heading}-${link.href}-${link.label}`}
                    href={link.href}
                    className="block text-sm leading-6 text-[#F5F4F0]/68 transition-colors hover:text-[#F05A28]"
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noreferrer" : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-[#F5F4F0]/8 pt-8 text-center text-xs text-[#F5F4F0]/45">
          © {year} Darling MarTech LLC ·{" "}
          <Link href="/privacy-policy" className="text-[#F5F4F0]/55 transition-colors hover:text-[#F05A28]">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}

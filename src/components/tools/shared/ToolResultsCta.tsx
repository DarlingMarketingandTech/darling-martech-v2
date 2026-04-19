import Link from "next/link";

export interface ToolResultsCtaLink {
  label: string;
  href: string;
  tone?: "primary" | "ghost";
}

interface ToolResultsCtaProps {
  heading: string;
  body: string;
  links: ToolResultsCtaLink[];
}

export function ToolResultsCta({ heading, body, links }: ToolResultsCtaProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#13131A] p-6 md:p-8">
      <h3 className="font-display text-xl font-semibold text-[#F5F4F0] md:text-2xl">{heading}</h3>
      <p className="mt-3 max-w-2xl text-base leading-7 text-[#F5F4F0]/68">{body}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {links.map((link) => {
          const isPrimary = (link.tone ?? "primary") === "primary";
          return (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={
                isPrimary
                  ? "inline-flex items-center rounded-xl bg-[#F05A28] px-5 py-3 text-sm font-semibold text-[#0C0C0E] transition-opacity hover:opacity-90"
                  : "inline-flex items-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-[#F5F4F0] transition-colors hover:border-[#F05A28] hover:text-[#F05A28]"
              }
            >
              {link.label}
              <span aria-hidden className="ml-1">→</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

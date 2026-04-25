import type { SiteNavigation } from "@/types";
import { siteConfig } from "@/data/site-config";
import { CTA_LABELS } from "@/lib/cta";

export const siteNavigation: SiteNavigation = {
  primary: [
    { label: "Problems", href: "/problems" },
    { label: "Proof", href: "/proof" },
    { label: "Tools", href: "/tools" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
  ],
  footer: {
    columns: [
      {
        heading: "Work",
        links: [
          { label: "Proof Hub", href: "/proof" },
          { label: "Case Studies", href: "/proof" },
          { label: "Studio", href: "/studio" },
        ],
      },
      {
        heading: "Services",
        links: [
          { label: "Capabilities", href: "/services" },
          { label: "Technical Roadmap", href: "/services/technical-roadmap" },
          { label: "Industries", href: "/industries" },
          { label: "Problems Hub", href: "/problems" },
          { label: "How I Work", href: "/process" },
          { label: "Tools", href: "/tools" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Newsroom", href: "/newsroom" },
          { label: "Resources", href: "/resources" },
          { label: "Newsletter", href: "/resources/newsletter" },
        ],
      },
      {
        heading: "Contact",
        links: [
          { label: siteConfig.founder.email, href: `mailto:${siteConfig.founder.email}` },
          { label: siteConfig.founder.location, href: "/contact" },
          { label: "Book a diagnostic call", href: "https://cal.com/jacob-darling/30min", isExternal: true },
        ],
      },
    ],
  },
  cta: {
    label: CTA_LABELS.bookCall,
    href: "https://cal.com/jacob-darling/30min",
  },
};

import { siteConfig } from "@/data/site-config";

export const CTA_LABELS = {
  startHere: "Run the Growth System Audit →",
  proof: "See similar proof →",
  bookCall: "Book a diagnostic call →",
} as const;

export const CTA_LINKS = {
  startHere: "/tools/growth-system-audit",
  proof: "/proof",
  bookCall: siteConfig.calComLink,
} as const;

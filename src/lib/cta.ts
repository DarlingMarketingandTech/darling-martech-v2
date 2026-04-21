import { siteConfig } from "@/data/site-config";

export const CTA_LABELS = {
  startHere: "Run the free diagnostic →",
  proof: "See proof →",
  bookCall: "Book a diagnostic call →",
} as const;

export const CTA_LINKS = {
  startHere: "/tools/growth-bottleneck-quiz",
  proof: "/proof",
  bookCall: siteConfig.calComLink,
} as const;

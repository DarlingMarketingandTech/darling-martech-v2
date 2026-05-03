import type { ProjectTypeId } from "@/types";

/**
 * Homepage proof must be organized by project type and operating change.
 * Do not lead with client, company, logo, or industry.
 * Each card should explain what was not working, what was built,
 * what changed, and the resulting impact.
 */
export type HomepageProofPattern = {
  projectType: ProjectTypeId;
  headline: string;
  plainEnglishLabel: string;
  whatWasNotWorking: string;
  whatWasBuilt: string;
  whatChanged: string;
  impact: string;
  primaryVisualPublicId: string;
  supportingVisualPublicIds?: string[];
  relatedProofSlugs: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const HOMEPAGE_PROOF_PATTERNS: HomepageProofPattern[] = [
  {
    projectType: "brand-identity-system",
    headline: "Brand identity & guidelines",
    plainEnglishLabel: "A clearer, more recognizable way to show up",
    whatWasNotWorking:
      "The business needed a visual identity that made the offer easier to recognize, remember, and trust.",
    whatWasBuilt:
      "Logo direction, visual language, identity assets, and reusable brand rules for consistent presentation.",
    whatChanged:
      "The business had a clearer look and feel that could carry across the website, sales materials, and campaigns.",
    impact:
      "A stronger first impression and a more consistent foundation for future marketing work.",
    primaryVisualPublicId: "Gemini_Generated_Image_aadwklaadwklaadw",
    supportingVisualPublicIds: ["taco-ninja", "hurbs-rub"],
    relatedProofSlugs: ["black-letter"],
    ctaLabel: "See brand identity proof",
    ctaHref: "/proof?projectType=brand-identity-system",
  },
  {
    projectType: "crm-automation-system",
    headline: "CRM & automation",
    plainEnglishLabel: "A better way to capture, route, and follow up",
    whatWasNotWorking:
      "Leads and follow-up depended on manual steps, scattered tools, and inconsistent handoffs.",
    whatWasBuilt:
      "CRM structure, lead capture logic, routing, reminders, lifecycle workflows, and automation rules.",
    whatChanged:
      "The business had a clearer way to capture, organize, and follow up with people after they showed interest.",
    impact:
      "Less manual work, fewer missed opportunities, and a more reliable path from inquiry to next step.",
    primaryVisualPublicId: "crm-workflow",
    supportingVisualPublicIds: [
      "Hoosier_Boy_Barbershop_-app_crm_showcase",
      "workflow-automation",
    ],
    relatedProofSlugs: ["barbershop-command-center", "graston-growth-engine"],
    ctaLabel: "See CRM & automation proof",
    ctaHref: "/proof?projectType=crm-automation-system",
  },
  {
    projectType: "custom-infrastructure-product",
    headline: "Custom product & infrastructure",
    plainEnglishLabel:
      "When the business needs something more specific than a page or form",
    whatWasNotWorking:
      "The business needed a custom tool, workflow, or admin surface that off-the-shelf software could not handle cleanly.",
    whatWasBuilt:
      "Custom app surfaces, admin tools, pricing logic, user workflows, and infrastructure that matched the actual job.",
    whatChanged:
      "The work moved from patched-together tools to a purpose-built experience.",
    impact:
      "The business gained a more useful operating layer and a better way to serve users, staff, or customers.",
    primaryVisualPublicId:
      "Hoosier_Boy_Barbershop_Companion_App_and_Admin_Platform",
    supportingVisualPublicIds: ["Smart_Pricing_Tool_-_clinitian-computer"],
    relatedProofSlugs: ["barbershop-command-center", "the-compass"],
    ctaLabel: "See custom system proof",
    ctaHref: "/proof?projectType=custom-infrastructure-product",
  },
  {
    projectType: "reporting-attribution-system",
    headline: "Reporting & attribution",
    plainEnglishLabel: "A clearer view of what is working",
    whatWasNotWorking:
      "Marketing activity existed, but it was hard to see which channels, campaigns, or paths were creating useful leads.",
    whatWasBuilt:
      "Dashboard views, source tracking, reporting structure, and cleaner visibility into performance.",
    whatChanged:
      "The business could see more clearly where demand was coming from and what needed attention.",
    impact:
      "Better decisions, cleaner reporting conversations, and less guessing around marketing performance.",
    primaryVisualPublicId: "graston_data_visualization_dashboard",
    relatedProofSlugs: ["graston-technique"],
    ctaLabel: "See reporting proof",
    ctaHref: "/proof?projectType=reporting-attribution-system",
  },
  {
    projectType: "website-brand-rebuild",
    headline: "Website & brand system",
    plainEnglishLabel: "A better online foundation",
    whatWasNotWorking:
      "The business needed a clearer, more credible way to explain the offer and guide visitors toward action.",
    whatWasBuilt:
      "Website structure, messaging hierarchy, visual system, proof placement, and calls-to-action.",
    whatChanged:
      "Visitors could understand the business faster and had a clearer reason to take the next step.",
    impact:
      "The site became a stronger foundation for trust, sales conversations, campaigns, and future growth work.",
    primaryVisualPublicId: "hoosier-boy-barbershop-website-design",
    relatedProofSlugs: ["barbershop-command-center"],
    ctaLabel: "See website & brand proof",
    ctaHref: "/proof?projectType=website-brand-rebuild",
  },
];

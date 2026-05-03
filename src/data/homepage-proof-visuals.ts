export type HomepageProofVisual = {
  publicId: string;
  alt: string;
  projectType: string;
  secondaryProjectType?: string;
  proofSlug: string;
  visualRole: "primary-card-visual" | "supporting-card-visual";
  recommendedSection: string;
  width: number;
  height: number;
};

export const HOMEPAGE_PROOF_VISUALS: HomepageProofVisual[] = [
  {
    publicId: "Gemini_Generated_Image_aadwklaadwklaadw",
    alt: "Black Letter brand identity composite showing visual system and authority positioning",
    projectType: "brand-identity-system",
    proofSlug: "black-letter",
    visualRole: "primary-card-visual",
    recommendedSection: "brand-identity",
    width: 2894,
    height: 1472,
  },
  {
    publicId: "taco-ninja",
    alt: "Taco Ninja brand identity visual showing distinctive logo and playful visual system direction",
    projectType: "brand-identity-system",
    proofSlug: "taco-ninja",
    visualRole: "supporting-card-visual",
    recommendedSection: "brand-identity",
    width: 1448,
    height: 1086,
  },
  {
    publicId: "hurbs-rub",
    alt: "Herbs Rub brand and packaging visual showing product identity system direction",
    projectType: "brand-identity-system",
    proofSlug: "herbs-rub",
    visualRole: "supporting-card-visual",
    recommendedSection: "brand-identity",
    width: 1086,
    height: 1448,
  },
  {
    publicId: "crm-workflow",
    alt: "CRM workflow visual showing connected lead capture follow-up and automation logic",
    projectType: "crm-automation-system",
    proofSlug: "workflow-automation-general",
    visualRole: "primary-card-visual",
    recommendedSection: "crm-and-automation",
    width: 1073,
    height: 1244,
  },
  {
    publicId: "Hoosier_Boy_Barbershop_-app_crm_showcase",
    alt: "Hoosier Boy Barbershop app and CRM showcase representing booking and lifecycle automation",
    projectType: "crm-automation-system",
    proofSlug: "barbershop-command-center",
    visualRole: "primary-card-visual",
    recommendedSection: "crm-and-automation",
    width: 2546,
    height: 1664,
  },
  {
    publicId: "workflow-automation",
    alt: "Workflow automation visual for connected follow-up routing and repeatable marketing operations",
    projectType: "crm-automation-system",
    proofSlug: "workflow-automation-general",
    visualRole: "supporting-card-visual",
    recommendedSection: "automation",
    width: 1536,
    height: 1024,
  },
  {
    publicId: "Hoosier_Boy_Barbershop_Companion_App_and_Admin_Platform",
    alt: "Hoosier Boy companion app and admin platform visual showing custom product infrastructure",
    projectType: "custom-infrastructure-product",
    proofSlug: "barbershop-command-center",
    visualRole: "primary-card-visual",
    recommendedSection: "custom-product-infrastructure",
    width: 2546,
    height: 1664,
  },
  {
    publicId: "Smart_Pricing_Tool_-_clinitian-computer",
    alt: "Smart Pricing Tool scene showing clinician using a pricing and decision-support tool on a computer",
    projectType: "custom-infrastructure-product",
    secondaryProjectType: "tool-product-system",
    proofSlug: "smart-pricing-tool",
    visualRole: "primary-card-visual",
    recommendedSection: "tool-product-systems",
    width: 1184,
    height: 864,
  },
  {
    publicId: "graston_data_visualization_dashboard",
    alt: "Graston dashboard screenshot showing reporting and data visualization layer",
    projectType: "reporting-attribution-system",
    proofSlug: "graston-technique",
    visualRole: "primary-card-visual",
    recommendedSection: "reporting-attribution",
    width: 1820,
    height: 1754,
  },
  {
    publicId: "hoosier-boy-barbershop-website-design",
    alt: "Hoosier Boy Barbershop website design composite showing local website and brand system work",
    projectType: "website-brand-rebuild",
    proofSlug: "barbershop-command-center",
    visualRole: "primary-card-visual",
    recommendedSection: "website-brand-system",
    width: 2416,
    height: 1760,
  },
];

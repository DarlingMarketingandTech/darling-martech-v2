import type { CaseStudy } from "@/types";
import { grastonGrowthEngine } from "@/data/work/graston-growth-engine";
import { grastonQualifiedLeads } from "@/data/work/graston-qualified-leads";
import { grastonTechnique } from "@/data/work/graston-technique";
import { pikeMedical } from "@/data/work/pike-medical";
import { clinicalCompass } from "@/data/work/clinical-compass";
import { primarycareIndy } from "@/data/work/primarycare-indy";
import { urgentcareIndy } from "@/data/work/urgentcare-indy";
import { blackLetter } from "@/data/work/black-letter";
import { licenseRequirementsNavigator } from "@/data/work/license-requirements-navigator";
import { russellPainting } from "@/data/work/russell-painting";
import { barbershopCommandCenter } from "@/data/work/barbershop-command-center";
import { theCompass } from "@/data/work/the-compass";
import { bbq317 } from "@/data/work/317-bbq";

export const caseStudies: CaseStudy[] = [
  // Featured / anchor proofs
  grastonTechnique,
  grastonQualifiedLeads,
  grastonGrowthEngine,
  pikeMedical,
  clinicalCompass,
  primarycareIndy,
  urgentcareIndy,
  russellPainting,
  // Product and tool proofs
  theCompass,
  licenseRequirementsNavigator,
  // Local brand proofs
  blackLetter,
  barbershopCommandCenter,
  bbq317,
];

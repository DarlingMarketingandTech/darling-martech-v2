import type { CaseStudy } from "@/types";
import { grastonGrowthEngine } from "@/data/work/graston-growth-engine";
import { grastonQualifiedLeads } from "@/data/work/graston-qualified-leads";
import { pikeMedical } from "@/data/work/pike-medical";
import { russellPainting } from "@/data/work/russell-painting";

export const caseStudies: CaseStudy[] = [
  grastonQualifiedLeads,
  pikeMedical,
  grastonGrowthEngine,
  russellPainting,
];

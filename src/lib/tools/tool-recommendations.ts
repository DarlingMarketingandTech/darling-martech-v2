import { TOOL_META } from "@/data/tools";
import type { ProblemCluster, ServiceCluster } from "@/types";
import type { DiagnosticToolMeta } from "@/types/tools";

export function getProofLinkedTools(): DiagnosticToolMeta[] {
  return TOOL_META.filter((tool) => tool.isProofLinked);
}

export function getSimulationTools(): DiagnosticToolMeta[] {
  return TOOL_META.filter((tool) => tool.kind === "simulation");
}

export function getToolMeta(slug: string): DiagnosticToolMeta | undefined {
  return TOOL_META.find((tool) => tool.slug === slug);
}

export function getToolsForProblem(problemSlug: ProblemCluster): DiagnosticToolMeta[] {
  return TOOL_META.filter(
    (tool) => tool.isProofLinked && tool.relatedProblemSlugs.includes(problemSlug)
  );
}

export function getToolsForService(serviceSlug: ServiceCluster): DiagnosticToolMeta[] {
  return TOOL_META.filter(
    (tool) => tool.isProofLinked && tool.relatedServiceSlugs.includes(serviceSlug)
  );
}

export function getToolsForProof(proofSlug: string): DiagnosticToolMeta[] {
  return TOOL_META.filter(
    (tool) => tool.isProofLinked && tool.relatedProofSlugs.includes(proofSlug)
  );
}

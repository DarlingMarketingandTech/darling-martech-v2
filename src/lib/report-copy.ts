import type { CaseStudy } from "@/types";

export function firstTwoSentences(copy: string): string {
  const trimmed = copy.trim();
  if (!trimmed) return "";

  const parts = trimmed.match(/[^.!?]+[.!?]+/g);
  if (!parts || parts.length === 0) {
    return trimmed;
  }

  return parts.slice(0, 2).join(" ").trim();
}

type ResolvePostFixAssertionInput = {
  study: CaseStudy;
  whatTheFixLooksLike: string;
  problemTitle: string;
  systemFailureCore: string;
};

export function resolvePostFixAssertion({
  study,
  whatTheFixLooksLike,
  problemTitle,
  systemFailureCore,
}: ResolvePostFixAssertionInput): string {
  if (study.operatingImpact?.trim()) {
    return study.operatingImpact.trim();
  }

  if (study.resultSummary?.trim()) {
    return study.resultSummary.trim();
  }

  return `${whatTheFixLooksLike} (${problemTitle}: ${systemFailureCore})`;
}

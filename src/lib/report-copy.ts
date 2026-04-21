import type { CaseStudy } from "@/types";

export function firstTwoSentences(copy: string): string {
  const trimmed = copy.trim();
  if (!trimmed) return "";

  // Prefer Intl.Segmenter for robust sentence boundaries.
  // Fall back to regex when Segmenter is unavailable in the runtime.
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
    const sentences = Array.from(segmenter.segment(trimmed), ({ segment }) => segment.trim()).filter(Boolean);
    if (sentences.length > 0) {
      return sentences.slice(0, 2).join(" ");
    }
  }

  // Regex fallback: capture sentence-like chunks ending in punctuation or end-of-string.
  const parts = trimmed.match(/[^.!?]+(?:[.!?]+|$)/g);
  if (!parts || parts.length === 0) return trimmed;
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
  // Prefer the most specific proof-connected copy first, then fall back safely.
  if (study.operatingImpact?.trim()) {
    return study.operatingImpact.trim();
  }

  if (study.resultSummary?.trim()) {
    return study.resultSummary.trim();
  }

  return `${whatTheFixLooksLike} (${problemTitle}: ${systemFailureCore})`;
}

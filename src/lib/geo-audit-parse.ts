import { isJsonRecord } from "@/lib/request-utils";
import type { GeoAuditCheckKey, GeoAuditResponse } from "@/types";

const CHECK_KEYS: GeoAuditCheckKey[] = [
  "crawler",
  "schema",
  "metadata",
  "structure",
  "faq",
  "authority",
];

function isCheckEntry(value: unknown): value is { passed: boolean; score: number; max: number } {
  if (!isJsonRecord(value)) {
    return false;
  }

  return (
    typeof value.passed === "boolean" &&
    typeof value.score === "number" &&
    typeof value.max === "number"
  );
}

function isStringArray(value: unknown, maxLen: number): value is string[] {
  if (!Array.isArray(value) || value.length > maxLen) {
    return false;
  }

  return value.every((item) => typeof item === "string" && item.length < 500);
}

export function parseGeoAuditResponse(value: unknown): GeoAuditResponse | null {
  if (!isJsonRecord(value)) {
    return null;
  }

  if (typeof value.score !== "number" || value.score < 0 || value.score > 200) {
    return null;
  }

  const extracted = value.extractedData;
  if (!isJsonRecord(extracted)) {
    return null;
  }

  if (
    typeof extracted.title !== "string" ||
    typeof extracted.metaDescription !== "string" ||
    typeof extracted.h1 !== "string"
  ) {
    return null;
  }

  if (!Array.isArray(extracted.entities) || extracted.entities.length > 20) {
    return null;
  }

  if (!extracted.entities.every((e: unknown) => typeof e === "string" && e.length < 64)) {
    return null;
  }

  const checksRaw = value.checks;
  if (!isJsonRecord(checksRaw)) {
    return null;
  }

  const checks: GeoAuditResponse["checks"] = {} as GeoAuditResponse["checks"];

  for (const key of CHECK_KEYS) {
    const entry = checksRaw[key];
    if (!isCheckEntry(entry)) {
      return null;
    }

    checks[key] = entry;
  }

  const raw = value.rawXray;
  if (!isJsonRecord(raw)) {
    return null;
  }

  const headingOutline = raw.headingOutline;
  if (!Array.isArray(headingOutline) || headingOutline.length > 40) {
    return null;
  }

  for (const item of headingOutline) {
    if (!isJsonRecord(item)) {
      return null;
    }

    if (item.level !== 1 && item.level !== 2 && item.level !== 3) {
      return null;
    }

    if (typeof item.text !== "string" || item.text.length > 200) {
      return null;
    }
  }

  const stats = raw.stats;
  if (!isJsonRecord(stats)) {
    return null;
  }

  const h1Count = stats.h1Count;
  const h2Count = stats.h2Count;
  const h3Count = stats.h3Count;
  const internalLinkCount = stats.internalLinkCount;
  const externalLinkCount = stats.externalLinkCount;
  const visibleTextChars = stats.visibleTextChars;

  if (
    typeof h1Count !== "number" ||
    typeof h2Count !== "number" ||
    typeof h3Count !== "number" ||
    typeof internalLinkCount !== "number" ||
    typeof externalLinkCount !== "number" ||
    typeof visibleTextChars !== "number"
  ) {
    return null;
  }

  if (
    h1Count < 0 ||
    h1Count > 5_000_000 ||
    h2Count < 0 ||
    h2Count > 5_000_000 ||
    h3Count < 0 ||
    h3Count > 5_000_000 ||
    internalLinkCount < 0 ||
    internalLinkCount > 5_000_000 ||
    externalLinkCount < 0 ||
    externalLinkCount > 5_000_000 ||
    visibleTextChars < 0 ||
    visibleTextChars > 5_000_000
  ) {
    return null;
  }

  const statBundle = {
    h1Count,
    h2Count,
    h3Count,
    internalLinkCount,
    externalLinkCount,
    visibleTextChars,
  };

  if (!isStringArray(raw.jsonLdTypes, 30)) {
    return null;
  }

  if (typeof raw.jsonLdBlockCount !== "number" || raw.jsonLdBlockCount < 0 || raw.jsonLdBlockCount > 500) {
    return null;
  }

  const nullableStrings = ["canonical", "metaRobots", "ogTitle", "ogDescription", "twitterCard", "jsonLdSnippet"] as const;
  for (const k of nullableStrings) {
    const v = raw[k];
    if (v !== null && typeof v !== "string") {
      return null;
    }

    if (typeof v === "string" && v.length > 20_000) {
      return null;
    }
  }

  return {
    score: value.score,
    extractedData: {
      title: extracted.title.slice(0, 500),
      metaDescription: extracted.metaDescription.slice(0, 2000),
      h1: extracted.h1.slice(0, 500),
      entities: extracted.entities.map((e: string) => e.slice(0, 64)),
    },
    checks,
    rawXray: {
      canonical: typeof raw.canonical === "string" ? raw.canonical.slice(0, 2000) : null,
      metaRobots: typeof raw.metaRobots === "string" ? raw.metaRobots.slice(0, 500) : null,
      ogTitle: typeof raw.ogTitle === "string" ? raw.ogTitle.slice(0, 500) : null,
      ogDescription: typeof raw.ogDescription === "string" ? raw.ogDescription.slice(0, 2000) : null,
      twitterCard: typeof raw.twitterCard === "string" ? raw.twitterCard.slice(0, 200) : null,
      jsonLdBlockCount: raw.jsonLdBlockCount,
      jsonLdTypes: raw.jsonLdTypes,
      jsonLdSnippet: typeof raw.jsonLdSnippet === "string" ? raw.jsonLdSnippet.slice(0, 20_000) : null,
      headingOutline: headingOutline.map((item) => ({
        level: item.level as 1 | 2 | 3,
        text: String(item.text).slice(0, 200),
      })),
      stats: statBundle,
    },
  };
}

/**
 * Homepage proof governance: validates patterns, visuals registry, and work-index links.
 *
 * Blocked Cloudinary path hints (case-insensitive on publicId + recommendedSection):
 * - review-needed
 * - plain-website-screenshots
 * - path segment .../archive/... (matches archive/plain-website-screenshots style folders)
 */

import { HOMEPAGE_PROOF_PATTERNS } from "../src/data/homepage-proof-patterns";
import { HOMEPAGE_PROOF_VISUALS } from "../src/data/homepage-proof-visuals";
import { homepageData } from "../src/data/homepage";
import { PROJECT_TYPE_ORDER } from "../src/data/taxonomy";
import { caseStudies } from "../src/data/work/work-index";

const validProjectTypes = new Set(PROJECT_TYPE_ORDER);
const workSlugs = new Set(caseStudies.map((c) => c.slug));

const REQUIRED_PATTERN_FIELDS = [
  "projectType",
  "headline",
  "plainEnglishLabel",
  "whatWasNotWorking",
  "whatWasBuilt",
  "whatChanged",
  "impact",
  "primaryVisualPublicId",
  "ctaHref",
  "ctaLabel",
] as const;

/** Normalize for substring checks on Cloudinary paths / folder hints */
function folderGuardHaystack(s: string): string {
  return s.toLowerCase().replace(/\\/g, "/");
}

function hasBlockedFolderHint(s: string): boolean {
  const h = folderGuardHaystack(s);
  if (h.includes("review-needed")) return true;
  if (h.includes("plain-website-screenshots")) return true;
  if (h.includes("/archive/")) return true;
  return false;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function main(): void {
  const errors: string[] = [];

  const capabilityCount = homepageData.whatThisCanIncludeSection.cards.length;
  const patternCount = HOMEPAGE_PROOF_PATTERNS.length;
  const visualRegistryCount = HOMEPAGE_PROOF_VISUALS.length;

  // (1) Pattern cap
  if (patternCount > 6) {
    errors.push(`HOMEPAGE_PROOF_PATTERNS has ${patternCount} entries (max 6).`);
  }

  // (2) Capability cards cap
  if (capabilityCount > 8) {
    errors.push(
      `whatThisCanIncludeSection.cards has ${capabilityCount} entries (max 8).`
    );
  }

  const visualIds = new Set<string>();
  for (const visual of HOMEPAGE_PROOF_VISUALS) {
    if (visualIds.has(visual.publicId)) {
      errors.push(`Duplicate publicId in HOMEPAGE_PROOF_VISUALS: "${visual.publicId}".`);
    }
    visualIds.add(visual.publicId);

    if (hasBlockedFolderHint(visual.publicId)) {
      errors.push(`Visual publicId references blocked folder hint: "${visual.publicId}".`);
    }
    if (hasBlockedFolderHint(visual.recommendedSection)) {
      errors.push(
        `Visual recommendedSection references blocked folder hint: "${visual.publicId}" → "${visual.recommendedSection}".`
      );
    }

    if (visual.projectType === "ai-agent-system") {
      errors.push(
        `Visual "${visual.publicId}" must not use projectType "ai-agent-system" as primary (use secondaryProjectType only).`
      );
    }

    if (!validProjectTypes.has(visual.projectType as (typeof PROJECT_TYPE_ORDER)[number])) {
      errors.push(
        `Visual "${visual.publicId}" has invalid primary projectType "${visual.projectType}".`
      );
    }
  }

  const patternProjectTypes = new Set<string>();
  for (let i = 0; i < HOMEPAGE_PROOF_PATTERNS.length; i++) {
    const p = HOMEPAGE_PROOF_PATTERNS[i];
    const label = `HOMEPAGE_PROOF_PATTERNS[${i}]`;

    for (const key of REQUIRED_PATTERN_FIELDS) {
      const v = p[key as keyof typeof p];
      if (!isNonEmptyString(v)) {
        errors.push(`${label}: missing or empty "${key}".`);
      }
    }

    if (!Array.isArray(p.relatedProofSlugs) || p.relatedProofSlugs.length === 0) {
      errors.push(`${label}: relatedProofSlugs must be a non-empty array.`);
    } else {
      for (const slug of p.relatedProofSlugs) {
        if (!isNonEmptyString(slug)) {
          errors.push(`${label}: relatedProofSlugs contains empty entry.`);
        } else if (!workSlugs.has(slug)) {
          errors.push(`${label}: relatedProofSlugs unknown slug "${slug}" (not in work index).`);
        }
      }
    }

    if (!validProjectTypes.has(p.projectType)) {
      errors.push(`${label}: invalid projectType "${p.projectType}".`);
    }

    if (patternProjectTypes.has(p.projectType)) {
      errors.push(`${label}: duplicate projectType "${p.projectType}" across HOMEPAGE_PROOF_PATTERNS.`);
    }
    patternProjectTypes.add(p.projectType);

    if (!visualIds.has(p.primaryVisualPublicId)) {
      errors.push(
        `${label}: primaryVisualPublicId "${p.primaryVisualPublicId}" not found in HOMEPAGE_PROOF_VISUALS.`
      );
    }

    const supporting = p.supportingVisualPublicIds;
    if (supporting) {
      if (!Array.isArray(supporting)) {
        errors.push(`${label}: supportingVisualPublicIds must be an array when present.`);
      } else {
        for (const sid of supporting) {
          if (!isNonEmptyString(sid)) {
            errors.push(`${label}: supportingVisualPublicIds contains empty entry.`);
          } else if (!visualIds.has(sid)) {
            errors.push(
              `${label}: supportingVisualPublicId "${sid}" not found in HOMEPAGE_PROOF_VISUALS.`
            );
          }
        }
      }
    }
  }

  let relatedSlugChecks = 0;
  const touchedRelatedSlugs = new Set<string>();
  for (const p of HOMEPAGE_PROOF_PATTERNS) {
    for (const slug of p.relatedProofSlugs) {
      relatedSlugChecks++;
      touchedRelatedSlugs.add(slug);
    }
  }

  if (errors.length > 0) {
    console.error("validate-homepage-proof: FAILED\n");
    for (const line of errors) {
      console.error(`  - ${line}`);
    }
    process.exit(1);
  }

  console.log("validate-homepage-proof: OK");
  console.log(
    `  • What this can include cards: ${capabilityCount} (max 8)\n` +
      `  • Homepage proof patterns: ${patternCount} (max 6)\n` +
      `  • Visual registry entries: ${visualRegistryCount}\n` +
      `  • Related proof slug references checked: ${relatedSlugChecks} (${touchedRelatedSlugs.size} distinct slugs)`
  );
}

main();

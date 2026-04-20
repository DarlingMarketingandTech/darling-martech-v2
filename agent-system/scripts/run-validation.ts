export interface ValidationOutcome {
  mode: string;
  checksRun: Array<{ name: string; ok: boolean }>;
  designGate: "proceed" | "proceed_with_caution" | "block_and_rework" | "not_applicable";
  scoreThreshold: { proceed: number; caution: number } | null;
  scoreResult: {
    compositeScore: number;
    auditScores: Array<{
      audit: string;
      score: number;
      confidenceLevel: string;
      recommendedAction: string;
    }>;
  } | null;
  requiredImprovements: string[];
  blockReason: string | null;
  strategicScore?: number | null;
  positioningAlignment?: string;
  buyerPathCoverage?: string;
  antiPersonaCheck?: string;
  trustStageAlignment?: string;
  strategicGate?: "proceed" | "proceed_with_caution" | "block_and_rework" | "not_applicable";
  strategicThreshold?: { proceed: number; caution: number } | null;
  strategicRequiredImprovements?: string[];
  strategicBlockReason?: string | null;
  warnings?: string[];
  failureReasons: string[];
  isSafeToComplete: boolean;
  validatedAt: string;
}

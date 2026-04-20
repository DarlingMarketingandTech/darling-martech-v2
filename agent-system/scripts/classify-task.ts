/**
 * Type-level companion for `classify-task.mjs`.
 * Keeps the preferred .ts scaffold visible while runtime remains Node-portable `.mjs`.
 */
export type TaskMode = "surgical_fix" | "implementation" | "design_media" | "audit" | "refactor";

export interface TaskClassification {
  mode: TaskMode;
  riskLevel: "low" | "medium" | "high";
  confidence: "low" | "medium" | "high";
  source: "explicit" | "heuristic";
  classifiedAt: string;
}

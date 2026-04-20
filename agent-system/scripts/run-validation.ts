export interface ValidationOutcome {
  mode: string;
  checksRun: Array<{ name: string; ok: boolean }>;
  failureReasons: string[];
  isSafeToComplete: boolean;
  validatedAt: string;
}

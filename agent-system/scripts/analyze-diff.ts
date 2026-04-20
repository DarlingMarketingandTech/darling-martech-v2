export interface DiffAnalysis {
  mode: string;
  changedFiles: string[];
  stagedFiles: string[];
  unexpectedFiles: string[];
  exceedsBudget: boolean;
  diffStat: string;
  hasPlaceholder: boolean;
  removedComments: boolean;
  analyzedAt: string;
}

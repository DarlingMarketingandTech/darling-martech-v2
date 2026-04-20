# Follow-Up Improvements

## 1) Session-Scoped Diff Reporting

### Current behavior
- `agent-system/last-run-report.json` analyzes the full current git working tree.
- In a dirty repository, unrelated pre-existing changes appear in the report.

### Risk
- Safety/PR summaries can include unrelated files unless manually filtered by operator.

### Recommended next step
- Add session-scoped delta tracking so `stop` reports only files observed/edited during the active task window.
- Candidate approach:
  - Capture baseline fingerprint at `beforeSubmitPrompt`.
  - Track changed files through hook events plus incremental git diff snapshots.
  - Compute report from `(current - baseline)` intersected with task-observed files.

### Priority
- High-value follow-up; non-blocking for current commit.

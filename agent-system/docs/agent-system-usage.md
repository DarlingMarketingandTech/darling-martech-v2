# Agent System Usage

## What this system does
- Classifies incoming work into explicit modes and risk levels.
- Collects scoped context and task profile constraints before action.
- Tracks observations and file edits through hook events.
- Runs stop-time safety gates and validation checks.
- Produces PR-ready summaries from actual diff + validation outputs.

## Runtime entrypoint
- Hook worker: `agent-system/scripts/hook-worker.mjs`
- Per-hook behavior:
  - `beforeSubmitPrompt` -> classify + context packet + memory initialization
  - `afterMCPExecution` / `afterShellExecution` -> deduped observation tracking
  - `afterFileEdit` -> changed-file state update
  - `stop` -> diff analysis + validation + PR packet generation

## Memory/state artifacts
- `agent-system/memory/task_state.json`
- `agent-system/memory/session_state.json`
- `agent-system/memory/recent_decisions.json`
- Latest run report: `agent-system/last-run-report.json`

## Operator workflow
1. Start a run with a clear task request.
2. Let `beforeSubmitPrompt` classify mode and risk.
3. Execute implementation while hooks track observations/edits.
4. On `stop`, review `last-run-report.json`:
   - `status: safe` means PR prep is eligible.
   - `status: blocked` means resolve failure reasons before completion.

## Safety expectations
- Constrained profiles (`audit`, `surgical_fix`) stop on unrelated diff drift.
- Placeholder text and unjustified comment removals are blocked.
- Validation requirements are profile-specific, not generic.
- Design modes also run heuristic scorecards and threshold gates; see `agent-system/docs/design-validation-gates.md`.
- Strategy/page-generation work now runs strategic context scoring and anti-drift checks; see `agent-system/docs/strategic-context-layer.md`.

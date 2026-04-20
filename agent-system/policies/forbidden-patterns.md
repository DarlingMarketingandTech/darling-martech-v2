# Forbidden Patterns

## Universal
- Unrelated file edits in constrained tasks.
- Placeholder text (`TODO`, `TBD`, lorem, `...`) in final diffs.
- Vague summaries that do not map to actual files changed.

## Constrained Modes (`audit`, `surgical_fix`)
- Broad rewrites.
- Content-heavy page edits during narrow technical corrections.
- Comment removal without explicit rationale.

## Safety / Reporting
- Hiding failed checks in completion summaries.
- Claiming completed validation that was not run.
- Silent rule loosening without policy updates.

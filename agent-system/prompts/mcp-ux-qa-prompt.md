# MCP UX QA Prompt Contract

Use this prompt after visible UI/UX changes to validate experience quality and prevent regressions using MCP tooling (browser automation + visual regression) where available.

This prompt does **not** change product strategy, IA, or copy. It is a QA + evidence gate.

Before running:
- Confirm the active task profile and scope (only test pages that were touched).
- Confirm which MCP tools are available in the current environment.
- If MCP tools are unavailable, fall back to:  manual QA checklist output.

Targets (declare explicitly):
1. Routes to verify (max 5 per pass).
2. Viewports:
   - Mobile: 390×844 (or equivalent)
   - Desktop: 1440×900 (or equivalent)
3. Interaction checks:
   - keyboard tab order + visible focus
   - hover states on interactive cards/links/buttons
   - reduced-motion behavior (if supported)
   - CTA clarity (one primary path)
4. Performance smell checks:
   - layout shift obviousness
   - “dead” affordances (clickable-looking non-links)

Required output:
1. Screenshot set per route (mobile + desktop).
2. If visual-regression is available:
   - baseline reference used (what commit/branch it represents)
   - diff summary (what changed, where, and whether it is acceptable)
3. Findings list (ranked):
   - critical UX breaks (must-fix)
   - accessibility/focus issues (must-fix)
   - polish improvements (optional)
4. Stop conditions:
   - if focus is not visible on keyboard navigation
   - if primary CTA path is ambiguous on a key page
   - if mobile content becomes unreadable or clipped


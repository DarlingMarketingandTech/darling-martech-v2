# Phase 03 Cursor Prompt: Semantic Section and CTA System

Goal:
Improve page structure, accessibility, CTA hierarchy, and reusability before adding heavier visuals.

Implement:
- `src/components/layout-v3/SemanticSection.tsx`
- Use it in one low-risk below-fold section first, such as `ToolsPreviewV3` or `ClosingCtaV3`.

Rules:
- Content must still come from `src/data`.
- Update `src/types` first if a content shape changes.
- Do not add multiple equal primary CTAs.
- Keep Growth System Audit as the low-trust primary action.

Acceptance criteria:
- The section has `section`, `header`, heading id, and `aria-labelledby`.
- Visual styling is unchanged or minimally improved.
- `pnpm verify` passes.

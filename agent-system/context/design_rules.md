# Design Rules

## Visual Hierarchy
- Preserve premium dark/material visual language.
- Keep component changes subordinate to content clarity and conversion flow.
- Favor scoped refinements over broad system rewrites in non-refactor modes.

## Media and Asset Handling
- Prefer Cloudinary-backed assets and data/config wiring over hardcoded image swaps.
- Validate asset reference integrity for changed media paths.
- Avoid introducing decorative media patterns that conflict with proof-first UX.

## Design-System Safety
- In `design_media` mode, runtime architecture edits require explicit intent.
- For narrow tasks, block changes that rewrite unrelated components or layout primitives.

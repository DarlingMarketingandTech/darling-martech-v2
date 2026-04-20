# Design / Media Policy

## Intent
Enable safe design-system, media, and visual-content improvements without accidental architecture drift.

## Preferred Change Types
- Asset and image wiring.
- Content/data/config-driven visual updates.
- Design-system token and composition adjustments.

## Risk Controls
- Do not make runtime architecture edits unless explicitly requested.
- Prioritize reversible edits in data/config/media layers.
- Validate metadata and asset reference integrity for touched surfaces.

## Stop Conditions
- Unexpected runtime architecture changes.
- Placeholder/truncation artifacts in modified content.
- Validation failures required by profile.

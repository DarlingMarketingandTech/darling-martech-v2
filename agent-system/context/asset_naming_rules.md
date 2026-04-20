# Asset Naming Rules

## Purpose
Keep visual production organized across generation tools, Cloudinary, and repo usage.

## Naming Format
Use lowercase kebab-case with predictable segments:

`dm-{surface}-{section}-{intent}-{variant}-{ratio}-{theme}-{version}`

Example:
`dm-services-hero-proof-backplate-v1-16x9-dark-v01`

## Segment Definitions
- `surface`: home, services, proof, tools, process, resources
- `section`: hero, intro, proof, cta, comparison, diagram, card
- `intent`: backplate, support-visual, mockup, illustration, outcome-graphic
- `variant`: v1, v2, v3 (concept option)
- `ratio`: 16x9, 4x5, 1x1, 9x16, 3x2
- `theme`: dark, dark-teal, dark-orange, neutral-dark
- `version`: v01, v02, ... (export revision)

## Required Metadata
Each asset must include:
- Purpose statement (what persuasion job it performs).
- Placement target (page + section).
- Output size/orientation.
- Tool source (stitch/canva/figma/manual).
- Ownership/date.

## File Export Rules
- Use `.webp` or optimized `.png` for UI visuals.
- Use `.svg` for icon/diagram vectors when possible.
- Keep source editable files in design tools; only optimized deliverables enter repo/Cloudinary.
- Never overwrite existing assets without version increment.

## Do Not
- Use ambiguous names like `hero-final-final2`.
- Mix page types in shared folders without intent markers.
- Upload assets without mapping metadata and placement context.

# Operating Modes Policy

## New Modes

### component_upgrade

Use when a bounded component needs quality upgrades in:

- Layout
- Hierarchy
- Spacing rhythm
- Responsiveness
- Accessibility
- Motion behavior
- CTA clarity

Implementation constraints:

- Max files touched: 1-3
- No new dependencies unless explicitly justified in the change rationale

### page_experience_upgrade

Use when a full page needs upgrades in:

- Information architecture
- Narrative flow
- Section sequencing
- Visual rhythm
- UX clarity
- Conversion logic

Implementation constraints:

- No full-page rewrites by default
- Preserve current structure unless explicit approval is provided for structural changes

### asset_system

Use for visual asset creation and integration across:

- Stitch
- Canva
- Figma
- Cloudinary
- Repo wiring

Implementation constraints:

- No direct repo edits in this mode
- Outputs are limited to specs, prompts, generated assets, naming, and mapping artifacts

Mandatory sequence:

1. Define purpose
2. Define placement
3. Define size/orientation
4. Define style constraints
5. Generate/select
6. Name and organize
7. Integrate safely

### design_system_enforcement

Use for consistency audits and standardization across:

- Design tokens
- Typography scale
- Spacing rhythm
- Button/link styles
- Card consistency
- Section shell consistency

## Mode Selection Rule

Choose the narrowest mode that can solve the problem while keeping scope bounded and auditable.

## MCP / Tooling rule (mode-aware)

Use tools because the task requires them, not because they exist.

Defaults:
- **Repo truth first** (routes, data, components, `docs/agent/*`, `agent-system/context/*`).
- **Browser automation** only after visible UI/UX changes, for verification.
- **Live web inspection (Firecrawl/browser)** only when explicitly needed for external reference validation.
- **asset_system mode:** define purpose + placement + size + style + naming + mapping *before* authenticating/sourcing/generating assets; no repo edits in this mode.

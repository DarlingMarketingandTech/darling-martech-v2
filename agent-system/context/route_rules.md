# Route Rules

## Canonical Migrations
- Keep redirects active in `next.config.ts`:
  - `/work` -> `/proof`
  - `/work/:slug` -> `/proof/:slug`
  - `/lab` -> `/tools`
  - `/lab/:slug` -> `/tools/:slug`

## Route Integrity Requirements
- Do not introduce orphaned slugs that are absent from typed data sources.
- Route updates must preserve internal link targets and canonical metadata intent.
- Dynamic route exclusions must remain aligned with dedicated static route pages.

## Safety Checks
- For constrained modes (`audit`, `surgical_fix`), stop if content-heavy route files are touched without explicit scope.
- Flag changes that alter route paths and metadata together unless task profile permits.

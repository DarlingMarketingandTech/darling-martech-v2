# Cloudinary Mapping Rules

## Purpose
Map generated assets into Cloudinary with stable organization and safe repo integration.

## Folder Structure
Use this base path:

`darling-martech/{surface}/{section}/{asset-type}/`

Examples:
- `darling-martech/services/hero/backplates/`
- `darling-martech/proof/cards/support-visuals/`
- `darling-martech/tools/diagrams/system/`

## Public ID Rule
Public IDs should mirror `asset_naming_rules.md` without file extension.

## Required Mapping Metadata
- `source_tool`: stitch | canva | figma | other
- `surface`: page family
- `section`: section placement
- `intent`: persuasion job
- `status`: draft | approved | production
- `owner`: person or agent

## Delivery Pipeline
1. Generate/select asset.
2. Validate naming compliance.
3. Upload to Cloudinary target folder.
4. Record public ID and delivery URL.
5. Wire asset into repo via `CloudinaryImage` or approved loader path.
6. Validate placement and accessibility in UI.

## Safety Rules
- No direct third-party hotlinks in production UI.
- No repo wiring without mapped placement metadata.
- No replacing production assets without versioned rollback option.

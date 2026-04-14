---
name: darling-martech-brand-system
description: Keep Darling MarTech UI and marketing pages aligned with the locked brand system, component architecture, and solo-operator voice. Use this whenever editing `src/app`, `src/components`, `src/data`, or `src/app/globals.css` for this repo, especially for layout changes, new pages, CTAs, diagnostics, proof sections, and visual polish work, even if the user does not explicitly mention a “brand system.”
---

# Darling MarTech Brand System

Use this skill to keep every frontend change aligned with the approved strategy and implementation rules for this repository.

## First sources of truth

Read these before making substantial UI or copy decisions:

1. `CLAUDE.md`
2. `docs/darlingmartech-component-inventory.md`
3. `src/data/*` relevant to the page you are touching

If these sources conflict with generic frontend taste, follow the repo sources of truth.

## What this site is

Darling MarTech is not a generic agency site, a SaaS landing page, or a portfolio gallery.

It is:

- A diagnostic engine
- A solo-operator brand
- A dark, restrained, high-trust company site
- A system where proof and clarity matter more than decoration

Every UI change should make it easier for the right buyer to understand the problem, trust the operator, and take the next step.

## Aesthetic direction

The visual direction is:

- Dark-dominant
- Typographic first
- Precise, not playful
- Confident through restraint
- Editorial and structured, not template-like

Reference posture:

- QDT AI: black field, geometric confidence, minimal clutter
- High-end agency case-study layouts: bold spacing, strong rhythm, clear hierarchy

Do not drift into:

- Startup gradient hero clichés
- Light-theme SaaS dashboards
- Soft, friendly illustration systems
- Generic card farms without hierarchy

## Locked brand rules

### Colors

Use the repo tokens and approved hex values.

- Background: `#0C0C0E`
- Surface: `#13131A`
- Orange accent: `#F05A28`
- Off-white text: `#F5F4F0`
- Teal accent: `#0FD9C8`
- Proof green: `#22C55E`

Use proof green only for proof metrics and numbers. Do not turn it into a general accent color.

### Typography

The font stack is intentionally fixed:

- Syne: display
- Inter: body and UI
- JetBrains Mono: metrics and system/data language

Do not replace Inter with a trendier body font. This repo explicitly chose readability and operational consistency.

### Voice

The voice is:

- Direct
- Precise
- Plainspoken
- Confident
- Occasionally dry

Rules:

- Prefer “I” over “we” for service delivery
- Avoid agency filler and jargon
- Lead with proof, specifics, and concrete outcomes
- Keep copy tight

## Layout and motion rules

- Prefer strong section rhythm over decorative complexity
- Use asymmetry sparingly and intentionally
- Keep backgrounds atmospheric but restrained
- Use motion to reveal structure, not to entertain
- Prefer one-shot entrance animation and metric count-up
- Avoid looping animation unless there is a very strong reason

## Component discipline

- Reuse the inventory structure in `docs/darlingmartech-component-inventory.md`
- Extract reusable sections instead of expanding inline page JSX
- Keep page files as composition layers, not giant markup blobs
- Put shared primitives in `src/components/ui`
- Put content in `src/data`, not directly in JSX

## CTA and trust-ladder guidance

Every page should match the visitor’s trust level.

- Early-stage pages should offer a tool, proof, or learning path
- Mid-stage pages should connect proof to a specific problem
- Late-stage pages can ask for direct contact

Do not make every section scream for a call. The site should feel certain, not needy.

## Quick checklist before finishing

- Does this still look like Darling MarTech rather than a generic agency site?
- Does the hierarchy feel sharper than before?
- Is proof visually distinct and easy to scan?
- Is the copy still solo-operator and specific?
- Did you reuse or create the right component instead of bloating a page file?
- Did you avoid introducing unrelated visual styles?

## Examples of good outcomes

- A homepage hero that feels bolder because spacing, composition, and type improved
- A proof section that reads faster because metrics are clearer and more structured
- A contact page that feels more personal and direct without adding fluff
- A new page that fits the existing system on first read

## Examples of bad outcomes

- Adding purple gradients because they look “premium”
- Rewriting copy into generic marketing language
- Using green for buttons or decorative highlights
- Building one-off section markup instead of using component patterns
- Making the site busier when the problem is clarity

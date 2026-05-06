# Agent Skills Audit Report

- **Date:** 2026-05-06
- **Auditor:** Claude Code (Opus 4.7, 1M context)
- **Scope:** `.claude/skills/` and `.agents/skills/`
- **Companion doc:** [`selected-agent-skills.md`](selected-agent-skills.md)

## Folders inspected

- `.claude/skills/` — 5 skills
- `.agents/skills/` — 6 skills

## Skills found (11 total)

### `.agents/skills/` (repo-aligned)

| Skill | SKILL.md | Frontmatter | Status |
|---|---|---|---|
| accessibility | present | valid (name, description, license, version) | Keep |
| analytics-tracking | present | valid (name, description, version) | Keep with warning (PostHog/Vercel Analytics, not GA4/GTM/Segment) |
| gh-fix-ci | present | valid (name, description) | Keep |
| next-best-practices | present | valid (name, description, `user-invocable: false`) | Keep |
| supabase | present | valid (name, description, version) | Keep with warning (must fetch changelog before implementing) |
| web-quality-audit | present | valid (name, description, license, version) | Keep |

### `.claude/skills/` (generic Anthropic)

| Skill | SKILL.md | Frontmatter | Status |
|---|---|---|---|
| artifacts-builder | present | valid (name, description) | Keep with warning (React 18 + Vite — never touch `src/`) |
| canvas-design | present | valid (name, description) | Keep with warning (out-of-app only — do not override "Dark Current") |
| dev-browser | present | valid (name, description) | Keep |
| image-enhancer | present | valid (name, description) | Keep |
| theme-factory | present | valid (name, description) | Keep with warning (never apply to repo `src/`) |

## Mirroring

No skill exists in both folders. No mirror is required — see [mirroring policy](selected-agent-skills.md#mirroring-policy).

## Missing SKILL.md files

None. Every skill folder contains a readable `SKILL.md` with valid YAML frontmatter and a present `name` + `description`.

## Conflicts with source-of-truth

| Authority | Conflict found |
|---|---|
| `AGENTS.md` | None |
| `CLAUDE.md` | None (analytics drift risk noted, not realized) |
| `docs/revamp/homepage-strategy.md` + ADR 002 | None |
| `docs/revamp/growth-system-audit-strategy.md` | None |
| `docs/revamp/proof-taxonomy-strategy.md` | None |
| Reduced-motion / restrained animation rules | None |
| Data-first architecture (`src/types` → `src/data`) | None |
| Next.js 15 / React 19 stack | `artifacts-builder` carries React 18 + Vite — sandboxed outside `src/`, no actual conflict |

## Suspicious files / scripts

None. Inspected:

- `.agents/skills/gh-fix-ci/scripts/` — supports the documented `gh` CLI workflow.
- `.agents/skills/web-quality-audit/scripts/` — Lighthouse/audit helpers, scoped to read-only auditing.
- `.claude/skills/artifacts-builder/scripts/` — `init-artifact.sh` / `bundle-artifact.sh`, contained to the artifacts workflow.
- `.claude/skills/canvas-design/canvas-fonts/` — font assets, no executables.
- `.claude/skills/theme-factory/themes/` + `theme-showcase.pdf` — static theme assets.

No skill scripts request `.env*` access, attempt destructive `rm` patterns against the repo, or escalate privileges.

## Cross-cutting risks (already documented)

1. **Stack drift** — `artifacts-builder` (React 18 + Vite) and `theme-factory` (preset themes) must stay out of `src/`.
2. **Analytics drift** — `analytics-tracking` defaults to GA4 / GTM / Segment / Mixpanel. Repo contract is PostHog + Vercel Analytics.
3. **Visual identity drift** — `canvas-design` invents new design philosophies. The repo already has "Dark Current".
4. **External-fetch hygiene** — `supabase` and `dev-browser` reach external resources. Honor CLAUDE.md security boundaries (no credentials, tokens, session files into the repo).

## Recommended removals

None.

## Recommended rewrites

None at this time. Possible future hardening (not required now):

- A repo-local `analytics-tracking-darling` fork pinned to PostHog + Vercel Analytics, if the generic skill repeatedly suggests GA4/GTM during real work.
- A repo-local `coolify-ops` skill if Coolify deploy tasks become recurring — currently handled directly against AGENTS.md.

## Final verdict

All eleven installed skills are **safe to keep** as installed. Six `.agents/skills/*` form the day-to-day toolkit; five `.claude/skills/*` are situational and must stay out of `src/`. No conflicts with AGENTS.md, CLAUDE.md, `docs/revamp/*`, the 3-bottleneck homepage taxonomy, the Growth System Audit CTA strategy, or reduced-motion rules. No quarantines. No removals. No app code changed.

Re-run this audit when:

- a new skill is added under either folder,
- `docs/revamp/*` materially changes (e.g. homepage taxonomy revision, new ADR),
- `AGENTS.md` stack rules change (e.g. analytics provider swap),
- a skill is observed violating a cross-cutting risk above.

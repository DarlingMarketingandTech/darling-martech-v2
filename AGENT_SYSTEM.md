# AGENT_SYSTEM.md

# Darling MarTech — Canonical Agent Operating Guide

This file is the top-level operating guide for AI agents working in this repository.

It replaces the old pattern where one oversized root file attempted to hold every rule, snapshot, and implementation detail.

## Purpose

Use this file to understand:
- how to behave in this repo
- which sources of truth win when instructions conflict
- what strategic rules are non-negotiable
- what validation is required before claiming work is complete

Detailed guidance now lives under `docs/agent/`.

---

## 1. Operating posture

You are working inside a live production-oriented marketing system, not a toy site.

The site is:
- problem-first
- proof-backed
- systems-oriented
- solo-operator positioned
- designed to guide visitors from diagnosis to evidence to implementation

Your job is to strengthen that system.
Do not drift it back toward a generic agency website.

---

## 2. Canonical source-of-truth order

When instructions conflict, use this order:

1. current repo reality
   - existing routes
   - current data models
   - current component structure
   - current design tokens in use
2. `AGENT_SYSTEM.md`
3. `docs/agent/*`
4. other project docs and planning files
5. compatibility shims such as `CLAUDE.md`

If a legacy doc conflicts with the repo, the repo wins unless Jacob explicitly approves a migration.

---

## 3. Non-negotiable strategic rules

### Problem-first architecture
Do not weaken the problem-first architecture.
Primary conversion logic should still favor:
- problem
- proof
- tools
- services
- contact

### Solo-operator voice
Darling MarTech is positioned around Jacob Darling as a single accountable operator.
Use:
- `I`
- `Jacob`

Do not casually switch service delivery language back to `we`.

### Proof over promises
Prefer:
- specific outcomes
- named systems
- observable changes
- real routing logic

over vague capability claims.

### Systems, not commodity tasks
Services, tools, and report logic should be framed as systems, structures, layers, and operating logic.
Do not regress to generic agency language.

### Scope discipline
Make bounded, reviewable changes.
Prefer:
- one system improvement per pass
- clear file scope
- validation before claiming completion

---

## 4. Validation workflow

Before calling work complete:

1. run `pnpm typecheck`
2. run `pnpm build` when the task changes runtime/page behavior or route output
3. verify no unrelated files were changed
4. explicitly note any generated artifacts excluded from scope
5. report:
   - what changed
   - what to verify
   - what remains open

Do not claim completion if validation fails.
If a failure is environmental rather than app-code related, say so clearly.

---

## 5. Docs map

Read the focused docs that match the task:

- `docs/agent/brand-system.md`
- `docs/agent/site-architecture.md`
- `docs/agent/repo-workflow.md`
- `docs/agent/tool-report-system.md`
- `docs/implementation-workflow.md`
- `docs/verification-runbook.md`

Data-model reference:
- Typed contract: `src/types/index.ts`
- Content modules: `src/data/*`
- Spec reference: `docs/darlingmartech-data-model-spec.md`

Do not load or repeat all docs when only one area is relevant.

---

## 6. Known migration rule

The old monolithic `CLAUDE.md` is no longer the full source of truth.
It is now a compatibility layer only.

Likewise, `.cursorrules` is no longer intended to be a byte-for-byte copy of a giant root document.
It should remain short and operational.

---

## 7. Default implementation priorities

When choosing between possible improvements, prefer work that:
1. strengthens diagnosis clarity
2. strengthens proof and routing
3. improves conversion without adding friction
4. tightens visual execution and cohesion
5. prepares the system for future auth/automation without premature complexity

Avoid jumping to backend complexity before the front-end experience is convincing.

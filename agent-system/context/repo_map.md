# Repo Map (Operator-Oriented)

## Core Application Areas
- `src/app`: route surfaces (problems, proof, tools, services, process, about, contact, resources).
- `src/components`: UI composition and route-specific sections.
- `src/data`: canonical structured content and route-aware metadata.
- `src/lib`: integration/runtime helpers (Cloudinary, analytics, route safety helpers).
- `src/types`: contracts enforcing typed content and route consistency.

## High-Risk Consistency Zones
- Route migration behavior: `/lab` -> `/tools`, `/work` -> `/proof` in `next.config.ts`.
- Canonical metadata coverage in `src/data/routes.ts` and per-route metadata exports.
- Tool/problem/proof/service linkage integrity (taxonomy and slug references).
- Media and capability representation consistency (Cloudinary-backed assets preferred).

## Agent-System Boundaries
- `agent-system/context`: source-of-truth operating context.
- `agent-system/policies`: mode-specific enforcement rules.
- `agent-system/profiles`: machine-readable task and validation constraints.
- `agent-system/memory`: lightweight persistent run state.
- `agent-system/scripts`: hook orchestration and safety automation.
- `agent-system/prompts`: reusable prompt contracts for intake -> plan -> implement -> review -> PR.

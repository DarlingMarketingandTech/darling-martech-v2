# Report Page Prompt Contract (`/report/[id]`)

Use this prompt to define the standardized report narrative and the expected behaviors for `/report/[id]` when that route is implemented.

Important constraints:
- Do **not** create a separate “reports index” or “report interior slug” system (no `/reports/<slug>` taxonomy).
- `/report/[id]` is a single report renderer for tool/audit outputs.
- The report must route *back into* the core site system: problems → proof → services → tools.

Before planning, load and apply:
- `agent-system/context/strategic_standards.md`
- `agent-system/context/positioning_rules.md`
- `agent-system/context/buyer_psychology.md`
- `agent-system/context/system_foundation_path.md`
- `agent-system/context/problem_service_mapping.md`
- `agent-system/context/trust_ladder_ctas.md`
- `agent-system/context/page_generation_rules.md`
- `agent-system/context/page-purpose-boundaries.md`
- `agent-system/context/relationship_display_limits.md`
- `agent-system/context/proof_storytelling_rules.md`

Hard rules:
- Reports are *diagnose-stage* by default (do not jump to “book a call” as the only CTA).
- One primary CTA, at most one secondary CTA.
- Link recommendations must use real routes present in the repo (no invented slugs).
- The report must feel like an *operator output*, not generic AI text.

Inputs (declare explicitly):
1. Report source (which tool/flow generated it)
2. Buyer-path support: `broken-system`, `missing-system`, or `both`
3. Report payload shape (scores, findings, priorities, etc.)
4. Allowed actions (save, share, export) and data constraints (PII, auth, etc.)

Required output:
1. **Report narrative template**
   - quick summary (what’s wrong + what it costs)
   - diagnosis (top 3 friction points)
   - priority sequence (what to fix first and why)
   - “first working system” bridge when missing-system applies
2. **Save/share behaviors**
   - save state rules (local vs server, idempotency)
   - share model (link safety, expirations, access)
   - export model (PDF/JSON) if applicable
3. **Routing bridges (curated)**
   - related problems (max 2)
   - proof reinforcement (max 2)
   - service next step (max 1)
   - tool follow-ups (max 1)
4. **CTA sequencing**
   - primary CTA (diagnose → evaluate bridge)
   - optional secondary CTA (proof or problem hub)
5. **Implementation notes**
   - expected route + components
   - expected files to change
6. **Validation + stop checkpoints**
   - stop if this becomes a new content taxonomy or adds multiple competing CTAs


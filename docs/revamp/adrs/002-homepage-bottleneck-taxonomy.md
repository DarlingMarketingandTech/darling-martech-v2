# ADR 002 — Homepage Bottleneck Taxonomy

- **Status:** Accepted
- **Date:** 2026-05-06
- **Deciders:** Jacob Darling
- **Supersedes:** the "Capability buckets — use four buckets" rule previously in `.claude/CLAUDE.md`
- **Related:** [docs/revamp/homepage-strategy.md](../homepage-strategy.md), [src/data/homepage.ts](../../../src/data/homepage.ts)

## Context

Two competing taxonomies were in play for the homepage capability section:

1. **Three bottleneck-keyed cards** (live in `homepageV4Data`): website does not move people, follow-up depends on memory, business is stronger than its discoverability. Pain-first, mapped 1:1 to the bottleneck section above it.
2. **Four strategic buckets** (in CLAUDE.md): Foundation, Conversion, Systems, Intelligence. Deliverables-first, capability-grouped.

The conflict blocked downstream work — hero copy tightening, CTA promotion, analytics wiring, dead-code purge, and CTA consolidation all depend on the homepage section contract being settled.

The homepage `bottlenecks` and `capabilities` data structures already shipped as a 3-keyed pair. CLAUDE.md's own prime directive ("lead with pain, not deliverables") favors the 3-bottleneck framing. The 4-bucket model still has real value for `/services`, `/capabilities`, proof filtering, and proposal scaffolding — but as a deliverables menu, it contradicts pain-first homepage messaging.

## Decision

The homepage uses **three bottleneck-keyed cards**, not the four-bucket Foundation / Conversion / Systems / Intelligence taxonomy.

The three bottlenecks are the canonical homepage contract:

1. The website looks fine, but it does not move people.
2. Leads arrive, but follow-up depends on memory.
3. The business is stronger than its discoverability.

The 4-bucket taxonomy is preserved for deeper architecture (services pages, proof filtering, proposals, internal data tagging) but is removed from the homepage contract.

AI / intelligence work is preserved on the homepage by folding it into the existing bottlenecks (discoverability, follow-up automation, decision systems) and into the StartingPointTools section, rather than by adding a fourth card.

## Consequences

### Positive

- Homepage messaging stays pain-first and matches buyer recognition in the first scroll.
- Card count, bottleneck section, and capability section are now structurally consistent (3-3-3).
- Downstream homepage work (copy tightening, CTA promotion, analytics) can proceed against a stable contract.
- The 4-bucket taxonomy still has a clean home in `/services`, `/capabilities`, and proposal scaffolding.

### Negative / tradeoffs

- "AI / Intelligence" loses a top-level homepage pillar. Buyers who arrive specifically for AI work must recognize themselves inside the discoverability or follow-up frames, or via the tools section.
- Promoting AI to a homepage frame later requires a new ADR rather than a quiet card addition.
- Any future capability that does not map to one of the three pains needs a dedicated landing page, not a homepage slot.

### Operational rules

- Do not add a fourth homepage card.
- Do not reorganize the homepage capability section around Foundation / Conversion / Systems / Intelligence.
- Do not use the homepage as a deliverables menu.
- New homepage capability ideas must sharpen an existing pain, not introduce a new pillar.
- Reordering or renaming the three bottlenecks requires an ADR update.

## Alternatives considered

### Adopt the 4-bucket taxonomy on the homepage

Rejected. It violates the "lead with pain, not deliverables" directive, asks the buyer to translate their problem into our taxonomy before deciding we are credible, and would require rewriting the bottleneck section to match — losing the diagnostic frame that routes buyers to the audit.

### Hybrid: 3 bottlenecks + a 4th "Intelligence / AI" card

Rejected. Breaks the 1:1 bottleneck-to-capability mapping that gives the homepage its diagnostic clarity, and re-introduces a deliverables card alongside pain-keyed cards — the worst of both models.

### Defer the decision

Rejected. The conflict was actively blocking 8+ downstream homepage workstreams identified in the 2026-05-06 strategic audit.

## Follow-up

- Update `.claude/CLAUDE.md` to codify the 3-bottleneck homepage contract and remove the 4-bucket homepage rule. *(done in this change)*
- Author `docs/revamp/homepage-strategy.md` as the canonical homepage contract document. *(done in this change)*
- Future: surface the 4-bucket taxonomy on `/services` or `/capabilities` and use it as the `projectType` facet vocabulary on `/proof`.
- Future: revisit if buyer research shows AI work is the primary entry pain rather than a supporting capability.

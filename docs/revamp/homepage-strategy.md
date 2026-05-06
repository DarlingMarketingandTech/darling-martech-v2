# Homepage Strategy — Darling MarTech v2

Status: codified 2026-05-06
Owner: Jacob Darling
Related: [ADR 002 — Homepage Bottleneck Taxonomy](./adrs/002-homepage-bottleneck-taxonomy.md), [.claude/CLAUDE.md](../../.claude/CLAUDE.md)

## TL;DR

The homepage is organized around **three bottleneck-keyed cards**, not the four-bucket Foundation / Conversion / Systems / Intelligence taxonomy. The homepage leads with pain, diagnosis, and buyer recognition. Deliverables menus belong deeper in the site.

## Why bottlenecks, not buckets

Buyers do not arrive looking for "Foundation" or "Intelligence." They arrive recognizing a pain:

- Their site is not moving people.
- Their follow-up depends on memory.
- Their discoverability does not match the quality of the work.

Pain-first framing earns recognition in the first scroll, qualifies the buyer, and routes them to the audit or the matching proof. A deliverables menu does the opposite — it asks the buyer to translate their problem into our taxonomy before they have decided we are credible.

This also matches the prime directive in CLAUDE.md ("lead with pain, not deliverables") and the live data shape in [src/data/homepage.ts](../../src/data/homepage.ts) where `bottlenecks` and `capabilities` are already 1:1 mapped.

## The three homepage bottlenecks (the contract)

These are the canonical homepage taxonomy. Every card, capability frame, proof tile, hero subhead, and CTA must trace back to one of them.

### 1. The website looks fine, but it does not move people.

- **What buyers feel:** activity without conversion; the page reads okay but does not earn the next step.
- **Symptoms:** offer is understandable only after scrolling; proof is present but not decision-useful; the next step feels buried or generic.
- **What gets built:** website structure + conversion — sharper positioning, cleaner page hierarchy, stronger proof placement, clearer next step.
- **Proof anchor:** PrimaryCare Indy — 75% more online bookings.

### 2. Leads arrive, but follow-up depends on memory.

- **What buyers feel:** the pipeline looks busy but revenue leaks; the team is one person sick away from missing deals.
- **Symptoms:** CRM and inboxes tell different stories; follow-up timing varies by person; reporting and operations drift apart.
- **What gets built:** CRM + automation + lifecycle workflows; internal copilots and decision systems where they remove manual handoffs.
- **Proof anchor:** Graston Technique — 95% less manual overhead.

### 3. The business is stronger than its discoverability.

- **What buyers feel:** the work is good but the right buyers cannot find it; ranking, reviews, and authority signals lag the quality.
- **Symptoms:** search visibility is inconsistent; local or AI search signals are under-structured; the right pages are not carrying the proof.
- **What gets built:** structured search presence, AI/GEO readiness, review velocity, authority signals, local trust systems.
- **Proof anchor:** 317 BBQ — top 3 local pack.

## Where the 4-bucket taxonomy lives

Foundation / Conversion / Systems / Intelligence is still useful — just not on the homepage. Use it for:

- `/services` and `/capabilities` index pages (deliverables-oriented)
- Proof filtering on `/proof` (`projectType` facets)
- Proposal and SOW scaffolding
- Internal architecture, data tagging, content modeling

This keeps a useful internal taxonomy without making the homepage a menu.

## Where AI / Intelligence shows up on the homepage

We are not collapsing AI work — we are preserving it inside the bottleneck frame:

| AI / intelligence work | Homepage home |
| --- | --- |
| AI / GEO readiness, structured search, authority signals | Bottleneck 3 (discoverability) |
| Automations, lifecycle workflows, internal copilots, decision systems | Bottleneck 2 (follow-up) |
| Diagnostics, simulators, attribution snapshots | StartingPointTools section |
| Reporting and dashboards | Framed as the outcome of fixing the bottleneck, not a separate pillar |

If "AI" deserves a top-level homepage frame later, that is a strategy change requiring a new ADR — not a quiet card addition.

## Section-by-section contract

| Section | Purpose | Tied to bottleneck taxonomy? |
| --- | --- | --- |
| HomeHero | Operator framing + audit CTA | Implicit (sets up the diagnosis) |
| BottleneckCards | The three pains, with symptoms | Yes — defines the taxonomy |
| CapabilityProof | What gets built per pain, with one proof anchor each | Yes — 1:1 with bottlenecks |
| FeaturedOutcomes | One featured case + 3 highlight tiles | Yes — outcomes mapped to pains |
| StartingPointTools | Audit, simulator, GEO, attribution | Yes — entry points per pain |
| ClosingCta | Audit / proof / contact triad | Yes — re-routes by confidence level |

## Hard rules

- Three cards. Not four. Not five.
- Cards are keyed by buyer pain, not by deliverable bucket.
- Capability frames mirror the same three keys, in the same order.
- New ideas earn a homepage spot only by sharpening one of the three pains, not by adding a new pillar.
- The 4-bucket taxonomy may be referenced from `/services` or `/capabilities`, but never from a homepage section header.
- Homepage copy must pass a 5-second pain-recognition test before any deliverables vocabulary appears.

## Out of scope (intentionally)

- Reordering or renaming the three bottlenecks without an ADR update.
- Adding a "AI / Intelligence" homepage card.
- Adding a "Foundation / Brand" homepage card.
- Using the homepage as a service catalog.

If a future buyer segment does not fit one of the three pains, the answer is usually a dedicated landing page, not a fourth homepage card.

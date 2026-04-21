# Relationship Display Limits

## Purpose
Stop “relationship overload” caused by connected data models (problem ↔ service ↔ proof ↔ tool).

Default behavior: **curate, don’t enumerate.**

---

## Global limits (hard defaults)

- **One primary CTA** per page.
- **At most one secondary CTA** (only if it supports the page’s trust stage).
- **Related sections are supporting UI** and must appear *after* the page’s primary narrative sections.

If more than these are needed, route to a hub page instead of expanding the current page.

---

## Related-item caps by page type (defaults)

### Service detail
- Related proofs: **max 3**
- Related problems: **max 2**
- Related tools: **max 1**
- “More like this” routing: link to `/proof` and/or `/problems` instead of listing more

### Proof / project detail
- Related services: **max 2**
- Related problems: **max 1**
- Related tools: **max 1**
- Related proofs: **max 0** (route to `/proof` hub if “more proof” is needed)

### Problem detail
- Related tool: **max 1** (usually the primary CTA)
- Related proofs: **max 2**
- Related services: **max 1**

### Tool detail
- Related problems: **max 2**
- Related proofs: **max 1**
- Related services: **max 1**

### Hubs
- Use **curated selections** (featured + a scannable list). Do not attempt to show every relationship edge.

---

## Selection rules

When choosing which related items to show:

- Prefer **most directly applicable** (same buyer state + same failure layer).
- Prefer **highest-signal proof** (clear “what changed” outcomes, not generic logos).
- Prefer **one-step adjacency** (avoid multi-hop “related because related” chains).
- If you can’t justify why an item reinforces the page’s primary object, exclude it.

---

## Anti-drift checks (what to block)

Block or reduce when you see:

- more than 2 CTAs competing above the fold
- “Related” sections taking more visual weight than the page’s main content
- pages that feel like a sitemap of the data model


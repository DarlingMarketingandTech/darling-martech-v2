# Proof Taxonomy Strategy

## Purpose

Prepare the revamp to make proof easier to browse, compare, and trust without centering company hierarchy.

## Primary organizing logic

Proof should be organized by decision usefulness first:

- project type
- buyer scenario
- complexity
- scope shape
- operational problem being solved

This should help a buyer answer:

- Is this similar to my situation?
- Is this the kind of system or project I need?
- How complex was the work?
- What changed operationally?

## What to avoid

Do not make proof primarily about:

- company names
- parent companies
- client family trees
- industry buckets as the first filter

Do not hide high-value proof under parent-brand wrappers.

Specific rule:

- remove the idea of a Pike Medical parent proof
- do not promote the Pike Medical parent brand
- surface important sub-projects directly when they are decision-useful on their own

## Secondary context

Client names can still appear as optional context when they strengthen credibility, but they should not be the top-level taxonomy.

Allowed supporting context:

- client name
- market/category
- engagement context
- timeline context

## Suggested proof dimensions

Use these dimensions when the actual revamp begins:

1. Project type
   - website rebuild
   - conversion path repair
   - CRM and automation system
   - local growth system
   - reporting and attribution system
2. Buyer scenario
   - demand exists but conversion leaks
   - operations are manual and fragmented
   - trust exists but routing is weak
   - spend is visible but revenue attribution is weak
3. Complexity
   - focused fix
   - multi-surface rebuild
   - system integration
   - ongoing operating layer
4. Scope shape
   - single route or conversion flow
   - multi-page architecture
   - CRM and lifecycle automation
   - reporting and operational visibility
5. Decision usefulness
   - similar business problem
   - similar delivery shape
   - similar implementation risk

## Implementation rule

When proof structure changes:

1. define the taxonomy in `src/types`
2. encode it in `src/data`
3. render from typed data

Do not implement the taxonomy first as hand-written JSX grouping.

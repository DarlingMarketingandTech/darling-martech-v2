# /services System Redesign Spec

## Purpose
Translate the strategic audit of `/services` into a concrete implementation blueprint before page code changes begin.

This spec exists to keep `/services` aligned with the rest of the site’s system-first architecture and to prevent it from drifting into a generic capabilities index.

## Current Diagnosis
The current `/services` page already has meaningful strengths:
- clustered service presentation
- systems-first tone in metadata and page helper copy
- related proof beneath service cards
- a diagnostic CTA at the bottom

But it still behaves more like a capability index than a true implementation layer.

### Core weaknesses
1. buyer-state split is not explicit enough
2. Foundation is not represented as a first-class presentation cluster
3. implementation logic is implied rather than clearly explained
4. proof is attached to cards but not integrated into a stronger problem → implementation → proof journey
5. CTA logic is not fully normalized to evaluation-stage intent

## Page Job
`/services` should answer this question:

> Once I understand the problem, how does Darling MarTech actually fix or build the system?

It is not the first-stop diagnosis page.
It is the implementation-layer page after problem recognition.

## Required Strategic Outcomes
The redesigned page should:
- support both broken-system and missing-system buyers
- explain how system work gets done
- group services into implementation lanes, not menu categories
- connect clusters to problems, proof, and tools
- use evaluation-stage CTA logic
- feel like a system map, not an agency list

## Proposed Architecture

### 1. Hero
The hero should frame `/services` as the implementation layer of the site.

Required message:
- `/problems` helps identify what is wrong
- `/services` shows how the system gets built, repaired, or expanded

The hero should avoid generic “capabilities” framing and instead make the page feel operational and specific.

### 2. Buyer-State Split
Immediately after the hero, add a visible split between:

#### Broken-system path
For buyers who already have tools, traffic, teams, or process, but the system is fragmented, underperforming, or hard to trust.

#### Missing-system path
For buyers who do not yet have a real operating system behind lead capture, follow-up, conversion, and visibility.

This split should help users select the right implementation lane before browsing clusters.

### 3. Four Implementation Lanes
The presentation model should use four service clusters:

#### Foundation
First real system for smaller or system-starved operators.

Use for:
- weak or absent CRM
- brochure-style sites
- disconnected intake / booking / follow-up
- owner-dependent systems

Good outcomes:
- first working stack
- fewer missed leads
- usable intake / booking / follow-up
- practical visibility into what is working

Primary next step:
- technical roadmap / foundation diagnostic

#### Build
Digital experience, website, positioning, trust, and system structure.

Use for:
- site underperformance
- weak positioning
- trust mismatch
- confusing information architecture

Good outcomes:
- stronger conversion
- better trust
- cleaner buyer journeys
- more accurate representation of business quality

#### Scale
CRM, automation, attribution, and operational leverage.

Use for:
- disconnected tools
- manual drag
- weak follow-up
- reporting distrust

Good outcomes:
- less manual work
- better pipeline visibility
- cleaner automation
- stronger lead handling and attribution

#### Grow
Visibility, search, demand capture, and conversion economics.

Use for:
- low visibility
- weak demand capture
- search underperformance
- poor acquisition economics

Good outcomes:
- stronger discovery
- more qualified traffic
- better demand capture
- cleaner channel feedback loops

### 4. How the Work Happens
Add a dedicated section that explains the implementation model in simple operational terms:
1. diagnose the system state
2. identify highest-leverage friction
3. select the implementation lane
4. build, connect, and validate

This section should make the page feel like a real operating model rather than a sales catalog.

### 5. Proof Bridge
Create a stronger proof bridge at cluster level.

Each lane should include:
- what kind of system change it drives
- what outcome types support it
- where the visitor can see proof

Do not rely only on passive “related proof” blocks beneath cards.

### 6. CTA Layer
The bottom section should focus on evaluation-stage actions.

Preferred CTA directions:
- start with the roadmap
- see the proof
- diagnose the system
- build the first real system
- book a strategic conversation

Avoid vague generic service CTAs.

## Routing Rules
`/services` must strengthen canonical flow:
- `/problems` for diagnosis and self-identification
- `/proof` for validation
- `/tools` for low-friction diagnostics
- `/services/technical-roadmap` for scoped entry diagnostic / foundation path

Target flow:
- problem → tool → proof → services → contact
- missing-system variant: problem → foundation path → proof → build/scale

## Implementation Notes
Recommended file scope for eventual implementation:
- `src/app/services/page.tsx`
- `src/data/services.ts`
- possibly a small supporting component if buyer-state split or lane summaries deserve reuse

Avoid broad rewrites of service detail pages in the same pass.

## Success Criteria
A successful redesign should result in:
- explicit support for both buyer states
- a first-class Foundation lane
- clearer implementation framing
- stronger proof linkage
- cleaner evaluation-stage CTA routing
- less “browse capabilities,” more “choose the right lane” behavior

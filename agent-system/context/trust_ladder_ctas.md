# Trust Ladder CTAs

## Purpose
Define how calls to action should align to trust stage and buyer state so the site does not ask for more trust than it has earned.

This file should be used when planning or auditing:
- hero CTAs
- section bands
- problem pages
- service pages
- proof pages
- tools
- resources

## Trust Stages
1. **Browse** — low trust, early curiosity
2. **Diagnose** — self-assessing a problem or system gap
3. **Learn** — reading explanation, proof, or educational resources
4. **Evaluate** — comparing fit, process, and expected outcomes
5. **Ready** — willing to talk, scope, or buy

## General Rules
- every page should have a next step appropriate to its trust level
- stage-1 pages should not rely only on “book a call”
- tools and audits should be visible on low-trust pages
- proof and process should support mid-trust pages
- direct conversation CTAs should be strongest on high-trust pages
- default to **one primary CTA** and **at most one secondary CTA** (see `relationship_display_limits.md`)

## CTA Patterns by Stage

### Browse
Goal:
- reduce friction
- help users self-identify the problem

Recommended CTA types:
- run the quiz
- check your stack
- see what is leaking
- find your bottleneck
- compare current vs future state

Strong fit pages:
- homepage
- problem hubs
- educational landing pages

### Diagnose
Goal:
- help the user measure or name the issue

Recommended CTA types:
- see your results
- map the gaps
- save the report
- review the system score
- see related proof

Strong fit pages:
- tool pages
- audit flows
- problem detail pages

### Learn
Goal:
- strengthen trust with proof and explanation

Recommended CTA types:
- see how this was solved
- review the proof
- read the framework
- understand the process

Strong fit pages:
- proof pages
- resources
- process pages

### Evaluate
Goal:
- help users understand fit, method, and expected engagement shape

Recommended CTA types:
- see how this engagement works
- review the service path
- compare your current system to the target model
- book a diagnostic conversation

Strong fit pages:
- service pages
- process pages
- high-intent proof pages

### Ready
Goal:
- convert qualified intent into conversation or scoped action

Recommended CTA types:
- book a diagnostic call
- start the system review
- tell me what is broken
- request a roadmap

Strong fit pages:
- contact
- process
- high-intent service pages
- end-of-proof bands

## Buyer-State Adjustments

### Broken-System Buyers
These buyers already have stack complexity.

CTA emphasis:
- diagnose what is broken
- map the friction points
- review proof of repair
- book a strategic conversation

Good wording:
- find the bottleneck
- audit the current stack
- map the handoff gaps
- see how others fixed this

### Missing-System Buyers
These buyers often need a practical foundation first.

CTA emphasis:
- understand what is missing
- build the first real version of the system
- reduce overwhelm
- move from scattered tools to a working structure

Good wording:
- see what your system is missing
- build the first real setup
- fix intake, follow-up, and visibility
- start with the foundation

## Page-Type Guidance
### Homepage
Should normally offer:
- one primary CTA (browse/diagnose)
- one secondary CTA (evaluate/ready)

### Problem Pages
Should normally offer:
- one primary CTA (diagnose)
- one secondary CTA (proof *or* service direction), not both by default

### Service Pages
Should normally offer:
- one primary CTA (evaluate)
- one secondary CTA (proof/learn)

### Proof Pages
Should normally offer:
- one primary CTA (learn/evaluate)
- one secondary bridge (service/process *or* tool), not both by default

### Resource Pages
Should normally offer:
- one primary CTA (learn)
- optional one secondary CTA (diagnose *or* subscription), not both by default

## Failure Modes
Flag CTA strategy when:
- a low-trust page only offers high-trust CTAs
- missing-system buyers are pushed into enterprise language too early
- pages have no clear next step
- proof is shown without a path forward
- the CTA does not match the page’s promise or audience state

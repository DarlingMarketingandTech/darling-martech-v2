# Competitive Audit: Dapper vs Darling MarTech (2026-04-21)

Scope: `https://www.dapper.agency/` vs `https://www.darlingmartech.com/`

This report combines:
- Content + messaging + IA review (manual inspection of key pages)
- Lab performance, accessibility, SEO, and best-practices metrics (Lighthouse; headless Chrome; mobile + desktop)

Artifacts generated in this run:
- `audits/lighthouse-summary.csv` (page-by-page metrics)
- `audits/lighthouse-aggregates.csv` (averages by site + device)
- `audits/*.json` (22 Lighthouse reports)

## Executive Summary

Darling is the stronger “operator-led, proof-first” site with materially better technical UX (especially on mobile) and clearer differentiation.

Dapper is a strong “modern performance agency” site with broad content coverage and mature agency conversion surfaces, but its **mobile performance and best-practices hygiene are materially weaker** (high LCP, heavy JS, console issues, third-party cookies).

## Quantitative Benchmark (Lighthouse averages)

Source: `audits/lighthouse-aggregates.csv` (averaged across 5 Dapper pages + 6 Darling pages per device).

### Mobile (average across key pages)
- Dapper: Performance **28.6**, Accessibility **85.0**, Best Practices **54.0**, SEO **100.0**, avg LCP **~23.0s**
- Darling: Performance **67.8**, Accessibility **95.3**, Best Practices **99.3**, SEO **100.0**, avg LCP **~5.2s**

### Desktop (average across key pages)
- Dapper: Performance **60.0**, Accessibility **84.4**, Best Practices **54.0**, SEO **100.0**, avg LCP **~2.4s**
- Darling: Performance **95.5**, Accessibility **95.3**, Best Practices **99.3**, SEO **100.0**, avg LCP **~1.3s**

**Interpretation:** Dapper’s desktop is “fine”, but its mobile experience is likely to feel sluggish/heavy compared to Darling, especially on mid-tier phones and real 4G/5G conditions.

## Dapper: Build + Content Structure + Front-End Theories

### “Build” signals (observable)
- Client-side weight is high (mobile). Lighthouse flags **JS execution ~11.3s**, main-thread work **~17.4s**, and LCP **~25.4s** on homepage mobile in this run.
- Best-practices flags include **deprecated APIs**, **console errors**, and **Chrome Issues panel logs** on the homepage run.
- JS library detection flags **jQuery** (3.7.1) and `core-js` polyfills on the homepage run.

### Content/IA shape (what they’re doing)
- Agency-standard depth: Services + Cases + Blog + About + Contact, plus multiple lead-capture moments.
- Persuasion is “framework + proof + contrast”: a clear process story, lots of results tiles, and “traditional vs modern” comparison-style framing.

### Front-end design theory (how it persuades)
- “Modern agency scrollytelling”: stacked sections, animated transitions, strong typographic hierarchy.
- “Proof stacking”: frequent results snippets instead of long narrative.
- “Multi-surface conversion”: several pathways to “talk to us” (good for volume, but can introduce CTA noise).

## Darling: Build + Content Structure + Front-End Theories

### “Build” signals (observable)
- Strong technical baseline: best-practices/SEO are effectively “clean” across key pages in Lighthouse.
- Accessibility is consistently high; the main homepage a11y miss called out in this run is **links relying on color** (contrast/underline styling choice).
- One best-practices flag present on homepage run: **console errors logged** (worth fixing even if user-visible impact is low).

### Content/IA shape (what you’re doing)
- “Operator-led system” framing: Services + Work + Tools + Process are integrated into a single decision flow.
- Proof is organized like a system: flagship proofs + supporting proofs, with clear scanning.
- Tools act as a low-friction entry point, which is uncommon (and differentiating) versus typical agency sites.

### Front-end design theory (how it persuades)
- “Decision-support UX”: structured pages help a buyer self-qualify quickly (instead of selling only on vibe).
- “Proof > promises” is baked into IA: tools and work are primary, not secondary.
- “Lean UI”: fewer conversion surfaces than Dapper, but higher clarity per screen.

## Direct Comparison (what wins, where)

### Content
- Dapper wins on breadth and “enterprise agency credibility” (lots of surface area, many service angles).
- Darling wins on buyer clarity and depth-per-page (more operational specificity; less generic language).

### Design / UI
- Dapper is very “modern agency” (theme switch, motion-first, media-forward).
- Darling is “premium technical/operator” (restrained, system-like). This tends to convert better for buyers who want accountability and implementation, not a creative partner.

### UX (including performance + accessibility)
- Darling materially wins on performance and best-practices cleanliness (especially mobile).
- Dapper’s mobile LCP/TTI numbers imply real buyers may experience lag before meaningfully engaging with the page.

### Structure / IA
- Dapper: classic agency IA (comprehensive; easy to browse).
- Darling: tighter IA with stronger “what do I do next?” flow (tools/process/work as an intentional funnel).

### CTAs
- Dapper: more surfaces and more “ask density” (good for volume; risks distraction).
- Darling: fewer surfaces, clearer intent, but could borrow 1–2 “micro-CTAs” (e.g. context-specific CTAs inside proof and services sections).

### Messaging + Brand identity
- Dapper: strong, but closer to “best-in-class agency standard”.
- Darling: stronger differentiation (“operator-led”, “no handoffs”, “diagnosis-first”, “proof-first”).

## Ratings (1.0–15.0 scale)

These are composite judgments (content + design + UX + technical quality), anchored by the Lighthouse data collected on 2026-04-21 plus the on-page IA/messaging review.

### Dapper (dapper.agency)
- Content: **12.5**
- Design: **12.0**
- UI: **11.5**
- UX: **8.8** (major drag from mobile performance + best-practices issues)
- Structure/IA: **12.0**
- CTAs: **12.5**
- Messaging: **11.5**
- Brand identity: **12.0**
- Overall: **10.9**

### Darling (darlingmartech.com)
- Content: **13.0**
- Design: **11.7**
- UI: **12.2**
- UX: **12.6** (strong technical baseline + clarity; fix minor a11y + console issue)
- Structure/IA: **12.7**
- CTAs: **12.0**
- Messaging: **13.5**
- Brand identity: **13.0**
- Overall: **12.7**

## What to Steal (high leverage, low risk)

From Dapper → Darling:
- One “contrast block” (e.g., “agency model vs operator-led system”) in a highly scannable table-like pattern.
- A slightly broader “proof snippets” layer above the fold (small, credible metrics—without becoming a logo wall).
- A second CTA style that’s still low-pressure (e.g., “Get a quick diagnosis” alongside “Let’s talk”).

From Darling → Dapper:
- Tighter differentiation (less “we’re great at performance marketing”, more “this is the specific way we run engagements”).
- Better mobile performance discipline (their current site structure is punishing on mobile).

## Prioritized Recommendations for Darling (based on the audit)

1) Fix Lighthouse “errors-in-console” on key pages (homepage at minimum).
2) Address “links rely on color” on homepage (simple underline/contrast tweak; improves accessibility score consistency).
3) Add 1–2 additional conversion surfaces that do not add noise:
   - In Work: “Request a teardown of this system for your business”
   - In Services: “See proof for this” anchored to 1–2 flagship work items

If you want, I can turn these into scoped PRs in this repo (starting with the console error + link styling a11y fix).


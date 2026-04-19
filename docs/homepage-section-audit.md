# Homepage section audit

**Sources:** [darlingmartech-homepage-copy.md](darlingmartech-homepage-copy.md) (and full site copy doc) vs [`src/app/page.tsx`](../src/app/page.tsx) + [`src/data/homepage.ts`](../src/data/homepage.ts) + global [`SiteHeader`](../src/components/layout/SiteHeader.tsx) / [`SiteFooter`](../src/components/layout/SiteFooter.tsx).

**Convention:** Copy doc “11 sections” = hero body + discrete bands below the fold. Nav and footer are global, not in `page.tsx`.

| # | Copy section | Implemented as | Status |
|---|----------------|-----------------|--------|
| 1 | Nav bar | `SiteHeader` + [`navigation.ts`](../src/data/navigation.ts) primary links; CTA wired separately (see Cal pass) | Match |
| 2 | Hero | `HomepageHero` + `homepageData.hero` | Match |
| 3 | Credibility ticker / proof bar | `ProofTicker` + `homepageData.proofBar` | Match (5 metrics) |
| 4 | Problem identification (2×2) | `ProblemHubGrid` + first four `problemPages` | Match (four clusters; copy doc titles align with hub cards) |
| 5 | Diagnostic orange band | `DiagnosticOrangeBand` + `homepageData.diagnosticBand` | Match; headline uses “short” diagnostic wording; body states **8 questions** (quiz) |
| 6 | How it works (3 columns) | `BandSection` + `homepageData.processSection.columns` | Match; minor punctuation vs copy doc (em dash in intro — optional polish) |
| 7 | Proof strip | `ProofGrid` + `homepageData.proofStrip` | Match |
| 8 | “Just you” / owner | `homepageData.ownerOperator` | Match; optional portrait in copy doc not required in data |
| 9 | Tools preview | `ToolsPreviewBand` + first four `tools` from `labs.ts` | Match (order follows `labs.ts`, not copy doc card order) |
| 10 | Closing CTA | `homepageData.closingCta` | Match; primary CTA uses **Cal.com** (`siteConfig.calComLink`); secondary → `/tools` |
| 11 | Footer | `SiteFooter` + `navigation.footer` | Match |

**Residual notes**

- **Tool card order** on homepage: driven by [`labs.ts`](../src/data/labs.ts) array order; copy doc lists a specific order — change `tools` array only if marketing wants that exact sequence.
- **Nav primary CTA** label in copy: “Let’s talk →”; site uses same label; href should be **Cal.com** for parity with “conversation = book time” (implemented in navigation data).

**Verification:** Run homepage in browser per [verification-runbook.md](verification-runbook.md) after CTA changes.

\# DARLING MARTECH — COMPONENT INVENTORY  
\# Complete UI component list for the Darling MarTech site rebuild  
\# File: darlingmartech-component-inventory.md  
\#  
\# Conventions:  
\# \- PascalCase component names  
\# \- All components live in /src/components/  
\# \- All components use Tailwind CSS classes  
\# \- Shadcn/UI is the base for interactive primitives (Dialog, Select, etc.)  
\# \- Framer Motion handles all animation via AnimateOnScroll wrapper or direct  
\# \- All data is typed via interfaces defined in darlingmartech-data-model-spec.md  
\# \- Props marked with ? are optional

\---

\#\# LAYOUT COMPONENTS  
\#\#\# /src/components/layout/

| Component | File | Description | Key Props | Pages Used |  
|---|---|---|---|---|  
| \`SiteHeader\` | \`SiteHeader.tsx\` | Top navigation bar. Logo left, primary nav center, CTA button right. Sticky on scroll with background blur transition. Transparent at page top. Mobile: hamburger menu collapses to drawer. | \`nav: NavItem\[\]\` \`cta: NavItem\` \`isTransparent?: boolean\` | All pages |  
| \`SiteFooter\` | \`SiteFooter.tsx\` | Full-width footer. 3-column nav links, contact details column, copyright row. Dark surface (\#0C0C0E), orange accent on brand name. | \`columns: FooterColumn\[\]\` \`contactInfo: SiteConfig\['founder'\]\` | All pages |  
| \`MobileNav\` | \`MobileNav.tsx\` | Slide-in drawer for mobile navigation. Triggered by hamburger in SiteHeader. Full-height overlay, links in large Syne type. | \`nav: NavItem\[\]\` \`cta: NavItem\` \`isOpen: boolean\` \`onClose: () \=\> void\` | All pages (mobile) |  
| \`PageWrapper\` | \`PageWrapper.tsx\` | Outer container for all page content. Controls max-width (1280px), horizontal padding (px-6 md:px-12), background color, and min-height. | \`children: ReactNode\` \`className?: string\` | All pages |  
| \`SectionWrapper\` | \`SectionWrapper.tsx\` | Standardized section container. Consistent vertical padding (py-20 md:py-28) between all page sections. Optional id for anchor linking. | \`children: ReactNode\` \`id?: string\` \`className?: string\` \`background?: 'dark' \\| 'darker' \\| 'band'\` | All pages |  
| \`BandSection\` | \`BandSection.tsx\` | Full-width colored band section. Slightly lighter than page background. Used for proof bars, CTA bands, metrics strips. | \`children: ReactNode\` \`className?: string\` | Multiple pages |

\---

\#\# HERO COMPONENTS  
\#\#\# /src/components/hero/

| Component | File | Description | Key Props | Pages Used |  
|---|---|---|---|---|  
| \`PageHero\` | \`PageHero.tsx\` | Standard full-width hero block. Left-aligned. Eyebrow (orange small caps) → H1 (Syne Bold) → body text (Inter 18px off-white) → optional CTA button(s). Used across all interior pages with slight layout variants. | \`eyebrow: string\` \`headline: string\` \`body: string\` \`ctas?: { label: string; href: string; variant: 'primary' \\| 'secondary' }\[\]\` \`variant?: 'default' \\| 'split'\` | Problems, Proof, About, Process, Contact, Tools |  
| \`HomepageHero\` | \`HomepageHero.tsx\` | Specialized hero for homepage only. Two-line Syne headline with diagnostic framing. Body \+ two CTAs. Below headline: animated proof metric counter strip. Background: near-black with subtle geometric texture layer from brand system. | \`headline: string\` \`subhead: string\` \`body: string\` \`metrics: ProofMetric\[\]\` \`primaryCta: NavItem\` \`secondaryCta: NavItem\` | Homepage only |

\---

\#\# PROOF / METRICS COMPONENTS  
\#\#\# /src/components/proof/

| Component | File | Description | Key Props | Pages Used |  
|---|---|---|---|---|  
| \`ProofBar\` | \`ProofBar.tsx\` | Full-width metrics strip. 4 key numbers in JetBrains Mono at 64px in Proof Green (\#22C55E). Each metric: value large, label small below in muted off-white Inter. Sits on dark band background. No animation — static, confident display. | \`metrics: ProofMetric\[\]\` | Homepage, /proof hub |  
| \`ProofCard\` | \`ProofCard.tsx\` | Individual case study card. Orange 4px left border accent. Top: outcome tag pill(s) in Proof Green. Title in Syne SemiBold. Client context in small Inter muted. Primary metric large in JetBrains Mono (Proof Green). 2-sentence result description. Systems built list as small pills. CTA text link. | \`caseStudy: CaseStudy\` \`showSystems?: boolean\` | /proof hub, /problems/\[slug\], Homepage |  
| \`ProofGrid\` | \`ProofGrid.tsx\` | Responsive grid container for ProofCards. 2-column on desktop (gap-6), 1-column on mobile. When showFilter is true, renders FilterBar above and handles client-side filter state. | \`caseStudies: CaseStudy\[\]\` \`showFilter?: boolean\` \`defaultFilter?: string\` | /proof hub |  
| \`FilterBar\` | \`FilterBar.tsx\` | Horizontal scrollable pill filter row. Filters ProofGrid results by OutcomeTag. Active pill: orange fill. Inactive: muted off-white border. Client-side only — no page reload. Scrollable on mobile. | \`filters: string\[\]\` \`activeFilter: string\` \`onFilter: (filter: string) \=\> void\` | /proof hub |  
| \`MetricDisplay\` | \`MetricDisplay.tsx\` | Reusable single metric display. Value in JetBrains Mono in Proof Green. Label in Inter muted below. Three size variants: sm (card context), md (strip context), lg (hero context). | \`value: string\` \`label?: string\` \`size?: 'sm' \\| 'md' \\| 'lg'\` \`className?: string\` | ProofBar, ProofCard, HomepageHero |  
| \`ProofStrip\` | \`ProofStrip.tsx\` | Horizontal scrollable proof highlight strip for homepage. 4 entries: client name in Syne SemiBold \+ key result stat in JetBrains Mono Proof Green \+ small text link to case study. Subtle left border separator between items. | \`items: { client: string; result: string; caseStudySlug: string }\[\]\` | Homepage |  
| \`AntiClaimRow\` | \`AntiClaimRow.tsx\` | "What I don't claim" 3-column layout. Each column: a crossed-out claim on the left (muted, struck through) and what's actually true on the right. Used on /proof page for intellectual honesty section. | \`antiClaims: { claim: string; truth: string }\[\]\` | /proof hub |

\---

\#\# PROBLEM / DIAGNOSTIC COMPONENTS  
\#\#\# /src/components/problems/

| Component | File | Description | Key Props | Pages Used |  
|---|---|---|---|---|  
| \`ProblemCard\` | \`ProblemCard.tsx\` | Card for each problem cluster. Minimal icon (single-color SVG), problem title in Syne SemiBold, 1-line description in Inter, orange text link CTA to /problems/\[slug\]. Two variants: 'hub' (full card with border) and 'inline' (compact for use within content). | \`problem: ProblemPage\` \`variant?: 'hub' \\| 'inline'\` | /problems hub, Homepage |  
| \`ProblemHubGrid\` | \`ProblemHubGrid.tsx\` | 2×3 grid container for 6 ProblemCards on the /problems page. 2-column desktop, 1-column mobile. | \`problems: ProblemPage\[\]\` | /problems hub |  
| \`SymptomList\` | \`SymptomList.tsx\` | "Does this sound familiar?" bulleted list section on individual problem slug pages. Each symptom as a line with small orange check/dash prefix. Section has eyebrow \+ H2 intro. | \`symptoms: string\[\]\` \`headline?: string\` | /problems/\[slug\] |  
| \`DiagnosticCTA\` | \`DiagnosticCTA.tsx\` | CTA band at bottom of each problem slug page. Two paths: 1\) link to the relevant diagnostic tool, 2\) link to contact. Dark band background, left-aligned copy, two CTA buttons. | \`tool?: Tool\` \`problemSlug: ProblemCluster\` \`contactHref: string\` | /problems/\[slug\] |  
| \`ProblemNav\` | \`ProblemNav.tsx\` | Secondary navigation on problem slug pages. Shows all 6 problem clusters as linked pills. Highlights the current active problem. Allows quick lateral navigation between problem pages without going back to hub. | \`problems: ProblemPage\[\]\` \`activeProblem: ProblemCluster\` | /problems/\[slug\] |

\---

\#\# TOOL / INTERACTIVE COMPONENTS  
\#\#\# /src/components/tools/

| Component | File | Description | Key Props | Pages Used |  
|---|---|---|---|---|  
| \`ToolCard\` | \`ToolCard.tsx\` | Card for each interactive tool on the /tools hub. Tool title in Syne SemiBold, tagline in Inter, estimated time badge in JetBrains Mono (small, muted), primary CTA button. Subtle dark surface card with orange left border accent. | \`tool: Tool\` | /tools hub, Homepage tools preview |  
| \`ToolGrid\` | \`ToolGrid.tsx\` | Grid container for ToolCards. 2-column desktop, 1-column mobile. | \`tools: Tool\[\]\` | /tools hub |  
| \`ToolsPreviewBand\` | \`ToolsPreviewBand.tsx\` | Homepage section showing 2-3 featured tools. Dark band background, eyebrow \+ H2 intro, tool cards in horizontal layout, "See all tools" text link. | \`tools: Tool\[\]\` \`cta: NavItem\` | Homepage |  
| \`QuizEngine\` | \`QuizEngine.tsx\` | Multi-step question flow engine. Manages step state, answer accumulation, progress bar updates, result routing logic. Renders QuizProgress \+ QuizQuestion per step. On completion: routes to ResultCard or EmailGate (if emailGated). | \`tool: Tool\` \`onComplete: (result: ToolResult, answers: Record\<string, any\>) \=\> void\` | /tools/\[slug\] |  
| \`QuizProgress\` | \`QuizProgress.tsx\` | Progress indicator at top of quiz. Step number ("Question 3 of 7") in Inter small \+ orange progress bar fill. Positioned sticky below header. | \`current: number\` \`total: number\` | /tools/\[slug\] (inside QuizEngine) |  
| \`QuizQuestion\` | \`QuizQuestion.tsx\` | Single question display. Handles 4 input types: 'single' (radio cards), 'multi' (checkbox cards), 'scale' (horizontal slider with labeled endpoints), 'text' (textarea). Each renders in same clean layout: question text in Syne, options in Inter, Next button below. | \`question: ToolQuestion\` \`onAnswer: (value: any) \=\> void\` \`currentAnswer?: any\` | /tools/\[slug\] (inside QuizEngine) |  
| \`ResultCard\` | \`ResultCard.tsx\` | Full-page result display after quiz completion. Result label as large badge. Headline in Syne Bold. Description in Inter. Maps to relevant /problems/\[slug\] page. CTA: "See how I'd fix this" → contact or relevant problem page. Secondary CTA: "Run the quiz again." | \`result: ToolResult\` | /tools/\[slug\] |  
| \`EmailGate\` | \`EmailGate.tsx\` | Email capture modal or inline block. Simple: name \+ email fields. On submit: POSTs to /api/subscribe (Loops integration). Position prop controls whether it shows before or after results. On success: proceeds to show results or sends confirmation. | \`onSubmit: (email: string, name: string) \=\> Promise\<void\>\` \`position: 'before\_results' \\| 'after\_results'\` \`toolName: string\` | /tools/\[slug\] (inside QuizEngine) |

\---

\#\# PROCESS COMPONENTS  
\#\#\# /src/components/process/

| Component | File | Description | Key Props | Pages Used |  
|---|---|---|---|---|  
| \`ProcessStep\` | \`ProcessStep.tsx\` | Single numbered step. Large step number in JetBrains Mono muted orange (01, 02…). Step title in Syne Bold. Description in Inter 16px off-white. Separated from adjacent steps by thin horizontal rule. | \`step: ProcessStep\` | /process |  
| \`ProcessTimeline\` | \`ProcessTimeline.tsx\` | Vertical sequence container for ProcessSteps. Renders all 6 steps in order with connecting vertical line on the left (muted orange, 1px). Animates each step in on scroll via AnimateOnScroll. | \`steps: ProcessStep\[\]\` | /process |  
| \`PrincipleCard\` | \`PrincipleCard.tsx\` | Single principle in the 2×2 grid. Optional single-color SVG icon at top. Principle title in Syne SemiBold. 2-sentence description in Inter. Clean dark card surface, no heavy borders. | \`title: string\` \`description: string\` \`icon?: string\` | /process |  
| \`PrinciplesGrid\` | \`PrinciplesGrid.tsx\` | 2×2 grid container for 4 PrincipleCards. Desktop: 2-column equal width. Mobile: stacked single column. Section eyebrow \+ H2 intro above the grid. | \`principles: { title: string; description: string; icon?: string }\[\]\` | /process |  
| \`EngagementFormatCard\` | \`EngagementFormatCard.tsx\` | Card for each of the 3 engagement formats (Fractional, Project, Diagnostic). Format name in Syne SemiBold. One-liner in Inter muted. "Right for:" section. Bulleted "What's included" list. Optional proof reference line at bottom (client name \+ result). | \`format: EngagementFormatDetail\` | /process |  
| \`EngagementFormatsRow\` | \`EngagementFormatsRow.tsx\` | 3-column layout container for the 3 EngagementFormatCards. Desktop: 3-column. Mobile: stacked. Section eyebrow \+ H2 intro above. | \`formats: EngagementFormatDetail\[\]\` | /process |  
| \`WhatIDontDoList\` | \`WhatIDontDoList.tsx\` | "What I don't do" section on /process. 4 items in a clean 2×2 or single-column list. Each item: bold crossed-out-style item title \+ short explanation. Honest positioning element. | \`items: string\[\]\` | /process |  
| \`WhatGoodLooksLike\` | \`WhatGoodLooksLike.tsx\` | "What good looks like" section on /process. 3 short statements of what a successful engagement produces. Each rendered as a check-prefixed statement in Inter. | \`items: string\[\]\` | /process |

\---

\#\# ABOUT COMPONENTS  
\#\#\# /src/components/about/

| Component | File | Description | Key Props | Pages Used |  
|---|---|---|---|---|  
| \`FounderHero\` | \`FounderHero.tsx\` | Asymmetric hero for /about. 60/40 split on desktop. Left: eyebrow \+ H1 \+ opening body paragraph \+ optional CTA. Right: professional portrait photo from Cloudinary, no decorative border or framing — photo bleeds to edge. Mobile: photo stacks above text. | \`eyebrow: string\` \`headline: string\` \`body: string\` \`imageId: string\` \`cta?: NavItem\` | /about |  
| \`CredentialsBar\` | \`CredentialsBar.tsx\` | Horizontal strip of 4 stat/credential items directly below the founder hero. Each: value in JetBrains Mono (Proof Green or off-white), label in Inter small muted below. Separated by thin vertical dividers. Full-width dark band background. | \`credentials: { value: string; label: string }\[\]\` | /about |  
| \`CareerTimeline\` | \`CareerTimeline.tsx\` | Full vertical timeline of 8 career entries. Section eyebrow \+ H2 intro. Each entry rendered as a TimelineEntry component. Left: year range in JetBrains Mono. Center: thin connecting vertical line. Right: role, company, location, impact narrative. | \`entries: TimelineEntry\[\]\` \`headline: string\` \`intro: string\` | /about |  
| \`TimelineEntry\` | \`TimelineEntry.tsx\` | Single career timeline entry. Year range in JetBrains Mono muted. Role in Syne SemiBold. Company \+ Location in Inter small muted. Impact narrative in Inter 16px off-white (2–3 sentences). Animated in on scroll. | \`entry: TimelineEntry\` | /about (used inside CareerTimeline) |  
| \`DifferentiatorGrid\` | \`DifferentiatorGrid.tsx\` | "How I'm Different" 3-column section. Each column: a short differentiating statement as headline \+ 2-3 sentence explanation. Desktop: 3-column. Mobile: stacked. Section eyebrow \+ H2 intro above. | \`differentiators: { headline: string; explanation: string }\[\]\` | /about |  
| \`IndustriesBar\` | \`IndustriesBar.tsx\` | Industries served display. Horizontal wrapping list of industry pills. Each pill: industry name in Inter small caps, dark surface with muted border. Not clickable — purely informational. | \`industries: string\[\]\` | /about |

\---

\#\# CONTACT COMPONENTS  
\#\#\# /src/components/contact/

| Component | File | Description | Key Props | Pages Used |  
|---|---|---|---|---|  
| \`IntentSelector\` | \`IntentSelector.tsx\` | 4-card intent selection row above the contact form. Each card: label \+ clarifier sentence. Clicking a card selects it (orange border highlight) and pre-fills the context field in the ContactForm below. Desktop: 4-column row. Mobile: 2×2 grid. | \`intents: { label: string; clarifier: string; prefill: string }\[\]\` \`onSelect: (prefill: string) \=\> void\` \`selectedIntent?: string\` | /contact |  
| \`ContactForm\` | \`ContactForm.tsx\` | Main contact form. Powered by Formbricks via embedded SDK or iframe. Fields: Name, Company, Email, Context (pre-filled from IntentSelector, editable), Message. Submit button: orange, "Send it →". On success: shows WhatHappensNext inline. | \`prefillContext?: string\` \`onSuccess?: () \=\> void\` | /contact |  
| \`WhatHappensNext\` | \`WhatHappensNext.tsx\` | Post-submission or inline "3 things that happen next" reassurance sequence. Simple numbered list: 1\) I read your message personally, 2\) I respond same day, 3\) We book a call if it's a fit. Muted, low-design. Appears below the form. | \`steps: string\[\]\` | /contact |  
| \`AlternativePaths\` | \`AlternativePaths.tsx\` | 3 alternative CTAs for visitors not ready to contact. Each path: title in Syne SemiBold, 1-sentence description in Inter, single text link CTA. Displayed below the form in a horizontal 3-column row. Desktop: 3-column. Mobile: stacked. | \`alternatives: { title: string; body: string; cta: NavItem }\[\]\` | /contact |  
| \`DirectContactBlock\` | \`DirectContactBlock.tsx\` | Simple direct contact info block below the alternatives. Email address (mailto link), location, response window statement. Optional Cal.com link for direct booking. Low-design, just useful information cleanly laid out. | \`email: string\` \`location: string\` \`responseWindow: string\` \`calComLink?: string\` | /contact |

\---

\#\# NAVIGATION / SHARED COMPONENTS  
\#\#\# /src/components/ui/

| Component | File | Description | Key Props | Pages Used |  
|---|---|---|---|---|  
| \`Button\` | \`Button.tsx\` | Primary CTA button. Built on Shadcn/UI Button primitive. Three variants: 'primary' (orange fill \#F05A28, dark text), 'secondary' (transparent, orange border \+ orange text), 'ghost' (no border, orange text only). Three sizes: sm, md, lg. Renders as \`\<a\>\` when href is provided, \`\<button\>\` when onClick is provided. | \`label: string\` \`href?: string\` \`onClick?: () \=\> void\` \`variant?: 'primary' \\| 'secondary' \\| 'ghost'\` \`size?: 'sm' \\| 'md' \\| 'lg'\` \`className?: string\` | All pages |  
| \`Badge\` | \`Badge.tsx\` | Small pill badge. Three variants: 'outcome' (Proof Green text \+ dark green tint background), 'problem' (orange text \+ dark orange tint), 'stage' (muted off-white). Used for outcome tags on ProofCards, problem cluster labels, and trust ladder labels. | \`label: string\` \`variant?: 'outcome' \\| 'problem' \\| 'stage' \\| 'default'\` | ProofCard, ToolCard, ProblemCard |  
| \`Eyebrow\` | \`Eyebrow.tsx\` | Small caps section label above H2 or H1 headlines. Spaced letter-tracking (tracking-widest). Default color: Operator Orange (\#F05A28). Muted variant: off-white at 50% opacity. Font: Inter, 12px. | \`text: string\` \`color?: 'orange' \\| 'muted'\` \`className?: string\` | All section headers throughout site |  
| \`Divider\` | \`Divider.tsx\` | Horizontal rule between content blocks. 1px, muted off-white at 15% opacity. Full width by default, optional max-width constraint. | \`className?: string\` \`maxWidth?: string\` | All pages |  
| \`SectionHeader\` | \`SectionHeader.tsx\` | Standardized section intro block used at the top of most page sections. Renders: Eyebrow → H2 (Syne Bold, 40px) → optional subhead (Inter 18px muted). Left-aligned by default, optional center alignment. | \`eyebrow?: string\` \`headline: string\` \`subhead?: string\` \`align?: 'left' \\| 'center'\` | All pages — used inside every major section |  
| \`MonoMetric\` | \`MonoMetric.tsx\` | Single metric display in JetBrains Mono, Proof Green (\#22C55E). Four size variants: sm (24px, card context), md (36px, strip context), lg (48px, hero context), xl (64px, ProofBar). Optional label in Inter small muted below the value. | \`value: string\` \`label?: string\` \`size?: 'sm' \\| 'md' \\| 'lg' \\| 'xl'\` \`className?: string\` | ProofBar, ProofCard, HomepageHero, ProofStrip |  
| \`NavLink\` | \`NavLink.tsx\` | Internal navigation link. Uses Next.js \`\<Link\>\`. Active state: orange color. Default state: off-white. Hover: orange transition (150ms). Font: Inter 14px. | \`href: string\` \`label: string\` \`isActive?: boolean\` \`className?: string\` | SiteHeader, SiteFooter, MobileNav |  
| \`AnimateOnScroll\` | \`AnimateOnScroll.tsx\` | Framer Motion wrapper component. Children fade in (opacity 0→1) and slide in (translateY or translateX) when they enter the viewport. Default: fade up. Configurable delay for staggered children. Uses \`useInView\` hook from Framer Motion. | \`children: ReactNode\` \`delay?: number\` \`duration?: number\` \`direction?: 'up' \\| 'down' \\| 'left' \\| 'right'\` \`className?: string\` | All pages — wraps most section content |  
| \`CalEmbed\` | \`CalEmbed.tsx\` | Cal.com booking embed. Lazy-loaded via dynamic import to avoid blocking page. Two variants: 'inline' (renders full calendar embed in page) and 'button' (renders a styled button that opens Cal.com popup on click). Uses \`@calcom/embed-react\`. | \`calLink: string\` \`variant?: 'inline' \\| 'button'\` \`buttonLabel?: string\` \`className?: string\` | /contact, /process (optional), /proof (CTA) |  
| \`CloudinaryImage\` | \`CloudinaryImage.tsx\` | Optimized image component using Cloudinary CDN. Accepts Cloudinary \`publicId\`. Auto-generates \`srcSet\` with multiple widths. Applies \`f\_auto,q\_auto\` transformations. Built on top of Next.js \`\<Image\>\` with Cloudinary loader. | \`publicId: string\` \`alt: string\` \`width: number\` \`height: number\` \`priority?: boolean\` \`className?: string\` | /about (portrait), /proof (case study images), /studio |  
| \`LoadingSpinner\` | \`LoadingSpinner.tsx\` | Minimal loading state indicator. Small orange circle spinner. Used during async operations (quiz result calculation, email gate submission, form submission). | \`size?: 'sm' \\| 'md'\` \`className?: string\` | Tool pages, Contact form |  
| \`Toast\` | \`Toast.tsx\` | Lightweight toast notification. Built on Shadcn/UI Toast. Used for form submission success/error states. Success: Proof Green accent. Error: muted red. Auto-dismisses after 4 seconds. | \`message: string\` \`type: 'success' \\| 'error'\` \`onDismiss: () \=\> void\` | /contact, /tools/\[slug\] |  
| \`SkipToContent\` | \`SkipToContent.tsx\` | Accessibility-only skip navigation link. Visually hidden until focused. Links to \`\#main-content\`. Required for screen reader and keyboard navigation compliance. | — | All pages (in SiteHeader) |

\---

\#\# PAGE-LEVEL COMPONENT COMPOSITION  
\#\#\# How components assemble into pages

\*\*Homepage (\`/\`)\*\*  
\`\`\`  
SiteHeader  
HomepageHero  
ProofBar  
ProblemHubGrid (4 problem cards, "Problems we fix")  
ToolsPreviewBand (2-3 featured tools)  
ProofStrip  
BandSection → \[Founder positioning "Just You" statement\]  
ProofCard (1 featured case study)  
BandSection → \[Closing CTA: Book diagnostic call\]  
SiteFooter  
\`\`\`

\*\*Problems Hub (\`/problems\`)\*\*  
\`\`\`  
SiteHeader  
PageHero  
ProblemHubGrid (all 6\)  
BandSection → \[Tool CTA: "Not sure which applies to you?"\]  
SiteFooter  
\`\`\`

\*\*Problem Slug (\`/problems/\[slug\]\`)\*\*  
\`\`\`  
SiteHeader  
PageHero  
SymptomList  
BandSection → \[Cause \+ Solution copy block\]  
ProofGrid (2 related ProofCards, no filter)  
DiagnosticCTA  
ProblemNav (lateral navigation)  
SiteFooter  
\`\`\`

\*\*Proof Hub (\`/proof\`)\*\*  
\`\`\`  
SiteHeader  
PageHero  
ProofBar  
FilterBar \+ ProofGrid  
BandSection → \[AntiClaimRow "What I don't claim"\]  
BandSection → \["What you're actually looking at" copy block\]  
BandSection → \[Closing CTA\]  
SiteFooter  
\`\`\`

\*\*Process (\`/process\`)\*\*  
\`\`\`  
SiteHeader  
PageHero  
PrinciplesGrid  
ProcessTimeline (Steps 01–06)  
EngagementFormatsRow  
WhatIDontDoList  
WhatGoodLooksLike  
BandSection → \[Tools reminder copy\]  
BandSection → \[Closing CTA\]  
SiteFooter  
\`\`\`

\*\*About (\`/about\`)\*\*  
\`\`\`  
SiteHeader  
FounderHero  
CredentialsBar  
CareerTimeline  
DifferentiatorGrid  
IndustriesBar  
BandSection → \[Closing CTA\]  
SiteFooter  
\`\`\`

\*\*Contact (\`/contact\`)\*\*  
\`\`\`  
SiteHeader  
PageHero (minimal)  
IntentSelector  
ContactForm  
WhatHappensNext  
AlternativePaths  
DirectContactBlock  
SiteFooter  
\`\`\`

\*\*Tools Hub (\`/tools\`)\*\*  
\`\`\`  
SiteHeader  
PageHero  
ToolGrid  
SiteFooter  
\`\`\`

\*\*Tool Page (\`/tools/\[slug\]\`)\*\*  
\`\`\`  
SiteHeader  
PageHero (tool-specific)  
QuizEngine → \[QuizProgress \+ QuizQuestion × N → EmailGate? → ResultCard\]  
BandSection → \[Related problem link\]  
SiteFooter  
\`\`\`

\---

\#\# COMPONENT COUNT SUMMARY

| Category | Component Count |  
|---|---|  
| Layout | 6 |  
| Hero | 2 |  
| Proof / Metrics | 7 |  
| Problem / Diagnostic | 5 |  
| Tool / Interactive | 7 |  
| Process | 8 |  
| About | 6 |  
| Contact | 5 |  
| Shared / UI | 14 |  
| \*\*Total\*\* | \*\*60\*\* |

\---

\#\# NOTES FOR AI AGENTS (CLAUDE CODE / CURSOR)

\- Every component is a single-responsibility TSX file  
\- No component imports from another component's folder (no cross-folder coupling except /ui/)  
\- All /ui/ components are globally available without path aliasing  
\- Shadcn/UI components should be installed via \`npx shadcn@latest add \[component\]\` before use  
\- Framer Motion is always imported as: \`import { motion } from 'framer-motion'\`  
\- AnimateOnScroll should be the default wrapper for any content that appears below the fold  
\- CloudinaryImage replaces all native \`\<img\>\` tags and Next.js \`\<Image\>\` direct usage  
\- Never use inline styles — all styling is via Tailwind utility classes only  
\- All color values must reference the design token constants, not raw hex values  
  \- Near-black background: \`bg-\[\#0C0C0E\]\`  
  \- Orange accent: \`text-\[\#F05A28\]\` or \`bg-\[\#F05A28\]\`  
  \- Off-white: \`text-\[\#F5F4F0\]\`  
  \- Teal: \`text-\[\#0FD9C8\]\`  
  \- Proof Green: \`text-\[\#22C55E\]\`  

import type { ProcessData } from "@/types";

export const processData: ProcessData = {
  principles: [
    {
      title: "Diagnosis before prescription.",
      description:
        "I do not recommend solutions until the actual problem is named. Symptoms and root causes are rarely the same thing.",
    },
    {
      title: "Systems over campaigns.",
      description:
        "Campaigns expire. Systems compound. The work is designed to keep producing after launch.",
    },
    {
      title: "One accountable person.",
      description:
        "There is no delivery hand-off. The person making the decisions is the person doing the work.",
    },
    {
      title: "Honest over comfortable.",
      description:
        "If the requested work will not solve the real bottleneck, I will say that before anything gets scoped.",
    },
  ],
  steps: [
    {
      number: "01",
      title: "You start the conversation.",
      description:
        "A message through the contact form is enough. I read every message myself and respond within one business day, usually faster.",
    },
    {
      number: "02",
      title: "We do a diagnostic session.",
      description:
        "No pitch. No deck. Just a structured conversation to identify the actual bottleneck and whether there is a fit.",
    },
    {
      number: "03",
      title: "I send a scoped proposal.",
      description:
        "The scope is based on the diagnosis, not a generic menu of services. Timeline, outcomes, and price are tied to the actual work.",
    },
    {
      number: "04",
      title: "We start with the foundation.",
      description:
        "Every engagement starts with a structured baseline: what's working, what isn't, where the data actually points, and what the highest-leverage move is given the time and budget available. Skipping it is how you end up building the wrong thing quickly.",
    },
    {
      number: "05",
      title: "I build it. You stay involved.",
      description:
        "You're never handed a deliverable and left alone with it. I work in tight loops — sharing progress, explaining decisions, and adjusting based on what we learn as we go.",
    },
    {
      number: "06",
      title: "We measure it, not just launch it.",
      description:
        "We define success metrics before the build starts, instrument reporting during the build, and evaluate performance together after launch. If something isn't producing, we fix it — not because the contract says so, but because the outcome is the point.",
    },
  ],
  engagementFormats: [
    {
      format: "fractional",
      name: "Fractional Engagement",
      oneLiner: "Ongoing strategic ownership of your full marketing function.",
      rightFor:
        "Companies that need a senior marketing lead but aren't ready to hire a full-time CMO or VP. You need someone who holds the whole system, not just executes a task list.",
      included: [
        "Weekly strategic check-ins and priority setting",
        "Full oversight of marketing operations, systems, and team direction",
        "CRM and automation monitoring and optimization",
        "Reporting and attribution review",
        "Direct availability for decision support and approvals",
      ],
      proofReference: "graston-qualified-leads",
    },
    {
      format: "project",
      name: "Project Engagement",
      oneLiner: "A defined scope, a clear deliverable, a fixed timeline.",
      rightFor:
        "Companies with a specific problem to solve — a site rebuild, a CRM migration, an automation buildout, a positioning overhaul. The scope is clear, the outcome is defined, and the engagement has an end date.",
      included: [
        "Diagnostic and scoping session",
        "Structured build or strategy deliverable",
        "Implementation or execution (not just recommendations)",
        "Handoff documentation and training",
        "30-day post-launch support window",
      ],
      proofReference: "graston-growth-engine",
    },
    {
      format: "diagnostic",
      name: "Advisory Session",
      oneLiner: "A single structured session to diagnose the problem and map the path forward.",
      rightFor:
        "Companies that aren't ready to commit to a full engagement but want expert eyes on their current situation. You leave with a specific diagnosis, a prioritized action plan, and the clarity to make the right next move — with or without me.",
      included: [
        "90-minute structured diagnostic session",
        "Pre-session data and materials review",
        "Written summary with diagnosis, prioritized recommendations, and implementation notes",
        "Optional follow-up call within 30 days",
      ],
    },
  ],
  whatIDontDo: [
    {
      title: "I don't take on every client.",
      body: "I keep my roster intentionally small so every client gets the full version of the work. If I'm at capacity or if it's not the right fit, I'll say so directly.",
    },
    {
      title: "I don't build spec work or free strategies.",
      body: "The diagnostic session is structured and valuable — it's not a free consultation that turns into an unpaid strategy session. If you're not ready to engage, the free tools on this site will give you real direction.",
    },
    {
      title: "I don't guarantee specific outcomes before I've diagnosed the problem.",
      body: "Any consultant who quotes you a result before understanding your situation is selling you a number, not a plan. I give you honest projections based on what I actually find.",
    },
    {
      title: "I don't do campaigns without systems.",
      body: "If you need a single email campaign or a one-off social media push, I'm probably not the right fit. The work I do builds infrastructure — things that run and compound over time.",
    },
  ],
  whatGoodLooksLike: [
    {
      title: "You're a founder or executive who needs marketing to be someone else's problem.",
      body: "You're running the business. You know marketing needs to be better. You don't have the bandwidth to own it yourself and you don't want to hire a full-time person yet. You need someone who will take the wheel, make good decisions, and tell you clearly what's working and why. What good looks like: A fractional engagement where you check in weekly, you get clear reporting, and the marketing system actually runs without you in it.",
    },
    {
      title: "You have a specific problem that needs to be fixed.",
      body: "The CRM is a mess. The website doesn't convert. Attribution is a black box. You know what the problem is — you just need someone senior enough to scope it correctly and capable enough to actually build the fix. What good looks like: A project engagement with a clear deliverable, a realistic timeline, and no hand-offs to junior people once the contract is signed.",
    },
    {
      title: "You operate in a regulated or high-trust industry.",
      body: "Healthcare, legal, finance — you're not just trying to generate leads. You're trying to maintain trust and credibility in an environment where one wrong claim creates real problems. What good looks like: Execution that respects compliance culture — clear drafts, traceable claims, and patient collaboration with legal or clinical voices when required.",
    },
  ],
};

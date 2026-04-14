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
        "Every engagement begins by establishing the baseline, the high-leverage move, and the measurement plan before build execution starts.",
    },
    {
      number: "05",
      title: "I build it. You stay involved.",
      description:
        "The build process runs in tight loops with visibility, rationale, and adjustment as we learn more about the real constraints.",
    },
    {
      number: "06",
      title: "We measure it, not just launch it.",
      description:
        "Success metrics are defined up front and reviewed after launch so the system can be improved instead of merely delivered.",
    },
  ],
  engagementFormats: [
    {
      format: "fractional",
      name: "Fractional Engagement",
      oneLiner: "Ongoing strategic ownership of the full marketing function.",
      rightFor:
        "Companies that need a senior marketing lead but are not ready to hire full-time.",
      included: [
        "Weekly strategic check-ins and priority setting",
        "Oversight of marketing systems and team direction",
        "Reporting and attribution review",
        "Direct decision support",
      ],
      proofReference: "graston-growth-engine",
    },
    {
      format: "project",
      name: "Project Engagement",
      oneLiner: "A defined scope, clear deliverable, and fixed timeline.",
      rightFor:
        "Companies with a specific problem to solve such as a site rebuild, CRM migration, or automation buildout.",
      included: [
        "Diagnostic and scoped plan",
        "Implementation, not just recommendations",
        "Handoff documentation",
        "30-day post-launch support window",
      ],
      proofReference: "pike-medical",
    },
    {
      format: "diagnostic",
      name: "Advisory Session",
      oneLiner: "A structured session to diagnose the problem and map the path forward.",
      rightFor:
        "Companies that need clarity before deciding whether a broader engagement is necessary.",
      included: [
        "90-minute diagnostic session",
        "Pre-session materials review",
        "Written summary with prioritized recommendations",
        "Optional follow-up within 30 days",
      ],
    },
  ],
  whatIDontDo: [
    "I do not take on every client.",
    "I do not build free strategy disguised as discovery.",
    "I do not promise outcomes before diagnosis.",
    "I do not do campaigns without systems.",
  ],
  whatGoodLooksLike: [
    "You need marketing to become someone else's problem.",
    "You have a specific system issue that needs a senior build partner.",
    "You operate in a high-trust environment where credibility matters as much as growth.",
  ],
};

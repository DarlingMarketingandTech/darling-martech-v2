import type { PageMeta } from "@/types";
import { siteConfig } from "@/data/site-config";

export const contactMeta: PageMeta = {
  title: "Contact",
  description:
    "Tell Jacob what is going on. Every message is read personally, with a same-day response during business hours.",
  canonicalUrl: "https://darlingmartech.com/contact",
};

export const contactPageData = {
  hero: {
    eyebrow: "START A CONVERSATION",
    headline: "Tell me what's going on. I'll read it personally and respond the same day.",
    body: [
      "No intake form with 14 required fields. No automated calendar bot. You send a message, I read it, and I write back.",
      "If you're not sure how to start, pick the option below that's closest to where you are.",
    ],
    ctas: [
      { label: "Book a 30-min diagnostic call →", href: siteConfig.calComLink, variant: "primary" as const },
      { label: "Send a message below →", href: "#contact-form", variant: "ghost" as const },
    ],
  },
  intents: [
    {
      label: "I know my problem and I'm ready to talk scope.",
      clarifier: "You want to understand what working together looks like and what it costs.",
      prefill: "I have a specific problem I'm ready to address and I'd like to understand scope and pricing.",
    },
    {
      label: "I have a problem but I'm not sure what the fix is yet.",
      clarifier: "Something is not working, but the source is still unclear.",
      prefill: "I know something isn't working with my marketing but I'm not sure where to start.",
    },
    {
      label: "I want a second opinion on something specific.",
      clarifier: "You have a vendor quote, plan, or strategy in progress and want a senior read first.",
      prefill: "I have a specific decision or plan in progress and would like an expert opinion before moving forward.",
    },
    {
      label: "I'm not sure yet — I just want to see if this is a fit.",
      clarifier:
        "You're early stage. Nothing's on fire. You want to understand what this kind of engagement even looks like before deciding.",
      prefill: "I'm exploring whether this is the right fit for my situation and would like to have an initial conversation.",
    },
  ],
  formSectionLabel: "Tell me a bit about what's going on.",
  budgetOptions: [
    { value: "", label: "I'm not sure yet" },
    { value: "under-2k", label: "Under $2,000/month" },
    { value: "2k-5k", label: "$2,000 – $5,000/month" },
    { value: "5k-10k", label: "$5,000 – $10,000/month" },
    { value: "10k-plus", label: "$10,000+/month" },
  ],
  budgetIntentLabel: "I know my problem and I'm ready to talk scope.",
  whatHappensNext: {
    eyebrow: "After you send this",
    steps: [
      {
        number: "01",
        body: "I read it myself — not an assistant, not a bot, not an email routing rule. I read every message.",
      },
      {
        number: "02",
        body: "If the situation is clear, I reply with specific questions or a direct response. If I need more context, I'll ask.",
      },
      {
        number: "03",
        body: "If it sounds like a fit, I'll suggest a 30-minute diagnostic call — no prep required, no agenda to follow. Just a conversation.",
      },
    ],
  },
  alternatives: [
    {
      title: "Run a free diagnostic first",
      description:
        "Take the Growth Bottleneck Quiz. Get a specific result in a few minutes, no email required.",
      href: "/tools/growth-bottleneck-quiz",
      ctaLabel: "Take the quiz →",
    },
    {
      title: "Read the case studies",
      description: "See what the work looks like and what it produces before you decide.",
      href: "/proof",
      ctaLabel: "See the proof →",
    },
    {
      title: "Read about the process",
      description: "Understand how engagements work before you reach out.",
      href: "/process",
      ctaLabel: "See how I work →",
    },
  ],
  reassurance:
    "There's no commitment attached to sending a message. If it's not a fit, I'll say so — and point you toward something that might be.",
};

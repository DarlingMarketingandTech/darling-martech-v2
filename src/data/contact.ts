import type { PageMeta } from "@/types";

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
      label: "I'm not sure yet. I just want to see if this is a fit.",
      clarifier: "You're still early and want to understand what this kind of engagement looks like.",
      prefill: "I'm exploring whether this is the right fit for my situation and would like to have an initial conversation.",
    },
  ],
};

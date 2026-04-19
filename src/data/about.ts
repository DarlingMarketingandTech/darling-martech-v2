import type { PageMeta } from "@/types";
import { siteConfig } from "@/data/site-config";

export const aboutMeta: PageMeta = {
  title: "About Jacob Darling",
  description:
    "Fifteen years of marketing strategy, systems, and execution across healthcare, legal, finance, SaaS, and local service businesses.",
  canonicalUrl: "https://darlingmartech.com/about",
};

export const aboutPageData = {
  hero: {
    eyebrow: "JACOB DARLING · FOUNDER, DARLING MARTECH",
    headline: "I've been on both sides of this problem for 15 years.",
    body: [
      "I've sat inside marketing teams as a director. I've worked outside as a consultant. I've built systems that ran healthcare platforms, law firm brands, financial advisory pipelines, and SaaS training engines. I know what good looks like. I've built it in a lot of different environments.",
      "I started Darling MarTech in 2026 because small businesses deserve access to the same quality of strategic thinking and technical execution that used to require a 15-person agency team. They don't need 15 people. They need one person who can hold the whole system, make the right calls, and actually do the work.",
      "That's the company. That's the offer. You work with me, directly, on every part of the engagement.",
    ],
    imageId: "studio/jacob-portrait",
  },
  credentials: [
    { value: "15+ years", label: "Marketing strategy & technical execution" },
    { value: "7 industries", label: "Healthcare · Legal · Finance · SaaS · Retail · Nonprofit · Local Service" },
    { value: "B.S. Business Management", label: "Indiana University, 2008" },
    { value: "Indianapolis, IN", label: "Serving clients nationally" },
  ],
  timelineIntro: {
    eyebrow: "15 YEARS OF CONTEXT",
    headline: "Every engagement builds on the last.",
    body: "The range isn't accidental. I've worked inside high-stakes environments — regulated industries, complex multi-division orgs, rapid-growth startups — because that's where you learn what a marketing system actually has to withstand.",
  },
  timeline: [
    {
      range: "2026 – Present",
      role: "Founder — Darling MarTech",
      location: "Indianapolis, IN",
      description:
        "Darling MarTech closes the gap between marketing strategy and technical reality for growth-stage companies. Owner-operated by design. Every client engagement is handled directly, personally, and accountably.",
    },
    {
      range: "2023 – 2025",
      role: "Marketing Director — Graston Technique LLC",
      location: "Indianapolis, IN",
      description:
        "Built the full MarTech ecosystem for a clinician education platform serving thousands of providers nationally. Replaced eight manual processes with automated systems. Rebuilt lead generation and training pipeline. Result: +212% qualified leads.",
    },
    {
      range: "Mar – Jul 2023",
      role: "Interim Director of Marketing — Ultimate Technologies Group",
      location: "Fishers, IN",
      description:
        "Interim marketing lead during a transitional period. Led strategy and execution across channels, maintained continuity, and stabilized the marketing function through organizational change.",
    },
    {
      range: "2022 – 2023",
      role: "Marketing Manager — Riley Bennett Egloff LLP",
      location: "Indianapolis, IN",
      description:
        "Strategic marketing, digital communications, and client development for a leading Indianapolis law firm. Brand consistency across practice areas and digital presence.",
    },
    {
      range: "2015 – 2022",
      role: "Marketing Administrator — Riley Bennett Egloff LLP",
      location: "Indianapolis, IN",
      description:
        "Seven years building foundational infrastructure: content, web, social, design, and firm-to-client communications — systems that run without constant maintenance.",
    },
    {
      range: "2013 – 2015",
      role: "Marketing Coordinator — Deerfield Financial Advisors",
      location: "Indianapolis, IN",
      description:
        "Marketing programs in a regulated environment where credibility, precision, and trust are non-negotiable.",
    },
    {
      range: "2009 – 2013",
      role: "Marketing Coordinator — Pike Medical Consultants",
      location: "Indianapolis, IN",
      description:
        "First senior marketing responsibility: strategy, budgeting, advertising, branding, PR, website, and events. This engagement is still visible in the results: +45% patient growth over the period.",
    },
    {
      range: "2006 – 2007",
      role: "Marketing Intern — OrthoIndy",
      location: "Indianapolis, IN",
      description: "Healthcare marketing foundations: content development and event coordination.",
    },
  ],
  differentiators: {
    eyebrow: "WHAT MAKES THIS DIFFERENT",
    items: [
      {
        title: "I don't hand off.",
        body: "The strategy I write is the strategy I execute. You never hear \"that's the developer's problem\" or \"the consultant will follow up on that.\" I own the outcome end-to-end.",
      },
      {
        title: "I build the system, not the deck.",
        body: "Every engagement produces something that keeps working after the engagement closes — a CRM that runs, a site that converts, a pipeline that generates. Not a 40-page strategy PDF.",
      },
      {
        title: "I tell you what I actually think.",
        body: "If what you're asking for isn't the right fix for your actual problem, I'll say so before we start. I'd rather lose an engagement than take your money for work that won't move the number.",
      },
    ],
  },
  industries: [
    "Healthcare",
    "Legal",
    "Finance",
    "SaaS / Tech",
    "Local Service",
    "Retail / E-Commerce",
    "Nonprofit",
    "B2B",
    "B2C",
    "Media / Entertainment",
  ],
  closing: {
    headline: "I keep my client list intentionally small. Here's how to get on it.",
    body: [
      "I take on a limited number of active engagements at any one time. That's what makes the work good — every client gets the full version, not the scaled-down version.",
      "If what you've read here matches the problem you're trying to solve, the next step is a direct conversation.",
    ],
    primaryCta: { label: "Start a conversation →", href: siteConfig.calComLink },
    secondaryCta: { label: "See the work first →", href: "/proof" },
  },
};

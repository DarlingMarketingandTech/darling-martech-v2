import type { PageMeta } from "@/types";

export const aboutMeta: PageMeta = {
  title: "About Jacob Darling",
  description:
    "Fifteen years of marketing strategy, systems, and execution across healthcare, legal, finance, SaaS, and local service businesses.",
  canonicalUrl: "https://darlingmartech.com/about",
};

export type CareerTimelineEntry = {
  years: string;
  role: string;
  company: string;
  location: string;
  body: string;
};

export type DifferentiatorItem = {
  statement: string;
  explanation: string;
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
    imageId: "c_fill,g_auto,w_900,h_1200/e_sharpen/studio/graphic-design/bio-featured-2",
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
  careerTimeline: [
    {
      years: "2026–Present",
      role: "Founder",
      company: "Darling MarTech",
      location: "Indianapolis, IN",
      body: "Built Darling MarTech to close the gap between marketing strategy and technical reality for growth-stage companies. Owner-operated by design. Every client engagement is handled directly, personally, and accountably.",
    },
    {
      years: "2023–2025",
      role: "Marketing Director",
      company: "Graston Technique LLC",
      location: "Indianapolis, IN",
      body: "Built the full MarTech ecosystem for a clinician education platform serving thousands of providers nationally. Replaced eight manual processes with automated systems. Result: +212% qualified leads.",
    },
    {
      years: "Mar–Jul 2023",
      role: "Interim Director of Marketing",
      company: "Ultimate Technologies Group",
      location: "Fishers, IN",
      body: "Stepped in as interim marketing lead during a key transitional period. Maintained business continuity and stabilized the marketing function through organizational change.",
    },
    {
      years: "2022–2023",
      role: "Marketing Manager",
      company: "Riley Bennett Egloff LLP",
      location: "Indianapolis, IN",
      body: "Led strategic marketing and client development for one of Indianapolis's leading law firms. Built brand consistency across practice areas and developed the firm's digital presence.",
    },
    {
      years: "2015–2022",
      role: "Marketing Administrator",
      company: "Riley Bennett Egloff LLP",
      location: "Indianapolis, IN",
      body: "Seven years building foundational marketing infrastructure: content systems, web presence, social media, graphic design, and firm-to-client communications.",
    },
    {
      years: "2013–2015",
      role: "Marketing Coordinator",
      company: "Deerfield Financial Advisors",
      location: "Indianapolis, IN",
      body: "Built and executed marketing programs for a financial advisory firm in a regulated environment where credibility, precision, and trust are non-negotiable.",
    },
    {
      years: "2009–2013",
      role: "Marketing Coordinator",
      company: "Pike Medical Consultants",
      location: "Indianapolis, IN",
      body: "Directed all marketing: strategy, budgeting, advertising, branding, PR, website, and events. Result: +45% patient growth over the engagement period.",
    },
  ] satisfies CareerTimelineEntry[],
  differentiators: {
    eyebrow: "WHAT MAKES THIS DIFFERENT",
    title: "How this is different",
    items: [
      {
        statement: "I don't hand off.",
        explanation: "The strategy I write is the strategy I execute.",
      },
      {
        statement: "I build the system, not the deck.",
        explanation: "Every engagement produces something that keeps working.",
      },
      {
        statement: "I tell you what I actually think.",
        explanation: "If what you're asking for isn't the right fix, I'll say so.",
      },
    ] satisfies DifferentiatorItem[],
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
  ],
  closing: {
    headline: "I keep my client list intentionally small.",
    body: [
      "I take on a limited number of active engagements at any one time. That's what makes the work good — every client gets the full version, not the scaled-down version.",
      "If what you've read here matches the problem you're trying to solve, the next step is a direct conversation.",
    ],
    primaryCta: { label: "Start a conversation", href: "/contact" },
    secondaryCta: { label: "See the work first", href: "/proof" },
  },
};

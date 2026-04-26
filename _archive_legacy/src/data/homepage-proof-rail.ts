/**
 * Homepage proof rail: proof-first, system-change-first copy.
 * Aligns with the repo proof strategy — stakes, pre-state,
 * intervention, outcomes with context, principle, single next step (handled in UI).
 * Client names stay on full `/proof/[slug]` pages only.
 */

export type HomepageProofRailSlide = {
  slug: string;
  /** Stakes — why this mattered operationally (no client naming). */
  stakes: string;
  /** Pre-state — symptoms + operational reality. */
  preState: string;
  /** Intervention — system changes shipped (compressed). */
  intervention: string;
  /** Outcomes — headline metric line with context (no vanity). */
  outcome: string;
  /** Supporting outcome detail. */
  outcomeContext: string;
  /** Why it worked — one principle line. */
  principle: string;
  /**
   * Decorative hero wash — regenerated storytelling assets only (no client/studio art on homepage rail).
   */
  backgroundPublicId: string;
};

export const HOMEPAGE_PROOF_RAIL_SLIDES: HomepageProofRailSlide[] = [
  {
    slug: "graston-technique",
    stakes: "National clinician pipeline was leaking qualified training demand at scale.",
    preState:
      "No CRM, leads split across spreadsheets, a static provider directory, event registrations in email threads, and no trustworthy channel → stage attribution.",
    intervention:
      "Shipped unified CRM, live searchable provider map, training lifecycle automation, and UTM-backed reporting tied to pipeline stages.",
    outcome: "+212% qualified leads — full capture-to-certification system",
    outcomeContext:
      "Eight recurring manual workflows replaced with state-driven automation; leadership could finally read qualified movement, not campaign noise.",
    principle: "When capture, directory, and lifecycle share one system of record, qualified demand stops dying in handoffs.",
    backgroundPublicId: "curated/regenerated/storytelling-2026-04/network-dataflow-02",
  },
  {
    slug: "primarycare-indy",
    stakes: "High-intent patients were deferring because the path to a booked visit was unclear.",
    preState:
      "Service architecture did not match search intent; mobile booking added friction at the moment of decision; trust signals sat downstream of the ask.",
    intervention:
      "Rebuilt patient-centered IA, simplified booking UX for mobile, and aligned local entry pages to immediate scheduling actions.",
    outcome: "75% more online bookings — conversion path rebuilt",
    outcomeContext:
      "Same market demand; less abandonment by matching intent language, reducing steps, and earning trust before the booking CTA.",
    principle: "Primary care converts when intent, trust, and the shortest safe path to schedule are one continuous surface.",
    backgroundPublicId: "curated/regenerated/storytelling-2026-04/team-strategy-02",
  },
  {
    slug: "urgentcare-indy",
    stakes: "Urgent-intent visits were lost to faster competitors when clarity and speed diverged.",
    preState:
      "Check-in and booking actions were buried; urgency and trust cues were split across the journey; local visibility did not terminate in a decisive next step.",
    intervention:
      "Restructured urgent pathways for mobile and local search, merged trust into conversion-critical blocks, and tightened location and availability clarity.",
    outcome: "+35% patient bookings — urgent flow rebuilt",
    outcomeContext:
      "Patients could move from need to booked visit with fewer detours; the system rewarded decisive action without sacrificing confidence.",
    principle: "Urgent care wins when the fastest path still feels safe — speed and reassurance have to occupy the same step.",
    backgroundPublicId: "curated/regenerated/storytelling-2026-04/network-dataflow-01",
  },
  {
    slug: "barbershop-command-center",
    stakes: "Appointment margin was leaking through no-shows, weak rebooking, and invisible reputation velocity.",
    preState:
      "Booking, client history, and outreach logic were disconnected; review requests were ad hoc; reminders defaulted to generic app behavior.",
    intervention:
      "Integrated public booking to CRM lifecycle, shipped post-visit review and retention automation, and gave the owner one command-center view of queues.",
    outcome: "4.9★ sustained + 3× repeat bookings — retention system",
    outcomeContext:
      "Repeat utilization and review recency became predictable inputs to local pack trust, not one-off heroics from the chair.",
    principle: "Local service compounds when booking state, lifecycle triggers, and reputation signals share one operating layer.",
    backgroundPublicId: "curated/regenerated/storytelling-2026-04/team-strategy-03",
  },
  {
    slug: "russell-painting",
    stakes: "Spend and inbound were visible; booked revenue was not — optimization was guessing.",
    preState:
      "Channel data, calls, forms, and booked jobs lived in disconnected views; local trust path from search to inquiry was uneven.",
    intervention:
      "Built an attribution layer across ads, calls, and form fills with reporting tied to booked work, and tightened local trust-to-inquiry alignment.",
    outcome: "4.9★ local trust conversion — attribution + inquiry system",
    outcomeContext:
      "Optimization could follow money to the job, not proxy metrics; trust signals and capture mechanics moved together.",
    principle: "Trust converts locally when the same system that proves performance also sharpens the next dollar you spend.",
    backgroundPublicId: "curated/regenerated/storytelling-2026-04/analytics-workflow-02",
  },
];

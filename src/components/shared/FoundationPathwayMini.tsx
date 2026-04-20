import Link from "next/link";

type FoundationPathwayMiniProps = {
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const DEFAULT_STEPS = [
  "Capture every inquiry in one place",
  "Set up intake and booking flow",
  "Automate follow-up and reminders",
  "Track visibility and conversion health",
];

export function FoundationPathwayMini({
  title = "Your first real system in 4 steps",
  body = "For missing-system buyers: this is the practical foundation path before complex optimization.",
  primaryHref = "/services/technical-roadmap",
  primaryLabel = "See foundation roadmap →",
  secondaryHref = "/tools/growth-bottleneck-quiz",
  secondaryLabel = "Run the diagnostic first →",
}: FoundationPathwayMiniProps) {
  return (
    <section className="rounded-3xl border border-[#F5F4F0]/12 bg-[#13131A]/38 p-6 sm:p-7">
      <p className="meta-label text-[#0FD9C8]">Foundation path</p>
      <h3 className="font-display mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0]">
        {title}
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/62">{body}</p>

      <ol className="mt-5 grid gap-3 sm:grid-cols-2">
        {DEFAULT_STEPS.map((step, index) => (
          <li
            key={step}
            className="rounded-2xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/30 px-4 py-3 text-sm text-[#F5F4F0]/76"
          >
            <span className="font-mono mr-2 text-[#F05A28]">{String(index + 1).padStart(2, "0")}.</span>
            {step}
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href={primaryHref} className="text-sm font-medium text-[#F05A28]">
          {primaryLabel}
        </Link>
        <Link href={secondaryHref} className="text-sm font-medium text-[#F5F4F0]/82 hover:text-[#F05A28]">
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}


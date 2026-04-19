import Link from "next/link";
import type { EngagementFormat, EngagementFormatDetail } from "@/types";

type EngagementFormatsRowProps = {
  formats: EngagementFormatDetail[];
};

const TAG_BY_FORMAT: Record<
  EngagementFormat,
  { label: string; className: string }
> = {
  fractional: {
    label: "Fractional",
    className: "bg-[#F05A28]/14 text-[#F05A28]",
  },
  project: {
    label: "Project",
    className: "bg-[#0FD9C8]/14 text-[#0FD9C8]",
  },
  diagnostic: {
    label: "Advisory",
    className: "bg-[#22C55E]/14 text-[#22C55E]",
  },
};

export function EngagementFormatsRow({ formats }: EngagementFormatsRowProps) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {formats.map((item) => {
        const tag = TAG_BY_FORMAT[item.format];
        return (
          <article
            key={item.format}
            className="flex flex-col rounded-4xl border border-[#F5F4F0]/10 bg-[#101014]/40 p-6 md:p-7"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <h3 className="font-display text-xl font-semibold leading-snug text-[#F5F4F0]">{item.name}</h3>
              <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${tag.className}`}>
                {tag.label}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium leading-6 text-[#F5F4F0]/88">{item.oneLiner}</p>
            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#F5F4F0]/45">Right for</p>
              <p className="mt-2 text-sm leading-6 text-[#F5F4F0]/72">{item.rightFor}</p>
            </div>
            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#F5F4F0]/45">Included</p>
              <ul className="mt-3 space-y-2.5 text-sm leading-6 text-[#F5F4F0]/72">
                {item.included.map((line) => (
                  <li key={line} className="relative pl-4 before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-[#F05A28]">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            {item.proofReference ? (
              <p className="mt-auto pt-6">
                <Link
                  href={`/proof/${item.proofReference}`}
                  className="text-sm font-medium text-[#22C55E] underline-offset-4 hover:underline"
                >
                  View proof →
                </Link>
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

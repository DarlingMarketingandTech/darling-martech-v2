import Link from "next/link";
import type { EngagementFormatDetail } from "@/types";

type EngagementFormatCardsProps = {
  formats: EngagementFormatDetail[];
};

export function EngagementFormatCards({ formats }: EngagementFormatCardsProps) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {formats.map((format) => (
        <article
          key={format.format}
          className="flex flex-col rounded-[1.75rem] border border-[#F5F4F0]/10 bg-[#101014]/40 p-6"
        >
          <h3 className="font-display text-xl font-semibold text-[#F05A28]">{format.name}</h3>
          <p className="mt-2 text-sm font-medium text-[#F5F4F0]/88">{format.oneLiner}</p>
          <p className="mt-4 text-sm leading-6 text-[#F5F4F0]/58">
            <span className="text-[#F5F4F0]/72">Right for: </span>
            {format.rightFor}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[#F5F4F0]/45">What&apos;s included</p>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-[#F5F4F0]/72">
            {format.included.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          {format.proofReference ? (
            <p className="mt-6 text-xs">
              <Link href={`/proof/${format.proofReference}`} className="text-[#22C55E] hover:underline">
                Read related proof →
              </Link>
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

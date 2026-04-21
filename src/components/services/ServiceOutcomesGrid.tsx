import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const OUTCOME_ICONS: LucideIcon[] = [Check];

type ServiceOutcomesGridProps = {
  outcomes: string[];
  serviceTitle: string;
};

export function ServiceOutcomesGrid({ outcomes, serviceTitle }: ServiceOutcomesGridProps) {
  return (
    <div>
      <div className="flex flex-col gap-2 border-b border-[#F5F4F0]/08 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="meta-label text-[#0FD9C8]/90">Operating outcomes</p>
          <h2 className="font-display mt-3 max-w-xl text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-3xl">
            What changes when this is built right
          </h2>
        </div>
        <p className="max-w-md text-xs font-mono uppercase leading-relaxed tracking-[0.12em] text-[#F5F4F0]/38">
          {serviceTitle}
        </p>
      </div>

      <ul className="mt-8 grid gap-3 lg:grid-cols-3">
        {outcomes.map((outcome, index) => {
          const Icon = OUTCOME_ICONS[index % OUTCOME_ICONS.length];
          return (
            <li key={outcome}>
              <article className="h-full rounded-2xl border border-[#F5F4F0]/10 bg-[#101017]/50 p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#0FD9C8]/35 bg-[#0FD9C8]/10 text-[#0FD9C8]">
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                  </span>
                  <p className="text-sm leading-relaxed text-[#F5F4F0]/80 md:text-[0.95rem]">{outcome}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import { Gauge, Layers2, LineChart, ShieldCheck, Sparkles, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const OUTCOME_ICONS: LucideIcon[] = [Target, LineChart, ShieldCheck, Layers2, Gauge, Sparkles];

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

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {outcomes.map((outcome, index) => {
          const Icon = OUTCOME_ICONS[index % OUTCOME_ICONS.length];
          return (
            <li key={outcome}>
              <article className="panel-obsidian relative h-full overflow-hidden rounded-3xl p-5 md:p-6">
                <span
                  className="pointer-events-none absolute left-0 top-0 h-full w-1 rounded-l-3xl bg-linear-to-b from-[#F05A28]/55 via-[#0FD9C8]/25 to-transparent"
                  aria-hidden
                />
                <div className="relative pl-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#F5F4F0]/10 bg-[#12121a]/80 text-[#F05A28]/88">
                      <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.65} aria-hidden />
                    </span>
                    <p className="pt-1 text-sm font-medium leading-snug text-[#F5F4F0]/82 md:text-[0.9375rem] md:leading-snug">
                      {outcome}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

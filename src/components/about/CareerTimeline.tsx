import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import type { CareerTimelineEntry } from "@/data/about";

type CareerTimelineProps = {
  entries: CareerTimelineEntry[];
};

export function CareerTimeline({ entries }: CareerTimelineProps) {
  return (
    <div className="ml-5 border-l-2 border-[#F05A28]/20">
      <div className="space-y-10 pl-6 md:space-y-12 md:pl-8">
        {entries.map((entry, index) => (
          <AnimateOnScroll key={`${entry.years}-${entry.company}`} delay={index * 0.07}>
            <div className="grid gap-4 md:grid-cols-[minmax(0,11rem)_1fr] md:gap-10">
              <p className="font-mono text-sm text-[#F05A28] md:text-base">{entry.years}</p>
              <div>
                <h3 className="font-display text-lg font-semibold leading-snug text-[#F5F4F0]">{entry.role}</h3>
                <p className="mt-1 text-sm text-[#F5F4F0]/50">
                  {entry.company} · {entry.location}
                </p>
                <p className="mt-3 text-base leading-7 text-[#F5F4F0]/55">{entry.body}</p>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}

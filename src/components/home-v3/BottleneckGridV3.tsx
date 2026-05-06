import { homepageV4Data } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { GlassPanel } from "@/components/layout-v3/GlassPanel";

export function BottleneckGridV3() {
  const { bottlenecks } = homepageV4Data;

  return (
    <BleedSection className="py-16 md:py-20 lg:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#0FD9C8]">
          {bottlenecks.eyebrow}
        </p>
        <h2 className="mt-3 font-syne text-3xl leading-[1.04] tracking-[-0.02em] text-[#F5F4F0] md:text-5xl">
          {bottlenecks.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F5F4F0]/72 md:text-lg">
          {bottlenecks.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {bottlenecks.cards.map((card) => (
          <GlassPanel
            key={card.title}
            className="border-[#F5F4F0]/10 bg-[linear-gradient(180deg,rgba(245,244,240,0.025),rgba(245,244,240,0.015))] p-6"
          >
            <h3 className="max-w-[18ch] font-syne text-2xl leading-tight text-[#F5F4F0]">
              {card.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#F5F4F0]/68 md:text-[0.95rem]">
              {card.body}
            </p>

            <ul className="mt-6 space-y-3 border-t border-[#F5F4F0]/10 pt-5 text-sm text-[#F5F4F0]/62">
              {card.symptoms.map((symptom) => (
                <li key={symptom} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#F05A28]" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        ))}
      </div>
    </BleedSection>
  );
}

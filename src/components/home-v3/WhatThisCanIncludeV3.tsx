import { homepageData } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { GlassPanel } from "@/components/layout-v3/GlassPanel";

export function WhatThisCanIncludeV3() {
  const data = homepageData.whatThisCanIncludeSection;

  return (
    <BleedSection className="relative py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="font-syne text-3xl leading-[1.05] tracking-[-0.02em] text-[#F5F4F0] md:text-5xl">
          {data.title}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F5F4F0]/72 md:text-lg">
          {data.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.cards.map((card) => (
          <GlassPanel key={card.title} className="h-full p-6">
            <h3 className="font-syne text-2xl leading-tight text-[#F5F4F0]">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#F5F4F0]/70">{card.body}</p>
          </GlassPanel>
        ))}
      </div>
    </BleedSection>
  );
}

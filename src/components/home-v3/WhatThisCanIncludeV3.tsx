import { homepageData } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { SectionSurface } from "@/components/layout-v3/SectionSurface";

export function WhatThisCanIncludeV3() {
  const data = homepageData.whatThisCanIncludeSection;

  return (
    <BleedSection className="relative py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="font-syne text-3xl leading-[1.05] tracking-[-0.02em] text-foreground md:text-5xl">
          {data.title}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-body-muted md:text-lg">
          {data.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.cards.map((card) => (
          <SectionSurface key={card.title} className="h-full p-6">
            <h3 className="font-syne text-2xl leading-tight text-foreground">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-body-muted">{card.body}</p>
          </SectionSurface>
        ))}
      </div>
    </BleedSection>
  );
}

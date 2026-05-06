import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homepageV4Data } from "@/data/homepage";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { GlassPanel } from "@/components/layout-v3/GlassPanel";
import { Button } from "@/components/ui/button";

export function ClosingCtaV3() {
  const { closingCta } = homepageV4Data;

  return (
    <BleedSection className="py-16 md:py-20 lg:py-24">
      <GlassPanel className="border-[#F5F4F0]/10 bg-[linear-gradient(180deg,rgba(245,244,240,0.035),rgba(240,90,40,0.04))] p-6 md:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#0FD9C8]">
              {closingCta.eyebrow}
            </p>
            <h2 className="mt-3 font-syne text-3xl leading-[1.04] tracking-[-0.02em] text-[#F5F4F0] md:text-5xl">
              {closingCta.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F5F4F0]/72 md:text-lg">
              {closingCta.body}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href={closingCta.primaryCta.href} size="lg" className="gap-2">
              {closingCta.primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
            <Button href={closingCta.secondaryCta.href} variant="secondary" size="lg">
              {closingCta.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="mt-6 border-t border-[#F5F4F0]/10 pt-5">
          <Link
            href={closingCta.tertiaryCta.href}
            className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#F05A28]"
          >
            {closingCta.tertiaryCta.label}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </GlassPanel>
    </BleedSection>
  );
}

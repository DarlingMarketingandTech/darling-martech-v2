"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { homepageV4Data } from "@/data/homepage";
import { captureClientEvent } from "@/lib/posthog";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { SectionSurface } from "@/components/layout-v3/SectionSurface";
import { CloudinaryProofImage } from "@/components/ui/CloudinaryProofImage";

export function CapabilityProofGridV3() {
  const { capabilities } = homepageV4Data;
  const prefersReducedMotion = useReducedMotion();

  return (
    <BleedSection className="py-16 md:py-20 lg:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-signal">
          {capabilities.eyebrow}
        </p>
        <h2 className="mt-3 font-syne text-3xl leading-[1.04] tracking-[-0.02em] text-foreground md:text-5xl">
          {capabilities.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-body-muted md:text-lg">
          {capabilities.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {capabilities.cards.map((card) => (
          <motion.article
            key={card.id}
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.18 }}
          >
            <SectionSurface className="group h-full overflow-hidden">
              <div className="relative h-48 overflow-hidden border-b border-foreground/10">
                <CloudinaryProofImage
                  publicId={card.proof.publicId}
                  alt={card.proof.alt}
                  width={1200}
                  height={900}
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,14,0.08)_0%,rgba(12,12,14,0.62)_100%)]" />
              </div>

              <div className="flex h-[calc(100%-12rem)] flex-col p-6">
                <h3 className="font-syne text-[1.65rem] leading-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-body-muted md:text-[0.95rem]">
                  {card.body}
                </p>

                <div className="mt-5 rounded-2xl border border-foreground/10 bg-foreground/3 p-4 transition-colors md:opacity-85 md:group-hover:opacity-100">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-signal">
                    {card.proof.label}
                  </p>
                  <p className="mt-2 font-syne text-xl leading-tight text-foreground">
                    {card.proof.metric}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-body-muted">
                    {card.proof.detail}
                  </p>
                  <Link
                    href={card.proof.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground"
                    onClick={() =>
                      captureClientEvent("capability_card_clicked", {
                        capability_id: card.id,
                        title: card.title,
                        link_target: "related_proof",
                        href: card.proof.href,
                      })
                    }
                  >
                    View related proof
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>

                <div className="mt-auto pt-5">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-2 text-sm text-foreground/88"
                    onClick={() =>
                      captureClientEvent("capability_card_clicked", {
                        capability_id: card.id,
                        title: card.title,
                        link_target: "proof_hub_filter",
                        href: card.href,
                      })
                    }
                  >
                    Explore this build type
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </SectionSurface>
          </motion.article>
        ))}
      </div>
    </BleedSection>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HOMEPAGE_PROOF_PATTERNS } from "@/data/homepage-proof-patterns";
import { HOMEPAGE_PROOF_VISUALS } from "@/data/homepage-proof-visuals";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { GlassPanel } from "@/components/layout-v3/GlassPanel";
import { CloudinaryProofImage } from "@/components/ui/CloudinaryProofImage";

const visualByPublicId = new Map(
  HOMEPAGE_PROOF_VISUALS.map((visual) => [visual.publicId, visual] as const)
);

export function ProjectTypeProofV3() {
  return (
    <BleedSection className="relative py-20 md:py-24">
      <div className="max-w-4xl">
        <h2 className="font-syne text-3xl leading-[1.05] tracking-[-0.02em] text-[#F5F4F0] md:text-5xl">
          Examples organized by what was built, not who it was built for.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#F5F4F0]/72 md:text-lg">
          Each project starts with a different need: a clearer brand, a better website, stronger
          follow-up, cleaner reporting, or a custom tool. The proof is organized by the shape of
          the work and what changed after it was built.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {HOMEPAGE_PROOF_PATTERNS.map((pattern) => {
          const visual = visualByPublicId.get(pattern.primaryVisualPublicId);

          return (
            <GlassPanel key={pattern.projectType} className="overflow-hidden">
              {visual ? (
                <CloudinaryProofImage
                  publicId={visual.publicId}
                  alt={visual.alt}
                  width={visual.width}
                  height={visual.height}
                  sizes="(min-width: 1280px) 40vw, (min-width: 768px) 44vw, 94vw"
                  className="h-52 w-full border-b border-[#F5F4F0]/10 object-cover md:h-60"
                />
              ) : (
                <>
                  {/* TODO: Add approved homepage visual mapping for this pattern publicId. */}
                  <div className="flex h-52 w-full items-center justify-center border-b border-[#F5F4F0]/10 bg-[#111214] text-xs uppercase tracking-[0.18em] text-[#F5F4F0]/45 md:h-60">
                    Visual Pending
                  </div>
                </>
              )}

              <div className="p-6 md:p-7">
                <h3 className="font-syne text-2xl leading-tight text-[#F5F4F0]">{pattern.headline}</h3>
                <p className="mt-2 text-sm text-[#0FD9C8]">{pattern.plainEnglishLabel}</p>

                <dl className="mt-6 space-y-4">
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#F5F4F0]/48">
                      What was not working
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[#F5F4F0]/74">
                      {pattern.whatWasNotWorking}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#F5F4F0]/48">
                      What was built
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[#F5F4F0]/74">
                      {pattern.whatWasBuilt}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#F5F4F0]/48">
                      What changed
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[#F5F4F0]/74">
                      {pattern.whatChanged}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#F5F4F0]/48">
                      Impact
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[#F5F4F0]/84">{pattern.impact}</dd>
                  </div>
                </dl>

                <Link
                  href={pattern.ctaHref}
                  className="group mt-6 inline-flex items-center gap-2 text-sm text-[#F5F4F0]"
                >
                  <span className="border-b border-current/0 transition-colors group-hover:border-current/60">
                    {pattern.ctaLabel}
                  </span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </BleedSection>
  );
}


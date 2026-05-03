import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HOMEPAGE_PROOF_VISUALS } from "@/data/homepage-proof-visuals";
import { BleedSection } from "@/components/layout-v3/BleedSection";
import { GlassPanel } from "@/components/layout-v3/GlassPanel";
import { CloudinaryProofImage } from "@/components/ui/CloudinaryProofImage";

const CRM_WORKFLOW_VISUAL = HOMEPAGE_PROOF_VISUALS.find((visual) => visual.publicId === "crm-workflow");

export function FeaturedTransformationV3() {
  return (
    <BleedSection className="relative py-18 md:py-22">
      <div className="max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#0FD9C8]/85">
          Featured transformation
        </p>
        <h2 className="mt-3 font-syne text-3xl leading-[1.05] tracking-[-0.02em] text-[#F5F4F0] md:text-5xl">
          A closer look at how the work changes the business
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#F5F4F0]/72 md:text-lg">
          A project is not just a deliverable. The useful part is what becomes clearer, easier,
          faster, or more reliable after it is built.
        </p>
      </div>

      <GlassPanel className="mt-10 overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
          {CRM_WORKFLOW_VISUAL ? (
            <CloudinaryProofImage
              publicId={CRM_WORKFLOW_VISUAL.publicId}
              alt={CRM_WORKFLOW_VISUAL.alt}
              width={CRM_WORKFLOW_VISUAL.width}
              height={CRM_WORKFLOW_VISUAL.height}
              sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 42vw, 100vw"
              className="h-56 w-full border-b border-[#F5F4F0]/10 object-cover lg:h-full lg:min-h-[520px] lg:border-b-0 lg:border-r"
            />
          ) : (
            <div className="flex h-56 w-full items-center justify-center border-b border-[#F5F4F0]/10 bg-[#111214] text-xs uppercase tracking-[0.18em] text-[#F5F4F0]/45 lg:h-full lg:min-h-[520px] lg:border-b-0 lg:border-r">
              Visual Pending
            </div>
          )}

          <div className="p-6 md:p-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#F5F4F0]/55">
              Project type
            </p>
            <h3 className="mt-2 font-syne text-3xl leading-tight text-[#F5F4F0]">CRM &amp; automation</h3>

            <dl className="mt-6 space-y-5">
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#F5F4F0]/48">
                  What was not working
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[#F5F4F0]/74">
                  Leads and follow-up depended on manual steps, scattered tools, and inconsistent
                  handoffs.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#F5F4F0]/48">
                  What was built
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[#F5F4F0]/74">
                  A connected workflow for lead capture, routing, reminders, follow-up, and
                  visibility into next steps.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#F5F4F0]/48">
                  What changed
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[#F5F4F0]/74">
                  The business had a clearer way to manage interest after someone reached out,
                  instead of relying on memory, inboxes, or one-off effort.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#F5F4F0]/48">
                  Why it mattered
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[#F5F4F0]/74">
                  A business can lose real opportunities when interest arrives but the next step is
                  unclear, delayed, or handled differently every time.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#F5F4F0]/48">
                  Impact
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-[#F5F4F0]/84">
                  Less manual drag, fewer missed opportunities, and a more reliable path from
                  inquiry to action.
                </dd>
              </div>
            </dl>

            <Link
              href="/proof?projectType=crm-automation-system"
              className="group mt-7 inline-flex items-center gap-2 text-sm text-[#F5F4F0]"
            >
              <span className="border-b border-current/0 transition-colors group-hover:border-current/60">
                See CRM &amp; automation proof
              </span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </GlassPanel>
    </BleedSection>
  );
}


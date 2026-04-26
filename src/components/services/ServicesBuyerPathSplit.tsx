import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/button";

const PROBLEMS_HREF = "/problems";
const ROADMAP_HREF = "/services/technical-roadmap";
const QUIZ_HREF = "/tools/growth-system-audit";
const PROOF_HREF = "/proof";

export function ServicesBuyerPathSplit() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <div className="panel-obsidian grain-mask flex flex-col rounded-4xl border border-[#F05A28]/22 p-6 md:p-8">
        <Eyebrow>Broken system</Eyebrow>
        <h2 className="font-display mt-4 text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-3xl">
          Tools and traffic exist — the operating logic does not hold together.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#F5F4F0]/68">
          Fragmented CRM, leaky handoffs, unclear attribution, brittle automation. The work is diagnosis,
          prioritization, and repair — not another tool purchase.
        </p>
        <ul className="mt-6 space-y-2.5 text-sm text-[#F5F4F0]/72">
          <li className="flex gap-2">
            <span className="text-[#0FD9C8]">→</span>
            <span>Name the bottleneck on <Link href={PROBLEMS_HREF} className="text-[#F05A28] hover:underline">/problems</Link></span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#0FD9C8]">→</span>
            <span>Map friction with the <Link href={ROADMAP_HREF} className="text-[#F05A28] hover:underline">Technical Roadmap</Link></span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#0FD9C8]">→</span>
            <span>Validate repair paths in <Link href={PROOF_HREF} className="text-[#F05A28] hover:underline">proof</Link></span>
          </li>
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={ROADMAP_HREF} size="lg">
            Audit the current stack →
          </Button>
          <Button href={PROBLEMS_HREF} variant="ghost" size="lg">
            Find the bottleneck →
          </Button>
        </div>
      </div>

      <div className="panel-obsidian grain-mask flex flex-col rounded-4xl border border-[#0FD9C8]/24 p-6 md:p-8">
        <Eyebrow>Missing system</Eyebrow>
        <h2 className="font-display mt-4 text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-3xl">
          Lead capture and follow-up are informal — there is no durable system behind growth.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#F5F4F0]/68">
          Brochure sites, light CRM use, manual reminders, and no honest view of what works. The work is a
          practical foundation: intake, routing, automation, and baseline visibility.
        </p>
        <ul className="mt-6 space-y-2.5 text-sm text-[#F5F4F0]/72">
          <li className="flex gap-2">
            <span className="text-[#F05A28]">→</span>
            <span>Self-check with the <Link href={QUIZ_HREF} className="text-[#0FD9C8] hover:underline">Growth System Audit</Link></span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#F05A28]">→</span>
            <span>Enter through the <Link href={ROADMAP_HREF} className="text-[#0FD9C8] hover:underline">Technical Roadmap</Link> (paid diagnostic)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#F05A28]">→</span>
            <span>Land in the <Link href="#lane-foundation" className="text-[#0FD9C8] hover:underline">Foundation lane</Link> below</span>
          </li>
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={ROADMAP_HREF} size="lg">
            Build the first real system →
          </Button>
          <Button href={QUIZ_HREF} variant="ghost" size="lg">
            See what is missing →
          </Button>
        </div>
      </div>
    </div>
  );
}

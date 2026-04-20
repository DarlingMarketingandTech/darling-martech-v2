import Link from "next/link";
import type { BuyerState } from "@/lib/buyer-state";
import { FoundationPathwayMini } from "@/components/shared/FoundationPathwayMini";

type NextBestStepModuleProps = {
  buyerState: BuyerState;
  tool: { href: string; label: string };
  proof: { href: string; label: string };
  service: { href: string; label: string };
};

export function NextBestStepModule({ buyerState, tool, proof, service }: NextBestStepModuleProps) {
  const isBrokenPrimary = buyerState === "broken";

  return (
    <section id="next-step" className="scroll-mt-28">
      <p className="meta-label text-[#F05A28]/90">Next best step</p>
      <div className="tech-divider my-4 max-w-md" />
      <div className="grid gap-6 lg:grid-cols-[1.18fr_1fr]">
        <article className="rounded-3xl border border-[#F05A28]/26 bg-[#13131A]/45 p-6 sm:p-7">
          <p className="meta-label text-[#F05A28]">Primary path</p>
          <h3 className="font-display mt-3 text-balance text-xl font-semibold text-[#F5F4F0] sm:text-2xl">
            Diagnose first, then choose the right build path.
          </h3>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-[#F5F4F0]/62">
            For teams with existing stack complexity that has become fragmented or untrustworthy.
          </p>
          <ul className="mt-5 space-y-3">
            <li className="rounded-2xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/35 px-4 py-3 text-sm text-[#F5F4F0]/82">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#F05A28]/92">01 · Diagnose</span>
              <p className="mt-1.5">{tool.label}</p>
            </li>
            <li className="rounded-2xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/35 px-4 py-3 text-sm text-[#F5F4F0]/82">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#0FD9C8]/90">02 · Learn</span>
              <p className="mt-1.5">{proof.label}</p>
            </li>
            <li className="rounded-2xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/35 px-4 py-3 text-sm text-[#F5F4F0]/82">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#F5F4F0]/62">03 · Evaluate</span>
              <p className="mt-1.5">{service.label}</p>
            </li>
          </ul>
          <div className="mt-6 flex flex-col gap-2">
            <Link href={tool.href} className="text-sm font-semibold text-[#F05A28]">
              {isBrokenPrimary ? "Start here: run the diagnostic →" : "Run diagnostic path →"}
            </Link>
            <Link href={proof.href} className="text-sm font-medium text-[#F5F4F0]/84 hover:text-[#F05A28]">
              See closest proof first →
            </Link>
          </div>
        </article>

        <FoundationPathwayMini
          primaryHref="/services/technical-roadmap"
          primaryLabel={isBrokenPrimary ? "See missing-system foundation path →" : "Start here: see foundation path →"}
          secondaryHref={proof.href}
          secondaryLabel="Secondary: see practical proof →"
        />
      </div>
    </section>
  );
}


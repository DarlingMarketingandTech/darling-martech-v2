import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FoundationPathwayMini } from "@/components/shared/FoundationPathwayMini";
import { TECHNICAL_ROADMAP_HREF, getProblemNextStepCopy, type BuyerState } from "@/lib/buyer-state";
import { cn } from "@/lib/utils";

type NextBestStepModuleProps = {
  buyerState: BuyerState;
  tool: { href: string; label: string };
  proof: { href: string; label: string };
  service: { href: string; label: string };
};

function foundationSecondaryHref(state: BuyerState, tool: NextBestStepModuleProps["tool"], proof: NextBestStepModuleProps["proof"]): string {
  if (state === "both") return proof.href;
  if (state === "missing") return tool.href;
  return "#tools";
}

export function NextBestStepModule({ buyerState, tool, proof, service }: NextBestStepModuleProps) {
  const copy = getProblemNextStepCopy(buyerState);
  const secondaryFoundationHref = foundationSecondaryHref(buyerState, tool, proof);

  const steps = [
    {
      kicker: "01 · Diagnose",
      kickerClass: "text-[#F05A28]/92",
      title: "Run the diagnostic",
      body: tool.label,
      href: tool.href,
      primary: true as const,
    },
    {
      kicker: "02 · Validate",
      kickerClass: "text-[#0FD9C8]/90",
      title: "Confirm the fix class in proof",
      body: proof.label,
      href: proof.href,
      primary: false as const,
    },
    {
      kicker: "03 · Implement",
      kickerClass: "text-[#F5F4F0]/62",
      title: "Service direction",
      body: service.label,
      href: service.href,
      primary: false as const,
    },
    {
      kicker: "04 · Roadmap",
      kickerClass: "text-[#F5F4F0]/52",
      title: "Paid Technical Roadmap",
      body: "Prioritized plan, integration view, credit-forward if you build next.",
      href: TECHNICAL_ROADMAP_HREF,
      primary: false as const,
    },
  ];

  return (
    <section id="next-step" className="scroll-mt-28">
      <p className="meta-label text-[#F05A28]/90">What you should do next</p>
      <div className="tech-divider my-4 max-w-md" />
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <article className="rounded-3xl border border-[#F05A28]/26 bg-[#13131A]/45 p-6 sm:p-7">
          <p className="meta-label text-[#F05A28]">{copy.primaryColumnKicker}</p>
          <h3 className="font-display mt-3 text-balance text-xl font-semibold tracking-[-0.02em] text-[#F5F4F0] sm:text-2xl">
            {copy.title}
          </h3>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-[#F5F4F0]/68">{copy.subhead}</p>

          <ol className="mt-6 space-y-3">
            {steps.map((step) => (
              <li
                key={step.kicker}
                className="rounded-2xl border border-[#F5F4F0]/10 bg-[#0C0C0E]/35 px-4 py-3.5 sm:px-4 sm:py-4"
              >
                <span className={cn("font-mono text-[0.68rem] uppercase tracking-[0.16em]", step.kickerClass)}>{step.kicker}</span>
                <p className="mt-1 text-sm font-medium text-[#F5F4F0]/92">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#F5F4F0]/62">{step.body}</p>
                <div className="mt-3">
                  {step.primary ? (
                    <Button href={step.href} size="sm">
                      Start here →
                    </Button>
                  ) : (
                    <Link href={step.href} className="text-sm font-semibold text-[#F05A28] underline-offset-4 hover:underline">
                      Open →
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </article>

        <FoundationPathwayMini
          title={copy.foundationTitle}
          body={copy.foundationBody}
          primaryHref={TECHNICAL_ROADMAP_HREF}
          primaryLabel={copy.foundationPrimaryLabel}
          secondaryHref={secondaryFoundationHref}
          secondaryLabel={copy.foundationSecondaryLabel}
        />
      </div>
    </section>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDisplayClusterIdForServiceSlug } from "@/data/services";
import { siteConfig } from "@/data/site-config";
import type { Service } from "@/types";

type ServiceDetailCtasProps = {
  service: Service;
};

export function ServiceDetailCtas({ service }: ServiceDetailCtasProps) {
  const clusterId = getDisplayClusterIdForServiceSlug(service.slug);
  const diagnosePath =
    clusterId === "foundation" || clusterId === "scale"
      ? { href: "/services/technical-roadmap", label: "Diagnose with the Technical Roadmap →" }
      : { href: "/tools/growth-bottleneck-quiz", label: "Diagnose with the Growth Bottleneck Quiz →" };
  const learnPath = { href: "/proof", label: "Review related proof first →" };

  return (
    <div className="rounded-[2rem] border border-[#F5F4F0]/10 bg-[#111118]/45 px-6 py-8 md:px-10 md:py-10">
      <p className="meta-label text-[#0FD9C8]/90">Next step sequence</p>
      <h2 className="font-display mt-3 max-w-xl text-balance text-xl font-semibold text-[#F5F4F0] md:text-2xl">
        Evaluate this service without skipping diagnosis
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/55">
        Service detail pages are evaluate-stage pages. Use one primary action to scope fit, then take diagnose or
        proof paths if you need more confidence first.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button href={siteConfig.calComLink} size="lg">
          Book a diagnostic call →
        </Button>
        <Button href={learnPath.href} variant="secondary" size="lg">
          {learnPath.label}
        </Button>
      </div>
      <Link
        href={diagnosePath.href}
        className="mt-6 inline-flex text-sm font-medium text-[#F5F4F0]/60 underline decoration-[#F5F4F0]/20 underline-offset-4 transition-colors hover:text-[#F5F4F0]/80"
      >
        {diagnosePath.label}
      </Link>
    </div>
  );
}

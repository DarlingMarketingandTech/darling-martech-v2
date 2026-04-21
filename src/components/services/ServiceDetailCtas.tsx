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
  const secondaryCta =
    clusterId !== null && service.slug !== "technical-roadmap"
      ? { href: "/services/technical-roadmap", label: "Request the Technical Roadmap →" }
      : { href: "/tools/growth-bottleneck-quiz", label: "Run the Growth Bottleneck Quiz →" };

  return (
    <div className="rounded-[2rem] border border-[#F5F4F0]/10 bg-[#111118]/45 px-6 py-8 md:px-10 md:py-10">
      <p className="meta-label text-[#0FD9C8]/90">Next step</p>
      <h2 className="font-display mt-3 max-w-xl text-balance text-xl font-semibold text-[#F5F4F0] md:text-2xl">
        Start with the clearest next move
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/55">
        Use a short call if you already know the objective. Use the secondary path if you need structure before
        deciding scope.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button href={siteConfig.calComLink} size="lg">
          Book a 30-minute call →
        </Button>
        <Button href={secondaryCta.href} variant="secondary" size="lg">
          {secondaryCta.label}
        </Button>
      </div>
      <Link
        href="/proof"
        className="mt-6 inline-flex text-sm font-medium text-[#F5F4F0]/60 underline decoration-[#F5F4F0]/20 underline-offset-4 transition-colors hover:text-[#F5F4F0]/80"
      >
        Or browse proof first →
      </Link>
    </div>
  );
}

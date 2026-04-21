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
  const showRoadmapCta = clusterId !== null && service.slug !== "technical-roadmap";

  return (
    <div className="rounded-[2rem] border border-[#F5F4F0]/10 bg-[#13131A]/25 px-6 py-8 md:px-10 md:py-10">
      <p className="meta-label text-[#0FD9C8]/90">Next step</p>
      <h2 className="font-display mt-3 max-w-xl text-balance text-xl font-semibold text-[#F5F4F0] md:text-2xl">
        Choose depth before scope creep
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/55">
        If the problem is already clear, start with a conversation. If you need a fast read on where the system breaks,
        run the diagnostic first — it maps to the same problem and proof paths.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button href={siteConfig.calComLink} size="lg">
          Book a 30-minute call →
        </Button>
        <Button href="/tools/growth-bottleneck-quiz" variant="secondary" size="lg">
          Run the Growth Bottleneck Quiz →
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-[#F5F4F0]/08 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
        {showRoadmapCta ? (
          <Link
            href="/services/technical-roadmap"
            className="text-sm font-medium text-[#F5F4F0]/52 underline decoration-[#F5F4F0]/18 underline-offset-4 transition-colors hover:text-[#0FD9C8] hover:decoration-[#0FD9C8]/35"
          >
            Request the Technical Roadmap →
          </Link>
        ) : null}
        <Link
          href="/proof"
          className="text-sm font-medium text-[#F5F4F0]/52 underline decoration-[#F5F4F0]/18 underline-offset-4 transition-colors hover:text-[#F05A28] hover:decoration-[#F05A28]/35"
        >
          Browse the proof index →
        </Link>
        <Link
          href="/services"
          className="text-sm font-medium text-[#F5F4F0]/52 underline decoration-[#F5F4F0]/18 underline-offset-4 transition-colors hover:text-[#F5F4F0]/75"
        >
          Back to services overview →
        </Link>
      </div>
    </div>
  );
}

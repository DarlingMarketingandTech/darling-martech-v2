"use client";

import { CMO_SIMULATOR_URL } from "@/data/tools/simulator";
import { trackToolEvent } from "@/lib/tools/analytics-events";

export function CmoSimulatorEmbed() {
  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#13131A]">
        <iframe
          src={CMO_SIMULATOR_URL}
          title="CMO Simulator"
          className="block h-[82vh] w-full min-h-[600px]"
          loading="lazy"
          allow="clipboard-write"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={CMO_SIMULATOR_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackToolEvent("cmo_simulator_open_fullscreen", { toolSlug: "cmo-simulator" })}
          className="inline-flex items-center rounded-xl bg-[#F05A28] px-5 py-3 text-sm font-semibold text-[#0C0C0E] transition-opacity hover:opacity-90"
        >
          Open full screen
          <span aria-hidden className="ml-1">↗</span>
        </a>
        <p className="text-sm text-[#F5F4F0]/55">
          Prefer a bigger surface? Open the simulator full screen.
        </p>
      </div>
    </div>
  );
}

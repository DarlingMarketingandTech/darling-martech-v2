import { homepageV4Data } from "@/data/homepage";
import { DiagnosticOrangeBand } from "@/components/home/DiagnosticOrangeBand";

/**
 * Mid-page diagnostic band that surfaces the Growth System Audit as the
 * primary low-trust entry point. Sits between CapabilityProofGridV3 and
 * SelectedOutcomesV3 to intercept visitors who have seen the bottleneck
 * framing but are not yet ready to browse proof or book a call.
 */
export function DiagnosticBandV3() {
  const { diagnosticBand } = homepageV4Data;

  return (
    <div className="px-6 py-6 md:px-10 md:py-8">
      <DiagnosticOrangeBand
        headline={diagnosticBand.headline}
        body={diagnosticBand.body}
        cta={diagnosticBand.cta}
      />
    </div>
  );
}

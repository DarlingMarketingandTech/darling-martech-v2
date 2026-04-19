import { SiteShell } from "@/components/layout/site-shell";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ProblemHubGrid } from "@/components/problems/ProblemHubGrid";
import { PageHero } from "@/components/hero/PageHero";
import { DiagnosticOrangeBand } from "@/components/home/DiagnosticOrangeBand";
import { Button } from "@/components/ui/button";
import { problemPages } from "@/data/problems";
import { routeMetadata } from "@/data/routes";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata(routeMetadata["/problems"]);

export default function ProblemsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="FIND YOUR PROBLEM FIRST"
        headline="Most growth problems are fixable. The ones that aren't named aren't."
        body="This page exists for one reason: to help you name the specific thing holding your growth back — before you decide what to do about it."
        ctas={[{ label: "Take the 3-minute diagnostic →", href: "/tools/growth-bottleneck-quiz", variant: "primary" }]}
      />
      <p className="mt-10 text-center text-sm text-[#F5F4F0]/55">
        These are the six most common patterns I find when I start working with a new client. One of them is probably yours.
      </p>
      <div className="mt-10">
        <ProblemHubGrid problems={problemPages} />
      </div>

      <div className="mt-14">
        <DiagnosticOrangeBand
          headline="Still not sure which one is your bottleneck?"
          body="8 questions. 3 minutes. A specific answer — not a generic recommendation."
          cta={{ label: "Take the Growth Bottleneck Quiz →", href: "/tools/growth-bottleneck-quiz" }}
        />
      </div>

      <SectionWrapper className="mt-14 text-center">
        <p className="text-sm text-[#F5F4F0]/55">
          If you already know the problem and you&apos;re ready to talk about fixing it, skip the diagnostic.
        </p>
        <div className="mt-6">
          <Button href="/contact" variant="ghost" size="lg">
            Start a conversation →
          </Button>
        </div>
      </SectionWrapper>
    </SiteShell>
  );
}

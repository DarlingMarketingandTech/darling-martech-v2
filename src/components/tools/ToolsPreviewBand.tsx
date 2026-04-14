import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolGrid } from "@/components/tools/ToolGrid";
import type { Tool } from "@/types";

type ToolsPreviewBandProps = {
  eyebrow: string;
  headline: string;
  body: string;
  tools: Tool[];
  cta: { label: string; href: string };
};

export function ToolsPreviewBand({ eyebrow, headline, body, tools, cta }: ToolsPreviewBandProps) {
  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
      <div>
        <SectionHeader eyebrow={eyebrow} title={headline} body={body} />
        <div className="mt-8">
          <Button href={cta.href} variant="secondary">
            {cta.label}
          </Button>
        </div>
      </div>
      <ToolGrid tools={tools} />
    </section>
  );
}

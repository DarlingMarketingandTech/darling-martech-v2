import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ToolCard } from "@/components/tools/ToolCard";
import type { ProofAngle, Tool } from "@/types";

type ToolGridProps = {
  tools: Tool[];
  proofAnglesByToolSlug?: Record<string, ProofAngle[]>;
};

export function ToolGrid({ tools, proofAnglesByToolSlug }: ToolGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tools.map((tool, index) => (
        <AnimateOnScroll key={tool.slug} delay={index * 0.05}>
          <ToolCard tool={tool} relatedProofAngles={proofAnglesByToolSlug?.[tool.slug]} />
        </AnimateOnScroll>
      ))}
    </div>
  );
}

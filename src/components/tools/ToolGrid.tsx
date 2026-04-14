import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ToolCard } from "@/components/tools/ToolCard";
import type { Tool } from "@/types";

type ToolGridProps = {
  tools: Tool[];
};

export function ToolGrid({ tools }: ToolGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tools.map((tool, index) => (
        <AnimateOnScroll key={tool.slug} delay={index * 0.05}>
          <ToolCard tool={tool} />
        </AnimateOnScroll>
      ))}
    </div>
  );
}

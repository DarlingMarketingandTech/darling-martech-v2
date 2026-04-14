import Link from "next/link";
import type { Tool } from "@/types";

type ToolCardProps = {
  tool: Tool;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="surface-card rounded-[2rem] border-l-4 border-l-[#F05A28] p-6">
      <h3 className="font-display text-2xl font-semibold">{tool.title}</h3>
      <p className="mt-3 text-base leading-7 text-[#F5F4F0]/72">{tool.tagline}</p>
      <p className="mt-5 text-sm text-[#0FD9C8]">
        {tool.estimatedTime} · {tool.isLive ? "Live" : "In build"}
      </p>
      <p className="mt-4 text-sm leading-6 text-[#F5F4F0]/58">{tool.description}</p>
      <Link href={`/tools/${tool.slug}`} className="mt-6 inline-flex text-sm text-[#F05A28] transition-colors hover:text-[#ff6d40]">
        Open tool
      </Link>
    </article>
  );
}

import Link from "next/link";
import type { ProofAngle, Tool } from "@/types";

type ToolCardProps = {
  tool: Tool;
  relatedProofAngles?: ProofAngle[];
};

export function ToolCard({ tool, relatedProofAngles }: ToolCardProps) {
  const angles = relatedProofAngles?.slice(0, 2) ?? [];

  return (
    <article className="surface-card surface-card-interactive group rounded-[2rem] border-l-4 border-l-[#F05A28] p-6">
      <h3 className="font-display text-2xl font-semibold">{tool.title}</h3>
      <p className="mt-3 text-base leading-7 text-[#F5F4F0]/72">{tool.tagline}</p>
      <p className="mt-5 text-sm text-[#0FD9C8]">
        {tool.estimatedTime} · {tool.isLive ? "Live" : "In build"}
      </p>
      <p className="mt-4 text-sm leading-6 text-[#F5F4F0]/58">{tool.description}</p>
      {angles.length ? (
        <div className="mt-5 border-t border-[#F5F4F0]/8 pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5F4F0]/40">
            Proof angles
          </p>
          <ul className="mt-2 space-y-1.5">
            {angles.map((angle) => (
              <li key={angle.id}>
                <Link
                  href={`/proof/${angle.parentProjectSlug}`}
                  className="text-sm text-[#F5F4F0]/52 transition-colors hover:text-[#0FD9C8]"
                >
                  {angle.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Link
        href={`/tools/${tool.slug}`}
        className="mt-6 inline-flex items-center gap-1 text-sm text-[#F05A28] transition-all group-hover:text-[#ff6d40] group-hover:gap-2"
      >
        Open tool
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
      </Link>
    </article>
  );
}

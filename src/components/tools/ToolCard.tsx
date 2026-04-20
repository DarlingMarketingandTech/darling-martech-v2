import Link from "next/link";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";
import type { ProofAngle, Tool } from "@/types";

type ToolCardProps = {
  tool: Tool;
  relatedProofAngles?: ProofAngle[];
};

export function ToolCard({ tool, relatedProofAngles }: ToolCardProps) {
  const angles = relatedProofAngles?.slice(0, 2) ?? [];

  return (
    <article className="surface-card surface-card-interactive group rounded-[2rem] border-l-4 border-l-[#F05A28] p-6">
      {tool.cloudinaryThumbnail ? (
        <div className="mb-5 overflow-hidden rounded-3xl border border-[#F5F4F0]/10 bg-[#101014]">
          <CloudinaryImage
            publicId={tool.cloudinaryThumbnail}
            alt={`${tool.title} visual`}
            width={1024}
            height={1024}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : null}
      <h3 className="font-display text-2xl font-semibold">{tool.title}</h3>
      <p className="mt-3 text-base leading-7 text-[#F5F4F0]/72">{tool.tagline}</p>
      <p className="mt-5 text-sm text-[#0FD9C8]">
        {tool.estimatedTime} · {tool.isLive ? "Live" : "In build"}
      </p>
      <p className="mt-4 text-sm leading-6 text-[#F5F4F0]/58">{tool.description}</p>
      {angles.length ? (
        <div className="mt-5 border-t border-[#F5F4F0]/8 pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5F4F0]/40">
            Where this applies
          </p>
          <ul className="mt-3 space-y-3">
            {angles.map((angle) => (
              <li key={angle.id} className="text-sm">
                <p className="font-medium text-[#F5F4F0]/78">{angle.title}</p>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  <Link
                    href={`/problems/${angle.problemKey}`}
                    className="rounded-full border border-[#F5F4F0]/10 px-2.5 py-1 text-xs text-[#F5F4F0]/55 transition-colors hover:border-[#0FD9C8]/35 hover:text-[#0FD9C8]"
                  >
                    Problem →
                  </Link>
                  <Link
                    href={`/services/${angle.primaryServiceSlug}`}
                    className="rounded-full border border-[#F5F4F0]/10 px-2.5 py-1 text-xs text-[#F5F4F0]/55 transition-colors hover:border-[#F05A28]/35 hover:text-[#F05A28]"
                  >
                    Service →
                  </Link>
                </div>
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

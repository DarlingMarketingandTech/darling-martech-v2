import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ProblemPage } from "@/types";

type ProblemCardProps = {
  problem: ProblemPage;
};

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <article className="surface-card rounded-[2rem] p-7">
      <Eyebrow>{problem.slug.replaceAll("-", " ")}</Eyebrow>
      <h3 className="font-display text-balance mt-4 text-2xl font-semibold">{problem.title}</h3>
      <p className="mt-3 text-base leading-7 text-[#F5F4F0]/72">{problem.heroSubhead}</p>
      <p className="mt-5 text-sm text-[#22C55E]">Related proof: {problem.relatedProof.join(", ")}</p>
      <Link
        href={`/problems/${problem.slug}`}
        className="mt-6 inline-flex text-sm text-[#F05A28] transition-colors hover:text-[#ff6d40]"
      >
        See the full problem
      </Link>
    </article>
  );
}

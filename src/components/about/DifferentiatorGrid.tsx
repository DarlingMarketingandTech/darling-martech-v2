import type { DifferentiatorItem } from "@/data/about";

type DifferentiatorGridProps = {
  items: DifferentiatorItem[];
};

export function DifferentiatorGrid({ items }: DifferentiatorGridProps) {
  return (
    <div className="mt-10 grid gap-8 md:grid-cols-3">
      {items.map((item) => (
        <article key={item.statement}>
          <h3 className="font-display text-lg font-semibold leading-snug text-[#F5F4F0]">{item.statement}</h3>
          <p className="mt-3 text-base leading-7 text-[#F5F4F0]/55">{item.explanation}</p>
        </article>
      ))}
    </div>
  );
}

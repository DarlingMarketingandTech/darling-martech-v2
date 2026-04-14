import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

type Principle = {
  title: string;
  description: string;
};

type PrinciplesGridProps = {
  principles: Principle[];
};

export function PrinciplesGrid({ principles }: PrinciplesGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {principles.map((principle, index) => (
        <AnimateOnScroll key={principle.title} delay={index * 0.04}>
          <article className="surface-card rounded-[2rem] p-7">
            <h3 className="font-display text-2xl font-semibold">{principle.title}</h3>
            <p className="mt-3 text-base leading-7 text-[#F5F4F0]/72">{principle.description}</p>
          </article>
        </AnimateOnScroll>
      ))}
    </div>
  );
}

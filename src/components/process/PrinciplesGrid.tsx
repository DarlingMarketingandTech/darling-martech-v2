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
        <AnimateOnScroll key={principle.title} delay={index * 0.04} variant="fade">
          <article className="panel-titanium grain-mask rounded-4xl p-7 md:p-8">
            <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] md:text-2xl">
              {principle.title}
            </h3>
            <div className="tech-divider mt-3 max-w-sm" />
            <p className="text-base leading-7 text-[#F5F4F0]/72">{principle.description}</p>
          </article>
        </AnimateOnScroll>
      ))}
    </div>
  );
}

import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

type ProcessTimelineStep = {
  number: string;
  title: string;
  description: string;
};

type ProcessTimelineProps = {
  steps: ProcessTimelineStep[];
};

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="grid gap-5">
      {steps.map((step, index) => (
        <AnimateOnScroll key={step.number} delay={index * 0.04}>
          <article className="surface-card rounded-[2rem] p-7">
            <p className="font-mono text-xl text-[#F05A28]">{step.number}</p>
            <h3 className="font-display mt-3 text-2xl font-semibold">{step.title}</h3>
            <p className="mt-3 text-base leading-7 text-[#F5F4F0]/72">{step.description}</p>
          </article>
        </AnimateOnScroll>
      ))}
    </div>
  );
}

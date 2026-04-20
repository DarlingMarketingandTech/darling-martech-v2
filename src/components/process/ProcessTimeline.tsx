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
    <div className="relative pl-2 md:pl-3">
      <div className="schematic-rail tech-grid-bg ml-3 rounded-l-2xl py-1 pl-6 md:ml-4 md:pl-8">
        <div className="grid gap-5">
          {steps.map((step, index) => (
            <AnimateOnScroll key={step.number} delay={index * 0.05} variant="fade">
              <article className="panel-obsidian panel-interactive relative rounded-3xl p-7 md:p-8">
                <div className="absolute left-0 top-8 hidden h-px w-4 -translate-x-full bg-[#F5F4F0]/12 md:block" aria-hidden />
                <div className="h-px w-10 bg-[#F05A28]/35" aria-hidden />
                <p className="font-mono mt-3 text-sm font-semibold tabular-nums tracking-wider text-[#F05A28]/85">
                  {step.number}
                </p>
                <h3 className="font-display mt-4 text-xl font-semibold leading-snug tracking-[-0.02em] text-[#F5F4F0] md:text-2xl">
                  {step.title}
                </h3>
                <div className="tech-divider my-4 max-w-md" />
                <p className="text-base leading-7 text-[#F5F4F0]/72">{step.description}</p>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}

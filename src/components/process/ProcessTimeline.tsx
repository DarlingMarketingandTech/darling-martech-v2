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
    <div className="ml-5 border-l-2 border-[#F05A28]/20">
      <div className="grid gap-5 pl-6 md:pl-8">
        {steps.map((step, index) => (
          <AnimateOnScroll key={step.number} delay={index * 0.08}>
            <article className="group rounded-4xl border border-[#F5F4F0]/8 bg-[#13131A] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-md transition-colors duration-300 hover:bg-[#18181F]">
              <p className="font-mono text-xl text-[#F5F4F0]/35 transition-colors duration-300 group-hover:text-[#F05A28]">
                {step.number}
              </p>
              <h3 className="font-display mt-3 text-2xl font-semibold text-[#F5F4F0]">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#F5F4F0]/72">{step.description}</p>
            </article>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import styles from "./ProcessTimeline.module.css";

type ProcessTimelineStep = {
  number: string;
  title: string;
  description: string;
};

export type ProcessTimelineLayout = "connected" | "featured";

type ProcessTimelineProps = {
  steps: ProcessTimelineStep[];
  /** `featured` — premium homepage "How this works" treatment. `connected` — default rail (e.g. /process). */
  layout?: ProcessTimelineLayout;
};

export function ProcessTimeline({ steps, layout = "connected" }: ProcessTimelineProps) {
  if (layout === "featured") {
    return (
      <div className={cn(styles.featuredRail, "relative pl-2 md:pl-3")}>
        <div
          className={cn(
            styles.featuredGrid,
            "schematic-rail tech-grid-bg ml-3 py-3 pl-6 pr-4 md:ml-4 md:py-4 md:pl-9 md:pr-5"
          )}
        >
          <div className="grid gap-6 md:gap-7">
            {steps.map((step, index) => (
              <AnimateOnScroll key={step.number} delay={index * 0.1} distance={20} variant="rise">
                <article className={cn(styles.card, "relative")}>
                  <div className={styles.cardWash} aria-hidden />
                  <div className="absolute left-0 top-8 hidden h-px w-4 -translate-x-full bg-[#F5F4F0]/12 md:block" aria-hidden />
                  <div className={styles.accent} aria-hidden />
                  <div className={styles.numberRow}>
                    <div className={styles.numberBadge}>
                      <span className={styles.number}>{step.number}</span>
                    </div>
                  </div>
                  <h3
                    className={cn(
                      styles.title,
                      "font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-[#F5F4F0] md:text-2xl md:leading-snug"
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      styles.body,
                      "text-[0.9375rem] leading-relaxed text-[#F5F4F0]/72 md:text-base md:leading-relaxed"
                    )}
                  >
                    {step.description}
                  </p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    );
  }

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

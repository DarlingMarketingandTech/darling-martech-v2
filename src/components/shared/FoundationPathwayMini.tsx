"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FoundationPathwayMiniProps = {
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

type FoundationStep = {
  number: string;
  title: string;
  description: string;
  callout: string;
};

const DEFAULT_STEPS: FoundationStep[] = [
  {
    number: "01",
    title: "Capture every inquiry in one place",
    description: "Fragmented leads, forms, and source signals converge into one intake core.",
    callout: "CENTRALIZE",
  },
  {
    number: "02",
    title: "Set up intake and booking flow",
    description: "The reactor extrudes routing paths for qualification, scheduling, and handoff.",
    callout: "SETUP",
  },
  {
    number: "03",
    title: "Automate follow-up and reminders",
    description: "Light packets move without manual pushes, representing follow-up that runs on its own.",
    callout: "AUTOMATE",
  },
  {
    number: "04",
    title: "Track visibility and conversion health",
    description: "The system expands into a visible operating layer with health and conversion signals.",
    callout: "SCALE",
  },
];

const BADGE_TONES = ["#0FD9C8", "#0FD9C8", "#F5B8A3", "#F05A28"] as const;
const STATUS_TAGS = ["Capture", "Setup", "Automate", "Scale"] as const;

function StepProgressRail({ steps, activeStep }: { steps: FoundationStep[]; activeStep: number }) {
  const progressPercent = steps.length > 1 ? (activeStep / (steps.length - 1)) * 100 : 0;

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
      className="pointer-events-none absolute bottom-26 left-5 top-36 z-20 hidden w-10 items-center justify-center md:flex md:left-7"
    >
      <div className="relative flex h-full min-h-[250px] w-full items-center justify-center">
        <div className="absolute h-full w-px bg-[#F5F4F0]/12" />
        <motion.div
          className="absolute top-0 w-px bg-linear-to-b from-[#0FD9C8] to-[#F05A28]"
          animate={{ height: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-between">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isDone = index < activeStep;
            return (
              <motion.div
                key={step.number}
                className={cn(
                  "flex size-7 items-center justify-center rounded-full border font-mono text-[0.56rem] tracking-[0.16em]",
                  isDone || isActive
                    ? "border-[#0FD9C8]/40 bg-[#0FD9C8]/14 text-[#0FD9C8]"
                    : "border-[#F5F4F0]/18 bg-[#0C0C0E]/78 text-[#F5F4F0]/42"
                )}
                animate={isActive ? { scale: [1, 1.08, 1], boxShadow: ["0 0 0 rgba(15,217,200,0)", "0 0 18px rgba(15,217,200,0.32)", "0 0 0 rgba(15,217,200,0)"] } : { scale: 1 }}
                transition={{ duration: 1.8, repeat: isActive ? Infinity : 0 }}
              >
                {step.number}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function FoundationPathwayMini({
  title = "Your first real system in 4 steps",
  body = "For missing-system buyers: this is the practical foundation path before complex optimization.",
  primaryHref = "/services/technical-roadmap",
  primaryLabel = "See foundation roadmap →",
  secondaryHref = "/tools/growth-bottleneck-quiz",
  secondaryLabel = "Run the diagnostic first →",
}: FoundationPathwayMiniProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15% 0px -20% 0px" });
  const [activeStep, setActiveStep] = useState(0);
  const stepCopy = useMemo(() => DEFAULT_STEPS[activeStep] ?? DEFAULT_STEPS[0], [activeStep]);
  const badgeTone = BADGE_TONES[activeStep] ?? "#0FD9C8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(16px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 32, filter: "blur(16px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card
        ref={sectionRef}
        className="relative isolate overflow-hidden rounded-[2rem] border-[#F5F4F0]/12 bg-[#0C0C0E]/76 py-0 text-[#F5F4F0] shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 isolate z-[-1]"
          aria-hidden
          animate={{
            backgroundImage: [
              "radial-gradient(circle_at_14%_15%,rgba(15,217,200,0.12),transparent_36%), radial-gradient(circle_at_85%_22%,rgba(240,90,40,0.1),transparent_34%), linear-gradient(180deg,rgba(245,244,240,0.035),rgba(12,12,14,0.92))",
              "radial-gradient(circle_at_28%_12%,rgba(15,217,200,0.18),transparent_34%), radial-gradient(circle_at_82%_28%,rgba(240,90,40,0.12),transparent_36%), linear-gradient(180deg,rgba(245,244,240,0.04),rgba(12,12,14,0.93))",
            ],
          }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <StepProgressRail steps={DEFAULT_STEPS} activeStep={activeStep} />

        <CardHeader className="relative z-20 max-w-2xl gap-0 px-5 pt-8 md:px-7 md:pt-10 md:pl-20">
          <motion.div
            animate={{
              boxShadow: ["0 0 0 rgba(0,0,0,0)", `0 0 16px ${badgeTone}44`, "0 0 0 rgba(0,0,0,0)"],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex w-fit rounded-full"
          >
            <Badge
              variant="outline"
              className="px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.18em]"
              style={{
                borderColor: `${badgeTone}66`,
                backgroundColor: "rgba(12,12,14,0.55)",
                color: badgeTone,
              }}
            >
              Foundation path
            </Badge>
          </motion.div>
          <CardTitle className="font-display mt-4 text-balance text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#F5F4F0] md:text-3xl">
            {title}
          </CardTitle>
          <AnimatePresence mode="wait">
            <motion.div
              key={stepCopy.number}
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <CardDescription className="mt-3 max-w-xl text-sm leading-relaxed text-[#A1A1AA]">
                {body}
              </CardDescription>
            </motion.div>
          </AnimatePresence>
        </CardHeader>

        <CardContent className="relative z-20 px-5 pb-6 pt-2 md:px-7 md:pl-20">
          <div className="grid gap-3 md:grid-cols-2">
            {DEFAULT_STEPS.map((step, index) => {
              const isActive = index === activeStep;
              const isDone = index < activeStep;
              return (
                <motion.button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-colors duration-200",
                    isActive
                      ? "border-[#0FD9C8]/40 bg-[#0FD9C8]/8"
                      : isDone
                        ? "border-[#F05A28]/34 bg-[#F05A28]/7"
                        : "border-[#F5F4F0]/12 bg-[#0C0C0E]/58 hover:border-[#F5F4F0]/24"
                  )}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between gap-3 font-mono text-[0.58rem] uppercase tracking-[0.18em]">
                    <span className={isActive ? "text-[#0FD9C8]" : "text-[#F5F4F0]/44"}>{step.number}</span>
                    <span className={isActive ? "text-[#F05A28]" : "text-[#F5F4F0]/35"}>{step.callout}</span>
                  </div>
                  <p className="mt-2 text-[0.8rem] font-semibold leading-snug text-[#F5F4F0]">{step.title}</p>
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.p
                        key={step.number}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="mt-2 text-[0.72rem] leading-relaxed text-[#F5F4F0]/70"
                      >
                        {step.description}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </CardContent>

        <CardContent className="sr-only">
          <ol>
            {DEFAULT_STEPS.map((step) => (
              <li key={step.number}>
                {step.number}. {step.title}. {step.description}
              </li>
            ))}
          </ol>
        </CardContent>

        <div
          aria-hidden="true"
          className="pointer-events-none relative z-20 mx-5 mb-4 grid grid-cols-2 gap-2 md:mx-7 md:ml-20 md:w-100"
        >
          {STATUS_TAGS.map((label, index) => {
            const isActive = index === activeStep;
            const isDone = index < activeStep;
            return (
              <motion.span
                key={label}
                layout
                className={cn(
                  "relative rounded-full border bg-[#0C0C0E]/65 px-3 py-1.5 text-center font-mono text-[0.58rem] uppercase tracking-[0.16em] backdrop-blur-md",
                  isActive
                    ? "border-[#0FD9C8]/35 text-[#0FD9C8]"
                    : isDone
                      ? "border-[#F05A28]/32 text-[#F5B8A3]"
                      : "border-[#F5F4F0]/10 text-[#A1A1AA]"
                )}
                animate={
                  isActive
                    ? { boxShadow: ["0 0 0 rgba(15,217,200,0)", "0 0 18px rgba(15,217,200,0.28)", "0 0 0 rgba(15,217,200,0)"] }
                    : { boxShadow: "0 0 0 rgba(0,0,0,0)" }
                }
                transition={{ duration: 1.2, ease: "easeInOut", repeat: isActive ? Infinity : 0 }}
              >
                {label}
              </motion.span>
            );
          })}
        </div>

        <CardFooter className="relative z-20 flex flex-col items-stretch gap-3 border-t border-[#F5F4F0]/10 bg-[#0C0C0E]/72 px-5 py-5 backdrop-blur-md sm:flex-row sm:flex-wrap md:px-7 md:pl-20">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Button href={primaryHref} variant="secondary" className="w-full sm:w-auto">
              {primaryLabel}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Button href={secondaryHref} variant="ghost" className="w-full border border-[#F5F4F0]/10 sm:w-auto">
              {secondaryLabel}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

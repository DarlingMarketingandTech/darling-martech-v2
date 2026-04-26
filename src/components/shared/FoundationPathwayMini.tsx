"use client";

import { useRef, type RefObject } from "react";
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
import { RootSystemScene, type RootSystemStep } from "@/components/3d/scenes/home/RootSystemScene";

type FoundationPathwayMiniProps = {
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const DEFAULT_STEPS: RootSystemStep[] = [
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

export function FoundationPathwayMini({
  title = "Your first real system in 4 steps",
  body = "For missing-system buyers: this is the practical foundation path before complex optimization.",
  primaryHref = "/services/technical-roadmap",
  primaryLabel = "See foundation roadmap →",
  secondaryHref = "/tools/growth-bottleneck-quiz",
  secondaryLabel = "Run the diagnostic first →",
}: FoundationPathwayMiniProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = sectionRef as RefObject<HTMLElement>;

  return (
    <Card
      ref={sectionRef as RefObject<HTMLDivElement>}
      className="relative isolate min-h-[720px] overflow-hidden rounded-[2rem] border-[#F5F4F0]/12 bg-[#0C0C0E]/76 py-0 text-[#F5F4F0] shadow-[0_30px_90px_rgba(0,0,0,0.42)] md:min-h-[820px]"
    >
      {/*
        Decorative background layer stack — z-index scale:
          -1 → background textures/gradients (below canvas)
           0 → 3D canvas (RootSystemScene)
          10 → content overlays (bottom status labels)
          20 → headers, footer, nav
      */}
      <div
        className="pointer-events-none absolute inset-0 isolate z-[-1] bg-[radial-gradient(circle_at_50%_34%,rgba(15,217,200,0.16),transparent_34%),radial-gradient(circle_at_20%_18%,rgba(240,90,40,0.14),transparent_30%),linear-gradient(180deg,rgba(245,244,240,0.045)_0%,transparent_40%,rgba(12,12,14,0.9)_100%)]"
        aria-hidden
      />
      {/* Tactile dot-grain — intentional 'human messiness' preserved */}
      <div
        className="pointer-events-none absolute inset-0 isolate z-[-1] opacity-[0.08] [background-image:radial-gradient(rgba(245,244,240,0.8)_0.6px,transparent_0.6px)] [background-size:4px_4px]"
        aria-hidden
      />
      {/* CRT scan-line texture */}
      <div
        className="pointer-events-none absolute inset-0 isolate z-[-1] opacity-[0.15] mix-blend-screen [background-image:linear-gradient(0deg,transparent_24%,rgba(245,244,240,0.18)_25%,rgba(245,244,240,0.18)_26%,transparent_27%,transparent_74%,rgba(245,244,240,0.1)_75%,rgba(245,244,240,0.1)_76%,transparent_77%,transparent)] [background-size:100%_7px]"
        aria-hidden
      />

      <RootSystemScene trackRef={trackRef} steps={DEFAULT_STEPS} />

      {/* z-20 keeps header text above all decorative layers (canvas z-0, overlays z-10) */}
      <CardHeader className="relative z-20 max-w-2xl gap-0 px-5 pt-8 md:px-7 md:pt-10">
        <Badge
          variant="outline"
          className="border-[#0FD9C8]/24 bg-[#0FD9C8]/8 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#0FD9C8]"
        >
          Foundation path
        </Badge>
        <CardTitle className="font-display mt-4 text-balance text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#F5F4F0] md:text-3xl">
          {title}
        </CardTitle>
        <CardDescription className="mt-3 max-w-xl text-sm leading-relaxed text-[#F5F4F0]/66">
          {body}
        </CardDescription>
      </CardHeader>

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
        className="pointer-events-none absolute bottom-24 left-5 right-5 z-10 grid grid-cols-2 gap-2 md:bottom-28 md:left-7 md:right-auto md:w-[25rem]"
      >
        {["DATA_INTAKE", "ROUTE_GRID", "FOLLOW_UP", "HEALTH_VIEW"].map((label) => (
          <span
            key={label}
            className="rounded-full border border-[#F5F4F0]/10 bg-[#0C0C0E]/55 px-3 py-1.5 text-center font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#F5F4F0]/46 backdrop-blur-md"
          >
            {label}
          </span>
        ))}
      </div>

      <CardFooter className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-stretch gap-3 border-t border-[#F5F4F0]/10 bg-[#0C0C0E]/72 px-5 py-5 backdrop-blur-md sm:flex-row sm:flex-wrap md:px-7">
        <Button href={primaryHref} variant="secondary" className="w-full sm:w-auto">
          {primaryLabel}
        </Button>
        <Button href={secondaryHref} variant="ghost" className="w-full border border-[#F5F4F0]/10 sm:w-auto">
          {secondaryLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}

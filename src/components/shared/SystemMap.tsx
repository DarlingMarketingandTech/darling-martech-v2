import {
  Activity,
  Cpu,
  Database,
  GitBranch,
  Layers,
  type LucideIcon,
  Network,
  Server,
  Sparkles,
  Workflow,
} from "lucide-react";
import { MonoMetric } from "@/components/ui/MonoMetric";
import { cn } from "@/lib/utils";

export type SystemMapIconKey =
  | "crm"
  | "database"
  | "workflow"
  | "analytics"
  | "site"
  | "pipeline"
  | "support"
  | "ai"
  | "layers"
  | "infra"
  | "branch";

const ICONS: Record<SystemMapIconKey, LucideIcon> = {
  crm: Database,
  database: Database,
  workflow: Workflow,
  analytics: Activity,
  site: Server,
  pipeline: GitBranch,
  support: Network,
  ai: Sparkles,
  layers: Layers,
  infra: Cpu,
  branch: GitBranch,
};

export type SystemMapNode = {
  label: string;
  iconKey?: SystemMapIconKey;
};

export type SystemMapState = {
  badge: string;
  countLabel: string;
  nodes: SystemMapNode[];
  description?: string;
};

export type SystemMapOutcome = {
  value: string;
  label: string;
};

export type SystemMapProps = {
  eyebrow?: string;
  headline?: string;
  description?: string;
  before: SystemMapState;
  after: SystemMapState;
  outcome?: SystemMapOutcome;
  className?: string;
  /**
   * `id` lets pages anchor the section (e.g. `#system-map`) and lets `aria-labelledby`
   * point at the rendered headline when one is supplied.
   */
  id?: string;
};

/**
 * Static (no React Flow) "Before → After" system map for problem and service pages.
 * Designed to communicate "fragmented stack collapses into one operating layer"
 * without long-form reading. Uses architecture-oriented Lucide icons and the
 * Darling brand surface tokens (panel-obsidian, grain-mask, #F05A28 / #0FD9C8).
 */
export function SystemMap({
  eyebrow,
  headline,
  description,
  before,
  after,
  outcome,
  className,
  id,
}: SystemMapProps) {
  const headlineId = headline && id ? `${id}-headline` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headlineId}
      className={cn(
        "panel-obsidian grain-mask relative overflow-hidden rounded-3xl border border-[#F5F4F0]/10 px-6 py-8 md:rounded-4xl md:px-9 md:py-10",
        className
      )}
    >
      {(eyebrow || headline || description) && (
        <header className="max-w-3xl">
          {eyebrow ? <p className="meta-label-accent">{eyebrow}</p> : null}
          {headline ? (
            <h2
              id={headlineId}
              className="font-display mt-3 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.02em] text-[#F5F4F0] md:text-3xl"
            >
              {headline}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#F5F4F0]/68 md:text-base md:leading-7">
              {description}
            </p>
          ) : null}
        </header>
      )}

      <div className="relative mt-8 grid gap-6 md:mt-10 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-8">
        <SystemMapColumn state={before} variant="before" />
        <SystemMapBridge />
        <SystemMapColumn state={after} variant="after" />
      </div>

      {outcome ? (
        <footer className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#0FD9C8]/22 bg-[#0FD9C8]/04 px-5 py-5 md:mt-10 md:flex-row md:items-center md:justify-between md:px-7 md:py-6">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0FD9C8]">
              Operating outcome
            </p>
            <p className="text-sm leading-snug text-[#F5F4F0]/82 md:text-base">{outcome.label}</p>
          </div>
          <MonoMetric value={outcome.value} size="sm" className="md:text-right" />
        </footer>
      ) : null}
    </section>
  );
}

function SystemMapColumn({
  state,
  variant,
}: {
  state: SystemMapState;
  variant: "before" | "after";
}) {
  const isBefore = variant === "before";
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-3xl border px-5 py-5 md:px-6 md:py-6",
        isBefore
          ? "border-[#F05A28]/22 bg-[#F05A28]/04 shadow-[inset_0_1px_0_0_rgba(240,90,40,0.06)]"
          : "border-[#0FD9C8]/24 bg-[#0FD9C8]/04 shadow-[inset_0_1px_0_0_rgba(15,217,200,0.08)]"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em]",
            isBefore
              ? "border-[#F05A28]/45 bg-[#F05A28]/12 text-[#F5F4F0]"
              : "border-[#0FD9C8]/45 bg-[#0FD9C8]/12 text-[#F5F4F0]"
          )}
        >
          {state.badge}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5F4F0]/45">
          {state.countLabel}
        </span>
      </div>

      <ul
        className={cn(
          "mt-5 grid gap-2",
          state.nodes.length > 5 ? "grid-cols-2" : "grid-cols-1"
        )}
      >
        {state.nodes.map((node) => (
          <SystemMapChip key={`${state.badge}-${node.label}`} node={node} variant={variant} />
        ))}
      </ul>

      {state.description ? (
        <p
          className={cn(
            "mt-5 border-t pt-4 text-sm leading-relaxed",
            isBefore
              ? "border-[#F05A28]/14 text-[#F5F4F0]/68"
              : "border-[#0FD9C8]/16 text-[#F5F4F0]/76"
          )}
        >
          {state.description}
        </p>
      ) : null}
    </div>
  );
}

function SystemMapChip({
  node,
  variant,
}: {
  node: SystemMapNode;
  variant: "before" | "after";
}) {
  const isBefore = variant === "before";
  const Icon = node.iconKey ? ICONS[node.iconKey] : Layers;
  return (
    <li
      className={cn(
        "flex items-center gap-2.5 rounded-xl border px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] motion-safe:transition-[border-color,background-color,transform] motion-safe:duration-300",
        isBefore
          ? "border-dashed border-[#F05A28]/35 bg-[#0C0C0E]/55 text-[#F5F4F0]/76 motion-safe:hover:-translate-y-px motion-safe:hover:border-[#F05A28]/55 motion-safe:hover:bg-[#F05A28]/08"
          : "border-[#0FD9C8]/28 bg-[#0C0C0E]/45 text-[#F5F4F0]/86 motion-safe:hover:-translate-y-px motion-safe:hover:border-[#0FD9C8]/45 motion-safe:hover:bg-[#0FD9C8]/08"
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
          isBefore
            ? "bg-[#F05A28]/14 text-[#F05A28]"
            : "bg-[#0FD9C8]/14 text-[#0FD9C8]"
        )}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
      </span>
      <span className="truncate normal-case tracking-[0.04em] text-[#F5F4F0]/86">{node.label}</span>
    </li>
  );
}

function SystemMapBridge() {
  return (
    <div
      className="relative hidden flex-col items-center justify-center px-2 md:flex"
      aria-hidden
    >
      <div className="h-full w-px bg-linear-to-b from-transparent via-[#F5F4F0]/14 to-transparent" />
      <span className="absolute top-1/2 -translate-y-1/2 rounded-full border border-[#F05A28]/35 bg-[#0C0C0E] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F05A28]">
        →
      </span>
    </div>
  );
}

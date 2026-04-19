export type RoleBenchmarkKey =
  | "senior_dev"
  | "growth_marketer"
  | "designer"
  | "revops_manager"
  | "content_strategist";

export interface RoleBenchmark {
  label: string;
  base: number;
  recruitingPercent: number;
}

export const ROLE_BENCHMARKS: Record<RoleBenchmarkKey, RoleBenchmark> = {
  senior_dev: {
    label: "Senior Full-Stack Developer",
    base: 155_000,
    recruitingPercent: 0.2,
  },
  growth_marketer: {
    label: "Head of Growth / Paid Media Lead",
    base: 145_000,
    recruitingPercent: 0.2,
  },
  designer: {
    label: "Product / Website Designer",
    base: 125_000,
    recruitingPercent: 0.15,
  },
  revops_manager: {
    label: "RevOps / CRM Manager",
    base: 110_000,
    recruitingPercent: 0.15,
  },
  content_strategist: {
    label: "Content Strategist",
    base: 105_000,
    recruitingPercent: 0.15,
  },
};

export const ROLE_BENCHMARK_KEYS = Object.keys(ROLE_BENCHMARKS) as RoleBenchmarkKey[];

export const OVERHEAD_MULTIPLIER = 1.32;
export const DEFAULT_SEVERANCE_MONTHS = 2;
export const DEFAULT_MONTHLY_RETAINER = 12_000;

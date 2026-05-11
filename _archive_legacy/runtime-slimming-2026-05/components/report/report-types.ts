import type { ServiceCluster } from "@/types";

export type ReportServiceBrief = {
  slug: ServiceCluster;
  title: string;
  summary?: string;
};

export type ReportExecutionLinks = {
  primary?: {
    href: string;
    label: string;
  };
  secondary?: {
    href: string;
    label: string;
  };
};

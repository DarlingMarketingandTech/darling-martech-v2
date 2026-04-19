import type { DownloadableResource, ProblemCluster } from "@/types";

const clusters = {
  bottleneck: ["no-strategy-owner", "site-not-converting"] as ProblemCluster[],
  stack: ["disconnected-systems", "pipeline-not-predictable"] as ProblemCluster[],
};

export const downloadableFrameworks: DownloadableResource[] = [
  {
    slug: "bottleneck-diagnostic-worksheet",
    title: "Bottleneck diagnostic worksheet",
    description:
      "A one-page worksheet for leadership teams to agree on where growth is leaking before you buy more software.",
    fileType: "PDF",
    emailGated: true,
    problemClusters: clusters.bottleneck,
  },
  {
    slug: "stack-maturity-rubric",
    title: "Stack maturity rubric",
    description:
      "Score CRM, automation, attribution, and reporting maturity on a shared rubric so rebuild conversations start in reality.",
    fileType: "Spreadsheet",
    emailGated: true,
    problemClusters: clusters.stack,
  },
];

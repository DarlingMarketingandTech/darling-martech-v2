import type { ReactNode } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="page-atmosphere min-h-screen bg-[#0C0C0E] text-[#F5F4F0]">
      <SiteHeader />
      <PageWrapper>{children}</PageWrapper>
      <SiteFooter />
    </div>
  );
}

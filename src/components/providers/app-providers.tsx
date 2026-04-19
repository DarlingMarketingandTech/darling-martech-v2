"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { capturePageview, ensurePosthogClientInitialized } from "@/lib/analytics";

function PosthogPageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      return;
    }

    ensurePosthogClientInitialized();
    const search = searchParams?.toString() ?? "";
    capturePageview(pathname, search);
  }, [pathname, searchParams]);

  return null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {process.env.NEXT_PUBLIC_POSTHOG_KEY ? (
        <Suspense fallback={null}>
          <PosthogPageviewTracker />
        </Suspense>
      ) : null}
      {children}
    </>
  );
}

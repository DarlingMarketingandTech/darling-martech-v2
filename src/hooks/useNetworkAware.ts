"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

type NetworkInfo = {
  /** Whether to reduce animations and effects (slow network or prefers-reduced-motion) */
  shouldReduceMotion: boolean;
  /** Whether to load high-quality images (false on slow networks) */
  shouldLoadHighQuality: boolean;
  /** Current effective connection type */
  effectiveType: "slow-2g" | "2g" | "3g" | "4g" | "unknown";
  /** Whether the connection is metered (e.g., mobile data) */
  isMetered: boolean;
};

/**
 * Hook that provides network-aware rendering hints.
 * Combines user's reduced motion preference with network conditions.
 */
export function useNetworkAware(): NetworkInfo {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    shouldReduceMotion: prefersReducedMotion,
    shouldLoadHighQuality: true,
    effectiveType: "unknown",
    isMetered: false,
  });

  useEffect(() => {
    // Check for Network Information API support
    const connection =
      (navigator as Navigator & { connection?: NetworkInformation }).connection ??
      (navigator as Navigator & { mozConnection?: NetworkInformation }).mozConnection ??
      (navigator as Navigator & { webkitConnection?: NetworkInformation }).webkitConnection;

    if (!connection) {
      // No Network Information API, fall back to reduced motion preference
      setNetworkInfo({
        shouldReduceMotion: prefersReducedMotion,
        shouldLoadHighQuality: true,
        effectiveType: "unknown",
        isMetered: false,
      });
      return;
    }

    const updateNetworkInfo = () => {
      const effectiveType = (connection.effectiveType ?? "unknown") as NetworkInfo["effectiveType"];
      const isSlowNetwork = ["slow-2g", "2g", "3g"].includes(effectiveType);
      const saveData = connection.saveData ?? false;

      setNetworkInfo({
        shouldReduceMotion: prefersReducedMotion || isSlowNetwork || saveData,
        shouldLoadHighQuality: !isSlowNetwork && !saveData,
        effectiveType,
        isMetered: saveData,
      });
    };

    updateNetworkInfo();
    connection.addEventListener?.("change", updateNetworkInfo);

    return () => {
      connection.removeEventListener?.("change", updateNetworkInfo);
    };
  }, [prefersReducedMotion]);

  return networkInfo;
}

// Type declarations for Network Information API
interface NetworkInformation extends EventTarget {
  readonly effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  readonly saveData?: boolean;
  readonly downlink?: number;
  readonly rtt?: number;
  addEventListener?(type: "change", listener: () => void): void;
  removeEventListener?(type: "change", listener: () => void): void;
}

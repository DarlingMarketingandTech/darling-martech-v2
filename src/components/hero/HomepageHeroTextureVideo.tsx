"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getHeroTextureVideoSrc } from "@/lib/hero-ambient-video";
import styles from "@/components/hero/homepage-hero-v2.module.css";

const VIDEO_SRC_A = getHeroTextureVideoSrc("a");
const VIDEO_SRC_B = getHeroTextureVideoSrc("b");

/**
 * Dual “texture lab” stack under `hero-mesh` + FaultyTerminal:
 * — Layer A: primary organic loop (soft-light, bloom in).
 * — Layer B (desktop / non–reduced-data only): interference / depth pass
 *   with slow drift + overlay blend (keeps headline readable via shared well).
 * Both pause off-screen. Second file is large (~30MB); narrow viewports skip B.
 */
export function HomepageHeroTextureVideo() {
  const shellRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoAReady, setVideoAReady] = useState(false);
  const [videoBReady, setVideoBReady] = useState(false);
  const [useDualLayer, setUseDualLayer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reducedDataMq = window.matchMedia("(prefers-reduced-data: reduce)");
    const sync = () => {
      const conn =
        typeof navigator !== "undefined" && "connection" in navigator
          ? (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
          : undefined;
      const saveData = conn?.saveData === true;
      setUseDualLayer(wide.matches && !reducedDataMq.matches && !saveData);
    };
    sync();
    wide.addEventListener("change", sync);
    reducedDataMq.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      reducedDataMq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!useDualLayer || !videoBRef.current) return;
    videoBRef.current.load();
  }, [useDualLayer]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = shellRef.current;
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!el || !a) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            void a.play().catch(() => {});
            if (b) void b.play().catch(() => {});
          } else {
            a.pause();
            if (b) b.pause();
          }
        });
      },
      { root: null, rootMargin: "100px 0px 120px 0px", threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion, useDualLayer]);

  if (reducedMotion) return null;

  return (
    <div
      ref={shellRef}
      className={cn("pointer-events-none absolute inset-0 z-0 select-none", styles.heroTextureShell)}
      aria-hidden
    >
      <div
        className="absolute -left-[20%] -right-[20%] top-[-30%] h-[85%] opacity-[0.35] mix-blend-screen blur-[100px]"
        style={{
          background:
            "conic-gradient(from 215deg at 65% 25%, rgba(240, 90, 40, 0.2), transparent 42%, rgba(15, 217, 200, 0.14), transparent 72%)",
        }}
      />

      {/* Layer A — anchor texture */}
      <video
        ref={videoARef}
        className={cn(styles.heroTextureVideo, videoAReady && styles.heroTextureVideoReady)}
        src={VIDEO_SRC_A}
        muted
        playsInline
        loop
        preload="metadata"
        autoPlay
        onLoadedData={() => setVideoAReady(true)}
      />

      {/* Layer B — “interference” drift (desktop only; heavy asset) */}
      {useDualLayer ? (
        <div className={styles.heroTexturePlaneB} aria-hidden>
          <video
            ref={videoBRef}
            className={cn(styles.heroTextureVideoB, videoBReady && styles.heroTextureVideoBReady)}
            src={VIDEO_SRC_B}
            muted
            playsInline
            loop
            preload="none"
            autoPlay
            onLoadedData={() => setVideoBReady(true)}
          />
        </div>
      ) : null}

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_58%_52%_at_48%_34%,rgba(10,10,14,0.82)_0%,rgba(10,10,14,0.35)_42%,transparent_72%)]"
        aria-hidden
      />

      {/* Iridescent seam where the two clips meet — subtle, not a third gradient system */}
      {useDualLayer ? (
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-color-dodge"
          style={{
            background:
              "linear-gradient(125deg, transparent 0%, rgba(15,217,200,0.08) 38%, transparent 52%, rgba(240,90,40,0.07) 72%, transparent 100%)",
          }}
          aria-hidden
        />
      ) : null}

      <div
        className="absolute inset-0 opacity-[0.45] mix-blend-multiply ring-1 ring-inset ring-[#F5F4F0]/[0.06]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, transparent 18%, transparent 78%, rgba(0,0,0,0.35) 100%)",
        }}
        aria-hidden
      />
    </div>
  );
}

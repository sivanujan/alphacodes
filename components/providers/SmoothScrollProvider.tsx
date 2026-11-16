"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Respect user's motion preferences
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lenis: Lenis | null = null;
    let animationFrameId: number | null = null;

    const initLenis = () => {
      if (mediaQuery.matches) {
        if (lenis) {
          lenis.destroy();
          lenis = null;
        }
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        return;
      }

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      };

      animationFrameId = requestAnimationFrame(raf);
    };

    initLenis();

    const handleMotionChange = () => {
      initLenis();
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}

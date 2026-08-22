"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import BusinessCard from "./BusinessCard";

export default function Preloader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isLoading, setIsLoading] = useState(isHome);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isHome) {
      setIsLoading(false);
      return;
    }

    if (typeof window !== "undefined" && (window as any).__PRELOADER_DONE__) {
      setIsLoading(false);
      return;
    }

    // Lock scrolling while loading
    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    let isFinished = false;
    let fallbackTimer: NodeJS.Timeout;

    // Smoothly increment progress
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 9) + 3;
      if (currentProgress >= 92) {
        currentProgress = 92;
        clearInterval(progressInterval);
      }
      setProgress(currentProgress);
    }, 45);

    const finishLoading = () => {
      if (isFinished) return;
      isFinished = true;

      clearInterval(progressInterval);
      if (fallbackTimer) clearTimeout(fallbackTimer);

      setProgress(100);

      // Brief pause at 100% before smooth reveal
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "";
        if (typeof window !== "undefined") {
          (window as any).__PRELOADER_DONE__ = true;
          window.dispatchEvent(new Event("preloader-finished"));
        }
      }, 600);
    };

    const handleLoad = () => {
      setTimeout(finishLoading, 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      fallbackTimer = setTimeout(() => {
        finishLoading();
      }, 3500);

      return () => {
        window.removeEventListener("load", handleLoad);
        if (fallbackTimer) clearTimeout(fallbackTimer);
        clearInterval(progressInterval);
      };
    }
  }, [isHome]);

  if (!isHome) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader-backdrop"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0f] p-4 select-none"
        >
          {/* Main Wrapper */}
          <div className="w-full max-w-[500px] flex flex-col items-center">
            {/* Flat Sharp Business Card (16:9 Aspect Video) with Exit Animation */}
            <motion.div
              key="business-card"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                y: -50,
                scale: 0.94,
                opacity: 0,
                transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <BusinessCard />
            </motion.div>

            {/* Progress Loader Outside & Below Card with Exit Transition */}
            <motion.div
              key="progress-bar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: 20,
                transition: { duration: 0.35, ease: "easeIn" },
              }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="w-[50%] mt-6 space-y-2"
            >
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-foreground/50">
                <span>INITIALIZING</span>
                <span className="text-volt font-medium">{progress}%</span>
              </div>
              <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                <div
                  className="h-full bg-volt transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


